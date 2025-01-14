// 'use client'

// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { useForm, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import * as z from 'zod'
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { DragDropToggle } from '@/components/global/businessInfo/dragDrop'
// import { createBusiness } from '@/lib/businessinfo'

// const formSchema = z.object({
//   businessName: z.string().min(1, 'Business name is required'),
//   businessType: z.enum(['Retail', 'Service', 'E-Commerce', 'Agency']),
//   businessDescription: z.string().min(10, 'Description must be at least 10 characters'),
//   industry: z.enum(['Fashion', 'Beauty', 'Technology', 'Health', 'Food']),
//   instagramHandle: z.string().min(1, 'Instagram handle is required'),
//   welcomeMessage: z.string().min(1, 'Welcome message is required'),
//   responseLanguage: z.enum(['English', 'Spanish', 'French', 'German', 'Other']),
//   businessHours: z.string().min(1, 'Business hours are required'),
//   autoReplyEnabled: z.boolean(),
//   promotionMessage: z.string().min(1, 'Promotion message is required'),
// })

// type FormSchema = z.infer<typeof formSchema>;

// const ErrorMessage = ({ error }: { error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined }) => {
//   if (!error) return null;
//   return <p className="mt-1 text-xs text-red-500">{error.message as React.ReactNode}</p>;
// };

// export function BusinessInfoForm() {
//   const [autoReplyEnabled, setAutoReplyEnabled] = useState(false)
//   const { register, handleSubmit, formState: { errors } } = useForm<FormSchema>({
//     resolver: zodResolver(formSchema),
//   })

//   const onSubmit = async (data: any) => {
//     try {
//       const result = await createBusiness(data)
//       console.log('Business created:', result)
//       // Handle success (e.g., show a success message, redirect, etc.)
//     } catch (error) {
//       console.error('Error creating business:', error)
//       // Handle error (e.g., show an error message)
//     }
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-4xl mx-auto p-8 bg-gray-900 rounded-xl shadow-2xl text-gray-100"
//     >
//       <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
//         Business Information Form
//       </h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium mb-1" htmlFor="businessName">
//               Business Name
//             </label>
//             <Input
//               id="businessName"
//               {...register('businessName')}
//               className="w-full bg-gray-800 text-white"
//               placeholder="Enter your business name"
//             />
//             <ErrorMessage error={errors.businessName as FieldError} />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1" htmlFor="businessType">
//               Business Type
//             </label>
//             <Select {...register('businessType')}>
//               <SelectTrigger className="w-full bg-gray-800 text-white">
//                 <SelectValue placeholder="Select business type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Retail">Retail</SelectItem>
//                 <SelectItem value="Service">Service</SelectItem>
//                 <SelectItem value="E-Commerce">E-Commerce</SelectItem>
//                 <SelectItem value="Agency">Agency</SelectItem>
//               </SelectContent>
//             </Select>
//             <ErrorMessage error={errors.businessType as FieldError} />
//           </div>
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1" htmlFor="businessDescription">
//             Business Description
//           </label>
//           <Textarea
//             id="businessDescription"
//             {...register('businessDescription')}
//             className="w-full bg-gray-800 text-white"
//             placeholder="Describe your business"
//             rows={4}
//           />
//           <ErrorMessage error={errors.businessDescription as FieldError} />
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium mb-1" htmlFor="industry">
//               Industry
//             </label>
//             <Select {...register('industry')}>
//               <SelectTrigger className="w-full bg-gray-800 text-white">
//                 <SelectValue placeholder="Select industry" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Fashion">Fashion</SelectItem>
//                 <SelectItem value="Beauty">Beauty</SelectItem>
//                 <SelectItem value="Technology">Technology</SelectItem>
//                 <SelectItem value="Health">Health</SelectItem>
//                 <SelectItem value="Food">Food</SelectItem>
//               </SelectContent>
//             </Select>
//             <ErrorMessage error={errors.industry as FieldError} />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1" htmlFor="instagramHandle">
//               Instagram Handle
//             </label>
//             <Input
//               id="instagramHandle"
//               {...register('instagramHandle')}
//               className="w-full bg-gray-800 text-white"
//               placeholder="@yourbusiness"
//             />
//             <ErrorMessage error={errors.instagramHandle as FieldError} />
//           </div>
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1" htmlFor="welcomeMessage">
//             Welcome Message
//           </label>
//           <Textarea
//             id="welcomeMessage"
//             {...register('welcomeMessage')}
//             className="w-full bg-gray-800 text-white"
//             placeholder="Enter your welcome message"
//             rows={3}
//           />
//           <ErrorMessage error={errors.welcomeMessage as FieldError} />
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium mb-1" htmlFor="responseLanguage">
//               Response Language
//             </label>
//             <Select {...register('responseLanguage')}>
//               <SelectTrigger className="w-full bg-gray-800 text-white">
//                 <SelectValue placeholder="Select language" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="English">English</SelectItem>
//                 <SelectItem value="Spanish">Spanish</SelectItem>
//                 <SelectItem value="French">French</SelectItem>
//                 <SelectItem value="German">German</SelectItem>
//                 <SelectItem value="Other">Other</SelectItem>
//               </SelectContent>
//             </Select>
//             <ErrorMessage error={errors.responseLanguage as FieldError} />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1" htmlFor="businessHours">
//               Business Hours
//             </label>
//             <Input
//               id="businessHours"
//               {...register('businessHours')}
//               className="w-full bg-gray-800 text-white"
//               placeholder="e.g., Mon-Fri 9AM-5PM"
//             />
//             <ErrorMessage error={errors.businessHours as FieldError} />
//           </div>
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Auto-Reply Enabled
//           </label>
//           <DragDropToggle onToggle={(value) => setAutoReplyEnabled(value)} />
//           <input
//             type="hidden"
//             {...register('autoReplyEnabled')}
//             value={autoReplyEnabled.toString()}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1" htmlFor="promotionMessage">
//             Promotion Message
//           </label>
//           <Textarea
//             id="promotionMessage"
//             {...register('promotionMessage')}
//             className="w-full bg-gray-800 text-white"
//             placeholder="Enter your default promotion message"
//             rows={3}
//           />
//           <ErrorMessage error={errors.promotionMessage as FieldError} />
//         </div>
//         <div className="text-center">
//           <Button
//             type="submit"
//             className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
//           >
//             Submit
//           </Button>
//         </div>
//       </form>
//     </motion.div>
//   )
// }

