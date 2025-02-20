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

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import Image from "next/image"
// import { motion, AnimatePresence } from "framer-motion"
// import { ChevronLeft, ChevronRight, Plus, AlertCircle } from "lucide-react"
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
//   const [imageLoadError, setImageLoadError] = useState<Record<string, boolean>>({})

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaOptions.length)
//   }

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaOptions.length) % mediaOptions.length)
//   }

//   const toggleImageSelection = (url: string) => {
//     setSelectedImages((prev) => (prev.includes(url) ? prev.filter((item) => item !== url) : [...prev, url]))
//   }

//   const handleImageError = (url: string) => {
//     setImageLoadError((prev) => ({ ...prev, [url]: true }))
//   }

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "ArrowRight") nextSlide()
//       if (e.key === "ArrowLeft") prevSlide()
//     }
//     window.addEventListener("keydown", handleKeyDown)
//     return () => window.removeEventListener("keydown", handleKeyDown)
//   }, []) // Removed dependencies

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
//               {imageLoadError[option.url] ? (
//                 <div className="w-full h-64 bg-gray-700 flex items-center justify-center rounded-lg">
//                   <AlertCircle className="text-gray-400" size={48} />
//                 </div>
//               ) : (
//                 <Image
//                   src={option.url || "/placeholder.svg"}
//                   alt={option.name}
//                   width={400}
//                   height={400}
//                   className="w-full h-64 object-cover rounded-lg"
//                   onError={() => handleImageError(option.url)}
//                 />
//               )}
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
//                 {imageLoadError[url] ? (
//                   <div className="w-20 h-20 bg-gray-700 flex items-center justify-center rounded-md">
//                     <AlertCircle className="text-gray-400" size={24} />
//                   </div>
//                 ) : (
//                   <Image
//                     src={url || "/placeholder.svg"}
//                     alt="Selected"
//                     width={80}
//                     height={80}
//                     className="w-20 h-20 object-cover rounded-md"
//                     onError={() => handleImageError(url)}
//                   />
//                 )}
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


// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import Image from "next/image"
// import { motion, AnimatePresence, useAnimation } from "framer-motion"
// import { ChevronLeft, ChevronRight, Plus, X, Video, Shuffle } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useInView } from "react-intersection-observer"

// const mediaOptions = [
//   { type: "image", name: "Neon City", url: "https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg" },
//   { type: "image", name: "Forest Mist", url: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg" },
//   { type: "image", name: "Ocean Sunset", url: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg" },
//   { type: "image", name: "Mountain Lake", url: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg" },
//   {
//     type: "video",
//     name: "Aerial Beach",
//     url: "https://player.vimeo.com/external/368763065.sd.mp4?s=13b81c0b1e54a7d70b4b1a65793c96bff3c07f32&profile_id=165&oauth2_token_id=57447761",
//   },
//   { type: "image", name: "Northern Lights", url: "https://images.pexels.com/photos/1933316/pexels-photo-1933316.jpeg" },
//   { type: "image", name: "Autumn Road", url: "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg" },
//   {
//     type: "video",
//     name: "Floating Lanterns",
//     url: "https://player.vimeo.com/external/370467553.sd.mp4?s=6b1b2f0b4a9b8d2c6f1b558d6f0ec7a97f8f2e3d&profile_id=165&oauth2_token_id=57447761",
//   },
//   { type: "image", name: "Desert Dunes", url: "https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg" },
//   { type: "image", name: "Snowy Mountains", url: "https://images.pexels.com/photos/869258/pexels-photo-869258.jpeg" },
//   {
//     type: "video",
//     name: "Waterfall",
//     url: "https://player.vimeo.com/external/384761655.sd.mp4?s=383ab4dbc773cd0d5ece3af208d8dcc01a0cc65b&profile_id=165&oauth2_token_id=57447761",
//   },
//   { type: "image", name: "Lavender Fields", url: "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg" },
//   { type: "image", name: "City Skyline", url: "https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg" },
//   {
//     type: "video",
//     name: "Ocean Waves",
//     url: "https://player.vimeo.com/external/368763014.sd.mp4?s=6dc3ad9c4e3b7926e2d5e4b9f44a3dd472722ee7&profile_id=165&oauth2_token_id=57447761",
//   },
//   { type: "image", name: "Starry Night", url: "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg" },
//   { type: "image", name: "Tropical Beach", url: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg" },
//   {
//     type: "video",
//     name: "City Traffic",
//     url: "https://player.vimeo.com/external/410723449.sd.mp4?s=d5e9ed9ea40ba755e28512cce6c1ad00d92506f7&profile_id=165&oauth2_token_id=57447761",
//   },
//   { type: "image", name: "Cherry Blossoms", url: "https://images.pexels.com/photos/1191377/pexels-photo-1191377.jpeg" },
//   { type: "image", name: "Misty Forest", url: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg" },
//   {
//     type: "video",
//     name: "Fireplace",
//     url: "https://player.vimeo.com/external/371834771.sd.mp4?s=3a5b8f3ddf7f7f7a3b7f3d7f7f7f7f7f7f7f7f7f&profile_id=165&oauth2_token_id=57447761",
//   },
// ]

// const MediaSelector: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [selectedMedia, setSelectedMedia] = useState<typeof mediaOptions>([])
//   const [isGridView, setIsGridView] = useState(false)
//   const controls = useAnimation()
//   const [ref, inView] = useInView()

//   const shuffleMedia = () => {
//     const shuffled = [...mediaOptions].sort(() => Math.random() - 0.5)
//     setCurrentIndex(0)
//     controls.start({ opacity: 0 }).then(() => {
//       mediaOptions.splice(0, mediaOptions.length, ...shuffled)
//       controls.start({ opacity: 1 })
//     })
//   }

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaOptions.length)
//   }

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaOptions.length) % mediaOptions.length)
//   }

//   const toggleMediaSelection = (media: (typeof mediaOptions)[0]) => {
//     setSelectedMedia((prev) =>
//       prev.some((item) => item.url === media.url) ? prev.filter((item) => item.url !== media.url) : [...prev, media],
//     )
//   }

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "ArrowRight") nextSlide()
//       if (e.key === "ArrowLeft") prevSlide()
//     }
//     window.addEventListener("keydown", handleKeyDown)
//     return () => window.removeEventListener("keydown", handleKeyDown)
//   }, []) // Removed nextSlide and prevSlide from dependencies

