// import { Suspense } from "react"
// import { EmailTemplatesList } from "../components/email-templates-list"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Separator } from "@/components/ui/separator"
// import { Button } from "@/components/ui/button"
// import { Plus } from "lucide-react"
// import { EmailTemplatesLoading } from "./loading"

// export const metadata = {
//   title: "Email Templates | Admin Dashboard",
//   description: "Manage email templates for your marketing campaigns",
// }

// export default async function EmailTemplatesPage() {
//   return (
//     <div className="container mx-auto py-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Email Templates</h1>
//           <p className="text-muted-foreground">Create and manage email templates for your campaigns</p>
//         </div>
//         <Button className="flex items-center gap-2">
//           <Plus className="h-4 w-4" />
//           <span>New Template</span>
//         </Button>
//       </div>

//       <Separator />

//       <Tabs defaultValue="all" className="w-full">
//         <TabsList>
//           <TabsTrigger value="all">All Templates</TabsTrigger>
//           <TabsTrigger value="welcome">Welcome</TabsTrigger>
//           <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
//           <TabsTrigger value="promotional">Promotional</TabsTrigger>
//           <TabsTrigger value="transactional">Transactional</TabsTrigger>
//         </TabsList>
//         <TabsContent value="all" className="mt-6">
//           <Suspense fallback={<EmailTemplatesLoading />}>
//             <EmailTemplatesList category={undefined} />
//           </Suspense>
//         </TabsContent>
//         <TabsContent value="welcome" className="mt-6">
//           <Suspense fallback={<EmailTemplatesLoading />}>
//             <EmailTemplatesList category="welcome" />
//           </Suspense>
//         </TabsContent>
//         <TabsContent value="newsletter" className="mt-6">
//           <Suspense fallback={<EmailTemplatesLoading />}>
//             <EmailTemplatesList category="newsletter" />
//           </Suspense>
//         </TabsContent>
//         <TabsContent value="promotional" className="mt-6">
//           <Suspense fallback={<EmailTemplatesLoading />}>
//             <EmailTemplatesList category="promotional" />
//           </Suspense>
//         </TabsContent>
//         <TabsContent value="transactional" className="mt-6">
//           <Suspense fallback={<EmailTemplatesLoading />}>
//             <EmailTemplatesList category="transactional" />
//           </Suspense>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { Suspense } from "react"
import { EmailTemplatesList } from "../components/email-templates-list"
import { EmailTemplateForm } from "../components/email-template-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { EmailTemplatesLoading } from "./loading"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function EmailTemplatesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email Templates</h1>
          <p className="text-muted-foreground">Create and manage email templates for your campaigns</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>New Template</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Create New Email Template</DialogTitle>
              <DialogDescription>Design a new email template for your marketing campaigns.</DialogDescription>
            </DialogHeader>
            <EmailTemplateForm onSuccess={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Separator />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="welcome">Welcome</TabsTrigger>
          <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
          <TabsTrigger value="promotional">Promotional</TabsTrigger>
          <TabsTrigger value="transactional">Transactional</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <Suspense fallback={<EmailTemplatesLoading />}>
            <EmailTemplatesList category={undefined} />
          </Suspense>
        </TabsContent>
        <TabsContent value="welcome" className="mt-6">
          <Suspense fallback={<EmailTemplatesLoading />}>
            <EmailTemplatesList category="welcome" />
          </Suspense>
        </TabsContent>
        <TabsContent value="newsletter" className="mt-6">
          <Suspense fallback={<EmailTemplatesLoading />}>
            <EmailTemplatesList category="newsletter" />
          </Suspense>
        </TabsContent>
        <TabsContent value="promotional" className="mt-6">
          <Suspense fallback={<EmailTemplatesLoading />}>
            <EmailTemplatesList category="promotional" />
          </Suspense>
        </TabsContent>
        <TabsContent value="transactional" className="mt-6">
          <Suspense fallback={<EmailTemplatesLoading />}>
            <EmailTemplatesList category="transactional" />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

