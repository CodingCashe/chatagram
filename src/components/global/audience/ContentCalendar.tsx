import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Event = {
  date: Date
  title: string
  type: "post" | "story" | "reel"
}

export default function ContentCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events] = useState<Event[]>([
    { date: new Date(2023, 6, 15), title: "Summer Collection Post", type: "post" },
    { date: new Date(2023, 6, 17), title: "Behind the Scenes Story", type: "story" },
    { date: new Date(2023, 6, 20), title: "Product Tutorial Reel", type: "reel" },
  ])

  const eventTypes = {
    post: { bg: "bg-blue-500", text: "Post" },
    story: { bg: "bg-green-500", text: "Story" },
    reel: { bg: "bg-pink-500", text: "Reel" },
  }

  return (
    <div className="mt-4 md:mt-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 md:p-6 shadow-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Content Calendar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border border-gray-700" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Upcoming Content</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {events.map((event, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="text-white">{event.title}</span>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-400 mr-2">{event.date.toLocaleDateString()}</span>
                      <span className={`text-xs px-2 py-1 rounded ${eventTypes[event.type].bg}`}>
                        {eventTypes[event.type].text}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

