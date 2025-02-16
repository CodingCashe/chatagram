import { onCurrentUser } from "@/actions/user"
import PostScheduleForm from "../_components/instagram/PostScheduleForm"
import ScheduledPosts from "../_components/instagram/ScheduledPost"

export default async function SchedulePage() {
  const user = await onCurrentUser()

  if (!user) {
    return <div>Please log in to access this page.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Post to Instagram</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
          <PostScheduleForm userId={user.id} />
        </div>
        <div>
          <ScheduledPosts userId={user.id} />
        </div>
      </div>
    </div>
  )
}

