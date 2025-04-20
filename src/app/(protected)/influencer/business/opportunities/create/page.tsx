// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { format } from "date-fns"
// import { cn } from "@/lib/utils"
// import { CalendarIcon, Loader2 } from "lucide-react"
// import { createOpportunity } from "@/actions/business"
// import { useToast } from "@/hooks/use-toast"

// export default function CreateOpportunityPage() {
//   const router = useRouter()
//   const { toast } = useToast()
//   const [loading, setLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     requirements: "",
//     platform: "",
//     contentType: "",
//     budget: "",
//     deadline: null as Date | null,
//     deliveryDate: null as Date | null,
//     tags: [] as string[],
//     isPublic: true,
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSelectChange = (name: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
//     if (checked) {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: [...(prev[name as keyof typeof prev] as string[]), value],
//       }))
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: (prev[name as keyof typeof prev] as string[]).filter((item) => item !== value),
//       }))
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!formData.title || !formData.description || !formData.platform || !formData.contentType || !formData.budget) {
//       toast({
//         title: "Missing fields",
//         description: "Please fill in all required fields",
//         variant: "destructive",
//       })
//       return
//     }

//     setLoading(true)

//     try {
//       const result = await createOpportunity({
//         ...formData,
//         budget: Number.parseFloat(formData.budget),
//       })

//       if (result.status === 200) {
//         toast({
//           title: "Opportunity created",
//           description: "Your opportunity has been created successfully",
//         })

//         router.push(`/business/opportunities/${result.data.id}`)
//       } else {
//         toast({
//           title: "Error",
//           description: typeof result.data === "string" ? result.data : "Failed to create opportunity",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error creating opportunity:", error)
//       toast({
//         title: "Error",
//         description: "An error occurred while creating your opportunity",
//         variant: "destructive",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="container mx-auto py-6 max-w-3xl">
//       <div className="flex flex-col space-y-2 mb-6">
//         <h1 className="text-3xl font-bold tracking-tight">Create Opportunity</h1>
//         <p className="text-muted-foreground">Post a new opportunity for influencers to collaborate with your brand</p>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <Card>
//           <CardHeader>
//             <CardTitle>Opportunity Details</CardTitle>
//             <CardDescription>Provide details about your collaboration opportunity</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="title">Title *</Label>
//               <Input
//                 id="title"
//                 name="title"
//                 placeholder="E.g., Summer Collection Promotion"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="description">Description *</Label>
//               <Textarea
//                 id="description"
//                 name="description"
//                 placeholder="Describe the opportunity in detail"
//                 rows={5}
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//               />
//               <p className="text-xs text-muted-foreground">
//                 Include information about your brand, the campaign goals, and what you're looking for
//               </p>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="requirements">Requirements</Label>
//               <Textarea
//                 id="requirements"
//                 name="requirements"
//                 placeholder="List any specific requirements for influencers"
//                 rows={3}
//                 value={formData.requirements}
//                 onChange={handleChange}
//               />
//               <p className="text-xs text-muted-foreground">
//                 E.g., minimum follower count, specific audience demographics, etc.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="platform">Platform *</Label>
//                 <Select
//                   value={formData.platform}
//                   onValueChange={(value) => handleSelectChange("platform", value)}
//                   required
//                 >
//                   <SelectTrigger id="platform">
//                     <SelectValue placeholder="Select platform" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="instagram">Instagram</SelectItem>
//                     <SelectItem value="youtube">YouTube</SelectItem>
//                     <SelectItem value="tiktok">TikTok</SelectItem>
//                     <SelectItem value="twitter">Twitter</SelectItem>
//                     <SelectItem value="multiple">Multiple Platforms</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="contentType">Content Type *</Label>
//                 <Select
//                   value={formData.contentType}
//                   onValueChange={(value) => handleSelectChange("contentType", value)}
//                   required
//                 >
//                   <SelectTrigger id="contentType">
//                     <SelectValue placeholder="Select content type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="post">Standard Post</SelectItem>
//                     <SelectItem value="video">Video</SelectItem>
//                     <SelectItem value="story">Story/Reel</SelectItem>
//                     <SelectItem value="review">Product Review</SelectItem>
//                     <SelectItem value="multiple">Multiple Types</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="budget">Budget (USD) *</Label>
//                 <Input
//                   id="budget"
//                   name="budget"
//                   type="number"
//                   placeholder="Enter your budget"
//                   value={formData.budget}
//                   onChange={handleChange}
//                   required
//                 />
//                 <p className="text-xs text-muted-foreground">This is the total budget for this opportunity</p>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="deadline">Application Deadline</Label>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <Button
//                       variant="outline"
//                       className={cn(
//                         "w-full justify-start text-left font-normal",
//                         !formData.deadline && "text-muted-foreground",
//                       )}
//                     >
//                       <CalendarIcon className="mr-2 h-4 w-4" />
//                       {formData.deadline ? format(formData.deadline, "PPP") : "Select date"}
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-auto p-0">
//                     <Calendar
//                       mode="single"
//                       selected={formData.deadline || undefined}
//                       onSelect={(date) => setFormData((prev) => ({ ...prev, deadline: date }))}
//                       initialFocus
//                       disabled={(date) => date < new Date()}
//                     />
//                   </PopoverContent>
//                 </Popover>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="deliveryDate">Expected Delivery Date</Label>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className={cn(
//                       "w-full justify-start text-left font-normal",
//                       !formData.deliveryDate && "text-muted-foreground",
//                     )}
//                   >
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {formData.deliveryDate ? format(formData.deliveryDate, "PPP") : "Select date"}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0">
//                   <Calendar
//                     mode="single"
//                     selected={formData.deliveryDate || undefined}
//                     onSelect={(date) => setFormData((prev) => ({ ...prev, deliveryDate: date }))}
//                     initialFocus
//                     disabled={(date) => date < new Date()}
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>

//             <div className="space-y-2">
//               <Label>Tags</Label>
//               <p className="text-xs text-muted-foreground mb-2">Select tags that are relevant to this opportunity</p>

//               <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                 {[
//                   "Fashion",
//                   "Beauty",
//                   "Fitness",
//                   "Travel",
//                   "Food",
//                   "Lifestyle",
//                   "Technology",
//                   "Gaming",
//                   "Business",
//                   "Education",
//                   "Product Launch",
//                   "Event",
//                   "Sponsored Post",
//                   "Review",
//                   "Giveaway",
//                 ].map((tag) => (
//                   <div key={tag} className="flex items-center space-x-2">
//                     <Checkbox
//                       id={`tag-${tag}`}
//                       checked={formData.tags.includes(tag)}
//                       onCheckedChange={(checked) => handleCheckboxChange("tags", tag, checked as boolean)}
//                     />
//                     <Label htmlFor={`tag-${tag}`} className="cursor-pointer">
//                       {tag}
//                     </Label>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="isPublic"
//                   checked={formData.isPublic}
//                   onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPublic: checked as boolean }))}
//                 />
//                 <Label htmlFor="isPublic" className="cursor-pointer">
//                   Make this opportunity public
//                 </Label>
//               </div>
//               <p className="text-xs text-muted-foreground ml-6">
//                 Public opportunities will be visible to all influencers. Private opportunities can only be shared
//                 directly with specific influencers.
//               </p>
//             </div>
//           </CardContent>
//           <CardFooter className="flex justify-between">
//             <Button variant="outline" type="button" onClick={() => router.back()}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={loading}>
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Creating...
//                 </>
//               ) : (
//                 "Create Opportunity"
//               )}
//             </Button>
//           </CardFooter>
//         </Card>
//       </form>
//     </div>
//   )
// }

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon, Loader2 } from "lucide-react"
import { createOpportunity } from "@/actions/business"
import { useToast } from "@/hooks/use-toast"

