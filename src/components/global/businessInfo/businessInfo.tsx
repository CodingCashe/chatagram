'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { DragDropToggle } from '@/components/global/businessInfo/dragDrop'
import { createBusiness } from '@/lib/businessinfo'

const formSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  businessType: z.enum(['Retail', 'Service', 'E-Commerce', 'Agency']),
  businessDescription: z.string().min(10, 'Description must be at least 10 characters'),
  industry: z.enum(['Fashion', 'Beauty', 'Technology', 'Health', 'Food']),
  instagramHandle: z.string().min(1, 'Instagram handle is required'),
  welcomeMessage: z.string().min(1, 'Welcome message is required'),
  responseLanguage: z.enum(['English', 'Spanish', 'French', 'German', 'Other']),
  businessHours: z.string().min(1, 'Business hours are required'),
  autoReplyEnabled: z.boolean(),
  promotionMessage: z.string().min(1, 'Promotion message is required'),
})

type FormSchema = z.infer<typeof formSchema>;

const ErrorMessage = ({ error }: { error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined }) => {
  if (!error) return null;
  return <p className="mt-1 text-xs text-red-500">{error.message as React.ReactNode}</p>;
};

export function BusinessInfoForm() {
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: any) => {
    try {
      const result = await createBusiness(data)
      console.log('Business created:', result)
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('Error creating business:', error)
      // Handle error (e.g., show an error message)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-8 bg-gray-900 rounded-xl shadow-2xl text-gray-100"
    >
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
        Business Information Form
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="businessName">
              Business Name
            </label>
            <Input
              id="businessName"
              {...register('businessName')}
              className="w-full bg-gray-800 text-white"
              placeholder="Enter your business name"
            />
            <ErrorMessage error={errors.businessName as FieldError} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="businessType">
              Business Type
            </label>
            <Select {...register('businessType')}>
              <SelectTrigger className="w-full bg-gray-800 text-white">
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Retail">Retail</SelectItem>
                <SelectItem value="Service">Service</SelectItem>
                <SelectItem value="E-Commerce">E-Commerce</SelectItem>
                <SelectItem value="Agency">Agency</SelectItem>
              </SelectContent>
            </Select>
            <ErrorMessage error={errors.businessType as FieldError} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="businessDescription">
            Business Description
          </label>
          <Textarea
            id="businessDescription"
            {...register('businessDescription')}
            className="w-full bg-gray-800 text-white"
            placeholder="Describe your business"
            rows={4}
          />
          <ErrorMessage error={errors.businessDescription as FieldError} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="industry">
              Industry
            </label>
            <Select {...register('industry')}>
              <SelectTrigger className="w-full bg-gray-800 text-white">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fashion">Fashion</SelectItem>
                <SelectItem value="Beauty">Beauty</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
              </SelectContent>
            </Select>
            <ErrorMessage error={errors.industry as FieldError} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="instagramHandle">
              Instagram Handle
            </label>
            <Input
              id="instagramHandle"
              {...register('instagramHandle')}
              className="w-full bg-gray-800 text-white"
              placeholder="@yourbusiness"
            />
            <ErrorMessage error={errors.instagramHandle as FieldError} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="welcomeMessage">
            Welcome Message
          </label>
          <Textarea
            id="welcomeMessage"
            {...register('welcomeMessage')}
            className="w-full bg-gray-800 text-white"
            placeholder="Enter your welcome message"
            rows={3}
          />
          <ErrorMessage error={errors.welcomeMessage as FieldError} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="responseLanguage">
              Response Language
            </label>
            <Select {...register('responseLanguage')}>
              <SelectTrigger className="w-full bg-gray-800 text-white">
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
            <ErrorMessage error={errors.responseLanguage as FieldError} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="businessHours">
              Business Hours
            </label>
            <Input
              id="businessHours"
              {...register('businessHours')}
              className="w-full bg-gray-800 text-white"
              placeholder="e.g., Mon-Fri 9AM-5PM"
            />
            <ErrorMessage error={errors.businessHours as FieldError} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Auto-Reply Enabled
          </label>
          <DragDropToggle onToggle={(value) => setAutoReplyEnabled(value)} />
          <input
            type="hidden"
            {...register('autoReplyEnabled')}
            value={autoReplyEnabled.toString()}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="promotionMessage">
            Promotion Message
          </label>
          <Textarea
            id="promotionMessage"
            {...register('promotionMessage')}
            className="w-full bg-gray-800 text-white"
            placeholder="Enter your default promotion message"
            rows={3}
          />
          <ErrorMessage error={errors.promotionMessage as FieldError} />
        </div>
        <div className="text-center">
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Submit
          </Button>
        </div>
      </form>
    </motion.div>
  )
}

