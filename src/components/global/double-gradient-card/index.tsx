// import { Button } from '@/components/ui/button'
// import { ArrowRight } from 'lucide-react'
// import React from 'react'

// type Props = {
//   label: string
//   subLabel: string
//   description: string
// }

// const DoubleGradientCard = ({ description, label, subLabel }: Props) => {
//   return (
//     <div className="relative border-[1px] border-in-active/50 p-5 rounded-xl flex flex-col gap-y-20 overflow-hidden">
//       <div className="flex flex-col z-40">
//         <h2 className="text-2xl font-medium">{label}</h2>
//         <p className="text-text-secondary text-sm">{subLabel}</p>
//       </div>
//       <div className="flex justify-between items-center z-40 gap-x-10">
//         <p className="text-text-secondary text-sm">{description}</p>
//         <Button className="rounded-full bg-light-blue w-10 h-10">
//           <ArrowRight color="white" />
//         </Button>
//       </div>
//       <div className="w-6/12 h-full absolute radial--double--gradient--cards--top top-0 left-0 z-10" />
//       <div className="w-6/12 h-full absolute radial--double--gradient--cards--bottom top-0 left-1/2 right-0 z-0" />
//     </div>
//   )
// }

// export default DoubleGradientCard


// "use client"

// import { Button } from "@/components/ui/button"
// import { ArrowRight } from "lucide-react"
// import React from "react"
// import { motion } from "framer-motion"

// type Props = {
//   label: string
//   subLabel: string
//   description: string
// }

// const DoubleGradientCard = ({ description, label, subLabel }: Props) => {
//   return (
//     <motion.div
//       className="relative border-[1px] border-gray-700 p-5 rounded-xl flex flex-col gap-y-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       whileHover={{ scale: 1.02 }}
//     >
//       <div className="flex flex-col z-40">
//         <motion.h2
//           className="text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           {label}
//         </motion.h2>
//         <motion.p
//           className="text-gray-400 text-sm"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//         >
//           {subLabel}
//         </motion.p>
//       </div>
//       <div className="flex justify-between items-center z-40 gap-x-10">
//         <motion.p
//           className="text-gray-300 text-sm"
//           initial={{ opacity: 0, x: -10 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//         >
//           {description}
//         </motion.p>
//         <motion.div
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//         >
//           <Button className="rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 w-10 h-10">
//             <ArrowRight color="white" />
//           </Button>
//         </motion.div>
//       </div>
//       <div className="w-6/12 h-full absolute radial-gradient-top top-0 left-0 z-10" />
//       <div className="w-6/12 h-full absolute radial-gradient-bottom top-0 left-1/2 right-0 z-0" />
//       <style jsx>{`
//         .radial-gradient-top {
//           background: radial-gradient(circle at top left, rgba(139, 92, 246, 0.1), transparent 70%);
//         }
//         .radial-gradient-bottom {
//           background: radial-gradient(circle at bottom right, rgba(236, 72, 153, 0.1), transparent 70%);
//         }
//       `}</style>
//     </motion.div>
//   )
// }

// export default DoubleGradientCard

// "use client"

// import { Button } from "@/components/ui/button"
// import { ArrowRight } from "lucide-react"
// import React from "react"
// import { motion } from "framer-motion"

// type Props = {
//   label: string
//   subLabel: string
//   description: string
// }

// const DoubleGradientCard = ({ description, label, subLabel }: Props) => {
//   return (
//     <motion.div
//       className="relative border border-primary/20 p-5 rounded-xl flex flex-col gap-y-20 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg hover:shadow-xl transition-shadow duration-300"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       whileHover={{ scale: 1.02 }}
//     >
//       <div className="flex flex-col z-40">
//         <motion.h2
//           className="text-2xl font-medium text-foreground"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           {label}
//         </motion.h2>
//         <motion.p
//           className="text-muted-foreground text-sm"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//         />
//       </div>
//       <div className="flex justify-between items-center z-40 gap-x-10">
//         <motion.p
//           className="text-muted-foreground text-sm"
//           initial={{ opacity: 0, x: -10 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//         >
//           {description}
//         </motion.p>
//         <motion.div
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//         >
//           <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 w-10 h-10">
//             <ArrowRight />
//           </Button>
//         </motion.div>
//       </div>
//       <div className="w-6/12 h-full absolute radial-gradient-top top-0 left-0 z-10" />
//       <div className="w-6/12 h-full absolute radial-gradient-bottom top-0 left-1/2 right-0 z-0" />
//       <style jsx>{`
//         .radial-gradient-top {
//           background: radial-gradient(circle at top left, hsl(var(--primary) / 0.1), transparent 70%);
//         }
//         .radial-gradient-bottom {
//           background: radial-gradient(circle at bottom right, hsl(var(--secondary) / 0.1), transparent 70%);
//         }
//       `}</style>
//     </motion.div>
//   )
// }

