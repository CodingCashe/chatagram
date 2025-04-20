// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Badge } from "@/components/ui/badge"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogClose,
// } from "@/components/ui/dialog"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Plus, Search, MoreHorizontal, Edit, Trash2, Copy, Eye, Wand2, RefreshCw } from "lucide-react"
// import {
//   getMessageTemplates,
//   createMessageTemplate,
//   updateMessageTemplate,
//   deleteMessageTemplate,
//   generateAITemplate,
// } from "../actions/message-templates"
// import { useToast } from "@/hooks/use-toast"

// type MessageTemplate = {
//   id: string
//   name: string
//   content: string
//   category: string
//   tags: string[]
//   usageCount: number
//   createdAt: string
//   updatedAt: string
// }

// export function MessageTemplates() {
//   const [templates, setTemplates] = useState<MessageTemplate[]>([])
//   const [filteredTemplates, setFilteredTemplates] = useState<MessageTemplate[]>([])
//   const [searchQuery, setSearchQuery] = useState("")
//   const [categoryFilter, setCategoryFilter] = useState<string>("all")
//   const [loading, setLoading] = useState(true)
//   const [isCreating, setIsCreating] = useState(false)
//   const [isEditing, setIsEditing] = useState(false)
//   const [isGenerating, setIsGenerating] = useState(false)
//   const [currentTemplate, setCurrentTemplate] = useState<MessageTemplate | null>(null)
//   const [formData, setFormData] = useState({
//     name: "",
//     content: "",
//     category: "general",
//     tags: "",
//   })
//   const [aiPrompt, setAiPrompt] = useState("")
//   const { toast } = useToast()

//   useEffect(() => {
//     fetchTemplates()
//   }, [])

//   useEffect(() => {
//     if (templates.length > 0) {
//       filterTemplates()
//     }
//   }, [searchQuery, categoryFilter, templates])

//   const fetchTemplates = async () => {
//     try {
//       setLoading(true)
//       const data = await getMessageTemplates()
//       setTemplates(data)
//       setFilteredTemplates(data)
//     } catch (error) {
//       console.error("Error fetching templates:", error)
//       toast({
//         title: "Error",
//         description: "Failed to load message templates",
//         variant: "destructive",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const filterTemplates = () => {
//     let filtered = [...templates]

//     // Apply search filter
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase()
//       filtered = filtered.filter(
//         (template) =>
//           template.name.toLowerCase().includes(query) ||
//           template.content.toLowerCase().includes(query) ||
//           template.tags.some((tag) => tag.toLowerCase().includes(query)),
//       )
//     }

//     // Apply category filter
//     if (categoryFilter !== "all") {
//       filtered = filtered.filter((template) => template.category === categoryFilter)
//     }

//     setFilteredTemplates(filtered)
//   }

//   const handleCreateTemplate = async () => {
//     try {
//       if (!formData.name || !formData.content) {
//         toast({
//           title: "Validation Error",
//           description: "Name and content are required",
//           variant: "destructive",
//         })
//         return
//       }

//       setIsCreating(true)
//       const newTemplate = await createMessageTemplate({
//         name: formData.name,
//         content: formData.content,
//         category: formData.category,
//         tags: formData.tags
//           .split(",")
//           .map((tag) => tag.trim())
//           .filter(Boolean),
//       })

//       setTemplates((prev) => [...prev, newTemplate])
//       resetForm()

//       toast({
//         title: "Template Created",
//         description: "Your message template has been created successfully",
//       })
//     } catch (error) {
//       console.error("Error creating template:", error)
//       toast({
//         title: "Error",
//         description: "Failed to create template",
//         variant: "destructive",
//       })
//     } finally {
//       setIsCreating(false)
//     }
//   }

//   const handleUpdateTemplate = async () => {
//     try {
//       if (!currentTemplate || !formData.name || !formData.content) {
//         toast({
//           title: "Validation Error",
//           description: "Name and content are required",
//           variant: "destructive",
//         })
//         return
//       }

//       setIsEditing(true)
//       const updatedTemplate = await updateMessageTemplate(currentTemplate.id, {
//         name: formData.name,
//         content: formData.content,
//         category: formData.category,
//         tags: formData.tags
//           .split(",")
//           .map((tag) => tag.trim())
//           .filter(Boolean),
//       })

//       setTemplates((prev) => prev.map((template) => (template.id === updatedTemplate.id ? updatedTemplate : template)))

//       resetForm()

//       toast({
//         title: "Template Updated",
//         description: "Your message template has been updated successfully",
//       })
//     } catch (error) {
//       console.error("Error updating template:", error)
//       toast({
//         title: "Error",
//         description: "Failed to update template",
//         variant: "destructive",
//       })
//     } finally {
//       setIsEditing(false)
//     }
//   }

//   const handleDeleteTemplate = async (id: string) => {
//     try {
//       await deleteMessageTemplate(id)

//       setTemplates((prev) => prev.filter((template) => template.id !== id))

//       toast({
//         title: "Template Deleted",
//         description: "Your message template has been deleted successfully",
//       })
//     } catch (error) {
//       console.error("Error deleting template:", error)
//       toast({
//         title: "Error",
//         description: "Failed to delete template",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleGenerateTemplate = async () => {
//     try {
//       if (!aiPrompt) {
//         toast({
//           title: "Validation Error",
//           description: "Please provide a prompt for the AI",
//           variant: "destructive",
//         })
//         return
//       }

//       setIsGenerating(true)
//       const generatedTemplate = await generateAITemplate(aiPrompt)

