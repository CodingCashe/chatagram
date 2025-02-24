
import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X } from "lucide-react"

type Event = {
  id: string
  date: Date
  title: string
  type: "post" | "story" | "reel"
}

export default function ContentCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<Event[]>([
    { id: "1", date: new Date(2023, 6, 15), title: "Summer Collection Post", type: "post" },
    { id: "2", date: new Date(2023, 6, 17), title: "Behind the Scenes Story", type: "story" },
    { id: "3", date: new Date(2023, 6, 20), title: "Product Tutorial Reel", type: "reel" },
  ])
  const [newEvent, setNewEvent] = useState({ title: "", type: "post" as "post" | "story" | "reel" })

  const addEvent = () => {
    if (newEvent.title && date) {
      setEvents([...events, { id: Date.now().toString(), date, ...newEvent }])
      setNewEvent({ title: "", type: "post" })
    }
  }

  const removeEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id))
  }

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
                {events.map((event) => (
                  <li key={event.id} className="flex justify-between items-center">
                    <span className="text-white">{event.title}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">{event.date.toLocaleDateString()}</span>
                      <span className={`text-xs px-2 py-1 rounded ${eventTypes[event.type].bg}`}>
                        {eventTypes[event.type].text}
                      </span>
                      <Button variant="ghost" size="sm" onClick={() => removeEvent(event.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-2">
                <Input
                  placeholder="New event title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="bg-gray-700 border-gray-600"
                />
                <Select
                  value={newEvent.type}
                  onValueChange={(value: "post" | "story" | "reel") => setNewEvent({ ...newEvent, type: value })}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="post">Post</SelectItem>
                    <SelectItem value="story">Story</SelectItem>
                    <SelectItem value="reel">Reel</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={addEvent} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

