// 'use client'

// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import * as z from 'zod'
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { createNewBusiness } from '@/actions/businfo'
// import { ErrorMessage } from './errorMessage'
// import { useToast } from "@/hooks/use-toast"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// export const FormSchema = z.object({
//   id: z.string().optional(),
//   businessName: z.string().min(1, { message: 'Business name is required' }),
//   businessType: z.string().min(1, { message: 'Business type is required' }),
//   businessDescription: z.string().min(10, { message: 'Description must be at least 10 characters' }),
//   industry: z.string().min(1, { message: 'Industry is required' }),
//   instagramHandle: z.string().min(1, { message: 'Instagram handle is required' }),
//   welcomeMessage: z.string().min(1, { message: 'Welcome message is required' }),
//   responseLanguage: z.string().min(1, { message: 'Response language is required' }),
//   businessHours: z.string().min(1, { message: 'Business hours are required' }),
//   promotionMessage: z.string().min(1, { message: 'Promotion message is required' }),
//   autoReplyEnabled: z.boolean().default(false),
// })

// export type FormSchema = z.infer<typeof FormSchema>

// interface BusinessFormProps {
//   onBusinessCreated: (newBusiness: FormSchema) => void
// }

// function BusinessForm({ onBusinessCreated }: BusinessFormProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const { register, handleSubmit, formState: { errors } } = useForm<FormSchema>({
//     resolver: zodResolver(FormSchema),
//   })
//   const { toast } = useToast()

//   const onSubmit = async (data: FormSchema) => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const result = await createNewBusiness(data)
//       if (result.status === 200 && result.res) {
//         toast({
//           title: "Success",
//           description: "Business information submitted successfully!",
//         })
//         // Convert the result to match FormSchema
//         const newBusiness: FormSchema = {
//           id: result.res.id,
//           businessName: data.businessName,
//           businessType: data.businessType,
//           businessDescription: data.businessDescription,
//           industry: data.industry,
//           instagramHandle: data.instagramHandle,
//           welcomeMessage: data.welcomeMessage,
//           responseLanguage: data.responseLanguage,
//           businessHours: data.businessHours,
//           promotionMessage: data.promotionMessage,
//           autoReplyEnabled: data.autoReplyEnabled,
//         }
//         onBusinessCreated(newBusiness)
//       } else {
//         setError(result.data || 'An unknown error occurred')
//         toast({
//           title: "Error",
//           description: result.data || "Failed to submit business information. Please try again.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error('Error creating business:', error)
//       setError('An unexpected error occurred')
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <div>
//         <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Business Name</label>
//         <Input id="businessName" {...register('businessName')} className="mt-1" />
//         <ErrorMessage error={errors.businessName} />
//       </div>
//       <div>
//         <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">Business Type</label>
//         <Input id="businessType" {...register('businessType')} className="mt-1" />
//         <ErrorMessage error={errors.businessType} />
//       </div>
//       <div>
//         <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700">Business Description</label>
//         <Textarea id="businessDescription" {...register('businessDescription')} className="mt-1" />
//         <ErrorMessage error={errors.businessDescription} />
//       </div>
//       <div>
//         <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
//         <Input id="industry" {...register('industry')} className="mt-1" />
//         <ErrorMessage error={errors.industry} />
//       </div>
//       <div>
//         <label htmlFor="instagramHandle" className="block text-sm font-medium text-gray-700">Instagram Handle</label>
//         <Input id="instagramHandle" {...register('instagramHandle')} className="mt-1" />
//         <ErrorMessage error={errors.instagramHandle} />
//       </div>
//       <div>
//         <label htmlFor="welcomeMessage" className="block text-sm font-medium text-gray-700">Welcome Message</label>
//         <Textarea id="welcomeMessage" {...register('welcomeMessage')} className="mt-1" />
//         <ErrorMessage error={errors.welcomeMessage} />
//       </div>
//       <div>
//         <label htmlFor="responseLanguage" className="block text-sm font-medium text-gray-700">Response Language</label>
//         <Input id="responseLanguage" {...register('responseLanguage')} className="mt-1" />
//         <ErrorMessage error={errors.responseLanguage} />
//       </div>
//       <div>
//         <label htmlFor="businessHours" className="block text-sm font-medium text-gray-700">Business Hours</label>
//         <Input id="businessHours" {...register('businessHours')} className="mt-1" />
//         <ErrorMessage error={errors.businessHours} />
//       </div>
//       <div>
//         <label htmlFor="promotionMessage" className="block text-sm font-medium text-gray-700">Promotion Message</label>
//         <Textarea id="promotionMessage" {...register('promotionMessage')} className="mt-1" />
//         <ErrorMessage error={errors.promotionMessage} />
//       </div>
//       <div className="flex items-center">
//         <Input type="checkbox" id="autoReplyEnabled" {...register('autoReplyEnabled')} className="mr-2" />
//         <label htmlFor="autoReplyEnabled" className="text-sm font-medium text-gray-700">Auto Reply Enabled</label>
//       </div>
//       {error && (
//         <Alert variant="destructive">
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}
//       <Button type="submit" disabled={isLoading}>
//         {isLoading ? 'Submitting...' : 'Submit'}
//       </Button>
//     </form>
//   )
// }

