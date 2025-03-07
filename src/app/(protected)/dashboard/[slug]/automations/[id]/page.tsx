// import { getAutomationInfo } from '@/actions/automations'
// import PostNode from '@/components/global/automations/post/node'
// import ThenNode from '@/components/global/automations/then/node'
// import Trigger from '@/components/global/automations/trigger'
// import AutomationsBreadCrumb from '@/components/global/bread-crumbs/automations'
// import { Warning } from '@/icons'
// import { PrefetchUserAutomation } from '@/react-query/prefetch'

// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from '@tanstack/react-query'

// import React from 'react'

// type Props = {
//   params: { id: string }
// }

// export async function generateMetadata({ params }: { params: { id: string } }) {
//   const info = await getAutomationInfo(params.id)
//   return {
//     title: info.data?.name,
//   }
// }

// const Page = async ({ params }: Props) => {
//   const query = new QueryClient()
//   await PrefetchUserAutomation(query, params.id)

//   return (
//     <HydrationBoundary state={dehydrate(query)}>
//       <div className=" flex flex-col items-center gap-y-20">
//         <AutomationsBreadCrumb id={params.id} />
//         <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
//           <div className="flex gap-x-2">
//             <Warning />
//             When...
//           </div>
//           <Trigger id={params.id} />
//         </div>
//         <ThenNode id={params.id} />
//         <PostNode id={params.id} />
//       </div>
//     </HydrationBoundary>
//   )
// }

// export default Page

"use client"

import { getAutomationInfo } from "@/actions/automations"
import PostNode from "@/components/global/automations/post/node"
import ThenNode from "@/components/global/automations/then/node"
import Trigger from "@/components/global/automations/trigger"
import AutomationsBreadCrumb from "@/components/global/bread-crumbs/automations"
import { Warning } from "@/icons"
import { PrefetchUserAutomation } from "@/react-query/prefetch"

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const info = await getAutomationInfo(params.id)
  return {
    title: info.data?.name,
  }
}

const Page = async ({ params }: Props) => {
  const query = new QueryClient()
  await PrefetchUserAutomation(query, params.id)

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex flex-col items-center gap-y-12 py-6">
        <div className="w-full max-w-4xl">
          <AutomationsBreadCrumb id={params.id} />
        </div>

        {/* Header with gradient */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl bg-gradient-to-r from-[#2A2A2A] to-[#1D1D1D] p-6 rounded-xl shadow-lg"
        >
          <h1 className="text-2xl font-bold text-white/90 mb-2">Automation Flow</h1>
          <p className="text-white/60 text-sm">Configure your automation sequence below</p>
        </motion.div>

        {/* When section with improved styling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-full max-w-4xl p-6 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-4 border border-[#333333] shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500"></div>
          <div className="flex items-center gap-x-3">
            <div className="p-2 rounded-full bg-[#2A2A2A]">
              <Warning/>
            </div>
            <h2 className="text-xl font-semibold text-white/90">When...</h2>
          </div>
          <Trigger id={params.id} />
        </motion.div>

        {/* Connector */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 40 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="w-0.5 bg-gradient-to-b from-blue-500 to-teal-500 h-10"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <ArrowDown className="text-teal-500" size={24} />
          </motion.div>
        </div>

        {/* Then section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="w-full max-w-4xl"
        >
          <ThenNode id={params.id} />
        </motion.div>

        {/* Connector */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 40 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="w-0.5 bg-gradient-to-b from-teal-500 to-green-500 h-10"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.9 }}
          >
            <ArrowDown className="text-green-500" size={24} />
          </motion.div>
        </div>

        {/* Post section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.0 }}
          className="w-full max-w-4xl mb-10"
        >
          <PostNode id={params.id} />
        </motion.div>

        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="fixed bottom-6 right-6 bg-[#1D1D1D] p-3 rounded-full shadow-lg border border-[#333333] flex items-center gap-x-2"
        >
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-white/80 text-sm">Automation Active</span>
        </motion.div>
      </div>
    </HydrationBoundary>
  )
}

export default Page

