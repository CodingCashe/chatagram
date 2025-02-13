// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
// import { useToast } from "@/hooks/use-toast"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Slider } from "@/components/ui/slider"
// import { format } from "date-fns"
// import { CalendarIcon, Sparkles, Upload, Clock, ImageIcon, Video, Layers, Wand2 } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// export default function PostCreator() {
//   const [postType, setPostType] = useState("post")
//   const [useAI, setUseAI] = useState(false)
//   const [topic, setTopic] = useState("")
//   const [content, setContent] = useState("")
//   const [file, setFile] = useState<File | null>(null)
//   const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined)
//   const [hashtags, setHashtags] = useState<string[]>([])
//   const [previewUrl, setPreviewUrl] = useState("")
//   const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
//   const { toast } = useToast()

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const selectedFile = e.target.files[0]
//       setFile(selectedFile)
//       setPreviewUrl(URL.createObjectURL(selectedFile))
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     // TODO: Implement post creation and scheduling logic
//     toast({
//       title: "Post Scheduled",
//       description: "Your post has been scheduled successfully.",
//       className: "bg-green-500 text-white",
//     })
//   }

//   const generateContent = async () => {
//     // TODO: Implement AI content generation
//     const response = await fetch("/api/generate-content", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ topic, postType }),
//     })
//     const data = await response.json()
//     setContent(data.content)
//     setHashtags(data.hashtags)
//     // TODO: Handle generated image/video
//   }

//   useEffect(() => {
//     if (content) {
//       // Simulate AI suggestions
//       const suggestions = [
//         "Add more emojis to increase engagement",
//         "Consider mentioning a trending topic",
//         "Ask a question to encourage comments",
//       ]
//       setAiSuggestions(suggestions)
//     }
//   }, [content])

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="grid grid-cols-2 gap-6">
//         <div className="space-y-6">
//           <motion.div
//             className="bg-gray-700/50 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Label htmlFor="post-type" className="text-gray-300 mb-2 block">
//               Post Type
//             </Label>
//             <Select onValueChange={(value) => setPostType(value)}>
//               <SelectTrigger id="post-type" className="bg-gray-600/50 border-gray-500 text-gray-200">
//                 <SelectValue placeholder="Select post type" />
//               </SelectTrigger>
//               <SelectContent className="bg-gray-700 border-gray-600">
//                 <SelectItem value="post" className="text-gray-200">
//                   <ImageIcon className="inline-block mr-2" size={16} /> Regular Post
//                 </SelectItem>
//                 <SelectItem value="story" className="text-gray-200">
//                   <Clock className="inline-block mr-2" size={16} /> Story
//                 </SelectItem>
//                 <SelectItem value="reel" className="text-gray-200">
//                   <Video className="inline-block mr-2" size={16} /> Reel
//                 </SelectItem>
//                 <SelectItem value="carousel" className="text-gray-200">
//                   <Layers className="inline-block mr-2" size={16} /> Carousel
//                 </SelectItem>
//               </SelectContent>
//             </Select>
//           </motion.div>

//           <motion.div
//             className="flex items-center space-x-2 bg-gray-700/50 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//           >
//             <Switch
//               id="use-ai"
//               checked={useAI}
//               onCheckedChange={setUseAI}
//               className="data-[state=checked]:bg-purple-500"
//             />
//             <Label htmlFor="use-ai" className="text-gray-300">
//               Use AI to generate content
//             </Label>
//           </motion.div>

//           {useAI ? (
//             <motion.div
//               className="bg-gray-700/50 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <Label htmlFor="topic" className="text-gray-300 mb-2 block">
//                 Topic for AI generation
//               </Label>
//               <Input
//                 id="topic"
//                 value={topic}
//                 onChange={(e) => setTopic(e.target.value)}
//                 className="bg-gray-600/50 border-gray-500 text-gray-200"
//               />
//               <Button onClick={generateContent} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white">
//                 <Sparkles className="mr-2 h-4 w-4" />
//                 Generate Content
//               </Button>
//             </motion.div>
//           ) : (
//             <motion.div
//               className="bg-gray-700/50 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <Label htmlFor="file-upload" className="text-gray-300 mb-2 block">
//                 Upload File
//               </Label>
//               <Input
//                 id="file-upload"
//                 type="file"
//                 onChange={handleFileChange}
//                 className="bg-gray-600/50 border-gray-500 text-gray-200"
//               />
//               <div className="mt-2 flex items-center text-sm text-gray-400">
//                 <Upload className="mr-2 h-4 w-4" />
//                 {file ? file.name : "No file selected"}
//               </div>
//             </motion.div>
//           )}

//           <motion.div
//             className="bg-gray-700/50 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <Label htmlFor="content" className="text-gray-300 mb-2 block">
//               Post Content
//             </Label>
//             <Textarea
//               id="content"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               className="bg-gray-600/50 border-gray-500 text-gray-200 min-h-[100px]"
//             />
//             <AnimatePresence>
//               {aiSuggestions.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="mt-2 space-y-2"
//                 >
//                   {aiSuggestions.map((suggestion, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                       className="flex items-center text-sm text-purple-300"
//                     >
//                       <Wand2 className="mr-2 h-4 w-4" />
//                       {suggestion}
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>

//           <motion.div
//             className="bg-gray-700/50 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             <Label className="text-gray-300 mb-2 block">Schedule Post</Label>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="w-full justify-start text-left font-normal bg-gray-600/50 border-gray-500 text-gray-200"
//                 >
//                   <CalendarIcon className="mr-2 h-4 w-4" />
//                   {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0 bg-gray-700/90 border-gray-600">
//                 <Calendar
//                   mode="single"
//                   selected={scheduledDate}
//                   onSelect={setScheduledDate}
//                   initialFocus
//                   className="bg-transparent text-gray-200"
//                 />
//               </PopoverContent>
//             </Popover>
//           </motion.div>
//         </div>

