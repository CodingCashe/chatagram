// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { Button } from "@/components/ui/button"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { toast } from "@/hooks/use-toast"
// import { createEmailTemplate, updateEmailTemplate } from "../../actions/email-actions"
// import { Editor } from "./email-editor"

// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Name must be at least 2 characters.",
//   }),
//   subject: z.string().min(2, {
//     message: "Subject must be at least 2 characters.",
//   }),
//   content: z.string().min(10, {
//     message: "Content must be at least 10 characters.",
//   }),
//   description: z.string().optional(),
//   category: z.string(),
//   isDefault: z.boolean().default(false),
// })

// export function EmailTemplateForm({
//   template,
//   onSuccess,
// }: {
//   template?: any
//   onSuccess?: () => void
// }) {
//   const router = useRouter()
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: template?.name || "",
//       subject: template?.subject || "",
//       content: template?.content || getDefaultTemplate(),
//       description: template?.description || "",
//       category: template?.category || "general",
//       isDefault: template?.isDefault || false,
//     },
//   })

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setIsSubmitting(true)

//     try {
//       const formData = new FormData()
//       formData.append("name", values.name)
//       formData.append("subject", values.subject)
//       formData.append("content", values.content)
//       formData.append("description", values.description || "")
//       formData.append("category", values.category)
//       formData.append("isDefault", values.isDefault.toString())

//       let result

//       if (template?.id) {
//         result = await updateEmailTemplate(template.id, formData)
//       } else {
//         result = await createEmailTemplate(formData)
//       }

//       if (result.success) {
//         toast({
//           title: template?.id ? "Template updated" : "Template created",
//           description: template?.id
//             ? "Your email template has been updated successfully."
//             : "Your new email template has been created successfully.",
//         })

//         if (onSuccess) {
//           onSuccess()
//         } else {
//           router.push("/admin/email/templates")
//           router.refresh()
//         }
//       } else {
//         toast({
//           title: "Error",
//           description: "Failed to save the template. Please try again.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error saving template:", error)
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Template Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Welcome Email" {...field} />
//                 </FormControl>
//                 <FormDescription>
//                   A descriptive name for your email template.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
          
//           <FormField
//             control={form.control}
//             name="category"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Category</FormLabel>
//                 <Select 
//                   onValueChange={field.onChange} 
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a category" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="welcome">Welcome</SelectItem>
//                     <SelectItem value="newsletter">Newsletter</SelectItem>
//                     <SelectItem value="promotional">Promotional</SelectItem>
//                     <SelectItem value="transactional">Transactional</SelectItem>
//                     <SelectItem value="general">General</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormDescription>
//                   Categorize your template for better organization.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
        
//         <FormField
//           control={form.control}
//           name="subject"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email Subject</FormLabel>
//               <FormControl>
//                 <Input placeholder="Welcome to our platform!" {...field} />
//               </FormControl>
//               <FormDescription>
//                 The subject line of the email. You can use variables like &#123;&#123;user.firstname&#125;&#125;.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
        
//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description (Optional)</FormLabel>
//               <FormControl>
//                 <Textarea 
//                   placeholder="A welcome email sent to new users when they sign up." 
//                   {...field} 
//                 />
//               </FormControl>
//               <FormDescription>
//                 A brief description of when and how this template is used.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
        
//         <FormField
//           control={form.control}
//           name="content"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email Content</FormLabel>
//               <Tabs defaultValue="editor" className="w-full">
//                 <TabsList className="mb-4">
//                   <TabsTrigger value="editor">Visual Editor</TabsTrigger>
//                   <TabsTrigger value="html">HTML</TabsTrigger>
//                   <TabsTrigger value="preview">Preview</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="editor">
//                   <FormControl>
//                     <Editor 
//                       value={field.value} 
//                       onChange={field.onChange}
//                     />
//                   </FormControl>
//                 </TabsContent>
//                 <TabsContent value="html">
//                   <FormControl>
//                     <Textarea 
//                       className="min-h-[400px] font-mono text-sm"
//                       {...field} 
//                     />
//                   </FormControl>
//                 </TabsContent>
//                 <TabsContent value="preview">
//                   <div className="border rounded-md p-4 min-h-[400px] bg-white">
//                     <div 
//                       className="prose max-w-none"
//                       dangerouslySetInnerHTML={{ __html: field.value }}
//                     />
//                   </div>
//                 </TabsContent>
//               </Tabs>
//               <FormDescription>\
//                 The content of your email.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
        
//         <FormField
//           control={form.control}
//           name="isDefault"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//               <div className="space-y-0.5">
//                 <FormLabel className="text-base">Set as Default</FormLabel>
//                 <FormDescription>
//                   Make this the default template for its category.
//                 </FormDescription>
//               </div>
//               <FormControl>
//                 <Switch
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />
        
//         <div className="flex justify-end gap-4">
//           <Button 
//             type="button" 
//             variant="outline"
//             onClick={() => {
//               if (onSuccess) {
//                 onSuccess();
//               } else {
//                 router.push('/admin/email/templates');
//               }
//             }}
//           >
//             Cancel
//           </Button>
//           <Button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? 'Saving...' : (template?.id ? 'Update Template' : 'Create Template')}
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// function getDefaultTemplate() {
//   const user = { firstname: "User" } // Define the user variable
//   return `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1">
//   <title>Email Template</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       line-height: 1.6;
//       color: #333;
//       margin: 0;
//       padding: 0;
//     }
//     .container {
//       max-width: 600px;
//       margin: 0 auto;
//       padding: 20px;
//     }
//     .header {
//       background-color: #f8f9fa;
//       padding: 20px;
//       text-align: center;
//       border-radius: 5px 5px 0 0;
//     }
//     .content {
//       padding: 20px;
//       background-color: #ffffff;
//     }
//     .footer {
//       background-color: #f8f9fa;
//       padding: 20px;
//       text-align: center;
//       font-size: 12px;
//       color: #6c757d;
//       border-radius: 0 0 5px 5px;
//     }
//     .button {
//       display: inline-block;
//       padding: 10px 20px;
//       background-color: #007bff;
//       color: #ffffff;
//       text-decoration: none;
//       border-radius: 5px;
//       margin-top: 20px;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <h1>Welcome to Our Platform</h1>
//     </div>
//     <div class="content">
//       <p>Hello ${user.firstname},</p>
//       <p>Thank you for signing up! We're excited to have you on board.</p>
//       <p>With our platform, you can:</p>
//       <ul>
//         <li>Feature one</li>
//         <li>Feature two</li>
//         <li>Feature three</li>
//       </ul>
//       <p>If you have any questions, feel free to reply to this email.</p>
//       <a href="#" class="button">Get Started</a>
//     </div>
//     <div class="footer">
//       <p>© 2023 Your Company. All rights reserved.</p>
//       <p>123 Main St, City, Country</p>
//     </div>
//   </div>
// </body>
// </html>
//   `
// }

// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { Button } from "@/components/ui/button"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { toast } from "@/hooks/use-toast"
// import { createEmailTemplate, updateEmailTemplate } from "../../actions/email-actions"
// import { Editor } from "./email-editor"

// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Name must be at least 2 characters.",
//   }),
//   subject: z.string().min(2, {
//     message: "Subject must be at least 2 characters.",
//   }),
//   content: z.string().min(10, {
//     message: "Content must be at least 10 characters.",
//   }),
//   description: z.string().optional(),
//   category: z.string(),
//   isDefault: z.boolean().default(false),
// })

// export function EmailTemplateForm({
//   template,
//   onSuccess,
// }: {
//   template?: any
//   onSuccess?: () => void
// }) {
//   const router = useRouter()
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: template?.name || "",
//       subject: template?.subject || "",
//       content: template?.content || getDefaultTemplate(),
//       description: template?.description || "",
//       category: template?.category || "general",
//       isDefault: template?.isDefault || false,
//     },
//   })

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setIsSubmitting(true)

//     try {
//       const formData = new FormData()
//       formData.append("name", values.name)
//       formData.append("subject", values.subject)
//       formData.append("content", values.content)
//       formData.append("description", values.description || "")
//       formData.append("category", values.category)
//       formData.append("isDefault", values.isDefault.toString())

//       let result

//       if (template?.id) {
//         result = await updateEmailTemplate(template.id, formData)
//       } else {
//         result = await createEmailTemplate(formData)
//       }

//       if (result.success) {
//         toast({
//           title: template?.id ? "Template updated" : "Template created",
//           description: template?.id
//             ? "Your email template has been updated successfully."
//             : "Your new email template has been created successfully.",
//         })

//         if (onSuccess) {
//           onSuccess()
//         } else {
//           router.push("/admin/email/templates")
//           router.refresh()
//         }
//       } else {
//         toast({
//           title: "Error",
//           description: "Failed to save the template. Please try again.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error saving template:", error)
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Template Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Welcome Email" {...field} />
//                 </FormControl>
//                 <FormDescription>
//                   A descriptive name for your email template.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
          
//           <FormField
//             control={form.control}
//             name="category"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Category</FormLabel>
//                 <Select 
//                   onValueChange={field.onChange} 
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a category" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="welcome">Welcome</SelectItem>
//                     <SelectItem value="newsletter">Newsletter</SelectItem>
//                     <SelectItem value="promotional">Promotional</SelectItem>
//                     <SelectItem value="transactional">Transactional</SelectItem>
//                     <SelectItem value="general">General</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormDescription>
//                   Categorize your template for better organization.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
        
//         <FormField
//           control={form.control}
//           name="subject"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email Subject</FormLabel>
//               <FormControl>
//                 <Input placeholder="Welcome to our platform!" {...field} />
//               </FormControl>
//               <FormDescription>
//                 The subject line of the email. You can use variables like &#123;&#123;user.firstname&#125;&#125;.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
        
//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description (Optional)</FormLabel>
//               <FormControl>
//                 <Textarea 
//                   placeholder="A welcome email sent to new users when they sign up." 
//                   {...field} 
//                 />
//               </FormControl>
//               <FormDescription>
//                 A brief description of when and how this template is used.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
        
//         <FormField
//           control={form.control}
//           name="content"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email Content</FormLabel>
//               <Tabs defaultValue="editor" className="w-full">
//                 <TabsList className="mb-4">
//                   <TabsTrigger value="editor">Visual Editor</TabsTrigger>
//                   <TabsTrigger value="html">HTML</TabsTrigger>
//                   <TabsTrigger value="preview">Preview</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="editor">
//                   <FormControl>
//                     <Editor 
//                       value={field.value} 
//                       onChange={field.onChange}
//                     />
//                   </FormControl>
//                 </TabsContent>
//                 <TabsContent value="html">
//                   <FormControl>
//                     <Textarea 
//                       className="min-h-[400px] font-mono text-sm"
//                       {...field} 
//                     />
//                   </FormControl>
//                 </TabsContent>
//                 <TabsContent value="preview">
//                   <div className="border rounded-md p-4 min-h-[400px] bg-white">
//                     <div 
//                       className="prose max-w-none"
//                       dangerouslySetInnerHTML={{ __html: field.value }}
//                     />
//                   </div>
//                 </TabsContent>
//               </Tabs>
//               <FormDescription>\
//                 The content of your email.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
        
//         <FormField
//           control={form.control}
//           name="isDefault"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//               <div className="space-y-0.5">
//                 <FormLabel className="text-base">Set as Default</FormLabel>
//                 <FormDescription>
//                   Make this the default template for its category.
//                 </FormDescription>
//               </div>
//               <FormControl>
//                 <Switch
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />
        
//         <div className="flex justify-end gap-4">
//           <Button 
//             type="button" 
//             variant="outline"
//             onClick={() => {
//               if (onSuccess) {
//                 onSuccess();
//               } else {
//                 router.push('/admin/email/templates');
//               }
//             }}
//           >
//             Cancel
//           </Button>
//           <Button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? 'Saving...' : (template?.id ? 'Update Template' : 'Create Template')}
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// function getDefaultTemplate() {
//   const user = { firstname: "User" } // Define the user variable
//   return `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1">
//   <title>Email Template</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       line-height: 1.6;
//       color: #333;
//       margin: 0;
//       padding: 0;
//     }
//     .container {
//       max-width: 600px;
//       margin: 0 auto;
//       padding: 20px;
//     }
//     .header {
//       background-color: #f8f9fa;
//       padding: 20px;
//       text-align: center;
//       border-radius: 5px 5px 0 0;
//     }
//     .content {
//       padding: 20px;
//       background-color: #ffffff;
//     }
//     .footer {
//       background-color: #f8f9fa;
//       padding: 20px;
//       text-align: center;
//       font-size: 12px;
//       color: #6c757d;
//       border-radius: 0 0 5px 5px;
//     }
//     .button {
//       display: inline-block;
//       padding: 10px 20px;
//       background-color: #007bff;
//       color: #ffffff;
//       text-decoration: none;
//       border-radius: 5px;
//       margin-top: 20px;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <h1>Welcome to Our Platform</h1>
//     </div>
//     <div class="content">
//       <p>Hello ${user.firstname},</p>
//       <p>Thank you for signing up! We're excited to have you on board.</p>
//       <p>With our platform, you can:</p>
//       <ul>
//         <li>Automate Insta Dms</li>
//         <li>Schedule IG posts</li>
//         <li>Create content</li>
//       </ul>
//       <p>If you have any questions, feel free to reply to this email.</p>
//       <a href="#" class="button">Get Started</a>
//     </div>
//     <div class="footer">
//       <p>© 2025 Yazil. All rights reserved.</p>
//       <p>00100 Main St, Nairobae, Kenya</p>
//     </div>
//   </div>
// </body>
// </html>
//   `
// }

// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { Button } from "@/components/ui/button"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { toast } from "@/hooks/use-toast"
// import { createEmailTemplate, updateEmailTemplate } from "../../actions/email-actions"
// import { Editor } from "./email-editor"

// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Name must be at least 2 characters.",
//   }),
//   subject: z.string().min(2, {
//     message: "Subject must be at least 2 characters.",
//   }),
//   content: z.string().min(10, {
//     message: "Content must be at least 10 characters.",
//   }),
//   description: z.string().optional(),
//   category: z.string(),
//   isDefault: z.boolean().default(false),
// })

// export function EmailTemplateForm({
//   template,
//   onSuccess,
// }: {
//   template?: any
//   onSuccess?: () => void
// }) {
//   const router = useRouter()
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: template?.name || "",
//       subject: template?.subject || "",
//       content: template?.content || getDefaultTemplate(),
//       description: template?.description || "",
//       category: template?.category || "general",
//       isDefault: template?.isDefault || false,
//     },
//   })

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setIsSubmitting(true)

//     try {
//       const formData = new FormData()
//       formData.append("name", values.name)
//       formData.append("subject", values.subject)
//       formData.append("content", values.content)
//       formData.append("description", values.description || "")
//       formData.append("category", values.category)
//       formData.append("isDefault", values.isDefault.toString())

//       let result

//       if (template?.id) {
//         result = await updateEmailTemplate(template.id, formData)
//       } else {
//         result = await createEmailTemplate(formData)
//       }

//       if (result.success) {
//         toast({
//           title: template?.id ? "Template updated" : "Template created",
//           description: template?.id
//             ? "Your email template has been updated successfully."
//             : "Your new email template has been created successfully.",
//         })

//         if (onSuccess) {
//           onSuccess()
//         } else {
//           router.push("/admin/email/templates")
//           router.refresh()
//         }
//       } else {
//         toast({
//           title: "Error",
//           description: "Failed to save the template. Please try again.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error saving template:", error)
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6 overflow-y-auto">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Template Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Welcome Email" {...field} />
//                 </FormControl>
//                 <FormDescription className="text-xs">A descriptive name for your email template.</FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="category"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Category</FormLabel>
//                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a category" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="welcome">Welcome</SelectItem>
//                     <SelectItem value="newsletter">Newsletter</SelectItem>
//                     <SelectItem value="promotional">Promotional</SelectItem>
//                     <SelectItem value="transactional">Transactional</SelectItem>
//                     <SelectItem value="general">General</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormDescription className="text-xs">Categorize your template for better organization.</FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <FormField
//           control={form.control}
//           name="subject"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email Subject</FormLabel>
//               <FormControl>
//                 <Input placeholder="Welcome to our platform!" {...field} />
//               </FormControl>
//               <FormDescription className="text-xs">
//                 The subject line of the email. You can use variables like &#123;&#123;user.firstname&#125;&#125;.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description (Optional)</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="A welcome email sent to new users when they sign up."
//                   className="resize-none"
//                   rows={3}
//                   {...field}
//                 />
//               </FormControl>
//               <FormDescription className="text-xs">
//                 A brief description of when and how this template is used.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="content"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email Content</FormLabel>
//               <Tabs defaultValue="editor" className="w-full">
//                 <div className="overflow-x-auto -mx-2 px-2">
//                   <TabsList className="mb-4 w-full sm:w-auto flex overflow-x-auto no-scrollbar">
//                     <TabsTrigger value="editor" className="flex-shrink-0">
//                       Visual Editor
//                     </TabsTrigger>
//                     <TabsTrigger value="html" className="flex-shrink-0">
//                       HTML
//                     </TabsTrigger>
//                     <TabsTrigger value="preview" className="flex-shrink-0">
//                       Preview
//                     </TabsTrigger>
//                   </TabsList>
//                 </div>
//                 <TabsContent value="editor">
//                   <FormControl>
//                     <div className="border rounded-md overflow-hidden">
//                       <Editor value={field.value} onChange={field.onChange} />
//                     </div>
//                   </FormControl>
//                 </TabsContent>
//                 <TabsContent value="html">
//                   <FormControl>
//                     <Textarea className="min-h-[300px] md:min-h-[400px] font-mono text-sm resize-none" {...field} />
//                   </FormControl>
//                 </TabsContent>
//                 <TabsContent value="preview">
//                   <div className="border rounded-md p-2 md:p-4 min-h-[300px] md:min-h-[400px] bg-white overflow-auto">
//                     <div
//                       className="prose max-w-none text-sm md:text-base"
//                       dangerouslySetInnerHTML={{ __html: field.value }}
//                     />
//                   </div>
//                 </TabsContent>
//               </Tabs>
//               <FormDescription className="text-xs">The content of your email.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="isDefault"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 md:p-4">
//               <div className="space-y-0.5">
//                 <FormLabel className="text-sm md:text-base">Set as Default</FormLabel>
//                 <FormDescription className="text-xs">Make this the default template for its category.</FormDescription>
//               </div>
//               <FormControl>
//                 <Switch checked={field.value} onCheckedChange={field.onChange} />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         <div className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-4 pt-2">
//           <Button
//             type="button"
//             variant="outline"
//             className="w-full sm:w-auto order-2 sm:order-1"
//             onClick={() => {
//               if (onSuccess) {
//                 onSuccess()
//               } else {
//                 router.push("/admin/email/templates")
//               }
//             }}
//           >
//             Cancel
//           </Button>
//           <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto order-1 sm:order-2">
//             {isSubmitting ? "Saving..." : template?.id ? "Update Template" : "Create Template"}
//           </Button>
//         </div>
//       </form>
//     </Form>
//   )
// }

// function getDefaultTemplate() {
//   const user = { firstname: "User" } // Define the user variable
//   return `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1">
//   <title>Email Template</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       line-height: 1.6;
//       color: #333;
//       margin: 0;
//       padding: 0;
//     }
//     .container {
//       max-width: 600px;
//       margin: 0 auto;
//       padding: 20px;
//     }
//     .header {
//       background-color: #f8f9fa;
//       padding: 20px;
//       text-align: center;
//       border-radius: 5px 5px 0 0;
//     }
//     .content {
//       padding: 20px;
//       background-color: #ffffff;
//     }
//     .footer {
//       background-color: #f8f9fa;
//       padding: 20px;
//       text-align: center;
//       font-size: 12px;
//       color: #6c757d;
//       border-radius: 0 0 5px 5px;
//     }
//     .button {
//       display: inline-block;
//       padding: 10px 20px;
//       background-color: #007bff;
//       color: #ffffff;
//       text-decoration: none;
//       border-radius: 5px;
//       margin-top: 20px;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <h1>Welcome to Our Platform</h1>
//     </div>
//     <div class="content">
//       <p>Hello ${user.firstname},</p>
//       <p>Thank you for signing up! We're excited to have you on board.</p>
//       <p>With our platform, you can:</p>
//       <ul>
//         <li>Automate Insta Dms</li>
//         <li>Schedule IG posts</li>
//         <li>Create content</li>
//       </ul>
//       <p>If you have any questions, feel free to reply to this email.</p>
//       <a href="#" class="button">Get Started</a>
//     </div>
//     <div class="footer">
//       <p>© 2025 Yazil. All rights reserved.</p>
//       <p>00100 Main St, Nairobae, Kenya</p>
//     </div>
//   </div>
// </body>
// </html>
//   `
// }

// "use client"

// import { Label } from "@/components/ui/label"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { Button } from "@/components/ui/button"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { toast } from "@/hooks/use-toast"
// import { createEmailTemplate, updateEmailTemplate } from "../../actions/email-actions"
// import { Editor } from "./email-editor"
// import { Card, CardContent } from "@/components/ui/card"
// import { Laptop, Smartphone, Tablet, Wand2, AlertTriangle, Palette, Sparkles } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Progress } from "@/components/ui/progres"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Name must be at least 2 characters.",
//   }),
//   subject: z.string().min(2, {
//     message: "Subject must be at least 2 characters.",
//   }),
//   content: z.string().min(10, {
//     message: "Content must be at least 10 characters.",
//   }),
//   description: z.string().optional(),
//   category: z.string(),
//   isDefault: z.boolean().default(false),
//   enablePersonalization: z.boolean().default(true),
//   responsiveDesign: z.boolean().default(true),
//   darkModeSupport: z.boolean().default(false),
//   accessibilityLevel: z.enum(["basic", "enhanced", "full"]).default("basic"),
// })

// export function EmailTemplateForm({
//   template,
//   onSuccess,
// }: {
//   template?: any
//   onSuccess?: () => void
// }) {
//   const router = useRouter()
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [previewDevice, setPreviewDevice] = useState<"mobile" | "desktop" | "tablet">("desktop")
//   const [previewMode, setPreviewMode] = useState<"light" | "dark">("light")
//   const [spamScore, setSpamScore] = useState(0)
//   const [accessibilityScore, setAccessibilityScore] = useState(0)
//   const [showTemplateGallery, setShowTemplateGallery] = useState(false)
//   const [templateBlocks, setTemplateBlocks] = useState<string[]>([])
//   const [colorPalette, setColorPalette] = useState({
//     primary: "#007bff",
//     secondary: "#6c757d",
//     accent: "#28a745",
//     background: "#ffffff",
//     text: "#333333",
//   })
//   const [aiGenerating, setAiGenerating] = useState(false)
//   const [personalizationTokens, setPersonalizationTokens] = useState([
//     { name: "First Name", token: "{{user.firstname}}" },
//     { name: "Last Name", token: "{{user.lastname}}" },
//     { name: "Email", token: "{{user.email}}" },
//     { name: "Company", token: "{{user.company}}" },
//     { name: "Subscription Plan", token: "{{user.plan}}" },
//     { name: "Last Login Date", token: "{{user.lastLogin}}" },
//   ])

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: template?.name || "",
//       subject: template?.subject || "",
//       content: template?.content || getDefaultTemplate(),
//       description: template?.description || "",
//       category: template?.category || "general",
//       isDefault: template?.isDefault || false,
//       enablePersonalization: template?.enablePersonalization || true,
//       responsiveDesign: template?.responsiveDesign || true,
//       darkModeSupport: template?.darkModeSupport || false,
//       accessibilityLevel: template?.accessibilityLevel || "basic",
//     },
//   })

//   // Calculate accessibility score based on form values
//   useEffect(() => {
//     const accessibilityLevel = form.watch("accessibilityLevel")
//     const hasPersonalization = form.watch("enablePersonalization")
//     const hasResponsiveDesign = form.watch("responsiveDesign")
//     const hasDarkMode = form.watch("darkModeSupport")

//     let score = 0

//     if (accessibilityLevel === "basic") score += 30
//     if (accessibilityLevel === "enhanced") score += 60
//     if (accessibilityLevel === "full") score += 90

//     if (hasResponsiveDesign) score += 5
//     if (hasDarkMode) score += 3
//     if (hasPersonalization) score += 2

//     setAccessibilityScore(Math.min(score, 100))
//   }, [
//     form.watch("accessibilityLevel"),
//     form.watch("enablePersonalization"),
//     form.watch("responsiveDesign"),
//     form.watch("darkModeSupport"),
//   ])

//   // Calculate spam score based on content
//   useEffect(() => {
//     const content = form.watch("content")
//     const subject = form.watch("subject")

//     if (content && subject) {
//       // Simple spam score calculation
//       const spamTriggers = ["free", "discount", "cash", "buy", "money", "urgent", "limited", "offer", "!"]
//       let score = 0

//       const combinedText = content.toLowerCase() + " " + subject.toLowerCase()

