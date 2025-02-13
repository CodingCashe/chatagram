// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { RefreshCw } from "lucide-react"

// interface Idea {
//   title: string
//   description: string
// }

// export default function ContentInspiration() {
//   const [ideas, setIdeas] = useState<Idea[]>([])
//   const [keyword, setKeyword] = useState("")

//   const fetchIdeas = async () => {
//     // TODO: Implement API call to get content ideas
//     const response = await fetch(`/api/content-ideas?keyword=${keyword}`)
//     const data = await response.json()
//     setIdeas(data.ideas)
//   }

//   useEffect(() => {
//     fetchIdeas()
//   }, [keyword]) // Added keyword to dependencies

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
//       <Card className="bg-gray-800/50 border-2 border-purple-500/50 rounded-xl overflow-hidden shadow-lg shadow-purple-500/20 backdrop-blur-sm">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold text-white">Content Inspiration</CardTitle>
//           <CardDescription className="text-gray-300">Get fresh ideas for your posts</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex space-x-2 mb-4">
//             <Input
//               placeholder="Enter a keyword for inspiration"
//               value={keyword}
//               onChange={(e) => setKeyword(e.target.value)}
//               className="bg-gray-700/50 border-gray-600 text-gray-200"
//             />
//             <Button onClick={fetchIdeas} className="bg-purple-600 hover:bg-purple-700 text-white">
//               <RefreshCw className="mr-2 h-4 w-4" />
//               Refresh
//             </Button>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {ideas.map((idea, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//               >
//                 <Card className="bg-gray-700/50 border-gray-600">
//                   <CardHeader>
//                     <CardTitle className="text-lg font-semibold text-white">{idea.title}</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-gray-300">{idea.description}</p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { RefreshCw } from "lucide-react"

// interface Idea {
//   title: string
//   description: string
// }

// export default function ContentInspiration() {
//   const [ideas, setIdeas] = useState<Idea[]>([])
//   const [keyword, setKeyword] = useState("")

//   const fetchIdeas = async () => {
//     // TODO: Implement API call to get content ideas
//     const response = await fetch(`/api/content-ideas?keyword=${keyword}`)
//     const data = await response.json()
//     setIdeas(data.ideas)
//   }

//   useEffect(() => {
//     fetchIdeas()
//   }, [keyword])

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
//       <Card className="bg-gray-800 border-2 border-gray-600 rounded-xl overflow-hidden shadow-lg shadow-gray-900/20 backdrop-blur-sm">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold text-white">Content Inspiration</CardTitle>
//           <CardDescription className="text-gray-300">Get fresh ideas for your posts</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
//             <Input
//               placeholder="Enter a keyword for inspiration"
//               value={keyword}
//               onChange={(e) => setKeyword(e.target.value)}
//               className="bg-gray-700 border-gray-600 text-gray-200"
//             />
//             <Button onClick={fetchIdeas} className="bg-gray-600 hover:bg-gray-500 text-white">
//               <RefreshCw className="mr-2 h-4 w-4" />
//               Refresh
//             </Button>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {ideas.map((idea, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//               >
//                 <Card className="bg-gray-700 border-gray-600 hover:bg-gray-600 transition-colors duration-300">
//                   <CardHeader>
//                     <CardTitle className="text-lg font-semibold text-white">{idea.title}</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-gray-300">{idea.description}</p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   )
// }

"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Idea {
  title: string
  description: string
}

export default function ContentInspiration() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [keyword, setKeyword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const fetchIdeas = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/content-ideas?keyword=${encodeURIComponent(keyword)}`)
      if (!response.ok) {
        throw new Error("Failed to fetch content ideas")
      }
      const data = await response.json()
      setIdeas(data.ideas)
    } catch (error) {
      console.error("Error fetching content ideas:", error)
      toast({
        title: "Error",
        description: "Failed to fetch content ideas. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [keyword, toast])

  useEffect(() => {
    if (keyword) {
      fetchIdeas()
    }
  }, [keyword, fetchIdeas])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <Card className="bg-gray-800 border-2 border-gray-600 rounded-xl overflow-hidden shadow-lg shadow-gray-900/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Content Inspiration</CardTitle>
          <CardDescription className="text-gray-300">Get fresh ideas for your posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
            <Input
              placeholder="Enter a keyword for inspiration"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="bg-gray-700 border-gray-600 text-gray-200"
            />
            <Button onClick={fetchIdeas} className="bg-gray-600 hover:bg-gray-500 text-white" disabled={isLoading}>
              <RefreshCw className="mr-2 h-4 w-4" />
              {isLoading ? "Loading..." : "Refresh"}
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ideas.map((idea, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="bg-gray-700 border-gray-600 hover:bg-gray-600 transition-colors duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-white">{idea.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{idea.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

