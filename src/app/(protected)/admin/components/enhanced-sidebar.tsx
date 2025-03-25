// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { motion, AnimatePresence } from "framer-motion"
// import {
//   Users,
//   CreditCard,
//   MessageSquare,
//   Settings,
//   Bot,
//   Calendar,
//   LogOut,
//   ChevronRight,
//   FileText,
//   Gauge,
//   LayoutDashboard,
//   Instagram,
//   MessageCircle,
//   Sparkles,
// } from "lucide-react"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarTrigger,
//   SidebarMenuSub,
//   SidebarMenuSubItem,
//   SidebarMenuSubButton,
//   SidebarMenuBadge,
//   SidebarGroupLabel,
//   SidebarGroup,
//   SidebarGroupContent,
// } from "@/components/ui/sidebar"
// import { Badge } from "@/components/ui/badge"
// import { cn } from "@/lib/utils"
// import { useTheme } from "next-themes"
// import { getUnreadNotificationsCount } from "../actions/dashboard-metrics"

// export function EnhancedSidebar() {
//   const pathname = usePathname()
//   const { theme } = useTheme()
//   const [unreadCount, setUnreadCount] = useState(0)
//   const [openSection, setOpenSection] = useState<string | null>("dashboard")

//   useEffect(() => {
//     // Determine which section should be open based on the current path
//     if (pathname.startsWith("/admin/users") || pathname.startsWith("/admin/subscriptions")) {
//       setOpenSection("users")
//     } else if (pathname.startsWith("/admin/automations") || pathname.startsWith("/admin/scheduled-content")) {
//       setOpenSection("automations")
//     } else if (pathname.startsWith("/admin/chat") || pathname.startsWith("/admin/templates")) {
//       setOpenSection("messaging")
//     } else if (pathname.startsWith("/admin/settings")) {
//       setOpenSection("settings")
//     } else {
//       setOpenSection("dashboard")
//     }

//     // Fetch unread notifications count
//     const fetchUnreadCount = async () => {
//       try {
//         const count = await getUnreadNotificationsCount()
//         setUnreadCount(count)
//       } catch (error) {
//         console.error("Error fetching unread notifications:", error)
//       }
//     }

//     fetchUnreadCount()
//     // Set up interval to refresh unread count every minute
//     const interval = setInterval(fetchUnreadCount, 60000)
//     return () => clearInterval(interval)
//   }, [pathname])

//   const toggleSection = (section: string) => {
//     setOpenSection(openSection === section ? null : section)
//   }

//   const mainRoutes = [
//     {
//       title: "Dashboard",
//       href: "/admin",
//       icon: LayoutDashboard,
//       section: "dashboard",
//       badge: null,
//     },
//     {
//       title: "Users & Subscriptions",
//       icon: Users,
//       section: "users",
//       badge: null,
//       submenu: [
//         {
//           title: "User Management",
//           href: "/admin/users",
//           icon: Users,
//         },
//         {
//           title: "Subscriptions",
//           href: "/admin/subscriptions",
//           icon: CreditCard,
//         },
//       ],
//     },
//     {
//       title: "Automations",
//       icon: Bot,
//       section: "automations",
//       badge: null,
//       submenu: [
//         {
//           title: "Automation Manager",
//           href: "/admin/automations",
//           icon: Bot,
//         },
//         {
//           title: "Scheduled Content",
//           href: "/admin/scheduled-content",
//           icon: Calendar,
//         },
//         {
//           title: "Instagram Accounts",
//           href: "/admin/instagram-accounts",
//           icon: Instagram,
//         },
//       ],
//     },
//     {
//       title: "Messaging",
//       icon: MessageCircle,
//       section: "messaging",
//       badge: unreadCount > 0 ? unreadCount : null,
//       submenu: [
//         {
//           title: "Chat",
//           href: "/admin/chat",
//           icon: MessageSquare,
//           badge: unreadCount > 0 ? unreadCount : null,
//         },
//         {
//           title: "Message Templates",
//           href: "/admin/templates",
//           icon: FileText,
//         },
//         {
//           title: "AI Assistant",
//           href: "/admin/ai-assistant",
//           icon: Sparkles,
//           badge: "New",
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       href: "/admin/settings",
//       icon: Settings,
//       section: "settings",
//       badge: null,
//     },
//   ]

