import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function HashtagGenerator() {
  const [keyword, setKeyword] = useState("")
  const [hashtags, setHashtags] = useState<string[]>([])

  const generateHashtags = () => {
    // This is a mock function. In a real application, you'd call an API or use an algorithm to generate hashtags.
    const mockHashtags = [
      `#${keyword}`,
      `#${keyword}Love`,
      `#${keyword}Life`,
      `#${keyword}Inspo`,
      `#${keyword}Goals`,
      `#${keyword}Community`,
      `#${keyword}Trend`,
    ]
    setHashtags(mockHashtags)
  }

  return (
    <div className="mt-4 md:mt-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 md:p-6 shadow-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Hashtag Generator</h2>
      <div className="flex flex-col md:flex-row gap-2">
        <Input
          type="text"
          placeholder="Enter a keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Button onClick={generateHashtags} className="bg-[#3352CC] hover:bg-[#2341BB] text-white">
          Generate Hashtags
        </Button>
      </div>
      {hashtags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 flex flex-wrap gap-2"
        >
          {hashtags.map((hashtag, index) => (
            <Badge key={index} variant="secondary" className="bg-gray-700 text-white">
              {hashtag}
            </Badge>
          ))}
        </motion.div>
      )}
    </div>
  )
}

