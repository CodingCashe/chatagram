// import { useAutomationPosts } from '@/hooks/use-automations'
// import { useQueryAutomationPosts } from '@/hooks/user-queries'
// import React from 'react'
// import TriggerButton from '../trigger-button'
// import { InstagramPostProps } from '@/types/posts.type'
// import { CheckCircle } from 'lucide-react'
// import Image from 'next/image'
// import { cn } from '@/lib/utils'
// import { Button } from '@/components/ui/button'
// import Loader from '../../loader'

// type Props = {
//   id: string
// }

// const PostButton = ({ id }: Props) => {
//   const { data } = useQueryAutomationPosts()
//   const { posts, onSelectPost, mutate, isPending } = useAutomationPosts(id)

//   return (
//     <TriggerButton label="Attach a post">
//       {data?.status === 200 ? (
//         <div className="flex flex-col gap-y-3 w-full">
//           <div className="flex flex-wrap w-full gap-3">
//             {data.data.data.map((post: InstagramPostProps) => (
//               <div
//                 className="relative w-4/12 aspect-square rounded-lg cursor-pointer overflow-hidden"
//                 key={post.id}
//                 onClick={() =>
//                   onSelectPost({
//                     postid: post.id,
//                     media: post.media_url,
//                     mediaType: post.media_type,
//                     caption: post.caption,
//                   })
//                 }
//               >
//                 {posts.find((p) => p.postid === post.id) && (
//                   <CheckCircle
//                     fill="white"
//                     stroke="black"
//                     className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
//                   />
//                 )}
//                 <Image
//                   fill
//                   sizes="100vw"
//                   src={post.media_url}
//                   alt="post image"
//                   className={cn(
//                     'hover:opacity-75 transition duration-100',
//                     posts.find((p) => p.postid === post.id) && 'opacity-75'
//                   )}
//                 />
//               </div>
//             ))}
//           </div>
//           <Button
//             onClick={mutate}
//             disabled={posts.length === 0}
//             className="bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]"
//           >
//             <Loader state={isPending}>Attach Post</Loader>
//           </Button>
//         </div>
//       ) : (
//         <p className="text-text-secondary text-center">No posts found!</p>
//       )}
//     </TriggerButton>
//   )
// }

// export default PostButton

// import { useAutomationPosts } from '@/hooks/use-automations'
// import { useQueryAutomationPosts } from '@/hooks/user-queries'
// import React from 'react'
// import TriggerButton from '../trigger-button'
// import { InstagramPostProps } from '@/types/posts.type'
// import { CheckCircle } from 'lucide-react'
// import Image from 'next/image'
// import { cn } from '@/lib/utils'
// import { Button } from '@/components/ui/button'
// import Loader from '../../loader'
// import { motion } from 'framer-motion'

// type Props = {
//   id: string
// }

// const PostButton = ({ id }: Props) => {
//   const { data } = useQueryAutomationPosts()
//   const { posts, onSelectPost, mutate, isPending } = useAutomationPosts(id)

//   return (
//     <TriggerButton label="Attach a post">
//       {data?.status === 200 ? (
//         <div className="flex flex-col gap-y-4 w-full bg-background-90 p-6 rounded-2xl shadow-xl">
//           <div className="grid grid-cols-3 gap-3 w-full">
//             {data.data.data.map((post: InstagramPostProps) => (
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 className="relative aspect-square rounded-lg cursor-pointer overflow-hidden shadow-md"
//                 key={post.id}
//                 onClick={() =>
//                   onSelectPost({
//                     postid: post.id,
//                     media: post.media_url,
//                     mediaType: post.media_type,
//                     caption: post.caption,
//                   })
//                 }
//               >
//                 {posts.find((p) => p.postid === post.id) && (
//                   <div className="absolute inset-0 bg-blue-500 bg-opacity-50 flex items-center justify-center z-10">
//                     <CheckCircle
//                       fill="white"
//                       stroke="black"
//                       className="w-10 h-10"
//                     />
//                   </div>
//                 )}
//                 <Image
//                   fill
//                   sizes="100vw"
//                   src={post.media_url}
//                   alt="post image"
//                   className={cn(
//                     'object-cover transition-all duration-300',
//                     posts.find((p) => p.postid === post.id) && 'opacity-75'
//                   )}
//                 />
//               </motion.div>
//             ))}
//           </div>
//           <Button
//             onClick={mutate}
//             disabled={posts.length === 0}
//             className="bg-gradient-to-r from-green-400 to-blue-500 w-full font-medium text-white hover:from-green-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg mt-4"
//           >
//             <Loader state={isPending}>Attach Post</Loader>
//           </Button>
//         </div>
//       ) : (
//         <p className="text-text-secondary text-center p-4 bg-background-90 rounded-xl">We do not see any posts!</p>
//       )}
//     </TriggerButton>
//   )
// }

