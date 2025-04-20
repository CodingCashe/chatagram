"use client"

import { motion } from "framer-motion"
import Header from "@/components/global/audience/Header"
import  InstagramDashboard  from "../_components/insta/profile"
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
/**bg-gradient-to-br from-gray-900 to-gray-950 */
export default function EnhancedMarketingDashboard() {
  return (
    <div className="min-h-screen text-white p-4 md:p-8 overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Header />
      </motion.div>

      <div className="mt-4 md:mt-8">
        <ClientList />
      </div>

      <div className="mt-4 md:mt-8">
        <PromoComposer />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-4 md:mt-8"
      >
        <AnalyticsSection />
      </motion.div>

      <div className="grid grid-cols-1  gap-4 md:gap-8 mt-4 md:mt-8">
        <CampaignScheduler />
      </div>

      <div className="grid grid-cols-1  gap-4 md:gap-8 mt-4 md:mt-8">
        <InfluencerNetwork />
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-8 mt-4 md:mt-8">
        <AIInsights />
      </div>



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mt-4 md:mt-8">
        <InteractiveContentCreator />
        <HashtagGenerator />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.8 }}
        className="mt-4 md:mt-8"
      >
        <EngagementMetrics />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
        className="mt-4 md:mt-8"
      >
        <ContentCalendar />
      </motion.div>
    </div>
  )
}
