 'use client'
// import { usePaths } from '@/hooks/user-nav'
// import { client } from '@/lib/prisma'
// import { Separator } from '@/components/ui/separator'
// import { LogoSmall } from '@/svgs/logo-small'
// import Items from './items'
// import { usePathname } from 'next/navigation'
// import ClerkAuthState from '../clerk-auth-state'
// import React from 'react'
// import { HelpDuoToneWhite } from '@/icons'
// import UpgradeCard from './upgrade'
// import { SubscriptionPlan } from '../subscription-plan'

// type Props = {
//     slug: string
// }

// const Sidebar = ({slug}: Props) => {
//     const{page} = usePaths()
//   return (
//     <div
//     className="w-[250px] 
//   border-[1px]
//   radial 
//   fixed 
//   left-0 
//   lg:inline-block
//   border-[#545454] 
//   bg-gradient-to-b from-[#768BDD] 
//   via-[#171717]
//    to-[#768BDD] 
//    hidden 
//    bottom-0 
//    top-0 
//    m-3 
//    rounded-3xl 
//    overflow-hidden"
//   >
//     <div
//       className="flex flex-col 
//     gap-y-5
//      w-full 
//      h-full 
//      p-3 
//      bg-[#0e0e0e] 
//      bg-opacity-90 
//      bg-clip-padding 
//      backdrop-filter 
//      backdrop--blur__safari 
//      backdrop-blur-3xl"
//     >

//         <div className="flex gap-x-1 items-center p-2 justify-center">
//           <LogoSmall />
//         </div>  

//         <div className="flex flex-col py-2">
//           <Items
//             page={page}
//             slug={slug}
//             
//           />
//         </div>  

//         <div className="px-16">
//           <Separator
//             orientation="horizontal"
//             className="bg-[#333336]"
//           />
//         </div> 

//         <div className="px-3 flex flex-col gap-y-5">
//           <div className="flex gap-x-2">
//             <ClerkAuthState />
//             <p className="text-[#9B9CA0]">Profile</p>
//           </div>
//           <div className="flex gap-x-3">
//             <HelpDuoToneWhite />
//             <p className="text-[#9B9CA0]">Help</p>
//           </div>
//         </div> 

//         <SubscriptionPlan type="FREE">
//           <div className="flex-1 flex flex-col justify-end">
//             <UpgradeCard />
//           </div>
//         </SubscriptionPlan>
      
     
//     </div>
//   </div>
//   )
// }

// export default Sidebar

// 'use client'
// import { usePaths } from '@/hooks/user-nav'
// import { Separator } from '@/components/ui/separator'
// import { LogoSmall } from '@/svgs/logo-small'
// import Items from './items'
// import { usePathname } from 'next/navigation'
// import ClerkAuthState from '../clerk-auth-state'
// import React from 'react'
// import { HelpDuoToneWhite } from '@/icons'
// import UpgradeCard from './upgrade'
// import { SubscriptionPlan } from '../subscription-plan'

// type Props = {
//   slug: string
// }

// const Sidebar = ({ slug }: Props) => {
//   const { page } = usePaths()

//   return (
//     <div
//       className="
//       w-[250px]
//       border-[1px]
//       radial
//       fixed
//       left-0
//       lg:inline-block
//       border-[#545454]
//       bg-gradient-to-b from-[#768BDD]
//       via-[#171717]
//       to-[#768BDD]
//       hidden
//       bottom-0
//       top-0
//       m-3
//       rounded-3xl
//       overflow-hidden"
//     >
//       <div
//         className="
//         flex
//         flex-col
//         gap-y-5
//         w-full
//         h-full
//         p-3
//         bg-[#0e0e0e]
//         bg-opacity-90
//         bg-clip-padding
//         backdrop-filter
//         backdrop--blur__safari
//         backdrop-blur-3xl
//         overflow-hidden"
//       >
//         {/* Header */}
//         <div className="flex gap-x-2 items-center p-5 justify-center">
//           <LogoSmall />
//         </div>

//         {/* Scrollable Content */}
//         <div className="flex-1 overflow-y-auto">
//           <div className="flex flex-col py-3">
//             <Items page={page} slug={slug} />
//           </div>

//           <div className="px-16">
//             <Separator
//               orientation="horizontal"
//               className="bg-[#333336]"
//             />
//           </div>