//   useEffect(() => {
//     if (inView) {
//       controls.start({ opacity: 1, y: 0 })
//     }
//   }, [controls, inView])

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={controls}
//       transition={{ duration: 0.5 }}
//       className="relative bg-gray-800 p-6 rounded-lg shadow-lg"
//     >
//       <div className="mb-4 flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-white">Media Selector</h2>
//         <div className="space-x-2">
//           <Button variant="outline" size="sm" onClick={() => setIsGridView(!isGridView)}>
//             {isGridView ? "Carousel View" : "Grid View"}
//           </Button>
//           <Button variant="outline" size="sm" onClick={shuffleMedia}>
//             <Shuffle className="mr-2 h-4 w-4" />
//             Shuffle
//           </Button>
//         </div>
//       </div>
//       {isGridView ? (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {mediaOptions.map((media, index) => (
//             <motion.div
//               key={media.url}
//               className="relative aspect-square rounded-lg overflow-hidden"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {media.type === "image" ? (
//                 <Image
//                   src={media.url || "/placeholder.svg"}
//                   alt={media.name}
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-lg"
//                 />
//               ) : (
//                 <video
//                   src={media.url}
//                   className="w-full h-full object-cover rounded-lg"
//                   loop
//                   muted
//                   playsInline
//                   onMouseEnter={(e) => e.currentTarget.play()}
//                   onMouseLeave={(e) => e.currentTarget.pause()}
//                 />
//               )}
//               <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
//                 <Button
//                   variant={selectedMedia.some((item) => item.url === media.url) ? "default" : "outline"}
//                   size="icon"
//                   className="rounded-full"
//                   onClick={() => toggleMediaSelection(media)}
//                 >
//                   <Plus className={selectedMedia.some((item) => item.url === media.url) ? "rotate-45" : ""} />
//                 </Button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       ) : (
//         <div className="relative aspect-video">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentIndex}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.5 }}
//               className="absolute inset-0"
//             >
//               {mediaOptions[currentIndex].type === "image" ? (
//                 <Image
//                   src={mediaOptions[currentIndex].url || "/placeholder.svg"}
//                   alt={mediaOptions[currentIndex].name}
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-lg"
//                 />
//               ) : (
//                 <video
//                   src={mediaOptions[currentIndex].url}
//                   className="w-full h-full object-cover rounded-lg"
//                   autoPlay
//                   loop
//                   muted
//                   playsInline
//                 />
//               )}
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <Button
//                   variant={
//                     selectedMedia.some((item) => item.url === mediaOptions[currentIndex].url) ? "default" : "outline"
//                   }
//                   size="icon"
//                   className="rounded-full"
//                   onClick={() => toggleMediaSelection(mediaOptions[currentIndex])}
//                 >
//                   <Plus
//                     className={
//                       selectedMedia.some((item) => item.url === mediaOptions[currentIndex].url) ? "rotate-45" : ""
//                     }
//                   />
//                 </Button>
//               </div>
//             </motion.div>
//           </AnimatePresence>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full"
//             onClick={prevSlide}
//           >
//             <ChevronLeft size={24} />
//           </Button>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full"
//             onClick={nextSlide}
//           >
//             <ChevronRight size={24} />
//           </Button>
//         </div>
//       )}
//       <div className="mt-4">
//         <h3 className="text-lg font-semibold text-white mb-2">Selected Media:</h3>
//         <div className="flex flex-wrap gap-2">
//           <AnimatePresence>
//             {selectedMedia.map((media) => (
//               <motion.div
//                 key={media.url}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 className="relative"
//               >
//                 <div className="w-20 h-20 rounded-md overflow-hidden">
//                   {media.type === "image" ? (
//                     <Image
//                       src={media.url || "/placeholder.svg"}
//                       alt={media.name}
//                       width={80}
//                       height={80}
//                       objectFit="cover"
//                     />
//                   ) : (
//                     <video src={media.url} className="w-full h-full object-cover" loop muted playsInline />
//                   )}
//                 </div>
//                 <Button
//                   variant="destructive"
//                   size="icon"
//                   className="absolute -top-2 -right-2 rounded-full w-6 h-6"
//                   onClick={() => toggleMediaSelection(media)}
//                 >
//                   <X size={12} />
//                 </Button>
//                 {media.type === "video" && (
//                   <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 rounded-tl-md p-1">
//                     <Video size={12} className="text-white" />
//                   </div>
//                 )}
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// export default MediaSelector


// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import Image from "next/image"
// import { motion, AnimatePresence, useAnimation } from "framer-motion"
// import { ChevronLeft, ChevronRight, Plus, X, Video, Shuffle } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useInView } from "react-intersection-observer"

// const mediaOptions = [
//   { type: "image", name: "Neon City", url: "https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg" },
//   { type: "image", name: "Forest Mist", url: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg" },
//   { type: "image", name: "Ocean Sunset", url: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg" },
//   { type: "image", name: "Mountain Lake", url: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg" },
//   {
//     type: "video",
//     name: "Aerial Beach",
//     url: "https://player.vimeo.com/external/368763065.sd.mp4?s=13b81c0b1e54a7d70b4b1a65793c96bff3c07f32&profile_id=165&oauth2_token_id=57447761",
//   },
//   { type: "image", name: "Northern Lights", url: "https://images.pexels.com/photos/1933316/pexels-photo-1933316.jpeg" },
//   { type: "image", name: "Autumn Road", url: "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg" },
//   {
//     type: "video",
//     name: "Floating Lanterns",
//     url: "https://player.vimeo.com/external/370467553.sd.mp4?s=6b1b2f0b4a9b8d2c6f1b558d6f0ec7a97f8f2e3d&profile_id=165&oauth2_token_id=57447761",
//   },
//   { type: "image", name: "Desert Dunes", url: "https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg" },
//   { type: "image", name: "Snowy Mountains", url: "https://images.pexels.com/photos/869258/pexels-photo-869258.jpeg" },
//   {
//     type: "video",
//     name: "Waterfall",
//     url: "https://player.vimeo.com/external/384761655.sd.mp4?s=383ab4dbc773cd0d5ece3af208d8dcc01a0cc65b&profile_id=165&oauth2_token_id=57447761",
//   },
//   { type: "image", name: "Lavender Fields", url: "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg" },
//   { type: "image", name: "City Skyline", url: "https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg" },
//   {
//     type: "video",
//     name: "Ocean Waves",
//     url: "https://player.vimeo.com/external/368763014.sd.mp4?s=6dc3ad9c4e3b7926e2d5e4b9f44a3dd472722ee7&profile_id=165&oauth2_token_id=57447761",
//   },
//   { type: "image", name: "Starry Night", url: "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg" },
//   { type: "image", name: "Tropical Beach", url: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg" },
//   {
//     type: "video",
//     name: "City Traffic",
//     url: "https://player.vimeo.com/external/410723449.sd.mp4?s=d5e9ed9ea40ba755e28512cce6c1ad00d92506f7&profile_id=165&oauth2_token_id=57447761",
//   },
//   { type: "image", name: "Cherry Blossoms", url: "https://images.pexels.com/photos/1191377/pexels-photo-1191377.jpeg" },
//   { type: "image", name: "Misty Forest", url: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg" },
//   {
//     type: "video",
//     name: "Fireplace",
//     url: "https://player.vimeo.com/external/371834771.sd.mp4?s=3a5b8f3ddf7f7f7a3b7f3d7f7f7f7f7f7f7f7f7f&profile_id=165&oauth2_token_id=57447761",
//   },
// ]

// interface MediaSelectorProps {
//   onMediaSelect: (media: (typeof mediaOptions)[0][]) => void
//   selectedMedia: (typeof mediaOptions)[0][]
// }

