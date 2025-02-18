// "use client"

// import type React from "react"
// import { useState } from "react"
// import MediaSelector from "./MediaSelector"
// import PostScheduleForm from "./PostScheduleForm"

// interface InstagramPostCreatorProps {
//   userId: string
// }

// const InstagramPostCreator: React.FC<InstagramPostCreatorProps> = ({ userId }) => {
//   const [selectedMedia, setSelectedMedia] = useState<Array<{ type: string; name: string; url: string }>>([])

//   const handleMediaSelect = (media: Array<{ type: string; name: string; url: string }>) => {
//     setSelectedMedia(media)
//   }

//   const handleMediaClear = () => {
//     setSelectedMedia([])
//   }

//   return (
//     <div className="space-y-8">
//       <MediaSelector onMediaSelect={handleMediaSelect} selectedMedia={selectedMedia} />
//       <PostScheduleForm userId={userId} selectedMedia={selectedMedia} onMediaClear={handleMediaClear} />
//     </div>
//   )
// }

// export default InstagramPostCreator

"use client"

import type React from "react"
import { useState } from "react"
import MediaSelector from "./MediaSelector"
import PostScheduleForm from "./PostScheduleForm"
import { motion } from "framer-motion"

interface InstagramPostCreatorProps {
  userId: string
}

const InstagramPostCreator: React.FC<InstagramPostCreatorProps> = ({ userId }) => {
  const [selectedMedia, setSelectedMedia] = useState<Array<{ type: string; name: string; url: string }>>([])

  const handleMediaSelect = (media: Array<{ type: string; name: string; url: string }>) => {
    setSelectedMedia(media)
  }

  const handleMediaClear = () => {
    setSelectedMedia([])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 bg-gray-900 p-6 rounded-lg shadow-xl"
    >
      <MediaSelector onMediaSelect={handleMediaSelect} selectedMedia={selectedMedia} />
      <PostScheduleForm userId={userId} selectedMedia={selectedMedia} onMediaClear={handleMediaClear} />
    </motion.div>
  )
}

export default InstagramPostCreator