//         <div className="space-y-6">
//           <motion.div
//             className="bg-gray-700/50 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//           >
//             <Label className="text-gray-300 mb-2 block">Post Preview</Label>
//             {previewUrl ? (
//               <img
//                 src={previewUrl || "/placeholder.svg"}
//                 alt="Preview"
//                 className="w-full h-64 object-cover rounded-lg"
//               />
//             ) : (
//               <div className="w-full h-64 bg-gray-600/50 rounded-lg flex items-center justify-center text-gray-400">
//                 No preview available
//               </div>
//             )}
//           </motion.div>

//           <motion.div
//             className="bg-gray-700/50 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//           >
//             <Label className="text-gray-300 mb-2 block">Hashtags</Label>
//             <div className="flex flex-wrap gap-2">
//               {hashtags.map((tag, index) => (
//                 <motion.span
//                   key={index}
//                   className="bg-purple-600/50 text-white px-2 py-1 rounded-full text-sm cursor-pointer hover:bg-purple-500/50 transition-colors"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   #{tag}
//                 </motion.span>
//               ))}
//             </div>
//           </motion.div>

//           <motion.div
//             className="bg-gray-700/50 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.7 }}
//           >
//             <Label className="text-gray-300 mb-2 block">Engagement Prediction</Label>
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>Predicted engagement: 50%</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//             <div className="flex justify-between text-gray-400 text-sm mt-2">
//               <span>Low</span>
//               <span>Medium</span>
//               <span>High</span>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       <Button
//         type="submit"
//         className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
//       >
//         <Clock className="mr-2 h-5 w-5" />
//         Schedule Post
//       </Button>
//     </form>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
// import { useToast } from "@/hooks/use-toast"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Slider } from "@/components/ui/slider"
// import { format } from "date-fns"
// import { CalendarIcon, Sparkles, Upload, Clock, ImageIcon, Video, Layers, Wand2 } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// export default function PostCreator() {
//   const [postType, setPostType] = useState("post")
//   const [useAI, setUseAI] = useState(false)
//   const [topic, setTopic] = useState("")
//   const [content, setContent] = useState("")
//   const [file, setFile] = useState<File | null>(null)
//   const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined)
//   const [hashtags, setHashtags] = useState<string[]>([])
//   const [previewUrl, setPreviewUrl] = useState("")
//   const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
//   const [isLoading, setIsLoading] = useState(false)
//   const { toast } = useToast()

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const selectedFile = e.target.files[0]
//       setFile(selectedFile)
//       setPreviewUrl(URL.createObjectURL(selectedFile))
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       const formData = new FormData()
//       formData.append("postType", postType)
//       formData.append("content", content)
//       formData.append("scheduledDate", scheduledDate?.toISOString() || "")
//       hashtags.forEach((tag) => formData.append("hashtags[]", tag))
//       if (file) {
//         formData.append("file", file)
//       }

//       const response = await fetch("/api/scheduled-content", {
//         method: "POST",
//         body: formData,
//       })

//       if (!response.ok) {
//         throw new Error("Failed to schedule post")
//       }

//       const data = await response.json()

//       toast({
//         title: "Post Scheduled",
//         description: "Your post has been scheduled successfully.",
//         className: "bg-green-500 text-white",
//       })

//       // Reset form
//       setPostType("post")
//       setContent("")
//       setFile(null)
//       setScheduledDate(undefined)
//       setHashtags([])
//       setPreviewUrl("")
//     } catch (error) {
//       console.error("Error scheduling post:", error)
//       toast({
//         title: "Error",
//         description: "Failed to schedule post. Please try again.",
//         className: "bg-red-500 text-white",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const generateContent = async () => {
//     setIsLoading(true)
//     try {
//       const response = await fetch("/api/generate-content", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ topic, postType }),
//       })
//       const data = await response.json()
//       setContent(data.content)
//       setHashtags(data.hashtags)
//       if (data.mediaUrl) {
//         setPreviewUrl(data.mediaUrl)
//       }
//     } catch (error) {
//       console.error("Error generating content:", error)
//       toast({
//         title: "Error",
//         description: "Failed to generate content. Please try again.",
//         className: "bg-red-500 text-white",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (content) {
//       // Simulate AI suggestions
//       const suggestions = [
//         "Add more emojis to increase engagement",
//         "Consider mentioning a trending topic",
//         "Ask a question to encourage comments",
//       ]
//       setAiSuggestions(suggestions)
//     }
//   }, [content])

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="grid grid-cols-2 gap-6">
//         <div className="space-y-6">
//           <motion.div
//             className="bg-gray-700/50 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Label htmlFor="post-type" className="text-gray-300 mb-2 block">
//               Post Type
//             </Label>
//             <Select onValueChange={(value) => setPostType(value)}>
//               <SelectTrigger id="post-type" className="bg-gray-600/50 border-gray-500 text-gray-200">
//                 <SelectValue placeholder="Select post type" />
//               </SelectTrigger>
//               <SelectContent className="bg-gray-700 border-gray-600">
//                 <SelectItem value="post" className="text-gray-200">
//                   <ImageIcon className="inline-block mr-2" size={16} /> Regular Post
//                 </SelectItem>
//                 <SelectItem value="story" className="text-gray-200">
//                   <Clock className="inline-block mr-2" size={16} /> Story
//                 </SelectItem>
//                 <SelectItem value="reel" className="text-gray-200">
//                   <Video className="inline-block mr-2" size={16} /> Reel
//                 </SelectItem>
//                 <SelectItem value="carousel" className="text-gray-200">
//                   <Layers className="inline-block mr-2" size={16} /> Carousel
//                 </SelectItem>
//               </SelectContent>
//             </Select>
//           </motion.div>

