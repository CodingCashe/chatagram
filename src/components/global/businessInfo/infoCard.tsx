import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getBusinessInfo, updateBusinessInfo } from '@/actions/businfo'
import { useToast } from "@/hooks/use-toast"
import { FormSchema } from './businessInfo'
import { Edit, Save, X } from 'lucide-react'

type BusinessInfoProps = {
  businessId: string
}

function BusinessInfo({ businessId }: BusinessInfoProps) {
  const [business, setBusiness] = useState<FormSchema | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedBusiness, setEditedBusiness] = useState<FormSchema | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      const result = await getBusinessInfo(businessId)
      if (result.status === 200 && 'data' in result) {
        setBusiness(result.data as FormSchema)
        setEditedBusiness(result.data as FormSchema)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch business information.",
          variant: "destructive",
        })
      }
    }
    fetchBusinessInfo()
  }, [businessId, toast])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedBusiness(business)
  }

  const handleSave = async () => {
    if (editedBusiness) {
      const result = await updateBusinessInfo(businessId, editedBusiness)
      if (result.status === 200) {
        setBusiness(editedBusiness)
        setIsEditing(false)
        toast({
          title: "Success",
          description: "Business information updated successfully!",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to update business information.",
          variant: "destructive",
        })
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditedBusiness(prev => prev ? { ...prev, [name]: value } : null)
  }

  if (!business) return <div>Loading...</div>

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 bg-gray-900 rounded-lg shadow-xl"
    >
      <Card className="bg-gray-800 text-white border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">{business.businessName}</CardTitle>
          {!isEditing ? (
            <Button onClick={handleEdit} variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          ) : (
            <div className="space-x-2">
              <Button onClick={handleSave} variant="outline" size="icon">
                <Save className="h-4 w-4" />
              </Button>
              <Button onClick={handleCancel} variant="outline" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(business).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm font-medium text-gray-400">{key}</label>
              {isEditing ? (
                key === 'businessType' || key === 'industry' || key === 'responseLanguage' ? (
                  <select
                    name={key}
                    value={editedBusiness?.[key as keyof FormSchema] as string}
                    onChange={handleChange}
                    className="mt-1 bg-gray-700 text-white border-gray-600 rounded-md"
                  >
                    {/* Add options based on the field */}
                    <option value="">Select {key}</option>
                    {key === 'businessType' && (
                      <>
                        <option value="Retail">Retail</option>
                        <option value="Service">Service</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Tech">Tech</option>
                      </>
                    )}
                    {key === 'industry' && (
                      <>
                        <option value="Fashion">Fashion</option>
                        <option value="Food">Food</option>
                        <option value="Technology">Technology</option>
                        <option value="Healthcare">Healthcare</option>
                      </>
                    )}
                    {key === 'responseLanguage' && (
                      <>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                      </>
                    )}
                  </select>
                ) : key === 'businessDescription' || key === 'welcomeMessage' || key === 'promotionMessage' ? (
                  <textarea
                    name={key}
                    value={editedBusiness?.[key as keyof FormSchema] as string}
                    onChange={handleChange}
                    className="mt-1 bg-gray-700 text-white border-gray-600 rounded-md"
                  />
                ) : key === 'autoReplyEnabled' ? (
                  <input
                    type="checkbox"
                    name={key}
                    checked={editedBusiness?.[key as keyof FormSchema] as boolean}
                    onChange={(e) => setEditedBusiness(prev => prev ? { ...prev, [key]: e.target.checked } : null)}
                    className="mt-1 bg-gray-700 border-gray-600 rounded"
                  />
                ) : (
                  <input
                    type="text"
                    name={key}
                    value={editedBusiness?.[key as keyof FormSchema] as string}
                    onChange={handleChange}
                    className="mt-1 bg-gray-700 text-white border-gray-600 rounded-md"
                  />
                )
              ) : (
                <p className="mt-1 text-lg">
                  {key === 'autoReplyEnabled' 
                    ? (value as boolean ? 'Yes' : 'No')
                    : value?.toString()}
                </p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default BusinessInfo

