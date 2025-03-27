// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { getEmailTemplates, deleteEmailTemplate } from "../../actions/email-actions"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Pencil, Trash2, Copy, Eye, Send } from "lucide-react"
// import { toast } from "@/components/ui/use-toast"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { EmailTemplateForm } from "./email-template-form"
// import { Skeleton } from "@/components/ui/skeleton"

// interface EmailTemplatesListProps {
//   category?: string
// }

// export function EmailTemplatesList({ category }: EmailTemplatesListProps) {
//   const router = useRouter()
//   const [templates, setTemplates] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)
//   const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

//   useEffect(() => {
//     async function loadTemplates() {
//       setLoading(true)
//       try {
//         const result = await getEmailTemplates(category)
//         if (result.success) {
//           setTemplates(result.templates || [])
//         } else {
//           toast({
//             title: "Error",
//             description: result.error || "Failed to load templates",
//             variant: "destructive",
//           })
//         }
//       } catch (error) {
//         console.error("Error loading templates:", error)
//         toast({
//           title: "Error",
//           description: "An unexpected error occurred",
//           variant: "destructive",
//         })
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadTemplates()
//   }, [category])

//   const handleDelete = async (id: string) => {
//     try {
//       const result = await deleteEmailTemplate(id)
//       if (result.success) {
//         setTemplates(templates.filter((template) => template.id !== id))
//         toast({
//           title: "Template deleted",
//           description: "The email template has been deleted successfully",
//         })
//       } else {
//         toast({
//           title: "Error",
//           description: result.error || "Failed to delete template",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error deleting template:", error)
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleDuplicate = (template: any) => {
//     const duplicatedTemplate = {
//       ...template,
//       id: undefined,
//       name: `${template.name} (Copy)`,
//       isDefault: false,
//     }
//     setSelectedTemplate(duplicatedTemplate)
//     setIsEditDialogOpen(true)
//   }

//   const handleEdit = (template: any) => {
//     setSelectedTemplate(template)
//     setIsEditDialogOpen(true)
//   }

//   const handlePreview = (template: any) => {
//     setSelectedTemplate(template)
//     setIsPreviewDialogOpen(true)
//   }

//   const handleSendTest = (template: any) => {
//     toast({
//       title: "Test email sent",
//       description: "A test email has been sent to your email address",
//     })
//   }

//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {[1, 2, 3, 4, 5, 6].map((i) => (
//           <Card key={i} className="overflow-hidden">
//             <CardHeader className="pb-2">
//               <Skeleton className="h-5 w-3/4" />
//               <Skeleton className="h-4 w-1/2" />
//             </CardHeader>
//             <CardContent>
//               <Skeleton className="h-24 w-full" />
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <Skeleton className="h-9 w-20" />
//               <Skeleton className="h-9 w-20" />
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     )
//   }

//   if (templates.length === 0) {
//     return (
//       <Card className="p-8 text-center">
//         <CardTitle className="mb-2">No templates found</CardTitle>
//         <CardDescription>
//           {category
//             ? `No ${category} templates found. Create your first ${category} template to get started.`
//             : "No templates found. Create your first template to get started."}
//         </CardDescription>
//       </Card>
//     )
//   }

