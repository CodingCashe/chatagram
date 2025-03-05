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


// "use client"
// import ActiveTrigger from "./active"
// import { Separator } from "@/components/ui/separator"
// import ThenAction from "../then/then-action"
// import TriggerButton from "../trigger-button"
// import { AUTOMATION_TRIGGERS } from "@/constants/automation"
// import { useTriggers } from "@/hooks/use-automations"
// import { cn } from "@/lib/utils"
// import Keywords from "./keywords"
// import { Button } from "@/components/ui/button"
// import Loader from "../../loader"
// import { useQueryAutomation } from "@/hooks/user-queries"
// import { motion } from "framer-motion"

// type Props = {
//   id: string
// }

// const Trigger = ({ id }: Props) => {
//   const { types, onSetTrigger, onSaveTrigger, isPending } = useTriggers(id)
//   const { data } = useQueryAutomation(id)

//   if (data?.data && data?.data?.trigger.length > 0) {
//     return (
//       <div className="flex flex-col items-center">
//         <ActiveTrigger type={data.data.trigger[0].type} keywords={data.data.keywords} />

//         {data?.data?.trigger.length > 1 && (
//           <>
//             <div className="relative w-6/12 my-6">
//               <div className="absolute transform px-4 py-1 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2 bg-slate-800 rounded-full border border-emerald-500/30 text-emerald-300 text-sm font-medium">
//                 or
//               </div>
//               <Separator orientation="horizontal" className="border-emerald-500/30" />
//             </div>
//             <ActiveTrigger type={data.data.trigger[1].type} keywords={data.data.keywords} />
//           </>
//         )}

//         {!data.data.listener && <ThenAction id={id} />}
//       </div>
//     )
//   }

//   return (
//     <TriggerButton label="Add a Trigger">
//       <div className="flex flex-col gap-4">
//         {AUTOMATION_TRIGGERS.map((trigger) => (
//           <motion.div
//             key={trigger.id}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => onSetTrigger(trigger.type)}
//             className={cn(
//               "rounded-xl flex cursor-pointer flex-col p-4 gap-3 transition-all duration-300",
//               !types?.find((t) => t === trigger.type)
//                 ? "bg-slate-800/80 hover:bg-slate-800"
//                 : "bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-700/20",
//             )}
//           >
//             <div className="flex gap-3 items-center">
//               <div className="p-2 bg-black/20 rounded-lg">{trigger.icon}</div>
//               <p className="font-semibold text-white">{trigger.label}</p>
//             </div>
//             <p className="text-sm text-slate-300">{trigger.description}</p>
//           </motion.div>
//         ))}
//         <Keywords id={id} />
//         <Button
//           onClick={onSaveTrigger}
//           disabled={types?.length === 0}
//           className={cn(
//             "w-full py-6 text-white font-medium transition-all duration-300",
//             types?.length === 0
//               ? "bg-slate-700"
//               : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-700/20",
//           )}
//         >
//           <Loader state={isPending}>Create a Trigger</Loader>
//         </Button>
//       </div>
//     </TriggerButton>
//   )
// }

// export default Trigger

// "use client"

// import { useState } from "react"
// import ActiveTrigger from "./active"
// import { Separator } from "@/components/ui/separator"
// import ThenAction from "../then/then-action"
// import { AUTOMATION_TRIGGERS } from "@/constants/automation"
// import { useTriggers } from "@/hooks/use-automations"
// import { cn } from "@/lib/utils"
// import Keywords from "./keywords"
// import { Button } from "@/components/ui/button"
// import Loader from "../../loader"
// import { useQueryAutomation } from "@/hooks/user-queries"
// import { motion } from "framer-motion"
// import { Palette, Sliders, PlusCircle } from "lucide-react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import FloatingPanel from "../../panel"

// type Props = {
//   id: string
// }

