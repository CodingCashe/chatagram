"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, Maximize2 } from "lucide-react"

interface WhiteboardMessageProps {
  imageData: string
  messageId?:string
}

export function WhiteboardMessage({ imageData }: WhiteboardMessageProps) {
  const [isOpen, setIsOpen] = useState(false)

  const downloadImage = () => {
    const a = document.createElement("a")
    a.href = imageData
    a.download = `whiteboard-${new Date().toISOString().slice(0, 10)}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="w-full">
      <div className="relative rounded-lg overflow-hidden border border-gray-700 bg-gray-800">
        <div className="p-2 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
          <span className="text-sm font-medium text-white">Whiteboard</span>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={downloadImage}
              className="h-6 w-6 text-gray-400 hover:text-white"
            >
              <Download className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(true)}
              className="h-6 w-6 text-gray-400 hover:text-white"
            >
              <Maximize2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <div
          className="w-full h-48 cursor-pointer"
          onClick={() => setIsOpen(true)}
          style={{
            backgroundImage: `url(${imageData})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#1a1a1a",
          }}
        />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full p-0 bg-gray-900 border-gray-700">
          <DialogHeader className="p-4 border-b border-gray-800">
            <DialogTitle className="text-white">Whiteboard</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-[70vh] bg-[#1a1a1a]">
            <img
              src={imageData || "/placeholder.svg"}
              alt="Whiteboard"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
          <div className="p-4 border-t border-gray-800 flex justify-end">
            <Button onClick={downloadImage}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
