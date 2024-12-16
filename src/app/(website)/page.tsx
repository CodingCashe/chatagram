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
// import Image from 'next/image'
// import Link from 'next/link'
// import { LogoSmall } from '@/svgs/logo-small'

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
//     },
//     {
//       name: 'Smart AI Plan',
//       description: 'Advanced features for power users',
//       price: '$99',
//       features: [
//         'All features from Free Plan',
//         'AI-powered response generation',
//         'Advanced analytics and insights',
//         'Priority customer support',
//         'Custom branding options',
//       ],
//       cta: 'Upgrade Now',
//     },
//   ]
//   return (
//     <main>
//       <section className="relative bg-gradient-to-b from-slate-900 via-green-900 to-bg">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
//         <div className="relative">

//           <div className="container px-4 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 {/* <div className="h-8 w-14 rounded-lg bg-black flex items-center justify-center font-bold">
//                   Chatal
//                 </div> */}
//                 <div className="flex gap-x-2 items-center p-2 justify-center">
//                   <LogoSmall />
//                 </div>

//                 <span className="text-xl font-semibold text-primary-foreground">

//                 </span>
//               </div>
//               <nav className="hidden space-x-6 text-sm text-blue-200 md:block">
//                 <Link href="#features">Features</Link>
//                 <Link href="#pricing">Pricing</Link>
//                 <Link href="#about">About</Link>
//                 <Link href="#about">Services</Link>

//               </nav>
//               <Button className="bg-black text-primary">
//                 <Link href="/dashboard">Login</Link>
//               </Button>

//             </div>

//             <div className="mx-auto mt-16 max-w-3xl text-center">
//               <h1 className="text-4xl font-bold leading-tight tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
//                 Transform Your Instagram Engagement with Chatal!
//               </h1>

//               <p className="mt-6 text-lg text-blue-200">
//                 Chatal revolutionizes how you connect with your audience on
//                 Instagram. Automate responses and boost engagement effortlessly,
//                 turning interactions into valuable business opportunities.
//               </p>

//               <div className="mt-8 flex justify-center gap-4">
//                 <Button
//                   size="lg"
//                   className="bg-blue-600 text-white hover:bg-blue-700"
//                 >
//                   Get Started
//                 </Button>
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="border-blue-400  hover:bg-blue-900/50"
//                 >
//                   Learn More
//                 </Button>
//               </div>
//             </div>
//             <div className="relative h-40 md:h-80 w-full  mt-10">
//               <Image
//                 src="/Ig-creators.png"
//                 alt="Community member"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </section>


//       <section id="features" className="py-16 bg-background">
//         <div className="container px-4 md:px-6">
//           <h2 className="text-3xl font-bold text-center sm:text-5xl">
//             Why Choose Chatal?
//           </h2>
//           <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-3">
//             <div className="flex flex-col items-center text-center">
//               <Image src="/engage.png" alt="Boost Engagement" width={100} height={100} />
//               <h3 className="text-xl font-semibold mt-4">Boost Engagement</h3>
//               <p className="text-muted-foreground">
//                 Automate comment replies and direct messages to interact with your audience 24/7.
//               </p>
//             </div>
//             <div className="flex flex-col items-center text-center">
//               <Image src="/time.png" alt="Save Time" width={100} height={100} />
//               <h3 className="text-xl font-semibold mt-4">Save Time</h3>
//               <p className="text-muted-foreground">
//                 Let our AI handle repetitive tasks so you can focus on creating amazing content.
//               </p>
//             </div>
//             <div className="flex flex-col items-center text-center">
//               <Image src="/revenue.png" alt="Grow Revenue" width={100} height={100} />
//               <h3 className="text-xl font-semibold mt-4">Grow Revenue</h3>
//               <p className="text-muted-foreground">
//                 Convert followers into customers with targeted, personalized messaging.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>





//       <section className="container w-full py-12 md:py-24 lg:py-32 bg-background">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center justify-center space-y-4 text-center">
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
//               Choose Your Plan
//             </h2>
//             <p className="max-w-[900px] text-muted-foreground">
//               Select the perfect plan to boost your Instagram engagement
//             </p>
//           </div>
//           <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 md:gap-8">
//             {plans.map((plan, index) => (
//               <Card
//                 key={index}
//                 className="flex flex-col justify-between"
//               >
//                 <CardHeader>
//                   <CardTitle>{plan.name}</CardTitle>
//                   <CardDescription>{plan.description}</CardDescription>
//                 </CardHeader>
//                 <CardContent className="grid gap-4">
//                   <div className="text-4xl font-bold">
//                     {plan.price}
//                     <span className="text-lg font-normal text-muted-foreground">
//                       /month
//                     </span>
//                   </div>
//                   <ul className="space-y-2">
//                     {plan.features.map((feature, i) => (
//                       <li
//                         key={i}
//                         className="flex items-center"
//                       >
//                         <CheckCircle className="mr-2 h-4 w-4 text-primary" />
//                         <span className="text-sm text-muted-foreground">
//                           {feature}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </CardContent>
//                 <CardFooter>
//                   <Button className="w-full">{plan.cta}</Button>                
//                 </CardFooter>
//               </Card>

