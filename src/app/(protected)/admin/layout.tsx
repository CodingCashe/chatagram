// import type React from "react"
// import { AdminSidebar } from "./components/admin-sidebar"
// import { SidebarProvider } from "@/components/ui/sidebar"
// import { Toaster } from "@/components/ui/toaster"
// import { redirect } from "next/navigation"
// import { onCurrentUser, onUserInfo } from "@/actions/user"

// export default async function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   // Check if user is admin - you'll need to add an isAdmin field to your User model
//   try {
//     const user = await onCurrentUser()
//     const userInfo = await onUserInfo()

//     // This is a placeholder - you should implement proper admin check
//     // For example, check if user email is an admin email or if user has admin role
//     const isAdmin = userInfo.data?.email === process.env.ADMIN_EMAIL

//     if (!isAdmin) {
//       redirect("/dashboard")
//     }

//     return (
//       <SidebarProvider>
//         <div className="flex h-screen bg-muted/20">
//           <AdminSidebar />
//           <div className="flex-1 overflow-auto">{children}</div>
//         </div>
//         <Toaster />
//       </SidebarProvider>
//     )
//   } catch (error) {
//     redirect("/sign-in")
//   }
// }

import type React from "react"
import { AdminSidebar } from "./components/admin-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { redirect } from "next/navigation"
import { isUserAdmin } from "./utils"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is admin using the utility function
  const isAdmin = await isUserAdmin()

  if (!isAdmin) {
    redirect("/dashboard")
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-muted/20">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}

