// import { INTEGRATION_CARDS } from '@/constants/integrations'
// import React from 'react'
// import IntegrationCard from './_components/integration-card'

// type Props = {}

// const Page = (props: Props) => {
//   return (
//     <div className="flex justify-center">
//       <div className="flex flex-col w-full lg:w-8/12 gap-y-5">
//         {INTEGRATION_CARDS.map((card, key) => (
//           <IntegrationCard
//             key={key}
//             {...card}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Page


import IntegrationsPage from "@/components/global/integrations/integrations-page"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="container max-w-5xl py-20 flex flex-col items-center justify-center">
          <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
          <p className="text-muted-foreground">Loading your integrations...</p>
        </div>
      }
    >
      <IntegrationsPage />
    </Suspense>
  )
}

