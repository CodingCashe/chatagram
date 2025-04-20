// "use client"

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
// import { toast } from "@/hooks/use-toast"
// import { createEmailCampaign, getEmailTemplates } from "../../actions/email-actions"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { CalendarIcon } from "lucide-react"
// import { format } from "date-fns"
// import { cn } from "@/lib/utils"

// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Name must be at least 2 characters.",
//   }),
//   subject: z.string().min(2, {
//     message: "Subject must be at least 2 characters.",
//   }),
//   templateId: z.string().min(1, {
//     message: "Please select a template.",
//   }),
//   description: z.string().optional(),
//   sendToAll: z.boolean().default(false),
//   scheduleForLater: z.boolean().default(false),
//   scheduledDate: z.date().optional().nullable(),
//   testEmail: z.string().email().optional(),
// })

// export function EmailCampaignForm({
//   campaign,
//   onSuccess,
// }: {
//   campaign?: any
//   onSuccess?: () => void
// }) {
//   const router = useRouter()
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [templates, setTemplates] = useState<any[]>([])
//   const [loadingTemplates, setLoadingTemplates] = useState(true)

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: campaign?.name || "",
//       subject: campaign?.subject || "",
//       templateId: campaign?.templateId || "",
//       description: campaign?.description || "",
//       sendToAll: campaign?.sendToAll || false,
//       scheduleForLater: campaign?.scheduledDate ? true : false,
//       scheduledDate: campaign?.scheduledDate ? new Date(campaign.scheduledDate) : null,
//       testEmail: "",
//     },
//   })

//   useEffect(() => {
//     async function loadTemplates() {
//       setLoadingTemplates(true)
//       try {
//         const result = await getEmailTemplates()
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
//         setLoadingTemplates(false)
//       }
//     }

//     loadTemplates()
//   }, [])

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setIsSubmitting(true)

//     try {
//       const formData = new FormData()
//       formData.append("name", values.name)
//       formData.append("subject", values.subject)
//       formData.append("templateId", values.templateId)
//       formData.append("description", values.description || "")
//       formData.append("sendToAll", values.sendToAll.toString())
//       formData.append("scheduleForLater", values.scheduleForLater.toString())

//       if (values.scheduleForLater && values.scheduledDate) {
//         formData.append("scheduledDate", values.scheduledDate.toISOString())
//       }

//       if (values.testEmail) {
//         formData.append("testEmail", values.testEmail)
//       }

//       const result = await createEmailCampaign(formData)

//       if (result.success) {
//         toast({
//           title: "Campaign created",
//           description: "Your email campaign has been created successfully.",
//         })

//         if (onSuccess) {
//           onSuccess()
//         } else {
//           router.push("/admin/email/campaigns")
//           router.refresh()
//         }
//       } else {
//         toast({
//           title: "Error",
//           description: result.error || "Failed to create campaign",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error creating campaign:", error)
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const watchScheduleForLater = form.watch("scheduleForLater")

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Campaign Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Summer Newsletter" {...field} />
//                 </FormControl>
//                 <FormDescription>A descriptive name for your email campaign.</FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="templateId"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email Template</FormLabel>
//                 <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loadingTemplates}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder={loadingTemplates ? "Loading templates..." : "Select a template"} />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {templates.map((template) => (
//                       <SelectItem key={template.id} value={template.id}>
//                         {template.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormDescription>Select the email template to use for this campaign.</FormDescription>
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
//                 <Input placeholder="Check out our summer deals!" {...field} />
//               </FormControl>
//               <FormDescription>
//                 The subject line of the email. This will override the template&quote;s subject.
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
//                 <Textarea placeholder="Summer newsletter to announce our new products." {...field} />
//               </FormControl>
//               <FormDescription>A brief description of this campaign for your reference.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <FormField
//             control={form.control}
//             name="sendToAll"
//             render={({ field }) => (
//               <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                 <div className="space-y-0.5">
//                   <FormLabel className="text-base">Send to all users</FormLabel>
//                   <FormDescription>Send this email to all users in your database.</FormDescription>
//                 </div>
//                 <FormControl>
//                   <Switch checked={field.value} onCheckedChange={field.onChange} />
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="scheduleForLater"
//             render={({ field }) => (
//               <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                 <div className="space-y-0.5">
//                   <FormLabel className="text-base">Schedule for later</FormLabel>
//                   <FormDescription>Schedule this campaign to be sent at a later time.</FormDescription>
//                 </div>
//                 <FormControl>
//                   <Switch checked={field.value} onCheckedChange={field.onChange} />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//         </div>

