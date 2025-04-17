"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter,usePathname } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/hooks/use-toast"
import { getOrCreateChat } from "@/actions/collab/chat-actions"

// This page handles redirects from the influencer applications component
export default function InfluencerMessageRedirect() {
  const params = useParams()
  const router = useRouter()
  const influencerId = params.influencerId as string
  const [loading, setLoading] = useState(true)

  const pathname = usePathname()
  const slugMatch = pathname.match(/^\/dashboard\/([^/]+)/)
  const slug = slugMatch ? slugMatch[1] : ""

  useEffect(() => {
    const initializeChat = async () => {
      if (!influencerId) {
        router.push(`/dashboard/${slug}/messages`)
        return
      }

      try {
        const { status, data, message, isNew } = await getOrCreateChat(influencerId)

        if (status === 200 && data) {
          // If this is a new chat, show a welcome message
          if (isNew) {
            toast({
              title: "Chat Created",
              description: "You can now start messaging this influencer",
            })
          }

          // Redirect to the chat page
          router.push(`/dashboard/${slug}/messages/new/${data.id}`)
        } else {
          toast({
            title: "Error",
            description: message || "Failed to create chat",
            variant: "destructive",
          })
          router.push(`/dashboard/${slug}/messages`)
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
        router.push(`/dashboard/${slug}/messages`)
      } finally {
        setLoading(false)
      }
    }

    initializeChat()
  }, [influencerId, router])

  if (loading) {
    return (
      <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-950">
        <div className="container mx-auto p-4 flex flex-1 items-center justify-center">
          <div className="text-center">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>
        </div>
      </div>
    )
  }

  return null
}
