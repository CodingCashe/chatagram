// 'use client'

// import { useState, useEffect } from 'react'
// import { Button } from "@/components/ui/button"
// import { ArrowRight, MessageSquare, Zap, BarChart } from 'lucide-react'
// import Link from 'next/link'

// export default function Hero() {
//   const [animationStep, setAnimationStep] = useState(0)

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setAnimationStep((prev) => (prev + 1) % 4)
//     }, 3000)
//     return () => clearInterval(timer)
//   }, [])

//   return (
//     <section className="py-10 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between overflow-hidden">
//       <div className="max-w-2xl mb-10 lg:mb-0 z-10">
//         <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
//           Revolutionize Your <span className="text-[#2563EB]">Instagram DMs</span> with AI-Powered Automation
//         </h1>
//         <p className="text-xl text-gray-600 mb-8">
//           Boost engagement, save time, and grow your audience with Chatal cutting-edge DM automation tools.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4">
//           <Button size="lg" className="bg-[#2563EB] hover:bg-[#2563EB]">
//           <Link href="/dashboard">Get Started</Link> <ArrowRight className="ml-2 h-5 w-5" />
//           </Button>
//           <Button size="lg" variant="outline">
//             Watch Demo
//           </Button>
//         </div>
//       </div>
//       <div className="w-full max-w-lg relative">
//         <InstagramAutomationSVG animationStep={animationStep} />
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-4">
//           <FeatureBubble icon={MessageSquare} label="Smart Replies" delay={0} />
//           <FeatureBubble icon={Zap} label="Instant Automation" delay={1} />
//           <FeatureBubble icon={BarChart} label="Detailed Analytics" delay={2} />
//         </div>
//       </div>
//     </section>
//   )
// }

// function InstagramAutomationSVG({ animationStep }: { animationStep: number }) {
//   return (
//     <svg viewBox="0 0 400 300" className="w-full h-auto filter drop-shadow-xl">
//       <defs>
//         <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" stopColor="#833AB4" />
//           <stop offset="50%" stopColor="#FD1D1D" />
//           <stop offset="100%" stopColor="#FCB045" />
//         </linearGradient>
//         <filter id="glow">
//           <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
//           <feMerge>
//             <feMergeNode in="coloredBlur"/>
//             <feMergeNode in="SourceGraphic"/>
//           </feMerge>
//         </filter>
//       </defs>
//       <rect x="50" y="50" width="300" height="200" rx="20" fill="#fff" stroke="url(#grad1)" strokeWidth="4" />
//       <circle cx="200" cy="100" r="30" fill="url(#grad1)" filter="url(#glow)">
//         <animate attributeName="r" values="30;32;30" dur="2s" repeatCount="indefinite" />
//       </circle>
//       <path d="M185 95 h30 M200 80 v30" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
//       <g className="messages">
//         <g transform={`translate(${animationStep === 0 ? 0 : -400}, 0)`}>
//           <rect x="80" y="150" width="240" height="40" rx="10" fill="#f3f4f6" />
//           <circle cx="100" cy="170" r="10" fill="#833AB4" />
//           <rect x="120" y="165" width="180" height="10" rx="5" fill="#e5e7eb" />
//           <path d="M340 170 l-20 -10 v20 z" fill="url(#grad1)">
//             <animate attributeName="opacity" values="0;1;0" dur="1s" begin={`${animationStep * 0.75}s`} repeatCount="1" />
//           </path>
//         </g>
//         <g transform={`translate(${animationStep === 1 ? 0 : 400}, 30)`}>
//           <rect x="80" y="150" width="240" height="40" rx="10" fill="#f3f4f6" />
//           <circle cx="100" cy="170" r="10" fill="#FD1D1D" />
//           <rect x="120" y="165" width="140" height="10" rx="5" fill="#e5e7eb" />
//           <path d="M340 170 l-20 -10 v20 z" fill="url(#grad1)">
//             <animate attributeName="opacity" values="0;1;0" dur="1s" begin={`${animationStep * 0.75 + 0.25}s`} repeatCount="1" />
//           </path>
//         </g>
//       </g>
//       <circle cx="320" cy="70" r="15" fill="#FCB045">
//         <animate attributeName="r" values="15;17;15" dur="2s" repeatCount="indefinite" />
//       </circle>
//       <path d="M313 70 h14 M320 63 v14" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
//     </svg>
//   )
// }

// function FeatureBubble({ icon: Icon, label, delay }: { icon: React.ElementType, label: string, delay: number }) {
//   return (
//     <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg flex items-center justify-center flex-col animate-bounce" style={{ animationDelay: `${delay * 0.2}s` }}>
//       <Icon className="h-8 w-8 text-[#2563EB]" />
//       <span className="text-xs font-semibold mt-1 text-gray-800">{label}</span>
//     </div>
//   )
// }

// import { Button } from "@/components/ui/button"
// import { ArrowRight, Wifi, Battery, Signal, Phone, Video, Info, Image, Heart, Smile } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import Link from 'next/link'


// export default function Hero() {
//   return (
//     <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
//       <div className="container relative px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:px-8">
//         <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
//           <div className="max-w-2xl">
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-8">
//               <span className="flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-purple-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
//               </span>
//               <span className="text-sm font-medium text-purple-900 dark:text-purple-300">AI-Powered Automation</span>
//             </div>

