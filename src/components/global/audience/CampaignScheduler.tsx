
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"

type Campaign = {
  id: string
  name: string
  date: Date
}

export default function CampaignScheduler() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: "1", name: "Summer Sale Promo", date: new Date(2023, 6, 15) },
    { id: "2", name: "New Product Launch", date: new Date(2023, 7, 1) },
    { id: "3", name: "Back to School Campaign", date: new Date(2023, 7, 20) },
  ])
  const [newCampaign, setNewCampaign] = useState("")

  const addCampaign = () => {
    if (newCampaign && date) {
      setCampaigns([...campaigns, { id: Date.now().toString(), name: newCampaign, date }])
      setNewCampaign("")
    }
  }

  const removeCampaign = (id: string) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id))
  }

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-4 md:p-6 shadow-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Campaign Scheduler</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gray-700 bg-opacity-50">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">Upcoming Campaigns</h3>
              <div className="space-y-2">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="flex justify-between items-center">
                    <span>{campaign.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">{campaign.date.toLocaleDateString()}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeCampaign(campaign.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex space-x-2">
                <Input
                  placeholder="New campaign name"
                  value={newCampaign}
                  onChange={(e) => setNewCampaign(e.target.value)}
                  className="bg-gray-600 border-gray-500"
                />
                <Button onClick={addCampaign}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