export default function CreateOpportunityPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    brandName: "", // Added brandName field
    title: "",
    description: "",
    requirements: "",
    platform: "",
    contentType: "",
    budget: "",
    deadline: null as Date | null,
    deliveryDate: null as Date | null,
    tags: [] as string[],
    isPublic: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        [name]: [...(prev[name as keyof typeof prev] as string[]), value],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: (prev[name as keyof typeof prev] as string[]).filter((item) => item !== value),
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.brandName ||
      !formData.title ||
      !formData.description ||
      !formData.platform ||
      !formData.contentType ||
      !formData.budget
    ) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const result = await createOpportunity({
        brandName: formData.brandName,
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements,
        platforms: [formData.platform],
        contentType: Array.isArray(formData.contentType) 
          ? formData.contentType 
          : [formData.contentType],
        budget: Number.parseFloat(formData.budget),
        category: formData.platform || 'default_category', // Add this required field
        deadline: formData.deadline || undefined,
        deliveryDate: formData.deliveryDate || undefined,
        tags: formData.tags,
        isPublic: formData.isPublic,
      });
    //   const result = await createOpportunity({
    //     brandName: formData.brandName,
    //     title: formData.title,
    //     description: formData.description,
    //     requirements: formData.requirements,
    //     platforms: [formData.platform], // Convert single platform to array
    //     contentType: Array.isArray(formData.contentType) 
    // ? formData.contentType 
    // : [formData.contentType],
    //     budget: Number.parseFloat(formData.budget),
    //     deadline: formData.deadline || undefined, // Convert null to undefined
    //     deliveryDate: formData.deliveryDate || undefined, // Convert null to undefined
    //     tags: formData.tags,
    //     isPublic: formData.isPublic,
    //   })

      if (result.status === 201 && result.data) {
        toast({
          title: "Opportunity created",
          description: "Your opportunity has been created successfully",
        })

        router.push(`/business/opportunities/${result.data.id}`)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create opportunity",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating opportunity:", error)
      toast({
        title: "Error",
        description: "An error occurred while creating your opportunity",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-6 max-w-3xl">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Create Opportunity</h1>
        <p className="text-muted-foreground">Post a new opportunity for influencers to collaborate with your brand</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Opportunity Details</CardTitle>
            <CardDescription>Provide details about your collaboration opportunity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="brandName">Brand Name *</Label>
              <Input
                id="brandName"
                name="brandName"
                placeholder="Your brand name"
                value={formData.brandName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="E.g., Summer Collection Promotion"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the opportunity in detail"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-muted-foreground">
                Include information about your brand, the campaign goals, and what youre looking for
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea
                id="requirements"
                name="requirements"
                placeholder="List any specific requirements for influencers"
                rows={3}
                value={formData.requirements}
                onChange={handleChange}
              />
              <p className="text-xs text-muted-foreground">
                E.g., minimum follower count, specific audience demographics, etc.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform *</Label>
                <Select
                  value={formData.platform}
                  onValueChange={(value) => handleSelectChange("platform", value)}
                  required
                >
                  <SelectTrigger id="platform">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="multiple">Multiple Platforms</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contentType">Content Type *</Label>
                <Select
                  value={formData.contentType}
                  onValueChange={(value) => handleSelectChange("contentType", value)}
                  required
                >
                  <SelectTrigger id="contentType">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="post">Standard Post</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="story">Story/Reel</SelectItem>
                    <SelectItem value="review">Product Review</SelectItem>
                    <SelectItem value="multiple">Multiple Types</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget (USD) *</Label>
                <Input
                  id="budget"
                  name="budget"
                  type="number"
                  placeholder="Enter your budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground">This is the total budget for this opportunity</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Application Deadline</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.deadline && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.deadline ? format(formData.deadline, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
          
                    <Calendar
                      mode="single"
                      selected={formData.deadline || undefined}
                      onSelect={(date) => setFormData((prev) => ({ 
                        ...prev, 
                        deadline: date || null  // Convert undefined to null
                      }))}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryDate">Expected Delivery Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.deliveryDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.deliveryDate ? format(formData.deliveryDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  
                  <Calendar
                    mode="single"
                    selected={formData.deliveryDate || undefined}
                    onSelect={(date) => setFormData((prev) => ({ 
                      ...prev, 
                      deliveryDate: date || null  // Convert undefined to null
                    }))}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <p className="text-xs text-muted-foreground mb-2">Select tags that are relevant to this opportunity</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  "Fashion",
                  "Beauty",
                  "Fitness",
                  "Travel",
                  "Food",
                  "Lifestyle",
                  "Technology",
                  "Gaming",
                  "Business",
                  "Education",
                  "Product Launch",
                  "Event",
                  "Sponsored Post",
                  "Review",
                  "Giveaway",
                ].map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag}`}
                      checked={formData.tags.includes(tag)}
                      onCheckedChange={(checked) => handleCheckboxChange("tags", tag, checked as boolean)}
                    />
                    <Label htmlFor={`tag-${tag}`} className="cursor-pointer">
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPublic"
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPublic: checked as boolean }))}
                />
                <Label htmlFor="isPublic" className="cursor-pointer">
                  Make this opportunity public
                </Label>
              </div>
              <p className="text-xs text-muted-foreground ml-6">
                Public opportunities will be visible to all influencers. Private opportunities can only be shared
                directly with specific influencers.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Opportunity"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

