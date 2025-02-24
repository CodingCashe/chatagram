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

import { useAutomationPosts } from '@/hooks/use-automations'
import { useQueryAutomationPosts } from '@/hooks/user-queries'
import React from 'react'
import TriggerButton from '../trigger-button'
import { InstagramPostProps } from '@/types/posts.type'
import { CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'
import { motion } from 'framer-motion'

type Props = {
  id: string
}

const PostButton = ({ id }: Props) => {
  const { data } = useQueryAutomationPosts()
  const { posts, onSelectPost, mutate, isPending } = useAutomationPosts(id)

  return (
    <TriggerButton label="Attach a post">
      {data?.status === 200 ? (
        <div className="flex flex-col gap-y-4 w-full bg-background-90 p-6 rounded-2xl shadow-xl">
          <div className="grid grid-cols-3 gap-3 w-full">
            {data.data.data.map((post: InstagramPostProps) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative aspect-square rounded-lg cursor-pointer overflow-hidden shadow-md"
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
                {posts.find((p) => p.postid === post.id) && (
                  <div className="absolute inset-0 bg-blue-500 bg-opacity-50 flex items-center justify-center z-10">
                    <CheckCircle
                      fill="white"
                      stroke="black"
                      className="w-10 h-10"
                    />
                  </div>
                )}
                <Image
                  fill
                  sizes="100vw"
                  src={post.media_url}
                  alt="post image"
                  className={cn(
                    'object-cover transition-all duration-300',
                    posts.find((p) => p.postid === post.id) && 'opacity-75'
                  )}
                />
              </motion.div>
            ))}
          </div>
          <Button
            onClick={mutate}
            disabled={posts.length === 0}
            className="bg-gradient-to-r from-green-400 to-blue-500 w-full font-medium text-white hover:from-green-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg mt-4"
          >
            <Loader state={isPending}>Attach Post</Loader>
          </Button>
        </div>
      ) : (
        <p className="text-text-secondary text-center p-4 bg-background-90 rounded-xl">We do not see any posts!</p>
      )}
    </TriggerButton>
  )
}

export default PostButton