// // Define theme options using your existing color scheme
// const themeOptions = [
//   { id: "blue", name: "Blue", primary: "light-blue", secondary: "#768BDD" },
//   { id: "purple", name: "Purple", primary: "keyword-purple", secondary: "#A76DF7" },
//   { id: "green", name: "Green", primary: "keyword-green", secondary: "#6AEDB1" },
//   { id: "red", name: "Red", primary: "keyword-red", secondary: "#F78D6D" },
//   { id: "yellow", name: "Yellow", primary: "keyword-yellow", secondary: "#EAD96B" },
// ]

// const Trigger = ({ id }: Props) => {
//   const { types, onSetTrigger, onSaveTrigger, isPending } = useTriggers(id)
//   const { data } = useQueryAutomation(id)
//   const [theme, setTheme] = useState(themeOptions[0])
//   const [animationSpeed, setAnimationSpeed] = useState(1)

//   if (data?.data && data?.data?.trigger.length > 0) {
//     return (
//       <div className="flex flex-col items-center w-full">
//         <ActiveTrigger type={data.data.trigger[0].type} keywords={data.data.keywords} theme={theme} />

//         {data?.data?.trigger.length > 1 && (
//           <>
//             <div className="relative w-full md:w-6/12 my-6">
//               <p className="absolute transform px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2 bg-background-90 text-text-secondary">
//                 or
//               </p>
//               <Separator orientation="horizontal" className="border-muted border-[1px]" />
//             </div>
//             <ActiveTrigger type={data.data.trigger[1].type} keywords={data.data.keywords} theme={theme} />
//           </>
//         )}

//         {!data.data.listener && <ThenAction id={id} theme={theme} />}
//       </div>
//     )
//   }

//   return (
//     <FloatingPanel
//       title="Add a Trigger"
//       trigger={
//         <motion.div
//           className="group relative overflow-hidden rounded-xl mt-4 w-full"
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           {/* Border with animation */}
//           <div className="absolute inset-0 bg-light-blue opacity-20 rounded-xl"></div>
//           <div className="absolute inset-0 rounded-xl shimmerBorder"></div>

//           {/* Inner content */}
//           <div className="relative m-[2px] bg-background-90 rounded-lg p-5">
//             <div className="flex items-center justify-center gap-3">
//               <PlusCircle className="h-5 w-5 text-[#768BDD]" />
//               <p className="text-[#768BDD] font-bold">Add a Trigger</p>
//             </div>
//           </div>
//         </motion.div>
//       }
//     >
//       <div className="flex flex-col gap-4">
//         <Tabs defaultValue="triggers" className="w-full">
//           <TabsList className="grid grid-cols-2 mb-4">
//             <TabsTrigger value="triggers">Triggers</TabsTrigger>
//             <TabsTrigger value="appearance">Appearance</TabsTrigger>
//           </TabsList>

//           <TabsContent value="triggers" className="space-y-4">
//             {AUTOMATION_TRIGGERS.map((trigger) => (
//               <motion.div
//                 key={trigger.id}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => onSetTrigger(trigger.type)}
//                 style={{
//                   transition: `all ${0.3 / animationSpeed}s ease-in-out`,
//                 }}
//                 className={cn(
//                   "rounded-xl flex cursor-pointer flex-col p-4 gap-3",
//                   !types?.find((t) => t === trigger.type)
//                     ? "bg-background-80"
//                     : `bg-gradient-to-br from-[#3352CC] to-[#1C2D70]`,
//                 )}
//               >
//                 <div className="flex gap-3 items-center">
//                   <div className="p-2 bg-black/20 rounded-lg">{trigger.icon}</div>
//                   <p className="font-semibold text-white">{trigger.label}</p>
//                 </div>
//                 <p className="text-sm text-slate-300">{trigger.description}</p>
//               </motion.div>
//             ))}

//             <Keywords id={id} theme={theme} animationSpeed={animationSpeed} />