//   return (
//     <>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {templates.map((template) => (
//           <Card key={template.id} className="overflow-hidden">
//             <CardHeader className="pb-2">
//               <div className="flex justify-between items-start">
//                 <CardTitle className="text-lg">{template.name}</CardTitle>
//                 {template.isDefault && <Badge variant="secondary">Default</Badge>}
//               </div>
//               <CardDescription className="line-clamp-1">
//                 {template.description || "No description provided"}
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="text-sm text-muted-foreground mb-2">
//                 <span className="font-medium">Subject:</span> {template.subject}
//               </div>
//               <div className="border rounded-md p-3 h-24 overflow-hidden text-xs text-muted-foreground">
//                 {template.content.replace(/<[^>]*>/g, " ").substring(0, 150)}...
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <div className="flex gap-2">
//                 <Button variant="outline" size="icon" onClick={() => handleEdit(template)}>
//                   <Pencil className="h-4 w-4" />
//                 </Button>
//                 <Button variant="outline" size="icon" onClick={() => handlePreview(template)}>
//                   <Eye className="h-4 w-4" />
//                 </Button>
//               </div>
//               <div className="flex gap-2">
//                 <Button variant="outline" size="icon" onClick={() => handleDuplicate(template)}>
//                   <Copy className="h-4 w-4" />
//                 </Button>
//                 <Button variant="outline" size="icon" onClick={() => handleSendTest(template)}>
//                   <Send className="h-4 w-4" />
//                 </Button>
//                 <AlertDialog
//                   open={isDeleteDialogOpen && selectedTemplate?.id === template.id}
//                   onOpenChange={(open) => {
//                     if (!open) setIsDeleteDialogOpen(false)
//                   }}
//                 >
//                   <AlertDialogTrigger asChild>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="text-destructive hover:text-destructive"
//                       onClick={() => {
//                         setSelectedTemplate(template)
//                         setIsDeleteDialogOpen(true)
//                       }}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </AlertDialogTrigger>
//                   <AlertDialogContent>
//                     <AlertDialogHeader>
//                       <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//                       <AlertDialogDescription>
//                         This will permanently delete the "{template.name}" template. This action cannot be undone.
//                       </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                       <AlertDialogCancel>Cancel</AlertDialogCancel>
//                       <AlertDialogAction
//                         className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//                         onClick={() => handleDelete(template.id)}
//                       >
//                         Delete
//                       </AlertDialogAction>
//                     </AlertDialogFooter>
//                   </AlertDialogContent>
//                 </AlertDialog>
//               </div>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>

//       {/* Edit Template Dialog */}
//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent className="sm:max-w-[800px]">
//           <DialogHeader>
//             <DialogTitle>{selectedTemplate?.id ? "Edit Template" : "Create Template"}</DialogTitle>
//             <DialogDescription>
//               {selectedTemplate?.id
//                 ? "Make changes to your email template."
//                 : "Create a new email template based on an existing one."}
//             </DialogDescription>
//           </DialogHeader>
//           {selectedTemplate && (
//             <EmailTemplateForm
//               template={selectedTemplate}
//               onSuccess={() => {
//                 setIsEditDialogOpen(false)
//                 router.refresh()
//               }}
//             />
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Preview Template Dialog */}
//       <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
//         <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-auto">
//           <DialogHeader>
//             <DialogTitle>Preview: {selectedTemplate?.name}</DialogTitle>
//             <DialogDescription>Subject: {selectedTemplate?.subject}</DialogDescription>
//           </DialogHeader>
//           {selectedTemplate && (
//             <div className="border rounded-md p-4 bg-white">
//               <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedTemplate.content }} />
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { getEmailTemplates, deleteEmailTemplate } from "../../actions/email-actions"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Pencil, Trash2, Copy, Eye, Send } from "lucide-react"
// import { toast } from "@/hooks/use-toast"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { EmailTemplateForm } from "./email-template-form"
// import { Skeleton } from "@/components/ui/skeleton"

// interface EmailTemplatesListProps {
//   category?: string
// }

// export function EmailTemplatesList({ category }: EmailTemplatesListProps) {
//   const router = useRouter()
//   const [templates, setTemplates] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)
//   const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

//   useEffect(() => {
//     async function loadTemplates() {
//       setLoading(true)
//       try {
//         const result = await getEmailTemplates(category)
//         if (result.success) {
//           setTemplates(result.templates || [])
//         } else {
//           toast({
//             title: "Error",
//             variant: "destructive",
//           })
//         }
//       } catch (error) {
//         console.error("Error loading templates:", error)
//         toast({
//           title: "Error",
//           description: "An unexpected error occurred",
//           variant: "destructive",
//         })
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadTemplates()
//   }, [category])

//   const handleDelete = async (id: string) => {
//     try {
//       const result = await deleteEmailTemplate(id)
//       if (result.success) {
//         setTemplates(templates.filter((template) => template.id !== id))
//         toast({
//           title: "Template deleted",
//           description: "The email template has been deleted successfully",
//         })
//       } else {
//         toast({
//           title: "Error",
//           // description: result.error || "Failed to delete template",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error deleting template:", error)
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleDuplicate = (template: any) => {
//     const duplicatedTemplate = {
//       ...template,
//       id: undefined,
//       name: `${template.name} (Copy)`,
//       isDefault: false,
//     }
//     setSelectedTemplate(duplicatedTemplate)
//     setIsEditDialogOpen(true)
//   }

//   const handleEdit = (template: any) => {
//     setSelectedTemplate(template)
//     setIsEditDialogOpen(true)
//   }

//   const handlePreview = (template: any) => {
//     setSelectedTemplate(template)
//     setIsPreviewDialogOpen(true)
//   }

//   const handleSendTest = (template: any) => {
//     toast({
//       title: "Test email sent",
//       description: "A test email has been sent to your email address",
//     })
//   }

//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {[1, 2, 3, 4, 5, 6].map((i) => (
//           <Card key={i} className="overflow-hidden">
//             <CardHeader className="pb-2">
//               <Skeleton className="h-5 w-3/4" />
//               <Skeleton className="h-4 w-1/2" />
//             </CardHeader>
//             <CardContent>
//               <Skeleton className="h-24 w-full" />
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <Skeleton className="h-9 w-20" />
//               <Skeleton className="h-9 w-20" />
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     )
//   }

