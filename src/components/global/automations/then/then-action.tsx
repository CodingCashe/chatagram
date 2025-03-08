// import { useListener } from '@/hooks/use-automations'
// import React from 'react'
// import TriggerButton from '../trigger-button'
// import { AUTOMATION_LISTENERS } from '@/constants/automation'
// import { SubscriptionPlan } from '../../subscription-plan'
// import { cn } from '@/lib/utils'
// import { Textarea } from '@/components/ui/textarea'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import Loader from '../../loader'

// type Props = {
//   id: string
// }

// const ThenAction = ({ id }: Props) => {
//   const {
//     onSetListener,
//     listener: Listener,
//     onFormSubmit,
//     register,
//     isPending,
//   } = useListener(id)

//   return (
//     <TriggerButton label="Then">
//       <div className="flex flex-col gap-y-2 ">
//         {AUTOMATION_LISTENERS.map((listener) =>
//           listener.type === 'SMARTAI' ? (
//             <SubscriptionPlan
//               key={listener.type}
//               type="PRO"
//             >
//               <div
//                 onClick={() => onSetListener(listener.type)}
//                 key={listener.id}
//                 className={cn(
//                   Listener === listener.type
//                     ? 'bg-gradient-to-br from-[#3352CC] to-[#1C2D70]'
//                     : 'bg-background-80',
//                   'p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100'
//                 )}
//               >
//                 <div className="flex gap-x-2 items-center">
//                   {listener.icon}
//                   <p>{listener.label}</p>
//                 </div>
//                 <p>{listener.description}</p>
//               </div>
//             </SubscriptionPlan>
//           ) : (
//             <div
//               onClick={() => onSetListener(listener.type)}
//               key={listener.id}
//               className={cn(
//                 Listener === listener.type
//                   ? 'bg-gradient-to-br from-[#3352CC] to-[#1C2D70]'
//                   : 'bg-background-80',
//                 'p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100'
//               )}
//             >
//               <div className="flex gap-x-2 items-center">
//                 {listener.icon}
//                 <p>{listener.label}</p>
//               </div>
//               <p>{listener.description}</p>
//             </div>
//           )
//         )}
//         <form
//           onSubmit={onFormSubmit}
//           className="flex flex-col gap-y-2"
//         >
//           <Textarea
//             placeholder={
//               Listener === 'SMARTAI'
//                 ? 'Add a prompt that your smart ai can use...'
//                 : 'Add a message you want send to your customers'
//             }
//             {...register('prompt')}
//             className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
//           />
//           <Input
//             {...register('reply')}
//             placeholder="Add a reply for comments (Optional)"
//             className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
//           />
//           <Button className="bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]">
//             <Loader state={isPending}>Add a listener</Loader>
//           </Button>
//         </form>
//       </div>
//     </TriggerButton>
//   )
// }

// export default ThenAction

// "use client"

// import { useListener } from "@/hooks/use-automations"
// import TriggerButton from "../trigger-button"
// import { AUTOMATION_LISTENERS } from "@/constants/automation"
// import { SubscriptionPlan } from "../../subscription-plan"
// import { cn } from "@/lib/utils"
// import { Textarea } from "@/components/ui/textarea"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import Loader from "../../loader"
// import { motion } from "framer-motion"
// import { MessageSquare, Sparkles } from "lucide-react"

// type Props = {
//   id: string
// }

// const ThenAction = ({ id }: Props) => {
//   const { onSetListener, listener: Listener, onFormSubmit, register, isPending } = useListener(id)

//   return (
//     <TriggerButton label="Then">
//       <div className="flex flex-col gap-4">
//         {AUTOMATION_LISTENERS.map((listener) =>
//           listener.type === "SMARTAI" ? (
//             <SubscriptionPlan key={listener.type} type="PRO">
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => onSetListener(listener.type)}
//                 className={cn(
//                   Listener === listener.type
//                     ? "bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-700/20"
//                     : "bg-slate-800/80 hover:bg-slate-800",
//                   "rounded-xl flex flex-col gap-3 cursor-pointer transition-all duration-300 p-4",
//                 )}
//               >
//                 <div className="flex gap-3 items-center">
//                   <div className="p-2 bg-black/20 rounded-lg">
//                     <Sparkles className="h-5 w-5 text-purple-400" />
//                   </div>
//                   <p className="font-semibold text-white">{listener.label}</p>
//                 </div>
//                 <p className="text-sm text-slate-300">{listener.description}</p>
//               </motion.div>
//             </SubscriptionPlan>
//           ) : (
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => onSetListener(listener.type)}
//               key={listener.id}
//               className={cn(
//                 Listener === listener.type
//                   ? "bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-700/20"
//                   : "bg-slate-800/80 hover:bg-slate-800",
//                 "rounded-xl flex flex-col gap-3 cursor-pointer transition-all duration-300 p-4",
//               )}
//             >
//               <div className="flex gap-3 items-center">
//                 <div className="p-2 bg-black/20 rounded-lg">
//                   <MessageSquare className="h-5 w-5 text-emerald-400" />
//                 </div>
//                 <p className="font-semibold text-white">{listener.label}</p>
//               </div>
//               <p className="text-sm text-slate-300">{listener.description}</p>
//             </motion.div>
//           ),
//         )}

