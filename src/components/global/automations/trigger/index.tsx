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
//     <TriggerButton label="Add Trigger">
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
//           <Loader state={isPending}>Create Trigger</Loader>
//         </Button>
//       </div>
//     </TriggerButton>
//   )
// }

// export default Trigger


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
// import { motion } from 'framer-motion'


// type Props = {
//   id: string
// }

// const Trigger = ({ id }: Props) => {
//   const { types, onSetTrigger, onSaveTrigger, isPending } = useTriggers(id)
//   const { data } = useQueryAutomation(id)

//   if (data?.data && data?.data?.trigger.length > 0) {
//     return (
//       <div className="flex flex-col gap-y-6 items-center w-full max-w-3xl mx-auto">
//         <ActiveTrigger
//           type={data.data.trigger[0].type}
//           keywords={data.data.keywords}
//         />
//         {data?.data?.trigger.length > 1 && (
//           <>
//             <div className="relative w-full my-8">
//               <p className="absolute transform px-4 py-2 -translate-y-1/2 top-1/2 left-1/2 -translate-x-1/2 bg-background-90 text-text-primary font-semibold rounded-full z-10">
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
//     <TriggerButton label="Add Trigger">
//       <div className="flex flex-col gap-y-4 bg-background-90 p-6 rounded-2xl shadow-xl">
      
//         {AUTOMATION_TRIGGERS.map((trigger) => (
//           <motion.div
//             key={trigger.id}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => onSetTrigger(trigger.type)}
//             className={cn(
//               'text-white rounded-xl flex cursor-pointer flex-col p-4 gap-y-2 transition-all duration-300',
//               !types?.find((t) => t === trigger.type)
//                 ? 'bg-background-80 hover:bg-background-70'
//                 : 'bg-gradient-to-br from-[#3352CC] to-[#1C2D70] shadow-lg'
//             )}
//           >
//             <div className="flex gap-x-3 items-center">
//               {trigger.icon}
//               <p className="font-bold text-lg">{trigger.label}</p>
//             </div>
//             <p className="text-sm font-light">{trigger.description}</p>
//           </motion.div>
//         ))}
//         <Keywords id={id} />
//         <Button
//           onClick={onSaveTrigger}
//           disabled={types?.length === 0}
//           className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] font-medium text-white hover:from-[#4363DD] hover:to-[#2D3E81] transition-all duration-300 transform hover:scale-105"
//         >
//           <Loader state={isPending}>Create Trigger</Loader>
//         </Button>
       
//       </div>
//     </TriggerButton>
//   )
// }

// export default Trigger

'use client'

import React, { useRef, useEffect } from 'react'
import ActiveTrigger from './active'
import { Separator } from '@/components/ui/separator'
import ThenAction from '../then/then-action'
import TriggerButton from '../trigger-button'
import { AUTOMATION_TRIGGERS } from '@/constants/automation'
import { useTriggers } from '@/hooks/use-automations'
import { cn } from '@/lib/utils'
import Keywords from './keywords'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'
import { useQueryAutomation } from '@/hooks/user-queries'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  id: string
}

const Trigger = ({ id }: Props) => {
  const { types, onSetTrigger, onSaveTrigger, isPending } = useTriggers(id)
  const { data } = useQueryAutomation(id)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [types])

  if (data?.data && data?.data?.trigger.length > 0) {
    return (
      <div className="flex flex-col gap-y-6 items-center w-full max-w-3xl mx-auto">
        <ActiveTrigger
          type={data.data.trigger[0].type}
          keywords={data.data.keywords}
        />
        {data?.data?.trigger.length > 1 && (
          <>
            <div className="relative w-full my-8">
              <p className="absolute transform px-4 py-2 -translate-y-1/2 top-1/2 left-1/2 -translate-x-1/2 bg-background-90 text-text-primary font-semibold rounded-full z-10">
                or
              </p>
              <Separator
                orientation="horizontal"
                className="border-muted border-[1px]"
              />
            </div>
            <ActiveTrigger
              type={data.data.trigger[1].type}
              keywords={data.data.keywords}
            />
          </>
        )}
        {!data.data.listener && <ThenAction id={id} />}
      </div>
    )
  }

  return (
    <TriggerButton label="Add Trigger">
      <div 
        ref={scrollRef}
        className="flex flex-col gap-y-4 bg-background-90 p-6 rounded-2xl shadow-xl max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
      >
        <AnimatePresence>
          {AUTOMATION_TRIGGERS.map((trigger) => (
            <motion.div
              key={trigger.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSetTrigger(trigger.type)}
              className={cn(
                'text-white rounded-xl flex cursor-pointer flex-col p-4 gap-y-2 transition-all duration-300',
                !types?.find((t) => t === trigger.type)
                  ? 'bg-background-80 hover:bg-background-70'
                  : 'bg-gradient-to-br from-[#3352CC] to-[#1C2D70] shadow-lg'
              )}
            >
              <div className="flex gap-x-3 items-center">
                {trigger.icon}
                <p className="font-bold text-lg">{trigger.label}</p>
              </div>
              <p className="text-sm font-light">{trigger.description}</p>
            </motion.div>
          ))}
        </AnimatePresence>
        <Keywords id={id} />
        <Button
          onClick={onSaveTrigger}
          disabled={types?.length === 0}
          className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] font-medium text-white hover:from-[#4363DD] hover:to-[#2D3E81] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <Loader state={isPending}>Create Trigger</Loader>
        </Button>
      </div>
    </TriggerButton>
  )
}

export default Trigger

