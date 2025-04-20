"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { sendTestEmail } from "../../actions/email-actions"
import { toast } from "@/hooks/use-toast"

interface TestEmailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subject: string
  content: string
}

export function TestEmailDialog({ open, onOpenChange, subject, content }: TestEmailDialogProps) {
  const [email, setEmail] = useState("")
  const [isSending, setIsSending] = useState(false)

  const handleSendTest = async () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter an email address to send the test to.",
        variant: "destructive",
      })
      return
    }

    setIsSending(true)
    try {
      const result = await sendTestEmail({
        to: email,
        subject,
        content,
      })

      if (result.success) {
        toast({
          title: "Test email sent",
          description: result.message || "Your test email has been sent successfully.",
        })
        onOpenChange(false)
      } else {
        toast({
          title: "Failed to send test email",
          description: result.error || "There was an error sending your test email.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Test Email</DialogTitle>
          <DialogDescription>Send a test email to verify how your template looks.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="test-email" className="text-right">
              Email
            </Label>
            <Input
              id="test-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
              placeholder="recipient@example.com"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Subject</Label>
            <div className="col-span-3 text-sm text-muted-foreground truncate">{subject}</div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSendTest} disabled={isSending}>
            {isSending ? "Sending..." : "Send Test"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