//           <div className="px-3 flex flex-col gap-y-5">
//             <div className="flex gap-x-2">
//               <ClerkAuthState />
//               <p className="text-[#9B9CA0]">Profile</p>
//             </div>
//             <div className="flex gap-x-3">
//               <HelpDuoToneWhite />
//               <p className="text-[#9B9CA0]">Help</p>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <SubscriptionPlan type="FREE">
//           <div className="flex-1 flex flex-col justify-end">
//             <UpgradeCard />
//           </div>
//         </SubscriptionPlan>
//       </div>
//     </div>
//   )
// }

// export default Sidebar



// import { usePaths } from '@/hooks/user-nav'
// import { Separator } from '@/components/ui/separator'
// import { LogoSmall } from '@/svgs/logo-small'
// import Items from './items'
// import { usePathname } from 'next/navigation'
// import ClerkAuthState from '../clerk-auth-state'
// import React, { useState } from 'react'
// import { HelpDuoToneWhite } from '@/icons'
// import UpgradeCard from './upgrade'
// import { SubscriptionPlan } from '../subscription-plan'

// type Props = {
//   slug: string
// }

// const Sidebar = ({ slug }: Props) => {
//   const { page } = usePaths()
//    return (
//     <div
//       className="
//         w-[250px]
//         border-[2px]
//         radial
//         fixed
//         left-0
//         lg:inline-block
//         border-[#545454]
//         bg-gradient-to-b from-[#768BDD]
//         via-[#171717]
//         to-[#768BDD]
//         hidden
//         bottom-2
//         top-2
//         m-3
//         rounded-3xl
//         overflow-hidden"
//     >
      
//       <div
//         className="
//           flex
//           flex-col
//           gap-y-5
//           w-full
//           h-full
//           p-3
//           bg-[#0e0e0e]
//           bg-opacity-90
//           bg-clip-padding
//           backdrop-filter
//           backdrop--blur__safari
//           backdrop-blur-3xl
//           overflow-hidden"
//       >
//         <div className="flex gap-x-1 items-center p-2 justify-center">
//           <LogoSmall />
//         </div>

//         <div className="flex flex-col py-2">
//           <Items page={page} 
//           slug={slug} 
//            />
//         </div>

//         <div className="px-16">
//           <Separator orientation="horizontal" className="bg-[#333336]" />
//         </div>

//         <div className="px-3 flex flex-col gap-y-5">
//           <div className="flex gap-x-2">
//             <ClerkAuthState />
//             <p className="text-[#9B9CA0]">Profile</p>
//           </div>
//           <div className="flex gap-x-3 gap-y-2">
//             <HelpDuoToneWhite />
//             <p className="text-[#9B9CA0]">Help</p>
//           </div>
//         </div>

//         <SubscriptionPlan type="FREE">
//           <div className="flex-1 flex flex-col justify-end">
//             <UpgradeCard />
//           </div>
//         </SubscriptionPlan>
//       </div>
//     </div>
//   ) 
// }

// export default Sidebar


// 'use client'

// import React, { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { LogoSmall } from '@/svgs/logo-small'
// import { Separator } from '@/components/ui/separator'
// import { Button } from '@/components/ui/button'
// import { 
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip'
// import { SIDEBAR_MENU, SideBarItemProps } from '@/constants/menu'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { cn } from '@/lib/utils'
// import { ChevronDown, HelpCircle, Bell } from 'lucide-react'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Badge } from '@/components/ui/badge'

// type Props = {
//   slug: string
// }

// const Sidebar = ({ slug }: Props) => {
//   const pathname = usePathname()
//   const [expandedItem, setExpandedItem] = useState<string | null>(null)

//   const renderMenuItem = (item: SideBarItemProps, isSubItem = false) => {
//     const isActive = pathname === `/dashboard/${slug}/${item.label.toLowerCase()}`
//     const hasSubItems = item.subItems && item.subItems.length > 0

