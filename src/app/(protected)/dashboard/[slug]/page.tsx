// import DoubleGradientCard from '@/components/global/double-gradient-card'
// import { DASHBOARD_CARDS } from '@/constants/dashboard'
// import { BarDuoToneBlue } from '@/icons'
// import React from 'react'
// import Chart from './_components/metrics'
// import MetricsCard from './_components/metrics/metrics-card'

// type Props = {}

// const Page = (props: Props) => {

//   return (
//     <div className="flex flex-col gap-y-10">
//       <div className="flex gap-5 lg:flex-row flex-col">
//         {DASHBOARD_CARDS.map((card) => (
//           <DoubleGradientCard
//             key={card.id}
//             {...card}
//           />
//         ))}
//       </div>
//       <div className="border-[1px] relative border-in-active/50 p-5 rounded-xl">
//         <span className="flex gap-x-1 z-50 items-center">
//           <BarDuoToneBlue />
//           <div className="z-50">
//             <h2 className="text-2xl font-medium text-white">
//               Automated Activity
//             </h2>
//             <p className="text-text-secondary text-sm">
//               Automated 0 out of 1 interactions
//             </p>
//           </div>
//         </span>
//         <div className="w-full flex lg:flex-row flex-col gap-5">
//           <div className="lg:w-6/12">
//             <Chart />
//           </div>
//           <div className="lg:w-6/12">
//             <MetricsCard />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Page


// 'use client'

// import React from 'react'
// import { BarDuoToneBlue } from '@/icons'
// import DoubleGradientCard from '@/components/global/double-gradient-card'
// import { DASHBOARD_CARDS } from '@/constants/dashboard'
// import EnhancedChart from '@/components/global/dashboard/EnhancedChart'
// import EnhancedMetricsCard from '@/components/global/dashboard/EnhancedMetricsCard'
// import ActivityFeed from '@/components/global/dashboard/ActivityFeed'
// import AIPerformance from '@/components/global/dashboard/AIPerformance'
// import TaskProgress from '@/components/global/dashboard/TaskProgress'

// const Page = () => {
//   return (
//     <div className="flex flex-col gap-y-10">
//       <div className="flex gap-5 lg:flex-row flex-col">
//         {DASHBOARD_CARDS.map((card) => (
//           <DoubleGradientCard
//             key={card.id}
//             {...card}
//           />
//         ))}
//       </div>
      
//       <div className="border-[1px] relative border-in-active/50 p-5 rounded-xl">
//         <span className="flex gap-x-1 z-50 items-center mb-5">
//           <BarDuoToneBlue />
//           <div className="z-50">
//             <h2 className="text-2xl font-medium text-white">
//               Automated Activity
//             </h2>
//             <p className="text-text-secondary text-sm">
//               Automated 0 out of 1 interactions
//             </p>
//           </div>
//         </span>
//         <div className="w-full flex lg:flex-row flex-col gap-5">
//           <div className="lg:w-6/12">
//             <EnhancedChart />
//           </div>
//           <div className="lg:w-6/12">
//             <EnhancedMetricsCard />
//           </div>
//         </div>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <ActivityFeed />
//         <div className="space-y-6">
//           <AIPerformance />
//           <TaskProgress />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Page

// 'use client'

// import React from 'react'
// import { BarDuoToneBlue } from '@/icons'
// import DoubleGradientCard from '@/components/global/double-gradient-card'
// import { DASHBOARD_CARDS } from '@/constants/dashboard'
// import EnhancedChart from './_components/dash/EnhancedChart'
// import EnhancedMetricsCard from './_components/dash/EnhancedMetricsCard'
// import ActivityFeed from './_components/dash/ActivityFeed'
// import AIPerformance from './_components/dash/AIPerformance'
// import TaskProgress from './_components/dash/TaskProgress'
// import ContentSuggestions from './_components/dash/ContentSuggestions'
// import { motion } from 'framer-motion'

// const Page = () => {
//   return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="flex flex-col gap-y-10"
//     >
//       <div className="flex gap-5 lg:flex-row flex-col">
//         {DASHBOARD_CARDS.map((card, index) => (
//           <motion.div
//             key={card.id}
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <DoubleGradientCard {...card} />
//           </motion.div>
//         ))}
//       </div>
      
//       <motion.div 
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="border-[1px] relative border-in-active/50 p-5 rounded-xl"
//       >
//         <span className="flex gap-x-1 z-50 items-center mb-5">
//           <BarDuoToneBlue />
//           <div className="z-50">
//             <h2 className="text-2xl font-medium text-white">
//               Automated Activity
//             </h2>
//             <p className="text-text-secondary text-sm">
//               Automated 0 out of 1 interactions
//             </p>
//           </div>
//         </span>
//         <div className="w-full flex lg:flex-row flex-col gap-5">
//           <div className="lg:w-6/12">
//             <EnhancedChart />
//           </div>
//           <div className="lg:w-6/12">
//             <EnhancedMetricsCard />
//           </div>
//         </div>
//       </motion.div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <motion.div
//           initial={{ x: -50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <ActivityFeed />
//         </motion.div>
//         <motion.div
//           initial={{ x: 50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <AIPerformance />
//         </motion.div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <motion.div
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >         
//         </motion.div>
//         <motion.div
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           <ContentSuggestions />
//         </motion.div>
//       </div>

//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <TaskProgress />
//       </motion.div>
//     </motion.div>
//   )
// }

// export default Page

// 'use client'

