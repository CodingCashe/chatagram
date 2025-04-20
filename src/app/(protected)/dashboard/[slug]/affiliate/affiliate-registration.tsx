// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { useToast } from "@/hooks/use-toast"
// import { CheckCircle2 } from "lucide-react"
// import { registerAsAffiliate } from "@/actions/new-referral/referral-actions"

// interface AffiliateProgram {
//   id: string
//   name: string
//   description: string | null
//   commissionRate: number
//   cookieDuration: number
//   minimumPayout: number
// }

// interface AffiliateRegistrationProps {
//   userId: string
//   programs: AffiliateProgram[]
// }

// const formSchema = z.object({
//   programId: z.string({
//     required_error: "Please select a program",
//   }),
//   bio: z
//     .string()
//     .max(500, {
//       message: "Bio cannot be longer than 500 characters",
//     })
//     .optional(),
//   paymentMethod: z.enum(["paypal", "bank_transfer"], {
//     required_error: "Please select a payment method",
//   }),
//   paypalEmail: z.string().email().optional(),
//   bankName: z.string().optional(),
//   accountNumber: z.string().optional(),
//   routingNumber: z.string().optional(),
// })

// type FormValues = z.infer<typeof formSchema>

// export default function AffiliateRegistration({ userId, programs }: AffiliateRegistrationProps) {
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [isSuccess, setIsSuccess] = useState(false)
//   const router = useRouter()
//   const { toast } = useToast()

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       programId: programs[0]?.id || "",
//       bio: "",
//       paymentMethod: "paypal",
//       paypalEmail: "",
//       bankName: "",
//       accountNumber: "",
//       routingNumber: "",
//     },
//   })

//   const watchPaymentMethod = form.watch("paymentMethod")

//   const onSubmit = async (data: FormValues) => {
//     setIsSubmitting(true)

//     try {
//       // Get user data from session
//       const userResponse = await fetch("/api/user/me")
//       const userData = await userResponse.json()

//       if (!userData.success) {
//         throw new Error("Failed to fetch user data")
//       }

//       const { name, email } = userData.user

//       // Prepare payment details
//       const paymentDetails = {
//         paymentMethod: data.paymentMethod,
//         ...(data.paymentMethod === "paypal" && { paypalEmail: data.paypalEmail }),
//         ...(data.paymentMethod === "bank_transfer" && {
//           bankName: data.bankName,
//           accountNumber: data.accountNumber,
//           routingNumber: data.routingNumber,
//         }),
//       }

//       // Register as affiliate
//       const result = await registerAsAffiliate(data.programId, {
//         name,
//         email,
//         bio: data.bio,
//         paymentDetails,
//       })

//       if (result.success) {
//         setIsSuccess(true)
//         toast({
//           title: "Registration Successful",
//           description: "Your affiliate application has been submitted.",
//         })
//         setTimeout(() => {
//           router.refresh()
//         }, 2000)
//       } else {
//         toast({
//           title: "Registration Failed",
//           description: result.message || "Failed to register as affiliate.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error registering as affiliate:", error)
//       toast({
//         title: "Registration Error",
//         description: "An unexpected error occurred.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   if (isSuccess) {
//     return (
//       <div className="flex flex-col items-center justify-center py-8 text-center">
//         <div className="rounded-full bg-green-100 p-3 mb-4">
//           <CheckCircle2 className="h-8 w-8 text-green-600" />
//         </div>
//         <h3 className="text-xl font-semibold mb-2">Application Submitted!</h3>
//         <p className="text-muted-foreground max-w-md mb-6">
//           Your affiliate application has been submitted successfully. We&apos;ll review it shortly.
//         </p>
//         <Button onClick={() => router.refresh()}>Check Status</Button>
//       </div>
//     )
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         <FormField
//           control={form.control}
//           name="programId"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Select Affiliate Program</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a program" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {programs.map((program) => (
//                     <SelectItem key={program.id} value={program.id}>
//                       {program.name} - {program.commissionRate}% Commission
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormDescription>Choose the affiliate program you want to join</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="bio"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Bio (Optional)</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Tell us a bit about yourself and how you plan to promote our products..."
//                   className="min-h-24 resize-none"
//                   {...field}
//                 />
//               </FormControl>
//               <FormDescription>This helps us understand your promotional strategy</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="paymentMethod"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Payment Method</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select payment method" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="paypal">PayPal</SelectItem>
//                   <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormDescription>How you would like to receive your commissions</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {watchPaymentMethod === "paypal" && (
//           <FormField
//             control={form.control}
//             name="paypalEmail"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>PayPal Email</FormLabel>
//                 <FormControl>
//                   <input
//                     type="email"
//                     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                     placeholder="your-email@example.com"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormDescription>The email address associated with your PayPal account</FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         )}