//       spamTriggers.forEach((trigger) => {
//         if (combinedText.includes(trigger)) {
//           score += 5
//         }
//       })

//       // Check for excessive capitalization
//       const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length
//       if (capsRatio > 0.3) {
//         score += 20
//       }

//       // Check for image to text ratio (simplified)
//       const imgCount = (content.match(/<img/g) || []).length
//       if (imgCount > 5) {
//         score += 10
//       }

//       setSpamScore(Math.min(score, 100))
//     }
//   }, [form.watch("content"), form.watch("subject")])

//   // Generate template blocks for the gallery
//   useEffect(() => {
//     setTemplateBlocks([
//       getHeaderBlock(),
//       getHeroBlock(),
//       getFeatureBlock(),
//       getTestimonialBlock(),
//       getCtaBlock(),
//       getFooterBlock(),
//     ])
//   }, [])

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setIsSubmitting(true)

//     try {
//       const formData = new FormData()
//       formData.append("name", values.name)
//       formData.append("subject", values.subject)
//       formData.append("content", values.content)
//       formData.append("description", values.description || "")
//       formData.append("category", values.category)
//       formData.append("isDefault", values.isDefault.toString())
//       formData.append("enablePersonalization", values.enablePersonalization.toString())
//       formData.append("responsiveDesign", values.responsiveDesign.toString())
//       formData.append("darkModeSupport", values.darkModeSupport.toString())
//       formData.append("accessibilityLevel", values.accessibilityLevel)

//       let result

//       if (template?.id) {
//         result = await updateEmailTemplate(template.id, formData)
//       } else {
//         result = await createEmailTemplate(formData)
//       }

//       if (result.success) {
//         toast({
//           title: template?.id ? "Template updated" : "Template created",
//           description: template?.id
//             ? "Your email template has been updated successfully."
//             : "Your new email template has been created successfully.",
//         })

