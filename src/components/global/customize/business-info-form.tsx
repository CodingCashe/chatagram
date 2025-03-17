// "use client"

// import { useState } from "react"
// import { Briefcase, Instagram, Users } from "lucide-react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// export default function BusinessInfoForm() {
//   const [businessInfo, setBusinessInfo] = useState({
//     businessName: "",
//     instagramHandle: "",
//     website: "",
//     industry: "",
//     targetAudience: "",
//     businessDescription: "",
//   })

//   const handleChange = (field: string, value: string) => {
//     setBusinessInfo({
//       ...businessInfo,
//       [field]: value,
//     })
//   }

//   return (
//     <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2 text-2xl">
//           <Briefcase className="h-6 w-6 text-purple-400" />
//           Business Information
//         </CardTitle>
//         <CardDescription className="text-gray-400">
//           Tell us about your business to help us create a personalized automation flow
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <Label htmlFor="businessName" className="text-gray-300">
//               Business Name
//             </Label>
//             <Input
//               id="businessName"
//               value={businessInfo.businessName}
//               onChange={(e) => handleChange("businessName", e.target.value)}
//               placeholder="Your Business Name"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="instagramHandle" className="text-gray-300">
//               Instagram Handle
//             </Label>
//             <div className="relative">
//               <Instagram className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
//               <Input
//                 id="instagramHandle"
//                 value={businessInfo.instagramHandle}
//                 onChange={(e) => handleChange("instagramHandle", e.target.value)}
//                 placeholder="@yourbusiness"
//                 className="bg-gray-900 border-gray-700 text-gray-100 pl-10"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="website" className="text-gray-300">
//               Website
//             </Label>
//             <Input
//               id="website"
//               value={businessInfo.website}
//               onChange={(e) => handleChange("website", e.target.value)}
//               placeholder="https://yourbusiness.com"
//               className="bg-gray-900 border-gray-700 text-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="industry" className="text-gray-300">
//               Industry
//             </Label>
//             <Select onValueChange={(value) => handleChange("industry", value)}>
//               <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
//                 <SelectValue placeholder="Select industry" />
//               </SelectTrigger>
//               <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
//                 <SelectItem value="ecommerce">E-commerce</SelectItem>
//                 <SelectItem value="saas">SaaS</SelectItem>
//                 <SelectItem value="retail">Retail</SelectItem>
//                 <SelectItem value="healthcare">Healthcare</SelectItem>
//                 <SelectItem value="education">Education</SelectItem>
//                 <SelectItem value="finance">Finance</SelectItem>
//                 <SelectItem value="realestate">Real Estate</SelectItem>
//                 <SelectItem value="hospitality">Hospitality</SelectItem>
//                 <SelectItem value="other">Other</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="targetAudience" className="text-gray-300 flex items-center gap-2">
//             <Users className="h-4 w-4 text-purple-400" />
//             Target Audience
//           </Label>
//           <Textarea
//             id="targetAudience"
//             value={businessInfo.targetAudience}
//             onChange={(e) => handleChange("targetAudience", e.target.value)}
//             placeholder="Describe your ideal customers (age, interests, pain points, etc.)"
//             className="min-h-[80px] bg-gray-900 border-gray-700 text-gray-100"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="businessDescription" className="text-gray-300">
//             Business Description
//           </Label>
//           <Textarea
//             id="businessDescription"
//             value={businessInfo.businessDescription}
//             onChange={(e) => handleChange("businessDescription", e.target.value)}
//             placeholder="Tell us about your products/services and what makes your business unique"
//             className="min-h-[120px] bg-gray-900 border-gray-700 text-gray-100"
//           />
//         </div>
//       </CardContent>
//     </Card>
//   )
// }


"use client"

// import { useState, useEffect } from "react"
// import { Briefcase } from "lucide-react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { useToast } from "@/hooks/use-toast"
// import { saveBusinessInfo, getBusinessInfo } from "@/actions/business"

// export default function BusinessInfoForm({ businessId }: { businessId: string }) {
//   const [businessInfo, setBusinessInfo] = useState({
//     businessName: "",
//     instagramHandle: "",
//     website: "",
//     industry: "",
//     targetAudience: "",
//     businessDescription: "",
//   })
//   const [isLoading, setIsLoading] = useState(false)
//   const { toast } = useToast()

//   useEffect(() => {
//     const fetchBusinessInfo = async () => {
//       try {
//         const info = await getBusinessInfo(businessId)
//         if (info) {
//           setBusinessInfo(info)
//         }
//       } catch (error) {
//         console.error("Error fetching business info:", error)
//         toast({
//           title: "Error",
//           description: "Failed to load business information.",
//           variant: "destructive",
//         })
//       }
//     }

