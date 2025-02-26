"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  MessageSquare,
  Plus,
  ArrowRight,
  AlertCircle,
  Calendar,
  FileText,
  ShoppingCart,
  X,
  GripVertical,
} from "lucide-react"

type FlowStep = {
  id: string
  type: string
  message: string
  options?: string[]
}

export function CustomerFlowBuilder() {
  const [steps, setSteps] = useState<FlowStep[]>([])

  const addStep = (type: string) => {
    const newStep: FlowStep = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      message: "",
      options: type === "choice" ? [""] : undefined,
    }
    setSteps([...steps, newStep])
  }

  const removeStep = (id: string) => {
    setSteps(steps.filter((step) => step.id !== id))
  }

  const updateStep = (id: string, updates: Partial<FlowStep>) => {
    setSteps(
      steps.map((step) => {
        if (step.id === id) {
          return { ...step, ...updates }
        }
        return step
      }),
    )
  }

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Design Your Customer Flow</h2>
        <p className="text-gray-400">Build the conversation flow for your automated DM responses.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          {steps.map((step, index) => (
            <Card key={step.id} className="p-4 bg-gray-800/50 border-gray-700 relative group">
              <div className="absolute left-0 top-0 bottom-0 w-8 cursor-move bg-gray-700/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="w-4 h-4 text-gray-500" />
              </div>
              <div className="pl-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium text-purple-400">Step {index + 1}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeStep(step.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </Button>
                </div>
                <textarea
                  value={step.message}
                  onChange={(e) => updateStep(step.id, { message: e.target.value })}
                  placeholder="Enter message content..."
                  className="w-full h-24 px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {step.type === "choice" && step.options && (
                  <div className="space-y-2">
                    {step.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...step.options!]
                            newOptions[optionIndex] = e.target.value
                            updateStep(step.id, { options: newOptions })
                          }}
                          placeholder={`Option ${optionIndex + 1}`}
                          className="flex-1 px-3 py-1 bg-gray-900/50 border border-gray-700 rounded-md text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newOptions = step.options!.filter((_, i) => i !== optionIndex)
                            updateStep(step.id, { options: newOptions })
                          }}
                        >
                          <X className="w-4 h-4 text-gray-400" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newOptions = [...step.options!, ""]
                        updateStep(step.id, { options: newOptions })
                      }}
                      className="w-full border-gray-700 text-gray-400 hover:text-gray-100"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Option
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}

          <div className="flex items-center justify-center gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => addStep("message")}
              className="border-gray-700 text-gray-400 hover:text-gray-100"
            >
              <MessageSquare className="w-4 h-4 mr-2" /> Add Message
            </Button>
            <Button
              variant="outline"
              onClick={() => addStep("choice")}
              className="border-gray-700 text-gray-400 hover:text-gray-100"
            >
              <ArrowRight className="w-4 h-4 mr-2" /> Add Choice
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="p-6 bg-gray-800/50 border-gray-700">
            <h3 className="text-lg font-medium mb-4">Quick Templates</h3>
            <div className="space-y-2">
              {[
                { icon: AlertCircle, text: "Welcome Message" },
                { icon: Calendar, text: "Booking Flow" },
                { icon: FileText, text: "FAQ Response" },
                { icon: ShoppingCart, text: "Product Inquiry" },
              ].map(({ icon: Icon, text }) => (
                <Button
                  key={text}
                  variant="ghost"
                  className="w-full justify-start text-gray-400 hover:text-gray-100 hover:bg-gray-700/50"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {text}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