//         if (onSuccess) {
//           onSuccess()
//         } else {
//           router.push("/admin/email/templates")
//           router.refresh()
//         }
//       } else {
//         toast({
//           title: "Error",
//           description: "Failed to save the template. Please try again.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error saving template:", error)
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   function insertPersonalizationToken(token: string) {
//     const currentContent = form.getValues("content")
//     const updatedContent = currentContent + token
//     form.setValue("content", updatedContent)
//   }

//   function generateAIContent() {
//     setAiGenerating(true)

//     // Simulate AI generation
//     setTimeout(() => {
//       const category = form.getValues("category")
//       const aiGeneratedTemplate = getAIGeneratedTemplate(category)
//       form.setValue("content", aiGeneratedTemplate)
//       setAiGenerating(false)

//       toast({
//         title: "AI Content Generated",
//         description: "Your template has been generated based on your category and settings.",
//       })
//     }, 2000)
//   }

//   function insertTemplateBlock(blockHtml: string) {
//     const currentContent = form.getValues("content")
//     const updatedContent = currentContent + blockHtml
//     form.setValue("content", updatedContent)

//     toast({
//       title: "Block Added",
//       description: "Template block has been added to your email content.",
//     })
//   }

//   function applyColorPalette() {
//     let content = form.getValues("content")

//     // Replace color values in the content
//     content = content.replace(/#007bff/g, colorPalette.primary)
//     content = content.replace(/#6c757d/g, colorPalette.secondary)
//     content = content.replace(/#28a745/g, colorPalette.accent)
//     content = content.replace(/#ffffff/g, colorPalette.background)
//     content = content.replace(/#333333/g, colorPalette.text)

//     form.setValue("content", content)

//     toast({
//       title: "Colors Applied",
//       description: "Your color palette has been applied to the template.",
//     })
//   }

//   return (
//     <Tabs defaultValue="design" className="w-full">
//       <TabsList className="w-full mb-6">
//         <TabsTrigger value="design" className="flex-1">
//           Design
//         </TabsTrigger>
//         <TabsTrigger value="preview" className="flex-1">
//           Preview
//         </TabsTrigger>
//         <TabsTrigger value="blocks" className="flex-1">
//           Blocks
//         </TabsTrigger>
//         <TabsTrigger value="settings" className="flex-1">
//           Settings
//         </TabsTrigger>
//       </TabsList>

//       <TabsContent value="design">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6 overflow-y-auto">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Template Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Welcome Email" {...field} />
//                     </FormControl>
//                     <FormDescription className="text-xs">A descriptive name for your email template.</FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="category"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Category</FormLabel>
//                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select a category" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="welcome">Welcome</SelectItem>
//                         <SelectItem value="newsletter">Newsletter</SelectItem>
//                         <SelectItem value="promotional">Promotional</SelectItem>
//                         <SelectItem value="transactional">Transactional</SelectItem>
//                         <SelectItem value="general">General</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormDescription className="text-xs">
//                       Categorize your template for better organization.
//                     </FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <FormField
//               control={form.control}
//               name="subject"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email Subject</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Welcome to our platform!" {...field} />
//                   </FormControl>
//                   <FormDescription className="text-xs">
//                     The subject line of the email. You can use variables like &#123;&#123;user.firstname&#125;&#125;.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description (Optional)</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="A welcome email sent to new users when they sign up."
//                       className="resize-none"
//                       rows={3}
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormDescription className="text-xs">
//                     A brief description of when and how this template is used.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="flex flex-wrap items-center gap-2 mb-2">
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 className="h-8 gap-1"
//                 onClick={generateAIContent}
//                 disabled={aiGenerating}
//               >
//                 <Wand2 className="h-3.5 w-3.5" />
//                 <span>{aiGenerating ? "Generating..." : "Generate with AI"}</span>
//               </Button>

//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button type="button" variant="outline" size="sm" className="h-8 gap-1">
//                     <Palette className="h-3.5 w-3.5" />
//                     <span>Color Palette</span>
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-80">
//                   <div className="space-y-4">
//                     <h4 className="font-medium text-sm">Customize Colors</h4>
//                     <div className="space-y-2">
//                       <div className="grid grid-cols-5 gap-2 items-center">
//                         <Label className="col-span-2 text-xs">Primary</Label>
//                         <Input
//                           type="color"
//                           value={colorPalette.primary}
//                           onChange={(e) => setColorPalette({ ...colorPalette, primary: e.target.value })}
//                           className="col-span-2 h-8 p-1"
//                         />
//                         <div className="w-6 h-6 rounded" style={{ backgroundColor: colorPalette.primary }}></div>
//                       </div>
//                       <div className="grid grid-cols-5 gap-2 items-center">
//                         <Label className="col-span-2 text-xs">Secondary</Label>
//                         <Input
//                           type="color"
//                           value={colorPalette.secondary}
//                           onChange={(e) => setColorPalette({ ...colorPalette, secondary: e.target.value })}
//                           className="col-span-2 h-8 p-1"
//                         />
//                         <div className="w-6 h-6 rounded" style={{ backgroundColor: colorPalette.secondary }}></div>
//                       </div>
//                       <div className="grid grid-cols-5 gap-2 items-center">
//                         <Label className="col-span-2 text-xs">Accent</Label>
//                         <Input
//                           type="color"
//                           value={colorPalette.accent}
//                           onChange={(e) => setColorPalette({ ...colorPalette, accent: e.target.value })}
//                           className="col-span-2 h-8 p-1"
//                         />
//                         <div className="w-6 h-6 rounded" style={{ backgroundColor: colorPalette.accent }}></div>
//                       </div>
//                       <div className="grid grid-cols-5 gap-2 items-center">
//                         <Label className="col-span-2 text-xs">Background</Label>
//                         <Input
//                           type="color"
//                           value={colorPalette.background}
//                           onChange={(e) => setColorPalette({ ...colorPalette, background: e.target.value })}
//                           className="col-span-2 h-8 p-1"
//                         />
//                         <div
//                           className="w-6 h-6 rounded border"
//                           style={{ backgroundColor: colorPalette.background }}
//                         ></div>
//                       </div>
//                       <div className="grid grid-cols-5 gap-2 items-center">
//                         <Label className="col-span-2 text-xs">Text</Label>
//                         <Input
//                           type="color"
//                           value={colorPalette.text}
//                           onChange={(e) => setColorPalette({ ...colorPalette, text: e.target.value })}
//                           className="col-span-2 h-8 p-1"
//                         />
//                         <div className="w-6 h-6 rounded" style={{ backgroundColor: colorPalette.text }}></div>
//                       </div>
//                     </div>
//                     <Button type="button" size="sm" className="w-full" onClick={applyColorPalette}>
//                       Apply Colors
//                     </Button>
//                   </div>
//                 </PopoverContent>
//               </Popover>

//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button type="button" variant="outline" size="sm" className="h-8 gap-1">
//                     <Sparkles className="h-3.5 w-3.5" />
//                     <span>Personalization</span>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent>
//                   {personalizationTokens.map((token, index) => (
//                     <DropdownMenuItem key={index} onClick={() => insertPersonalizationToken(token.token)}>
//                       <span>{token.name}</span>
//                       <span className="ml-2 text-xs text-muted-foreground">{token.token}</span>
//                     </DropdownMenuItem>
//                   ))}
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>

//             <FormField
//               control={form.control}
//               name="content"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email Content</FormLabel>
//                   <Tabs defaultValue="editor" className="w-full">
//                     <div className="overflow-x-auto -mx-2 px-2">
//                       <TabsList className="mb-4 w-full sm:w-auto flex overflow-x-auto no-scrollbar">
//                         <TabsTrigger value="editor" className="flex-shrink-0">
//                           Visual Editor
//                         </TabsTrigger>
//                         <TabsTrigger value="html" className="flex-shrink-0">
//                           HTML
//                         </TabsTrigger>
//                         <TabsTrigger value="preview" className="flex-shrink-0">
//                           Preview
//                         </TabsTrigger>
//                       </TabsList>
//                     </div>
//                     <TabsContent value="editor">
//                       <FormControl>
//                         <div className="border rounded-md overflow-hidden">
//                           <Editor value={field.value} onChange={field.onChange} />
//                         </div>
//                       </FormControl>
//                     </TabsContent>
//                     <TabsContent value="html">
//                       <FormControl>
//                         <Textarea className="min-h-[300px] md:min-h-[400px] font-mono text-sm resize-none" {...field} />
//                       </FormControl>
//                     </TabsContent>
//                     <TabsContent value="preview">
//                       <div className="border rounded-md p-2 md:p-4 min-h-[300px] md:min-h-[400px] bg-white overflow-auto">
//                         <div
//                           className="prose max-w-none text-sm md:text-base"
//                           dangerouslySetInnerHTML={{ __html: field.value }}
//                         />
//                       </div>
//                     </TabsContent>
//                   </Tabs>
//                   <FormDescription className="text-xs">The content of your email.</FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <FormField
//                 control={form.control}
//                 name="isDefault"
//                 render={({ field }) => (
//                   <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 md:p-4">
//                     <div className="space-y-0.5">
//                       <FormLabel className="text-sm md:text-base">Set as Default</FormLabel>
//                       <FormDescription className="text-xs">
//                         Make this the default template for its category.
//                       </FormDescription>
//                     </div>
//                     <FormControl>
//                       <Switch checked={field.value} onCheckedChange={field.onChange} />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="enablePersonalization"
//                 render={({ field }) => (
//                   <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 md:p-4">
//                     <div className="space-y-0.5">
//                       <FormLabel className="text-sm md:text-base">Enable Personalization</FormLabel>
//                       <FormDescription className="text-xs">Allow dynamic content based on user data.</FormDescription>
//                     </div>
//                     <FormControl>
//                       <Switch checked={field.value} onCheckedChange={field.onChange} />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-4 pt-2">
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="w-full sm:w-auto order-2 sm:order-1"
//                 onClick={() => {
//                   if (onSuccess) {
//                     onSuccess()
//                   } else {
//                     router.push("/admin/email/templates")
//                   }
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto order-1 sm:order-2">
//                 {isSubmitting ? "Saving..." : template?.id ? "Update Template" : "Create Template"}
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </TabsContent>

//       <TabsContent value="preview">
//         <div className="space-y-6">
//           <div className="flex items-center justify-between">
//             <h3 className="text-lg font-medium">Email Preview</h3>
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className={cn("h-8", previewDevice === "mobile" && "bg-secondary")}
//                 onClick={() => setPreviewDevice("mobile")}
//               >
//                 <Smartphone className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className={cn("h-8", previewDevice === "tablet" && "bg-secondary")}
//                 onClick={() => setPreviewDevice("tablet")}
//               >
//                 <Tablet className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className={cn("h-8", previewDevice === "desktop" && "bg-secondary")}
//                 onClick={() => setPreviewDevice("desktop")}
//               >
//                 <Laptop className="h-4 w-4" />
//               </Button>
//               <div className="h-6 border-l mx-1"></div>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className={cn("h-8", previewMode === "light" && "bg-secondary")}
//                 onClick={() => setPreviewMode("light")}
//               >
//                 Light
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className={cn("h-8", previewMode === "dark" && "bg-secondary")}
//                 onClick={() => setPreviewMode("dark")}
//               >
//                 Dark
//               </Button>
//             </div>
//           </div>

//           <div
//             className={cn(
//               "border rounded-lg overflow-hidden mx-auto transition-all",
//               previewMode === "dark" ? "bg-gray-900 text-white" : "bg-white",
//               previewDevice === "mobile"
//                 ? "w-[320px] h-[568px]"
//                 : previewDevice === "tablet"
//                   ? "w-[768px] h-[700px]"
//                   : "w-full max-w-[1024px] h-[700px]",
//             )}
//           >
//             <div className="border-b p-3 flex items-center gap-2">
//               <div className="w-3 h-3 rounded-full bg-red-500"></div>
//               <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
//               <div className="w-3 h-3 rounded-full bg-green-500"></div>
//               <div className="ml-4 text-xs text-center flex-1 truncate">{form.watch("subject") || "Email Subject"}</div>
//             </div>
//             <div className="p-4 overflow-auto h-[calc(100%-40px)]">
//               <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: form.watch("content") }} />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Card>
//               <CardContent className="pt-6">
//                 <h4 className="font-medium mb-2">Spam Score</h4>
//                 <Progress
//                   value={spamScore}
//                   className="h-2 mb-2"
//                   indicatorClassName={cn(
//                     spamScore > 50 ? "bg-red-500" : spamScore > 20 ? "bg-yellow-500" : "bg-green-500",
//                   )}
//                 />
//                 <div className="flex justify-between text-xs text-muted-foreground">
//                   <span>Low Risk</span>
//                   <span>Medium Risk</span>
//                   <span>High Risk</span>
//                 </div>

//                 {spamScore > 20 && (
//                   <div className="mt-4 text-sm flex items-start gap-2">
//                     <AlertTriangle
//                       className={cn("h-4 w-4 mt-0.5", spamScore > 50 ? "text-red-500" : "text-yellow-500")}
//                     />
//                     <div>
//                       <p className="font-medium">Potential spam triggers detected</p>
//                       <p className="text-xs text-muted-foreground">
//                         Your email contains elements that might trigger spam filters. Consider revising your content to
//                         improve deliverability.
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="pt-6">
//                 <h4 className="font-medium mb-2">Accessibility Score</h4>
//                 <Progress
//                   value={accessibilityScore}
//                   className="h-2 mb-2"
//                   indicatorClassName={cn(
//                     accessibilityScore > 80 ? "bg-green-500" : accessibilityScore > 40 ? "bg-yellow-500" : "bg-red-500",
//                   )}
//                 />
//                 <div className="flex justify-between text-xs text-muted-foreground">
//                   <span>Poor</span>
//                   <span>Good</span>
//                   <span>Excellent</span>
//                 </div>

//                 <div className="mt-4 grid grid-cols-2 gap-2">
//                   <div className="flex items-center gap-1">
//                     <div
//                       className={cn(
//                         "w-2 h-2 rounded-full",
//                         form.watch("responsiveDesign") ? "bg-green-500" : "bg-gray-300",
//                       )}
//                     ></div>
//                     <span className="text-xs">Responsive Design</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <div
//                       className={cn(
//                         "w-2 h-2 rounded-full",
//                         form.watch("darkModeSupport") ? "bg-green-500" : "bg-gray-300",
//                       )}
//                     ></div>
//                     <span className="text-xs">Dark Mode Support</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <div
//                       className={cn(
//                         "w-2 h-2 rounded-full",
//                         form.watch("enablePersonalization") ? "bg-green-500" : "bg-gray-300",
//                       )}
//                     ></div>
//                     <span className="text-xs">Personalization</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <div
//                       className={cn(
//                         "w-2 h-2 rounded-full",
//                         form.watch("accessibilityLevel") === "full"
//                           ? "bg-green-500"
//                           : form.watch("accessibilityLevel") === "enhanced"
//                             ? "bg-yellow-500"
//                             : "bg-gray-300",
//                       )}
//                     ></div>
//                     <span className="text-xs">Screen Reader Support</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </TabsContent>

//       <TabsContent value="blocks">
//         <div className="space-y-6">
//           <h3 className="text-lg font-medium">Template Blocks</h3>
//           <p className="text-sm text-muted-foreground">
//             Drag and drop these pre-designed blocks into your email template to quickly build professional emails.
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {templateBlocks.map((block, index) => (
//               <Card key={index} className="overflow-hidden">
//                 <div className="h-40 overflow-hidden border-b">
//                   <div
//                     className="prose max-w-none scale-[0.6] origin-top p-2"
//                     dangerouslySetInnerHTML={{ __html: block }}
//                   />
//                 </div>
//                 <CardContent className="p-3 flex justify-between items-center">
//                   <span className="text-sm font-medium">
//                     {index === 0
//                       ? "Header"
//                       : index === 1
//                         ? "Hero Section"
//                         : index === 2
//                           ? "Feature Block"
//                           : index === 3
//                             ? "Testimonial"
//                             : index === 4
//                               ? "Call to Action"
//                               : "Footer"}
//                   </span>
//                   <Button size="sm" variant="outline" onClick={() => insertTemplateBlock(block)}>
//                     Add
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </TabsContent>

//       <TabsContent value="settings">
//         <div className="space-y-6">
//           <h3 className="text-lg font-medium">Advanced Settings</h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <FormField
//               control={form.control}
//               name="responsiveDesign"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 md:p-4">
//                   <div className="space-y-0.5">
//                     <FormLabel className="text-sm md:text-base">Responsive Design</FormLabel>
//                     <FormDescription className="text-xs">
//                       Optimize email display across all device sizes.
//                     </FormDescription>
//                   </div>
//                   <FormControl>
//                     <Switch checked={field.value} onCheckedChange={field.onChange} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="darkModeSupport"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 md:p-4">
//                   <div className="space-y-0.5">
//                     <FormLabel className="text-sm md:text-base">Dark Mode Support</FormLabel>
//                     <FormDescription className="text-xs">
//                       Add dark mode compatibility for email clients that support it.
//                     </FormDescription>
//                   </div>
//                   <FormControl>
//                     <Switch checked={field.value} onCheckedChange={field.onChange} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//           </div>

//           <FormField
//             control={form.control}
//             name="accessibilityLevel"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Accessibility Level</FormLabel>
//                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select accessibility level" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="basic">Basic (Alt text for images)</SelectItem>
//                     <SelectItem value="enhanced">Enhanced (Semantic HTML + Basic)</SelectItem>
//                     <SelectItem value="full">Full (WCAG 2.1 AA Compliant)</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormDescription className="text-xs">
//                   Choose the level of accessibility compliance for your email template.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Card>
//             <CardContent className="pt-6">
//               <h4 className="font-medium mb-4">Email Client Compatibility</h4>
//               <div className="space-y-3">
//                 <div>
//                   <div className="flex items-center justify-between mb-1">
//                     <span className="text-sm">Gmail</span>
//                     <span className="text-sm font-medium text-green-500">Excellent</span>
//                   </div>
//                   <Progress value={95} className="h-2" />
//                 </div>
//                 <div>
//                   <div className="flex items-center justify-between mb-1">
//                     <span className="text-sm">Outlook</span>
//                     <span className="text-sm font-medium text-yellow-500">Good</span>
//                   </div>
//                   <Progress value={75} className="h-2" />
//                 </div>
//                 <div>
//                   <div className="flex items-center justify-between mb-1">
//                     <span className="text-sm">Apple Mail</span>
//                     <span className="text-sm font-medium text-green-500">Excellent</span>
//                   </div>
//                   <Progress value={90} className="h-2" />
//                 </div>
//                 <div>
//                   <div className="flex items-center justify-between mb-1">
//                     <span className="text-sm">Yahoo Mail</span>
//                     <span className="text-sm font-medium text-green-500">Excellent</span>
//                   </div>
//                   <Progress value={85} className="h-2" />
//                 </div>
//                 <div>
//                   <div className="flex items-center justify-between mb-1">
//                     <span className="text-sm">Mobile Email Apps</span>
//                     <span className="text-sm font-medium text-green-500">Excellent</span>
//                   </div>
//                   <Progress value={95} className="h-2" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </TabsContent>
//     </Tabs>
//   )
// }

// function getDefaultTemplate() {
//   const user = { firstname: "User" } // Define the user variable
//   return `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1">
//   <title>Email Template</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       line-height: 1.6;
//       color: #333333;
//       margin: 0;
//       padding: 0;
//     }
//     .container {
//       max-width: 600px;
//       margin: 0 auto;
//       padding: 20px;
//     }
//     .header {
//       background-color: #f8f9fa;
//       padding: 20px;
//       text-align: center;
//       border-radius: 5px 5px 0 0;
//     }
//     .content {
//       padding: 20px;
//       background-color: #ffffff;
//     }
//     .footer {
//       background-color: #f8f9fa;
//       padding: 20px;
//       text-align: center;
//       font-size: 12px;
//       color: #6c757d;
//       border-radius: 0 0 5px 5px;
//     }
//     .button {
//       display: inline-block;
//       padding: 10px 20px;
//       background-color: #007bff;
//       color: #ffffff;
//       text-decoration: none;
//       border-radius: 5px;
//       margin-top: 20px;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <h1>Welcome to Our Platform</h1>
//     </div>
//     <div class="content">
//       <p>Hello ${user.firstname},</p>
//       <p>Thank you for signing up! We're excited to have you on board.</p>
//       <p>With our platform, you can:</p>
//       <ul>
//         <li>Automate Insta Dms</li>
//         <li>Schedule IG posts</li>
//         <li>Create content</li>
//       </ul>
//       <p>If you have any questions, feel free to reply to this email.</p>
//       <a href="#" class="button">Get Started</a>
//     </div>
//     <div class="footer">
//       <p>© 2025 Yazil. All rights reserved.</p>
//       <p>00100 Main St, Nairobae, Kenya</p>
//     </div>
//   </div>
// </body>
// </html>
//   `
// }

// // Helper functions for template blocks
// function getHeaderBlock() {
//   return `
// <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
//   <img src="https://via.placeholder.com/150x50" alt="Company Logo" style="max-width: 150px;">
//   <div style="margin-top: 10px;">
//     <a href="#" style="color: #6c757d; text-decoration: none; margin: 0 10px;">Home</a>
//     <a href="#" style="color: #6c757d; text-decoration: none; margin: 0 10px;">Products</a>
//     <a href="#" style="color: #6c757d; text-decoration: none; margin: 0 10px;">Blog</a>
//     <a href="#" style="color: #6c757d; text-decoration: none; margin: 0 10px;">Contact</a>
//   </div>
// </div>
//   `
// }

// function getHeroBlock() {
//   return `
// <div style="background-color: #007bff; color: white; padding: 40px 20px; text-align: center;">
//   <h1 style="margin: 0; font-size: 28px;">Welcome to Our Newsletter</h1>
//   <p style="margin: 15px 0 25px;">Stay updated with the latest news and offers</p>
//   <a href="#" style="display: inline-block; padding: 10px 20px; background-color: white; color: #007bff; text-decoration: none; border-radius: 5px; font-weight: bold;">Learn More</a>
// </div>
//   `
// }

// function getFeatureBlock() {
//   return `
// <div style="padding: 30px 20px; background-color: white;">
//   <div style="display: inline-block; width: 30%; vertical-align: top; padding: 0 10px; text-align: center;">
//     <img src="https://via.placeholder.com/80" alt="Feature 1" style="width: 80px; height: 80px;">
//     <h3 style="margin: 15px 0 10px;">Feature One</h3>
//     <p style="margin: 0; color: #6c757d; font-size: 14px;">A brief description of this amazing feature and how it benefits users.</p>
//   </div>
//   <div style="display: inline-block; width: 30%; vertical-align: top; padding: 0 10px; text-align: center;">
//     <img src="https://via.placeholder.com/80" alt="Feature 2" style="width: 80px; height: 80px;">
//     <h3 style="margin: 15px 0 10px;">Feature Two</h3>
//     <p style="margin: 0; color: #6c757d; font-size: 14px;">A brief description of this amazing feature and how it benefits users.</p>
//   </div>
//   <div style="display: inline-block; width: 30%; vertical-align: top; padding: 0 10px; text-align: center;">
//     <img src="https://via.placeholder.com/80" alt="Feature 3" style="width: 80px; height: 80px;">
//     <h3 style="margin: 15px 0 10px;">Feature Three</h3>
//     <p style="margin: 0; color: #6c757d; font-size: 14px;">A brief description of this amazing feature and how it benefits users.</p>
//   </div>
// </div>
//   `
// }

// function getTestimonialBlock() {
//   return `
// <div style="padding: 30px 20px; background-color: #f8f9fa; text-align: center;">
//   <img src="https://via.placeholder.com/100" alt="Customer" style="width: 100px; height: 100px; border-radius: 50%;">
//   <p style="font-style: italic; margin: 20px 0; font-size: 16px; color: #333;">"This product has completely transformed how we work. The features are intuitive and the support team is amazing!"</p>
//   <p style="margin: 0; font-weight: bold;">Jane Smith</p>
//   <p style="margin: 5px 0 0; color: #6c757d; font-size: 14px;">CEO, Company Name</p>
// </div>
//   `
// }

// function getCtaBlock() {
//   return `
// <div style="padding: 40px 20px; background-color: #28a745; color: white; text-align: center;">
//   <h2 style="margin: 0 0 15px; font-size: 24px;">Ready to Get Started?</h2>
//   <p style="margin: 0 0 25px; font-size: 16px;">Join thousands of satisfied customers today.</p>
//   <a href="#" style="display: inline-block; padding: 12px 30px; background-color: white; color: #28a745; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">Sign Up Now</a>
// </div>
//   `
// }

// function getFooterBlock() {
//   return `
// <div style="background-color: #343a40; color: white; padding: 30px 20px; text-align: center; border-radius: 0 0 5px 5px;">
//   <div style="margin-bottom: 20px;">
//     <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
//     <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">Terms of Service</a>
//     <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">Unsubscribe</a>
//   </div>
//   <div style="margin-bottom: 20px;">
//     <a href="#" style="color: white; text-decoration: none; margin: 0 10px;"><img src="https://via.placeholder.com/20" alt="Facebook" style="width: 20px; height: 20px;"></a>
//     <a href="#" style="color: white; text-decoration: none; margin: 0 10px;"><img src="https://via.placeholder.com/20" alt="Twitter" style="width: 20px; height: 20px;"></a>
//     <a href="#" style="color: white; text-decoration: none; margin: 0 10px;"><img src="https://via.placeholder.com/20" alt="Instagram" style="width: 20px; height: 20px;"></a>
//     <a href="#" style="color: white; text-decoration: none; margin: 0 10px;"><img src="https://via.placeholder.com/20" alt="LinkedIn" style="width: 20px; height: 20px;"></a>
//   </div>
//   <p style="margin: 0; font-size: 12px;">© 2025 Company Name. All rights reserved.</p>
//   <p style="margin: 5px 0 0; font-size: 12px;">123 Street Name, City, Country</p>
// </div>
//   `
// }

// function getAIGeneratedTemplate(category: string) {
//   // Generate different templates based on category
//   switch (category) {
//     case "welcome":
//       return `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1">
//   <title>Welcome to Our Platform</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       line-height: 1.6;
//       color: #333333;
//       margin: 0;
//       padding: 0;
//       background-color: #f9f9f9;
//     }
//     .container {
//       max-width: 600px;
//       margin: 0 auto;
//       background-color: #ffffff;
//       border-radius: 8px;
//       overflow: hidden;
//       box-shadow: 0 4px 6px rgba(0,0,0,0.1);
//     }
//     .header {
//       background-color: #007bff;
//       padding: 30px 20px;
//       text-align: center;
//       color: white;
//     }
//     .content {
//       padding: 30px 20px;
//     }
//     .footer {
//       background-color: #f8f9fa;
//       padding: 20px;
//       text-align: center;
//       font-size: 12px;
//       color: #6c757d;
//     }
//     .button {
//       display: inline-block;
//       padding: 12px 24px;
//       background-color: #007bff;
//       color: #ffffff;
//       text-decoration: none;
//       border-radius: 5px;
//       font-weight: bold;
//       margin-top: 20px;
//     }
//     .feature {
//       display: flex;
//       align-items: center;
//       margin-bottom: 20px;
//     }
//     .feature-icon {
//       width: 50px;
//       height: 50px;
//       background-color: #e9f5ff;
//       border-radius: 50%;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       margin-right: 15px;
//       color: #007bff;
//       font-size: 20px;
//       font-weight: bold;
//     }
//     .social-links {
//       margin-top: 20px;
//     }
//     .social-links a {
//       display: inline-block;
//       margin: 0 8px;
//       color: #6c757d;
//       text-decoration: none;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <h1>Welcome to Our Platform, {{user.firstname}}!</h1>
//       <p>We're thrilled to have you join us</p>
//     </div>
//     <div class="content">
//       <p>Hello {{user.firstname}},</p>
//       <p>Thank you for creating an account with us! We're excited to have you as part of our community.</p>
      
//       <p>Here are a few things you can do to get started:</p>
      
//       <div class="feature">
//         <div class="feature-icon">1</div>
//         <div>
//           <strong>Complete your profile</strong>
//           <p>Add your information to help us personalize your experience.</p>
//         </div>
//       </div>
      
//       <div class="feature">
//         <div class="feature-icon">2</div>
//         <div>
//           <strong>Explore our features</strong>
//           <p>Discover all the powerful tools we offer to help you succeed.</p>
//         </div>
//       </div>
      
//       <div class="feature">
//         <div class="feature-icon">3</div>
//         <div>
//           <strong>Connect with others</strong>
//           <p>Build your network and collaborate with like-minded individuals.</p>
//         </div>
//       </div>
      
//       <div style="text-align: center; margin-top: 30px;">
//         <a href="#" class="button">Get Started Now</a>
//       </div>
      
//       <p style="margin-top: 30px;">If you have any questions, feel free to reply to this email or contact our support team.</p>
      
//       <p>Best regards,<br>The Team</p>
//     </div>
//     <div class="footer">
//       <div class="social-links">
//         <a href="#">Facebook</a> • 
//         <a href="#">Twitter</a> • 
//         <a href="#">Instagram</a> • 
//         <a href="#">LinkedIn</a>
//       </div>
//       <p style="margin-top: 15px;">© 2025 Company Name. All rights reserved.</p>
//       <p>123 Street Name, City, Country</p>
//       <p style="margin-top: 15px; font-size: 11px;">
//         You're receiving this email because you signed up for an account.<br>
//         <a href="#" style="color: #6c757d;">Unsubscribe</a> or <a href="#" style="color: #6c757d;">manage email preferences</a>
//       </p>
//     </div>
//   </div>
// </body>
// </html>
//       `
//     case "newsletter":
//       return `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1">
//   <title>Monthly Newsletter</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       line-height: 1.6;
//       color: #333333;
//       margin: 0;
//       padding: 0;
//       background-color: #f9f9f9;
//     }
//     .container {
//       max-width: 600px;
//       margin: 0 auto;
//       background-color: #ffffff;
//     }
//     .header {
//       background-color: #28a745;
//       padding: 20px;
//       text-align: center;
//       color: white;
//     }
//     .content {
//       padding: 20px;
//     }
//     .article {
//       margin-bottom: 30px;
//       border-bottom: 1px solid #eee;
//       padding-bottom: 20px;
//     }
//     .article:last-child {
//       border-bottom: none;
//       margin-bottom: 0;
//     }
//     .article-image {
//       width: 100%;
//       height: auto;
//       border-radius: 5px;
//       margin-bottom: 15px;
//     }
//     .article-title {
//       font-size: 20px;
//       margin: 0 0 10px;
//       color: #28a745;
//     }
//     .article-meta {
//       font-size: 12px;
//       color: #6c757d;
//       margin-bottom: 10px;
//     }
//     .read-more {
//       display: inline-block;
//       color: #28a745;
//       font-weight: bold;
//       text-decoration: none;
//     }
//     .footer {
//       background-color: #f8f9fa;
//       padding: 20px;
//       text-align: center;
//       font-size: 12px;
//       color: #6c757d;
//     }
//     .button {
//       display: inline-block;
//       padding: 10px 20px;
//       background-color: #28a745;
//       color: #ffffff;
//       text-decoration: none;
//       border-radius: 5px;
//       margin-top: 20px;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <h1>Monthly Newsletter</h1>
//       <p>June 2025 Edition</p>
//     </div>
//     <div class="content">
//       <p>Hello {{user.firstname}},</p>
//       <p>Welcome to our June newsletter! Here's what's new this month:</p>
      
//       <div class="article">
//         <img src="https://via.placeholder.com/600x300" alt="Article Image" class="article-image">
//         <h2 class="article-title">New Feature Release: AI-Powered Analytics</h2>
//         <p class="article-meta">Posted on June 15, 2025 • 5 min read</p>
//         <p>We're excited to announce our new AI-powered analytics dashboard that helps you gain deeper insights into your performance metrics...</p>
//         <a href="#" class="read-more">Read More →</a>
//       </div>
      
//       <div class="article">
//         <img src="https://via.placeholder.com/600x300" alt="Article Image" class="article-image">
//         <h2 class="article-title">Customer Spotlight: How Company X Increased Conversions by 200%</h2>
//         <p class="article-meta">Posted on June 10, 2025 • 8 min read</p>
//         <p>Learn how Company X leveraged our platform to dramatically increase their conversion rates and streamline their workflow...</p>
//         <a href="#" class="read-more">Read More →</a>
//       </div>
      
//       <div class="article">
//         <img src="https://via.placeholder.com/600x300" alt="Article Image" class="article-image">
//         <h2 class="article-title">Upcoming Webinar: Mastering Digital Marketing in 2025</h2>
//         <p class="article-meta">June 28, 2025 • 2:00 PM EST</p>
//         <p>Join our expert panel as they discuss the latest trends in digital marketing and share actionable strategies you can implement today...</p>
//         <a href="#" class="button">Register Now</a>
//       </div>
//     </div>
//     <div class="footer">
//       <p>© 2025 Company Name. All rights reserved.</p>
//       <p>123 Street Name, City, Country</p>
//       <p style="margin-top: 15px;">
//         <a href="#" style="color: #6c757d; margin: 0 5px;">Unsubscribe</a> • 
//         <a href="#" style="color: #6c757d; margin: 0 5px;">View in Browser</a> • 
//         <a href="#" style="color: #6c757d; margin: 0 5px;">Privacy Policy</a>
//       </p>
//     </div>
//   </div>
// </body>
// </html>
//       `
//     case "promotional":
//       return `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1">
//   <title>Special Offer Inside!</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       line-height: 1.6;
//       color: #333333;
//       margin: 0;
//       padding: 0;
//       background-color: #f9f9f9;
//     }
//     .container {
//       max-width: 600px;
//       margin: 0 auto;
//       background-color: #ffffff;
//     }
//     .header {
//       background-color: #dc3545;
//       padding: 20px;
//       text-align: center;
//       color: white;
//     }
//     .content {
//       padding: 20px;
//     }
//     .offer-box {
//       border: 2px dashed #dc3545;
//       padding: 20px;
//       text-align: center;
//       margin: 20px 0;
//       background-color: #fff8f8;
//     }
//     .offer-code {
//       font-size: 24px;
//       font-weight: bold;
//       letter-spacing: 2px;
//       color: #dc3545;
//       padding: 10px;
//       background-color: white;
//       border: 1px solid #dc3545;
//       display: inline-block;
//       margin: 10px 0;
//     }
//     .countdown {
//       font-size: 18px;
//       font-weight: bold;
//       color: #dc3545;
//       margin: 15px 0;
//     }
//     .product {
//       margin-bottom: 20px;
//       padding: 15px;
//       border: 1px solid #eee;
//       border-radius: 5px;
//     }
//     .product-image {
//       width: 100%;
//       height: auto;
//       margin-bottom: 10px;
//       border-radius: 5px;
//     }
//     .product-title {
//       font-size: 18px;
//       margin: 0 0 5px;
//     }
//     .product-price {
//       font-size: 16px;
//       color: #dc3545;
//       font-weight: bold;
//     }
//     .product-original-price {
//       text-decoration: line-through;
//       color: #6c757d;
//       margin-right: 10px;
//     }
//     .button {
//       display: inline-block;
//       padding: 12px 25px;
//       background-color: #dc3545;
//       color: #ffffff;
//       text-decoration: none;
//       border-radius: 5px;
//       font-weight: bold;
//       margin-top: 10px;
//     }
//     .footer {
//       background-color: #f8f9fa;
//       padding: 20px;
//       text-align: center;
//       font-size: 12px;
//       color: #6c757d;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <h1>FLASH SALE</h1>
//       <p>24 Hours Only - Up to 50% Off!</p>
//     </div>
//     <div class="content">
//       <p>Hello {{user.firstname}},</p>
//       <p>We're excited to offer you an exclusive discount on our most popular products. For the next 24 hours only, enjoy up to 50% off!</p>
      
//       <div class="offer-box">
//         <h2>EXCLUSIVE OFFER</h2>
//         <p>Use this code at checkout:</p>
//         <div class="offer-code">FLASH50</div>
//         <p class="countdown">Offer ends in: 23:59:59</p>
//         <a href="#" class="button">Shop Now</a>
//       </div>
      
//       <h2>Top Deals</h2>
      
//       <div class="product">
//         <img src="https://via.placeholder.com/600x300" alt="Product 1" class="product-image">
//         <h3 class="product-title">Premium Product 1</h3>
//         <p>The perfect solution for all your needs with advanced features and premium quality.</p>
//         <p class="product-price">
//           <span class="product-original-price">$199.99</span>
//           $99.99
//         </p>
//         <a href="#" class="button">Buy Now</a>
//       </div>
      
//       <div class="product">
//         <img src="https://via.placeholder.com/600x300" alt="Product 2" class="product-image">
//         <h3 class="product-title">Premium Product 2</h3>
//         <p>Our bestselling product now with enhanced capabilities and improved performance.</p>
//         <p class="product-price">
//           <span class="product-original-price">$149.99</span>
//           $74.99
//         </p>
//         <a href="#" class="button">Buy Now</a>
//       </div>
      
//       <p style="text-align: center; margin-top: 30px;">
//         <a href="#" class="button">View All Deals</a>
//       </p>
//     </div>
//     <div class="footer">
//       <p>© 2025 Company Name. All rights reserved.</p>
//       <p>123 Street Name, City, Country</p>
//       <p style="margin-top: 15px;">
//         <a href="#" style="color: #6c757d; margin: 0 5px;">Unsubscribe</a> • 
//         <a href="#" style="color: #6c757d; margin: 0 5px;">View in Browser</a> • 
//         <a href="#" style="color: #6c757d; margin: 0 5px;">Privacy Policy</a>
//       </p>
//     </div>
//   </div>
// </body>
// </html>
//       `
//     default:
//       return getDefaultTemplate()
//   }
// }

"use client"

import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { createEmailTemplate, updateEmailTemplate, sendTestEmail } from "../../actions/email-actions"
import { Editor } from "./email-editor"
import { Card, CardContent } from "@/components/ui/card"
import { Laptop, Smartphone, Tablet, Wand2, AlertTriangle, Palette, Sparkles, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  description: z.string().optional(),
  category: z.string(),
  isDefault: z.boolean().default(false),
  enablePersonalization: z.boolean().default(true),
  responsiveDesign: z.boolean().default(true),
  darkModeSupport: z.boolean().default(false),
  accessibilityLevel: z.enum(["basic", "enhanced", "full"]).default("basic"),
})

export function EmailTemplateForm({
  template,
  onSuccess,
}: {
  template?: any
  onSuccess?: () => void
}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "desktop" | "tablet">("desktop")
  const [previewMode, setPreviewMode] = useState<"light" | "dark">("light")
  const [spamScore, setSpamScore] = useState(0)
  const [accessibilityScore, setAccessibilityScore] = useState(0)
  const [showTemplateGallery, setShowTemplateGallery] = useState(false)
  const [templateBlocks, setTemplateBlocks] = useState<string[]>([])
  const [colorPalette, setColorPalette] = useState({
    primary: "#007bff",
    secondary: "#6c757d",
    accent: "#28a745",
    background: "#ffffff",
    text: "#333333",
  })
  const [aiGenerating, setAiGenerating] = useState(false)
  const [testEmailAddress, setTestEmailAddress] = useState("")
  const [isSendingTest, setIsSendingTest] = useState(false)
  const [personalizationTokens, setPersonalizationTokens] = useState([
    { name: "First Name", token: "{{user.firstname}}" },
    { name: "Last Name", token: "{{user.lastname}}" },
    { name: "Email", token: "{{user.email}}" },
    { name: "Company", token: "{{user.company}}" },
    { name: "Subscription Plan", token: "{{user.plan}}" },
    { name: "Last Login Date", token: "{{user.lastLogin}}" },
  ])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: template?.name || "",
      subject: template?.subject || "",
      content: template?.content || getDefaultTemplate(),
      description: template?.description || "",
      category: template?.category || "general",
      isDefault: template?.isDefault || false,
      enablePersonalization: template?.enablePersonalization || true,
      responsiveDesign: template?.responsiveDesign || true,
      darkModeSupport: template?.darkModeSupport || false,
      accessibilityLevel: template?.accessibilityLevel || "basic",
    },
  })

  // Calculate accessibility score based on form values
  useEffect(() => {
    const accessibilityLevel = form.watch("accessibilityLevel")
    const hasPersonalization = form.watch("enablePersonalization")
    const hasResponsiveDesign = form.watch("responsiveDesign")
    const hasDarkMode = form.watch("darkModeSupport")

    let score = 0

    if (accessibilityLevel === "basic") score += 30
    if (accessibilityLevel === "enhanced") score += 60
    if (accessibilityLevel === "full") score += 90

    if (hasResponsiveDesign) score += 5
    if (hasDarkMode) score += 3
    if (hasPersonalization) score += 2

    setAccessibilityScore(Math.min(score, 100))
  }, [
    form.watch("accessibilityLevel"),
    form.watch("enablePersonalization"),
    form.watch("responsiveDesign"),
    form.watch("darkModeSupport"),
  ])

  // Calculate spam score based on content
  useEffect(() => {
    const content = form.watch("content")
    const subject = form.watch("subject")

    if (content && subject) {
      // Simple spam score calculation
      const spamTriggers = ["free", "discount", "cash", "buy", "money", "urgent", "limited", "offer", "!"]
      let score = 0

      const combinedText = content.toLowerCase() + " " + subject.toLowerCase()

      spamTriggers.forEach((trigger) => {
        if (combinedText.includes(trigger)) {
          score += 5
        }
      })

      // Check for excessive capitalization
      const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length
      if (capsRatio > 0.3) {
        score += 20
      }

      // Check for image to text ratio (simplified)
      const imgCount = (content.match(/<img/g) || []).length
      if (imgCount > 5) {
        score += 10
      }

      setSpamScore(Math.min(score, 100))
    }
  }, [form.watch("content"), form.watch("subject")])

  // Generate template blocks for the gallery
  useEffect(() => {
    setTemplateBlocks([
      getHeaderBlock(),
      getHeroBlock(),
      getFeatureBlock(),
      getTestimonialBlock(),
      getCtaBlock(),
      getFooterBlock(),
    ])
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("name", values.name)
      formData.append("subject", values.subject)
      formData.append("content", values.content)
      formData.append("description", values.description || "")
      formData.append("category", values.category)
      formData.append("isDefault", values.isDefault.toString())
      formData.append("enablePersonalization", values.enablePersonalization.toString())
      formData.append("responsiveDesign", values.responsiveDesign.toString())
      formData.append("darkModeSupport", values.darkModeSupport.toString())
      formData.append("accessibilityLevel", values.accessibilityLevel)

      let result

      if (template?.id) {
        result = await updateEmailTemplate(template.id, formData)
      } else {
        result = await createEmailTemplate(formData)
      }

      if (result.success) {
        toast({
          title: template?.id ? "Template updated" : "Template created",
          description: template?.id
            ? "Your email template has been updated successfully."
            : "Your new email template has been created successfully.",
        })

        if (onSuccess) {
          onSuccess()
        } else {
          router.push("/admin/email/templates")
          router.refresh()
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to save the template. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving template:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleSendTestEmail() {
    if (!testEmailAddress) {
      toast({
        title: "Error",
        description: "Please enter an email address.",
        variant: "destructive",
      })
      return
    }

    setIsSendingTest(true)

    try {

      const result = await sendTestEmail({
        to: testEmailAddress,
        subject: form.getValues("subject"),
        content: form.getValues("content"),
        // Either remove templateName or update the sendTestEmail function type definition
      });
      // const result = await sendTestEmail({
      //   to: testEmailAddress,
      //   subject: form.getValues("subject"),
      //   content: form.getValues("content"),
      //   templateName: form.getValues("name"),
      // })

      if (result.success) {
        toast({
          title: "Test email sent",
          description: `A test email has been sent to ${testEmailAddress}.`,
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to send test email. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error sending test email:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSendingTest(false)
    }
  }

  function insertPersonalizationToken(token: string) {
    const currentContent = form.getValues("content")
    const updatedContent = currentContent + token
    form.setValue("content", updatedContent)
  }

  function generateAIContent() {
    setAiGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      const category = form.getValues("category")
      const aiGeneratedTemplate = getAIGeneratedTemplate(category)
      form.setValue("content", aiGeneratedTemplate)
      setAiGenerating(false)

      toast({
        title: "AI Content Generated",
        description: "Your template has been generated based on your category and settings.",
      })
    }, 2000)
  }

  function insertTemplateBlock(blockHtml: string) {
    const currentContent = form.getValues("content")
    const updatedContent = currentContent + blockHtml
    form.setValue("content", updatedContent)

    toast({
      title: "Block Added",
      description: "Template block has been added to your email content.",
    })
  }

  function applyColorPalette() {
    let content = form.getValues("content")

    // Replace color values in the content
    content = content.replace(/#007bff/g, colorPalette.primary)
    content = content.replace(/#6c757d/g, colorPalette.secondary)
    content = content.replace(/#28a745/g, colorPalette.accent)
    content = content.replace(/#ffffff/g, colorPalette.background)
    content = content.replace(/#333333/g, colorPalette.text)

    form.setValue("content", content)

    toast({
      title: "Colors Applied",
      description: "Your color palette has been applied to the template.",
    })
  }

  return (
    <Tabs defaultValue="design" className="w-full">
      <TabsList className="w-full mb-6">
        <TabsTrigger value="design" className="flex-1">
          Design
        </TabsTrigger>
        <TabsTrigger value="preview" className="flex-1">
          Preview
        </TabsTrigger>
        <TabsTrigger value="blocks" className="flex-1">
          Blocks
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex-1">
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="design">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Welcome Email" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">A descriptive name for your email template.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="welcome">Welcome</SelectItem>
                        <SelectItem value="newsletter">Newsletter</SelectItem>
                        <SelectItem value="promotional">Promotional</SelectItem>
                        <SelectItem value="transactional">Transactional</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs">
                      Categorize your template for better organization.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Welcome to our platform!" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    The subject line of the email. You can use variables like &#123;&#123;user.firstname&#125;&#125;.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A welcome email sent to new users when they sign up."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    A brief description of when and how this template is used.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 gap-1"
                onClick={generateAIContent}
                disabled={aiGenerating}
              >
                <Wand2 className="h-3.5 w-3.5" />
                <span>{aiGenerating ? "Generating..." : "Generate with AI"}</span>
              </Button>

              <Popover>
                <PopoverTrigger asChild>
                  <Button type="button" variant="outline" size="sm" className="h-8 gap-1">
                    <Palette className="h-3.5 w-3.5" />
                    <span>Color Palette</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm">Customize Colors</h4>
                    <div className="space-y-2">
                      <div className="grid grid-cols-5 gap-2 items-center">
                        <Label className="col-span-2 text-xs">Primary</Label>
                        <Input
                          type="color"
                          value={colorPalette.primary}
                          onChange={(e) => setColorPalette({ ...colorPalette, primary: e.target.value })}
                          className="col-span-2 h-8 p-1"
                        />
                        <div className="w-6 h-6 rounded" style={{ backgroundColor: colorPalette.primary }}></div>
                      </div>
                      <div className="grid grid-cols-5 gap-2 items-center">
                        <Label className="col-span-2 text-xs">Secondary</Label>
                        <Input
                          type="color"
                          value={colorPalette.secondary}
                          onChange={(e) => setColorPalette({ ...colorPalette, secondary: e.target.value })}
                          className="col-span-2 h-8 p-1"
                        />
                        <div className="w-6 h-6 rounded" style={{ backgroundColor: colorPalette.secondary }}></div>
                      </div>
                      <div className="grid grid-cols-5 gap-2 items-center">
                        <Label className="col-span-2 text-xs">Accent</Label>
                        <Input
                          type="color"
                          value={colorPalette.accent}
                          onChange={(e) => setColorPalette({ ...colorPalette, accent: e.target.value })}
                          className="col-span-2 h-8 p-1"
                        />
                        <div className="w-6 h-6 rounded" style={{ backgroundColor: colorPalette.accent }}></div>
                      </div>
                      <div className="grid grid-cols-5 gap-2 items-center">
                        <Label className="col-span-2 text-xs">Background</Label>
                        <Input
                          type="color"
                          value={colorPalette.background}
                          onChange={(e) => setColorPalette({ ...colorPalette, background: e.target.value })}
                          className="col-span-2 h-8 p-1"
                        />
                        <div
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: colorPalette.background }}
                        ></div>
                      </div>
                      <div className="grid grid-cols-5 gap-2 items-center">
                        <Label className="col-span-2 text-xs">Text</Label>
                        <Input
                          type="color"
                          value={colorPalette.text}
                          onChange={(e) => setColorPalette({ ...colorPalette, text: e.target.value })}
                          className="col-span-2 h-8 p-1"
                        />
                        <div className="w-6 h-6 rounded" style={{ backgroundColor: colorPalette.text }}></div>
                      </div>
                    </div>
                    <Button type="button" size="sm" className="w-full" onClick={applyColorPalette}>
                      Apply Colors
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button type="button" variant="outline" size="sm" className="h-8 gap-1">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Personalization</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {personalizationTokens.map((token, index) => (
                    <DropdownMenuItem key={index} onClick={() => insertPersonalizationToken(token.token)}>
                      <span>{token.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">{token.token}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog>
                <DialogTrigger asChild>
                  <Button type="button" variant="outline" size="sm" className="h-8 gap-1">
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Test</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send Test Email</DialogTitle>
                    <DialogDescription>
                      Send a test email to verify how your template looks in an email client.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="test-email">Email Address</Label>
                      <Input
                        id="test-email"
                        type="email"
                        placeholder="your@email.com"
                        value={testEmailAddress}
                        onChange={(e) => setTestEmailAddress(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Template Preview</Label>
                      <div className="border rounded-md p-3 max-h-[200px] overflow-y-auto">
                        <div className="text-sm font-medium mb-1">{form.getValues("subject")}</div>
                        <div
                          className="prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: form.getValues("content").substring(0, 300) + "..." }}
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setTestEmailAddress("")}>
                      Cancel
                    </Button>
                    <Button onClick={handleSendTestEmail} disabled={isSendingTest}>
                      {isSendingTest ? "Sending..." : "Send Test"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Content</FormLabel>
                  <Tabs defaultValue="editor" className="w-full">
                    <div className="overflow-x-auto -mx-2 px-2">
                      <TabsList className="mb-4 w-full sm:w-auto flex overflow-x-auto no-scrollbar">
                        <TabsTrigger value="editor" className="flex-shrink-0">
                          Visual Editor
                        </TabsTrigger>
                        <TabsTrigger value="html" className="flex-shrink-0">
                          HTML
                        </TabsTrigger>
                        <TabsTrigger value="preview" className="flex-shrink-0">
                          Preview
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent value="editor">
                      <FormControl>
                        <div className="border rounded-md overflow-hidden">
                          <Editor value={field.value} onChange={field.onChange} />
                        </div>
                      </FormControl>
                    </TabsContent>
                    <TabsContent value="html">
                      <FormControl>
                        <Textarea className="min-h-[300px] md:min-h-[400px] font-mono text-sm resize-none" {...field} />
                      </FormControl>
                    </TabsContent>
                    <TabsContent value="preview">
                      <div className="border rounded-md p-2 md:p-4 min-h-[300px] md:min-h-[400px] bg-white overflow-auto">
                        <div
                          className="prose max-w-none text-sm md:text-base"
                          dangerouslySetInnerHTML={{ __html: field.value }}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                  <FormDescription className="text-xs">The content of your email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 md:p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm md:text-base">Set as Default</FormLabel>
                      <FormDescription className="text-xs">
                        Make this the default template for its category.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enablePersonalization"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 md:p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm md:text-base">Enable Personalization</FormLabel>
                      <FormDescription className="text-xs">Allow dynamic content based on user data.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-4 pt-2">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto order-2 sm:order-1"
                onClick={() => {
                  if (onSuccess) {
                    onSuccess()
                  } else {
                    router.push("/admin/email/templates")
                  }
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto order-1 sm:order-2">
                {isSubmitting ? "Saving..." : template?.id ? "Update Template" : "Create Template"}
              </Button>
            </div>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="preview">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Email Preview</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className={cn("h-8", previewDevice === "mobile" && "bg-secondary")}
                onClick={() => setPreviewDevice("mobile")}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={cn("h-8", previewDevice === "tablet" && "bg-secondary")}
                onClick={() => setPreviewDevice("tablet")}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={cn("h-8", previewDevice === "desktop" && "bg-secondary")}
                onClick={() => setPreviewDevice("desktop")}
              >
                <Laptop className="h-4 w-4" />
              </Button>
              <div className="h-6 border-l mx-1"></div>
              <Button
                variant="outline"
                size="sm"
                className={cn("h-8", previewMode === "light" && "bg-secondary")}
                onClick={() => setPreviewMode("light")}
              >
                Light
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={cn("h-8", previewMode === "dark" && "bg-secondary")}
                onClick={() => setPreviewMode("dark")}
              >
                Dark
              </Button>
            </div>
          </div>

          <div
            className={cn(
              "border rounded-lg overflow-hidden mx-auto transition-all",
              previewMode === "dark" ? "bg-gray-900 text-white" : "bg-white",
              previewDevice === "mobile"
                ? "w-[320px] h-[568px]"
                : previewDevice === "tablet"
                  ? "w-[768px] h-[700px]"
                  : "w-full max-w-[1024px] h-[700px]",
            )}
          >
            <div className="border-b p-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="ml-4 text-xs text-center flex-1 truncate">{form.watch("subject") || "Email Subject"}</div>
            </div>
            <div className="p-4 overflow-auto h-[calc(100%-40px)]">
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: form.watch("content") }} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-medium mb-2">Spam Score</h4>
                <Progress
                  value={spamScore}
                  className={cn(
                    "h-2 mb-2",
                    "[&>div]:transition-all",
                    "[&>div]:" + (spamScore > 50 ? "bg-red-500" : spamScore > 20 ? "bg-yellow-500" : "bg-green-500")
                  )}
                  // className="h-2 mb-2"
                  // indicatorClassName={cn(
                  //   spamScore > 50 ? "bg-red-500" : spamScore > 20 ? "bg-yellow-500" : "bg-green-500",
                  // )}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low Risk</span>
                  <span>Medium Risk</span>
                  <span>High Risk</span>
                </div>

                {spamScore > 20 && (
                  <div className="mt-4 text-sm flex items-start gap-2">
                    <AlertTriangle
                      className={cn("h-4 w-4 mt-0.5", spamScore > 50 ? "text-red-500" : "text-yellow-500")}
                    />
                    <div>
                      <p className="font-medium">Potential spam triggers detected</p>
                      <p className="text-xs text-muted-foreground">
                        Your email contains elements that might trigger spam filters. Consider revising your content to
                        improve deliverability.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h4 className="font-medium mb-2">Accessibility Score</h4>
                <Progress
                  value={accessibilityScore}
                  className={cn(
                    "h-2 mb-2",
                    "[&>div]:transition-all",
                    "[&>div]:" + (spamScore > 50 ? "bg-red-500" : spamScore > 20 ? "bg-yellow-500" : "bg-green-500")
                  )}
                  // className="h-2 mb-2"
                  // indicatorClassName={cn(
                  //   accessibilityScore > 80 ? "bg-green-500" : accessibilityScore > 40 ? "bg-yellow-500" : "bg-red-500",
                  // )}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Poor</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        form.watch("responsiveDesign") ? "bg-green-500" : "bg-gray-300",
                      )}
                    ></div>
                    <span className="text-xs">Responsive Design</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        form.watch("darkModeSupport") ? "bg-green-500" : "bg-gray-300",
                      )}
                    ></div>
                    <span className="text-xs">Dark Mode Support</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        form.watch("enablePersonalization") ? "bg-green-500" : "bg-gray-300",
                      )}
                    ></div>
                    <span className="text-xs">Personalization</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        form.watch("accessibilityLevel") === "full"
                          ? "bg-green-500"
                          : form.watch("accessibilityLevel") === "enhanced"
                            ? "bg-yellow-500"
                            : "bg-gray-300",
                      )}
                    ></div>
                    <span className="text-xs">Screen Reader Support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="blocks">
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Template Blocks</h3>
          <p className="text-sm text-muted-foreground">
            Drag and drop these pre-designed blocks into your email template to quickly build professional emails.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templateBlocks.map((block, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-40 overflow-hidden border-b">
                  <div
                    className="prose max-w-none scale-[0.6] origin-top p-2"
                    dangerouslySetInnerHTML={{ __html: block }}
                  />
                </div>
                <CardContent className="p-3 flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {index === 0
                      ? "Header"
                      : index === 1
                        ? "Hero Section"
                        : index === 2
                          ? "Feature Block"
                          : index === 3
                            ? "Testimonial"
                            : index === 4
                              ? "Call to Action"
                              : "Footer"}
                  </span>
                  <Button size="sm" variant="outline" onClick={() => insertTemplateBlock(block)}>
                    Add
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="settings">
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Advanced Settings</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="responsiveDesign"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 md:p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm md:text-base">Responsive Design</FormLabel>
                    <FormDescription className="text-xs">
                      Optimize email display across all device sizes.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="darkModeSupport"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 md:p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm md:text-base">Dark Mode Support</FormLabel>
                    <FormDescription className="text-xs">
                      Add dark mode compatibility for email clients that support it.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="accessibilityLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Accessibility Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select accessibility level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="basic">Basic (Alt text for images)</SelectItem>
                    <SelectItem value="enhanced">Enhanced (Semantic HTML + Basic)</SelectItem>
                    <SelectItem value="full">Full (WCAG 2.1 AA Compliant)</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">
                  Choose the level of accessibility compliance for your email template.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-medium mb-4">Email Client Compatibility</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Gmail</span>
                    <span className="text-sm font-medium text-green-500">Excellent</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Outlook</span>
                    <span className="text-sm font-medium text-yellow-500">Good</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Apple Mail</span>
                    <span className="text-sm font-medium text-green-500">Excellent</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Yahoo Mail</span>
                    <span className="text-sm font-medium text-green-500">Excellent</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Mobile Email Apps</span>
                    <span className="text-sm font-medium text-green-500">Excellent</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}

function getDefaultTemplate() {
  const user = { firstname: "User" } // Define the user variable
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Email Template</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .content {
      padding: 20px;
      background-color: #ffffff;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #6c757d;
      border-radius: 0 0 5px 5px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Our Platform</h1>
    </div>
    <div class="content">
      <p>Hello ${user.firstname},</p>
      <p>Thank you for signing up! We're excited to have you on board.</p>
      <p>With our platform, you can:</p>
      <ul>
        <li>Automate Insta Dms</li>
        <li>Schedule IG posts</li>
        <li>Create content</li>
      </ul>
      <p>If you have any questions, feel free to reply to this email.</p>
      <a href="#" class="button">Get Started</a>
    </div>
    <div class="footer">
      <p>© 2025 Yazil. All rights reserved.</p>
      <p>00100 Main St, Nairobae, Kenya</p>
    </div>
  </div>
</body>
</html>
  `
}

// Helper functions for template blocks
function getHeaderBlock() {
  return `
<div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
  <img src="https://via.placeholder.com/150x50" alt="Company Logo" style="max-width: 150px;">
  <div style="margin-top: 10px;">
    <a href="#" style="color: #6c757d; text-decoration: none; margin: 0 10px;">Home</a>
    <a href="#" style="color: #6c757d; text-decoration: none; margin: 0 10px;">Products</a>
    <a href="#" style="color: #6c757d; text-decoration: none; margin: 0 10px;">Blog</a>
    <a href="#" style="color: #6c757d; text-decoration: none; margin: 0 10px;">Contact</a>
  </div>
</div>
  `
}

function getHeroBlock() {
  return `
<div style="background-color: #007bff; color: white; padding: 40px 20px; text-align: center;">
  <h1 style="margin: 0; font-size: 28px;">Welcome to Our Newsletter</h1>
  <p style="margin: 15px 0 25px;">Stay updated with the latest news and offers</p>
  <a href="#" style="display: inline-block; padding: 10px 20px; background-color: white; color: #007bff; text-decoration: none; border-radius: 5px; font-weight: bold;">Learn More</a>
</div>
  `
}

function getFeatureBlock() {
  return `
<div style="padding: 30px 20px; background-color: white;">
  <div style="display: inline-block; width: 30%; vertical-align: top; padding: 0 10px; text-align: center;">
    <img src="https://via.placeholder.com/80" alt="Feature 1" style="width: 80px; height: 80px;">
    <h3 style="margin: 15px 0 10px;">Feature One</h3>
    <p style="margin: 0; color: #6c757d; font-size: 14px;">A brief description of this amazing feature and how it benefits users.</p>
  </div>
  <div style="display: inline-block; width: 30%; vertical-align: top; padding: 0 10px; text-align: center;">
    <img src="https://via.placeholder.com/80" alt="Feature 2" style="width: 80px; height: 80px;">
    <h3 style="margin: 15px 0 10px;">Feature Two</h3>
    <p style="margin: 0; color: #6c757d; font-size: 14px;">A brief description of this amazing feature and how it benefits users.</p>
  </div>
  <div style="display: inline-block; width: 30%; vertical-align: top; padding: 0 10px; text-align: center;">
    <img src="https://via.placeholder.com/80" alt="Feature 3" style="width: 80px; height: 80px;">
    <h3 style="margin: 15px 0 10px;">Feature Three</h3>
    <p style="margin: 0; color: #6c757d; font-size: 14px;">A brief description of this amazing feature and how it benefits users.</p>
  </div>
</div>
  `
}

function getTestimonialBlock() {
  return `
<div style="padding: 30px 20px; background-color: #f8f9fa; text-align: center;">
  <img src="https://via.placeholder.com/100" alt="Customer" style="width: 100px; height: 100px; border-radius: 50%;">
  <p style="font-style: italic; margin: 20px 0; font-size: 16px; color: #333;">"This product has completely transformed how we work. The features are intuitive and the support team is amazing!"</p>
  <p style="margin: 0; font-weight: bold;">Jane Smith</p>
  <p style="margin: 5px 0 0; color: #6c757d; font-size: 14px;">CEO, Company Name</p>
</div>
  `
}

function getCtaBlock() {
  return `
<div style="padding: 40px 20px; background-color: #28a745; color: white; text-align: center;">
  <h2 style="margin: 0 0 15px; font-size: 24px;">Ready to Get Started?</h2>
  <p style="margin: 0 0 25px; font-size: 16px;">Join thousands of satisfied customers today.</p>
  <a href="#" style="display: inline-block; padding: 12px 30px; background-color: white; color: #28a745; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">Sign Up Now</a>
</div>
  `
}

function getFooterBlock() {
  return `
<div style="background-color: #343a40; color: white; padding: 30px 20px; text-align: center; border-radius: 0 0 5px 5px;">
  <div style="margin-bottom: 20px;">
    <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
    <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">Terms of Service</a>
    <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">Unsubscribe</a>
  </div>
  <div style="margin-bottom: 20px;">
    <a href="#" style="color: white; text-decoration: none; margin: 0 10px;"><img src="https://via.placeholder.com/20" alt="Facebook" style="width: 20px; height: 20px;"></a>
    <a href="#" style="color: white; text-decoration: none; margin: 0 10px;"><img src="https://via.placeholder.com/20" alt="Twitter" style="width: 20px; height: 20px;"></a>
    <a href="#" style="color: white; text-decoration: none; margin: 0 10px;"><img src="https://via.placeholder.com/20" alt="Instagram" style="width: 20px; height: 20px;"></a>
    <a href="#" style="color: white; text-decoration: none; margin: 0 10px;"><img src="https://via.placeholder.com/20" alt="LinkedIn" style="width: 20px; height: 20px;"></a>
  </div>
  <p style="margin: 0; font-size: 12px;">© 2025 Company Name. All rights reserved.</p>
  <p style="margin: 5px 0 0; font-size: 12px;">123 Street Name, City, Country</p>
</div>
  `
}

function getAIGeneratedTemplate(category: string) {
  // Generate different templates based on category
  switch (category) {
    case "welcome":
      return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Welcome to Our Platform</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .header {
      background-color: #007bff;
      padding: 30px 20px;
      text-align: center;
      color: white;
    }
    .content {
      padding: 30px 20px;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #6c757d;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #007bff;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      margin-top: 20px;
    }
    .feature {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    .feature-icon {
      width: 50px;
      height: 50px;
      background-color: #e9f5ff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      color: #007bff;
      font-size: 20px;
      font-weight: bold;
    }
    .social-links {
      margin-top: 20px;
    }
    .social-links a {
      display: inline-block;
      margin: 0 8px;
      color: #6c757d;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Our Platform, {{user.firstname}}!</h1>
      <p>We're thrilled to have you join us</p>
    </div>
    <div class="content">
      <p>Hello {{user.firstname}},</p>
      <p>Thank you for creating an account with us! We're excited to have you as part of our community.</p>
      
      <p>Here are a few things you can do to get started:</p>
      
      <div class="feature">
        <div class="feature-icon">1</div>
        <div>
          <strong>Complete your profile</strong>
          <p>Add your information to help us personalize your experience.</p>
        </div>
      </div>
      
      <div class="feature">
        <div class="feature-icon">2</div>
        <div>
          <strong>Explore our features</strong>
          <p>Discover all the powerful tools we offer to help you succeed.</p>
        </div>
      </div>
      
      <div class="feature">
        <div class="feature-icon">3</div>
        <div>
          <strong>Connect with others</strong>
          <p>Build your network and collaborate with like-minded individuals.</p>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="#" class="button">Get Started Now</a>
      </div>
      
      <p style="margin-top: 30px;">If you have any questions, feel free to reply to this email or contact our support team.</p>
      
      <p>Best regards,<br>The Team</p>
    </div>
    <div class="footer">
      <div class="social-links">
        <a href="#">Facebook</a> • 
        <a href="#">Twitter</a> • 
        <a href="#">Instagram</a> • 
        <a href="#">LinkedIn</a>
      </div>
      <p style="margin-top: 15px;">© 2025 Company Name. All rights reserved.</p>
      <p>123 Street Name, City, Country</p>
      <p style="margin-top: 15px; font-size: 11px;">
        You're receiving this email because you signed up for an account.<br>
        <a href="#" style="color: #6c757d;">Unsubscribe</a> or <a href="#" style="color: #6c757d;">manage email preferences</a>
      </p>
    </div>
  </div>
</body>
</html>
      `
    case "newsletter":
      return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Monthly Newsletter</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background-color: #28a745;
      padding: 20px;
      text-align: center;
      color: white;
    }
    .content {
      padding: 20px;
    }
    .article {
      margin-bottom: 30px;
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
    }
    .article:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }
    .article-image {
      width: 100%;
      height: auto;
      border-radius: 5px;
      margin-bottom: 15px;
    }
    .article-title {
      font-size: 20px;
      margin: 0 0 10px;
      color: #28a745;
    }
    .article-meta {
      font-size: 12px;
      color: #6c757d;
      margin-bottom: 10px;
    }
    .read-more {
      display: inline-block;
      color: #28a745;
      font-weight: bold;
      text-decoration: none;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #6c757d;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #28a745;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Monthly Newsletter</h1>
      <p>June 2025 Edition</p>
    </div>
    <div class="content">
      <p>Hello {{user.firstname}},</p>
      <p>Welcome to our June newsletter! Here's what's new this month:</p>
      
      <div class="article">
        <img src="https://via.placeholder.com/600x300" alt="Article Image" class="article-image">
        <h2 class="article-title">New Feature Release: AI-Powered Analytics</h2>
        <p class="article-meta">Posted on June 15, 2025 • 5 min read</p>
        <p>We're excited to announce our new AI-powered analytics dashboard that helps you gain deeper insights into your performance metrics...</p>
        <a href="#" class="read-more">Read More →</a>
      </div>
      
      <div class="article">
        <img src="https://via.placeholder.com/600x300" alt="Article Image" class="article-image">
        <h2 class="article-title">Customer Spotlight: How Company X Increased Conversions by 200%</h2>
        <p class="article-meta">Posted on June 10, 2025 • 8 min read</p>
        <p>Learn how Company X leveraged our platform to dramatically increase their conversion rates and streamline their workflow...</p>
        <a href="#" class="read-more">Read More →</a>
      </div>
      
      <div class="article">
        <img src="https://via.placeholder.com/600x300" alt="Article Image" class="article-image">
        <h2 class="article-title">Upcoming Webinar: Mastering Digital Marketing in 2025</h2>
        <p class="article-meta">June 28, 2025 • 2:00 PM EST</p>
        <p>Join our expert panel as they discuss the latest trends in digital marketing and share actionable strategies you can implement today...</p>
        <a href="#" class="button">Register Now</a>
      </div>
    </div>
    <div class="footer">
      <p>© 2025 Company Name. All rights reserved.</p>
      <p>123 Street Name, City, Country</p>
      <p style="margin-top: 15px;">
        <a href="#" style="color: #6c757d; margin: 0 5px;">Unsubscribe</a> • 
        <a href="#" style="color: #6c757d; margin: 0 5px;">View in Browser</a> • 
        <a href="#" style="color: #6c757d; margin: 0 5px;">Privacy Policy</a>
      </p>
    </div>
  </div>
</body>
</html>
      `
    case "promotional":
      return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Special Offer Inside!</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background-color: #dc3545;
      padding: 20px;
      text-align: center;
      color: white;
    }
    .content {
      padding: 20px;
    }
    .offer-box {
      border: 2px dashed #dc3545;
      padding: 20px;
      text-align: center;
      margin: 20px 0;
      background-color: #fff8f8;
    }
    .offer-code {
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 2px;
      color: #dc3545;
      padding: 10px;
      background-color: white;
      border: 1px solid #dc3545;
      display: inline-block;
      margin: 10px 0;
    }
    .countdown {
      font-size: 18px;
      font-weight: bold;
      color: #dc3545;
      margin: 15px 0;
    }
    .product {
      margin-bottom: 20px;
      padding: 15px;
      border: 1px solid #eee;
      border-radius: 5px;
    }
    .product-image {
      width: 100%;
      height: auto;
      margin-bottom: 10px;
      border-radius: 5px;
    }
    .product-title {
      font-size: 18px;
      margin: 0 0 5px;
    }
    .product-price {
      font-size: 16px;
      color: #dc3545;
      font-weight: bold;
    }
    .product-original-price {
      text-decoration: line-through;
      color: #6c757d;
      margin-right: 10px;
    }
    .button {
      display: inline-block;
      padding: 12px 25px;
      background-color: #dc3545;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      margin-top: 10px;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #6c757d;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>FLASH SALE</h1>
      <p>24 Hours Only - Up to 50% Off!</p>
    </div>
    <div class="content">
      <p>Hello {{user.firstname}},</p>
      <p>We're excited to offer you an exclusive discount on our most popular products. For the next 24 hours only, enjoy up to 50% off!</p>
      
      <div class="offer-box">
        <h2>EXCLUSIVE OFFER</h2>
        <p>Use this code at checkout:</p>
        <div class="offer-code">FLASH50</div>
        <p class="countdown">Offer ends in: 23:59:59</p>
        <a href="#" class="button">Shop Now</a>
      </div>
      
      <h2>Top Deals</h2>
      
      <div class="product">
        <img src="https://via.placeholder.com/600x300" alt="Product 1" class="product-image">
        <h3 class="product-title">Premium Product 1</h3>
        <p>The perfect solution for all your needs with advanced features and premium quality.</p>
        <p class="product-price">
          <span class="product-original-price">$199.99</span>
          $99.99
        </p>
        <a href="#" class="button">Buy Now</a>
      </div>
      
      <div class="product">
        <img src="https://via.placeholder.com/600x300" alt="Product 2" class="product-image">
        <h3 class="product-title">Premium Product 2</h3>
        <p>Our bestselling product now with enhanced capabilities and improved performance.</p>
        <p class="product-price">
          <span class="product-original-price">$149.99</span>
          $74.99
        </p>
        <a href="#" class="button">Buy Now</a>
      </div>
      
      <p style="text-align: center; margin-top: 30px;">
        <a href="#" class="button">View All Deals</a>
      </p>
    </div>
    <div class="footer">
      <p>© 2025 Company Name. All rights reserved.</p>
      <p>123 Street Name, City, Country</p>
      <p style="margin-top: 15px;">
        <a href="#" style="color: #6c757d; margin: 0 5px;">Unsubscribe</a> • 
        <a href="#" style="color: #6c757d; margin: 0 5px;">View in Browser</a> • 
        <a href="#" style="color: #6c757d; margin: 0 5px;">Privacy Policy</a>
      </p>
    </div>
  </div>
</body>
</html>
      `
    default:
      return getDefaultTemplate()
  }
}

