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


'use client'

import React from 'react'
import { BarDuoToneBlue } from '@/icons'
import DoubleGradientCard from '@/components/global/double-gradient-card'
import { DASHBOARD_CARDS } from '@/constants/dashboard'
import EnhancedChart from '@/components/global/dashboard/EnhancedChart'
import EnhancedMetricsCard from '@/components/global/dashboard/EnhancedMetricsCard'
import ActivityFeed from '@/components/global/dashboard/ActivityFeed'
import AIPerformance from '@/components/global/dashboard/AIPerformance'
import TaskProgress from '@/components/global/dashboard/TaskProgress'

const Page = () => {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex gap-5 lg:flex-row flex-col">
        {DASHBOARD_CARDS.map((card) => (
          <DoubleGradientCard
            key={card.id}
            {...card}
          />
        ))}
      </div>
      
      <div className="border-[1px] relative border-in-active/50 p-5 rounded-xl">
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
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActivityFeed />
        <div className="space-y-6">
          <AIPerformance />
          <TaskProgress />
        </div>
      </div>
    </div>
  )
}

export default Page

