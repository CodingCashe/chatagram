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

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
import { Input } from '@/components/ui/input'
import { Moon, Sun, Search } from 'lucide-react'
import confetti from 'canvas-confetti'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

type Props = {
  id: string
}

const EnhancedTrigger = ({ id }: Props) => {
  const { types, onSetTrigger, onSaveTrigger, isPending } = useTriggers(id)
  const { data } = useQueryAutomation(id)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (showConfetti) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }, [showConfetti])

  const filteredTriggers = AUTOMATION_TRIGGERS.filter(trigger =>
    trigger.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSaveTrigger = () => {
    onSaveTrigger()
    setShowConfetti(true)
  }

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
      <div className={cn(
        "flex flex-col gap-y-4 p-6 rounded-2xl shadow-xl transition-all duration-300",
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      )}>
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search triggers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <Button
            onClick={() => setIsDarkMode(!isDarkMode)}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </div>
        <SimpleBar style={{ maxHeight: '60vh' }} autoHide={false}>
          <AnimatePresence>
            {filteredTriggers.map((trigger) => (
              <motion.div
                key={trigger.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSetTrigger(trigger.type)}
                className={cn(
                  'rounded-xl flex cursor-pointer flex-col p-4 gap-y-2 transition-all duration-300 backdrop-blur-md',
                  !types?.find((t) => t === trigger.type)
                    ? isDarkMode ? 'bg-gray-800 bg-opacity-60 hover:bg-gray-700' : 'bg-gray-100 bg-opacity-60 hover:bg-gray-200'
                    : 'bg-gradient-to-br from-blue-600 to-indigo-800 shadow-lg text-white'
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
        </SimpleBar>
        <Keywords id={id} />
        <Button
          onClick={handleSaveTrigger}
          disabled={types?.length === 0}
          className="bg-gradient-to-br from-blue-600 to-indigo-800 font-medium text-white hover:from-blue-700 hover:to-indigo-900 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Loader state={isPending}>Create Trigger</Loader>
        </Button>
      </div>
    </TriggerButton>
  )
}

export default EnhancedTrigger

