// 'use client'

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from "@/components/ui/button";
// import { Menu, X, ChevronRight, Zap, DollarSign, Shield, Mail } from 'lucide-react';
// import { LogoSmall } from '@/svgs/logo-small';
// import ChatalLogo from '@/svgs/chatal-logo';
// import Link from 'next/link';
// import Hero from '@/components/global/homestuff/hero';
// import PricingPlans from '@/components/global/homestuff/pricing-plans';
// import Features from '@/components/global/homestuff/features';
// import Testimonials from '@/components/global/homestuff/testimonials';
// import FAQ from '@/components/global/homestuff/faq';
// import CTA from '@/components/global/homestuff/cta';
// import Footer from '@/components/global/homestuff/footer';
// import FloatingNotification from '@/components/global/homestuff/floating-notification';
// // import InteractiveDemo from '@/components/global/homestuff/interactive-demo';
// import DynamicStats from '@/components/global/homestuff/dynamic-stats';
// import GlobalReach from '@/components/global/homestuff/global-reach';
// import ParticleBackground from '@/components/global/homestuff/particle-background';

// const menuItems = [
//   { name: 'Features', href: '#', icon: Zap },
//   { name: 'Pricing', href: '#', icon: DollarSign },
//   { name: 'Privacy Policy', href: '/privacy', icon: Shield },
//   { name: 'Contact', href: '#', icon: Mail },
// ];

// export default function Home() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-pink-100">
//       <ParticleBackground />
      
//       {/* Header Section */}
//       <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
//           <div className="flex items-center gap-0">
//             <ChatalLogo width={80} height={80} color="#0066cc"/>
//           </div>

//           <Button 
//             className="md:hidden bg-gray-200 hover:bg-gray-300 text-gray-800 rounded p-2 shadow" 
//             variant="ghost" 
//             size="icon" 
//             onClick={toggleMenu}
//           >
//             <Menu className="h-6 w-6 text-gray-700" />
//           </Button>

//           <div className="hidden md:flex items-center gap-6">
//             <nav>
//               <ul className="flex space-x-6">
//                 <li><Link href="#" className="text-gray-600 hover:text-[#2563EB] transition-colors">Features</Link></li>
//                 <li><Link href="#" className="text-gray-600 hover:text-[#2563EB] transition-colors">Pricing</Link></li>
//                 <li><Link href="/privacy" className="text-gray-600 hover:text-[#2563EB] transition-colors">Privacy Policy</Link></li>
//                 <li><Link href="#" className="text-gray-600 hover:text-[#2563EB] transition-colors">Contact</Link></li>
//               </ul>
//             </nav>
//             <Button className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2">
//               <Link href="/dashboard">Login</Link>
//             </Button>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50 flex justify-end"
//             onClick={toggleMenu}
//           >
//             <motion.div
//               initial={{ x: '100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '100%' }}
//               transition={{ type: 'spring', damping: 30, stiffness: 300 }}
//               className="w-full max-w-sm bg-gradient-to-br from-white to-gray-100 h-full shadow-2xl p-6 flex flex-col"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 className="self-end text-gray-600 hover:text-gray-800 transition-colors"
//                 onClick={toggleMenu}
//               >
//                 <X size={24} />
//               </button>
//               <nav className="mt-12 flex-grow">
//                 <ul className="space-y-6">
//                   {menuItems.map((item, index) => (
//                     <motion.li
//                       key={item.name}
//                       initial={{ x: -50, opacity: 0 }}
//                       animate={{ x: 0, opacity: 1 }}
//                       transition={{ delay: index * 0.1 }}
//                       onHoverStart={() => setHoveredIndex(index)}
//                       onHoverEnd={() => setHoveredIndex(null)}
//                     >
//                       <Link 
//                         href={item.href}
//                         className="group flex items-center text-gray-800 hover:text-blue-600 text-lg font-medium transition-colors duration-200"
//                       >
//                         <item.icon 
//                           size={20} 
//                           className={`mr-2 transition-colors duration-200 ${
//                             hoveredIndex === index ? 'text-blue-600' : 'text-gray-400'
//                           }`}
//                         />
//                         {item.name}
//                         <ChevronRight 
//                           size={16} 
//                           className={`ml-auto transition-transform duration-200 ${
//                             hoveredIndex === index ? 'translate-x-1 text-blue-600' : 'text-gray-400'
//                           }`}
//                         />
//                       </Link>
//                     </motion.li>
//                   ))}
//                 </ul>
//               </nav>
//               <motion.div
//                 initial={{ scale: 0.5, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ delay: 0.3 }}
//                 className="mt-auto"
//               >
//                 <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg">
//                   <h3 className="font-bold text-lg mb-2">Get Started Today!</h3>
//                   <p className="text-sm mb-3">Join thousands of satisfied customers and transform your business.</p>
//                   <Button className="bg-white text-blue-600 px-4 py-2 rounded font-medium hover:bg-blue-50 transition-colors duration-200">
//                     Sign Up Now
//                   </Button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Page Content */}
//       <main>
//         <Hero />
//         {/* <section className="py-20 px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Experience Chatal in Action</h2>
//           <InteractiveDemo />
//         </section> */}
//         <Features />
//         <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#2563EB]">
//           <h2 className="text-3xl font-bold text-center text-white mb-12">Chatal Global Impact</h2>
//           <DynamicStats />
//         </section>
//         <PricingPlans />
//         <Testimonials />
//         <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
//           <GlobalReach />
//         </section>
//         <FAQ />
//         <CTA />
//         <Footer />
//         <FloatingNotification />
//       </main>
//     </div>
//   );
// }