// const MediaSelector: React.FC<MediaSelectorProps> = ({ onMediaSelect, selectedMedia }) => {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isGridView, setIsGridView] = useState(false)
//   const controls = useAnimation()
//   const [ref, inView] = useInView()

//   const shuffleMedia = () => {
//     const shuffled = [...mediaOptions].sort(() => Math.random() - 0.5)
//     setCurrentIndex(0)
//     controls.start({ opacity: 0 }).then(() => {
//       mediaOptions.splice(0, mediaOptions.length, ...shuffled)
//       controls.start({ opacity: 1 })
//     })
//   }

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaOptions.length)
//   }

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaOptions.length) % mediaOptions.length)
//   }

//   const toggleMediaSelection = (media: (typeof mediaOptions)[0]) => {
//     const updatedSelection = selectedMedia.some((item) => item.url === media.url)
//       ? selectedMedia.filter((item) => item.url !== media.url)
//       : [...selectedMedia, media]
//     onMediaSelect(updatedSelection)
//   }

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "ArrowRight") nextSlide()
//       if (e.key === "ArrowLeft") prevSlide()
//     }
//     window.addEventListener("keydown", handleKeyDown)
//     return () => window.removeEventListener("keydown", handleKeyDown)
//   }, []) // Removed nextSlide and prevSlide from dependencies

