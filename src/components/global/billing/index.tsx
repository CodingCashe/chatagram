// 'use client'
// import React from 'react'
// import PaymentCard from './payment-card'
// import { useQueryUser } from '@/hooks/user-queries'

// type Props = {}

// const Billing = (props: Props) => {
//   const { data } = useQueryUser()
//   return (
//     <div className="flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container">
//       <PaymentCard
//         current={data?.data?.subscription?.plan!}
//         label="PRO"
//       />
//       <PaymentCard
//         current={data?.data?.subscription?.plan!}
//         label="FREE"
//       />
//     </div>
//   )
// }

// export default Billing

// "use client"

// import React from "react"

// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import {
//   Check,
//   X,
//   Zap,
//   Shield,
//   Clock,
//   Users,
//   Sparkles,
//   Star,
//   Crown,
//   ChevronRight,
//   CreditCard,
//   Calendar,
//   ArrowRight,
//   Download,
//   HelpCircle,
//   Building,
//   CheckCircle2,
//   Briefcase,
//   Laptop,
//   Server,
//   Database,
//   Lock,
//   Globe,
//   BarChart,
//   MessageSquare,
//   HeartHandshake,
//   Rocket,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Switch } from "@/components/ui/switch"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// import { Separator } from "@/components/ui/separator"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// interface PricingFeature {
//   name: string
//   icon: React.ReactNode
//   included: boolean | string
//   description?: string
// }

// interface PricingPlan {
//   id: string
//   name: string
//   description: string
//   price: {
//     monthly: number
//     annually: number
//   }
//   features: PricingFeature[]
//   popular: boolean
//   badge?: string
//   color: string
//   icon: React.ReactNode
//   idealFor?: string[]
// }

// interface Testimonial {
//   id: string
//   name: string
//   role: string
//   company: string
//   avatar: string
//   quote: string
//   planId: string
// }

// export default function PricingSection() {
//   const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly")
//   const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)
//   const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0)
//   const [showAllFeatures, setShowAllFeatures] = useState(false)
//   // Add a new state to track the active plan
//   const [activePlan, setActivePlan] = useState<string>("PRO")

//   const pricingPlans: PricingPlan[] = [
//     {
//       id: "starter",
//       name: "Starter",
//       description: "Perfect for individuals and small projects",
//       price: {
//         monthly: 9,
//         annually: 99,
//       },
//       features: [
//         {
//           name: "Up to 5 integrations",
//           icon: <Users className="h-4 w-4" />,
//           included: true,
//           description: "Connect up to 5 different platforms or services to your account.",
//         },
//         {
//           name: "Basic analytics",
//           icon: <Sparkles className="h-4 w-4" />,
//           included: true,
//           description: "View simple metrics and reports about your integrations and usage.",
//         },
//         {
//           name: "24/7 support",
//           icon: <Clock className="h-4 w-4" />,
//           included: false,
//           description: "Get help anytime via our dedicated support team.",
//         },
//         {
//           name: "Custom branding",
//           icon: <Star className="h-4 w-4" />,
//           included: false,
//           description: "Add your own logo and customize the look and feel.",
//         },
//         {
//           name: "Advanced security",
//           icon: <Shield className="h-4 w-4" />,
//           included: false,
//           description: "Enhanced security features including 2FA and audit logs.",
//         },
//         {
//           name: "API access",
//           icon: <Zap className="h-4 w-4" />,
//           included: false,
//           description: "Programmatic access to our platform via RESTful API.",
//         },
//         {
//           name: "Data export",
//           icon: <Download className="h-4 w-4" />,
//           included: true,
//           description: "Export your data in CSV or JSON format.",
//         },
//         {
//           name: "Email notifications",
//           icon: <MessageSquare className="h-4 w-4" />,
//           included: true,
//           description: "Receive alerts and updates via email.",
//         },
//       ],
//       popular: false,
//       color: "from-blue-600 to-indigo-600",
//       icon: <Star className="h-5 w-5" />,
//       idealFor: ["Freelancers", "Side projects", "Personal use"],
//     },
//     {
//       id: "pro",
//       name: "Professional",
//       description: "Ideal for growing businesses and teams",
//       price: {
//         monthly: 29,
//         annually: 290,
//       },
//       features: [
//         {
//           name: "Up to 20 integrations",
//           icon: <Users className="h-4 w-4" />,
//           included: true,
//           description: "Connect up to 20 different platforms or services to your account.",
//         },
//         {
//           name: "Advanced analytics",
//           icon: <Sparkles className="h-4 w-4" />,
//           included: true,
//           description: "Detailed metrics, custom reports, and data visualization tools.",
//         },
//         {
//           name: "24/7 priority support",
//           icon: <Clock className="h-4 w-4" />,
//           included: true,
//           description: "Get priority help anytime via our dedicated support team with faster response times.",
//         },
//         {
//           name: "Custom branding",
//           icon: <Star className="h-4 w-4" />,
//           included: true,
//           description: "Add your own logo, customize colors, and create a branded experience.",
//         },
//         {
//           name: "Advanced security",
//           icon: <Shield className="h-4 w-4" />,
//           included: true,
//           description: "Enhanced security features including 2FA, SSO, and detailed audit logs.",
//         },
//         {
//           name: "API access",
//           icon: <Zap className="h-4 w-4" />,
//           included: false,
//           description: "Programmatic access to our platform via RESTful API with higher rate limits.",
//         },
//         {
//           name: "Team collaboration",
//           icon: <Users className="h-4 w-4" />,
//           included: true,
//           description: "Add team members with custom permission levels.",
//         },
//         {
//           name: "Workflow automation",
//           icon: <Rocket className="h-4 w-4" />,
//           included: true,
//           description: "Create automated workflows between your integrations.",
//         },
//       ],
//       popular: true,
//       badge: "Most Popular",
//       color: "from-purple-600 to-pink-600",
//       icon: <Crown className="h-5 w-5" />,
//       idealFor: ["Small businesses", "Growing teams", "Professional services"],
//     },
//     {
//       id: "enterprise",
//       name: "Enterprise",
//       description: "Advanced features for large organizations",
//       price: {
//         monthly: 99,
//         annually: 990,
//       },
//       features: [
//         {
//           name: "Unlimited integrations",
//           icon: <Users className="h-4 w-4" />,
//           included: true,
//           description: "Connect unlimited platforms or services to your account.",
//         },
//         {
//           name: "Enterprise analytics",
//           icon: <Sparkles className="h-4 w-4" />,
//           included: true,
//           description: "Advanced analytics with custom dashboards, AI insights, and predictive modeling.",
//         },
//         {
//           name: "24/7 dedicated support",
//           icon: <Clock className="h-4 w-4" />,
//           included: true,
//           description: "Dedicated account manager and priority support with guaranteed response times.",
//         },
//         {
//           name: "Custom branding",
//           icon: <Star className="h-4 w-4" />,
//           included: true,
//           description: "Complete white-labeling and custom branding options with design services.",
//         },
//         {
//           name: "Enterprise security",
//           icon: <Shield className="h-4 w-4" />,
//           included: true,
//           description: "Enterprise-grade security with SSO, SAML, custom security policies, and compliance features.",
//         },
//         {
//           name: "Full API access",
//           icon: <Zap className="h-4 w-4" />,
//           included: true,
//           description: "Unlimited API access with dedicated endpoints and custom development support.",
//         },
//         {
//           name: "Advanced compliance",
//           icon: <CheckCircle2 className="h-4 w-4" />,
//           included: true,
//           description: "HIPAA, GDPR, SOC2 compliance and custom compliance reporting.",
//         },
//         {
//           name: "Custom development",
//           icon: <Laptop className="h-4 w-4" />,
//           included: true,
//           description: "Custom feature development and platform extensions.",
//         },
//       ],
//       popular: false,
//       color: "from-amber-500 to-orange-600",
//       icon: <Zap className="h-5 w-5" />,
//       idealFor: ["Large organizations", "Enterprise companies", "High-compliance industries"],
//     },
//   ]

//   const testimonials: Testimonial[] = [
//     {
//       id: "t1",
//       name: "Sarah Johnson",
//       role: "Marketing Director",
//       company: "GrowthLabs",
//       avatar: "/placeholder-user.jpg",
//       quote:
//         "The Professional plan has transformed how our marketing team manages integrations. The workflow automation saves us hours every week.",
//       planId: "pro",
//     },
//     {
//       id: "t2",
//       name: "Michael Chen",
//       role: "Freelance Developer",
//       company: "Self-employed",
//       avatar: "/placeholder-user.jpg",
//       quote:
//         "As a freelancer, the Starter plan gives me everything I need at an affordable price. I can connect all my essential tools without breaking the bank.",
//       planId: "starter",
//     },
//     {
//       id: "t3",
//       name: "Jessica Williams",
//       role: "CTO",
//       company: "TechNova Inc.",
//       avatar: "/placeholder-user.jpg",
//       quote:
//         "The Enterprise plan's security features and dedicated support have been crucial for our company's compliance requirements. Worth every penny.",
//       planId: "enterprise",
//     },
//   ]

//   const discountPercentage = 15

//   const allFeatures = [
//     {
//       category: "Integrations",
//       features: [
//         { name: "Number of integrations", starter: "Up to 5", pro: "Up to 20", enterprise: "Unlimited" },
//         { name: "Social media platforms", starter: "Basic", pro: "Advanced", enterprise: "Complete" },
//         { name: "CRM integrations", starter: "Limited", pro: "Full", enterprise: "Custom" },
//         { name: "Third-party app connections", starter: "3", pro: "10", enterprise: "Unlimited" },
//       ],
//     },
//     {
//       category: "Analytics & Reporting",
//       features: [
//         { name: "Dashboard", starter: "Basic", pro: "Advanced", enterprise: "Custom" },
//         { name: "Data visualization", starter: "Limited", pro: "Full", enterprise: "Advanced" },
//         { name: "Custom reports", starter: false, pro: true, enterprise: true },
//         { name: "Export options", starter: "CSV", pro: "CSV, JSON", enterprise: "CSV, JSON, API" },
//         { name: "Historical data", starter: "30 days", pro: "1 year", enterprise: "Unlimited" },
//       ],
//     },
//     {
//       category: "Security",
//       features: [
//         { name: "Two-factor authentication", starter: false, pro: true, enterprise: true },
//         { name: "SSO", starter: false, pro: false, enterprise: true },
//         { name: "Audit logs", starter: false, pro: true, enterprise: true },
//         { name: "Custom security policies", starter: false, pro: false, enterprise: true },
//         { name: "Data encryption", starter: "Standard", pro: "Advanced", enterprise: "Military-grade" },
//       ],
//     },
//     {
//       category: "Support",
//       features: [
//         { name: "Support channels", starter: "Email", pro: "Email, Chat", enterprise: "Email, Chat, Phone" },
//         { name: "Response time", starter: "48 hours", pro: "24 hours", enterprise: "4 hours" },
//         { name: "Dedicated account manager", starter: false, pro: false, enterprise: true },
//         { name: "Onboarding", starter: "Self-serve", pro: "Guided", enterprise: "White-glove" },
//         { name: "Training sessions", starter: false, pro: "2 sessions", enterprise: "Unlimited" },
//       ],
//     },
//   ]

//   return (
//     <div className="space-y-16">
//       {/* Header */}
//       <div className="text-center space-y-4 max-w-3xl mx-auto">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//           <Badge variant="outline" className="px-3 py-1 bg-gray-800 border-gray-700 text-gray-300 mb-4">
//             <Sparkles className="h-3.5 w-3.5 mr-1 text-purple-400" />
//             Choose the perfect plan
//           </Badge>
//           <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
//             Pricing Plans
//           </h1>
//           <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
//             Select the perfect plan for your needs. Upgrade or downgrade at any time.
//           </p>
//         </motion.div>

//         {/* Billing Toggle */}
//         <motion.div
//           className="flex justify-center items-center mt-8 space-x-3"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//         >
//           <span className={`text-sm ${billingCycle === "monthly" ? "text-white" : "text-gray-500"}`}>Monthly</span>
//           <Switch
//             checked={billingCycle === "annually"}
//             onCheckedChange={(checked) => setBillingCycle(checked ? "annually" : "monthly")}
//             className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-pink-600"
//           />
//           <span
//             className={`text-sm flex items-center gap-1.5 ${billingCycle === "annually" ? "text-white" : "text-gray-500"}`}
//           >
//             Annually
//             <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 text-xs">
//               Save {discountPercentage}%
//             </Badge>
//           </span>
//         </motion.div>
//       </div>

//       {/* Pricing Cards */}
//       <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//         {pricingPlans.map((plan, index) => (
//           <motion.div
//             key={plan.id}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
//             onMouseEnter={() => setHoveredPlan(plan.id)}
//             onMouseLeave={() => setHoveredPlan(null)}
//             className="relative"
//           >
//             {/* Popular Badge - Repositioned */}
//             {plan.popular && (
//               <div className="absolute -top-5 inset-x-0 flex justify-center z-10">
//                 <Badge
//                   className={`bg-gradient-to-r ${plan.color} border-0 px-4 py-1.5 text-white font-medium shadow-lg`}
//                 >
//                   {plan.badge}
//                 </Badge>
//               </div>
//             )}

