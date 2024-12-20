// import AutomationList from '@/components/global/automation-list'
// import CreateAutomation from '@/components/global/create-automation'
// import { useQueryAutomation, useQueryAutomations } from '@/hooks/user-queries'
// import { Check } from 'lucide-react'
// import React from 'react'

// type Props = {}

// const Page = (props: Props) => {
//   const { data } = useQueryAutomations()
//   const automations = data?.data || []

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
//       <div className="lg:col-span-4">
//         <AutomationList 
//         id={}
        
//         />
//       </div>
//       <div className="lg:col-span-2">
//         <div className="flex flex-col rounded-xl bg-background-80 gap-y-6 p-5 border-[1px] overflow-hidden border-in-active">
//           <div>
//             <h2 className="text-xl ">My Automations</h2>
//             <p className="text-text-secondary">
//               Your live automations will show here.
//             </p>
//           </div>
//           <div className="flex flex-col gap-y-3">
//             {[1, 2, 3, 4].map((item) => (
//               <div
//                 key={item}
//                 className="flex items-start justify-between"
//               >
//                 <div className="flex flex-col">
//                   <h3 className="font-medium">
//                     Direct traffic towards website
//                   </h3>
//                   <p className="text-text-secondary text-sm">
//                     October 5th 2024
//                   </p>
//                 </div>
//                 <Check />
//               </div>
//             ))}
//           </div>
//           <CreateAutomation />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Page

// 'use client'

// import AutomationList from '@/components/global/automation-list'
// import CreateAutomation from '@/components/global/create-automation'
// import { useQueryAutomation, useQueryAutomations } from '@/hooks/user-queries'
// import { Check } from 'lucide-react'
// import React from 'react'

// type Props = {}

// const Page = (props: Props) => {
//   const { data } = useQueryAutomations()

//   // Extract automation details from the `data` object
//   const automations = data?.data || [] // Highlighted: Accessing automations from `useQueryAutomations`

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
//       <div className="lg:col-span-4">
//         <AutomationList 
//           id={automations.length > 0 ? automations[0].id : ''} // Highlighted: Pass the first automation ID
//         />
//       </div>
//       <div className="lg:col-span-2">
//         <div className="flex flex-col rounded-xl bg-background-80 gap-y-6 p-5 border-[1px] overflow-hidden border-in-active">
//           <div>
//             <h2 className="text-xl ">My Automations</h2>
//             <p className="text-text-secondary">
//               Your live automations will show here.
//             </p>
//           </div>
//           <div className="flex flex-col gap-y-3">
//             {automations.map((automation) => ( // Highlighted: Iterating over automations
//               <div
//                 key={automation.id} // Highlighted: Use `automation.id` as the key
//                 className="flex items-start justify-between"
//               >
//                 <div className="flex flex-col">
//                   <h3 className="font-medium">
//                     {automation.name} {/* Highlighted: Display automation name */}
//                   </h3>
//                   <p className="text-text-secondary text-sm">
//                     {automation.createdAt ? new Date(automation.createdAt).toLocaleDateString() : 'No Date'} {/* Highlighted: Display creation date */}
//                   </p>
//                 </div>
//                 <Check />
//               </div>
//             ))}
//           </div>
//           <CreateAutomation />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Page


'use client'

import AutomationList from '@/components/global/automation-list'
import CreateAutomation from '@/components/global/create-automation'
import { useQueryAutomations } from '@/hooks/user-queries'
import { Check, Zap, Sparkles, Rocket } from 'lucide-react'
import React from 'react'

const AutomationStatus = ({ count }: { count: number }) => {
  if (count === 0) {
    return (
      <div className="flex items-center gap-2 text-yellow-500">
        <Zap className="w-5 h-5" />
        <p>Ready to supercharge your workflow? Create your first automation!</p>
      </div>
    )
  } else if (count < 3) {
    return (
      <div className="flex items-center gap-2 text-green-500">
        <Sparkles className="w-5 h-5" />
        <p>Great start! You are on your way to automation mastery.</p>
      </div>
    )
  } else {
    return (
      <div className="flex items-center gap-2 text-blue-500">
        <Rocket className="w-5 h-5" />
        <p>Wow! You are an automation pro. Keep optimizing your workflow!</p>
      </div>
    )
  }
}

const Page = () => {
  const { data } = useQueryAutomations()
  const automations = data?.data || []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
      <div className="lg:col-span-4">
        <AutomationList 
          id={automations.length > 0 ? automations[0].id : ''}
        />
      </div>
      <div className="lg:col-span-2">
        <div className="flex flex-col rounded-xl bg-background-80 gap-y-6 p-5 border-[1px] overflow-hidden border-in-active">
          <div>
            <h2 className="text-xl mb-2">My Automations</h2>
            <AutomationStatus count={automations.length} />
          </div>
          <div className="flex flex-col gap-y-3">
            {automations.map((automation) => (
              <div
                key={automation.id}
                className="flex items-start justify-between"
              >
                <div className="flex flex-col">
                  <h3 className="font-medium">
                    {automation.name}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {automation.createdAt ? new Date(automation.createdAt).toLocaleDateString() : 'No Date'}
                  </p>
                </div>
                <Check className="text-green-500" />
              </div>
            ))}
          </div>
          <CreateAutomation />
        </div>
      </div>
    </div>
  )
}

export default Page