// import React, { useState } from 'react'
// import { BarDuoToneBlue } from '@/icons'
// import DoubleGradientCard from '@/components/global/double-gradient-card'
// import { DASHBOARD_CARDS } from '@/constants/dashboard'
// import EnhancedChart from './_components/dash/EnhancedChart'
// import EnhancedMetricsCard from './_components/dash/EnhancedMetricsCard'
// import ActivityFeed from './_components/dash/ActivityFeed'
// import AIPerformance from './_components/dash/AIPerformance'
// import TaskProgress from './_components/dash/TaskProgress'
// import ContentSuggestions from './_components/dash/ContentSuggestions'
// import SentimentAnalysis from './_components/dash/SentimentAnalysis'
// import EngagementPredictor from './_components/dash/EngagementPredictor'
// import HashtagCloud from './_components/dash/HashtagCloud'
// import ContentCalendarGenerator from './_components/dash/ContentCalendarGenerator'
// import { Button } from '@/components/ui/button'
// import { ArrowUpDown } from 'lucide-react'

// const Page = () => {
//   const [expanded, setExpanded] = useState(false)

//   return (
//     <div className="flex flex-col gap-y-10">
//       <div className="flex gap-5 lg:flex-row flex-col">
//         {DASHBOARD_CARDS.map((card) => (
//           <DoubleGradientCard
//             key={card.id}
//             {...card}
//           />
//         ))}
//       </div>
      
//       <div className="border-[1px] relative border-in-active/50 p-5 rounded-xl">
//         <span className="flex gap-x-1 z-50 items-center mb-5">
//           <BarDuoToneBlue />
//           <div className="z-50">
//             <h2 className="text-2xl font-medium text-white">
//               Automated Activity
//             </h2>
//             <p className="text-text-secondary text-sm">
//               Automated 0 out of 1 interactions
//             </p>
//           </div>
//         </span>
//         <div className="w-full flex lg:flex-row flex-col gap-5">
//           <div className="lg:w-6/12">
//             <EnhancedChart />
//           </div>
//           <div className="lg:w-6/12">
//             <EnhancedMetricsCard />
//           </div>
//         </div>
//       </div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <ActivityFeed />
//         <AIPerformance />
//       </div>

//       <ContentCalendarGenerator />

//       {expanded && (
//         <>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">           
//             <ContentSuggestions />
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <SentimentAnalysis />
//             <EngagementPredictor />
//           </div>

//           <HashtagCloud />
//         </>
//       )}

//       <div className="flex justify-center">
//         <Button
//           onClick={() => setExpanded(!expanded)}
//           variant="outline"
//           size="lg"
//         >
//           <ArrowUpDown className="mr-2 h-4 w-4" />
//           {expanded ? 'Show Less' : 'Show More'}
//         </Button>
//       </div>

//       <TaskProgress />
//     </div>
//   )
// }

// export default Page



// 'use client'

// import React, { useState } from 'react'
// import { BarDuoToneBlue } from '@/icons'
// import DoubleGradientCard from '@/components/global/double-gradient-card'
// import { DASHBOARD_CARDS } from '@/constants/dashboard'
// import EnhancedChart from './_components/dash/EnhancedChart'
// import EnhancedMetricsCard from './_components/dash/EnhancedMetricsCard'
// import ActivityFeed from './_components/dash/ActivityFeed'
// import AIPerformance from './_components/dash/AIPerformance'
// import TaskProgress from './_components/dash/TaskProgress'
// import ContentSuggestions from './_components/dash/ContentSuggestions'
// import SentimentAnalysis from './_components/dash/SentimentAnalysis'
// import EngagementPredictor from './_components/dash/EngagementPredictor'
// import HashtagCloud from './_components/dash/HashtagCloud'
// import ContentCalendarGenerator from './_components/dash/ContentCalendarGenerator'
// import VisualContentGenerator from './_components/dash/VisualContentGenerator'
// import InstagramPostOptimizer from './_components/dash/InstagramPostOptimizer'
// import { Button } from '@/components/ui/button'
// import { ArrowUpDown } from 'lucide-react'

// const Page = () => {
//   const [expanded, setExpanded] = useState(false)

//   return (
//     <div className="flex flex-col gap-y-10">
//       <div className="flex gap-5 lg:flex-row flex-col">
//         {DASHBOARD_CARDS.map((card) => (
//           <DoubleGradientCard
//             key={card.id}
//             {...card}
//           />
//         ))}
//       </div>
      
//       <div className="border-[1px] relative border-in-active/50 p-5 rounded-xl">
//         <span className="flex gap-x-1 z-50 items-center mb-5">
//           <BarDuoToneBlue />
//           <div className="z-50">
//             <h2 className="text-2xl font-medium text-white">
//               Automated Activity
//             </h2>
//             <p className="text-text-secondary text-sm">
//               Automated 0 out of 1 interactions
//             </p>
//           </div>
//         </span>
//         <div className="w-full flex lg:flex-row flex-col gap-5">
//           <div className="lg:w-6/12">
//             <EnhancedChart />
//           </div>
//           <div className="lg:w-6/12">
//             <EnhancedMetricsCard />
//           </div>
//         </div>
//       </div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <ActivityFeed />
//         <AIPerformance />
//       </div>

//       <InstagramPostOptimizer />

//       <ContentCalendarGenerator />

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <HashtagCloud />
//         <VisualContentGenerator />
//       </div>

//       {expanded && (
//         <>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">           
//             <ContentSuggestions />
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <SentimentAnalysis />
//             <EngagementPredictor />
//           </div>
//         </>
//       )}

//       <div className="flex justify-center">
//         <Button
//           onClick={() => setExpanded(!expanded)}
//           variant="outline"
//           size="lg"
//         >
//           <ArrowUpDown className="mr-2 h-4 w-4" />
//           {expanded ? 'Show Less' : 'Show More'}
//         </Button>
//       </div>

