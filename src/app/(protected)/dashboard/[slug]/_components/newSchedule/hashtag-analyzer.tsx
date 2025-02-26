// "use client"

// import { useState } from "react"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Progress } from "@/components/ui/progress"
// import { motion, AnimatePresence } from "framer-motion"
// import { Hash, Loader2, TrendingUp, Copy } from "lucide-react"
// import { toast } from "sonner"

// // Mock data with realistic Instagram hashtag metrics
// const mockHashtags = [
//   {
//     tag: "#digitalmarketing",
//     posts: 28500000,
//     engagement: 92,
//     competition: 78,
//     trending: true,
//     reachPotential: "High",
//     avgLikes: 1200,
//     related: ["#socialmedia", "#marketing", "#business", "#entrepreneur"],
//     bestTimeToUse: "Weekdays 9AM-11AM",
//     popularityTrend: "Increasing",
//   },
//   {
//     tag: "#contentcreator",
//     posts: 15700000,
//     engagement: 85,
//     competition: 65,
//     trending: true,
//     reachPotential: "Medium",
//     avgLikes: 850,
//     related: ["#creator", "#influencer", "#socialmedia", "#content"],
//     bestTimeToUse: "Daily 6PM-8PM",
//     popularityTrend: "Stable",
//   },
//   {
//     tag: "#instagramtips",
//     posts: 5200000,
//     engagement: 76,
//     competition: 45,
//     trending: false,
//     reachPotential: "Medium",
//     avgLikes: 650,
//     related: ["#instagramstrategy", "#socialmediatips", "#growyourinstagram"],
//     bestTimeToUse: "Weekends 2PM-4PM",
//     popularityTrend: "Stable",
//   },
// ]

// export function HashtagAnalyzer() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [hashtags, setHashtags] = useState<typeof mockHashtags>([])

//   const analyzeHashtags = async () => {
//     setLoading(true)
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1500))
//     setHashtags(mockHashtags)
//     setLoading(false)
//   }

//   const copyToClipboard = (hashtags: string[]) => {
//     navigator.clipboard.writeText(hashtags.join(" "))
//     toast.success("Hashtags copied to clipboard")
//   }

//   return (
//     <div className="space-y-6">
//       <Card className="p-6 bg-gray-900/30 border-gray-800 backdrop-blur-sm">
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <h3 className="text-lg font-semibold text-gray-200">Hashtag Performance Analyzer</h3>
//             <p className="text-sm text-gray-400">
//               Analyze hashtags to optimize your reach and engagement. Get real-time metrics, trends, and
//               recommendations.
//             </p>
//           </div>

//           <div className="flex gap-3">
//             <Input
//               placeholder="Enter a hashtag to analyze (without #)..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="bg-gray-800/50 border-gray-700"
//             />
//             <Button
//               onClick={analyzeHashtags}
//               disabled={loading || !searchTerm}
//               className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
//             >
//               {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Hash className="w-4 h-4 mr-2" />}
//               Analyze
//             </Button>
//           </div>
//         </div>
//       </Card>

//       <AnimatePresence>
//         {hashtags.map((hashtag, index) => (
//           <motion.div
//             key={hashtag.tag}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <Card className="p-6 bg-gray-900/30 border-gray-800 backdrop-blur-sm">
//               <div className="space-y-6">
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <h4 className="text-md font-medium text-gray-200 flex items-center gap-2">
//                       {hashtag.tag}
//                       {hashtag.trending && <TrendingUp className="w-4 h-4 text-green-500" />}
//                     </h4>
//                     <p className="text-sm text-gray-400 mt-1">
//                       {hashtag.posts.toLocaleString()} posts • {hashtag.avgLikes.toLocaleString()} avg. likes
//                     </p>
//                   </div>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => copyToClipboard([hashtag.tag, ...hashtag.related])}
//                     className="text-gray-400 hover:text-gray-300"
//                   >
//                     <Copy className="w-4 h-4 mr-2" />
//                     Copy All
//                   </Button>
//                 </div>

//                 <div className="grid gap-4 sm:grid-cols-2">
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-400">Engagement Rate</span>
//                       <span className="text-gray-300">{hashtag.engagement}%</span>
//                     </div>
//                     <Progress
//                       value={hashtag.engagement}
//                       className={`h-2 bg-gray-800 [&>div]:${
//                         hashtag.engagement > 80
//                           ? "bg-green-500"
//                           : hashtag.engagement > 60
//                             ? "bg-yellow-500"
//                             : "bg-red-500"
//                       }`}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-400">Competition Level</span>
//                       <span className="text-gray-300">{hashtag.competition}%</span>
//                     </div>
//                     <Progress
//                       value={hashtag.competition}
//                       className={`h-2 bg-gray-800 [&>div]:${
//                         hashtag.competition > 80
//                           ? "bg-red-500"
//                           : hashtag.competition > 60
//                             ? "bg-yellow-500"
//                             : "bg-green-500"
//                       }`}
//                     />
//                   </div>
//                 </div>

