'use client'

import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { LogOut, ChevronUp, ChevronDown } from 'lucide-react'

interface UserProfileProps {
  onSignOut: () => void
}

const UserProfile: React.FC<UserProfileProps> = ({ onSignOut }) => {
  const { user } = useUser()
  const [isExpanded, setIsExpanded] = useState(false)

  if (!user) return null

  return (
    <div className="relative m-2">
      <button
        className="w-full p-3 bg-gray-800 text-white text-left rounded-md border border-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-700"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium truncate">
            {user.firstName} {user.lastName}
          </span>
          <motion.div
            initial={false}
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-full left-0 w-full mb-2 bg-gray-800 rounded-md border border-gray-700 shadow-lg overflow-hidden"
          >
            <div className="p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 ring-2 ring-gray-700">
                  <AvatarImage src={user.imageUrl || "https://github.com/shadcn.png"} />
                  <AvatarFallback>{user.firstName?.[0]}{user.lastName?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-white">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation()
                  onSignOut()
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserProfile

