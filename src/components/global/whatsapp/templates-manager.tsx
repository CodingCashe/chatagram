"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, FileText, MessageSquare } from "lucide-react"

export default function TemplatesManager() {
  const [templates, setTemplates] = useState([
    {
      id: "1",
      name: "welcome_template",
      status: "approved",
      category: "MARKETING",
      components: [
        {
          type: "HEADER",
          format: "TEXT",
          text: "Welcome to our business!",
        },
        {
          type: "BODY",
          text: "Hello {{1}}, thank you for your interest in our products. We're here to help with any questions you might have.",
        },
        {
          type: "FOOTER",
          text: "Reply to this message to chat with our team.",
        },
      ],
    },
    {
      id: "2",
      name: "order_update",
      status: "approved",
      category: "UTILITY",
      components: [
        {
          type: "HEADER",
          format: "TEXT",
          text: "Order Update",
        },
        {
          type: "BODY",
          text: "Hello {{1}}, your order #{{2}} has been {{3}}. You can track your order using the following link: {{4}}",
        },
        {
          type: "FOOTER",
          text: "Thank you for shopping with us!",
        },
      ],
    },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Message Templates
        </CardTitle>
        <CardDescription>Manage your approved WhatsApp message templates</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="approved">
          <TabsList className="mb-4">
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="approved">
            <div className="grid gap-4">
              {templates.map((template) => (
                <Card key={template.id} className="border-primary/20">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {template.status}
                          </Badge>
                          <Badge variant="outline">{template.category}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="text-sm space-y-2">
                      {template.components.map((component, index) => (
                        <div key={index} className="border-l-2 border-muted pl-3">
                          <p className="font-medium text-xs text-muted-foreground">{component.type}</p>
                          <p>{component.text}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending">
            <div className="text-center py-8 text-muted-foreground">No pending templates</div>
          </TabsContent>

          <TabsContent value="rejected">
            <div className="text-center py-8 text-muted-foreground">No rejected templates</div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Template
        </Button>
      </CardFooter>
    </Card>
  )
}