//     return (
//       <TooltipProvider key={item.id}>
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Link
//                 href={`/dashboard/${slug}/${item.label.toLowerCase()}`}
//                 className={cn(
//                   'flex items-center gap-x-2 rounded-lg p-2 transition-colors duration-200',
//                   isActive ? 'bg-[#0f0f0f] text-white' : 'text-[#9B9CA0] hover:bg-[#0f0f0f] hover:text-white',
//                   isSubItem && 'pl-8'
//                 )}
//                 onClick={(e) => {
//                   if (hasSubItems) {
//                     e.preventDefault()
//                     setExpandedItem(expandedItem === item.id ? null : item.id)
//                   }
//                 }}
//               >
//                 {item.icon}
//                 <span className="flex-1">{item.label}</span>
//                 {hasSubItems && (
//                   <ChevronDown
//                     className={cn(
//                       'transition-transform duration-200',
//                       expandedItem === item.id && 'rotate-180'
//                     )}
//                   />
//                 )}
//               </Link>
//             </motion.div>
//           </TooltipTrigger>
//           <TooltipContent side="right">
//             <p>{item.label}</p>
//           </TooltipContent>
//         </Tooltip>
//         {hasSubItems && (
//           <AnimatePresence>
//             {expandedItem === item.id && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 {item.subItems!.map((subItem) => renderMenuItem(subItem, true))}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         )}
//       </TooltipProvider>
//     )
//   }

//   return (
//     <motion.div
//       initial={{ x: -250 }}
//       animate={{ x: 0 }}
//       transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//       className="
//         w-[250px]
//         border-[2px]
//         fixed
//         left-0
//         lg:inline-block
//         border-[#545454]
//         bg-gradient-to-b from-[#768BDD]
//         via-[#171717]
//         to-[#768BDD]
//         hidden
//         bottom-2
//         top-2
//         m-3
//         rounded-3xl
//         overflow-hidden
//       "
//     >
//       <div
//         className="
//           flex
//           flex-col
//           gap-y-5
//           w-full
//           h-full
//           p-3
//           bg-[#0e0e0e]
//           bg-opacity-90
//           backdrop-filter
//           backdrop-blur-3xl
//           overflow-hidden
//         "
//       >
//         <motion.div 
//           className="flex items-center justify-center p-2"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//         >
//           <LogoSmall />
//         </motion.div>

//         <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
//           {SIDEBAR_MENU.map((item) => renderMenuItem(item))}
//         </div>

//         <Separator className="bg-[#333336]" />

//         <div className="flex items-center justify-between px-2">
//           <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//             <Avatar>
//               <AvatarImage src="https://github.com/shadcn.png" />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//           </motion.div>
//           <div className="flex gap-x-2">
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Button variant="ghost" size="icon" className="relative">
//                     <HelpCircle className="h-5 w-5 text-[#9B9CA0]" />
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>Help</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Button variant="ghost" size="icon" className="relative">
//                     <Bell className="h-5 w-5 text-[#9B9CA0]" />
//                     <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
//                       3
//                     </Badge>
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>Notifications</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// export default Sidebar


// 'use client'

// import React, { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { LogoSmall } from '@/svgs/logo-small'
// import { Separator } from '@/components/ui/separator'
// import UpgradeCard from './upgrade'
// import { SubscriptionPlan } from '../subscription-plan'
// import { Button } from '@/components/ui/button'
// import { 
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip'
// import { SIDEBAR_MENU, SideBarItemProps, SideBarGroupProps } from '@/constants/menu'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { cn } from '@/lib/utils'
// import { ChevronDown, HelpCircle, LogOut } from 'lucide-react'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { useClerk } from '@clerk/nextjs'

// type Props = {
//   slug: string
// }

// const Sidebar = ({ slug }: Props) => {
//   const pathname = usePathname()
//   const [expandedItem, setExpandedItem] = useState<string | null>(null)
//   const [expandedGroup, setExpandedGroup] = useState<string | null>(null)
//   const { signOut, user } = useClerk()