// export default PostButton

// "use client"

// import { useAutomationPosts } from "@/hooks/use-automations"
// import { useQueryAutomationPosts } from "@/hooks/user-queries"
// import { useState } from "react"
// import FloatingPanel from "../../panel"
// import type { InstagramPostProps } from "@/types/posts.type"
// import { CheckCircle, Search, Filter, SlidersHorizontal, PlusCircle } from "lucide-react"
// import Image from "next/image"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import Loader from "../../loader"
// import { motion } from "framer-motion"
// import { InstagramBlue } from "@/icons"
// import { Input } from "@/components/ui/input"

// type Props = {
//   id: string
//   theme?: {
//     id: string
//     name: string
//     primary: string
//     secondary: string
//   }
// }

// const PostButton = ({
//   id,
//   theme = { id: "blue", name: "Blue", primary: "light-blue", secondary: "#768BDD" },
// }: Props) => {
//   const { data } = useQueryAutomationPosts()
//   const { posts, onSelectPost, mutate, isPending } = useAutomationPosts(id)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [sortBy, setSortBy] = useState<"recent" | "popular">("recent")

//   // Filter and sort posts
//   const filteredPosts =
//     data?.status === 200
//       ? data.data.data
//           .filter(
//             (post: InstagramPostProps) =>
//               post.caption?.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === "",
//           )
//           .sort((a: InstagramPostProps, b: InstagramPostProps) => {
//             if (sortBy === "recent") {
//               return new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime()
//             } else {
//               return (0) - (3)
//             }
//           })
//       : []

//   return (
//     <FloatingPanel
//       title="Select posts to monitor"
//       trigger={
//         <Button className="bg-gradient-to-r from-[#3352CC] to-[#1C2D70] text-white font-medium">
//           <PlusCircle className="mr-2 h-4 w-4" />
//           Attach a post
//         </Button>
//       }
//     >
//       {data?.status === 200 ? (
//         <div className="flex flex-col gap-y-4 w-full">
//           <div className="flex items-center gap-3 mb-1">
//             <InstagramBlue />
//             <p className="text-lg font-medium text-white">Select posts to monitor</p>
//           </div>

//           <div className="bg-background-80 p-3 rounded-xl">
//             <div className="flex flex-col md:flex-row gap-3">
//               <div className="relative flex-grow">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
//                 <Input
//                   placeholder="Search posts..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-9 bg-background-90 border-none"
//                 />
//               </div>

//               <div className="flex gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setSortBy("recent")}
//                   className={cn(
//                     "border-background-90 bg-background-90",
//                     sortBy === "recent" && "border-light-blue text-light-blue",
//                   )}
//                 >
//                   <Filter className="h-4 w-4 mr-1" /> Recent
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setSortBy("popular")}
//                   className={cn(
//                     "border-background-90 bg-background-90",
//                     sortBy === "popular" && "border-light-blue text-light-blue",
//                   )}
//                 >
//                   <SlidersHorizontal className="h-4 w-4 mr-1" /> Popular
//                 </Button>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//             {filteredPosts.map((post: InstagramPostProps) => (
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="relative aspect-square rounded-lg cursor-pointer overflow-hidden group"
//                 key={post.id}
//                 onClick={() =>
//                   onSelectPost({
//                     postid: post.id,
//                     media: post.media_url,
//                     mediaType: post.media_type,
//                     caption: post.caption,
//                   })
//                 }
//               >
//                 <div
//                   className={cn(
//                     "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100",
//                     posts.find((p) => p.postid === post.id) && "opacity-100",
//                   )}
//                 />

