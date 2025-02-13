// import { Suspense } from "react"
// import PostCreator from "../_components/schedulers/PostCreator"
// import ScheduledPosts from "../_components/schedulers/ScheduledPosts"
// import Analytics from "../_components/schedulers/Analytics"
// import AIAssistant from "../_components/schedulers/AIAssistant"
// import ContentInspiration from "../_components/schedulers/ContentInspiration"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// export default function DashboardPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-100 p-8">
//       <div className="container mx-auto space-y-8">
//         <h1 className="text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-text">
//           Instagram Post Scheduler
//         </h1>
//         <Tabs defaultValue="create" className="w-full">
//           <TabsList className="grid w-full grid-cols-5 rounded-xl bg-gray-800/50 p-1">
//             <TabsTrigger
//               value="create"
//               className="rounded-lg text-gray-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all duration-300"
//             >
//               Create
//             </TabsTrigger>
//             <TabsTrigger
//               value="scheduled"
//               className="rounded-lg text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
//             >
//               Scheduled
//             </TabsTrigger>
//             <TabsTrigger
//               value="analytics"
//               className="rounded-lg text-gray-300 data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all duration-300"
//             >
//               Analytics
//             </TabsTrigger>
//             <TabsTrigger
//               value="ai-assistant"
//               className="rounded-lg text-gray-300 data-[state=active]:bg-pink-600 data-[state=active]:text-white transition-all duration-300"
//             >
//               AI Assistant
//             </TabsTrigger>
//             <TabsTrigger
//               value="inspiration"
//               className="rounded-lg text-gray-300 data-[state=active]:bg-yellow-600 data-[state=active]:text-white transition-all duration-300"
//             >
//               Inspiration
//             </TabsTrigger>
//           </TabsList>
//           <TabsContent value="create">
//             <Card className="bg-gray-800/30 border-2 border-purple-500/50 rounded-xl overflow-hidden shadow-lg shadow-purple-500/20 backdrop-blur-sm">
//               <CardHeader className="bg-gradient-to-r from-purple-600/80 to-pink-600/80 p-6">
//                 <CardTitle className="text-2xl font-bold text-white">Create New Post</CardTitle>
//                 <CardDescription className="text-gray-200">Upload files or generate content with AI</CardDescription>
//               </CardHeader>
//               <CardContent className="p-6">
//                 <Suspense fallback={<div className="text-center">Loading post creator...</div>}>
//                   <PostCreator />
//                 </Suspense>
//               </CardContent>
//             </Card>
//           </TabsContent>
//           <TabsContent value="scheduled">
//             <Card className="bg-gray-800/30 border-2 border-blue-500/50 rounded-xl overflow-hidden shadow-lg shadow-blue-500/20 backdrop-blur-sm">
//               <CardHeader className="bg-gradient-to-r from-blue-600/80 to-cyan-600/80 p-6">
//                 <CardTitle className="text-2xl font-bold text-white">Scheduled Posts</CardTitle>
//                 <CardDescription className="text-gray-200">Manage your upcoming posts</CardDescription>
//               </CardHeader>
//               <CardContent className="p-6">
//                 <Suspense fallback={<div className="text-center">Loading scheduled posts...</div>}>
//                   <ScheduledPosts />
//                 </Suspense>
//               </CardContent>
//             </Card>
//           </TabsContent>
//           <TabsContent value="analytics">
//             <Card className="bg-gray-800/30 border-2 border-green-500/50 rounded-xl overflow-hidden shadow-lg shadow-green-500/20 backdrop-blur-sm">
//               <CardHeader className="bg-gradient-to-r from-green-600/80 to-teal-600/80 p-6">
//                 <CardTitle className="text-2xl font-bold text-white">Analytics</CardTitle>
//                 <CardDescription className="text-gray-200">Track your post performance</CardDescription>
//               </CardHeader>
//               <CardContent className="p-6">
//                 <Suspense fallback={<div className="text-center">Loading analytics...</div>}>
//                   <Analytics />
//                 </Suspense>
//               </CardContent>
//             </Card>
//           </TabsContent>
//           <TabsContent value="ai-assistant">
//             <Card className="bg-gray-800/30 border-2 border-pink-500/50 rounded-xl overflow-hidden shadow-lg shadow-pink-500/20 backdrop-blur-sm">
//               <CardHeader className="bg-gradient-to-r from-pink-600/80 to-purple-600/80 p-6">
//                 <CardTitle className="text-2xl font-bold text-white">AI Assistant</CardTitle>
//                 <CardDescription className="text-gray-200">Get AI-powered content suggestions</CardDescription>
//               </CardHeader>
//               <CardContent className="p-6">
//                 <Suspense fallback={<div className="text-center">Loading AI assistant...</div>}>
//                   <AIAssistant />
//                 </Suspense>
//               </CardContent>
//             </Card>
//           </TabsContent>
//           <TabsContent value="inspiration">
//             <Card className="bg-gray-800/30 border-2 border-yellow-500/50 rounded-xl overflow-hidden shadow-lg shadow-yellow-500/20 backdrop-blur-sm">
//               <CardHeader className="bg-gradient-to-r from-yellow-600/80 to-orange-600/80 p-6">
//                 <CardTitle className="text-2xl font-bold text-white">Content Inspiration</CardTitle>
//                 <CardDescription className="text-gray-200">Get fresh ideas for your posts</CardDescription>
//               </CardHeader>
//               <CardContent className="p-6">
//                 <Suspense fallback={<div className="text-center">Loading content inspiration...</div>}>
//                   <ContentInspiration />
//                 </Suspense>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   )
// }

