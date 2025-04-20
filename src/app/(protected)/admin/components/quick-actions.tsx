"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { UserPlus, MessageSquare, Bell, Zap, X, CheckCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { makeUserAdmin, sendSystemNotification } from "../actions"

export function QuickActions() {
  const [activeAction, setActiveAction] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [notificationTitle, setNotificationTitle] = useState("")
  const [notificationMessage, setNotificationMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleMakeAdmin = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)
      await makeUserAdmin(email)
      setSuccess(true)

      toast({
        title: "Success",
        description: `${email} has been made an admin`,
      })

      // Reset after 3 seconds
      setTimeout(() => {
        setEmail("")
        setSuccess(false)
        setActiveAction(null)
      }, 3000)
    } catch (error) {
      console.error("Error making user admin:", error)
      toast({
        title: "Error",
        description: "Failed to make user an admin. User may not exist.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendNotification = async () => {
    if (!notificationTitle || !notificationMessage) {
      toast({
        title: "Error",
        description: "Please enter both a title and message",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)
      await sendSystemNotification(notificationTitle, notificationMessage)
      setSuccess(true)

      toast({
        title: "Success",
        description: "System notification sent to all users",
      })

      // Reset after 3 seconds
      setTimeout(() => {
        setNotificationTitle("")
        setNotificationMessage("")
        setSuccess(false)
        setActiveAction(null)
      }, 3000)
    } catch (error) {
      console.error("Error sending notification:", error)
      toast({
        title: "Error",
        description: "Failed to send notification",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderActionContent = () => {
    if (success) {
      return (
        <div className="flex flex-col items-center justify-center py-6">
          <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
          <p className="text-center font-medium">Action completed successfully!</p>
        </div>
      )
    }

    switch (activeAction) {
      case "makeAdmin":
        return (
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Input placeholder="Enter user email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <p className="text-xs text-muted-foreground">This will grant admin privileges to an existing user.</p>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" size="sm" className="mr-2" onClick={() => setActiveAction(null)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleMakeAdmin} disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Make Admin"}
              </Button>
            </div>
          </div>
        )

      case "sendNotification":
        return (
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Input
                placeholder="Notification title"
                value={notificationTitle}
                onChange={(e) => setNotificationTitle(e.target.value)}
              />
              <Textarea
                placeholder="Notification message"
                value={notificationMessage}
                onChange={(e) => setNotificationMessage(e.target.value)}
                className="h-20"
              />
              <p className="text-xs text-muted-foreground">This will send a system notification to all users.</p>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" size="sm" className="mr-2" onClick={() => setActiveAction(null)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSendNotification} disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Notification"}
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Perform common administrative tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-muted"
            onClick={() => setActiveAction("makeAdmin")}
          >
            <UserPlus className="h-6 w-6 mb-2" />
            <span className="text-sm">Make Admin</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-muted"
            onClick={() => setActiveAction("sendNotification")}
          >
            <Bell className="h-6 w-6 mb-2" />
            <span className="text-sm">Send Notification</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-muted"
            onClick={() => {
              toast({
                title: "Coming Soon",
                description: "This feature is under development",
              })
            }}
          >
            <MessageSquare className="h-6 w-6 mb-2" />
            <span className="text-sm">Bulk Message</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-muted"
            onClick={() => {
              toast({
                title: "Coming Soon",
                description: "This feature is under development",
              })
            }}
          >
            <Zap className="h-6 w-6 mb-2" />
            <span className="text-sm">Run Maintenance</span>
          </Button>
        </div>

        {activeAction && (
          <Card className="border-dashed">
            <CardHeader className="py-3 px-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">
                  {activeAction === "makeAdmin" && "Make User Admin"}
                  {activeAction === "sendNotification" && "Send System Notification"}
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setActiveAction(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">{renderActionContent()}</CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}