// 'use client'

// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useForm, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import * as z from 'zod'
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { DragDropToggle } from '@/components/global/businessInfo/dragDrop'
// import { createBusiness } from '@/lib/businessinfo'
// import { FormSummary } from '@/components/FormSummary'
// import { ErrorMessage } from '@/components/ErrorMessage'
// import { toast } from 'react-hot-toast'
// import { Toaster } from 'react-hot-toast'

// const formSchema = z.object({
//   businessName: z.string().min(1, 'Business name is required'),
//   businessType: z.string().min(1, 'Business type is required'),
//   businessDescription: z.string().min(10, 'Description must be at least 10 characters'),
//   industry: z.string().min(1, 'Industry is required'),
//   instagramHandle: z.string().min(1, 'Instagram handle is required'),
//   welcomeMessage: z.string().min(1, 'Welcome message is required'),
//   responseLanguage: z.string().min(1, 'Response language is required'),
//   businessHours: z.string().min(1, 'Business hours are required'),
//   autoReplyEnabled: z.boolean(),
//   promotionMessage: z.string().min(1, 'Promotion message is required'),
// })

// type FormSchema = z.infer<typeof formSchema>;

// export function BusinessInfoForm() {
//   const [autoReplyEnabled, setAutoReplyEnabled] = useState(false)
//   const [isSubmitted, setIsSubmitted] = useState(false)
//   const [formData, setFormData] = useState<FormSchema | null>(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm<FormSchema>({
//     resolver: zodResolver(formSchema),
//   })

//   const onSubmit = async (data: FormSchema) => {
//     setIsLoading(true)
//     try {
//       const result = await createBusiness(data)
//       console.log('Business created:', result)
//       setFormData(data)
//       setIsSubmitted(true)
//       toast.success('Business information submitted successfully!')
//     } catch (error) {
//       console.error('Error creating business:', error)
//       toast.error('Failed to submit business information. Please try again.')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleEdit = () => {
//     setIsSubmitted(false)
//   }

