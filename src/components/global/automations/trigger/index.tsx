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
// import { ContextCard } from "../context"

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
//             <ContextCard context="trigger" />
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
//             <ContextCard context="keywords" />

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
// import { Palette, Sliders, PlusCircle, PlayCircle, Settings } from "lucide-react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import FloatingPanel from "../../panel"
// import { ContextCard } from "../context"
// import { SimulationTab } from "../simulation"
// import { ScheduledPostsSelector } from "../scheduled"

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
//   const [showTip, setShowTip] = useState(true)

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
//       title="Create Automation"
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
//               <p className="text-[#768BDD] font-bold">Create Automation</p>
//             </div>
//           </div>
//         </motion.div>
//       }
//     >
//       <div className="flex flex-col gap-4">
//         <Tabs defaultValue="triggers" className="w-full">
//           <TabsList className="grid grid-cols-3 mb-4">
//             <TabsTrigger value="triggers">Triggers</TabsTrigger>
//             <TabsTrigger value="simulation">
//               <PlayCircle className="h-4 w-4 mr-1" />
//               Simulation
//             </TabsTrigger>
//             <TabsTrigger value="settings">
//               <Settings className="h-4 w-4 mr-1" />
//               Settings
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="triggers" className="space-y-4">
//             {showTip && <ContextCard context="trigger" onClose={() => setShowTip(false)} />}

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-4">
//                 <h3 className="text-sm font-medium text-text-secondary">1. Select Trigger Type</h3>
//                 {AUTOMATION_TRIGGERS.map((trigger) => (
//                   <motion.div
//                     key={trigger.id}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => onSetTrigger(trigger.type)}
//                     style={{
//                       transition: `all ${0.3 / animationSpeed}s ease-in-out`,
//                     }}
//                     className={cn(
//                       "rounded-xl flex cursor-pointer flex-col p-4 gap-3",
//                       !types?.find((t) => t === trigger.type)
//                         ? "bg-background-80"
//                         : `bg-gradient-to-br from-[#3352CC] to-[#1C2D70]`,
//                     )}
//                   >
//                     <div className="flex gap-3 items-center">
//                       <div className="p-2 bg-black/20 rounded-lg">{trigger.icon}</div>
//                       <p className="font-semibold text-white">{trigger.label}</p>
//                     </div>
//                     <p className="text-sm text-slate-300">{trigger.description}</p>
//                   </motion.div>
//                 ))}
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-sm font-medium text-text-secondary">2. Configure Automation</h3>
//                 <Keywords id={id} theme={theme} animationSpeed={animationSpeed} />

//                 <div className="bg-background-80 p-4 rounded-xl">
//                   <h4 className="text-sm font-medium mb-3 flex items-center">
//                     <Palette className="h-4 w-4 mr-2 text-light-blue" />
//                     Theme Color
//                   </h4>
//                   <div className="grid grid-cols-5 gap-2">
//                     {themeOptions.map((option) => (
//                       <motion.button
//                         key={option.id}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => setTheme(option)}
//                         className={cn(
//                           `bg-${option.primary} h-10 rounded-md`,
//                           theme.id === option.id ? "ring-2 ring-white" : "",
//                         )}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 <div className="bg-background-80 p-4 rounded-xl">
//                   <h4 className="text-sm font-medium mb-3 flex items-center">
//                     <Sliders className="h-4 w-4 mr-2 text-light-blue" />
//                     Animation Speed
//                   </h4>
//                   <input
//                     type="range"
//                     min="0.5"
//                     max="2"
//                     step="0.1"
//                     value={animationSpeed}
//                     onChange={(e) => setAnimationSpeed(Number.parseFloat(e.target.value))}
//                     className="w-full accent-light-blue"
//                   />
//                   <div className="flex justify-between text-xs text-text-secondary mt-1">
//                     <span>Slower</span>
//                     <span>Faster</span>
//                   </div>
//                 </div>