//           <motion.div
//             className="flex items-center space-x-2 bg-gray-700/50 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//           >
//             <Switch
//               id="use-ai"
//               checked={useAI}
//               onCheckedChange={setUseAI}
//               className="data-[state=checked]:bg-purple-500"
//             />
//             <Label htmlFor="use-ai" className="text-gray-300">
//               Use AI to generate content
//             </Label>
//           </motion.div>

//           {useAI ? (
//             <motion.div
//               className="bg-gray-700/50 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <Label htmlFor="topic" className="text-gray-300 mb-2 block">
//                 Topic for AI generation
//               </Label>
//               <Input
//                 id="topic"
//                 value={topic}
//                 onChange={(e) => setTopic(e.target.value)}
//                 className="bg-gray-600/50 border-gray-500 text-gray-200"
//               />
//               <Button onClick={generateContent} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white">
//                 <Sparkles className="mr-2 h-4 w-4" />
//                 Generate Content
//               </Button>
//             </motion.div>
//           ) : (
//             <motion.div
//               className="bg-gray-700/50 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <Label htmlFor="file-upload" className="text-gray-300 mb-2 block">
//                 Upload File
//               </Label>
//               <Input
//                 id="file-upload"
//                 type="file"
//                 onChange={handleFileChange}
//                 className="bg-gray-600/50 border-gray-500 text-gray-200"
//               />
//               <div className="mt-2 flex items-center text-sm text-gray-400">
//                 <Upload className="mr-2 h-4 w-4" />
//                 {file ? file.name : "No file selected"}
//               </div>
//             </motion.div>
//           )}

//           <motion.div
//             className="bg-gray-700/50 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <Label htmlFor="content" className="text-gray-300 mb-2 block">
//               Post Content
//             </Label>
//             <Textarea
//               id="content"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               className="bg-gray-600/50 border-gray-500 text-gray-200 min-h-[100px]"
//             />
//             <AnimatePresence>
//               {aiSuggestions.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="mt-2 space-y-2"
//                 >
//                   {aiSuggestions.map((suggestion, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                       className="flex items-center text-sm text-purple-300"
//                     >
//                       <Wand2 className="mr-2 h-4 w-4" />
//                       {suggestion}
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>

//           <motion.div
//             className="bg-gray-700/50 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             <Label className="text-gray-300 mb-2 block">Schedule Post</Label>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="w-full justify-start text-left font-normal bg-gray-600/50 border-gray-500 text-gray-200"
//                 >
//                   <CalendarIcon className="mr-2 h-4 w-4" />
//                   {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0 bg-gray-700/90 border-gray-600">
//                 <Calendar
//                   mode="single"
//                   selected={scheduledDate}
//                   onSelect={setScheduledDate}
//                   initialFocus
//                   className="bg-transparent text-gray-200"
//                 />
//               </PopoverContent>
//             </Popover>
//           </motion.div>
//         </div>

//         <div className="space-y-6">
//           <motion.div
//             className="bg-gray-700/50 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//           >
//             <Label className="text-gray-300 mb-2 block">Post Preview</Label>
//             {previewUrl ? (
//               <img
//                 src={previewUrl || "/placeholder.svg"}
//                 alt="Preview"
//                 className="w-full h-64 object-cover rounded-lg"
//               />
//             ) : (
//               <div className="w-full h-64 bg-gray-600/50 rounded-lg flex items-center justify-center text-gray-400">
//                 No preview available
//               </div>
//             )}
//           </motion.div>

//           <motion.div
//             className="bg-gray-700/50 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//           >
//             <Label className="text-gray-300 mb-2 block">Hashtags</Label>
//             <div className="flex flex-wrap gap-2">
//               {hashtags.map((tag, index) => (
//                 <motion.span
//                   key={index}
//                   className="bg-purple-600/50 text-white px-2 py-1 rounded-full text-sm cursor-pointer hover:bg-purple-500/50 transition-colors"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   #{tag}
//                 </motion.span>
//               ))}
//             </div>
//           </motion.div>

//           <motion.div
//             className="bg-gray-700/50 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.7 }}
//           >
//             <Label className="text-gray-300 mb-2 block">Engagement Prediction</Label>
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>Predicted engagement: 50%</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//             <div className="flex justify-between text-gray-400 text-sm mt-2">
//               <span>Low</span>
//               <span>Medium</span>
//               <span>High</span>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       <Button
//         type="submit"
//         className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
//         disabled={isLoading}
//       >
//         {isLoading ? <Sparkles className="mr-2 h-5 w-5 animate-spin" /> : <Clock className="mr-2 h-5 w-5" />}
//         {isLoading ? "Scheduling..." : "Schedule Post"}
//       </Button>
//     </form>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
// import { useToast } from "@/hooks/use-toast"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Slider } from "@/components/ui/slider"
// import { format } from "date-fns"
// import { CalendarIcon, Sparkles, Upload, Clock, ImageIcon, Video, Layers, Wand2 } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// export default function PostCreator() {
//   const [postType, setPostType] = useState("post")
//   const [useAI, setUseAI] = useState(false)
//   const [topic, setTopic] = useState("")
//   const [content, setContent] = useState("")
//   const [file, setFile] = useState<File | null>(null)
//   const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined)
//   const [hashtags, setHashtags] = useState<string[]>([])
//   const [previewUrl, setPreviewUrl] = useState("")
//   const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
//   const [isLoading, setIsLoading] = useState(false)
//   const { toast } = useToast()

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const selectedFile = e.target.files[0]
//       setFile(selectedFile)
//       setPreviewUrl(URL.createObjectURL(selectedFile))
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       const formData = new FormData()
//       formData.append("postType", postType)
//       formData.append("content", content)
//       formData.append("scheduledDate", scheduledDate?.toISOString() || "")
//       hashtags.forEach((tag) => formData.append("hashtags[]", tag))
//       if (file) {
//         formData.append("file", file)
//       }