// export default DoubleGradientCard

// "use client"

// import { Button } from "@/components/ui/button"
// import { ArrowRight } from "lucide-react"
// import { motion } from "framer-motion"

// type Props = {
//   label: string
//   subLabel: string
//   description: string
// }

// const DoubleGradientCard = ({ description, label, subLabel }: Props) => {
//   return (
//     <motion.div
//       className="relative border border-[#3352CC]/20 p-5 rounded-xl flex flex-col gap-y-20 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       whileHover={{ scale: 1.02 }}
//       style={{
//         background: `
//           linear-gradient(135deg, #3352CC 0%, #4B6FE0 100%),
//           radial-gradient(circle at top left, #3352CC 0%, transparent 70%),
//           radial-gradient(circle at bottom right, #4B6FE0 0%, transparent 70%)
//         `,
//         backgroundBlendMode: "overlay, normal, normal",
//       }}
//     >
//       <div className="flex flex-col z-40">
//         <motion.h2
//           className="text-2xl font-medium text-white"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           {label}
//         </motion.h2>
//         <motion.p
//           className="text-white/80 text-sm"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//         >
//           {subLabel}
//         </motion.p>
//       </div>
//       <div className="flex justify-between items-center z-40 gap-x-10">
//         <motion.p
//           className="text-white/70 text-sm"
//           initial={{ opacity: 0, x: -10 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//         >
//           {description}
//         </motion.p>
//         <motion.div
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//         >
//           <Button className="rounded-full bg-white text-[#3352CC] hover:bg-white/90 w-10 h-10">
//             <ArrowRight />
//           </Button>
//         </motion.div>
//       </div>
//       <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-20 pointer-events-none" />
//     </motion.div>
//   )
// }

// export default DoubleGradientCard

// "use client"
// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { ArrowRight, MessageSquareIcon as MessageSquareAuto, BrainCircuit, Sparkles } from "lucide-react"

// type Props = {
//   id: string
//   label: string
//   subLabel: string
//   description: string
// }

// const DoubleGradientCard = ({ label, subLabel, description }: Props) => {
//   const getIcon = (label: string) => {
//     switch (label) {
//       case "Set-up Auto Replies":
//         return <MessageSquareAuto className="w-10 h-10 text-indigo-300" />
//       case "Answer Questions with AI":
//         return <BrainCircuit className="w-10 h-10 text-purple-300" />
//       case "Give quality replies that increase engagements":
//         return <Sparkles className="w-10 h-10 text-pink-300" />
//       default:
//         return null
//     }
//   }

//   return (
//     <motion.div
//       className="relative p-1 rounded-2xl overflow-hidden shadow-2xl group"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       whileHover={{ scale: 1.02 }}
//     >
//       {/* Outer gradient border */}
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-75" />

//       {/* Inner content area with glassmorphism effect */}
//       <div className="relative p-6 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-md rounded-xl overflow-hidden">
//         {/* Neomorphic shapes */}
//         <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
//         <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-pink-500/30 to-transparent rounded-full blur-2xl transform translate-x-1/4 translate-y-1/4" />

//         {/* Content */}
//         <div className="relative z-10 flex flex-col gap-y-6">
//           <div className="flex items-start gap-4">
//             <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm shadow-neon">{getIcon(label)}</div>
//             <div>
//               <h2 className="text-2xl font-bold text-white mb-2 text-shadow">{label}</h2>
//               <p className="text-indigo-200 text-shadow-sm text-sm">{subLabel}</p>
//             </div>
//           </div>
//           <div className="flex justify-between items-end">
//             <p className="text-white/80 text-sm max-w-[70%]">{description}</p>
//             <Button className="rounded-full bg-white/10 text-white hover:bg-white/20 w-12 h-12 backdrop-blur-sm shadow-neon group-hover:shadow-neon-intense transition-all duration-300">
//               <ArrowRight className="w-6 h-6" />
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Accent lines */}
//       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//       <div className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-pink-500 to-transparent" />

