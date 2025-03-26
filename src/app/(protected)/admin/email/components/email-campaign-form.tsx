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
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

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
  testEmail: z.string().email().optional(),
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
      testEmail: "",
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
            description: result.error || "Failed to load templates",
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
      }

      if (values.testEmail) {
        formData.append("testEmail", values.testEmail)
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
          description: result.error || "Failed to create campaign",
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

  return (
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
              <FormLabel>Email Subject</FormLabel>
              <FormControl>
                <Input placeholder="Check out our summer deals!" {...field} />
              </FormControl>
              <FormDescription className="text-xs">
                The subject line of the email. This will override the template&apos;s subject.
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
                  <FormDescription className="text-xs">Send this email to all users in your database.</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="scheduleForLater"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 md:p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-sm md:text-base">Schedule for later</FormLabel>
                  <FormDescription className="text-xs">
                    Schedule this campaign to be sent at a later time.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {watchScheduleForLater && (
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
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
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
        )}

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
  )
}

