// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { CalendarIcon } from "lucide-react"
// import { format } from "date-fns"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// type ScheduleMeetingProps = {
//   conversationId: string
//   recipientId: string
//   onSchedule: (meeting: any) => void
// }

// export function ScheduleMeeting({ conversationId, recipientId, onSchedule }: ScheduleMeetingProps) {
//   const [date, setDate] = useState<Date | undefined>(undefined)
//   const [time, setTime] = useState("")
//   const [duration, setDuration] = useState("30")
//   const [topic, setTopic] = useState("")
//   const [notes, setNotes] = useState("")
//   const [open, setOpen] = useState(false)

//   const handleSubmit = () => {
//     if (!date || !time) return

//     const meeting = {
//       type: "meeting",
//       date: date.toISOString().split("T")[0],
//       time,
//       duration,
//       topic,
//       notes,
//       conversationId,
//       recipientId,
//       status: "pending",
//     }

//     onSchedule(meeting)
//     setOpen(false)

//     // Reset form
//     setDate(undefined)
//     setTime("")
//     setDuration("30")
//     setTopic("")
//     setNotes("")
//   }

//   const timeOptions = [
//     "09:00",
//     "09:30",
//     "10:00",
//     "10:30",
//     "11:00",
//     "11:30",
//     "12:00",
//     "12:30",
//     "13:00",
//     "13:30",
//     "14:00",
//     "14:30",
//     "15:00",
//     "15:30",
//     "16:00",
//     "16:30",
//     "17:00",
//     "17:30",
//     "18:00",
//     "18:30",
//     "19:00",
//     "19:30",
//     "20:00",
//   ]

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline" size="sm" className="text-xs border-gray-700 text-gray-300">
//           Schedule Meeting
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[500px] bg-gray-900 text-white border-gray-800">
//         <DialogHeader>
//           <DialogTitle>Schedule a Meeting</DialogTitle>
//           <DialogDescription className="text-gray-400">
//             Propose a time to meet and discuss collaboration details.
//           </DialogDescription>
//         </DialogHeader>

//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="date" className="text-right">
//               Date
//             </Label>
//             <div className="col-span-3">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className={`w-full justify-start text-left font-normal bg-gray-800 border-gray-700 ${!date && "text-gray-400"}`}
//                   >
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {date ? format(date, "PPP") : "Select a date"}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
//                   <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="bg-gray-800" />
//                 </PopoverContent>
//               </Popover>
//             </div>
//           </div>

//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="time" className="text-right">
//               Time
//             </Label>
//             <div className="col-span-3">
//               <Select value={time} onValueChange={setTime}>
//                 <SelectTrigger className="bg-gray-800 border-gray-700">
//                   <SelectValue placeholder="Select a time" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-gray-800 border-gray-700">
//                   {timeOptions.map((timeOption) => (
//                     <SelectItem key={timeOption} value={timeOption}>
//                       {timeOption}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="duration" className="text-right">
//               Duration
//             </Label>
//             <div className="col-span-3">
//               <Select value={duration} onValueChange={setDuration}>
//                 <SelectTrigger className="bg-gray-800 border-gray-700">
//                   <SelectValue placeholder="Select duration" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-gray-800 border-gray-700">
//                   <SelectItem value="15">15 minutes</SelectItem>
//                   <SelectItem value="30">30 minutes</SelectItem>
//                   <SelectItem value="45">45 minutes</SelectItem>
//                   <SelectItem value="60">1 hour</SelectItem>
//                   <SelectItem value="90">1.5 hours</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="topic" className="text-right">
//               Topic
//             </Label>
//             <Input
//               id="topic"
//               value={topic}
//               onChange={(e) => setTopic(e.target.value)}
//               className="col-span-3 bg-gray-800 border-gray-700"
//               placeholder="Discuss collaboration details"
//             />
//           </div>

//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="notes" className="text-right">
//               Notes
//             </Label>
//             <Textarea
//               id="notes"
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               className="col-span-3 bg-gray-800 border-gray-700"
//               placeholder="Any additional information or agenda items"
//             />
//           </div>
//         </div>

//         <DialogFooter>
//           <Button variant="outline" onClick={() => setOpen(false)} className="border-gray-700 text-gray-300">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} className="bg-gray-800 hover:bg-gray-700" disabled={!date || !time}>
//             Send Invitation
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }


// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { CalendarIcon, Clock } from "lucide-react"
// import { format } from "date-fns"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// type ScheduleMeetingProps = {
//   conversationId: string
//   recipientId: string
//   onSchedule: (meeting: any) => void
// }

// export function ScheduleMeeting({ conversationId, recipientId, onSchedule }: ScheduleMeetingProps) {
//   const [date, setDate] = useState<Date | undefined>(undefined)
//   const [time, setTime] = useState("")
//   const [duration, setDuration] = useState("30")
//   const [topic, setTopic] = useState("")
//   const [notes, setNotes] = useState("")
//   const [open, setOpen] = useState(false)

//   const handleSubmit = () => {
//     if (!date || !time) return

//     const meeting = {
//       type: "meeting",
//       date: date.toISOString().split("T")[0],
//       time,
//       duration,
//       topic,
//       notes,
//       conversationId,
//       recipientId,
//       status: "pending",
//     }