//             <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
//               Transform Your Instagram DM Experience
//             </h1>
//             <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
//               Harness the power of AI to automate your Instagram messages. Engage with your audience 24/7, convert more
//               leads, and scale your business effortlessly.
//             </p>

//             <div className="flex flex-wrap gap-4">
//               <Button
//                 size="lg"
//                 className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg"
//               >
//                 <Link href="/dashboard">Get Started</Link> <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//               <Button variant="outline" size="lg" className="text-lg">
//                 Watch Demo
//               </Button>
//             </div>
//           </div>

//           <div className="relative lg:mt-0">
//             {/* Mobile Device Frame (visible on small screens) */}
//             <div className="relative lg:hidden">
//               <div className="mx-auto w-[280px] rounded-[3rem] bg-white dark:bg-gray-800 p-2 shadow-xl">
//                 {/* Status Bar */}
//                 <div className="relative rounded-[2rem] shadow-inner">
//                   <div className="px-4 py-2 flex items-center justify-between text-[10px] text-gray-900 dark:text-gray-100">
//                     <span>9:41</span>
//                     <div className="flex items-center gap-1">
//                       <Signal className="w-3 h-3" />
//                       <Wifi className="w-3 h-3" />
//                       <Battery className="w-4 h-4" />
//                     </div>
//                   </div>

//                   {/* Instagram DM Header */}
//                   <div className="border-b border-gray-200 dark:border-gray-700">
//                     <div className="px-4 py-2 flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <Avatar className="h-8 w-8">
//                           <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
//                           <AvatarFallback>AI</AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <div className="font-semibold text-sm">AI Assistant</div>
//                           <div className="text-xs text-green-600">Active now</div>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-4">
//                         <Phone className="w-4 h-4" />
//                         <Video className="w-4 h-4" />
//                         <Info className="w-4 h-4" />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Chat Content */}
//                   <div className="p-4 space-y-4">
//                     <div className="flex gap-3">
//                       <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-3 max-w-[80%]">
//                         <p className="text-sm text-gray-800 dark:text-gray-100">
//                           Hi! I'm your AI assistant. I can help automate your Instagram DMs and boost engagement. What
//                           would you like to know? 👋
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex gap-3 justify-end">
//                       <div className="bg-purple-500 text-white rounded-2xl p-3 max-w-[80%]">
//                         <p className="text-sm">I'm interested in automating my Instagram DMs for my business.</p>
//                       </div>
//                     </div>
//                     <div className="flex gap-3">
//                       <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-3 max-w-[80%]">
//                         <p className="text-sm text-gray-800 dark:text-gray-100">
//                           Great choice! Our AI can handle customer inquiries, schedule appointments, and qualify leads
//                           24/7. Would you like to see a demo? ✨
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Message Input */}
//                   <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//                     <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
//                       <Smile className="w-5 h-5 text-gray-500" />
//                       <input
//                         type="text"
//                         placeholder="Message..."
//                         className="bg-transparent text-sm flex-1 focus:outline-none"
//                       />
//                       <div className="flex items-center gap-2">
//                         <Image className="w-5 h-5 text-gray-500" />
//                         <Heart className="w-5 h-5 text-gray-500" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Desktop Monitor Frame (visible on large screens) */}
//             <div className="hidden lg:block relative">
//               {/* Monitor Frame */}
//               <div className="relative mx-auto">
//                 {/* Monitor Bezel */}
//                 <div className="bg-gray-900 rounded-2xl p-4 shadow-xl">
//                   {/* Monitor Screen */}
//                   <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-inner">
//                     {/* Camera & Brand */}
//                     <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-gray-900 rounded-b-lg flex items-center justify-center">
//                       <div className="w-2 h-2 rounded-full bg-gray-800 ring-2 ring-gray-700"></div>
//                     </div>

//                     {/* Screen Content */}
//                     <div className="pt-4">
//                       {/* Instagram DM Header */}
//                       <div className="border-b border-gray-200 dark:border-gray-700">
//                         <div className="px-6 py-4 flex items-center justify-between">
//                           <div className="flex items-center gap-4">
//                             <Avatar className="h-10 w-10">
//                               <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
//                               <AvatarFallback>AI</AvatarFallback>
//                             </Avatar>
//                             <div>
//                               <div className="font-semibold">AI Assistant</div>
//                               <div className="text-sm text-green-600">Active now</div>
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-6">
//                             <Phone className="w-5 h-5" />
//                             <Video className="w-5 h-5" />
//                             <Info className="w-5 h-5" />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Chat Content */}
//                       <div className="p-6">
//                         <div className="space-y-4">
//                           <div className="flex gap-3">
//                             <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4 max-w-[80%]">
//                               <p className="text-lg text-gray-800 dark:text-gray-100">
//                                 Hi! I'm your AI assistant. I can help automate your Instagram DMs and boost engagement.
//                                 What would you like to know? 👋
//                               </p>
//                             </div>
//                           </div>
//                           <div className="flex gap-3 justify-end">
//                             <div className="bg-purple-500 text-white rounded-2xl p-4 max-w-[80%]">
//                               <p className="text-lg">I'm interested in automating my Instagram DMs for my business.</p>
//                             </div>
//                           </div>
//                           <div className="flex gap-3">
//                             <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4 max-w-[80%]">
//                               <p className="text-lg text-gray-800 dark:text-gray-100">
//                                 Great choice! Our AI can handle customer inquiries, schedule appointments, and qualify
//                                 leads 24/7. Would you like to see a demo? ✨
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Message Input */}
//                       <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
//                         <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 rounded-full px-6 py-3">
//                           <Smile className="w-6 h-6 text-gray-500" />
//                           <input
//                             type="text"
//                             placeholder="Message..."
//                             className="bg-transparent text-lg flex-1 focus:outline-none"
//                           />
//                           <div className="flex items-center gap-3">
//                             <Image className="w-6 h-6 text-gray-500" />
//                             <Heart className="w-6 h-6 text-gray-500" />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Monitor Stand */}
//                 <div className="relative mx-auto">
//                   <div className="absolute left-1/2 transform -translate-x-1/2 w-32 h-4 bg-gray-800 rounded-t-lg"></div>
//                   <div className="absolute left-1/2 transform -translate-x-1/2 w-48 h-2 bg-gray-900 rounded-lg mt-4"></div>
//                   <div className="absolute left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gray-900 rounded-lg mt-6"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// import { Button } from "@/components/ui/button"
// import { ArrowRight, Wifi, Battery, Signal, Phone, Video, Info, Image, Heart, Smile } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import Link from 'next/link'

