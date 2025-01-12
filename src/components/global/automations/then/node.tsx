// 'use client'
// import { Separator } from '@/components/ui/separator'
// import { useQueryAutomation } from '@/hooks/user-queries'
// import { PlaneBlue, SmartAi, Warning } from '@/icons'
// import React from 'react'
// import PostButton from '../post'

// type Props = {
//   id: string
// }

// const ThenNode = ({ id }: Props) => {
//   const { data } = useQueryAutomation(id)
//   const commentTrigger = data?.data?.trigger.find((t) => t.type === 'COMMENT')

//   return !data?.data?.listener ? (
//     <></>
//   ) : (
//     <div className="w-full lg:w-10/12 relative xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
//       <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
//         <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
//         <Separator
//           orientation="vertical"
//           className="bottom-full flex-1 border-[1px] border-connector/10"
//         />
//         <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
//       </div>
//       <div className="flex gap-x-2">
//         <Warning />
//         Then...
//       </div>
//       <div className="bg-background-80 p-3 rounded-xl flex flex-col gap-y-2">
//         <div className="flex gap-x-2 items-center">
//           {data.data.listener.listener === 'MESSAGE' ? (
//             <PlaneBlue />
//           ) : (
//             <SmartAi />
//           )}
//           <p className=" text-lg">
//             {data.data.listener.listener === 'MESSAGE'
//               ? 'Send the user a message.'
//               : 'Let Smart AI take over'}
//           </p>
//         </div>
//         <p className="flont-light text-text-secondary">
//           {data.data.listener.prompt}
//         </p>
//       </div>
//       {data.data.posts.length > 0 ? (
//         <></>
//       ) : commentTrigger ? (
//         <PostButton id={id} />
//       ) : (
//         <></>
//       )}
//     </div>
//   )
// }

// export default ThenNode


'use client'

import { Separator } from '@/components/ui/separator'
import { useQueryAutomation } from '@/hooks/user-queries'
import { PlaneBlue, SmartAi, Warning } from '@/icons'
import React from 'react'
import PostButton from '../post'
import { motion } from 'framer-motion'

type Props = {
  id: string
}

const ThenNode = ({ id }: Props) => {
  const { data } = useQueryAutomation(id)
  const commentTrigger = data?.data?.trigger.find((t) => t.type === 'COMMENT')

  if (!data?.data?.listener) {
    return null
  }

  return (
    <motion
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full lg:w-10/12 relative xl:w-6/12 p-1 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
    >
      <div className="bg-[#1D1D1D] p-5 rounded-2xl flex flex-col gap-y-3">
        <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
          <span className="h-[9px] w-[9px] bg-blue-500 rounded-full animate-pulse" />
          <Separator
            orientation="vertical"
            className="bottom-full flex-1 border-[1px] border-blue-500"
          />
          <span className="h-[9px] w-[9px] bg-blue-500 rounded-full animate-pulse" />
        </div>
        <div className="flex gap-x-2 items-center bg-background-80 p-3 rounded-xl shadow-inner">
          <Warning className="text-yellow-400" />
          <span className="text-lg font-semibold">Then...</span>
        </div>
        <div className="bg-background-80 p-4 rounded-xl flex flex-col gap-y-3 shadow-lg">
          <div className="flex gap-x-3 items-center">
            {data.data.listener.listener === 'MESSAGE' ? (
              <PlaneBlue className="text-blue-400 w-8 h-8" />
            ) : (
              <SmartAi className="text-green-400 w-8 h-8" />
            )}
            <p className="text-xl font-semibold">
              {data.data.listener.listener === 'MESSAGE'
                ? 'Send the user a message.'
                : 'Let Smart AI take over'}
            </p>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed">
            {data.data.listener.prompt}
          </p>
        </div>
        {data.data.posts.length > 0 ? null : commentTrigger ? (
          <PostButton id={id} />
        ) : null}
      </div>
    </motion>
  )
}

export default ThenNode