//   const handleConfirm = () => {
//     // Here you can perform any final submission logic
//     console.log('Form confirmed and submitted')
//     reset() // Reset the form
//     setIsSubmitted(false)
//     setFormData(null)
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-[#2A2A2A] to-[#3D3D3D] rounded-xl shadow-2xl text-gray-100"
//     >
//       <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
//         Business Information Form
//       </h1>
//       <AnimatePresence mode="wait">
//         {!isSubmitted ? (
//           <motion.form
//             key="form"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onSubmit={handleSubmit(onSubmit)}
//             className="space-y-6"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="businessName">
//                   Business Name
//                 </label>
//                 <Input
//                   id="businessName"
//                   {...register('businessName')}
//                   className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
//                   placeholder="Enter your business name"
//                 />
//                 <ErrorMessage error={errors.businessName} />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="businessType">
//                   Business Type
//                 </label>
//                 <Select {...register('businessType')}>
//                   <SelectTrigger className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300">
//                     <SelectValue placeholder="Select business type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Retail">Retail</SelectItem>
//                     <SelectItem value="Service">Service</SelectItem>
//                     <SelectItem value="E-Commerce">E-Commerce</SelectItem>
//                     <SelectItem value="Agency">Agency</SelectItem>
//                     <SelectItem value="Other">Other</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <ErrorMessage error={errors.businessType} />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1" htmlFor="businessDescription">
//                 Business Description
//               </label>
//               <Textarea
//                 id="businessDescription"
//                 {...register('businessDescription')}
//                 className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
//                 placeholder="Describe your business"
//                 rows={4}
//               />
//               <ErrorMessage error={errors.businessDescription} />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="industry">
//                   Industry
//                 </label>
//                 <Select {...register('industry')}>
//                   <SelectTrigger className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300">
//                     <SelectValue placeholder="Select industry" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Fashion">Fashion</SelectItem>
//                     <SelectItem value="Beauty">Beauty</SelectItem>
//                     <SelectItem value="Technology">Technology</SelectItem>
//                     <SelectItem value="Health">Health</SelectItem>
//                     <SelectItem value="Food">Food</SelectItem>
//                     <SelectItem value="Other">Other</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <ErrorMessage error={errors.industry} />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="instagramHandle">
//                   Instagram Handle
//                 </label>
//                 <Input
//                   id="instagramHandle"
//                   {...register('instagramHandle')}
//                   className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
//                   placeholder="@yourbusiness"
//                 />
//                 <ErrorMessage error={errors.instagramHandle} />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1" htmlFor="welcomeMessage">
//                 Welcome Message
//               </label>
//               <Textarea
//                 id="welcomeMessage"
//                 {...register('welcomeMessage')}
//                 className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
//                 placeholder="Enter your welcome message"
//                 rows={3}
//               />
//               <ErrorMessage error={errors.welcomeMessage} />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="responseLanguage">
//                   Response Language
//                 </label>
//                 <Select {...register('responseLanguage')}>
//                   <SelectTrigger className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300">
//                     <SelectValue placeholder="Select language" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="English">English</SelectItem>
//                     <SelectItem value="Spanish">Spanish</SelectItem>
//                     <SelectItem value="French">French</SelectItem>
//                     <SelectItem value="German">German</SelectItem>
//                     <SelectItem value="Other">Other</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <ErrorMessage error={errors.responseLanguage} />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="businessHours">
//                   Business Hours
//                 </label>
//                 <Input
//                   id="businessHours"
//                   {...register('businessHours')}
//                   className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
//                   placeholder="e.g., Mon-Fri 9AM-5PM"
//                 />
//                 <ErrorMessage error={errors.businessHours} />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Auto-Reply Enabled
//               </label>
//               <DragDropToggle onToggle={(value) => setAutoReplyEnabled(value)} />
//               <input
//                 type="hidden"
//                 {...register('autoReplyEnabled')}
//                 value={autoReplyEnabled.toString()}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1" htmlFor="promotionMessage">
//                 Promotion Message
//               </label>
//               <Textarea
//                 id="promotionMessage"
//                 {...register('promotionMessage')}
//                 className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
//                 placeholder="Enter your default promotion message"
//                 rows={3}
//               />
//               <ErrorMessage error={errors.promotionMessage} />
//             </div>
//             <div className="text-center">
//               <Button
//                 type="submit"
//                 className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Submitting...' : 'Submit'}
//               </Button>
//             </div>
//           </motion.form>
//         ) : (
//           <FormSummary
//             data={formData!}
//             onEdit={handleEdit}
//             onConfirm={handleConfirm}
//           />
//         )}
//       </AnimatePresence>
//       <Toaster position="bottom-center" />
//     </motion.div>
//   )
// }

// 'use client'

// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useForm, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import * as z from 'zod'
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { DragDropToggle } from '@/components/global/businessInfo/dragDrop'
// import { createBusiness } from '@/lib/businessinfo'
// import { FormSummary } from './formSummary'
// import { ErrorMessage } from './errorMessage'
// import { useToast } from "@/hooks/use-toast"
// import { ToastViewport } from "@/components/ui/toast"

// const formSchema = z.object({
//   businessName: z.string().min(1, 'Business name is required'),
//   businessType: z.string().min(1, 'Business type is required'),
//   businessDescription: z.string().min(10, 'Description must be at least 10 characters'),
//   industry: z.string().min(1, 'Industry is required'),
//   instagramHandle: z.string().min(1, 'Instagram handle is required'),
//   welcomeMessage: z.string().min(1, 'Welcome message is required'),
//   responseLanguage: z.string().min(1, 'Response language is required'),
//   businessHours: z.string().min(1, 'Business hours are required'),
//   autoReplyEnabled: z.boolean(),
//   promotionMessage: z.string().min(1, 'Promotion message is required'),
// })

// type FormSchema = z.infer<typeof formSchema>;

// export function BusinessInfoForm() {
//   const [autoReplyEnabled, setAutoReplyEnabled] = useState(false)
//   const [isSubmitted, setIsSubmitted] = useState(false)
//   const [formData, setFormData] = useState<FormSchema | null>(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm<FormSchema>({
//     resolver: zodResolver(formSchema),
//   })
//   const { toast } = useToast()

//   const onSubmit = async (data: FormSchema) => {
//     setIsLoading(true)
//     try {
//       const result = await createBusiness(data)
//       console.log('Business created:', result)
//       setFormData(data)
//       setIsSubmitted(true)
//       toast({
//         title: "Success",
//         description: "Business information submitted successfully!",
//       })
//     } catch (error) {
//       console.error('Error creating business:', error)
//       toast({
//         title: "Error",
//         description: "Failed to submit business information. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleEdit = () => {
//     setIsSubmitted(false)
//   }

//   const handleConfirm = () => {
//     // Here you can perform any final submission logic
//     console.log('Form confirmed and submitted')
//     reset() // Reset the form
//     setIsSubmitted(false)
//     setFormData(null)
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-[#2A2A2A] to-[#3D3D3D] rounded-xl shadow-2xl text-gray-100"
//     >
//       <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
//         Business Information Form
//       </h1>
//       <AnimatePresence mode="wait">
//         {!isSubmitted ? (
//           <motion.form
//             key="form"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onSubmit={handleSubmit(onSubmit)}
//             className="space-y-6"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="businessName">
//                   Business Name
//                 </label>
//                 <Input
//                   id="businessName"
//                   {...register('businessName')}
//                   className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
//                   placeholder="Enter your business name"
//                 />
//                 <ErrorMessage error={errors.businessName} />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="businessType">
//                   Business Type
//                 </label>
//                 <Select {...register('businessType')}>
//                   <SelectTrigger className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300">
//                     <SelectValue placeholder="Select business type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Retail">Retail</SelectItem>
//                     <SelectItem value="Service">Service</SelectItem>
//                     <SelectItem value="E-Commerce">E-Commerce</SelectItem>
//                     <SelectItem value="Agency">Agency</SelectItem>
//                     <SelectItem value="Other">Other</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <ErrorMessage error={errors.businessType} />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1" htmlFor="businessDescription">
//                 Business Description
//               </label>
//               <Textarea
//                 id="businessDescription"
//                 {...register('businessDescription')}
//                 className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
//                 placeholder="Describe your business"
//                 rows={4}
//               />
//               <ErrorMessage error={errors.businessDescription} />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="industry">
//                   Industry
//                 </label>
//                 <Select {...register('industry')}>
//                   <SelectTrigger className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300">
//                     <SelectValue placeholder="Select industry" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Fashion">Fashion</SelectItem>
//                     <SelectItem value="Beauty">Beauty</SelectItem>
//                     <SelectItem value="Technology">Technology</SelectItem>
//                     <SelectItem value="Health">Health</SelectItem>
//                     <SelectItem value="Food">Food</SelectItem>
//                     <SelectItem value="Other">Other</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <ErrorMessage error={errors.industry} />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="instagramHandle">
//                   Instagram Handle
//                 </label>
//                 <Input
//                   id="instagramHandle"
//                   {...register('instagramHandle')}
//                   className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
//                   placeholder="@yourbusiness"
//                 />
//                 <ErrorMessage error={errors.instagramHandle} />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1" htmlFor="welcomeMessage">
//                 Welcome Message
//               </label>
//               <Textarea
//                 id="welcomeMessage"
//                 {...register('welcomeMessage')}
//                 className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
//                 placeholder="Enter your welcome message"
//                 rows={3}
//               />
//               <ErrorMessage error={errors.welcomeMessage} />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="responseLanguage">
//                   Response Language
//                 </label>
//                 <Select {...register('responseLanguage')}>
//                   <SelectTrigger className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300">
//                     <SelectValue placeholder="Select language" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="English">English</SelectItem>
//                     <SelectItem value="Spanish">Spanish</SelectItem>
//                     <SelectItem value="French">French</SelectItem>
//                     <SelectItem value="German">German</SelectItem>
//                     <SelectItem value="Other">Other</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <ErrorMessage error={errors.responseLanguage} />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="businessHours">
//                   Business Hours
//                 </label>
//                 <Input
//                   id="businessHours"
//                   {...register('businessHours')}
//                   className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
//                   placeholder="e.g., Mon-Fri 9AM-5PM"
//                 />
//                 <ErrorMessage error={errors.businessHours} />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Auto-Reply Enabled
//               </label>
//               <DragDropToggle onToggle={(value) => setAutoReplyEnabled(value)} />
//               <input
//                 type="hidden"
//                 {...register('autoReplyEnabled')}
//                 value={autoReplyEnabled.toString()}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1" htmlFor="promotionMessage">
//                 Promotion Message
//               </label>
//               <Textarea
//                 id="promotionMessage"
//                 {...register('promotionMessage')}
//                 className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
//                 placeholder="Enter your default promotion message"
//                 rows={3}
//               />
//               <ErrorMessage error={errors.promotionMessage} />
//             </div>
//             <div className="text-center">
//               <Button
//                 type="submit"
//                 className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Submitting...' : 'Submit'}
//               </Button>
//             </div>
//           </motion.form>
//         ) : (
//           <FormSummary
//             data={formData!}
//             onEdit={handleEdit}
//             onConfirm={handleConfirm}
//           />
//         )}
//       </AnimatePresence>
//       <ToastViewport />
//     </motion.div>
//   )
// }

// 'use client'

// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import * as z from 'zod'
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { DragDropToggle } from '@/components/global/businessInfo/dragDrop'
// import { createBusiness } from '@/lib/businessinfo'
// import { FormSummary } from './formSummary'
// import { ErrorMessage } from './errorMessage'
// import { useToast } from "@/hooks/use-toast"
// import { ToastViewport } from "@/components/ui/toast"

// const formSchema = z.object({
//   businessName: z.string().min(1, 'Business name is required'),
//   businessType: z.string().min(1, 'Business type is required'),
//   businessDescription: z.string().min(10, 'Description must be at least 10 characters'),
//   industry: z.string().min(1, 'Industry is required'),
//   instagramHandle: z.string().min(1, 'Instagram handle is required'),
//   welcomeMessage: z.string().min(1, 'Welcome message is required'),
//   responseLanguage: z.string().min(1, 'Response language is required'),
//   businessHours: z.string().min(1, 'Business hours are required'),
//   autoReplyEnabled: z.boolean(),
//   promotionMessage: z.string().min(1, 'Promotion message is required'),
// })

// type FormSchema = z.infer<typeof formSchema>;

// export function BusinessInfoForm() {
//   const [autoReplyEnabled, setAutoReplyEnabled] = useState(false)
//   const [isSubmitted, setIsSubmitted] = useState(false)
//   const [formData, setFormData] = useState<FormSchema | null>(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm<FormSchema>({
//     resolver: zodResolver(formSchema),
//   })
//   const { toast } = useToast()

//   const onSubmit = async (data: FormSchema) => {
//     setIsLoading(true)
//     try {
//       const result = await createBusiness(data)
//       console.log('Business created:', result)
//       setFormData(data)
//       setIsSubmitted(true)
//       toast({
//         title: "Success",
//         description: "Business information submitted successfully!",
//       })
//     } catch (error) {
//       console.error('Error creating business:', error)
//       toast({
//         title: "Error",
//         description: "Failed to submit business information. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleEdit = () => {
//     setIsSubmitted(false)
//   }

//   const handleConfirm = () => {
//     // Here you can perform any final submission logic
//     console.log('Form confirmed and submitted')
//     reset() // Reset the form
//     setIsSubmitted(false)
//     setFormData(null)
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-[#2A2A2A] to-[#3D3D3D] rounded-xl shadow-2xl text-gray-100"
//     >
//       <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
//         Business Information Form
//       </h1>
//       <AnimatePresence mode="wait">
//         {!isSubmitted ? (
//           <motion.form
//             key="form"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onSubmit={handleSubmit(onSubmit)}
//             className="space-y-6"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="businessName">
//                   Business Name
//                 </label>
//                 <Input
//                   id="businessName"
//                   {...register('businessName')}
//                   className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
//                   placeholder="Enter your business name"
//                 />
//                 <ErrorMessage error={errors.businessName} />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="businessType">
//                   Business Type
//                 </label>
//                 <Select {...register('businessType')}>
//                   <SelectTrigger className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300">
//                     <SelectValue placeholder="Select business type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Retail">Retail</SelectItem>
//                     <SelectItem value="Service">Service</SelectItem>
//                     <SelectItem value="E-Commerce">E-Commerce</SelectItem>
//                     <SelectItem value="Agency">Agency</SelectItem>
//                     <SelectItem value="Other">Other</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <ErrorMessage error={errors.businessType} />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1" htmlFor="businessDescription">
//                 Business Description
//               </label>
//               <Textarea
//                 id="businessDescription"
//                 {...register('businessDescription')}
//                 className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
//                 placeholder="Describe your business"
//                 rows={4}
//               />
//               <ErrorMessage error={errors.businessDescription} />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="industry">
//                   Industry
//                 </label>
//                 <Select {...register('industry')}>
//                   <SelectTrigger className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300">
//                     <SelectValue placeholder="Select industry" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Fashion">Fashion</SelectItem>
//                     <SelectItem value="Beauty">Beauty</SelectItem>
//                     <SelectItem value="Technology">Technology</SelectItem>
//                     <SelectItem value="Health">Health</SelectItem>
//                     <SelectItem value="Food">Food</SelectItem>
//                     <SelectItem value="Other">Other</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <ErrorMessage error={errors.industry} />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="instagramHandle">
//                   Instagram Handle
//                 </label>
//                 <Input
//                   id="instagramHandle"
//                   {...register('instagramHandle')}
//                   className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
//                   placeholder="@yourbusiness"
//                 />
//                 <ErrorMessage error={errors.instagramHandle} />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1" htmlFor="welcomeMessage">
//                 Welcome Message
//               </label>
//               <Textarea
//                 id="welcomeMessage"
//                 {...register('welcomeMessage')}
//                 className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
//                 placeholder="Enter your welcome message"
//                 rows={3}
//               />
//               <ErrorMessage error={errors.welcomeMessage} />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="responseLanguage">
//                   Response Language
//                 </label>
//                 <Select {...register('responseLanguage')}>
//                   <SelectTrigger className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300">
//                     <SelectValue placeholder="Select language" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="English">English</SelectItem>
//                     <SelectItem value="Spanish">Spanish</SelectItem>
//                     <SelectItem value="French">French</SelectItem>
//                     <SelectItem value="German">German</SelectItem>
//                     <SelectItem value="Other">Other</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <ErrorMessage error={errors.responseLanguage} />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="businessHours">
//                   Business Hours
//                 </label>
//                 <Input
//                   id="businessHours"
//                   {...register('businessHours')}
//                   className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
//                   placeholder="e.g., Mon-Fri 9AM-5PM"
//                 />
//                 <ErrorMessage error={errors.businessHours} />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Auto-Reply Enabled
//               </label>
//               <DragDropToggle onToggle={(value) => setAutoReplyEnabled(value)} />
//               <input
//                 type="hidden"
//                 {...register('autoReplyEnabled')}
//                 value={autoReplyEnabled.toString()}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1" htmlFor="promotionMessage">
//                 Promotion Message
//               </label>
//               <Textarea
//                 id="promotionMessage"
//                 {...register('promotionMessage')}
//                 className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
//                 placeholder="Enter your default promotion message"
//                 rows={3}
//               />
//               <ErrorMessage error={errors.promotionMessage} />
//             </div>
//             <div className="text-center">
//               <Button
//                 type="submit"
//                 className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Submitting...' : 'Submit'}
//               </Button>
//             </div>
//           </motion.form>
//         ) : (
//           <FormSummary
//             data={formData!}
//             onEdit={handleEdit}
//             onConfirm={handleConfirm}
//           />
//         )}
//       </AnimatePresence>
//       <ToastViewport />
//     </motion.div>
//   )
// }

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { createBusiness } from '@/actions/business'
import { FormSummary } from './formSummary'
import { ErrorMessage } from './errorMessage'
import { useToast } from "@/hooks/use-toast"
import { ToastViewport } from "@/components/ui/toast"

const formSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  businessType: z.string().min(1, 'Business type is required'),
  businessDescription: z.string().min(10, 'Description must be at least 10 characters'),
  industry: z.string().min(1, 'Industry is required'),
  instagramHandle: z.string().min(1, 'Instagram handle is required'),
  welcomeMessage: z.string().min(1, 'Welcome message is required'),
  responseLanguage: z.string().min(1, 'Response language is required'),
  businessHours: z.string().min(1, 'Business hours are required'),
  promotionMessage: z.string().min(1, 'Promotion message is required'),
  autoReplyEnabled: z.boolean(), // Add this field
})

type FormSchema = z.infer<typeof formSchema>;

export function BusinessInfoForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormSchema | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset, getValues, setValue, watch } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })
  const { toast } = useToast()

  const onSubmit = async (data: FormSchema) => {
    setIsLoading(true)
    try {
      const result = await createBusiness(data)
      console.log('Business created:', result)
      setFormData(data)
      setIsSubmitted(true)
      toast({
        title: "Success",
        description: "Business information submitted successfully!",
      })
    } catch (error) {
      console.error('Error creating business:', error)
      toast({
        title: "Error",
        description: "Failed to submit business information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = () => {
    setIsSubmitted(false)
  }

  const handleConfirm = () => {
    // Here you can perform any final submission logic
    console.log('Form confirmed and submitted')
    reset() // Reset the form
    setIsSubmitted(false)
    setFormData(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-br from-[#2A2A2A] to-[#3D3D3D] rounded-xl shadow-2xl text-gray-100"
    >
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
        Business Information Form
      </h1>
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="businessName">
                  Business Name
                </label>
                <Input
                  id="businessName"
                  {...register('businessName')}
                  className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
                  placeholder="Enter your business name"
                />
                <ErrorMessage error={errors.businessName} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="businessType">
                  Business Type
                </label>
                <Select onValueChange={(value) => setValue('businessType', value)} defaultValue={watch('businessType')}>
                  <SelectTrigger className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Service">Service</SelectItem>
                    <SelectItem value="E-Commerce">E-Commerce</SelectItem>
                    <SelectItem value="Agency">Agency</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="businessDescription">
                Business Description
              </label>
              <Textarea
                id="businessDescription"
                {...register('businessDescription')}
                className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
                placeholder="Describe your business"
                rows={4}
              />
              <ErrorMessage error={errors.businessDescription} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="industry">
                  Industry
                </label>
                <Select onValueChange={(value) => setValue('industry', value)} defaultValue={watch('industry')}>
                  <SelectTrigger className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fashion">Fashion</SelectItem>
                    <SelectItem value="Beauty">Beauty</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="instagramHandle">
                  Instagram Handle
                </label>
                <Input
                  id="instagramHandle"
                  {...register('instagramHandle')}
                  className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
                  placeholder="@yourbusiness"
                />
                <ErrorMessage error={errors.instagramHandle} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="welcomeMessage">
                Welcome Message
              </label>
              <Textarea
                id="welcomeMessage"
                {...register('welcomeMessage')}
                className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
                placeholder="Enter your welcome message"
                rows={3}
              />
              <ErrorMessage error={errors.welcomeMessage} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="responseLanguage">
                  Response Language
                </label>
                <Select onValueChange={(value) => setValue('responseLanguage', value)} defaultValue={watch('responseLanguage')}>
                  <SelectTrigger className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="businessHours">
                  Business Hours
                </label>
                <Input
                  id="businessHours"
                  {...register('businessHours')}
                  className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
                  placeholder="e.g., Mon-Fri 9AM-5PM"
                />
                <ErrorMessage error={errors.businessHours} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="promotionMessage">
                Promotion Message
              </label>
              <Textarea
                id="promotionMessage"
                {...register('promotionMessage')}
                className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300"
                placeholder="Enter your default promotion message"
                rows={3}
              />
              <ErrorMessage error={errors.promotionMessage} />
            </div>
            <div className="text-center">
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </motion.form>
        ) : (
          <FormSummary
            data={formData!}
            onEdit={handleEdit}
            onConfirm={handleConfirm}
          />
        )}
      </AnimatePresence>
      <ToastViewport />
    </motion.div>
  )
}

// 'use client'

// import { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import * as z from 'zod'
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { createBusiness } from '@/actions/business'
// import { FormSummary } from './formSummary'
// import { ErrorMessage } from './errorMessage'
// import { useToast } from "@/hooks/use-toast"
// import { ToastViewport } from "@/components/ui/toast"
// import { Sparkles, Star, Zap } from 'lucide-react'

// const formSchema = z.object({
//   businessName: z.string().min(1, 'Business name is required'),
//   businessType: z.string().min(1, 'Business type is required'),
//   businessDescription: z.string().min(10, 'Description must be at least 10 characters'),
//   industry: z.string().min(1, 'Industry is required'),
//   instagramHandle: z.string().min(1, 'Instagram handle is required'),
//   welcomeMessage: z.string().min(1, 'Welcome message is required'),
//   responseLanguage: z.string().min(1, 'Response language is required'),
//   businessHours: z.string().min(1, 'Business hours are required'),
//   promotionMessage: z.string().min(1, 'Promotion message is required'),
//   autoReplyEnabled: z.boolean(), // Add this field
// })

// type FormSchema = z.infer<typeof formSchema>;

// const inputVariants = {
//   focus: { scale: 1.02, boxShadow: "0 0 0 2px rgba(124, 58, 237, 0.5)" },
// }

// export function BusinessInfoForm() {
//   const [isSubmitted, setIsSubmitted] = useState(false)
//   const [formData, setFormData] = useState<FormSchema | null>(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const [activeField, setActiveField] = useState<string | null>(null)
//   const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FormSchema>({
//     resolver: zodResolver(formSchema),
//   })
//   const { toast } = useToast()

//   const onSubmit = async (data: FormSchema) => {
//     setIsLoading(true)
//     try {
//       const result = await createBusiness(data)
//       console.log('Business created:', result)
//       setFormData(data)
//       setIsSubmitted(true)
//       toast({
//         title: "Success",
//         description: "Business information submitted successfully!",
//       })
//     } catch (error) {
//       console.error('Error creating business:', error)
//       toast({
//         title: "Error",
//         description: "Failed to submit business information. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleEdit = () => {
//     setIsSubmitted(false)
//   }

//   const handleConfirm = () => {
//     console.log('Form confirmed and submitted')
//     reset()
//     setIsSubmitted(false)
//     setFormData(null)
//   }

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const stars = document.querySelectorAll<HTMLElement>('.star'); // Explicitly define the type as HTMLElement
//       stars.forEach((star) => {
//         star.classList.remove('animate-twinkle');
//         void star.offsetWidth; // Ensure this works without error
//         star.classList.add('animate-twinkle');
//       });
//     }, 3000);
  
//     return () => clearInterval(interval);
//   }, []);


//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl shadow-2xl text-gray-100 relative overflow-hidden"
//     >
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(50)].map((_, i) => (
//           <div
//             key={i}
//             className="star absolute w-1 h-1 bg-white rounded-full animate-twinkle"
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//             }}
//           />
//         ))}
//       </div>
//       <motion.h1
//         className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text relative"
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
//       >
//         <Sparkles className="inline-block mr-2 text-yellow-400" />
//         Business Information Form
//         <Sparkles className="inline-block ml-2 text-yellow-400" />
//       </motion.h1>
//       <AnimatePresence mode="wait">
//         {!isSubmitted ? (
//           <motion.form
//             key="form"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onSubmit={handleSubmit(onSubmit)}
//             className="space-y-6 relative z-10"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <motion.div
//                 variants={inputVariants}
//                 whileFocus="focus"
//                 className="relative"
//               >
//                 <label className="block text-sm font-medium mb-1" htmlFor="businessName">
//                   Business Name
//                 </label>
//                 <Input
//                   id="businessName"
//                   {...register('businessName')}
//                   className="w-full bg-gray-800 bg-opacity-50 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300 backdrop-blur-sm"
//                   placeholder="Enter your business name"
//                   onFocus={() => setActiveField('businessName')}
//                   onBlur={() => setActiveField(null)}
//                 />
//                 <ErrorMessage error={errors.businessName} />
//                 {activeField === 'businessName' && (
//                   <motion.div
//                     className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 0.75 }}
//                     exit={{ opacity: 0 }}
//                   />
//                 )}
//               </motion.div>
//               <motion.div
//                 variants={inputVariants}
//                 whileFocus="focus"
//                 className="relative"
//               >
//                 <label className="block text-sm font-medium mb-1" htmlFor="businessType">
//                   Business Type
//                 </label>
//                 <Select onValueChange={(value) => setValue('businessType', value)} defaultValue={watch('businessType')}>
//                   <SelectTrigger className="w-full bg-gray-800 bg-opacity-50 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300 backdrop-blur-sm">
//                     <SelectValue placeholder="Select business type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Retail">Retail</SelectItem>
//                     <SelectItem value="Service">Service</SelectItem>
//                     <SelectItem value="E-Commerce">E-Commerce</SelectItem>
//                     <SelectItem value="Agency">Agency</SelectItem>
//                     <SelectItem value="Other">Other</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </motion.div>
//             </div>
//             <motion.div
//               variants={inputVariants}
//               whileFocus="focus"
//               className="relative"
//             >
//               <label className="block text-sm font-medium mb-1" htmlFor="businessDescription">
//                 Business Description
//               </label>
//               <Textarea
//                 id="businessDescription"
//                 {...register('businessDescription')}
//                 className="w-full bg-gray-800 bg-opacity-50 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300 backdrop-blur-sm"
//                 placeholder="Describe your business"
//                 rows={4}
//                 onFocus={() => setActiveField('businessDescription')}
//                 onBlur={() => setActiveField(null)}
//               />
//               <ErrorMessage error={errors.businessDescription} />
//               {activeField === 'businessDescription' && (
//                 <motion.div
//                   className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 0.75 }}
//                   exit={{ opacity: 0 }}
//                 />
//               )}
//             </motion.div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <motion.div
//                 variants={inputVariants}
//                 whileFocus="focus"
//                 className="relative"
//               >
//                 <label className="block text-sm font-medium mb-1" htmlFor="industry">
//                   Industry
//                 </label>
//                 <Select onValueChange={(value) => setValue('industry', value)} defaultValue={watch('industry')}>
//                   <SelectTrigger className="w-full bg-gray-800 bg-opacity-50 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300 backdrop-blur-sm">
//                     <SelectValue placeholder="Select industry" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Fashion">Fashion</SelectItem>
//                     <SelectItem value="Beauty">Beauty</SelectItem>
//                     <SelectItem value="Technology">Technology</SelectItem>
//                     <SelectItem value="Health">Health</SelectItem>
//                     <SelectItem value="Food">Food</SelectItem>
//                     <SelectItem value="Other">Other</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </motion.div>
//               <motion.div
//                 variants={inputVariants}
//                 whileFocus="focus"
//                 className="relative"
//               >
//                 <label className="block text-sm font-medium mb-1" htmlFor="instagramHandle">
//                   Instagram Handle
//                 </label>
//                 <Input
//                   id="instagramHandle"
//                   {...register('instagramHandle')}
//                   className="w-full bg-gray-800 bg-opacity-50 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300 backdrop-blur-sm"
//                   placeholder="@yourbusiness"
//                   onFocus={() => setActiveField('instagramHandle')}
//                   onBlur={() => setActiveField(null)}
//                 />
//                 <ErrorMessage error={errors.instagramHandle} />
//                 {activeField === 'instagramHandle' && (
//                   <motion.div
//                     className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 0.75 }}
//                     exit={{ opacity: 0 }}
//                   />
//                 )}
//               </motion.div>
//             </div>
//             <motion.div
//               variants={inputVariants}
//               whileFocus="focus"
//               className="relative"
//             >
//               <label className="block text-sm font-medium mb-1" htmlFor="welcomeMessage">
//                 Welcome Message
//               </label>
//               <Textarea
//                 id="welcomeMessage"
//                 {...register('welcomeMessage')}
//                 className="w-full bg-gray-800 bg-opacity-50 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300 backdrop-blur-sm"
//                 placeholder="Enter your welcome message"
//                 rows={3}
//                 onFocus={() => setActiveField('welcomeMessage')}
//                 onBlur={() => setActiveField(null)}
//               />
//               <ErrorMessage error={errors.welcomeMessage} />
//               {activeField === 'welcomeMessage' && (
//                 <motion.div
//                   className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 0.75 }}
//                   exit={{ opacity: 0 }}
//                 />
//               )}
//             </motion.div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <motion.div
//                 variants={inputVariants}
//                 whileFocus="focus"
//                 className="relative"
//               >
//                 <label className="block text-sm font-medium mb-1" htmlFor="responseLanguage">
//                   Response Language
//                 </label>
//                 <Select onValueChange={(value) => setValue('responseLanguage', value)} defaultValue={watch('responseLanguage')}>
//                   <SelectTrigger className="w-full bg-gray-800 bg-opacity-50 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300 backdrop-blur-sm">
//                     <SelectValue placeholder="Select language" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="English">English</SelectItem>
//                     <SelectItem value="Spanish">Spanish</SelectItem>
//                     <SelectItem value="French">French</SelectItem>
//                     <SelectItem value="German">German</SelectItem>
//                     <SelectItem value="Other">Other</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </motion.div>
//               <motion.div
//                 variants={inputVariants}
//                 whileFocus="focus"
//                 className="relative"
//               >
//                 <label className="block text-sm font-medium mb-1" htmlFor="businessHours">
//                   Business Hours
//                 </label>
//                 <Input
//                   id="businessHours"
//                   {...register('businessHours')}
//                   className="w-full bg-gray-800 bg-opacity-50 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300 backdrop-blur-sm"
//                   placeholder="e.g., Mon-Fri 9AM-5PM"
//                   onFocus={() => setActiveField('businessHours')}
//                   onBlur={() => setActiveField(null)}
//                 />
//                 <ErrorMessage error={errors.businessHours} />
//                 {activeField === 'businessHours' && (
//                   <motion.div
//                     className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 0.75 }}
//                     exit={{ opacity: 0 }}
//                   />
//                 )}
//               </motion.div>
//             </div>
//             <motion.div
//               variants={inputVariants}
//               whileFocus="focus"
//               className="relative"
//             >
//               <label className="block text-sm font-medium mb-1" htmlFor="promotionMessage">
//                 Promotion Message
//               </label>
//               <Textarea
//                 id="promotionMessage"
//                 {...register('promotionMessage')}
//                 className="w-full bg-gray-800 bg-opacity-50 text-white border-2 border-gray-700 focus:border-purple-500 transition-colors duration-300 backdrop-blur-sm"
//                 placeholder="Enter your default promotion message"
//                 rows={3}
//                 onFocus={() => setActiveField('promotionMessage')}
//                 onBlur={() => setActiveField(null)}
//               />
//               <ErrorMessage error={errors.promotionMessage} />
//               {activeField === 'promotionMessage' && (
//                 <motion.div
//                   className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 0.75 }}
//                   exit={{ opacity: 0 }}
//                 />
//               )}
//             </motion.div>
//             <div className="text-center">
//               <motion.button
//                 type="submit"
//                 className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg relative overflow-hidden group"
//                 disabled={isLoading}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <span className="relative z-10">
//                   {isLoading ? 'Submitting...' : 'Submit'}
//                 </span>
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: [0, 1, 0] }}
//                   transition={{ duration: 1.5, repeat: Infinity }}
//                 />
//                 <Zap className="absolute right-2 top-1/2 transform -translate-y-1/2 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </motion.button>
//             </div>
//           </motion.form>
//         ) : (
//           <FormSummary
//             data={formData!}
//             onEdit={handleEdit}
//             onConfirm={handleConfirm}
//           />
//         )}
//       </AnimatePresence>
//       <ToastViewport />
//     </motion.div>
//   )
// }

