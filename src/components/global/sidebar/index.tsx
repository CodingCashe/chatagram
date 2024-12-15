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
//             onItemClick={}
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



import { usePaths } from '@/hooks/user-nav'
import { Separator } from '@/components/ui/separator'
import { LogoSmall } from '@/svgs/logo-small'
import Items from './items'
import { usePathname } from 'next/navigation'
import ClerkAuthState from '../clerk-auth-state'
import React, { useState } from 'react'
import { HelpDuoToneWhite } from '@/icons'
import UpgradeCard from './upgrade'
import { SubscriptionPlan } from '../subscription-plan'

type Props = {
  slug: string
}

const Sidebar = ({ slug }: Props) => {
  const { page } = usePaths()
  const [isOpen, setIsOpen] = useState(true)

  const closeSidebar = () => setIsOpen(false)

  return isOpen ? (
    <div
      className="
        w-[250px]
        border-[1px]
        radial
        fixed
        left-0
        lg:inline-block
        border-[#545454]
        bg-gradient-to-b from-[#768BDD]
        via-[#171717]
        to-[#768BDD]
        hidden
        bottom-0
        top-0
        m-3
        rounded-3xl
        overflow-hidden"
    >
      <div
        className="
          flex flex-col
          gap-y-5
          w-full
          h-full
          p-3
          bg-[#0e0e0e]
          bg-opacity-90
          bg-clip-padding
          backdrop-filter
          backdrop--blur__safari
          backdrop-blur-3xl"
      >
        <div className="flex gap-x-1 items-center p-2 justify-center">
          <LogoSmall />
        </div>

        <div className="flex flex-col py-2">
          <Items page={page} slug={slug} onItemClick={closeSidebar} />
        </div>

        <div className="px-16">
          <Separator orientation="horizontal" className="bg-[#333336]" />
        </div>

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
  ) : null
}

export default Sidebar


