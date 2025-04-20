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

// import type React from "react"
// import { AdminSidebar } from "./components/admin-sidebar"
// import { SidebarProvider } from "@/components/ui/sidebar"
// import { Toaster } from "@/components/ui/toaster"
// import { redirect } from "next/navigation"
// import { isUserAdmin } from "./utils"

// export default async function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   // Check if user is admin using the utility function
//   const isAdmin = await isUserAdmin()

//   if (!isAdmin) {
//     redirect("/dashboard")
//   }

//   return (
//     <SidebarProvider>
//       <div className="flex h-screen bg-muted/20">
//         <AdminSidebar />
//         <div className="flex-1 overflow-auto">{children}</div>
//       </div>
//       <Toaster />
//     </SidebarProvider>
//   )
// }

// import type React from "react"
// import { AdminSidebar } from "./components/admin-sidebar"
// import { SidebarProvider } from "@/components/ui/sidebar"
// import { Toaster } from "@/components/ui/toaster"
// import { redirect } from "next/navigation"
// import { requireAdmin } from "./utils"
// import { headers } from "next/headers"

// export default async function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   // Get headers asynchronously
//   const headersList = await headers();
//   const pathname = headersList.get("x-pathname") || "/admin";
  
//   // Log the pathname if needed
//   console.log("Current admin path:", pathname);

//   // Check if user is admin using the enhanced security function
//   try {
//     await requireAdmin()
//   } catch (error) {
//     console.error("Admin access denied:", error)
//     redirect("/dashboard")
//   }

//   return (
//     <SidebarProvider>
//       <div className="flex h-screen bg-muted/20">
//         <AdminSidebar />
//         <div className="flex-1 overflow-auto">{children}</div>
//       </div>
//       <Toaster />
//     </SidebarProvider>
//   )
// }


export const dynamic = 'force-dynamic'
// import { DashboardHeader } from "./components/dashboard-header"
import "./components/sidebar-styles.css"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import type React from "react"
import { EnhancedSidebar } from "./components/enhanced-sidebar"
// import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { redirect } from "next/navigation"
import { requireAdmin } from "./utils"
import { headers } from "next/headers"
import { ThemeProvider } from "@/providers/theme-provider"
import { NotificationListener } from "./components/notification-listener"
import { onBoardUser } from "@/actions/user"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Store the current path in headers for logging purposes
  // headers().set("x-pathname", headers().get("x-pathname") || "/admin")
  // Get headers asynchronously
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "/admin";

  const user = await onBoardUser()
  // Log the pathname if needed
  console.log("Current admin path:", pathname);

  // Check if user is admin using the enhanced security function
  let admin
  try {
    admin = await requireAdmin()
  } catch (error) {
    console.error("Admin access denied:", error)
    return redirect(`/dashboard/${user.data?.firstname}-${user.data?.lastname}`)
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <div className="flex h-screen bg-background">
          <EnhancedSidebar />
           <SidebarInset className="bg-background">
          <div className="flex h-full flex-col">
            {/* <DashboardHeader adminName="Cashe" /> */}
            <div className="flex-1 overflow-auto p-4">{children}</div>
          </div>
        </SidebarInset>
        </div>
        <NotificationListener userId={admin.id} />
        <Toaster />
      </SidebarProvider>
    </ThemeProvider>
  )
}



// export const dynamic = 'force-dynamic'

// import type React from "react"
// import { EnhancedSidebar } from "./components/enhanced-sidebar"
// import { SidebarProvider } from "@/components/ui/sidebar"
// import { Toaster } from "@/components/ui/toaster"
// import { redirect } from "next/navigation"
// import { requireAdmin } from "./utils"
// import { headers } from "next/headers"
// import { ThemeProvider } from "@/providers/theme-provider"
// import { NotificationListener } from "./components/notification-listener"

// export default async function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   // Store the current path in headers for logging purposes
//   headers().set("x-pathname", headers().get("x-pathname") || "/admin")

//   // Check if user is admin using the enhanced security function
//   let admin
//   try {
//     admin = await requireAdmin()
//   } catch (error) {
//     console.error("Admin access denied:", error)
//     redirect("/dashboard")
//   }

//   return (
//     <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//       <SidebarProvider>
//         <div className="flex h-screen bg-background">
//           <EnhancedSidebar />
//           <div className="flex-1 flex flex-col overflow-hidden">
//             <div className="flex-1 overflow-auto">{children}</div>
//           </div>
//         </div>
//         <NotificationListener userId={admin.id} />
//         <Toaster />
//       </SidebarProvider>
//     </ThemeProvider>
//   )
// }