//   useEffect(() => {
//     if (inView) {
//       controls.start({ opacity: 1, y: 0 })
//     }
//   }, [controls, inView])

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={controls}
//       transition={{ duration: 0.5 }}
//       className="relative bg-gray-800 p-6 rounded-lg shadow-lg"
//     >
//       <div className="mb-4 flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-white">Media Selector</h2>
//         <div className="space-x-2">
//           <Button variant="outline" size="sm" onClick={() => setIsGridView(!isGridView)}>
//             {isGridView ? "Carousel View" : "Grid View"}
//           </Button>
//           <Button variant="outline" size="sm" onClick={shuffleMedia}>
//             <Shuffle className="mr-2 h-4 w-4" />
//             Shuffle
//           </Button>
//         </div>
//       </div>
//       {isGridView ? (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {mediaOptions.map((media, index) => (
//             <motion.div
//               key={media.url}
//               className="relative aspect-square rounded-lg overflow-hidden"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {media.type === "image" ? (
//                 <Image
//                   src={media.url || "/placeholder.svg"}
//                   alt={media.name}
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-lg"
//                 />
//               ) : (
//                 <video
//                   src={media.url}
//                   className="w-full h-full object-cover rounded-lg"
//                   loop
//                   muted
//                   playsInline
//                   onMouseEnter={(e) => e.currentTarget.play()}
//                   onMouseLeave={(e) => e.currentTarget.pause()}
//                 />
//               )}
//               <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
//                 <Button
//                   variant={selectedMedia.some((item) => item.url === media.url) ? "default" : "outline"}
//                   size="icon"
//                   className="rounded-full"
//                   onClick={() => toggleMediaSelection(media)}
//                 >
//                   <Plus className={selectedMedia.some((item) => item.url === media.url) ? "rotate-45" : ""} />
//                 </Button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       ) : (
//         <div className="relative aspect-video">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentIndex}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.5 }}
//               className="absolute inset-0"
//             >
//               {mediaOptions[currentIndex].type === "image" ? (
//                 <Image
//                   src={mediaOptions[currentIndex].url || "/placeholder.svg"}
//                   alt={mediaOptions[currentIndex].name}
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-lg"
//                 />
//               ) : (
//                 <video
//                   src={mediaOptions[currentIndex].url}
//                   className="w-full h-full object-cover rounded-lg"
//                   autoPlay
//                   loop
//                   muted
//                   playsInline
//                 />
//               )}
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <Button
//                   variant={
//                     selectedMedia.some((item) => item.url === mediaOptions[currentIndex].url) ? "default" : "outline"
//                   }
//                   size="icon"
//                   className="rounded-full"
//                   onClick={() => toggleMediaSelection(mediaOptions[currentIndex])}
//                 >
//                   <Plus
//                     className={
//                       selectedMedia.some((item) => item.url === mediaOptions[currentIndex].url) ? "rotate-45" : ""
//                     }
//                   />
//                 </Button>
//               </div>
//             </motion.div>
//           </AnimatePresence>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full"
//             onClick={prevSlide}
//           >
//             <ChevronLeft size={24} />
//           </Button>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full"
//             onClick={nextSlide}
//           >
//             <ChevronRight size={24} />
//           </Button>
//         </div>
//       )}
//       <div className="mt-4">
//         <h3 className="text-lg font-semibold text-white mb-2">Selected Media:</h3>
//         <div className="flex flex-wrap gap-2">
//           <AnimatePresence>
//             {selectedMedia.map((media) => (
//               <motion.div
//                 key={media.url}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 className="relative"
//               >
//                 <div className="w-20 h-20 rounded-md overflow-hidden">
//                   {media.type === "image" ? (
//                     <Image
//                       src={media.url || "/placeholder.svg"}
//                       alt={media.name}
//                       width={80}
//                       height={80}
//                       objectFit="cover"
//                     />
//                   ) : (
//                     <video src={media.url} className="w-full h-full object-cover" loop muted playsInline />
//                   )}
//                 </div>
//                 <Button
//                   variant="destructive"
//                   size="icon"
//                   className="absolute -top-2 -right-2 rounded-full w-6 h-6"
//                   onClick={() => toggleMediaSelection(media)}
//                 >
//                   <X size={12} />
//                 </Button>
//                 {media.type === "video" && (
//                   <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 rounded-tl-md p-1">
//                     <Video size={12} className="text-white" />
//                   </div>
//                 )}
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// export default MediaSelector

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { ChevronLeft, ChevronRight, Plus, X, Video, Shuffle, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"
import { Slider } from "@/components/ui/slider"

const mediaOptions = [
  { type: "image", name: "Neon City", url: "https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg" },
  { type: "image", name: "Forest Mist", url: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg" },
  { type: "image", name: "Ocean Sunset", url: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg" },
  { type: "image", name: "Mountain Lake", url: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg" },
  {
    type: "video",
    name: "Aerial Beach",
    url: "https://player.vimeo.com/external/368763065.sd.mp4?s=13b81c0b1e54a7d70b4b1a65793c96bff3c07f32&profile_id=165&oauth2_token_id=57447761",
  },
  { type: "image", name: "Northern Lights", url: "https://images.pexels.com/photos/1933316/pexels-photo-1933316.jpeg" },
  { type: "image", name: "Autumn Road", url: "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg" },
  {
    type: "video",
    name: "Floating Lanterns",
    url: "https://player.vimeo.com/external/370467553.sd.mp4?s=6b1b2f0b4a9b8d2c6f1b558d6f0ec7a97f8f2e3d&profile_id=165&oauth2_token_id=57447761",
  },
  { type: "image", name: "Desert Dunes", url: "https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg" },
  { type: "image", name: "Snowy Mountains", url: "https://images.pexels.com/photos/869258/pexels-photo-869258.jpeg" },
  {
    type: "video",
    name: "Waterfall",
    url: "https://player.vimeo.com/external/384761655.sd.mp4?s=383ab4dbc773cd0d5ece3af208d8dcc01a0cc65b&profile_id=165&oauth2_token_id=57447761",
  },
  { type: "image", name: "Lavender Fields", url: "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg" },
  { type: "image", name: "City Skyline", url: "https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg" },
  {
    type: "video",
    name: "Ocean Waves",
    url: "https://player.vimeo.com/external/368763014.sd.mp4?s=6dc3ad9c4e3b7926e2d5e4b9f44a3dd472722ee7&profile_id=165&oauth2_token_id=57447761",
  },
  { type: "image", name: "Starry Night", url: "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg" },
  { type: "image", name: "Tropical Beach", url: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg" },
  {
    type: "video",
    name: "City Traffic",
    url: "https://player.vimeo.com/external/410723449.sd.mp4?s=d5e9ed9ea40ba755e28512cce6c1ad00d92506f7&profile_id=165&oauth2_token_id=57447761",
  },
  { type: "image", name: "Cherry Blossoms", url: "https://images.pexels.com/photos/1191377/pexels-photo-1191377.jpeg" },
  { type: "image", name: "Misty Forest", url: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg" },
  {
    type: "video",
    name: "Fireplace",
    url: "https://player.vimeo.com/external/371834771.sd.mp4?s=3a5b8f3ddf7f7f7a3b7f3d7f7f7f7f7f7f7f7f7f&profile_id=165&oauth2_token_id=57447761",
  },
]

interface MediaSelectorProps {
  onMediaSelect: (media: (typeof mediaOptions)[0][]) => void
  selectedMedia: (typeof mediaOptions)[0][]
}

const MediaSelector: React.FC<MediaSelectorProps> = ({ onMediaSelect, selectedMedia }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isGridView, setIsGridView] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const controls = useAnimation()
  const [ref, inView] = useInView()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const shuffleMedia = () => {
    const shuffled = [...mediaOptions].sort(() => Math.random() - 0.5)
    setCurrentIndex(0)
    controls.start({ opacity: 0 }).then(() => {
      mediaOptions.splice(0, mediaOptions.length, ...shuffled)
      controls.start({ opacity: 1 })
    })
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaOptions.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaOptions.length) % mediaOptions.length)
  }

  const toggleMediaSelection = (media: (typeof mediaOptions)[0]) => {
    const updatedSelection = selectedMedia.some((item) => item.url === media.url)
      ? selectedMedia.filter((item) => item.url !== media.url)
      : [...selectedMedia, media]
    onMediaSelect(updatedSelection)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide()
      if (e.key === "ArrowLeft") prevSlide()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, []) // Removed dependencies

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 })
    }
  }, [controls, inView])

  const handleZoom = (zoomIn: boolean) => {
    setZoomLevel((prevZoom) => {
      const newZoom = zoomIn ? prevZoom + 0.1 : prevZoom - 0.1
      return Math.max(0.5, Math.min(newZoom, 2))
    })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      className="relative bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Media Selector</h2>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => setIsGridView(!isGridView)}>
            {isGridView ? "Carousel View" : "Grid View"}
          </Button>
          <Button variant="outline" size="sm" onClick={shuffleMedia}>
            <Shuffle className="mr-2 h-4 w-4" />
            Shuffle
          </Button>
        </div>
      </div>
      {isGridView ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaOptions.map((media, index) => (
            <motion.div
              key={media.url}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {media.type === "image" ? (
                <Image
                  src={media.url || "/placeholder.svg"}
                  alt={media.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              ) : (
                <video
                  src={media.url}
                  className="w-full h-full object-cover rounded-lg"
                  loop
                  muted
                  playsInline
                  autoPlay={hoveredIndex === index}
                />
              )}
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant={selectedMedia.some((item) => item.url === media.url) ? "default" : "outline"}
                  size="icon"
                  className="rounded-full"
                  onClick={() => toggleMediaSelection(media)}
                >
                  <Plus className={selectedMedia.some((item) => item.url === media.url) ? "rotate-45" : ""} />
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="relative aspect-video">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {mediaOptions[currentIndex].type === "image" ? (
                <Image
                  src={mediaOptions[currentIndex].url || "/placeholder.svg"}
                  alt={mediaOptions[currentIndex].name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              ) : (
                <video
                  src={mediaOptions[currentIndex].url}
                  className="w-full h-full object-cover rounded-lg"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant={
                    selectedMedia.some((item) => item.url === mediaOptions[currentIndex].url) ? "default" : "outline"
                  }
                  size="icon"
                  className="rounded-full"
                  onClick={() => toggleMediaSelection(mediaOptions[currentIndex])}
                >
                  <Plus
                    className={
                      selectedMedia.some((item) => item.url === mediaOptions[currentIndex].url) ? "rotate-45" : ""
                    }
                  />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
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
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <Button variant="ghost" size="icon" onClick={() => handleZoom(false)}>
              <ZoomOut size={20} />
            </Button>
            <Slider
              value={[zoomLevel]}
              min={0.5}
              max={2}
              step={0.1}
              onValueChange={([value]) => setZoomLevel(value)}
              className="w-32"
            />
            <Button variant="ghost" size="icon" onClick={() => handleZoom(true)}>
              <ZoomIn size={20} />
            </Button>
          </div>
        </div>
      )}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-white mb-2">Selected Media:</h3>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {selectedMedia.map((media) => (
              <motion.div
                key={media.url}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative"
              >
                <div className="w-20 h-20 rounded-md overflow-hidden">
                  {media.type === "image" ? (
                    <Image
                      src={media.url || "/placeholder.svg"}
                      alt={media.name}
                      width={80}
                      height={80}
                      objectFit="cover"
                    />
                  ) : (
                    <video src={media.url} className="w-full h-full object-cover" loop muted playsInline />
                  )}
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 rounded-full w-6 h-6"
                  onClick={() => toggleMediaSelection(media)}
                >
                  <X size={12} />
                </Button>
                {media.type === "video" && (
                  <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 rounded-tl-md p-1">
                    <Video size={12} className="text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default MediaSelector

// "use client"

// import type React from "react"
// import { useState, useEffect, useRef } from "react"
// import Image from "next/image"
// import { motion, AnimatePresence, useAnimation } from "framer-motion"
// import { ChevronLeft, ChevronRight, Plus, X, Video, Shuffle, ZoomIn, ZoomOut, Edit } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useInView } from "react-intersection-observer"
// import { Slider } from "@/components/ui/slider"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { HexColorPicker } from "react-colorful"

// const mediaOptions = [
//   { type: "image", name: "Neon City", url: "https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg" },
//   { type: "image", name: "Forest Mist", url: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg" },
//   { type: "image", name: "Ocean Sunset", url: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg" },
//   { type: "image", name: "Mountain Lake", url: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg" },
//   {
//     type: "video",
//     name: "Aerial Beach",
//     url: "https://player.vimeo.com/external/368763065.sd.mp4?s=13b81c0b1e54a7d70b4b1a65793c96bff3c07f32&profile_id=165&oauth2_token_id=57447761",
//   },
//   { type: "image", name: "Northern Lights", url: "https://images.pexels.com/photos/1933316/pexels-photo-1933316.jpeg" },
//   { type: "image", name: "Autumn Road", url: "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg" },
//   {
//     type: "video",
//     name: "Floating Lanterns",
//     url: "https://player.vimeo.com/external/370467553.sd.mp4?s=6b1b2f0b4a9b8d2c6f1b558d6f0ec7a97f8f2e3d&profile_id=165&oauth2_token_id=57447761",
//   },
//   { type: "image", name: "Desert Dunes", url: "https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg" },
//   { type: "image", name: "Snowy Mountains", url: "https://images.pexels.com/photos/869258/pexels-photo-869258.jpeg" },
//   {
//     type: "video",
//     name: "Waterfall",
//     url: "https://player.vimeo.com/external/384761655.sd.mp4?s=383ab4dbc773cd0d5ece3af208d8dcc01a0cc65b&profile_id=165&oauth2_token_id=57447761",
//   },
//   { type: "image", name: "Lavender Fields", url: "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg" },
//   { type: "image", name: "City Skyline", url: "https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg" },
//   {
//     type: "video",
//     name: "Ocean Waves",
//     url: "https://player.vimeo.com/external/368763014.sd.mp4?s=6dc3ad9c4e3b7926e2d5e4b9f44a3dd472722ee7&profile_id=165&oauth2_token_id=57447761",
//   },
//   { type: "image", name: "Starry Night", url: "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg" },
//   { type: "image", name: "Tropical Beach", url: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg" },
//   {
//     type: "video",
//     name: "City Traffic",
//     url: "https://player.vimeo.com/external/410723449.sd.mp4?s=d5e9ed9ea40ba755e28512cce6c1ad00d92506f7&profile_id=165&oauth2_token_id=57447761",
//   },
//   { type: "image", name: "Cherry Blossoms", url: "https://images.pexels.com/photos/1191377/pexels-photo-1191377.jpeg" },
//   { type: "image", name: "Misty Forest", url: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg" },
//   {
//     type: "video",
//     name: "Fireplace",
//     url: "https://player.vimeo.com/external/371834771.sd.mp4?s=3a5b8f3ddf7f7f7a3b7f3d7f7f7f7f7f7f7f7f7f&profile_id=165&oauth2_token_id=57447761",
//   },
// ]

// interface MediaSelectorProps {
//   onMediaSelect: (media: (typeof mediaOptions)[0][]) => void
//   selectedMedia: (typeof mediaOptions)[0][]
// }

// const MediaSelector: React.FC<MediaSelectorProps> = ({ onMediaSelect, selectedMedia }) => {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isGridView, setIsGridView] = useState(false)
//   const [zoomLevel, setZoomLevel] = useState(1)
//   const controls = useAnimation()
//   const [ref, inView] = useInView()
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
//   const [editingMedia, setEditingMedia] = useState<(typeof mediaOptions)[0] | null>(null)
//   const [brightness, setBrightness] = useState(100)
//   const [contrast, setContrast] = useState(100)
//   const [saturation, setSaturation] = useState(100)
//   const [overlayColor, setOverlayColor] = useState("#ffffff")
//   const [overlayOpacity, setOverlayOpacity] = useState(0)
//   const canvasRef = useRef<HTMLCanvasElement>(null)

//   const shuffleMedia = () => {
//     const shuffled = [...mediaOptions].sort(() => Math.random() - 0.5)
//     setCurrentIndex(0)
//     controls.start({ opacity: 0 }).then(() => {
//       mediaOptions.splice(0, mediaOptions.length, ...shuffled)
//       controls.start({ opacity: 1 })
//     })
//   }

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaOptions.length)
//   }

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaOptions.length) % mediaOptions.length)
//   }

//   const toggleMediaSelection = (media: (typeof mediaOptions)[0]) => {
//     const updatedSelection = selectedMedia.some((item) => item.url === media.url)
//       ? selectedMedia.filter((item) => item.url !== media.url)
//       : [...selectedMedia, media]
//     onMediaSelect(updatedSelection)
//   }

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "ArrowRight") nextSlide()
//       if (e.key === "ArrowLeft") prevSlide()
//     }
//     window.addEventListener("keydown", handleKeyDown)
//     return () => window.removeEventListener("keydown", handleKeyDown)
//   }, []) // Removed nextSlide and prevSlide from dependencies

//   useEffect(() => {
//     if (inView) {
//       controls.start({ opacity: 1, y: 0 })
//     }
//   }, [controls, inView])

//   const handleZoom = (zoomIn: boolean) => {
//     setZoomLevel((prevZoom) => {
//       const newZoom = zoomIn ? prevZoom + 0.1 : prevZoom - 0.1
//       return Math.max(0.5, Math.min(newZoom, 2))
//     })
//   }

//   const applyImageEffects = () => {
//     if (editingMedia && canvasRef.current) {
//       const canvas = canvasRef.current
//       const ctx = canvas.getContext("2d")
//       if (!ctx) return

//       const img = new window.Image()
//       img.crossOrigin = "anonymous"
//       img.onload = () => {
//         canvas.width = img.width
//         canvas.height = img.height
//         ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`
//         ctx.drawImage(img, 0, 0, img.width, img.height)

//         // Apply color overlay
//         ctx.globalCompositeOperation = "source-atop"
//         ctx.fillStyle = overlayColor
//         ctx.globalAlpha = overlayOpacity / 100
//         ctx.fillRect(0, 0, canvas.width, canvas.height)

//         // Reset composite operation and alpha
//         ctx.globalCompositeOperation = "source-over"
//         ctx.globalAlpha = 1

//         // Update the edited media URL
//         canvas.toBlob((blob) => {
//           if (blob) {
//             const newUrl = URL.createObjectURL(blob)
//             const updatedMedia = { ...editingMedia, url: newUrl }
//             setEditingMedia(updatedMedia)
//             onMediaSelect(selectedMedia.map((m) => (m.url === editingMedia.url ? updatedMedia : m)))
//           }
//         })
//       }
//       img.src = editingMedia.url
//     }
//   }

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={controls}
//       transition={{ duration: 0.5 }}
//       className="relative bg-gray-800 p-6 rounded-lg shadow-lg"
//     >
//       <div className="mb-4 flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-white">Media Selector</h2>
//         <div className="space-x-2">
//           <Button variant="outline" size="sm" onClick={() => setIsGridView(!isGridView)}>
//             {isGridView ? "Carousel View" : "Grid View"}
//           </Button>
//           <Button variant="outline" size="sm" onClick={shuffleMedia}>
//             <Shuffle className="mr-2 h-4 w-4" />
//             Shuffle
//           </Button>
//         </div>
//       </div>
//       {isGridView ? (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {mediaOptions.map((media, index) => (
//             <motion.div
//               key={media.url}
//               className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onHoverStart={() => setHoveredIndex(index)}
//               onHoverEnd={() => setHoveredIndex(null)}
//             >
//               {media.type === "image" ? (
//                 <Image
//                   src={media.url || "/placeholder.svg"}
//                   alt={media.name}
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-lg"
//                 />
//               ) : (
//                 <video
//                   src={media.url}
//                   className="w-full h-full object-cover rounded-lg"
//                   loop
//                   muted
//                   playsInline
//                   autoPlay={hoveredIndex === index}
//                 />
//               )}
//               <motion.div
//                 className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <Button
//                   variant={selectedMedia.some((item) => item.url === media.url) ? "default" : "outline"}
//                   size="icon"
//                   className="rounded-full mr-2"
//                   onClick={() => toggleMediaSelection(media)}
//                 >
//                   <Plus className={selectedMedia.some((item) => item.url === media.url) ? "rotate-45" : ""} />
//                 </Button>
//                 {media.type === "image" && (
//                   <Button variant="outline" size="icon" className="rounded-full" onClick={() => setEditingMedia(media)}>
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                 )}
//               </motion.div>
//             </motion.div>
//           ))}
//         </div>
//       ) : (
//         <div className="relative aspect-video">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentIndex}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.5 }}
//               className="absolute inset-0"
//               style={{ transform: `scale(${zoomLevel})` }}
//             >
//               {mediaOptions[currentIndex].type === "image" ? (
//                 <Image
//                   src={mediaOptions[currentIndex].url || "/placeholder.svg"}
//                   alt={mediaOptions[currentIndex].name}
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-lg"
//                 />
//               ) : (
//                 <video
//                   src={mediaOptions[currentIndex].url}
//                   className="w-full h-full object-cover rounded-lg"
//                   autoPlay
//                   loop
//                   muted
//                   playsInline
//                 />
//               )}
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <Button
//                   variant={
//                     selectedMedia.some((item) => item.url === mediaOptions[currentIndex].url) ? "default" : "outline"
//                   }
//                   size="icon"
//                   className="rounded-full mr-2"
//                   onClick={() => toggleMediaSelection(mediaOptions[currentIndex])}
//                 >
//                   <Plus
//                     className={
//                       selectedMedia.some((item) => item.url === mediaOptions[currentIndex].url) ? "rotate-45" : ""
//                     }
//                   />
//                 </Button>
//                 {mediaOptions[currentIndex].type === "image" && (
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="rounded-full"
//                     onClick={() => setEditingMedia(mediaOptions[currentIndex])}
//                   >
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                 )}
//               </div>
//             </motion.div>
//           </AnimatePresence>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full"
//             onClick={prevSlide}
//           >
//             <ChevronLeft size={24} />
//           </Button>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full"
//             onClick={nextSlide}
//           >
//             <ChevronRight size={24} />
//           </Button>
//           <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
//             <Button variant="ghost" size="icon" onClick={() => handleZoom(false)}>
//               <ZoomOut size={20} />
//             </Button>
//             <Slider
//               value={[zoomLevel]}
//               min={0.5}
//               max={2}
//               step={0.1}
//               onValueChange={([value]) => setZoomLevel(value)}
//               className="w-32"
//             />
//             <Button variant="ghost" size="icon" onClick={() => handleZoom(true)}>
//               <ZoomIn size={20} />
//             </Button>
//           </div>
//         </div>
//       )}
//       <div className="mt-4">
//         <h3 className="text-lg font-semibold text-white mb-2">Selected Media:</h3>
//         <div className="flex flex-wrap gap-2">
//           <AnimatePresence>
//             {selectedMedia.map((media) => (
//               <motion.div
//                 key={media.url}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 className="relative"
//               >
//                 <div className="w-20 h-20 rounded-md overflow-hidden">
//                   {media.type === "image" ? (
//                     <Image
//                       src={media.url || "/placeholder.svg"}
//                       alt={media.name}
//                       width={80}
//                       height={80}
//                       objectFit="cover"
//                     />
//                   ) : (
//                     <video src={media.url} className="w-full h-full object-cover" loop muted playsInline />
//                   )}
//                 </div>
//                 <Button
//                   variant="destructive"
//                   size="icon"
//                   className="absolute -top-2 -right-2 rounded-full w-6 h-6"
//                   onClick={() => toggleMediaSelection(media)}
//                 >
//                   <X size={12} />
//                 </Button>
//                 {media.type === "video" && (
//                   <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 rounded-tl-md p-1">
//                     <Video size={12} className="text-white" />
//                   </div>
//                 )}
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       </div>
//       {editingMedia && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           className="mt-4 p-4 bg-gray-700 rounded-lg"
//         >
//           <h3 className="text-lg font-semibold text-white mb-2">Edit Image</h3>
//           <div className="space-y-4">
//             <div>
//               <label className="text-sm text-gray-300">Brightness</label>
//               <Slider
//                 value={[brightness]}
//                 min={0}
//                 max={200}
//                 step={1}
//                 onValueChange={([value]) => setBrightness(value)}
//               />
//             </div>
//             <div>
//               <label className="text-sm text-gray-300">Contrast</label>
//               <Slider value={[contrast]} min={0} max={200} step={1} onValueChange={([value]) => setContrast(value)} />
//             </div>
//             <div>
//               <label className="text-sm text-gray-300">Saturation</label>
//               <Slider
//                 value={[saturation]}
//                 min={0}
//                 max={200}
//                 step={1}
//                 onValueChange={([value]) => setSaturation(value)}
//               />
//             </div>
//             <div>
//               <label className="text-sm text-gray-300">Overlay Color</label>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className="w-[220px] justify-start text-left font-normal"
//                     style={{ backgroundColor: overlayColor }}
//                   >
//                     <div
//                       className="w-4 h-4 rounded-full mr-2 border border-gray-300"
//                       style={{ backgroundColor: overlayColor }}
//                     />
//                     {overlayColor}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="p-0">
//                   <HexColorPicker color={overlayColor} onChange={setOverlayColor} />
//                 </PopoverContent>
//               </Popover>
//             </div>
//             <div>
//               <label className="text-sm text-gray-300">Overlay Opacity</label>
//               <Slider
//                 value={[overlayOpacity]}
//                 min={0}
//                 max={100}
//                 step={1}
//                 onValueChange={([value]) => setOverlayOpacity(value)}
//               />
//             </div>
//             <div className="flex justify-end space-x-2">
//               <Button variant="outline" onClick={() => setEditingMedia(null)}>
//                 Cancel
//               </Button>
//               <Button onClick={applyImageEffects}>Apply</Button>
//             </div>
//           </div>
//         </motion.div>
//       )}
//       <canvas ref={canvasRef} style={{ display: "none" }} />
//     </motion.div>
//   )
// }

// export default MediaSelector


// "use client"

// import type React from "react"
// import { useState, useEffect, useRef } from "react"
// import Image from "next/image"
// import { motion, AnimatePresence, useAnimation } from "framer-motion"
// import { ChevronLeft, ChevronRight, Plus, X, Video, Shuffle, ZoomIn, ZoomOut, Edit } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useInView } from "react-intersection-observer"
// import { Slider } from "@/components/ui/slider"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { HexColorPicker } from "react-colorful"

// const mediaOptions = [
//   { type: "image", name: "Neon City", url: "https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg" },
//   { type: "image", name: "Forest Mist", url: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg" },
//   { type: "image", name: "Ocean Sunset", url: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg" },
//   { type: "image", name: "Mountain Lake", url: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg" },
//   {
//     type: "video",
//     name: "Aerial Beach",
//     url: "https://player.vimeo.com/external/368763065.sd.mp4?s=13b81c0b1e54a7d70b4b1a65793c96bff3c07f32&profile_id=165&oauth2_token_id=57447761",
//   },
//   { type: "image", name: "Northern Lights", url: "https://images.pexels.com/photos/1933316/pexels-photo-1933316.jpeg" },
//   { type: "image", name: "Autumn Road", url: "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg" },
//   {
//     type: "video",
//     name: "Floating Lanterns",
//     url: "https://player.vimeo.com/external/370467553.sd.mp4?s=6b1b2f0b4a9b8d2c6f1b558d6f0ec7a97f8f2e3d&profile_id=165&oauth2_token_id=57447761",
//   },
//   { type: "image", name: "Desert Dunes", url: "https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg" },
//   { type: "image", name: "Snowy Mountains", url: "https://images.pexels.com/photos/869258/pexels-photo-869258.jpeg" },
//   {
//     type: "video",
//     name: "Waterfall",
//     url: "https://player.vimeo.com/external/384761655.sd.mp4?s=383ab4dbc773cd0d5ece3af208d8dcc01a0cc65b&profile_id=165&oauth2_token_id=57447761",
//   },
//   { type: "image", name: "Lavender Fields", url: "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg" },
//   { type: "image", name: "City Skyline", url: "https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg" },
//   {
//     type: "video",
//     name: "Ocean Waves",
//     url: "https://player.vimeo.com/external/368763014.sd.mp4?s=6dc3ad9c4e3b7926e2d5e4b9f44a3dd472722ee7&profile_id=165&oauth2_token_id=57447761",
//   },
//   { type: "image", name: "Starry Night", url: "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg" },
//   { type: "image", name: "Tropical Beach", url: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg" },
//   {
//     type: "video",
//     name: "City Traffic",
//     url: "https://player.vimeo.com/external/410723449.sd.mp4?s=d5e9ed9ea40ba755e28512cce6c1ad00d92506f7&profile_id=165&oauth2_token_id=57447761",
//   },
//   { type: "image", name: "Cherry Blossoms", url: "https://images.pexels.com/photos/1191377/pexels-photo-1191377.jpeg" },
//   { type: "image", name: "Misty Forest", url: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg" },
//   {
//     type: "video",
//     name: "Fireplace",
//     url: "https://player.vimeo.com/external/371834771.sd.mp4?s=3a5b8f3ddf7f7f7a3b7f3d7f7f7f7f7f7f7f7f7f&profile_id=165&oauth2_token_id=57447761",
//   },
// ]