// export default BusinessForm

// 'use client'

// import { useState } from 'react'
// import { useForm, Controller } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import * as z from 'zod'
// import { motion } from 'framer-motion'
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { createNewBusiness } from '@/actions/businfo'
// import { useToast } from "@/hooks/use-toast"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// export const FormSchema = z.object({
//   id: z.string().optional(),
//   businessName: z.string().min(1, { message: 'Business name is required' }),
//   businessType: z.string().min(1, { message: 'Business type is required' }),
//   businessDescription: z.string().min(10, { message: 'Description must be at least 10 characters' }),
//   industry: z.string().min(1, { message: 'Industry is required' }),
//   instagramHandle: z.string().min(1, { message: 'Instagram handle is required' }),
//   welcomeMessage: z.string().min(1, { message: 'Welcome message is required' }),
//   responseLanguage: z.string().min(1, { message: 'Response language is required' }),
//   businessHours: z.string().min(1, { message: 'Business hours are required' }),
//   promotionMessage: z.string().min(1, { message: 'Promotion message is required' }),
//   autoReplyEnabled: z.boolean().default(false),
// })

// export type FormSchema = z.infer<typeof FormSchema>

// interface BusinessFormProps {
//   onBusinessCreated: (newBusiness: FormSchema) => void
// }

// const businessTypes = ['Retail', 'Service', 'Manufacturing', 'Tech']
// const industries = ['Fashion', 'Food', 'Technology', 'Healthcare']
// const languages = ['English', 'Spanish', 'French', 'German']

// function BusinessForm({ onBusinessCreated }: BusinessFormProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const { control, handleSubmit, formState: { errors } } = useForm<FormSchema>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       autoReplyEnabled: false,
//     },
//   })
//   const { toast } = useToast()

