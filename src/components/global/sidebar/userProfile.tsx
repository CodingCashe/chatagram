'use client'

import React from 'react'
import { useUser } from '@clerk/nextjs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { LogOut, Mail, MapPin } from 'lucide-react'

interface SimplifiedUserProfileProps {
  onSignOut: () => void
}

const SimplifiedUserProfile: React.FC<SimplifiedUserProfileProps> = ({ onSignOut }) => {
  const { user } = useUser()

  if (!user) return null

  return (
    <Card className="w-80 bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl">
      <CardHeader className="flex flex-col items-center pb-2">
        <Avatar className="h-24 w-24 mb-4 ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-800">
          <AvatarImage src={user.imageUrl || "https://github.com/shadcn.png"} />
          <AvatarFallback>{user.firstName?.[0]}{user.lastName?.[0]}</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
        <p className="text-sm text-gray-400">@{user.username}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm">
          <Mail className="mr-2 h-4 w-4 text-blue-400" />
          <span>{user.primaryEmailAddress?.emailAddress}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          className="w-full justify-center text-red-400 hover:text-red-300 hover:bg-red-400/10" 
          onClick={onSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </CardFooter>
    </Card>
  )
}

export default SimplifiedUserProfile

