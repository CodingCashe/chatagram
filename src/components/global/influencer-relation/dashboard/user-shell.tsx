// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { usePathname } from "next/navigation"
// import { motion } from "framer-motion"
// import { cn } from "@/lib/utils"
// import { DashboardNav } from "./nav"
// import { MobileNav } from "./mobile-nav"
// import { UserNav } from "./user-nav"
// import { NotificationsPopover } from "./notifications"
// import { Search } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"

// interface DashboardShellProps {
//   children?: React.ReactNode
// }

// export function DashboardShell({ children }: DashboardShellProps) {
//   const pathname = usePathname()
//   const [isMounted, setIsMounted] = useState(false)
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false)
//   const [isMobile, setIsMobile] = useState(false)

//   useEffect(() => {
//     setIsMounted(true)
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768)
//       if (window.innerWidth < 1024) {
//         setIsSidebarOpen(false)
//       }
//     }

//     checkMobile()
//     window.addEventListener("resize", checkMobile)
//     return () => window.removeEventListener("resize", checkMobile)
//   }, [])

//   if (!isMounted) {
//     return null
//   }

//   return (
//     <div className="flex min-h-screen flex-col">
//       <header className="sticky top-0 z-40 border-b bg-background">
//         <div className="flex h-16 items-center justify-between px-4 md:px-6">
//           <div className="flex items-center gap-2">
//             <MobileNav />
//             {/* <span className="hidden font-bold md:inline-block">InstaGrowth</span> */}
//           </div>

//           <div className="flex flex-1 items-center justify-end gap-4 md:justify-between">
//             <div className="relative hidden w-full max-w-sm md:flex">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search..."
//                 className="w-full rounded-lg bg-background pl-8 md:w-[240px] lg:w-[340px]"
//               />
//             </div>

//             <div className="flex items-center gap-3">
//               <NotificationsPopover />
//               <UserNav />
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="flex flex-1">
//         <motion.aside
//           initial={false}
//           animate={{
//             width: isSidebarOpen ? 240 : 0,
//             opacity: isSidebarOpen ? 1 : 0,
//           }}
//           className={cn(
//             "fixed inset-y-0 left-0 z-30 hidden h-full w-60 flex-col border-r bg-background pt-16 md:flex",
//             !isSidebarOpen && "hidden",
//           )}
//         >
//           <DashboardNav pathname={pathname} />

//           <div className="mt-auto p-4">
//             <Button variant="outline" size="sm" className="w-full" onClick={() => setIsSidebarOpen(false)}>
//               Collapse
//             </Button>
//           </div>
//         </motion.aside>

//         <motion.div
//           initial={false}
//           animate={{
//             marginLeft: isSidebarOpen && !isMobile ? 240 : 0,
//           }}
//           className="flex-1"
//         >
//           <main className="flex-1 p-4 md:p-6">
//             {!isSidebarOpen && !isMobile && (
//               <Button variant="outline" size="sm" className="mb-4" onClick={() => setIsSidebarOpen(true)}>
//                 Expand Sidebar
//               </Button>
//             )}
//             {children}
//           </main>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { DashboardNav } from "./nav"
import { MobileNav } from "./mobile-nav"
import { UserNav } from "./user-nav"
import { NotificationsPopover } from "./notifications"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface DashboardShellProps {
  children?: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <MobileNav />
            {/* <span className="hidden font-bold md:inline-block">InstaGrowth</span> */}
          </div>

          <div className="flex flex-1 items-center justify-end gap-4 md:justify-between">
            <div className="relative hidden w-full max-w-sm md:flex">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[240px] lg:w-[340px]"
              />
            </div>

            <div className="flex items-center gap-3">
              <NotificationsPopover />
              <UserNav />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <div className="flex-1">
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}