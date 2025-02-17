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
//           <div className="lg:order-2">
//             <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
//             <ErrorBoundary
//               fallback={
//                 <div className="text-red-500">Something went wrong with the post form. Please try again later.</div>
//               }
//             >
//               <PostScheduleForm userId={user.id} />
//             </ErrorBoundary>
//           </div>
//           <div className="lg:order-1">
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

// import { onCurrentUser } from "@/actions/user"
// import PostScheduleForm from "../_components/instagram/PostScheduleForm"
// import InstagramSimulator from "../_components/instagram/InstagramSimulator"
// import ErrorBoundary from "../_components/instagram/ErrorBoundary"
// import { getScheduledPosts } from "@/actions/schedule/schedule-post"
// import AIContentGenerator from "../_components/instagram/AIContentGenerator"
// import PendingPosts from "../_components/instagram/PendingPosts"
// import MediaSelector from "../_components/instagram/MediaSelector"
// import DashboardStats from "../_components/instagram/DashboardStats"

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
//         <DashboardStats posts={posts} />
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
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
//             <h2 className="text-2xl font-bold mb-4">Media Library</h2>
//             <MediaSelector />
//           </div>
//         </div>
//         <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <div>
//             <h2 className="text-2xl font-bold mb-4">AI Content Generator</h2>
//             <AIContentGenerator userId={user.id} />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Pending Posts</h2>
//             <PendingPosts posts={posts.filter((post) => post.status === "scheduled")} />
//           </div>
//         </div>
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold mb-4">Instagram Feed Preview</h2>
//           <ErrorBoundary
//             fallback={<div className="text-red-500">Something went wrong loading posts. Please try again later.</div>}
//           >
//             <InstagramSimulator posts={posts} />
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
// import AIContentGenerator from "../_components/instagram/AIContentGenerator"
// import PendingPosts from "../_components/instagram/PendingPosts"
// import MediaSelector from "../_components/instagram/MediaSelector"
// import DashboardStats from "../_components/instagram/DashboardStats"
// import PublishingLimitCheck from "../_components/instagram/PublishingLimitCheck"

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
//         <DashboardStats posts={posts} />
//         <PublishingLimitCheck userId={user.id} />
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
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
//             <h2 className="text-2xl font-bold mb-4">Media Library</h2>
//             <MediaSelector onSelect={(media) => console.log("Selected media:", media)} maxItems={10} />
//           </div>
//         </div>
//         <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <div>
//             <h2 className="text-2xl font-bold mb-4">AI Content Generator</h2>
//             <AIContentGenerator userId={user.id} />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Pending Posts</h2>
//             <PendingPosts posts={posts.filter((post) => post.status === "scheduled")} />
//           </div>
//         </div>
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold mb-4">Instagram Feed Preview</h2>
//           <ErrorBoundary
//             fallback={<div className="text-red-500">Something went wrong loading posts. Please try again later.</div>}
//           >
//             <InstagramSimulator posts={posts} />
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
// import AIContentGenerator from "../_components/instagram/AIContentGenerator"
// import PendingPosts from "../_components/instagram/PendingPosts"
// import MediaSelectorWrapper from "../_components/instagram/wrapper"
// import DashboardStats from "../_components/instagram/DashboardStats"
// import PublishingLimitCheck from "../_components/instagram/PublishingLimitCheck"

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
//         <DashboardStats posts={posts} />
//         <PublishingLimitCheck userId={user.id} />
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
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
//             <h2 className="text-2xl font-bold mb-4">Media Library</h2>
//             <MediaSelectorWrapper maxItems={10} />
//           </div>
//         </div>
//         <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <div>
//             <h2 className="text-2xl font-bold mb-4">AI Content Generator</h2>
//             <AIContentGenerator userId={user.id} />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Pending Posts</h2>
//             <PendingPosts posts={posts.filter((post) => post.status === "scheduled")} />
//           </div>
//         </div>
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold mb-4">Instagram Feed Preview</h2>
//           <ErrorBoundary
//             fallback={<div className="text-red-500">Something went wrong loading posts. Please try again later.</div>}
//           >
//             <InstagramSimulator posts={posts} />
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
// import AIContentGenerator from "../_components/instagram/AIContentGenerator"
// import PendingPosts from "../_components/instagram/PendingPosts"
// import MediaSelector from "../_components/instagram/MediaSelector"
// import DashboardStats from "../_components/instagram/DashboardStats"

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
//         <DashboardStats posts={posts} />
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
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
//             <h2 className="text-2xl font-bold mb-4">Media Library</h2>
//             <MediaSelector />
//           </div>
//         </div>
//         <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <div>
//             <h2 className="text-2xl font-bold mb-4">AI Content Generator</h2>
//             <AIContentGenerator userId={user.id} />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Pending Posts</h2>
//             <PendingPosts posts={posts.filter((post) => post.status === "scheduled")} />
//           </div>
//         </div>
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold mb-4">Instagram Feed Preview</h2>
//           <ErrorBoundary
//             fallback={<div className="text-red-500">Something went wrong loading posts. Please try again later.</div>}
//           >
//             <InstagramSimulator posts={posts} />
//           </ErrorBoundary>
//         </div>
//       </div>
//     </div>
//   )
// }

