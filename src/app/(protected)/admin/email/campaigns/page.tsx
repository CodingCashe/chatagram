import { Suspense } from "react"
import { EmailCampaignsList } from "../components/email-campaigns-list"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { EmailCampaignsLoading } from "./loading"

export const metadata = {
  title: "Email Campaigns | Admin Dashboard",
  description: "Manage email campaigns for your marketing efforts",
}

export default async function EmailCampaignsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email Campaigns</h1>
          <p className="text-muted-foreground">Create and manage email campaigns for your users</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>New Campaign</span>
        </Button>
      </div>

      <Separator />

      <Suspense fallback={<EmailCampaignsLoading />}>
        <EmailCampaignsList />
      </Suspense>
    </div>
  )
}