//       const response = await fetch("/api/scheduled-content", {
//         method: "POST",
//         body: formData,
//       })

//       if (!response.ok) {
//         throw new Error("Failed to schedule post")
//       }

//       const data = await response.json()

//       toast({
//         title: "Post Scheduled",
//         description: "Your post has been scheduled successfully.",
//         className: "bg-green-500 text-white",
//       })

//       // Reset form
//       setPostType("post")
//       setContent("")
//       setFile(null)
//       setScheduledDate(undefined)
//       setHashtags([])
//       setPreviewUrl("")
//     } catch (error) {
//       console.error("Error scheduling post:", error)
//       toast({
//         title: "Error",
//         description: "Failed to schedule post. Please try again.",
//         className: "bg-red-500 text-white",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const generateContent = async () => {
//     setIsLoading(true)
//     try {
//       const response = await fetch("/api/generate-content", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ topic, postType }),
//       })
//       const data = await response.json()
//       setContent(data.content)
//       setHashtags(data.hashtags)
//       if (data.mediaUrl) {
//         setPreviewUrl(data.mediaUrl)
//       }
//     } catch (error) {
//       console.error("Error generating content:", error)
//       toast({
//         title: "Error",
//         description: "Failed to generate content. Please try again.",
//         className: "bg-red-500 text-white",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (content) {
//       // Simulate AI suggestions
//       const suggestions = [
//         "Add more emojis to increase engagement",
//         "Consider mentioning a trending topic",
//         "Ask a question to encourage comments",
//       ]
//       setAiSuggestions(suggestions)
//     }
//   }, [content])

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         <div className="space-y-6">
//           <motion.div
//             className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Label htmlFor="post-type" className="text-gray-300 mb-2 block">
//               Post Type
//             </Label>
//             <Select onValueChange={(value) => setPostType(value)}>
//               <SelectTrigger id="post-type" className="bg-gray-700 border-gray-600 text-gray-200">
//                 <SelectValue placeholder="Select post type" />
//               </SelectTrigger>
//               <SelectContent className="bg-gray-700 border-gray-600">
//                 <SelectItem value="post" className="text-gray-200">
//                   <ImageIcon className="inline-block mr-2" size={16} /> Regular Post
//                 </SelectItem>
//                 <SelectItem value="story" className="text-gray-200">
//                   <Clock className="inline-block mr-2" size={16} /> Story
//                 </SelectItem>
//                 <SelectItem value="reel" className="text-gray-200">
//                   <Video className="inline-block mr-2" size={16} /> Reel
//                 </SelectItem>
//                 <SelectItem value="carousel" className="text-gray-200">
//                   <Layers className="inline-block mr-2" size={16} /> Carousel
//                 </SelectItem>
//               </SelectContent>
//             </Select>
//           </motion.div>

//           <motion.div
//             className="flex items-center space-x-2 bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//           >
//             <Switch
//               id="use-ai"
//               checked={useAI}
//               onCheckedChange={setUseAI}
//               className="data-[state=checked]:bg-gray-600"
//             />
//             <Label htmlFor="use-ai" className="text-gray-300">
//               Use AI to generate content
//             </Label>
//           </motion.div>

//           {useAI ? (
//             <motion.div
//               className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <Label htmlFor="topic" className="text-gray-300 mb-2 block">
//                 Topic for AI generation
//               </Label>
//               <Input
//                 id="topic"
//                 value={topic}
//                 onChange={(e) => setTopic(e.target.value)}
//                 className="bg-gray-700 border-gray-600 text-gray-200"
//               />
//               <Button onClick={generateContent} className="mt-4 bg-gray-600 hover:bg-gray-500 text-white">
//                 <Sparkles className="mr-2 h-4 w-4" />
//                 Generate Content
//               </Button>
//             </motion.div>
//           ) : (
//             <motion.div
//               className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <Label htmlFor="file-upload" className="text-gray-300 mb-2 block">
//                 Upload File
//               </Label>
//               <Input
//                 id="file-upload"
//                 type="file"
//                 onChange={handleFileChange}
//                 className="bg-gray-700 border-gray-600 text-gray-200"
//               />
//               <div className="mt-2 flex items-center text-sm text-gray-400">
//                 <Upload className="mr-2 h-4 w-4" />
//                 {file ? file.name : "No file selected"}
//               </div>
//             </motion.div>
//           )}

//           <motion.div
//             className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <Label htmlFor="content" className="text-gray-300 mb-2 block">
//               Post Content
//             </Label>
//             <Textarea
//               id="content"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               className="bg-gray-700 border-gray-600 text-gray-200 min-h-[100px]"
//             />
//             <AnimatePresence>
//               {aiSuggestions.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="mt-2 space-y-2"
//                 >
//                   {aiSuggestions.map((suggestion, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                       className="flex items-center text-sm text-gray-400"
//                     >
//                       <Wand2 className="mr-2 h-4 w-4" />
//                       {suggestion}
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>

//           <motion.div
//             className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             <Label className="text-gray-300 mb-2 block">Schedule Post</Label>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="w-full justify-start text-left font-normal bg-gray-700 border-gray-600 text-gray-200"
//                 >
//                   <CalendarIcon className="mr-2 h-4 w-4" />
//                   {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0 bg-gray-700 border-gray-600">
//                 <Calendar
//                   mode="single"
//                   selected={scheduledDate}
//                   onSelect={setScheduledDate}
//                   initialFocus
//                   className="bg-transparent text-gray-200"
//                 />
//               </PopoverContent>
//             </Popover>
//           </motion.div>
//         </div>

