'use client'

import React from 'react'
import Search from '../navbar/search'
import CreateAutomation from '../create-automation'
import { Notifications } from '../navbar/notifications/notifications'
import MainBreadCrumb from '../bread-crumbs/main-bread-crumb'

type FixedNavbarProps = {
  slug: string
  fullPageName: string
  displayName: string
  isUUID: boolean
}

const FixedNavbar: React.FC<FixedNavbarProps> = ({ slug, fullPageName, displayName, isUUID }) => {
  return (
    <div className="fixed top-0 right-0 z-50 bg-[#0e0e0e]">
      <div className="flex gap-x-3 lg:gap-x-5 items-center justify-between px-4 py-2">
        <Search />
        <CreateAutomation />
        <Notifications />
      </div>
    </div>
  )
}

export default FixedNavbar