//             <Button
//               onClick={onSaveTrigger}
//               disabled={types?.length === 0}
//               className={cn(
//                 "w-full py-6 text-white font-medium",
//                 types?.length === 0 ? "bg-in-active" : `bg-gradient-to-br from-[#3352CC] to-[#1C2D70]`,
//               )}
//               style={{ transition: `all ${0.3 / animationSpeed}s ease-in-out` }}
//             >
//               <Loader state={isPending}>Create a Trigger</Loader>
//             </Button>
//           </TabsContent>

//           <TabsContent value="appearance" className="space-y-4">
//             <div className="bg-background-80 rounded-xl p-4">
//               <div className="flex items-center gap-3 mb-4">
//                 <Palette className="h-5 w-5 text-light-blue" />
//                 <h3 className="text-white font-medium">Theme Color</h3>
//               </div>

//               <div className="grid grid-cols-5 gap-2">
//                 {themeOptions.map((option) => (
//                   <motion.button
//                     key={option.id}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setTheme(option)}
//                     className={cn(
//                       `bg-${option.primary} h-10 rounded-md`,
//                       theme.id === option.id ? "ring-2 ring-white" : "",
//                     )}
//                   />
//                 ))}
//               </div>
//             </div>

//             <div className="bg-background-80 rounded-xl p-4">
//               <div className="flex items-center gap-3 mb-4">
//                 <Sliders className="h-5 w-5 text-light-blue" />
//                 <h3 className="text-white font-medium">Animation Speed</h3>
//               </div>

//               <input
//                 type="range"
//                 min="0.5"
//                 max="2"
//                 step="0.1"
//                 value={animationSpeed}
//                 onChange={(e) => setAnimationSpeed(Number.parseFloat(e.target.value))}
//                 className="w-full accent-light-blue"
//               />

//               <div className="flex justify-between text-xs text-text-secondary mt-1">
//                 <span>Slower</span>
//                 <span>Faster</span>
//               </div>
//             </div>

//             <div className="bg-background-80 rounded-xl p-4">
//               <h3 className="text-white font-medium mb-2">Tips</h3>
//               <ul className="text-sm text-text-secondary space-y-2 list-disc pl-5">
//                 <li>Use specific keywords that your audience is likely to use</li>
//                 <li>Create multiple triggers to catch different user intents</li>
//                 <li>Test your automation with sample comments before going live</li>
//               </ul>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </FloatingPanel>
//   )
// }

// export default Trigger

"use client"

