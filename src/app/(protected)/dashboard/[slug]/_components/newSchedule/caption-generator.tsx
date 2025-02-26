// "use client"

// import { useState } from "react"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageSquareText, Loader2, Copy } from "lucide-react"
// import { toast } from "sonner"

// const tones = [
//   { value: "professional", label: "Professional" },
//   { value: "casual", label: "Casual" },
//   { value: "funny", label: "Funny" },
//   { value: "inspirational", label: "Inspirational" },
// ]

// const mockCaptions = [
//   {
//     text: "✨ Turning dreams into reality, one pixel at a time. Every creation is a story waiting to be told. What's your story? 🎨 #DigitalArt #CreativeProcess",
//     tone: "inspirational",
//   },
//   {
//     text: "Just another day at the office... if your office is full of coffee ☕️ and creative chaos! 😅 Who else's workspace looks like a beautiful mess? 🎨",
//     tone: "casual",
//   },
//   // Add more mock captions
// ]

// export function CaptionGenerator() {
//   const [prompt, setPrompt] = useState("")
//   const [tone, setTone] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [captions, setCaptions] = useState<typeof mockCaptions>([])

//   const generateCaptions = async () => {
//     setLoading(true)
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1500))
//     setCaptions(mockCaptions)
//     setLoading(false)
//   }

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text)
//     toast.success("Caption copied to clipboard")
//   }

//   return (
//     <div className="space-y-6">
//       <Card className="p-6 bg-gray-900/30 border-gray-800 backdrop-blur-sm">
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <h3 className="text-lg font-semibold text-gray-200">Caption Generator</h3>
//             <p className="text-sm text-gray-400">Generate engaging captions for your posts with AI assistance</p>
//           </div>

//           <div className="space-y-3">
//             <Textarea
//               placeholder="Describe what your post is about..."
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               className="bg-gray-800/50 border-gray-700 min-h-[100px]"
//             />
//             <div className="flex gap-3">
//               <Select value={tone} onValueChange={setTone}>
//                 <SelectTrigger className="bg-gray-800/50 border-gray-700">
//                   <SelectValue placeholder="Select tone" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {tones.map((t) => (
//                     <SelectItem key={t.value} value={t.value}>
//                       {t.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <Button
//                 onClick={generateCaptions}
//                 disabled={loading || !prompt || !tone}
//                 className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
//               >
//                 {loading ? (
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                 ) : (
//                   <MessageSquareText className="w-4 h-4 mr-2" />
//                 )}
//                 Generate
//               </Button>
//             </div>
//           </div>
//         </div>
//       </Card>

//       <AnimatePresence>
//         {captions.map((caption, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <Card className="p-6 bg-gray-900/30 border-gray-800 backdrop-blur-sm">
//               <div className="flex justify-between gap-4">
//                 <p className="text-gray-300">{caption.text}</p>
//                 <Button variant="ghost" size="icon" onClick={() => copyToClipboard(caption.text)} className="shrink-0">
//                   <Copy className="w-4 h-4" />
//                 </Button>
//               </div>
//               <div className="mt-2">
//                 <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">{caption.tone}</span>
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquareText, Loader2, Copy } from "lucide-react"
import { toast } from "sonner"

const tones = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "funny", label: "Funny" },
  { value: "inspirational", label: "Inspirational" },
]

export function CaptionGenerator() {
  const [prompt, setPrompt] = useState("")
  const [tone, setTone] = useState("")
  const [loading, setLoading] = useState(false)
  const [captions, setCaptions] = useState<{ text: string; tone: string }[]>([])

  const generateCaptions = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generateCaption", prompt: `${prompt} in a ${tone} tone` }),
      })
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      setCaptions([{ text: data.caption, tone }])
      toast.success("Caption generated successfully!")
    } catch (error) {
      console.error("Error generating caption:", error)
      toast.error("Failed to generate caption. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Caption copied to clipboard")
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gray-900/30 border-gray-800 backdrop-blur-sm">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-200">Caption Generator</h3>
            <p className="text-sm text-gray-400">Generate engaging captions for your posts with AI assistance</p>
          </div>

          <div className="space-y-3">
            <Textarea
              placeholder="Describe what your post is about..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="bg-gray-800/50 border-gray-700 min-h-[100px]"
            />
            <div className="flex gap-3">
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="bg-gray-800/50 border-gray-700">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={generateCaptions}
                disabled={loading || !prompt || !tone}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <MessageSquareText className="w-4 h-4 mr-2" />
                )}
                Generate
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <AnimatePresence>
        {captions.map((caption, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 bg-gray-900/30 border-gray-800 backdrop-blur-sm">
              <div className="flex justify-between gap-4">
                <p className="text-gray-300">{caption.text}</p>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(caption.text)} className="shrink-0">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="mt-2">
                <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">{caption.tone}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

