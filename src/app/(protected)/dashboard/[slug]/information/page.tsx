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

// import { useParams } from 'next/navigation'
// import BusinessManager from '@/components/global/businessInfo/businessManager'
// import { ToastProvider } from "@/components/ui/toast"

// export default function BusinessInfoPage() {
//   const params = useParams()
//   const businessId = params.businessId as string

//   if (!businessId) {
//     return <div>Error: Business ID not found</div>
//   }

//   return (
//     <ToastProvider>
//       <BusinessManager />
//     </ToastProvider>
//   )
// }


import BusinessManager from '@/components/global/businessInfo/businessManager'
import BusinessDataDisplay from '@/components/global/businessInfo/testing'
import { ToastProvider } from "@/components/ui/toast"

export default function BusinessInfoPage() {
    return (
    <ToastProvider>
      <BusinessManager />
      <BusinessDataDisplay />
    </ToastProvider>
  )
}

// import BusinessDataDisplay from '@/components/BusinessDataDisplay'

// export default function TestPage() {
//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-2xl font-bold mb-4">Business Data Test</h1>
//       <BusinessDataDisplay />
//     </div>
//   )
// }