//         <div className="space-y-6">
//           <motion.div
//             className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//           >
//             <Label className="text-gray-300 mb-2 block">Post Preview</Label>
//             {previewUrl ? (
//               <img
//                 src={previewUrl || "/placeholder.svg"}
//                 alt="Preview"
//                 className="w-full h-64 object-cover rounded-lg"
//               />
//             ) : (
//               <div className="w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
//                 No preview available
//               </div>
//             )}
//           </motion.div>

//           <motion.div
//             className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//           >
//             <Label className="text-gray-300 mb-2 block">Hashtags</Label>
//             <div className="flex flex-wrap gap-2">
//               {hashtags.map((tag, index) => (
//                 <motion.span
//                   key={index}
//                   className="bg-gray-600 text-white px-2 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-500 transition-colors"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   #{tag}
//                 </motion.span>
//               ))}
//             </div>
//           </motion.div>

//           <motion.div
//             className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.7 }}
//           >
//             <Label className="text-gray-300 mb-2 block">Engagement Prediction</Label>
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>Predicted engagement: 50%</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//             <div className="flex justify-between text-gray-400 text-sm mt-2">
//               <span>Low</span>
//               <span>Medium</span>
//               <span>High</span>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       <Button
//         type="submit"
//         className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
//         disabled={isLoading}
//       >
//         {isLoading ? <Sparkles className="mr-2 h-5 w-5 animate-spin" /> : <Clock className="mr-2 h-5 w-5" />}
//         {isLoading ? "Scheduling..." : "Schedule Post"}
//       </Button>
//     </form>
//   )
// }

// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
// import { useToast } from "@/hooks/use-toast"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Slider } from "@/components/ui/slider"
// import { format } from "date-fns"
// import { CalendarIcon, Sparkles, Upload, Clock, ImageIcon, Video, Layers, Wand2 } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// export default function PostCreator() {
//   const [postType, setPostType] = useState("post")
//   const [useAI, setUseAI] = useState(false)
//   const [topic, setTopic] = useState("")
//   const [file, setFile] = useState(null)
//   const [content, setContent] = useState("")
//   const [aiSuggestions, setAiSuggestions] = useState([])
//   const [scheduledDate, setScheduledDate] = useState(null)
//   const [hashtags, setHashtags] = useState([])
//   const [previewUrl, setPreviewUrl] = useState(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const { toast } = useToast()

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0]
//     setFile(selectedFile)
//     if (selectedFile) {
//       const url = URL.createObjectURL(selectedFile)
//       setPreviewUrl(url)
//     }
//   }

//   const generateContent = async () => {
//     if (!topic) {
//       toast({
//         title: "Error",
//         description: "Please enter a topic for AI generation.",
//         variant: "destructive",
//       })
//       return
//     }

//     setIsLoading(true)
//     try {
//       const response = await fetch("/api/generate-content", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ topic }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to generate content")
//       }

//       const data = await response.json()
//       setContent(data.content)
//       setHashtags(data.hashtags)
//       setAiSuggestions(data.suggestions)
//     } catch (error) {
//       console.error("Error generating content:", error)
//       toast({
//         title: "Error",
//         description: "Failed to generate content. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)

//     const formData = new FormData()
//     formData.append("postType", postType)
//     formData.append("content", content)
//     formData.append("scheduledDate", scheduledDate.toISOString())
//     formData.append("hashtags", JSON.stringify(hashtags))
//     if (file) {
//       formData.append("file", file)
//     }

//     try {
//       const response = await fetch("/api/schedule-post", {
//         method: "POST",
//         body: formData,
//       })

//       if (!response.ok) {
//         throw new Error("Failed to schedule post")
//       }

//       toast({
//         title: "Success",
//         description: "Post scheduled successfully!",
//       })

//       // Reset form
//       setPostType("post")
//       setContent("")
//       setScheduledDate(null)
//       setHashtags([])
//       setFile(null)
//       setPreviewUrl(null)
//     } catch (error) {
//       console.error("Error scheduling post:", error)
//       toast({
//         title: "Error",
//         description: "Failed to schedule post. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-6">
//           <motion.div
//             className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Label htmlFor="post-type" className="text-gray-300 mb-2 block">
//               Post Type
//             </Label>
//             <Select onValueChange={(value) => setPostType(value)}>
//               <SelectTrigger id="post-type" className="bg-gray-700 border-gray-600 text-gray-200">
//                 <SelectValue placeholder="Select post type" />
//               </SelectTrigger>
//               <SelectContent className="bg-gray-700 border-gray-600">
//                 {[
//                   { value: "post", label: "Regular Post", icon: ImageIcon },
//                   { value: "story", label: "Story", icon: Clock },
//                   { value: "reel", label: "Reel", icon: Video },
//                   { value: "carousel", label: "Carousel", icon: Layers },
//                 ].map((item) => (
//                   <SelectItem key={item.value} value={item.value} className="text-gray-200">
//                     <item.icon className="inline-block mr-2" size={16} /> {item.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </motion.div>

//           <motion.div
//             className="flex items-center space-x-2 bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//           >
//             <Switch
//               id="use-ai"
//               checked={useAI}
//               onCheckedChange={setUseAI}
//               className="data-[state=checked]:bg-gray-600"
//             />
//             <Label htmlFor="use-ai" className="text-gray-300">
//               Use AI to generate content
//             </Label>
//           </motion.div>

