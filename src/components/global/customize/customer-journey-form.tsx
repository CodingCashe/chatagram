"use client"

import { useState } from "react"
import { Route, ArrowRight, Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type JourneyStep = {
  id: string
  type: string
  message: string
  nextAction: string
}

export default function CustomerJourneyForm() {
  const [journeySteps, setJourneySteps] = useState<JourneyStep[]>([
    {
      id: "1",
      type: "greeting",
      message: "👋 Hi there! Thanks for reaching out to us on Instagram!",
      nextAction: "ask_question",
    },
    { id: "2", type: "ask_question", message: "What brings you to our page today?", nextAction: "wait_for_response" },
  ])

  const addStep = () => {
    const newId = (journeySteps.length + 1).toString()
    setJourneySteps([...journeySteps, { id: newId, type: "message", message: "", nextAction: "wait_for_response" }])
  }

  const updateStep = (id: string, field: keyof JourneyStep, value: string) => {
    setJourneySteps(journeySteps.map((step) => (step.id === id ? { ...step, [field]: value } : step)))
  }

  const removeStep = (id: string) => {
    if (journeySteps.length <= 2) return // Keep at least 2 steps
    setJourneySteps(journeySteps.filter((step) => step.id !== id))
  }

  return (
    <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Route className="h-6 w-6 text-purple-400" />
          Customer Journey
        </CardTitle>
        <CardDescription className="text-gray-400">
          Design the conversation flow for your Instagram automation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-6">
          {journeySteps.map((step, index) => (
            <div key={step.id} className="relative p-5 border border-gray-700 rounded-lg bg-gray-900/50">
              <div className="absolute -left-3 -top-3 flex items-center justify-center w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold">
                {index + 1}
              </div>

              {index > 0 && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <ArrowRight className="h-4 w-4 text-gray-500 rotate-90" />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor={`step-${step.id}-type`} className="text-gray-300 text-sm">
                    Step Type
                  </Label>
                  <Select value={step.type} onValueChange={(value) => updateStep(step.id, "type", value)}>
                    <SelectTrigger id={`step-${step.id}-type`} className="bg-gray-800 border-gray-700 text-gray-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                      <SelectItem value="greeting">Greeting</SelectItem>
                      <SelectItem value="ask_question">Ask Question</SelectItem>
                      <SelectItem value="provide_info">Provide Information</SelectItem>
                      <SelectItem value="collect_info">Collect Information</SelectItem>
                      <SelectItem value="offer_options">Offer Options</SelectItem>
                      <SelectItem value="confirmation">Confirmation</SelectItem>
                      <SelectItem value="handoff">Human Handoff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor={`step-${step.id}-message`} className="text-gray-300 text-sm">
                    Message
                  </Label>
                  <Input
                    id={`step-${step.id}-message`}
                    value={step.message}
                    onChange={(e) => updateStep(step.id, "message", e.target.value)}
                    placeholder="Enter message content"
                    className="bg-gray-800 border-gray-700 text-gray-100"
                  />
                </div>

                <div>
                  <Label htmlFor={`step-${step.id}-next`} className="text-gray-300 text-sm">
                    Next Action
                  </Label>
                  <Select value={step.nextAction} onValueChange={(value) => updateStep(step.id, "nextAction", value)}>
                    <SelectTrigger id={`step-${step.id}-next`} className="bg-gray-800 border-gray-700 text-gray-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                      <SelectItem value="wait_for_response">Wait for Response</SelectItem>
                      <SelectItem value="continue">Continue to Next Step</SelectItem>
                      <SelectItem value="branch">Branch Based on Response</SelectItem>
                      <SelectItem value="end_conversation">End Conversation</SelectItem>
                      <SelectItem value="human_handoff">Transfer to Human</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {journeySteps.length > 2 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeStep(step.id)}
                  className="absolute top-2 right-2 h-6 w-6 text-gray-400 hover:text-red-400 hover:bg-gray-800"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={addStep}
          className="w-full border-dashed border-gray-700 text-gray-400 hover:text-purple-400 hover:border-purple-500 hover:bg-gray-800/50"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Journey Step
        </Button>
      </CardContent>
    </Card>
  )
}