//         {watchScheduleForLater && (
//           <FormField
//             control={form.control}
//             name="scheduledDate"
//             render={({ field }) => (
//               <FormItem className="flex flex-col">
//                 <FormLabel>Scheduled Date</FormLabel>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <FormControl>
//                       <Button
//                         variant={"outline"}
//                         className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
//                       >
//                         {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
//                         <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                       </Button>
//                     </FormControl>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-auto p-0" align="start">
//                     <Calendar
//                       mode="single"
//                       selected={field.value || undefined}
//                       onSelect={field.onChange}
//                       disabled={(date) => date < new Date()}
//                       initialFocus
//                     />
//                   </PopoverContent>
//                 </Popover>
//                 <FormDescription>Select the date when you want this campaign to be sent.</FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         )}

//         <FormField
//           control={form.control}
//           name="testEmail"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Test Email (Optional)</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="your-email@example.com" {...field} />
//               </FormControl>
//               <FormDescription>Send a test email to this address before sending to all users.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div className="flex justify-end gap-4">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => {
//               if (onSuccess) {
//                 onSuccess()
//               } else {
//                 router.push("/admin/email/campaigns")
//               }
//             }}
//           >
//             Cancel
//           </Button>
//           <Button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? "Creating..." : "Create Campaign"}
//           </Button>
//         </div>
//       </form>
//     </Form>
//   )
// }

// "use client"

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
// import { toast } from "@/hooks/use-toast"
// import { createEmailCampaign, getEmailTemplates } from "../../actions/email-actions"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { CalendarIcon } from "lucide-react"
// import { format } from "date-fns"
// import { cn } from "@/lib/utils"

// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Name must be at least 2 characters.",
//   }),
//   subject: z.string().min(2, {
//     message: "Subject must be at least 2 characters.",
//   }),
//   templateId: z.string().min(1, {
//     message: "Please select a template.",
//   }),
//   description: z.string().optional(),
//   sendToAll: z.boolean().default(false),
//   scheduleForLater: z.boolean().default(false),
//   scheduledDate: z.date().optional().nullable(),
//   testEmail: z.string().email().optional(),
// })

// export function EmailCampaignForm({
//   campaign,
//   onSuccess,
// }: {
//   campaign?: any
//   onSuccess?: () => void
// }) {
//   const router = useRouter()
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [templates, setTemplates] = useState<any[]>([])
//   const [loadingTemplates, setLoadingTemplates] = useState(true)

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: campaign?.name || "",
//       subject: campaign?.subject || "",
//       templateId: campaign?.templateId || "",
//       description: campaign?.description || "",
//       sendToAll: campaign?.sendToAll || false,
//       scheduleForLater: campaign?.scheduledDate ? true : false,
//       scheduledDate: campaign?.scheduledDate ? new Date(campaign.scheduledDate) : null,
//       testEmail: "",
//     },
//   })

//   useEffect(() => {
//     async function loadTemplates() {
//       setLoadingTemplates(true)
//       try {
//         const result = await getEmailTemplates()
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
//         setLoadingTemplates(false)
//       }
//     }

//     loadTemplates()
//   }, [])

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setIsSubmitting(true)