//                 <div className="flex justify-center">
//                   <ScheduledPostsSelector
//                     userId={id} // Use the automation ID as the user ID
//                     onSelectPost={(post) => {
//                       console.log("Selected scheduled post:", post)
//                       // Here you would handle adding the post to the automation
//                     }}
//                     selectedPosts={[]}
//                   />
//                 </div>
//               </div>
//             </div>

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

//           <TabsContent value="simulation">
//             <SimulationTab
//               keywords={data?.data?.keywords?.map((k) => k.word) || []}
//               responseMessage={data?.data?.listener?.prompt || ""}
//               responseType={data?.data?.listener?.listener || "MESSAGE"}
//             />
//           </TabsContent>

//           <TabsContent value="settings" className="space-y-4">
//             <div className="bg-background-80 p-4 rounded-xl">
//               <h4 className="font-medium mb-3">Automation Settings</h4>

//               <div className="space-y-3">
//                 <div className="flex justify-between items-center p-3 bg-background-90 rounded-lg">
//                   <div>
//                     <p className="font-medium">Enable notifications</p>
//                     <p className="text-sm text-text-secondary">Get notified when automations run</p>
//                   </div>
//                   <div className="h-6 w-11 bg-light-blue rounded-full relative">
//                     <div className="h-5 w-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
//                   </div>
//                 </div>

//                 <div className="flex justify-between items-center p-3 bg-background-90 rounded-lg">
//                   <div>
//                     <p className="font-medium">AI suggestions</p>
//                     <p className="text-sm text-text-secondary">Get AI-powered response suggestions</p>
//                   </div>
//                   <div className="h-6 w-11 bg-background-80 rounded-full relative">
//                     <div className="h-5 w-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
//                   </div>
//                 </div>

//                 <div className="flex justify-between items-center p-3 bg-background-90 rounded-lg">
//                   <div>
//                     <p className="font-medium">Auto-archive</p>
//                     <p className="text-sm text-text-secondary">Archive completed automations after 30 days</p>
//                   </div>
//                   <div className="h-6 w-11 bg-light-blue rounded-full relative">
//                     <div className="h-5 w-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-background-80 p-4 rounded-xl">
//               <h4 className="font-medium mb-3">Advanced Settings</h4>

//               <div className="space-y-3">
//                 <div className="p-3 bg-background-90 rounded-lg">
//                   <p className="font-medium mb-1">Response Delay</p>
//                   <p className="text-sm text-text-secondary mb-2">
//                     Add a random delay to make responses feel more natural
//                   </p>

//                   <div className="flex items-center gap-3">
//                     <input
//                       type="range"
//                       min="0"
//                       max="60"
//                       step="5"
//                       defaultValue="15"
//                       className="flex-1 accent-light-blue"
//                     />
//                     <span className="text-sm w-12 text-right">15s</span>
//                   </div>
//                 </div>

//                 <div className="p-3 bg-background-90 rounded-lg">
//                   <p className="font-medium mb-1">Working Hours</p>
//                   <p className="text-sm text-text-secondary mb-2">Only run automations during these hours</p>

//                   <div className="grid grid-cols-2 gap-3">
//                     <div>
//                       <label className="text-xs text-text-secondary">Start Time</label>
//                       <select className="w-full bg-background-80 border-none rounded-md mt-1 text-sm">
//                         <option>9:00 AM</option>
//                         <option>10:00 AM</option>
//                         <option>11:00 AM</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="text-xs text-text-secondary">End Time</label>
//                       <select className="w-full bg-background-80 border-none rounded-md mt-1 text-sm">
//                         <option>5:00 PM</option>
//                         <option>6:00 PM</option>
//                         <option>7:00 PM</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </FloatingPanel>
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
// import { PlusCircle, PlayCircle, Info, KeySquare, ChevronRight } from "lucide-react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import FloatingPanel from "../../panel"
// import { ContextCard } from "../context"
// import { SimulationTab } from "../simulation"
// import { ScheduledPostsSelector } from "../scheduled"
// import { SetupGuide } from "../guide"
// import PostButton from "../post"
// import { WebsiteAnalyzer } from "../analyzer"
// import { TemplateEditor } from "../editor"