//             {plan.id === activePlan && (
//               <div className="absolute -right-2 top-6 z-10 rotate-0 overflow-hidden">
//                 <div className="relative">
//                   <div className="absolute -left-2 h-2 w-2 bg-emerald-600 rounded-bl-sm"></div>
//                   <div className="bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-1 text-white font-medium shadow-lg flex items-center gap-1.5">
//                     <CheckCircle2 className="h-3.5 w-3.5" />
//                     Active Plan
//                   </div>
//                 </div>
//                 <div className="absolute -right-2 h-2 w-2 bg-emerald-600 rounded-tr-sm"></div>
//               </div>
//             )}

//             {/* Glow Effect */}
//             <AnimatePresence>
//               {hoveredPlan === plan.id && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className={`absolute inset-0 bg-gradient-to-r ${plan.color} blur-xl opacity-20 rounded-xl`}
//                 />
//               )}
//             </AnimatePresence>

//             <Card
//               className={`
//               relative overflow-hidden border-gray-800 bg-gray-900/80 backdrop-blur-sm
//               ${plan.popular ? "border-gray-700 mt-4" : "border-gray-800"}
//               ${hoveredPlan === plan.id ? "transform-gpu -translate-y-1 transition-transform" : "transition-transform"}
//               ${plan.id === activePlan ? "ring-2 ring-green-500/30" : ""}
//             `}
//             >
//               {/* Gradient Border Effect */}
//               <div
//                 className={`absolute inset-0 rounded-xl opacity-0 ${hoveredPlan === plan.id ? "opacity-100" : ""} transition-opacity duration-300`}
//               >
//                 <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${plan.color} p-[1px]`}>
//                   <div className="absolute inset-[1px] rounded-[10px] bg-gray-900"></div>
//                 </div>
//               </div>

//               <CardHeader className="relative z-10">
//                 <div className="flex items-center justify-between">
//                   <div className={`p-2 rounded-full bg-gradient-to-r ${plan.color}`}>{plan.icon}</div>
//                   <Badge variant="outline" className="bg-gray-800 border-gray-700 text-gray-300">
//                     {plan.id.charAt(0).toUpperCase() + plan.id.slice(1)}
//                   </Badge>
//                 </div>
//                 <CardTitle className="text-2xl font-bold mt-4 text-white">{plan.name}</CardTitle>
//                 <CardDescription className="text-gray-300">{plan.description}</CardDescription>
//               </CardHeader>
//               <CardContent className="relative z-10">
//                 <div className="flex items-baseline mb-6">
//                   <span className="text-4xl font-bold text-white">
//                     ${billingCycle === "monthly" ? plan.price.monthly : Math.round(plan.price.annually / 12)}
//                   </span>
//                   <span className="text-gray-300 ml-1">/month</span>
//                 </div>

//                 {billingCycle === "annually" && (
//                   <div className="mb-6 text-sm">
//                     <span className="text-gray-300">Billed annually at </span>
//                     <span className="font-semibold text-white">${plan.price.annually}</span>
//                     <span className="text-green-400 ml-2">Save ${plan.price.monthly * 12 - plan.price.annually}</span>
//                   </div>
//                 )}

//                 {/* Ideal For Tags */}
//                 {plan.idealFor && (
//                   <div className="mb-4 flex flex-wrap gap-2">
//                     {plan.idealFor.map((ideal, i) => (
//                       <Badge key={i} variant="secondary" className="bg-gray-800 text-gray-300 border-0">
//                         {ideal}
//                       </Badge>
//                     ))}
//                   </div>
//                 )}

//                 <ul className="space-y-3">
//                   {plan.features.slice(0, 6).map((feature, i) => (
//                     <li key={i} className="flex items-start">
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <div className="flex items-start">
//                               {feature.included ? (
//                                 <div className={`p-1 rounded-full bg-gradient-to-r ${plan.color} mr-2 shrink-0 mt-0.5`}>
//                                   <Check className="h-3 w-3 text-white" />
//                                 </div>
//                               ) : (
//                                 <div className="p-1 rounded-full bg-gray-800 mr-2 shrink-0 mt-0.5">
//                                   <X className="h-3 w-3 text-gray-500" />
//                                 </div>
//                               )}
//                               <span className={feature.included ? "text-gray-200" : "text-gray-400"}>
//                                 {feature.name}
//                               </span>
//                             </div>
//                           </TooltipTrigger>
//                           <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200 max-w-xs">
//                             {feature.description}
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                     </li>
//                   ))}
//                 </ul>

//                 {/* Show more features button */}
//                 {plan.features.length > 6 && (
//                   <Button
//                     variant="link"
//                     className="mt-2 text-gray-400 hover:text-white p-0 h-auto"
//                     onClick={() => setShowAllFeatures(true)}
//                   >
//                     Show all features <ChevronRight className="h-3 w-3 ml-1" />
//                   </Button>
//                 )}
//               </CardContent>
//               <CardFooter className="relative z-10">
//                 {plan.id === activePlan ? (
//                   <Button
//                     variant="outline"
//                     className="w-full border-green-500/30 text-green-500 hover:bg-gray-800 hover:text-green-400"
//                   >
//                     Current Plan
//                     <CheckCircle2 className="h-4 w-4 ml-1" />
//                   </Button>
//                 ) : (
//                   <Button className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 transition-opacity`}>
//                     {plan.id === "enterprise" ? "Contact Sales" : "Get Started"}
//                     <ChevronRight className="h-4 w-4 ml-1" />
//                   </Button>
//                 )}
//               </CardFooter>
//             </Card>
//           </motion.div>
//         ))}
//       </div>

//       {/* All Features Dialog */}
//       <Dialog open={showAllFeatures} onOpenChange={setShowAllFeatures}>
//         <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl">
//           <DialogHeader>
//             <DialogTitle className="text-xl font-bold">All Features Comparison</DialogTitle>
//             <DialogDescription className="text-gray-300">
//               Detailed comparison of all features across our pricing plans
//             </DialogDescription>
//           </DialogHeader>
//           <div className="overflow-y-auto max-h-[60vh] pr-2 -mr-2">
//             <table className="w-full">
//               <thead className="sticky top-0 bg-gray-900 z-10">
//                 <tr className="border-b border-gray-800">
//                   <th className="text-left py-4 px-2 text-gray-300 font-medium">Feature</th>
//                   <th className="text-left py-4 px-2 font-medium text-white">Starter</th>
//                   <th className="text-left py-4 px-2 font-medium text-white">Professional</th>
//                   <th className="text-left py-4 px-2 font-medium text-white">Enterprise</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {allFeatures.map((category, categoryIndex) => (
//                   <React.Fragment key={categoryIndex}>
//                     <tr className="bg-gray-800/30">
//                       <td colSpan={4} className="py-3 px-2 font-semibold text-white">
//                         {category.category}
//                       </td>
//                     </tr>
//                     {category.features.map((feature, featureIndex) => (
//                       <tr key={`${categoryIndex}-${featureIndex}`} className="border-b border-gray-800">
//                         <td className="py-3 px-2 text-gray-300">{feature.name}</td>
//                         <td className="py-3 px-2">
//                           {typeof feature.starter === "boolean" ? (
//                             feature.starter ? (
//                               <Check className="h-5 w-5 text-green-500" />
//                             ) : (
//                               <X className="h-5 w-5 text-gray-500" />
//                             )
//                           ) : (
//                             <span className="text-gray-200">{feature.starter}</span>
//                           )}
//                         </td>
//                         <td className="py-3 px-2">
//                           {typeof feature.pro === "boolean" ? (
//                             feature.pro ? (
//                               <Check className="h-5 w-5 text-green-500" />
//                             ) : (
//                               <X className="h-5 w-5 text-gray-500" />
//                             )
//                           ) : (
//                             <span className="text-gray-200">{feature.pro}</span>
//                           )}
//                         </td>
//                         <td className="py-3 px-2">
//                           {typeof feature.enterprise === "boolean" ? (
//                             feature.enterprise ? (
//                               <Check className="h-5 w-5 text-green-500" />
//                             ) : (
//                               <X className="h-5 w-5 text-gray-500" />
//                             )
//                           ) : (
//                             <span className="text-gray-200">{feature.enterprise}</span>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </React.Fragment>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <DialogFooter>
//             <Button onClick={() => setShowAllFeatures(false)}>Close</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Testimonials Section */}
//       <div className="mt-16 max-w-5xl mx-auto">
//         <div className="text-center mb-10">
//           <h2 className="text-3xl font-bold text-white mb-4">What Our Customers Say</h2>
//           <p className="text-gray-400 max-w-2xl mx-auto">
//             Hear from our customers about how our pricing plans have helped their businesses grow.
//           </p>
//         </div>

//         <div className="relative">
//           <div className="overflow-hidden">
//             <div className="flex flex-col md:flex-row gap-6">
//               {testimonials.map((testimonial, index) => {
//                 const plan = pricingPlans.find((p) => p.id === testimonial.planId)
//                 return (
//                   <motion.div
//                     key={testimonial.id}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 * index, duration: 0.5 }}
//                     className="w-full md:w-1/3"
//                   >
//                     <Card className="h-full border-gray-800 bg-gray-900/80 backdrop-blur-sm relative overflow-hidden">
//                       {/* Subtle gradient based on plan */}
//                       <div
//                         className="absolute inset-0 opacity-5 bg-gradient-to-br rounded-xl"
//                         style={{
//                           background: plan
//                             ? `linear-gradient(to bottom right, ${plan.color.replace("from-", "").replace("to-", "")})`
//                             : undefined,
//                         }}
//                       />

//                       <CardContent className="p-6 relative z-10">
//                         <div className="flex items-center gap-4 mb-4">
//                           <Avatar className="h-12 w-12 border border-gray-700">
//                             <AvatarImage src={testimonial.avatar} />
//                             <AvatarFallback className="bg-gray-800 text-gray-400">
//                               {testimonial.name
//                                 .split(" ")
//                                 .map((n) => n[0])
//                                 .join("")}
//                             </AvatarFallback>
//                           </Avatar>
//                           <div>
//                             <h4 className="font-medium text-white">{testimonial.name}</h4>
//                             <p className="text-sm text-gray-400">
//                               {testimonial.role}, {testimonial.company}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="mb-4">
//                           <p className="text-gray-300 italic">{testimonial.quote}</p>
//                         </div>

//                         {plan && (
//                           <div className="flex items-center mt-4">
//                             <Badge className={`bg-gradient-to-r ${plan.color} text-white border-0`}>
//                               {plan.name} Plan
//                             </Badge>
//                           </div>
//                         )}
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Plan Selector Tool */}
//       <div className="mt-20 max-w-4xl mx-auto">
//         <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm overflow-hidden">
//           <CardHeader className="relative">
//             <div className="absolute inset-0 bg-gradient-to-r from-[#3352CC]/10 to-purple-900/10" />
//             <div className="relative z-10">
//               <CardTitle className="text-2xl font-bold text-white">Not sure which plan is right for you?</CardTitle>
//               <CardDescription className="text-gray-300">
//                 Answer a few questions and we will recommend the best plan for your needs.
//               </CardDescription>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-6">
//               <div className="space-y-2">
//                 <h3 className="text-white font-medium">How many team members do you have?</h3>
//                 <div className="grid grid-cols-3 gap-3">
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC]"
//                   >
//                     Just me
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC]"
//                   >
//                     2-10 people
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC]"
//                   >
//                     11+ people
//                   </Button>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <h3 className="text-white font-medium">What is your primary use case?</h3>
//                 <div className="grid grid-cols-2 gap-3">
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start"
//                   >
//                     <Briefcase className="h-4 w-4 mr-2" />
//                     Business
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start"
//                   >
//                     <Laptop className="h-4 w-4 mr-2" />
//                     Personal
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start"
//                   >
//                     <Building className="h-4 w-4 mr-2" />
//                     Enterprise
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start"
//                   >
//                     <Server className="h-4 w-4 mr-2" />
//                     Development
//                   </Button>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <h3 className="text-white font-medium">Which features are most important to you?</h3>
//                 <div className="grid grid-cols-2 gap-3">
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start"
//                   >
//                     <Lock className="h-4 w-4 mr-2" />
//                     Security
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start"
//                   >
//                     <Globe className="h-4 w-4 mr-2" />
//                     Integrations
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start"
//                   >
//                     <BarChart className="h-4 w-4 mr-2" />
//                     Analytics
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start"
//                   >
//                     <HeartHandshake className="h-4 w-4 mr-2" />
//                     Support
//                   </Button>
//                 </div>
//               </div>

//               <div className="pt-4">
//                 <Button className="w-full bg-gradient-to-r from-[#3352CC] to-purple-600 hover:opacity-90">
//                   Get Recommendation
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Features Comparison */}
//       <div className="mt-20 max-w-5xl mx-auto">
//         <Tabs defaultValue="features" className="w-full">
//           <TabsList className="bg-gray-800 border border-gray-700 mx-auto">
//             <TabsTrigger value="features">Features Comparison</TabsTrigger>
//             <TabsTrigger value="faq">FAQ</TabsTrigger>
//             <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
//           </TabsList>

