// import { onCurrentUser } from "@/actions/user"
// import { redirect } from "next/navigation"
// import { PostScheduler } from "../_components/newSchedule/post-scheduler"
// import { ScheduledPosts } from "../_components/newSchedule/scheduled-post"
// import { CalendarDays, Clock } from "lucide-react"

// export default async function SchedulePage() {
//   const user = await onCurrentUser()

//   if (!user) {
//     redirect("/sign-in")
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-100 via-purple-50 to-teal-100 dark:from-rose-950 dark:via-purple-950 dark:to-teal-950">
//       <div className="container mx-auto py-4 px-4 sm:py-8">
//         <div className="space-y-6 sm:space-y-8">
//           {/* Header Section */}
//           <div className="relative">
//             <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl sm:rounded-2xl blur-3xl opacity-10" />
//             <div className="relative backdrop-blur-sm bg-white/50 dark:bg-black/20 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-white/20">
//               <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
//                 Instagram Scheduler
//               </h1>
//               <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
//                 Plan and schedule your Instagram content with ease. Create engaging posts, schedule them for the perfect
//                 time, and manage your content calendar all in one place.
//               </p>
//               <div className="mt-4 flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
//                 <div className="flex items-center gap-1.5 sm:gap-2">
//                   <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                   <span>Schedule for any time</span>
//                 </div>
//                 <div className="flex items-center gap-1.5 sm:gap-2">
//                   <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                   <span>Automatic publishing</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content Grid */}
//           <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr,400px]">
//             {/* Scheduler Section - Full width on mobile, left on desktop */}
//             <section className="order-2 lg:order-1">
//               <div className="lg:sticky lg:top-8">
//                 <PostScheduler userId={user.id} />
//               </div>
//             </section>

//             {/* Posts List Section - Full width on mobile, right on desktop */}
//             <section className="order-1 lg:order-2">
//               <div className="space-y-4">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg sm:rounded-xl blur-2xl opacity-10" />
//                   <div className="relative backdrop-blur-sm bg-white/50 dark:bg-black/20 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20">
//                     <h2 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
//                       Scheduled Posts
//                     </h2>
//                     <p className="text-sm sm:text-base text-muted-foreground">View and manage your content calendar</p>
//                   </div>
//                 </div>
//                 <ScheduledPosts userId={user.id} />
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// import { onCurrentUser } from "@/actions/user"
// import { redirect } from "next/navigation"
// import { PostScheduler } from "../_components/newSchedule/post-scheduler"
// import { ScheduledPosts } from "../_components/newSchedule/scheduled-post"
// import { CalendarDays, Clock } from "lucide-react"

// export default async function SchedulePage() {
//   const user = await onCurrentUser()

//   if (!user) {
//     redirect("/sign-in")
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
//       <div className="container mx-auto py-4 px-4 sm:py-8">
//         <div className="space-y-6 sm:space-y-8">
//           {/* Header Section */}
//           <div className="relative">
//             <div className="absolute inset-0 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-xl sm:rounded-2xl blur-3xl opacity-10" />
//             <div className="relative backdrop-blur-sm bg-white/50 dark:bg-black/20 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-white/20">
//               <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 bg-clip-text text-transparent">
//                 Instagram Scheduler
//               </h1>
//               <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
//                 Plan and schedule your Instagram content with ease. Create engaging posts, schedule them for the perfect
//                 time, and manage your content calendar all in one place.
//               </p>
//               <div className="mt-4 flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
//                 <div className="flex items-center gap-1.5 sm:gap-2">
//                   <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                   <span>Schedule for any time</span>
//                 </div>
//                 <div className="flex items-center gap-1.5 sm:gap-2">
//                   <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                   <span>Automatic publishing</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content Grid */}
//           <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr,400px]">
//             {/* Scheduler Section - Full width on mobile, left on desktop */}
//             <section className="order-2 lg:order-1">
//               <div className="lg:sticky lg:top-8">
//                 <PostScheduler userId={user.id} />
//               </div>
//             </section>

//             {/* Posts List Section - Full width on mobile, right on desktop */}
//             <section className="order-1 lg:order-2">
//               <div className="space-y-4">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg sm:rounded-xl blur-2xl opacity-10" />
//                   <div className="relative backdrop-blur-sm bg-white/50 dark:bg-black/20 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20">
//                     <h2 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
//                       Scheduled Posts
//                     </h2>
//                     <p className="text-sm sm:text-base text-muted-foreground">View and manage your content calendar</p>
//                   </div>
//                 </div>
//                 <ScheduledPosts userId={user.id} />
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// "use client"

// import { onCurrentUser } from "@/actions/user"
// import { redirect } from "next/navigation"
// import { PostScheduler } from "../_components/newSchedule/post-scheduler"
// import { ScheduledPosts } from "../_components/newSchedule/scheduled-post"
// import { CalendarDays, Clock, Sparkles, TrendingUp, type LucideIcon } from "lucide-react"
// import { motion } from "framer-motion"
// import { useState, useEffect } from "react"

// interface User {
//   id: string
//   // Add other user properties as needed
// }