//                 {posts.find((p) => p.postid === post.id) && (
//                   <div className="absolute inset-0 flex items-center justify-center z-10">
//                     <CheckCircle className="h-10 w-10 text-light-blue" />
//                   </div>
//                 )}

//                 <Image
//                   fill
//                   sizes="100vw"
//                   src={post.media_url || "/placeholder.svg"}
//                   alt="post image"
//                   className="object-cover transition-all duration-300 group-hover:scale-110"
//                 />

//                 <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <p className="text-white text-xs line-clamp-2">{post.caption}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           <Button
//             onClick={mutate}
//             disabled={posts.length === 0}
//             className="bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]"
//           >
//             <Loader state={isPending}>
//               Attach {posts.length} Post{posts.length !== 1 && "s"}
//             </Loader>
//           </Button>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center p-8 text-center">
//           <div className="p-4 rounded-full bg-background-80 mb-4">
//             <InstagramBlue />
//           </div>
//           <p className="text-white font-medium">No posts found</p>
//           <p className="text-sm text-text-secondary mt-1 max-w-xs">
//             Connect your Instagram account to see posts or create new content to monitor
//           </p>
//           <Button
//             className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] mt-4"
//             onClick={() => window.open("https://instagram.com", "_blank")}
//           >
//             Connect Instagram
//           </Button>
//         </div>
//       )}
//     </FloatingPanel>
//   )
// }

// export default PostButton

// "use client"

// import { useAutomationPosts } from "@/hooks/use-automations"
// import { useQueryAutomationPosts } from "@/hooks/user-queries"
// import { useState, useEffect } from "react"
// import FloatingPanel from "../../panel"
// import type { InstagramPostProps } from "@/types/posts.type"
// import type { ScheduledPost } from "@/actions/schedule/schedule-post"
// import { CheckCircle, Search, Filter, SlidersHorizontal, PlusCircle, Calendar, Clock, X } from "lucide-react"
// import Image from "next/image"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import Loader from "../../loader"
// import { motion } from "framer-motion"
// import { InstagramBlue } from "@/icons"
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import { getScheduledPosts } from "@/actions/schedule/schedule-post"
// import { format, parseISO } from "date-fns"

// type Props = {
//   id: string
//   theme?: {
//     id: string
//     name: string
//     primary: string
//     secondary: string
//   }
// }

// const PostButton = ({
//   id,
//   theme = { id: "blue", name: "Blue", primary: "light-blue", secondary: "#768BDD" },
// }: Props) => {
//   const { data } = useQueryAutomationPosts()
//   const {
//     posts,
//     onSelectPost,
//     scheduledPosts: selectedScheduledPostIds,
//     onSelectScheduledPost,
//     mutate,
//     isPending,
//   } = useAutomationPosts(id)

//   const [searchTerm, setSearchTerm] = useState("")
//   const [sortBy, setSortBy] = useState<"recent" | "popular">("recent")
//   const [activeTab, setActiveTab] = useState<"published" | "scheduled">("published")
//   const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([])
//   const [selectedScheduledPosts, setSelectedScheduledPosts] = useState<ScheduledPost[]>([])
//   const [isLoadingScheduled, setIsLoadingScheduled] = useState(false)

//   // Filter and sort published posts
//   const filteredPosts =
//     data?.status === 200
//       ? data.data.data
//           .filter(
//             (post: InstagramPostProps) =>
//               post.caption?.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === "",
//           )
//           .sort((a: InstagramPostProps, b: InstagramPostProps) => {
//             if (sortBy === "recent") {
//               return new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime()
//             } else {
//               return (0) - (0)
//             }
//           })
//       : []

//   // Load scheduled posts
//   const loadScheduledPosts = async () => {
//     if (scheduledPosts.length === 0) {
//       setIsLoadingScheduled(true)
//       try {
//         const response = await getScheduledPosts(id)
//         if (response.success && response.data) {
//           setScheduledPosts(response.data)

