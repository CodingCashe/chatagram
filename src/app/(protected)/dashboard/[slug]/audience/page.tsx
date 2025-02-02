// "use client"
// import { motion } from "framer-motion"
// import Header from "@/components/global/audience/Header"
// import ClientList from "@/components/global/audience/ClientList"
// import PromoComposer from "@/components/global/audience/PromoComposer"
// import AnalyticsSection from "@/components/global/audience/AnalyticsSection"
// import CampaignScheduler from "@/components/global/audience/CampaignScheduler"
// import InfluencerNetwork from "@/components/global/audience/InfluencerNetwork"
// import AIInsights from "@/components/global/audience/AIInsights"
// import InteractiveContentCreator from "@/components/global/audience/InteractiveContentCreator"
// import HashtagCreator from "@/components/global/audience/AnalyticsSection"
// import EngagementMetrics from "@/components/global/audience/CampaignScheduler"
// import ContentCalendar from "@/components/global/audience/InfluencerNetwork"


// export default function EnhancedMarketingDashboard() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white p-8 overflow-hidden">
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//         <Header />
//       </motion.div>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="lg:col-span-2"
//         >
//           <ClientList />
//         </motion.div>
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//         >
//           <PromoComposer />
//         </motion.div>
//       </div>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.6 }}
//       >
//         <AnalyticsSection />
//       </motion.div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.8 }}
//         >
//           <CampaignScheduler />
//         </motion.div>
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 1 }}
//         >
//           <InfluencerNetwork />
//         </motion.div>
//       </div>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 1.2 }}
//       >
//         <AIInsights />
//       </motion.div>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 1.4 }}
//       >
//         <InteractiveContentCreator />
//       </motion.div>
//     </div>
//   )
// }

import { motion } from "framer-motion"
import ClientList from "@/components/global/audience/ClientList"
import PromoComposer from "@/components/global/audience/PromoComposer"
import AnalyticsSection from "@/components/global/audience/AnalyticsSection"
import CampaignScheduler from "@/components/global/audience/CampaignScheduler"
import InfluencerNetwork from "@/components/global/audience/InfluencerNetwork"
import AIInsights from "@/components/global/audience/AIInsights"
import InteractiveContentCreator from "@/components/global/audience/InteractiveContentCreator"
import HashtagGenerator from "@/components/global/audience/HashtagGenerator"
import EngagementMetrics from "@/components/global/audience/EngagementMetrics"
import ContentCalendar from "@/components/global/audience/ContentCalendar"
import Header from "@/components/global/audience/Header"

const EnhancedMarketingDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 text-white p-8 overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Header />
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <ClientList />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <PromoComposer />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8"
      >
        <AnalyticsSection />
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <CampaignScheduler />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <InfluencerNetwork />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <AIInsights />
        </motion.div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <InteractiveContentCreator />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <HashtagGenerator />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          <EngagementMetrics />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
        className="mt-8"
      >
        <ContentCalendar />
      </motion.div>
    </div>
  )
}

export default EnhancedMarketingDashboard