//     onSchedule(meeting)
//     setOpen(false)

//     // Reset form
//     setDate(undefined)
//     setTime("")
//     setDuration("30")
//     setTopic("")
//     setNotes("")
//   }

//   const timeOptions = [
//     "09:00",
//     "09:30",
//     "10:00",
//     "10:30",
//     "11:00",
//     "11:30",
//     "12:00",
//     "12:30",
//     "13:00",
//     "13:30",
//     "14:00",
//     "14:30",
//     "15:00",
//     "15:30",
//     "16:00",
//     "16:30",
//     "17:00",
//     "17:30",
//     "18:00",
//     "18:30",
//     "19:00",
//     "19:30",
//     "20:00",
//   ]

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
//           <Clock className="h-5 w-5" />
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[500px] bg-gray-900 text-white border-gray-800">
//         <DialogHeader>
//           <DialogTitle>Schedule a Meeting</DialogTitle>
//           <DialogDescription className="text-gray-400">
//             Propose a time to meet and discuss collaboration details.
//           </DialogDescription>
//         </DialogHeader>

//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="date" className="text-right">
//               Date
//             </Label>
//             <div className="col-span-3">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className={`w-full justify-start text-left font-normal bg-gray-800 border-gray-700 ${!date && "text-gray-400"}`}
//                   >
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {date ? format(date, "PPP") : "Select a date"}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
//                   <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="bg-gray-800" />
//                 </PopoverContent>
//               </Popover>
//             </div>
//           </div>

//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="time" className="text-right">
//               Time
//             </Label>
//             <div className="col-span-3">
//               <Select value={time} onValueChange={setTime}>
//                 <SelectTrigger className="bg-gray-800 border-gray-700">
//                   <SelectValue placeholder="Select a time" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-gray-800 border-gray-700">
//                   {timeOptions.map((timeOption) => (
//                     <SelectItem key={timeOption} value={timeOption}>
//                       {timeOption}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="duration" className="text-right">
//               Duration
//             </Label>
//             <div className="col-span-3">
//               <Select value={duration} onValueChange={setDuration}>
//                 <SelectTrigger className="bg-gray-800 border-gray-700">
//                   <SelectValue placeholder="Select duration" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-gray-800 border-gray-700">
//                   <SelectItem value="15">15 minutes</SelectItem>
//                   <SelectItem value="30">30 minutes</SelectItem>
//                   <SelectItem value="45">45 minutes</SelectItem>
//                   <SelectItem value="60">1 hour</SelectItem>
//                   <SelectItem value="90">1.5 hours</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="topic" className="text-right">
//               Topic
//             </Label>
//             <Input
//               id="topic"
//               value={topic}
//               onChange={(e) => setTopic(e.target.value)}
//               className="col-span-3 bg-gray-800 border-gray-700"
//               placeholder="Discuss collaboration details"
//             />
//           </div>

//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="notes" className="text-right">
//               Notes
//             </Label>
//             <Textarea
//               id="notes"
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               className="col-span-3 bg-gray-800 border-gray-700"
//               placeholder="Any additional information or agenda items"
//             />
//           </div>
//         </div>

//         <DialogFooter>
//           <Button variant="outline" onClick={() => setOpen(false)} className="border-gray-700 text-gray-300">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             className="bg-blue-600 hover:bg-blue-700 text-white"
//             disabled={!date || !time || !topic}
//           >
//             Send Invitation
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }


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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

type ScheduleMeetingProps = {
  conversationId: string
  recipientId: string
  onSchedule: (meeting: any) => void
}

export function ScheduleMeeting({ conversationId, recipientId, onSchedule }: ScheduleMeetingProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState("")
  const [duration, setDuration] = useState("30")
  const [topic, setTopic] = useState("")
  const [notes, setNotes] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    if (!date || !time || !topic.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Format the date in a more readable format
    const formattedDate = format(date, "yyyy-MM-dd")

    const meeting = {
      type: "meeting",
      date: formattedDate,
      time,
      duration,
      topic: topic.trim(),
      notes: notes.trim(),
      conversationId,
      recipientId,
      status: "pending",
    }

    onSchedule(meeting)
    setOpen(false)

    // Reset form
    setDate(undefined)
    setTime("")
    setDuration("30")
    setTopic("")
    setNotes("")
  }

  const timeOptions = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
          <Clock className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle>Schedule a Meeting</DialogTitle>
          <DialogDescription className="text-gray-400">
            Propose a time to meet and discuss collaboration details.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <div className="col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal bg-gray-800 border-gray-700 ${!date && "text-gray-400"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="bg-gray-800" />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Time
            </Label>
            <div className="col-span-3">
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {timeOptions.map((timeOption) => (
                    <SelectItem key={timeOption} value={timeOption}>
                      {timeOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duration
            </Label>
            <div className="col-span-3">
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="topic" className="text-right">
              Topic
            </Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="col-span-3 bg-gray-800 border-gray-700"
              placeholder="Discuss collaboration details"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">
              Notes
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="col-span-3 bg-gray-800 border-gray-700"
              placeholder="Any additional information or agenda items"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="border-gray-700 text-gray-300">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!date || !time || !topic}
          >
            Send Invitation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