//         <form onSubmit={onFormSubmit} className="flex flex-col gap-4 mt-2">
//           <div className="space-y-2">
//             <label className="text-xs uppercase tracking-wider text-slate-500 font-medium">
//               {Listener === "SMARTAI" ? "AI Prompt" : "Message"}
//             </label>
//             <Textarea
//               placeholder={
//                 Listener === "SMARTAI"
//                   ? "Add a prompt that your smart AI can use..."
//                   : "Add a message you want to send to your customers"
//               }
//               {...register("prompt")}
//               className="bg-slate-900/50 border-slate-700 focus:border-emerald-500/50 focus:ring-emerald-500/10 resize-none min-h-[120px] text-slate-300 placeholder:text-slate-600"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-xs uppercase tracking-wider text-slate-500 font-medium">
//               Comment Reply (Optional)
//             </label>
//             <Input
//               {...register("reply")}
//               placeholder="Add a reply for comments"
//               className="bg-slate-900/50 border-slate-700 focus:border-emerald-500/50 focus:ring-emerald-500/10 text-slate-300 placeholder:text-slate-600"
//             />
//           </div>

//           <Button
//             className={cn(
//               "w-full py-6 text-white font-medium transition-all duration-300 mt-2",
//               !Listener
//                 ? "bg-slate-700"
//                 : Listener === "SMARTAI"
//                   ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-700/20"
//                   : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-700/20",
//             )}
//           >
//             <Loader state={isPending}>Add a listener</Loader>
//           </Button>
//         </form>
//       </div>
//     </TriggerButton>
//   )
// }

// export default ThenAction

// "use client"

// import { useListener } from "@/hooks/use-automations"
// import { AUTOMATION_LISTENERS } from "@/constants/automation"
// import { SubscriptionPlan } from "../../subscription-plan"
// import { cn } from "@/lib/utils"
// import { Textarea } from "@/components/ui/textarea"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import Loader from "../../loader"
// import { motion } from "framer-motion"
// import { Lightbulb, Zap, PlusCircle } from "lucide-react"
// import FloatingPanel from "../../panel"

// type Props = {
//   id: string
//   theme?: {
//     id: string
//     name: string
//     primary: string
//     secondary: string
//   }
// }

// const ThenAction = ({
//   id,
//   theme = { id: "blue", name: "Blue", primary: "light-blue", secondary: "#768BDD" },
// }: Props) => {
//   const { onSetListener, listener: Listener, onFormSubmit, register, isPending } = useListener(id)

//   // AI suggestion examples
//   const aiSuggestions = [
//     "Thank them for their comment and ask a follow-up question about their experience",
//     "Offer a personalized discount code based on their comment",
//     "Provide more information about the product they're interested in",
//     "Ask them to share their experience on social media",
//   ]

//   // Message templates
//   const messageTemplates = [
//     "Thanks for your comment! We appreciate your feedback.",
//     "Hello! Thanks for reaching out. How can I help you today?",
//     "We're glad you're interested in our products! Would you like more information?",
//     "Thank you for your support! We'd love to hear more about your experience.",
//   ]

