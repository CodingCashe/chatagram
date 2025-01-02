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

'use client'

import React from 'react'
import { BarDuoToneBlue } from '@/icons'
import DoubleGradientCard from '@/components/global/double-gradient-card'
import { DASHBOARD_CARDS } from '@/constants/dashboard'
import EnhancedChart from './_components/dash/EnhancedChart'
import EnhancedMetricsCard from './_components/dash/EnhancedMetricsCard'
import ActivityFeed from './_components/dash/ActivityFeed'
import AIPerformance from './_components/dash/AIPerformance'
import TaskProgress from './_components/dash/TaskProgress'
import NetworkVisualization from './_components/dash/NetworkVisualization'
import ContentSuggestions from './_components/dash/ContentSuggestions'
import { motion } from 'framer-motion'

const Page = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-y-10"
    >
      <div className="flex gap-5 lg:flex-row flex-col">
        {DASHBOARD_CARDS.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <DoubleGradientCard {...card} />
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="border-[1px] relative border-in-active/50 p-5 rounded-xl"
      >
        <span className="flex gap-x-1 z-50 items-center mb-5">
          <BarDuoToneBlue />
          <div className="z-50">
            <h2 className="text-2xl font-medium text-white">
              Automated Activity
            </h2>
            <p className="text-text-secondary text-sm">
              Automated 0 out of 1 interactions
            </p>
          </div>
        </span>
        <div className="w-full flex lg:flex-row flex-col gap-5">
          <div className="lg:w-6/12">
            <EnhancedChart />
          </div>
          <div className="lg:w-6/12">
            <EnhancedMetricsCard />
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ActivityFeed />
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AIPerformance />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <NetworkVisualization />
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ContentSuggestions />
        </motion.div>
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <TaskProgress />
      </motion.div>
    </motion.div>
  )
}

export default Page

