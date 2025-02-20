import { onCurrentUser } from "@/actions/user"
import InstagramSimulator from "../_components/instagram/InstagramSimulator"
import ErrorBoundary from "../_components/instagram/ErrorBoundary"
import { getScheduledPosts } from "@/actions/schedule/schedule-post"
import AIContentGenerator from "../_components/instagram/AIContentGenerator"
import PendingPosts from "../_components/instagram/PendingPosts"
import DashboardStats from "../_components/instagram/DashboardStats"
import InstagramPostCreator from "../_components/instagram/InstagramPostCreator"

export default async function SchedulePage() {
  const user = await onCurrentUser()

  if (!user) {
    return <div className="text-center text-white">Please log in to access this page.</div>
  }

  const postsResult = await getScheduledPosts(user.id)
  const posts = postsResult.success ? postsResult.data || [] : []

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <DashboardStats posts={posts} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
            <ErrorBoundary
              fallback={
                <div className="text-red-500">Something went wrong with the post form. Please try again later.</div>
              }
            >
              <InstagramPostCreator userId={user.id} />
            </ErrorBoundary>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">AI Content Generator</h2>
            <AIContentGenerator userId={user.id} />
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Pending Posts</h2>
            <PendingPosts posts={posts.filter((post) => post.status === "scheduled")} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Instagram Feed Preview</h2>
            <ErrorBoundary
              fallback={<div className="text-red-500">Something went wrong loading posts. Please try again later.</div>}
            >
              <InstagramSimulator posts={posts} />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  )
}

