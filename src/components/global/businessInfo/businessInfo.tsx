// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import * as z from 'zod'
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { createNewBusiness } from '@/actions/businfo'
// import { FormSummary } from './formSummary'
// import { ErrorMessage } from './errorMessage'
// import { useToast } from "@/hooks/use-toast"
// import { ToastViewport } from "@/components/ui/toast"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// export const FormSchema = z.object({
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

// function BusinessForm() {
//   const [formData, setFormData] = useState<FormSchema | null>(null)
//   const [isSubmitted, setIsSubmitted] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm<FormSchema>({
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
//       console.log('Business created:', result)
//       if (result.status === 200) {
//         setFormData(data)
//         setIsSubmitted(true)
//         toast({
//           title: "Success",
//           description: "Business information submitted successfully!",
//         })
//       } else {
//         setError(result.data || 'An unknown error occurred')
//         toast({
//           title: "Error",
//           description: result.status || "Failed to submit business information. Please try again.",
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

//   const handleEdit = () => {
//     setIsSubmitted(false)
//   }

//   const handleConfirm = () => {
//     console.log('Form confirmed and submitted')
//     setIsSubmitted(false)
//     setFormData(null)
//   }

//   return (
//     <AnimatePresence>
//       {!isSubmitted ? (
//         <motion.form
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onSubmit={handleSubmit(onSubmit)}
//           className="space-y-4"
//         >
//           <Input
//             placeholder="Enter your business name"
//             {...register('businessName')}
//           />
//           {errors.businessName && <ErrorMessage>{errors.businessName.message}</ErrorMessage>}
          
//           <Select onValueChange={(value) => setValue('businessType', value)}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select Business Type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Retail">Retail</SelectItem>
//               <SelectItem value="Service">Service</SelectItem>
//               <SelectItem value="Manufacturing">Manufacturing</SelectItem>
//               <SelectItem value="Tech">Tech</SelectItem>
//             </SelectContent>
//           </Select>
//           {errors.businessType && <ErrorMessage>{errors.businessType.message}</ErrorMessage>}
          
//           <Textarea
//             placeholder="Enter your business description"
//             {...register('businessDescription')}
//           />
//           {errors.businessDescription && <ErrorMessage>{errors.businessDescription.message}</ErrorMessage>}
          
//           <Select onValueChange={(value) => setValue('industry', value)}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select Industry" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Fashion">Fashion</SelectItem>
//               <SelectItem value="Food">Food</SelectItem>
//               <SelectItem value="Technology">Technology</SelectItem>
//               <SelectItem value="Healthcare">Healthcare</SelectItem>
//             </SelectContent>
//           </Select>
//           {errors.industry && <ErrorMessage>{errors.industry.message}</ErrorMessage>}
          
//           <Input
//             placeholder="Enter your Instagram handle"
//             {...register('instagramHandle')}
//           />
//           {errors.instagramHandle && <ErrorMessage>{errors.instagramHandle.message}</ErrorMessage>}
          
//           <Textarea
//             placeholder="Enter your welcome message"
//             {...register('welcomeMessage')}
//           />
//           {errors.welcomeMessage && <ErrorMessage>{errors.welcomeMessage.message}</ErrorMessage>}
          
//           <Select onValueChange={(value) => setValue('responseLanguage', value)}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select Response Language" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="English">English</SelectItem>
//               <SelectItem value="Spanish">Spanish</SelectItem>
//               <SelectItem value="French">French</SelectItem>
//               <SelectItem value="German">German</SelectItem>
//             </SelectContent>
//           </Select>
//           {errors.responseLanguage && <ErrorMessage>{errors.responseLanguage.message}</ErrorMessage>}
          
//           <Input
//             placeholder="Enter your business hours"
//             {...register('businessHours')}
//           />
//           {errors.businessHours && <ErrorMessage>{errors.businessHours.message}</ErrorMessage>}
          
//           <Textarea
//             placeholder="Enter your promotion message"
//             {...register('promotionMessage')}
//           />
//           {errors.promotionMessage && <ErrorMessage>{errors.promotionMessage.message}</ErrorMessage>}
          
//           <div className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               id="autoReplyEnabled"
//               {...register('autoReplyEnabled')}
//             />
//             <label htmlFor="autoReplyEnabled">Enable Auto Reply</label>
//           </div>
          