//     try {
//       const formData = new FormData()
//       formData.append("name", values.name)
//       formData.append("subject", values.subject)
//       formData.append("templateId", values.templateId)
//       formData.append("description", values.description || "")
//       formData.append("sendToAll", values.sendToAll.toString())
//       formData.append("scheduleForLater", values.scheduleForLater.toString())

//       if (values.scheduleForLater && values.scheduledDate) {
//         formData.append("scheduledDate", values.scheduledDate.toISOString())
//       }

//       if (values.testEmail) {
//         formData.append("testEmail", values.testEmail)
//       }

//       const result = await createEmailCampaign(formData)

//       if (result.success) {
//         toast({
//           title: "Campaign created",
//           description: "Your email campaign has been created successfully.",
//         })

//         if (onSuccess) {
//           onSuccess()
//         } else {
//           router.push("/admin/email/campaigns")
//           router.refresh()
//         }
//       } else {
//         toast({
//           title: "Error",
//           description: result.error || "Failed to create campaign",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error creating campaign:", error)
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const watchScheduleForLater = form.watch("scheduleForLater")

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6 overflow-y-auto">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Campaign Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Summer Newsletter" {...field} />
//                 </FormControl>
//                 <FormDescription className="text-xs">A descriptive name for your email campaign.</FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="templateId"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email Template</FormLabel>
//                 <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loadingTemplates}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder={loadingTemplates ? "Loading templates..." : "Select a template"} />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {templates.map((template) => (
//                       <SelectItem key={template.id} value={template.id}>
//                         {template.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormDescription className="text-xs">
//                   Select the email template to use for this campaign.
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
//                 <Input placeholder="Check out our summer deals!" {...field} />
//               </FormControl>
//               <FormDescription className="text-xs">
//                 The subject line of the email. This will override the template&apos;s subject.
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
//                   placeholder="Summer newsletter to announce our new products."
//                   className="resize-none"
//                   rows={3}
//                   {...field}
//                 />
//               </FormControl>
//               <FormDescription className="text-xs">
//                 A brief description of this campaign for your reference.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <FormField
//             control={form.control}
//             name="sendToAll"
//             render={({ field }) => (
//               <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 md:p-4">
//                 <div className="space-y-0.5">
//                   <FormLabel className="text-sm md:text-base">Send to all users</FormLabel>
//                   <FormDescription className="text-xs">Send this email to all users in your database.</FormDescription>
//                 </div>
//                 <FormControl>
//                   <Switch checked={field.value} onCheckedChange={field.onChange} />
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="scheduleForLater"
//             render={({ field }) => (
//               <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 md:p-4">
//                 <div className="space-y-0.5">
//                   <FormLabel className="text-sm md:text-base">Schedule for later</FormLabel>
//                   <FormDescription className="text-xs">
//                     Schedule this campaign to be sent at a later time.
//                   </FormDescription>
//                 </div>
//                 <FormControl>
//                   <Switch checked={field.value} onCheckedChange={field.onChange} />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//         </div>

//         {watchScheduleForLater && (
//           <FormField
//             control={form.control}
//             name="scheduledDate"
//             render={({ field }) => (
//               <FormItem className="flex flex-col">
//                 <FormLabel>Scheduled Date</FormLabel>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <FormControl>
//                       <Button
//                         variant={"outline"}
//                         className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
//                       >
//                         {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
//                         <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                       </Button>
//                     </FormControl>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-auto p-0" align="start">
//                     <Calendar
//                       mode="single"
//                       selected={field.value || undefined}
//                       onSelect={field.onChange}
//                       disabled={(date) => date < new Date()}
//                       initialFocus
//                     />
//                   </PopoverContent>
//                 </Popover>
//                 <FormDescription className="text-xs">
//                   Select the date when you want this campaign to be sent.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         )}

