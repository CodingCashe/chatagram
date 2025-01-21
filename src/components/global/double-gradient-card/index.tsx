// import { Button } from '@/components/ui/button'
// import { ArrowRight } from 'lucide-react'
// import React from 'react'

// type Props = {
//   label: string
//   subLabel: string
//   description: string
// }

// const DoubleGradientCard = ({ description, label, subLabel }: Props) => {
//   return (
//     <div className="relative border-[1px] border-in-active/50 p-5 rounded-xl flex flex-col gap-y-20 overflow-hidden">
//       <div className="flex flex-col z-40">
//         <h2 className="text-2xl font-medium">{label}</h2>
//         <p className="text-text-secondary text-sm">{subLabel}</p>
//       </div>
//       <div className="flex justify-between items-center z-40 gap-x-10">
//         <p className="text-text-secondary text-sm">{description}</p>
//         <Button className="rounded-full bg-light-blue w-10 h-10">
//           <ArrowRight color="white" />
//         </Button>
//       </div>
//       <div className="w-6/12 h-full absolute radial--double--gradient--cards--top top-0 left-0 z-10" />
//       <div className="w-6/12 h-full absolute radial--double--gradient--cards--bottom top-0 left-1/2 right-0 z-0" />
//     </div>
//   )
// }

// export default DoubleGradientCard

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import React from "react"

type Props = {
  label: string
  subLabel: string
  description: string
}

const DoubleGradientCard = ({ description, label, subLabel }: Props) => {
  return (
    <div className="relative border border-gray-700 p-6 rounded-xl flex flex-col justify-between h-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
      <div className="flex flex-col z-10 mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">{label}</h2>
        <p className="text-blue-400 text-sm">{subLabel}</p>
      </div>
      <div className="flex justify-between items-end z-10">
        <p className="text-gray-300 text-sm max-w-[70%]">{description}</p>
        <Button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 p-0 hover:shadow-md hover:shadow-blue-500/20 transition-all duration-300">
          <ArrowRight className="text-white" />
        </Button>
      </div>
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-radial from-blue-500/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-radial from-purple-500/20 via-transparent to-transparent" />
      </div>
    </div>
  )
}

export default DoubleGradientCard

