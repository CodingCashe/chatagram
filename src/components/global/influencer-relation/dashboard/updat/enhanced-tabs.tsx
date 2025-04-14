// "use client"

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { AnalyticsOverview } from "./analytics-overview"
// import { ContentCalendar as EnhancedContentCalendar } from "./content-calendar"
// import { HashtagGenerator } from "./hashtag-generator"
// import { BrandOpportunities } from "./brand-opportunities"
// import { AudienceInsights as EnhancedAudienceInsights } from "./audience-insights"
// import { ContentIdeas } from "./content-ideas"
// import { BarChart3, Calendar, Hash, Briefcase, Users, Lightbulb } from "lucide-react"
// import { motion } from "framer-motion"

// export function EnhancedTabs() {
//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//       <Tabs defaultValue="analytics" className="space-y-6">
//         <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
//           <TabsTrigger value="analytics" className="flex items-center">
//             <BarChart3 className="mr-2 h-4 w-4" />
//             <span className="hidden sm:inline">Analytics</span>
//           </TabsTrigger>
//           <TabsTrigger value="calendar" className="flex items-center">
//             <Calendar className="mr-2 h-4 w-4" />
//             <span className="hidden sm:inline">Calendar</span>
//           </TabsTrigger>
//           <TabsTrigger value="hashtags" className="flex items-center">
//             <Hash className="mr-2 h-4 w-4" />
//             <span className="hidden sm:inline">Hashtags</span>
//           </TabsTrigger>
//           <TabsTrigger value="opportunities" className="flex items-center">
//             <Briefcase className="mr-2 h-4 w-4" />
//             <span className="hidden sm:inline">Opportunities</span>
//           </TabsTrigger>
//           <TabsTrigger value="audience" className="flex items-center">
//             <Users className="mr-2 h-4 w-4" />
//             <span className="hidden sm:inline">Audience</span>
//           </TabsTrigger>
//           <TabsTrigger value="ideas" className="flex items-center">
//             <Lightbulb className="mr-2 h-4 w-4" />
//             <span className="hidden sm:inline">Ideas</span>
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="analytics" className="space-y-6">
//           <AnalyticsOverview />
//         </TabsContent>

//         <TabsContent value="calendar" className="space-y-6">
//           <EnhancedContentCalendar />
//         </TabsContent>

//         <TabsContent value="hashtags" className="space-y-6">
//           <HashtagGenerator />
//         </TabsContent>

//         <TabsContent value="opportunities" className="space-y-6">
//           <BrandOpportunities />
//         </TabsContent>

//         <TabsContent value="audience" className="space-y-6">
//           <EnhancedAudienceInsights />
//         </TabsContent>

//         <TabsContent value="ideas" className="space-y-6">
//           <ContentIdeas />
//         </TabsContent>
//       </Tabs>
//     </motion.div>
//   )
// }
"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsOverview } from "./analytics-overview"
import { ContentCalendar as EnhancedContentCalendar } from "./content-calendar"
import { HashtagGenerator } from "./hashtag-generator"
import { BrandOpportunities } from "./brand-opportunities"
import { AudienceInsights as EnhancedAudienceInsights } from "./audience-insights"
import { ContentIdeas } from "./content-ideas"
import { BarChart3, Calendar, Hash, Briefcase, Users, Lightbulb } from "lucide-react"

export function EnhancedTabs() {
  return (
    <div className="p-4">
      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="analytics" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Calendar</span>
          </TabsTrigger>
          <TabsTrigger value="hashtags" className="flex items-center">
            <Hash className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Hashtags</span>
          </TabsTrigger>
          <TabsTrigger value="opportunities" className="flex items-center">
            <Briefcase className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Opportunities</span>
          </TabsTrigger>
          <TabsTrigger value="audience" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Audience</span>
          </TabsTrigger>
          <TabsTrigger value="ideas" className="flex items-center">
            <Lightbulb className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Ideas</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsOverview />
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <EnhancedContentCalendar />
        </TabsContent>

        <TabsContent value="hashtags" className="space-y-6">
          <HashtagGenerator />
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-6">
          <BrandOpportunities />
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <EnhancedAudienceInsights />
        </TabsContent>

        <TabsContent value="ideas" className="space-y-6">
          <ContentIdeas />
        </TabsContent>
      </Tabs>
    </div>
  )
}