//   return (
//     <FloatingPanel
//       title="Then"
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
//               <p className="text-[#768BDD] font-bold">Then</p>
//             </div>
//           </div>
//         </motion.div>
//       }
//     >
//       <div className="flex flex-col gap-4">
//         {AUTOMATION_LISTENERS.map((listener) =>
//           listener.type === "SMARTAI" ? (
//             <SubscriptionPlan key={listener.type} type="PRO">
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => onSetListener(listener.type)}
//                 className={cn(
//                   Listener === listener.type ? "bg-gradient-to-br from-[#7C21D6] to-[#4A1480]" : "bg-background-80",
//                   "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100",
//                 )}
//               >
//                 <div className="flex gap-x-2 items-center">
//                   {listener.icon}
//                   <p>{listener.label}</p>
//                 </div>
//                 <p>{listener.description}</p>
//               </motion.div>
//             </SubscriptionPlan>
//           ) : (
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => onSetListener(listener.type)}
//               key={listener.id}
//               className={cn(
//                 Listener === listener.type ? "bg-gradient-to-br from-[#3352CC] to-[#1C2D70]" : "bg-background-80",
//                 "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100",
//               )}
//             >
//               <div className="flex gap-x-2 items-center">
//                 {listener.icon}
//                 <p>{listener.label}</p>
//               </div>
//               <p>{listener.description}</p>
//             </motion.div>
//           ),
//         )}

//         <form onSubmit={onFormSubmit} className="flex flex-col gap-4 mt-2">
//           {Listener && (
//             <div className={`bg-background-80 p-4 rounded-xl mb-2`}>
//               <div className="flex items-center gap-3 mb-3">
//                 {Listener === "SMARTAI" ? (
//                   <Lightbulb className="h-5 w-5 text-keyword-purple" />
//                 ) : (
//                   <Zap className="h-5 w-5 text-light-blue" />
//                 )}
//                 <h3 className="text-white font-medium">
//                   {Listener === "SMARTAI" ? "AI Suggestions" : "Message Templates"}
//                 </h3>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                 {(Listener === "SMARTAI" ? aiSuggestions : messageTemplates).map((suggestion, index) => (
//                   <motion.div
//                     key={index}
//                     whileHover={{ scale: 1.02 }}
//                     className={`bg-background-90 p-2 rounded-lg text-sm cursor-pointer ${Listener === "SMARTAI" ? "text-keyword-purple" : "text-light-blue"}`}
//                     onClick={() => {
//                       const textarea = document.querySelector('textarea[name="prompt"]') as HTMLTextAreaElement
//                       if (textarea) {
//                         textarea.value = suggestion
//                         textarea.focus()
//                       }
//                     }}
//                   >
//                     {suggestion}
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <Textarea
//             placeholder={
//               Listener === "SMARTAI"
//                 ? "Add a prompt that your smart ai can use..."
//                 : "Add a message you want send to your customers"
//             }
//             {...register("prompt")}
//             className="bg-background-80 outline-none border-none ring-0 focus:ring-0 min-h-[120px]"
//           />

//           <Input
//             {...register("reply")}
//             placeholder="Add a reply for comments (Optional)"
//             className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
//           />

//           <Button
//             className={cn(
//               "bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]",
//               Listener === "SMARTAI" && "from-[#7C21D6] to-[#4A1480]",
//             )}
//           >
//             <Loader state={isPending}>Add a listener</Loader>
//           </Button>
//         </form>
//       </div>
//     </FloatingPanel>
//   )
// }

// export default ThenAction

// "use client"

// import { useListener } from "@/hooks/use-automations"
// import { AUTOMATION_LISTENERS } from "@/constants/automation"
// import { SubscriptionPlan } from "../../subscription-plan"
// import { cn } from "@/lib/utils"
// import { Textarea } from "@/components/ui/textarea"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import Loader from "../../loader"
// import { motion } from "framer-motion"
// import { Lightbulb, Zap, PlusCircle } from "lucide-react"
// import FloatingPanel from "../../panel"
// import { ResponseLibrary } from "../response"

// type Props = {
//   id: string
//   theme?: {
//     id: string
//     name: string
//     primary: string
//     secondary: string
//   }
// }

// const ThenAction = ({
//   id,
//   theme = { id: "blue", name: "Blue", primary: "light-blue", secondary: "#768BDD" },
// }: Props) => {
//   const { onSetListener, listener: Listener, onFormSubmit, register, isPending } = useListener(id)

//   // AI suggestion examples
//   const aiSuggestions = [
//     "Thank them for their comment and ask a follow-up question about their experience",
//     "Offer a personalized discount code based on their comment",
//     "Provide more information about the product they're interested in",
//     "Ask them to share their experience on social media",
//   ]

//   // Message templates
//   const messageTemplates = [
//     "Thanks for your comment! We appreciate your feedback.",
//     "Hello! Thanks for reaching out. How can I help you today?",
//     "We're glad you're interested in our products! Would you like more information?",
//     "Thank you for your support! We'd love to hear more about your experience.",
//   ]

