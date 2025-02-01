// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { ImagePlus, Smile, Send, Hash, AtSign, Calendar } from "lucide-react"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"

// export default function PromoComposer() {
//   const [message, setMessage] = useState("")
//   const [selectedImage, setSelectedImage] = useState(null)

//   const handleEmojiSelect = (emoji) => {
//     setMessage(message + emoji.native)
//   }

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setSelectedImage(reader.result)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   return (
//     <div className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">Compose Promotional Message</h2>
//       <Textarea
//         placeholder="Type your promotional message here..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         className="w-full h-32 mb-4 bg-white bg-opacity-10 border-none text-white placeholder-gray-400 resize-none"
//       />
//       {selectedImage && (
//         <div className="mb-4">
//           <img src={selectedImage || "/placeholder.svg"} alt="Selected" className="max-w-full h-auto rounded-lg" />
//         </div>
//       )}
//       <div className="flex justify-between items-center">
//         <div className="flex space-x-2">
//           <motion.label
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="p-2 bg-pink-600 rounded-full cursor-pointer"
//           >
//             <input type="file" className="hidden" onChange={handleImageUpload} />
//             <ImagePlus className="w-5 h-5" />
//           </motion.label>
//           <Popover>
//             <PopoverTrigger asChild>
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="p-2 bg-yellow-600 rounded-full"
//               >
//                 <Smile className="w-5 h-5" />
//               </motion.button>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0">
//               <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//             </PopoverContent>
//           </Popover>
//           <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 bg-blue-600 rounded-full">
//             <Hash className="w-5 h-5" />
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="p-2 bg-green-600 rounded-full"
//           >
//             <AtSign className="w-5 h-5" />
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="p-2 bg-purple-600 rounded-full"
//           >
//             <Calendar className="w-5 h-5" />
//           </motion.button>
//         </div>
//         <Button className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600">
//           <Send className="w-4 h-4 mr-2" />
//           Send Promo
//         </Button>
//       </div>
//     </div>
//   )
// }

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
    <div className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Compose Promotional Message</h2>
      <Textarea
        placeholder="Type your promotional message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full h-32 mb-4 bg-white bg-opacity-10 border-none text-white placeholder-gray-400 resize-none"
      />
      {selectedImage && (
        <div className="mb-4">
          <img src={selectedImage || "/placeholder.svg"} alt="Selected" className="max-w-full h-auto rounded-lg" />
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <motion.label
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-pink-600 rounded-full cursor-pointer"
          >
            <input type="file" className="hidden" onChange={handleImageUpload} />
            <ImagePlus className="w-5 h-5" />
          </motion.label>
          <Popover>
            <PopoverTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-yellow-600 rounded-full"
              >
                <Smile className="w-5 h-5" />
              </motion.button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
            </PopoverContent>
          </Popover>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 bg-blue-600 rounded-full">
            <Hash className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-green-600 rounded-full"
          >
            <AtSign className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-purple-600 rounded-full"
          >
            <Calendar className="w-5 h-5" />
          </motion.button>
        </div>
        <Button className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600">
          <Send className="w-4 h-4 mr-2" />
          Send Promo
        </Button>
      </div>
    </div>
  )
}