//       <TaskProgress />
//     </div>
//   )
// }

// export default Page

// 'use client'

// import React, { useState, useEffect } from 'react'
// import { BarDuoToneBlue } from '@/icons'
// import DoubleGradientCard from '@/components/global/double-gradient-card'
// import { DASHBOARD_CARDS } from '@/constants/dashboard'
// import EnhancedChart from './_components/dash/EnhancedChart'
// import EnhancedMetricsCard from './_components/dash/EnhancedMetricsCard'
// import ActivityFeed from './_components/dash/ActivityFeed'
// import AIPerformance from './_components/dash/AIPerformance'
// import TaskProgress from './_components/dash/TaskProgress'
// import { Button } from '@/components/ui/button'
// import { ArrowUpDown } from 'lucide-react'
// import InstagramIntegrationPopup from './_components/dash/InstagramIntegrationPopup'
// import { useQuery } from '@tanstack/react-query'
// import { onUserInfo } from '@/actions/user'

// const Page = () => {
//   const [expanded, setExpanded] = useState(false)
//   const [showPopup, setShowPopup] = useState(false)
//   const [popupCount, setPopupCount] = useState(0)

//   const { data: userData } = useQuery({
//     queryKey: ['user-profile'],
//     queryFn: onUserInfo,
//   })

//   const isInstagramIntegrated = userData?.data?.integrations.some(
//     (integration) => integration.name === 'INSTAGRAM'
//   )

//   useEffect(() => {
//     if (!isInstagramIntegrated && popupCount < 2) {
//       const timer1 = setTimeout(() => {
//         setShowPopup(true)
//         setPopupCount((prev) => prev + 1)
//       }, 30000) // Show first popup after 30 seconds

//       const timer2 = setTimeout(() => {
//         setShowPopup(true)
//         setPopupCount((prev) => prev + 1)
//       }, 90000) // Show second popup after 90 seconds

//       return () => {
//         clearTimeout(timer1)
//         clearTimeout(timer2)
//       }
//     }
//   }, [isInstagramIntegrated, popupCount])

//   return (
//     <div className="flex flex-col gap-y-10">
//       {/* Existing dashboard content */}
//       <div className="flex gap-5 lg:flex-row flex-col">
//         {DASHBOARD_CARDS.map((card) => (
//           <DoubleGradientCard
//             key={card.id}
//             {...card}
//           />
//         ))}
//       </div>
    
      
//       {/* ... (rest of the existing content) */}
//       <div className="border-[1px] relative border-in-active/50 p-5 rounded-xl">
//         <span className="flex gap-x-1 z-50 items-center mb-5">
//           <BarDuoToneBlue />
//           <div className="z-50">
//             <h2 className="text-2xl font-medium text-white">
//               Engagement Analytics
//             </h2>
//             <p className="text-text-secondary text-sm">
//               Monitor Your Dms in real time
//             </p>
//           </div>
//         </span>
//         <div className="w-full flex lg:flex-row flex-col gap-5">
//           <div className="lg:w-6/12">
//             <EnhancedChart />
//           </div>
//           <div className="lg:w-6/12">
//             <EnhancedMetricsCard />
//           </div>
//         </div>
//       </div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <ActivityFeed />
//         <AIPerformance />
//       </div>

//       <TaskProgress />

//       <InstagramIntegrationPopup
//         isOpen={showPopup}
//         onClose={() => setShowPopup(false)}
//       />
//     </div>
//   )
// }

// export default Page

// 'use client'

// import React, { useState, useEffect, Suspense } from 'react'
// import { BarDuoToneBlue } from '@/icons'
// import DoubleGradientCard from '@/components/global/double-gradient-card'
// import { DASHBOARD_CARDS } from '@/constants/dashboard'
// import EnhancedChart from './_components/dash/EnhancedChart'
// import EnhancedMetricsCard from './_components/dash/EnhancedMetricsCard'
// import ActivityFeed from './_components/dash/ActivityFeed'
// import AIPerformance from './_components/dash/AIPerformance'
// import TaskProgress from './_components/dash/TaskProgress'
// import InstagramIntegrationPopup from './_components/dash/InstagramIntegrationPopup'
// import { useQuery } from '@tanstack/react-query'
// import { onUserInfo } from '@/actions/user'
// import { AutomationOverview } from './_components/dash/automation-overview'
// import { KeywordPerformance } from './_components/dash/keyword-performance'
// import { RecentActivity } from './_components/dash/recent-activity'
// import { ResponseTracker } from './_components/dash/response-tracker'
// import { ChatHistory } from './_components/dash/chat-history'

// const Page = () => {
//   const [showPopup, setShowPopup] = useState(false)
//   const [popupCount, setPopupCount] = useState(0)

//   const { data: userData } = useQuery({
//     queryKey: ['user-profile'],
//     queryFn: onUserInfo,
//   })

//   const isInstagramIntegrated = userData?.data?.integrations.some(
//     (integration) => integration.name === 'INSTAGRAM'
//   )

//   useEffect(() => {
//     if (!isInstagramIntegrated && popupCount < 2) {
//       const timer1 = setTimeout(() => {
//         setShowPopup(true)
//         setPopupCount((prev) => prev + 1)
//       }, 30000) // Show first popup after 30 seconds

//       const timer2 = setTimeout(() => {
//         setShowPopup(true)
//         setPopupCount((prev) => prev + 1)
//       }, 90000) // Show second popup after 90 seconds

