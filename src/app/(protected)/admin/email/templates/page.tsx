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

// "use client"

// import { useState } from "react"
// import { Suspense } from "react"
// import { EmailTemplatesList } from "../components/email-templates-list"
// import { EmailTemplateForm } from "../components/email-template-form"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Separator } from "@/components/ui/separator"
// import { Button } from "@/components/ui/button"
// import { Plus } from "lucide-react"
// import { EmailTemplatesLoading } from "./loading"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"

// export default function EmailTemplatesPage() {
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [activeTab, setActiveTab] = useState("all")

//   return (
//     <div className="container mx-auto py-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Email Templates</h1>
//           <p className="text-muted-foreground">Create and manage email templates for your campaigns</p>
//         </div>
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//             <Button className="flex items-center gap-2">
//               <Plus className="h-4 w-4" />
//               <span>New Template</span>
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[800px]">
//             <DialogHeader>
//               <DialogTitle>Create New Email Template</DialogTitle>
//               <DialogDescription>Design a new email template for your marketing campaigns.</DialogDescription>
//             </DialogHeader>
//             <EmailTemplateForm onSuccess={() => setIsDialogOpen(false)} />
//           </DialogContent>
//         </Dialog>
//       </div>

//       <Separator />

//       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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

// "use client"

// import { useState } from "react"
// import { Suspense } from "react"
// import { EmailTemplatesList } from "../components/email-templates-list"
// import { EmailTemplateForm } from "../components/email-template-form"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Separator } from "@/components/ui/separator"
// import { Button } from "@/components/ui/button"
// import { Plus } from "lucide-react"
// import { EmailTemplatesLoading } from "./loading"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"

// export default function EmailTemplatesPage() {
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [activeTab, setActiveTab] = useState("all")

//   return (
//     <div className="container mx-auto py-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Email Templates</h1>
//           <p className="text-muted-foreground">Create and manage email templates for your campaigns</p>
//         </div>
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//             <Button className="flex items-center gap-2">
//               <Plus className="h-4 w-4" />
//               <span>New Template</span>
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[800px]">
//             <DialogHeader>
//               <DialogTitle>Create New Email Template</DialogTitle>
//               <DialogDescription>Design a new email template for your marketing campaigns.</DialogDescription>
//             </DialogHeader>
//             <EmailTemplateForm onSuccess={() => setIsDialogOpen(false)} />
//           </DialogContent>
//         </Dialog>
//       </div>

//       <Separator />

//       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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

// "use client"

// import { useState } from "react"
// import { Suspense } from "react"
// import { EmailTemplatesList } from "../components/email-templates-list"
// import { EmailTemplateForm } from "../components/email-template-form"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Separator } from "@/components/ui/separator"
// import { Button } from "@/components/ui/button"
// import { Plus } from "lucide-react"
// import { EmailTemplatesLoading } from "./loading"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"

// export default function EmailTemplatesPage() {
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [activeTab, setActiveTab] = useState("all")

//   return (
//     <div className="container mx-auto py-4 md:py-6 px-4 md:px-6 space-y-4 md:space-y-6 max-w-full">
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Email Templates</h1>
//           <p className="text-sm text-muted-foreground">Create and manage email templates for your campaigns</p>
//         </div>
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//             <Button className="w-full sm:w-auto flex items-center gap-2">
//               <Plus className="h-4 w-4" />
//               <span>New Template</span>
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="w-[95vw] max-w-[800px] h-[90vh] max-h-[900px] overflow-y-auto">
//             <DialogHeader>
//               <DialogTitle>Create New Email Template</DialogTitle>
//               <DialogDescription>Design a new email template for your marketing campaigns.</DialogDescription>
//             </DialogHeader>
//             <EmailTemplateForm onSuccess={() => setIsDialogOpen(false)} />
//           </DialogContent>
//         </Dialog>
//       </div>

//       <Separator />

