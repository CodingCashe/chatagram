"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, CheckCircle, AlertCircle, RefreshCw, MessageSquare, Clock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useQueryAutomation } from "@/hooks/user-queries"
import { cn } from "@/lib/utils"

type Props = {
  id: string
  theme?: {
    id: string
    name: string
    primary: string
    secondary: string
  }
}

const TestAutomation = ({
  id,
  theme = { id: "blue", name: "Blue", primary: "light-blue", secondary: "#768BDD" },
}: Props) => {
  const { data } = useQueryAutomation(id)
  const [testMessage, setTestMessage] = useState("")
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<null | {
    success: boolean
    message: string
    response?: string
    responseTime?: number
    matchedKeywords?: string[]
  }>(null)

  const isAI = data?.data?.listener?.listener === "SMARTAI"
  const keywords = data?.data?.keywords || []

  const runTest = () => {
    if (!testMessage.trim()) return

    setIsTesting(true)
    setTestResult(null)

    // Simulate processing time
    setTimeout(() => {
      // Check if the test message contains any of the keywords
      const matchedKeywords = keywords
        .filter((keyword) => testMessage.toLowerCase().includes(keyword.word.toLowerCase()))
        .map((keyword) => keyword.word)

      const success = matchedKeywords.length > 0

      if (success) {
        setTestResult({
          success: true,
          message: "Automation triggered successfully!",
          response: data?.data?.listener?.prompt || "Thank you for your message. We'll get back to you soon!",
          responseTime: Math.floor(Math.random() * 500) + 800, // Random time between 800-1300ms
          matchedKeywords,
        })
      } else {
        setTestResult({
          success: false,
          message: "Automation not triggered. No matching keywords found.",
        })
      }

      setIsTesting(false)
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl px-4 sm:px-0"
    >
      <div className="bg-gradient-to-r from-background-80 to-background-90 rounded-xl w-full overflow-hidden shadow-lg border border-background-80/50">
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#3352CC] via-[#768BDD] to-[#3352CC] w-full shimmerBorder" />

        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-background-90 rounded-xl">
              <Play className="h-6 w-6 text-[#768BDD]" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Test Your Automation</h3>
              <p className="text-text-secondary">Simulate a trigger to see how your automation will respond</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Test Input Section */}
            <div className="space-y-4">
              <div>
                <label htmlFor="test-message" className="block text-sm font-medium mb-2">
                  Simulate a message or comment
                </label>
                <div className="relative">
                  <Input
                    id="test-message"
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    placeholder="Type a message that would trigger your automation..."
                    className="bg-background-90 border-none pr-24"
                  />
                  <Button
                    onClick={runTest}
                    disabled={isTesting || !testMessage.trim()}
                    className="absolute right-1 top-1 bg-gradient-to-br from-[#3352CC] to-[#1C2D70] text-white h-8"
                  >
                    {isTesting ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-1" />
                        Test
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-text-secondary mt-2">
                  Enter a message that contains one of your trigger keywords to see how your automation would respond.
                </p>
              </div>

              {/* Keywords reminder */}
              <div className="bg-background-90 p-3 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Your trigger keywords:</h4>
                <div className="flex flex-wrap gap-2">
                  {keywords.length > 0 ? (
                    keywords.map((keyword) => (
                      <Badge key={keyword.id} className="bg-[#3352CC]/20 text-white border border-[#3352CC]/30">
                        {keyword.word}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-text-secondary">No keywords set up yet.</p>
                  )}
                </div>
              </div>

              {/* Test instructions */}
              <div className="bg-background-90 p-3 rounded-lg">
                <h4 className="text-sm font-medium mb-2">How testing works:</h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 flex-shrink-0 rounded-full bg-[#3352CC]/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs">1</span>
                    </div>
                    <span>Enter a message that contains your trigger keywords</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 flex-shrink-0 rounded-full bg-[#3352CC]/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs">2</span>
                    </div>
                    <span>Click Test to simulate the trigger</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 flex-shrink-0 rounded-full bg-[#3352CC]/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs">3</span>
                    </div>
                    <span>See how your automation would respond in real-time</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Test Results Section */}
            <div>
              <div className="bg-background-90 p-4 rounded-lg h-full">
                <h4 className="text-lg font-medium mb-4">Test Results</h4>

                {testResult ? (
                  <div className="space-y-4">
                    <div
                      className={cn(
                        "p-3 rounded-lg flex items-start gap-3",
                        testResult.success ? "bg-green-900/20" : "bg-red-900/20",
                      )}
                    >
                      {testResult.success ? (
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className={cn("font-medium", testResult.success ? "text-green-400" : "text-red-400")}>
                          {testResult.message}
                        </p>
                        {testResult.matchedKeywords && testResult.matchedKeywords.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-text-secondary mb-1">Matched keywords:</p>
                            <div className="flex flex-wrap gap-1">
                              {testResult.matchedKeywords.map((keyword, index) => (
                                <Badge key={index} className="bg-[#3352CC]">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {testResult.success && testResult.response && (
                      <div className="bg-background-80 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-medium flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-[#768BDD]" />
                            Automation Response
                          </h5>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-background-90/50 text-xs flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {testResult.responseTime}ms
                            </Badge>
                            {isAI && (
                              <Badge className="bg-purple-600 text-xs flex items-center gap-1">
                                <Sparkles className="h-3 w-3" />
                                AI
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="bg-background-90 p-3 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-[#3352CC] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                              YB
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Your Business</span>
                                <Badge variant="outline" className="bg-background-80/50 text-xs">
                                  Auto-response
                                </Badge>
                              </div>
                              <p className="mt-2 text-sm whitespace-pre-line">{testResult.response}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center h-[300px]">
                    <div className="p-4 rounded-full bg-background-80 mb-4">
                      <Play className="h-6 w-6 text-[#768BDD]" />
                    </div>
                    <p className="text-white font-medium">No test results yet</p>
                    <p className="text-sm text-text-secondary mt-1 max-w-xs">
                      Enter a test message and click Test to see how your automation would respond
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TestAutomation