// export default function Hero() {
//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
//       {/* Subtle gradient orbs */}
//       <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
//       <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
//       <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

//       <div className="container relative px-4 py-24 mx-auto sm:px-6 lg:px-8">
//         <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center">
//           <div className="max-w-2xl">
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-md mb-8">
//               <span className="flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-purple-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
//               </span>
//               <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 AI-Powered Automation
//               </span>
//             </div>

//             <h1 className="text-4xl font-bold tracking-tight sm:text-6xl xl:text-7xl text-gray-900 dark:text-white mb-8">
//               Transform Your{" "}
//               <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 Instagram DM
//               </span>{" "}
//               Experience
//             </h1>

//             <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
//               Harness the power of AI to automate your Instagram messages. Engage with your audience, convert more
//               leads, and scale your business effortlessly.
//             </p>

//             <div className="flex flex-wrap gap-4">
//               <Button
//                 size="lg"
//                 className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 text-white text-lg h-12 px-8"
//               >
//                 <Link href="/dashboard">Get Started</Link> <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="text-lg border-2 h-12 px-8 hover:bg-gray-50 dark:hover:bg-gray-800"
//               >
//                 Watch Demo
//               </Button>
//             </div>
//           </div>

//           <div className="relative lg:mt-0">
//             {/* Mobile Device Frame (visible on small screens) */}
//             <div className="relative lg:hidden">
//               <div className="mx-auto w-[280px] rounded-[3rem] bg-white dark:bg-gray-800 p-2 shadow-[0_0_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_60px_-15px_rgba(255,255,255,0.05)]">
//                 {/* Status Bar */}
//                 <div className="relative rounded-[2rem] shadow-inner">
//                   <div className="px-4 py-2 flex items-center justify-between text-[10px] text-gray-900 dark:text-gray-100">
//                     <span>6:39</span>
//                     <div className="flex items-center gap-1">
//                       <Signal className="w-3 h-3" />
//                       <Wifi className="w-3 h-3" />
//                       <Battery className="w-4 h-4" />
//                     </div>
//                   </div>

//                   {/* Instagram DM Header */}
//                   <div className="border-b border-gray-200 dark:border-gray-700">
//                     <div className="px-4 py-2 flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <Avatar className="h-8 w-8">
//                           <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
//                           <AvatarFallback>AI</AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <div className="font-semibold text-sm">AI Assistant</div>
//                           <div className="text-xs text-green-600">Active now</div>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-4">
//                         <Phone className="w-4 h-4" />
//                         <Video className="w-4 h-4" />
//                         <Info className="w-4 h-4" />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Chat Content */}
//                   <div className="p-4 space-y-4">
//                     <div className="flex gap-3">
//                       <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-3 max-w-[80%]">
//                         <p className="text-sm text-gray-800 dark:text-gray-100">
//                           Hi! I am your AI assistant. I can help automate your Instagram DMs and boost engagement. What
//                           would you like to know? 👋
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex gap-3 justify-end">
//                       <div className="bg-purple-500 text-white rounded-2xl p-3 max-w-[80%]">
//                         <p className="text-sm">I am interested in automating my Instagram DMs for my business.</p>
//                       </div>
//                     </div>
//                     <div className="flex gap-3">
//                       <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-3 max-w-[80%]">
//                         <p className="text-sm text-gray-800 dark:text-gray-100">
//                           Great choice! Our AI can handle customer inquiries, schedule appointments, and qualify leads
//                           . Would you like to see a demo? ✨
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Message Input */}
//                   <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//                     <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
//                       <Smile className="w-5 h-5 text-gray-500" />
//                       <input
//                         type="text"
//                         placeholder="Message..."
//                         className="bg-transparent text-sm flex-1 focus:outline-none"
//                       />
//                       <div className="flex items-center gap-2">
//                         <Image className="w-5 h-5 text-gray-500" />
//                         <Heart className="w-5 h-5 text-gray-500" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Desktop Monitor Frame (visible on large screens) */}
//             <div className="hidden lg:block relative">
//               {/* Monitor Frame */}
//               <div className="relative mx-auto">
//                 {/* Monitor Bezel */}
//                 <div className="bg-[#1A1C1E] rounded-2xl p-4 shadow-[0_0_80px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_0_80px_-15px_rgba(255,255,255,0.05)]">
//                   {/* Monitor Screen */}
//                   <div className="relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-inner">
//                     {/* Camera & Brand */}
//                     <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-[#1A1C1E] rounded-b-lg flex items-center justify-center gap-3">
//                       <div className="w-1.5 h-1.5 rounded-full bg-black/30 dark:bg-white/30"></div>
//                       <div className="w-1.5 h-1.5 rounded-full bg-green-500/50"></div>
//                     </div>