//       <div className="overflow-x-auto -mx-4 px-4">
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//           <TabsList className="w-full sm:w-auto flex overflow-x-auto no-scrollbar">
//             <TabsTrigger value="all" className="flex-shrink-0">
//               All Templates
//             </TabsTrigger>
//             <TabsTrigger value="welcome" className="flex-shrink-0">
//               Welcome
//             </TabsTrigger>
//             <TabsTrigger value="newsletter" className="flex-shrink-0">
//               Newsletter
//             </TabsTrigger>
//             <TabsTrigger value="promotional" className="flex-shrink-0">
//               Promotional
//             </TabsTrigger>
//             <TabsTrigger value="transactional" className="flex-shrink-0">
//               Transactional
//             </TabsTrigger>
//           </TabsList>
//           <TabsContent value="all" className="mt-4 md:mt-6">
//             <Suspense fallback={<EmailTemplatesLoading />}>
//               <EmailTemplatesList category={undefined} />
//             </Suspense>
//           </TabsContent>
//           <TabsContent value="welcome" className="mt-4 md:mt-6">
//             <Suspense fallback={<EmailTemplatesLoading />}>
//               <EmailTemplatesList category="welcome" />
//             </Suspense>
//           </TabsContent>
//           <TabsContent value="newsletter" className="mt-4 md:mt-6">
//             <Suspense fallback={<EmailTemplatesLoading />}>
//               <EmailTemplatesList category="newsletter" />
//             </Suspense>
//           </TabsContent>
//           <TabsContent value="promotional" className="mt-4 md:mt-6">
//             <Suspense fallback={<EmailTemplatesLoading />}>
//               <EmailTemplatesList category="promotional" />
//             </Suspense>
//           </TabsContent>
//           <TabsContent value="transactional" className="mt-4 md:mt-6">
//             <Suspense fallback={<EmailTemplatesLoading />}>
//               <EmailTemplatesList category="transactional" />
//             </Suspense>
//           </TabsContent>
//         </Tabs>
//       </div>
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
import { Plus, Search, Filter, SortAsc, SortDesc, Grid, List } from "lucide-react"
import { EmailTemplatesLoading } from "./loading"
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

export default function EmailTemplatesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  return (
    <div className="container mx-auto py-4 md:py-6 px-4 md:px-6 space-y-4 md:space-y-6 max-w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Email Templates</h1>
          <p className="text-sm text-muted-foreground">Create and manage email templates for your campaigns</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>New Template</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-[800px] h-[90vh] max-h-[900px] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Email Template</DialogTitle>
              <DialogDescription>Design a new email template for your marketing campaigns.</DialogDescription>
            </DialogHeader>
            <EmailTemplateForm onSuccess={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Separator />

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search templates..."
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
                <DropdownMenuItem>Default Templates</DropdownMenuItem>
                <DropdownMenuItem>My Templates</DropdownMenuItem>
                <DropdownMenuItem>Recently Modified</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
          </Button>

          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              className={`h-9 rounded-none px-2 ${viewMode === "grid" ? "bg-secondary" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-9 rounded-none px-2 ${viewMode === "list" ? "bg-secondary" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full sm:w-auto flex overflow-x-auto no-scrollbar">
            <TabsTrigger value="all" className="flex-shrink-0">
              All Templates
            </TabsTrigger>
            <TabsTrigger value="welcome" className="flex-shrink-0">
              Welcome
            </TabsTrigger>
            <TabsTrigger value="newsletter" className="flex-shrink-0">
              Newsletter
            </TabsTrigger>
            <TabsTrigger value="promotional" className="flex-shrink-0">
              Promotional
            </TabsTrigger>
            <TabsTrigger value="transactional" className="flex-shrink-0">
              Transactional
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4 md:mt-6">
            <Suspense fallback={<EmailTemplatesLoading />}>
              <EmailTemplatesList category={undefined} />
            </Suspense>
          </TabsContent>
          <TabsContent value="welcome" className="mt-4 md:mt-6">
            <Suspense fallback={<EmailTemplatesLoading />}>
              <EmailTemplatesList category="welcome" />
            </Suspense>
          </TabsContent>
          <TabsContent value="newsletter" className="mt-4 md:mt-6">
            <Suspense fallback={<EmailTemplatesLoading />}>
              <EmailTemplatesList category="newsletter" />
            </Suspense>
          </TabsContent>
          <TabsContent value="promotional" className="mt-4 md:mt-6">
            <Suspense fallback={<EmailTemplatesLoading />}>
              <EmailTemplatesList category="promotional" />
            </Suspense>
          </TabsContent>
          <TabsContent value="transactional" className="mt-4 md:mt-6">
            <Suspense fallback={<EmailTemplatesLoading />}>
              <EmailTemplatesList category="transactional" />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

