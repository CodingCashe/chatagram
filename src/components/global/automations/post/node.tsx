// 'use client'
// import { Separator } from '@/components/ui/separator'
// import { useQueryAutomation } from '@/hooks/user-queries'
// import { InstagramBlue, Warning } from '@/icons'
// import Image from 'next/image'
// import React from 'react'

// type Props = {
//   id: string
// }

// const PostNode = ({ id }: Props) => {
//   const { data } = useQueryAutomation(id)

//   return (
//     data?.data &&
//     data.data.posts.length > 0 && (
//       <div className="w-10/12 lg:w-8/12 relative xl:w-4/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
//         <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
//           <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
//           <Separator
//             orientation="vertical"
//             className="bottom-full flex-1 border-[1px] border-connector/10"
//           />
//           <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
//         </div>
//         <div className="flex gap-x-2">
//           <Warning />
//           If they comment on...
//         </div>
//         <div className="bg-background-80 p-3 rounded-xl flex flex-col gap-y-2">
//           <div className="flex gap-x-2 items-center">
//             <InstagramBlue />
//             <p className="font-bold text-lg">These posts</p>
//           </div>
//           <div className="flex gap-x-2 flex-wrap mt-3">
//             {data.data.posts.map((post) => (
//               <div
//                 key={post.id}
//                 className="relative w-4/12 aspect-square rounded-lg cursor-pointer overflow-hidden"
//               >
//                 <Image
//                   fill
//                   sizes="100vw"
//                   src={post.media}
//                   alt="post image"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     )
//   )
// }

// export default PostNode


// 'use client'

// import { Separator } from '@/components/ui/separator'
// import { useQueryAutomation } from '@/hooks/user-queries'
// import { InstagramBlue, Warning } from '@/icons'
// import Image from 'next/image'
// import React from 'react'
// import { motion } from 'framer-motion'

// type Props = {
//   id: string
// }

// const PostNode = ({ id }: Props) => {
//   const { data } = useQueryAutomation(id)

//   if (!data?.data || data.data.posts.length === 0) {
//     return null
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="w-10/12 lg:w-8/12 relative xl:w-4/12 p-1 rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
//     >
//       <div className="bg-[#1D1D1D] p-5 rounded-2xl flex flex-col gap-y-3">
//         <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
//           <span className="h-[9px] w-[9px] bg-pink-500 rounded-full animate-pulse" />
//           <Separator
//             orientation="vertical"
//             className="bottom-full flex-1 border-[1px] border-pink-500"
//           />
//           <span className="h-[9px] w-[9px] bg-pink-500 rounded-full animate-pulse" />
//         </div>
//         <div className="flex gap-x-2 items-center bg-background-80 p-3 rounded-xl shadow-inner">
//           <Warning />
//           <span className="text-lg font-semibold">If they write comments on...</span>
//         </div>
//         <div className="bg-background-80 p-4 rounded-xl flex flex-col gap-y-3 shadow-lg">
//           <div className="flex gap-x-3 items-center">
//             <InstagramBlue />
//             <p className="text-xl font-semibold">These Posts</p>
//           </div>
//           <div className="grid grid-cols-3 gap-3 mt-3">
//             {data.data.posts.map((post) => (
//               <motion.div
//                 key={post.id}
//                 whileHover={{ scale: 1.05 }}
//                 className="relative aspect-square rounded-lg cursor-pointer overflow-hidden shadow-md"
//               >
//                 <Image
//                   fill
//                   sizes="100vw"
//                   src={post.media}
//                   alt="post image"
//                   className="object-cover"
//                 />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// export default PostNode

"use client"

import { Separator } from "@/components/ui/separator"
import { useQueryAutomation } from "@/hooks/user-queries"
import Image from "next/image"
import { motion } from "framer-motion"
import { AlertCircle, Instagram } from "lucide-react"

type Props = {
  id: string
}

const PostNode = ({ id }: Props) => {
  const { data } = useQueryAutomation(id)

  if (!data?.data || data.data.posts.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-10/12 lg:w-8/12 relative xl:w-4/12"
    >
      <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
        <span className="h-3 w-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 shadow-lg shadow-emerald-500/30" />
        <Separator orientation="vertical" className="h-full border-l-2 border-dashed border-emerald-500/30" />
        <span className="h-3 w-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 shadow-lg shadow-emerald-500/30" />
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-1 shadow-xl">
        <div className="bg-slate-900/80 backdrop-blur-sm p-5 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <AlertCircle className="h-5 w-5 text-emerald-400" />
            </div>
            <p className="text-lg font-medium text-emerald-300">If they write comments on...</p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-slate-700 rounded-lg">
                <Instagram className="h-5 w-5 text-emerald-400" />
              </div>
              <p className="text-lg font-medium text-white">These Posts</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              {data.data.posts.map((post) => (
                <motion.div
                  key={post.id}
                  whileHover={{ scale: 1.05 }}
                  className="relative aspect-square rounded-lg overflow-hidden shadow-md group"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Image
                    fill
                    sizes="100vw"
                    src={post.media || "/placeholder.svg"}
                    alt="post image"
                    className="object-cover transition-all duration-300 group-hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PostNode