//                     {/* Screen Content - Rest remains the same */}
//                     <div className="pt-6">
//                       {/* Instagram DM Header */}
//                       <div className="border-b border-gray-100 dark:border-gray-800">
//                         <div className="px-8 py-4 flex items-center justify-between">
//                           <div className="flex items-center gap-4">
//                             <Avatar className="h-12 w-12 ring-2 ring-purple-100 dark:ring-purple-900">
//                               <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
//                               <AvatarFallback>AI</AvatarFallback>
//                             </Avatar>
//                             <div>
//                               <div className="font-semibold text-lg text-gray-900 dark:text-white">AI Assistant</div>
//                               <div className="text-sm text-green-600 flex items-center gap-1.5">
//                                 <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
//                                 Active now
//                               </div>
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-6">
//                             <Phone className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors" />
//                             <Video className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors" />
//                             <Info className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors" />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Chat Content */}
//                       <div className="p-8">
//                         <div className="space-y-6">
//                           <div className="flex gap-3">
//                             <Avatar className="h-8 w-8">
//                               <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
//                               <AvatarFallback>AI</AvatarFallback>
//                             </Avatar>
//                             <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 max-w-[80%] shadow-sm">
//                               <p className="text-lg text-gray-900 dark:text-gray-100">
//                                 Hi! I am your AI assistant. I can help automate your Instagram DMs and boost engagement.
//                                 What would you like to know? 👋
//                               </p>
//                             </div>
//                           </div>
//                           <div className="flex gap-3 justify-end">
//                             <div className="bg-purple-500 text-white rounded-2xl p-4 max-w-[80%] shadow-sm">
//                               <p className="text-lg">I am interested in automating my Instagram DMs for my business.</p>
//                             </div>
//                           </div>
//                           <div className="flex gap-3">
//                             <Avatar className="h-8 w-8">
//                               <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
//                               <AvatarFallback>AI</AvatarFallback>
//                             </Avatar>
//                             <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 max-w-[80%] shadow-sm">
//                               <p className="text-lg text-gray-900 dark:text-gray-100">
//                                 Great choice! Our AI can handle customer inquiries, schedule appointments, and qualify
//                                 leads 24/7. Would you like to see a demo? ✨
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Message Input */}
//                       <div className="px-8 py-6 border-t border-gray-100 dark:border-gray-800">
//                         <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 rounded-full px-6 py-3 shadow-sm">
//                           <Smile className="w-6 h-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors" />
//                           <input
//                             type="text"
//                             placeholder="Message..."
//                             className="bg-transparent text-lg flex-1 focus:outline-none text-gray-600 dark:text-gray-300 placeholder-gray-400"
//                           />
//                           <div className="flex items-center gap-4">
//                             <Image className="w-6 h-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors" />
//                             <Heart className="w-6 h-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors" />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Monitor Stand - Made more subtle */}
//                 <div className="relative mx-auto">
//                   <div className="absolute left-1/2 transform -translate-x-1/2 -mt-1 w-32 h-6 bg-[#1A1C1E] rounded-t-lg"></div>
//                   <div className="absolute left-1/2 transform -translate-x-1/2 w-48 h-1.5 bg-[#1A1C1E] rounded-lg mt-5"></div>
//                   <div className="absolute left-1/2 transform -translate-x-1/2 w-64 h-1 bg-[#1A1C1E] rounded-lg mt-6"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// import { Button } from "@/components/ui/button"
// import { ArrowRight, Wifi, Battery, Signal, Phone, Video, Info, Image, Heart, Smile } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import Link from 'next/link'

// export default function Hero() {
//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
//       {/* Subtle gradient orbs */}
//       <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
//       <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
//       <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

//       <div className="container relative px-4 py-24 mx-auto sm:px-6 lg:px-8">
//         <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center">
//           <div className="max-w-2xl">
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md mb-8">
//               <span className="flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-purple-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
//               </span>
//               <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 AI-Powered Automation
//               </span>
//             </div>

//             <h1 className="text-4xl font-bold tracking-tight sm:text-6xl xl:text-7xl text-gray-900 mb-8">
//               Transform Your{" "}
//               <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 Instagram DM
//               </span>{" "}
//               Experience
//             </h1>

//             <p className="text-xl text-gray-600 mb-10 leading-relaxed">
//               Harness the power of AI to automate your Instagram messages. Engage with your audience 24/7, convert more
//               leads, and scale your business effortlessly.
//             </p>