//           <TabsContent value="features" className="mt-8">
//             <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
//               <CardHeader>
//                 <CardTitle className="text-white">Compare Plan Features</CardTitle>
//                 <CardDescription className="text-gray-300">
//                   Detailed breakdown of what is included in each plan
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="border-b border-gray-800">
//                         <th className="text-left py-4 px-2 text-gray-300 font-medium">Feature</th>
//                         {pricingPlans.map((plan) => (
//                           <th key={plan.id} className="text-left py-4 px-2 font-medium text-white">
//                             <div className={`inline-block p-1 rounded-full bg-gradient-to-r ${plan.color} mr-2`}>
//                               {plan.icon}
//                             </div>
//                             {plan.name}
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr className="border-b border-gray-800">
//                         <td className="py-4 px-2 text-gray-300">Integrations</td>
//                         <td className="py-4 px-2 text-gray-200">Up to 5</td>
//                         <td className="py-4 px-2 text-gray-200">Up to 20</td>
//                         <td className="py-4 px-2 text-gray-200">Unlimited</td>
//                       </tr>
//                       <tr className="border-b border-gray-800">
//                         <td className="py-4 px-2 text-gray-300">Analytics</td>
//                         <td className="py-4 px-2 text-gray-200">Basic</td>
//                         <td className="py-4 px-2 text-gray-200">Advanced</td>
//                         <td className="py-4 px-2 text-gray-200">Enterprise</td>
//                       </tr>
//                       <tr className="border-b border-gray-800">
//                         <td className="py-4 px-2 text-gray-300">Support</td>
//                         <td className="py-4 px-2 text-gray-200">Email</td>
//                         <td className="py-4 px-2 text-gray-200">24/7 Priority</td>
//                         <td className="py-4 px-2 text-gray-200">24/7 Dedicated</td>
//                       </tr>
//                       <tr className="border-b border-gray-800">
//                         <td className="py-4 px-2 text-gray-300">Custom Branding</td>
//                         <td className="py-4 px-2">
//                           <X className="h-5 w-5 text-gray-500" />
//                         </td>
//                         <td className="py-4 px-2">
//                           <Check className="h-5 w-5 text-green-500" />
//                         </td>
//                         <td className="py-4 px-2">
//                           <Check className="h-5 w-5 text-green-500" />
//                         </td>
//                       </tr>
//                       <tr className="border-b border-gray-800">
//                         <td className="py-4 px-2 text-gray-300">API Access</td>
//                         <td className="py-4 px-2">
//                           <X className="h-5 w-5 text-gray-500" />
//                         </td>
//                         <td className="py-4 px-2">
//                           <X className="h-5 w-5 text-gray-500" />
//                         </td>
//                         <td className="py-4 px-2">
//                           <Check className="h-5 w-5 text-green-500" />
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="py-4 px-2 text-gray-300">Team Members</td>
//                         <td className="py-4 px-2 text-gray-200">1</td>
//                         <td className="py-4 px-2 text-gray-200">5</td>
//                         <td className="py-4 px-2 text-gray-200">Unlimited</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="mt-6 text-center">
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800"
//                     onClick={() => setShowAllFeatures(true)}
//                   >
//                     View All Features
//                     <ArrowRight className="h-4 w-4 ml-2" />
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="faq" className="mt-8">
//             <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
//               <CardHeader>
//                 <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
//                 <CardDescription className="text-gray-300">Common questions about our pricing plans</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <Accordion type="single" collapsible className="w-full">
//                   <AccordionItem value="item-1" className="border-gray-800">
//                     <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
//                       Can I change plans later?
//                     </AccordionTrigger>
//                     <AccordionContent className="text-gray-300 pb-4">
//                       Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and
//                       we will prorate your billing. When upgrading, you will get immediate access to all the new features.
//                       When downgrading, you will keep access to your current plan until the end of your billing cycle.
//                     </AccordionContent>
//                   </AccordionItem>
//                   <AccordionItem value="item-2" className="border-gray-800">
//                     <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
//                       How does the billing work?
//                     </AccordionTrigger>
//                     <AccordionContent className="text-gray-300 pb-4">
//                       We offer both monthly and annual billing. Annual plans come with a {discountPercentage}% discount
//                       compared to monthly billing. You can pay with all major credit cards, PayPal, and for annual
//                       enterprise plans, we also accept bank transfers. Your subscription will automatically renew at the
//                       end of each billing period.
//                     </AccordionContent>
//                   </AccordionItem>
//                   <AccordionItem value="item-3" className="border-gray-800">
//                     <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
//                       Is there a free trial?
//                     </AccordionTrigger>
//                     <AccordionContent className="text-gray-300 pb-4">
//                       Yes, all plans come with a 14-day free trial. No credit card required to start. During your trial,
//                       you will have access to all features of the plan you selected. Well send you a reminder before your
//                       trial ends, and you can choose to subscribe or cancel at any time.
//                     </AccordionContent>
//                   </AccordionItem>
//                   <AccordionItem value="item-4" className="border-gray-800">
//                     <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
//                       What payment methods do you accept?
//                     </AccordionTrigger>
//                     <AccordionContent className="text-gray-300 pb-4">
//                       We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and bank
//                       transfers for annual enterprise plans. All payments are processed securely through our payment
//                       providers, and we never store your full credit card information on our servers.
//                     </AccordionContent>
//                   </AccordionItem>
//                   <AccordionItem value="item-5" className="border-gray-800">
//                     <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
//                       Do you offer refunds?
//                     </AccordionTrigger>
//                     <AccordionContent className="text-gray-300 pb-4">
//                       We offer a 30-day money-back guarantee for all plans. If you are not satisfied with our service
//                       within the first 30 days of your paid subscription, contact our support team, and well process a
//                       full refund. After 30 days, you can still cancel your subscription at any time, but refunds are
//                       handled on a case-by-case basis.
//                     </AccordionContent>
//                   </AccordionItem>
//                   <AccordionItem value="item-6" className="border-gray-800">
//                     <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
//                       Can I customize my plan?
//                     </AccordionTrigger>
//                     <AccordionContent className="text-gray-300 pb-4">
//                       Enterprise customers can customize their plans with additional features and services. For other
//                       plans, you can purchase add-ons for specific features without upgrading your entire plan. Contact
//                       our sales team to discuss your specific requirements and get a custom quote.
//                     </AccordionContent>
//                   </AccordionItem>
//                 </Accordion>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="enterprise" className="mt-8">
//             <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
//               <CardHeader>
//                 <CardTitle className="text-white">Enterprise Solutions</CardTitle>
//                 <CardDescription className="text-gray-300">
//                   Custom solutions for large organizations with specific requirements
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <div className="flex items-start">
//                       <div className="p-2 rounded-full bg-[#3352CC]/10 text-[#3352CC] mr-3">
//                         <Shield className="h-5 w-5" />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-white mb-1">Advanced Security</h3>
//                         <p className="text-gray-300 text-sm">
//                           Enterprise-grade security with SSO, SAML, custom security policies, and compliance features.
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-start">
//                       <div className="p-2 rounded-full bg-[#3352CC]/10 text-[#3352CC] mr-3">
//                         <Users className="h-5 w-5" />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-white mb-1">Dedicated Support</h3>
//                         <p className="text-gray-300 text-sm">
//                           Dedicated account manager and priority support with guaranteed response times.
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-start">
//                       <div className="p-2 rounded-full bg-[#3352CC]/10 text-[#3352CC] mr-3">
//                         <Database className="h-5 w-5" />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-white mb-1">Custom Development</h3>
//                         <p className="text-gray-300 text-sm">
//                           Custom feature development and platform extensions tailored to your needs.
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-800">
//                     <h3 className="text-xl font-bold text-white mb-4">Request a Custom Quote</h3>
//                     <p className="text-gray-300 mb-4">
//                       Our enterprise solutions are tailored to your specific needs. Contact our sales team to discuss
//                       your requirements.
//                     </p>
//                     <Button className="w-full bg-gradient-to-r from-[#3352CC] to-purple-600 hover:opacity-90">
//                       Contact Sales Team
//                     </Button>
//                     <div className="mt-4 flex items-center justify-center text-gray-400 text-sm">
//                       <HelpCircle className="h-4 w-4 mr-2" />
//                       <span>Or call us at +1 (555) 123-4567</span>
//                     </div>
//                   </div>
//                 </div>

//                 <Separator className="bg-gray-800" />

//                 <div>
//                   <h3 className="text-lg font-semibold text-white mb-4">Trusted by leading enterprises</h3>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                     {["Acme Inc", "Globex", "Initech", "Umbrella Corp"].map((company, i) => (
//                       <div
//                         key={i}
//                         className="flex items-center justify-center h-12 bg-gray-800/50 rounded-md border border-gray-800 text-gray-400"
//                       >
//                         {company}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>

//       {/* Money Back Guarantee */}
//       <div className="mt-16 max-w-5xl mx-auto">
//         <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl border border-gray-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
//           <div className="flex items-center">
//             <div className="p-3 rounded-full bg-[#3352CC]/10 text-[#3352CC] mr-4">
//               <CheckCircle2 className="h-8 w-8" />
//             </div>
//             <div>
//               <h3 className="text-xl font-bold text-white">30-Day Money Back Guarantee</h3>
//               <p className="text-gray-300">Not satisfied? Get a full refund within 30 days, no questions asked.</p>
//             </div>
//           </div>
//           <Button className="shrink-0 bg-[#3352CC] hover:bg-[#3352CC]/90">Start Risk-Free Trial</Button>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <motion.div
//         className="mt-20 text-center max-w-3xl mx-auto p-8 rounded-2xl relative overflow-hidden"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5, duration: 0.5 }}
//       >
//         {/* Background gradient */}
//         <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl" />

//         {/* Decorative elements */}
//         <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
//           <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
//         </div>

//         <div className="relative z-10">
//           <h2 className="text-3xl font-bold text-white">Ready to get started?</h2>
//           <p className="mt-4 text-gray-300 mb-8">
//             Join thousands of satisfied customers who are already using our platform.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90">
//               <CreditCard className="h-4 w-4 mr-2" />
//               Start Free Trial
//             </Button>
//             <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
//               <Calendar className="h-4 w-4 mr-2" />
//               Schedule a Demo
//             </Button>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   )
// }

// "use client"

// import React from "react"

// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import {
//   Check,
//   X,
//   Zap,
//   Shield,
//   Clock,
//   Users,
//   Sparkles,
//   Star,
//   Crown,
//   ChevronRight,
//   CreditCard,
//   Calendar,
//   ArrowRight,
//   Download,
//   HelpCircle,
//   Building,
//   CheckCircle2,
//   Briefcase,
//   Laptop,
//   Server,
//   Database,
//   Lock,
//   Globe,
//   BarChart,
//   MessageSquare,
//   HeartHandshake,
//   Rocket,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Switch } from "@/components/ui/switch"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// import { Separator } from "@/components/ui/separator"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { useQueryUser } from "@/hooks/user-queries"

// interface PricingFeature {
//   name: string
//   icon: React.ReactNode
//   included: boolean | string
//   description?: string
// }

// interface PricingPlan {
//   id: string
//   name: string
//   description: string
//   price: {
//     monthly: number
//     annually: number
//   }
//   features: PricingFeature[]
//   popular: boolean
//   badge?: string
//   color: string
//   icon: React.ReactNode
//   idealFor?: string[]
// }

// interface Testimonial {
//   id: string
//   name: string
//   role: string
//   company: string
//   avatar: string
//   quote: string
//   planId: string
// }

// export default function PricingSection() {
//   const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly")
//   const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)
//   const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0)
//   const [showAllFeatures, setShowAllFeatures] = useState(false)
//   // Add a new state to track the active plan
//   const { data } = useQueryUser()
//   const activePlan = data?.data?.subscription?.plan || "PRO"

