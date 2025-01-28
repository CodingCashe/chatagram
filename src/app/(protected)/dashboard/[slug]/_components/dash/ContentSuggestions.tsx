// 'use client'

// import React, { useState } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Loader2, RefreshCw } from 'lucide-react'

// const ContentSuggestions = () => {
//   const [loading, setLoading] = useState(false)
//   const [suggestions, setSuggestions] = useState<string[]>([])

//   const generateSuggestions = async () => {
//     setLoading(true)
//     // Simulating API call to AI service
//     await new Promise(resolve => setTimeout(resolve, 2000))
//     const newSuggestions = [
//       "Share a behind-the-scenes look at your creative process",
//       "Create a poll asking followers about their favorite product",
//       "Post a user-generated content challenge",
//       "Share an inspiring quote related to your niche",
//       "Create a tutorial video on how to use your product"
//     ]
//     setSuggestions(newSuggestions)
//     setLoading(false)
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex justify-between items-center">
//           AI Content Suggestions
//           <Button size="sm" onClick={generateSuggestions} disabled={loading}>
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
//             Generate
//           </Button>
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         {suggestions.length > 0 ? (
//           <ul className="space-y-2">
//             {suggestions.map((suggestion, index) => (
//               <li key={index} className="bg-secondary p-2 rounded-md">{suggestion}</li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-center text-muted-foreground">Click generate to get AI-powered content suggestions</p>
//         )}
//       </CardContent>
//     </Card>
//   )
// }

// export default ContentSuggestions


// "use client"

// import React, { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Loader2, RefreshCw, Sparkles } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"

// const ContentSuggestions = () => {
//   const [loading, setLoading] = useState(false)
//   const [suggestions, setSuggestions] = useState<string[]>([])

//   const generateSuggestions = async () => {
//     setLoading(true)
//     // Simulating API call to AI service
//     await new Promise((resolve) => setTimeout(resolve, 2000))
//     const newSuggestions = [
//       "Share a behind-the-scenes look at your creative process",
//       "Create a poll asking followers about their favorite product",
//       "Post a user-generated content challenge",
//       "Share an inspiring quote related to your niche",
//       "Create a tutorial video on how to use your product",
//     ]
//     setSuggestions(newSuggestions)
//     setLoading(false)
//   }

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const elements = document.querySelectorAll(".suggestion-item")
//       elements.forEach((el) => {
//         el.classList.add("pulse")
//         setTimeout(() => el.classList.remove("pulse"), 1000)
//       })
//     }, 5000)

//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <Card className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 border-gray-700 shadow-xl overflow-hidden">
//       <CardHeader className="relative">
//         <CardTitle className="flex justify-between items-center z-10">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
//             AI Content Suggestions
//           </span>
//           <Button
//             size="sm"
//             onClick={generateSuggestions}
//             disabled={loading}
//             className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-none"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
//             Generate
//           </Button>
//         </CardTitle>
//         <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
//         <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
//       </CardHeader>
//       <CardContent className="relative">
//         <AnimatePresence>
//           {suggestions.length > 0 ? (
//             <motion.ul
//               className="space-y-2"
//               initial="hidden"
//               animate="visible"
//               exit="hidden"
//               variants={{
//                 visible: { transition: { staggerChildren: 0.1 } },
//               }}
//             >
//               {suggestions.map((suggestion, index) => (
//                 <motion.li
//                   key={index}
//                   className="suggestion-item bg-gray-800 bg-opacity-50 p-3 rounded-md border border-gray-700 shadow-lg backdrop-filter backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-opacity-70 hover:border-purple-500"
//                   variants={{
//                     hidden: { opacity: 0, y: 20 },
//                     visible: { opacity: 1, y: 0 },
//                   }}
//                 >
//                   <div className="flex items-start">
//                     <Sparkles className="w-5 h-5 text-purple-400 mr-2 mt-1 flex-shrink-0" />
//                     <span>{suggestion}</span>
//                   </div>
//                 </motion.li>
//               ))}
//             </motion.ul>
//           ) : (
//             <motion.p
//               className="text-center text-gray-400 py-8"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             >
//               Click generate to get AI-powered content suggestions
//             </motion.p>
//           )}
//         </AnimatePresence>
//       </CardContent>
//       <style jsx>{`
//         @keyframes pulse {
//           0% { box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.7); }
//           70% { box-shadow: 0 0 0 10px rgba(147, 51, 234, 0); }
//           100% { box-shadow: 0 0 0 0 rgba(147, 51, 234, 0); }
//         }
//         .suggestion-item.pulse {
//           animation: pulse 1s;
//         }
//       `}</style>
//     </Card>
//   )
// }

// export default ContentSuggestions

"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const ContentSuggestions = () => {
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const generateSuggestions = async () => {
    setLoading(true)
    // Simulating API call to AI service
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const newSuggestions = [
      "Share a behind-the-scenes look at your creative process",
      "Create a poll asking followers about their favorite product",
      "Post a user-generated content challenge",
      "Share an inspiring quote related to your niche",
      "Create a tutorial video on how to use your product",
    ]
    setSuggestions(newSuggestions)
    setLoading(false)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const elements = document.querySelectorAll(".suggestion-item")
      elements.forEach((el) => {
        el.classList.add("pulse")
        setTimeout(() => el.classList.remove("pulse"), 1000)
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="w-full bg-gradient-to-br from-[#333333] via-[#2E2E2E] to-[#292929] text-white border border-[#3352CC] shadow-2xl overflow-hidden">
      <CardHeader className="relative">
        <CardTitle className="flex justify-between items-center z-10">
          <span className="text-white font-bold">AI Content Suggestions</span>
          <Button
            size="sm"
            onClick={generateSuggestions}
            disabled={loading}
            className="bg-[#3352CC] text-white hover:bg-[#2A41A3] border-none"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            Generate
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <AnimatePresence>
          {suggestions.length > 0 ? (
            <motion.ul
              className="space-y-2"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {suggestions.map((suggestion, index) => (
                <motion.li
                  key={index}
                  className="suggestion-item bg-[#333333] p-3 rounded-md border border-[#3352CC] shadow-lg backdrop-filter backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-[#2E2E2E]"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <div className="flex items-start">
                    <Sparkles className="w-5 h-5 text-[#3352CC] mr-2 mt-1 flex-shrink-0" />
                    <span>{suggestion}</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <motion.p
              className="text-center text-gray-400 py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Click generate to get AI-powered content suggestions
            </motion.p>
          )}
        </AnimatePresence>
      </CardContent>
      <style jsx>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(51, 82, 204, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(51, 82, 204, 0); }
          100% { box-shadow: 0 0 0 0 rgba(51, 82, 204, 0); }
        }
        .suggestion-item.pulse {
          animation: pulse 1s;
        }
      `}</style>
    </Card>
  )
}

export default ContentSuggestions

