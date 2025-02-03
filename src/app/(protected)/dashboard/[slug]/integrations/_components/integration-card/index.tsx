'use client'
import { onOAuthInstagram } from '@/actions/integrations'
import { onUserInfo } from '@/actions/user'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

type Props = {
  title: string
  description: string
  icon: React.ReactNode
  strategy: 'INSTAGRAM' | 'CRM'
}

const IntegrationCard = ({ description, icon, strategy, title }: Props) => {
  const onInstaOAuth = () => onOAuthInstagram(strategy)

  const { data } = useQuery({
    queryKey: ['user-profile'],
    queryFn: onUserInfo,
  })

  const integrated = data?.data?.integrations.find(
    (integration) => integration.name === strategy
  )

  return (
    <div className="border-2 border-[#3352CC] rounded-2xl gap-4 p-5 flex flex-col sm:flex-row items-center sm:items-start">
      {/* Icon Section */}
      <div className="flex-shrink-0 mb-2 sm:mb-0">{icon}</div>

      {/* Title and Description */}
      <div className="flex flex-col flex-1 text-center sm:text-left">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-[#9D9D9D] text-base">{description}</p>
      </div>

      {/* Button Section */}
      <Button
        onClick={onInstaOAuth}
        disabled={integrated?.name === strategy}
        className="bg-gradient-to-br text-white rounded-full text-lg px-6 py-2 from-[#3352CC] font-medium to-[#1C2D70] hover:opacity-70 transition duration-100"
      >
        {integrated ? 'Connected' : 'Connect'}
      </Button>
    </div>
  )
}

export default IntegrationCard


// "use client"

// import { onOAuthInstagram } from "@/actions/integrations"
// import { onUserInfo } from "@/actions/user"
// import { Button } from "@/components/ui/button"
// import { useQuery } from "@tanstack/react-query"
// import type React from "react"
// import { getIntegration } from "@/actions/integrations/queries"

// type Props = {
//   title: string
//   description: string
//   icon: React.ReactNode
//   strategy: "INSTAGRAM" | "CRM"
// }

// const IntegrationCard = ({ description, icon, strategy, title }: Props) => {
//   const onInstaOAuth = () => onOAuthInstagram(strategy)

//   const { data: userData } = useQuery({
//     queryKey: ["user-profile"],
//     queryFn: onUserInfo,
//   })

//   const { data: integrationData } = useQuery({
//     queryKey: ["instagram-data"],
//     queryFn: async () => {
//       if (!userData?.data?.id) return null
//       return getIntegration(userData.data.id)
//     },
//     enabled: !!userData?.data?.id,
//   })

//   const integrated = integrationData?.integrations?.[0]

//   const formatNumber = (num: number | null | undefined) => {
//     if (!num) return "0"
//     if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
//     if (num >= 1000) return (num / 1000).toFixed(1) + "K"
//     return num.toString()
//   }

//   return (
//     <div className="border-2 border-[#3352CC] rounded-2xl gap-4 p-5 flex flex-col sm:flex-row items-center sm:items-start">
//       {/* Icon Section */}
//       <div className="flex-shrink-0 mb-2 sm:mb-0">{icon}</div>

//       {/* Content Section */}
//       <div className="flex flex-col flex-1">
//         <h3 className="text-xl font-semibold mb-2 text-center sm:text-left">{title}</h3>
//         {integrated ? (
//           <div className="flex flex-col sm:flex-row gap-4">
//             {/* Profile Image */}
//             <div className="w-16 h-16 rounded-full overflow-hidden">
//               <img
//                 src={integrated.profilePicture || "/placeholder.svg"}
//                 alt={integrated.username || "Profile"}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Profile Info */}
//             <div className="flex flex-col sm:flex-row gap-4 flex-1">
//               <div className="text-center sm:text-left">
//                 <p className="font-medium text-lg">@{integrated.username}</p>
//                 <p className="text-[#9D9D9D]">{integrated.fullName}</p>
//               </div>

//               {/* Stats */}
//               <div className="flex gap-6 text-sm justify-center sm:justify-start">
//                 <div className="text-center">
//                   <p className="font-semibold">{formatNumber(integrated.followersCount)}</p>
//                   <p className="text-[#9D9D9D]">Followers</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="font-semibold">{formatNumber(integrated.followingCount)}</p>
//                   <p className="text-[#9D9D9D]">Following</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="font-semibold">{formatNumber(integrated.postsCount)}</p>
//                   <p className="text-[#9D9D9D]">Posts</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p className="text-[#9D9D9D] text-base text-center sm:text-left">{description}</p>
//         )}
//       </div>

//       {/* Button Section */}
//       <Button
//         onClick={onInstaOAuth}
//         disabled={!!integrated}
//         className="bg-gradient-to-br text-white rounded-full text-lg px-6 py-2 from-[#3352CC] font-medium to-[#1C2D70] hover:opacity-70 transition duration-100"
//       >
//         {integrated ? "Connected" : "Connect"}
//       </Button>
//     </div>
//   )
// }

// export default IntegrationCard

