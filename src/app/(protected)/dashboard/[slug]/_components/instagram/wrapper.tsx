"use client"
import MediaSelector from "./MediaSelector"

interface Media {
  type: "image" | "video"
  url: string
  name: string
}

interface MediaSelectorWrapperProps {
  maxItems: number
}

export default function MediaSelectorWrapper({ maxItems }: MediaSelectorWrapperProps) {
  const handleSelect = (media: Media) => {
    // Handle the selection here
    console.log("Selected media:", media)
  }

  return <MediaSelector onSelect={handleSelect} maxItems={maxItems} />
}