//       return () => {
//         clearTimeout(timer1)
//         clearTimeout(timer2)
//       }
//     }
//   }, [isInstagramIntegrated, popupCount])

//   return (
//     <div className="flex flex-col gap-y-10">
//       <div className="flex gap-5 lg:flex-row flex-col">
//         {DASHBOARD_CARDS.map((card) => (
//           <DoubleGradientCard
//             key={card.id}
//             {...card}
//           />
//         ))}
//       </div>
      
//       <div className="border-[1px] relative border-in-active/50 p-5 rounded-xl">
//         <span className="flex gap-x-1 z-50 items-center mb-5">
//           <BarDuoToneBlue />
//           <div className="z-50">
//             <h2 className="text-2xl font-medium text-white">
//               Engagement Analytics
//             </h2>
//             <p className="text-text-secondary text-sm">
//               Monitor Your DMs in real time
//             </p>
//           </div>
//         </span>
//         <div className="w-full flex lg:flex-row flex-col gap-5">
//           <div className="lg:w-6/12">
//             <EnhancedChart />
//           </div>
//           <div className="lg:w-6/12">
//             <EnhancedMetricsCard />
//           </div>
//         </div>
//       </div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Suspense fallback={<div>Loading automation overview...</div>}>
//           <AutomationOverview />
//         </Suspense>
//         <Suspense fallback={<div>Loading keyword performance...</div>}>
//           <KeywordPerformance />
//         </Suspense>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <Suspense fallback={<div>Loading recent activity...</div>}>
//           <RecentActivity />
//         </Suspense>
//         <Suspense fallback={<div>Loading response tracker...</div>}>
//           <ResponseTracker />
//         </Suspense>
//         <Suspense fallback={<div>Loading chat history...</div>}>
//           <ChatHistory />
//         </Suspense>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <ActivityFeed />
//         <AIPerformance />
//       </div>

//       <TaskProgress />

//       {/* <InstagramIntegrationPopup
//         isOpen={showPopup}
//         onClose={() => setShowPopup(false)}
//       /> */}
//     </div>
//   )
// }

// export default Page

// import { Suspense } from 'react'
// import { RecentKeywords } from "./_components/newdash/recent-keywords"
// import { getDashboardData } from "@/actions/dashboard/dashboard"
// import { onCurrentUser } from "@/actions/user"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { AutomationList } from "./_components/newdash/automation-list"
// import { RecentDms } from "./_components/newdash/recent-dms"
// import { ActiveConversations } from "./_components/newdash/active-conversations"
// import { BarDuoToneBlue } from '@/icons'
// import DoubleGradientCard from '@/components/global/double-gradient-card'
// import { DASHBOARD_CARDS } from '@/constants/dashboard'
// import EnhancedChart from './_components/dash/EnhancedChart'
// import EnhancedMetricsCard from './_components/dash/EnhancedMetricsCard'
// import ActivityFeed from './_components/dash/ActivityFeed'
// import AIPerformance from './_components/dash/AIPerformance'
// import TaskProgress from './_components/dash/TaskProgress'
// import { AutomationOverview } from './_components/dash/automation-overview'
// import { KeywordPerformance } from './_components/dash/keyword-performance'
// import { RecentActivity } from './_components/dash/recent-activity'
// import { ResponseTracker } from './_components/dash/response-tracker'
// import { ChatHistory } from './_components/dash/chat-history'
// //import InstagramIntegrationPopupWrapper from './_components/dash/InstagramIntegrationPopupWrapper'

// export default async function DashboardPage() {
//   const user = await onCurrentUser()
//   const dashboardData = await getDashboardData(user.id)
//   return (
//     <div className="flex flex-col gap-y-10">
//       <div className="flex gap-5 lg:flex-row flex-col">
//         {DASHBOARD_CARDS.map((card) => (
//           <DoubleGradientCard
//             key={card.id}
//             {...card}
//           />
//         ))}
//       </div>
      
//       <div className="border-[1px] relative border-in-active/50 p-5 rounded-xl">
//         <span className="flex gap-x-1 z-50 items-center mb-5">
//           <BarDuoToneBlue />
//           <div className="z-50">
//             <h2 className="text-2xl font-medium text-white">
//               Engagement Analytics
//             </h2>
//             <p className="text-text-secondary text-sm">
//               Monitor Your DMs in real time
//             </p>
//           </div>
//         </span>
//         <div className="w-full flex lg:flex-row flex-col gap-5">
//           <div className="lg:w-6/12">
//             <EnhancedChart />
//           </div>
//           <div className="lg:w-6/12">
//             <EnhancedMetricsCard />
//           </div>
//         </div>
//       </div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Suspense fallback={<div>Loading automation overview...</div>}>
//           <AutomationOverview />
//         </Suspense>
//         <Suspense fallback={<div>Loading keyword performance...</div>}>
//           <KeywordPerformance />
//         </Suspense>
//       </div>

//       <div className="container mx-auto p-6 space-y-6">
//         <h1 className="text-3xl font-bold text-white mb-6">Instagram Bot Dashboard</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <Suspense fallback={<Card className="w-full h-[300px] animate-pulse bg-gray-800" />}>
//             <AutomationList automations={dashboardData.automations} />
//           </Suspense>
//           <Suspense fallback={<Card className="w-full h-[300px] animate-pulse bg-gray-800" />}>
//             <RecentDms dms={dashboardData.recentDms} automations={dashboardData.automations} />
//           </Suspense>
//           <Suspense fallback={<Card className="w-full h-[200px] animate-pulse bg-gray-800" />}>
//             <ActiveConversations count={dashboardData.activeConversations} />
//           </Suspense>
//           <Suspense fallback={<Card className="w-full h-[200px] animate-pulse bg-gray-800" />}>
//             <RecentKeywords keywords={dashboardData.recentKeywords} />
//           </Suspense>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <Suspense fallback={<div>Loading recent activity...</div>}>
//           <RecentActivity />
//         </Suspense>
//         <Suspense fallback={<div>Loading response tracker...</div>}>
//           <ResponseTracker />
//         </Suspense>
//         <Suspense fallback={<div>Loading chat history...</div>}>
//           <ChatHistory />
//         </Suspense>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <ActivityFeed />
//         <AIPerformance />
//       </div>