//   const pricingPlans: PricingPlan[] = [
//     {
//       id: "starter",
//       name: "Starter",
//       description: "Perfect for individuals and small projects",
//       price: {
//         monthly: 9,
//         annually: 99,
//       },
//       features: [
//         {
//           name: "Up to 5 integrations",
//           icon: <Users className="h-4 w-4" />,
//           included: true,
//           description: "Connect up to 5 different platforms or services to your account.",
//         },
//         {
//           name: "Basic analytics",
//           icon: <Sparkles className="h-4 w-4" />,
//           included: true,
//           description: "View simple metrics and reports about your integrations and usage.",
//         },
//         {
//           name: "24/7 support",
//           icon: <Clock className="h-4 w-4" />,
//           included: false,
//           description: "Get help anytime via our dedicated support team.",
//         },
//         {
//           name: "Custom branding",
//           icon: <Star className="h-4 w-4" />,
//           included: false,
//           description: "Add your own logo and customize the look and feel.",
//         },
//         {
//           name: "Advanced security",
//           icon: <Shield className="h-4 w-4" />,
//           included: false,
//           description: "Enhanced security features including 2FA and audit logs.",
//         },
//         {
//           name: "API access",
//           icon: <Zap className="h-4 w-4" />,
//           included: false,
//           description: "Programmatic access to our platform via RESTful API.",
//         },
//         {
//           name: "Data export",
//           icon: <Download className="h-4 w-4" />,
//           included: true,
//           description: "Export your data in CSV or JSON format.",
//         },
//         {
//           name: "Email notifications",
//           icon: <MessageSquare className="h-4 w-4" />,
//           included: true,
//           description: "Receive alerts and updates via email.",
//         },
//       ],
//       popular: false,
//       color: "from-blue-600 to-indigo-600",
//       icon: <Star className="h-5 w-5" />,
//       idealFor: ["Freelancers", "Side projects", "Personal use"],
//     },
//     {
//       id: "pro",
//       name: "Professional",
//       description: "Ideal for growing businesses and teams",
//       price: {
//         monthly: 29,
//         annually: 290,
//       },
//       features: [
//         {
//           name: "Up to 20 integrations",
//           icon: <Users className="h-4 w-4" />,
//           included: true,
//           description: "Connect up to 20 different platforms or services to your account.",
//         },
//         {
//           name: "Advanced analytics",
//           icon: <Sparkles className="h-4 w-4" />,
//           included: true,
//           description: "Detailed metrics, custom reports, and data visualization tools.",
//         },
//         {
//           name: "24/7 priority support",
//           icon: <Clock className="h-4 w-4" />,
//           included: true,
//           description: "Get priority help anytime via our dedicated support team with faster response times.",
//         },
//         {
//           name: "Custom branding",
//           icon: <Star className="h-4 w-4" />,
//           included: true,
//           description: "Add your own logo, customize colors, and create a branded experience.",
//         },
//         {
//           name: "Advanced security",
//           icon: <Shield className="h-4 w-4" />,
//           included: true,
//           description: "Enhanced security features including 2FA, SSO, and detailed audit logs.",
//         },
//         {
//           name: "API access",
//           icon: <Zap className="h-4 w-4" />,
//           included: false,
//           description: "Programmatic access to our platform via RESTful API with higher rate limits.",
//         },
//         {
//           name: "Team collaboration",
//           icon: <Users className="h-4 w-4" />,
//           included: true,
//           description: "Add team members with custom permission levels.",
//         },
//         {
//           name: "Workflow automation",
//           icon: <Rocket className="h-4 w-4" />,
//           included: true,
//           description: "Create automated workflows between your integrations.",
//         },
//       ],
//       popular: true,
//       badge: "Most Popular",
//       color: "from-purple-600 to-pink-600",
//       icon: <Crown className="h-5 w-5" />,
//       idealFor: ["Small businesses", "Growing teams", "Professional services"],
//     },
//     {
//       id: "enterprise",
//       name: "Enterprise",
//       description: "Advanced features for large organizations",
//       price: {
//         monthly: 99,
//         annually: 990,
//       },
//       features: [
//         {
//           name: "Unlimited integrations",
//           icon: <Users className="h-4 w-4" />,
//           included: true,
//           description: "Connect unlimited platforms or services to your account.",
//         },
//         {
//           name: "Enterprise analytics",
//           icon: <Sparkles className="h-4 w-4" />,
//           included: true,
//           description: "Advanced analytics with custom dashboards, AI insights, and predictive modeling.",
//         },
//         {
//           name: "24/7 dedicated support",
//           icon: <Clock className="h-4 w-4" />,
//           included: true,
//           description: "Dedicated account manager and priority support with guaranteed response times.",
//         },
//         {
//           name: "Custom branding",
//           icon: <Star className="h-4 w-4" />,
//           included: true,
//           description: "Complete white-labeling and custom branding options with design services.",
//         },
//         {
//           name: "Enterprise security",
//           icon: <Shield className="h-4 w-4" />,
//           included: true,
//           description: "Enterprise-grade security with SSO, SAML, custom security policies, and compliance features.",
//         },
//         {
//           name: "Full API access",
//           icon: <Zap className="h-4 w-4" />,
//           included: true,
//           description: "Unlimited API access with dedicated endpoints and custom development support.",
//         },
//         {
//           name: "Advanced compliance",
//           icon: <CheckCircle2 className="h-4 w-4" />,
//           included: true,
//           description: "HIPAA, GDPR, SOC2 compliance and custom compliance reporting.",
//         },
//         {
//           name: "Custom development",
//           icon: <Laptop className="h-4 w-4" />,
//           included: true,
//           description: "Custom feature development and platform extensions.",
//         },
//       ],
//       popular: false,
//       color: "from-amber-500 to-orange-600",
//       icon: <Zap className="h-5 w-5" />,
//       idealFor: ["Large organizations", "Enterprise companies", "High-compliance industries"],
//     },
//   ]

//   const testimonials: Testimonial[] = [
//     {
//       id: "t1",
//       name: "Sarah Johnson",
//       role: "Marketing Director",
//       company: "GrowthLabs",
//       avatar: "/placeholder-user.jpg",
//       quote:
//         "The Professional plan has transformed how our marketing team manages integrations. The workflow automation saves us hours every week.",
//       planId: "pro",
//     },
//     {
//       id: "t2",
//       name: "Michael Chen",
//       role: "Freelance Developer",
//       company: "Self-employed",
//       avatar: "/placeholder-user.jpg",
//       quote:
//         "As a freelancer, the Starter plan gives me everything I need at an affordable price. I can connect all my essential tools without breaking the bank.",
//       planId: "starter",
//     },
//     {
//       id: "t3",
//       name: "Jessica Williams",
//       role: "CTO",
//       company: "TechNova Inc.",
//       avatar: "/placeholder-user.jpg",
//       quote:
//         "The Enterprise plan's security features and dedicated support have been crucial for our company's compliance requirements. Worth every penny.",
//       planId: "enterprise",
//     },
//   ]

//   const discountPercentage = 15

//   const allFeatures = [
//     {
//       category: "Integrations",
//       features: [
//         { name: "Number of integrations", starter: "Up to 5", pro: "Up to 20", enterprise: "Unlimited" },
//         { name: "Social media platforms", starter: "Basic", pro: "Advanced", enterprise: "Complete" },
//         { name: "CRM integrations", starter: "Limited", pro: "Full", enterprise: "Custom" },
//         { name: "Third-party app connections", starter: "3", pro: "10", enterprise: "Unlimited" },
//       ],
//     },
//     {
//       category: "Analytics & Reporting",
//       features: [
//         { name: "Dashboard", starter: "Basic", pro: "Advanced", enterprise: "Custom" },
//         { name: "Data visualization", starter: "Limited", pro: "Full", enterprise: "Advanced" },
//         { name: "Custom reports", starter: false, pro: true, enterprise: true },
//         { name: "Export options", starter: "CSV", pro: "CSV, JSON", enterprise: "CSV, JSON, API" },
//         { name: "Historical data", starter: "30 days", pro: "1 year", enterprise: "Unlimited" },
//       ],
//     },
//     {
//       category: "Security",
//       features: [
//         { name: "Two-factor authentication", starter: false, pro: true, enterprise: true },
//         { name: "SSO", starter: false, pro: false, enterprise: true },
//         { name: "Audit logs", starter: false, pro: true, enterprise: true },
//         { name: "Custom security policies", starter: false, pro: false, enterprise: true },
//         { name: "Data encryption", starter: "Standard", pro: "Advanced", enterprise: "Military-grade" },
//       ],
//     },
//     {
//       category: "Support",
//       features: [
//         { name: "Support channels", starter: "Email", pro: "Email, Chat", enterprise: "Email, Chat, Phone" },
//         { name: "Response time", starter: "48 hours", pro: "24 hours", enterprise: "4 hours" },
//         { name: "Dedicated account manager", starter: false, pro: false, enterprise: true },
//         { name: "Onboarding", starter: "Self-serve", pro: "Guided", enterprise: "White-glove" },
//         { name: "Training sessions", starter: false, pro: "2 sessions", enterprise: "Unlimited" },
//       ],
//     },
//   ]

//   return (
//     <div className="space-y-16">
//       {/* Header */}
//       <div className="text-center space-y-4 max-w-3xl mx-auto">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//           <Badge variant="outline" className="px-3 py-1 bg-gray-800 border-gray-700 text-gray-300 mb-4">
//             <Sparkles className="h-3.5 w-3.5 mr-1 text-purple-400" />
//             Choose the perfect plan
//           </Badge>
//           <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
//             Pricing Plans
//           </h1>
//           <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
//             Select the perfect plan for your needs. Upgrade or downgrade at any time.
//           </p>
//         </motion.div>

//         {/* Billing Toggle */}
//         <motion.div
//           className="flex justify-center items-center mt-8 space-x-3"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//         >
//           <span className={`text-sm ${billingCycle === "monthly" ? "text-white" : "text-gray-500"}`}>Monthly</span>
//           <Switch
//             checked={billingCycle === "annually"}
//             onCheckedChange={(checked) => setBillingCycle(checked ? "annually" : "monthly")}
//             className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-pink-600"
//           />
//           <span
//             className={`text-sm flex items-center gap-1.5 ${billingCycle === "annually" ? "text-white" : "text-gray-500"}`}
//           >
//             Annually
//             <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 text-xs">
//               Save {discountPercentage}%
//             </Badge>
//           </span>
//         </motion.div>
//       </div>

//       {/* Pricing Cards */}
//       <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//         {pricingPlans.map((plan, index) => (
//           <motion.div
//             key={plan.id}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
//             onMouseEnter={() => setHoveredPlan(plan.id)}
//             onMouseLeave={() => setHoveredPlan(null)}
//             className="relative"
//           >
//             {/* Popular Badge - Repositioned */}
//             {plan.popular && (
//               <div className="absolute -top-5 inset-x-0 flex justify-center z-10">
//                 <Badge
//                   className={`bg-gradient-to-r ${plan.color} border-0 px-4 py-1.5 text-white font-medium shadow-lg`}
//                 >
//                   {plan.badge}
//                 </Badge>
//               </div>
//             )}

//             {plan.id === activePlan && (
//               <div className="absolute -right-2 top-6 z-10 rotate-0 overflow-hidden">
//                 <div className="relative">
//                   <div className="absolute -left-2 h-2 w-2 bg-emerald-600 rounded-bl-sm"></div>
//                   <div className="bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-1 text-white font-medium shadow-lg flex items-center gap-1.5">
//                     <CheckCircle2 className="h-3.5 w-3.5" />
//                     Active Plan
//                   </div>
//                 </div>
//                 <div className="absolute -right-2 h-2 w-2 bg-emerald-600 rounded-tr-sm"></div>
//               </div>
//             )}

//             {/* Glow Effect */}
//             <AnimatePresence>
//               {hoveredPlan === plan.id && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className={`absolute inset-0 bg-gradient-to-r ${plan.color} blur-xl opacity-20 rounded-xl`}
//                 />
//               )}
//             </AnimatePresence>

//             <Card
//               className={`
//               relative overflow-hidden border-gray-800 bg-gray-900/80 backdrop-blur-sm
//               ${plan.popular ? "border-gray-700 mt-4" : "border-gray-800"}
//               ${hoveredPlan === plan.id ? "transform-gpu -translate-y-1 transition-transform" : "transition-transform"}
//               ${plan.id === activePlan ? "ring-2 ring-green-500/30" : ""}
//             `}
//             >
//               {/* Gradient Border Effect */}
//               <div
//                 className={`absolute inset-0 rounded-xl opacity-0 ${hoveredPlan === plan.id ? "opacity-100" : ""} transition-opacity duration-300`}
//               >
//                 <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${plan.color} p-[1px]`}>
//                   <div className="absolute inset-[1px] rounded-[10px] bg-gray-900"></div>
//                 </div>
//               </div>

//               <CardHeader className="relative z-10">
//                 <div className="flex items-center justify-between">
//                   <div className={`p-2 rounded-full bg-gradient-to-r ${plan.color}`}>{plan.icon}</div>
//                   <Badge variant="outline" className="bg-gray-800 border-gray-700 text-gray-300">
//                     {plan.id.charAt(0).toUpperCase() + plan.id.slice(1)}
//                   </Badge>
//                 </div>
//                 <CardTitle className="text-2xl font-bold mt-4 text-white">{plan.name}</CardTitle>
//                 <CardDescription className="text-gray-300">{plan.description}</CardDescription>
//               </CardHeader>
//               <CardContent className="relative z-10">
//                 <div className="flex items-baseline mb-6">
//                   <span className="text-4xl font-bold text-white">
//                     ${billingCycle === "monthly" ? plan.price.monthly : Math.round(plan.price.annually / 12)}
//                   </span>
//                   <span className="text-gray-300 ml-1">/month</span>
//                 </div>

//                 {billingCycle === "annually" && (
//                   <div className="mb-6 text-sm">
//                     <span className="text-gray-300">Billed annually at </span>
//                     <span className="font-semibold text-white">${plan.price.annually}</span>
//                     <span className="text-green-400 ml-2">Save ${plan.price.monthly * 12 - plan.price.annually}</span>
//                   </div>
//                 )}

//                 {/* Ideal For Tags */}
//                 {plan.idealFor && (
//                   <div className="mb-4 flex flex-wrap gap-2">
//                     {plan.idealFor.map((ideal, i) => (
//                       <Badge key={i} variant="secondary" className="bg-gray-800 text-gray-300 border-0">
//                         {ideal}
//                       </Badge>
//                     ))}
//                   </div>
//                 )}

