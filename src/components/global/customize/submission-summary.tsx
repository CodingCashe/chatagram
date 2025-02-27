// "use client"

// import { useState } from "react"
// import { CheckCircle, ClipboardCheck, Send } from "lucide-react"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"

// export default function SubmissionSummary() {
//   const [additionalNotes, setAdditionalNotes] = useState("")
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [isSubmitted, setIsSubmitted] = useState(false)

//   const handleSubmit = () => {
//     setIsSubmitting(true)

//     // Simulate API call
//     setTimeout(() => {
//       setIsSubmitting(false)
//       setIsSubmitted(true)
//     }, 2000)
//   }

//   return (
//     <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2 text-2xl">
//           <ClipboardCheck className="h-6 w-6 text-purple-400" />
//           Submission Summary
//         </CardTitle>
//         <CardDescription className="text-gray-400">
//           Review your automation request and provide any additional notes
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         {!isSubmitted ? (
//           <>
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="p-4 rounded-lg bg-gray-900/70 border border-gray-700">
//                   <h3 className="text-sm font-medium text-gray-400 mb-2">Business Type</h3>
//                   <p className="text-gray-200">E-commerce</p>
//                 </div>
//                 <div className="p-4 rounded-lg bg-gray-900/70 border border-gray-700">
//                   <h3 className="text-sm font-medium text-gray-400 mb-2">Primary Goal</h3>
//                   <p className="text-gray-200">Lead Generation</p>
//                 </div>
//                 <div className="p-4 rounded-lg bg-gray-900/70 border border-gray-700">
//                   <h3 className="text-sm font-medium text-gray-400 mb-2">Response Time</h3>
//                   <p className="text-gray-200">30 minutes</p>
//                 </div>
//                 <div className="p-4 rounded-lg bg-gray-900/70 border border-gray-700">
//                   <h3 className="text-sm font-medium text-gray-400 mb-2">Selected Features</h3>
//                   <p className="text-gray-200">AI Responses, Quick Replies, Product Catalog, Analytics</p>
//                 </div>
//               </div>

//               <div className="p-4 rounded-lg bg-gray-900/70 border border-gray-700">
//                 <h3 className="text-sm font-medium text-gray-400 mb-2">Journey Steps</h3>
//                 <ul className="space-y-2 text-gray-200">
//                   <li className="flex items-start gap-2">
//                     <span className="bg-purple-900/50 text-purple-400 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
//                       1
//                     </span>
//                     <span>Greeting: 👋 Hi there! Thanks for reaching out to us on Instagram!</span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <span className="bg-purple-900/50 text-purple-400 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
//                       2
//                     </span>
//                     <span>Ask Question: What brings you to our page today? </span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <span className="bg-purple-900/50 text-purple-400 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
//                       3
//                     </span>
//                     <span>Provide Information: Based on customer response</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="additionalNotes" className="text-gray-300">
//                 Additional Notes
//               </Label>
//               <Textarea
//                 id="additionalNotes"
//                 value={additionalNotes}
//                 onChange={(e) => setAdditionalNotes(e.target.value)}
//                 placeholder="Any additional information or special requirements for your automation?"
//                 className="min-h-[120px] bg-gray-900 border-gray-700 text-gray-100"
//               />
//             </div>
//           </>
//         ) : (
//           <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
//             <div className="h-16 w-16 rounded-full bg-green-900/20 flex items-center justify-center">
//               <CheckCircle className="h-8 w-8 text-green-500" />
//             </div>
//             <h3 className="text-xl font-medium text-gray-100">Request Submitted Successfully!</h3>
//             <p className="text-gray-400 max-w-md">
//               Thank you for your automation request. Our team will review your requirements and get back to you within
//               24 hours to discuss the next steps.
//             </p>
//             <div className="pt-4">
//               <p className="text-sm text-gray-500">Reference ID: #IG-AUTO-{Math.floor(Math.random() * 10000)}</p>
//             </div>
//           </div>
//         )}
//       </CardContent>
//       {!isSubmitted && (
//         <CardFooter className="flex justify-end">
//           <Button
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//             className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
//           >
//             {isSubmitting ? (
//               <>
//                 <span className="mr-2">Submitting</span>
//                 <svg
//                   className="animate-spin h-4 w-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//               </>
//             ) : (
//               <>
//                 <Send className="mr-2 h-4 w-4" />
//                 Submit Request
//               </>
//             )}
//           </Button>
//         </CardFooter>
//       )}
//     </Card>
//   )
// }

"use client"

import { useState } from "react"
import { CheckCircle, ClipboardCheck, Send } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { submitAutomationSetup } from "@/actions/businfo" // Update with correct path

export default function SubmissionSummary({
  businessId,
  businessData,
}: {
  businessId: string
  businessData: {
    name: string
    industry: string
    primaryGoal: string
    responseTime: number
    selectedFeatures: string[]
    journeySteps: Array<{
      id: string
      type: string
      message: string
    }>
  }
}) {
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const result = await submitAutomationSetup(businessId, additionalNotes)

      if (result.status === 200) {
        setIsSubmitted(true)
      } else {
        setSubmitError(result.data)
      }
    } catch (error) {
      setSubmitError("An error occurred while submitting. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <ClipboardCheck className="h-6 w-6 text-purple-400" />
          Submission Summary
        </CardTitle>
        <CardDescription className="text-gray-400">
          Review your automation request and provide any additional notes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isSubmitted ? (
          <>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-gray-900/70 border border-gray-700">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Business Type</h3>
                  <p className="text-gray-200">{businessData.industry || "Not specified"}</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-900/70 border border-gray-700">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Primary Goal</h3>
                  <p className="text-gray-200">{businessData.primaryGoal || "Not specified"}</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-900/70 border border-gray-700">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Response Time</h3>
                  <p className="text-gray-200">{businessData.responseTime || 30} minutes</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-900/70 border border-gray-700">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Selected Features</h3>
                  <p className="text-gray-200">
                    {businessData.selectedFeatures?.length
                      ? businessData.selectedFeatures.join(", ")
                      : "AI Responses, Quick Replies, Product Catalog, Analytics"}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gray-900/70 border border-gray-700">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Journey Steps</h3>
                <ul className="space-y-2 text-gray-200">
                  {businessData.journeySteps?.length
                    ? businessData.journeySteps.map((step, index) => (
                        <li key={step.id} className="flex items-start gap-2">
                          <span className="bg-purple-900/50 text-purple-400 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            {index + 1}
                          </span>
                          <span>{step.message}</span>
                        </li>
                      ))
                    : [
                        { id: "1", message: "👋 Hi there! Thanks for reaching out to us on Instagram!" },
                        { id: "2", message: "What brings you to our page today?" },
                        { id: "3", message: "Based on customer response" },
                      ].map((step, index) => (
                        <li key={step.id} className="flex items-start gap-2">
                          <span className="bg-purple-900/50 text-purple-400 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            {index + 1}
                          </span>
                          <span>{step.message}</span>
                        </li>
                      ))}
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalNotes" className="text-gray-300">
                Additional Notes
              </Label>
              <Textarea
                id="additionalNotes"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Any additional information or special requirements for your automation?"
                className="min-h-[120px] bg-gray-900 border-gray-700 text-gray-100"
              />
            </div>

            {submitError && <div className="p-3 rounded-md bg-red-900/20 text-red-400">{submitError}</div>}
          </>
        ) : (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-green-900/20 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-100">Request Submitted Successfully!</h3>
            <p className="text-gray-400 max-w-md">
              Thank you for your automation request. Our team will review your requirements and get back to you within
              24 hours to discuss the next steps.
            </p>
            <div className="pt-4">
              <p className="text-sm text-gray-500">Reference ID: #IG-AUTO-{Math.floor(Math.random() * 10000)}</p>
            </div>
          </div>
        )}
      </CardContent>
      {!isSubmitted && (
        <CardFooter className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            {isSubmitting ? (
              <>
                <span className="mr-2">Submitting</span>
                <svg
                  className="animate-spin h-4 w-4"
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
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Request
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