//           <Button type="submit" disabled={isLoading}>
//             {isLoading ? 'Submitting...' : 'Submit'}
//           </Button>
//           {error && (
//             <Alert variant="destructive">
//               <AlertTitle>Error</AlertTitle>
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}
//         </motion.form>
//       ) : (
//         <FormSummary 
//           data={formData!} 
//           onEdit={handleEdit}
//           onConfirm={handleConfirm}
//         />
//       )}
//       <ToastViewport />
//     </AnimatePresence>
//   )
// }

// export default BusinessForm

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { createNewBusiness } from '@/actions/businfo'
import { ErrorMessage } from './errorMessage'
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from 'next/navigation'

export const FormSchema = z.object({
  businessName: z.string().min(1, { message: 'Business name is required' }),
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

function BusinessForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      autoReplyEnabled: false,
    },
  })
  const { toast } = useToast()


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
      router.push(`/business/${result.res.id}`)
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

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 bg-gray-800 rounded-lg shadow-xl"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Create Your Business Profile</h2>
      
      <Input
        placeholder="Enter your business name"
        {...register('businessName')}
        className="bg-gray-700 text-white border-gray-600"
      />
      {errors.businessName && <ErrorMessage>{errors.businessName.message}</ErrorMessage>}
      
      <Select onValueChange={(value) => setValue('businessType', value)}>
        <SelectTrigger className="bg-gray-700 text-white border-gray-600">
          <SelectValue placeholder="Select Business Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Retail">Retail</SelectItem>
          <SelectItem value="Service">Service</SelectItem>
          <SelectItem value="Manufacturing">Manufacturing</SelectItem>
          <SelectItem value="Tech">Tech</SelectItem>
        </SelectContent>
      </Select>
      {errors.businessType && <ErrorMessage>{errors.businessType.message}</ErrorMessage>}
      
      <Textarea
        placeholder="Enter your business description"
        {...register('businessDescription')}
        className="bg-gray-700 text-white border-gray-600"
      />
      {errors.businessDescription && <ErrorMessage>{errors.businessDescription.message}</ErrorMessage>}
      
      <Select onValueChange={(value) => setValue('industry', value)}>
        <SelectTrigger className="bg-gray-700 text-white border-gray-600">
          <SelectValue placeholder="Select Industry" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Fashion">Fashion</SelectItem>
          <SelectItem value="Food">Food</SelectItem>
          <SelectItem value="Technology">Technology</SelectItem>
          <SelectItem value="Healthcare">Healthcare</SelectItem>
        </SelectContent>
      </Select>
      {errors.industry && <ErrorMessage>{errors.industry.message}</ErrorMessage>}
      
      <Input
        placeholder="Enter your Instagram handle"
        {...register('instagramHandle')}
        className="bg-gray-700 text-white border-gray-600"
      />
      {errors.instagramHandle && <ErrorMessage>{errors.instagramHandle.message}</ErrorMessage>}
      
      <Textarea
        placeholder="Enter your welcome message"
        {...register('welcomeMessage')}
        className="bg-gray-700 text-white border-gray-600"
      />
      {errors.welcomeMessage && <ErrorMessage>{errors.welcomeMessage.message}</ErrorMessage>}
      
      <Select onValueChange={(value) => setValue('responseLanguage', value)}>
        <SelectTrigger className="bg-gray-700 text-white border-gray-600">
          <SelectValue placeholder="Select Response Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="English">English</SelectItem>
          <SelectItem value="Spanish">Spanish</SelectItem>
          <SelectItem value="French">French</SelectItem>
          <SelectItem value="German">German</SelectItem>
        </SelectContent>
      </Select>
      {errors.responseLanguage && <ErrorMessage>{errors.responseLanguage.message}</ErrorMessage>}
      
      <Input
        placeholder="Enter your business hours"
        {...register('businessHours')}
        className="bg-gray-700 text-white border-gray-600"
      />
      {errors.businessHours && <ErrorMessage>{errors.businessHours.message}</ErrorMessage>}
      
      <Textarea
        placeholder="Enter your promotion message"
        {...register('promotionMessage')}
        className="bg-gray-700 text-white border-gray-600"
      />
      {errors.promotionMessage && <ErrorMessage>{errors.promotionMessage.message}</ErrorMessage>}
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="autoReplyEnabled"
          {...register('autoReplyEnabled')}
          className="rounded bg-gray-700 border-gray-600"
        />
        <label htmlFor="autoReplyEnabled" className="text-white">Enable Auto Reply</label>
      </div>
      
      <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700">
        {isLoading ? 'Submitting...' : 'Create Business Profile'}
      </Button>
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </motion.form>
  )
}

export default BusinessForm

