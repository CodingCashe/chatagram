// // import { Suspense } from "react"
// // import { EmailCampaignsList } from "../components/email-campaigns-list"
// // import { Separator } from "@/components/ui/separator"
// // import { Button } from "@/components/ui/button"
// // import { Plus } from "lucide-react"
// // import { EmailCampaignsLoading } from "./loading"

// // export const metadata = {
// //   title: "Email Campaigns | Admin Dashboard",
// //   description: "Manage email campaigns for your marketing efforts",
// // }

// // export default async function EmailCampaignsPage() {
// //   return (
// //     <div className="container mx-auto py-6 space-y-6">
// //       <div className="flex justify-between items-center">
// //         <div>
// //           <h1 className="text-3xl font-bold tracking-tight">Email Campaigns</h1>
// //           <p className="text-muted-foreground">Create and manage email campaigns for your users</p>
// //         </div>
// //         <Button className="flex items-center gap-2">
// //           <Plus className="h-4 w-4" />
// //           <span>New Campaign</span>
// //         </Button>
// //       </div>

// //       <Separator />

// //       <Suspense fallback={<EmailCampaignsLoading />}>
// //         <EmailCampaignsList />
// //       </Suspense>
// //     </div>
// //   )
// // }

// // "use client"

// // import { useState } from "react"
// // import { Suspense } from "react"
// // import { EmailCampaignsList } from "../components/email-campaigns-list"
// // import { EmailCampaignForm } from "../components/email-campaign-form"
// // import { Separator } from "@/components/ui/separator"
// // import { Button } from "@/components/ui/button"
// // import { Plus } from "lucide-react"
// // import { EmailCampaignsLoading } from "./loading"
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/components/ui/dialog"

// // export default function EmailCampaignsPage() {
// //   const [isDialogOpen, setIsDialogOpen] = useState(false)

// //   return (
// //     <div className="container mx-auto py-6 space-y-6">
// //       <div className="flex justify-between items-center">
// //         <div>
// //           <h1 className="text-3xl font-bold tracking-tight">Email Campaigns</h1>
// //           <p className="text-muted-foreground">Create and manage email campaigns for your users</p>
// //         </div>
// //         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
// //           <DialogTrigger asChild>
// //             <Button className="flex items-center gap-2">
// //               <Plus className="h-4 w-4" />
// //               <span>New Campaign</span>
// //             </Button>
// //           </DialogTrigger>
// //           <DialogContent className="sm:max-w-[800px]">
// //             <DialogHeader>
// //               <DialogTitle>Create New Email Campaign</DialogTitle>
// //               <DialogDescription>Create a new email campaign to send to your users.</DialogDescription>
// //             </DialogHeader>
// //             <EmailCampaignForm onSuccess={() => setIsDialogOpen(false)} />
// //           </DialogContent>
// //         </Dialog>
// //       </div>

// //       <Separator />

// //       <Suspense fallback={<EmailCampaignsLoading />}>
// //         <EmailCampaignsList />
// //       </Suspense>
// //     </div>
// //   )
// // }

// import { Button } from "@/components/ui/button"
// import { EmailCampaignsList } from "../components/email-campaigns-list"
// import Link from "next/link"
// import { Plus } from "lucide-react"

// export default function EmailCampaignsPage() {
//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Email Campaigns</h1>
//           <p className="text-muted-foreground">Create and manage your email marketing campaigns.</p>
//         </div>
//         <Link href="/admin/email/campaigns/new">
//           <Button>
//             <Plus className="mr-2 h-4 w-4" />
//             New Campaign
//           </Button>
//         </Link>
//       </div>
//       <EmailCampaignsList />
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { Suspense } from "react"
import { EmailCampaignsList } from "../components/email-campaigns-list"
import { EmailCampaignForm } from "../components/email-campaign-form"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { EmailCampaignsLoading } from "./loading"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function EmailCampaignsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email Campaigns</h1>
          <p className="text-muted-foreground">Create and manage email campaigns for your users</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>New Campaign</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Create New Email Campaign</DialogTitle>
              <DialogDescription>Create a new email campaign to send to your users.</DialogDescription>
            </DialogHeader>
            <EmailCampaignForm onSuccess={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Separator />

      <Suspense fallback={<EmailCampaignsLoading />}>
        <EmailCampaignsList />
      </Suspense>
    </div>
  )
}