//           {useAI ? (
//             <motion.div
//               className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <Label htmlFor="topic" className="text-gray-300 mb-2 block">
//                 Topic for AI generation
//               </Label>
//               <Input
//                 id="topic"
//                 value={topic}
//                 onChange={(e) => setTopic(e.target.value)}
//                 className="bg-gray-700 border-gray-600 text-gray-200"
//               />
//               <Button onClick={generateContent} className="mt-4 bg-gray-600 hover:bg-gray-500 text-white w-full">
//                 <Sparkles className="mr-2 h-4 w-4" />
//                 Generate Content
//               </Button>
//             </motion.div>
//           ) : (
//             <motion.div
//               className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <Label htmlFor="file-upload" className="text-gray-300 mb-2 block">
//                 Upload File
//               </Label>
//               <Input
//                 id="file-upload"
//                 type="file"
//                 onChange={handleFileChange}
//                 className="bg-gray-700 border-gray-600 text-gray-200"
//               />
//               <div className="mt-2 flex items-center text-sm text-gray-400">
//                 <Upload className="mr-2 h-4 w-4" />
//                 {file ? file.name : "No file selected"}
//               </div>
//             </motion.div>
//           )}

//           <motion.div
//             className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <Label htmlFor="content" className="text-gray-300 mb-2 block">
//               Post Content
//             </Label>
//             <Textarea
//               id="content"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               className="bg-gray-700 border-gray-600 text-gray-200 min-h-[100px]"
//             />
//             <AnimatePresence>
//               {aiSuggestions.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="mt-2 space-y-2"
//                 >
//                   {aiSuggestions.map((suggestion, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                       className="flex items-center text-sm text-gray-400"
//                     >
//                       <Wand2 className="mr-2 h-4 w-4" />
//                       {suggestion}
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         </div>

//         <div className="space-y-6">
//           <motion.div
//             className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             <Label className="text-gray-300 mb-2 block">Schedule Post</Label>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="w-full justify-start text-left font-normal bg-gray-700 border-gray-600 text-gray-200"
//                 >
//                   <CalendarIcon className="mr-2 h-4 w-4" />
//                   {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0 bg-gray-700 border-gray-600">
//                 <Calendar
//                   mode="single"
//                   selected={scheduledDate}
//                   onSelect={setScheduledDate}
//                   initialFocus
//                   className="bg-transparent text-gray-200"
//                 />
//               </PopoverContent>
//             </Popover>
//           </motion.div>

//           <motion.div
//             className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//           >
//             <Label className="text-gray-300 mb-2 block">Post Preview</Label>
//             {previewUrl ? (
//               <img
//                 src={previewUrl || "/placeholder.svg"}
//                 alt="Preview"
//                 className="w-full h-64 object-cover rounded-lg"
//               />
//             ) : (
//               <div className="w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
//                 No preview available
//               </div>
//             )}
//           </motion.div>

//           <motion.div
//             className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//           >
//             <Label className="text-gray-300 mb-2 block">Hashtags</Label>
//             <div className="flex flex-wrap gap-2">
//               {hashtags.map((tag, index) => (
//                 <motion.span
//                   key={index}
//                   className="bg-gray-600 text-white px-2 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-500 transition-colors"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   #{tag}
//                 </motion.span>
//               ))}
//             </div>
//           </motion.div>

//           <motion.div
//             className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.7 }}
//           >
//             <Label className="text-gray-300 mb-2 block">Engagement Prediction</Label>
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>Predicted engagement: 50%</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//             <div className="flex justify-between text-gray-400 text-sm mt-2">
//               <span>Low</span>
//               <span>Medium</span>
//               <span>High</span>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       <Button
//         type="submit"
//         className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
//         disabled={isLoading}
//       >
//         {isLoading ? <Sparkles className="mr-2 h-5 w-5 animate-spin" /> : <Clock className="mr-2 h-5 w-5" />}
//         {isLoading ? "Scheduling..." : "Schedule Post"}
//       </Button>
//     </form>
//   )
// }

// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
// import { useToast } from "@/hooks/use-toast"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Slider } from "@/components/ui/slider"
// import { format } from "date-fns"
// import { CalendarIcon, Sparkles, Upload, Clock, ImageIcon, Video, Layers, Wand2 } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// export default function PostCreator() {
//   const [postType, setPostType] = useState("post")
//   const [useAI, setUseAI] = useState(false)
//   const [topic, setTopic] = useState("")
//   const [file, setFile] = useState<File | null>(null)
//   const [content, setContent] = useState("")
//   const [aiSuggestions, setAiSuggestions] = useState([])
//   const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined)
//   const [hashtags, setHashtags] = useState([])
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const { toast } = useToast()

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0] || null
//     setFile(selectedFile)
//     if (selectedFile) {
//       const url = URL.createObjectURL(selectedFile)
//       setPreviewUrl(url)
//     }
//   }

//   const generateContent = async () => {
//     if (!topic) {
//       toast({
//         title: "Error",
//         description: "Please enter a topic for AI generation.",
//         variant: "destructive",
//       })
//       return
//     }

//     setIsLoading(true)
//     try {
//       const response = await fetch("/api/generate-content", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ topic }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to generate content")
//       }

//       const data = await response.json()
//       setContent(data.content)
//       setHashtags(data.hashtags)
//       setAiSuggestions(data.suggestions)
//     } catch (error) {
//       console.error("Error generating content:", error)
//       toast({
//         title: "Error",
//         description: "Failed to generate content. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     const formData = new FormData()
//     formData.append("postType", postType)
//     formData.append("content", content)
//     if (scheduledDate) {
//       formData.append("scheduledDate", scheduledDate.toISOString())
//     } else {
//       formData.append("scheduledDate", "")
//     }
//     formData.append("hashtags", JSON.stringify(hashtags))
//     if (file) {
//       formData.append("file", file)
//     }

