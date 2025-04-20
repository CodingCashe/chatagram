"use client"

import { useState } from "react"
import { Smile } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"

type Reaction = {
  emoji: string
  count: number
  users: string[]
}

type MessageReactionProps = {
  messageId: string
  chatId: string
  reactions: Reaction[]
  currentUserId: string
  onReactionAdd: (messageId: string, emoji: string) => void
}

export function MessageReaction({
  messageId,
  chatId,
  reactions = [],
  currentUserId,
  onReactionAdd,
}: MessageReactionProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  const handleEmojiSelect = (emoji: any) => {
    onReactionAdd(messageId, emoji.native)
    setIsPickerOpen(false)
  }

  const hasUserReacted = (reaction: Reaction) => {
    return reaction.users.includes(currentUserId)
  }

  const handleReactionClick = (emoji: string) => {
    onReactionAdd(messageId, emoji)
  }

  return (
    <div className="flex items-center mt-1 gap-1">
      {reactions.length > 0 && (
        <div className="flex flex-wrap gap-1 mr-1">
          {reactions.map((reaction, index) => (
            <Button
              key={`${reaction.emoji}-${index}`}
              variant="ghost"
              size="sm"
              className={`h-6 min-w-[2rem] px-1 py-0 rounded-full text-xs ${
                hasUserReacted(reaction)
                  ? "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50"
                  : "bg-gray-800/50 hover:bg-gray-800"
              }`}
              onClick={() => handleReactionClick(reaction.emoji)}
            >
              <span className="mr-1">{reaction.emoji}</span>
              <span>{reaction.count}</span>
            </Button>
          ))}
        </div>
      )}

      <Popover open={isPickerOpen} onOpenChange={setIsPickerOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full hover:bg-gray-800">
            <Smile className="h-3.5 w-3.5 text-gray-400" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 border-gray-700 bg-gray-800 w-auto" side="top" align="start">
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            theme="dark"
            previewPosition="none"
            skinTonePosition="none"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