//   const onSubmit = async (data: FormSchema) => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const result = await createNewBusiness(data)
//       if (result.status === 200 && result.res) {
//         toast({
//           title: "Success",
//           description: "Business information submitted successfully!",
//         })
//         onBusinessCreated(data)
//       } else {
//         setError(result.data || 'An unknown error occurred')
//         toast({
//           title: "Error",
//           description: result.data || "Failed to submit business information. Please try again.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error('Error creating business:', error)
//       setError('An unexpected error occurred')
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <Card className="w-full max-w-2xl mx-auto">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-center">Create Your Business Profile</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Label htmlFor="businessName">Business Name</Label>
//             <Controller
//               name="businessName"
//               control={control}
//               render={({ field }) => (
//                 <Input id="businessName" {...field} className="mt-1" placeholder="Enter your business name" />
//               )}
//             />
//             {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//           >
//             <Label htmlFor="businessType">Business Type</Label>
//             <Controller
//               name="businessType"
//               control={control}
//               render={({ field }) => (
//                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                   <SelectTrigger className="mt-1">
//                     <SelectValue placeholder="Select business type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {businessTypes.map((type) => (
//                       <SelectItem key={type} value={type}>{type}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//             {errors.businessType && <p className="text-red-500 text-sm mt-1">{errors.businessType.message}</p>}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <Label htmlFor="businessDescription">Business Description</Label>
//             <Controller
//               name="businessDescription"
//               control={control}
//               render={({ field }) => (
//                 <Textarea id="businessDescription" {...field} className="mt-1" placeholder="Describe your business" />
//               )}
//             />
//             {errors.businessDescription && <p className="text-red-500 text-sm mt-1">{errors.businessDescription.message}</p>}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <Label htmlFor="industry">Industry</Label>
//             <Controller
//               name="industry"
//               control={control}
//               render={({ field }) => (
//                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                   <SelectTrigger className="mt-1">
//                     <SelectValue placeholder="Select industry" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {industries.map((industry) => (
//                       <SelectItem key={industry} value={industry}>{industry}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//             {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             <Label htmlFor="instagramHandle">Instagram Handle</Label>
//             <Controller
//               name="instagramHandle"
//               control={control}
//               render={({ field }) => (
//                 <Input id="instagramHandle" {...field} className="mt-1" placeholder="@yourbusiness" />
//               )}
//             />
//             {errors.instagramHandle && <p className="text-red-500 text-sm mt-1">{errors.instagramHandle.message}</p>}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//           >
//             <Label htmlFor="welcomeMessage">Welcome Message</Label>
//             <Controller
//               name="welcomeMessage"
//               control={control}
//               render={({ field }) => (
//                 <Textarea id="welcomeMessage" {...field} className="mt-1" placeholder="Enter a welcoming message for your customers" />
//               )}
//             />
//             {errors.welcomeMessage && <p className="text-red-500 text-sm mt-1">{errors.welcomeMessage.message}</p>}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//           >
//             <Label htmlFor="responseLanguage">Response Language</Label>
//             <Controller
//               name="responseLanguage"
//               control={control}
//               render={({ field }) => (
//                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                   <SelectTrigger className="mt-1">
//                     <SelectValue placeholder="Select language" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {languages.map((lang) => (
//                       <SelectItem key={lang} value={lang}>{lang}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//             {errors.responseLanguage && <p className="text-red-500 text-sm mt-1">{errors.responseLanguage.message}</p>}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.7 }}
//           >
//             <Label htmlFor="businessHours">Business Hours</Label>
//             <Controller
//               name="businessHours"
//               control={control}
//               render={({ field }) => (
//                 <Input id="businessHours" {...field} className="mt-1" placeholder="e.g., Mon-Fri: 9AM-5PM" />
//               )}
//             />
//             {errors.businessHours && <p className="text-red-500 text-sm mt-1">{errors.businessHours.message}</p>}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.8 }}
//           >
//             <Label htmlFor="promotionMessage">Promotion Message</Label>
//             <Controller
//               name="promotionMessage"
//               control={control}
//               render={({ field }) => (
//                 <Textarea id="promotionMessage" {...field} className="mt-1" placeholder="Enter your promotional message" />
//               )}
//             />
//             {errors.promotionMessage && <p className="text-red-500 text-sm mt-1">{errors.promotionMessage.message}</p>}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.9 }}
//             className="flex items-center space-x-2"
//           >
//             <Controller
//               name="autoReplyEnabled"
//               control={control}
//               render={({ field }) => (
//                 <Switch
//                   id="autoReplyEnabled"
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               )}
//             />
//             <Label htmlFor="autoReplyEnabled">Enable Auto Reply</Label>
//           </motion.div>

//           {error && (
//             <Alert variant="destructive">
//               <AlertTitle>Error</AlertTitle>
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 1 }}
//           >
//             <Button type="submit" disabled={isLoading} className="w-full">
//               {isLoading ? 'Submitting...' : 'Create Business Profile'}
//             </Button>
//           </motion.div>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

// export default BusinessForm

// 'use client'

// import { useState } from 'react'
// import { useForm, Controller } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import * as z from 'zod'
// import { motion } from 'framer-motion'
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { createNewBusiness } from '@/actions/businfo'
// import { useToast } from "@/hooks/use-toast"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Sparkles } from 'lucide-react'

