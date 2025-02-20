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