//         <FormField
//           control={form.control}
//           name="testEmail"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Test Email (Optional)</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="your-email@example.com" {...field} />
//               </FormControl>
//               <FormDescription className="text-xs">
//                 Send a test email to this address before sending to all users.
//               </FormDescription>
//               <FormMessage />
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
//                 router.push("/admin/email/campaigns")
//               }
//             }}
//           >
//             Cancel
//           </Button>
//           <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto order-1 sm:order-2">
//             {isSubmitting ? "Creating..." : "Create Campaign"}
//           </Button>
//         </div>
//       </form>
//     </Form>
//   )
// }

"use client"

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
import { toast } from "@/hooks/use-toast"
import { createEmailCampaign, getEmailTemplates } from "../../actions/email-actions"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  CalendarIcon,
  Clock,
  Smartphone,
  Laptop,
  Tablet,
  Wand2,
  Target,
  AlertTriangle,
  Sparkles,
  UserPlus,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progres"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Send } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  templateId: z.string().min(1, {
    message: "Please select a template.",
  }),
  description: z.string().optional(),
  sendToAll: z.boolean().default(false),
  scheduleForLater: z.boolean().default(false),
  scheduledDate: z.date().optional().nullable(),
  scheduledTime: z.string().optional(),
  testEmail: z.string().email().optional(),
  audienceSegment: z.string().default("all"),
  enableABTesting: z.boolean().default(false),
  subjectLineB: z.string().optional(),
  sendingStrategy: z.enum(["immediate", "optimal", "scheduled"]).default("immediate"),
  personalizeContent: z.boolean().default(false),
})