//       setFormData({
//         name: generatedTemplate.name,
//         content: generatedTemplate.content,
//         category: generatedTemplate.category,
//         tags: generatedTemplate.tags.join(", "),
//       })

//       setAiPrompt("")

//       toast({
//         title: "Template Generated",
//         description: "AI has generated a template based on your prompt",
//       })
//     } catch (error) {
//       console.error("Error generating template:", error)
//       toast({
//         title: "Error",
//         description: "Failed to generate template",
//         variant: "destructive",
//       })
//     } finally {
//       setIsGenerating(false)
//     }
//   }

//   const editTemplate = (template: MessageTemplate) => {
//     setCurrentTemplate(template)
//     setFormData({
//       name: template.name,
//       content: template.content,
//       category: template.category,
//       tags: template.tags.join(", "),
//     })
//     setIsEditing(true)
//   }

//   const resetForm = () => {
//     setCurrentTemplate(null)
//     setFormData({
//       name: "",
//       content: "",
//       category: "general",
//       tags: "",
//     })
//     setIsEditing(false)
//   }

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text)
//     toast({
//       title: "Copied to Clipboard",
//       description: "Template content has been copied to clipboard",
//     })
//   }

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString(undefined, {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   const getCategoryBadge = (category: string) => {
//     switch (category) {
//       case "welcome":
//         return <Badge className="bg-blue-500">Welcome</Badge>
//       case "follow-up":
//         return <Badge className="bg-green-500">Follow-up</Badge>
//       case "promotion":
//         return <Badge className="bg-purple-500">Promotion</Badge>
//       case "support":
//         return <Badge className="bg-amber-500">Support</Badge>
//       default:
//         return <Badge>General</Badge>
//     }
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <CardTitle>Message Templates</CardTitle>
//             <CardDescription>Create and manage reusable message templates for your automations</CardDescription>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-2">
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button className="gap-2">
//                   <Plus className="h-4 w-4" />
//                   New Template
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[600px]">
//                 <DialogHeader>
//                   <DialogTitle>Create New Template</DialogTitle>
//                   <DialogDescription>Create a reusable message template for your automations</DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <div className="grid gap-2">
//                     <label htmlFor="name" className="text-sm font-medium">
//                       Template Name
//                     </label>
//                     <Input
//                       id="name"
//                       value={formData.name}
//                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                       placeholder="Welcome Message"
//                     />
//                   </div>
//                   <div className="grid gap-2">
//                     <label htmlFor="category" className="text-sm font-medium">
//                       Category
//                     </label>
//                     <Select
//                       value={formData.category}
//                       onValueChange={(value) => setFormData({ ...formData, category: value })}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select a category" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="general">General</SelectItem>
//                         <SelectItem value="welcome">Welcome</SelectItem>
//                         <SelectItem value="follow-up">Follow-up</SelectItem>
//                         <SelectItem value="promotion">Promotion</SelectItem>
//                         <SelectItem value="support">Support</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="grid gap-2">
//                     <label htmlFor="content" className="text-sm font-medium">
//                       Template Content
//                     </label>
//                     <Textarea
//                       id="content"
//                       value={formData.content}
//                       onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//                       placeholder="Hi {{name}}, thanks for connecting with us!"
//                       className="min-h-[150px]"
//                     />
//                     <p className="text-xs text-muted-foreground">Use {{ variable }} syntax for dynamic content</p>
//                   </div>
//                   <div className="grid gap-2">
//                     <label htmlFor="tags" className="text-sm font-medium">
//                       Tags
//                     </label>
//                     <Input
//                       id="tags"
//                       value={formData.tags}
//                       onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
//                       placeholder="welcome, introduction, new user"
//                     />
//                     <p className="text-xs text-muted-foreground">Separate tags with commas</p>
//                   </div>
//                 </div>
//                 <DialogFooter>
//                   <DialogClose asChild>
//                     <Button variant="outline">Cancel</Button>
//                   </DialogClose>
//                   <Button onClick={handleCreateTemplate} disabled={isCreating}>
//                     {isCreating ? (
//                       <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
//                     ) : (
//                       <Plus className="h-4 w-4 mr-2" />
//                     )}
//                     Create Template
//                   </Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>

//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button variant="outline" className="gap-2">
//                   <Wand2 className="h-4 w-4" />
//                   AI Generate
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[600px]">
//                 <DialogHeader>
//                   <DialogTitle>Generate Template with AI</DialogTitle>
//                   <DialogDescription>Let AI create a message template based on your requirements</DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <div className="grid gap-2">
//                     <label htmlFor="ai-prompt" className="text-sm font-medium">
//                       Describe what you need
//                     </label>
//                     <Textarea
//                       id="ai-prompt"
//                       value={aiPrompt}
//                       onChange={(e) => setAiPrompt(e.target.value)}
//                       placeholder="Create a welcome message for new Instagram followers that introduces our automation service"
//                       className="min-h-[150px]"
//                     />
//                     <p className="text-xs text-muted-foreground">
//                       Be specific about the purpose, tone, and any variables you want to include
//                     </p>
//                   </div>
//                 </div>
//                 <DialogFooter>
//                   <DialogClose asChild>
//                     <Button variant="outline">Cancel</Button>
//                   </DialogClose>
//                   <Button onClick={handleGenerateTemplate} disabled={isGenerating}>
//                     {isGenerating ? (
//                       <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
//                     ) : (
//                       <Wand2 className="h-4 w-4 mr-2" />
//                     )}
//                     Generate Template
//                   </Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search templates..."
//                 className="pl-8"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Filter by category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Categories</SelectItem>
//                 <SelectItem value="general">General</SelectItem>
//                 <SelectItem value="welcome">Welcome</SelectItem>
//                 <SelectItem value="follow-up">Follow-up</SelectItem>
//                 <SelectItem value="promotion">Promotion</SelectItem>
//                 <SelectItem value="support">Support</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {loading ? (
//             <div className="space-y-4">
//               {[...Array(5)].map((_, i) => (
//                 <div key={i} className="animate-pulse">
//                   <div className="h-12 bg-muted rounded-md mb-2"></div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="rounded-md border">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Category</TableHead>
//                     <TableHead>Tags</TableHead>
//                     <TableHead>Usage</TableHead>
//                     <TableHead>Last Updated</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredTemplates.length === 0 ? (
//                     <TableRow>
//                       <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
//                         No templates found
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     filteredTemplates.map((template) => (
//                       <TableRow key={template.id}>
//                         <TableCell className="font-medium">{template.name}</TableCell>
//                         <TableCell>{getCategoryBadge(template.category)}</TableCell>
//                         <TableCell>
//                           <div className="flex flex-wrap gap-1">
//                             {template.tags.map((tag, i) => (
//                               <Badge key={i} variant="outline" className="text-xs">
//                                 {tag}
//                               </Badge>
//                             ))}
//                           </div>
//                         </TableCell>
//                         <TableCell>{template.usageCount}</TableCell>
//                         <TableCell>{formatDate(template.updatedAt)}</TableCell>
//                         <TableCell className="text-right">
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" size="icon">
//                                 <MoreHorizontal className="h-4 w-4" />
//                                 <span className="sr-only">Open menu</span>
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                               <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                               <DropdownMenuSeparator />
//                               <Dialog>
//                                 <DialogTrigger asChild>
//                                   <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
//                                     <Eye className="h-4 w-4 mr-2" />
//                                     Preview
//                                   </DropdownMenuItem>
//                                 </DialogTrigger>
//                                 <DialogContent>
//                                   <DialogHeader>
//                                     <DialogTitle>{template.name}</DialogTitle>
//                                     <DialogDescription>{getCategoryBadge(template.category)}</DialogDescription>
//                                   </DialogHeader>
//                                   <div className="p-4 border rounded-md bg-muted/50 whitespace-pre-wrap">
//                                     {template.content}
//                                   </div>
//                                   <DialogFooter>
//                                     <Button variant="outline" onClick={() => copyToClipboard(template.content)}>
//                                       <Copy className="h-4 w-4 mr-2" />
//                                       Copy
//                                     </Button>
//                                   </DialogFooter>
//                                 </DialogContent>
//                               </Dialog>
//                               <DropdownMenuItem onClick={() => editTemplate(template)}>
//                                 <Edit className="h-4 w-4 mr-2" />
//                                 Edit
//                               </DropdownMenuItem>
//                               <DropdownMenuItem onClick={() => copyToClipboard(template.content)}>
//                                 <Copy className="h-4 w-4 mr-2" />
//                                 Copy
//                               </DropdownMenuItem>
//                               <DropdownMenuSeparator />
//                               <Dialog>
//                                 <DialogTrigger asChild>
//                                   <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
//                                     <Trash2 className="h-4 w-4 mr-2" />
//                                     Delete
//                                   </DropdownMenuItem>
//                                 </DialogTrigger>
//                                 <DialogContent>
//                                   <DialogHeader>
//                                     <DialogTitle>Confirm Deletion</DialogTitle>
//                                     <DialogDescription>
//                                       Are you sure you want to delete the template "{template.name}"? This action cannot
//                                       be undone.
//                                     </DialogDescription>
//                                   </DialogHeader>
//                                   <DialogFooter>
//                                     <DialogClose asChild>
//                                       <Button variant="outline">Cancel</Button>
//                                     </DialogClose>
//                                     <Button variant="destructive" onClick={() => handleDeleteTemplate(template.id)}>
//                                       Delete
//                                     </Button>
//                                   </DialogFooter>
//                                 </DialogContent>
//                               </Dialog>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </div>
//           )}
//         </div>
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <p className="text-sm text-muted-foreground">
//           {filteredTemplates.length} template{filteredTemplates.length !== 1 ? "s" : ""} found
//         </p>
//         <Button variant="outline" size="sm" onClick={fetchTemplates}>
//           <RefreshCw className="h-4 w-4 mr-2" />
//           Refresh
//         </Button>
//       </CardFooter>

//       {/* Edit Template Dialog */}
//       <Dialog open={isEditing} onOpenChange={(open) => !open && resetForm()}>
//         <DialogContent className="sm:max-w-[600px]">
//           <DialogHeader>
//             <DialogTitle>Edit Template</DialogTitle>
//             <DialogDescription>Update your message template</DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid gap-2">
//               <label htmlFor="edit-name" className="text-sm font-medium">
//                 Template Name
//               </label>
//               <Input
//                 id="edit-name"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               />
//             </div>
//             <div className="grid gap-2">
//               <label htmlFor="edit-category" className="text-sm font-medium">
//                 Category
//               </label>
//               <Select
//                 value={formData.category}
//                 onValueChange={(value) => setFormData({ ...formData, category: value })}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="general">General</SelectItem>
//                   <SelectItem value="welcome">Welcome</SelectItem>
//                   <SelectItem value="follow-up">Follow-up</SelectItem>
//                   <SelectItem value="promotion">Promotion</SelectItem>
//                   <SelectItem value="support">Support</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="grid gap-2">
//               <label htmlFor="edit-content" className="text-sm font-medium">
//                 Template Content
//               </label>
//               <Textarea
//                 id="edit-content"
//                 value={formData.content}
//                 onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//                 className="min-h-[150px]"
//               />
//               <p className="text-xs text-muted-foreground">Use {{ variable }} syntax for dynamic content</p>
//             </div>
//             <div className="grid gap-2">
//               <label htmlFor="edit-tags" className="text-sm font-medium">
//                 Tags
//               </label>
//               <Input
//                 id="edit-tags"
//                 value={formData.tags}
//                 onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
//               />
//               <p className="text-xs text-muted-foreground">Separate tags with commas</p>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={resetForm}>
//               Cancel
//             </Button>
//             <Button onClick={handleUpdateTemplate} disabled={isEditing}>
//               {isEditing ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Edit className="h-4 w-4 mr-2" />}
//               Update Template
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </Card>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Badge } from "@/components/ui/badge"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogClose,
// } from "@/components/ui/dialog"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Plus, Search, MoreHorizontal, Edit, Trash2, Copy, Eye, Wand2, RefreshCw } from "lucide-react"
// import {
//   getMessageTemplates,
//   createMessageTemplate,
//   updateMessageTemplate,
//   deleteMessageTemplate,
//   generateAITemplate,
// } from "../actions/message-templates"
// import { useToast } from "@/hooks/use-toast"

// type MessageTemplate = {
//   id: string
//   name: string
//   content: string
//   category: string
//   tags: string[]
//   usageCount: number
//   createdAt: string
//   updatedAt: string
// }

// export function MessageTemplates() {
//   const [templates, setTemplates] = useState<MessageTemplate[]>([])
//   const [filteredTemplates, setFilteredTemplates] = useState<MessageTemplate[]>([])
//   const [searchQuery, setSearchQuery] = useState("")
//   const [categoryFilter, setCategoryFilter] = useState<string>("all")
//   const [loading, setLoading] = useState(true)
//   const [isCreating, setIsCreating] = useState(false)
//   const [isEditing, setIsEditing] = useState(false)
//   const [isGenerating, setIsGenerating] = useState(false)
//   const [currentTemplate, setCurrentTemplate] = useState<MessageTemplate | null>(null)
//   const [formData, setFormData] = useState({
//     name: "",
//     content: "",
//     category: "general",
//     tags: "",
//   })
//   const [aiPrompt, setAiPrompt] = useState("")
//   const { toast } = useToast()

//   useEffect(() => {
//     fetchTemplates()
//   }, [])

//   useEffect(() => {
//     if (templates.length > 0) {
//       filterTemplates()
//     }
//   }, [searchQuery, categoryFilter, templates])

//   const fetchTemplates = async () => {
//     try {
//       setLoading(true)
//       const data = await getMessageTemplates()
//       setTemplates(data)
//       setFilteredTemplates(data)
//     } catch (error) {
//       console.error("Error fetching templates:", error)
//       toast({
//         title: "Error",
//         description: "Failed to load message templates",
//         variant: "destructive",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const filterTemplates = () => {
//     let filtered = [...templates]

//     // Apply search filter
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase()
//       filtered = filtered.filter(
//         (template) =>
//           template.name.toLowerCase().includes(query) ||
//           template.content.toLowerCase().includes(query) ||
//           template.tags.some((tag) => tag.toLowerCase().includes(query)),
//       )
//     }

//     // Apply category filter
//     if (categoryFilter !== "all") {
//       filtered = filtered.filter((template) => template.category === categoryFilter)
//     }

//     setFilteredTemplates(filtered)
//   }

//   const handleCreateTemplate = async () => {
//     try {
//       if (!formData.name || !formData.content) {
//         toast({
//           title: "Validation Error",
//           description: "Name and content are required",
//           variant: "destructive",
//         })
//         return
//       }

//       setIsCreating(true)
//       const newTemplate = await createMessageTemplate({
//         name: formData.name,
//         content: formData.content,
//         category: formData.category,
//         tags: formData.tags
//           .split(",")
//           .map((tag) => tag.trim())
//           .filter(Boolean),
//       })

//       setTemplates((prev) => [...prev, newTemplate])
//       resetForm()

//       toast({
//         title: "Template Created",
//         description: "Your message template has been created successfully",
//       })
//     } catch (error) {
//       console.error("Error creating template:", error)
//       toast({
//         title: "Error",
//         description: "Failed to create template",
//         variant: "destructive",
//       })
//     } finally {
//       setIsCreating(false)
//     }
//   }

//   const handleUpdateTemplate = async () => {
//     try {
//       if (!currentTemplate || !formData.name || !formData.content) {
//         toast({
//           title: "Validation Error",
//           description: "Name and content are required",
//           variant: "destructive",
//         })
//         return
//       }

//       setIsEditing(true)
//       const updatedTemplate = await updateMessageTemplate(currentTemplate.id, {
//         name: formData.name,
//         content: formData.content,
//         category: formData.category,
//         tags: formData.tags
//           .split(",")
//           .map((tag) => tag.trim())
//           .filter(Boolean),
//       })

//       setTemplates((prev) => prev.map((template) => (template.id === updatedTemplate.id ? updatedTemplate : template)))

//       resetForm()

//       toast({
//         title: "Template Updated",
//         description: "Your message template has been updated successfully",
//       })
//     } catch (error) {
//       console.error("Error updating template:", error)
//       toast({
//         title: "Error",
//         description: "Failed to update template",
//         variant: "destructive",
//       })
//     } finally {
//       setIsEditing(false)
//     }
//   }

//   const handleDeleteTemplate = async (id: string) => {
//     try {
//       await deleteMessageTemplate(id)

//       setTemplates((prev) => prev.filter((template) => template.id !== id))

//       toast({
//         title: "Template Deleted",
//         description: "Your message template has been deleted successfully",
//       })
//     } catch (error) {
//       console.error("Error deleting template:", error)
//       toast({
//         title: "Error",
//         description: "Failed to delete template",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleGenerateTemplate = async () => {
//     try {
//       if (!aiPrompt) {
//         toast({
//           title: "Validation Error",
//           description: "Please provide a prompt for the AI",
//           variant: "destructive",
//         })
//         return
//       }

//       setIsGenerating(true)
//       const generatedTemplate = await generateAITemplate(aiPrompt)

//       setFormData({
//         name: generatedTemplate.name,
//         content: generatedTemplate.content,
//         category: generatedTemplate.category,
//         tags: generatedTemplate.tags.join(", "),
//       })

//       setAiPrompt("")

//       toast({
//         title: "Template Generated",
//         description: "AI has generated a template based on your prompt",
//       })
//     } catch (error) {
//       console.error("Error generating template:", error)
//       toast({
//         title: "Error",
//         description: "Failed to generate template",
//         variant: "destructive",
//       })
//     } finally {
//       setIsGenerating(false)
//     }
//   }

//   const editTemplate = (template: MessageTemplate) => {
//     setCurrentTemplate(template)
//     setFormData({
//       name: template.name,
//       content: template.content,
//       category: template.category,
//       tags: template.tags.join(", "),
//     })
//     setIsEditing(true)
//   }

//   const resetForm = () => {
//     setCurrentTemplate(null)
//     setFormData({
//       name: "",
//       content: "",
//       category: "general",
//       tags: "",
//     })
//     setIsEditing(false)
//   }

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text)
//     toast({
//       title: "Copied to Clipboard",
//       description: "Template content has been copied to clipboard",
//     })
//   }

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString(undefined, {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   const getCategoryBadge = (category: string) => {
//     switch (category) {
//       case "welcome":
//         return <Badge className="bg-blue-500">Welcome</Badge>
//       case "follow-up":
//         return <Badge className="bg-green-500">Follow-up</Badge>
//       case "promotion":
//         return <Badge className="bg-purple-500">Promotion</Badge>
//       case "support":
//         return <Badge className="bg-amber-500">Support</Badge>
//       default:
//         return <Badge>General</Badge>
//     }
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <CardTitle>Message Templates</CardTitle>
//             <CardDescription>Create and manage reusable message templates for your automations</CardDescription>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-2">
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button className="gap-2">
//                   <Plus className="h-4 w-4" />
//                   New Template
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[600px]">
//                 <DialogHeader>
//                   <DialogTitle>Create New Template</DialogTitle>
//                   <DialogDescription>Create a reusable message template for your automations</DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <div className="grid gap-2">
//                     <label htmlFor="name" className="text-sm font-medium">
//                       Template Name
//                     </label>
//                     <Input
//                       id="name"
//                       value={formData.name}
//                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                       placeholder="Welcome Message"
//                     />
//                   </div>
//                   <div className="grid gap-2">
//                     <label htmlFor="category" className="text-sm font-medium">
//                       Category
//                     </label>
//                     <Select
//                       value={formData.category}
//                       onValueChange={(value) => setFormData({ ...formData, category: value })}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select a category" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="general">General</SelectItem>
//                         <SelectItem value="welcome">Welcome</SelectItem>
//                         <SelectItem value="follow-up">Follow-up</SelectItem>
//                         <SelectItem value="promotion">Promotion</SelectItem>
//                         <SelectItem value="support">Support</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="grid gap-2">
//                     <label htmlFor="content" className="text-sm font-medium">
//                       Template Content
//                     </label>
//                     <Textarea
//                       id="content"
//                       value={formData.content}
//                       onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//                       placeholder="Hi {{name}}, thanks for connecting with us!"
//                       className="min-h-[150px]"
//                     />
//                     <p className="text-xs text-muted-foreground">
//                       Use {"{"}
//                       {"{"}variable{"}"}
//                       {"}"} syntax for dynamic content
//                     </p>
//                   </div>
//                   <div className="grid gap-2">
//                     <label htmlFor="tags" className="text-sm font-medium">
//                       Tags
//                     </label>
//                     <Input
//                       id="tags"
//                       value={formData.tags}
//                       onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
//                       placeholder="welcome, introduction, new user"
//                     />
//                     <p className="text-xs text-muted-foreground">Separate tags with commas</p>
//                   </div>
//                 </div>
//                 <DialogFooter>
//                   <DialogClose asChild>
//                     <Button variant="outline">Cancel</Button>
//                   </DialogClose>
//                   <Button onClick={handleCreateTemplate} disabled={isCreating}>
//                     {isCreating ? (
//                       <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
//                     ) : (
//                       <Plus className="h-4 w-4 mr-2" />
//                     )}
//                     Create Template
//                   </Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>

//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button variant="outline" className="gap-2">
//                   <Wand2 className="h-4 w-4" />
//                   AI Generate
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[600px]">
//                 <DialogHeader>
//                   <DialogTitle>Generate Template with AI</DialogTitle>
//                   <DialogDescription>Let AI create a message template based on your requirements</DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <div className="grid gap-2">
//                     <label htmlFor="ai-prompt" className="text-sm font-medium">
//                       Describe what you need
//                     </label>
//                     <Textarea
//                       id="ai-prompt"
//                       value={aiPrompt}
//                       onChange={(e) => setAiPrompt(e.target.value)}
//                       placeholder="Create a welcome message for new Instagram followers that introduces our automation service"
//                       className="min-h-[150px]"
//                     />
//                     <p className="text-xs text-muted-foreground">
//                       Be specific about the purpose, tone, and any variables you want to include
//                     </p>
//                   </div>
//                 </div>
//                 <DialogFooter>
//                   <DialogClose asChild>
//                     <Button variant="outline">Cancel</Button>
//                   </DialogClose>
//                   <Button onClick={handleGenerateTemplate} disabled={isGenerating}>
//                     {isGenerating ? (
//                       <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
//                     ) : (
//                       <Wand2 className="h-4 w-4 mr-2" />
//                     )}
//                     Generate Template
//                   </Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search templates..."
//                 className="pl-8"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Filter by category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Categories</SelectItem>
//                 <SelectItem value="general">General</SelectItem>
//                 <SelectItem value="welcome">Welcome</SelectItem>
//                 <SelectItem value="follow-up">Follow-up</SelectItem>
//                 <SelectItem value="promotion">Promotion</SelectItem>
//                 <SelectItem value="support">Support</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {loading ? (
//             <div className="space-y-4">
//               {[...Array(5)].map((_, i) => (
//                 <div key={i} className="animate-pulse">
//                   <div className="h-12 bg-muted rounded-md mb-2"></div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="rounded-md border">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Category</TableHead>
//                     <TableHead>Tags</TableHead>
//                     <TableHead>Usage</TableHead>
//                     <TableHead>Last Updated</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredTemplates.length === 0 ? (
//                     <TableRow>
//                       <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
//                         No templates found
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     filteredTemplates.map((template) => (
//                       <TableRow key={template.id}>
//                         <TableCell className="font-medium">{template.name}</TableCell>
//                         <TableCell>{getCategoryBadge(template.category)}</TableCell>
//                         <TableCell>
//                           <div className="flex flex-wrap gap-1">
//                             {template.tags.map((tag, i) => (
//                               <Badge key={i} variant="outline" className="text-xs">
//                                 {tag}
//                               </Badge>
//                             ))}
//                           </div>
//                         </TableCell>
//                         <TableCell>{template.usageCount}</TableCell>
//                         <TableCell>{formatDate(template.updatedAt)}</TableCell>
//                         <TableCell className="text-right">
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" size="icon">
//                                 <MoreHorizontal className="h-4 w-4" />
//                                 <span className="sr-only">Open menu</span>
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                               <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                               <DropdownMenuSeparator />
//                               <Dialog>
//                                 <DialogTrigger asChild>
//                                   <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
//                                     <Eye className="h-4 w-4 mr-2" />
//                                     Preview
//                                   </DropdownMenuItem>
//                                 </DialogTrigger>
//                                 <DialogContent>
//                                   <DialogHeader>
//                                     <DialogTitle>{template.name}</DialogTitle>
//                                     <DialogDescription>{getCategoryBadge(template.category)}</DialogDescription>
//                                   </DialogHeader>
//                                   <div className="p-4 border rounded-md bg-muted/50 whitespace-pre-wrap">
//                                     {template.content}
//                                   </div>
//                                   <DialogFooter>
//                                     <Button variant="outline" onClick={() => copyToClipboard(template.content)}>
//                                       <Copy className="h-4 w-4 mr-2" />
//                                       Copy
//                                     </Button>
//                                   </DialogFooter>
//                                 </DialogContent>
//                               </Dialog>
//                               <DropdownMenuItem onClick={() => editTemplate(template)}>
//                                 <Edit className="h-4 w-4 mr-2" />
//                                 Edit
//                               </DropdownMenuItem>
//                               <DropdownMenuItem onClick={() => copyToClipboard(template.content)}>
//                                 <Copy className="h-4 w-4 mr-2" />
//                                 Copy
//                               </DropdownMenuItem>
//                               <DropdownMenuSeparator />
//                               <Dialog>
//                                 <DialogTrigger asChild>
//                                   <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
//                                     <Trash2 className="h-4 w-4 mr-2" />
//                                     Delete
//                                   </DropdownMenuItem>
//                                 </DialogTrigger>
//                                 <DialogContent>
//                                   <DialogHeader>
//                                     <DialogTitle>Confirm Deletion</DialogTitle>
//                                     <DialogDescription>
//                                       Are you sure you want to delete the template "{template.name}"? This action cannot
//                                       be undone.
//                                     </DialogDescription>
//                                   </DialogHeader>
//                                   <DialogFooter>
//                                     <DialogClose asChild>
//                                       <Button variant="outline">Cancel</Button>
//                                     </DialogClose>
//                                     <Button variant="destructive" onClick={() => handleDeleteTemplate(template.id)}>
//                                       Delete
//                                     </Button>
//                                   </DialogFooter>
//                                 </DialogContent>
//                               </Dialog>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </div>
//           )}
//         </div>
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <p className="text-sm text-muted-foreground">
//           {filteredTemplates.length} template{filteredTemplates.length !== 1 ? "s" : ""} found
//         </p>
//         <Button variant="outline" size="sm" onClick={fetchTemplates}>
//           <RefreshCw className="h-4 w-4 mr-2" />
//           Refresh
//         </Button>
//       </CardFooter>

//       {/* Edit Template Dialog */}
//       <Dialog open={isEditing} onOpenChange={(open) => !open && resetForm()}>
//         <DialogContent className="sm:max-w-[600px]">
//           <DialogHeader>
//             <DialogTitle>Edit Template</DialogTitle>
//             <DialogDescription>Update your message template</DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid gap-2">
//               <label htmlFor="edit-name" className="text-sm font-medium">
//                 Template Name
//               </label>
//               <Input
//                 id="edit-name"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               />
//             </div>
//             <div className="grid gap-2">
//               <label htmlFor="edit-category" className="text-sm font-medium">
//                 Category
//               </label>
//               <Select
//                 value={formData.category}
//                 onValueChange={(value) => setFormData({ ...formData, category: value })}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="general">General</SelectItem>
//                   <SelectItem value="welcome">Welcome</SelectItem>
//                   <SelectItem value="follow-up">Follow-up</SelectItem>
//                   <SelectItem value="promotion">Promotion</SelectItem>
//                   <SelectItem value="support">Support</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="grid gap-2">
//               <label htmlFor="edit-content" className="text-sm font-medium">
//                 Template Content
//               </label>
//               <Textarea
//                 id="edit-content"
//                 value={formData.content}
//                 onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//                 className="min-h-[150px]"
//               />
//               <p className="text-xs text-muted-foreground">
//                 Use {"{"}
//                 {"{"}variable{"}"}
//                 {"}"} syntax for dynamic content
//               </p>
//             </div>
//             <div className="grid gap-2">
//               <label htmlFor="edit-tags" className="text-sm font-medium">
//                 Tags
//               </label>
//               <Input
//                 id="edit-tags"
//                 value={formData.tags}
//                 onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
//               />
//               <p className="text-xs text-muted-foreground">Separate tags with commas</p>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={resetForm}>
//               Cancel
//             </Button>
//             <Button onClick={handleUpdateTemplate} disabled={isEditing}>
//               {isEditing ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Edit className="h-4 w-4 mr-2" />}
//               Update Template
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </Card>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Copy, Eye, Wand2, RefreshCw } from "lucide-react"
import {
  getMessageTemplates,
  createMessageTemplate,
  updateMessageTemplate,
  deleteMessageTemplate,
  generateAITemplate,
} from "../actions/message-templates"
import { useToast } from "@/hooks/use-toast"

type MessageTemplate = {
  id: string
  name: string
  content: string
  category: string | null
  tags: string[]
  usageCount: number
  createdAt: Date | string // Accept both Date and string
  updatedAt: Date | string // Accept both Date and string
}

export function MessageTemplates() {
  const [templates, setTemplates] = useState<MessageTemplate[]>([])
  const [filteredTemplates, setFilteredTemplates] = useState<MessageTemplate[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentTemplate, setCurrentTemplate] = useState<MessageTemplate | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    content: "",
    category: "general",
    tags: "",
  })
  const [aiPrompt, setAiPrompt] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchTemplates()
  }, [])

  useEffect(() => {
    if (templates.length > 0) {
      filterTemplates()
    }
  }, [searchQuery, categoryFilter, templates])

  const fetchTemplates = async () => {
    try {
      setLoading(true)
      const data = await getMessageTemplates()
      setTemplates(data)
      setFilteredTemplates(data)
    } catch (error) {
      console.error("Error fetching templates:", error)
      toast({
        title: "Error",
        description: "Failed to load message templates",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterTemplates = () => {
    let filtered = [...templates]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (template) =>
          template.name.toLowerCase().includes(query) ||
          template.content.toLowerCase().includes(query) ||
          template.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((template) => template.category === categoryFilter)
    }

    setFilteredTemplates(filtered)
  }

  const handleCreateTemplate = async () => {
    try {
      if (!formData.name || !formData.content) {
        toast({
          title: "Validation Error",
          description: "Name and content are required",
          variant: "destructive",
        })
        return
      }

      setIsCreating(true)
      const newTemplate = await createMessageTemplate({
        name: formData.name,
        content: formData.content,
        category: formData.category,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      })

      setTemplates((prev) => [...prev, newTemplate])
      resetForm()

      toast({
        title: "Template Created",
        description: "Your message template has been created successfully",
      })
    } catch (error) {
      console.error("Error creating template:", error)
      toast({
        title: "Error",
        description: "Failed to create template",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  const handleUpdateTemplate = async () => {
    try {
      if (!currentTemplate || !formData.name || !formData.content) {
        toast({
          title: "Validation Error",
          description: "Name and content are required",
          variant: "destructive",
        })
        return
      }

      setIsEditing(true)
      const updatedTemplate = await updateMessageTemplate(currentTemplate.id, {
        name: formData.name,
        content: formData.content,
        category: formData.category,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      })

      setTemplates((prev) => prev.map((template) => (template.id === updatedTemplate.id ? updatedTemplate : template)))

      resetForm()

      toast({
        title: "Template Updated",
        description: "Your message template has been updated successfully",
      })
    } catch (error) {
      console.error("Error updating template:", error)
      toast({
        title: "Error",
        description: "Failed to update template",
        variant: "destructive",
      })
    } finally {
      setIsEditing(false)
    }
  }

  const handleDeleteTemplate = async (id: string) => {
    try {
      await deleteMessageTemplate(id)

      setTemplates((prev) => prev.filter((template) => template.id !== id))

      toast({
        title: "Template Deleted",
        description: "Your message template has been deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting template:", error)
      toast({
        title: "Error",
        description: "Failed to delete template",
        variant: "destructive",
      })
    }
  }

  const handleGenerateTemplate = async () => {
    try {
      if (!aiPrompt) {
        toast({
          title: "Validation Error",
          description: "Please provide a prompt for the AI",
          variant: "destructive",
        })
        return
      }

      setIsGenerating(true)
      const generatedTemplate = await generateAITemplate(aiPrompt)

      setFormData({
        name: generatedTemplate.name,
        content: generatedTemplate.content,
        category: generatedTemplate.category,
        tags: generatedTemplate.tags.join(", "),
      })

      setAiPrompt("")

      toast({
        title: "Template Generated",
        description: "AI has generated a template based on your prompt",
      })
    } catch (error) {
      console.error("Error generating template:", error)
      toast({
        title: "Error",
        description: "Failed to generate template",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const editTemplate = (template: MessageTemplate) => {
    setCurrentTemplate(template)
    setFormData({
      name: template.name,
      content: template.content,
      category: template.category || "general",
      tags: template.tags.join(", "),
    })
    setIsEditing(true)
  }

  const resetForm = () => {
    setCurrentTemplate(null)
    setFormData({
      name: "",
      content: "",
      category: "general",
      tags: "",
    })
    setIsEditing(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to Clipboard",
      description: "Template content has been copied to clipboard",
    })
  }

  const formatDate = (dateValue: Date | string) => {
    const date = typeof dateValue === "string" ? new Date(dateValue) : dateValue
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getCategoryBadge = (category: string | null) => {
    switch (category) {
      case "welcome":
        return <Badge className="bg-blue-500">Welcome</Badge>
      case "follow-up":
        return <Badge className="bg-green-500">Follow-up</Badge>
      case "promotion":
        return <Badge className="bg-purple-500">Promotion</Badge>
      case "support":
        return <Badge className="bg-amber-500">Support</Badge>
      default:
        return <Badge>General</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Message Templates</CardTitle>
            <CardDescription>Create and manage reusable message templates for your automations</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Template
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Template</DialogTitle>
                  <DialogDescription>Create a reusable message template for your automations</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Template Name
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Welcome Message"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Category
                    </label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="welcome">Welcome</SelectItem>
                        <SelectItem value="follow-up">Follow-up</SelectItem>
                        <SelectItem value="promotion">Promotion</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="content" className="text-sm font-medium">
                      Template Content
                    </label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Hi {{name}}, thanks for connecting with us!"
                      className="min-h-[150px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      Use {"{"}
                      {"{"}variable{"}"}
                      {"}"} syntax for dynamic content
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="tags" className="text-sm font-medium">
                      Tags
                    </label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="welcome, introduction, new user"
                    />
                    <p className="text-xs text-muted-foreground">Separate tags with commas</p>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleCreateTemplate} disabled={isCreating}>
                    {isCreating ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Plus className="h-4 w-4 mr-2" />
                    )}
                    Create Template
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Wand2 className="h-4 w-4" />
                  AI Generate
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Generate Template with AI</DialogTitle>
                  <DialogDescription>Let AI create a message template based on your requirements</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="ai-prompt" className="text-sm font-medium">
                      Describe what you need
                    </label>
                    <Textarea
                      id="ai-prompt"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Create a welcome message for new Instagram followers that introduces our automation service"
                      className="min-h-[150px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      Be specific about the purpose, tone, and any variables you want to include
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleGenerateTemplate} disabled={isGenerating}>
                    {isGenerating ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Wand2 className="h-4 w-4 mr-2" />
                    )}
                    Generate Template
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search templates..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="welcome">Welcome</SelectItem>
                <SelectItem value="follow-up">Follow-up</SelectItem>
                <SelectItem value="promotion">Promotion</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-12 bg-muted rounded-md mb-2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTemplates.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No templates found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTemplates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">{template.name}</TableCell>
                        <TableCell>{getCategoryBadge(template.category)}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {template.tags.map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{template.usageCount}</TableCell>
                        <TableCell>{formatDate(template.updatedAt)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <Dialog>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Preview
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>{template.name}</DialogTitle>
                                    <DialogDescription>{getCategoryBadge(template.category)}</DialogDescription>
                                  </DialogHeader>
                                  <div className="p-4 border rounded-md bg-muted/50 whitespace-pre-wrap">
                                    {template.content}
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => copyToClipboard(template.content)}>
                                      <Copy className="h-4 w-4 mr-2" />
                                      Copy
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <DropdownMenuItem onClick={() => editTemplate(template)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => copyToClipboard(template.content)}>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <Dialog>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Confirm Deletion</DialogTitle>
                                    <DialogDescription>
                                      Are you sure you want to delete the template {template.name}? This action cannot
                                      be undone.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button variant="destructive" onClick={() => handleDeleteTemplate(template.id)}>
                                      Delete
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredTemplates.length} template{filteredTemplates.length !== 1 ? "s" : ""} found
        </p>
        <Button variant="outline" size="sm" onClick={fetchTemplates}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardFooter>

      {/* Edit Template Dialog */}
      <Dialog open={isEditing} onOpenChange={(open) => !open && resetForm()}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
            <DialogDescription>Update your message template</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="edit-name" className="text-sm font-medium">
                Template Name
              </label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-category" className="text-sm font-medium">
                Category
              </label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="welcome">Welcome</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="promotion">Promotion</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-content" className="text-sm font-medium">
                Template Content
              </label>
              <Textarea
                id="edit-content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="min-h-[150px]"
              />
              <p className="text-xs text-muted-foreground">
                Use {"{"}
                {"{"}variable{"}"}
                {"}"} syntax for dynamic content
              </p>
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-tags" className="text-sm font-medium">
                Tags
              </label>
              <Input
                id="edit-tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Separate tags with commas</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
            <Button onClick={handleUpdateTemplate} disabled={isEditing}>
              {isEditing ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Edit className="h-4 w-4 mr-2" />}
              Update Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

