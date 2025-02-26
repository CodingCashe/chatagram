"use client"

import { Button } from "@/components/ui/button"
import { CalendarPlus } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

type Props = {}

const SchedulePost = (props: Props) => {

  const router = useRouter()
  const pathname = usePathname()

  const handleSchedule = () => {
    // Extract the slug from the pathname
    const slugMatch = pathname.match(/^\/dashboard\/([^/]+)/)
    const slug = slugMatch ? slugMatch[1] : ""

    // Redirect to the integrations page with the correct slug
    router.push(`/dashboard/${slug}/post`)
  }


  return (
    <Button
      className="lg:px-10 py-6 bg-gradient-to-br hover:bg-gradient-to-tl hover:shadow-lg text-white rounded-full from-[#1A1E2D] to-[#2C3E50] font-medium transition-all duration-300 ease-in-out"
      onClick={handleSchedule}
    >
      <CalendarPlus className="h-5 w-5" />
      <p className="lg:inline md:hidden hidden">Schedule a Post</p>
    </Button>
  )
}

export default SchedulePost