//             <div className="flex flex-wrap gap-4">
//               <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white text-lg h-12 px-8">
//               <Link href="/dashboard">Get Started</Link> <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//               <Button variant="outline" size="lg" className="text-lg border-2 h-12 px-8 hover:bg-gray-50">
//                 Watch Demo
//               </Button>
//             </div>
//           </div>

//           <div className="relative lg:mt-0">
//             {/* Mobile Device Frame (visible on small screens) */}
//             <div className="relative lg:hidden">
//               <div className="mx-auto w-[280px] rounded-[3rem] bg-white p-2 shadow-[0_0_60px_-15px_rgba(0,0,0,0.1)]">
//                 {/* Status Bar */}
//                 <div className="relative rounded-[2rem] shadow-inner">
//                   <div className="px-4 py-2 flex items-center justify-between text-[10px] text-gray-900">
//                     <span>9:41</span>
//                     <div className="flex items-center gap-1">
//                       <Signal className="w-3 h-3" />
//                       <Wifi className="w-3 h-3" />
//                       <Battery className="w-4 h-4" />
//                     </div>
//                   </div>

//                   {/* Instagram DM Header */}
//                   <div className="border-b border-gray-200">
//                     <div className="px-4 py-2 flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <Avatar className="h-8 w-8">
//                           <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
//                           <AvatarFallback>AI</AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <div className="font-semibold text-sm">AI Assistant</div>
//                           <div className="text-xs text-green-600">Active now</div>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-4">
//                         <Phone className="w-4 h-4" />
//                         <Video className="w-4 h-4" />
//                         <Info className="w-4 h-4" />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Chat Content */}
//                   <div className="p-4 space-y-4">
//                     <div className="flex gap-3">
//                       <div className="bg-gray-100 rounded-2xl p-3 max-w-[80%]">
//                         <p className="text-sm text-gray-800">
//                           Hi! I am your AI assistant. I can help automate your Instagram DMs and boost engagement. What
//                           would you like to know? 👋
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex gap-3 justify-end">
//                       <div className="bg-purple-500 text-white rounded-2xl p-3 max-w-[80%]">
//                         <p className="text-sm">I am interested in automating my Instagram DMs for my business.</p>
//                       </div>
//                     </div>
//                     <div className="flex gap-3">
//                       <div className="bg-gray-100 rounded-2xl p-3 max-w-[80%]">
//                         <p className="text-sm text-gray-800">
//                           Great choice! Our AI can handle customer inquiries, schedule appointments, and qualify leads
//                           24/7. Would you like to see a demo? ✨
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Message Input */}
//                   <div className="p-4 border-t border-gray-200">
//                     <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
//                       <Smile className="w-5 h-5 text-gray-500" />
//                       <input
//                         type="text"
//                         placeholder="Message..."
//                         className="bg-transparent text-sm flex-1 focus:outline-none"
//                       />
//                       <div className="flex items-center gap-2">
//                         <Image className="w-5 h-5 text-gray-500" />
//                         <Heart className="w-5 h-5 text-gray-500" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Desktop Monitor Frame (visible on large screens) */}
//             <div className="hidden lg:block relative">
//               {/* Monitor Frame */}
//               <div className="relative mx-auto">
//                 {/* Monitor Bezel */}
//                 <div className="bg-[#1A1C1E] rounded-2xl p-4 shadow-[0_0_80px_-15px_rgba(0,0,0,0.3)]">
//                   {/* Monitor Screen */}
//                   <div className="relative bg-white rounded-xl overflow-hidden shadow-inner">
//                     {/* Camera & Brand */}
//                     <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-[#1A1C1E] rounded-b-lg flex items-center justify-center gap-3">
//                       <div className="w-1.5 h-1.5 rounded-full bg-black/30"></div>
//                       <div className="w-1.5 h-1.5 rounded-full bg-green-500/50"></div>
//                     </div>

