// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import Image from "next/image"
// import { motion } from "framer-motion"
// import { ChevronLeft, ChevronRight, Check, ImageIcon, Film } from "lucide-react"
// import { Tab } from "@headlessui/react"

// interface Media {
//   type: "image" | "video"
//   url: string
//   name: string
// }

// interface MediaSelectorProps {
//   onSelect: (media: Media) => void
//   maxItems: number
// }

// const MediaSelector: React.FC<MediaSelectorProps> = ({ onSelect, maxItems }) => {
//   const [mediaOptions, setMediaOptions] = useState<Media[]>([])
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [selectedMedia, setSelectedMedia] = useState<Media[]>([])
//   const [activeTab, setActiveTab] = useState<"image" | "video">("image")

//   useEffect(() => {
//     fetchMedia()
//   }, []) // Removed activeTab from dependencies

//   const fetchMedia = async () => {
//     if (activeTab === "image") {
//       const images = await fetchUnsplashImages()
//       setMediaOptions(images)
//     } else {
//       const videos = await fetchPexelsVideos()
//       setMediaOptions(videos)
//     }
//   }

//   const fetchUnsplashImages = async (): Promise<Media[]> => {
//     const response = await fetch(
//       `https://api.unsplash.com/photos/random?count=5&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
//     )
//     const data = await response.json()
//     return data.map((item: any) => ({
//       type: "image",
//       url: item.urls.regular,
//       name: item.alt_description || "Unsplash Image",
//     }))
//   }

//   const fetchPexelsVideos = async (): Promise<Media[]> => {
//     const response = await fetch(`https://api.pexels.com/videos/search?query=nature&per_page=5&size=small`, {
//       headers: {
//         Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY || "",
//       },
//     })
//     const data = await response.json()
//     return data.videos.map((video: any) => ({
//       type: "video",
//       url: video.video_files.find((file: any) => file.quality === "sd" && file.width < 1000).link,
//       name: video.user.name || "Pexels Video",
//     }))
//   }

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaOptions.length)
//   }

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaOptions.length) % mediaOptions.length)
//   }

//   const handleSelect = (media: Media) => {
//     if (selectedMedia.length < maxItems) {
//       setSelectedMedia([...selectedMedia, media])
//       onSelect(media)
//     }
//   }

//   return (
//     <div className="bg-gray-800 p-6 rounded-lg">
//       <Tab.Group>
//         <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-4">
//           <Tab
//             className={({ selected }) =>
//               `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
//               ${selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"}`
//             }
//             onClick={() => setActiveTab("image")}
//           >
//             <ImageIcon className="w-5 h-5 inline-block mr-2" />
//             Images (JPEG only)
//           </Tab>
//           <Tab
//             className={({ selected }) =>
//               `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
//               ${selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"}`
//             }
//             onClick={() => setActiveTab("video")}
//           >
//             <Film className="w-5 h-5 inline-block mr-2" />
//             Videos
//           </Tab>
//         </Tab.List>
//         <Tab.Panels>
//           <Tab.Panel>
//             <div className="relative overflow-hidden">
//               <motion.div
//                 className="flex"
//                 animate={{ x: `${-currentIndex * 100}%` }}
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               >
//                 {mediaOptions.map((media, index) => (
//                   <div key={index} className="w-full flex-shrink-0 relative">
//                     {media.type === "image" ? (
//                       <Image
//                         src={media.url || "/placeholder.svg"}
//                         alt={media.name}
//                         width={400}
//                         height={400}
//                         className="w-full h-64 object-cover rounded-lg"
//                       />
//                     ) : (
//                       <video src={media.url} className="w-full h-64 object-cover rounded-lg" controls />
//                     )}
//                     <p className="text-center mt-2">{media.name}</p>
//                     <button
//                       className={`absolute top-2 right-2 p-2 rounded-full ${
//                         selectedMedia.includes(media) ? "bg-green-500" : "bg-gray-500 bg-opacity-50"
//                       }`}
//                       onClick={() => handleSelect(media)}
//                       disabled={selectedMedia.length >= maxItems}
//                     >
//                       <Check className="w-4 h-4 text-white" />
//                     </button>
//                   </div>
//                 ))}
//               </motion.div>
//               <button
//                 className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
//                 onClick={prevSlide}
//               >
//                 <ChevronLeft size={24} />
//               </button>
//               <button
//                 className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
//                 onClick={nextSlide}
//               >
//                 <ChevronRight size={24} />
//               </button>
//             </div>
//           </Tab.Panel>
//           <Tab.Panel>
//             <div className="relative overflow-hidden">
//               <motion.div
//                 className="flex"
//                 animate={{ x: `${-currentIndex * 100}%` }}
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               >
//                 {mediaOptions.map((media, index) => (
//                   <div key={index} className="w-full flex-shrink-0 relative">
//                     <video src={media.url} className="w-full h-64 object-cover rounded-lg" controls />
//                     <p className="text-center mt-2">{media.name}</p>
//                     <button
//                       className={`absolute top-2 right-2 p-2 rounded-full ${
//                         selectedMedia.includes(media) ? "bg-green-500" : "bg-gray-500 bg-opacity-50"
//                       }`}
//                       onClick={() => handleSelect(media)}
//                       disabled={selectedMedia.length >= maxItems}
//                     >
//                       <Check className="w-4 h-4 text-white" />
//                     </button>
//                   </div>
//                 ))}
//               </motion.div>
//               <button
//                 className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
//                 onClick={prevSlide}
//               >
//                 <ChevronLeft size={24} />
//               </button>
//               <button
//                 className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
//                 onClick={nextSlide}
//               >
//                 <ChevronRight size={24} />
//               </button>
//             </div>
//           </Tab.Panel>
//         </Tab.Panels>
//       </Tab.Group>
//     </div>
//   )
// }