//   return (
//     <FloatingPanel
//       title="Then"
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
//               <p className="text-[#768BDD] font-bold">Then</p>
//             </div>
//           </div>
//         </motion.div>
//       }
//     >
//       <div className="flex flex-col gap-4">
//         {AUTOMATION_LISTENERS.map((listener) =>
//           listener.type === "SMARTAI" ? (
//             <SubscriptionPlan key={listener.type} type="PRO">
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => onSetListener(listener.type)}
//                 className={cn(
//                   Listener === listener.type ? "bg-gradient-to-br from-[#7C21D6] to-[#4A1480]" : "bg-background-80",
//                   "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100",
//                 )}
//               >
//                 <div className="flex gap-x-2 items-center">
//                   {listener.icon}
//                   <p>{listener.label}</p>
//                 </div>
//                 <p>{listener.description}</p>
//               </motion.div>
//             </SubscriptionPlan>
//           ) : (
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => onSetListener(listener.type)}
//               key={listener.id}
//               className={cn(
//                 Listener === listener.type ? "bg-gradient-to-br from-[#3352CC] to-[#1C2D70]" : "bg-background-80",
//                 "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100",
//               )}
//             >
//               <div className="flex gap-x-2 items-center">
//                 {listener.icon}
//                 <p>{listener.label}</p>
//               </div>
//               <p>{listener.description}</p>
//             </motion.div>
//           ),
//         )}

//         <form onSubmit={onFormSubmit} className="flex flex-col gap-4 mt-2">
//           {Listener && (
//             <div className={`bg-background-80 p-4 rounded-xl mb-2`}>
//               <div className="flex items-center gap-3 mb-3">
//                 {Listener === "SMARTAI" ? (
//                   <Lightbulb className="h-5 w-5 text-keyword-purple" />
//                 ) : (
//                   <Zap className="h-5 w-5 text-light-blue" />
//                 )}
//                 <h3 className="text-white font-medium">
//                   {Listener === "SMARTAI" ? "AI Suggestions" : "Message Templates"}
//                 </h3>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                 {(Listener === "SMARTAI" ? aiSuggestions : messageTemplates).map((suggestion, index) => (
//                   <motion.div
//                     key={index}
//                     whileHover={{ scale: 1.02 }}
//                     className={`bg-background-90 p-2 rounded-lg text-sm cursor-pointer ${Listener === "SMARTAI" ? "text-keyword-purple" : "text-light-blue"}`}
//                     onClick={() => {
//                       const textarea = document.querySelector('textarea[name="prompt"]') as HTMLTextAreaElement
//                       if (textarea) {
//                         textarea.value = suggestion
//                         textarea.focus()
//                       }
//                     }}
//                   >
//                     {suggestion}
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="space-y-2">
//             <div className="flex justify-between items-center">
//               <label className="text-sm text-text-secondary">
//                 {Listener === "SMARTAI"
//                   ? "Add a prompt that your smart ai can use..."
//                   : "Add a message you want send to your customers"}
//               </label>
//               <ResponseLibrary
//                 onSelectTemplate={(content) => {
//                   const textarea = document.querySelector('textarea[name="prompt"]') as HTMLTextAreaElement
//                   if (textarea) {
//                     textarea.value = content
//                     textarea.focus()
//                   }
//                 }}
//               />
//             </div>
//             <Textarea
//               placeholder={
//                 Listener === "SMARTAI"
//                   ? "Add a prompt that your smart ai can use..."
//                   : "Add a message you want send to your customers"
//               }
//               {...register("prompt")}
//               className="bg-background-80 outline-none border-none ring-0 focus:ring-0 min-h-[120px]"
//             />
//           </div>

//           <Input
//             {...register("reply")}
//             placeholder="Add a reply for comments (Optional)"
//             className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
//           />

//           <Button
//             className={cn(
//               "bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]",
//               Listener === "SMARTAI" && "from-[#7C21D6] to-[#4A1480]",
//             )}
//           >
//             <Loader state={isPending}>Add a listener</Loader>
//           </Button>
//         </form>
//       </div>
//     </FloatingPanel>
//   )
// }

// export default ThenAction

// "use client"

// import { useListener } from "@/hooks/use-automations"
// import { AUTOMATION_LISTENERS } from "@/constants/automation"
// import { SubscriptionPlan } from "../../subscription-plan"
// import { cn } from "@/lib/utils"
// import { Textarea } from "@/components/ui/textarea"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import Loader from "../../loader"
// import { motion } from "framer-motion"
// import { Lightbulb, PlusCircle, MessageSquare } from "lucide-react"
// import FloatingPanel from "../../panel"
// import  ResponseLibrary from "../response"
// import { ContextCard } from "../context"
// import { useState } from "react"