// export const FormSchema = z.object({
//   id: z.string().optional(),
//   businessName: z.string().min(1, { message: 'Business name is required' }),
//   businessType: z.string().min(1, { message: 'Business type is required' }),
//   businessDescription: z.string().min(10, { message: 'Description must be at least 10 characters' }),
//   industry: z.string().min(1, { message: 'Industry is required' }),
//   instagramHandle: z.string().min(1, { message: 'Instagram handle is required' }),
//   welcomeMessage: z.string().min(1, { message: 'Welcome message is required' }),
//   responseLanguage: z.string().min(1, { message: 'Response language is required' }),
//   businessHours: z.string().min(1, { message: 'Business hours are required' }),
//   promotionMessage: z.string().min(1, { message: 'Promotion message is required' }),
//   autoReplyEnabled: z.boolean().default(false),
// })

// export type FormSchema = z.infer<typeof FormSchema>

// interface BusinessFormProps {
//   onBusinessCreated: (newBusiness: FormSchema) => void
// }

// const businessTypes = ['Retail', 'Service', 'Manufacturing', 'Tech']
// const industries = ['Fashion', 'Food', 'Technology', 'Healthcare']
// const languages = ['English', 'Spanish', 'French', 'German']

// function BusinessForm({ onBusinessCreated }: BusinessFormProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const { control, handleSubmit, formState: { errors } } = useForm<FormSchema>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       autoReplyEnabled: false,
//     },
//   })
//   const { toast } = useToast()

