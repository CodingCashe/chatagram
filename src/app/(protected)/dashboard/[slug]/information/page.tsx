// 'use client'
// import { BusinessInfoForm } from '@/components/global/businessInfo/businessInfo'

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-gray-950 py-12">
//       <BusinessInfoForm />
//     </main>
//   )
// }

'use client'

import { BusinessInfoForm } from '@/components/global/businessInfo/businessInfo'
import { ToastProvider } from "@/components/ui/toast"

export default function BusinessInfoPage() {
  return (
    <ToastProvider>
      <BusinessInfoForm />
    </ToastProvider>
  )
}