//   return (
//     <Sidebar>
//       <SidebarHeader className="border-b">
//         <div className="flex items-center p-4">
//           <div className="flex items-center gap-2">
//             <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-primary">
//               <motion.div
//                 className="absolute inset-0 flex items-center justify-center text-primary-foreground font-bold"
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 DM
//               </motion.div>
//             </div>
//             <div>
//               <motion.h2
//                 className="text-xl font-bold"
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.3, delay: 0.1 }}
//               >
//                 Admin Panel
//               </motion.h2>
//               <motion.p
//                 className="text-xs text-muted-foreground"
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.3, delay: 0.2 }}
//               >
//                 DM Automation Platform
//               </motion.p>
//             </div>
//           </div>
//           <SidebarTrigger className="ml-auto md:hidden" />
//         </div>
//       </SidebarHeader>
//       <SidebarContent>
//         <SidebarMenu>
//           {mainRoutes.map((route, index) => (
//             <SidebarMenuItem key={route.section}>
//               {route.submenu ? (
//                 <>
//                   <SidebarMenuButton
//                     onClick={() => toggleSection(route.section)}
//                     className={cn("justify-between", openSection === route.section && "bg-muted font-medium")}
//                   >
//                     <div className="flex items-center">
//                       <route.icon className="h-5 w-5 mr-2" />
//                       <span>{route.title}</span>
//                     </div>
//                     {route.badge && <SidebarMenuBadge>{route.badge}</SidebarMenuBadge>}
//                     <ChevronRight
//                       className={cn(
//                         "h-4 w-4 ml-auto transition-transform",
//                         openSection === route.section && "rotate-90",
//                       )}
//                     />
//                   </SidebarMenuButton>
//                   <AnimatePresence>
//                     {openSection === route.section && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="overflow-hidden"
//                       >
//                         <SidebarMenuSub>
//                           {route.submenu.map((subItem) => (
//                             <SidebarMenuSubItem key={subItem.href}>
//                               <SidebarMenuSubButton asChild isActive={pathname === subItem.href}>
//                                 <Link href={subItem.href} className="w-full">
//                                   <subItem.icon className="h-4 w-4 mr-2" />
//                                   <span>{subItem.title}</span>
//                                   {subItem.badge && (
//                                     <Badge
//                                       className={cn(
//                                         "ml-auto",
//                                         typeof subItem.badge === "number" ? "bg-red-500" : "bg-blue-500",
//                                       )}
//                                       variant="default"
//                                     >
//                                       {subItem.badge}
//                                     </Badge>
//                                   )}
//                                 </Link>
//                               </SidebarMenuSubButton>
//                             </SidebarMenuSubItem>
//                           ))}
//                         </SidebarMenuSub>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </>
//               ) : (
//                 <SidebarMenuButton asChild isActive={pathname === route.href} tooltip={route.title}>
//                   <Link href={route.href}>
//                     <route.icon className="h-5 w-5" />
//                     <span>{route.title}</span>
//                     {route.badge && <SidebarMenuBadge>{route.badge}</SidebarMenuBadge>}
//                   </Link>
//                 </SidebarMenuButton>
//               )}
//             </SidebarMenuItem>
//           ))}
//         </SidebarMenu>

//         <SidebarGroup className="mt-auto">
//           <SidebarGroupLabel>System Status</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <div className="space-y-2">
//               <div className="flex items-center justify-between px-2 py-1 text-sm">
//                 <div className="flex items-center">
//                   <Gauge className="h-4 w-4 mr-2 text-green-500" />
//                   <span className="text-muted-foreground">API</span>
//                 </div>
//                 <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
//                   Healthy
//                 </Badge>
//               </div>
//               <div className="flex items-center justify-between px-2 py-1 text-sm">
//                 <div className="flex items-center">
//                   <Instagram className="h-4 w-4 mr-2 text-blue-500" />
//                   <span className="text-muted-foreground">Instagram</span>
//                 </div>
//                 <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
//                   Connected
//                 </Badge>
//               </div>
//             </div>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild>
//               <Link href="/dashboard">
//                 <LogOut className="h-5 w-5" />
//                 <span>Back to App</span>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { motion, AnimatePresence } from "framer-motion"
// import {
//   Users,
//   CreditCard,
//   MessageSquare,
//   Settings,
//   Bot,
//   Calendar,
//   LogOut,
//   ChevronRight,
//   FileText,
//   Gauge,
//   LayoutDashboard,
//   Instagram,
//   MessageCircle,
//   Sparkles,
// } from "lucide-react"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarTrigger,
//   SidebarMenuSub,
//   SidebarMenuSubItem,
//   SidebarMenuSubButton,
//   SidebarMenuBadge,
//   SidebarGroupLabel,
//   SidebarGroup,
//   SidebarGroupContent,
// } from "@/components/ui/sidebar"
// import { Badge } from "@/components/ui/badge"
// import { cn } from "@/lib/utils"
// import { useTheme } from "next-themes"
// import { getUnreadNotificationsCount } from "../actions/dashboard-metrics"