// export default MediaSelector

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Check, ImageIcon, Film } from "lucide-react"
import { Tab } from "@headlessui/react"

interface Media {
  type: "image" | "video"
  url: string
  name: string
}

interface MediaSelectorProps {
  onSelect: (media: Media) => void
  maxItems: number
}

const MediaSelector: React.FC<MediaSelectorProps> = ({ onSelect, maxItems }) => {
  const [mediaOptions, setMediaOptions] = useState<Media[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedMedia, setSelectedMedia] = useState<Media[]>([])
  const [activeTab, setActiveTab] = useState<"image" | "video">("image")

  useEffect(() => {
    fetchMedia()
  }, []) // Removed activeTab from dependencies

  const fetchMedia = async () => {
    if (activeTab === "image") {
      const images = await fetchUnsplashImages()
      setMediaOptions(images)
    } else {
      const videos = await fetchPexelsVideos()
      setMediaOptions(videos)
    }
  }

  const fetchUnsplashImages = async (): Promise<Media[]> => {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?count=5&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
    )
    const data = await response.json()
    return data.map((item: any) => ({
      type: "image",
      url: item.urls.regular,
      name: item.alt_description || "Unsplash Image",
    }))
  }

  const fetchPexelsVideos = async (): Promise<Media[]> => {
    const response = await fetch(`https://api.pexels.com/videos/search?query=nature&per_page=5&size=small`, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY || "",
      },
    })
    const data = await response.json()
    return data.videos.map((video: any) => ({
      type: "video",
      url: video.video_files.find((file: any) => file.quality === "sd" && file.width < 1000).link,
      name: video.user.name || "Pexels Video",
    }))
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaOptions.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaOptions.length) % mediaOptions.length)
  }

  const handleSelect = (media: Media) => {
    if (selectedMedia.length < maxItems) {
      setSelectedMedia([...selectedMedia, media])
      onSelect(media)
    }
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-4">
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
              ${selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"}`
            }
            onClick={() => setActiveTab("image")}
          >
            <ImageIcon className="w-5 h-5 inline-block mr-2" />
            Images (JPEG only)
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
              ${selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"}`
            }
            onClick={() => setActiveTab("video")}
          >
            <Film className="w-5 h-5 inline-block mr-2" />
            Videos
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="relative overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `${-currentIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {mediaOptions.map((media, index) => (
                  <div key={index} className="w-full flex-shrink-0 relative">
                    {media.type === "image" ? (
                      <Image
                        src={media.url || "/placeholder.svg"}
                        alt={media.name}
                        width={400}
                        height={400}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    ) : (
                      <video src={media.url} className="w-full h-64 object-cover rounded-lg" controls />
                    )}
                    <p className="text-center mt-2">{media.name}</p>
                    <button
                      className={`absolute top-2 right-2 p-2 rounded-full ${
                        selectedMedia.includes(media) ? "bg-green-500" : "bg-gray-500 bg-opacity-50"
                      }`}
                      onClick={() => handleSelect(media)}
                      disabled={selectedMedia.length >= maxItems}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </motion.div>
              <button
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                onClick={prevSlide}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                onClick={nextSlide}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="relative overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `${-currentIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {mediaOptions.map((media, index) => (
                  <div key={index} className="w-full flex-shrink-0 relative">
                    <video src={media.url} className="w-full h-64 object-cover rounded-lg" controls />
                    <p className="text-center mt-2">{media.name}</p>
                    <button
                      className={`absolute top-2 right-2 p-2 rounded-full ${
                        selectedMedia.includes(media) ? "bg-green-500" : "bg-gray-500 bg-opacity-50"
                      }`}
                      onClick={() => handleSelect(media)}
                      disabled={selectedMedia.length >= maxItems}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </motion.div>
              <button
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                onClick={prevSlide}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                onClick={nextSlide}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default MediaSelector