// export default function SchedulePage() {
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     async function fetchUser() {
//       const userData = await onCurrentUser()
//       if (!userData) {
//         redirect("/sign-in")
//       }
//       setUser(userData as User)
//       setLoading(false)
//     }
//     fetchUser()
//   }, [])

//   if (loading) {
//     return <LoadingSpinner />
//   }

//   if (!user) {
//     return null // or return a message, or redirect
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 overflow-hidden">
//       <div className="container mx-auto py-4 px-4 sm:py-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="space-y-6 sm:space-y-8"
//         >
//           {/* Header Section */}
//           <motion.div className="relative" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
//             <div className="absolute inset-0 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-xl sm:rounded-2xl blur-3xl opacity-10" />
//             <div className="relative backdrop-blur-sm bg-white/50 dark:bg-black/20 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-white/20 shadow-lg">
//               <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 bg-clip-text text-transparent">
//                 Instagram Scheduler
//               </h1>
//               <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
//                 Plan and schedule your Instagram content with ease. Create engaging posts, schedule them for the perfect
//                 time, and manage your content calendar all in one place.
//               </p>
//               <div className="mt-4 flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
//                 <FeatureItem icon={CalendarDays} text="Schedule for any time" />
//                 <FeatureItem icon={Clock} text="Automatic publishing" />
//                 <FeatureItem icon={Sparkles} text="AI-powered captions" />
//                 <FeatureItem icon={TrendingUp} text="Analytics insights" />
//               </div>
//             </div>
//           </motion.div>

//           {/* Main Content Grid */}
//           <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr,400px]">
//             {/* Scheduler Section - Full width on mobile, left on desktop */}
//             <motion.section
//               className="order-2 lg:order-1"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <div className="lg:sticky lg:top-8">
//                 <PostScheduler userId={user.id} />
//               </div>
//             </motion.section>

//             {/* Posts List Section - Full width on mobile, right on desktop */}
//             <motion.section
//               className="order-1 lg:order-2"
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//             >
//               <div className="space-y-4">
//                 <motion.div
//                   className="relative"
//                   whileHover={{ scale: 1.05 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg sm:rounded-xl blur-2xl opacity-10" />
//                   <div className="relative backdrop-blur-sm bg-white/50 dark:bg-black/20 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 shadow-md">
//                     <h2 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
//                       Scheduled Posts
//                     </h2>
//                     <p className="text-sm sm:text-base text-muted-foreground">View and manage your content calendar</p>
//                   </div>
//                 </motion.div>
//                 <ScheduledPosts userId={user.id} />
//               </div>
//             </motion.section>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

// interface FeatureItemProps {
//   icon: LucideIcon
//   text: string
// }

// function FeatureItem({ icon: Icon, text }: FeatureItemProps) {
//   return (
//     <motion.div className="flex items-center gap-1.5 sm:gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//       <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//       <span>{text}</span>
//     </motion.div>
//   )
// }

// function LoadingSpinner() {
//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
//     </div>
//   )
// }

"use client"

import type React from "react"

import { onCurrentUser } from "@/actions/user"
import { redirect } from "next/navigation"
import { PostScheduler } from "../_components/newSchedule/post-scheduler"
import { ScheduledPosts } from "../_components/newSchedule/scheduled-post"
import { CalendarDays, Clock, Sparkles, TrendingUp, Instagram, type LucideIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface User {
  id: string
  // Add other user properties as needed
}

export default function SchedulePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"scheduler" | "posts">("scheduler")

  useEffect(() => {
    async function fetchUser() {
      const userData = await onCurrentUser()
      if (!userData) {
        redirect("/sign-in")
      }
      setUser(userData as User)
      setLoading(false)
    }
    fetchUser()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return null // or return a message, or redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="container mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Header Section */}
          <motion.div
            className="relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-lg sm:rounded-xl blur-3xl opacity-10" />
            <div className="relative backdrop-blur-sm bg-white/50 dark:bg-black/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20 shadow-lg">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 bg-clip-text text-transparent flex items-center gap-2">
                  <Instagram className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600" />
                  Instagram Scheduler
                </h1>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
                  Plan and schedule your Instagram content with ease. Create engaging posts, schedule them for the
                  perfect time, and manage your content calendar all in one place.
                </p>
              </motion.div>
              <motion.div
                className="mt-4 flex flex-wrap gap-2 sm:gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <FeatureItem icon={CalendarDays} text="Schedule for any time" />
                <FeatureItem icon={Clock} text="Automatic publishing" />
                <FeatureItem icon={Sparkles} text="AI-powered captions" />
                <FeatureItem icon={TrendingUp} text="Analytics insights" />
              </motion.div>
            </div>
          </motion.div>

          {/* Tab Buttons */}
          <div className="flex justify-center space-x-4">
            <TabButton active={activeTab === "scheduler"} onClick={() => setActiveTab("scheduler")}>
              Scheduler
            </TabButton>
            <TabButton active={activeTab === "posts"} onClick={() => setActiveTab("posts")}>
              Scheduled Posts
            </TabButton>
          </div>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            {activeTab === "scheduler" ? (
              <motion.div
                key="scheduler"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <PostScheduler userId={user.id} />
              </motion.div>
            ) : (
              <motion.div
                key="posts"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ScheduledPosts userId={user.id} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

interface FeatureItemProps {
  icon: LucideIcon
  text: string
}

function FeatureItem({ icon: Icon, text }: FeatureItemProps) {
  return (
    <motion.div
      className="flex items-center gap-2 px-3 py-1.5 bg-gray-200/50 dark:bg-gray-700/50 rounded-full"
      whileHover={{ scale: 1.05, backgroundColor: "rgba(107, 114, 128, 0.3)" }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">{text}</span>
    </motion.div>
  )
}

interface TabButtonProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

function TabButton({ active, onClick, children }: TabButtonProps) {
  return (
    <Button
      variant={active ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      className={`relative overflow-hidden transition-all duration-300 ${
        active ? "bg-gray-800 text-white" : "bg-transparent text-gray-600"
      }`}
    >
      {children}
      {active && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
          layoutId="activeTab"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Button>
  )
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <motion.div
        className="rounded-full h-16 w-16 border-4 border-gray-300 border-t-gray-800"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
    </div>
  )
}

