import React from "react"
import { motion } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"

export default function CampaignScheduler() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

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
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span>Summer Sale Promo</span>
                  <span className="text-sm text-gray-400">Jul 15</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>New Product Launch</span>
                  <span className="text-sm text-gray-400">Aug 1</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Back to School Campaign</span>
                  <span className="text-sm text-gray-400">Aug 20</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

