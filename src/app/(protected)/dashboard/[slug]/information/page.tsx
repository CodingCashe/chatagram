import BusinessManager from '@/components/global/businessInfo/businessManager'
import { ToastProvider } from "@/components/ui/toast"

export default function BusinessInfoPage() {
    return (
    <ToastProvider>
      <BusinessManager />
    </ToastProvider>
  )
}
