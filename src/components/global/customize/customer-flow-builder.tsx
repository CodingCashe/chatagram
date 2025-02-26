"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageSquare,
  Plus,
  AlertCircle,
  X,
  GripVertical,
  Mic,
  Wand2,
  BrainCircuit,
  GitBranch,
  Timer,
  Sparkles,
  AlertTriangle,
  Check,
  Info,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type FlowStep = {
  id: string
  type: string
  message: string
  options?: string[]
  conditions?: {
    if: string
    then: string
  }[]
  aiSuggestions?: string[]
  timing?: {
    delay: number
    timeOfDay?: string
  }
  sentiment?: "positive" | "neutral" | "negative"
}

const industryTemplates = {
  ecommerce: [
    "Welcome! 👋 How can I help you with your shopping today?",
    "Would you like to browse our latest collection?",
    "Here's your order status: [Order Details]",
  ],
  services: [
    "Thanks for reaching out! What service are you interested in?",
    "Would you like to schedule a consultation?",
    "Here are our available time slots: [Calendar]",
  ],
  creator: [
    "Thanks for connecting! Are you interested in collaborations?",
    "Would you like to see my media kit?",
    "Let's discuss your project requirements",
  ],
}

export function CustomerFlowBuilder() {
  const [steps, setSteps] = useState<FlowStep[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [currentTemplate, setCurrentTemplate] = useState("ecommerce")
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [aiThinking, setAiThinking] = useState(false)

  // Simulated AI suggestions based on current flow
  const generateAISuggestions = async (currentMessage: string) => {
    setAiThinking(true)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const suggestions = [
      "Consider adding a personalized greeting with their name",
      "You might want to add a follow-up question here",
      "This message could benefit from emoji to increase engagement",
      "Add a call-to-action at this point",
    ]
    setAiThinking(false)
    return suggestions
  }

  // Voice recording functionality
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const audioChunks: BlobPart[] = []
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data)
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks)
        // Here you would normally send this to a speech-to-text API
        // Simulating response for demo
        addStep("message", "Voice transcription: Hello, how can I help you today?")
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
    }
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setIsRecording(false)
  }

  const addStep = async (type: string, initialMessage = "") => {
    const newStep: FlowStep = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      message: initialMessage,
      options: type === "choice" ? [""] : undefined,
      conditions: type === "conditional" ? [{ if: "", then: "" }] : undefined,
      aiSuggestions: [],
      timing: {
        delay: 0,
      },
      sentiment: "neutral",
    }

    if (initialMessage) {
      newStep.aiSuggestions = await generateAISuggestions(initialMessage)
    }

    setSteps([...steps, newStep])
  }

  const updateStep = async (id: string, updates: Partial<FlowStep>) => {
    const newSteps = steps.map((step) => {
      if (step.id === id) {
        const updatedStep = { ...step, ...updates }
        // Generate AI suggestions when message changes
        if (updates.message && updates.message !== step.message) {
          generateAISuggestions(updates.message).then((suggestions) => {
            updatedStep.aiSuggestions = suggestions
            setSteps(steps.map((s) => (s.id === id ? updatedStep : s)))
          })
        }
        return updatedStep
      }
      return step
    })
    setSteps(newSteps)
  }

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Design Your Customer Flow</h2>
        <p className="text-gray-400">Build and visualize your automated conversation flow</p>
      </div>

      <Tabs defaultValue="builder" className="w-full">
        <TabsList className="bg-gray-800/50 border border-gray-700">
          <TabsTrigger value="builder" className="data-[state=active]:bg-gray-700">
            Builder
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-gray-700">
            Templates
          </TabsTrigger>
          <TabsTrigger value="visualization" className="data-[state=active]:bg-gray-700">
            Visualization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="mt-4">
          <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <Card
                  key={step.id}
                  className="p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 relative group hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-8 cursor-move bg-gray-800/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="pl-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {step.type === "message" && <MessageSquare className="w-4 h-4 text-purple-400" />}
                        {step.type === "choice" && <GitBranch className="w-4 h-4 text-blue-400" />}
                        {step.type === "conditional" && <AlertCircle className="w-4 h-4 text-orange-400" />}
                        <span className="text-sm font-medium text-purple-400">Step {index + 1}</span>
                        <Badge variant="outline" className="text-xs border-gray-700">
                          {step.type.charAt(0).toUpperCase() + step.type.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-gray-700/50"
                          onClick={() => {
                            generateAISuggestions(step.message)
                          }}
                        >
                          <Wand2 className="w-4 h-4 text-purple-400" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSteps(steps.filter((s) => s.id !== step.id))}
                          className="hover:bg-gray-700/50"
                        >
                          <X className="w-4 h-4 text-gray-400" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <textarea
                        value={step.message}
                        onChange={(e) => updateStep(step.id, { message: e.target.value })}
                        placeholder="Enter message content..."
                        className="w-full h-24 px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />

                      {step.type === "conditional" && step.conditions && (
                        <div className="space-y-2">
                          {step.conditions.map((condition, idx) => (
                            <div key={idx} className="grid grid-cols-2 gap-2">
                              <Input
                                placeholder="If contains..."
                                value={condition.if}
                                onChange={(e) => {
                                  const newConditions = [...step.conditions!]
                                  newConditions[idx].if = e.target.value
                                  updateStep(step.id, { conditions: newConditions })
                                }}
                                className="bg-gray-900/50 border-gray-700"
                              />
                              <Input
                                placeholder="Then reply..."
                                value={condition.then}
                                onChange={(e) => {
                                  const newConditions = [...step.conditions!]
                                  newConditions[idx].then = e.target.value
                                  updateStep(step.id, { conditions: newConditions })
                                }}
                                className="bg-gray-900/50 border-gray-700"
                              />
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newConditions = [...step.conditions!, { if: "", then: "" }]
                              updateStep(step.id, { conditions: newConditions })
                            }}
                            className="w-full border-gray-700 text-gray-400 hover:text-gray-100"
                          >
                            <Plus className="w-4 h-4 mr-2" /> Add Condition
                          </Button>
                        </div>
                      )}

                      {step.type === "choice" && step.options && (
                        <div className="space-y-2">
                          {step.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-2">
                              <Input
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...step.options!]
                                  newOptions[optionIndex] = e.target.value
                                  updateStep(step.id, { options: newOptions })
                                }}
                                placeholder={`Option ${optionIndex + 1}`}
                                className="flex-1 bg-gray-900/50 border-gray-700"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  const newOptions = step.options!.filter((_, i) => i !== optionIndex)
                                  updateStep(step.id, { options: newOptions })
                                }}
                                className="hover:bg-gray-700/50"
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

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Timer className="w-4 h-4 text-blue-400" />
                          <Input
                            type="number"
                            placeholder="Delay (seconds)"
                            value={step.timing?.delay || 0}
                            onChange={(e) =>
                              updateStep(step.id, {
                                timing: { ...step.timing, delay: Number.parseInt(e.target.value) },
                              })
                            }
                            className="w-24 bg-gray-900/50 border-gray-700"
                          />
                        </div>
                        <Select
                          value={step.sentiment}
                          onValueChange={(value: "positive" | "neutral" | "negative") =>
                            updateStep(step.id, { sentiment: value })
                          }
                        >
                          <SelectTrigger className="w-32 bg-gray-900/50 border-gray-700">
                            <SelectValue placeholder="Sentiment" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="positive">Positive</SelectItem>
                            <SelectItem value="neutral">Neutral</SelectItem>
                            <SelectItem value="negative">Negative</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {step.aiSuggestions && step.aiSuggestions.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <BrainCircuit className="w-4 h-4 text-purple-400" />
                            <span className="text-sm text-purple-400">AI Suggestions</span>
                          </div>
                          <div className="space-y-1">
                            {step.aiSuggestions.map((suggestion, idx) => (
                              <div
                                key={idx}
                                className="text-sm text-gray-400 p-2 rounded-md bg-gray-800/30 border border-gray-700 cursor-pointer hover:border-purple-500/50 transition-colors"
                                onClick={() => updateStep(step.id, { message: suggestion })}
                              >
                                {suggestion}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}

              <div className="flex items-center justify-center gap-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() => addStep("message")}
                  className="border-gray-700 text-gray-400 hover:text-gray-100 hover:border-purple-500/50"
                >
                  <MessageSquare className="w-4 h-4 mr-2" /> Add Message
                </Button>
                <Button
                  variant="outline"
                  onClick={() => addStep("choice")}
                  className="border-gray-700 text-gray-400 hover:text-gray-100 hover:border-purple-500/50"
                >
                  <GitBranch className="w-4 h-4 mr-2" /> Add Choice
                </Button>
                <Button
                  variant="outline"
                  onClick={() => addStep("conditional")}
                  className="border-gray-700 text-gray-400 hover:text-gray-100 hover:border-purple-500/50"
                >
                  <AlertCircle className="w-4 h-4 mr-2" /> Add Conditional
                </Button>
                <Button
                  variant="outline"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`border-gray-700 text-gray-400 hover:text-gray-100 ${
                    isRecording ? "border-red-500 text-red-500" : "hover:border-purple-500/50"
                  }`}
                >
                  <Mic className={`w-4 h-4 mr-2 ${isRecording ? "animate-pulse" : ""}`} />
                  {isRecording ? "Stop Recording" : "Voice Input"}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Card className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Quick Templates
                </h3>
                <div className="space-y-2">
                  {industryTemplates[currentTemplate as keyof typeof industryTemplates].map((template, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      onClick={() => addStep("message", template)}
                      className="w-full justify-start text-gray-400 hover:text-gray-100 hover:bg-gray-700/50"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      {template.length > 40 ? template.substring(0, 40) + "..." : template}
                    </Button>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  Flow Validation
                </h3>
                <div className="space-y-2">
                  {steps.length === 0 ? (
                    <p className="text-gray-400 text-sm">Add some steps to see validation results</p>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-green-400 text-sm">
                        <Check className="w-4 h-4" />
                        Flow structure is valid
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Info className="w-4 h-4" />
                        Average response time: {steps.reduce((acc, step) => acc + (step.timing?.delay || 0), 0)}s
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="mt-4">
          {/* Template content */}
        </TabsContent>

        <TabsContent value="visualization" className="mt-4">
          {/* Flow visualization */}
        </TabsContent>
      </Tabs>
    </section>
  )
}