//     try {
//       const response = await fetch("/api/schedule-post", {
//         method: "POST",
//         body: formData,
//       })

//       if (!response.ok) {
//         throw new Error("Failed to schedule post")
//       }

//       toast({
//         title: "Success",
//         description: "Post scheduled successfully!",
//       })

//       // Reset form
//       setPostType("post")
//       setContent("")
//       setScheduledDate(undefined)
//       setHashtags([])
//       setFile(null)
//       setPreviewUrl(null)
//     } catch (error) {
//       console.error("Error scheduling post:", error)
//       toast({
//         title: "Error",
//         description: "Failed to schedule post. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-6">
//           <motion.div
//             className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Label htmlFor="post-type" className="text-gray-300 mb-2 block">
//               Post Type
//             </Label>
//             <Select onValueChange={(value) => setPostType(value)}>
//               <SelectTrigger id="post-type" className="bg-gray-700 border-gray-600 text-gray-200">
//                 <SelectValue placeholder="Select post type" />
//               </SelectTrigger>
//               <SelectContent className="bg-gray-700 border-gray-600">
//                 {[
//                   { value: "post", label: "Regular Post", icon: ImageIcon },
//                   { value: "story", label: "Story", icon: Clock },
//                   { value: "reel", label: "Reel", icon: Video },
//                   { value: "carousel", label: "Carousel", icon: Layers },
//                 ].map((item) => (
//                   <SelectItem key={item.value} value={item.value} className="text-gray-200">
//                     <item.icon className="inline-block mr-2" size={16} /> {item.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </motion.div>

//           <motion.div
//             className="flex items-center space-x-2 bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//           >
//             <Switch
//               id="use-ai"
//               checked={useAI}
//               onCheckedChange={setUseAI}
//               className="data-[state=checked]:bg-gray-600"
//             />
//             <Label htmlFor="use-ai" className="text-gray-300">
//               Use AI to generate content
//             </Label>
//           </motion.div>

//           {useAI ? (
//             <motion.div
//               className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <Label htmlFor="topic" className="text-gray-300 mb-2 block">
//                 Topic for AI generation
//               </Label>
//               <Input
//                 id="topic"
//                 value={topic}
//                 onChange={(e) => setTopic(e.target.value)}
//                 className="bg-gray-700 border-gray-600 text-gray-200"
//               />
//               <Button onClick={generateContent} className="mt-4 bg-gray-600 hover:bg-gray-500 text-white w-full">
//                 <Sparkles className="mr-2 h-4 w-4" />
//                 Generate Content
//               </Button>
//             </motion.div>
//           ) : (
//             <motion.div
//               className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <Label htmlFor="file-upload" className="text-gray-300 mb-2 block">
//                 Upload File
//               </Label>
//               <Input
//                 id="file-upload"
//                 type="file"
//                 onChange={handleFileChange}
//                 className="bg-gray-700 border-gray-600 text-gray-200"
//               />
//               <div className="mt-2 flex items-center text-sm text-gray-400">
//                 <Upload className="mr-2 h-4 w-4" />
//                 {file && file.name ? file.name : "No file selected"}
//               </div>
//             </motion.div>
//           )}

//           <motion.div
//             className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <Label htmlFor="content" className="text-gray-300 mb-2 block">
//               Post Content
//             </Label>
//             <Textarea
//               id="content"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               className="bg-gray-700 border-gray-600 text-gray-200 min-h-[100px]"
//             />
//             <AnimatePresence>
//               {aiSuggestions.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="mt-2 space-y-2"
//                 >
//                   {aiSuggestions.map((suggestion, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                       className="flex items-center text-sm text-gray-400"
//                     >
//                       <Wand2 className="mr-2 h-4 w-4" />
//                       {suggestion}
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         </div>

//         <div className="space-y-6">
//           <motion.div
//             className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             <Label className="text-gray-300 mb-2 block">Schedule Post</Label>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="w-full justify-start text-left font-normal bg-gray-700 border-gray-600 text-gray-200"
//                 >
//                   <CalendarIcon className="mr-2 h-4 w-4" />
//                   {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0 bg-gray-700 border-gray-600">
//                 <Calendar
//                   mode="single"
//                   selected={scheduledDate}
//                   onSelect={setScheduledDate}
//                   initialFocus
//                   className="bg-transparent text-gray-200"
//                 />
//               </PopoverContent>
//             </Popover>
//           </motion.div>

//           <motion.div
//             className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//           >
//             <Label className="text-gray-300 mb-2 block">Post Preview</Label>
//             {previewUrl ? (
//               <img
//                 src={previewUrl || "/placeholder.svg"}
//                 alt="Preview"
//                 className="w-full h-64 object-cover rounded-lg"
//               />
//             ) : (
//               <div className="w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
//                 No preview available
//               </div>
//             )}
//           </motion.div>

//           <motion.div
//             className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//           >
//             <Label className="text-gray-300 mb-2 block">Hashtags</Label>
//             <div className="flex flex-wrap gap-2">
//               {hashtags.map((tag, index) => (
//                 <motion.span
//                   key={index}
//                   className="bg-gray-600 text-white px-2 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-500 transition-colors"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   #{tag}
//                 </motion.span>
//               ))}
//             </div>
//           </motion.div>