// type Props = {
//   id: string
// }

// const Trigger = ({ id }: Props) => {
//   const { types, onSetTrigger, onSaveTrigger, isPending } = useTriggers(id)
//   const { data } = useQueryAutomation(id)
//   const [showTip, setShowTip] = useState(true)

//   if (data?.data && data?.data?.trigger.length > 0) {
//     return (
//       <div className="flex flex-col items-center w-full">
//         <ActiveTrigger type={data.data.trigger[0].type} keywords={data.data.keywords} />

//         {data?.data?.trigger.length > 1 && (
//           <>
//             <div className="relative w-full md:w-6/12 my-6">
//               <p className="absolute transform px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2 bg-background-90 text-text-secondary">
//                 or
//               </p>
//               <Separator orientation="horizontal" className="border-muted border-[1px]" />
//             </div>
//             <ActiveTrigger type={data.data.trigger[1].type} keywords={data.data.keywords} />
//           </>
//         )}

//         {!data.data.listener && <ThenAction id={id} />}
//       </div>
//     )
//   }

//   const responseType = data?.data?.listener?.listener || "MESSAGE"

//   return (
//     <FloatingPanel
//       title="Create Automation"
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
//               <p className="text-[#768BDD] font-bold">Create Automation</p>
//             </div>
//           </div>
//         </motion.div>
//       }
//     >
//       <div className="flex flex-col gap-4">
//         <Tabs defaultValue="setup">
//           <TabsList className="grid grid-cols-4 mb-4">
//             <TabsTrigger value="setup">
//               <Info className="h-4 w-4 mr-1" />
//               Guide
//             </TabsTrigger>
//             <TabsTrigger value="trigger">
//               <KeySquare className="h-4 w-4 mr-1" />
//               Trigger
//             </TabsTrigger>
//             <TabsTrigger value="configure">
//               <ChevronRight className="h-4 w-4 mr-1" />
//               Configure
//             </TabsTrigger>
//             <TabsTrigger value="simulation">
//               <PlayCircle className="h-4 w-4 mr-1" />
//               Simulation
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="setup">
//             <SetupGuide />
//           </TabsContent>

//           <TabsContent value="trigger" className="space-y-4">
//             {showTip && <ContextCard context="trigger" onClose={() => setShowTip(false)} />}

//             <h3 className="text-lg font-medium">Select Trigger Type</h3>

//             <div className="grid grid-cols-1 gap-3">
//               {AUTOMATION_TRIGGERS.map((trigger) => (
//                 <motion.div
//                   key={trigger.id}
//                   whileHover={{ scale: 1.01 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => onSetTrigger(trigger.type)}
//                   className={cn(
//                     "rounded-xl flex cursor-pointer flex-col p-4 gap-3",
//                     !types?.find((t) => t === trigger.type)
//                       ? "bg-background-80"
//                       : `bg-gradient-to-br from-[#3352CC] to-[#1C2D70]`,
//                   )}
//                 >
//                   <div className="flex gap-3 items-center">
//                     <div className="p-2 bg-black/20 rounded-lg">{trigger.icon}</div>
//                     <p className="font-semibold text-white">{trigger.label}</p>
//                   </div>
//                   <p className="text-sm text-slate-300">{trigger.description}</p>
//                 </motion.div>
//               ))}
//             </div>

//             <Button
//               onClick={onSaveTrigger}
//               disabled={types?.length === 0}
//               className={cn(
//                 "w-full py-6 text-white font-medium",
//                 types?.length === 0 ? "bg-in-active" : `bg-gradient-to-br from-[#3352CC] to-[#1C2D70]`,
//               )}
//             >
//               <Loader state={isPending}>Continue to Configure</Loader>
//             </Button>
//           </TabsContent>

