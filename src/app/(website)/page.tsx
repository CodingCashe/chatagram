'use client'

// import { Button } from '@/components/ui/button'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// import { CheckCircle, MenuIcon } from 'lucide-react'
// // import PrivacyPolicy from '@/components/global/privacy-policy'
// import Image from 'next/image'
// import Link from 'next/link'
// import { LogoSmall } from '@/svgs/logo-small'
// import { MobileMenu } from '@/components/global/mobile/mobile-menu'

// export default function Home() {
//   const plans = [
//     {
//       name: 'Free Plan',
//       description: 'Perfect for getting started',
//       price: '$0',
//       features: [
//         'Boost engagement with target responses',
//         'Automate comment replies to enhance audience interaction',
//         'Turn followers into customers with targeted messaging',
//       ],
//       cta: 'Get Started',
//       link: '/dashboard',
//     },
//     {
//       name: 'Smart AI Plan',
//       description: 'Advanced features for power users',
//       price: '$89',
//       features: [
//         'All features from Free Plan',
//         'AI-powered response generation',
//         'Advanced analytics and insights',
//         'Priority customer support',
//         'Custom branding options',
//       ],
//       cta: 'Upgrade Now',
//       link: '/api/payment',
//     },
//   ]

//   return (
//     <main className="flex flex-col min-h-screen">
//       <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-sm">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <LogoSmall />
//             </div>
//             <nav className="hidden space-x-6 text-sm text-blue-200 md:flex">
//               <Link href="#features">Features</Link>
//               <Link href="#pricing">Pricing</Link>
//               <Link href="#about">About</Link>
//               <Link href="#services">Services</Link>
//               <Link href="/privacy">Privacy Policy</Link>
//             </nav>
//             <div className="flex items-center gap-4">
//               <MobileMenu />
//               <Button className="bg-blue-600 text-white hover:bg-blue-700">
//                 <Link href="/dashboard">Login</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <section className="relative bg-gradient-to-b from-slate-900 via-blue-900 to-bg py-20">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
//         <div className="container mx-auto px-4 relative">
//           <div className="max-w-3xl mx-auto text-center">
//             <h1 className="text-4xl font-bold leading-tight tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl mb-6">
//               Transform Your Instagram Engagement with Chatal!
//             </h1>
//             <p className="text-xl text-blue-200 mb-8">
//               Chatal revolutionizes how you connect with your audience on
//               Instagram. Automate responses and boost engagement effortlessly,
//               turning interactions into valuable business opportunities.
//             </p>
//             <div className="flex justify-center gap-4">
//               <Button
//                 size="lg"
//                 className="bg-blue-600 text-white hover:bg-blue-700"
//               >
//                 <Link href="/dashboard">Get Started</Link>
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-blue-400 text-blue-400 hover:bg-blue-900/50"
//               >
//                 Learn More
//               </Button>
//             </div>
//           </div>
//         </div>
//         <div className="container mx-auto px-1">
//           <div className="max-w-4xl mx-auto text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4 sm:text-4xl text-[#01083C]"></h2>
//             <p className="text-xl text-gray-600">
//             </p>
//           </div>

//           <div>
//             <div
//               className="
//                 fixed top-[140px] left-0 w-screen h-[calc(100vh-140px)] 
//                 bg-cover bg-fixed bg-center -z-10
//               "
//             ></div>

