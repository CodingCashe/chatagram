"use client"

import { useState, useEffect } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import AutomationCard from "./automation-card"
import NewAutomationModal from "./new-automation-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface Automation {
  id: string
  name: string
  trigger: "keyword" | "new_chat" | "no_response" | "button_click" | "location" | "media" | "scheduled"
  triggerValue: string
  response: string
  isActive: boolean
}

export interface WhatsAppAccount {
  id: string
  businessName: string
  phoneNumber: string
}

export default function AutomationDashboard() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [showNewAutomationModal, setShowNewAutomationModal] = useState(false)
  const [automations, setAutomations] = useState<Automation[]>([])
  const [whatsappAccounts, setWhatsappAccounts] = useState<WhatsAppAccount[]>([])
  const [selectedAccount, setSelectedAccount] = useState<string>("")

  useEffect(() => {
    // Fetch WhatsApp accounts
    fetchWhatsAppAccounts()
  }, [])

  useEffect(() => {
    // Fetch automations when an account is selected
    if (selectedAccount) {
      fetchAutomations(selectedAccount)
    }
  }, [selectedAccount])

  const fetchWhatsAppAccounts = async () => {
    try {
      const response = await fetch("/api/whatsapp/accounts")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch WhatsApp accounts")
      }

      setWhatsappAccounts(data)

      // Select the first account by default if available
      if (data.length > 0) {
        setSelectedAccount(data[0].id)
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Error fetching WhatsApp accounts:", error)
      toast({
        title: "Error",
        description: "Could not fetch WhatsApp accounts. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const fetchAutomations = async (accountId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/whatsapp/automations?accountId=${accountId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch automations")
      }

      setAutomations(data)
    } catch (error) {
      console.error("Error fetching automations:", error)
      toast({
        title: "Error",
        description: "Could not fetch automations. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addAutomation = async (automation: Omit<Automation, "id">) => {
    try {
      const response = await fetch("/api/whatsapp/automations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...automation,
          whatsappAccountId: selectedAccount,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create automation")
      }

      setAutomations([...automations, data])
      setShowNewAutomationModal(false)

      toast({
        title: "Automation Created",
        description: "Your automation has been created successfully.",
      })
    } catch (error) {
      console.error("Error creating automation:", error)
      toast({
        title: "Error",
        description: "Could not create automation. Please try again.",
        variant: "destructive",
      })
    }
  }

  const toggleAutomation = async (id: string) => {
    const automation = automations.find((a) => a.id === id)

    if (!automation) return

    try {
      const response = await fetch(`/api/whatsapp/automations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive: !automation.isActive,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update automation")
      }

      setAutomations(automations.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a)))
    } catch (error) {
      console.error("Error updating automation:", error)
      toast({
        title: "Error",
        description: "Could not update automation. Please try again.",
        variant: "destructive",
      })
    }
  }

  const deleteAutomation = async (id: string) => {
    try {
      const response = await fetch(`/api/whatsapp/automations/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to delete automation")
      }

      setAutomations(automations.filter((a) => a.id !== id))

      toast({
        title: "Automation Deleted",
        description: "Your automation has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting automation:", error)
      toast({
        title: "Error",
        description: "Could not delete automation. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">WhatsApp Automations</h2>
          <p className="text-muted-foreground">Manage your automated responses for WhatsApp messages</p>
        </div>
        <Button onClick={() => setShowNewAutomationModal(true)} disabled={!selectedAccount || isLoading}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Automation
        </Button>
      </div>

      {whatsappAccounts.length > 0 ? (
        <>
          <div className="max-w-xs">
            <Select value={selectedAccount} onValueChange={setSelectedAccount} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Select WhatsApp account" />
              </SelectTrigger>
              <SelectContent>
                {whatsappAccounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.businessName} ({account.phoneNumber})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading automations...</p>
            </div>
          ) : automations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {automations.map((automation) => (
                <AutomationCard
                  key={automation.id}
                  automation={automation}
                  onToggle={() => toggleAutomation(automation.id)}
                  onDelete={() => deleteAutomation(automation.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">No automations yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first automation to start responding to WhatsApp messages automatically.
              </p>
              <Button onClick={() => setShowNewAutomationModal(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Automation
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">No WhatsApp accounts connected</h3>
          <p className="text-muted-foreground mb-4">
            Connect a WhatsApp Business account to start creating automations.
          </p>
          <Button asChild>
            <a href="/account-setup">Connect WhatsApp Account</a>
          </Button>
        </div>
      )}

      <NewAutomationModal
        open={showNewAutomationModal}
        onClose={() => setShowNewAutomationModal(false)}
        onSave={addAutomation}
      />
    </div>
  )
}