//           <motion.div
//             className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.7 }}
//           >
//             <Label className="text-gray-300 mb-2 block">Engagement Prediction</Label>
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>Predicted engagement: 50%</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//             <div className="flex justify-between text-gray-400 text-sm mt-2">
//               <span>Low</span>
//               <span>Medium</span>
//               <span>High</span>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       <Button
//         type="submit"
//         className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
//         disabled={isLoading}
//       >
//         {isLoading ? <Sparkles className="mr-2 h-5 w-5 animate-spin" /> : <Clock className="mr-2 h-5 w-5" />}
//         {isLoading ? "Scheduling..." : "Schedule Post"}
//       </Button>
//     </form>
//   )
// }

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { format } from "date-fns"
import { CalendarIcon, Sparkles, Upload, Clock, ImageIcon, Video, Layers, Wand2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PostCreator() {
  const [postType, setPostType] = useState("post")
  const [useAI, setUseAI] = useState(false)
  const [topic, setTopic] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [content, setContent] = useState("")
  const [aiSuggestions, setAiSuggestions] = useState([])
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined)
  const [hashtags, setHashtags] = useState([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File change event triggered")
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)
      console.log("File selected:", selectedFile.name)
    } else {
      console.log("No file selected")
    }
  }

  const generateContent = async () => {
    if (!topic) {
      toast({
        title: "Error",
        description: "Please enter a topic for AI generation.",
        variant: "destructive",
      })
      return
    }

    console.log("Generating content for topic:", topic)
    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate content")
      }

      const data = await response.json()
      console.log("Generated content:", data)
      setContent(data.content)
      setHashtags(data.hashtags)
      setAiSuggestions(data.suggestions)
    } catch (error) {
      console.error("Error generating content:", error)
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting post")
    setIsLoading(true)

    const formData = new FormData()
    formData.append("postType", postType)
    formData.append("content", content)
    if (scheduledDate) {
      formData.append("scheduledDate", scheduledDate.toISOString())
    }
    formData.append("hashtags", JSON.stringify(hashtags))
    if (file) {
      formData.append("file", file)
    }

    try {
      const response = await fetch("/api/scheduled-content", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to schedule post")
      }

      const result = await response.json()
      console.log("Post scheduled:", result)

      toast({
        title: "Success",
        description: "Post scheduled successfully!",
      })

      // Reset form
      setPostType("post")
      setContent("")
      setScheduledDate(undefined)
      setHashtags([])
      setFile(null)
      setPreviewUrl(null)
    } catch (error) {
      console.error("Error scheduling post:", error)
      toast({
        title: "Error",
        description: "Failed to schedule post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <motion.div
            className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Label htmlFor="post-type" className="text-gray-300 mb-2 block">
              Post Type
            </Label>
            <Select onValueChange={(value) => setPostType(value)}>
              <SelectTrigger id="post-type" className="bg-gray-700 border-gray-600 text-gray-200">
                <SelectValue placeholder="Select post type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {[
                  { value: "post", label: "Regular Post", icon: ImageIcon },
                  { value: "story", label: "Story", icon: Clock },
                  { value: "reel", label: "Reel", icon: Video },
                  { value: "carousel", label: "Carousel", icon: Layers },
                ].map((item) => (
                  <SelectItem key={item.value} value={item.value} className="text-gray-200">
                    <item.icon className="inline-block mr-2" size={16} /> {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            className="flex items-center space-x-2 bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Switch
              id="use-ai"
              checked={useAI}
              onCheckedChange={setUseAI}
              className="data-[state=checked]:bg-gray-600"
            />
            <Label htmlFor="use-ai" className="text-gray-300">
              Use AI to generate content
            </Label>
          </motion.div>

          {useAI ? (
            <motion.div
              className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Label htmlFor="topic" className="text-gray-300 mb-2 block">
                Topic for AI generation
              </Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="bg-gray-700 border-gray-600 text-gray-200"
              />
              <Button onClick={generateContent} className="mt-4 bg-gray-600 hover:bg-gray-500 text-white w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Content
              </Button>
            </motion.div>
          ) : (
            <motion.div
              className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Label htmlFor="file-upload" className="text-gray-300 mb-2 block">
                Upload File
              </Label>
              <Input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                className="bg-gray-700 border-gray-600 text-gray-200"
              />
              <div className="mt-2 flex items-center text-sm text-gray-400">
                <Upload className="mr-2 h-4 w-4" />
                {file && file.name ? file.name : "No file selected"}
              </div>
            </motion.div>
          )}

          <motion.div
            className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Label htmlFor="content" className="text-gray-300 mb-2 block">
              Post Content
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-gray-700 border-gray-600 text-gray-200 min-h-[100px]"
            />
            <AnimatePresence>
              {aiSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-2 space-y-2"
                >
                  {aiSuggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center text-sm text-gray-400"
                    >
                      <Wand2 className="mr-2 h-4 w-4" />
                      {suggestion}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Label className="text-gray-300 mb-2 block">Schedule Post</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-gray-700 border-gray-600 text-gray-200"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-gray-700 border-gray-600">
                <Calendar
                  mode="single"
                  selected={scheduledDate}
                  onSelect={setScheduledDate}
                  initialFocus
                  className="bg-transparent text-gray-200"
                />
              </PopoverContent>
            </Popover>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Label className="text-gray-300 mb-2 block">Post Preview</Label>
            {previewUrl ? (
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
                No preview available
              </div>
            )}
          </motion.div>

          <motion.div
            className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Label className="text-gray-300 mb-2 block">Hashtags</Label>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, index) => (
                <motion.span
                  key={index}
                  className="bg-gray-600 text-white px-2 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-500 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  #{tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-4 rounded-lg shadow-inner backdrop-blur-sm border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Label className="text-gray-300 mb-2 block">Engagement Prediction</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Predicted engagement: 50%</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="flex justify-between text-gray-400 text-sm mt-2">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </motion.div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        disabled={isLoading}
      >
        {isLoading ? <Sparkles className="mr-2 h-5 w-5 animate-spin" /> : <Clock className="mr-2 h-5 w-5" />}
        {isLoading ? "Scheduling..." : "Schedule Post"}
      </Button>
    </form>
  )
}

