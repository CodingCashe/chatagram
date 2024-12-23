// 'use client'
// import { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Menu } from 'lucide-react';
// import { LogoSmall } from '@/svgs/logo-small';
// import Link from 'next/link';
// import Hero from '@/components/global/homestuff/hero';
// import PricingPlans from '@/components/global/homestuff/pricing-plans';
// import Features from '@/components/global/homestuff/features';
// import Testimonials from '@/components/global/homestuff/testimonials';
// import FAQ from '@/components/global/homestuff/faq';
// import CTA from '@/components/global/homestuff/cta';
// import Footer from '@/components/global/homestuff/footer';
// import FloatingNotification from '@/components/global/homestuff/floating-notification';
// import InteractiveDemo from '@/components/global/homestuff/interactive-demo';
// import DynamicStats from '@/components/global/homestuff/dynamic-stats';
// import GlobalReach from '@/components/global/homestuff/global-reach';
// import ParticleBackground from '@/components/global/homestuff/particle-background';

// export default function Home() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-pink-100">
//       <ParticleBackground />
      
//       {/* Header Section */}
//       <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//           <div className="flex items-center gap-0">
//             <LogoSmall />
//           </div>
//           <nav className={`md:block ${isMenuOpen ? 'block' : 'hidden'}`}>
//             <ul className="flex space-x-8">
//               <li><Link href="#" className="text-gray-600 hover:[#2563EB] transition-colors">Features</Link></li>
//               <li><Link href="#" className="text-gray-600 hover:[#2563EB] transition-colors">Pricing</Link></li>
//               <li><Link href="/privacy" className="text-gray-600 hover:[#2563EB] transition-colors">Privacy Policy</Link></li>
//               <li><Link href="#" className="text-gray-600 hover:text-[#2563EB] transition-colors">Contact</Link></li>
//             </ul>
//           </nav>
//           <Button 
//             className="md:hidden bg-gray-200 hover:bg-gray-300 text-gray-800 rounded p-2 shadow" 
//             variant="ghost" 
//             size="icon" 
//             onClick={toggleMenu}
//           >
//             <Menu className="h-6 w-6 text-gray-700" />
//           </Button>

//           <Button className="bg-blue-600 text-white hover:bg-blue-700">
//             <Link href="/dashboard">Login</Link>
//           </Button>
//         </div>
//       </header>

//       {/* Page Content */}
//       <main>
//         <Hero />
//         <section className="py-20 px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Experience Chatal in Action</h2>
//           <InteractiveDemo />
//         </section>
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


'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';
import { LogoSmall } from '@/svgs/logo-small';
import Link from 'next/link';
import Hero from '@/components/global/homestuff/hero';
import PricingPlans from '@/components/global/homestuff/pricing-plans';
import Features from '@/components/global/homestuff/features';
import Testimonials from '@/components/global/homestuff/testimonials';
import FAQ from '@/components/global/homestuff/faq';
import CTA from '@/components/global/homestuff/cta';
import Footer from '@/components/global/homestuff/footer';
import FloatingNotification from '@/components/global/homestuff/floating-notification';
import InteractiveDemo from '@/components/global/homestuff/interactive-demo';
import DynamicStats from '@/components/global/homestuff/dynamic-stats';
import GlobalReach from '@/components/global/homestuff/global-reach';
import ParticleBackground from '@/components/global/homestuff/particle-background';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-pink-100">
      <ParticleBackground />
      
      {/* Header Section */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-0">
            <LogoSmall />
          </div>

          <Button 
            className="md:hidden bg-gray-200 hover:bg-gray-300 text-gray-800 rounded p-2 shadow" 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </Button>

          <div className="hidden md:flex items-center gap-6">
            <nav>
              <ul className="flex space-x-6">
                <li><Link href="#" className="text-gray-600 hover:text-[#2563EB] transition-colors">Features</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-[#2563EB] transition-colors">Pricing</Link></li>
                <li><Link href="/privacy" className="text-gray-600 hover:text-[#2563EB] transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-[#2563EB] transition-colors">Contact</Link></li>
              </ul>
            </nav>
            <Button className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2">
              <Link href="/dashboard">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 rounded-l-lg p-6">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            onClick={toggleMenu}
          >
            ✕
          </button>
          <nav className="mt-12">
            <ul className="space-y-6">
              <li><Link href="#" className="text-gray-800 hover:text-[#2563EB] text-lg font-medium">Features</Link></li>
              <li><Link href="#" className="text-gray-800 hover:text-[#2563EB] text-lg font-medium">Pricing</Link></li>
              <li><Link href="/privacy" className="text-gray-800 hover:text-[#2563EB] text-lg font-medium">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-800 hover:text-[#2563EB] text-lg font-medium">Contact</Link></li>
            </ul>
          </nav>
        </div>
      )}

      {/* Page Content */}
      <main>
        <Hero />
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Experience Chatal in Action</h2>
          <InteractiveDemo />
        </section>
        <Features />
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#2563EB]">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Chatal Global Impact</h2>
          <DynamicStats />
        </section>
        <PricingPlans />
        <Testimonials />
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
          <GlobalReach />
        </section>
        <FAQ />
        <CTA />
        <Footer />
        <FloatingNotification />
      </main>
    </div>
  );
}
