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

import { getAutomationInfo } from "@/actions/automations"
import PostNode from "@/components/global/automations/post/node"
import ThenNode from "@/components/global/automations/then/node"
import Trigger from "@/components/global/automations/trigger"
import AutomationsBreadCrumb from "@/components/global/bread-crumbs/automations"
import { ArrowDown } from "lucide-react"

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { PrefetchUserAutomation } from "@/react-query/prefetch"

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
        <div className="w-full max-w-4xl bg-gradient-to-r from-[#2A2A2A] to-[#1D1D1D] p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-white/90 mb-2">Automation Flow</h1>
          <p className="text-white/60 text-sm">Configure your automation sequence below</p>
        </div>

        {/* When section with improved styling and new animated SVG */}
        <div className="w-full max-w-4xl p-6 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-4 border border-[#333333] shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500"></div>
          <div className="flex items-center gap-x-3">
            <div className="p-2 rounded-full bg-[#2A2A2A] flex items-center justify-center">
              <svg
                className="w-6 h-6 text-yellow-500 animate-spin-slow"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 3C12.5523 3 13 3.44772 13 4V6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6V4C11 3.44772 11.4477 3 12 3ZM3 12C3 11.4477 3.44772 11 4 11H6C6.55228 11 7 11.4477 7 12C7 12.5523 6.55228 13 6 13H4C3.44772 13 3 12.5523 3 12ZM17 12C17 11.4477 17.4477 11 18 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H18C17.4477 13 17 12.5523 17 12ZM12 17C12.5523 17 13 17.4477 13 18V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V18C11 17.4477 11.4477 17 12 17Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white/90">When...</h2>
          </div>
          <Trigger id={params.id} />
        </div>

        {/* Connector */}
        <div className="flex flex-col items-center">
          <div className="w-0.5 bg-gradient-to-b from-blue-500 to-teal-500 h-10"></div>
          <div>
            <ArrowDown className="text-teal-500" size={24} />
          </div>
        </div>

        {/* Then section */}
        <div className="w-full max-w-4xl">
          <ThenNode id={params.id} />
        </div>

        {/* Connector */}
        <div className="flex flex-col items-center">
          <div className="w-0.5 bg-gradient-to-b from-teal-500 to-green-500 h-10"></div>
          <div>
            <ArrowDown className="text-green-500" size={24} />
          </div>
        </div>

        {/* Post section */}
        <div className="w-full max-w-4xl mb-10">
          <PostNode id={params.id} />
        </div>

        {/* Status indicator */}
        <div className="fixed bottom-6 right-6 bg-[#1D1D1D] p-3 rounded-full shadow-lg border border-[#333333] flex items-center gap-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-white/80 text-sm">Automation Active</span>
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default Page

