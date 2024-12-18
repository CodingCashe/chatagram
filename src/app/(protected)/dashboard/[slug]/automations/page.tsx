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

'use client'

import AutomationList from '@/components/global/automation-list'
import CreateAutomation from '@/components/global/create-automation'
import { useQueryAutomation, useQueryAutomations } from '@/hooks/user-queries'
import { Check } from 'lucide-react'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  const { data } = useQueryAutomations()

  // Extract automation details from the `data` object
  const automations = data?.data || [] // Highlighted: Accessing automations from `useQueryAutomations`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
      <div className="lg:col-span-4">
        <AutomationList 
          id={automations.length > 0 ? automations[0].id : ''} // Highlighted: Pass the first automation ID
        />
      </div>
      <div className="lg:col-span-2">
        <div className="flex flex-col rounded-xl bg-background-80 gap-y-6 p-5 border-[1px] overflow-hidden border-in-active">
          <div>
            <h2 className="text-xl ">My Automations</h2>
            <p className="text-text-secondary">
              Your live automations will show here.
            </p>
          </div>
          <div className="flex flex-col gap-y-3">
            {automations.map((automation) => ( // Highlighted: Iterating over automations
              <div
                key={automation.id} // Highlighted: Use `automation.id` as the key
                className="flex items-start justify-between"
              >
                <div className="flex flex-col">
                  <h3 className="font-medium">
                    {automation.name} {/* Highlighted: Display automation name */}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {automation.createdAt ? new Date(automation.createdAt).toLocaleDateString() : 'No Date'} {/* Highlighted: Display creation date */}
                  </p>
                </div>
                <Check />
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