//   if (templates.length === 0) {
//     return (
//       <Card className="p-8 text-center">
//         <CardTitle className="mb-2">No templates found</CardTitle>
//         <CardDescription>
//           {category
//             ? `No ${category} templates found. Create your first ${category} template to get started.`
//             : "No templates found. Create your first template to get started."}
//         </CardDescription>
//       </Card>
//     )
//   }

//   return (
//     <>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {templates.map((template) => (
//           <Card key={template.id} className="overflow-hidden">
//             <CardHeader className="pb-2">
//               <div className="flex justify-between items-start">
//                 <CardTitle className="text-lg">{template.name}</CardTitle>
//                 {template.isDefault && <Badge variant="secondary">Default</Badge>}
//               </div>
//               <CardDescription className="line-clamp-1">
//                 {template.description || "No description provided"}
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="text-sm text-muted-foreground mb-2">
//                 <span className="font-medium">Subject:</span> {template.subject}
//               </div>
//               <div className="border rounded-md p-3 h-24 overflow-hidden text-xs text-muted-foreground">
//                 {template.content.replace(/<[^>]*>/g, " ").substring(0, 150)}...
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <div className="flex gap-2">
//                 <Button variant="outline" size="icon" onClick={() => handleEdit(template)}>
//                   <Pencil className="h-4 w-4" />
//                 </Button>
//                 <Button variant="outline" size="icon" onClick={() => handlePreview(template)}>
//                   <Eye className="h-4 w-4" />
//                 </Button>
//               </div>
//               <div className="flex gap-2">
//                 <Button variant="outline" size="icon" onClick={() => handleDuplicate(template)}>
//                   <Copy className="h-4 w-4" />
//                 </Button>
//                 <Button variant="outline" size="icon" onClick={() => handleSendTest(template)}>
//                   <Send className="h-4 w-4" />
//                 </Button>
//                 <AlertDialog
//                   open={isDeleteDialogOpen && selectedTemplate?.id === template.id}
//                   onOpenChange={(open) => {
//                     if (!open) setIsDeleteDialogOpen(false)
//                   }}
//                 >
//                   <AlertDialogTrigger asChild>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="text-destructive hover:text-destructive"
//                       onClick={() => {
//                         setSelectedTemplate(template)
//                         setIsDeleteDialogOpen(true)
//                       }}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </AlertDialogTrigger>
//                   <AlertDialogContent>
//                     <AlertDialogHeader>
//                       <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//                       <AlertDialogDescription>
//                         This will permanently delete the "{template.name}" template. This action cannot be undone.
//                       </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                       <AlertDialogCancel>Cancel</AlertDialogCancel>
//                       <AlertDialogAction
//                         className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//                         onClick={() => handleDelete(template.id)}
//                       >
//                         Delete
//                       </AlertDialogAction>
//                     </AlertDialogFooter>
//                   </AlertDialogContent>
//                 </AlertDialog>
//               </div>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>