//           <TabsContent value="configure" className="space-y-4">
//             <div className="space-y-4">
//               <div>
//                 <h3 className="text-lg font-medium mb-3">Configure Automation</h3>
//                 <Keywords id={id} />
//               </div>

//               <div>
//                 <h3 className="text-lg font-medium mb-3">Select Posts to Monitor</h3>
//                 <div className="space-y-3">
//                   <PostButton id={id} />
//                   <ScheduledPostsSelector
//                     userId={id}
//                     onSelectPost={(post) => {
//                       console.log("Selected scheduled post:", post)
//                       // Handle adding the post to the automation
//                     }}
//                     selectedPosts={[]}
//                   />
//                 </div>
//               </div>

//               {responseType === "SMARTAI" && (
//                 <div>
//                   <h3 className="text-lg font-medium mb-3">Analyze Your Business</h3>
//                   <WebsiteAnalyzer
//                     onAnalysisComplete={(analysis) => {
//                       console.log("Website analysis complete:", analysis)
//                       // Handle adding the suggested keywords and response
//                     }}
//                   />
//                 </div>
//               )}

//               <div>
//                 <h3 className="text-lg font-medium mb-3">Create Response Template</h3>
//                 <TemplateEditor
//                   initialTemplate={data?.data?.listener?.prompt || ""}
//                   keywords={data?.data?.keywords?.map((k) => k.word) || []}
//                   onSave={(template) => {
//                     console.log("Template saved:", template)
//                     // Handle saving the template
//                   }}
//                 />
//               </div>
//             </div>

//             <Button
//               onClick={onSaveTrigger}
//               disabled={types?.length === 0}
//               className={cn(
//                 "w-full py-6 text-white font-medium",
//                 types?.length === 0 ? "bg-in-active" : `bg-gradient-to-br from-[#3352CC] to-[#1C2D70]`,
//               )}
//             >
//               <Loader state={isPending}>Save Configuration</Loader>
//             </Button>
//           </TabsContent>

