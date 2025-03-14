"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, CheckCircle2, Loader2 } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { onUserInfo } from "@/actions/user"
import { onOAuthInstagram } from "@/actions/integrations"
import { useState } from "react"

interface IntegrationCardProps {
  title: string
  description: string
  icon: ReactNode
  strategy: "INSTAGRAM" | "CRM"
}

export default function IntegrationCard({ title, description, icon, strategy }: IntegrationCardProps) {
  const [isConnecting, setIsConnecting] = useState(false)

  // Fetch user data to check if integration exists
  const { data } = useQuery({
    queryKey: ["user-profile"],
    queryFn: onUserInfo,
  })

  // Check if this integration is already connected
  const integrated = data?.data?.integrations?.find((integration: any) => integration.name === strategy)

  const connectedCount = integrated ? 1 : 0
  const activeCount = integrated ? 1 : 0

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      // This will redirect to Instagram OAuth
      await onOAuthInstagram(strategy)
    } catch (error) {
      console.error("Error connecting:", error)
      setIsConnecting(false)
    }
  }

  return (
    <Card className="overflow-hidden border-2 border-blue-100 dark:border-blue-900 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hoverScale glowHover">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 pb-8 radial--gradient--pink">
        <div className="flex justify-between items-start">
          <div className="bg-white dark:bg-blue-800 p-3 rounded-lg shadow-sm">{icon}</div>
          <Badge
            variant={connectedCount > 0 ? "default" : "outline"}
            className={connectedCount > 0 ? "bg-blue-600 dark:bg-blue-700" : ""}
          >
            {connectedCount > 0 ? `${activeCount}/${connectedCount} Connected` : "Not Connected"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <h3 className="font-bold text-xl">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <div className="flex items-center text-sm text-muted-foreground">
          {connectedCount > 0 ? <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" /> : null}
          {connectedCount === 0
            ? "No accounts connected"
            : connectedCount === 1
              ? "1 account connected"
              : `${connectedCount} accounts connected`}
        </div>
        <Button
          size="sm"
          onClick={handleConnect}
          disabled={isConnecting || integrated?.name === strategy}
          className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800"
        >
          {isConnecting ? (
            <>
              <Loader2 className="h-4 w-4 mr-1 animate-spin" /> Connecting...
            </>
          ) : integrated ? (
            "Connected"
          ) : (
            <>
              <Plus className="h-4 w-4 mr-1" /> Connect
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

