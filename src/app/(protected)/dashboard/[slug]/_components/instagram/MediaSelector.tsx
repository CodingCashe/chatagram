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
//     const response = await fetch(`/api/unsplash?count=5`)
//     const data = await response.json()
//     return data.map((item: any) => ({
//       type: "image",
//       url: item.urls.regular,
//       name: item.alt_description || "Unsplash Image",
//     }))
//   }

//   const fetchPexelsVideos = async (): Promise<Media[]> => {
//     const response = await fetch(`/api/pexels?query=nature&per_page=5&size=small`)
//     const data = await response.json()
//     return data.videos.map((video: any) => ({
//       type: "video",
//       url: video.video_files.find((file: any) => file.quality === "sd" && file.width < 1000)?.link,
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
//                       className="absolute top-2 right-2 p-2 rounded-full bg-gray-500 bg-opacity-50"
//                       onClick={() => onSelect(media)}
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
//                       className="absolute top-2 right-2 p-2 rounded-full bg-gray-500 bg-opacity-50"
//                       onClick={() => onSelect(media)}
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

// "use client"

// import type React from "react"
// import { useState } from "react"
// import Image from "next/image"
// import { motion } from "framer-motion"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// const mediaOptions = [
//   {
//     name: "Cat",
//     url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
//   },
//   {
//     name: "Fancy",
//     url: "https://picsum.photos/1080/1080?random=1",
//   },
//   {
//     name: "Dog",
//     url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
//   },
//   {
//     name: "Landscape",
//     url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
//   },
//   {
//     name: "Food",
//     url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
//   },
// ]

// const MediaSelector: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0)

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaOptions.length)
//   }

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaOptions.length) % mediaOptions.length)
//   }

//   return (
//     <div className="relative bg-gray-800 p-6 rounded-lg">
//       <div className="overflow-hidden">
//         <motion.div
//           className="flex"
//           animate={{ x: `${-currentIndex * 100}%` }}
//           transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         >
//           {mediaOptions.map((option, index) => (
//             <div key={index} className="w-full flex-shrink-0">
//               <Image
//                 src={option.url || "/placeholder.svg"}
//                 alt={option.name}
//                 width={400}
//                 height={400}
//                 className="w-full h-64 object-cover rounded-lg"
//               />
//               <p className="text-center mt-2">{option.name}</p>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//       <button
//         className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
//         onClick={prevSlide}
//       >
//         <ChevronLeft size={24} />
//       </button>
//       <button
//         className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
//         onClick={nextSlide}
//       >
//         <ChevronRight size={24} />
//       </button>
//     </div>
//   )
// }

// export default MediaSelector

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import Image from "next/image"
// import { motion, AnimatePresence } from "framer-motion"
// import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
// import { Button } from "@/components/ui/button"

// const mediaOptions = [
//   {
//     name: "Mountain Landscape",
//     url: "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   },
//   {
//     name: "City Skyline",
//     url: "https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   },
//   {
//     name: "Beach Sunset",
//     url: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   },
//   {
//     name: "Forest Path",
//     url: "https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   },
//   {
//     name: "Coffee and Laptop",
//     url: "https://images.pexels.com/photos/1280560/pexels-photo-1280560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   },
// ]

// const MediaSelector: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [selectedImages, setSelectedImages] = useState<string[]>([])

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaOptions.length)
//   }

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaOptions.length) % mediaOptions.length)
//   }

//   const toggleImageSelection = (url: string) => {
//     setSelectedImages((prev) => (prev.includes(url) ? prev.filter((item) => item !== url) : [...prev, url]))
//   }

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "ArrowRight") nextSlide()
//       if (e.key === "ArrowLeft") prevSlide()
//     }
//     window.addEventListener("keydown", handleKeyDown)
//     return () => window.removeEventListener("keydown", handleKeyDown)
//   }, []) // Removed dependencies here