//             ))}
//           </div>
//         </div>
//       </section>
//       <footer className="bg-slate-800 text-blue-200 py-8">
//         <div className="container flex flex-wrap justify-between px-4">
//           <div>
//             <LogoSmall />
//             <p className="mt-4 text-sm text-muted-foreground">
//               © 2024 Chatal. All rights reserved.
//             </p>
//           </div>
//           <div className="flex space-x-4">
//             <Link href="/privacy-policy">Privacy Policy</Link>
//             <Link href="/terms">Terms of Service</Link>
//             <Link href="/contact">Contact</Link>
//           </div>
//           <div className="flex space-x-4">
//             <a href="https://instagram.com" target="_blank" aria-label="Instagram">
//               <Image src="/instagram-icon.svg" alt="Instagram" width={24} height={24} />
//             </a>
//             <a href="https://twitter.com" target="_blank" aria-label="Twitter">
//               <Image src="/twitter-icon.svg" alt="Twitter" width={24} height={24} />
//             </a>
//             <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
//               <Image src="/linkedin-icon.svg" alt="LinkedIn" width={24} height={24} />
//             </a>
//           </div>
//         </div>
//       </footer>
//     </main>
//   )
// }

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CheckCircle, MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { LogoSmall } from '@/svgs/logo-small'

export default function Home() {
  const plans = [
    {
      name: 'Free Plan',
      description: 'Perfect for getting started',
      price: '$0',
      features: [
        'Boost engagement with target responses',
        'Automate comment replies to enhance audience interaction',
        'Turn followers into customers with targeted messaging',
      ],
      cta: 'Get Started',
      link: '/dashboard',
    },
    {
      name: 'Smart AI Plan',
      description: 'Advanced features for power users',
      price: '$89',
      features: [
        'All features from Free Plan',
        'AI-powered response generation',
        'Advanced analytics and insights',
        'Priority customer support',
        'Custom branding options',
      ],
      cta: 'Upgrade Now',
      link: '/api/payment',
    },
  ]

  return (
    <main className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LogoSmall />
            </div>
            <nav className="hidden space-x-6 text-sm text-blue-200 md:flex">
              <Link href="#features">Features</Link>
              <Link href="#pricing">Pricing</Link>
              <Link href="#about">About</Link>
              <Link href="#services">Services</Link>
            </nav>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              <Link href="/dashboard">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-b from-slate-900 via-blue-900 to-bg py-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold leading-tight tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              Transform Your Instagram Engagement with Chatal!
            </h1>
            <p className="text-xl text-blue-200 mb-8">
              Chatal revolutionizes how you connect with your audience on
              Instagram. Automate responses and boost engagement effortlessly,
              turning interactions into valuable business opportunities.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                <Link href="/dashboard">Get Started</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-400 text-blue-400 hover:bg-blue-900/50"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      {/* </section>

      <section className="relative bg-gradient-to-b from-slate-900 via-blue-900 to-bg py-20"> */}
        <div className="container mx-auto px-1">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 sm:text-4xl text-[#01083C]">
              {/* Elevate Your Instagram Presence */}
            </h2>
            <p className="text-xl text-gray-600">
              {/* See how Chatal can transform your Instagram strategy and boost your engagement. */}
            </p>
          </div>
          <div className="relative h-40 md:h-80 w-full rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/customers.png"
              alt="Instagram creators using Chatal"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-[#364B5A]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 sm:text-4xl text-white">
            Why Choose Chatal?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { title: "Boost Engagement", image: "/engage.png", description: "Automate comment replies and direct messages to interact with your audience 24/7." },
              { title: "Save Time", image: "/time.png", description: "Let our AI handle repetitive tasks so you can focus on creating amazing content." },
              { title: "Grow Revenue", image: "/revenue.png", description: "Convert followers into customers with targeted, personalized messaging." }
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-200 h-200 mx-auto mb-4">
                    <Image src={feature.image} alt={feature.title} width={200} height={200} />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-[#364B5A]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 sm:text-4xl text-white">
              Choose Your Plan
            </h2>
            <p className="text-xl text-[#FFFAF8] max-w-2xl mx-auto">
              Select the perfect plan to boost your Instagram engagement and take your social media presence to the next level.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className="flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-4xl font-bold mb-6">
                    {plan.price}
                    <span className="text-lg font-normal text-[#FFFAF8]">
                      /month
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center"
                      >
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span className="text-gray-700">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  <Link href={plan.link}>{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-800 text-blue-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <LogoSmall />
              <p className="mt-4 text-sm text-gray-400">
                © 2024 Chatal. All rights reserved.
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
            <div>
              <h3 className="text-lg text-center font-semibold mb-4">Connect with us</h3>
              <div className="text-center flex space-x-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-75 transition-opacity">
                  <Image src="/instagram-icon.svg" alt="Instagram" width={24} height={24} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:opacity-75 transition-opacity">
                  <Image src="/twitter-icon.svg" alt="Twitter" width={24} height={24} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-75 transition-opacity">
                  <Image src="/linkedin-icon.svg" alt="LinkedIn" width={24} height={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