//     fetchBusinessInfo()
//   }, [businessId, toast])

//   const handleChange = (field: string, value: string) => {
//     setBusinessInfo({
//       ...businessInfo,
//       [field]: value,
//     })
//   }

//   const handleSubmit = async () => {
//     setIsLoading(true)
//     try {
//       await saveBusinessInfo(businessId, businessInfo)
//       toast({
//         title: "Success",
//         description: "Business information saved successfully.",
//       })
//     } catch (error) {
//       console.error("Error saving business info:", error)
//       toast({
//         title: "Error",
//         description: "Failed to save business information.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2 text-2xl">
//           <Briefcase className="h-6 w-6 text-purple-400" />
//           Business Information
//         </CardTitle>
//         <CardDescription className="text-gray-400">
//           Tell us about your business to help us create a personalized automation flow
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-6">{/* ... (existing form fields) ... */}</CardContent>
//       <CardFooter>
//         <Button
//           onClick={handleSubmit}
//           disabled={isLoading}
//           className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
//         >
//           {isLoading ? "Saving..." : "Save Business Information"}
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Briefcase, Instagram, Users } from "lucide-react"
import { Card,CardFooter, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { saveBusinessInfo, getBusinessInfo } from "@/actions/businfo/queries"

// export default function BusinessInfoForm() {
  export default function BusinessInfoForm({ businessId }: { businessId: string }) {
  const [businessInfo, setBusinessInfo] = useState({
    businessName: "",
    instagramHandle: "",
    website: "",
    industry: "",
    targetAudience: "",
    businessDescription: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        const info = await getBusinessInfo(businessId)
        if (info) {
          setBusinessInfo(info)
        }
      } catch (error) {
        console.error("Error fetching business info:", error)
        toast({
          title: "Error",
          description: "Failed to load business information.",
          variant: "destructive",
        })
      }
    }

    fetchBusinessInfo()
  }, [businessId, toast])

  const handleChange = (field: string, value: string) => {
    setBusinessInfo({
      ...businessInfo,
      [field]: value,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await saveBusinessInfo(businessId, businessInfo)
      toast({
        title: "Success",
        description: "Business information saved successfully.",
      })
    } catch (error) {
      console.error("Error saving business info:", error)
      toast({
        title: "Error",
        description: "Failed to save business information.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Briefcase className="h-6 w-6 text-purple-400" />
          Business Information
        </CardTitle>
        <CardDescription className="text-gray-400">
          Tell us about your business to help us create a personalized automation flow
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="businessName" className="text-gray-300">
              Business Name
            </Label>
            <Input
              id="businessName"
              value={businessInfo.businessName}
              onChange={(e) => handleChange("businessName", e.target.value)}
              placeholder="Your Business Name"
              className="bg-gray-900 border-gray-700 text-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagramHandle" className="text-gray-300">
              Instagram Handle
            </Label>
            <div className="relative">
              <Instagram className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="instagramHandle"
                value={businessInfo.instagramHandle}
                onChange={(e) => handleChange("instagramHandle", e.target.value)}
                placeholder="@yourbusiness"
                className="bg-gray-900 border-gray-700 text-gray-100 pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="text-gray-300">
              Website
            </Label>
            <Input
              id="website"
              value={businessInfo.website}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="https://yourbusiness.com"
              className="bg-gray-900 border-gray-700 text-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry" className="text-gray-300">
              Industry
            </Label>
            <Select onValueChange={(value) => handleChange("industry", value)}>
              <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                <SelectItem value="ecommerce">E-commerce</SelectItem>
                <SelectItem value="saas">SaaS</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="realestate">Real Estate</SelectItem>
                <SelectItem value="hospitality">Hospitality</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="targetAudience" className="text-gray-300 flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-400" />
            Target Audience
          </Label>
          <Textarea
            id="targetAudience"
            value={businessInfo.targetAudience}
            onChange={(e) => handleChange("targetAudience", e.target.value)}
            placeholder="Describe your ideal customers (age, interests, pain points, etc.)"
            className="min-h-[80px] bg-gray-900 border-gray-700 text-gray-100"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessDescription" className="text-gray-300">
            Business Description
          </Label>
          <Textarea
            id="businessDescription"
            value={businessInfo.businessDescription}
            onChange={(e) => handleChange("businessDescription", e.target.value)}
            placeholder="Tell us about your products/services and what makes your business unique"
            className="min-h-[120px] bg-gray-900 border-gray-700 text-gray-100"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-700 text-white"
        >
          {isLoading ? "Saving..." : "Save Business Information"}
        </Button>
      </CardFooter>
    </Card>
  )
}