//       <TaskProgress />

//       {/* <InstagramIntegrationPopupWrapper /> */}
//     </div>
//   )
// }


// import { Suspense } from "react"
// import { RecentKeywords } from "./_components/newdash/recent-keywords"
// import { getDashboardData } from "@/actions/dashboard/dashboard"
// import { onCurrentUser } from "@/actions/user"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { AutomationList } from "./_components/newdash/automation-list"
// import { RecentDms } from "./_components/newdash/recent-dms"
// import { ActiveConversations } from "./_components/newdash/active-conversations"
// import { BarDuoToneBlue } from "@/icons"
// import DoubleGradientCard from "@/components/global/double-gradient-card"
// import { DASHBOARD_CARDS } from "@/constants/dashboard"
// import EnhancedChart from "./_components/dash/EnhancedChart"
// import EnhancedMetricsCard from "./_components/dash/EnhancedMetricsCard"
// import ActivityFeed from "./_components/dash/ActivityFeed"
// import HashtagCloud from './_components/dash/HashtagCloud'
// import TaskProgress from "./_components/dash/TaskProgress"
// import { AutomationOverview } from "./_components/dash/automation-overview"
// import { KeywordPerformance } from "./_components/dash/keyword-performance"
// import { RecentActivity } from "./_components/dash/recent-activity"
// import { ResponseTracker } from "./_components/dash/response-tracker"
// import { ChatHistory } from "./_components/dash/chat-history"
// //import InstagramIntegrationPopupWrapper from './_components/dash/InstagramIntegrationPopupWrapper'

// export default async function DashboardPage() {
//   const user = await onCurrentUser()
//   const dashboardData = await getDashboardData(user.id)
//   return (
//     <div className="flex flex-col gap-y-10">
//       <div className="flex gap-5 lg:flex-row flex-col">
//         {DASHBOARD_CARDS.map((card) => (
//           <DoubleGradientCard key={card.id} {...card} />
//         ))}
//       </div>

//       <div className="border-[1px] relative border-in-active/50 p-5 rounded-xl">
//         <span className="flex gap-x-1 z-50 items-center mb-5">
//           <BarDuoToneBlue />
//           <div className="z-50">
//             <h2 className="text-2xl font-medium text-white">Engagement Analytics</h2>
//             <p className="text-text-secondary text-sm">Monitor Your DMs in real time</p>
//           </div>
//         </span>
//         <div className="w-full flex lg:flex-row flex-col gap-5">
//           <div className="lg:w-6/12">
//             <EnhancedChart />
//           </div>
//           <div className="lg:w-6/12">
//             <EnhancedMetricsCard />
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Suspense fallback={<div>Loading automation overview...</div>}>
//           <AutomationOverview />
//         </Suspense>
//         <Suspense fallback={<div>Loading keyword performance...</div>}>
//           <KeywordPerformance />
//         </Suspense>
//       </div>

//       <div className="container mx-auto p-6 space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <Suspense fallback={<Card className="w-full h-[300px] animate-pulse bg-gray-800" />}>
//             <AutomationList automations={dashboardData.automations} />
//           </Suspense>
//           <Suspense fallback={<Card className="w-full h-[300px] animate-pulse bg-gray-800" />}>
//             <RecentDms dms={dashboardData.recentDms} automations={dashboardData.automations} />
//           </Suspense>
//           <Suspense fallback={<Card className="w-full h-[200px] animate-pulse bg-gray-800" />}>
//             <ActiveConversations count={dashboardData.activeConversations} />
//           </Suspense>
//           <Suspense fallback={<Card className="w-full h-[200px] animate-pulse bg-gray-800" />}>
//             <RecentKeywords keywords={dashboardData.recentKeywords} />
//           </Suspense>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <Suspense fallback={<div>Loading recent activity...</div>}>
//           <RecentActivity />
//         </Suspense>
//         <Suspense fallback={<div>Loading response tracker...</div>}>
//           <ResponseTracker />
//         </Suspense>
//         <Suspense fallback={<div>Loading chat history...</div>}>
//           <ChatHistory />
//         </Suspense>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <ActivityFeed />
//         <HashtagCloud />
//       </div>
//       <TaskProgress />

//       {/* <InstagramIntegrationPopupWrapper /> */}
//     </div>
//   )
// }