//                     {/* Screen Content */}
//                     <div className="pt-6">
//                       {/* Instagram DM Header */}
//                       <div className="border-b border-gray-100">
//                         <div className="px-8 py-4 flex items-center justify-between">
//                           <div className="flex items-center gap-4">
//                             <Avatar className="h-12 w-12 ring-2 ring-purple-100">
//                               <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
//                               <AvatarFallback>AI</AvatarFallback>
//                             </Avatar>
//                             <div>
//                               <div className="font-semibold text-lg text-gray-900">AI Assistant</div>
//                               <div className="text-sm text-green-600 flex items-center gap-1.5">
//                                 <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
//                                 Active now
//                               </div>
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-6">
//                             <Phone className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
//                             <Video className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
//                             <Info className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Chat Content */}
//                       <div className="p-8">
//                         <div className="space-y-6">
//                           <div className="flex gap-3">
//                             <Avatar className="h-8 w-8">
//                               <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
//                               <AvatarFallback>AI</AvatarFallback>
//                             </Avatar>
//                             <div className="bg-gray-100 rounded-2xl p-4 max-w-[80%] shadow-sm">
//                               <p className="text-lg text-gray-900">
//                                 Hi! I am your AI assistant. I can help automate your Instagram DMs and boost engagement.
//                                 What would you like to know? 👋
//                               </p>
//                             </div>
//                           </div>
//                           <div className="flex gap-3 justify-end">
//                             <div className="bg-purple-500 text-white rounded-2xl p-4 max-w-[80%] shadow-sm">
//                               <p className="text-lg">I am interested in automating my Instagram DMs for my business.</p>
//                             </div>
//                           </div>
//                           <div className="flex gap-3">
//                             <Avatar className="h-8 w-8">
//                               <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
//                               <AvatarFallback>AI</AvatarFallback>
//                             </Avatar>
//                             <div className="bg-gray-100 rounded-2xl p-4 max-w-[80%] shadow-sm">
//                               <p className="text-lg text-gray-900">
//                                 Great choice! Our AI can handle customer inquiries, schedule appointments, and qualify
//                                 leads 24/7. Would you like to see a demo? ✨
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Message Input */}
//                       <div className="px-8 py-6 border-t border-gray-100">
//                         <div className="flex items-center gap-4 bg-gray-100 rounded-full px-6 py-3 shadow-sm">
//                           <Smile className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
//                           <input
//                             type="text"
//                             placeholder="Message..."
//                             className="bg-transparent text-lg flex-1 focus:outline-none text-gray-600 placeholder-gray-400"
//                           />
//                           <div className="flex items-center gap-4">
//                             <Image className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
//                             <Heart className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Monitor Stand */}
//                 <div className="relative mx-auto">
//                   <div className="absolute left-1/2 transform -translate-x-1/2 -mt-1 w-32 h-6 bg-[#1A1C1E] rounded-t-lg"></div>
//                   <div className="absolute left-1/2 transform -translate-x-1/2 w-48 h-1.5 bg-[#1A1C1E] rounded-lg mt-5"></div>
//                   <div className="absolute left-1/2 transform -translate-x-1/2 w-64 h-1 bg-[#1A1C1E] rounded-lg mt-6"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// import { Button } from "@/components/ui/button"
// import {
//   ArrowRight,
//   Wifi,
//   Battery,
//   Signal,
//   Phone,
//   Video,
//   Info,
//   Image,
//   Heart,
//   Smile,
//   MessageSquareCode,
// } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import Link from 'next/link'

// export default function Hero() {
//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
//       {/* Subtle gradient orbs */}
//       <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
//       <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
//       <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

//       <div className="container relative px-4 py-24 mx-auto sm:px-6 lg:px-8">
//         {/* Logo */}
//         <div className="absolute top-8 left-4 sm:left-6 lg:left-8 flex items-center gap-2">
//           <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
//             <MessageSquareCode className="h-6 w-6 text-white" />
//           </div>
//           <div>
//             <h2 className="font-bold text-xl text-gray-900">DMGenius</h2>
//             <p className="text-xs text-gray-600">AI Instagram Assistant</p>
//           </div>
//         </div>

//         <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center">
//           <div className="max-w-2xl">
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md mb-8">
//               <span className="flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-purple-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
//               </span>
//               <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 AI-Powered Automation
//               </span>
//             </div>

//             <h1 className="text-4xl font-bold tracking-tight sm:text-6xl xl:text-7xl text-gray-900 mb-8">
//               Transform Your{" "}
//               <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 Instagram DM
//               </span>{" "}
//               Experience
//             </h1>

//             <p className="text-xl text-gray-600 mb-10 leading-relaxed">
//               Harness the power of AI to automate your Instagram messages. Engage with your audience 24/7, convert more
//               leads, and scale your business effortlessly.
//             </p>

//             <div className="flex flex-wrap gap-4">
//               <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white text-lg h-12 px-8">
//               <Link href="/dashboard">Get Started</Link> <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//               <Button variant="outline" size="lg" className="text-lg border-2 h-12 px-8 hover:bg-gray-50">
//                 Watch Demo
//               </Button>
//             </div>
//           </div>

//           <div className="relative lg:mt-0">
//             {/* Mobile Device Frame (visible on small screens) */}
//             <div className="relative lg:hidden">
//               <div className="mx-auto w-[280px] rounded-[3rem] bg-white p-2 shadow-[0_0_60px_-15px_rgba(0,0,0,0.1)]">
//                 {/* Status Bar */}
//                 <div className="relative rounded-[2rem] shadow-inner">
//                   <div className="px-4 py-2 flex items-center justify-between text-[10px] text-gray-900">
//                     <span>9:41</span>
//                     <div className="flex items-center gap-1">
//                       <Signal className="w-3 h-3" />
//                       <Wifi className="w-3 h-3" />
//                       <Battery className="w-4 h-4" />
//                     </div>
//                   </div>

