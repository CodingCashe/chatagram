'use client'

import { PAGE_BREAD_CRUMBS } from '@/constants/pages'
import { SIDEBAR_MENU } from '@/constants/menu'
import { usePaths } from '@/hooks/user-nav'
import { Menu } from 'lucide-react'
import React from 'react'
import Sheet from '../sheet'
import { Separator } from '@/components/ui/separator'
import ClerkAuthState from '../clerk-auth-state'
import { HelpDuoToneWhite } from '@/icons'
import { SubscriptionPlan } from '../subscription-plan'
import UpgradeCard from '../sidebar/upgrade'
import { LogoSmall } from '@/svgs/logo-small'
import CreateAutomation from '../create-automation'
import Search from './search'
import { Notifications } from './notifications/notifications'
import MainBreadCrumb from '../bread-crumbs/main-bread-crumb'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { SheetClose } from '@/components/ui/sheet'

type Props = {
  slug: string
}

const Navbar = ({ slug }: Props) => {
  const { page } = usePaths()
  const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page == slug

  return (
    currentPage && (
      <div className="flex flex-col">
        <div className="flex gap-x-3 lg:gap-x-5 justify-end">
          <span className="lg:hidden flex items-center flex-1 gap-x-2">
            <Sheet
              trigger={<Menu />}
              className="lg:hidden"
              side="left"
            >     
              <div className="flex flex-col gap-y-5 w-full mb-2  bottom-2 top-2 m-2 border-[2px] radial rounded-3xl overflow-hidden border-[#545454] h-full p-3 bg-[#0e0e0e] bg-opacity-90 bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl">
                <div className="flex gap-x-2 items-center p-0 justify-center">
                  <LogoSmall />
                </div>
                <div className="flex-1 h-100 overflow-y-auto py-2">
                  {/* Inline Items Component */}
                  {SIDEBAR_MENU.map((item) => (
                    <SheetClose asChild key={item.id}>
                      <Link
                        href={`/dashboard/${slug}/${item.label === 'home' ? '/' : item.label}`}
                        className={cn(
                          'capitalize flex gap-x-2 rounded-full p-3',
                          page === item.label && 'bg-[#0f0f0f]',
                          page === slug && item.label === 'home'
                            ? 'bg-[#0f0f0f]'
                            : 'text-[#9B9CA0]'
                        )}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
                <div className="px-16">
                  <Separator
                    orientation="horizontal"
                    className="bg-[#333336]"
                  />
                </div>
                <div className="flex-1 overflow-y-auto py-2">
                <div className="px-3 flex flex-col gap-y-5">
                  <div className="flex gap-x-2">
                    <ClerkAuthState />
                    <p className="text-[#9B9CA0]">Profile</p>
                  </div>
                  <div className="flex gap-x-3">
                    <HelpDuoToneWhite />
                    <p className="text-[#9B9CA0]">Help</p>
                  </div>
                </div>
                <SubscriptionPlan type="FREE">
                  <div className="flex-1 flex flex-col justify-end">
                    <UpgradeCard />
                  </div>
                </SubscriptionPlan>
                </div>
              </div>
            </Sheet>
          </span>
          <Search />
          <CreateAutomation />
          <Notifications />
        </div>
        <MainBreadCrumb
          page={page === slug ? 'Home' : page}
          slug={slug}
        />
      </div>
    )
  )
}

export default Navbar