// export function EnhancedSidebar() {
//   const pathname = usePathname()
//   const { theme } = useTheme()
//   const [unreadCount, setUnreadCount] = useState(0)
//   const [openSection, setOpenSection] = useState<string | null>("dashboard")

//   useEffect(() => {
//     // Determine which section should be open based on the current path
//     if (pathname.startsWith("/admin/users") || pathname.startsWith("/admin/subscriptions")) {
//       setOpenSection("users")
//     } else if (pathname.startsWith("/admin/automations") || pathname.startsWith("/admin/scheduled-content")) {
//       setOpenSection("automations")
//     } else if (pathname.startsWith("/admin/chat") || pathname.startsWith("/admin/templates")) {
//       setOpenSection("messaging")
//     } else if (pathname.startsWith("/admin/settings")) {
//       setOpenSection("settings")
//     } else {
//       setOpenSection("dashboard")
//     }

//     // Fetch unread notifications count
//     const fetchUnreadCount = async () => {
//       try {
//         const count = await getUnreadNotificationsCount()
//         setUnreadCount(count)
//       } catch (error) {
//         console.error("Error fetching unread notifications:", error)
//       }
//     }

//     fetchUnreadCount()
//     // Set up interval to refresh unread count every minute
//     const interval = setInterval(fetchUnreadCount, 60000)
//     return () => clearInterval(interval)
//   }, [pathname])

//   const toggleSection = (section: string) => {
//     setOpenSection(openSection === section ? null : section)
//   }

//   const mainRoutes = [
//     {
//       title: "Dashboard",
//       href: "/admin",
//       icon: LayoutDashboard,
//       section: "dashboard",
//       badge: null,
//     },
//     {
//       title: "Users & Subscriptions",
//       icon: Users,
//       section: "users",
//       badge: null,
//       submenu: [
//         {
//           title: "User Management",
//           href: "/admin/users",
//           icon: Users,
//         },
//         {
//           title: "Subscriptions",
//           href: "/admin/subscriptions",
//           icon: CreditCard,
//         },
//       ],
//     },
//     {
//       title: "Automations",
//       icon: Bot,
//       section: "automations",
//       badge: null,
//       submenu: [
//         {
//           title: "Automation Manager",
//           href: "/admin/automations",
//           icon: Bot,
//         },
//         {
//           title: "Scheduled Content",
//           href: "/admin/scheduled-content",
//           icon: Calendar,
//         },
//         {
//           title: "Instagram Accounts",
//           href: "/admin/instagram-accounts",
//           icon: Instagram,
//         },
//       ],
//     },
//     {
//       title: "Messaging",
//       icon: MessageCircle,
//       section: "messaging",
//       badge: unreadCount > 0 ? unreadCount.toString() : null,
//       submenu: [
//         {
//           title: "Chat",
//           href: "/admin/chat",
//           icon: MessageSquare,
//           badge: unreadCount > 0 ? unreadCount.toString() : null,
//         },
//         {
//           title: "Message Templates",
//           href: "/admin/templates",
//           icon: FileText,
//         },
//         {
//           title: "AI Assistant",
//           href: "/admin/ai-assistant",
//           icon: Sparkles,
//           badge: "New",
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       href: "/admin/settings",
//       icon: Settings,
//       section: "settings",
//       badge: null,
//     },
//   ]

