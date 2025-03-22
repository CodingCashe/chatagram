"use client"

import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { Loader2, Check } from "lucide-react"

// N8N Integration Helper
export function N8NIntegrationHelper({ businessId }: { businessId: string }) {
  const [webhookUrl, setWebhookUrl] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const connectN8N = async () => {
    if (!webhookUrl || !apiKey) {
      toast({
        title: "Missing information",
        description: "Please provide both webhook URL and API key",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)

    try {
      // This would be your actual API endpoint to save the n8n connection
      const response = await axios.post("/api/integrations/n8n", {
        businessId,
        webhookUrl,
        apiKey,
      })

      if (response.status === 200) {
        setIsConnected(true)
        toast({
          title: "n8n connected successfully",
          description: "Your n8n workflows are now linked to your business",
        })
      }
    } catch (error) {
      console.error("Error connecting n8n:", error)
      toast({
        title: "Connection failed",
        description: "Could not connect to n8n. Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect n8n</CardTitle>
        <CardDescription>Link your n8n workflows to automate customer interactions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="webhook-url">Webhook URL</Label>
          <Input
            id="webhook-url"
            placeholder="https://your-n8n-instance.com/webhook/..."
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">The webhook URL from your n8n workflow</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="api-key">API Key</Label>
          <Input
            id="api-key"
            type="password"
            placeholder="Your n8n API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Used to authenticate requests to your n8n instance</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={connectN8N} disabled={isConnecting || isConnected} className="w-full">
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : isConnected ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Connected
            </>
          ) : (
            "Connect n8n"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

// Voiceflow Integration Helper
export function VoiceflowIntegrationHelper({ businessId }: { businessId: string }) {
  const [apiKey, setApiKey] = useState("")
  const [projectId, setProjectId] = useState("")
  const [versionId, setVersionId] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const connectVoiceflow = async () => {
    if (!apiKey || !projectId || !versionId) {
      toast({
        title: "Missing information",
        description: "Please provide all Voiceflow credentials",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)

    try {
      // This would be your actual API endpoint to save the Voiceflow connection
      const response = await axios.post("/api/integrations/voiceflow", {
        businessId,
        apiKey,
        projectId,
        versionId,
      })

      if (response.status === 200) {
        setIsConnected(true)
        toast({
          title: "Voiceflow connected successfully",
          description: "Your Voiceflow project is now linked to your business",
        })
      }
    } catch (error) {
      console.error("Error connecting Voiceflow:", error)
      toast({
        title: "Connection failed",
        description: "Could not connect to Voiceflow. Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect Voiceflow</CardTitle>
        <CardDescription>Link your Voiceflow project to power conversational AI</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">API Key</Label>
          <Input
            id="api-key"
            type="password"
            placeholder="Your Voiceflow API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-id">Project ID</Label>
          <Input
            id="project-id"
            placeholder="Voiceflow Project ID"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="version-id">Version ID</Label>
          <Input
            id="version-id"
            placeholder="Voiceflow Version ID"
            value={versionId}
            onChange={(e) => setVersionId(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Found in your Voiceflow project settings</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={connectVoiceflow} disabled={isConnecting || isConnected} className="w-full">
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : isConnected ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Connected
            </>
          ) : (
            "Connect Voiceflow"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

// Make.com Integration Helper
export function MakeIntegrationHelper({ businessId }: { businessId: string }) {
  const [webhookUrl, setWebhookUrl] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const connectMake = async () => {
    if (!webhookUrl) {
      toast({
        title: "Missing information",
        description: "Please provide the Make.com webhook URL",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)

    try {
      // This would be your actual API endpoint to save the Make.com connection
      const response = await axios.post("/api/integrations/make", {
        businessId,
        webhookUrl,
      })

      if (response.status === 200) {
        setIsConnected(true)
        toast({
          title: "Make.com connected successfully",
          description: "Your Make.com scenarios are now linked to your business",
        })
      }
    } catch (error) {
      console.error("Error connecting Make.com:", error)
      toast({
        title: "Connection failed",
        description: "Could not connect to Make.com. Please check your webhook URL and try again.",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect Make.com</CardTitle>
        <CardDescription>Link your Make.com scenarios to automate workflows</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="webhook-url">Webhook URL</Label>
          <Input
            id="webhook-url"
            placeholder="https://hook.make.com/..."
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">The webhook URL from your Make.com scenario</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={connectMake} disabled={isConnecting || isConnected} className="w-full">
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : isConnected ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Connected
            </>
          ) : (
            "Connect Make.com"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

// Integration Hub Component
export function IntegrationHub({ businessId }: { businessId: string }) {
  return (
    <Tabs defaultValue="voiceflow" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="voiceflow">Voiceflow</TabsTrigger>
        <TabsTrigger value="n8n">n8n</TabsTrigger>
        <TabsTrigger value="make">Make.com</TabsTrigger>
      </TabsList>

      <TabsContent value="voiceflow">
        <VoiceflowIntegrationHelper businessId={businessId} />
      </TabsContent>

      <TabsContent value="n8n">
        <N8NIntegrationHelper businessId={businessId} />
      </TabsContent>

      <TabsContent value="make">
        <MakeIntegrationHelper businessId={businessId} />
      </TabsContent>
    </Tabs>
  )
}

