// 'use client'

// import { PAGE_BREAD_CRUMBS } from '@/constants/pages'
// import { SIDEBAR_MENU } from '@/constants/menu'
// import { usePaths } from '@/hooks/user-nav'
// import { Menu } from 'lucide-react'
// import React from 'react'
// import Sheet from '../sheet'
// import { Separator } from '@/components/ui/separator'
// import ClerkAuthState from '../clerk-auth-state'
// import { HelpDuoToneWhite } from '@/icons'
// import { SubscriptionPlan } from '../subscription-plan'
// import UpgradeCard from '../sidebar/upgrade'
// import { LogoSmall } from '@/svgs/logo-small'
// import CreateAutomation from '../create-automation'
// import Search from './search'
// import { Notifications } from './notifications/notifications'
// import MainBreadCrumb from '../bread-crumbs/main-bread-crumb'
// import { cn } from '@/lib/utils'
// import Link from 'next/link'
// import { SheetClose } from '@/components/ui/sheet'

// type Props = {
//   slug: string
// }

// const Navbar = ({ slug }: Props) => {
//   const { page } = usePaths()
//   const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page == slug

//   return (
//     currentPage && (
//       <div className="flex flex-col">
//         <div className="flex gap-x-3 lg:gap-x-5 justify-end">
//           <span className="lg:hidden flex items-center flex-1 gap-x-2">
//             <Sheet
//               trigger={<Menu />}
//               className="lg:hidden"
//               side="left"
//             >     
//               <div className="flex flex-col gap-y-5 w-full mb-2  bottom-2 top-2 m-2 border-[2px] radial rounded-3xl overflow-hidden border-[#545454] h-full p-3 bg-[#0e0e0e] bg-opacity-90 bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl">
//                 <div className="flex gap-x-2 items-center p-0 justify-center">
//                   <LogoSmall />
//                 </div>
//                 <div className="flex-1 h-100 overflow-y-auto py-2">
//                   {/* Inline Items Component */}
//                   {SIDEBAR_MENU.map((item) => (
//                     <SheetClose asChild key={item.id}>
//                       <Link
//                         href={`/dashboard/${slug}/${item.label === 'home' ? '/' : item.label}`}
//                         className={cn(
//                           'capitalize flex gap-x-2 rounded-full p-3',
//                           page === item.label && 'bg-[#0f0f0f]',
//                           page === slug && item.label === 'home'
//                             ? 'bg-[#0f0f0f]'
//                             : 'text-[#9B9CA0]'
//                         )}
//                       >
//                         {item.icon}
//                         {item.label}
//                       </Link>
//                     </SheetClose>
//                   ))}
//                 </div>
//                 <div className="px-16">
//                   <Separator
//                     orientation="horizontal"
//                     className="bg-[#333336]"
//                   />
//                 </div>
//                 <div className="flex-1 overflow-y-auto py-2">
//                 <div className="px-3 flex flex-col gap-y-5">
//                   <div className="flex gap-x-2">
//                     <ClerkAuthState />
//                     <p className="text-[#9B9CA0]">Profile</p>
//                   </div>
//                   <div className="flex gap-x-3">
//                     <HelpDuoToneWhite />
//                     <p className="text-[#9B9CA0]">Help</p>
//                   </div>
//                 </div>
//                 <SubscriptionPlan type="FREE">
//                   <div className="flex-1 flex flex-col justify-end">
//                     <UpgradeCard />
//                   </div>
//                 </SubscriptionPlan>
//                 </div>
//               </div>
//             </Sheet>
//           </span>
//           <Search />
//           <CreateAutomation />
//           <Notifications />
//         </div>
//         <MainBreadCrumb
//           page={page === slug ? 'Home' : page}
//           slug={slug}
//         />
//       </div>
//     )
//   )
// }

// export default Navbar


'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, SearchIcon, Bell, ChevronDown, HelpCircle, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SIDEBAR_MENU, SideBarItemProps, SideBarGroupProps } from '@/constants/menu'
import { LogoSmall } from '@/svgs/logo-small'
import { useClerk } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
//import Search from './Search'
import Search from './search'
import CreateAutomation from '../create-automation'
import { Notifications } from './notifications/notifications'
import MainBreadCrumb from '../bread-crumbs/main-bread-crumb'

type Props = {
  slug: string
}

const Navbar = ({ slug }: Props) => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null)
  const { signOut } = useClerk()

  const renderMenuItem = (item: SideBarItemProps, isSubItem = false) => {
    const isActive = pathname === `/dashboard/${slug}/${item.label.toLowerCase()}`
    const hasSubItems = item.subItems && item.subItems.length > 0

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          href={`/dashboard/${slug}/${item.label === 'home' ? '/' : item.label}`}
          className={cn(
            'flex items-center gap-x-2 rounded-lg p-2 transition-colors duration-200',
            isActive ? 'bg-[#0f0f0f] text-white' : 'text-[#9B9CA0] hover:bg-[#0f0f0f] hover:text-white',
            isSubItem && 'pl-8'
          )}
          onClick={(e) => {
            if (hasSubItems) {
              e.preventDefault()
              setExpandedItem(expandedItem === item.id ? null : item.id)
            } else {
              setIsOpen(false)
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
        <AnimatePresence>
          {hasSubItems && expandedItem === item.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="pl-4 mt-2"
            >
              {item.subItems!.map((subItem) => renderMenuItem(subItem, true))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  const renderGroup = (group: SideBarGroupProps) => (
    <motion.div
      key={group.id}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="mb-4"
    >
      <motion.div
        onClick={() => setExpandedGroup(expandedGroup === group.id ? null : group.id)}
        className="flex items-center cursor-pointer mb-2 text-[#9B9CA0] hover:text-white"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronDown
          className={cn(
            'mr-2 transition-transform duration-200',
            expandedGroup === group.id && 'rotate-180'
          )}
        />
        <span className="text-xs uppercase font-semibold">{group.label}</span>
      </motion.div>
      <AnimatePresence>
        {(expandedGroup === group.id || expandedGroup === null) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="pl-4"
          >
            {group.items.map((item) => renderMenuItem(item))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )

  return (
      <div className="flex flex-col">
        <div className="flex gap-x-3 lg:gap-x-5 items-center justify-between px-4 py-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-10 w-10 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-[#0e0e0e] text-white p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <LogoSmall />
                  </motion.div>                  
                </div>
                <Separator className="bg-[#333336]" />
                <div className="flex-1 overflow-y-auto py-4 px-2">
                  {SIDEBAR_MENU.map((group) => renderGroup(group))}
                </div>
                <Separator className="bg-[#333336]" />
                <div className="p-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-full justify-start">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span>My Account</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </SheetContent>
          </Sheet>          
            <Search />
            <CreateAutomation />
            <Notifications />           
        </div>
        <div>
          <MainBreadCrumb page={pathname === `/dashboard/${slug}` ? 'Home' : pathname.split('/').pop() || ''} slug={slug} />
        </div>
      </div>    
  )
}

export default Navbar