import { useState } from "react"
import ActiveTrigger from "./active"
import { Separator } from "@/components/ui/separator"
import ThenAction from "../then/then-action"
import { AUTOMATION_TRIGGERS } from "@/constants/automation"
import { useTriggers } from "@/hooks/use-automations"
import { cn } from "@/lib/utils"
import Keywords from "./keywords"
import { Button } from "@/components/ui/button"
import Loader from "../../loader"
import { useQueryAutomation } from "@/hooks/user-queries"
import { motion } from "framer-motion"
import { Palette, Sliders, PlusCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FloatingPanel from "../../panel"
import { ContextCard } from "../context"

type Props = {
  id: string
}

// Define theme options using your existing color scheme
const themeOptions = [
  { id: "blue", name: "Blue", primary: "light-blue", secondary: "#768BDD" },
  { id: "purple", name: "Purple", primary: "keyword-purple", secondary: "#A76DF7" },
  { id: "green", name: "Green", primary: "keyword-green", secondary: "#6AEDB1" },
  { id: "red", name: "Red", primary: "keyword-red", secondary: "#F78D6D" },
  { id: "yellow", name: "Yellow", primary: "keyword-yellow", secondary: "#EAD96B" },
]

const Trigger = ({ id }: Props) => {
  const { types, onSetTrigger, onSaveTrigger, isPending } = useTriggers(id)
  const { data } = useQueryAutomation(id)
  const [theme, setTheme] = useState(themeOptions[0])
  const [animationSpeed, setAnimationSpeed] = useState(1)

  if (data?.data && data?.data?.trigger.length > 0) {
    return (
      <div className="flex flex-col items-center w-full">
        <ActiveTrigger type={data.data.trigger[0].type} keywords={data.data.keywords} theme={theme} />

        {data?.data?.trigger.length > 1 && (
          <>
            <div className="relative w-full md:w-6/12 my-6">
              <p className="absolute transform px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2 bg-background-90 text-text-secondary">
                or
              </p>
              <Separator orientation="horizontal" className="border-muted border-[1px]" />
            </div>
            <ActiveTrigger type={data.data.trigger[1].type} keywords={data.data.keywords} theme={theme} />
          </>
        )}

        {!data.data.listener && <ThenAction id={id} theme={theme} />}
      </div>
    )
  }

  return (
    <FloatingPanel
      title="Add a Trigger"
      trigger={
        <motion.div
          className="group relative overflow-hidden rounded-xl mt-4 w-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Border with animation */}
          <div className="absolute inset-0 bg-light-blue opacity-20 rounded-xl"></div>
          <div className="absolute inset-0 rounded-xl shimmerBorder"></div>

          {/* Inner content */}
          <div className="relative m-[2px] bg-background-90 rounded-lg p-5">
            <div className="flex items-center justify-center gap-3">
              <PlusCircle className="h-5 w-5 text-[#768BDD]" />
              <p className="text-[#768BDD] font-bold">Add a Trigger</p>
            </div>
          </div>
        </motion.div>
      }
    >
      <div className="flex flex-col gap-4">
        <Tabs defaultValue="triggers" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="triggers">Triggers</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="triggers" className="space-y-4">
            <ContextCard context="trigger" />
            {AUTOMATION_TRIGGERS.map((trigger) => (
              <motion.div
                key={trigger.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSetTrigger(trigger.type)}
                style={{
                  transition: `all ${0.3 / animationSpeed}s ease-in-out`,
                }}
                className={cn(
                  "rounded-xl flex cursor-pointer flex-col p-4 gap-3",
                  !types?.find((t) => t === trigger.type)
                    ? "bg-background-80"
                    : `bg-gradient-to-br from-[#3352CC] to-[#1C2D70]`,
                )}
              >
                <div className="flex gap-3 items-center">
                  <div className="p-2 bg-black/20 rounded-lg">{trigger.icon}</div>
                  <p className="font-semibold text-white">{trigger.label}</p>
                </div>
                <p className="text-sm text-slate-300">{trigger.description}</p>
              </motion.div>
            ))}

            <Keywords id={id} theme={theme} animationSpeed={animationSpeed} />
            <ContextCard context="keywords" />

            <Button
              onClick={onSaveTrigger}
              disabled={types?.length === 0}
              className={cn(
                "w-full py-6 text-white font-medium",
                types?.length === 0 ? "bg-in-active" : `bg-gradient-to-br from-[#3352CC] to-[#1C2D70]`,
              )}
              style={{ transition: `all ${0.3 / animationSpeed}s ease-in-out` }}
            >
              <Loader state={isPending}>Create a Trigger</Loader>
            </Button>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <div className="bg-background-80 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="h-5 w-5 text-light-blue" />
                <h3 className="text-white font-medium">Theme Color</h3>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {themeOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTheme(option)}
                    className={cn(
                      `bg-${option.primary} h-10 rounded-md`,
                      theme.id === option.id ? "ring-2 ring-white" : "",
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="bg-background-80 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <Sliders className="h-5 w-5 text-light-blue" />
                <h3 className="text-white font-medium">Animation Speed</h3>
              </div>

              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(Number.parseFloat(e.target.value))}
                className="w-full accent-light-blue"
              />

              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>Slower</span>
                <span>Faster</span>
              </div>
            </div>

            <div className="bg-background-80 rounded-xl p-4">
              <h3 className="text-white font-medium mb-2">Tips</h3>
              <ul className="text-sm text-text-secondary space-y-2 list-disc pl-5">
                <li>Use specific keywords that your audience is likely to use</li>
                <li>Create multiple triggers to catch different user intents</li>
                <li>Test your automation with sample comments before going live</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </FloatingPanel>
  )
}

export default Trigger

