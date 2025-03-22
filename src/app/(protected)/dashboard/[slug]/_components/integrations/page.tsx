"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IntegrationHub } from "@/lib/integration-helper"
import { ArrowLeft, Zap, RefreshCw, Settings } from "lucide-react"
import Link from "next/link"

export default function IntegrationsPage() {
  const [businessId, setBusinessId] = useState("123456789")

  return (
    <div className="container mx-auto p-4 space-y-6 dark">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/customer-engagement">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground mt-1">Connect your favorite tools to enhance your customer engagement</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <IntegrationHub businessId={businessId} />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integration Benefits</CardTitle>
              <CardDescription>Enhance your customer engagement with these integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-sm">Voiceflow</h3>
                  <p className="text-sm text-muted-foreground">
                    Create sophisticated conversational flows with advanced AI capabilities
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <RefreshCw className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-sm">n8n</h3>
                  <p className="text-sm text-muted-foreground">
                    Build powerful automation workflows that connect to hundreds of services
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Settings className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-sm">Make.com</h3>
                  <p className="text-sm text-muted-foreground">Create visual automation scenarios without coding</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Real-time Workflow</CardTitle>
              <CardDescription>How these integrations work together</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative pl-6 pb-6 border-l border-muted">
                  <div className="absolute left-0 top-0 w-3 h-3 -translate-x-1.5 rounded-full bg-blue-500"></div>
                  <h3 className="font-medium text-sm">Instagram Message</h3>
                  <p className="text-xs text-muted-foreground mt-1">Customer sends a message on Instagram</p>
                </div>

                <div className="relative pl-6 pb-6 border-l border-muted">
                  <div className="absolute left-0 top-0 w-3 h-3 -translate-x-1.5 rounded-full bg-green-500"></div>
                  <h3 className="font-medium text-sm">Webhook Trigger</h3>
                  <p className="text-xs text-muted-foreground mt-1">Message is received by your webhook handler</p>
                </div>

                <div className="relative pl-6 pb-6 border-l border-muted">
                  <div className="absolute left-0 top-0 w-3 h-3 -translate-x-1.5 rounded-full bg-purple-500"></div>
                  <h3 className="font-medium text-sm">Voiceflow Processing</h3>
                  <p className="text-xs text-muted-foreground mt-1">Message is processed by Voiceflow AI</p>
                </div>

                <div className="relative pl-6 pb-6 border-l border-muted">
                  <div className="absolute left-0 top-0 w-3 h-3 -translate-x-1.5 rounded-full bg-yellow-500"></div>
                  <h3 className="font-medium text-sm">Automation Logic</h3>
                  <p className="text-xs text-muted-foreground mt-1">n8n or Make.com handles business logic</p>
                </div>

                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 w-3 h-3 -translate-x-1.5 rounded-full bg-red-500"></div>
                  <h3 className="font-medium text-sm">Response Sent</h3>
                  <p className="text-xs text-muted-foreground mt-1">AI response is sent back to Instagram</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