//           // Initialize selected scheduled posts from the hook
//           if (selectedScheduledPostIds && selectedScheduledPostIds.length > 0) {
//             const selected = response.data.filter((post) => selectedScheduledPostIds.includes(post.id))
//             setSelectedScheduledPosts(selected)
//           }
//         }
//       } catch (error) {
//         console.error("Error loading scheduled posts:", error)
//       } finally {
//         setIsLoadingScheduled(false)
//       }
//     }
//   }

//   // Handle tab change
//   const handleTabChange = (value: string) => {
//     setActiveTab(value as "published" | "scheduled")
//     if (value === "scheduled") {
//       loadScheduledPosts()
//     }
//   }

//   // Handle scheduled post selection
//   const handleSelectScheduledPost = (post: ScheduledPost) => {
//     // Update the hook state
//     onSelectScheduledPost(post)

//     // Update the local UI state
//     setSelectedScheduledPosts((prev) => {
//       const exists = prev.some((p) => p.id === post.id)
//       if (exists) {
//         return prev.filter((p) => p.id !== post.id)
//       } else {
//         return [...prev, post]
//       }
//     })
//   }

//   // Handle save with both published and scheduled posts
//   const handleSave = () => {
//     // The mutate function now handles both published and scheduled posts
//     mutate({
//       posts: posts,
//       scheduledPostIds: selectedScheduledPosts.map((post) => post.id),
//     })
//   }

//   // Clear all selected scheduled posts
//   const clearSelectedScheduledPosts = () => {
//     setSelectedScheduledPosts([])
//     // Reset the hook state for scheduled posts
//     selectedScheduledPostIds.forEach((id) => {
//       const dummyPost = { id } as ScheduledPost
//       onSelectScheduledPost(dummyPost)
//     })
//   }

//   // Update selected scheduled posts when the component mounts
//   useEffect(() => {
//     if (activeTab === "scheduled") {
//       loadScheduledPosts()
//     }
//   }, [activeTab])

//   return (
//     <FloatingPanel
//       title="Select posts to monitor"
//       trigger={
//         <Button className="bg-gradient-to-r from-[#3352CC] to-[#1C2D70] text-white font-medium">
//           <PlusCircle className="mr-2 h-4 w-4" />
//           Attach posts
//         </Button>
//       }
//     >
//       {data?.status === 200 ? (
//         <div className="flex flex-col gap-y-4 w-full">
//           <div className="flex items-center gap-3 mb-1">
//             <InstagramBlue />
//             <p className="text-lg font-medium text-white">Select posts to monitor</p>
//           </div>

//           <div className="bg-background-80 p-3 rounded-xl">
//             <div className="flex flex-col md:flex-row gap-3">
//               <div className="relative flex-grow">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
//                 <Input
//                   placeholder="Search posts..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-9 bg-background-90 border-none"
//                 />
//               </div>

//               <div className="flex gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setSortBy("recent")}
//                   className={cn(
//                     "border-background-90 bg-background-90",
//                     sortBy === "recent" && "border-light-blue text-light-blue",
//                   )}
//                 >
//                   <Filter className="h-4 w-4 mr-1" /> Recent
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setSortBy("popular")}
//                   className={cn(
//                     "border-background-90 bg-background-90",
//                     sortBy === "popular" && "border-light-blue text-light-blue",
//                   )}
//                 >
//                   <SlidersHorizontal className="h-4 w-4 mr-1" /> Popular
//                 </Button>
//               </div>
//             </div>
//           </div>

//           <Tabs defaultValue="published" onValueChange={handleTabChange}>
//             <TabsList className="mb-4">
//               <TabsTrigger value="published">
//                 <InstagramBlue />
//                 Published Posts
//               </TabsTrigger>
//               <TabsTrigger value="scheduled">
//                 <Calendar className="mr-2 h-4 w-4" />
//                 Scheduled Posts
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="published">
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                 {filteredPosts.map((post: InstagramPostProps) => (
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="relative aspect-square rounded-lg cursor-pointer overflow-hidden group"
//                     key={post.id}
//                     onClick={() =>
//                       onSelectPost({
//                         postid: post.id,
//                         media: post.media_url,
//                         mediaType: post.media_type,
//                         caption: post.caption,
//                       })
//                     }
//                   >
//                     <div
//                       className={cn(
//                         "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100",
//                         posts.find((p) => p.postid === post.id) && "opacity-100",
//                       )}
//                     />

//                     {posts.find((p) => p.postid === post.id) && (
//                       <div className="absolute inset-0 flex items-center justify-center z-10">
//                         <CheckCircle className="h-10 w-10 text-light-blue" />
//                       </div>
//                     )}

//                     <Image
//                       fill
//                       sizes="100vw"
//                       src={post.media_url || "/placeholder.svg"}
//                       alt="post image"
//                       className="object-cover transition-all duration-300 group-hover:scale-110"
//                     />

//                     <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       <p className="text-white text-xs line-clamp-2">{post.caption}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </TabsContent>

//             <TabsContent value="scheduled">
//               {isLoadingScheduled ? (
//                 <div className="flex justify-center items-center py-8">
//                   <Loader state={true}>Loading scheduled posts...</Loader>
//                 </div>
//               ) : scheduledPosts.length > 0 ? (
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                   {scheduledPosts.map((post) => (
//                     <motion.div
//                       key={post.id}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className={cn(
//                         "relative aspect-square rounded-lg cursor-pointer overflow-hidden group",
//                         selectedScheduledPosts.some((p) => p.id === post.id) && "ring-2 ring-light-blue",
//                       )}
//                       onClick={() => handleSelectScheduledPost(post)}
//                     >
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//                       {selectedScheduledPosts.some((p) => p.id === post.id) && (
//                         <div className="absolute inset-0 flex items-center justify-center z-10">
//                           <CheckCircle className="h-10 w-10 text-light-blue" />
//                         </div>
//                       )}

//                       <Image
//                         fill
//                         sizes="100vw"
//                         src={post.mediaUrl || "/placeholder.svg"}
//                         alt="scheduled post"
//                         className="object-cover transition-all duration-300 group-hover:scale-110"
//                       />

//                       <div className="absolute top-2 right-2 z-10">
//                         <Badge variant="secondary" className="bg-background-90/80 flex items-center gap-1">
//                           <Clock className="h-3 w-3" />
//                           {format(parseISO(post.scheduledDate), "MMM d")}
//                         </Badge>
//                       </div>

//                       <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                         <p className="text-white text-xs line-clamp-2">{post.caption}</p>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center p-8 text-center">
//                   <div className="p-4 rounded-full bg-background-80 mb-4">
//                     <Calendar className="h-6 w-6 text-light-blue" />
//                   </div>
//                   <p className="text-white font-medium">No scheduled posts found</p>
//                   <p className="text-sm text-text-secondary mt-1 max-w-xs">
//                     Schedule posts to monitor them when they are published
//                   </p>
//                 </div>
//               )}
//             </TabsContent>
//           </Tabs>

//           {(posts.length > 0 || selectedScheduledPosts.length > 0) && (
//             <div className="mt-3 pt-3 border-t border-background-80">
//               <div className="flex items-center justify-between mb-2">
//                 <h4 className="text-sm font-medium flex items-center">
//                   Selected Posts ({posts.length + selectedScheduledPosts.length})
//                 </h4>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="h-8 text-xs text-keyword-red hover:text-keyword-red hover:bg-keyword-red/10"
//                   onClick={() => {
//                     // Clear both published and scheduled posts
//                     posts.forEach((post) => onSelectPost(post))
//                     clearSelectedScheduledPosts()
//                   }}
//                 >
//                   Clear all
//                 </Button>
//               </div>

//               <div className="flex gap-2 overflow-x-auto py-1 pb-2">
//                 {/* Show published posts */}
//                 {posts.map((post) => (
//                   <div key={post.postid} className="relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden group">
//                     <Image
//                       src={post.media || "/placeholder.svg?height=64&width=64"}
//                       alt="Selected post"
//                       fill
//                       sizes="64px"
//                       className="object-cover"
//                     />
//                     <div
//                       className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
//                       onClick={() => onSelectPost(post)}
//                     >
//                       <X className="h-4 w-4 text-white" />
//                     </div>
//                   </div>
//                 ))}

//                 {/* Show scheduled posts */}
//                 {selectedScheduledPosts.map((post) => (
//                   <div key={post.id} className="relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden group">
//                     <div className="absolute top-0 right-0 z-10 bg-background-90/80 px-1 rounded-bl-md">
//                       <Clock className="h-3 w-3 text-light-blue" />
//                     </div>
//                     <Image
//                       src={post.mediaUrl || "/placeholder.svg?height=64&width=64"}
//                       alt="Selected scheduled post"
//                       fill
//                       sizes="64px"
//                       className="object-cover"
//                     />
//                     <div
//                       className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
//                       onClick={() => handleSelectScheduledPost(post)}
//                     >
//                       <X className="h-4 w-4 text-white" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <Button
//             onClick={handleSave}
//             disabled={posts.length === 0 && selectedScheduledPosts.length === 0}
//             className="bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]"
//           >
//             <Loader state={isPending}>
//               Attach {posts.length + selectedScheduledPosts.length} Post
//               {posts.length + selectedScheduledPosts.length !== 1 && "s"}
//             </Loader>
//           </Button>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center p-8 text-center">
//           <div className="p-4 rounded-full bg-background-80 mb-4">
//             <InstagramBlue />
//           </div>
//           <p className="text-white font-medium">No posts found</p>
//           <p className="text-sm text-text-secondary mt-1 max-w-xs">
//             Connect your Instagram account to see posts or create new content to monitor
//           </p>
//           <Button
//             className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] mt-4"
//             onClick={() => window.open("https://instagram.com", "_blank")}
//           >
//             Connect Instagram
//           </Button>
//         </div>
//       )}
//     </FloatingPanel>
//   )
// }

// export default PostButton

"use client"
import {onCurrentUser} from '@/actions/user'
import { useAutomationPosts } from "@/hooks/use-automations"
import { useQueryAutomationPosts } from "@/hooks/user-queries"
import { useState, useEffect } from "react"
import FloatingPanel from "../../panel"
import type { InstagramPostProps } from "@/types/posts.type"
import type { ScheduledPost } from "@/actions/schedule/schedule-post"
import { CheckCircle, Search, Filter, SlidersHorizontal, PlusCircle, Calendar, Clock, X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Loader from "../../loader"
import { motion } from "framer-motion"
import { InstagramBlue } from "@/icons"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { getScheduledPosts } from "@/actions/schedule/schedule-post"
import { format, parseISO } from "date-fns"

type Props = {
  id: string
  theme?: {
    id: string
    name: string
    primary: string
    secondary: string
  }
}

const PostButton = ({
  id,
  theme = { id: "blue", name: "Blue", primary: "light-blue", secondary: "#768BDD" },
}: Props) => {
  const { data } = useQueryAutomationPosts()
  const {
    posts,
    onSelectPost,
    scheduledPosts: selectedScheduledPostIds,
    onSelectScheduledPost,
    mutate,
    isPending,
  } = useAutomationPosts(id)

  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent")
  const [activeTab, setActiveTab] = useState<"published" | "scheduled">("published")
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([])
  const [selectedScheduledPosts, setSelectedScheduledPosts] = useState<ScheduledPost[]>([])
  const [isLoadingScheduled, setIsLoadingScheduled] = useState(false)

  // Filter and sort published posts
  const filteredPosts =
    data?.status === 200
      ? data.data.data
          .filter(
            (post: InstagramPostProps) =>
              post.caption?.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === "",
          )
          .sort((a: InstagramPostProps, b: InstagramPostProps) => {
            if (sortBy === "recent") {
              return new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime()
            } else {
              return (0 || 0) - (0 || 0)
            }
          })
      : []

  // Load scheduled posts
  const loadScheduledPosts = async () => {
    setIsLoadingScheduled(true)
    try {
      const user = await onCurrentUser()
      const response = await getScheduledPosts(user.id)
      
      if (response.success && response.data) {
        // Get all scheduled posts
        const allScheduledPosts = response.data

        // Filter to only show posts that are either:
        // 1. Not associated with any automation yet, or
        // 2. Already associated with this automation
        const availablePosts = allScheduledPosts.filter((post) => !post.automationId || post.automationId === id)

        setScheduledPosts(availablePosts)

        // Initialize selected scheduled posts from the hook
        if (selectedScheduledPostIds && selectedScheduledPostIds.length > 0) {
          const selected = availablePosts.filter((post) => selectedScheduledPostIds.includes(post.id))
          setSelectedScheduledPosts(selected)
        }
      }
    } catch (error) {
      console.error("Error loading scheduled posts:", error)
    } finally {
      setIsLoadingScheduled(false)
    }
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value as "published" | "scheduled")
    // Always refresh scheduled posts when switching to that tab
    if (value === "scheduled") {
      loadScheduledPosts()
    }
  }

  // Handle scheduled post selection
  const handleSelectScheduledPost = (post: ScheduledPost) => {
    // Update the hook state
    onSelectScheduledPost(post)

    // Update the local UI state
    setSelectedScheduledPosts((prev) => {
      const exists = prev.some((p) => p.id === post.id)
      if (exists) {
        return prev.filter((p) => p.id !== post.id)
      } else {
        return [...prev, post]
      }
    })
  }

  // Handle save with both published and scheduled posts
  const handleSave = () => {
    // The mutate function now handles both published and scheduled posts
    mutate({
      posts: posts,
      scheduledPostIds: selectedScheduledPosts.map((post) => post.id),
    })
  }

  // Clear all selected scheduled posts
  const clearSelectedScheduledPosts = () => {
    setSelectedScheduledPosts([])
    // Reset the hook state for scheduled posts
    selectedScheduledPostIds.forEach((id) => {
      const dummyPost = { id } as ScheduledPost
      onSelectScheduledPost(dummyPost)
    })
  }

  // Update selected scheduled posts when the component mounts
  useEffect(() => {
    // Load scheduled posts when component mounts
    loadScheduledPosts()
  }, [])

  return (
    <FloatingPanel
      title="Select posts to monitor"
      trigger={
        <Button className="bg-gradient-to-r from-[#3352CC] to-[#1C2D70] text-white font-medium">
          <PlusCircle className="mr-2 h-4 w-4" />
          Attach posts
        </Button>
      }
    >
      {data?.status === 200 ? (
        <div className="flex flex-col gap-y-4 w-full">
          <div className="flex items-center gap-3 mb-1">
            <InstagramBlue />
            <p className="text-lg font-medium text-white">Select posts to monitor</p>
          </div>

          <div className="bg-background-80 p-3 rounded-xl">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-background-90 border-none"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortBy("recent")}
                  className={cn(
                    "border-background-90 bg-background-90",
                    sortBy === "recent" && "border-light-blue text-light-blue",
                  )}
                >
                  <Filter className="h-4 w-4 mr-1" /> Recent
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortBy("popular")}
                  className={cn(
                    "border-background-90 bg-background-90",
                    sortBy === "popular" && "border-light-blue text-light-blue",
                  )}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-1" /> Popular
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="published" onValueChange={handleTabChange}>
            <TabsList className="mb-4">
              <TabsTrigger value="published">
                <InstagramBlue />
                Published Posts
              </TabsTrigger>
              <TabsTrigger value="scheduled">
                <Calendar className="mr-2 h-4 w-4" />
                Scheduled Posts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="published">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {filteredPosts.map((post: InstagramPostProps) => (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative aspect-square rounded-lg cursor-pointer overflow-hidden group"
                    key={post.id}
                    onClick={() =>
                      onSelectPost({
                        postid: post.id,
                        media: post.media_url,
                        mediaType: post.media_type,
                        caption: post.caption,
                      })
                    }
                  >
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                        posts.find((p) => p.postid === post.id) && "opacity-100",
                      )}
                    />

                    {posts.find((p) => p.postid === post.id) && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <CheckCircle className="h-10 w-10 text-light-blue" />
                      </div>
                    )}

                    <Image
                      fill
                      sizes="100vw"
                      src={post.media_url || "/placeholder.svg"}
                      alt="post image"
                      className="object-cover transition-all duration-300 group-hover:scale-110"
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-xs line-clamp-2">{post.caption}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scheduled">
              {isLoadingScheduled ? (
                <div className="flex justify-center items-center py-8">
                  <Loader state={true}>Loading scheduled posts...</Loader>
                </div>
              ) : scheduledPosts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {scheduledPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "relative aspect-square rounded-lg cursor-pointer overflow-hidden group",
                        selectedScheduledPosts.some((p) => p.id === post.id) && "ring-2 ring-light-blue",
                      )}
                      onClick={() => handleSelectScheduledPost(post)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {selectedScheduledPosts.some((p) => p.id === post.id) && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <CheckCircle className="h-10 w-10 text-light-blue" />
                        </div>
                      )}

                      <Image
                        fill
                        sizes="100vw"
                        src={post.mediaUrl || "/placeholder.svg"}
                        alt="scheduled post"
                        className="object-cover transition-all duration-300 group-hover:scale-110"
                      />

                      <div className="absolute top-2 right-2 z-10">
                        <Badge variant="secondary" className="bg-background-90/80 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {format(parseISO(post.scheduledDate), "MMM d")}
                        </Badge>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-xs line-clamp-2">{post.caption}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <div className="p-4 rounded-full bg-background-80 mb-4">
                    <Calendar className="h-6 w-6 text-light-blue" />
                  </div>
                  <p className="text-white font-medium">No scheduled posts found</p>
                  <p className="text-sm text-text-secondary mt-1 max-w-xs">
                    Schedule posts to monitor them when they are published
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {(posts.length > 0 || selectedScheduledPosts.length > 0) && (
            <div className="mt-3 pt-3 border-t border-background-80">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium flex items-center">
                  Selected Posts ({posts.length + selectedScheduledPosts.length})
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs text-keyword-red hover:text-keyword-red hover:bg-keyword-red/10"
                  onClick={() => {
                    // Clear both published and scheduled posts
                    posts.forEach((post) => onSelectPost(post))
                    clearSelectedScheduledPosts()
                  }}
                >
                  Clear all
                </Button>
              </div>

              <div className="flex gap-2 overflow-x-auto py-1 pb-2">
                {/* Show published posts */}
                {posts.map((post) => (
                  <div key={post.postid} className="relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden group">
                    <Image
                      src={post.media || "/placeholder.svg?height=64&width=64"}
                      alt="Selected post"
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                      onClick={() => onSelectPost(post)}
                    >
                      <X className="h-4 w-4 text-white" />
                    </div>
                  </div>
                ))}

                {/* Show scheduled posts */}
                {selectedScheduledPosts.map((post) => (
                  <div key={post.id} className="relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden group">
                    <div className="absolute top-0 right-0 z-10 bg-background-90/80 px-1 rounded-bl-md">
                      <Clock className="h-3 w-3 text-light-blue" />
                    </div>
                    <Image
                      src={post.mediaUrl || "/placeholder.svg?height=64&width=64"}
                      alt="Selected scheduled post"
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                      onClick={() => handleSelectScheduledPost(post)}
                    >
                      <X className="h-4 w-4 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={handleSave}
            disabled={posts.length === 0 && selectedScheduledPosts.length === 0}
            className="bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]"
          >
            <Loader state={isPending}>
              Attach {posts.length + selectedScheduledPosts.length} Post
              {posts.length + selectedScheduledPosts.length !== 1 && "s"}
            </Loader>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="p-4 rounded-full bg-background-80 mb-4">
            <InstagramBlue />
          </div>
          <p className="text-white font-medium">No posts found</p>
          <p className="text-sm text-text-secondary mt-1 max-w-xs">
            Connect your Instagram account to see posts or create new content to monitor
          </p>
          <Button
            className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] mt-4"
            onClick={() => window.open("https://instagram.com", "_blank")}
          >
            Connect Instagram
          </Button>
        </div>
      )}
    </FloatingPanel>
  )
}

export default PostButton