//             <div className="relative z-10 text-center text-white p-8">
//               <h1 className="text-4xl font-bold">Chatal Has Over 1200 happy clients in 30+ countries</h1>
//               <p className="mt-4 text-lg">
//                 Become one of our happy clients by signing up. Create an account and get started now!
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="features" className="py-20 bg-[#364B5A]">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12 sm:text-4xl text-white">
//             Why Choose Chatal?
//           </h2>
//           <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//             {[
//               { title: "Boost Engagement", image: "/engage.png", description: "Automate comment replies and direct messages to interact with your audience 24/7." },
//               { title: "Save Time", image: "/time.png", description: "Let our AI handle repetitive tasks so you can focus on creating amazing content." },
//               { title: "Grow Revenue", image: "/revenue.png", description: "Convert followers into customers with targeted, personalized messaging." }
//             ].map((feature, index) => (
//               <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
//                 <CardHeader>
//                   <div className="w-200 h-200 mx-auto mb-4">
//                     <Image src={feature.image} alt={feature.title} width={200} height={200} />
//                   </div>
//                   <CardTitle>{feature.title}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-gray-600">{feature.description}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section id="pricing" className="py-20 bg-[#364B5A]">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4 sm:text-4xl text-white">
//               Choose Your Plan
//             </h2>
//             <p className="text-xl text-[#FFFAF8] max-w-2xl mx-auto">
//               Select the perfect plan to boost your Instagram engagement and take your social media presence to the next level.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
//             {plans.map((plan, index) => (
//               <Card
//                 key={index}
//                 className="flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
//               >
//                 <CardHeader>
//                   <CardTitle className="text-2xl">{plan.name}</CardTitle>
//                   <CardDescription>{plan.description}</CardDescription>
//                 </CardHeader>
//                 <CardContent className="flex-grow">
//                   <div className="text-4xl font-bold mb-6">
//                     {plan.price}
//                     <span className="text-lg font-normal text-[#FFFAF8]">
//                       /month
//                     </span>
//                   </div>
//                   <ul className="space-y-3">
//                     {plan.features.map((feature, i) => (
//                       <li
//                         key={i}
//                         className="flex items-center"
//                       >
//                         <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
//                         <span className="text-gray-700">
//                           {feature}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </CardContent>
//                 <CardFooter>
//                   <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
//                   <Link href={plan.link}>{plan.cta}</Link>
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       <footer className="bg-slate-800 text-blue-200 py-12">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div>
//               <LogoSmall />
//               <p className="mt-4 text-sm text-gray-400">
//                 © 2024 Chatal. All rights reserved.
//               </p>
//             </div>
//             <div className="flex flex-col space-y-2">
//               <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
//               <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
//               <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Connect with us</h3>
//               <div className="flex space-x-4">
//                 <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-75 transition-opacity">
//                   <Image src="/instagram-icon.svg" alt="Instagram" width={24} height={24} />
//                 </a>
//                 <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:opacity-75 transition-opacity">
//                   <Image src="/twitter-icon.svg" alt="Twitter" width={24} height={24} />
//                 </a>
//                 <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-75 transition-opacity">
//                   <Image src="/linkedin-icon.svg" alt="LinkedIn" width={24} height={24} />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </main>
//   )
// }



// import Hero from '@/components/global/homestuff/hero'
// import PricingPlans from '@/components/global/homestuff/pricing-plans'
// import Features from '@/components/global/homestuff/features'
// import Testimonials from '@/components/global/homestuff/testimonials'
// import FAQ from '@/components/global/homestuff/faq'
// import CTA from '@/components/global/homestuff/cta'
// import Footer from '@/components/global/homestuff/footer'
// import FloatingNotification from '@/components/global/homestuff/floating-notification'
// import InteractiveDemo from '@/components/global/homestuff/interactive-demo'
// import DynamicStats from '@/components/global/homestuff/dynamic-stats'
// import GlobalReach from '@/components/global/homestuff/global-reach'

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-100">
//       <Hero />
//       <section className="py-20 px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Experience Chatal in Action</h2>
//         <InteractiveDemo />
//       </section>
//       <Features />
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-purple-700">
//         <h2 className="text-3xl font-bold text-center text-white mb-12">Chatal Global Impact</h2>
//         <DynamicStats />
//       </section>
//       <PricingPlans />
//       <Testimonials />
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
//         <GlobalReach />
//       </section>
//       <FAQ />
//       <CTA />
//       <Footer />
//       <FloatingNotification />
//     </div>
//   )
// }

// Home.tsx
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
          <nav className={`md:block ${isMenuOpen ? 'block' : 'hidden'}`}>
            <ul className="flex space-x-8">
              <li><Link href="#" className="text-gray-600 hover:[#2563EB] transition-colors">Features</Link></li>
              <li><Link href="#" className="text-gray-600 hover:[#2563EB] transition-colors">Pricing</Link></li>
              <li><Link href="#" className="text-gray-600 hover:[#2563EB] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/privacy" className="text-gray-600 hover:text-[#2563EB] transition-colors">Contact</Link></li>
            </ul>
          </nav>
          <Button className="md:hidden" variant="ghost" size="icon" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
          </Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            <Link href="/dashboard">Login</Link>
          </Button>
        </div>
      </header>

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