// type Props = {
//   id: string
//   theme?: {
//     id: string
//     name: string
//     primary: string
//     secondary: string
//   }
// }

// const ThenAction = ({
//   id,
//   theme = { id: "blue", name: "Blue", primary: "light-blue", secondary: "#768BDD" },
// }: Props) => {
//   const { onSetListener, listener: Listener, onFormSubmit, register, isPending } = useListener(id)
//   const [showTip, setShowTip] = useState(true)

//   // AI suggestion examples
//   const aiSuggestions = [
//     "Thank them for their comment and ask a follow-up question about their experience",
//     "Offer a personalized discount code based on their comment",
//     "Provide more information about the product they're interested in",
//     "Ask them to share their experience on social media",
//   ]

//   // Message templates
//   const messageTemplates = [
//     "Thanks for your comment! We appreciate your feedback.",
//     "Hello! Thanks for reaching out. How can I help you today?",
//     "We're glad you're interested in our products! Would you like more information?",
//     "Thank you for your support! We'd love to hear more about your experience.",
//   ]

//   return (
//     <FloatingPanel
//       title="Then"
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
//               <p className="text-[#768BDD] font-bold">Then</p>
//             </div>
//           </div>
//         </motion.div>
//       }
//     >
//       <div className="flex flex-col gap-4">
//         {showTip && <ContextCard context="response" onClose={() => setShowTip(false)} />}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           {AUTOMATION_LISTENERS.map((listener) =>
//             listener.type === "SMARTAI" ? (
//               <SubscriptionPlan key={listener.type} type="PRO">
//                 <motion.div
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => onSetListener(listener.type)}
//                   className={cn(
//                     Listener === listener.type ? "bg-gradient-to-br from-[#7C21D6] to-[#4A1480]" : "bg-background-80",
//                     "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100 h-full",
//                   )}
//                 >
//                   <div className="flex gap-x-2 items-center">
//                     {listener.icon}
//                     <p>{listener.label}</p>
//                   </div>
//                   <p className="text-sm">{listener.description}</p>
//                 </motion.div>
//               </SubscriptionPlan>
//             ) : (
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => onSetListener(listener.type)}
//                 key={listener.id}
//                 className={cn(
//                   Listener === listener.type ? "bg-gradient-to-br from-[#3352CC] to-[#1C2D70]" : "bg-background-80",
//                   "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100 h-full",
//                 )}
//               >
//                 <div className="flex gap-x-2 items-center">
//                   {listener.icon}
//                   <p>{listener.label}</p>
//                 </div>
//                 <p className="text-sm">{listener.description}</p>
//               </motion.div>
//             ),
//           )}
//         </div>

//         <form onSubmit={onFormSubmit} className="flex flex-col gap-4 mt-2">
//           {Listener && (
//             <div className={`bg-background-80 p-4 rounded-xl mb-2`}>
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="text-white font-medium flex items-center">
//                   {Listener === "SMARTAI" ? (
//                     <>
//                       <Lightbulb className="h-5 w-5 mr-2 text-keyword-purple" />
//                       AI Suggestions
//                     </>
//                   ) : (
//                     <>
//                       <MessageSquare className="h-5 w-5 mr-2 text-light-blue" />
//                       Quick Responses
//                     </>
//                   )}
//                 </h3>
//                 <ResponseLibrary