//                 <div className="grid gap-4 sm:grid-cols-2">
//                   <div className="bg-gray-800/50 rounded-lg p-3">
//                     <h5 className="text-sm font-medium text-gray-300 mb-2">Best Time to Post</h5>
//                     <p className="text-sm text-gray-400">{hashtag.bestTimeToUse}</p>
//                   </div>
//                   <div className="bg-gray-800/50 rounded-lg p-3">
//                     <h5 className="text-sm font-medium text-gray-300 mb-2">Reach Potential</h5>
//                     <p className="text-sm text-gray-400">{hashtag.reachPotential}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <h5 className="text-sm font-medium text-gray-300 mb-3">Related Hashtags</h5>
//                   <div className="flex flex-wrap gap-2">
//                     {hashtag.related.map((tag) => (
//                       <div
//                         key={tag}
//                         className="group relative text-sm text-gray-300 bg-gray-800/50 px-3 py-1 rounded-full flex items-center gap-2"
//                       >
//                         {tag}
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
//                           onClick={() => copyToClipboard([tag])}
//                         >
//                           <Copy className="w-3 h-3" />
//                         </Button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </Card>
//           </motion.div>
//         ))}
//       </AnimatePresence>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { Hash, Loader2, TrendingUp, Copy } from "lucide-react"
import { toast } from "sonner"

interface HashtagAnalysis {
  tag: string
  posts: number
  engagement: number
  competition: number
  trending: boolean
  reachPotential: string
  avgLikes: number
  related: string[]
  bestTimeToUse: string
  popularityTrend: string
}

export function HashtagAnalyzer() {
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [hashtags, setHashtags] = useState<HashtagAnalysis[]>([])

  const analyzeHashtags = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "analyzeHashtag", hashtag: searchTerm }),
      })
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      setHashtags([data])
      toast.success("Hashtag analysis complete!")
    } catch (error) {
      console.error("Error analyzing hashtag:", error)
      toast.error("Failed to analyze hashtag. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (hashtags: string[]) => {
    navigator.clipboard.writeText(hashtags.join(" "))
    toast.success("Hashtags copied to clipboard")
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gray-900/30 border-gray-800 backdrop-blur-sm">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-200">Hashtag Performance Analyzer</h3>
            <p className="text-sm text-gray-400">
              Analyze hashtags to optimize your reach and engagement. Get real-time metrics, trends, and
              recommendations.
            </p>
          </div>

          <div className="flex gap-3">
            <Input
              placeholder="Enter a hashtag to analyze (without #)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800/50 border-gray-700"
            />
            <Button
              onClick={analyzeHashtags}
              disabled={loading || !searchTerm}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Hash className="w-4 h-4 mr-2" />}
              Analyze
            </Button>
          </div>
        </div>
      </Card>

      <AnimatePresence>
        {hashtags.map((hashtag, index) => (
          <motion.div
            key={hashtag.tag}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 bg-gray-900/30 border-gray-800 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-md font-medium text-gray-200 flex items-center gap-2">
                      {hashtag.tag}
                      {hashtag.trending && <TrendingUp className="w-4 h-4 text-green-500" />}
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">
                      {hashtag.posts.toLocaleString()} posts • {hashtag.avgLikes.toLocaleString()} avg. likes
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard([hashtag.tag, ...hashtag.related])}
                    className="text-gray-400 hover:text-gray-300"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All
                  </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Engagement Rate</span>
                      <span className="text-gray-300">{hashtag.engagement}%</span>
                    </div>
                    <Progress
                      value={hashtag.engagement}
                      className={`h-2 bg-gray-800 [&>div]:${
                        hashtag.engagement > 80
                          ? "bg-green-500"
                          : hashtag.engagement > 60
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Competition Level</span>
                      <span className="text-gray-300">{hashtag.competition}%</span>
                    </div>
                    <Progress
                      value={hashtag.competition}
                      className={`h-2 bg-gray-800 [&>div]:${
                        hashtag.competition > 80
                          ? "bg-red-500"
                          : hashtag.competition > 60
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <h5 className="text-sm font-medium text-gray-300 mb-2">Best Time to Post</h5>
                    <p className="text-sm text-gray-400">{hashtag.bestTimeToUse}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <h5 className="text-sm font-medium text-gray-300 mb-2">Reach Potential</h5>
                    <p className="text-sm text-gray-400">{hashtag.reachPotential}</p>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-300 mb-3">Related Hashtags</h5>
                  <div className="flex flex-wrap gap-2">
                    {hashtag.related.map((tag) => (
                      <div
                        key={tag}
                        className="group relative text-sm text-gray-300 bg-gray-800/50 px-3 py-1 rounded-full flex items-center gap-2"
                      >
                        {tag}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard([tag])}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

