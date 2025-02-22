// import { onCurrentUser } from "@/actions/user"
// import { redirect } from "next/navigation"
// import { PostScheduler } from "../_components/newSchedule/post-scheduler"
// import { ScheduledPosts } from "../_components/newSchedule/scheduled-post"
// import { Separator } from "@/components/ui/separator"

// export default async function SchedulePage() {
//   const user = await onCurrentUser()

//   if (!user) {
//     redirect("/sign-in")
//   }

//   return (
//     <div className="container mx-auto py-8">
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold">Instagram Scheduler</h1>
//           <p className="text-muted-foreground">Schedule and manage your Instagram posts</p>
//         </div>

//         <Separator />

//         <div className="grid gap-8">
//           {/* Post Scheduler Section */}
//           <section>
//             <PostScheduler userId={user.id} />
//           </section>

//           {/* Scheduled Posts Section */}
//           <section className="space-y-4">
//             <div>
//               <h2 className="text-2xl font-semibold">Scheduled Posts</h2>
//               <p className="text-muted-foreground">View and manage your scheduled content</p>
//             </div>
//             <ScheduledPosts userId={user.id} />
//           </section>
//         </div>
//       </div>
//     </div>
//   )
// }

import { onCurrentUser } from "@/actions/user"
import { redirect } from "next/navigation"
import { PostScheduler } from "../_components/newSchedule/post-scheduler"
import { ScheduledPosts } from "../_components/newSchedule/scheduled-post"
import { CalendarDays, Clock } from "lucide-react"

export default async function SchedulePage() {
  const user = await onCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-purple-50 to-teal-100 dark:from-rose-950 dark:via-purple-950 dark:to-teal-950">
      <div className="container mx-auto py-4 px-4 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Header Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl sm:rounded-2xl blur-3xl opacity-10" />
            <div className="relative backdrop-blur-sm bg-white/50 dark:bg-black/20 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-white/20">
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Instagram Scheduler
              </h1>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
                Plan and schedule your Instagram content with ease. Create engaging posts, schedule them for the perfect
                time, and manage your content calendar all in one place.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Schedule for any time</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Automatic publishing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr,400px]">
            {/* Scheduler Section - Full width on mobile, left on desktop */}
            <section className="order-2 lg:order-1">
              <div className="lg:sticky lg:top-8">
                <PostScheduler userId={user.id} />
              </div>
            </section>

            {/* Posts List Section - Full width on mobile, right on desktop */}
            <section className="order-1 lg:order-2">
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg sm:rounded-xl blur-2xl opacity-10" />
                  <div className="relative backdrop-blur-sm bg-white/50 dark:bg-black/20 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20">
                    <h2 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                      Scheduled Posts
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground">View and manage your content calendar</p>
                  </div>
                </div>
                <ScheduledPosts userId={user.id} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

