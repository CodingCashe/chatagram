// "use client"

// import { useState } from "react"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { toast } from "sonner"
// import { Copy, Loader2, Sparkles } from "lucide-react"
// import { AnimatePresence, motion } from "framer-motion"

// const mockSuggestions = [
//   {
//     title: "Day in the Life",
//     description: "Share authentic moments from your daily routine to connect with your audience",
//     examples: [
//       "Morning routine highlights with your favorite productivity tips",
//       "Behind-the-scenes of your creative process or workspace",
//       "Evening wind-down routine for work-life balance",
//     ],
//   },
//   {
//     title: "Educational Series",
//     description: "Create valuable, bite-sized learning content for your followers",
//     examples: [
//       "Quick tutorial on your area of expertise",
//       "Top 3 tips for beginners in your field",
//       "Common mistakes to avoid in your industry",
//     ],
//   },
//   {
//     title: "Community Engagement",
//     description: "Foster meaningful interactions with your followers through engaging prompts",
//     examples: [
//       "Ask Me Anything (AMA) session about your expertise",
//       "Share a challenge and ask followers how they'd solve it",
//       "Create a poll about topics your audience wants to learn more about",
//     ],
//   },
//   {
//     title: "Success Story Spotlight",
//     description: "Highlight achievements and learning experiences to inspire others",
//     examples: [
//       "Share a recent win and the journey to achieve it",
//       "Feature a client/customer transformation story",
//       "Discuss a failure and the valuable lessons learned",
//     ],
//   },
//   {
//     title: "Industry Insights",
//     description: "Share your expert perspective on current trends and developments",
//     examples: [
//       "Break down a new trend in your industry",
//       "Predict upcoming changes in your field",
//       "Share your take on a recent industry announcement",
//     ],
//   },
// ]

// export function ContentSuggestions() {
//   const [topic, setTopic] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [suggestions, setSuggestions] = useState<typeof mockSuggestions>([])

//   const generateSuggestions = async () => {
//     try {
//       setLoading(true)
//       // Simulate API call - replace with actual API integration
//       await new Promise((resolve) => setTimeout(resolve, 1500))
//       setSuggestions(mockSuggestions)
//       toast.success("Content suggestions generated!")
//     } catch (error) {
//       toast.error("Failed to generate suggestions")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text)
//     toast.success("Content idea copied to clipboard")
//   }

//   return (
//     <div className="space-y-6">
//       <Card className="p-6 bg-gray-900/30 border-gray-800 backdrop-blur-sm">
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <h3 className="text-lg font-semibold text-gray-200">Content Idea Generator</h3>
//             <p className="text-sm text-gray-400">Get AI-powered content suggestions based on your topic or niche</p>
//           </div>

//           <div className="flex gap-3">
//             <Input
//               placeholder="Enter your topic or niche..."
//               value={topic}
//               onChange={(e) => setTopic(e.target.value)}
//               className="bg-gray-800/50 border-gray-700"
//             />
//             <Button
//               onClick={generateSuggestions}
//               disabled={loading || !topic}
//               className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
//             >
//               {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
//               Generate
//             </Button>
//           </div>
//         </div>
//       </Card>

//       <AnimatePresence>
//         {suggestions.map((suggestion, index) => (
//           <motion.div
//             key={suggestion.title}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <Card className="p-6 bg-gray-900/30 border-gray-800 backdrop-blur-sm group">
//               <div className="space-y-4">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h4 className="text-md font-medium text-gray-200">{suggestion.title}</h4>
//                     <p className="text-sm text-gray-400 mt-1">{suggestion.description}</p>
//                   </div>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="opacity-0 group-hover:opacity-100 transition-opacity"
//                     onClick={() =>
//                       copyToClipboard(
//                         `${suggestion.title}\n\n${suggestion.description}\n\nExamples:\n${suggestion.examples.join("\n")}`,
//                       )
//                     }
//                   >
//                     <Copy className="w-4 h-4" />
//                   </Button>
//                 </div>
//                 <div className="space-y-2">
//                   {suggestion.examples.map((example, i) => (
//                     <div
//                       key={i}
//                       className="bg-gray-800/50 p-3 rounded-lg text-sm text-gray-300 group/item flex justify-between items-center"
//                     >
//                       <span>{example}</span>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="h-8 w-8 opacity-0 group-hover/item:opacity-100 transition-opacity"
//                         onClick={() => copyToClipboard(example)}
//                       >
//                         <Copy className="w-3 h-3" />
//                       </Button>
//                     </div>
//                   ))}
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
import { toast } from "sonner"
import { Copy, Loader2, Sparkles } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

interface ContentSuggestion {
  title: string
  description: string
  examples: string[]
}

export function ContentSuggestions() {
  const [topic, setTopic] = useState("")
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([])

  const generateSuggestions = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generateContentSuggestions", topic }),
      })
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      setSuggestions(data.suggestions)
      toast.success("Content suggestions generated!")
    } catch (error) {
      console.error("Error generating suggestions:", error)
      toast.error("Failed to generate suggestions. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Content idea copied to clipboard")
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gray-900/30 border-gray-800 backdrop-blur-sm">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-200">Content Idea Generator</h3>
            <p className="text-sm text-gray-400">Get AI-powered content suggestions based on your topic or niche</p>
          </div>

          <div className="flex gap-3">
            <Input
              placeholder="Enter your topic or niche..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-gray-800/50 border-gray-700"
            />
            <Button
              onClick={generateSuggestions}
              disabled={loading || !topic}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
              Generate
            </Button>
          </div>
        </div>
      </Card>

      <AnimatePresence>
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 bg-gray-900/30 border-gray-800 backdrop-blur-sm group">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-md font-medium text-gray-200">{suggestion.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">{suggestion.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() =>
                      copyToClipboard(
                        `${suggestion.title}\n\n${suggestion.description}\n\nExamples:\n${suggestion.examples.join("\n")}`,
                      )
                    }
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {suggestion.examples.map((example, i) => (
                    <div
                      key={i}
                      className="bg-gray-800/50 p-3 rounded-lg text-sm text-gray-300 group/item flex justify-between items-center"
                    >
                      <span>{example}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover/item:opacity-100 transition-opacity"
                        onClick={() => copyToClipboard(example)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