import { onCurrentUser } from "@/actions/user"
import { getScheduledPosts } from "@/actions/schedule/schedule-post"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Loader2, Layout, PlusCircle, Calendar, Image, Zap, Clock } from "lucide-react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const PostScheduleForm = dynamic(() => import("../_components/instagram/PostScheduleForm"), {
  loading: () => <Loader2 className="h-8 w-8 animate-spin" />,
})
const InstagramSimulator = dynamic(() => import("../_components/instagram/InstagramSimulator"), {
  loading: () => <Loader2 className="h-8 w-8 animate-spin" />,
})
const AIContentGenerator = dynamic(() => import("../_components/instagram/AIContentGenerator"), {
  loading: () => <Loader2 className="h-8 w-8 animate-spin" />,
})
const PendingPosts = dynamic(() => import("../_components/instagram/PendingPosts"), {
  loading: () => <Loader2 className="h-8 w-8 animate-spin" />,
})
const MediaSelector = dynamic(() => import("../_components/instagram/MediaSelector"), {
  loading: () => <Loader2 className="h-8 w-8 animate-spin" />,
})
const DashboardStats = dynamic(() => import("../_components/instagram/DashboardStats"), {
  loading: () => <Loader2 className="h-8 w-8 animate-spin" />,
})

export default async function SchedulePage() {
  const user = await onCurrentUser()

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-center text-white">
        Please log in to access this page.
      </div>
    )
  }

  const postsResult = await getScheduledPosts(user.id)
  const posts = postsResult.success ? postsResult.data || [] : []

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-900 text-white">
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <Layout className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>Create Post</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Scheduled Posts</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <Image className="mr-2 h-4 w-4" />
                    <span>Media Library</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Instagram Post Manager</h1>
            <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
              <DashboardStats posts={posts} />
            </Suspense>
            <Tabs defaultValue="create" className="mt-8">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="create">Create Post</TabsTrigger>
                <TabsTrigger value="ai">AI Generator</TabsTrigger>
                <TabsTrigger value="pending">Pending Posts</TabsTrigger>
              </TabsList>
              <TabsContent value="create">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Create New Post</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
                        <PostScheduleForm userId={user.id} />
                      </Suspense>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Media Library</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
                        <MediaSelector />
                      </Suspense>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="ai">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Content Generator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
                      <AIContentGenerator userId={user.id} />
                    </Suspense>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="pending">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
                      <PendingPosts posts={posts.filter((post) => post.status === "scheduled")} />
                    </Suspense>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Card className="mt-12">
              <CardHeader>
                <CardTitle>Instagram Feed Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
                  <InstagramSimulator posts={posts} />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
        <TooltipProvider>
          <div className="fixed bottom-8 right-8 flex flex-col gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" className="rounded-full">
                  <Zap className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Quick Actions</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" className="rounded-full">
                  <Clock className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Recent Activity</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </SidebarProvider>
  )
}

