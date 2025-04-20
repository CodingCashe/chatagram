"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

type MessageTemplatesProps = {
  onSelect: (template: string) => void
}

export function MessageTemplates({ onSelect }: MessageTemplatesProps) {
  const [customTemplates, setCustomTemplates] = useState<string[]>([])
  const [newTemplate, setNewTemplate] = useState("")

  const collaborationTemplates = [
    "Hi! I'm interested in collaborating with your brand. Could you share more details about what you're looking for?",
    "Thanks for reaching out! I'd love to discuss potential collaboration opportunities. What's your timeline for this campaign?",
    "I've reviewed your proposal and I'm interested. Could we schedule a call to discuss the details further?",
    "I typically charge $X for this type of content. Does this work with your budget?",
    "Before we proceed, I'd like to clarify my content guidelines and what I'm comfortable promoting.",
  ]

  const negotiationTemplates = [
    "Thank you for your offer. I'd like to propose a rate of $X for the deliverables we discussed.",
    "I appreciate your proposal. Given the scope of work, I would need a budget of $X to deliver the quality content you're looking for.",
    "I'm interested in a long-term partnership. Would you consider a package deal for multiple posts over X months?",
    "For exclusivity, I would need to increase my rate by X%. Let me know if that works for you.",
    "I'd be happy to include an additional Story for a total package price of $X.",
  ]

  const followupTemplates = [
    "Just following up on our previous conversation. Are you still interested in working together?",
    "I wanted to check in about the campaign we discussed. Do you have any updates on the timeline?",
    "I haven't heard back from you in a while. Are you still interested in moving forward with our collaboration?",
    "The deadline we discussed is approaching. Could you confirm if we're still on track?",
    "I've completed the content we agreed upon. Please let me know if you need any revisions.",
  ]

  const handleAddTemplate = () => {
    if (newTemplate.trim()) {
      setCustomTemplates([...customTemplates, newTemplate.trim()])
      setNewTemplate("")
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-4">
        <Tabs defaultValue="collaboration">
          <TabsList className="bg-gray-700 mb-4">
            <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
            <TabsTrigger value="negotiation">Negotiation</TabsTrigger>
            <TabsTrigger value="followup">Follow-up</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>

          <TabsContent value="collaboration" className="mt-0">
            <div className="grid grid-cols-1 gap-2">
              {collaborationTemplates.map((template, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto py-2 px-3 text-left text-sm border-gray-700 hover:bg-gray-700"
                  onClick={() => onSelect(template)}
                >
                  {template.length > 70 ? `${template.substring(0, 70)}...` : template}
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="negotiation" className="mt-0">
            <div className="grid grid-cols-1 gap-2">
              {negotiationTemplates.map((template, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto py-2 px-3 text-left text-sm border-gray-700 hover:bg-gray-700"
                  onClick={() => onSelect(template)}
                >
                  {template.length > 70 ? `${template.substring(0, 70)}...` : template}
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="followup" className="mt-0">
            <div className="grid grid-cols-1 gap-2">
              {followupTemplates.map((template, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto py-2 px-3 text-left text-sm border-gray-700 hover:bg-gray-700"
                  onClick={() => onSelect(template)}
                >
                  {template.length > 70 ? `${template.substring(0, 70)}...` : template}
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom" className="mt-0">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a custom template..."
                  value={newTemplate}
                  onChange={(e) => setNewTemplate(e.target.value)}
                  className="bg-gray-700 border-gray-600"
                />
                <Button variant="outline" size="icon" onClick={handleAddTemplate} className="border-gray-700">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {customTemplates.length > 0 ? (
                <div className="grid grid-cols-1 gap-2">
                  {customTemplates.map((template, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start h-auto py-2 px-3 text-left text-sm border-gray-700 hover:bg-gray-700 group"
                      onClick={() => onSelect(template)}
                    >
                      {template.length > 70 ? `${template.substring(0, 70)}...` : template}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">No custom templates yet. Add one above!</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
