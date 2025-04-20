"use client"

import { useState, useEffect } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import WhatsAppRuleCard from "./whatsapp-rule-card"
import NewWhatsAppRuleModal from "./new-whatsapp-rule-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface WhatsAppRule {
  id: string
  name: string
  trigger: "keyword" | "new_chat" | "no_response" | "button_click" | "location" | "media" | "scheduled"
  triggerValue: string
  response: string
  isActive: boolean
}

export interface WhatsAppBusiness {
  id: string
  businessName: string
  phoneNumber: string
}

export default function WhatsAppDashboard() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [showNewRuleModal, setShowNewRuleModal] = useState(false)
  const [rules, setRules] = useState<WhatsAppRule[]>([])
  const [whatsappBusinesses, setWhatsappBusinesses] = useState<WhatsAppBusiness[]>([])
  const [selectedBusiness, setSelectedBusiness] = useState<string>("")

  useEffect(() => {
    // Fetch WhatsApp businesses
    fetchWhatsAppBusinesses()
  }, [])

  useEffect(() => {
    // Fetch rules when a business is selected
    if (selectedBusiness) {
      fetchRules(selectedBusiness)
    }
  }, [selectedBusiness])

  const fetchWhatsAppBusinesses = async () => {
    try {
      const response = await fetch("/api/whatsapp/accounts")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch WhatsApp businesses")
      }

      setWhatsappBusinesses(data)

      // Select the first business by default if available
      if (data.length > 0) {
        setSelectedBusiness(data[0].id)
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Error fetching WhatsApp businesses:", error)
      toast({
        title: "Error",
        description: "Could not fetch WhatsApp businesses. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const fetchRules = async (businessId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/whatsapp/rules?accountId=${businessId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch rules")
      }

      setRules(data)
    } catch (error) {
      console.error("Error fetching rules:", error)
      toast({
        title: "Error",
        description: "Could not fetch automation rules. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addRule = async (rule: Omit<WhatsAppRule, "id">) => {
    try {
      const response = await fetch("/api/whatsapp/rules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...rule,
          whatsappBusinessId: selectedBusiness,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create rule")
      }

      setRules([...rules, data])
      setShowNewRuleModal(false)

      toast({
        title: "Rule Created",
        description: "Your WhatsApp automation rule has been created successfully.",
      })
    } catch (error) {
      console.error("Error creating rule:", error)
      toast({
        title: "Error",
        description: "Could not create automation rule. Please try again.",
        variant: "destructive",
      })
    }
  }

  const toggleRule = async (id: string) => {
    const rule = rules.find((r) => r.id === id)

    if (!rule) return

    try {
      const response = await fetch(`/api/whatsapp/rules/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive: !rule.isActive,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update rule")
      }

      setRules(rules.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)))
    } catch (error) {
      console.error("Error updating rule:", error)
      toast({
        title: "Error",
        description: "Could not update automation rule. Please try again.",
        variant: "destructive",
      })
    }
  }

  const deleteRule = async (id: string) => {
    try {
      const response = await fetch(`/api/whatsapp/rules/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to delete rule")
      }

      setRules(rules.filter((r) => r.id !== id))

      toast({
        title: "Rule Deleted",
        description: "Your WhatsApp automation rule has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting rule:", error)
      toast({
        title: "Error",
        description: "Could not delete automation rule. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">WhatsApp Automation Rules</h2>
          <p className="text-muted-foreground">Manage your automated responses for WhatsApp messages</p>
        </div>
        <Button onClick={() => setShowNewRuleModal(true)} disabled={!selectedBusiness || isLoading}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Rule
        </Button>
      </div>

      {whatsappBusinesses.length > 0 ? (
        <>
          <div className="max-w-xs">
            <Select value={selectedBusiness} onValueChange={setSelectedBusiness} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Select WhatsApp business" />
              </SelectTrigger>
              <SelectContent>
                {whatsappBusinesses.map((business) => (
                  <SelectItem key={business.id} value={business.id}>
                    {business.businessName} ({business.phoneNumber})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading automation rules...</p>
            </div>
          ) : rules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rules.map((rule) => (
                <WhatsAppRuleCard
                  key={rule.id}
                  rule={rule}
                  onToggle={() => toggleRule(rule.id)}
                  onDelete={() => deleteRule(rule.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">No automation rules yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first rule to start responding to WhatsApp messages automatically.
              </p>
              <Button onClick={() => setShowNewRuleModal(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Rule
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">No WhatsApp businesses connected</h3>
          <p className="text-muted-foreground mb-4">
            Connect a WhatsApp Business account to start creating automation rules.
          </p>
          <Button asChild>
            <a href="/account-setup">Connect WhatsApp Business</a>
          </Button>
        </div>
      )}

      <NewWhatsAppRuleModal open={showNewRuleModal} onClose={() => setShowNewRuleModal(false)} onSave={addRule} />
    </div>
  )
}

