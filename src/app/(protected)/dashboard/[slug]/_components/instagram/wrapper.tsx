// "use client"
// import MediaSelector from "./MediaSelector"

// interface Media {
//   type: "image" | "video"
//   url: string
//   name: string
// }

// interface MediaSelectorWrapperProps {
//   maxItems: number
// }

// export default function MediaSelectorWrapper({ maxItems }: MediaSelectorWrapperProps) {
//   const handleSelect = (media: Media) => {
//     // Handle the selection here
//     console.log("Selected media:", media)
//   }

//   return <MediaSelector onSelect={handleSelect} maxItems={maxItems} />
// }

"use client"

import { useState, useCallback } from "react"
import MediaSelector from "./MediaSelector"

interface Media {
  type: "image" | "video"
  url: string
  name: string
}

interface MediaSelectorWrapperProps {
  maxItems: number
  onSelectionChange?: (selectedMedia: Media[]) => void
}

export default function MediaSelectorWrapper({ maxItems, onSelectionChange }: MediaSelectorWrapperProps) {
  const [selectedMedia, setSelectedMedia] = useState<Media[]>([])

  const handleSelect = useCallback(
    (media: Media) => {
      setSelectedMedia((prevSelected) => {
        const isAlreadySelected = prevSelected.some((item) => item.url === media.url)
        let newSelected: Media[]

        if (isAlreadySelected) {
          newSelected = prevSelected.filter((item) => item.url !== media.url)
        } else if (prevSelected.length < maxItems) {
          newSelected = [...prevSelected, media]
        } else {
          newSelected = prevSelected
        }

        // Call the onSelectionChange prop if it exists
        if (onSelectionChange) {
          onSelectionChange(newSelected)
        }

        return newSelected
      })
    },
    [maxItems, onSelectionChange],
  )

  return (
    <div>
      <MediaSelector onSelect={handleSelect} maxItems={maxItems} />
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">
          Selected Media ({selectedMedia.length}/{maxItems}):
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {selectedMedia.map((media, index) => (
            <div key={index} className="bg-gray-700 p-2 rounded">
              {media.type === "image" ? (
                <img
                  src={media.url || "/placeholder.svg"}
                  alt={media.name}
                  className="w-full h-24 object-cover rounded"
                />
              ) : (
                <video src={media.url} className="w-full h-24 object-cover rounded" />
              )}
              <p className="text-sm mt-1 truncate">{media.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

