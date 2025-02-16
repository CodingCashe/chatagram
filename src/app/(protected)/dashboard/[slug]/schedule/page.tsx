// import { onCurrentUser } from "@/actions/user"
// import PostScheduleForm from "../_components/instagram/PostScheduleForm"
// import ScheduledPosts from "../_components/instagram/ScheduledPost"

// export default async function SchedulePage() {
//   const user = await onCurrentUser()

//   if (!user) {
//     return <div>Please log in to access this page.</div>
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Post to Instagram</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
//           <PostScheduleForm userId={user.id} />
//         </div>
//         <div>
//           <ScheduledPosts userId={user.id} />
//         </div>
//       </div>
//     </div>
//   )
// }

// import { onUserInfo } from "@/actions/user"
// import PostScheduleForm from "../_components/instagram/PostScheduleForm"
// import ScheduledPosts from "../_components/instagram/ScheduledPost"

// export default async function SchedulePage() {
//   const userInfoResult = await onUserInfo()

//   if (userInfoResult.status !== 200) {
//     return <div>Error loading user information. Please try again later.</div>
//   }

//   const user = userInfoResult.data

//   if (!user) {
//     return <div>Please log in to access this page.</div>
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Post to Instagram</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
//           <PostScheduleForm />
//         </div>
//         <div>
//           <ScheduledPosts userId={user.id} />
//         </div>
//       </div>
//     </div>
//   )
// }

// import { onCurrentUser } from "@/actions/user"
// import PostScheduleForm from "../_components/instagram/PostScheduleForm"
// import ScheduledPosts from "../_components/instagram/ScheduledPost"
// import ErrorBoundary from "../_components/instagram/ErrorBoundary"

// export default async function SchedulePage() {
//   const user = await onCurrentUser()

//   if (!user) {
//     return <div>Please log in to access this page.</div>
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Post to Instagram</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
//           <ErrorBoundary fallback={<div>Something went wrong with the post form. Please try again later.</div>}>
//             <PostScheduleForm userId={user.id} />
//           </ErrorBoundary>
//         </div>
//         <div>
//           <ErrorBoundary fallback={<div>Something went wrong loading scheduled posts. Please try again later.</div>}>
//             <ScheduledPosts userId={user.id} />
//           </ErrorBoundary>
//         </div>
//       </div>
//     </div>
//   )
// }

// import { onCurrentUser } from "@/actions/user"
// import PostScheduleForm from "../_components/instagram/PostScheduleForm"
// import InstagramFeed from "../_components/instagram/InstagramFeed"
// import ErrorBoundary from "../_components/instagram/ErrorBoundary"
// import { getScheduledPosts } from "@/actions/schedule/schedule-post"

// export default async function SchedulePage() {
//   const user = await onCurrentUser()

//   if (!user) {
//     return <div>Please log in to access this page.</div>
//   }

//   const postsResult = await getScheduledPosts(user.id)
//   const posts = postsResult.success ? postsResult.data || [] : []

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold mb-8 text-center">Instagram Post Manager</h1>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-1">
//           <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
//           <ErrorBoundary fallback={<div>Something went wrong with the post form. Please try again later.</div>}>
//             <PostScheduleForm userId={user.id} />
//           </ErrorBoundary>
//         </div>
//         <div className="lg:col-span-2">
//           <ErrorBoundary fallback={<div>Something went wrong loading posts. Please try again later.</div>}>
//             <InstagramFeed posts={posts} />
//           </ErrorBoundary>
//         </div>
//       </div>
//     </div>
//   )
// }

// import { onCurrentUser } from "@/actions/user"
// import PostScheduleForm from "../_components/instagram/PostScheduleForm"
// import InstagramSimulator from "../_components/instagram/InstagramSimulator"
// import ErrorBoundary from "../_components/instagram/ErrorBoundary"
// import { getScheduledPosts } from "@/actions/schedule/schedule-post"

// export default async function SchedulePage() {
//   const user = await onCurrentUser()

//   if (!user) {
//     return <div className="text-center text-white">Please log in to access this page.</div>
//   }

//   const postsResult = await getScheduledPosts(user.id)
//   const posts = postsResult.success ? postsResult.data || [] : []

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
//           Instagram Post Manager
//         </h1>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
//             <ErrorBoundary
//               fallback={
//                 <div className="text-red-500">Something went wrong with the post form. Please try again later.</div>
//               }
//             >
//               <PostScheduleForm userId={user.id} />
//             </ErrorBoundary>
//           </div>
//           <div>
//             <ErrorBoundary
//               fallback={<div className="text-red-500">Something went wrong loading posts. Please try again later.</div>}
//             >
//               <InstagramSimulator posts={posts} />
//             </ErrorBoundary>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { onCurrentUser } from "@/actions/user"
import PostScheduleForm from "../_components/instagram/PostScheduleForm"
import InstagramSimulator from "../_components/instagram/InstagramSimulator"
import ErrorBoundary from "../_components/instagram/ErrorBoundary"
import { getScheduledPosts } from "@/actions/schedule/schedule-post"

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
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Instagram Post Manager
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:order-2">
            <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
            <ErrorBoundary
              fallback={
                <div className="text-red-500">Something went wrong with the post form. Please try again later.</div>
              }
            >
              <PostScheduleForm userId={user.id} />
            </ErrorBoundary>
          </div>
          <div className="lg:order-1">
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

