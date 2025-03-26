// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Badge } from "@/components/ui/badge"
// import { Edit, MoreVertical, Trash, Copy, Send, Check, Star } from "lucide-react"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog"
// import { toast } from "@/hooks/use-toast"
// import { deleteEmailTemplate, getEmailTemplates, updateEmailTemplate } from "../../actions/email-actions"
// import { EmailTemplateForm } from "./email-template-form"
// import { Dialog, DialogContent } from "@/components/ui/dialog"

// export function EmailTemplatesList({ category }: { category?: string }) {
//   const router = useRouter()
//   const [templates, setTemplates] = useState<any[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
//   const [editDialogOpen, setEditDialogOpen] = useState(false)
//   const [selectedTemplate, setSelectedTemplate] = useState<any>(null)

//   // Load templates
//   useState(() => {
//     async function loadTemplates() {
//       setIsLoading(true)
//       const result = await getEmailTemplates(category)
//       if (result.success) {
//         setTemplates(result.templates)
//       } else {
//         toast({
//           title: "Error",
//           description: "Failed to load email templates",
//           variant: "destructive",
//         })
//       }
//       setIsLoading(false)
//     }

//     loadTemplates()
//   })

//   // Handle delete
//   const handleDelete = async () => {
//     if (!selectedTemplate) return

//     const result = await deleteEmailTemplate(selectedTemplate.id)

//     if (result.success) {
//       toast({
//         title: "Template deleted",
//         description: "The email template has been deleted successfully",
//       })

//       // Remove from local state
//       setTemplates(templates.filter((t) => t.id !== selectedTemplate.id))
//     } else {
//       toast({
//         title: "Error",
//         description: "Failed to delete the template",
//         variant: "destructive",
//       })
//     }

//     setDeleteDialogOpen(false)
//   }

//   // Handle set as default
//   const handleSetDefault = async (template: any) => {
//     const formData = new FormData()
//     formData.append("name", template.name)
//     formData.append("subject", template.subject)
//     formData.append("content", template.content)
//     formData.append("description", template.description || "")
//     formData.append("category", template.category)
//     formData.append("isDefault", "true")

//     const result = await updateEmailTemplate(template.id, formData)

//     if (result.success) {
//       toast({
//         title: "Default template updated",
//         description: `"${template.name}" is now the default template for ${template.category}`,
//       })

//       // Update local state
//       setTemplates(
//         templates.map((t) => ({
//           ...t,
//           isDefault: t.id === template.id ? true : t.category === template.category ? false : t.isDefault,
//         })),
//       )
//     } else {
//       toast({
//         title: "Error",
//         description: "Failed to update the default template",
//         variant: "destructive",
//       })
//     }
//   }

//   // Handle duplicate
//   const handleDuplicate = (template: any) => {
//     setSelectedTemplate({
//       ...template,
//       name: `${template.name} (Copy)`,
//       id: undefined,
//       isDefault: false,
//     })
//     setEditDialogOpen(true)
//   }

//   if (isLoading) {
//     return <p>Loading templates...</p>
//   }

//   if (templates.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <h3 className="text-lg font-medium">No templates found</h3>
//         <p className="text-muted-foreground mt-2">
//           {category
//             ? `You haven't created any ${category} templates yet.`
//             : "You haven't created any email templates yet."}
//         </p>
//         <Button
//           className="mt-4"
//           onClick={() => {
//             setSelectedTemplate(null)
//             setEditDialogOpen(true)
//           }}
//         >
//           Create your first template
//         </Button>
//       </div>
//     )
//   }

//   return (
//     <>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {templates.map((template) => (
//           <Card key={template.id} className="overflow-hidden">
//             <CardHeader>
//               <div className="flex justify-between items-start">
//                 <div>
//                   <CardTitle className="flex items-center gap-2">
//                     {template.name}
//                     {template.isDefault && (
//                       <Badge variant="secondary" className="ml-2">
//                         Default
//                       </Badge>
//                     )}
//                   </CardTitle>
//                   <CardDescription>{template.category}</CardDescription>
//                 </div>
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" size="icon">
//                       <MoreVertical className="h-4 w-4" />
//                       <span className="sr-only">Menu</span>
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     <DropdownMenuItem
//                       onClick={() => {
//                         setSelectedTemplate(template)
//                         setEditDialogOpen(true)
//                       }}
//                     >
//                       <Edit className="mr-2 h-4 w-4" />
//                       Edit
//                     </DropdownMenuItem>
//                     <DropdownMenuItem onClick={() => handleDuplicate(template)}>
//                       <Copy className="mr-2 h-4 w-4" />
//                       Duplicate
//                     </DropdownMenuItem>
//                     <DropdownMenuItem
//                       onClick={() => {
//                         // TODO: Implement send test email
//                         toast({
//                           title: "Coming soon",
//                           description: "This feature is not yet implemented",
//                         })
//                       }}
//                     >
//                       <Send className="mr-2 h-4 w-4" />
//                       Send Test
//                     </DropdownMenuItem>
//                     {!template.isDefault && (
//                       <DropdownMenuItem onClick={() => handleSetDefault(template)}>
//                         <Star className="mr-2 h-4 w-4" />
//                         Set as Default
//                       </DropdownMenuItem>
//                     )}
//                     {template.isDefault && (
//                       <DropdownMenuItem disabled>
//                         <Check className="mr-2 h-4 w-4" />
//                         Default Template
//                       </DropdownMenuItem>
//                     )}
//                     <DropdownMenuItem
//                       className="text-destructive focus:text-destructive"
//                       onClick={() => {
//                         setSelectedTemplate(template)
//                         setDeleteDialogOpen(true)
//                       }}
//                     >
//                       <Trash className="mr-2 h-4 w-4" />
//                       Delete
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-sm text-muted-foreground">
//                 <p className="font-medium">Subject: {template.subject}</p>
//                 <p className="mt-2 line-clamp-3">{template.content.replace(/<[^>]*>/g, " ")}</p>
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between border-t p-4 bg-muted/50">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => {
//                   setSelectedTemplate(template)
//                   setEditDialogOpen(true)
//                 }}
//               >
//                 Edit
//               </Button>
//               <Button
//                 variant="default"
//                 size="sm"
//                 onClick={() => {
//                   // TODO: Implement preview
//                   toast({
//                     title: "Coming soon",
//                     description: "This feature is not yet implemented",
//                   })
//                 }}
//               >
//                 Preview
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>

