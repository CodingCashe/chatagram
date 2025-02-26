"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  ChevronRight,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Industry templates moved to a separate constant
const industryTemplates = {
  ecommerce: [
    {
      title: "Welcome Message",
      content: "👋 Welcome to our store! How can I assist you with your shopping today?",
      tags: ["greeting", "shopping"],
    },
    {
      title: "Product Inquiry",
      content: "Would you like to browse our latest collection? I can help you find exactly what you're looking for.",
      tags: ["products", "browsing"],
    },
    {
      title: "Order Status",
      content: "I can help you track your order. Could you please provide your order number?",
      tags: ["orders", "support"],
    },
  ],
  services: [
    {
      title: "Service Introduction",
      content: "Welcome! I'd be happy to tell you more about our services. What are you interested in?",
      tags: ["introduction", "services"],
    },
    {
      title: "Consultation Booking",
      content: "Would you like to schedule a consultation? I can show you our available time slots.",
      tags: ["booking", "consultation"],
    },
  ],
  creator: [
    {
      title: "Collaboration Inquiry",
      content: "Thanks for reaching out! I'd love to discuss potential collaboration opportunities.",
      tags: ["collaboration", "partnership"],
    },
    {
      title: "Content Request",
      content: "I can help you with content-related inquiries. What type of content are you interested in?",
      tags: ["content", "inquiry"],
    },
  ],
}

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

export function CustomerFlowBuilder() {
  const [steps, setSteps] = useState<FlowStep[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [currentTemplate, setCurrentTemplate] = useState("ecommerce")
  const [selectedTab, setSelectedTab] = useState("builder")
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [aiThinking, setAiThinking] = useState(false)

  const generateAISuggestions = async (currentMessage: string) => {
    setAiThinking(true)
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

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
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

          <ScrollArea className="h-[calc(100vh-300px)] pr-4">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <Card
                  key={step.id}
                  className="p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 relative group hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-8 cursor-move bg-gray-800/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-l-lg">
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
                            <div key={idx} className="grid gap-2 sm:grid-cols-2">
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

                      <div className="flex flex-wrap items-center gap-4">
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
            </div>
          </ScrollArea>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Quick Templates
            </h3>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-3">
                {industryTemplates[currentTemplate as keyof typeof industryTemplates].map((template, index) => (
                  <Card
                    key={index}
                    className="p-4 bg-gray-800/30 border-gray-700 hover:border-purple-500/50 transition-all duration-200 cursor-pointer group"
                    onClick={() => addStep("message", template.content)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-100">{template.title}</h4>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2">{template.content}</p>
                      <div className="flex flex-wrap gap-2">
                        {template.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="secondary"
                            className="bg-gray-700/50 text-gray-300 border-gray-600"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              Flow Validation
            </h3>
            <div className="space-y-4">
              {steps.length === 0 ? (
                <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                  <p className="text-gray-400 text-sm">Add some steps to see validation results</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 p-3 rounded-lg">
                    <Check className="w-4 h-4" />
                    Flow structure is valid
                  </div>
                  <div className="flex items-center gap-2 text-blue-400 text-sm bg-blue-500/10 p-3 rounded-lg">
                    <Info className="w-4 h-4" />
                    {steps.length} steps in total
                  </div>
                  <div className="flex items-center gap-2 text-purple-400 text-sm bg-purple-500/10 p-3 rounded-lg">
                    <Timer className="w-4 h-4" />
                    Average response time: {steps.reduce((acc, step) => acc + (step.timing?.delay || 0), 0)}s
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