// import { Suspense } from "react"
// import { RecentKeywords } from "./_components/newdash/recent-keywords"
// import { getDashboardData } from "@/actions/dashboard/dashboard"
// import { onCurrentUser } from "@/actions/user"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { AutomationList } from "./_components/newdash/automation-list"
// import { RecentDms } from "./_components/newdash/recent-dms"
// import { ActiveConversations } from "./_components/newdash/active-conversations"
// import { BarDuoToneBlue } from "@/icons"
// import DoubleGradientCard from "@/components/global/double-gradient-card"
// import { DASHBOARD_CARDS } from "@/constants/dashboard"
// import EnhancedMetricsCard from "./_components/dash/EnhancedMetricsCard"
// import ActivityFeed from "./_components/dash/ActivityFeed"
// import AIPerformance from "./_components/dash/AIPerformance"
// import TaskProgress from "./_components/dash/TaskProgress"
// // import { AutomationOverview } from "./_components/dash/automation-overview"
// // import { KeywordPerformance } from "./_components/dash/keyword-performance"
// import { RecentActivity } from "./_components/dash/recent-activity"
// import { ResponseTracker } from "./_components/dash/response-tracker"
// import { ChatHistory } from "./_components/dash/chat-history"
// import EngagementPulse from "./_components/dash/EngagementPulse"
// //import InstagramIntegrationPopupWrapper from './_components/dash/InstagramIntegrationPopupWrapper'

// export default async function DashboardPage() {
//   const user = await onCurrentUser()
//   const dashboardData = await getDashboardData(user.id)
//   return (
//     <div className="flex flex-col gap-y-10">
//       <div className="flex gap-5 lg:flex-row flex-col">
//         {DASHBOARD_CARDS.map((card) => (
//           <DoubleGradientCard key={card.id} {...card} />
//         ))}
//       </div>

//       <div className="border-[1px] relative border-in-active/50 p-5 rounded-xl">
//         <span className="flex gap-x-1 z-50 items-center mb-5">
//           <BarDuoToneBlue />
//           <div className="z-50">
//             <h2 className="text-2xl font-medium text-white">Engagement Analytics</h2>
//             <p className="text-text-secondary text-sm">Monitor Your DMs in real time</p>
//           </div>
//         </span>
//         <div className="w-full flex lg:flex-row flex-col gap-5">
//           <div className="lg:w-6/12">
//             <EngagementPulse userId={user.id} />
//           </div>
//           <div className="lg:w-6/12">
//             <EnhancedMetricsCard />
//           </div>
//         </div>
//       </div>
//       <div className="container mx-auto p-6 space-y-6">
//         <h1 className="text-3xl font-bold text-white mb-6">Instagram Bot Dashboard</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <Suspense fallback={<Card className="w-full h-[300px] animate-pulse bg-gray-800" />}>
//             <AutomationList automations={dashboardData.automations} />
//           </Suspense>
//           <Suspense fallback={<Card className="w-full h-[300px] animate-pulse bg-gray-800" />}>
//             <RecentDms dms={dashboardData.recentDms} automations={dashboardData.automations} />
//           </Suspense>
//           <Suspense fallback={<Card className="w-full h-[200px] animate-pulse bg-gray-800" />}>
//             <ActiveConversations count={dashboardData.activeConversations} />
//           </Suspense>
//           <Suspense fallback={<Card className="w-full h-[200px] animate-pulse bg-gray-800" />}>
//             <RecentKeywords keywords={dashboardData.recentKeywords} />
//           </Suspense>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <Suspense fallback={<div>Loading recent activity...</div>}>
//           <RecentActivity />
//         </Suspense>
//         <Suspense fallback={<div>Loading response tracker...</div>}>
//           <ResponseTracker />
//         </Suspense>
//         <Suspense fallback={<div>Loading chat history...</div>}>
//           <ChatHistory />
//         </Suspense>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <ActivityFeed />
//         <AIPerformance />
//       </div>

//       <TaskProgress />

//       {/* <InstagramIntegrationPopupWrapper /> */}
//     </div>
//   )
// }

// import { Suspense } from "react"
// import { RecentKeywords } from "./_components/newdash/recent-keywords"
// import { getDashboardData } from "@/actions/dashboard"
// import { onCurrentUser } from "@/actions/user"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { AutomationList } from "./_components/newdash/automation-list"
// import { RecentDms } from "./_components/newdash/recent-dms"
// import ContentSuggestions from './_components/dash/ContentSuggestions'
// import { ActiveConversations } from "./_components/newdash/active-conversations"
// import { BarDuoToneBlue } from "@/icons"
// import DoubleGradientCard from "@/components/global/double-gradient-card"
// import { DASHBOARD_CARDS } from "@/constants/dashboard"
// import EnhancedMetricsCard from "./_components/dash/EnhancedMetricsCard"
// import AIPerformance from "./_components/dash/AIPerformance"
// import EngagementInsights from "./_components/dash/EngagementInsights"
// import HashtagCloud from './_components/dash/HashtagCloud'

// export default async function DashboardPage() {
//   const user = await onCurrentUser()
//   const dashboardData = await getDashboardData()
//   return (
//     <div className="flex flex-col gap-y-10">
//       <div className="flex gap-5 lg:flex-row flex-col">
//         {DASHBOARD_CARDS.map((card) => (
//           <DoubleGradientCard key={card.id} {...card} />
//         ))}
//       </div>

//       <div className="border-[1px] relative border-in-active/50 p-5 rounded-xl">
//         <span className="flex gap-x-1 z-50 items-center mb-5">
//           <BarDuoToneBlue />
//           <div className="z-50">
//             <h2 className="text-2xl font-medium text-white">Engagement Analytics</h2>
//             <p className="text-text-secondary text-sm">Monitor Your Engagement in Real Time</p>
//           </div>
//         </span>
//         <div className="w-full flex lg:flex-row flex-col gap-5">
//           <div className="lg:w-6/12">
//             <EngagementInsights userId={user.id} />
//           </div>
//           <div className="lg:w-6/12">
//             <EnhancedMetricsCard />
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto p-6 space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <Suspense fallback={<Card className="w-full h-[300px] animate-pulse" />}>
//             <AutomationList automations={dashboardData.automations} />
//           </Suspense>
//           <Suspense fallback={<Card className="w-full h-[300px] animate-pulse" />}>
//             <RecentDms dms={dashboardData.recentDms} automations={dashboardData.automations} />
//           </Suspense>
//           <Suspense fallback={<Card className="w-full h-[200px] animate-pulse " />}>
//             <ActiveConversations count={dashboardData.activeConversations} />
//           </Suspense>
//           <Suspense fallback={<Card className="w-full h-[200px] animate-pulse" />}>
//             <RecentKeywords keywords={dashboardData.recentKeywords} />
//           </Suspense>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <ContentSuggestions />
//         <AIPerformance />
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> 
//       <HashtagCloud />          
//       </div>
//     </div>
//   )
// }

