// 'use client'

// import React from 'react'
// import ActiveTrigger from './active'
// import { Separator } from '@/components/ui/separator'
// import ThenAction from '../then/then-action'
// import TriggerButton from '../trigger-button'
// import { AUTOMATION_TRIGGERS } from '@/constants/automation'
// import { useTriggers } from '@/hooks/use-automations'
// import { cn } from '@/lib/utils'
// import Keywords from './keywords'
// import { Button } from '@/components/ui/button'
// import Loader from '../../loader'
// import { useQueryAutomation } from '@/hooks/user-queries'

// type Props = {
//   id: string
// }

// const Trigger = ({ id }: Props) => {
//   const { types, onSetTrigger, onSaveTrigger, isPending } = useTriggers(id)
//   const { data } = useQueryAutomation(id)

//   if (data?.data && data?.data?.trigger.length > 0) {
//     return (
//       <div className="flex flex-col ga-y-6 items-center">
//         <ActiveTrigger
//           type={data.data.trigger[0].type}
//           keywords={data.data.keywords}
//         />

//         {data?.data?.trigger.length > 1 && (
//           <>
//             <div className="relative w-6/12 my-4">
//               <p className="absolute transform  px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2">
//                 or
//               </p>
//               <Separator
//                 orientation="horizontal"
//                 className="border-muted border-[1px]"
//               />
//             </div>
//             <ActiveTrigger
//               type={data.data.trigger[1].type}
//               keywords={data.data.keywords}
//             />
//           </>
//         )}

//         {!data.data.listener && <ThenAction id={id} />}
//       </div>
//     )
//   }
//   return (
//     <TriggerButton label="Add a Trigger">
//       <div className="flex flex-col gap-y-2">
//         {AUTOMATION_TRIGGERS.map((trigger) => (
//           <div
//             key={trigger.id}
//             onClick={() => onSetTrigger(trigger.type)}
//             className={cn(
//               'hover:opacity-80 text-white rounded-xl flex cursor-pointer flex-col p-3 gap-y-2',
//               !types?.find((t) => t === trigger.type)
//                 ? 'bg-background-80'
//                 : 'bg-gradient-to-br from-[#3352CC] font-medium to-[#1C2D70]'
//             )}
//           >
//             <div className="flex gap-x-2 items-center">
//               {trigger.icon}
//               <p className="font-bold">{trigger.label}</p>
//             </div>
//             <p className="text-sm font-light">{trigger.description}</p>
//           </div>
//         ))}
//         <Keywords id={id} />
//         <Button
//           onClick={onSaveTrigger}
//           disabled={types?.length === 0}
//           className="bg-gradient-to-br from-[#3352CC] font-medium text-white to-[#1C2D70]"
//         >
//           <Loader state={isPending}>Create a Trigger</Loader>
//         </Button>
//       </div>
//     </TriggerButton>
//   )
// }

// export default Trigger


"use client"
import ActiveTrigger from "./active"
import { Separator } from "@/components/ui/separator"
import ThenAction from "../then/then-action"
import TriggerButton from "../trigger-button"
import { AUTOMATION_TRIGGERS } from "@/constants/automation"
import { useTriggers } from "@/hooks/use-automations"
import { cn } from "@/lib/utils"
import Keywords from "./keywords"
import { Button } from "@/components/ui/button"
import Loader from "../../loader"
import { useQueryAutomation } from "@/hooks/user-queries"
import { motion } from "framer-motion"

type Props = {
  id: string
}

const Trigger = ({ id }: Props) => {
  const { types, onSetTrigger, onSaveTrigger, isPending } = useTriggers(id)
  const { data } = useQueryAutomation(id)

  if (data?.data && data?.data?.trigger.length > 0) {
    return (
      <div className="flex flex-col items-center">
        <ActiveTrigger type={data.data.trigger[0].type} keywords={data.data.keywords} />

        {data?.data?.trigger.length > 1 && (
          <>
            <div className="relative w-6/12 my-6">
              <div className="absolute transform px-4 py-1 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2 bg-slate-800 rounded-full border border-emerald-500/30 text-emerald-300 text-sm font-medium">
                or
              </div>
              <Separator orientation="horizontal" className="border-emerald-500/30" />
            </div>
            <ActiveTrigger type={data.data.trigger[1].type} keywords={data.data.keywords} />
          </>
        )}

        {!data.data.listener && <ThenAction id={id} />}
      </div>
    )
  }

  return (
    <TriggerButton label="Add a Trigger">
      <div className="flex flex-col gap-4">
        {AUTOMATION_TRIGGERS.map((trigger) => (
          <motion.div
            key={trigger.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSetTrigger(trigger.type)}
            className={cn(
              "rounded-xl flex cursor-pointer flex-col p-4 gap-3 transition-all duration-300",
              !types?.find((t) => t === trigger.type)
                ? "bg-slate-800/80 hover:bg-slate-800"
                : "bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-700/20",
            )}
          >
            <div className="flex gap-3 items-center">
              <div className="p-2 bg-black/20 rounded-lg">{trigger.icon}</div>
              <p className="font-semibold text-white">{trigger.label}</p>
            </div>
            <p className="text-sm text-slate-300">{trigger.description}</p>
          </motion.div>
        ))}
        <Keywords id={id} />
        <Button
          onClick={onSaveTrigger}
          disabled={types?.length === 0}
          className={cn(
            "w-full py-6 text-white font-medium transition-all duration-300",
            types?.length === 0
              ? "bg-slate-700"
              : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-700/20",
          )}
        >
          <Loader state={isPending}>Create a Trigger</Loader>
        </Button>
      </div>
    </TriggerButton>
  )
}

export default Trigger