//   return (
//     <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg">
//       <div className="overflow-hidden">
//         <motion.div
//           className="flex"
//           animate={{ x: `${-currentIndex * 100}%` }}
//           transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         >
//           {mediaOptions.map((option, index) => (
//             <div key={index} className="w-full flex-shrink-0 relative">
//               <Image
//                 src={option.url || "/placeholder.svg"}
//                 alt={option.name}
//                 width={400}
//                 height={400}
//                 className="w-full h-64 object-cover rounded-lg"
//               />
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <Button
//                   variant={selectedImages.includes(option.url) ? "default" : "outline"}
//                   size="icon"
//                   className="rounded-full"
//                   onClick={() => toggleImageSelection(option.url)}
//                 >
//                   <Plus className={selectedImages.includes(option.url) ? "rotate-45" : ""} />
//                 </Button>
//               </div>
//               <p className="text-center mt-2 text-white">{option.name}</p>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//       <Button
//         variant="ghost"
//         size="icon"
//         className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full"
//         onClick={prevSlide}
//       >
//         <ChevronLeft size={24} />
//       </Button>
//       <Button
//         variant="ghost"
//         size="icon"
//         className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full"
//         onClick={nextSlide}
//       >
//         <ChevronRight size={24} />
//       </Button>
//       <div className="mt-4">
//         <h3 className="text-lg font-semibold text-white mb-2">Selected Images:</h3>
//         <div className="flex flex-wrap gap-2">
//           <AnimatePresence>
//             {selectedImages.map((url) => (
//               <motion.div
//                 key={url}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 className="relative"
//               >
//                 <Image
//                   src={url || "/placeholder.svg"}
//                   alt="Selected"
//                   width={80}
//                   height={80}
//                   className="w-20 h-20 object-cover rounded-md"
//                 />
//                 <Button
//                   variant="destructive"
//                   size="icon"
//                   className="absolute -top-2 -right-2 rounded-full w-6 h-6"
//                   onClick={() => toggleImageSelection(url)}
//                 >
//                   <Plus className="rotate-45" />
//                 </Button>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MediaSelector

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Plus, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const mediaOptions = [
  {
    name: "Mountain Landscape",
    url: "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "City Skyline",
    url: "https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Beach Sunset",
    url: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Forest Path",
    url: "https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Coffee and Laptop",
    url: "https://images.pexels.com/photos/1280560/pexels-photo-1280560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
]

const MediaSelector: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [imageLoadError, setImageLoadError] = useState<Record<string, boolean>>({})

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaOptions.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaOptions.length) % mediaOptions.length)
  }

  const toggleImageSelection = (url: string) => {
    setSelectedImages((prev) => (prev.includes(url) ? prev.filter((item) => item !== url) : [...prev, url]))
  }

  const handleImageError = (url: string) => {
    setImageLoadError((prev) => ({ ...prev, [url]: true }))
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide()
      if (e.key === "ArrowLeft") prevSlide()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, []) // Removed dependencies

  return (
    <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `${-currentIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {mediaOptions.map((option, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              {imageLoadError[option.url] ? (
                <div className="w-full h-64 bg-gray-700 flex items-center justify-center rounded-lg">
                  <AlertCircle className="text-gray-400" size={48} />
                </div>
              ) : (
                <Image
                  src={option.url || "/placeholder.svg"}
                  alt={option.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={() => handleImageError(option.url)}
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant={selectedImages.includes(option.url) ? "default" : "outline"}
                  size="icon"
                  className="rounded-full"
                  onClick={() => toggleImageSelection(option.url)}
                >
                  <Plus className={selectedImages.includes(option.url) ? "rotate-45" : ""} />
                </Button>
              </div>
              <p className="text-center mt-2 text-white">{option.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </Button>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-white mb-2">Selected Images:</h3>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {selectedImages.map((url) => (
              <motion.div
                key={url}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative"
              >
                {imageLoadError[url] ? (
                  <div className="w-20 h-20 bg-gray-700 flex items-center justify-center rounded-md">
                    <AlertCircle className="text-gray-400" size={24} />
                  </div>
                ) : (
                  <Image
                    src={url || "/placeholder.svg"}
                    alt="Selected"
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-md"
                    onError={() => handleImageError(url)}
                  />
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 rounded-full w-6 h-6"
                  onClick={() => toggleImageSelection(url)}
                >
                  <Plus className="rotate-45" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default MediaSelector