// "use client"

// import { Suspense, useState } from "react"
// import PostCreator from "../_components/schedulers/PostCreator"
// import ScheduledPosts from "../_components/schedulers/ScheduledPosts"
// import Analytics from "../_components/schedulers/Analytics"
// import AIAssistant from "../_components/schedulers/AIAssistant"
// import ContentInspiration from "../_components/schedulers/ContentInspiration"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { motion, AnimatePresence } from "framer-motion"

// const tabItems = [
//   { value: "create", label: "Create", color: "bg-gray-600" },
//   { value: "scheduled", label: "Scheduled", color: "bg-gray-600" },
//   { value: "analytics", label: "Analytics", color: "bg-gray-600" },
//   { value: "ai-assistant", label: "AI Assistant", color: "bg-gray-600" },
//   { value: "inspiration", label: "Inspiration", color: "bg-gray-600" },
// ]

// export default function DashboardPage() {
//   const [activeTab, setActiveTab] = useState("create")

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-8">
//       <div className="container mx-auto space-y-8">
//         <h1 className="text-3xl sm:text-5xl font-bold mb-6 text-center text-gray-100">Instagram Post Scheduler</h1>

//         {/* Desktop Tabs */}
//         <div className="hidden sm:block">
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//             <TabsList className="grid w-full grid-cols-5 rounded-xl bg-gray-800 p-1">
//               {tabItems.map((item) => (
//                 <TabsTrigger
//                   key={item.value}
//                   value={item.value}
//                   className={`rounded-lg text-gray-300 data-[state=active]:text-white transition-all duration-300 ${item.color}`}
//                 >
//                   {item.label}
//                 </TabsTrigger>
//               ))}
//             </TabsList>
//           </Tabs>
//         </div>

//         {/* Mobile Dropdown */}
//         <div className="sm:hidden">
//           <Select value={activeTab} onValueChange={setActiveTab}>
//             <SelectTrigger className="w-full bg-gray-800 text-gray-100 border-gray-700">
//               <SelectValue placeholder="Select a tab" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-800 border-gray-700">
//               {tabItems.map((item) => (
//                 <SelectItem key={item.value} value={item.value} className="text-gray-100">
//                   {item.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeTab}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Card className="bg-gray-800 border-2 border-gray-700 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm">
//               <CardHeader className="bg-gray-700 p-6">
//                 <CardTitle className="text-2xl font-bold text-white">
//                   {tabItems.find((item) => item.value === activeTab)?.label}
//                 </CardTitle>
//                 <CardDescription className="text-gray-300">{getCardDescription(activeTab)}</CardDescription>
//               </CardHeader>
//               <CardContent className="p-6">
//                 <Suspense fallback={<div className="text-center">Loading...</div>}>{getTabContent(activeTab)}</Suspense>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   )
// }

