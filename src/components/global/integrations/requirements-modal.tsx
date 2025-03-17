"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Instagram, PhoneIcon as WhatsApp, CheckCircle, AlertCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

interface RequirementsModalProps {
  platform: string
  onClose: () => void
}

export default function RequirementsModal({ platform, onClose }: RequirementsModalProps) {
  const [open, setOpen] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    setOpen(false)
    setTimeout(onClose, 300) // Allow animation to complete
  }

  const handleContinue = () => {
    if (currentStep < 3) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setCurrentStep((prev) => prev + 1)
      }, 1000)
    } else {
      handleClose()
    }
  }

  const getIcon = () => {
    if (platform === "instagram") {
      return <Instagram className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    }
    return <WhatsApp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
  }

  const getTitle = () => {
    if (platform === "instagram") {
      return "Instagram Integration"
    }
    return "WhatsApp Integration"
  }

  const getRequirements = () => {
    if (platform === "instagram") {
      return [
        { id: 1, text: "Public Instagram account", required: true },
        { id: 2, text: "Business or Creator account type", required: true },
        { id: 3, text: "Connected Facebook page", required: true },
        { id: 4, text: "At least 100 followers", required: false },
        { id: 5, text: "Complete profile with bio and profile picture", required: false },
      ]
    }
    return [
      { id: 1, text: "WhatsApp Business account", required: true },
      { id: 2, text: "Verified phone number", required: true },
      { id: 3, text: "Business verification", required: false },
      { id: 4, text: "Active for at least 30 days", required: false },
    ]
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md glassEffect">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            {getIcon()}
            <DialogTitle>{getTitle()}</DialogTitle>
          </div>
          <DialogDescription>
            Follow the steps below to connect your {platform === "instagram" ? "Instagram" : "WhatsApp"} account
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{currentStep}/3</span>
            </div>
            <Progress value={currentStep * 33.33} className="h-2" />
          </div>

          <Tabs value={`step-${currentStep}`} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="step-1" disabled={currentStep !== 1}>
                Requirements
              </TabsTrigger>
              <TabsTrigger value="step-2" disabled={currentStep !== 2}>
                Authorization
              </TabsTrigger>
              <TabsTrigger value="step-3" disabled={currentStep !== 3}>
                Confirmation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="step-1" className="space-y-4 py-4">
              <h3 className="text-sm font-medium">Before you connect, please ensure:</h3>
              <ul className="space-y-2">
                {getRequirements().map((req) => (
                  <li key={req.id} className="flex items-start space-x-2 text-sm">
                    {req.required ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    )}
                    <span>
                      {req.text}
                      {req.required ? (
                        <span className="text-red-500 ml-1">*</span>
                      ) : (
                        <span className="text-muted-foreground ml-1">(recommended)</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="text-sm text-muted-foreground">
                <p>* Required items must be completed before integration</p>
              </div>
            </TabsContent>

            <TabsContent value="step-2" className="space-y-4 py-4">
              <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950">
                <h3 className="font-medium mb-2">Authorization Required</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You will be redirected to {platform === "instagram" ? "Instagram" : "WhatsApp"} to authorize access to
                  your account. We request the following permissions:
                </p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                    Read profile information
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                    Read and write content
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                    Access analytics data
                  </li>
                </ul>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>You can revoke these permissions at any time from your account settings.</p>
              </div>
            </TabsContent>

            <TabsContent value="step-3" className="space-y-4 py-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="flex flex-col items-center justify-center py-4"
              >
                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900 mb-4 float">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-medium">Connection Successful!</h3>
                <p className="text-center text-sm text-muted-foreground mt-2 max-w-xs">
                  Your {platform === "instagram" ? "Instagram" : "WhatsApp"} account has been successfully connected.
                  You can now manage it from your dashboard.
                </p>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="flex flex-row items-center justify-between sm:justify-between">
          {currentStep < 3 ? (
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          ) : (
            <div></div> // Empty div to maintain layout 
          )}
          <Button
            onClick={handleContinue}
            className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : currentStep < 3 ? (
              "Continue"
            ) : (
              "Done"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

