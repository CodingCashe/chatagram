// import { Button } from "@/components/ui/button"
// import { FormSchema } from "./businessInfo"

// export interface FormSummaryProps {
//   data: FormSchema;
//   onEdit?: () => void;
//   onConfirm?: () => void;
// }

// export function FormSummary({ data, onEdit, onConfirm }: FormSummaryProps) {
//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold">Form Summary</h2>
//       <div>
//         <strong>Business Name:</strong> {data.businessName}
//       </div>
//       <div>
//         <strong>Business Type:</strong> {data.businessType}
//       </div>
//       <div>
//         <strong>Business Description:</strong> {data.businessDescription}
//       </div>
//       <div>
//         <strong>Industry:</strong> {data.industry}
//       </div>
//       <div>
//         <strong>Instagram Handle:</strong> {data.instagramHandle}
//       </div>
//       <div>
//         <strong>Welcome Message:</strong> {data.welcomeMessage}
//       </div>
//       <div>
//         <strong>Response Language:</strong> {data.responseLanguage}
//       </div>
//       <div>
//         <strong>Business Hours:</strong> {data.businessHours}
//       </div>
//       <div>
//         <strong>Promotion Message:</strong> {data.promotionMessage}
//       </div>
//       <div>
//         <strong>Auto Reply Enabled:</strong> {data.autoReplyEnabled ? 'Yes' : 'No'}
//       </div>
//       {(onEdit || onConfirm) && (
//         <div className="flex gap-4">
//           {onEdit && <Button onClick={onEdit}>Edit</Button>}
//           {onConfirm && <Button onClick={onConfirm}>Confirm</Button>}
//         </div>
//       )}
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { FormSchema } from "./businessInfo"
import { CheckCircle, Edit2, Clock, Instagram, Globe, MessageSquare, Bell, DollarSign } from "lucide-react"

export interface FormSummaryProps {
  data: FormSchema
  onEdit?: () => void
  onConfirm?: () => void
}

export function FormSummary({ data, onEdit, onConfirm }: FormSummaryProps) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  const sections = [
    { title: "Business Name", value: data.businessName, icon: <CheckCircle className="w-5 h-5" /> },
    { title: "Business Type", value: data.businessType, icon: <CheckCircle className="w-5 h-5" /> },
    { title: "Industry", value: data.industry, icon: <Globe className="w-5 h-5" /> },
    { title: "Instagram Handle", value: data.instagramHandle, icon: <Instagram className="w-5 h-5" /> },
    { title: "Response Language", value: data.responseLanguage, icon: <MessageSquare className="w-5 h-5" /> },
    { title: "Business Hours", value: data.businessHours, icon: <Clock className="w-5 h-5" /> },
    { title: "Auto Reply Enabled", value: data.autoReplyEnabled ? "Yes" : "No", icon: <Bell className="w-5 h-5" /> },
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white shadow-xl">
      <CardHeader>
        <motion.h2
          className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Business Profile Summary
        </motion.h2>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredSection(section.title)}
                onHoverEnd={() => setHoveredSection(null)}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-blue-400">{section.icon}</div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-300">{section.title}</h3>
                    <p className="text-xl font-bold text-white">{section.value}</p>
                  </div>
                </div>
                <AnimatePresence>
                  {hoveredSection === section.title && (
                    <motion.div
                      className="absolute inset-0 bg-blue-500 bg-opacity-10 rounded-lg"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
                {index < sections.length - 1 && <Separator className="my-4 bg-gray-700" />}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Business Description</h3>
              <p className="text-white bg-gray-800 bg-opacity-50 p-4 rounded-lg">{data.businessDescription}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Welcome Message</h3>
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                <p className="text-white italic">&quot;{data.welcomeMessage}&quot;</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Promotion Message</h3>
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg flex items-center space-x-3">
                <DollarSign className="text-yellow-400 w-6 h-6" />
                <p className="text-white">{data.promotionMessage}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Target Audience</h3>
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg flex items-center space-x-3">
                <DollarSign className="text-yellow-400 w-6 h-6" />
                <p className="text-white">{data.targetAudience}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Website Url</h3>
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg flex items-center space-x-3">
                <DollarSign className="text-yellow-400 w-6 h-6" />
                <p className="text-white">{data.website}</p>
              </div>
            </motion.div>
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4 mt-6">
        {onEdit && (
          <Button
            onClick={onEdit}
            variant="outline"
            className="bg-transparent border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        )}
        {onConfirm && (
          <Button
            onClick={onConfirm}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Confirm
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