// function getCardDescription(tab: string) {
//   switch (tab) {
//     case "create":
//       return "Upload files or generate content with AI"
//     case "scheduled":
//       return "Manage your upcoming posts"
//     case "analytics":
//       return "Track your post performance"
//     case "ai-assistant":
//       return "Get AI-powered content suggestions"
//     case "inspiration":
//       return "Get fresh ideas for your posts"
//     default:
//       return ""
//   }
// }

// function getTabContent(tab: string) {
//   switch (tab) {
//     case "create":
//       return <PostCreator />
//     case "scheduled":
//       return <ScheduledPosts />
//     case "analytics":
//       return <Analytics />
//     case "ai-assistant":
//       return <AIAssistant />
//     case "inspiration":
//       return <ContentInspiration />
//     default:
//       return null
//   }
// }

"use client"

import { Suspense, useState } from "react"
import PostCreator from "../_components/schedulers/PostCreator"
import ScheduledPosts from "../_components/schedulers/ScheduledPosts"
import Analytics from "../_components/schedulers/Analytics"
import AIAssistant from "../_components/schedulers/AIAssistant"
import ContentInspiration from "../_components/schedulers/ContentInspiration"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"

const tabItems = [
  { value: "create", label: "Create", color: "bg-gray-600" },
  { value: "scheduled", label: "Scheduled", color: "bg-gray-600" },
  { value: "analytics", label: "Analytics", color: "bg-gray-600" },
  { value: "ai-assistant", label: "AI Assistant", color: "bg-gray-600" },
  { value: "inspiration", label: "Inspiration", color: "bg-gray-600" },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("create")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-2 sm:p-4">
      <div className="container mx-auto space-y-4 sm:space-y-8">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
          Instagram Post Scheduler
        </h1>

        {/* Desktop Tabs */}
        <div className="hidden sm:block">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 rounded-xl bg-gray-800 p-1">
              {tabItems.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className="rounded-lg text-gray-300 data-[state=active]:text-white transition-all duration-300 data-[state=active]:bg-gray-700"
                >
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Mobile Dropdown */}
        <div className="sm:hidden">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full bg-gray-800 text-gray-100 border-gray-700">
              <SelectValue placeholder="Select a tab" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {tabItems.map((item) => (
                <SelectItem key={item.value} value={item.value} className="text-gray-100">
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-gray-800 border-2 border-gray-700 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm">
              <CardHeader className="bg-gray-750 p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl font-bold text-white">
                  {tabItems.find((item) => item.value === activeTab)?.label}
                </CardTitle>
                <CardDescription className="text-gray-300">{getCardDescription(activeTab)}</CardDescription>
              </CardHeader>
              <CardContent className="p-2 sm:p-6">
                <Suspense fallback={<div className="text-center">Loading...</div>}>{getTabContent(activeTab)}</Suspense>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function getCardDescription(tab: string) {
  switch (tab) {
    case "create":
      return "Upload files or generate content with AI"
    case "scheduled":
      return "Manage your upcoming posts"
    case "analytics":
      return "Track your post performance"
    case "ai-assistant":
      return "Get AI-powered content suggestions"
    case "inspiration":
      return "Get fresh ideas for your posts"
    default:
      return ""
  }
}

function getTabContent(tab: string) {
  switch (tab) {
    case "create":
      return <PostCreator />
    case "scheduled":
      return <ScheduledPosts />
    case "analytics":
      return <Analytics />
    case "ai-assistant":
      return <AIAssistant />
    case "inspiration":
      return <ContentInspiration />
    default:
      return null
  }
}

