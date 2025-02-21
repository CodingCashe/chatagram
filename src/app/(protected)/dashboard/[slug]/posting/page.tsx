import { onCurrentUser } from "@/actions/user"
import { redirect } from "next/navigation"
import { PostScheduler } from "../_components/newSchedule/post-scheduler"
import { ScheduledPosts } from "../_components/newSchedule/scheduled-post"
import { Separator } from "@/components/ui/separator"

export default async function SchedulePage() {
  const user = await onCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Instagram Scheduler</h1>
          <p className="text-muted-foreground">Schedule and manage your Instagram posts</p>
        </div>

        <Separator />

        <div className="grid gap-8">
          {/* Post Scheduler Section */}
          <section>
            <PostScheduler userId={user.id} />
          </section>

          {/* Scheduled Posts Section */}
          <section className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">Scheduled Posts</h2>
              <p className="text-muted-foreground">View and manage your scheduled content</p>
            </div>
            <ScheduledPosts userId={user.id} />
          </section>
        </div>
      </div>
    </div>
  )
}