// import { Suspense } from "react"
// import { RecentKeywords } from "./_components/newdash/recent-keywords"
// import { getDashboardData } from "@/actions/dashboard"
// import { onCurrentUser } from "@/actions/user"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { AutomationList } from "./_components/newdash/automation-list"
// import { RecentDms } from "./_components/newdash/recent-dms"
// import ContentSuggestions from "./_components/dash/ContentSuggestions"
// import { ActiveConversations } from "./_components/newdash/active-conversations"
// import { BarDuoToneBlue } from "@/icons"
// import DoubleGradientCard from "@/components/global/double-gradient-card"
// import { DASHBOARD_CARDS } from "@/constants/dashboard"
// import EnhancedMetricsCard from "./_components/dash/EnhancedMetricsCard"
// import AIPerformance from "./_components/dash/AIPerformance"
// import EngagementInsights from "./_components/dash/EngagementInsights"
// import HashtagCloud from "./_components/dash/HashtagCloud"

// export default async function DashboardPage() {
//   const user = await onCurrentUser()
//   const dashboardData = await getDashboardData()

//   return (
//     <div className="flex flex-col gap-y-10">
//       <div className="flex gap-5 lg:flex-row flex-col">
//         {DASHBOARD_CARDS.map((card) => (
//           <DoubleGradientCard key={card.id} {...card} />
//         ))}
//       </div>

//       <div className="border-[1px] relative border-in-active/50 p-5 rounded-xl">
//         <span className="flex gap-x-1 z-50 items-center mb-5">
//           <BarDuoToneBlue />
//           <div className="z-50">
//             <h2 className="text-2xl font-medium text-white">Engagement Analytics</h2>
//             <p className="text-text-secondary text-sm">Monitor Your Engagement in Real Time</p>
//           </div>
//         </span>
//         <div className="w-full flex lg:flex-row flex-col gap-5">
//           <div className="lg:w-6/12">
//             <EngagementInsights userId={user.id} />
//           </div>
//           <div className="lg:w-6/12">
//             <EnhancedMetricsCard />
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto p-6 space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <Suspense fallback={<Card className="w-full h-[300px] animate-pulse" />}>
//             {dashboardData.data ? (
//               <AutomationList automations={dashboardData.data.automations} />
//             ) : (
//               <Card className="w-full h-[300px]">
//                 <CardContent className="flex items-center justify-center h-full">
//                   <p>Failed to load automations</p>
//                 </CardContent>
//               </Card>
//             )}
//           </Suspense>
//           <Suspense fallback={<Card className="w-full h-[300px] animate-pulse" />}>
//             {dashboardData.data ? (
//               <RecentDms dms={dashboardData.data.recentDms} automations={dashboardData.data.automations} />
//             ) : (
//               <Card className="w-full h-[300px]">
//                 <CardContent className="flex items-center justify-center h-full">
//                   <p>Failed to load recent DMs</p>
//                 </CardContent>
//               </Card>
//             )}
//           </Suspense>
//           <Suspense fallback={<Card className="w-full h-[200px] animate-pulse" />}>
//             {dashboardData.data ? (
//               <ActiveConversations count={dashboardData.data.activeConversations} />
//             ) : (
//               <Card className="w-full h-[200px]">
//                 <CardContent className="flex items-center justify-center h-full">
//                   <p>Failed to load active conversations</p>
//                 </CardContent>
//               </Card>
//             )}
//           </Suspense>
//           <Suspense fallback={<Card className="w-full h-[200px] animate-pulse" />}>
//             {dashboardData.data ? (
//               <RecentKeywords keywords={dashboardData.data.recentKeywords} />
//             ) : (
//               <Card className="w-full h-[200px]">
//                 <CardContent className="flex items-center justify-center h-full">
//                   <p>Failed to load recent keywords</p>
//                 </CardContent>
//               </Card>
//             )}
//           </Suspense>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <ContentSuggestions />
//         <AIPerformance />
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <HashtagCloud />
//       </div>
//     </div>
//   )
// }

//WOOOOORKKKKIIINNNNGG

// import { Suspense } from "react"
// import { getDashboardData } from "@/actions/dashboard"
// import { getDashboardDati } from "@/actions/dashboard/dashboard"
// import { onCurrentUser } from "@/actions/user"
// import { Card, CardContent } from "@/components/ui/card"
// import { AutomationList } from "./_components/newdash/automation-list"
// // import { RecentDms } from "./_components/newdash/recent-dms"
// import { RecentConversations } from "./_components/newdash/recent-conversations"
// import ContentSuggestions from "./_components/dash/ContentSuggestions"
// import { BarDuoToneBlue } from "@/icons"
// import DoubleGradientCard from "@/components/global/double-gradient-card"
// import { DASHBOARD_CARDS } from "@/constants/dashboard"
// import EnhancedMetricsCard from "./_components/dash/EnhancedMetricsCard"
// import SentimentAnalysis from './_components/dash/SentimentAnalysis'
// import EngagementPredictor from './_components/dash/EngagementPredictor'
// import AIPerformance from "./_components/dash/AIPerformance"
// import EngagementInsights from "./_components/dash/EngagementInsights"
// import HashtagCloud from "./_components/dash/HashtagCloud"
// import type { Automation } from "@/types/dashboard"