//   const renderMenuItem = (item: SideBarItemProps, isSubItem = false) => {
//     const isActive = pathname === `/dashboard/${slug}/${item.label.toLocaleLowerCase() === 'home' ? '/' : item.label}`
//     const hasSubItems = item.subItems && item.subItems.length > 0
//     return (
//       <TooltipProvider key={item.id}>
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Link
//                 href={`/dashboard/${slug}/${item.label.toLowerCase() === 'home' ? '/' : item.label.toLowerCase()}`}
//                 className={cn(
//                   'flex items-center gap-x-2 rounded-lg p-2 transition-colors duration-200',
//                   isActive ? 'bg-[#0f0f0f] text-white' : 'text-[#9B9CA0] hover:bg-[#0f0f0f] hover:text-white',
//                   isSubItem && 'pl-8'
//                 )}
//                 onClick={(e) => {
//                   if (hasSubItems) {
//                     e.preventDefault()
//                     setExpandedItem(expandedItem === item.id ? null : item.id)
//                   }
//                 }}
//               >
//                 {item.icon}
//                 <span className="flex-1">{item.label}</span>
//                 {hasSubItems && (
//                   <ChevronDown
//                     className={cn(
//                       'transition-transform duration-200',
//                       expandedItem === item.id && 'rotate-180'
//                     )}
//                   />
//                 )}
//               </Link>
//             </motion.div>
//           </TooltipTrigger>
//           <TooltipContent side="right">
//             <p>{item.label}</p>
//           </TooltipContent>
//         </Tooltip>
//         {hasSubItems && (
//           <AnimatePresence>
//             {expandedItem === item.id && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 {item.subItems!.map((subItem) => renderMenuItem(subItem, true))}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         )}
//       </TooltipProvider>
//     )
//   }

//   const renderGroup = (group: SideBarGroupProps) => (
//     <div key={group.id} className="mb-4">
//       <motion.div
//         initial={false}
//         animate={{ rotate: expandedGroup === group.id ? 180 : 0 }}
//         transition={{ duration: 0.2 }}
//         onClick={() => setExpandedGroup(expandedGroup === group.id ? null : group.id)}
//         className="flex items-center cursor-pointer mb-2 text-[#9B9CA0] hover:text-white"
//       >
//         <ChevronDown className="mr-2" />
//         <span className="text-xs uppercase font-semibold">{group.label}</span>
//       </motion.div>
//       <AnimatePresence initial={false}>
//         {(expandedGroup === group.id || expandedGroup === null) && (
//           <motion.div
//             initial="collapsed"
//             animate="open"
//             exit="collapsed"
//             variants={{
//               open: { opacity: 1, height: "auto" },
//               collapsed: { opacity: 0, height: 0 }
//             }}
//             transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
//           >
//             {group.items.map((item) => renderMenuItem(item))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )

//   return (
//     <motion.div
//       initial={{ x: -250 }}
//       animate={{ x: 0 }}
//       transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//       className="
//         w-[250px]
//         border-[2px]
//         fixed
//         left-0
//         lg:inline-block
//         border-[#545454]
//         bg-gradient-to-b from-[#768BDD]
//         via-[#171717]
//         to-[#768BDD]
//         hidden
//         bottom-2
//         top-2
//         m-3
//         rounded-3xl
//         overflow-hidden
//       "
//     >
//       <div
//         className="
//           flex
//           flex-col
//           gap-y-5
//           w-full
//           h-full
//           p-3
//           bg-[#0e0e0e]
//           bg-opacity-90
//           backdrop-filter
//           backdrop-blur-3xl
//           overflow-hidden
//         "
//       >
//         <motion.div 
//           className="flex items-center justify-center p-2"        
//         >
//           <LogoSmall />
//         </motion.div>

//         <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
//           {SIDEBAR_MENU.map((group) => renderGroup(group))}
//         </div>

//         <Separator className="bg-[#333336]" />
//         <SubscriptionPlan type="PRO">
//            <div className="flex-1 flex flex-col justify-end">
//              <UpgradeCard />
//            </div>
//          </SubscriptionPlan>

//         <div className="flex items-center justify-between px-2">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//                 <Avatar>
//                   <AvatarImage src="https://github.com/shadcn.png" />
//                   <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//                 <span>{user?.firstName} {user?.lastName}</span>
//               </motion.div>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56">
//               <DropdownMenuLabel>My Account</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Profile</DropdownMenuItem>
//               <DropdownMenuItem>Billing</DropdownMenuItem>
//               <DropdownMenuItem>Team</DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={() => signOut()}>
//                 <LogOut className="mr-2 h-4 w-4" />
//                 <span>Log out</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button variant="ghost" size="icon" className="relative">
//                   <HelpCircle className="h-5 w-5 text-[#9B9CA0]" />
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>Help</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// export default Sidebar

