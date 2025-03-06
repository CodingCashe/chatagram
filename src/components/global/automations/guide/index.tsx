"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  KeySquare,
  MessageSquare,
  SquareCheck,
  ChevronRight,
  Instagram,
  Settings,
  Info,
  Calendar,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const steps = [
  {
    id: 1,
    title: "Set up trigger keywords",
    description: "Choose words that will trigger your automation",
    icon: <KeySquare className="h-5 w-5 text-light-blue" />,
    tip: "Add 3-5 keywords for best results. Think about terms your customers might use when they're interested in your products or services.",
    appliesTo: "all",
  },
  {
    id: 2,
    title: "Select posts to monitor",
    description: "Choose which posts should trigger your automation",
    icon: <Instagram className="h-5 w-5 text-light-blue" />,
    tip: "You can select both existing and scheduled posts. The automation will monitor comments on these posts for your keywords.",
    appliesTo: "instagram",
  },
  {
    id: 3,
    title: "Create your response",
    description: "Set up the message that will be sent when triggered",
    icon: <MessageSquare className="h-5 w-5 text-light-blue" />,
    tip: "Keep responses conversational and helpful. You can use templates or create custom responses based on the keywords detected.",
    appliesTo: "all",
  },
  {
    id: 4,
    title: "Test your automation",
    description: "Use the simulation to test how your automation works",
    icon: <SquareCheck className="h-5 w-5 text-light-blue" />,
    tip: "The simulation tab lets you see exactly how your automation will respond to different messages containing your keywords.",
    appliesTo: "all",
  },
]

// Update the type definition for the SetupGuideProps interface
type SetupGuideProps = {
  automationType?: "all" | "instagram" | "dm" | "comment" // Define specific allowed values
  onStepComplete?: (stepId: number) => void
}

// Then update the component definition to use this type
export const SetupGuide = ({ automationType = "all", onStepComplete }: SetupGuideProps) => {
  const [expandedStep, setExpandedStep] = useState<number | null>(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const filterStepsByType = (automationType: SetupGuideProps["automationType"]) => {
    if (!automationType || automationType === "all") {
      return steps
    }
    return steps.filter((step) => step.appliesTo === "all" || step.appliesTo === automationType)
  }

  const filteredSteps = filterStepsByType(automationType)

  const toggleStep = (stepId: number) => {
    setExpandedStep(expandedStep === stepId ? null : stepId)
  }

  const markComplete = (stepId: number) => {
    const newCompletedSteps = completedSteps.includes(stepId)
      ? completedSteps.filter((id) => id !== stepId)
      : [...completedSteps, stepId]

    setCompletedSteps(newCompletedSteps)

    // Call the callback if provided
    if (onStepComplete) {
      onStepComplete(stepId)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <Info className="h-5 w-5 mr-2 text-light-blue" />
          Automation Setup Guide
        </h3>
      </div>

      <div className="bg-background-80 p-4 rounded-xl">
        <div className="space-y-4">
          {filteredSteps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connector line between steps */}
              {index < steps.length - 1 && (
                <div
                  className="absolute left-[18px] top-[40px] bottom-0 w-[2px] bg-background-90"
                  style={{ height: "calc(100% - 20px)" }}
                ></div>
              )}

              <div
                className={cn(
                  "flex items-start cursor-pointer p-2 rounded-lg hover:bg-background-90/50 transition-colors",
                  expandedStep === step.id && "bg-background-90/50",
                )}
                onClick={() => toggleStep(step.id)}
              >
                <div
                  className={cn(
                    "h-9 w-9 rounded-full flex items-center justify-center mr-3 flex-shrink-0",
                    completedSteps.includes(step.id)
                      ? "bg-light-blue/20 text-light-blue"
                      : "bg-background-90 text-text-secondary",
                  )}
                >
                  {completedSteps.includes(step.id) ? <SquareCheck className="h-5 w-5" /> : step.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={cn("font-medium", completedSteps.includes(step.id) && "text-light-blue")}>
                      {step.title}
                    </h4>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 text-text-secondary transition-transform",
                        expandedStep === step.id && "transform rotate-90",
                      )}
                    />
                  </div>
                  <p className="text-sm text-text-secondary">{step.description}</p>
                </div>
              </div>

              <AnimatePresence>
                {expandedStep === step.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-12 mt-2 overflow-hidden"
                  >
                    <div className="bg-background-90 p-3 rounded-lg mb-2">
                      <div className="flex items-start gap-2">
                        <div className="bg-light-blue/10 p-1 rounded-full">
                          <Info className="h-4 w-4 text-light-blue" />
                        </div>
                        <p className="text-sm text-text-secondary">{step.tip}</p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "text-xs",
                        completedSteps.includes(step.id)
                          ? "bg-light-blue/10 text-light-blue hover:bg-light-blue/20"
                          : "",
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        markComplete(step.id)
                      }}
                    >
                      {completedSteps.includes(step.id) ? "Mark as incomplete" : "Mark as complete"}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-background-80 p-4 rounded-xl">
        <h4 className="font-medium mb-3 flex items-center">
          <Zap className="h-4 w-4 mr-2 text-light-blue" />
          Quick Tips
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-background-90 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Settings className="h-4 w-4 text-light-blue" />
              <p className="font-medium text-sm">Automation Settings</p>
            </div>
            <p className="text-xs text-text-secondary">
              Configure your automation settings in the Settings tab to customize notifications and response timing.
            </p>
          </div>

          <div className="bg-background-90 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-light-blue" />
              <p className="font-medium text-sm">Scheduled Posts</p>
            </div>
            <p className="text-xs text-text-secondary">
              You can attach upcoming scheduled posts to your automation so they are monitored as soon as they go live.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetupGuide

