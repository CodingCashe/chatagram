// "use client"

// import { useState } from "react"
// import { Target, TrendingUp, MessageCircle, ShoppingCart, Calendar, HelpCircle } from "lucide-react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Slider } from "@/components/ui/slider"
// import { Textarea } from "@/components/ui/textarea"

// export default function AutomationGoalsForm() {
//   const [primaryGoal, setPrimaryGoal] = useState("")
//   const [responseTime, setResponseTime] = useState([30])
//   const [customGoals, setCustomGoals] = useState("")

//   return (
//     <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2 text-2xl">
//           <Target className="h-6 w-6 text-purple-400" />
//           Automation Goals
//         </CardTitle>
//         <CardDescription className="text-gray-400">
//           What do you want to achieve with your Instagram DM automation?
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-8">
//         <div className="space-y-4">
//           <Label className="text-gray-300 text-lg">Primary Goal</Label>
//           <RadioGroup
//             value={primaryGoal}
//             onValueChange={setPrimaryGoal}
//             className="grid grid-cols-1 md:grid-cols-2 gap-4"
//           >
//             <Label
//               htmlFor="lead-generation"
//               className={`flex items-start p-4 gap-3 rounded-lg border ${
//                 primaryGoal === "lead-generation"
//                   ? "border-purple-500 bg-purple-900/20"
//                   : "border-gray-700 bg-gray-900/50 hover:bg-gray-900"
//               } cursor-pointer transition-colors`}
//             >
//               <RadioGroupItem value="lead-generation" id="lead-generation" className="mt-1" />
//               <div className="space-y-1">
//                 <div className="font-medium flex items-center gap-2">
//                   <TrendingUp className="h-4 w-4 text-purple-400" />
//                   Lead Generation
//                 </div>
//                 <div className="text-sm text-gray-400">Capture contact information and qualify potential customers</div>
//               </div>
//             </Label>

//             <Label
//               htmlFor="customer-support"
//               className={`flex items-start p-4 gap-3 rounded-lg border ${
//                 primaryGoal === "customer-support"
//                   ? "border-purple-500 bg-purple-900/20"
//                   : "border-gray-700 bg-gray-900/50 hover:bg-gray-900"
//               } cursor-pointer transition-colors`}
//             >
//               <RadioGroupItem value="customer-support" id="customer-support" className="mt-1" />
//               <div className="space-y-1">
//                 <div className="font-medium flex items-center gap-2">
//                   <HelpCircle className="h-4 w-4 text-purple-400" />
//                   Customer Support
//                 </div>
//                 <div className="text-sm text-gray-400">Answer common questions and resolve simple issues</div>
//               </div>
//             </Label>

//             <Label
//               htmlFor="sales"
//               className={`flex items-start p-4 gap-3 rounded-lg border ${
//                 primaryGoal === "sales"
//                   ? "border-purple-500 bg-purple-900/20"
//                   : "border-gray-700 bg-gray-900/50 hover:bg-gray-900"
//               } cursor-pointer transition-colors`}
//             >
//               <RadioGroupItem value="sales" id="sales" className="mt-1" />
//               <div className="space-y-1">
//                 <div className="font-medium flex items-center gap-2">
//                   <ShoppingCart className="h-4 w-4 text-purple-400" />
//                   Sales Automation
//                 </div>
//                 <div className="text-sm text-gray-400">Guide customers through the purchase process</div>
//               </div>
//             </Label>

//             <Label
//               htmlFor="appointment"
//               className={`flex items-start p-4 gap-3 rounded-lg border ${
//                 primaryGoal === "appointment"
//                   ? "border-purple-500 bg-purple-900/20"
//                   : "border-gray-700 bg-gray-900/50 hover:bg-gray-900"
//               } cursor-pointer transition-colors`}
//             >
//               <RadioGroupItem value="appointment" id="appointment" className="mt-1" />
//               <div className="space-y-1">
//                 <div className="font-medium flex items-center gap-2">
//                   <Calendar className="h-4 w-4 text-purple-400" />
//                   Appointment Booking
//                 </div>
//                 <div className="text-sm text-gray-400">Schedule meetings, consultations, or service appointments</div>
//               </div>
//             </Label>
//           </RadioGroup>
//         </div>

//         <div className="space-y-4">
//           <div className="flex justify-between items-center">
//             <Label className="text-gray-300">
//               <MessageCircle className="h-4 w-4 inline mr-2 text-purple-400" />
//               Response Time Expectation
//             </Label>
//             <span className="text-sm font-medium text-purple-400">{responseTime[0]} minutes</span>
//           </div>
//           <Slider value={responseTime} onValueChange={setResponseTime} min={5} max={120} step={5} className="py-4" />
//           <div className="flex justify-between text-xs text-gray-500">
//             <span>Immediate (5 min)</span>
//             <span>Within 2 hours</span>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="customGoals" className="text-gray-300">
//             Additional Goals & Expectations
//           </Label>
//           <Textarea
//             id="customGoals"
//             value={customGoals}
//             onChange={(e) => setCustomGoals(e.target.value)}
//             placeholder="Any other specific goals or expectations for your automation?"
//             className="min-h-[100px] bg-gray-900 border-gray-700 text-gray-100"
//           />
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { useState } from "react"
import { Target, TrendingUp, MessageCircle, ShoppingCart, Calendar, HelpCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { saveAutomationGoals } from "@/actions/businfo" // Update with correct path

export default function AutomationGoalsForm({ businessId }: { businessId: string }) {
  const [primaryGoal, setPrimaryGoal] = useState("")
  const [responseTime, setResponseTime] = useState([30])
  const [customGoals, setCustomGoals] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<{ success: boolean; message: string } | null>(null)

  const handleSave = async () => {
    if (!primaryGoal) {
      setSaveStatus({
        success: false,
        message: "Please select a primary goal",
      })
      return
    }

    setIsSaving(true)
    setSaveStatus(null)

    try {
      const result = await saveAutomationGoals(businessId, {
        primaryGoal,
        responseTime: responseTime[0],
        customGoals,
      })

      if (result.status === 200) {
        setSaveStatus({
          success: true,
          message: "Automation goals saved successfully",
        })
      } else {
        setSaveStatus({
          success: false,
          message: result.data,
        })
      }
    } catch (error) {
      setSaveStatus({
        success: false,
        message: "An error occurred while saving",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Target className="h-6 w-6 text-blue-400" />
          Automation Goals
        </CardTitle>
        <CardDescription className="text-gray-400">
          What do you want to achieve with your Instagram DM automation?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <Label className="text-gray-300 text-lg">Primary Goal</Label>
          <RadioGroup
            value={primaryGoal}
            onValueChange={setPrimaryGoal}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Label
              htmlFor="lead-generation"
              className={`flex items-start p-4 gap-3 rounded-lg border ${
                primaryGoal === "lead-generation"
                  ? "border-purple-500 bg-purple-900/20"
                  : "border-gray-700 bg-gray-900/50 hover:bg-gray-900"
              } cursor-pointer transition-colors`}
            >
              <RadioGroupItem value="lead-generation" id="lead-generation" className="mt-1" />
              <div className="space-y-1">
                <div className="font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-400" />
                  Lead Generation
                </div>
                <div className="text-sm text-gray-400">Capture contact information and qualify potential customers</div>
              </div>
            </Label>

            <Label
              htmlFor="customer-support"
              className={`flex items-start p-4 gap-3 rounded-lg border ${
                primaryGoal === "customer-support"
                  ? "border-blue-500 bg-blue-900/20"
                  : "border-gray-700 bg-gray-900/50 hover:bg-gray-900"
              } cursor-pointer transition-colors`}
            >
              <RadioGroupItem value="customer-support" id="customer-support" className="mt-1" />
              <div className="space-y-1">
                <div className="font-medium flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-blue-400" />
                  Customer Support
                </div>
                <div className="text-sm text-gray-400">Answer common questions and resolve simple issues</div>
              </div>
            </Label>

            <Label
              htmlFor="sales"
              className={`flex items-start p-4 gap-3 rounded-lg border ${
                primaryGoal === "sales"
                  ? "border-blue-500 bg-blue-900/20"
                  : "border-gray-700 bg-gray-900/50 hover:bg-gray-900"
              } cursor-pointer transition-colors`}
            >
              <RadioGroupItem value="sales" id="sales" className="mt-1" />
              <div className="space-y-1">
                <div className="font-medium flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-blue-400" />
                  Sales Automation
                </div>
                <div className="text-sm text-gray-400">Guide customers through the purchase process</div>
              </div>
            </Label>

            <Label
              htmlFor="appointment"
              className={`flex items-start p-4 gap-3 rounded-lg border ${
                primaryGoal === "appointment"
                  ? "border-blue-500 bg-blue-900/20"
                  : "border-gray-700 bg-gray-900/50 hover:bg-gray-900"
              } cursor-pointer transition-colors`}
            >
              <RadioGroupItem value="appointment" id="appointment" className="mt-1" />
              <div className="space-y-1">
                <div className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-400" />
                  Appointment Booking
                </div>
                <div className="text-sm text-gray-400">Schedule meetings, consultations, or service appointments</div>
              </div>
            </Label>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-gray-300">
              <MessageCircle className="h-4 w-4 inline mr-2 text-blue-400" />
              Response Time Expectation
            </Label>
            <span className="text-sm font-medium text-blue-400">{responseTime[0]} minutes</span>
          </div>
          <Slider value={responseTime} onValueChange={setResponseTime} min={5} max={120} step={5} className="py-4" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Immediate (5 min)</span>
            <span>Within 2 hours</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="customGoals" className="text-gray-300">
            Additional Goals & Expectations
          </Label>
          <Textarea
            id="customGoals"
            value={customGoals}
            onChange={(e) => setCustomGoals(e.target.value)}
            placeholder="Any other specific goals or expectations for your automation?"
            className="min-h-[100px] bg-gray-900 border-gray-700 text-gray-100"
          />
        </div>

        {saveStatus && (
          <div
            className={`p-3 rounded-md ${saveStatus.success ? "bg-green-900/20 text-green-400" : "bg-red-900/20 text-red-400"}`}
          >
            {saveStatus.message}
          </div>
        )}

        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-gradient-to-r from-blue-600 to-blue-900 hover:from-blue-700 hover:to-blue-800 text-white"
          >
            {isSaving ? "Saving..." : "Save Goals"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