//       <style jsx>{`
//         .text-shadow {
//           text-shadow: 0 0 10px rgba(255,255,255,0.5);
//         }
//         .text-shadow-sm {
//           text-shadow: 0 0 5px rgba(255,255,255,0.3);
//         }
//         .shadow-neon {
//           box-shadow: 0 0 5px theme('colors.indigo.500'),
//                       0 0 20px theme('colors.purple.500');
//         }
//         .shadow-neon-intense {
//           box-shadow: 0 0 10px theme('colors.indigo.500'),
//                       0 0 30px theme('colors.purple.500'),
//                       0 0 50px theme('colors.pink.500');
//         }
//       `}</style>
//     </motion.div>
//   )
// }

// export default DoubleGradientCard

// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { ArrowRight, MessageSquareIcon as MessageSquareAuto, BrainCircuit, Sparkles } from "lucide-react"

// type Props = {
//   id: string
//   label: string
//   subLabel: string
//   description: string
// }

// const DoubleGradientCard = ({ label, subLabel, description }: Props) => {
//   const [isHovered, setIsHovered] = useState(false)

//   const getIcon = (label: string) => {
//     switch (label) {
//       case "Set-up Auto Replies":
//         return <MessageSquareAuto className="w-10 h-10 text-indigo-300" />
//       case "Answer Questions with AI":
//         return <BrainCircuit className="w-10 h-10 text-purple-300" />
//       case "Give quality replies that increase engagements":
//         return <Sparkles className="w-10 h-10 text-pink-300" />
//       default:
//         return null
//     }
//   }

//   return (
//     <motion.div
//       className="relative p-0.5 rounded-2xl overflow-hidden shadow-2xl group perspective-1000"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//       style={{
//         transformStyle: "preserve-3d",
//       }}
//     >
//       {/* Glowing border effect */}
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-75 animate-border-flow" />

//       {/* Inner content area with glassmorphism effect */}
//       <motion.div
//         className="relative p-6 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl rounded-xl overflow-hidden h-full"
//         style={{
//           transformStyle: "preserve-3d",
//           transform: isHovered ? "rotateY(10deg) rotateX(5deg)" : "rotateY(0deg) rotateX(0deg)",
//           transition: "transform 0.3s ease-out",
//         }}
//       >
//         {/* Hexagonal grid background */}
//         <div className="absolute inset-0 bg-hexagon-pattern opacity-10" />

//         {/* Content */}
//         <div className="relative z-10 flex flex-col gap-y-6">
//           <motion.div
//             className="flex items-start gap-4"
//             style={{
//               transform: isHovered ? "translateZ(40px)" : "translateZ(0px)",
//               transition: "transform 0.3s ease-out",
//             }}
//           >
//             <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm shadow-neon relative overflow-hidden group-hover:shadow-neon-intense transition-all duration-300">
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
//               {getIcon(label)}
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold text-white mb-2 text-shadow">{label}</h2>
//               <p className="text-indigo-200 text-shadow-sm text-sm">{subLabel}</p>
//             </div>
//           </motion.div>
//           <motion.div
//             className="flex justify-between items-end"
//             style={{
//               transform: isHovered ? "translateZ(60px)" : "translateZ(0px)",
//               transition: "transform 0.3s ease-out",
//             }}
//           >
//             <p className="text-white/80 text-sm max-w-[70%]">{description}</p>
//             <Button className="rounded-full bg-white/10 text-white hover:bg-white/20 w-12 h-12 backdrop-blur-sm shadow-neon group-hover:shadow-neon-intense transition-all duration-300 relative overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
//               <ArrowRight className="w-6 h-6 relative z-10" />
//             </Button>
//           </motion.div>
//         </div>

//         {/* Glowing lines */}
//         <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
//         <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-50" />
//       </motion.div>

//       <style jsx>{`
//         .text-shadow {
//           text-shadow: 0 0 10px rgba(255,255,255,0.5);
//         }
//         .text-shadow-sm {
//           text-shadow: 0 0 5px rgba(255,255,255,0.3);
//         }
//         .shadow-neon {
//           box-shadow: 0 0 5px theme('colors.indigo.500'),
//                       0 0 20px theme('colors.purple.500');
//         }
//         .shadow-neon-intense {
//           box-shadow: 0 0 10px theme('colors.indigo.500'),
//                       0 0 30px theme('colors.purple.500'),
//                       0 0 50px theme('colors.pink.500');
//         }
//         .animate-border-flow {
//           animation: borderFlow 8s linear infinite;
//         }
//         .animate-shimmer {
//           animation: shimmer 2s linear infinite;
//         }
//         @keyframes borderFlow {
//           0% {
//             background-position: 0% 50%;
//           }
//           100% {
//             background-position: 200% 50%;
//           }
//         }
//         @keyframes shimmer {
//           from {
//             transform: translateX(-100%);
//           }
//           to {
//             transform: translateX(100%);
//           }
//         }
//         .bg-hexagon-pattern {
//           background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 L15 0 L45 0 L60 30 L45 60 L15 60 Z' fill='none' stroke='white' stroke-opacity='0.1'/%3E%3C/svg%3E");
//           background-size: 60px 60px;
//         }
//       `}</style>
//     </motion.div>
//   )
// }

