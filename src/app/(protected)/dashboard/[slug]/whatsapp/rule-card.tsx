"use client"

import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, Edit } from "lucide-react"

interface WhatsAppRule {
  id: string
  name: string
  trigger: "keyword" | "new_chat" | "no_response" | "button_click" | "location" | "media" | "scheduled"
  triggerValue: string
  response: string
  isActive: boolean
}

interface WhatsAppRuleCardProps {
  rule: WhatsAppRule
  onToggle: () => void
  onDelete: () => void
}

export default function WhatsAppRuleCard({ rule, onToggle, onDelete }: WhatsAppRuleCardProps) {
  const getTriggerLabel = (trigger: string) => {
    switch (trigger) {
      case "keyword":
        return "Keywords"
      case "new_chat":
        return "New Chat"
      case "no_response":
        return "No Response (24h)"
      case "button_click":
        return "Button Click"
      case "location":
        return "Location Shared"
      case "media":
        return "Media Received"
      case "scheduled":
        return "Scheduled Message"
      default:
        return trigger
    }
  }

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              {rule.name}
              <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
                WhatsApp
              </Badge>
            </CardTitle>
            <CardDescription>Trigger: {getTriggerLabel(rule.trigger)}</CardDescription>
          </div>
          <Switch checked={rule.isActive} onCheckedChange={onToggle} />
        </div>
      </CardHeader>
      <CardContent>
        {rule.trigger === "keyword" && rule.triggerValue && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-1">Keywords:</p>
            <div className="flex flex-wrap gap-1">
              {rule.triggerValue.split(",").map((keyword, index) => (
                <Badge key={index} variant="secondary">
                  {keyword.trim()}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {rule.trigger === "scheduled" && rule.triggerValue && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-1">Schedule:</p>
            <Badge variant="secondary">{rule.triggerValue}</Badge>
          </div>
        )}
        <div>
          <p className="text-sm font-medium mb-1">Response:</p>
          <div className="bg-muted p-3 rounded-md text-sm">{rule.response}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