//                 <ul className="space-y-3">
//                   {plan.features.slice(0, 6).map((feature, i) => (
//                     <li key={i} className="flex items-start">
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <div className="flex items-start">
//                               {feature.included ? (
//                                 <div className={`p-1 rounded-full bg-gradient-to-r ${plan.color} mr-2 shrink-0 mt-0.5`}>
//                                   <Check className="h-3 w-3 text-white" />
//                                 </div>
//                               ) : (
//                                 <div className="p-1 rounded-full bg-gray-800 mr-2 shrink-0 mt-0.5">
//                                   <X className="h-3 w-3 text-gray-500" />
//                                 </div>
//                               )}
//                               <span className={feature.included ? "text-gray-200" : "text-gray-400"}>
//                                 {feature.name}
//                               </span>
//                             </div>
//                           </TooltipTrigger>
//                           <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200 max-w-xs">
//                             {feature.description}
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                     </li>
//                   ))}
//                 </ul>

//                 {/* Show more features button */}
//                 {plan.features.length > 6 && (
//                   <Button
//                     variant="link"
//                     className="mt-2 text-gray-400 hover:text-white p-0 h-auto"
//                     onClick={() => setShowAllFeatures(true)}
//                   >
//                     Show all features <ChevronRight className="h-3 w-3 ml-1" />
//                   </Button>
//                 )}
//               </CardContent>
//               <CardFooter className="relative z-10">
//                 {plan.id === activePlan ? (
//                   <Button
//                     variant="outline"
//                     className="w-full border-green-500/30 text-green-500 hover:bg-gray-800 hover:text-green-400"
//                   >
//                     Current Plan
//                     <CheckCircle2 className="h-4 w-4 ml-1" />
//                   </Button>
//                 ) : (
//                   <Button className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 transition-opacity`}>
//                     {plan.id === "enterprise" ? "Contact Sales" : "Get Started"}
//                     <ChevronRight className="h-4 w-4 ml-1" />
//                   </Button>
//                 )}
//               </CardFooter>
//             </Card>
//           </motion.div>
//         ))}
//       </div>

//       {/* All Features Dialog */}
//       <Dialog open={showAllFeatures} onOpenChange={setShowAllFeatures}>
//         <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl">
//           <DialogHeader>
//             <DialogTitle className="text-xl font-bold">All Features Comparison</DialogTitle>
//             <DialogDescription className="text-gray-300">
//               Detailed comparison of all features across our pricing plans
//             </DialogDescription>
//           </DialogHeader>
//           <div className="overflow-y-auto max-h-[60vh] pr-2 -mr-2">
//             <table className="w-full">
//               <thead className="sticky top-0 bg-gray-900 z-10">
//                 <tr className="border-b border-gray-800">
//                   <th className="text-left py-4 px-2 text-gray-300 font-medium">Feature</th>
//                   <th className="text-left py-4 px-2 font-medium text-white">Starter</th>
//                   <th className="text-left py-4 px-2 font-medium text-white">Professional</th>
//                   <th className="text-left py-4 px-2 font-medium text-white">Enterprise</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {allFeatures.map((category, categoryIndex) => (
//                   <React.Fragment key={categoryIndex}>
//                     <tr className="bg-gray-800/30">
//                       <td colSpan={4} className="py-3 px-2 font-semibold text-white">
//                         {category.category}
//                       </td>
//                     </tr>
//                     {category.features.map((feature, featureIndex) => (
//                       <tr key={`${categoryIndex}-${featureIndex}`} className="border-b border-gray-800">
//                         <td className="py-3 px-2 text-gray-300">{feature.name}</td>
//                         <td className="py-3 px-2">
//                           {typeof feature.starter === "boolean" ? (
//                             feature.starter ? (
//                               <Check className="h-5 w-5 text-green-500" />
//                             ) : (
//                               <X className="h-5 w-5 text-gray-500" />
//                             )
//                           ) : (
//                             <span className="text-gray-200">{feature.starter}</span>
//                           )}
//                         </td>
//                         <td className="py-3 px-2">
//                           {typeof feature.pro === "boolean" ? (
//                             feature.pro ? (
//                               <Check className="h-5 w-5 text-green-500" />
//                             ) : (
//                               <X className="h-5 w-5 text-gray-500" />
//                             )
//                           ) : (
//                             <span className="text-gray-200">{feature.pro}</span>
//                           )}
//                         </td>
//                         <td className="py-3 px-2">
//                           {typeof feature.enterprise === "boolean" ? (
//                             feature.enterprise ? (
//                               <Check className="h-5 w-5 text-green-500" />
//                             ) : (
//                               <X className="h-5 w-5 text-gray-500" />
//                             )
//                           ) : (
//                             <span className="text-gray-200">{feature.enterprise}</span>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </React.Fragment>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <DialogFooter>
//             <Button onClick={() => setShowAllFeatures(false)}>Close</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Testimonials Section */}
//       <div className="mt-16 max-w-5xl mx-auto">
//         <div className="text-center mb-10">
//           <h2 className="text-3xl font-bold text-white mb-4">What Our Customers Say</h2>
//           <p className="text-gray-400 max-w-2xl mx-auto">
//             Hear from our customers about how our pricing plans have helped their businesses grow.
//           </p>
//         </div>

//         <div className="relative">
//           <div className="overflow-hidden">
//             <div className="flex flex-col md:flex-row gap-6">
//               {testimonials.map((testimonial, index) => {
//                 const plan = pricingPlans.find((p) => p.id === testimonial.planId)
//                 return (
//                   <motion.div
//                     key={testimonial.id}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 * index, duration: 0.5 }}
//                     className="w-full md:w-1/3"
//                   >
//                     <Card className="h-full border-gray-800 bg-gray-900/80 backdrop-blur-sm relative overflow-hidden">
//                       {/* Subtle gradient based on plan */}
//                       <div
//                         className="absolute inset-0 opacity-5 bg-gradient-to-br rounded-xl"
//                         style={{
//                           background: plan
//                             ? `linear-gradient(to bottom right, ${plan.color.replace("from-", "").replace("to-", "")})`
//                             : undefined,
//                         }}
//                       />

//                       <CardContent className="p-6 relative z-10">
//                         <div className="flex items-center gap-4 mb-4">
//                           <Avatar className="h-12 w-12 border border-gray-700">
//                             <AvatarImage src={testimonial.avatar} />
//                             <AvatarFallback className="bg-gray-800 text-gray-400">
//                               {testimonial.name
//                                 .split(" ")
//                                 .map((n) => n[0])
//                                 .join("")}
//                             </AvatarFallback>
//                           </Avatar>
//                           <div>
//                             <h4 className="font-medium text-white">{testimonial.name}</h4>
//                             <p className="text-sm text-gray-400">
//                               {testimonial.role}, {testimonial.company}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="mb-4">
//                           <p className="text-gray-300 italic">{testimonial.quote}</p>
//                         </div>

//                         {plan && (
//                           <div className="flex items-center mt-4">
//                             <Badge className={`bg-gradient-to-r ${plan.color} text-white border-0`}>
//                               {plan.name} Plan
//                             </Badge>
//                           </div>
//                         )}
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Plan Selector Tool */}
//       <div className="mt-20 max-w-4xl mx-auto">
//         <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm overflow-hidden">
//           <CardHeader className="relative">
//             <div className="absolute inset-0 bg-gradient-to-r from-[#3352CC]/10 to-purple-900/10" />
//             <div className="relative z-10">
//               <CardTitle className="text-2xl font-bold text-white">Not sure which plan is right for you?</CardTitle>
//               <CardDescription className="text-gray-300">
//                 Answer a few questions and we will recommend the best plan for your needs.
//               </CardDescription>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-6">
//               <div className="space-y-2">
//                 <h3 className="text-white font-medium">How many team members do you have?</h3>
//                 <div className="grid grid-cols-3 gap-3">
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC]"
//                   >
//                     Just me
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC]"
//                   >
//                     2-10 people
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC]"
//                   >
//                     11+ people
//                   </Button>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <h3 className="text-white font-medium">What is your primary use case?</h3>
//                 <div className="grid grid-cols-2 gap-3">
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start"
//                   >
//                     <Briefcase className="h-4 w-4 mr-2" />
//                     Business
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start"
//                   >
//                     <Laptop className="h-4 w-4 mr-2" />
//                     Personal
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start"
//                   >
//                     <Building className="h-4 w-4 mr-2" />
//                     Enterprise
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start"
//                   >
//                     <Server className="h-4 w-4 mr-2" />
//                     Development
//                   </Button>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <h3 className="text-white font-medium">Which features are most important to you?</h3>
//                 <div className="grid grid-cols-2 gap-3">
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start"
//                   >
//                     <Lock className="h-4 w-4 mr-2" />
//                     Security
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start"
//                   >
//                     <Globe className="h-4 w-4 mr-2" />
//                     Integrations
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start"
//                   >
//                     <BarChart className="h-4 w-4 mr-2" />
//                     Analytics
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start"
//                   >
//                     <HeartHandshake className="h-4 w-4 mr-2" />
//                     Support
//                   </Button>
//                 </div>
//               </div>

//               <div className="pt-4">
//                 <Button className="w-full bg-gradient-to-r from-[#3352CC] to-purple-600 hover:opacity-90">
//                   Get Recommendation
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Features Comparison */}
//       <div className="mt-20 max-w-5xl mx-auto">
//         <Tabs defaultValue="features" className="w-full">
//           <TabsList className="bg-gray-800 border border-gray-700 mx-auto">
//             <TabsTrigger value="features">Features Comparison</TabsTrigger>
//             <TabsTrigger value="faq">FAQ</TabsTrigger>
//             <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
//           </TabsList>

