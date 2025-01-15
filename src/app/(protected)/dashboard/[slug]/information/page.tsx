// 'use client'
// import { BusinessInfoForm } from '@/components/global/businessInfo/businessInfo'

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-gray-950 py-12">
//       <BusinessInfoForm />
//     </main>
//   )
// }

// 'use client'

// import  BusinessInfoForm from '@/components/global/businessInfo/businessInfo'
// import { ToastProvider } from "@/components/ui/toast"

// export default function BusinessInfoPage() {
//   return (
//     <ToastProvider>
//       <BusinessInfoForm />
//     </ToastProvider>
//   )
// }

'use client'

import { useParams } from 'next/navigation'
import BusinessInfo from '@/components/global/businessInfo/infoCard'
import { ToastProvider } from "@/components/ui/toast"

export default function BusinessInfoPage() {
  const params = useParams()
  const businessId = params.businessId as string

  if (!businessId) {
    return <div>Error: Business ID not found</div>
  }

  return (
    <ToastProvider>
      <BusinessInfo businessId={businessId} />
    </ToastProvider>
  )
}