//           <TabsContent value="simulation">
//             <SimulationTab
//               keywords={data?.data?.keywords?.map((k) => k.word) || []}
//               responseMessage={data?.data?.listener?.prompt || ""}
//               responseType={data?.data?.listener?.listener || "MESSAGE"}
//             />
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
import { PlusCircle, PlayCircle, Info, KeySquare, ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FloatingPanel from "../../panel"
import { ContextCard } from "../context"
import { SimulationTab } from "../simulation"
import { ScheduledPostsSelector } from "../scheduled"
import { SetupGuide } from "../guide"
import PostButton from "../post"
import { WebsiteAnalyzer } from "../analyzer"
import { TemplateEditor } from "../editor"

type Props = {
  id: string
}

const Trigger = ({ id }: Props) => {
  const { types, onSetTrigger, onSaveTrigger, isPending } = useTriggers(id)
  const { data } = useQueryAutomation(id)
  const [showTip, setShowTip] = useState(true)
  // Add a state for the active tab
  const [activeTab, setActiveTab] = useState("setup")

  // Update the onSaveTrigger function to switch to the configure tab
  const handleSaveTrigger = () => {
    onSaveTrigger()
    setActiveTab("configure")
  }

  if (data?.data && data?.data?.trigger.length > 0) {
    return (
      <div className="flex flex-col items-center w-full">
        <ActiveTrigger type={data.data.trigger[0].type} keywords={data.data.keywords} />

        {data?.data?.trigger.length > 1 && (
          <>
            <div className="relative w-full md:w-6/12 my-6">
              <p className="absolute transform px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2 bg-background-90 text-text-secondary">
                or
              </p>
              <Separator orientation="horizontal" className="border-muted border-[1px]" />
            </div>
            <ActiveTrigger type={data.data.trigger[1].type} keywords={data.data.keywords} />
          </>
        )}

        {!data.data.listener && <ThenAction id={id} />}
      </div>
    )
  }

  const responseType = data?.data?.listener?.listener || "MESSAGE"

  return (
    <FloatingPanel
      title="Create Automation"
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
              <p className="text-[#768BDD] font-bold">Create Automation</p>
            </div>
          </div>
        </motion.div>
      }
    >
      <div className="flex flex-col gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="setup">
              <Info className="h-4 w-4 mr-1" />
              Guide
            </TabsTrigger>
            <TabsTrigger value="trigger">
              <KeySquare className="h-4 w-4 mr-1" />
              Trigger
            </TabsTrigger>
            <TabsTrigger value="configure">
              <ChevronRight className="h-4 w-4 mr-1" />
              Configure
            </TabsTrigger>
            <TabsTrigger value="simulation">
              <PlayCircle className="h-4 w-4 mr-1" />
              Simulation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="setup">
            <SetupGuide />
          </TabsContent>

          <TabsContent value="trigger" className="space-y-4">
            {showTip && <ContextCard context="trigger" onClose={() => setShowTip(false)} />}

            <h3 className="text-lg font-medium">Select Trigger Type</h3>

            <div className="grid grid-cols-1 gap-3">
              {AUTOMATION_TRIGGERS.map((trigger) => (
                <motion.div
                  key={trigger.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSetTrigger(trigger.type)}
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
            </div>

            <Button
              onClick={handleSaveTrigger}
              disabled={types?.length === 0}
              className={cn(
                "w-full py-6 text-white font-medium",
                types?.length === 0 ? "bg-in-active" : `bg-gradient-to-br from-[#3352CC] to-[#1C2D70]`,
              )}
            >
              <Loader state={isPending}>Configure</Loader>
            </Button>
          </TabsContent>

          <TabsContent value="configure" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-3">Configure Automation</h3>
                <Keywords id={id} />
              </div>

              {/* <div>
                <h3 className="text-lg font-medium mb-3">Select Posts to Monitor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <PostButton id={id} />
                  <ScheduledPostsSelector
                    userId={id}
                    onSelectPost={(post) => {
                      console.log("Selected scheduled post:", post)
                      // Handle adding the post to the automation
                    }}
                    selectedPosts={[]}
                  />
                </div>
              </div> */}

              {responseType === "SMARTAI" || 50>20 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Analyze Your Business</h3>
                  <WebsiteAnalyzer
                    onAnalysisComplete={(analysis) => {
                      console.log("Website analysis complete:", analysis)
                      // Handle adding the suggested keywords and response
                    }}
                  />
                </div>
              )}

              <div>
                <h3 className="text-lg font-medium mb-3">Create Response Template</h3>
                <TemplateEditor
                  initialTemplate={data?.data?.listener?.prompt || ""}
                  keywords={data?.data?.keywords?.map((k) => k.word) || []}
                  onSave={(template) => {
                    console.log("Template saved:", template)
                    // Handle saving the template
                  }}
                />
              </div>
            </div>

            <Button
              onClick={onSaveTrigger}
              disabled={types?.length === 0}
              className={cn(
                "w-full py-6 text-white font-medium",
                types?.length === 0 ? "bg-in-active" : `bg-gradient-to-br from-[#3352CC] to-[#1C2D70]`,
              )}
            >
              <Loader state={isPending}>Save Configuration</Loader>
            </Button>
          </TabsContent>

          <TabsContent value="simulation">
            <SimulationTab
              keywords={data?.data?.keywords?.map((k) => k.word) || []}
              responseMessage={data?.data?.listener?.prompt || ""}
              responseType={data?.data?.listener?.listener || "MESSAGE"}
            />
          </TabsContent>
        </Tabs>
      </div>
    </FloatingPanel>
  )
}

export default Trigger