//   return (
//     <Sidebar>
//       <SidebarHeader className="border-b">
//         <div className="flex items-center p-4">
//           <div className="flex items-center gap-2">
//             <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-primary">
//               <motion.div
//                 className="absolute inset-0 flex items-center justify-center text-primary-foreground font-bold"
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 DM
//               </motion.div>
//             </div>
//             <div>
//               <motion.h2
//                 className="text-xl font-bold"
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.3, delay: 0.1 }}
//               >
//                 Admin Panel
//               </motion.h2>
//               <motion.p
//                 className="text-xs text-muted-foreground"
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.3, delay: 0.2 }}
//               >
//                 DM Automation Platform
//               </motion.p>
//             </div>
//           </div>
//           <SidebarTrigger className="ml-auto md:hidden" />
//         </div>
//       </SidebarHeader>
//       <SidebarContent>
//         <SidebarMenu>
//           {mainRoutes.map((route, index) => (
//             <SidebarMenuItem key={route.section}>
//               {route.submenu ? (
//                 <>
//                   <SidebarMenuButton
//                     onClick={() => toggleSection(route.section)}
//                     className={cn("justify-between", openSection === route.section && "bg-muted font-medium")}
//                   >
//                     <div className="flex items-center">
//                       <route.icon className="h-5 w-5 mr-2" />
//                       <span>{route.title}</span>
//                     </div>
//                     {route.badge && <SidebarMenuBadge>{route.badge}</SidebarMenuBadge>}
//                     <ChevronRight
//                       className={cn(
//                         "h-4 w-4 ml-auto transition-transform",
//                         openSection === route.section && "rotate-90",
//                       )}
//                     />
//                   </SidebarMenuButton>
//                   <AnimatePresence>
//                     {openSection === route.section && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="overflow-hidden"
//                       >
//                         <SidebarMenuSub>
//                           {route.submenu.map((subItem) => (
//                             <SidebarMenuSubItem key={subItem.href}>
//                               <SidebarMenuSubButton asChild isActive={pathname === subItem.href}>
//                                 <Link href={subItem.href} className="w-full">
//                                   <subItem.icon className="h-4 w-4 mr-2" />
//                                   <span>{subItem.title}</span>
//                                   {subItem.badge && (
//                                     <Badge
//                                       className={cn(
//                                         "ml-auto",
//                                         typeof subItem.badge === "string" && subItem.badge === "New"
//                                           ? "bg-blue-500"
//                                           : "bg-red-500",
//                                       )}
//                                       variant="default"
//                                     >
//                                       {subItem.badge}
//                                     </Badge>
//                                   )}
//                                 </Link>
//                               </SidebarMenuSubButton>
//                             </SidebarMenuSubItem>
//                           ))}
//                         </SidebarMenuSub>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </>
//               ) : (
//                 <SidebarMenuButton asChild isActive={pathname === route.href} tooltip={route.title}>
//                   <Link href={route.href}>
//                     <route.icon className="h-5 w-5" />
//                     <span>{route.title}</span>
//                     {route.badge && <SidebarMenuBadge>{route.badge}</SidebarMenuBadge>}
//                   </Link>
//                 </SidebarMenuButton>
//               )}
//             </SidebarMenuItem>
//           ))}
//         </SidebarMenu>

//         <SidebarGroup className="mt-auto">
//           <SidebarGroupLabel>System Status</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <div className="space-y-2">
//               <div className="flex items-center justify-between px-2 py-1 text-sm">
//                 <div className="flex items-center">
//                   <Gauge className="h-4 w-4 mr-2 text-green-500" />
//                   <span className="text-muted-foreground">API</span>
//                 </div>
//                 <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
//                   Healthy
//                 </Badge>
//               </div>
//               <div className="flex items-center justify-between px-2 py-1 text-sm">
//                 <div className="flex items-center">
//                   <Instagram className="h-4 w-4 mr-2 text-blue-500" />
//                   <span className="text-muted-foreground">Instagram</span>
//                 </div>
//                 <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
//                   Connected
//                 </Badge>
//               </div>
//             </div>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild>
//               <Link href="/dashboard">
//                 <LogOut className="h-5 w-5" />
//                 <span>Back to App</span>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   )
// }

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  CreditCard,
  MessageSquare,
  Settings,
  Bot,
  Calendar,
  LogOut,
  ChevronRight,
  FileText,
  Gauge,
  LayoutDashboard,
  Instagram,
  MessageCircle,
  Sparkles,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuBadge,
  SidebarGroupLabel,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { getUnreadNotificationsCount } from "../actions/dashboard-metrics"

interface MainRoute {
  title: string
  href: string // Remove the optional ? mark
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  section: string
  badge: string | null
  submenu?: SubMenuItem[]
}

interface SubMenuItem {
  title: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  badge?: string | null
}