//           <TabsContent value="features" className="mt-8">
//             <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
//               <CardHeader>
//                 <CardTitle className="text-white">Compare Plan Features</CardTitle>
//                 <CardDescription className="text-gray-300">
//                   Detailed breakdown of what is included in each plan
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="border-b border-gray-800">
//                         <th className="text-left py-4 px-2 text-gray-300 font-medium">Feature</th>
//                         {pricingPlans.map((plan) => (
//                           <th key={plan.id} className="text-left py-4 px-2 font-medium text-white">
//                             <div className={`inline-block p-1 rounded-full bg-gradient-to-r ${plan.color} mr-2`}>
//                               {plan.icon}
//                             </div>
//                             {plan.name}
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr className="border-b border-gray-800">
//                         <td className="py-4 px-2 text-gray-300">Integrations</td>
//                         <td className="py-4 px-2 text-gray-200">Up to 5</td>
//                         <td className="py-4 px-2 text-gray-200">Up to 20</td>
//                         <td className="py-4 px-2 text-gray-200">Unlimited</td>
//                       </tr>
//                       <tr className="border-b border-gray-800">
//                         <td className="py-4 px-2 text-gray-300">Analytics</td>
//                         <td className="py-4 px-2 text-gray-200">Basic</td>
//                         <td className="py-4 px-2 text-gray-200">Advanced</td>
//                         <td className="py-4 px-2 text-gray-200">Enterprise</td>
//                       </tr>
//                       <tr className="border-b border-gray-800">
//                         <td className="py-4 px-2 text-gray-300">Support</td>
//                         <td className="py-4 px-2 text-gray-200">Email</td>
//                         <td className="py-4 px-2 text-gray-200">24/7 Priority</td>
//                         <td className="py-4 px-2 text-gray-200">24/7 Dedicated</td>
//                       </tr>
//                       <tr className="border-b border-gray-800">
//                         <td className="py-4 px-2 text-gray-300">Custom Branding</td>
//                         <td className="py-4 px-2">
//                           <X className="h-5 w-5 text-gray-500" />
//                         </td>
//                         <td className="py-4 px-2">
//                           <Check className="h-5 w-5 text-green-500" />
//                         </td>
//                         <td className="py-4 px-2">
//                           <Check className="h-5 w-5 text-green-500" />
//                         </td>
//                       </tr>
//                       <tr className="border-b border-gray-800">
//                         <td className="py-4 px-2 text-gray-300">API Access</td>
//                         <td className="py-4 px-2">
//                           <X className="h-5 w-5 text-gray-500" />
//                         </td>
//                         <td className="py-4 px-2">
//                           <X className="h-5 w-5 text-gray-500" />
//                         </td>
//                         <td className="py-4 px-2">
//                           <Check className="h-5 w-5 text-green-500" />
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="py-4 px-2 text-gray-300">Team Members</td>
//                         <td className="py-4 px-2 text-gray-200">1</td>
//                         <td className="py-4 px-2 text-gray-200">5</td>
//                         <td className="py-4 px-2 text-gray-200">Unlimited</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="mt-6 text-center">
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:bg-gray-800"
//                     onClick={() => setShowAllFeatures(true)}
//                   >
//                     View All Features
//                     <ArrowRight className="h-4 w-4 ml-2" />
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="faq" className="mt-8">
//             <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
//               <CardHeader>
//                 <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
//                 <CardDescription className="text-gray-300">Common questions about our pricing plans</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <Accordion type="single" collapsible className="w-full">
//                   <AccordionItem value="item-1" className="border-gray-800">
//                     <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
//                       Can I change plans later?
//                     </AccordionTrigger>
//                     <AccordionContent className="text-gray-300 pb-4">
//                       Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we
//                       will prorate your billing. When upgrading, you will get immediate access to all the new features.
//                       When downgrading, you will keep access to your current plan until the end of your billing cycle.
//                     </AccordionContent>
//                   </AccordionItem>
//                   <AccordionItem value="item-2" className="border-gray-800">
//                     <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
//                       How does the billing work?
//                     </AccordionTrigger>
//                     <AccordionContent className="text-gray-300 pb-4">
//                       We offer both monthly and annual billing. Annual plans come with a {discountPercentage}% discount
//                       compared to monthly billing. You can pay with all major credit cards, PayPal, and for annual
//                       enterprise plans, we also accept bank transfers. Your subscription will automatically renew at the
//                       end of each billing period.
//                     </AccordionContent>
//                   </AccordionItem>
//                   <AccordionItem value="item-3" className="border-gray-800">
//                     <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
//                       Is there a free trial?
//                     </AccordionTrigger>
//                     <AccordionContent className="text-gray-300 pb-4">
//                       Yes, all plans come with a 14-day free trial. No credit card required to start. During your trial,
//                       you will have access to all features of the plan you selected. Well send you a reminder before
//                       your trial ends, and you can choose to subscribe or cancel at any time.
//                     </AccordionContent>
//                   </AccordionItem>
//                   <AccordionItem value="item-4" className="border-gray-800">
//                     <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
//                       What payment methods do you accept?
//                     </AccordionTrigger>
//                     <AccordionContent className="text-gray-300 pb-4">
//                       We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and bank
//                       transfers for annual enterprise plans. All payments are processed securely through our payment
//                       providers, and we never store your full credit card information on our servers.
//                     </AccordionContent>
//                   </AccordionItem>
//                   <AccordionItem value="item-5" className="border-gray-800">
//                     <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
//                       Do you offer refunds?
//                     </AccordionTrigger>
//                     <AccordionContent className="text-gray-300 pb-4">
//                       We offer a 30-day money-back guarantee for all plans. If you are not satisfied with our service
//                       within the first 30 days of your paid subscription, contact our support team, and well process a
//                       full refund. After 30 days, you can still cancel your subscription at any time, but refunds are
//                       handled on a case-by-case basis.
//                     </AccordionContent>
//                   </AccordionItem>
//                   <AccordionItem value="item-6" className="border-gray-800">
//                     <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
//                       Can I customize my plan?
//                     </AccordionTrigger>
//                     <AccordionContent className="text-gray-300 pb-4">
//                       Enterprise customers can customize their plans with additional features and services. For other
//                       plans, you can purchase add-ons for specific features without upgrading your entire plan. Contact
//                       our sales team to discuss your specific requirements and get a custom quote.
//                     </AccordionContent>
//                   </AccordionItem>
//                 </Accordion>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="enterprise" className="mt-8">
//             <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
//               <CardHeader>
//                 <CardTitle className="text-white">Enterprise Solutions</CardTitle>
//                 <CardDescription className="text-gray-300">
//                   Custom solutions for large organizations with specific requirements
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <div className="flex items-start">
//                       <div className="p-2 rounded-full bg-[#3352CC]/10 text-[#3352CC] mr-3">
//                         <Shield className="h-5 w-5" />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-white mb-1">Advanced Security</h3>
//                         <p className="text-gray-300 text-sm">
//                           Enterprise-grade security with SSO, SAML, custom security policies, and compliance features.
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-start">
//                       <div className="p-2 rounded-full bg-[#3352CC]/10 text-[#3352CC] mr-3">
//                         <Users className="h-5 w-5" />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-white mb-1">Dedicated Support</h3>
//                         <p className="text-gray-300 text-sm">
//                           Dedicated account manager and priority support with guaranteed response times.
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-start">
//                       <div className="p-2 rounded-full bg-[#3352CC]/10 text-[#3352CC] mr-3">
//                         <Database className="h-5 w-5" />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-white mb-1">Custom Development</h3>
//                         <p className="text-gray-300 text-sm">
//                           Custom feature development and platform extensions tailored to your needs.
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-800">
//                     <h3 className="text-xl font-bold text-white mb-4">Request a Custom Quote</h3>
//                     <p className="text-gray-300 mb-4">
//                       Our enterprise solutions are tailored to your specific needs. Contact our sales team to discuss
//                       your requirements.
//                     </p>
//                     <Button className="w-full bg-gradient-to-r from-[#3352CC] to-purple-600 hover:opacity-90">
//                       Contact Sales Team
//                     </Button>
//                     <div className="mt-4 flex items-center justify-center text-gray-400 text-sm">
//                       <HelpCircle className="h-4 w-4 mr-2" />
//                       <span>Or call us at +1 (555) 123-4567</span>
//                     </div>
//                   </div>
//                 </div>

//                 <Separator className="bg-gray-800" />

//                 <div>
//                   <h3 className="text-lg font-semibold text-white mb-4">Trusted by leading enterprises</h3>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                     {["Acme Inc", "Globex", "Initech", "Umbrella Corp"].map((company, i) => (
//                       <div
//                         key={i}
//                         className="flex items-center justify-center h-12 bg-gray-800/50 rounded-md border border-gray-800 text-gray-400"
//                       >
//                         {company}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>

//       {/* Money Back Guarantee */}
//       <div className="mt-16 max-w-5xl mx-auto">
//         <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl border border-gray-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
//           <div className="flex items-center">
//             <div className="p-3 rounded-full bg-[#3352CC]/10 text-[#3352CC] mr-4">
//               <CheckCircle2 className="h-8 w-8" />
//             </div>
//             <div>
//               <h3 className="text-xl font-bold text-white">30-Day Money Back Guarantee</h3>
//               <p className="text-gray-300">Not satisfied? Get a full refund within 30 days, no questions asked.</p>
//             </div>
//           </div>
//           <Button className="shrink-0 bg-[#3352CC] hover:bg-[#3352CC]/90">Start Risk-Free Trial</Button>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <motion.div
//         className="mt-20 text-center max-w-3xl mx-auto p-8 rounded-2xl relative overflow-hidden"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5, duration: 0.5 }}
//       >
//         {/* Background gradient */}
//         <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl" />

//         {/* Decorative elements */}
//         <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
//           <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
//         </div>

//         <div className="relative z-10">
//           <h2 className="text-3xl font-bold text-white">Ready to get started?</h2>
//           <p className="mt-4 text-gray-300 mb-8">
//             Join thousands of satisfied customers who are already using our platform.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90">
//               <CreditCard className="h-4 w-4 mr-2" />
//               Start Free Trial
//             </Button>
//             <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
//               <Calendar className="h-4 w-4 mr-2" />
//               Schedule a Demo
//             </Button>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   )
// }

"use client"

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check,
  X,
  Zap,
  Shield,
  Clock,
  Users,
  Sparkles,
  Star,
  Crown,
  ChevronRight,
  CreditCard,
  Calendar,
  ArrowRight,
  Download,
  HelpCircle,
  Building,
  CheckCircle2,
  Briefcase,
  Laptop,
  Server,
  Database,
  Lock,
  Globe,
  BarChart,
  MessageSquare,
  HeartHandshake,
  Rocket,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useQueryUser } from "@/hooks/user-queries"

interface PricingFeature {
  name: string
  icon: React.ReactNode
  included: boolean | string
  description?: string
}