//                   {/* Instagram DM Header */}
//                   <div className="border-b border-gray-200">
//                     <div className="px-4 py-2 flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <Avatar className="h-8 w-8">
//                           <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
//                           <AvatarFallback>AI</AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <div className="font-semibold text-sm">AI Assistant</div>
//                           <div className="text-xs text-green-600">Active now</div>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-4">
//                         <Phone className="w-4 h-4" />
//                         <Video className="w-4 h-4" />
//                         <Info className="w-4 h-4" />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Chat Content */}
//                   <div className="p-4 space-y-4">
//                     <div className="flex gap-3">
//                       <div className="bg-gray-100 rounded-2xl p-3 max-w-[80%]">
//                         <p className="text-sm text-gray-800">
//                           Hi! I am your AI assistant. I can help automate your Instagram DMs and boost engagement. What
//                           would you like to know? 👋
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex gap-3 justify-end">
//                       <div className="bg-purple-500 text-white rounded-2xl p-3 max-w-[80%]">
//                         <p className="text-sm">I am interested in automating my Instagram DMs for my business.</p>
//                       </div>
//                     </div>
//                     <div className="flex gap-3">
//                       <div className="bg-gray-100 rounded-2xl p-3 max-w-[80%]">
//                         <p className="text-sm text-gray-800">
//                           Great choice! Our AI can handle customer inquiries, schedule appointments, and qualify leads
//                           24/7. Would you like to see a demo? ✨
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Message Input */}
//                   <div className="p-4 border-t border-gray-200">
//                     <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
//                       <Smile className="w-5 h-5 text-gray-500" />
//                       <input
//                         type="text"
//                         placeholder="Message..."
//                         className="bg-transparent text-sm flex-1 focus:outline-none"
//                       />
//                       <div className="flex items-center gap-2">
//                         <Image className="w-5 h-5 text-gray-500" />
//                         <Heart className="w-5 h-5 text-gray-500" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Desktop Monitor Frame (visible on large screens) */}
//             <div className="hidden lg:block relative">
//               {/* Monitor Frame */}
//               <div className="relative mx-auto">
//                 {/* Monitor Bezel */}
//                 <div className="bg-[#1A1C1E] rounded-2xl p-4 shadow-[0_0_80px_-15px_rgba(0,0,0,0.3)]">
//                   {/* Monitor Screen */}
//                   <div className="relative bg-white rounded-xl overflow-hidden shadow-inner">
//                     {/* Camera & Brand */}
//                     <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-[#1A1C1E] rounded-b-lg flex items-center justify-center gap-3">
//                       <div className="w-1.5 h-1.5 rounded-full bg-black/30"></div>
//                       <div className="w-1.5 h-1.5 rounded-full bg-green-500/50"></div>
//                     </div>

//                     {/* Screen Content */}
//                     <div className="pt-6">
//                       {/* Instagram DM Header */}
//                       <div className="border-b border-gray-100">
//                         <div className="px-8 py-4 flex items-center justify-between">
//                           <div className="flex items-center gap-4">
//                             <Avatar className="h-12 w-12 ring-2 ring-purple-100">
//                               <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
//                               <AvatarFallback>AI</AvatarFallback>
//                             </Avatar>
//                             <div>
//                               <div className="font-semibold text-lg text-gray-900">AI Assistant</div>
//                               <div className="text-sm text-green-600 flex items-center gap-1.5">
//                                 <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
//                                 Active now
//                               </div>
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-6">
//                             <Phone className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
//                             <Video className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
//                             <Info className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Chat Content */}
//                       <div className="p-8">
//                         <div className="space-y-6">
//                           <div className="flex gap-3">
//                             <Avatar className="h-8 w-8">
//                               <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
//                               <AvatarFallback>AI</AvatarFallback>
//                             </Avatar>
//                             <div className="bg-gray-100 rounded-2xl p-4 max-w-[80%] shadow-sm">
//                               <p className="text-lg text-gray-900">
//                                 Hi! I am your AI assistant. I can help automate your Instagram DMs and boost engagement.
//                                 What would you like to know? 👋
//                               </p>
//                             </div>
//                           </div>
//                           <div className="flex gap-3 justify-end">
//                             <div className="bg-purple-500 text-white rounded-2xl p-4 max-w-[80%] shadow-sm">
//                               <p className="text-lg">I am interested in automating my Instagram DMs for my business.</p>
//                             </div>
//                           </div>
//                           <div className="flex gap-3">
//                             <Avatar className="h-8 w-8">
//                               <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
//                               <AvatarFallback>AI</AvatarFallback>
//                             </Avatar>
//                             <div className="bg-gray-100 rounded-2xl p-4 max-w-[80%] shadow-sm">
//                               <p className="text-lg text-gray-900">
//                                 Great choice! Our AI can handle customer inquiries, schedule appointments, and qualify
//                                 leads 24/7. Would you like to see a demo? ✨
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Message Input */}
//                       <div className="px-8 py-6 border-t border-gray-100">
//                         <div className="flex items-center gap-4 bg-gray-100 rounded-full px-6 py-3 shadow-sm">
//                           <Smile className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
//                           <input
//                             type="text"
//                             placeholder="Message..."
//                             className="bg-transparent text-lg flex-1 focus:outline-none text-gray-600 placeholder-gray-400"
//                           />
//                           <div className="flex items-center gap-4">
//                             <Image className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
//                             <Heart className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Monitor Stand */}
//                 <div className="relative mx-auto">
//                   <div className="absolute left-1/2 transform -translate-x-1/2 -mt-1 w-32 h-6 bg-[#1A1C1E] rounded-t-lg"></div>
//                   <div className="absolute left-1/2 transform -translate-x-1/2 w-48 h-1.5 bg-[#1A1C1E] rounded-lg mt-5"></div>
//                   <div className="absolute left-1/2 transform -translate-x-1/2 w-64 h-1 bg-[#1A1C1E] rounded-lg mt-6"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { Button } from "@/components/ui/button"
import { ArrowRight, Wifi, Battery, Signal, Phone, Video, Info, Image, Heart, Smile } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'


