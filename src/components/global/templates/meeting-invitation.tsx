// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { CalendarDays, Clock, CheckCircle, XCircle } from "lucide-react"
// import { toast } from "@/hooks/use-toast"

// type MeetingInvitationProps = {
//   topic: string
//   date: string
//   time: string
//   duration: string
//   notes?: string
//   status?: "pending" | "accepted" | "declined"
//   onAccept?: () => void
//   onDecline?: () => void
//   isCurrentUserSender: boolean
// }

// export function MeetingInvitation({
//   topic,
//   date,
//   time,
//   duration,
//   notes,
//   status = "pending",
//   onAccept,
//   onDecline,
//   isCurrentUserSender,
// }: MeetingInvitationProps) {
//   const [currentStatus, setCurrentStatus] = useState(status)

//   const handleAccept = () => {
//     setCurrentStatus("accepted")
//     if (onAccept) onAccept()

//     // Add to calendar functionality
//     try {
//       const startDate = new Date(`${date}T${time}`)
//       const endDate = new Date(startDate.getTime() + Number.parseInt(duration) * 60000)

//       const calendarEvent = {
//         title: topic,
//         description: notes,
//         startTime: startDate.toISOString(),
//         endTime: endDate.toISOString(),
//         location: "Online Meeting",
//       }

//       // In a real implementation, this would create a calendar event
//       console.log("Calendar event:", calendarEvent)

//       toast({
//         title: "Meeting Accepted",
//         description: "Meeting has been added to your calendar",
//         variant: "success",
//       })
//     } catch (error) {
//       console.error("Error adding to calendar:", error)
//     }
//   }

//   const handleDecline = () => {
//     setCurrentStatus("declined")
//     if (onDecline) onDecline()

//     toast({
//       title: "Meeting Declined",
//       description: "You have declined this meeting invitation",
//       variant: "info",
//     })
//   }

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString(undefined, {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     })
//   }

//   return (
//     <Card
//       className={`w-full max-w-md border ${
//         currentStatus === "accepted"
//           ? "border-green-600/30 bg-green-950/20"
//           : currentStatus === "declined"
//             ? "border-red-600/30 bg-red-950/20"
//             : "border-blue-600/30 bg-blue-950/20"
//       }`}
//     >
//       <CardHeader className="pb-2">
//         <CardTitle className="text-lg flex items-center gap-2">
//           <CalendarDays className="h-5 w-5 text-blue-400" />
//           <span>{topic}</span>
//           {currentStatus === "accepted" && (
//             <span className="ml-auto text-xs bg-green-900/50 text-green-400 px-2 py-1 rounded-full flex items-center gap-1">
//               <CheckCircle className="h-3 w-3" /> Accepted
//             </span>
//           )}
//           {currentStatus === "declined" && (
//             <span className="ml-auto text-xs bg-red-900/50 text-red-400 px-2 py-1 rounded-full flex items-center gap-1">
//               <XCircle className="h-3 w-3" /> Declined
//             </span>
//           )}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-2 pt-0">
//         <div className="grid grid-cols-[20px_1fr] gap-x-2 items-center text-sm">
//           <CalendarDays className="h-4 w-4 text-gray-400" />
//           <span>{formatDate(date)}</span>

//           <Clock className="h-4 w-4 text-gray-400" />
//           <div className="flex items-center gap-2">
//             <span>{time}</span>
//             <span className="text-gray-500">({duration} minutes)</span>
//           </div>
//         </div>

//         {notes && <div className="mt-2 text-sm text-gray-400 border-t border-gray-800 pt-2">{notes}</div>}
//       </CardContent>

//       {currentStatus === "pending" && !isCurrentUserSender && (
//         <CardFooter className="flex justify-end gap-2 pt-0">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={handleDecline}
//             className="border-gray-700 hover:bg-red-900/20 hover:text-red-400 hover:border-red-800/50"
//           >
//             Decline
//           </Button>
//           <Button size="sm" onClick={handleAccept} className="bg-blue-600 hover:bg-blue-700">
//             Accept
//           </Button>
//         </CardFooter>
//       )}