export function EmailCampaignForm({
  campaign,
  onSuccess,
}: {
  campaign?: any
  onSuccess?: () => void
}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [templates, setTemplates] = useState<any[]>([])
  const [loadingTemplates, setLoadingTemplates] = useState(true)
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "desktop" | "tablet">("desktop")
  const [spamScore, setSpamScore] = useState(0)
  const [deliverabilityScore, setDeliverabilityScore] = useState(0)
  const [subjectSuggestions, setSubjectSuggestions] = useState<string[]>([])
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false)
  const [audienceReach, setAudienceReach] = useState(0)
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [previewMode, setPreviewMode] = useState<"light" | "dark">("light")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: campaign?.name || "",
      subject: campaign?.subject || "",
      templateId: campaign?.templateId || "",
      description: campaign?.description || "",
      sendToAll: campaign?.sendToAll || false,
      scheduleForLater: campaign?.scheduledDate ? true : false,
      scheduledDate: campaign?.scheduledDate ? new Date(campaign.scheduledDate) : null,
      scheduledTime: campaign?.scheduledTime || "09:00",
      testEmail: "",
      audienceSegment: "all",
      enableABTesting: false,
      subjectLineB: "",
      sendingStrategy: "immediate",
      personalizeContent: false,
    },
  })

  useEffect(() => {
    async function loadTemplates() {
      setLoadingTemplates(true)
      try {
        const result = await getEmailTemplates()
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
        setLoadingTemplates(false)
      }
    }

    loadTemplates()
  }, [])

  // Simulate spam score calculation when subject changes
  useEffect(() => {
    const subject = form.watch("subject")
    if (subject) {
      // Simple spam score calculation based on common spam triggers
      const spamTriggers = ["free", "discount", "cash", "buy", "money", "urgent", "limited", "offer", "!"]
      let score = 0

      spamTriggers.forEach((trigger) => {
        if (subject.toLowerCase().includes(trigger)) {
          score += 10
        }
      })

      // Add score for ALL CAPS words
      if (subject.match(/[A-Z]{3,}/)) {
        score += 15
      }

      // Add score for multiple exclamation marks
      if (subject.match(/!{2,}/)) {
        score += 20
      }

      setSpamScore(Math.min(score, 100))
      setDeliverabilityScore(Math.max(100 - score, 0))
    }
  }, [form.watch("subject")])

  // Calculate audience reach based on segment
  useEffect(() => {
    const segment = form.watch("audienceSegment")

    // Simulate audience reach calculation
    setTimeout(() => {
      switch (segment) {
        case "all":
          setAudienceReach(5280)
          break
        case "active":
          setAudienceReach(3450)
          break
        case "inactive":
          setAudienceReach(1830)
          break
        case "new":
          setAudienceReach(720)
          break
        default:
          setAudienceReach(0)
      }
    }, 300)
  }, [form.watch("audienceSegment")])

  async function generateSubjectSuggestions() {
    setIsGeneratingSuggestions(true)

    // Simulate AI-generated subject line suggestions
    setTimeout(() => {
      const campaignName = form.watch("name")
      const suggestions = [
        `Don't miss our latest ${campaignName} updates!`,
        `[New] Exciting changes to our ${campaignName}`,
        `${campaignName}: Exclusive offer inside`,
        `We've got something special for you: ${campaignName}`,
        `${campaignName} - See what's new this week`,
      ]
      setSubjectSuggestions(suggestions)
      setIsGeneratingSuggestions(false)
    }, 1500)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("name", values.name)
      formData.append("subject", values.subject)
      formData.append("templateId", values.templateId)
      formData.append("description", values.description || "")
      formData.append("sendToAll", values.sendToAll.toString())
      formData.append("scheduleForLater", values.scheduleForLater.toString())

      if (values.scheduleForLater && values.scheduledDate) {
        formData.append("scheduledDate", values.scheduledDate.toISOString())
        formData.append("scheduledTime", values.scheduledTime || "09:00")
      }

      if (values.testEmail) {
        formData.append("testEmail", values.testEmail)
      }

      // Add new fields
      formData.append("audienceSegment", values.audienceSegment)
      formData.append("enableABTesting", values.enableABTesting.toString())
      formData.append("sendingStrategy", values.sendingStrategy)
      formData.append("personalizeContent", values.personalizeContent.toString())

      if (values.enableABTesting && values.subjectLineB) {
        formData.append("subjectLineB", values.subjectLineB)
      }

      const result = await createEmailCampaign(formData)

      if (result.success) {
        toast({
          title: "Campaign created",
          description: "Your email campaign has been created successfully.",
        })

        if (onSuccess) {
          onSuccess()
        } else {
          router.push("/admin/email/campaigns")
          router.refresh()
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to create campaign",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating campaign:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const watchScheduleForLater = form.watch("scheduleForLater")
  const watchEnableABTesting = form.watch("enableABTesting")
  const watchSendingStrategy = form.watch("sendingStrategy")
  const watchTemplateId = form.watch("templateId")
  const selectedTemplate = templates.find((t) => t.id === watchTemplateId)

  return (
    <Tabs defaultValue="compose" className="w-full">
      <TabsList className="w-full mb-6">
        <TabsTrigger value="compose" className="flex-1">
          Compose
        </TabsTrigger>
        <TabsTrigger value="preview" className="flex-1">
          Preview
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex-1">
          Analytics
        </TabsTrigger>
        <TabsTrigger value="audience" className="flex-1">
          Audience
        </TabsTrigger>
      </TabsList>

      <TabsContent value="compose">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campaign Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Summer Newsletter" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">A descriptive name for your email campaign.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="templateId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Template</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loadingTemplates}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={loadingTemplates ? "Loading templates..." : "Select a template"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs">
                      Select the email template to use for this campaign.
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
                  <div className="flex items-center justify-between">
                    <FormLabel>Email Subject</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 gap-1"
                      onClick={generateSubjectSuggestions}
                      disabled={isGeneratingSuggestions}
                    >
                      <Wand2 className="h-3.5 w-3.5" />
                      <span>{isGeneratingSuggestions ? "Generating..." : "Generate Ideas"}</span>
                    </Button>
                  </div>
                  <FormControl>
                    <Input placeholder="Check out our summer deals!" {...field} />
                  </FormControl>

                  {subjectSuggestions.length > 0 && (
                    <div className="mt-2 space-y-2">
                      <p className="text-xs font-medium">AI-generated suggestions:</p>
                      <div className="flex flex-wrap gap-2">
                        {subjectSuggestions.map((suggestion, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="cursor-pointer hover:bg-secondary transition-colors"
                            onClick={() => form.setValue("subject", suggestion)}
                          >
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-2">
                    <FormDescription className="text-xs">
                      The subject line of the email. This will override the template&apos;s subject.
                    </FormDescription>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-xs font-medium",
                          spamScore > 70 ? "text-red-500" : spamScore > 30 ? "text-amber-500" : "text-green-500",
                        )}
                      >
                        Spam Score: {spamScore}%
                      </span>
                      {spamScore > 30 && (
                        <AlertTriangle
                          className={cn("h-3.5 w-3.5", spamScore > 70 ? "text-red-500" : "text-amber-500")}
                        />
                      )}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchEnableABTesting && (
              <FormField
                control={form.control}
                name="subjectLineB"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alternative Subject Line (A/B Test)</FormLabel>
                    <FormControl>
                      <Input placeholder="Alternative subject line for A/B testing" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      This alternative subject will be sent to a portion of your audience to test performance.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Summer newsletter to announce our new products."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    A brief description of this campaign for your reference.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sendToAll"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 md:p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm md:text-base">Send to all users</FormLabel>
                      <FormDescription className="text-xs">
                        Send this email to all users in your database.
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
                name="enableABTesting"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 md:p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm md:text-base">Enable A/B Testing</FormLabel>
                      <FormDescription className="text-xs">
                        Test different subject lines to optimize open rates.
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
              name="sendingStrategy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sending Strategy</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <Label
                        htmlFor="immediate"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <RadioGroupItem value="immediate" id="immediate" className="sr-only" />
                        <div className="flex flex-col items-center gap-2">
                          <Send className="h-5 w-5" />
                          <span className="font-medium">Send Immediately</span>
                        </div>
                        <span className="text-xs text-center text-muted-foreground mt-2">
                          Send to all recipients as soon as campaign is created
                        </span>
                      </Label>
                      <Label
                        htmlFor="optimal"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <RadioGroupItem value="optimal" id="optimal" className="sr-only" />
                        <div className="flex flex-col items-center gap-2">
                          <Sparkles className="h-5 w-5" />
                          <span className="font-medium">Optimal Time</span>
                        </div>
                        <span className="text-xs text-center text-muted-foreground mt-2">
                          AI determines best time to send based on user activity
                        </span>
                      </Label>
                      <Label
                        htmlFor="scheduled"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <RadioGroupItem value="scheduled" id="scheduled" className="sr-only" />
                        <div className="flex flex-col items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          <span className="font-medium">Schedule</span>
                        </div>
                        <span className="text-xs text-center text-muted-foreground mt-2">
                          Set a specific date and time to send the campaign
                        </span>
                      </Label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchSendingStrategy === "scheduled" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="scheduledDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Scheduled Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription className="text-xs">
                        Select the date when you want this campaign to be sent.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="scheduledTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Scheduled Time</FormLabel>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <FormDescription className="text-xs">Select the time in your local timezone.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="audienceSegment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Audience Segment</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience segment" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">
                        All Users ({audienceReach > 0 ? audienceReach.toLocaleString() : "Loading..."})
                      </SelectItem>
                      <SelectItem value="active">Active Users (Last 30 days)</SelectItem>
                      <SelectItem value="inactive">Inactive Users (No activity in 30+ days)</SelectItem>
                      <SelectItem value="new">New Users (Joined in last 7 days)</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center justify-between mt-1">
                    <FormDescription className="text-xs">
                      Target specific user segments for better engagement.
                    </FormDescription>
                    <Badge variant="outline" className="text-xs">
                      Reach: {audienceReach.toLocaleString()} users
                    </Badge>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="personalizeContent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 md:p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm md:text-base">Personalize Content</FormLabel>
                    <FormDescription className="text-xs">
                      Automatically personalize content based on user data (name, preferences, etc.)
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
              name="testEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test Email (Optional)</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your-email@example.com" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Send a test email to this address before sending to all users.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-4 pt-2">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto order-2 sm:order-1"
                onClick={() => {
                  if (onSuccess) {
                    onSuccess()
                  } else {
                    router.push("/admin/email/campaigns")
                  }
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto order-1 sm:order-2">
                {isSubmitting ? "Creating..." : "Create Campaign"}
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
              {selectedTemplate ? (
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedTemplate.content }} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                  <p>Select a template to preview your email</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="analytics">
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Campaign Analytics Prediction</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{deliverabilityScore}%</div>
                  <p className="text-sm text-muted-foreground">Predicted Deliverability</p>
                </div>
                <Progress
                  value={deliverabilityScore}
                  className="mt-2"
                  indicatorClassName={cn(
                    deliverabilityScore > 80
                      ? "bg-green-500"
                      : deliverabilityScore > 50
                        ? "bg-yellow-500"
                        : "bg-red-500",
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">24.5%</div>
                  <p className="text-sm text-muted-foreground">Estimated Open Rate</p>
                </div>
                <Progress value={24.5} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">3.8%</div>
                  <p className="text-sm text-muted-foreground">Estimated Click Rate</p>
                </div>
                <Progress value={3.8 * 10} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-4">Optimization Suggestions</h4>
            <ul className="space-y-2">
              {spamScore > 30 && (
                <li className="flex items-start gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                  <span>Your subject line contains words that might trigger spam filters. Consider revising.</span>
                </li>
              )}
              {!form.watch("personalizeContent") && (
                <li className="flex items-start gap-2 text-sm">
                  <UserPlus className="h-4 w-4 text-blue-500 mt-0.5" />
                  <span>Enable personalization to increase engagement by up to 26%.</span>
                </li>
              )}
              {form.watch("sendingStrategy") === "immediate" && (
                <li className="flex items-start gap-2 text-sm">
                  <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
                  <span>Consider using &ldquot;Optimal&ldquot; Time sending to improve open rates by 15-23%.</span>
                </li>
              )}
              {!form.watch("enableABTesting") && (
                <li className="flex items-start gap-2 text-sm">
                  <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                  <span>Enable A/B testing to optimize your campaign performance.</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="audience">
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Audience Insights</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-medium mb-4">Audience Breakdown</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Active Users</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Inactive Users</span>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">New Users (Last 7 days)</span>
                      <span className="text-sm font-medium">12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h4 className="font-medium mb-4">Device Usage</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Mobile</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Desktop</span>
                      <span className="text-sm font-medium">27%</span>
                    </div>
                    <Progress value={27} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Tablet</span>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                    <Progress value={5} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Best Time to Send</h4>
                  <Badge variant="outline">Based on user activity</Badge>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div key={day} className="text-center">
                      <div className="font-medium text-sm mb-2">{day}</div>
                      <div className="space-y-1">
                        {["9AM", "12PM", "3PM", "6PM", "9PM"].map((time) => {
                          // Randomly generate activity levels for demo
                          const activity = Math.floor(Math.random() * 100)
                          return (
                            <div
                              key={`${day}-${time}`}
                              className={cn(
                                "h-6 rounded-sm",
                                activity > 75
                                  ? "bg-green-500"
                                  : activity > 50
                                    ? "bg-green-300"
                                    : activity > 25
                                      ? "bg-gray-300"
                                      : "bg-gray-100",
                              )}
                              title={`${activity}% activity at ${time} on ${day}`}
                            />
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                    <span>High Activity</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
                    <span>Medium Activity</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-300 rounded-sm"></div>
                    <span>Low Activity</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
                    <span>Very Low Activity</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

