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

// "use client"

// import { useState } from "react"
// import { Suspense } from "react"
// import { EmailCampaignsList } from "../components/email-campaigns-list"
// import { EmailCampaignForm } from "../components/email-campaign-form"
// import { Separator } from "@/components/ui/separator"
// import { Button } from "@/components/ui/button"
// import { Plus } from "lucide-react"
// import { EmailCampaignsLoading } from "./loading"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"

// export default function EmailCampaignsPage() {
//   const [isDialogOpen, setIsDialogOpen] = useState(false)

//   return (
//     <div className="container mx-auto py-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Email Campaigns</h1>
//           <p className="text-muted-foreground">Create and manage email campaigns for your users</p>
//         </div>
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//             <Button className="flex items-center gap-2">
//               <Plus className="h-4 w-4" />
//               <span>New Campaign</span>
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[800px]">
//             <DialogHeader>
//               <DialogTitle>Create New Email Campaign</DialogTitle>
//               <DialogDescription>Create a new email campaign to send to your users.</DialogDescription>
//             </DialogHeader>
//             <EmailCampaignForm onSuccess={() => setIsDialogOpen(false)} />
//           </DialogContent>
//         </Dialog>
//       </div>

//       <Separator />

//       <Suspense fallback={<EmailCampaignsLoading />}>
//         <EmailCampaignsList />
//       </Suspense>
//     </div>
//   )
// }

// "use client"

// import { useState } from "react"
// import { Suspense } from "react"
// import { EmailCampaignsList } from "../components/email-campaigns-list"
// import { EmailCampaignForm } from "../components/email-campaign-form"
// import { Separator } from "@/components/ui/separator"
// import { Button } from "@/components/ui/button"
// import { Plus } from "lucide-react"
// import { EmailCampaignsLoading } from "./loading"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"

// export default function EmailCampaignsPage() {
//   const [isDialogOpen, setIsDialogOpen] = useState(false)

//   return (
//     <div className="container mx-auto py-4 md:py-6 px-4 md:px-6 space-y-4 md:space-y-6 max-w-full">
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Email Campaigns</h1>
//           <p className="text-sm text-muted-foreground">Create and manage email campaigns for your users</p>
//         </div>
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//             <Button className="w-full sm:w-auto flex items-center gap-2">
//               <Plus className="h-4 w-4" />
//               <span>New Campaign</span>
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="w-[95vw] max-w-[800px] h-[90vh] max-h-[900px] overflow-y-auto">
//             <DialogHeader>
//               <DialogTitle>Create New Email Campaign</DialogTitle>
//               <DialogDescription>Create a new email campaign to send to your users.</DialogDescription>
//             </DialogHeader>
//             <EmailCampaignForm onSuccess={() => setIsDialogOpen(false)} />
//           </DialogContent>
//         </Dialog>
//       </div>

//       <Separator />

//       <Suspense fallback={<EmailCampaignsLoading />}>
//         <EmailCampaignsList />
//       </Suspense>
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
import { Plus, Search, Filter, Calendar, Clock } from "lucide-react"
import { EmailCampaignsLoading } from "./loading"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function EmailCampaignsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container mx-auto py-4 md:py-6 px-4 md:px-6 space-y-4 md:space-y-6 max-w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Email Campaigns</h1>
          <p className="text-sm text-muted-foreground">Create and manage email campaigns for your users</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>New Campaign</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-[800px] h-[90vh] max-h-[900px] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Email Campaign</DialogTitle>
              <DialogDescription>Create a new email campaign to send to your users.</DialogDescription>
            </DialogHeader>
            <EmailCampaignForm onSuccess={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Separator />

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search campaigns..."
            className="w-full sm:w-[300px] pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Scheduled</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Sent</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Draft</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full sm:w-auto flex overflow-x-auto no-scrollbar">
            <TabsTrigger value="all" className="flex-shrink-0">
              All Campaigns
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="flex-shrink-0">
              Scheduled{" "}
              <Badge variant="outline" className="ml-2">
                3
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="sent" className="flex-shrink-0">
              Sent{" "}
              <Badge variant="outline" className="ml-2">
                12
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="draft" className="flex-shrink-0">
              Draft{" "}
              <Badge variant="outline" className="ml-2">
                2
              </Badge>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4 md:mt-6">
            <Suspense fallback={<EmailCampaignsLoading />}>
              <EmailCampaignsList />
            </Suspense>
          </TabsContent>
          <TabsContent value="scheduled" className="mt-4 md:mt-6">
            <Suspense fallback={<EmailCampaignsLoading />}>
              <EmailCampaignsList />
            </Suspense>
          </TabsContent>
          <TabsContent value="sent" className="mt-4 md:mt-6">
            <Suspense fallback={<EmailCampaignsLoading />}>
              <EmailCampaignsList />
            </Suspense>
          </TabsContent>
          <TabsContent value="draft" className="mt-4 md:mt-6">
            <Suspense fallback={<EmailCampaignsLoading />}>
              <EmailCampaignsList />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

