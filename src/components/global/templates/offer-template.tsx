"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type OfferTemplateProps = {
  conversationId: string
  recipientId: string
  onSend: (offer: any) => void
}

export function OfferTemplate({ conversationId, recipientId, onSend }: OfferTemplateProps) {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [deliverables, setDeliverables] = useState("")
  const [deadline, setDeadline] = useState("")
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("custom")

  const handleSubmit = () => {
    const offer = {
      type: "offer",
      amount,
      description,
      deliverables,
      deadline,
      conversationId,
      recipientId,
      status: "pending",
    }

    onSend(offer)
    setOpen(false)

    // Reset form
    setAmount("")
    setDescription("")
    setDeliverables("")
    setDeadline("")
  }

  const offerTemplates = [
    {
      name: "Basic Instagram Post",
      amount: "500",
      description: "Single Instagram post featuring the product with authentic caption.",
      deliverables: "1 Instagram feed post\nProduct tag\nHashtags as requested",
      deadline: "",
    },
    {
      name: "Instagram Story Package",
      amount: "750",
      description: "Series of Instagram stories showcasing the product with swipe-up link.",
      deliverables: "3 Instagram stories\nSwipe-up link\n24-hour highlight",
      deadline: "",
    },
    {
      name: "Content Creation",
      amount: "1200",
      description: "Professional content creation for brand use across platforms.",
      deliverables: "5 high-quality images\nFull usage rights\nEditing included",
      deadline: "",
    },
    {
      name: "Full Campaign",
      amount: "2500",
      description: "Comprehensive social media campaign across multiple platforms.",
      deliverables: "2 Instagram posts\n5 Stories\n1 Reel\n1 TikTok\nContent usage rights",
      deadline: "",
    },
  ]

  const selectTemplate = (template: (typeof offerTemplates)[0]) => {
    setAmount(template.amount)
    setDescription(template.description)
    setDeliverables(template.deliverables)
    if (template.deadline) setDeadline(template.deadline)
    setActiveTab("custom")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs border-gray-700 text-gray-300">
          Send Offer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle>Create Offer</DialogTitle>
          <DialogDescription className="text-gray-400">
            Send a formal offer to negotiate collaboration terms.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-gray-800 mb-4">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="custom">Custom Offer</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {offerTemplates.map((template, index) => (
                <div
                  key={index}
                  className="border border-gray-700 rounded-lg p-3 hover:bg-gray-800 cursor-pointer transition-colors"
                  onClick={() => selectTemplate(template)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{template.name}</h4>
                    <span className="text-green-400">${template.amount}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{template.description}</p>
                  <div className="text-xs text-gray-500">
                    <strong>Deliverables:</strong> {template.deliverables.split("\n")[0]}
                    {template.deliverables.split("\n").length > 1 && "..."}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <div className="col-span-3 flex">
                  <span className="inline-flex items-center px-3 bg-gray-800 border border-r-0 border-gray-700 rounded-l-md text-gray-400">
                    $
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="rounded-l-none bg-gray-800 border-gray-700"
                    placeholder="500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="col-span-3 bg-gray-800 border-gray-700"
                  placeholder="Brief description of the collaboration"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deliverables" className="text-right">
                  Deliverables
                </Label>
                <Textarea
                  id="deliverables"
                  value={deliverables}
                  onChange={(e) => setDeliverables(e.target.value)}
                  className="col-span-3 bg-gray-800 border-gray-700"
                  placeholder="1 Instagram post, 2 Stories, etc."
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deadline" className="text-right">
                  Deadline
                </Label>
                <Input
                  id="deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="col-span-3 bg-gray-800 border-gray-700"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="border-gray-700 text-gray-300">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-gray-800 hover:bg-gray-700">
            Send Offer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
