"use client"

import type React from "react"
import { useState } from "react"
import MediaSelector from "./MediaSelector"
import PostScheduleForm from "./PostScheduleForm"

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
    <div className="space-y-8">
      <MediaSelector onMediaSelect={handleMediaSelect} selectedMedia={selectedMedia} />
      <PostScheduleForm userId={userId} selectedMedia={selectedMedia} onMediaClear={handleMediaClear} />
    </div>
  )
}

export default InstagramPostCreator