// interface MediaSelectorProps {
//   onMediaSelect: (media: (typeof mediaOptions)[0][]) => void
//   selectedMedia: (typeof mediaOptions)[0][]
// }

// const MediaSelector: React.FC<MediaSelectorProps> = ({ onMediaSelect, selectedMedia }) => {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isGridView, setIsGridView] = useState(false)
//   const [zoomLevel, setZoomLevel] = useState(1)
//   const controls = useAnimation()
//   const [ref, inView] = useInView()
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
//   const [editingMedia, setEditingMedia] = useState<(typeof mediaOptions)[0] | null>(null)
//   const [brightness, setBrightness] = useState(100)
//   const [contrast, setContrast] = useState(100)
//   const [saturation, setSaturation] = useState(100)
//   const [overlayColor, setOverlayColor] = useState("#ffffff")
//   const [overlayOpacity, setOverlayOpacity] = useState(0)
//   const canvasRef = useRef<HTMLCanvasElement>(null)

//   const shuffleMedia = () => {
//     const shuffled = [...mediaOptions].sort(() => Math.random() - 0.5)
//     setCurrentIndex(0)
//     controls.start({ opacity: 0 }).then(() => {
//       mediaOptions.splice(0, mediaOptions.length, ...shuffled)
//       controls.start({ opacity: 1 })
//     })
//   }

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaOptions.length)
//   }

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaOptions.length) % mediaOptions.length)
//   }

