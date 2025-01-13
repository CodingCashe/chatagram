'use client'

import React from 'react'
import { useUser } from '@clerk/nextjs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

interface UserProfileProps {
  onSignOut: () => void
}

const UserProfile: React.FC<UserProfileProps> = ({ onSignOut }) => {
  const { user } = useUser()

  if (!user) return null

  return (
    <div className="p-2 bg-gray-800 text-white">
      <div className="flex items-center space-x-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.imageUrl || "https://github.com/shadcn.png"} />
          <AvatarFallback>{user.firstName?.[0]}{user.lastName?.[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-gray-400 truncate">
            {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-gray-400 hover:text-white hover:bg-gray-700"
          onClick={onSignOut}
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default UserProfile

