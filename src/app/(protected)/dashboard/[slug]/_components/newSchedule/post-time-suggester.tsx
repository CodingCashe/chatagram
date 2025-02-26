// "use client"

// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Clock } from "lucide-react"

// const mockBestTimes = [
//   { day: "Monday", time: "6:00 PM", engagement: "High" },
//   { day: "Wednesday", time: "12:30 PM", engagement: "Very High" },
//   { day: "Friday", time: "9:00 AM", engagement: "Medium" },
//   { day: "Sunday", time: "8:00 PM", engagement: "High" },
// ]

// export function PostTimeSuggester() {
//   return (
//     <Card className="p-4 bg-gray-900/30 border-gray-800 backdrop-blur-sm">
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <h3 className="text-sm font-medium text-gray-200">Best Times to Post</h3>
//           <Clock className="w-4 h-4 text-gray-400" />
//         </div>
//         <div className="space-y-3">
//           {mockBestTimes.map((time) => (
//             <div
//               key={`${time.day}-${time.time}`}
//               className="flex items-center justify-between p-2 rounded-lg bg-gray-800/50"
//             >
//               <div className="space-y-1">
//                 <p className="text-sm font-medium text-gray-300">{time.day}</p>
//                 <p className="text-xs text-gray-400">{time.time}</p>
//               </div>
//               <span
//                 className={`text-xs px-2 py-1 rounded-full ${
//                   time.engagement === "Very High"
//                     ? "bg-green-500/20 text-green-400"
//                     : time.engagement === "High"
//                       ? "bg-blue-500/20 text-blue-400"
//                       : "bg-yellow-500/20 text-yellow-400"
//                 }`}
//               >
//                 {time.engagement}
//               </span>
//             </div>
//           ))}
//         </div>
//         <Button variant="ghost" className="w-full text-sm bg-gray-800/50 hover:bg-gray-700/50">
//           View Full Analysis
//         </Button>
//       </div>
//     </Card>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface TimeSuggestion {
  day: string
  time: string
  engagement: string
}

export function PostTimeSuggester() {
  const [loading, setLoading] = useState(true)
  const [bestTimes, setBestTimes] = useState<TimeSuggestion[]>([])

  useEffect(() => {
    fetchPostTimeSuggestions()
  }, [])

  const fetchPostTimeSuggestions = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "getPostTimeSuggestions" }),
      })
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      setBestTimes(data.timeSuggestions)
    } catch (error) {
      console.error("Error fetching post time suggestions:", error)
      toast.error("Failed to fetch post time suggestions. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-4 bg-gray-900/30 border-gray-800 backdrop-blur-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-200">Best Times to Post</h3>
          <Clock className="w-4 h-4 text-gray-400" />
        </div>
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="space-y-3">
            {bestTimes.map((time) => (
              <div
                key={`${time.day}-${time.time}`}
                className="flex items-center justify-between p-2 rounded-lg bg-gray-800/50"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-300">{time.day}</p>
                  <p className="text-xs text-gray-400">{time.time}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    time.engagement === "Very High"
                      ? "bg-green-500/20 text-green-400"
                      : time.engagement === "High"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {time.engagement}
                </span>
              </div>
            ))}
          </div>
        )}
        <Button
          variant="ghost"
          className="w-full text-sm bg-gray-800/50 hover:bg-gray-700/50"
          onClick={fetchPostTimeSuggestions}
        >
          Refresh Analysis
        </Button>
      </div>
    </Card>
  )
}