//   const toggleMediaSelection = (media: (typeof mediaOptions)[0]) => {
//     const updatedSelection = selectedMedia.some((item) => item.url === media.url)
//       ? selectedMedia.filter((item) => item.url !== media.url)
//       : [...selectedMedia, media]
//     onMediaSelect(updatedSelection)
//   }

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "ArrowRight") nextSlide()
//       if (e.key === "ArrowLeft") prevSlide()
//     }
//     window.addEventListener("keydown", handleKeyDown)
//     return () => window.removeEventListener("keydown", handleKeyDown)
//   }, []) // Removed nextSlide and prevSlide from dependencies

//   useEffect(() => {
//     if (inView) {
//       controls.start({ opacity: 1, y: 0 })
//     }
//   }, [controls, inView])

//   const handleZoom = (zoomIn: boolean) => {
//     setZoomLevel((prevZoom) => {
//       const newZoom = zoomIn ? prevZoom + 0.1 : prevZoom - 0.1
//       return Math.max(0.5, Math.min(newZoom, 2))
//     })
//   }

//   const applyImageEffects = () => {
//     if (editingMedia && canvasRef.current) {
//       const canvas = canvasRef.current
//       const ctx = canvas.getContext("2d")
//       if (!ctx) return

//       const img = new window.Image()
//       img.crossOrigin = "anonymous"
//       img.onload = () => {
//         canvas.width = img.width
//         canvas.height = img.height
//         ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`
//         ctx.drawImage(img, 0, 0, img.width, img.height)

//         // Apply color overlay
//         ctx.globalCompositeOperation = "source-atop"
//         ctx.fillStyle = overlayColor
//         ctx.globalAlpha = overlayOpacity / 100
//         ctx.fillRect(0, 0, canvas.width, canvas.height)

//         // Reset composite operation and alpha
//         ctx.globalCompositeOperation = "source-over"
//         ctx.globalAlpha = 1

