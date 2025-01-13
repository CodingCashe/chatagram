// import React from 'react'
// import PaymentButton from '../payment-button'

// type Props = {}

// const UpgradeCard = (props: Props) => {
//   return (
//     <div className="bg-[#252525] p-3 rounded-2xl flex flex-col gap-y-3">
//       <span className="text-sm">
//         Upgrade to {''}
//         <span
//           className="bg-gradient-to-r 
//         from-[#CC3BD4] 
//         to-[#D064AC] 
//         font-bold 
//         bg-clip-text 
//         text-transparent"
//         >
//           Smart AI
//         </span>
//       </span>
//       <p className="text-[#9B9CA0] font-light text-sm">
//         Unlock all features <br /> including AI and more
//       </p>
//       <PaymentButton />
//     </div>
//   )
// }

// export default UpgradeCard

import React from 'react'
import { Sparkles, Zap, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const UpgradeCard = () => {
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
            <circle id="pattern-circle" cx="20" cy="20" r="18" fill="none" stroke="#ffffff" strokeWidth="1"/>
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"/>
        </svg>
      </div>

      <CardContent className="relative z-10 p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="bg-white/20 p-3 rounded-full">
            <Sparkles className="w-8 h-8 text-yellow-300" />
          </div>
          <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
            LIMITED OFFER
          </span>
        </div>

        <h2 className="text-3xl font-bold mb-2">
          Upgrade to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
            Smart AI
          </span>
        </h2>
        
        <p className="text-lg text-gray-200 mb-6">
          Unlock all features including AI and more
        </p>

        <ul className="space-y-2 mb-6">
          {['Advanced AI Tools', 'Unlimited Projects', 'Priority Support'].map((feature, index) => (
            <li key={index} className="flex items-center">
              <ChevronRight className="w-5 h-5 mr-2 text-yellow-300" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="bg-white/10 p-6">
        <Button className="w-full bg-white text-purple-600 hover:bg-yellow-400 hover:text-purple-700 transition-colors">
          <span className="flex items-center justify-center">
            Upgrade Now
            <Zap className="ml-2 w-5 h-5" />
          </span>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default UpgradeCard