// import type { Metadata } from "next"
// import HeroSection from "@/components/global/landing/hero-section"
// import FeaturesSection from "@/components/global/landing/features-section"
// import WorkflowSection from "@/components/global/landing/workflow-section"
// import PricingSection from "@/components/global/landing/pricing-section"
// import TestimonialsSection from "@/components/global/landing/testimonials-section"
// import FaqSection from "@/components/global/landing/faq-section"
// import CtaSection from "@/components/global/landing/cta-section"
// import Footer from "@/components/global/landing/footer"
// import Navbar from "@/components/global/landing/navbar"
// import StatsTicker from "@/components/global/landing/stats-ticker"
// import IntegrationLogos from "@/components/global/landing/integration-logos"
// import AiChatDemo from "@/components/global/landing/ai-chat-demo"

// export const metadata: Metadata = {
//   title: "DM Pilot - Instagram DM Automation Platform",
//   description:
//     "Automate your Instagram DMs, increase engagement, and grow your business with our powerful AI-driven platform.",
// }

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
//       <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

//       <Navbar />

//       <main className="relative">
//         <HeroSection />
//         <StatsTicker />
//         <FeaturesSection />
//         <div className="py-16 container mx-auto px-4 relative z-10">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-3xl font-bold mb-6 text-white">
//                 Experience Our AI-Powered <br />
//                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
//                   Instagram DM Assistant
//                 </span>
//               </h2>
//               <p className="text-slate-300 mb-6">
//                 Try our interactive demo to see how our AI handles common customer inquiries in real-time. Ask about
//                 shipping, returns, or product information to see the magic happen!
//               </p>
//               <ul className="space-y-3 mb-8">
//                 <li className="flex items-start">
//                   <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 mt-0.5">
//                     <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <span className="text-slate-300">Natural, human-like responses</span>
//                 </li>
//                 <li className="flex items-start">
//                   <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 mt-0.5">
//                     <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <span className="text-slate-300">Instant replies to common questions</span>
//                 </li>
//                 <li className="flex items-start">
//                   <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 mt-0.5">
//                     <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <span className="text-slate-300">Personalized customer interactions</span>
//                 </li>
//               </ul>
//             </div>
//             <AiChatDemo />
//           </div>
//         </div>
//         <WorkflowSection />
//         <IntegrationLogos />
//         <PricingSection />
//         <TestimonialsSection />
//         <FaqSection />
//         <CtaSection />
//       </main>

//       <Footer />
//     </div>
//   )
// }

import type { Metadata } from "next"
import HeroSection from "@/components/global/landing/hero-section"
import FeaturesSection from "@/components/global/landing/features-section"
import WorkflowSection from "@/components/global/landing/workflow-section"
import PricingSection from "@/components/global/landing/pricing-section"
import TestimonialsSection from "@/components/global/landing/testimonials-section"
import FaqSection from "@/components/global/landing/faq-section"
import CtaSection from "@/components/global/landing/cta-section"
import Footer from "@/components/global/landing/footer"
import Navbar from "@/components/global/landing/navbar"
import StatsTicker from "@/components/global/landing/stats-ticker"
import IntegrationLogos from "@/components/global/landing/integration-logos"
import AiChatDemo from "@/components/global/landing/ai-chat-demo"
import ContentFeatures from "@/components/global/landing/content-features"

export const metadata: Metadata = {
  title: "Yazil - Instagram DM Automation Platform",
  description:
    "Automate your Instagram DMs, increase engagement, and grow your business with our powerful AI-driven platform.",
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 overflow-x-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <Navbar />

      <main className="relative">
        <HeroSection />
        <StatsTicker />
        <FeaturesSection />
        <div className="py-16 container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">
                Experience Our AI-Powered <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                  Instagram DM Assistant
                </span>
              </h2>
              <p className="text-slate-300 mb-6">
                Try our interactive demo to see how our AI handles common customer inquiries in real-time. Ask about
                shipping, returns, or product information to see the magic happen!
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 mt-0.5">
                    <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-300">Natural, human-like responses</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 mt-0.5">
                    <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-300">Instant replies to common questions</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 mt-0.5">
                    <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-300">Personalized customer interactions</span>
                </li>
              </ul>
            </div>
            <AiChatDemo />
          </div>
        </div>
        <ContentFeatures />
        <WorkflowSection />
        <IntegrationLogos />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  )
}

