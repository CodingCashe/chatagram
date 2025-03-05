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

"use client"

import { useAutomationPosts } from "@/hooks/use-automations"
import { useQueryAutomationPosts } from "@/hooks/user-queries"
import { useState } from "react"
import FloatingPanel from "../../panel"
import type { InstagramPostProps } from "@/types/posts.type"
import { CheckCircle, Search, Filter, SlidersHorizontal, PlusCircle } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Loader from "../../loader"
import { motion } from "framer-motion"
import { InstagramBlue } from "@/icons"
import { Input } from "@/components/ui/input"

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
  const { posts, onSelectPost, mutate, isPending } = useAutomationPosts(id)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent")

  // Filter and sort posts
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
              return (0) - (3)
            }
          })
      : []

  return (
    <FloatingPanel
      title="Select posts to monitor"
      trigger={
        <Button className="bg-gradient-to-r from-[#3352CC] to-[#1C2D70] text-white font-medium">
          <PlusCircle className="mr-2 h-4 w-4" />
          Attach a post
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

          <Button
            onClick={mutate}
            disabled={posts.length === 0}
            className="bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]"
          >
            <Loader state={isPending}>
              Attach {posts.length} Post{posts.length !== 1 && "s"}
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

