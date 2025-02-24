
import { useState } from "react"
import { motion } from "framer-motion"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ImagePlus, Smile, Send, Hash, AtSign, Calendar } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"

export default function PromoComposer() {
  const [message, setMessage] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleEmojiSelect = (emoji: { native: string }) => {
    setMessage(message + emoji.native)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 md:p-6 shadow-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Compose Promotional Message</h2>
      <Textarea
        placeholder="Type your promotional message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full h-24 md:h-32 mb-4 bg-gray-800 border-gray-700 text-white placeholder-gray-400 resize-none"
      />
      {selectedImage && (
        <div className="mb-4">
          <img src={selectedImage || "/placeholder.svg"} alt="Selected" className="max-w-full h-auto rounded-lg" />
        </div>
      )}
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div className="flex flex-wrap gap-2">
          <motion.label
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-gray-700 rounded-full cursor-pointer"
          >
            <input type="file" className="hidden" onChange={handleImageUpload} />
            <ImagePlus className="w-4 h-4 md:w-5 md:h-5 text-[#3352CC]" />
          </motion.label>
          <Popover>
            <PopoverTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-gray-700 rounded-full"
              >
                <Smile className="w-4 h-4 md:w-5 md:h-5 text-[#3352CC]" />
              </motion.button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
            </PopoverContent>
          </Popover>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 bg-gray-700 rounded-full">
            <Hash className="w-4 h-4 md:w-5 md:h-5 text-[#3352CC]" />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 bg-gray-700 rounded-full">
            <AtSign className="w-4 h-4 md:w-5 md:h-5 text-[#3352CC]" />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 bg-gray-700 rounded-full">
            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-[#3352CC]" />
          </motion.button>
        </div>
        <Button className="bg-[#3352CC] hover:bg-[#2341BB] text-white mt-2 md:mt-0">
          <Send className="w-4 h-4 mr-2" />
          Send Promo
        </Button>
      </div>
    </div>
  )
}