'use client'

import React, { useState } from 'react'
import { LogoSmall } from '@/svgs/logo-small'
import { Separator } from '@/components/ui/separator'
import UpgradeCard from './upgrade'
import { SubscriptionPlan } from '../subscription-plan'
import { Button } from '@/components/ui/button'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { SIDEBAR_MENU, SideBarItemProps, SideBarGroupProps } from '@/constants/menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useClerk } from '@clerk/nextjs'
import EnhancedUserProfile from './userProfile'

type Props = {
  slug: string
}

const Sidebar = ({ slug }: Props) => {
  const pathname = usePathname()
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null)
  const { signOut } = useClerk()

  const renderMenuItem = (item: SideBarItemProps, isSubItem = false) => {
    const isActive = pathname === `/dashboard/${slug}/${item.label.toLocaleLowerCase() === 'home' ? '/' : item.label}`
    const hasSubItems = item.subItems && item.subItems.length > 0
    return (
      <TooltipProvider key={item.id}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/dashboard/${slug}/${item.label.toLowerCase() === 'home' ? '/' : item.label.toLowerCase()}`}
              className={cn(
                'flex items-center gap-x-2 rounded-lg p-2 transition-colors duration-200',
                isActive ? 'bg-[#0f0f0f] text-white' : 'text-[#9B9CA0] hover:bg-[#0f0f0f] hover:text-white',
                isSubItem && 'pl-8'
              )}
              onClick={(e) => {
                if (hasSubItems) {
                  e.preventDefault()
                  setExpandedItem(expandedItem === item.id ? null : item.id)
                }
              }}
            >
              {item.icon}
              <span className="flex-1">{item.label}</span>
              {hasSubItems && (
                <ChevronDown
                  className={cn(
                    'transition-transform duration-200',
                    expandedItem === item.id && 'rotate-180'
                  )}
                />
              )}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{item.label}</p>
          </TooltipContent>
        </Tooltip>
        {hasSubItems && expandedItem === item.id && (
          <div className="pl-4">
            {item.subItems!.map((subItem) => renderMenuItem(subItem, true))}
          </div>
        )}
      </TooltipProvider>
    )
  }

  const renderGroup = (group: SideBarGroupProps) => (
    <div key={group.id} className="mb-4">
      <div
        onClick={() => setExpandedGroup(expandedGroup === group.id ? null : group.id)}
        className="flex items-center cursor-pointer mb-2 text-[#9B9CA0] hover:text-white"
      >
        <ChevronDown className={cn(
          "mr-2 transition-transform duration-200",
          expandedGroup === group.id && "rotate-180"
        )} />
        <span className="text-xs uppercase font-semibold">{group.label}</span>
      </div>
      {(expandedGroup === group.id || expandedGroup === null) && (
        <div>
          {group.items.map((item) => renderMenuItem(item))}
        </div>
      )}
    </div>
  )

  return (
    <div
      className="
        w-[250px]
        border-[2px]
        fixed
        left-0
        lg:inline-block
        border-[#545454]
        bg-gradient-to-b from-[#768BDD]
        via-[#171717]
        to-[#768BDD]
        hidden
        bottom-2
        top-2
        m-3
        rounded-3xl
        overflow-hidden
      "
    >
      <div
        className="
          flex
          flex-col
          gap-y-5
          w-full
          h-full
          p-3
          bg-[#0e0e0e]
          bg-opacity-90
          backdrop-filter
          backdrop-blur-3xl
          overflow-hidden
        "
      >
        <div className="flex items-center justify-center p-2">
          <LogoSmall />
        </div>

        <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {SIDEBAR_MENU.map((group) => renderGroup(group))}
        </div>

        <Separator className="bg-[#333336]" />
        <SubscriptionPlan type="PRO">
           <div className="flex-1 flex flex-col justify-end">
             <UpgradeCard />
           </div>
         </SubscriptionPlan>

        <div className="w-full">
          <EnhancedUserProfile onSignOut={signOut} />
        </div>

        {/* <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="absolute bottom-4 right-4">
                <HelpCircle className="h-5 w-5 text-[#9B9CA0]" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Help</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider> */}
      </div>
    </div>
  )
}

export default Sidebar