// export default DoubleGradientCard

// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { ArrowRight, MessageSquareIcon as MessageSquareAuto, BrainCircuit, Sparkles } from "lucide-react"

// type Props = {
//   id: string
//   label: string
//   subLabel: string
//   description: string
// }

// const DoubleGradientCard = ({ label, subLabel, description }: Props) => {
//   const [isHovered, setIsHovered] = useState(false)

//   const getIcon = (label: string) => {
//     switch (label) {
//       case "Set-up Auto Replies":
//         return <MessageSquareAuto className="w-10 h-10 text-indigo-300" />
//       case "Answer Questions with AI":
//         return <BrainCircuit className="w-10 h-10 text-purple-300" />
//       case "Give quality replies":
//         return <Sparkles className="w-10 h-10 text-pink-300" />
//       default:
//         return null
//     }
//   }

//   return (
//     <motion.div
//       className="relative p-0.5 rounded-2xl overflow-hidden shadow-2xl group perspective-1000"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//       style={{
//         transformStyle: "preserve-3d",
//       }}
//     >
//       {/* Glowing border effect */}
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-75 animate-border-flow" />

//       {/* Inner content area with glassmorphism effect  */}
//       <motion.div
//         className="relative p-6 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl rounded-xl overflow-hidden h-full"
//         style={{
//           transformStyle: "preserve-3d",
//           transform: isHovered ? "rotateY(10deg) rotateX(5deg)" : "rotateY(0deg) rotateX(0deg)",
//           transition: "transform 0.3s ease-out",
//         }}
//       >
//         {/* Hexagonal grid background */}
//         <div className="absolute inset-0 bg-hexagon-pattern opacity-10" />

//         {/* Content */}
//         <div className="relative z-10 flex flex-col gap-y-6">
//           <motion.div
//             className="flex items-start gap-4"
//             style={{
//               transform: isHovered ? "translateZ(40px)" : "translateZ(0px)",
//               transition: "transform 0.3s ease-out",
//             }}
//           >
//             <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm shadow-neon relative overflow-hidden group-hover:shadow-neon-intense transition-all duration-300">
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
//               {getIcon(label)}
//             </div>
//             <div>
//               <h3 className="text-2xl font-bold text-white mb-2 text-shadow">{label}</h3>
//               <h5 className="text-indigo-200 text-shadow-sm text-sm">{subLabel}</h5>
//             </div>
//           </motion.div>
//           <motion.div
//             className="flex justify-between items-end"
//             style={{
//               transform: isHovered ? "translateZ(60px)" : "translateZ(0px)",
//               transition: "transform 0.3s ease-out",
//             }}
//           >
//             <h6 className="text-white/80 text-sm max-w-[70%]">{description}</h6>
//             <Button className="rounded-full bg-white/10 text-white hover:bg-white/20 w-12 h-12 backdrop-blur-sm shadow-neon group-hover:shadow-neon-intense transition-all duration-300 relative overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
//               <ArrowRight className="w-6 h-6 relative z-10" />
//             </Button>
//           </motion.div>
//         </div>

//         {/* Glowing lines */}
//         <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
//         <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-50" />
//       </motion.div>

//       <style jsx>{`
//         .text-shadow {
//           text-shadow: 0 0 10px rgba(255,255,255,0.5);
//         }
//         .text-shadow-sm {
//           text-shadow: 0 0 5px rgba(255,255,255,0.3);
//         }
//         .shadow-neon {
//           box-shadow: 0 0 5px theme('colors.indigo.500'),
//                       0 0 20px theme('colors.purple.500');
//         }
//         .shadow-neon-intense {
//           box-shadow: 0 0 10px theme('colors.indigo.500'),
//                       0 0 30px theme('colors.purple.500'),
//                       0 0 50px theme('colors.pink.500');
//         }
//         .animate-border-flow {
//           animation: borderFlow 8s linear infinite;
//         }
//         .animate-shimmer {
//           animation: shimmer 4s linear infinite;
//         }
//         @keyframes borderFlow {
//           0% {
//             background-position: 0% 50%;
//           }
//           100% {
//             background-position: 200% 50%;
//           }
//         }
//         @keyframes shimmer {
//           from {
//             transform: translateX(-100%);
//           }
//           to {
//             transform: translateX(100%);
//           }
//         }
//         .bg-hexagon-pattern {
//           background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 L15 0 L45 0 L60 30 L45 60 L15 60 Z' fill='none' stroke='white' stroke-opacity='0.1'/%3E%3C/svg%3E");
//           background-size: 60px 60px;
//         }
//       `}</style>
//     </motion.div>
//   )
// }

