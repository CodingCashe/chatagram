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

import React, { useRef, useEffect, useState } from 'react'
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion'
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
import { Sparkles } from 'lucide-react'

type Props = {
  id: string
}

const Trigger = ({ id }: Props) => {
  const { types, onSetTrigger, onSaveTrigger, isPending } = useTriggers(id)
  const { data } = useQueryAutomation(id)
  const scrollRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const inView = useInView(scrollRef, { once: true })
  const [hoveredTrigger, setHoveredTrigger] = useState<string | null>(null)
  const [selectedTriggers, setSelectedTriggers] = useState<Array<"DM" | "COMMENT">>([])

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, type: 'spring', stiffness: 100 },
    },
  }

  const glowVariants = {
    idle: { opacity: 0, scale: 1 },
    hover: { opacity: 1, scale: 1.05, transition: { duration: 0.3 } },
  }

  const handleTriggerClick = (triggerType: "DM" | "COMMENT") => {
    onSetTrigger(triggerType)
    setSelectedTriggers(prev => 
      prev.includes(triggerType) 
        ? prev.filter(t => t !== triggerType)
        : [...prev, triggerType]
    )
  }

  if (data?.data && data?.data?.trigger.length > 0) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-col gap-y-6 items-center w-full max-w-3xl mx-auto"
      >
        <ActiveTrigger
          type={data.data.trigger[0].type}
          keywords={data.data.keywords}
        />
        {data?.data?.trigger.length > 1 && (
          <>
            <div className="relative w-full my-8">
              <motion.p
                variants={itemVariants}
                className="absolute transform px-4 py-2 -translate-y-1/2 top-1/2 left-1/2 -translate-x-1/2 bg-background-90 text-text-primary font-semibold rounded-full z-10"
              >
                or
              </motion.p>
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
      </motion.div>
    )
  }

  return (
    <TriggerButton label="Add Trigger">
      <motion.div
        ref={scrollRef}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="flex flex-col gap-y-4 bg-gradient-to-br from-background-90 to-background-80 p-6 rounded-2xl shadow-xl overflow-y-auto max-h-[80vh] relative"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#4363DD transparent',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-2xl font-bold text-center mb-4 text-primary"
        >
          Choose Your Triggers
        </motion.div>
        <AnimatePresence>
          {AUTOMATION_TRIGGERS.map((trigger) => (
            <motion.div
              key={trigger.id}
              variants={itemVariants}
              whileHover="hover"
              initial="idle"
              animate="idle"
              onClick={() => {
                if (trigger.type === "DM" || trigger.type === "COMMENT") {
                  handleTriggerClick(trigger.type)
                }
              }}
              onHoverStart={() => setHoveredTrigger(trigger.id)}
              onHoverEnd={() => setHoveredTrigger(null)}
              className={cn(
                'text-white rounded-xl flex cursor-pointer flex-col p-4 gap-y-2 transition-all duration-300 backdrop-filter backdrop-blur-sm relative overflow-hidden group',
                !selectedTriggers.includes(trigger.type)
                  ? 'bg-background-80/80 hover:bg-background-70/90'
                  : 'bg-gradient-to-br from-[#3352CC] to-[#1C2D70] shadow-lg'
              )}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                variants={glowVariants}
              />
              <div className="flex gap-x-3 items-center">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {trigger.icon}
                </motion.div>
                <p className="font-bold text-lg">{trigger.label}</p>
              </div>
              <p className="text-sm font-light">{trigger.description}</p>
              {hoveredTrigger === trigger.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-2 right-2 bg-white text-background-80 rounded-full px-2 py-1 text-xs font-semibold"
                >
                  {selectedTriggers.includes(trigger.type) ? 'Deselect' : 'Select'}
                </motion.div>
              )}
              {selectedTriggers.includes(trigger.type) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <Sparkles className="absolute top-2 right-2 text-yellow-400" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <Keywords id={id} />
        <motion.div variants={itemVariants}>
          <Button
            onClick={onSaveTrigger}
            disabled={selectedTriggers.length === 0}
            className="w-full bg-gradient-to-br from-[#3352CC] to-[#1C2D70] font-medium text-white hover:from-[#4363DD] hover:to-[#2D3E81] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              variants={glowVariants}
            />
            <Loader state={isPending}>
              {selectedTriggers.length > 0 ? `Create ${selectedTriggers.length} Trigger${selectedTriggers.length > 1 ? 's' : ''}` : 'Create Trigger'}
            </Loader>
          </Button>
        </motion.div>
      </motion.div>
    </TriggerButton>
  )
}

export default Trigger