// export default async function DashboardPage() {
//   const user = await onCurrentUser()
//   const dashboardData = await getDashboardData()

//   return (
//     <div className="flex flex-col gap-y-10">
//       <div className="flex gap-5 lg:flex-row flex-col">
//         {DASHBOARD_CARDS.map((card) => (
//           <DoubleGradientCard key={card.id} {...card} />
//         ))}
//       </div>

//       <div className="border-[1px] relative border-in-active/50 p-5 rounded-xl">
//         <span className="flex gap-x-1 z-50 items-center mb-5">
//           <BarDuoToneBlue />
//           <div className="z-0">
//             <h2 className="text-2xl font-medium text-white">Engagement Analytics</h2>
//             <p className="text-text-secondary text-sm">Monitor Your Engagement in Real Time</p>
//           </div>
//         </span>
//         <div className="w-full flex lg:flex-row flex-col gap-5">
//           <div className="lg:w-6/12">
//           <SentimentAnalysis />
//           </div>
//           <div className="lg:w-6/12">
//             <EnhancedMetricsCard />
//           </div>
//         </div>
//         <div className="w-full flex lg:flex-row flex-col gap-5">
//         <EngagementPredictor />
//         </div>
//       </div>

//       <div className="container mx-auto p-6 space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <Suspense fallback={<Card className="w-full h-[300px] animate-pulse" />}>
//             {dashboardData.data ? (
//               <AutomationList automations={dashboardData.data.automations as Automation[]} />
//             ) : (
//               <Card className="w-full h-[300px]">
//                 <CardContent className="flex items-center justify-center h-full">
//                   <p>Failed to load automations</p>
//                 </CardContent>
//               </Card>
//             )}
//           </Suspense>
//           <Suspense fallback={<Card className="w-full h-[300px] animate-pulse" />}>
//             {dashboardData.data ? (
//               <RecentDms
//                 dms={dashboardData.data.recentDms}
//                 automations={dashboardData.data.automations as Automation[]}
//               />
//             ) : (
//               <Card className="w-full h-[300px]">
//                 <CardContent className="flex items-center justify-center h-full">
//                   <p>Failed to load recent DMs</p>
//                 </CardContent>
//               </Card>
//             )}
//           </Suspense>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <ContentSuggestions />
//         <AIPerformance />
//       </div>
//       <div className="w-full flex lg:flex-row flex-col gap-5"> 
//         <EngagementInsights />
//       </div>
//     </div>
//   )
// }

import { Suspense } from "react"
import  InstagramDashboard  from "./_components/insta/profile"
import { getDashboardData } from "@/actions/dashboard"
import { getDashboardDati } from "@/actions/dashboard/dashboard"
import { onCurrentUser } from "@/actions/user"
import { Card, CardContent } from "@/components/ui/card"
import { AutomationList } from "./_components/newdash/automation-list"
import { RecentConversations } from "./_components/newdash/recent-dms"
import ContentSuggestions from "./_components/dash/ContentSuggestions"
import { BarDuoToneBlue } from "@/icons"
import DoubleGradientCard from "@/components/global/double-gradient-card"
import { DASHBOARD_CARDS } from "@/constants/dashboard"
import EnhancedMetricsCard from "./_components/dash/EnhancedMetricsCard"
import SentimentAnalysis from "./_components/dash/SentimentAnalysis"
import EngagementPredictor from "./_components/dash/EngagementPredictor"
import AIPerformance from "./_components/dash/AIPerformance"
import EngagementInsights from "./_components/dash/EngagementInsights"
import HashtagCloud from "./_components/dash/HashtagCloud"
import type { Automation, Conversation } from "@/types/dashboard"

export default async function DashboardPage() {
  const user = await onCurrentUser()
  const dashboardData = await getDashboardData()

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex gap-5 lg:flex-row flex-col">
        {DASHBOARD_CARDS.map((card) => (
          <DoubleGradientCard key={card.id} {...card} />
        ))}
      </div>

      <div className="border-[1px] relative border-in-active/50 p-5 rounded-xl">
        <span className="flex gap-x-1 z-50 items-center mb-5">
          <BarDuoToneBlue />
          <div className="z-0">
            <h2 className="text-2xl font-medium text-white">Engagement Analytics</h2>
            <p className="text-text-secondary text-sm">Monitor Your Engagement in Real Time</p>
          </div>
        </span>
        <div className="w-full flex lg:flex-row flex-col gap-5">
          <div className="lg:w-6/12">
            <InstagramDashboard />
          </div>
          <div className="lg:w-6/12">
            <EnhancedMetricsCard />
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Suspense fallback={<Card className="w-full h-[300px] animate-pulse" />}>
            {dashboardData.data ? (
              <AutomationList automations={dashboardData.data.automations as Automation[]} />
            ) : (
              <Card className="w-full h-[300px]">
                <CardContent className="flex items-center justify-center h-full">
                  <p>Failed to load automations</p>
                </CardContent>
              </Card>
            )}
          </Suspense>
          <EngagementPredictor />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContentSuggestions />
        <AIPerformance />
      </div>
      <div className="w-full flex lg:flex-row flex-col gap-5">
        <EngagementInsights />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SentimentAnalysis />
        <HashtagCloud />
      </div>
    </div>
  )
}

