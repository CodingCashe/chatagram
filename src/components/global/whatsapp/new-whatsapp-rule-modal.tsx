"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WhatsAppRule {
  id: string
  name: string
  trigger: "keyword" | "new_chat" | "no_response" | "button_click" | "location" | "media" | "scheduled"
  triggerValue: string
  response: string
  isActive: boolean
}

interface NewWhatsAppRuleModalProps {
  open: boolean
  onClose: () => void
  onSave: (rule: Omit<WhatsAppRule, "id">) => void
}

export default function NewWhatsAppRuleModal({ open, onClose, onSave }: NewWhatsAppRuleModalProps) {
  const [name, setName] = useState("")
  const [trigger, setTrigger] = useState<WhatsAppRule["trigger"]>("keyword")
  const [triggerValue, setTriggerValue] = useState("")
  const [response, setResponse] = useState("")

  const handleSave = () => {
    onSave({
      name,
      trigger,
      triggerValue,
      response,
      isActive: true,
    })

    // Reset form
    setName("")
    setTrigger("keyword")
    setTriggerValue("")
    setResponse("")
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New WhatsApp Rule</DialogTitle>
          <DialogDescription>Set up a new automated response for WhatsApp messages.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Rule Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Welcome Message"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="trigger">Trigger Type</Label>
            <Select value={trigger} onValueChange={(value: any) => setTrigger(value)}>
              <SelectTrigger id="trigger">
                <SelectValue placeholder="Select a trigger type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="keyword">Keywords</SelectItem>
                <SelectItem value="new_chat">New Chat</SelectItem>
                <SelectItem value="no_response">No Response (24h)</SelectItem>
                <SelectItem value="button_click">Button Click</SelectItem>
                <SelectItem value="location">Location Shared</SelectItem>
                <SelectItem value="media">Media Received</SelectItem>
                <SelectItem value="scheduled">Scheduled Message</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {trigger === "keyword" && (
            <div className="grid gap-2">
              <Label htmlFor="triggerValue">Keywords (comma separated)</Label>
              <Input
                id="triggerValue"
                value={triggerValue}
                onChange={(e) => setTriggerValue(e.target.value)}
                placeholder="e.g., hello, hi, hey"
              />
            </div>
          )}

          {trigger === "scheduled" && (
            <div className="grid gap-2">
              <Label htmlFor="triggerValue">Schedule (cron expression or time)</Label>
              <Input
                id="triggerValue"
                value={triggerValue}
                onChange={(e) => setTriggerValue(e.target.value)}
                placeholder="e.g., 0 9 * * * or Every day at 9am"
              />
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="response">Response Message</Label>
            <Textarea
              id="response"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Enter your automated response message"
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Rule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