//       {/* Delete confirmation dialog */}
//       <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This will permanently delete the template "{selectedTemplate?.name}". This action cannot be undone.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={handleDelete}
//               className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//             >
//               Delete
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>

//       {/* Edit/Create dialog */}
//       <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
//         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//           <EmailTemplateForm
//             template={selectedTemplate}
//             onSuccess={() => {
//               setEditDialogOpen(false)
//               router.refresh()
//             }}
//           />
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Edit, MoreVertical, Trash, Copy, Send, Check, Star } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/hooks/use-toast"
import { deleteEmailTemplate, getEmailTemplates, updateEmailTemplate } from "../../actions/email-actions"
import { EmailTemplateForm } from "./email-template-form"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import React from "react"

export function EmailTemplatesList({ category }: { category?: string }) {
  const router = useRouter()
  const [templates, setTemplates] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)

  // Load templates
  React.useEffect(() => {
    async function loadTemplates() {
      setIsLoading(true)
      const result = await getEmailTemplates(category)
      if (result.success) {
        setTemplates(result.templates || [])
      } else {
        toast({
          title: "Error",
          description: "Failed to load email templates",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }

    loadTemplates()
  }, [category]) // Add category as a dependency

  // Handle delete
  const handleDelete = async () => {
    if (!selectedTemplate) return

    const result = await deleteEmailTemplate(selectedTemplate.id)

    if (result.success) {
      toast({
        title: "Template deleted",
        description: "The email template has been deleted successfully",
      })

      // Remove from local state
      setTemplates(templates.filter((t) => t.id !== selectedTemplate.id))
    } else {
      toast({
        title: "Error",
        description: "Failed to delete the template",
        variant: "destructive",
      })
    }

    setDeleteDialogOpen(false)
  }

  // Handle set as default
  const handleSetDefault = async (template: any) => {
    const formData = new FormData()
    formData.append("name", template.name)
    formData.append("subject", template.subject)
    formData.append("content", template.content)
    formData.append("description", template.description || "")
    formData.append("category", template.category)
    formData.append("isDefault", "true")

    const result = await updateEmailTemplate(template.id, formData)

    if (result.success) {
      toast({
        title: "Default template updated",
        description: `"${template.name}" is now the default template for ${template.category}`,
      })

      // Update local state
      setTemplates(
        templates.map((t) => ({
          ...t,
          isDefault: t.id === template.id ? true : t.category === template.category ? false : t.isDefault,
        })),
      )
    } else {
      toast({
        title: "Error",
        description: "Failed to update the default template",
        variant: "destructive",
      })
    }
  }

  // Handle duplicate
  const handleDuplicate = (template: any) => {
    setSelectedTemplate({
      ...template,
      name: `${template.name} (Copy)`,
      id: undefined,
      isDefault: false,
    })
    setEditDialogOpen(true)
  }

  if (isLoading) {
    return <p>Loading templates...</p>
  }

  if (templates.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No templates found</h3>
        <p className="text-muted-foreground mt-2">
          {category
            ? `You haven't created any ${category} templates yet.`
            : "You haven't created any email templates yet."}
        </p>
        <Button
          className="mt-4"
          onClick={() => {
            setSelectedTemplate(null)
            setEditDialogOpen(true)
          }}
        >
          Create your first template
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {template.name}
                    {template.isDefault && (
                      <Badge variant="secondary" className="ml-2">
                        Default
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{template.category}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedTemplate(template)
                        setEditDialogOpen(true)
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicate(template)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        // TODO: Implement send test email
                        toast({
                          title: "Coming soon",
                          description: "This feature is not yet implemented",
                        })
                      }}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Test
                    </DropdownMenuItem>
                    {!template.isDefault && (
                      <DropdownMenuItem onClick={() => handleSetDefault(template)}>
                        <Star className="mr-2 h-4 w-4" />
                        Set as Default
                      </DropdownMenuItem>
                    )}
                    {template.isDefault && (
                      <DropdownMenuItem disabled>
                        <Check className="mr-2 h-4 w-4" />
                        Default Template
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => {
                        setSelectedTemplate(template)
                        setDeleteDialogOpen(true)
                      }}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium">Subject: {template.subject}</p>
                <p className="mt-2 line-clamp-3">{template.content.replace(/<[^>]*>/g, " ")}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4 bg-muted/50">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedTemplate(template)
                  setEditDialogOpen(true)
                }}
              >
                Edit
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  // TODO: Implement preview
                  toast({
                    title: "Coming soon",
                    description: "This feature is not yet implemented",
                  })
                }}
              >
                Preview
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the template "{selectedTemplate?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit/Create dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <EmailTemplateForm
            template={selectedTemplate}
            onSuccess={() => {
              setEditDialogOpen(false)
              router.refresh()
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