//       {isCurrentUserSender && currentStatus === "pending" && (
//         <CardFooter className="pt-0">
//           <p className="text-xs text-gray-500">Waiting for response...</p>
//         </CardFooter>
//       )}
//     </Card>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, CheckCircle, XCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface MeetingInvitationProps {
  topic: string
  date: string
  time: string
  duration: string
  notes?: string
  status?: "pending" | "accepted" | "declined"
  onAccept?: () => void
  onDecline?: () => void
  isCurrentUserSender?: boolean
}

// Update the MeetingInvitation component to handle the new approach
export function MeetingInvitation({
  topic,
  date,
  time,
  duration,
  notes,
  status = "pending",
  onAccept,
  onDecline,
  isCurrentUserSender,
}: MeetingInvitationProps) {
  const [currentStatus, setCurrentStatus] = useState(status)

  // Update the local status when the prop changes
  useEffect(() => {
    setCurrentStatus(status)
  }, [status])

  const handleAccept = () => {
    setCurrentStatus("accepted")
    if (onAccept) onAccept()

    // Add to calendar functionality
    try {
      const startDate = new Date(`${date}T${time}`)
      const endDate = new Date(startDate.getTime() + Number.parseInt(duration) * 60000)

      const calendarEvent = {
        title: topic,
        description: notes,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        location: "Online Meeting",
      }

      // In a real implementation, this would create a calendar event
      console.log("Calendar event:", calendarEvent)

      toast({
        title: "Meeting Accepted",
        description: "Meeting has been added to your calendar",
        variant: "success",
      })
    } catch (error) {
      console.error("Error adding to calendar:", error)
    }
  }

  const handleDecline = () => {
    setCurrentStatus("declined")
    if (onDecline) onDecline()

    toast({
      title: "Meeting Declined",
      description: "You have declined this meeting invitation",
      variant: "info",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card
      className={`w-full max-w-md border ${
        currentStatus === "accepted"
          ? "border-green-600/30 bg-green-950/20"
          : currentStatus === "declined"
            ? "border-red-600/30 bg-red-950/20"
            : "border-blue-600/30 bg-blue-950/20"
      }`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-blue-400" />
          <span>{topic}</span>
          {currentStatus === "accepted" && (
            <span className="ml-auto text-xs bg-green-900/50 text-green-400 px-2 py-1 rounded-full flex items-center gap-1">
              <CheckCircle className="h-3 w-3" /> Accepted
            </span>
          )}
          {currentStatus === "declined" && (
            <span className="ml-auto text-xs bg-red-900/50 text-red-400 px-2 py-1 rounded-full flex items-center gap-1">
              <XCircle className="h-3 w-3" /> Declined
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        <div className="grid grid-cols-[20px_1fr] gap-x-2 items-center text-sm">
          <CalendarDays className="h-4 w-4 text-gray-400" />
          <span>{formatDate(date)}</span>

          <Clock className="h-4 w-4 text-gray-400" />
          <div className="flex items-center gap-2">
            <span>{time}</span>
            <span className="text-gray-500">({duration} minutes)</span>
          </div>
        </div>

        {notes && <div className="mt-2 text-sm text-gray-400 border-t border-gray-800 pt-2">{notes}</div>}
      </CardContent>

      {currentStatus === "pending" && !isCurrentUserSender && (
        <CardFooter className="flex justify-end gap-2 pt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDecline}
            className="border-gray-700 hover:bg-red-900/20 hover:text-red-400 hover:border-red-800/50"
          >
            Decline
          </Button>
          <Button size="sm" onClick={handleAccept} className="bg-blue-600 hover:bg-blue-700">
            Accept
          </Button>
        </CardFooter>
      )}

      {isCurrentUserSender && currentStatus === "pending" && (
        <CardFooter className="pt-0">
          <p className="text-xs text-gray-500">Waiting for response...</p>
        </CardFooter>
      )}
    </Card>
  )
}