//       {/* Edit Template Dialog */}
//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent className="sm:max-w-[800px]">
//           <DialogHeader>
//             <DialogTitle>{selectedTemplate?.id ? "Edit Template" : "Create Template"}</DialogTitle>
//             <DialogDescription>
//               {selectedTemplate?.id
//                 ? "Make changes to your email template."
//                 : "Create a new email template based on an existing one."}
//             </DialogDescription>
//           </DialogHeader>
//           {selectedTemplate && (
//             <EmailTemplateForm
//               template={selectedTemplate}
//               onSuccess={() => {
//                 setIsEditDialogOpen(false)
//                 router.refresh()
//               }}
//             />
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Preview Template Dialog */}
//       <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
//         <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-auto">
//           <DialogHeader>
//             <DialogTitle>Preview: {selectedTemplate?.name}</DialogTitle>
//             <DialogDescription>Subject: {selectedTemplate?.subject}</DialogDescription>
//           </DialogHeader>
//           {selectedTemplate && (
//             <div className="border rounded-md p-4 bg-white">
//               <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedTemplate.content }} />
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Skeleton } from "@/components/ui/skeleton"
// import { getEmailTemplates, deleteEmailTemplate } from "../../actions/email-actions"
// import { toast } from "@/hooks/use-toast"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { MoreHorizontal, FileText, Star } from "lucide-react"
// import Link from "next/link"
// import { formatDistanceToNow } from "date-fns"

// export function EmailTemplatesList({ category }: { category?: string }) {
//   const [loading, setLoading] = useState(true)
//   const [templates, setTemplates] = useState<any[]>([])

//   useEffect(() => {
//     async function loadTemplates() {
//       setLoading(true)
//       try {
//         const result = await getEmailTemplates(category)
//         if (result.success) {
//           setTemplates(result.templates || [])
//         } else {
//           toast({
//             title: "Error",
//             description: result.error || "Failed to load templates",
//             variant: "destructive",
//           })
//         }
//       } catch (error) {
//         console.error("Error loading templates:", error)
//         toast({
//           title: "Error",
//           description: "An unexpected error occurred",
//           variant: "destructive",
//         })
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadTemplates()
//   }, [category])

//   const handleDelete = async (id: string) => {
//     try {
//       const result = await deleteEmailTemplate(id)
//       if (result.success) {
//         toast({
//           title: "Success",
//           description: "Template deleted successfully",
//         })
//         // Remove the deleted template from the list
//         setTemplates(templates.filter((template) => template.id !== id))
//       } else {
//         toast({
//           title: "Error",
//           description: result.error || "Failed to delete template",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error deleting template:", error)
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred",
//         variant: "destructive",
//       })
//     }
//   }

//   if (loading) {
//     return (
//       <div className="space-y-4">
//         {[1, 2, 3].map((i) => (
//           <Card key={i}>
//             <CardHeader className="pb-2">
//               <Skeleton className="h-5 w-1/3" />
//               <Skeleton className="h-4 w-1/4" />
//             </CardHeader>
//             <CardContent>
//               <Skeleton className="h-4 w-full" />
//             </CardContent>
//             <CardFooter>
//               <Skeleton className="h-10 w-24" />
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     )
//   }

//   if (templates.length === 0) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>No Templates</CardTitle>
//           <CardDescription>You haven not created any email templates yet.</CardDescription>
//         </CardHeader>
//         <CardContent className="flex justify-center py-6">
//           <Link href="/admin/email/templates/new">
//             <Button>Create Your First Template</Button>
//           </Link>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <div className="space-y-4">
//       {templates.map((template) => (
//         <Card key={template.id}>
//           <CardHeader className="pb-2">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <CardTitle>{template.name}</CardTitle>
//                 {template.isDefault && (
//                   <Badge variant="secondary">
//                     <Star className="mr-1 h-3 w-3" /> Default
//                   </Badge>
//                 )}
//               </div>
//               <Badge variant="outline">{template.category}</Badge>
//             </div>
//             <CardDescription>{template.description || "No description"}</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <p className="text-sm text-muted-foreground truncate">
//               <span className="font-medium">Subject:</span> {template.subject}
//             </p>
//           </CardContent>
//           <CardFooter className="flex justify-between">
//             <p className="text-sm text-muted-foreground">
//               Updated {formatDistanceToNow(new Date(template.updatedAt), { addSuffix: true })}
//             </p>
//             <div className="flex gap-2">
//               <Link href={`/admin/email/templates/${template.id}`}>
//                 <Button variant="outline" size="sm">
//                   <FileText className="mr-2 h-4 w-4" />
//                   Edit
//                 </Button>
//               </Link>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" size="icon">
//                     <MoreHorizontal className="h-4 w-4" />
//                     <span className="sr-only">Actions</span>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem asChild>
//                     <Link href={`/admin/email/campaigns/new?templateId=${template.id}`}>Create Campaign</Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem asChild>
//                     <Link href={`/admin/email/templates/${template.id}/preview`}>Preview</Link>
//                   </DropdownMenuItem>
//                   <AlertDialog>
//                     <AlertDialogTrigger asChild>
//                       <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Delete Template</DropdownMenuItem>
//                     </AlertDialogTrigger>
//                     <AlertDialogContent>
//                       <AlertDialogHeader>
//                         <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//                         <AlertDialogDescription>
//                           This action cannot be undone. This will permanently delete the template.
//                         </AlertDialogDescription>
//                       </AlertDialogHeader>
//                       <AlertDialogFooter>
//                         <AlertDialogCancel>Cancel</AlertDialogCancel>
//                         <AlertDialogAction onClick={() => handleDelete(template.id)}>Delete</AlertDialogAction>
//                       </AlertDialogFooter>
//                     </AlertDialogContent>
//                   </AlertDialog>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </CardFooter>
//         </Card>
//       ))}
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getEmailTemplates, deleteEmailTemplate } from "../../actions/email-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Copy, Eye, Send } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { EmailTemplateForm } from "./email-template-form"
import { Skeleton } from "@/components/ui/skeleton"

interface EmailTemplatesListProps {
  category?: string
  
}

export function EmailTemplatesList({ category }: EmailTemplatesListProps) {
  const router = useRouter()
  const [templates, setTemplates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    async function loadTemplates() {
      setLoading(true)
      try {
        const result = await getEmailTemplates(category)
        if (result.success) {
          setTemplates(result.templates || [])
        } else {
          toast({
            title: "Error",
            description: "Failed to load templates",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error loading templates:", error)
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadTemplates()
  }, [category])

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteEmailTemplate(id)
      if (result.success) {
        setTemplates(templates.filter((template) => template.id !== id))
        toast({
          title: "Template deleted",
          description: "The email template has been deleted successfully",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to delete template",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting template:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleDuplicate = (template: any) => {
    const duplicatedTemplate = {
      ...template,
      id: undefined,
      name: `${template.name} (Copy)`,
      isDefault: false,
    }
    setSelectedTemplate(duplicatedTemplate)
    setIsEditDialogOpen(true)
  }

  const handleEdit = (template: any) => {
    setSelectedTemplate(template)
    setIsEditDialogOpen(true)
  }

  const handlePreview = (template: any) => {
    setSelectedTemplate(template)
    setIsPreviewDialogOpen(true)
  }

  const handleSendTest = (template: any) => {
    toast({
      title: "Test email sent",
      description: "A test email has been sent to your email address",
    })
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full" />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (templates.length === 0) {
    return (
      <Card className="p-8 text-center">
        <CardTitle className="mb-2">No templates found</CardTitle>
        <CardDescription>
          {category
            ? `No ${category} templates found. Create your first ${category} template to get started.`
            : "No templates found. Create your first template to get started."}
        </CardDescription>
      </Card>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                {template.isDefault && <Badge variant="secondary">Default</Badge>}
              </div>
              <CardDescription className="line-clamp-1">
                {template.description || "No description provided"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-2">
                <span className="font-medium">Subject:</span> {template.subject}
              </div>
              <div className="border rounded-md p-3 h-24 overflow-hidden text-xs text-muted-foreground">
                {template.content.replace(/<[^>]*>/g, " ").substring(0, 150)}...
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => handleEdit(template)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handlePreview(template)}>
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => handleDuplicate(template)}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleSendTest(template)}>
                  <Send className="h-4 w-4" />
                </Button>
                <AlertDialog
                  open={isDeleteDialogOpen && selectedTemplate?.id === template.id}
                  onOpenChange={(open) => {
                    if (!open) setIsDeleteDialogOpen(false)
                  }}
                >
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => {
                        setSelectedTemplate(template)
                        setIsDeleteDialogOpen(true)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the &ldquo;{template.name}&rdquo; template. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={() => handleDelete(template.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Edit Template Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{selectedTemplate?.id ? "Edit Template" : "Create Template"}</DialogTitle>
            <DialogDescription>
              {selectedTemplate?.id
                ? "Make changes to your email template."
                : "Create a new email template based on an existing one."}
            </DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <EmailTemplateForm
              template={selectedTemplate}
              onSuccess={() => {
                setIsEditDialogOpen(false)
                router.refresh()
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Preview Template Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Preview: {selectedTemplate?.name}</DialogTitle>
            <DialogDescription>Subject: {selectedTemplate?.subject}</DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <div className="border rounded-md p-4 bg-white">
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedTemplate.content }} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