interface PricingPlan {
  id: string
  name: string
  description: string
  price: {
    monthly: number
    annually: number
  }
  features: PricingFeature[]
  popular: boolean
  badge?: string
  color: string
  icon: React.ReactNode
  idealFor?: string[]
}

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  quote: string
  planId: string
}

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly")
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0)
  const [showAllFeatures, setShowAllFeatures] = useState(false)
  // Add a new state to track the active plan
  const { data } = useQueryUser()
  const activePlan = data?.data?.subscription?.plan || "FREE"

  const [teamSize, setTeamSize] = useState<string | null>(null)
  const [useCase, setUseCase] = useState<string | null>(null)
  const [importantFeature, setImportantFeature] = useState<string | null>(null)
  const [recommendedPlan, setRecommendedPlan] = useState<string | null>(null)

  const pricingPlans: PricingPlan[] = [
    {
      id: "FREE",
      name: "FREE",
      description: "Basic features for personal projects",
      price: {
        monthly: 0,
        annually: 0,
      },
      features: [
        {
          name: "Up to 2 integrations",
          icon: <Users className="h-4 w-4" />,
          included: true,
          description: "Connect up to 2 different platforms or services to your account.",
        },
        {
          name: "Basic analytics",
          icon: <Sparkles className="h-4 w-4" />,
          included: true,
          description: "View simple metrics about your usage.",
        },
        {
          name: "Community support",
          icon: <Clock className="h-4 w-4" />,
          included: true,
          description: "Get help via our community forums.",
        },
        {
          name: "Custom branding",
          icon: <Star className="h-4 w-4" />,
          included: false,
          description: "Add your own logo and customize the look and feel.",
        },
        {
          name: "Basic security",
          icon: <Shield className="h-4 w-4" />,
          included: true,
          description: "Standard security features.",
        },
        {
          name: "API access",
          icon: <Zap className="h-4 w-4" />,
          included: false,
          description: "Programmatic access to our platform via RESTful API.",
        },
        {
          name: "Data export",
          icon: <Download className="h-4 w-4" />,
          included: false,
          description: "Export your data in CSV or JSON format.",
        },
        {
          name: "Email notifications",
          icon: <MessageSquare className="h-4 w-4" />,
          included: true,
          description: "Receive basic alerts via email.",
        },
      ],
      popular: false,
      color: "from-gray-500 to-gray-600",
      icon: <Zap className="h-5 w-5" />,
      idealFor: ["Personal projects", "Trying it out", "Hobbyists"],
    },
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for individuals and small projects",
      price: {
        monthly: 9,
        annually: 99,
      },
      features: [
        {
          name: "Up to 5 integrations",
          icon: <Users className="h-4 w-4" />,
          included: true,
          description: "Connect up to 5 different platforms or services to your account.",
        },
        {
          name: "Basic analytics",
          icon: <Sparkles className="h-4 w-4" />,
          included: true,
          description: "View simple metrics and reports about your integrations and usage.",
        },
        {
          name: "24/7 support",
          icon: <Clock className="h-4 w-4" />,
          included: false,
          description: "Get help anytime via our dedicated support team.",
        },
        {
          name: "Custom branding",
          icon: <Star className="h-4 w-4" />,
          included: false,
          description: "Add your own logo and customize the look and feel.",
        },
        {
          name: "Advanced security",
          icon: <Shield className="h-4 w-4" />,
          included: false,
          description: "Enhanced security features including 2FA and audit logs.",
        },
        {
          name: "API access",
          icon: <Zap className="h-4 w-4" />,
          included: false,
          description: "Programmatic access to our platform via RESTful API.",
        },
        {
          name: "Data export",
          icon: <Download className="h-4 w-4" />,
          included: true,
          description: "Export your data in CSV or JSON format.",
        },
        {
          name: "Email notifications",
          icon: <MessageSquare className="h-4 w-4" />,
          included: true,
          description: "Receive alerts and updates via email.",
        },
      ],
      popular: false,
      color: "from-blue-600 to-indigo-600",
      icon: <Star className="h-5 w-5" />,
      idealFor: ["Freelancers", "Side projects", "Personal use"],
    },
    {
      id: "PRO",
      name: "PRO",
      description: "Ideal for growing businesses and teams",
      price: {
        monthly: 29,
        annually: 290,
      },
      features: [
        {
          name: "Up to 20 integrations",
          icon: <Users className="h-4 w-4" />,
          included: true,
          description: "Connect up to 20 different platforms or services to your account.",
        },
        {
          name: "Advanced analytics",
          icon: <Sparkles className="h-4 w-4" />,
          included: true,
          description: "Detailed metrics, custom reports, and data visualization tools.",
        },
        {
          name: "24/7 priority support",
          icon: <Clock className="h-4 w-4" />,
          included: true,
          description: "Get priority help anytime via our dedicated support team with faster response times.",
        },
        {
          name: "Custom branding",
          icon: <Star className="h-4 w-4" />,
          included: true,
          description: "Add your own logo, customize colors, and create a branded experience.",
        },
        {
          name: "Advanced security",
          icon: <Shield className="h-4 w-4" />,
          included: true,
          description: "Enhanced security features including 2FA, SSO, and detailed audit logs.",
        },
        {
          name: "API access",
          icon: <Zap className="h-4 w-4" />,
          included: false,
          description: "Programmatic access to our platform via RESTful API with higher rate limits.",
        },
        {
          name: "Team collaboration",
          icon: <Users className="h-4 w-4" />,
          included: true,
          description: "Add team members with custom permission levels.",
        },
        {
          name: "Workflow automation",
          icon: <Rocket className="h-4 w-4" />,
          included: true,
          description: "Create automated workflows between your integrations.",
        },
      ],
      popular: true,
      badge: "Most Popular",
      color: "from-purple-600 to-pink-600",
      icon: <Crown className="h-5 w-5" />,
      idealFor: ["Small businesses", "Growing teams", "Professional services"],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Advanced features for large organizations",
      price: {
        monthly: 99,
        annually: 990,
      },
      features: [
        {
          name: "Unlimited integrations",
          icon: <Users className="h-4 w-4" />,
          included: true,
          description: "Connect unlimited platforms or services to your account.",
        },
        {
          name: "Enterprise analytics",
          icon: <Sparkles className="h-4 w-4" />,
          included: true,
          description: "Advanced analytics with custom dashboards, AI insights, and predictive modeling.",
        },
        {
          name: "24/7 dedicated support",
          icon: <Clock className="h-4 w-4" />,
          included: true,
          description: "Dedicated account manager and priority support with guaranteed response times.",
        },
        {
          name: "Custom branding",
          icon: <Star className="h-4 w-4" />,
          included: true,
          description: "Complete white-labeling and custom branding options with design services.",
        },
        {
          name: "Enterprise security",
          icon: <Shield className="h-4 w-4" />,
          included: true,
          description: "Enterprise-grade security with SSO, SAML, custom security policies, and compliance features.",
        },
        {
          name: "Full API access",
          icon: <Zap className="h-4 w-4" />,
          included: true,
          description: "Unlimited API access with dedicated endpoints and custom development support.",
        },
        {
          name: "Advanced compliance",
          icon: <CheckCircle2 className="h-4 w-4" />,
          included: true,
          description: "HIPAA, GDPR, SOC2 compliance and custom compliance reporting.",
        },
        {
          name: "Custom development",
          icon: <Laptop className="h-4 w-4" />,
          included: true,
          description: "Custom feature development and platform extensions.",
        },
      ],
      popular: false,
      color: "from-amber-500 to-orange-600",
      icon: <Zap className="h-5 w-5" />,
      idealFor: ["Large organizations", "Enterprise companies", "High-compliance industries"],
    },
  ]

  const testimonials: Testimonial[] = [
    {
      id: "t1",
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "GrowthLabs",
      avatar: "/placeholder-user.jpg",
      quote:
        "The Professional plan has transformed how our marketing team manages integrations. The workflow automation saves us hours every week.",
      planId: "pro",
    },
    {
      id: "t2",
      name: "Michael Chen",
      role: "Freelance Developer",
      company: "Self-employed",
      avatar: "/placeholder-user.jpg",
      quote:
        "As a freelancer, the Starter plan gives me everything I need at an affordable price. I can connect all my essential tools without breaking the bank.",
      planId: "starter",
    },
    {
      id: "t3",
      name: "Jessica Williams",
      role: "CTO",
      company: "TechNova Inc.",
      avatar: "/placeholder-user.jpg",
      quote:
        "The Enterprise plan's security features and dedicated support have been crucial for our company's compliance requirements. Worth every penny.",
      planId: "enterprise",
    },
  ]

  const discountPercentage = 15

  const allFeatures = [
    {
      category: "Integrations",
      features: [
        { name: "Number of integrations", starter: "Up to 5", pro: "Up to 20", enterprise: "Unlimited" },
        { name: "Social media platforms", starter: "Basic", pro: "Advanced", enterprise: "Complete" },
        { name: "CRM integrations", starter: "Limited", pro: "Full", enterprise: "Custom" },
        { name: "Third-party app connections", starter: "3", pro: "10", enterprise: "Unlimited" },
      ],
    },
    {
      category: "Analytics & Reporting",
      features: [
        { name: "Dashboard", starter: "Basic", pro: "Advanced", enterprise: "Custom" },
        { name: "Data visualization", starter: "Limited", pro: "Full", enterprise: "Advanced" },
        { name: "Custom reports", starter: false, pro: true, enterprise: true },
        { name: "Export options", starter: "CSV", pro: "CSV, JSON", enterprise: "CSV, JSON, API" },
        { name: "Historical data", starter: "30 days", pro: "1 year", enterprise: "Unlimited" },
      ],
    },
    {
      category: "Security",
      features: [
        { name: "Two-factor authentication", starter: false, pro: true, enterprise: true },
        { name: "SSO", starter: false, pro: false, enterprise: true },
        { name: "Audit logs", starter: false, pro: true, enterprise: true },
        { name: "Custom security policies", starter: false, pro: false, enterprise: true },
        { name: "Data encryption", starter: "Standard", pro: "Advanced", enterprise: "Military-grade" },
      ],
    },
    {
      category: "Support",
      features: [
        { name: "Support channels", starter: "Email", pro: "Email, Chat", enterprise: "Email, Chat, Phone" },
        { name: "Response time", starter: "48 hours", pro: "24 hours", enterprise: "4 hours" },
        { name: "Dedicated account manager", starter: false, pro: false, enterprise: true },
        { name: "Onboarding", starter: "Self-serve", pro: "Guided", enterprise: "White-glove" },
        { name: "Training sessions", starter: false, pro: "2 sessions", enterprise: "Unlimited" },
      ],
    },
  ]

  const getRecommendation = () => {
    if (!teamSize || !useCase || !importantFeature) {
      return
    }

    // Simple recommendation logic
    if (teamSize === "large" || useCase === "enterprise") {
      setRecommendedPlan("enterprise")
      return
    }

    if ((teamSize === "small" && (useCase === "business" || importantFeature === "analytics")) || 
        (importantFeature === "security" && useCase !== "personal")) {
      setRecommendedPlan("pro")
      return
    }

    if (teamSize === "small" && useCase === "development") {
      setRecommendedPlan("starter")
      return
    }

    if (teamSize === "just-me" && (useCase === "personal" || importantFeature === "integrations")) {
      if (importantFeature === "support") {
        setRecommendedPlan("starter")
      } else {
        setRecommendedPlan("free")
      }
      return
    }

    // Default recommendation
    setRecommendedPlan("free")
  }

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Badge variant="outline" className="px-3 py-1 bg-gray-800 border-gray-700 text-gray-300 mb-4">
            <Sparkles className="h-3.5 w-3.5 mr-1 text-purple-400" />
            Choose the perfect plan
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Pricing Plans
          </h1>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Select the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          className="flex justify-center items-center mt-8 space-x-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className={`text-sm ${billingCycle === "monthly" ? "text-white" : "text-gray-500"}`}>Monthly</span>
          <Switch
            checked={billingCycle === "annually"}
            onCheckedChange={(checked) => setBillingCycle(checked ? "annually" : "monthly")}
            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-pink-600"
          />
          <span
            className={`text-sm flex items-center gap-1.5 ${billingCycle === "annually" ? "text-white" : "text-gray-500"}`}
          >
            Annually
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 text-xs">
              Save {discountPercentage}%
            </Badge>
          </span>
        </motion.div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
            onMouseEnter={() => setHoveredPlan(plan.id)}
            onMouseLeave={() => setHoveredPlan(null)}
            className="relative"
          >
            {/* Popular Badge - Repositioned */}
            {plan.popular && (
              <div className="absolute -top-5 inset-x-0 flex justify-center z-10">
                <Badge
                  className={`bg-gradient-to-r ${plan.color} border-0 px-4 py-1.5 text-white font-medium shadow-lg`}
                >
                  {plan.badge}
                </Badge>
              </div>
            )}

            {plan.id === activePlan && (
              <div className="absolute -right-2 top-6 z-10 rotate-0 overflow-hidden">
                <div className="relative">
                  <div className="absolute -left-2 h-2 w-2 bg-emerald-600 rounded-bl-sm"></div>
                  <div className="bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-1 text-white font-medium shadow-lg flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Active Plan
                  </div>
                </div>
                <div className="absolute -right-2 h-2 w-2 bg-emerald-600 rounded-tr-sm"></div>
              </div>
            )}

            {/* Glow Effect */}
            <AnimatePresence>
              {hoveredPlan === plan.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute inset-0 bg-gradient-to-r ${plan.color} blur-xl opacity-20 rounded-xl`}
                />
              )}
            </AnimatePresence>

            <Card
              id={`plan-${plan.id}`}
              className={`
              relative overflow-hidden border-gray-800 bg-gray-900/80 backdrop-blur-sm
              ${plan.popular ? "border-gray-700 mt-4" : "border-gray-800"}
              ${hoveredPlan === plan.id ? "transform-gpu -translate-y-1 transition-transform" : "transition-transform"}
              ${plan.id === activePlan ? "ring-2 ring-green-500/30" : ""}
            `}
            >
              {/* Gradient Border Effect */}
              <div
                className={`absolute inset-0 rounded-xl opacity-0 ${hoveredPlan === plan.id ? "opacity-100" : ""} transition-opacity duration-300`}
              >
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${plan.color} p-[1px]`}>
                  <div className="absolute inset-[1px] rounded-[10px] bg-gray-900"></div>
                </div>
              </div>

              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-full bg-gradient-to-r ${plan.color}`}>{plan.icon}</div>
                  <Badge variant="outline" className="bg-gray-800 border-gray-700 text-gray-300">
                    {plan.id.charAt(0).toUpperCase() + plan.id.slice(1)}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold mt-4 text-white">{plan.name}</CardTitle>
                <CardDescription className="text-gray-300">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-white">
                    ${billingCycle === "monthly" ? plan.price.monthly : Math.round(plan.price.annually / 12)}
                  </span>
                  <span className="text-gray-300 ml-1">/month</span>
                </div>

                {billingCycle === "annually" && (
                  <div className="mb-6 text-sm">
                    <span className="text-gray-300">Billed annually at </span>
                    <span className="font-semibold text-white">${plan.price.annually}</span>
                    <span className="text-green-400 ml-2">Save ${plan.price.monthly * 12 - plan.price.annually}</span>
                  </div>
                )}

                {/* Ideal For Tags */}
                {plan.idealFor && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {plan.idealFor.map((ideal, i) => (
                      <Badge key={i} variant="secondary" className="bg-gray-800 text-gray-300 border-0">
                        {ideal}
                      </Badge>
                    ))}
                  </div>
                )}

                <ul className="space-y-3">
                  {plan.features.slice(0, 6).map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-start">
                              {feature.included ? (
                                <div className={`p-1 rounded-full bg-gradient-to-r ${plan.color} mr-2 shrink-0 mt-0.5`}>
                                  <Check className="h-3 w-3 text-white" />
                                </div>
                              ) : (
                                <div className="p-1 rounded-full bg-gray-800 mr-2 shrink-0 mt-0.5">
                                  <X className="h-3 w-3 text-gray-500" />
                                </div>
                              )}
                              <span className={feature.included ? "text-gray-200" : "text-gray-400"}>
                                {feature.name}
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200 max-w-xs">
                            {feature.description}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  ))}
                </ul>

                {/* Show more features button */}
                {plan.features.length > 6 && (
                  <Button
                    variant="link"
                    className="mt-2 text-gray-400 hover:text-white p-0 h-auto"
                    onClick={() => setShowAllFeatures(true)}
                  >
                    Show all features <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                )}
              </CardContent>
              <CardFooter className="relative z-10">
                {plan.id === activePlan ? (
                  <Button
                    variant="outline"
                    className="w-full border-green-500/30 text-green-500 hover:bg-gray-800 hover:text-green-400"
                  >
                    Current Plan
                    <CheckCircle2 className="h-4 w-4 ml-1" />
                  </Button>
                ) : (
                  <Button className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 transition-opacity`}>
                    {plan.id === "enterprise" ? "Contact Sales" : "Get Started"}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* All Features Dialog */}
      <Dialog open={showAllFeatures} onOpenChange={setShowAllFeatures}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">All Features Comparison</DialogTitle>
            <DialogDescription className="text-gray-300">
              Detailed comparison of all features across our pricing plans
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[60vh] pr-2 -mr-2">
            <table className="w-full">
              <thead className="sticky top-0 bg-gray-900 z-10">
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-2 text-gray-300 font-medium">Feature</th>
                  <th className="text-left py-4 px-2 font-medium text-white">Starter</th>
                  <th className="text-left py-4 px-2 font-medium text-white">Professional</th>
                  <th className="text-left py-4 px-2 font-medium text-white">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {allFeatures.map((category, categoryIndex) => (
                  <React.Fragment key={categoryIndex}>
                    <tr className="bg-gray-800/30">
                      <td colSpan={4} className="py-3 px-2 font-semibold text-white">
                        {category.category}
                      </td>
                    </tr>
                    {category.features.map((feature, featureIndex) => (
                      <tr key={`${categoryIndex}-${featureIndex}`} className="border-b border-gray-800">
                        <td className="py-3 px-2 text-gray-300">{feature.name}</td>
                        <td className="py-3 px-2">
                          {typeof feature.starter === "boolean" ? (
                            feature.starter ? (
                              <Check className="h-5 w-5 text-green-500" />
                            ) : (
                              <X className="h-5 w-5 text-gray-500" />
                            )
                          ) : (
                            <span className="text-gray-200">{feature.starter}</span>
                          )}
                        </td>
                        <td className="py-3 px-2">
                          {typeof feature.pro === "boolean" ? (
                            feature.pro ? (
                              <Check className="h-5 w-5 text-green-500" />
                            ) : (
                              <X className="h-5 w-5 text-gray-500" />
                            )
                          ) : (
                            <span className="text-gray-200">{feature.pro}</span>
                          )}
                        </td>
                        <td className="py-3 px-2">
                          {typeof feature.enterprise === "boolean" ? (
                            feature.enterprise ? (
                              <Check className="h-5 w-5 text-green-500" />
                            ) : (
                              <X className="h-5 w-5 text-gray-500" />
                            )
                          ) : (
                            <span className="text-gray-200">{feature.enterprise}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowAllFeatures(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Testimonials Section */}
      <div className="mt-16 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">What Our Customers Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hear from our customers about how our pricing plans have helped their businesses grow.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex flex-col md:flex-row gap-6">
              {testimonials.map((testimonial, index) => {
                const plan = pricingPlans.find((p) => p.id === testimonial.planId)
                return (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="w-full md:w-1/3"
                  >
                    <Card className="h-full border-gray-800 bg-gray-900/80 backdrop-blur-sm relative overflow-hidden">
                      {/* Subtle gradient based on plan */}
                      <div
                        className="absolute inset-0 opacity-5 bg-gradient-to-br rounded-xl"
                        style={{
                          background: plan
                            ? `linear-gradient(to bottom right, ${plan.color.replace("from-", "").replace("to-", "")})`
                            : undefined,
                        }}
                      />

                      <CardContent className="p-6 relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                          <Avatar className="h-12 w-12 border border-gray-700">
                            <AvatarImage src={testimonial.avatar} />
                            <AvatarFallback className="bg-gray-800 text-gray-400">
                              {testimonial.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-white">{testimonial.name}</h4>
                            <p className="text-sm text-gray-400">
                              {testimonial.role}, {testimonial.company}
                            </p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-gray-300 italic">{testimonial.quote}</p>
                        </div>

                        {plan && (
                          <div className="flex items-center mt-4">
                            <Badge className={`bg-gradient-to-r ${plan.color} text-white border-0`}>
                              {plan.name} Plan
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Plan Selector Tool */}
      <div className="mt-20 max-w-4xl mx-auto">
        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm overflow-hidden">
          <CardHeader className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3352CC]/10 to-purple-900/10" />
            <div className="relative z-10">
              <CardTitle className="text-2xl font-bold text-white">Not sure which plan is right for you?</CardTitle>
              <CardDescription className="text-gray-300">
                Answer a few questions and we will recommend the best plan for your needs.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-white font-medium">How many team members do you have?</h3>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    className={`border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] ${
                      teamSize === "just-me" ? "bg-gray-800 border-[#3352CC]" : ""
                    }`}
                    onClick={() => setTeamSize("just-me")}
                  >
                    Just me
                  </Button>
                  <Button
                    variant="outline"
                    className={`border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] ${
                      teamSize === "small" ? "bg-gray-800 border-[#3352CC]" : ""
                    }`}
                    onClick={() => setTeamSize("small")}
                  >
                    2-10 people
                  </Button>
                  <Button
                    variant="outline"
                    className={`border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] ${
                      teamSize === "large" ? "bg-gray-800 border-[#3352CC]" : ""
                    }`}
                    onClick={() => setTeamSize("large")}
                  >
                    11+ people
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-white font-medium">What is your primary use case?</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className={`border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start ${
                      useCase === "business" ? "bg-gray-800 border-[#3352CC]" : ""
                    }`}
                    onClick={() => setUseCase("business")}
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Business
                  </Button>
                  <Button
                    variant="outline"
                    className={`border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start ${
                      useCase === "personal" ? "bg-gray-800 border-[#3352CC]" : ""
                    }`}
                    onClick={() => setUseCase("personal")}
                  >
                    <Laptop className="h-4 w-4 mr-2" />
                    Personal
                  </Button>
                  <Button
                    variant="outline"
                    className={`border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start ${
                      useCase === "enterprise" ? "bg-gray-800 border-[#3352CC]" : ""
                    }`}
                    onClick={() => setUseCase("enterprise")}
                  >
                    <Building className="h-4 w-4 mr-2" />
                    Enterprise
                  </Button>
                  <Button
                    variant="outline"
                    className={`border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start ${
                      useCase === "development" ? "bg-gray-800 border-[#3352CC]" : ""
                    }`}
                    onClick={() => setUseCase("development")}
                  >
                    <Server className="h-4 w-4 mr-2" />
                    Development
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-white font-medium">Which features are most important to you?</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className={`border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start ${
                      importantFeature === "security" ? "bg-gray-800 border-[#3352CC]" : ""
                    }`}
                    onClick={() => setImportantFeature("security")}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Security
                  </Button>
                  <Button
                    variant="outline"
                    className={`border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start ${
                      importantFeature === "integrations" ? "bg-gray-800 border-[#3352CC]" : ""
                    }`}
                    onClick={() => setImportantFeature("integrations")}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Integrations
                  </Button>
                  <Button
                    variant="outline"
                    className={`border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start ${
                      importantFeature === "analytics" ? "bg-gray-800 border-[#3352CC]" : ""
                    }`}
                    onClick={() => setImportantFeature("analytics")}
                  >
                    <BarChart className="h-4 w-4 mr-2" />
                    Analytics
                  </Button>
                  <Button
                    variant="outline"
                    className={`border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#3352CC] justify-start ${
                      importantFeature === "support" ? "bg-gray-800 border-[#3352CC]" : ""
                    }`}
                    onClick={() => setImportantFeature("support")}
                  >
                    <HeartHandshake className="h-4 w-4 mr-2" />
                    Support
                  </Button>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  className="w-full bg-gradient-to-r from-[#3352CC] to-purple-600 hover:opacity-90"
                  onClick={getRecommendation}
                  disabled={!teamSize || !useCase || !importantFeature}
                >
                  Get Recommendation
                </Button>
              </div>

              {recommendedPlan && (
                <div className="mt-6 p-4 border border-gray-700 rounded-lg bg-gray-800/50">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <h3 className="text-white font-medium">Your Recommended Plan</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-white">
                        {pricingPlans.find(plan => plan.id === recommendedPlan)?.name}
                      </p>
                      <p className="text-sm text-gray-300">
                        {pricingPlans.find(plan => plan.id === recommendedPlan)?.description}
                      </p>
                    </div>
                    <Button 
                      className={`bg-gradient-to-r ${pricingPlans.find(plan => plan.id === recommendedPlan)?.color} hover:opacity-90`}
                      onClick={() => {
                        // Scroll to the plan
                        const element = document.getElementById(`plan-${recommendedPlan}`);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      View Plan
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Comparison */}
        <div className="mt-20 max-w-5xl mx-auto">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="bg-gray-800 border border-gray-700 mx-auto">
              <TabsTrigger value="features">Features Comparison</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="mt-8">
              <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Compare Plan Features</CardTitle>
                  <CardDescription className="text-gray-300">
                    Detailed breakdown of what is included in each plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="text-left py-4 px-2 text-gray-300 font-medium">Feature</th>
                          {pricingPlans.map((plan) => (
                            <th key={plan.id} className="text-left py-4 px-2 font-medium text-white">
                              <div className={`inline-block p-1 rounded-full bg-gradient-to-r ${plan.color} mr-2`}>
                                {plan.icon}
                              </div>
                              {plan.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-800">
                          <td className="py-4 px-2 text-gray-300">Integrations</td>
                          <td className="py-4 px-2 text-gray-200">Up to 2</td>
                          <td className="py-4 px-2 text-gray-200">Up to 5</td>
                          <td className="py-4 px-2 text-gray-200">Up to 20</td>
                          <td className="py-4 px-2 text-gray-200">Unlimited</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-4 px-2 text-gray-300">Analytics</td>
                          <td className="py-4 px-2 text-gray-200">Basic</td>
                          <td className="py-4 px-2 text-gray-200">Basic</td>
                          <td className="py-4 px-2 text-gray-200">Advanced</td>
                          <td className="py-4 px-2 text-gray-200">Enterprise</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-4 px-2 text-gray-300">Support</td>
                          <td className="py-4 px-2 text-gray-200">Community</td>
                          <td className="py-4 px-2 text-gray-200">Email</td>
                          <td className="py-4 px-2 text-gray-200">24/7 Priority</td>
                          <td className="py-4 px-2 text-gray-200">24/7 Dedicated</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-4 px-2 text-gray-300">Custom Branding</td>
                          <td className="py-4 px-2">
                            <X className="h-5 w-5 text-gray-500" />
                          </td>
                          <td className="py-4 px-2">
                            <X className="h-5 w-5 text-gray-500" />
                          </td>
                          <td className="py-4 px-2">
                            <Check className="h-5 w-5 text-green-500" />
                          </td>
                          <td className="py-4 px-2">
                            <Check className="h-5 w-5 text-green-500" />
                          </td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-4 px-2 text-gray-300">API Access</td>
                          <td className="py-4 px-2">
                            <X className="h-5 w-5 text-gray-500" />
                          </td>
                          <td className="py-4 px-2">
                            <X className="h-5 w-5 text-gray-500" />
                          </td>
                          <td className="py-4 px-2">
                            <X className="h-5 w-5 text-gray-500" />
                          </td>
                          <td className="py-4 px-2">
                            <Check className="h-5 w-5 text-green-500" />
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 px-2 text-gray-300">Team Members</td>
                          <td className="py-4 px-2 text-gray-200">1</td>
                          <td className="py-4 px-2 text-gray-200">1</td>
                          <td className="py-4 px-2 text-gray-200">5</td>
                          <td className="py-4 px-2 text-gray-200">Unlimited</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 text-center">
                    <Button
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                      onClick={() => setShowAllFeatures(true)}
                    >
                      View All Features
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq" className="mt-8">
              <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
                  <CardDescription className="text-gray-300">Common questions about our pricing plans</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-gray-800">
                      <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
                        Can I change plans later?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 pb-4">
                        Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we
                        will prorate your billing. When upgrading, you will get immediate access to all the new features.
                        When downgrading, you will keep access to your current plan until the end of your billing cycle.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-gray-800">
                      <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
                        How does the billing work?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 pb-4">
                        We offer both monthly and annual billing. Annual plans come with a {discountPercentage}% discount
                        compared to monthly billing. You can pay with all major credit cards, PayPal, and for annual
                        enterprise plans, we also accept bank transfers. Your subscription will automatically renew at the
                        end of each billing period.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-gray-800">
                      <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
                        Is there a free trial?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 pb-4">
                        Yes, all plans come with a 14-day free trial. No credit card required to start. During your trial,
                        you will have access to all features of the plan you selected. Well send you a reminder before
                        your trial ends, and you can choose to subscribe or cancel at any time.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-gray-800">
                      <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
                        What payment methods do you accept?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 pb-4">
                        We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and bank
                        transfers for annual enterprise plans. All payments are processed securely through our payment
                        providers, and we never store your full credit card information on our servers.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5" className="border-gray-800">
                      <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
                        Do you offer refunds?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 pb-4">
                        We offer a 30-day money-back guarantee for all plans. If you are not satisfied with our service
                        within the first 30 days of your paid subscription, contact our support team, and well process a
                        full refund. After 30 days, you can still cancel your subscription at any time, but refunds are
                        handled on a case-by-case basis.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6" className="border-gray-800">
                      <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
                        Can I customize my plan?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 pb-4">
                        Enterprise customers can customize their plans with additional features and services. For other
                        plans, you can purchase add-ons for specific features without upgrading your entire plan. Contact
                        our sales team to discuss your specific requirements and get a custom quote.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="enterprise" className="mt-8">
              <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Enterprise Solutions</CardTitle>
                  <CardDescription className="text-gray-300">
                    Custom solutions for large organizations with specific requirements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="p-2 rounded-full bg-[#3352CC]/10 text-[#3352CC] mr-3">
                          <Shield className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-1">Advanced Security</h3>
                          <p className="text-gray-300 text-sm">
                            Enterprise-grade security with SSO, SAML, custom security policies, and compliance features.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="p-2 rounded-full bg-[#3352CC]/10 text-[#3352CC] mr-3">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-1">Dedicated Support</h3>
                          <p className="text-gray-300 text-sm">
                            Dedicated account manager and priority support with guaranteed response times.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="p-2 rounded-full bg-[#3352CC]/10 text-[#3352CC] mr-3">
                          <Database className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-1">Custom Development</h3>
                          <p className="text-gray-300 text-sm">
                            Custom feature development and platform extensions tailored to your needs.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-800">
                      <h3 className="text-xl font-bold text-white mb-4">Request a Custom Quote</h3>
                      <p className="text-gray-300 mb-4">
                        Our enterprise solutions are tailored to your specific needs. Contact our sales team to discuss
                        your requirements.
                      </p>
                      <Button className="w-full bg-gradient-to-r from-[#3352CC] to-purple-600 hover:opacity-90">
                        Contact Sales Team
                      </Button>
                      <div className="mt-4 flex items-center justify-center text-gray-400 text-sm">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        <span>Or call us at +1 (555) 123-4567</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gray-800" />

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Trusted by leading enterprises</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {["Acme Inc", "Globex", "Initech", "Umbrella Corp"].map((company, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-center h-12 bg-gray-800/50 rounded-md border border-gray-800 text-gray-400"
                        >
                          {company}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl border border-gray-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-[#3352CC]/10 text-[#3352CC] mr-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">30-Day Money Back Guarantee</h3>
                <p className="text-gray-300">Not satisfied? Get a full refund within 30 days, no questions asked.</p>
              </div>
            </div>
            <Button className="shrink-0 bg-[#3352CC] hover:bg-[#3352CC]/90">Start Risk-Free Trial</Button>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center max-w-3xl mx-auto p-8 rounded-2xl relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl" />

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white">Ready to get started?</h2>
            <p className="mt-4 text-gray-300 mb-8">
              Join thousands of satisfied customers who are already using our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90">
                <CreditCard className="h-4 w-4 mr-2" />
                Start Free Trial
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule a Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }


