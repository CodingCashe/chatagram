'use client'

import React from 'react'
import Search from '../navbar/search'
import CreateAutomation from '../create-automation'
import SchedulePost from '../schedule-post'
import IntegrateAccount from '../integrate'
import { Notifications } from '../navbar/notifications/notifications'
import { MenuButton } from '@/components/global/menuIcon/iconmenu'
import MainBreadCrumb from '../bread-crumbs/main-bread-crumb'
import AutomationDashboardHeader from '@/components/global/navbarnew/newnav'

type FixedNavbarProps = {
  slug: string
  fullPageName: string
  displayName: string
  isUUID: boolean
}

const FixedNavbar: React.FC<FixedNavbarProps> = ({ slug, fullPageName, displayName, isUUID }) => {
  return (
    <div className="fixed mb-100 sm:mb-150 top-0 right-0 z-50">
      <div className="flex gap-x-2 lg:gap-x-3 items-center justify-between px-2 py-1">  
        {/* <IntegrateAccount />           
        <SchedulePost />   */}
        <AutomationDashboardHeader/>         
        {/* <Search />
        <CreateAutomation />
        <Notifications />         */}
      </div>
    </div>
  )
}

export default FixedNavbar