//   const onSubmit = async (data: FormSchema) => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const result = await createNewBusiness(data)
//       if (result.status === 200 && result.res) {
//         toast({
//           title: "Success",
//           description: "Business information submitted successfully!",
//         })
//         onBusinessCreated(data)
//       } else {
//         setError(result.data || 'An unknown error occurred')
//         toast({
//           title: "Error",
//           description: result.data || "Failed to submit business information. Please try again.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error('Error creating business:', error)
//       setError('An unexpected error occurred')
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <Card className="w-full max-w-2xl mx-auto bg-gray-900 text-gray-100 shadow-xl">
//       <CardHeader className="relative overflow-hidden">
//         <motion.div
//           className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-50"
//           animate={{
//             scale: [1, 1.05, 1],
//             rotate: [0, 1, 0],
//           }}
//           transition={{
//             duration: 5,
//             repeat: Infinity,
//             repeatType: "reverse",
//           }}
//         />
//         <CardTitle className="text-3xl font-bold text-center relative z-10">
//           <Sparkles className="inline-block mr-2 text-yellow-400" />
//           Create Your Business Profile
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Label htmlFor="businessName" className="text-gray-300">Business Name</Label>
//             <Controller
//               name="businessName"
//               control={control}
//               render={({ field }) => (
//                 <Input id="businessName" {...field} className="mt-1 bg-gray-800 text-white border-gray-700" placeholder="Enter your business name" />
//               )}
//             />
//             {errors.businessName && <p className="text-red-400 text-sm mt-1">{errors.businessName.message}</p>}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//           >
//             <Label htmlFor="businessType" className="text-gray-300">Business Type</Label>
//             <Controller
//               name="businessType"
//               control={control}
//               render={({ field }) => (
//                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                   <SelectTrigger className="mt-1 bg-gray-800 text-white border-gray-700">
//                     <SelectValue placeholder="Select business type" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-gray-800 text-white border-gray-700">
//                     {businessTypes.map((type) => (
//                       <SelectItem key={type} value={type}>{type}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//             {errors.businessType && <p className="text-red-400 text-sm mt-1">{errors.businessType.message}</p>}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <Label htmlFor="businessDescription" className="text-gray-300">Business Description</Label>
//             <Controller
//               name="businessDescription"
//               control={control}
//               render={({ field }) => (
//                 <Textarea id="businessDescription" {...field} className="mt-1 bg-gray-800 text-white border-gray-700" placeholder="Describe your business" />
//               )}
//             />
//             {errors.businessDescription && <p className="text-red-400 text-sm mt-1">{errors.businessDescription.message}</p>}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <Label htmlFor="industry" className="text-gray-300">Industry</Label>
//             <Controller
//               name="industry"
//               control={control}
//               render={({ field }) => (
//                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                   <SelectTrigger className="mt-1 bg-gray-800 text-white border-gray-700">
//                     <SelectValue placeholder="Select industry" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-gray-800 text-white border-gray-700">
//                     {industries.map((industry) => (
//                       <SelectItem key={industry} value={industry}>{industry}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//             {errors.industry && <p className="text-red-400 text-sm mt-1">{errors.industry.message}</p>}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             <Label htmlFor="instagramHandle" className="text-gray-300">Instagram Handle</Label>
//             <Controller
//               name="instagramHandle"
//               control={control}
//               render={({ field }) => (
//                 <Input id="instagramHandle" {...field} className="mt-1 bg-gray-800 text-white border-gray-700" placeholder="@yourbusiness" />
//               )}
//             />
//             {errors.instagramHandle && <p className="text-red-400 text-sm mt-1">{errors.instagramHandle.message}</p>}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//           >
//             <Label htmlFor="welcomeMessage" className="text-gray-300">Welcome Message</Label>
//             <Controller
//               name="welcomeMessage"
//               control={control}
//               render={({ field }) => (
//                 <Textarea id="welcomeMessage" {...field} className="mt-1 bg-gray-800 text-white border-gray-700" placeholder="Enter a welcoming message for your customers" />
//               )}
//             />
//             {errors.welcomeMessage && <p className="text-red-400 text-sm mt-1">{errors.welcomeMessage.message}</p>}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//           >
//             <Label htmlFor="responseLanguage" className="text-gray-300">Response Language</Label>
//             <Controller
//               name="responseLanguage"
//               control={control}
//               render={({ field }) => (
//                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                   <SelectTrigger className="mt-1 bg-gray-800 text-white border-gray-700">
//                     <SelectValue placeholder="Select language" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-gray-800 text-white border-gray-700">
//                     {languages.map((lang) => (
//                       <SelectItem key={lang} value={lang}>{lang}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//             {errors.responseLanguage && <p className="text-red-400 text-sm mt-1">{errors.responseLanguage.message}</p>}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.7 }}
//           >
//             <Label htmlFor="businessHours" className="text-gray-300">Business Hours</Label>
//             <Controller
//               name="businessHours"
//               control={control}
//               render={({ field }) => (
//                 <Input id="businessHours" {...field} className="mt-1 bg-gray-800 text-white border-gray-700" placeholder="e.g., Mon-Fri: 9AM-5PM" />
//               )}
//             />
//             {errors.businessHours && <p className="text-red-400 text-sm mt-1">{errors.businessHours.message}</p>}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.8 }}
//           >
//             <Label htmlFor="promotionMessage" className="text-gray-300">Promotion Message</Label>
//             <Controller
//               name="promotionMessage"
//               control={control}
//               render={({ field }) => (
//                 <Textarea id="promotionMessage" {...field} className="mt-1 bg-gray-800 text-white border-gray-700" placeholder="Enter your promotional message" />
//               )}
//             />
//             {errors.promotionMessage && <p className="text-red-400 text-sm mt-1">{errors.promotionMessage.message}</p>}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.9 }}
//             className="flex items-center space-x-2"
//           >
//             <Controller
//               name="autoReplyEnabled"
//               control={control}
//               render={({ field }) => (
//                 <Switch
//                   id="autoReplyEnabled"
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               )}
//             />
//             <Label htmlFor="autoReplyEnabled" className="text-gray-300">Enable Auto Reply</Label>
//           </motion.div>

//           {error && (
//             <Alert variant="destructive">
//               <AlertTitle>Error</AlertTitle>
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 1 }}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
//               {isLoading ? 'Creating...' : 'Create Business Profile'}
//             </Button>
//           </motion.div>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

// export default BusinessForm

'use client'

import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { createNewBusiness } from '@/actions/businfo'
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Loader2 } from 'lucide-react'

export const FormSchema = z.object({
  id: z.string().optional(),
  businessName: z.string().min(1, { message: 'Business name is required' }),
  website: z.string().min(1, { message: 'Website url required' }),
  targetAudience: z.string().min(1, { message: 'target audience required' }),
  businessType: z.string().min(1, { message: 'Business type is required' }),
  businessDescription: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  industry: z.string().min(1, { message: 'Industry is required' }),
  instagramHandle: z.string().min(1, { message: 'Instagram handle is required' }),
  welcomeMessage: z.string().min(1, { message: 'Welcome message is required' }),
  responseLanguage: z.string().min(1, { message: 'Response language is required' }),
  businessHours: z.string().min(1, { message: 'Business hours are required' }),
  promotionMessage: z.string().min(1, { message: 'Promotion message is required' }),
  autoReplyEnabled: z.boolean().default(false),
})