//         {watchPaymentMethod === "bank_transfer" && (
//           <>
//             <FormField
//               control={form.control}
//               name="bankName"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Bank Name</FormLabel>
//                   <FormControl>
//                     <input
//                       className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                       placeholder="Bank of America"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="grid grid-cols-2 gap-4">
//               <FormField
//                 control={form.control}
//                 name="accountNumber"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Account Number</FormLabel>
//                     <FormControl>
//                       <input
//                         className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                         placeholder="123456789"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="routingNumber"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Routing Number</FormLabel>
//                     <FormControl>
//                       <input
//                         className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                         placeholder="987654321"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </>
//         )}

//         <div className="border-t pt-6">
//           <Button type="submit" className="w-full" disabled={isSubmitting}>
//             {isSubmitting ? "Submitting..." : "Apply to Become an Affiliate"}
//           </Button>
//         </div>
//       </form>
//     </Form>
//   )
// }

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle2 } from "lucide-react"
import { registerAsAffiliate } from "@/actions/new-referral/referral-actions"

interface AffiliateProgram {
  id: string
  name: string
  description: string | null
  commissionRate: number
  cookieDuration: number
  minimumPayout: number
}

interface AffiliateRegistrationProps {
  userId: string
  programs: AffiliateProgram[]
}

const formSchema = z.object({
  programId: z.string({
    required_error: "Please select a program",
  }),
  bio: z
    .string()
    .max(500, {
      message: "Bio cannot be longer than 500 characters",
    })
    .optional(),
  paymentMethod: z.enum(["paypal", "bank_transfer"], {
    required_error: "Please select a payment method",
  }),
  paypalEmail: z.string().email().optional(),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  routingNumber: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function AffiliateRegistration({ userId, programs }: AffiliateRegistrationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      programId: programs[0]?.id || "",
      bio: "",
      paymentMethod: "paypal",
      paypalEmail: "",
      bankName: "",
      accountNumber: "",
      routingNumber: "",
    },
  })

  const watchPaymentMethod = form.watch("paymentMethod")

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      // Get user data from session - THIS IS THE PROBLEMATIC PART
      const userResponse = await fetch("/api/user/me")
      const userData = await userResponse.json()

      if (!userData.success) {
        throw new Error("Failed to fetch user data")
      }

      const { name, email } = userData.user

      // Prepare payment details
      const paymentDetails = {
        paymentMethod: data.paymentMethod,
        ...(data.paymentMethod === "paypal" && { paypalEmail: data.paypalEmail }),
        ...(data.paymentMethod === "bank_transfer" && {
          bankName: data.bankName,
          accountNumber: data.accountNumber,
          routingNumber: data.routingNumber,
        }),
      }

      // Register as affiliate
      const result = await registerAsAffiliate(data.programId, {
        name,
        email,
        bio: data.bio,
        paymentDetails,
      })

      if (result.success) {
        setIsSuccess(true)
        toast({
          title: "Registration Successful",
          description: "Your affiliate application has been submitted.",
        })
        setTimeout(() => {
          router.refresh()
        }, 4000)
      } else {
        toast({
          title: "Registration Failed",
          description: result.message || "Failed to register as affiliate.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error registering as affiliate:", error)
      toast({
        title: "Registration Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="rounded-full bg-green-100 p-3 mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Application Submitted!</h3>
        <p className="text-muted-foreground max-w-md mb-6">
          Your affiliate application has been submitted successfully. We will review it shortly.
        </p>
        <Button onClick={() => router.refresh()}>Check Status</Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="programId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Affiliate Program</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a program" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {programs.map((program) => (
                    <SelectItem key={program.id} value={program.id}>
                      {program.name} - {program.commissionRate}% Commission
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Choose the affiliate program you want to join</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a bit about yourself and how you plan to promote our products..."
                  className="min-h-24 resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>This helps us understand your promotional strategy</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>How you would like to receive your commissions</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchPaymentMethod === "paypal" && (
          <FormField
            control={form.control}
            name="paypalEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PayPal Email</FormLabel>
                <FormControl>
                  <input
                    type="email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="your-email@example.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>The email address associated with your PayPal account</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {watchPaymentMethod === "bank_transfer" && (
          <>
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Bank of America"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="123456789"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="routingNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Routing Number</FormLabel>
                    <FormControl>
                      <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="987654321"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        <div className="border-t pt-6">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Apply to Become an Affiliate"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