//         // Update the edited media URL
//         canvas.toBlob((blob) => {
//           if (blob) {
//             const newUrl = URL.createObjectURL(blob)
//             const updatedMedia = { ...editingMedia, url: newUrl }
//             setEditingMedia(updatedMedia)
//             onMediaSelect(selectedMedia.map((m) => (m.url === editingMedia.url ? updatedMedia : m)))
//           }
//         })
//       }
//       img.src = editingMedia.url
//     }
//   }

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={controls}
//       transition={{ duration: 0.5 }}
//       className="relative bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg"
//     >
//       <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
//         <h2 className="text-xl sm:text-2xl font-bold text-white">Media Selector</h2>
//         <div className="flex space-x-2">
//           <Button variant="outline" size="sm" onClick={() => setIsGridView(!isGridView)}>
//             {isGridView ? "Carousel View" : "Grid View"}
//           </Button>
//           <Button variant="outline" size="sm" onClick={shuffleMedia}>
//             <Shuffle className="mr-2 h-4 w-4" />
//             Shuffle
//           </Button>
//         </div>
//       </div>
//       {isGridView ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {mediaOptions.map((media, index) => (
//             <motion.div
//               key={media.url}
//               className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onHoverStart={() => setHoveredIndex(index)}
//               onHoverEnd={() => setHoveredIndex(null)}
//             >
//               {media.type === "image" ? (
//                 <Image
//                   src={media.url || "/placeholder.svg"}
//                   alt={media.name}
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-lg"
//                 />
//               ) : (
//                 <video
//                   src={media.url}
//                   className="w-full h-full object-cover rounded-lg"
//                   loop
//                   muted
//                   playsInline
//                   autoPlay={hoveredIndex === index}
//                 />
//               )}
//               <motion.div
//                 className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <Button
//                   variant={selectedMedia.some((item) => item.url === media.url) ? "default" : "outline"}
//                   size="icon"
//                   className="rounded-full mr-2"
//                   onClick={() => toggleMediaSelection(media)}
//                 >
//                   <Plus className={selectedMedia.some((item) => item.url === media.url) ? "rotate-45" : ""} />
//                 </Button>
//                 {media.type === "image" && (
//                   <Button variant="outline" size="icon" className="rounded-full" onClick={() => setEditingMedia(media)}>
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                 )}
//               </motion.div>
//             </motion.div>
//           ))}
//         </div>
//       ) : (
//         <div className="relative aspect-video">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentIndex}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.5 }}
//               className="absolute inset-0"
//               style={{ transform: `scale(${zoomLevel})` }}
//             >
//               {mediaOptions[currentIndex].type === "image" ? (
//                 <Image
//                   src={mediaOptions[currentIndex].url || "/placeholder.svg"}
//                   alt={mediaOptions[currentIndex].name}
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-lg"
//                 />
//               ) : (
//                 <video
//                   src={mediaOptions[currentIndex].url}
//                   className="w-full h-full object-cover rounded-lg"
//                   autoPlay
//                   loop
//                   muted
//                   playsInline
//                 />
//               )}
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <Button
//                   variant={
//                     selectedMedia.some((item) => item.url === mediaOptions[currentIndex].url) ? "default" : "outline"
//                   }
//                   size="icon"
//                   className="rounded-full mr-2"
//                   onClick={() => toggleMediaSelection(mediaOptions[currentIndex])}
//                 >
//                   <Plus
//                     className={
//                       selectedMedia.some((item) => item.url === mediaOptions[currentIndex].url) ? "rotate-45" : ""
//                     }
//                   />
//                 </Button>
//                 {mediaOptions[currentIndex].type === "image" && (
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="rounded-full"
//                     onClick={() => setEditingMedia(mediaOptions[currentIndex])}
//                   >
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                 )}
//               </div>
//             </motion.div>
//           </AnimatePresence>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full"
//             onClick={prevSlide}
//           >
//             <ChevronLeft size={24} />
//           </Button>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full"
//             onClick={nextSlide}
//           >
//             <ChevronRight size={24} />
//           </Button>
//           <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
//             <Button variant="ghost" size="icon" onClick={() => handleZoom(false)}>
//               <ZoomOut size={20} />
//             </Button>
//             <Slider
//               value={[zoomLevel]}
//               min={0.5}
//               max={2}
//               step={0.1}
//               onValueChange={([value]) => setZoomLevel(value)}
//               className="w-32"
//             />
//             <Button variant="ghost" size="icon" onClick={() => handleZoom(true)}>
//               <ZoomIn size={20} />
//             </Button>
//           </div>
//         </div>
//       )}
//       <div className="mt-4">
//         <h3 className="text-lg font-semibold text-white mb-2">Selected Media:</h3>
//         <div className="flex flex-wrap gap-2">
//           <AnimatePresence>
//             {selectedMedia.map((media) => (
//               <motion.div
//                 key={media.url}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 className="relative"
//               >
//                 <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden">
//                   {media.type === "image" ? (
//                     <Image
//                       src={media.url || "/placeholder.svg"}
//                       alt={media.name}
//                       width={80}
//                       height={80}
//                       objectFit="cover"
//                     />
//                   ) : (
//                     <video src={media.url} className="w-full h-full object-cover" loop muted playsInline />
//                   )}
//                 </div>
//                 <Button
//                   variant="destructive"
//                   size="icon"
//                   className="absolute -top-2 -right-2 rounded-full w-6 h-6"
//                   onClick={() => toggleMediaSelection(media)}
//                 >
//                   <X size={12} />
//                 </Button>
//                 {media.type === "video" && (
//                   <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 rounded-tl-md p-1">
//                     <Video size={12} className="text-white" />
//                   </div>
//                 )}
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       </div>
//       {editingMedia && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           className="mt-4 p-4 bg-gray-700 rounded-lg"
//         >
//           <h3 className="text-lg font-semibold text-white mb-2">Edit Image</h3>
//           <div className="space-y-4">
//             <div>
//               <label className="text-sm text-gray-300">Brightness</label>
//               <Slider
//                 value={[brightness]}
//                 min={0}
//                 max={200}
//                 step={1}
//                 onValueChange={([value]) => setBrightness(value)}
//               />
//             </div>
//             <div>
//               <label className="text-sm text-gray-300">Contrast</label>
//               <Slider value={[contrast]} min={0} max={200} step={1} onValueChange={([value]) => setContrast(value)} />
//             </div>
//             <div>
//               <label className="text-sm text-gray-300">Saturation</label>
//               <Slider
//                 value={[saturation]}
//                 min={0}
//                 max={200}
//                 step={1}
//                 onValueChange={([value]) => setSaturation(value)}
//               />
//             </div>
//             <div>
//               <label className="text-sm text-gray-300">Overlay Color</label>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className="w-full sm:w-[220px] justify-start text-left font-normal"
//                     style={{ backgroundColor: overlayColor }}
//                   >
//                     <div
//                       className="w-4 h-4 rounded-full mr-2 border border-gray-300"
//                       style={{ backgroundColor: overlayColor }}
//                     />
//                     {overlayColor}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="p-0">
//                   <HexColorPicker color={overlayColor} onChange={setOverlayColor} />
//                 </PopoverContent>
//               </Popover>
//             </div>
//             <div>
//               <label className="text-sm text-gray-300">Overlay Opacity</label>
//               <Slider
//                 value={[overlayOpacity]}
//                 min={0}
//                 max={100}
//                 step={1}
//                 onValueChange={([value]) => setOverlayOpacity(value)}
//               />
//             </div>
//             <div className="flex justify-end space-x-2">
//               <Button variant="outline" onClick={() => setEditingMedia(null)}>
//                 Cancel
//               </Button>
//               <Button onClick={applyImageEffects}>Apply</Button>
//             </div>
//           </div>
//         </motion.div>
//       )}
//       <canvas ref={canvasRef} style={{ display: "none" }} />
//     </motion.div>
//   )
// }

// export default MediaSelector