export type FormSchema = z.infer<typeof FormSchema>

interface BusinessFormProps {
  onBusinessCreated: (newBusiness: FormSchema) => void
}

const businessTypes = ['Retail', 'Service', 'Manufacturing', 'Tech']
const industries = ['Fashion', 'Food', 'Technology', 'Healthcare']
const languages = ['English', 'Spanish', 'French', 'German']

function BusinessForm({ onBusinessCreated }: BusinessFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      autoReplyEnabled: false,
    },
  })
  const { toast } = useToast()

  const formSteps = [
    ['businessName', 'businessType', 'industry'],
    ['businessDescription', 'instagramHandle'],
    ['welcomeMessage', 'responseLanguage', 'businessHours'],
    ['promotionMessage', 'autoReplyEnabled'],
    ['targetAudience', 'website'],
  ]

  const onSubmit = async (data: FormSchema) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await createNewBusiness(data)
      if (result.status === 200 && result.res) {
        toast({
          title: "Success",
          description: "Business information submitted successfully!",
        })
        onBusinessCreated(data)
      } else {
        setError(result.data || 'An unknown error occurred')
        toast({
          title: "Error",
          description: result.data || "Failed to submit business information. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error creating business:', error)
      setError('An unexpected error occurred')
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = ((currentStep + 1) / formSteps.length) * 100

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gray-900 text-gray-100 shadow-xl overflow-hidden">
      <CardHeader className="relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <CardTitle className="text-3xl font-bold text-center relative z-10 py-4">
          <Sparkles className="inline-block mr-2 text-yellow-400" />
          Create Your Business Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div
            className="h-2 bg-gray-700 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {formSteps[currentStep].map((field) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4"
                >
                  <Label htmlFor={field} className="text-gray-300">{field}</Label>
                  <Controller
                    name={field as keyof FormSchema}
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      if (field === 'businessType' || field === 'industry' || field === 'responseLanguage') {
                        return (
                          <Select onValueChange={onChange} value={value as string}>
                            <SelectTrigger className="mt-1 bg-gray-800 text-white border-gray-700">
                              <SelectValue placeholder={`Select ${field}`} />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 text-white border-gray-700">
                              {(field === 'businessType' ? businessTypes :
                                field === 'industry' ? industries :
                                languages).map((option) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )
                      } else if (field === 'businessDescription' || field === 'website' || field === 'targetAudience' || field === 'welcomeMessage' || field === 'promotionMessage') {
                        return (
                          <Textarea
                            id={field}
                            value={value as string}
                            onChange={onChange}
                            className="mt-1 bg-gray-800 text-white border-gray-700"
                            placeholder={`Enter your ${field}`}
                          />
                        )
                      } else if (field === 'autoReplyEnabled') {
                        return (
                          <div className="flex items-center space-x-2 mt-1">
                            <Switch
                              id={field}
                              checked={value as boolean}
                              onCheckedChange={onChange}
                            />
                            <Label htmlFor={field} className="text-gray-300">Enable Auto Reply</Label>
                          </div>
                        )
                      } else {
                        return (
                          <Input
                            id={field}
                            value={value as string}
                            onChange={onChange}
                            className="mt-1 bg-gray-800 text-white border-gray-700"
                            placeholder={`Enter your ${field}`}
                          />
                        )
                      }
                    }}
                  />
                  {errors[field as keyof FormSchema] && (
                    <p className="text-red-400 text-sm mt-1">{errors[field as keyof FormSchema]?.message}</p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-6">
            <Button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="bg-gray-700 hover:bg-gray-600"
            >
              Previous
            </Button>
            {currentStep < formSteps.length - 1 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                {isLoading ? 'Creating...' : 'Create Business Profile'}
              </Button>
            )}
          </div>
        </form>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

export default BusinessForm

