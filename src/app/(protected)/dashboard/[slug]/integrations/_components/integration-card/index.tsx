// 'use client'
// import { onOAuthInstagram } from '@/actions/integrations'
// import { onUserInfo } from '@/actions/user'
// import { Button } from '@/components/ui/button'
// import { useQuery } from '@tanstack/react-query'
// import React from 'react'

// type Props = {
//   title: string
//   description: string
//   icon: React.ReactNode
//   strategy: 'INSTAGRAM' | 'CRM'
// }

// const IntegrationCard = ({ description, icon, strategy, title }: Props) => {
//   const onInstaOAuth = () => onOAuthInstagram(strategy)

//   const { data } = useQuery({
//     queryKey: ['user-profile'],
//     queryFn: onUserInfo,
//   })

//   const integrated = data?.data?.integrations.find(
//     (integration) => integration.name === strategy
//   )

//   return (
//     <div className="border-2 border-[#3352CC] rounded-2xl gap-4 p-5 flex flex-col sm:flex-row items-center sm:items-start">
//       {/* Icon Section */}
//       <div className="flex-shrink-0 mb-2 sm:mb-0">{icon}</div>

//       {/* Title and Description */}
//       <div className="flex flex-col flex-1 text-center sm:text-left">
//         <h3 className="text-xl font-semibold mb-2">{title}</h3>
//         <p className="text-[#9D9D9D] text-base">{description}</p>
//       </div>

//       {/* Button Section */}
//       <Button
//         onClick={onInstaOAuth}
//         disabled={integrated?.name === strategy}
//         className="bg-gradient-to-br text-white rounded-full text-lg px-6 py-2 from-[#3352CC] font-medium to-[#1C2D70] hover:opacity-70 transition duration-100"
//       >
//         {integrated ? 'Connected' : 'Connect'}
//       </Button>
//     </div>
//   )
// }

// export default IntegrationCard

"use client"

import type React from "react"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { onOAuthInstagram } from "@/actions/integrations"
import { onUserInfo } from "@/actions/user"
import { Button } from "@/components/ui/button"
import { InstagramLogoIcon, LightningBoltIcon, CheckCircledIcon } from "@radix-ui/react-icons"

type Props = {
  title: string
  description: string
  strategy: "INSTAGRAM" | "CRM"
}

const IntegrationCard: React.FC<Props> = ({ description, strategy, title }) => {
  const { data } = useQuery({
    queryKey: ["user-profile"],
    queryFn: onUserInfo,
  })

  const integrated = data?.data?.integrations.find((integration) => integration.name === strategy)

  const onInstaOAuth = () => onOAuthInstagram(strategy)

  const getIcon = () => {
    switch (strategy) {
      case "INSTAGRAM":
        return <InstagramLogoIcon className="w-8 h-8 text-pink-500" />
      case "CRM":
        return <LightningBoltIcon className="w-8 h-8 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-1"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-20" />
      <div className="relative z-10 p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
          {getIcon()}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
          <p className="text-gray-300 text-lg mb-4">{description}</p>
          <Button
            onClick={onInstaOAuth}
            disabled={integrated?.name === strategy}
            className={`
              relative overflow-hidden rounded-full text-lg px-8 py-3 font-medium
              ${
                integrated
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              }
              transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
            `}
          >
            <span className="relative z-10 flex items-center justify-center">
              {integrated ? (
                <>
                  <CheckCircledIcon className="w-5 h-5 mr-2" />
                  Connected
                </>
              ) : (
                "Connect"
              )}
            </span>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-600" />
    </motion.div>
  )
}

export default IntegrationCard

