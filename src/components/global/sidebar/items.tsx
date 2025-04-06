// import { SIDEBAR_MENU } from '@/constants/menu'
// import { cn } from '@/lib/utils'
// import Link from 'next/link'
// import React from 'react'

// type Props = {
//   page: string
//   slug: string
// }

// const Items = ({ page, slug }: Props) => {
//   return SIDEBAR_MENU.map((item) => (
//     <Link
//       key={item.id}
//       href={`/dashboard/${slug}/${item.label === 'home' ? '/' : item.label}`}
//       className={cn(
//         'capitalize flex gap-x-2 rounded-full p-3',
//         page === item.label && 'bg-[#0f0f0f]',
//         page === slug && item.label === 'home'
//           ? 'bg-[#0f0f0f]'
//           : 'text-[#9B9CA0]'
//       )}
      
//     >
//       {item.icon}
//       {item.label}
//     </Link>
//   ))
// }

// export default Items

import { SIDEBAR_MENU } from '@/constants/menu'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
  page: string
  slug: string
}

const Items = ({ page, slug }: Props) => {
  return SIDEBAR_MENU.map((item) => (
    <Link    
      key={item.id}
      href={`/dashboard/${slug}/${item.label === 'home' ? '/' : item.label}`}
      className={cn(
        'capitalize flex gap-x-2 rounded-full p-3',
        page === item.label && 'bg-[#0f0f0f]',
        page === slug && item.label === 'home'
          ? 'bg-[#0f0f0f]'
          : 'text-[#9B9CA0]'
      )}
      
    >
      {/* {item.icon} */}
      {item.label}
    </Link>
  ))
}

export default Items

// "use client"

// import { SIDEBAR_MENU } from "@/constants/menu"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
// import { ChevronDown } from "lucide-react"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar"

// type SidebarNavigationProps = {
//   slug: string
// }

// export function SidebarNavigation({ slug }: SidebarNavigationProps) {
//   const pathname = usePathname()

//   // Helper function to check if a path is active
//   const isActive = (path: string) => {
//     return pathname === path || pathname.startsWith(`${path}/`)
//   }

//   return (
//     <Sidebar>
//       <SidebarContent>
//         {SIDEBAR_MENU.map((group) => (
//           <SidebarGroup key={group.id}>
//             <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {group.items.map((item) => {
//                   const itemPath = `/dashboard/${slug}/${item.label.toLowerCase() === "home" ? "" : item.label.toLowerCase()}`

//                   // If the item has subitems, render a collapsible menu
//                   if (item.subItems && item.subItems.length > 0) {
//                     return (
//                       <Collapsible key={item.id} className="group/collapsible">
//                         <SidebarMenuItem>
//                           <CollapsibleTrigger asChild>
//                             <SidebarMenuButton>
//                               {item.icon}
//                               <span>{item.label}</span>
//                               <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
//                             </SidebarMenuButton>
//                           </CollapsibleTrigger>
//                           <CollapsibleContent>
//                             <SidebarMenuSub>
//                               {item.subItems.map((subItem) => {
//                                 const subItemPath = `${itemPath}/${subItem.label.toLowerCase()}`
//                                 return (
//                                   <SidebarMenuSubItem key={subItem.id}>
//                                     <SidebarMenuSubButton asChild isActive={isActive(subItemPath)}>
//                                       <Link href={subItemPath}>
//                                         {subItem.icon}
//                                         <span>{subItem.label}</span>
//                                       </Link>
//                                     </SidebarMenuSubButton>
//                                   </SidebarMenuSubItem>
//                                 )
//                               })}
//                             </SidebarMenuSub>
//                           </CollapsibleContent>
//                         </SidebarMenuItem>
//                       </Collapsible>
//                     )
//                   }

//                   // Regular menu item without subitems
//                   return (
//                     <SidebarMenuItem key={item.id}>
//                       <SidebarMenuButton asChild isActive={isActive(itemPath)}>
//                         <Link href={itemPath}>
//                           {item.icon}
//                           <span>{item.label}</span>
//                         </Link>
//                       </SidebarMenuButton>
//                     </SidebarMenuItem>
//                   )
//                 })}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         ))}
//       </SidebarContent>
//     </Sidebar>
//   )
// }

