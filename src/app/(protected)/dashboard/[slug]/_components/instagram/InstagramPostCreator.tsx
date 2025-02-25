"use client"

import type React from "react"
import { useState } from "react"
import MediaSelector from "./MediaSelector"
import PostScheduleForm from "./PostScheduleForm"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface InstagramPostCreatorProps {
  userId: string
}

const InstagramPostCreator: React.FC<InstagramPostCreatorProps> = ({ userId }) => {
  const [selectedMedia, setSelectedMedia] = useState<Array<{ type: string; name: string; url: string }>>([])
  const [step, setStep] = useState<"media" | "post">("media")

  const handleMediaSelect = (media: Array<{ type: string; name: string; url: string }>) => {
    setSelectedMedia(media)
  }

  const handleMediaClear = () => {
    setSelectedMedia([])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6 rounded-lg shadow-xl max-w-4xl mx-auto"
    >
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-8rem)] px-4 py-6">
            {step === "media" ? (
              <div className="space-y-6">
                <MediaSelector onMediaSelect={handleMediaSelect} selectedMedia={selectedMedia} />
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={() => setStep("post")}
                    disabled={selectedMedia.length === 0}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <Button onClick={() => setStep("media")} variant="ghost" className="text-gray-300 hover:text-white">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <h2 className="text-2xl font-bold text-gray-100">Create Post</h2>
                </div>
                <PostScheduleForm userId={userId} selectedMedia={selectedMedia} onMediaClear={handleMediaClear} />
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default InstagramPostCreator