export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Subtle gradient orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container relative px-4 py-10 mx-auto sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md mb-8">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#3352CC] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3352CC]"></span>
              </span>
              <span className="text-sm font-medium text-[#3352CC]">AI-Powered Automation</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl xl:text-7xl text-gray-900 mb-8">
              Transform Your <span className="text-[#3352CC]">Instagram DM</span> Experience
            </h1>

            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Harness the power of AI to automate your Instagram messages. Engage with your audience 24/7, convert more
              leads, and scale your business effortlessly.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-[#3352CC] hover:bg-[#2842A0] text-white text-lg h-12 px-8">
              <Link href="/dashboard">Get Started</Link> <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg border-2 h-12 px-8 hover:bg-gray-50">
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="relative lg:mt-0">
            {/* Mobile Device Frame (visible on small screens) */}
            <div className="relative lg:hidden">
              <div className="mx-auto w-[280px] rounded-[3rem] bg-white p-2 shadow-[0_0_60px_-15px_rgba(0,0,0,0.1)]">
                {/* Status Bar */}
                <div className="relative rounded-[2rem] shadow-inner">
                  <div className="px-3 py-1.5 flex items-center justify-between text-[10px] text-gray-900">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <Signal className="w-3 h-3" />
                      <Wifi className="w-3 h-3" />
                      <Battery className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Instagram DM Header */}
                  <div className="border-b border-gray-200">
                    <div className="px-3 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-sm">AI Assistant</div>
                          <div className="text-xs text-green-600">Active now</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4" />
                        <Video className="w-4 h-4" />
                        <Info className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Chat Content */}
                  <div className="p-3 space-y-3">
                    <div className="flex gap-2">
                      <div className="bg-gray-100 rounded-2xl p-2.5 max-w-[80%]">
                        <p className="text-sm text-gray-800">
                          Hi! I am your AI assistant. I can help automate your Instagram DMs and boost engagement. What
                          would you like to know? 👋
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <div className="bg-[#3352CC] text-white rounded-2xl p-2.5 max-w-[80%]">
                        <p className="text-sm">I am interested in automating my Instagram DMs for my business.</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-gray-100 rounded-2xl p-2.5 max-w-[80%]">
                        <p className="text-sm text-gray-800">
                          Great choice! Our AI can handle customer inquiries, schedule appointments, and qualify leads
                          24/7. Would you like to see a demo? ✨
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-3 border-t border-gray-200">
                    <div className="relative flex items-center bg-gray-100 rounded-full w-full overflow-hidden">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Smile className="w-5 h-5 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        placeholder="Message..."
                        className="bg-transparent text-sm w-full px-11 py-1.5 focus:outline-none"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <Image className="w-5 h-5 text-gray-500" />
                        <Heart className="w-5 h-5 text-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Monitor Frame (visible on large screens) */}
            <div className="hidden lg:block relative">
              {/* Monitor Frame */}
              <div className="relative mx-auto max-w-2xl">
                {/* Monitor Bezel */}
                <div className="bg-[#1A1C1E] rounded-xl p-2 shadow-[0_0_60px_-15px_rgba(0,0,0,0.2)]">
                  {/* Monitor Screen */}
                  <div className="relative bg-white rounded-lg overflow-hidden shadow-inner">
                    {/* Camera & Brand */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-14 h-2.5 bg-[#1A1C1E] rounded-b-md flex items-center justify-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-black/30"></div>
                      <div className="w-1 h-1 rounded-full bg-green-500/50"></div>
                    </div>

                    {/* Rest of the screen content remains the same */}
                    <div className="pt-4">
                      {/* Instagram DM Header */}
                      <div className="border-b border-gray-100">
                        <div className="px-6 py-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 ring-2 ring-[#3352CC]/10">
                              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
                              <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold text-base text-gray-900">AI Assistant</div>
                              <div className="text-sm text-green-600 flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                Active now
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Phone className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
                            <Video className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
                            <Info className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
                          </div>
                        </div>
                      </div>

                      {/* Chat Content */}
                      <div className="p-6">
                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
                              <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                            <div className="bg-gray-100 rounded-2xl p-3 max-w-[80%] shadow-sm">
                              <p className="text-base text-gray-900">
                                Hi! I am your AI assistant. I can help automate your Instagram DMs and boost engagement.
                                What would you like to know? 👋
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 justify-end">
                            <div className="bg-[#3352CC] text-white rounded-2xl p-3 max-w-[80%] shadow-sm">
                              <p className="text-base">
                                I am interested in automating my Instagram DMs for my business.
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
                              <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                            <div className="bg-gray-100 rounded-2xl p-3 max-w-[80%] shadow-sm">
                              <p className="text-base text-gray-900">
                                Great choice! Our AI can handle customer inquiries, schedule appointments, and qualify
                                leads 24/7. Would you like to see a demo? ✨
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Message Input */}
                      <div className="px-6 py-4 border-t border-gray-100">
                        <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2 shadow-sm">
                          <Smile className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
                          <input
                            type="text"
                            placeholder="Message..."
                            className="bg-transparent text-base flex-1 focus:outline-none text-gray-600 placeholder-gray-400"
                          />
                          <div className="flex items-center gap-3">
                            <Image className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
                            <Heart className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thinner Monitor Stand */}
                <div className="relative mx-auto">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -mt-0.5 w-24 h-4 bg-[#1A1C1E] rounded-t-md"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-32 h-1 bg-[#1A1C1E] rounded-md mt-4"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-40 h-0.5 bg-[#1A1C1E] rounded-md mt-5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