export function EnhancedSidebar() {
  const pathname = usePathname()
  const { theme } = useTheme()
  const [unreadCount, setUnreadCount] = useState(0)
  const [openSection, setOpenSection] = useState<string | null>("dashboard")

  useEffect(() => {
    // Determine which section should be open based on the current path
    if (pathname.startsWith("/admin/users") || pathname.startsWith("/admin/subscriptions")) {
      setOpenSection("users")
    } else if (pathname.startsWith("/admin/automations") || pathname.startsWith("/admin/scheduled-content")) {
      setOpenSection("automations")
    } else if (pathname.startsWith("/admin/chat") || pathname.startsWith("/admin/templates")) {
      setOpenSection("messaging")
    } else if (pathname.startsWith("/admin/settings")) {
      setOpenSection("settings")
    } else {
      setOpenSection("dashboard")
    }

    // Fetch unread notifications count
    const fetchUnreadCount = async () => {
      try {
        const count = await getUnreadNotificationsCount()
        setUnreadCount(count)
      } catch (error) {
        console.error("Error fetching unread notifications:", error)
      }
    }

    fetchUnreadCount()
    // Set up interval to refresh unread count every minute
    const interval = setInterval(fetchUnreadCount, 60000)
    return () => clearInterval(interval)
  }, [pathname])

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  const mainRoutes: MainRoute[] = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      section: "dashboard",
      badge: null,
    },
    {
      title: "Users & Subscriptions",
      href: "#", // Add a placeholder href for routes with submenu
      icon: Users,
      section: "users",
      badge: null,
      submenu: [
        {
          title: "User Management",
          href: "/admin/users",
          icon: Users,
        },
        {
          title: "Subscriptions",
          href: "/admin/subscriptions",
          icon: CreditCard,
        },
      ],
    },
    {
      title: "Automations",
      href: "#", // Add a placeholder href for routes with submenu
      icon: Bot,
      section: "automations",
      badge: null,
      submenu: [
        {
          title: "Automation Manager",
          href: "/admin/automations",
          icon: Bot,
        },
        {
          title: "Scheduled Content",
          href: "/admin/scheduled-content",
          icon: Calendar,
        },
        {
          title: "Instagram Accounts",
          href: "/admin/instagram-accounts",
          icon: Instagram,
        },
      ],
    },
    {
      title: "Messaging",
      href: "#", // Add a placeholder href for routes with submenu
      icon: MessageCircle,
      section: "messaging",
      badge: unreadCount > 0 ? unreadCount.toString() : null,
      submenu: [
        {
          title: "Chat",
          href: "/admin/chat",
          icon: MessageSquare,
          badge: unreadCount > 0 ? unreadCount.toString() : null,
        },
        {
          title: "Message Templates",
          href: "/admin/templates",
          icon: FileText,
        },
        {
          title: "AI Assistant",
          href: "/admin/ai-assistant",
          icon: Sparkles,
          badge: "New",
        },
      ],
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
      section: "settings",
      badge: null,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center p-4">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-primary">
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-primary-foreground font-bold"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                DM
              </motion.div>
            </div>
            <div>
              <motion.h2
                className="text-xl font-bold"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                Admin Panel
              </motion.h2>
              <motion.p
                className="text-xs text-muted-foreground"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                DM Automation Platform
              </motion.p>
            </div>
          </div>
          <SidebarTrigger className="ml-auto md:hidden" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {mainRoutes.map((route, index) => (
            <SidebarMenuItem key={route.section}>
              {route.submenu ? (
                <>
                  <SidebarMenuButton
                    onClick={() => toggleSection(route.section)}
                    className={cn("justify-between", openSection === route.section && "bg-muted font-medium")}
                  >
                    <div className="flex items-center">
                      <route.icon className="h-5 w-5 mr-2" />
                      <span>{route.title}</span>
                    </div>
                    {route.badge && <SidebarMenuBadge>{route.badge}</SidebarMenuBadge>}
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 ml-auto transition-transform",
                        openSection === route.section && "rotate-90",
                      )}
                    />
                  </SidebarMenuButton>
                  <AnimatePresence>
                    {openSection === route.section && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <SidebarMenuSub>
                          {route.submenu.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.href}>
                              <SidebarMenuSubButton asChild isActive={pathname === subItem.href}>
                                <Link href={subItem.href} className="w-full">
                                  <subItem.icon className="h-4 w-4 mr-2" />
                                  <span>{subItem.title}</span>
                                  {subItem.badge && (
                                    <Badge
                                      className={cn(
                                        "ml-auto",
                                        typeof subItem.badge === "string" && subItem.badge === "New"
                                          ? "bg-blue-500"
                                          : "bg-red-500",
                                      )}
                                      variant="default"
                                    >
                                      {subItem.badge}
                                    </Badge>
                                  )}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <SidebarMenuButton asChild isActive={pathname === route.href} tooltip={route.title}>
                  <Link href={route.href}>
                    <route.icon className="h-5 w-5" />
                    <span>{route.title}</span>
                    {route.badge && <SidebarMenuBadge>{route.badge}</SidebarMenuBadge>}
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>System Status</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between px-2 py-1 text-sm">
                <div className="flex items-center">
                  <Gauge className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-muted-foreground">API</span>
                </div>
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                  Healthy
                </Badge>
              </div>
              <div className="flex items-center justify-between px-2 py-1 text-sm">
                <div className="flex items-center">
                  <Instagram className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-muted-foreground">Instagram</span>
                </div>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                  Connected
                </Badge>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard">
                <LogOut className="h-5 w-5" />
                <span>Back to App</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