//                   onSelectTemplate={(content) => {
//                     const textarea = document.querySelector('textarea[name="prompt"]') as HTMLTextAreaElement
//                     if (textarea) {
//                       textarea.value = content
//                       textarea.focus()
//                     }
//                   }}
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                 {(Listener === "SMARTAI" ? aiSuggestions : messageTemplates).map((suggestion, index) => (
//                   <motion.div
//                     key={index}
//                     whileHover={{ scale: 1.02 }}
//                     className={`bg-background-90 p-2 rounded-lg text-sm cursor-pointer ${Listener === "SMARTAI" ? "text-keyword-purple" : "text-light-blue"}`}
//                     onClick={() => {
//                       const textarea = document.querySelector('textarea[name="prompt"]') as HTMLTextAreaElement
//                       if (textarea) {
//                         textarea.value = suggestion
//                         textarea.focus()
//                       }
//                     }}
//                   >
//                     {suggestion}
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="space-y-2">
//             <label className="text-sm text-text-secondary">
//               {Listener === "SMARTAI"
//                 ? "Add a prompt that your smart AI can use..."
//                 : "Add a message you want to send to your customers"}
//             </label>
//             <Textarea
//               placeholder={
//                 Listener === "SMARTAI"
//                   ? "Add a prompt that your smart AI can use..."
//                   : "Add a message you want to send to your customers"
//               }
//               {...register("prompt")}
//               className="bg-background-80 outline-none border-none ring-0 focus:ring-0 min-h-[120px]"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm text-text-secondary">Add a reply for comments (Optional)</label>
//             <Input
//               {...register("reply")}
//               placeholder="Add a reply for comments (Optional)"
//               className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
//             />
//           </div>

//           <Button
//             className={cn(
//               "bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]",
//               Listener === "SMARTAI" && "from-[#7C21D6] to-[#4A1480]",
//             )}
//           >
//             <Loader state={isPending}>Add a listener</Loader>
//           </Button>
//         </form>
//       </div>
//     </FloatingPanel>
//   )
// }

// export default ThenAction

"use client"

import { useListener } from "@/hooks/use-automations"
import { AUTOMATION_LISTENERS } from "@/constants/automation"
import { SubscriptionPlan } from "../../subscription-plan"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Loader from "../../loader"
import { motion } from "framer-motion"
import { Lightbulb, PlusCircle, MessageSquare } from "lucide-react"
import FloatingPanel from "../../panel"
import ResponseLibrary from "../response"
import { ContextCard } from "../context"
import { useState } from "react"

type Props = {
  id: string
  theme?: {
    id: string
    name: string
    primary: string
    secondary: string
  }
}

const ThenAction = ({
  id,
  theme = { id: "blue", name: "Blue", primary: "light-blue", secondary: "#768BDD" },
}: Props) => {
  const { onSetListener, listener: Listener, onFormSubmit, register, isPending } = useListener(id)
  const [showTip, setShowTip] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")

  // AI suggestion examples
  const aiSuggestions = [
    "Thank them for their comment and ask a follow-up question about their experience",
    "Offer a personalized discount code based on their comment",
    "Provide more information about the product they're interested in",
    "Ask them to share their experience on social media",
  ]

  // Message templates
  const messageTemplates = [
    "Thanks for your comment! We appreciate your feedback.",
    "Hello! Thanks for reaching out. How can I help you today?",
    "We're glad you're interested in our products! Would you like more information?",
    "Thank you for your support! We'd love to hear more about your experience.",
  ]

  const handleSelectTemplate = (content: string) => {
    setSelectedTemplate(content)
    const textarea = document.querySelector('textarea[name="prompt"]') as HTMLTextAreaElement
    if (textarea) {
      textarea.value = content
      textarea.focus()
    }
  }

  return (
    <FloatingPanel
      title="Then"
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
              <p className="text-[#768BDD] font-bold">Then</p>
            </div>
          </div>
        </motion.div>
      }
    >
      <div className="flex flex-col gap-4">
        {showTip && <ContextCard context="response" onClose={() => setShowTip(false)} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {AUTOMATION_LISTENERS.map((listener) =>
            listener.type === "SMARTAI" ? (
              <SubscriptionPlan key={listener.type} type="PRO">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSetListener(listener.type)}
                  className={cn(
                    Listener === listener.type ? "bg-gradient-to-br from-[#7C21D6] to-[#4A1480]" : "bg-background-80",
                    "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100 h-full",
                  )}
                >
                  <div className="flex gap-x-2 items-center">
                    {listener.icon}
                    <p>{listener.label}</p>
                  </div>
                  <p className="text-sm">{listener.description}</p>
                </motion.div>
              </SubscriptionPlan>
            ) : (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSetListener(listener.type)}
                key={listener.id}
                className={cn(
                  Listener === listener.type ? "bg-gradient-to-br from-[#3352CC] to-[#1C2D70]" : "bg-background-80",
                  "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100 h-full",
                )}
              >
                <div className="flex gap-x-2 items-center">
                  {listener.icon}
                  <p>{listener.label}</p>
                </div>
                <p className="text-sm">{listener.description}</p>
              </motion.div>
            ),
          )}
        </div>

        <form onSubmit={onFormSubmit} className="flex flex-col gap-4 mt-2">
          {Listener && (
            <div className={`bg-background-80 p-4 rounded-xl mb-2`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-medium flex items-center">
                  {Listener === "SMARTAI" ? (
                    <>
                      {/* <Lightbulb className="h-5 w-5 mr-2 text-keyword-purple" />
                      AI Suggestions */}
                    </>
                  ) : (
                    <>
                      {/* <MessageSquare className="h-5 w-5 mr-2 text-light-blue" />
                      Quick Responses */}
                    </>
                  )}
                </h3>
                <ResponseLibrary
                  isAI={Listener === "SMARTAI"}
                  onSelectTemplate={handleSelectTemplate}
                  selectedTemplate={selectedTemplate}
                  userSubscription={Listener}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {(Listener === "SMARTAI" ? aiSuggestions : messageTemplates).map((suggestion, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className={`bg-background-90 p-2 rounded-lg text-sm cursor-pointer ${Listener === "SMARTAI" ? "text-keyword-purple" : "text-light-blue"}`}
                    onClick={() => {
                      const textarea = document.querySelector('textarea[name="prompt"]') as HTMLTextAreaElement
                      if (textarea) {
                        textarea.value = suggestion
                        textarea.focus()
                      }
                    }}
                  >
                    {suggestion}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm text-text-secondary">
              {Listener === "SMARTAI"
                ? "Add a prompt that your smart AI can use..."
                : "Add a message you want to send to your customers"}
            </label>
            <Textarea
              placeholder={
                Listener === "SMARTAI"
                  ? "Add a prompt that your smart AI can use..."
                  : "Add a message you want to send to your customers"
              }
              {...register("prompt")}
              className="bg-background-80 outline-none border-none ring-0 focus:ring-0 min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-text-secondary">Add a reply for comments (Optional)</label>
            <Input
              {...register("reply")}
              placeholder="Add a reply for comments (Optional)"
              className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
            />
          </div>

          <Button
            className={cn(
              "bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]",
              Listener === "SMARTAI" && "from-[#7C21D6] to-[#4A1480]",
            )}
          >
            <Loader state={isPending}>Add a listener</Loader>
          </Button>
        </form>
      </div>
    </FloatingPanel>
  )
}

export default ThenAction

// "use client"

// import { useListener } from "@/hooks/use-automations"
// import { AUTOMATION_LISTENERS } from "@/constants/automation"
// import { SubscriptionPlan } from "../../subscription-plan"
// import { cn } from "@/lib/utils"
// import { Textarea } from "@/components/ui/textarea"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import Loader from "../../loader"
// import { motion } from "framer-motion"
// import { Lightbulb, PlusCircle, MessageSquare, Lock } from "lucide-react"
// import FloatingPanel from "../../panel"
// import ResponseLibrary from "../response"
// import { ContextCard } from "../context"
// import { useState } from "react"
// import { useToast } from "@/hooks/use-toast"

// type Props = {
//   id: string
//   theme?: {
//     id: string
//     name: string
//     primary: string
//     secondary: string
//   }
//   userSubscription?: "SMARTAI" | "MESSAGE" // Add subscription prop
// }

// const ThenAction = ({
//   id,
//   theme = { id: "blue", name: "Blue", primary: "light-blue", secondary: "#768BDD" },
//   userSubscription = "MESSAGE", // Default to FREE
// }: Props) => {
//   const { onSetListener, listener: Listener, onFormSubmit, register, isPending } = useListener(id)
//   const [showTip, setShowTip] = useState(true)
//   const [selectedTemplate, setSelectedTemplate] = useState<string>("")
//   const { toast } = useToast()

//   // AI suggestion examples
//   const aiSuggestions = [
//     "Thank them for their comment and ask a follow-up question about their experience",
//     "Offer a personalized discount code based on their comment",
//     "Provide more information about the product they're interested in",
//     "Ask them to share their experience on social media",
//   ]

//   // Message templates
//   const messageTemplates = [
//     "Thanks for your comment! We appreciate your feedback.",
//     "Hello! Thanks for reaching out. How can I help you today?",
//     "We're glad you're interested in our products! Would you like more information?",
//     "Thank you for your support! We'd love to hear more about your experience.",
//   ]

//   const handleSelectTemplate = (content: string) => {
//     setSelectedTemplate(content)
//     const textarea = document.querySelector('textarea[name="prompt"]') as HTMLTextAreaElement
//     if (textarea) {
//       textarea.value = content
//       textarea.focus()
//     }
//   }

//   // Handle AI selection with subscription check
//   const handleAISelection = (type: "SMARTAI" | "MESSAGE") => {
//     if (Listener !== "SMARTAI") {
//       toast({
//         title: "Pro Feature",
//         description: "Upgrade to PRO to use AI-powered responses",
//         variant: "destructive",
//         duration: 3000,
//       })
//       return
//     }

//     onSetListener(type)
//   }

//   return (
//     <FloatingPanel
//       title="Then"
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
//               <p className="text-[#768BDD] font-bold">Then</p>
//             </div>
//           </div>
//         </motion.div>
//       }
//     >
//       <div className="flex flex-col gap-4">
//         {showTip && <ContextCard context="response" onClose={() => setShowTip(false)} />}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           {AUTOMATION_LISTENERS.map((listener) =>
//             listener.type === "SMARTAI" ? (
//               <SubscriptionPlan key={listener.type} type="PRO">
//                 <motion.div
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => handleAISelection(listener.type)}
//                   className={cn(
//                     Listener === listener.type ? "bg-gradient-to-br from-[#7C21D6] to-[#4A1480]" : "bg-background-80",
//                     "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100 h-full",
//                     Listener !== "SMARTAI" && "opacity-70", // Dim if not PRO
//                   )}
//                 >
//                   <div className="flex gap-x-2 items-center">
//                     {Listener !== "SMARTAI" && (
//                       <div className="absolute top-2 right-2">
//                         <Lock className="h-4 w-4 text-purple-400" />
//                       </div>
//                     )}
//                     {listener.icon}
//                     <p>{listener.label}</p>
//                   </div>
//                   <p className="text-sm">{listener.description}</p>
//                 </motion.div>
//               </SubscriptionPlan>
//             ) : (
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => onSetListener(listener.type)}
//                 key={listener.id}
//                 className={cn(
//                   Listener === listener.type ? "bg-gradient-to-br from-[#3352CC] to-[#1C2D70]" : "bg-background-80",
//                   "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100 h-full",
//                 )}
//               >
//                 <div className="flex gap-x-2 items-center">
//                   {listener.icon}
//                   <p>{listener.label}</p>
//                 </div>
//                 <p className="text-sm">{listener.description}</p>
//               </motion.div>
//             ),
//           )}
//         </div>

//         <form onSubmit={onFormSubmit} className="flex flex-col gap-4 mt-2">
//           {Listener && (
//             <div className={`bg-background-80 p-4 rounded-xl mb-2`}>
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="text-white font-medium flex items-center">
//                   {Listener === "SMARTAI" ? (
//                     <>
//                       {/* <Lightbulb className="h-5 w-5 mr-2 text-keyword-purple" />
//                       AI Suggestions */}
//                     </>
//                   ) : (
//                     <>
//                       {/* <MessageSquare className="h-5 w-5 mr-2 text-light-blue" />
//                       Quick Responses */}
//                     </>
//                   )}
//                 </h3>
//                 <ResponseLibrary
//                   isAI={Listener === "SMARTAI"}
//                   onSelectTemplate={handleSelectTemplate}
//                   selectedTemplate={selectedTemplate}
//                   userSubscription={Listener}
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                 {(Listener === "SMARTAI" ? aiSuggestions : messageTemplates).map((suggestion, index) => (
//                   <motion.div
//                     key={index}
//                     whileHover={{ scale: 1.02 }}
//                     className={`bg-background-90 p-2 rounded-lg text-sm cursor-pointer ${Listener === "SMARTAI" ? "text-keyword-purple" : "text-light-blue"}`}
//                     onClick={() => {
//                       const textarea = document.querySelector('textarea[name="prompt"]') as HTMLTextAreaElement
//                       if (textarea) {
//                         textarea.value = suggestion
//                         textarea.focus()
//                       }
//                     }}
//                   >
//                     {suggestion}
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="space-y-2">
//             <label className="text-sm text-text-secondary">
//               {Listener === "SMARTAI"
//                 ? "Add a prompt that your smart AI can use..."
//                 : "Add a message you want to send to your customers"}
//             </label>
//             <Textarea
//               placeholder={
//                 Listener === "SMARTAI"
//                   ? "Add a prompt that your smart AI can use..."
//                   : "Add a message you want to send to your customers"
//               }
//               {...register("prompt")}
//               className="bg-background-80 outline-none border-none ring-0 focus:ring-0 min-h-[120px]"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm text-text-secondary">Add a reply for comments (Optional)</label>
//             <Input
//               {...register("reply")}
//               placeholder="Add a reply for comments (Optional)"
//               className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
//             />
//           </div>

//           <Button
//             className={cn(
//               "bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]",
//               Listener === "SMARTAI" && "from-[#7C21D6] to-[#4A1480]",
//             )}
//           >
//             <Loader state={isPending}>Add a listener</Loader>
//           </Button>
//         </form>
//       </div>
//     </FloatingPanel>
//   )
// }

// export default ThenAction