// export default DoubleGradientCard

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquareIcon as MessageSquareAuto, BrainCircuit, Sparkles } from "lucide-react"

type Props = {
  id: string
  label: string
  subLabel: string
  description: string
}

const DoubleGradientCard = ({ label, subLabel, description }: Props) => {
  const [isHovered, setIsHovered] = useState(false)

  const getIcon = (label: string) => {
    switch (label) {
      case "Set-up Auto Replies":
        return <MessageSquareAuto className="w-10 h-10 text-blue-300" />
      case "Answer Questions with AI":
        return <BrainCircuit className="w-10 h-10 text-blue-300" />
      case "Give quality replies":
        return <Sparkles className="w-10 h-10 text-blue-300" />
      default:
        return null
    }
  }

  return (
    <motion.div
      className="relative p-0.5 rounded-2xl overflow-hidden shadow-2xl group perspective-1000"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Solid blue border effect */}
      <div className="absolute inset-0 bg-blue-500 opacity-75" />

      {/* Inner content area with dark background */}
      <motion.div
        className="relative p-6 bg-black/60 backdrop-blur-xl rounded-xl overflow-hidden h-full"
        style={{
          transformStyle: "preserve-3d",
          transform: isHovered ? "rotateY(10deg) rotateX(5deg)" : "rotateY(0deg) rotateX(0deg)",
          transition: "transform 0.3s ease-out",
        }}
      >
        {/* Hexagonal grid background */}
        <div className="absolute inset-0 bg-hexagon-pattern opacity-10" />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-y-6">
          <motion.div
            className="flex items-start gap-4"
            style={{
              transform: isHovered ? "translateZ(40px)" : "translateZ(0px)",
              transition: "transform 0.3s ease-out",
            }}
          >
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm shadow-blue relative overflow-hidden group-hover:shadow-blue-intense transition-all duration-300">
              <div className="absolute inset-0 bg-blue-500/10 animate-pulse" />
              {getIcon(label)}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 text-shadow">{label}</h3>
              <h5 className="text-blue-200 text-shadow-sm text-sm">{subLabel}</h5>
            </div>
          </motion.div>
          <motion.div
            className="flex justify-between items-end"
            style={{
              transform: isHovered ? "translateZ(60px)" : "translateZ(0px)",
              transition: "transform 0.3s ease-out",
            }}
          >
            <h6 className="text-white/80 text-sm max-w-[70%]">{description}</h6>
            <Button className="rounded-full bg-white/10 text-white hover:bg-blue-500/20 w-12 h-12 backdrop-blur-sm shadow-blue group-hover:shadow-blue-intense transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/10 animate-pulse" />
              <ArrowRight className="w-6 h-6 relative z-10" />
            </Button>
          </motion.div>
        </div>

        {/* Blue accent lines */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-blue-500 opacity-50" />
        <div className="absolute top-0 right-0 w-px h-full bg-blue-500 opacity-50" />
      </motion.div>

      <style jsx>{`
        .text-shadow {
          text-shadow: 0 0 10px rgba(255,255,255,0.5);
        }
        .text-shadow-sm {
          text-shadow: 0 0 5px rgba(255,255,255,0.3);
        }
        .shadow-blue {
          box-shadow: 0 0 5px theme('colors.blue.500'),
                      0 0 20px theme('colors.blue.500');
        }
        .shadow-blue-intense {
          box-shadow: 0 0 10px theme('colors.blue.500'),
                      0 0 30px theme('colors.blue.500'),
                      0 0 50px theme('colors.blue.500');
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }
        .bg-hexagon-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 L15 0 L45 0 L60 30 L45 60 L15 60 Z' fill='none' stroke='white' strokeOpacity='0.1'/%3E%3C/svg%3E");
          background-size: 60px 60px;
        }
      `}</style>
    </motion.div>
  )
}

export default DoubleGradientCard

