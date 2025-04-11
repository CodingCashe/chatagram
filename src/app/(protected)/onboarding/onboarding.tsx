// "use client"

// import type React from "react"

// import { useState, useRef, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { useRouter } from "next/navigation"
// import {
//   AlertCircle,
//   AtSign,
//   BookOpen,
//   Camera,
//   Check,
//   ChevronRight,
//   DollarSign,
//   Flag,
//   Image,
//   Instagram,
//   Loader2,
//   Lock,
//   Mail,
//   MessageCircle,
//   Mic,
//   Palette,
//   Paperclip,
//   Phone,
//   Plus,
//   Save,
//   Share2,
//   Smartphone,
//   Sparkles,
//   Star,
//   TrendingUp,
//   Users,
//   Video,
//   Wand2,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Slider } from "@/components/ui/slider"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Checkbox } from "@/components/ui/checkbox"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Textarea } from "@/components/ui/textarea"
// import { toast } from "@/hooks/use-toast"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { cn } from "@/lib/utils"
// import confetti from "canvas-confetti"
// import { onBoardUser } from '@/actions/user'

// // Mock verification service
// const mockVerifyPhone = async (phone: string) => {
//   // Simulate API call
//   return new Promise<string>((resolve) => {
//     setTimeout(() => {
//       // Generate a random 6-digit code
//       const code = Math.floor(100000 + Math.random() * 900000).toString()
//       resolve(code)
//     }, 1500)
//   })
// }

// // Mock verification check
// const mockCheckVerificationCode = async (code: string, expectedCode: string) => {
//   // Simulate API call
//   return new Promise<boolean>((resolve) => {
//     setTimeout(() => {
//       resolve(code === expectedCode)
//     }, 1000)
//   })
// }

// // Mock AI analysis
// const mockAiAnalysis = async (handle: string) => {
//   return new Promise<{
//     followers: number
//     engagement: number
//     growthRate: number
//     topContent: string[]
//     audienceDemo: { age: string; gender: string; location: string }
//   }>((resolve) => {
//     setTimeout(() => {
//       resolve({
//         followers: Math.floor(1000 + Math.random() * 100000),
//         engagement: Math.random() * 8 + 1,
//         growthRate: Math.random() * 10,
//         topContent: ["Fashion", "Lifestyle", "Travel"],
//         audienceDemo: {
//           age: "18-34",
//           gender: "65% Female, 35% Male",
//           location: "US, UK, Canada",
//         },
//       })
//     }, 2000)
//   })
// }

// type SocialPlatform = {
//   name: string
//   icon: React.ReactNode
//   placeholder: string
//   color: string
// }

// const socialPlatforms: SocialPlatform[] = [
//   {
//     name: "Instagram",
//     icon: <Instagram className="h-4 w-4" />,
//     placeholder: "@yourusername",
//     color: "bg-gradient-to-r from-purple-500 to-pink-500",
//   },
//   {
//     name: "TikTok",
//     icon: <Video className="h-4 w-4" />,
//     placeholder: "@yourusername",
//     color: "bg-black",
//   },
//   {
//     name: "YouTube",
//     icon: <Play className="h-4 w-4" />,
//     placeholder: "@yourchannel",
//     color: "bg-red-600",
//   },
//   {
//     name: "Twitter",
//     icon: <MessageCircle className="h-4 w-4" />,
//     placeholder: "@yourusername",
//     color: "bg-blue-500",
//   },
// ]

// const contentCategories = [
//   { name: "Fashion", icon: "👗", color: "bg-pink-100 dark:bg-pink-900" },
//   { name: "Beauty", icon: "💄", color: "bg-purple-100 dark:bg-purple-900" },
//   { name: "Fitness", icon: "💪", color: "bg-green-100 dark:bg-green-900" },
//   { name: "Travel", icon: "✈️", color: "bg-blue-100 dark:bg-blue-900" },
//   { name: "Food", icon: "🍕", color: "bg-yellow-100 dark:bg-yellow-900" },
//   { name: "Lifestyle", icon: "🌿", color: "bg-teal-100 dark:bg-teal-900" },
//   { name: "Tech", icon: "📱", color: "bg-gray-100 dark:bg-gray-800" },
//   { name: "Gaming", icon: "🎮", color: "bg-indigo-100 dark:bg-indigo-900" },
//   { name: "Business", icon: "💼", color: "bg-amber-100 dark:bg-amber-900" },
//   { name: "Education", icon: "📚", color: "bg-red-100 dark:bg-red-900" },
//   { name: "Art", icon: "🎨", color: "bg-fuchsia-100 dark:bg-fuchsia-900" },
//   { name: "Music", icon: "🎵", color: "bg-cyan-100 dark:bg-cyan-900" },
// ]

// const incomeRanges = [
//   { min: 0, max: 1000, label: "Up to $1,000/month", level: "Starter" },
//   { min: 1000, max: 5000, label: "$1,000 - $5,000/month", level: "Growing" },
//   { min: 5000, max: 10000, label: "$5,000 - $10,000/month", level: "Established" },
//   { min: 10000, max: 20000, label: "$10,000 - $20,000/month", level: "Professional" },
//   { min: 20000, max: 50000, label: "$20,000 - $50,000/month", level: "Elite" },
//   { min: 50000, max: 100000, label: "$50,000+/month", level: "Celebrity" },
// ]

// const contentFrequencies = ["Daily", "3-5 times per week", "1-2 times per week", "Few times a month"]

// const brandCollabTypes = [
//   "Sponsored Posts",
//   "Brand Ambassador",
//   "Affiliate Marketing",
//   "Product Reviews",
//   "Event Appearances",
//   "Content Creation",
// ]

// const learningTopics = [
//   "Content Creation",
//   "Audience Growth",
//   "Engagement Strategies",
//   "Monetization",
//   "Photography/Videography",
//   "Personal Branding",
// ]

// const growthChallenges = [
//   "Finding My Niche",
//   "Creating Consistent Content",
//   "Growing My Audience",
//   "Engagement Rate",
//   "Monetization",
//   "Work-Life Balance",
// ]

// const contentStyles = [
//   { name: "Minimalist", icon: "✨", description: "Clean, simple aesthetics" },
//   { name: "Vibrant", icon: "🌈", description: "Bold colors and energy" },
//   { name: "Vintage", icon: "📷", description: "Retro and nostalgic vibes" },
//   { name: "Luxury", icon: "💎", description: "High-end and sophisticated" },
//   { name: "Playful", icon: "🎨", description: "Fun and creative expression" },
//   { name: "Nature", icon: "🌿", description: "Organic and earthy elements" },
// ]

// const personalityTypes = [
//   {
//     type: "Creator",
//     description: "You thrive on making original content and expressing yourself",
//     icon: <Palette className="h-5 w-5" />,
//     strengths: ["Original content", "Creative expression", "Unique perspective"],
//     strategies: ["Focus on quality over quantity", "Develop a signature style", "Collaborate with other creators"],
//   },
//   {
//     type: "Connector",
//     description: "You excel at building relationships and engaging with your audience",
//     icon: <Users className="h-5 w-5" />,
//     strengths: ["Community building", "Engagement", "Authenticity"],
//     strategies: ["Prioritize comments and messages", "Host live sessions", "Create interactive content"],
//   },
//   {
//     type: "Educator",
//     description: "You love sharing knowledge and teaching others",
//     icon: <BookOpen className="h-5 w-5" />,
//     strengths: ["Informative content", "Clear communication", "Expertise"],
//     strategies: ["Create how-to content", "Share insights and tips", "Develop series content"],
//   },
//   {
//     type: "Trendsetter",
//     description: "You stay ahead of the curve and influence what's next",
//     icon: <TrendingUp className="h-5 w-5" />,
//     strengths: ["Early adoption", "Trend awareness", "Cultural relevance"],
//     strategies: ["Monitor emerging trends", "Put your unique spin on trends", "Be first to market"],
//   },
// ]

// // Custom hook for saving progress
// const useSaveProgress = (data: any) => {
//   const [isSaving, setIsSaving] = useState(false)
//   const [lastSaved, setLastSaved] = useState<Date | null>(null)

//   const saveProgress = () => {
//     setIsSaving(true)
//     // Simulate saving to server
//     setTimeout(() => {
//       setIsSaving(false)
//       setLastSaved(new Date())
//       // In a real app, you would save to localStorage or a database
//       localStorage.setItem("onboardingProgress", JSON.stringify(data))
//     }, 1000)
//   }

//   return { saveProgress, isSaving, lastSaved }
// }

// // Custom component for 3D flip card
// const FlipCard = ({
//   front,
//   back,
//   isFlipped,
//   onClick,
// }: {
//   front: React.ReactNode
//   back: React.ReactNode
//   isFlipped: boolean
//   onClick: () => void
// }) => {
//   return (
//     <div className="relative h-[200px] w-full cursor-pointer perspective-1000" onClick={onClick}>
//       <div
//         className={cn(
//           "relative h-full w-full duration-500 preserve-3d transition-all",
//           isFlipped ? "rotate-y-180" : "",
//         )}
//       >
//         <div className="absolute inset-0 backface-hidden">{front}</div>
//         <div className="absolute inset-0 rotate-y-180 backface-hidden">{back}</div>
//       </div>
//     </div>
//   )
// }

// // Custom component for animated mascot
// const Mascot = ({ emotion = "happy" }: { emotion?: "happy" | "thinking" | "excited" | "confused" }) => {
//   const animations = {
//     happy: {
//       y: [0, -10, 0],
//       transition: { repeat: Number.POSITIVE_INFINITY, duration: 2 },
//     },
//     thinking: {
//       rotate: [0, 10, 0, -10, 0],
//       transition: { repeat: Number.POSITIVE_INFINITY, duration: 3 },
//     },
//     excited: {
//       scale: [1, 1.1, 1],
//       transition: { repeat: Number.POSITIVE_INFINITY, duration: 0.5 },
//     },
//     confused: {
//       rotate: [0, 5, 0, -5, 0],
//       transition: { repeat: Number.POSITIVE_INFINITY, duration: 1.5 },
//     },
//   }

//   return (
//     <motion.div className="relative h-16 w-16 rounded-full bg-primary/20 p-2" animate={animations[emotion]}>
//       <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/30">
//         {emotion === "happy" && <span className="text-2xl">😊</span>}
//         {emotion === "thinking" && <span className="text-2xl">🤔</span>}
//         {emotion === "excited" && <span className="text-2xl">🤩</span>}
//         {emotion === "confused" && <span className="text-2xl">😕</span>}
//       </div>
//     </motion.div>
//   )
// }

// // Custom component for interactive calendar
// const ContentCalendar = ({
//   selectedDays,
//   onSelectDay,
// }: {
//   selectedDays: number[]
//   onSelectDay: (day: number) => void
// }) => {
//   const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

//   return (
//     <div className="grid grid-cols-7 gap-1">
//       {days.map((day, index) => (
//         <div key={day} className="flex flex-col items-center">
//           <div className="text-xs font-medium text-muted-foreground">{day}</div>
//           <Button
//             variant={selectedDays.includes(index) ? "default" : "outline"}
//             size="sm"
//             className="mt-1 h-8 w-8 p-0"
//             onClick={() => onSelectDay(index)}
//           >
//             {selectedDays.includes(index) && <Check className="h-3 w-3" />}
//           </Button>
//         </div>
//       ))}
//     </div>
//   )
// }

// // Custom component for voice input simulation
// const VoiceInput = ({
//   onComplete,
// }: {
//   onComplete: (text: string) => void
// }) => {
//   const [isRecording, setIsRecording] = useState(false)
//   const [progress, setProgress] = useState(0)

//   const startRecording = () => {
//     setIsRecording(true)
//     setProgress(0)

//     // Simulate recording progress
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval)
//           setIsRecording(false)
//           onComplete("I want to grow my Instagram account and connect with more people who share my interests.")
//           return 100
//         }
//         return prev + 5
//       })
//     }, 150)
//   }

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       <Button
//         variant={isRecording ? "destructive" : "outline"}
//         size="lg"
//         className={cn("h-16 w-16 rounded-full", isRecording && "animate-pulse")}
//         onClick={startRecording}
//         disabled={isRecording}
//       >
//         <Mic className="h-6 w-6" />
//       </Button>

//       {isRecording && (
//         <div className="w-full space-y-2">
//           <div className="flex items-center justify-between">
//             <span className="text-xs text-muted-foreground">Recording...</span>
//             <span className="text-xs text-muted-foreground">{progress}%</span>
//           </div>
//           <Progress value={progress} className="h-1" />
//         </div>
//       )}

//       <p className="text-center text-sm text-muted-foreground">
//         {isRecording ? "Listening... speak clearly" : "Tap to record your goals"}
//       </p>
//     </div>
//   )
// }

// // Custom component for AI profile analysis
// const AiProfileAnalysis = ({
//   handle,
//   onComplete,
// }: {
//   handle: string
//   onComplete: (data: any) => void
// }) => {
//   const [isAnalyzing, setIsAnalyzing] = useState(false)
//   const [progress, setProgress] = useState(0)
//   const [result, setResult] = useState<any>(null)

//   const startAnalysis = async () => {
//     setIsAnalyzing(true)
//     setProgress(0)

//     // Simulate analysis progress
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 95) {
//           clearInterval(interval)
//           return 95
//         }
//         return prev + Math.random() * 10
//       })
//     }, 300)

//     try {
//       const data = await mockAiAnalysis(handle)
//       clearInterval(interval)
//       setProgress(100)
//       setResult(data)
//       onComplete(data)
//       setTimeout(() => {
//         setIsAnalyzing(false)
//       }, 500)
//     } catch (error) {
//       clearInterval(interval)
//       setIsAnalyzing(false)
//       toast({
//         title: "Analysis Failed",
//         description: "Could not analyze profile",
//         variant: "destructive",
//       })
//     }
//   }

//   useEffect(() => {
//     if (handle && !result) {
//       startAnalysis()
//     }
//   }, [handle])

//   if (!isAnalyzing && result) {
//     return (
//       <div className="space-y-4 rounded-lg border bg-card p-4">
//         <div className="flex items-center justify-between">
//           <h3 className="font-semibold">AI Analysis Results</h3>
//           <Badge variant="outline" className="bg-primary/10">
//             <Sparkles className="mr-1 h-3 w-3" /> AI Generated
//           </Badge>
//         </div>

//         <div className="grid gap-3">
//           <div className="flex items-center justify-between rounded-md bg-muted p-2">
//             <span className="text-sm">Followers</span>
//             <span className="font-medium">{result.followers.toLocaleString()}</span>
//           </div>
//           <div className="flex items-center justify-between rounded-md bg-muted p-2">
//             <span className="text-sm">Engagement Rate</span>
//             <span className="font-medium">{result.engagement.toFixed(1)}%</span>
//           </div>
//           <div className="flex items-center justify-between rounded-md bg-muted p-2">
//             <span className="text-sm">Growth Rate</span>
//             <span className="font-medium">+{result.growthRate.toFixed(1)}%/month</span>
//           </div>
//           <div className="flex items-center justify-between rounded-md bg-muted p-2">
//             <span className="text-sm">Top Performing Content</span>
//             <div className="flex gap-1">
//               {result.topContent.map((category: string) => (
//                 <Badge key={category} variant="outline" className="text-xs">
//                   {category}
//                 </Badge>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h3 className="font-semibold">Analyzing @{handle}</h3>
//         <Badge variant="outline" className="animate-pulse bg-primary/10">
//           <Wand2 className="mr-1 h-3 w-3" /> AI Working
//         </Badge>
//       </div>

//       <div className="space-y-2">
//         <div className="flex items-center justify-between">
//           <span className="text-xs text-muted-foreground">Analyzing profile data...</span>
//           <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
//         </div>
//         <Progress value={progress} className="h-1" />
//       </div>

//       <div className="space-y-2">
//         {progress > 30 && (
//           <div className="flex items-center gap-2 text-xs text-muted-foreground">
//             <Check className="h-3 w-3 text-green-500" />
//             Fetching profile statistics
//           </div>
//         )}
//         {progress > 50 && (
//           <div className="flex items-center gap-2 text-xs text-muted-foreground">
//             <Check className="h-3 w-3 text-green-500" />
//             Analyzing content performance
//           </div>
//         )}
//         {progress > 70 && (
//           <div className="flex items-center gap-2 text-xs text-muted-foreground">
//             <Check className="h-3 w-3 text-green-500" />
//             Evaluating audience demographics
//           </div>
//         )}
//         {progress > 90 && (
//           <div className="flex items-center gap-2 text-xs text-muted-foreground">
//             <Loader2 className="h-3 w-3 animate-spin" />
//             Generating recommendations
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// // Custom component for income projection visualization
// const IncomeProjection = ({
//   currentIncome = 0,
//   targetIncome = 5000,
//   months = 12,
// }: {
//   currentIncome?: number
//   targetIncome?: number
//   months?: number
// }) => {
//   // Generate projection data
//   const generateProjectionData = () => {
//     const data = []
//     const monthlyGrowth = (targetIncome - currentIncome) / months

//     for (let i = 0; i <= months; i++) {
//       data.push({
//         month: i,
//         value: Math.max(0, currentIncome + monthlyGrowth * i),
//       })
//     }

//     return data
//   }

//   const projectionData = generateProjectionData()
//   const maxValue = Math.max(...projectionData.map((d) => d.value))

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h3 className="font-semibold">Income Projection</h3>
//         <Badge variant="outline">{months} months</Badge>
//       </div>

//       <div className="h-[150px] w-full">
//         <div className="flex h-full items-end gap-1">
//           {projectionData.map((data, index) => (
//             <div key={index} className="group relative flex flex-1 flex-col items-center">
//               <div className="absolute -top-8 z-10 hidden rounded-md bg-black/80 px-2 py-1 text-xs text-white group-hover:block">
//                 ${Math.round(data.value).toLocaleString()}
//               </div>
//               <div
//                 className={cn(
//                   "w-full rounded-t-sm",
//                   index === 0 ? "bg-muted" : index === months ? "bg-green-500" : "bg-primary",
//                 )}
//                 style={{
//                   height: `${(data.value / maxValue) * 100}%`,
//                   opacity: 0.3 + (data.value / maxValue) * 0.7,
//                 }}
//               />
//               {index % 3 === 0 && <div className="mt-1 text-[10px] text-muted-foreground">{index}m</div>}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex items-center justify-between text-sm">
//         <div>
//           <div className="font-medium">${currentIncome.toLocaleString()}</div>
//           <div className="text-xs text-muted-foreground">Current</div>
//         </div>
//         <div className="text-right">
//           <div className="font-medium">${targetIncome.toLocaleString()}</div>
//           <div className="text-xs text-muted-foreground">Target</div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Custom component for achievement badges
// const AchievementBadge = ({
//   title,
//   icon,
//   isUnlocked = false,
//   onUnlock,
// }: {
//   title: string
//   icon: React.ReactNode
//   isUnlocked?: boolean
//   onUnlock?: () => void
// }) => {
//   return (
//     <div
//       className={cn(
//         "group relative flex flex-col items-center rounded-lg border p-3 transition-all",
//         isUnlocked
//           ? "border-primary bg-primary/5"
//           : "border-dashed border-muted-foreground/30 bg-muted/50 opacity-70 hover:opacity-100",
//       )}
//       onClick={() => !isUnlocked && onUnlock?.()}
//     >
//       <div
//         className={cn(
//           "flex h-12 w-12 items-center justify-center rounded-full",
//           isUnlocked ? "bg-primary/20" : "bg-muted",
//         )}
//       >
//         {icon}
//       </div>
//       <div className="mt-2 text-center">
//         <div className="text-xs font-medium">{title}</div>
//         <div className="text-[10px] text-muted-foreground">{isUnlocked ? "Unlocked" : "Locked"}</div>
//       </div>

//       {!isUnlocked && (
//         <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/5 opacity-0 transition-opacity group-hover:opacity-100">
//           <Button variant="secondary" size="sm" className="text-xs">
//             Unlock
//           </Button>
//         </div>
//       )}
//     </div>
//   )
// }

// // Main component
// export default function OnboardingPage() {
//   const router = useRouter()
//   const [step, setStep] = useState(0)
//   const [userType, setUserType] = useState<"regular" | "influencer" | null>(null)
//   const [progress, setProgress] = useState(0)
//   const [profileImage, setProfileImage] = useState<string | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([])
//   const [socialHandles, setSocialHandles] = useState<Record<string, string>>({})
//   const [phoneNumber, setPhoneNumber] = useState("")
//   const [isVerifying, setIsVerifying] = useState(false)
//   const [verificationCode, setVerificationCode] = useState("")
//   const [expectedCode, setExpectedCode] = useState("")
//   const [isVerified, setIsVerified] = useState(false)
//   const [verificationStep, setVerificationStep] = useState<"input" | "verify">("input")
//   const [email, setEmail] = useState("")
//   const [incomeGoal, setIncomeGoal] = useState(5000)
//   const [selectedIncomeRange, setSelectedIncomeRange] = useState(1)
//   const [acceptedTerms, setAcceptedTerms] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [flippedCards, setFlippedCards] = useState<number[]>([])
//   const [selectedContentFrequency, setSelectedContentFrequency] = useState<string>("")
//   const [selectedBrandCollabs, setSelectedBrandCollabs] = useState<string[]>([])
//   const [selectedContentDays, setSelectedContentDays] = useState<number[]>([])
//   const [selectedLearningTopics, setSelectedLearningTopics] = useState<string[]>([])
//   const [selectedGrowthChallenges, setSelectedGrowthChallenges] = useState<string[]>([])
//   const [selectedContentStyle, setSelectedContentStyle] = useState<string>("")
//   const [personalityResult, setPersonalityResult] = useState<string>("")
//   const [personalityAnswers, setPersonalityAnswers] = useState<Record<string, string>>({})
//   const [goalStatement, setGoalStatement] = useState<string>("")
//   const [aiAnalysisResult, setAiAnalysisResult] = useState<any>(null)
//   const [achievements, setAchievements] = useState<Record<string, boolean>>({
//     profile: false,
//     categories: false,
//     social: false,
//     verification: false,
//     goals: false,
//   })
//   const [showMascot, setShowMascot] = useState(true)
//   const [mascotEmotion, setMascotEmotion] = useState<"happy" | "thinking" | "excited" | "confused">("happy")

//   // Determine total steps based on user type
//   const totalSteps = userType === "influencer" ? 10 : 8

//   // Save progress hook
//   const { saveProgress, isSaving, lastSaved } = useSaveProgress({
//     step,
//     userType,
//     profileImage,
//     selectedCategories,
//     socialHandles,
//     phoneNumber,
//     email,
//     incomeGoal,
//   })

//   // Update progress when step changes
//   useEffect(() => {
//     setProgress(((step + 1) / totalSteps) * 100)

//     // Update mascot emotion based on step
//     if (step === totalSteps - 1) {
//       setMascotEmotion("excited")
//     } else if (step > totalSteps / 2) {
//       setMascotEmotion("happy")
//     } else if (step === 0) {
//       setMascotEmotion("thinking")
//     } else {
//       setMascotEmotion("confused")
//     }
//   }, [step, totalSteps])

//   // Trigger confetti effect
//   const triggerConfetti = () => {
//     confetti({
//       particleCount: 100,
//       spread: 70,
//       origin: { y: 0.6 },
//     })
//   }

//   // Handle unlocking achievements
//   const unlockAchievement = (achievement: string) => {
//     if (!achievements[achievement]) {
//       setAchievements((prev) => ({
//         ...prev,
//         [achievement]: true,
//       }))

//       toast({
//         title: "Achievement Unlocked!",
//         description: `You've unlocked the ${achievement} achievement!`,
//         variant: "default",
//       })

//       // Small confetti burst
//       confetti({
//         particleCount: 30,
//         spread: 50,
//         origin: { y: 0.7 },
//       })
//     }
//   }


//   // Navigation functions
//   const nextStep = async () => {
//     const user = await onBoardUser()
//   // const nextStep = () => {
//     if (step < totalSteps - 1) {
//       setStep(step + 1)

//       // Unlock achievements based on progress
//       if (step === 1 && profileImage) unlockAchievement("profile")
//       if (step === 2 && selectedCategories.length > 0) unlockAchievement("categories")
//       if (step === 3 && Object.keys(socialHandles).length > 0) unlockAchievement("social")
//       if (step === 5 && isVerified) unlockAchievement("verification")
//       if (step === totalSteps - 2) unlockAchievement("goals")
//     } else {
//       // Final submission
//       setIsSubmitting(true)

//       setTimeout(() => {
//         setIsSubmitting(false)
//         triggerConfetti()
//         // Redirect based on user type
//         setTimeout(() => {
//           if (userType === "influencer") {
//             router.push("/influencers")
//             // router.push(`dashboard/${user.data?.firstname}-${user.data?.lastname}`)
//           } else {
//             router.push("/dashboard")
//             // router.push(`influencers/${user.data?.firstname}-${user.data?.lastname}`)
//           }
//         }, 2000)
//       }, 1500)
//     }
//   }

//   const prevStep = () => {
//     if (step > 0) {
//       setStep(step - 1)
//     }
//   }

//   const setUserAndAdvance = (type: "regular" | "influencer") => {
//     setUserType(type)
//     nextStep()
//   }

//   // File handling functions
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         setProfileImage(e.target?.result as string)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   // Category selection
//   const handleCategoryToggle = (category: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
//     )
//   }

//   // Social handle management
//   const handleSocialHandleChange = (platform: string, value: string) => {
//     setSocialHandles((prev) => ({
//       ...prev,
//       [platform]: value,
//     }))
//   }

//   // Phone verification
//   const handleVerifyPhone = async () => {
//     if (!phoneNumber || phoneNumber.length < 10) {
//       toast({
//         title: "Invalid Phone Number",
//         description: "Please enter a valid phone number",
//         variant: "destructive",
//       })
//       return
//     }

//     setIsVerifying(true)
//     try {
//       const code = await mockVerifyPhone(phoneNumber)
//       setExpectedCode(code)
//       setVerificationStep("verify")
//       toast({
//         title: "Verification Code Sent",
//         description: `We've sent a code to ${phoneNumber}. For demo purposes, the code is: ${code}`,
//       })
//     } catch (error) {
//       toast({
//         title: "Verification Failed",
//         description: "Could not send verification code",
//         variant: "destructive",
//       })
//     } finally {
//       setIsVerifying(false)
//     }
//   }

//   const handleCheckVerificationCode = async () => {
//     if (!verificationCode) {
//       toast({
//         title: "Missing Code",
//         description: "Please enter the verification code",
//         variant: "destructive",
//       })
//       return
//     }

//     setIsVerifying(true)
//     try {
//       const isValid = await mockCheckVerificationCode(verificationCode, expectedCode)
//       if (isValid) {
//         setIsVerified(true)
//         toast({
//           title: "Phone Verified",
//           description: "Your phone number has been verified successfully!",
//         })
//         nextStep()
//       } else {
//         toast({
//           title: "Invalid Code",
//           description: "The code you entered is incorrect",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       toast({
//         title: "Verification Failed",
//         description: "Could not verify code",
//         variant: "destructive",
//       })
//     } finally {
//       setIsVerifying(false)
//     }
//   }

//   // Income goal management
//   const handleIncomeRangeSelect = (index: number) => {
//     setSelectedIncomeRange(index)
//     setIncomeGoal(incomeRanges[index].min + (incomeRanges[index].max - incomeRanges[index].min) / 2)
//   }

//   const handleIncomeSliderChange = (value: number[]) => {
//     setIncomeGoal(value[0])
//   }

//   const getCurrentIncomeRange = () => {
//     return incomeRanges.find((range) => incomeGoal >= range.min && incomeGoal <= range.max) || incomeRanges[0]
//   }

//   // Card flipping
//   const toggleCardFlip = (index: number) => {
//     setFlippedCards((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
//   }

//   // Content days selection
//   const toggleContentDay = (day: number) => {
//     setSelectedContentDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
//   }

//   // Learning topics selection
//   const toggleLearningTopic = (topic: string) => {
//     setSelectedLearningTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]))
//   }

//   // Growth challenges selection
//   const toggleGrowthChallenge = (challenge: string) => {
//     setSelectedGrowthChallenges((prev) =>
//       prev.includes(challenge) ? prev.filter((c) => c !== challenge) : [...prev, challenge],
//     )
//   }

//   // Brand collab selection
//   const toggleBrandCollab = (collab: string) => {
//     setSelectedBrandCollabs((prev) => (prev.includes(collab) ? prev.filter((c) => c !== collab) : [...prev, collab]))
//   }

//   // Personality quiz
//   const handlePersonalityAnswer = (question: string, answer: string) => {
//     setPersonalityAnswers((prev) => ({
//       ...prev,
//       [question]: answer,
//     }))

//     // Simple algorithm to determine personality type
//     setTimeout(() => {
//       const answers = { ...personalityAnswers, [question]: answer }
//       const counts: Record<string, number> = {
//         Creator: 0,
//         Connector: 0,
//         Educator: 0,
//         Trendsetter: 0,
//       }

//       Object.values(answers).forEach((a) => {
//         if (a.includes("creative") || a.includes("original")) counts.Creator++
//         if (a.includes("people") || a.includes("community")) counts.Connector++
//         if (a.includes("teach") || a.includes("inform")) counts.Educator++
//         if (a.includes("trend") || a.includes("new")) counts.Trendsetter++
//       })

//       // Find the highest score
//       let maxType = "Creator"
//       let maxCount = 0

//       Object.entries(counts).forEach(([type, count]) => {
//         if (count > maxCount) {
//           maxType = type
//           maxCount = count
//         }
//       })

//       setPersonalityResult(maxType)
//     }, 300)
//   }

//   // Helper functions
//   const getProgressColor = () => {
//     if (progress < 30) return "bg-red-500"
//     if (progress < 70) return "bg-yellow-500"
//     return "bg-green-500"
//   }

//   // Render the questionnaire
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
//       <Card className="w-full max-w-md overflow-hidden border-none bg-card shadow-lg">
//         <CardContent className="p-0">
//           <div className="bg-primary/10 p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-primary">Welcome to InstaGrowth</h1>
//                 <p className="text-muted-foreground">Let&apos;s set up your experience</p>
//               </div>

//               {showMascot && (
//                 <div className="relative">
//                   <Mascot emotion={mascotEmotion} />
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-background p-0"
//                     onClick={() => setShowMascot(false)}
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 </div>
//               )}
//             </div>

//             <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-primary/10">
//               <motion.div
//                 className={cn("h-full rounded-full", getProgressColor())}
//                 initial={{ width: 0 }}
//                 animate={{ width: `${progress}%` }}
//                 transition={{ duration: 0.5 }}
//               />
//             </div>

//             <div className="mt-1 flex justify-between text-xs text-muted-foreground">
//               <span>
//                 Step {step + 1} of {totalSteps}
//               </span>
//               <span>{Math.round(progress)}% Complete</span>
//             </div>

//             {/* Save progress button */}
//             <div className="mt-2 flex items-center justify-end gap-2">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="h-7 gap-1 text-xs"
//                 onClick={saveProgress}
//                 disabled={isSaving}
//               >
//                 {isSaving ? (
//                   <>
//                     <Loader2 className="h-3 w-3 animate-spin" />
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="h-3 w-3" />
//                     Save Progress
//                   </>
//                 )}
//               </Button>

//               {lastSaved && (
//                 <span className="text-xs text-muted-foreground">Last saved: {lastSaved.toLocaleTimeString()}</span>
//               )}
//             </div>
//           </div>

//           <div className="min-h-[500px] p-6">
//             <AnimatePresence mode="wait">
//               {/* Step 1: User Type Selection */}
//               {step === 0 && (
//                 <motion.div
//                   key="step0"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Tell us about yourself</h2>
//                   <p className="text-muted-foreground">Which option best describes you?</p>

//                   <div className="grid gap-4">
//                     <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                       <Button
//                         variant="outline"
//                         className="flex h-auto w-full items-start justify-start gap-4 p-4 text-left"
//                         onClick={() => setUserAndAdvance("regular")}
//                       >
//                         <div className="rounded-full bg-primary/10 p-2">
//                           <Users className="h-6 w-6 text-primary" />
//                         </div>
//                         <div className="flex-1">
//                           <div className="font-medium">Regular User</div>
//                           <div className="text-sm text-muted-foreground">I want to grow my personal account</div>
//                         </div>
//                         <ChevronRight className="h-5 w-5 text-muted-foreground" />
//                       </Button>
//                     </motion.div>

//                     <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                       <Button
//                         variant="outline"
//                         className="flex h-auto w-full items-start justify-start gap-4 p-4 text-left"
//                         onClick={() => setUserAndAdvance("influencer")}
//                       >
//                         <div className="rounded-full bg-primary/10 p-2">
//                           <Star className="h-6 w-6 text-primary" />
//                         </div>
//                         <div className="flex-1">
//                           <div className="font-medium">Influencer</div>
//                           <div className="text-sm text-muted-foreground">
//                             I have a significant following and brand partnerships
//                           </div>
//                         </div>
//                         <ChevronRight className="h-5 w-5 text-muted-foreground" />
//                       </Button>
//                     </motion.div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 2: Profile Picture */}
//               {step === 1 && (
//                 <motion.div
//                   key="step1"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Add a profile picture</h2>
//                   <p className="text-muted-foreground">This will be displayed on your profile and dashboard</p>

//                   <div className="flex flex-col items-center justify-center space-y-4">
//                     <div className="relative">
//                       <Avatar className="h-32 w-32 border-2 border-primary/20">
//                         {profileImage ? (
//                           <AvatarImage src={profileImage} alt="Profile" />
//                         ) : (
//                           <AvatarFallback className="bg-primary/10 text-2xl">
//                             {userType === "influencer" ? "INF" : "USR"}
//                           </AvatarFallback>
//                         )}
//                       </Avatar>
//                       <Button
//                         size="icon"
//                         variant="secondary"
//                         className="absolute bottom-0 right-0 rounded-full"
//                         onClick={() => fileInputRef.current?.click()}
//                       >
//                         <Camera className="h-4 w-4" />
//                       </Button>
//                       <input
//                         type="file"
//                         ref={fileInputRef}
//                         className="hidden"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                       />
//                     </div>

//                     <div className="text-center text-sm text-muted-foreground">
//                       {profileImage ? (
//                         <span className="flex items-center gap-1 text-green-500">
//                           <Check className="h-4 w-4" /> Image uploaded
//                         </span>
//                       ) : (
//                         "Click to upload an image"
//                       )}
//                     </div>

//                     <Button onClick={nextStep} className="mt-4 w-full" disabled={isSubmitting}>
//                       {profileImage ? "Continue" : "Skip for now"}
//                     </Button>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 3: Content Categories */}
//               {step === 2 && (
//                 <motion.div
//                   key="step2"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Content Categories</h2>
//                   <p className="text-muted-foreground">Select your primary content categories (up to 5)</p>

//                   <div className="grid grid-cols-3 gap-3">
//                     {contentCategories.map((category) => (
//                       <motion.div key={category.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                         <Button
//                           variant={selectedCategories.includes(category.name) ? "default" : "outline"}
//                           className={cn(
//                             "flex h-auto w-full flex-col items-center justify-center gap-2 p-3 text-center",
//                             selectedCategories.includes(category.name) ? "border-primary" : "",
//                           )}
//                           onClick={() => handleCategoryToggle(category.name)}
//                           disabled={!selectedCategories.includes(category.name) && selectedCategories.length >= 5}
//                         >
//                           <div
//                             className={cn("flex h-10 w-10 items-center justify-center rounded-full", category.color)}
//                           >
//                             <span className="text-xl">{category.icon}</span>
//                           </div>
//                           <span className="text-xs font-medium">{category.name}</span>
//                         </Button>
//                       </motion.div>
//                     ))}
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-muted-foreground">{selectedCategories.length}/5 selected</span>
//                     <Button onClick={nextStep} disabled={selectedCategories.length === 0 || isSubmitting}>
//                       Continue
//                     </Button>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 4: Social Media Handles */}
//               {step === 3 && (
//                 <motion.div
//                   key="step3"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Social Media Profiles</h2>
//                   <p className="text-muted-foreground">Add your social media handles</p>

//                   <div className="space-y-4">
//                     {socialPlatforms.map((platform) => (
//                       <div key={platform.name} className="space-y-2">
//                         <Label className="flex items-center gap-2">
//                           <div className={cn("flex h-5 w-5 items-center justify-center rounded-md", platform.color)}>
//                             {platform.icon}
//                           </div>
//                           {platform.name}
//                         </Label>
//                         <div className="flex items-center gap-2">
//                           <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
//                             <AtSign className="h-4 w-4 text-muted-foreground" />
//                           </div>
//                           <Input
//                             placeholder={platform.placeholder}
//                             value={socialHandles[platform.name] || ""}
//                             onChange={(e) => handleSocialHandleChange(platform.name, e.target.value)}
//                             className="flex-1"
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* AI Analysis for Influencers */}
//                   {userType === "influencer" && socialHandles.Instagram && (
//                     <div className="mt-4">
//                       <AiProfileAnalysis handle={socialHandles.Instagram} onComplete={setAiAnalysisResult} />
//                     </div>
//                   )}

//                   <Button
//                     onClick={nextStep}
//                     className="w-full"
//                     disabled={Object.keys(socialHandles).length === 0 || isSubmitting}
//                   >
//                     {Object.keys(socialHandles).length > 0 ? "Continue" : "Skip for now"}
//                   </Button>
//                 </motion.div>
//               )}

//               {/* Step 5: Email */}
//               {step === 4 && (
//                 <motion.div
//                   key="step4"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Contact Information</h2>
//                   <p className="text-muted-foreground">Add your email address</p>

//                   <div className="space-y-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="email" className="flex items-center gap-2">
//                         <Mail className="h-4 w-4 text-primary" />
//                         Email Address
//                       </Label>
//                       <Input
//                         id="email"
//                         type="email"
//                         placeholder="your@email.com"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                       />
//                     </div>
//                   </div>

//                   <Button
//                     onClick={nextStep}
//                     className="w-full"
//                     disabled={!email || !email.includes("@") || isSubmitting}
//                   >
//                     Continue
//                   </Button>
//                 </motion.div>
//               )}

//               {/* Step 6: Phone Verification */}
//               {step === 5 && (
//                 <motion.div
//                   key="step5"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Phone Verification</h2>
//                   <p className="text-muted-foreground">
//                     {verificationStep === "input"
//                       ? "Add and verify your phone number"
//                       : "Enter the verification code sent to your phone"}
//                   </p>

//                   <div className="space-y-6">
//                     {verificationStep === "input" ? (
//                       <div className="space-y-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="phone" className="flex items-center gap-2">
//                             <Phone className="h-4 w-4 text-primary" />
//                             Phone Number
//                           </Label>
//                           <div className="flex items-center gap-2">
//                             <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
//                               <Smartphone className="h-4 w-4 text-muted-foreground" />
//                             </div>
//                             <Input
//                               id="phone"
//                               type="tel"
//                               placeholder="+1 (555) 123-4567"
//                               value={phoneNumber}
//                               onChange={(e) => setPhoneNumber(e.target.value)}
//                               className="flex-1"
//                             />
//                           </div>
//                         </div>

//                         <Button onClick={handleVerifyPhone} className="w-full" disabled={!phoneNumber || isVerifying}>
//                           {isVerifying ? (
//                             <>
//                               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                               Sending Code...
//                             </>
//                           ) : (
//                             "Send Verification Code"
//                           )}
//                         </Button>
//                       </div>
//                     ) : (
//                       <div className="space-y-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="code" className="flex items-center gap-2">
//                             <Lock className="h-4 w-4 text-primary" />
//                             Verification Code
//                           </Label>
//                           <div className="flex items-center gap-2">
//                             <Input
//                               id="code"
//                               type="text"
//                               placeholder="Enter 6-digit code"
//                               value={verificationCode}
//                               onChange={(e) => setVerificationCode(e.target.value)}
//                               className="flex-1 text-center text-xl tracking-widest"
//                               maxLength={6}
//                             />
//                           </div>
//                           <p className="text-xs text-muted-foreground">
//                             For demo purposes, the code is: <span className="font-mono font-bold">{expectedCode}</span>
//                           </p>
//                         </div>

//                         <div className="flex gap-2">
//                           <Button
//                             variant="outline"
//                             onClick={() => setVerificationStep("input")}
//                             className="flex-1"
//                             disabled={isVerifying}
//                           >
//                             Back
//                           </Button>
//                           <Button
//                             onClick={handleCheckVerificationCode}
//                             className="flex-1"
//                             disabled={!verificationCode || verificationCode.length < 6 || isVerifying}
//                           >
//                             {isVerifying ? (
//                               <>
//                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                 Verifying...
//                               </>
//                             ) : (
//                               "Verify Code"
//                             )}
//                           </Button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 7: Content Strategy (Influencer) or Learning Goals (Regular) */}
//               {step === 6 && (
//                 <motion.div
//                   key="step6"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   {userType === "influencer" ? (
//                     <>
//                       <h2 className="text-xl font-semibold">Content Strategy</h2>
//                       <p className="text-muted-foreground">Tell us about your content creation approach</p>

//                       <div className="space-y-6">
//                         <div className="space-y-2">
//                           <Label>How often do you post content?</Label>
//                           <RadioGroup value={selectedContentFrequency} onValueChange={setSelectedContentFrequency}>
//                             <div className="grid grid-cols-2 gap-2">
//                               {contentFrequencies.map((frequency) => (
//                                 <div key={frequency} className="flex items-center space-x-2">
//                                   <RadioGroupItem value={frequency} id={`frequency-${frequency}`} />
//                                   <Label htmlFor={`frequency-${frequency}`} className="text-sm">
//                                     {frequency}
//                                   </Label>
//                                 </div>
//                               ))}
//                             </div>
//                           </RadioGroup>
//                         </div>

//                         <div className="space-y-2">
//                           <Label>Which days do you typically post?</Label>
//                           <ContentCalendar selectedDays={selectedContentDays} onSelectDay={toggleContentDay} />
//                         </div>

//                         <div className="space-y-2">
//                           <Label>What types of brand collaborations do you prefer?</Label>
//                           <div className="grid grid-cols-2 gap-2">
//                             {brandCollabTypes.map((collab) => (
//                               <div key={collab} className="flex items-center space-x-2">
//                                 <Checkbox
//                                   id={`collab-${collab}`}
//                                   checked={selectedBrandCollabs.includes(collab)}
//                                   onCheckedChange={() => toggleBrandCollab(collab)}
//                                 />
//                                 <Label htmlFor={`collab-${collab}`} className="text-sm">
//                                   {collab}
//                                 </Label>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <h2 className="text-xl font-semibold">Learning Goals</h2>
//                       <p className="text-muted-foreground">What would you like to learn about?</p>

//                       <div className="space-y-6">
//                         <div className="space-y-2">
//                           <Label>Select topics you&apos;re interested in learning:</Label>
//                           <div className="grid grid-cols-2 gap-2">
//                             {learningTopics.map((topic) => (
//                               <div key={topic} className="flex items-center space-x-2">
//                                 <Checkbox
//                                   id={`topic-${topic}`}
//                                   checked={selectedLearningTopics.includes(topic)}
//                                   onCheckedChange={() => toggleLearningTopic(topic)}
//                                 />
//                                 <Label htmlFor={`topic-${topic}`} className="text-sm">
//                                   {topic}
//                                 </Label>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         <div className="space-y-2">
//                           <Label>What are your biggest growth challenges?</Label>
//                           <div className="grid grid-cols-2 gap-2">
//                             {growthChallenges.map((challenge) => (
//                               <div key={challenge} className="flex items-center space-x-2">
//                                 <Checkbox
//                                   id={`challenge-${challenge}`}
//                                   checked={selectedGrowthChallenges.includes(challenge)}
//                                   onCheckedChange={() => toggleGrowthChallenge(challenge)}
//                                 />
//                                 <Label htmlFor={`challenge-${challenge}`} className="text-sm">
//                                   {challenge}
//                                 </Label>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         <div className="space-y-2">
//                           <Label>Tell us your goals in your own words:</Label>
//                           <div className="flex items-center gap-2">
//                             <Textarea
//                               placeholder="I want to grow my account and..."
//                               value={goalStatement}
//                               onChange={(e) => setGoalStatement(e.target.value)}
//                               className="min-h-[80px] flex-1"
//                             />
//                             <TooltipProvider>
//                               <Tooltip>
//                                 <TooltipTrigger asChild>
//                                   <Button
//                                     variant="outline"
//                                     size="icon"
//                                     className="h-10 w-10 shrink-0"
//                                     onClick={() => {
//                                       setGoalStatement("")
//                                       toast({
//                                         title: "Voice Input Ready",
//                                         description: "Click the microphone to start recording",
//                                       })
//                                     }}
//                                   >
//                                     <Mic className="h-4 w-4" />
//                                   </Button>
//                                 </TooltipTrigger>
//                                 <TooltipContent>
//                                   <p>Use voice input</p>
//                                 </TooltipContent>
//                               </Tooltip>
//                             </TooltipProvider>
//                           </div>
//                         </div>
//                       </div>
//                     </>
//                   )}

//                   <Button onClick={nextStep} className="w-full" disabled={isSubmitting}>
//                     Continue
//                   </Button>
//                 </motion.div>
//               )}

//               {/* Step 7: Content Style (Influencer) or Personality Quiz (Regular) */}
//               {step === 7 && (
//                 <motion.div
//                   key="step7"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   {userType === "influencer" ? (
//                     <>
//                       <h2 className="text-xl font-semibold">Content Style</h2>
//                       <p className="text-muted-foreground">Select your preferred aesthetic</p>

//                       <div className="grid grid-cols-2 gap-4">
//                         {contentStyles.map((style, index) => (
//                           <motion.div key={style.name} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
//                             <Button
//                               variant={selectedContentStyle === style.name ? "default" : "outline"}
//                               className={cn(
//                                 "flex h-auto w-full flex-col items-center justify-center gap-2 p-4 text-center",
//                                 selectedContentStyle === style.name ? "border-primary" : "",
//                               )}
//                               onClick={() => setSelectedContentStyle(style.name)}
//                             >
//                               <span className="text-2xl">{style.icon}</span>
//                               <div>
//                                 <div className="font-medium">{style.name}</div>
//                                 <div className="text-xs text-muted-foreground">{style.description}</div>
//                               </div>
//                             </Button>
//                           </motion.div>
//                         ))}
//                       </div>

//                       <div className="space-y-4">
//                         <h3 className="font-medium">Visual Mood Board</h3>
//                         <div className="grid grid-cols-3 gap-2">
//                           {[1, 2, 3, 4, 5, 6].map((i) => (
//                             <div key={i} className="group relative aspect-square overflow-hidden rounded-md bg-muted">
//                               <div className="absolute inset-0 flex items-center justify-center">
//                                 <Image className="h-6 w-6 text-muted-foreground" />
//                               </div>
//                               <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
//                                 <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
//                                   <Plus className="h-4 w-4" />
//                                 </Button>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <h2 className="text-xl font-semibold">Content Creator Personality</h2>
//                       <p className="text-muted-foreground">Let&apos;s discover your content creator type</p>

//                       <div className="space-y-6">
//                         {personalityResult ? (
//                           <div className="space-y-4">
//                             <div className="rounded-lg border bg-card p-4">
//                               <div className="flex items-center gap-3">
//                                 <div className="rounded-full bg-primary/10 p-2">
//                                   {personalityTypes.find((p) => p.type === personalityResult)?.icon || (
//                                     <Star className="h-5 w-5 text-primary" />
//                                   )}
//                                 </div>
//                                 <div>
//                                   <h3 className="font-semibold">You&apos;re a {personalityResult}!</h3>
//                                   <p className="text-sm text-muted-foreground">
//                                     {personalityTypes.find((p) => p.type === personalityResult)?.description}
//                                   </p>
//                                 </div>
//                               </div>

//                               <div className="mt-4 space-y-3">
//                                 <div>
//                                   <h4 className="text-sm font-medium">Your Strengths:</h4>
//                                   <ul className="mt-1 list-inside list-disc text-sm text-muted-foreground">
//                                     {personalityTypes
//                                       .find((p) => p.type === personalityResult)
//                                       ?.strengths.map((strength, i) => (
//                                         <li key={i}>{strength}</li>
//                                       ))}
//                                   </ul>
//                                 </div>

//                                 <div>
//                                   <h4 className="text-sm font-medium">Recommended Strategies:</h4>
//                                   <ul className="mt-1 list-inside list-disc text-sm text-muted-foreground">
//                                     {personalityTypes
//                                       .find((p) => p.type === personalityResult)
//                                       ?.strategies.map((strategy, i) => (
//                                         <li key={i}>{strategy}</li>
//                                       ))}
//                                   </ul>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="flex justify-center">
//                               <Button variant="outline" size="sm" onClick={() => setPersonalityResult("")}>
//                                 Retake Quiz
//                               </Button>
//                             </div>
//                           </div>
//                         ) : (
//                           <div className="space-y-4">
//                             <div className="space-y-3">
//                               <div className="space-y-2">
//                                 <Label>When creating content, I prefer to:</Label>
//                                 <RadioGroup
//                                   value={personalityAnswers["q1"] || ""}
//                                   onValueChange={(value) => handlePersonalityAnswer("q1", value)}
//                                 >
//                                   <div className="space-y-2">
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="express my creative ideas" id="q1-a" />
//                                       <Label htmlFor="q1-a">Express my creative ideas</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="connect with my community" id="q1-b" />
//                                       <Label htmlFor="q1-b">Connect with my community</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="teach others something new" id="q1-c" />
//                                       <Label htmlFor="q1-c">Teach others something new</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="try the latest trends" id="q1-d" />
//                                       <Label htmlFor="q1-d">Try the latest trends</Label>
//                                     </div>
//                                   </div>
//                                 </RadioGroup>
//                               </div>

//                               <div className="space-y-2">
//                                 <Label>I get the most satisfaction from:</Label>
//                                 <RadioGroup
//                                   value={personalityAnswers["q2"] || ""}
//                                   onValueChange={(value) => handlePersonalityAnswer("q2", value)}
//                                 >
//                                   <div className="space-y-2">
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="creating original content" id="q2-a" />
//                                       <Label htmlFor="q2-a">Creating original content</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="building a community of people" id="q2-b" />
//                                       <Label htmlFor="q2-b">Building a community of people</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="informing and educating others" id="q2-c" />
//                                       <Label htmlFor="q2-c">Informing and educating others</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="discovering new trends" id="q2-d" />
//                                       <Label htmlFor="q2-d">Discovering new trends</Label>
//                                     </div>
//                                   </div>
//                                 </RadioGroup>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </>
//                   )}

//                   <Button
//                     onClick={nextStep}
//                     className="w-full"
//                     disabled={isSubmitting || (userType === "influencer" && !selectedContentStyle)}
//                   >
//                     Continue
//                   </Button>
//                 </motion.div>
//               )}

//               {/* Step 8: Income Goals */}
//               {step === 8 && (
//                 <motion.div
//                   key="step8"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Income Goals</h2>
//                   <p className="text-muted-foreground">What are your monthly income goals?</p>

//                   <div className="space-y-6">
//                     <Tabs defaultValue="slider" className="w-full">
//                       <TabsList className="grid w-full grid-cols-2">
//                         <TabsTrigger value="slider">Slider</TabsTrigger>
//                         <TabsTrigger value="preset">Preset Ranges</TabsTrigger>
//                       </TabsList>
//                       <TabsContent value="slider" className="space-y-4 pt-4">
//                         <div className="space-y-6">
//                           <div className="flex flex-col items-center justify-center">
//                             <div className="text-3xl font-bold text-primary">${incomeGoal.toLocaleString()}</div>
//                             <div className="text-sm text-muted-foreground">per month</div>
//                           </div>

//                           <div className="px-2">
//                             <Slider
//                               defaultValue={[incomeGoal]}
//                               max={userType === "influencer" ? 100000 : 20000}
//                               step={100}
//                               onValueChange={handleIncomeSliderChange}
//                             />

//                             <div className="flex justify-between text-xs text-muted-foreground">
//                               <span>$0</span>
//                               <span>${userType === "influencer" ? "100,000" : "20,000"}+</span>
//                             </div>
//                           </div>

//                           <div className="rounded-lg border bg-card p-4 shadow-sm">
//                             <div className="flex items-center gap-2">
//                               <Badge variant="outline" className="bg-primary/10 text-primary">
//                                 {getCurrentIncomeRange().level}
//                               </Badge>
//                               <span className="text-sm font-medium">{getCurrentIncomeRange().label}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </TabsContent>

//                       <TabsContent value="preset" className="space-y-4 pt-4">
//                         <RadioGroup
//                           value={selectedIncomeRange.toString()}
//                           onValueChange={(value) => handleIncomeRangeSelect(Number.parseInt(value))}
//                           className="space-y-3"
//                         >
//                           {incomeRanges.map((range, index) => (
//                             <div key={index} className="flex items-center space-x-2">
//                               <RadioGroupItem value={index.toString()} id={`range-${index}`} />
//                               <Label
//                                 htmlFor={`range-${index}`}
//                                 className="flex flex-1 cursor-pointer items-center justify-between rounded-md border p-3 hover:bg-accent"
//                               >
//                                 <div className="flex items-center gap-2">
//                                   <DollarSign className="h-4 w-4 text-primary" />
//                                   <span>{range.label}</span>
//                                 </div>
//                                 <Badge variant="outline">{range.level}</Badge>
//                               </Label>
//                             </div>
//                           ))}
//                         </RadioGroup>
//                       </TabsContent>
//                     </Tabs>

//                     {/* Income Projection */}
//                     <IncomeProjection
//                       currentIncome={userType === "influencer" ? 2000 : 500}
//                       targetIncome={incomeGoal}
//                       months={12}
//                     />

//                     <div className="flex items-center space-x-2">
//                       <Checkbox
//                         id="terms"
//                         checked={acceptedTerms}
//                         onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
//                       />
//                       <Label htmlFor="terms" className="text-sm">
//                         I understand this is my target goal and actual results may vary
//                       </Label>
//                     </div>

//                     <Button onClick={nextStep} className="w-full" disabled={!acceptedTerms || isSubmitting}>
//                       {userType === "influencer" && step < 9 ? "Continue" : "Complete Setup"}
//                     </Button>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 9: Achievements (Influencer only) */}
//               {userType === "influencer" && step === 9 && (
//                 <motion.div
//                   key="step9"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Your Achievements</h2>
//                   <p className="text-muted-foreground">Unlock achievements as you grow</p>

//                   <div className="grid grid-cols-3 gap-3">
//                     <AchievementBadge
//                       title="Profile Setup"
//                       icon={<User className="h-5 w-5 text-primary" />}
//                       isUnlocked={achievements.profile}
//                       onUnlock={() => unlockAchievement("profile")}
//                     />
//                     <AchievementBadge
//                       title="Categories"
//                       icon={<Layers className="h-5 w-5 text-primary" />}
//                       isUnlocked={achievements.categories}
//                       onUnlock={() => unlockAchievement("categories")}
//                     />
//                     <AchievementBadge
//                       title="Social Connect"
//                       icon={<Share2 className="h-5 w-5 text-primary" />}
//                       isUnlocked={achievements.social}
//                       onUnlock={() => unlockAchievement("social")}
//                     />
//                     <AchievementBadge
//                       title="Verified"
//                       icon={<BadgeCheck className="h-5 w-5 text-primary" />}
//                       isUnlocked={achievements.verification}
//                       onUnlock={() => unlockAchievement("verification")}
//                     />
//                     <AchievementBadge
//                       title="Goal Setter"
//                       icon={<Target className="h-5 w-5 text-primary" />}
//                       isUnlocked={achievements.goals}
//                       onUnlock={() => unlockAchievement("goals")}
//                     />
//                     <AchievementBadge
//                       title="First Post"
//                       icon={<Image className="h-5 w-5 text-primary" />}
//                       isUnlocked={false}
//                     />
//                   </div>

//                   <div className="rounded-lg border bg-card p-4">
//                     <h3 className="font-medium">Referral Program</h3>
//                     <p className="mt-1 text-sm text-muted-foreground">Invite other influencers and earn rewards</p>

//                     <div className="mt-3 flex items-center gap-2">
//                       <Input value="https://instagrowth.com/ref/yourname" readOnly className="flex-1 bg-muted" />
//                       <Button variant="outline" size="sm" className="shrink-0">
//                         <Copy className="mr-1 h-3 w-3" />
//                         Copy
//                       </Button>
//                     </div>
//                   </div>

//                   <Button onClick={nextStep} className="w-full" disabled={isSubmitting}>
//                     Complete Setup
//                   </Button>
//                 </motion.div>
//               )}

//               {/* Final Step: Completion */}
//               {((userType === "regular" && step === 9) || (userType === "influencer" && step === 10)) && (
//                 <motion.div
//                   key="stepFinal"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <div className="flex flex-col items-center justify-center py-6 text-center">
//                     {isSubmitting ? (
//                       <div className="flex flex-col items-center justify-center space-y-4">
//                         <Loader2 className="h-12 w-12 animate-spin text-primary" />
//                         <h2 className="text-xl font-semibold">Setting up your account...</h2>
//                         <p className="text-muted-foreground">This will only take a moment</p>
//                       </div>
//                     ) : (
//                       <>
//                         <motion.div
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           transition={{
//                             type: "spring",
//                             stiffness: 260,
//                             damping: 20,
//                             delay: 0.1,
//                           }}
//                           className="mb-6 rounded-full bg-green-500/10 p-4"
//                         >
//                           <Check className="h-12 w-12 text-green-500" />
//                         </motion.div>
//                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
//                           <h2 className="text-2xl font-bold">You&apos;re all set!</h2>
//                           <p className="mt-2 text-muted-foreground">
//                             {userType === "influencer"
//                               ? "Your influencer dashboard is ready."
//                               : "Your dashboard is ready."}
//                           </p>

//                           <div className="mt-6 space-y-4">
//                             <div className="rounded-lg border bg-card p-4">
//                               <h3 className="font-medium">Account Summary</h3>
//                               <div className="mt-2 space-y-2 text-sm">
//                                 <div className="flex justify-between">
//                                   <span className="text-muted-foreground">Account Type:</span>
//                                   <span className="font-medium">
//                                     {userType === "influencer" ? "Influencer" : "Regular User"}
//                                   </span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                   <span className="text-muted-foreground">Categories:</span>
//                                   <span className="font-medium">{selectedCategories.length} selected</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                   <span className="text-muted-foreground">Monthly Goal:</span>
//                                   <span className="font-medium">${incomeGoal.toLocaleString()}</span>
//                                 </div>
//                                 {userType === "influencer" && (
//                                   <div className="flex justify-between">
//                                     <span className="text-muted-foreground">Content Style:</span>
//                                     <span className="font-medium">{selectedContentStyle}</span>
//                                   </div>
//                                 )}
//                                 {userType === "regular" && personalityResult && (
//                                   <div className="flex justify-between">
//                                     <span className="text-muted-foreground">Creator Type:</span>
//                                     <span className="font-medium">{personalityResult}</span>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>

//                             <Button
//                               onClick={() => {
//                                 if (userType === "influencer") {
//                                   router.push("/influencer-dashboard")
//                                 } else {
//                                   router.push("/dashboard")
//                                 }
//                               }}
//                               className="w-full"
//                             >
//                               Go to Dashboard
//                               <ChevronRight className="ml-2 h-4 w-4" />
//                             </Button>
//                           </div>
//                         </motion.div>
//                       </>
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {step > 0 && step < (userType === "influencer" ? 10 : 9) && (
//             <div className="flex items-center justify-between border-t p-4">
//               <Button variant="ghost" size="sm" onClick={prevStep} disabled={isSubmitting}>
//                 Back
//               </Button>
//               {step !== 5 && (
//                 <Button size="sm" onClick={nextStep} disabled={isSubmitting}>
//                   Skip
//                 </Button>
//               )}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// // Missing components that were used in the code
// function Play(props: any) {
//   return <Video {...props} />
// }

// function User(props: any) {
//   return <Users {...props} />
// }

// function Layers(props: any) {
//   return <Palette {...props} />
// }

// function BadgeCheck(props: any) {
//   return <Check {...props} />
// }

// function Target(props: any) {
//   return <Flag {...props} />
// }

// function Copy(props: any) {
//   return <Paperclip {...props} />
// }

// function X(props: any) {
//   return <AlertCircle {...props} />
// }

"use client"

// import type React from "react"

// import { useState, useRef, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { useRouter } from "next/navigation"
// import {
//   AlertCircle,
//   AtSign,
//   BookOpen,
//   Camera,
//   Check,
//   ChevronRight,
//   DollarSign,
//   Flag,
//   Image,
//   Instagram,
//   Loader2,
//   Lock,
//   Mail,
//   MessageCircle,
//   Mic,
//   Palette,
//   Paperclip,
//   Phone,
//   Plus,
//   Save,
//   Share2,
//   Smartphone,
//   Sparkles,
//   Star,
//   TrendingUp,
//   Users,
//   Video,
//   Wand2,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Slider } from "@/components/ui/slider"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Checkbox } from "@/components/ui/checkbox"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Textarea } from "@/components/ui/textarea"
// import { toast } from "@/hooks/use-toast"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { cn } from "@/lib/utils"
// import confetti from "canvas-confetti"
// import { onBoardUser } from "@/actions/user"

// // Import the SMS verification server actions
// import { sendVerificationSMS, verifyCode } from "@/actions/sms-service"

// // Mock verification service
// const mockVerifyPhone = async (phone: string) => {
//   // Simulate API call
//   return new Promise<string>((resolve) => {
//     setTimeout(() => {
//       // Generate a random 6-digit code
//       const code = Math.floor(100000 + Math.random() * 900000).toString()
//       resolve(code)
//     }, 1500)
//   })
// }

// // Mock verification check
// const mockCheckVerificationCode = async (code: string, expectedCode: string) => {
//   // Simulate API call
//   return new Promise<boolean>((resolve) => {
//     setTimeout(() => {
//       resolve(code === expectedCode)
//     }, 1000)
//   })
// }

// // Mock AI analysis
// const mockAiAnalysis = async (handle: string) => {
//   return new Promise<{
//     followers: number
//     engagement: number
//     growthRate: number
//     topContent: string[]
//     audienceDemo: { age: string; gender: string; location: string }
//   }>((resolve) => {
//     setTimeout(() => {
//       resolve({
//         followers: Math.floor(1000 + Math.random() * 100000),
//         engagement: Math.random() * 8 + 1,
//         growthRate: Math.random() * 10,
//         topContent: ["Fashion", "Lifestyle", "Travel"],
//         audienceDemo: {
//           age: "18-34",
//           gender: "65% Female, 35% Male",
//           location: "US, UK, Canada",
//         },
//       })
//     }, 2000)
//   })
// }

// type SocialPlatform = {
//   name: string
//   icon: React.ReactNode
//   placeholder: string
//   color: string
// }

// const socialPlatforms: SocialPlatform[] = [
//   {
//     name: "Instagram",
//     icon: <Instagram className="h-4 w-4" />,
//     placeholder: "@yourusername",
//     color: "bg-gradient-to-r from-purple-500 to-pink-500",
//   },
//   {
//     name: "TikTok",
//     icon: <Video className="h-4 w-4" />,
//     placeholder: "@yourusername",
//     color: "bg-black",
//   },
//   {
//     name: "YouTube",
//     icon: <Play className="h-4 w-4" />,
//     placeholder: "@yourchannel",
//     color: "bg-red-600",
//   },
//   {
//     name: "Twitter",
//     icon: <MessageCircle className="h-4 w-4" />,
//     placeholder: "@yourusername",
//     color: "bg-blue-500",
//   },
// ]

// const contentCategories = [
//   { name: "Fashion", icon: "👗", color: "bg-pink-100 dark:bg-pink-900" },
//   { name: "Beauty", icon: "💄", color: "bg-purple-100 dark:bg-purple-900" },
//   { name: "Fitness", icon: "💪", color: "bg-green-100 dark:bg-green-900" },
//   { name: "Travel", icon: "✈️", color: "bg-blue-100 dark:bg-blue-900" },
//   { name: "Food", icon: "🍕", color: "bg-yellow-100 dark:bg-yellow-900" },
//   { name: "Lifestyle", icon: "🌿", color: "bg-teal-100 dark:bg-teal-900" },
//   { name: "Tech", icon: "📱", color: "bg-gray-100 dark:bg-gray-800" },
//   { name: "Gaming", icon: "🎮", color: "bg-indigo-100 dark:bg-indigo-900" },
//   { name: "Business", icon: "💼", color: "bg-amber-100 dark:bg-amber-900" },
//   { name: "Education", icon: "📚", color: "bg-red-100 dark:bg-red-900" },
//   { name: "Art", icon: "🎨", color: "bg-fuchsia-100 dark:bg-fuchsia-900" },
//   { name: "Music", icon: "🎵", color: "bg-cyan-100 dark:bg-cyan-900" },
// ]

// const incomeRanges = [
//   { min: 0, max: 1000, label: "Up to $1,000/month", level: "Starter" },
//   { min: 1000, max: 5000, label: "$1,000 - $5,000/month", level: "Growing" },
//   { min: 5000, max: 10000, label: "$5,000 - $10,000/month", level: "Established" },
//   { min: 10000, max: 20000, label: "$10,000 - $20,000/month", level: "Professional" },
//   { min: 20000, max: 50000, label: "$20,000 - $50,000/month", level: "Elite" },
//   { min: 50000, max: 100000, label: "$50,000+/month", level: "Celebrity" },
// ]

// const contentFrequencies = ["Daily", "3-5 times per week", "1-2 times per week", "Few times a month"]

// const brandCollabTypes = [
//   "Sponsored Posts",
//   "Brand Ambassador",
//   "Affiliate Marketing",
//   "Product Reviews",
//   "Event Appearances",
//   "Content Creation",
// ]

// const learningTopics = [
//   "Content Creation",
//   "Audience Growth",
//   "Engagement Strategies",
//   "Monetization",
//   "Photography/Videography",
//   "Personal Branding",
// ]

// const growthChallenges = [
//   "Finding My Niche",
//   "Creating Consistent Content",
//   "Growing My Audience",
//   "Engagement Rate",
//   "Monetization",
//   "Work-Life Balance",
// ]

// const contentStyles = [
//   { name: "Minimalist", icon: "✨", description: "Clean, simple aesthetics" },
//   { name: "Vibrant", icon: "🌈", description: "Bold colors and energy" },
//   { name: "Vintage", icon: "📷", description: "Retro and nostalgic vibes" },
//   { name: "Luxury", icon: "💎", description: "High-end and sophisticated" },
//   { name: "Playful", icon: "🎨", description: "Fun and creative expression" },
//   { name: "Nature", icon: "🌿", description: "Organic and earthy elements" },
// ]

// const personalityTypes = [
//   {
//     type: "Creator",
//     description: "You thrive on making original content and expressing yourself",
//     icon: <Palette className="h-5 w-5" />,
//     strengths: ["Original content", "Creative expression", "Unique perspective"],
//     strategies: ["Focus on quality over quantity", "Develop a signature style", "Collaborate with other creators"],
//   },
//   {
//     type: "Connector",
//     description: "You excel at building relationships and engaging with your audience",
//     icon: <Users className="h-5 w-5" />,
//     strengths: ["Community building", "Engagement", "Authenticity"],
//     strategies: ["Prioritize comments and messages", "Host live sessions", "Create interactive content"],
//   },
//   {
//     type: "Educator",
//     description: "You love sharing knowledge and teaching others",
//     icon: <BookOpen className="h-5 w-5" />,
//     strengths: ["Informative content", "Clear communication", "Expertise"],
//     strategies: ["Create how-to content", "Share insights and tips", "Develop series content"],
//   },
//   {
//     type: "Trendsetter",
//     description: "You stay ahead of the curve and influence what's next",
//     icon: <TrendingUp className="h-5 w-5" />,
//     strengths: ["Early adoption", "Trend awareness", "Cultural relevance"],
//     strategies: ["Monitor emerging trends", "Put your unique spin on trends", "Be first to market"],
//   },
// ]

// // Custom hook for saving progress
// const useSaveProgress = (data: any) => {
//   const [isSaving, setIsSaving] = useState(false)
//   const [lastSaved, setLastSaved] = useState<Date | null>(null)

//   const saveProgress = () => {
//     setIsSaving(true)
//     // Simulate saving to server
//     setTimeout(() => {
//       setIsSaving(false)
//       setLastSaved(new Date())
//       // In a real app, you would save to localStorage or a database
//       localStorage.setItem("onboardingProgress", JSON.stringify(data))
//     }, 1000)
//   }

//   return { saveProgress, isSaving, lastSaved }
// }

// // Custom component for 3D flip card
// const FlipCard = ({
//   front,
//   back,
//   isFlipped,
//   onClick,
// }: {
//   front: React.ReactNode
//   back: React.ReactNode
//   isFlipped: boolean
//   onClick: () => void
// }) => {
//   return (
//     <div className="relative h-[200px] w-full cursor-pointer perspective-1000" onClick={onClick}>
//       <div
//         className={cn(
//           "relative h-full w-full duration-500 preserve-3d transition-all",
//           isFlipped ? "rotate-y-180" : "",
//         )}
//       >
//         <div className="absolute inset-0 backface-hidden">{front}</div>
//         <div className="absolute inset-0 rotate-y-180 backface-hidden">{back}</div>
//       </div>
//     </div>
//   )
// }

// // Custom component for animated mascot
// const Mascot = ({ emotion = "happy" }: { emotion?: "happy" | "thinking" | "excited" | "confused" }) => {
//   const animations = {
//     happy: {
//       y: [0, -10, 0],
//       transition: { repeat: Number.POSITIVE_INFINITY, duration: 2 },
//     },
//     thinking: {
//       rotate: [0, 10, 0, -10, 0],
//       transition: { repeat: Number.POSITIVE_INFINITY, duration: 3 },
//     },
//     excited: {
//       scale: [1, 1.1, 1],
//       transition: { repeat: Number.POSITIVE_INFINITY, duration: 0.5 },
//     },
//     confused: {
//       rotate: [0, 5, 0, -5, 0],
//       transition: { repeat: Number.POSITIVE_INFINITY, duration: 1.5 },
//     },
//   }

//   return (
//     <motion.div className="relative h-16 w-16 rounded-full bg-primary/20 p-2" animate={animations[emotion]}>
//       <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/30">
//         {emotion === "happy" && <span className="text-2xl">😊</span>}
//         {emotion === "thinking" && <span className="text-2xl">🤔</span>}
//         {emotion === "excited" && <span className="text-2xl">🤩</span>}
//         {emotion === "confused" && <span className="text-2xl">😕</span>}
//       </div>
//     </motion.div>
//   )
// }

// // Custom component for interactive calendar
// const ContentCalendar = ({
//   selectedDays,
//   onSelectDay,
// }: {
//   selectedDays: number[]
//   onSelectDay: (day: number) => void
// }) => {
//   const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

//   return (
//     <div className="grid grid-cols-7 gap-1">
//       {days.map((day, index) => (
//         <div key={day} className="flex flex-col items-center">
//           <div className="text-xs font-medium text-muted-foreground">{day}</div>
//           <Button
//             variant={selectedDays.includes(index) ? "default" : "outline"}
//             size="sm"
//             className="mt-1 h-8 w-8 p-0"
//             onClick={() => onSelectDay(index)}
//           >
//             {selectedDays.includes(index) && <Check className="h-3 w-3" />}
//           </Button>
//         </div>
//       ))}
//     </div>
//   )
// }

// // Custom component for voice input simulation
// const VoiceInput = ({
//   onComplete,
// }: {
//   onComplete: (text: string) => void
// }) => {
//   const [isRecording, setIsRecording] = useState(false)
//   const [progress, setProgress] = useState(0)

//   const startRecording = () => {
//     setIsRecording(true)
//     setProgress(0)

//     // Simulate recording progress
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval)
//           setIsRecording(false)
//           onComplete("I want to grow my Instagram account and connect with more people who share my interests.")
//           return 100
//         }
//         return prev + 5
//       })
//     }, 150)
//   }

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       <Button
//         variant={isRecording ? "destructive" : "outline"}
//         size="lg"
//         className={cn("h-16 w-16 rounded-full", isRecording && "animate-pulse")}
//         onClick={startRecording}
//         disabled={isRecording}
//       >
//         <Mic className="h-6 w-6" />
//       </Button>

//       {isRecording && (
//         <div className="w-full space-y-2">
//           <div className="flex items-center justify-between">
//             <span className="text-xs text-muted-foreground">Recording...</span>
//             <span className="text-xs text-muted-foreground">{progress}%</span>
//           </div>
//           <Progress value={progress} className="h-1" />
//         </div>
//       )}

//       <p className="text-center text-sm text-muted-foreground">
//         {isRecording ? "Listening... speak clearly" : "Tap to record your goals"}
//       </p>
//     </div>
//   )
// }

// // Custom component for AI profile analysis
// const AiProfileAnalysis = ({
//   handle,
//   onComplete,
// }: {
//   handle: string
//   onComplete: (data: any) => void
// }) => {
//   const [isAnalyzing, setIsAnalyzing] = useState(false)
//   const [progress, setProgress] = useState(0)
//   const [result, setResult] = useState<any>(null)

//   const startAnalysis = async () => {
//     setIsAnalyzing(true)
//     setProgress(0)

//     // Simulate analysis progress
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 95) {
//           clearInterval(interval)
//           return 95
//         }
//         return prev + Math.random() * 10
//       })
//     }, 300)

//     try {
//       const data = await mockAiAnalysis(handle)
//       clearInterval(interval)
//       setProgress(100)
//       setResult(data)
//       onComplete(data)
//       setTimeout(() => {
//         setIsAnalyzing(false)
//       }, 500)
//     } catch (error) {
//       clearInterval(interval)
//       setIsAnalyzing(false)
//       toast({
//         title: "Analysis Failed",
//         description: "Could not analyze profile",
//         variant: "destructive",
//       })
//     }
//   }

//   useEffect(() => {
//     if (handle && !result) {
//       startAnalysis()
//     }
//   }, [handle])

//   if (!isAnalyzing && result) {
//     return (
//       <div className="space-y-4 rounded-lg border bg-card p-4">
//         <div className="flex items-center justify-between">
//           <h3 className="font-semibold">AI Analysis Results</h3>
//           <Badge variant="outline" className="bg-primary/10">
//             <Sparkles className="mr-1 h-3 w-3" /> AI Generated
//           </Badge>
//         </div>

//         <div className="grid gap-3">
//           <div className="flex items-center justify-between rounded-md bg-muted p-2">
//             <span className="text-sm">Followers</span>
//             <span className="font-medium">{result.followers.toLocaleString()}</span>
//           </div>
//           <div className="flex items-center justify-between rounded-md bg-muted p-2">
//             <span className="text-sm">Engagement Rate</span>
//             <span className="font-medium">{result.engagement.toFixed(1)}%</span>
//           </div>
//           <div className="flex items-center justify-between rounded-md bg-muted p-2">
//             <span className="text-sm">Growth Rate</span>
//             <span className="font-medium">+{result.growthRate.toFixed(1)}%/month</span>
//           </div>
//           <div className="flex items-center justify-between rounded-md bg-muted p-2">
//             <span className="text-sm">Top Performing Content</span>
//             <div className="flex gap-1">
//               {result.topContent.map((category: string) => (
//                 <Badge key={category} variant="outline" className="text-xs">
//                   {category}
//                 </Badge>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h3 className="font-semibold">Analyzing @{handle}</h3>
//         <Badge variant="outline" className="animate-pulse bg-primary/10">
//           <Wand2 className="mr-1 h-3 w-3" /> AI Working
//         </Badge>
//       </div>

//       <div className="space-y-2">
//         <div className="flex items-center justify-between">
//           <span className="text-xs text-muted-foreground">Analyzing profile data...</span>
//           <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
//         </div>
//         <Progress value={progress} className="h-1" />
//       </div>

//       <div className="space-y-2">
//         {progress > 30 && (
//           <div className="flex items-center gap-2 text-xs text-muted-foreground">
//             <Check className="h-3 w-3 text-green-500" />
//             Fetching profile statistics
//           </div>
//         )}
//         {progress > 50 && (
//           <div className="flex items-center gap-2 text-xs text-muted-foreground">
//             <Check className="h-3 w-3 text-green-500" />
//             Analyzing content performance
//           </div>
//         )}
//         {progress > 70 && (
//           <div className="flex items-center gap-2 text-xs text-muted-foreground">
//             <Check className="h-3 w-3 text-green-500" />
//             Evaluating audience demographics
//           </div>
//         )}
//         {progress > 90 && (
//           <div className="flex items-center gap-2 text-xs text-muted-foreground">
//             <Loader2 className="h-3 w-3 animate-spin" />
//             Generating recommendations
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// // Custom component for income projection visualization
// const IncomeProjection = ({
//   currentIncome = 0,
//   targetIncome = 5000,
//   months = 12,
// }: {
//   currentIncome?: number
//   targetIncome?: number
//   months?: number
// }) => {
//   // Generate projection data
//   const generateProjectionData = () => {
//     const data = []
//     const monthlyGrowth = (targetIncome - currentIncome) / months

//     for (let i = 0; i <= months; i++) {
//       data.push({
//         month: i,
//         value: Math.max(0, currentIncome + monthlyGrowth * i),
//       })
//     }

//     return data
//   }

//   const projectionData = generateProjectionData()
//   const maxValue = Math.max(...projectionData.map((d) => d.value))

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h3 className="font-semibold">Income Projection</h3>
//         <Badge variant="outline">{months} months</Badge>
//       </div>

//       <div className="h-[150px] w-full">
//         <div className="flex h-full items-end gap-1">
//           {projectionData.map((data, index) => (
//             <div key={index} className="group relative flex flex-1 flex-col items-center">
//               <div className="absolute -top-8 z-10 hidden rounded-md bg-black/80 px-2 py-1 text-xs text-white group-hover:block">
//                 ${Math.round(data.value).toLocaleString()}
//               </div>
//               <div
//                 className={cn(
//                   "w-full rounded-t-sm",
//                   index === 0 ? "bg-muted" : index === months ? "bg-green-500" : "bg-primary",
//                 )}
//                 style={{
//                   height: `${(data.value / maxValue) * 100}%`,
//                   opacity: 0.3 + (data.value / maxValue) * 0.7,
//                 }}
//               />
//               {index % 3 === 0 && <div className="mt-1 text-[10px] text-muted-foreground">{index}m</div>}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex items-center justify-between text-sm">
//         <div>
//           <div className="font-medium">${currentIncome.toLocaleString()}</div>
//           <div className="text-xs text-muted-foreground">Current</div>
//         </div>
//         <div className="text-right">
//           <div className="font-medium">${targetIncome.toLocaleString()}</div>
//           <div className="text-xs text-muted-foreground">Target</div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Custom component for achievement badges
// const AchievementBadge = ({
//   title,
//   icon,
//   isUnlocked = false,
//   onUnlock,
// }: {
//   title: string
//   icon: React.ReactNode
//   isUnlocked?: boolean
//   onUnlock?: () => void
// }) => {
//   return (
//     <div
//       className={cn(
//         "group relative flex flex-col items-center rounded-lg border p-3 transition-all",
//         isUnlocked
//           ? "border-primary bg-primary/5"
//           : "border-dashed border-muted-foreground/30 bg-muted/50 opacity-70 hover:opacity-100",
//       )}
//       onClick={() => !isUnlocked && onUnlock?.()}
//     >
//       <div
//         className={cn(
//           "flex h-12 w-12 items-center justify-center rounded-full",
//           isUnlocked ? "bg-primary/20" : "bg-muted",
//         )}
//       >
//         {icon}
//       </div>
//       <div className="mt-2 text-center">
//         <div className="text-xs font-medium">{title}</div>
//         <div className="text-[10px] text-muted-foreground">{isUnlocked ? "Unlocked" : "Locked"}</div>
//       </div>

//       {!isUnlocked && (
//         <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/5 opacity-0 transition-opacity group-hover:opacity-100">
//           <Button variant="secondary" size="sm" className="text-xs">
//             Unlock
//           </Button>
//         </div>
//       )}
//     </div>
//   )
// }

// // Main component
// export default function OnboardingPage() {
//   const router = useRouter()
//   const [step, setStep] = useState(0)
//   const [userType, setUserType] = useState<"regular" | "influencer" | null>(null)
//   const [progress, setProgress] = useState(0)
//   const [profileImage, setProfileImage] = useState<string | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([])
//   const [socialHandles, setSocialHandles] = useState<Record<string, string>>({})
//   const [phoneNumber, setPhoneNumber] = useState("")
//   const [isVerifying, setIsVerifying] = useState(false)
//   const [verificationCode, setVerificationCode] = useState("")
//   const [expectedCode, setExpectedCode] = useState("")
//   const [isVerified, setIsVerified] = useState(false)
//   const [verificationStep, setVerificationStep] = useState<"input" | "verify">("input")
//   const [email, setEmail] = useState("")
//   const [incomeGoal, setIncomeGoal] = useState(5000)
//   const [selectedIncomeRange, setSelectedIncomeRange] = useState(1)
//   const [acceptedTerms, setAcceptedTerms] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [flippedCards, setFlippedCards] = useState<number[]>([])
//   const [selectedContentFrequency, setSelectedContentFrequency] = useState<string>("")
//   const [selectedBrandCollabs, setSelectedBrandCollabs] = useState<string[]>([])
//   const [selectedContentDays, setSelectedContentDays] = useState<number[]>([])
//   const [selectedLearningTopics, setSelectedLearningTopics] = useState<string[]>([])
//   const [selectedGrowthChallenges, setSelectedGrowthChallenges] = useState<string[]>([])
//   const [selectedContentStyle, setSelectedContentStyle] = useState<string>("")
//   const [personalityResult, setPersonalityResult] = useState<string>("")
//   const [personalityAnswers, setPersonalityAnswers] = useState<Record<string, string>>({})
//   const [goalStatement, setGoalStatement] = useState<string>("")
//   const [aiAnalysisResult, setAiAnalysisResult] = useState<any>(null)
//   const [achievements, setAchievements] = useState<Record<string, boolean>>({
//     profile: false,
//     categories: false,
//     social: false,
//     verification: false,
//     goals: false,
//   })
//   const [showMascot, setShowMascot] = useState(true)
//   const [mascotEmotion, setMascotEmotion] = useState<"happy" | "thinking" | "excited" | "confused">("happy")

//   // Determine total steps based on user type
//   const totalSteps = userType === "influencer" ? 10 : 8

//   // Save progress hook
//   const { saveProgress, isSaving, lastSaved } = useSaveProgress({
//     step,
//     userType,
//     profileImage,
//     selectedCategories,
//     socialHandles,
//     phoneNumber,
//     email,
//     incomeGoal,
//   })

//   // Update progress when step changes
//   useEffect(() => {
//     setProgress(((step + 1) / totalSteps) * 100)

//     // Update mascot emotion based on step
//     if (step === totalSteps - 1) {
//       setMascotEmotion("excited")
//     } else if (step > totalSteps / 2) {
//       setMascotEmotion("happy")
//     } else if (step === 0) {
//       setMascotEmotion("thinking")
//     } else {
//       setMascotEmotion("confused")
//     }
//   }, [step, totalSteps])

//   // Trigger confetti effect
//   const triggerConfetti = () => {
//     confetti({
//       particleCount: 100,
//       spread: 70,
//       origin: { y: 0.6 },
//     })
//   }

//   // Handle unlocking achievements
//   const unlockAchievement = (achievement: string) => {
//     if (!achievements[achievement]) {
//       setAchievements((prev) => ({
//         ...prev,
//         [achievement]: true,
//       }))

//       toast({
//         title: "Achievement Unlocked!",
//         description: `You've unlocked the ${achievement} achievement!`,
//         variant: "default",
//       })

//       // Small confetti burst
//       confetti({
//         particleCount: 30,
//         spread: 50,
//         origin: { y: 0.7 },
//       })
//     }
//   }

//   // Navigation functions
//   const nextStep = async () => {
//     const user = await onBoardUser()
//     // const nextStep = () => {
//     if (step < totalSteps - 1) {
//       setStep(step + 1)

//       // Unlock achievements based on progress
//       if (step === 1 && profileImage) unlockAchievement("profile")
//       if (step === 2 && selectedCategories.length > 0) unlockAchievement("categories")
//       if (step === 3 && Object.keys(socialHandles).length > 0) unlockAchievement("social")
//       if (step === 5 && isVerified) unlockAchievement("verification")
//       if (step === totalSteps - 2) unlockAchievement("goals")
//     } else {
//       // Final submission
//       setIsSubmitting(true)

//       setTimeout(() => {
//         setIsSubmitting(false)
//         triggerConfetti()
//         // Redirect based on user type
//         setTimeout(() => {
//           if (userType === "influencer") {
//             router.push("/influencers")
//             // router.push(`dashboard/${user.data?.firstname}-${user.data?.lastname}`)
//           } else {
//             router.push("/dashboard")
//             // router.push(`influencers/${user.data?.firstname}-${user.data?.lastname}`)
//           }
//         }, 2000)
//       }, 1500)
//     }
//   }

//   const prevStep = () => {
//     if (step > 0) {
//       setStep(step - 1)
//     }
//   }

//   const setUserAndAdvance = (type: "regular" | "influencer") => {
//     setUserType(type)
//     nextStep()
//   }

//   // File handling functions
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         setProfileImage(e.target?.result as string)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   // Category selection
//   const handleCategoryToggle = (category: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
//     )
//   }

//   // Social handle management
//   const handleSocialHandleChange = (platform: string, value: string) => {
//     setSocialHandles((prev) => ({
//       ...prev,
//       [platform]: value,
//     }))
//   }

  

//   // Phone verification
//   // Update the handleVerifyPhone function to use the server action
//   const handleVerifyPhone = async () => {
//     if (!phoneNumber || phoneNumber.length < 10) {
//       toast({
//         title: "Invalid Phone Number",
//         description: "Please enter a valid phone number",
//         variant: "destructive",
//       })
//       return
//     }

//     setIsVerifying(true)
//     try {
//       // Call the server action to send the verification code
//       const result = await sendVerificationSMS(phoneNumber)

//       if (result.status === 200) {
//         setExpectedCode(result.data?.code||"12345")
//         setVerificationStep("verify")
//         toast({
//           title: "Verification Code Sent",
//           description: `We've sent a code to ${phoneNumber}. For demo purposes, the code is: ${result.data?.code}`,
//         })
//       } else {
//         toast({
//           title: "Verification Failed",
//           description: result.error || "Could not send verification code",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       toast({
//         title: "Verification Failed",
//         description: "Could not send verification code",
//         variant: "destructive",
//       })
//     } finally {
//       setIsVerifying(false)
//     }
//   }

//   // Update the handleCheckVerificationCode function to use the server action
//   // const handleCheckVerificationCode = async () => {
//   //   if (!verificationCode) {
//   //     toast({
//   //       title: "Missing Code",
//   //       description: "Please enter the verification code",
//   //       variant: "destructive",
//   //     })
//   //     return
//   //   }

//   //   setIsVerifying(true)
//   //   try {
//   //     // For demo purposes, we'll check against the expected code directly
//   //     // In production, you would use the verifyCode server action
//   //     const isValid = verificationCode === expectedCode

//   //     if (isValid) {
//   //       setIsVerified(true)
//   //       toast({
//   //         title: "Phone Verified",
//   //         description: "Your phone number has been verified successfully!",
//   //       })
//   //       nextStep()
//   //     } else {
//   //       toast({
//   //         title: "Invalid Code",
//   //         description: "The code you entered is incorrect",
//   //         variant: "destructive",
//   //       })
//   //     }

//   //     // Uncomment this for production use with the server action
//   //     /*
//   //     const result = await verifyCode(phoneNumber, verificationCode)
      
//   //     if (result.status === 200) {
//   //       setIsVerified(true)
//   //       toast({
//   //         title: "Phone Verified",
//   //         description: "Your phone number has been verified successfully!",
//   //       })
//   //       nextStep()
//   //     } else {
//   //       toast({
//   //         title: "Invalid Code",
//   //         description: result.error || "The code you entered is incorrect",
//   //         variant: "destructive",
//   //       })
//   //     }
//   //     */
//   //   } catch (error) {
//   //     toast({
//   //       title: "Verification Failed",
//   //       description: "Could not verify code",
//   //       variant: "destructive",
//   //     })
//   //   } finally {
//   //     setIsVerifying(false)
//   //   }
//   // }
//   // Update the handleCheckVerificationCode function in your onboarding-page.tsx
// const handleCheckVerificationCode = async () => {
//   if (!verificationCode) {
//     toast({
//       title: "Missing Code",
//       description: "Please enter the verification code",
//       variant: "destructive",
//     })
//     return
//   }

//   setIsVerifying(true)
//   try {
//     // Call the server action to verify the code
//     const result = await verifyCode(phoneNumber, verificationCode)
    
//     if (result.status === 200) {
//       setIsVerified(true)
//       toast({
//         title: "Phone Verified",
//         description: "Your phone number has been verified successfully!",
//       })
//       nextStep()
//     } else {
//       toast({
//         title: "Invalid Code",
//         description: result.error || "The code you entered is incorrect",
//         variant: "destructive",
//       })
//     }
//   } catch (error) {
//     toast({
//       title: "Verification Failed",
//       description: "Could not verify code",
//       variant: "destructive",
//     })
//   } finally {
//     setIsVerifying(false)
//   }
// }

//   // Income goal management
//   const handleIncomeRangeSelect = (index: number) => {
//     setSelectedIncomeRange(index)
//     setIncomeGoal(incomeRanges[index].min + (incomeRanges[index].max - incomeRanges[index].min) / 2)
//   }

//   const handleIncomeSliderChange = (value: number[]) => {
//     setIncomeGoal(value[0])
//   }

//   const getCurrentIncomeRange = () => {
//     return incomeRanges.find((range) => incomeGoal >= range.min && incomeGoal <= range.max) || incomeRanges[0]
//   }

//   // Card flipping
//   const toggleCardFlip = (index: number) => {
//     setFlippedCards((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
//   }

//   // Content days selection
//   const toggleContentDay = (day: number) => {
//     setSelectedContentDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
//   }

//   // Learning topics selection
//   const toggleLearningTopic = (topic: string) => {
//     setSelectedLearningTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]))
//   }

//   // Growth challenges selection
//   const toggleGrowthChallenge = (challenge: string) => {
//     setSelectedGrowthChallenges((prev) =>
//       prev.includes(challenge) ? prev.filter((c) => c !== challenge) : [...prev, challenge],
//     )
//   }

//   // Brand collab selection
//   const toggleBrandCollab = (collab: string) => {
//     setSelectedBrandCollabs((prev) => (prev.includes(collab) ? prev.filter((c) => c !== collab) : [...prev, collab]))
//   }

//   // Personality quiz
//   const handlePersonalityAnswer = (question: string, answer: string) => {
//     setPersonalityAnswers((prev) => ({
//       ...prev,
//       [question]: answer,
//     }))

//     // Simple algorithm to determine personality type
//     setTimeout(() => {
//       const answers = { ...personalityAnswers, [question]: answer }
//       const counts: Record<string, number> = {
//         Creator: 0,
//         Connector: 0,
//         Educator: 0,
//         Trendsetter: 0,
//       }

//       Object.values(answers).forEach((a) => {
//         if (a.includes("creative") || a.includes("original")) counts.Creator++
//         if (a.includes("people") || a.includes("community")) counts.Connector++
//         if (a.includes("teach") || a.includes("inform")) counts.Educator++
//         if (a.includes("trend") || a.includes("new")) counts.Trendsetter++
//       })

//       // Find the highest score
//       let maxType = "Creator"
//       let maxCount = 0

//       Object.entries(counts).forEach(([type, count]) => {
//         if (count > maxCount) {
//           maxType = type
//           maxCount = count
//         }
//       })

//       setPersonalityResult(maxType)
//     }, 300)
//   }

//   // Helper functions
//   const getProgressColor = () => {
//     if (progress < 30) return "bg-red-500"
//     if (progress < 70) return "bg-yellow-500"
//     return "bg-green-500"
//   }

//   // Render the questionnaire
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
//       <Card className="w-full max-w-md overflow-hidden border-none bg-card shadow-lg">
//         <CardContent className="p-0">
//           <div className="bg-primary/10 p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-primary">Welcome to Yazil</h1>
//                 <p className="text-muted-foreground">Let&apos;s set up your experience</p>
//               </div>

//               {showMascot && (
//                 <div className="relative">
//                   <Mascot emotion={mascotEmotion} />
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-background p-0"
//                     onClick={() => setShowMascot(false)}
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 </div>
//               )}
//             </div>

//             <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-primary/10">
//               <motion.div
//                 className={cn("h-full rounded-full", getProgressColor())}
//                 initial={{ width: 0 }}
//                 animate={{ width: `${progress}%` }}
//                 transition={{ duration: 0.5 }}
//               />
//             </div>

//             <div className="mt-1 flex justify-between text-xs text-muted-foreground">
//               <span>
//                 Step {step + 1} of {totalSteps}
//               </span>
//               <span>{Math.round(progress)}% Complete</span>
//             </div>

//             {/* Save progress button */}
//             <div className="mt-2 flex items-center justify-end gap-2">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="h-7 gap-1 text-xs"
//                 onClick={saveProgress}
//                 disabled={isSaving}
//               >
//                 {isSaving ? (
//                   <>
//                     <Loader2 className="h-3 w-3 animate-spin" />
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="h-3 w-3" />
//                     Save Progress
//                   </>
//                 )}
//               </Button>

//               {lastSaved && (
//                 <span className="text-xs text-muted-foreground">Last saved: {lastSaved.toLocaleTimeString()}</span>
//               )}
//             </div>
//           </div>

//           <div className="min-h-[500px] p-6">
//             <AnimatePresence mode="wait">
//               {/* Step 1: User Type Selection */}
//               {step === 0 && (
//                 <motion.div
//                   key="step0"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Tell us about yourself</h2>
//                   <p className="text-muted-foreground">Which option best describes you?</p>

//                   <div className="grid gap-4">
//                     <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                       <Button
//                         variant="outline"
//                         className="flex h-auto w-full items-start justify-start gap-4 p-4 text-left"
//                         onClick={() => setUserAndAdvance("regular")}
//                       >
//                         <div className="rounded-full bg-primary/10 p-2">
//                           <Users className="h-6 w-6 text-primary" />
//                         </div>
//                         <div className="flex-1">
//                           <div className="font-medium">Regular User</div>
//                           <div className="text-sm text-muted-foreground">I want to grow my personal account</div>
//                         </div>
//                         <ChevronRight className="h-5 w-5 text-muted-foreground" />
//                       </Button>
//                     </motion.div>

//                     <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                       <Button
//                         variant="outline"
//                         className="flex h-auto w-full items-start justify-start gap-4 p-4 text-left"
//                         onClick={() => setUserAndAdvance("influencer")}
//                       >
//                         <div className="rounded-full bg-primary/10 p-2">
//                           <Star className="h-6 w-6 text-primary" />
//                         </div>
//                         <div className="flex-1">
//                           <div className="font-medium">Influencer</div>
//                           <div className="text-sm text-muted-foreground">
//                             I have a significant following and brand partnerships
//                           </div>
//                         </div>
//                         <ChevronRight className="h-5 w-5 text-muted-foreground" />
//                       </Button>
//                     </motion.div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 2: Profile Picture */}
//               {step === 1 && (
//                 <motion.div
//                   key="step1"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Add a profile picture</h2>
//                   <p className="text-muted-foreground">This will be displayed on your profile and dashboard</p>

//                   <div className="flex flex-col items-center justify-center space-y-4">
//                     <div className="relative">
//                       <Avatar className="h-32 w-32 border-2 border-primary/20">
//                         {profileImage ? (
//                           <AvatarImage src={profileImage} alt="Profile" />
//                         ) : (
//                           <AvatarFallback className="bg-primary/10 text-2xl">
//                             {userType === "influencer" ? "INF" : "USR"}
//                           </AvatarFallback>
//                         )}
//                       </Avatar>
//                       <Button
//                         size="icon"
//                         variant="secondary"
//                         className="absolute bottom-0 right-0 rounded-full"
//                         onClick={() => fileInputRef.current?.click()}
//                       >
//                         <Camera className="h-4 w-4" />
//                       </Button>
//                       <input
//                         type="file"
//                         ref={fileInputRef}
//                         className="hidden"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                       />
//                     </div>

//                     <div className="text-center text-sm text-muted-foreground">
//                       {profileImage ? (
//                         <span className="flex items-center gap-1 text-green-500">
//                           <Check className="h-4 w-4" /> Image uploaded
//                         </span>
//                       ) : (
//                         "Click to upload an image"
//                       )}
//                     </div>

//                     <Button onClick={nextStep} className="mt-4 w-full" disabled={isSubmitting}>
//                       {profileImage ? "Continue" : "Skip for now"}
//                     </Button>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 3: Content Categories */}
//               {step === 2 && (
//                 <motion.div
//                   key="step2"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Content Categories</h2>
//                   <p className="text-muted-foreground">Select your primary content categories (up to 5)</p>

//                   <div className="grid grid-cols-3 gap-3">
//                     {contentCategories.map((category) => (
//                       <motion.div key={category.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                         <Button
//                           variant={selectedCategories.includes(category.name) ? "default" : "outline"}
//                           className={cn(
//                             "flex h-auto w-full flex-col items-center justify-center gap-2 p-3 text-center",
//                             selectedCategories.includes(category.name) ? "border-primary" : "",
//                           )}
//                           onClick={() => handleCategoryToggle(category.name)}
//                           disabled={!selectedCategories.includes(category.name) && selectedCategories.length >= 5}
//                         >
//                           <div
//                             className={cn("flex h-10 w-10 items-center justify-center rounded-full", category.color)}
//                           >
//                             <span className="text-xl">{category.icon}</span>
//                           </div>
//                           <span className="text-xs font-medium">{category.name}</span>
//                         </Button>
//                       </motion.div>
//                     ))}
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-muted-foreground">{selectedCategories.length}/5 selected</span>
//                     <Button onClick={nextStep} disabled={selectedCategories.length === 0 || isSubmitting}>
//                       Continue
//                     </Button>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 4: Social Media Handles */}
//               {step === 3 && (
//                 <motion.div
//                   key="step3"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Social Media Profiles</h2>
//                   <p className="text-muted-foreground">Add your social media handles</p>

//                   <div className="space-y-4">
//                     {socialPlatforms.map((platform) => (
//                       <div key={platform.name} className="space-y-2">
//                         <Label className="flex items-center gap-2">
//                           <div className={cn("flex h-5 w-5 items-center justify-center rounded-md", platform.color)}>
//                             {platform.icon}
//                           </div>
//                           {platform.name}
//                         </Label>
//                         <div className="flex items-center gap-2">
//                           <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
//                             <AtSign className="h-4 w-4 text-muted-foreground" />
//                           </div>
//                           <Input
//                             placeholder={platform.placeholder}
//                             value={socialHandles[platform.name] || ""}
//                             onChange={(e) => handleSocialHandleChange(platform.name, e.target.value)}
//                             className="flex-1"
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* AI Analysis for Influencers */}
//                   {userType === "influencer" && socialHandles.Instagram && (
//                     <div className="mt-4">
//                       <AiProfileAnalysis handle={socialHandles.Instagram} onComplete={setAiAnalysisResult} />
//                     </div>
//                   )}

//                   <Button
//                     onClick={nextStep}
//                     className="w-full"
//                     disabled={Object.keys(socialHandles).length === 0 || isSubmitting}
//                   >
//                     {Object.keys(socialHandles).length > 0 ? "Continue" : "Skip for now"}
//                   </Button>
//                 </motion.div>
//               )}

//               {/* Step 5: Email */}
//               {step === 4 && (
//                 <motion.div
//                   key="step4"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Contact Information</h2>
//                   <p className="text-muted-foreground">Add your email address</p>

//                   <div className="space-y-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="email" className="flex items-center gap-2">
//                         <Mail className="h-4 w-4 text-primary" />
//                         Email Address
//                       </Label>
//                       <Input
//                         id="email"
//                         type="email"
//                         placeholder="your@email.com"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                       />
//                     </div>
//                   </div>

//                   <Button
//                     onClick={nextStep}
//                     className="w-full"
//                     disabled={!email || !email.includes("@") || isSubmitting}
//                   >
//                     Continue
//                   </Button>
//                 </motion.div>
//               )}

//               {/* Step 6: Phone Verification */}
//               {step === 5 && (
//                 <motion.div
//                   key="step5"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Phone Verification</h2>
//                   <p className="text-muted-foreground">
//                     {verificationStep === "input"
//                       ? "Add and verify your phone number"
//                       : "Enter the verification code sent to your phone"}
//                   </p>

//                   <div className="space-y-6">
//                     {verificationStep === "input" ? (
//                       <div className="space-y-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="phone" className="flex items-center gap-2">
//                             <Phone className="h-4 w-4 text-primary" />
//                             Phone Number
//                           </Label>
//                           <div className="flex items-center gap-2">
//                             <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
//                               <Smartphone className="h-4 w-4 text-muted-foreground" />
//                             </div>
//                             <Input
//                               id="phone"
//                               type="tel"
//                               placeholder="+1 (555) 123-4567"
//                               value={phoneNumber}
//                               onChange={(e) => setPhoneNumber(e.target.value)}
//                               className="flex-1"
//                             />
//                           </div>
//                         </div>

//                         <Button onClick={handleVerifyPhone} className="w-full" disabled={!phoneNumber || isVerifying}>
//                           {isVerifying ? (
//                             <>
//                               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                               Sending Code...
//                             </>
//                           ) : (
//                             "Send Verification Code"
//                           )}
//                         </Button>
//                       </div>
//                     ) : (
//                       <div className="space-y-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="code" className="flex items-center gap-2">
//                             <Lock className="h-4 w-4 text-primary" />
//                             Verification Code
//                           </Label>
//                           <div className="flex items-center gap-2">
//                             <Input
//                               id="code"
//                               type="text"
//                               placeholder="Enter 6-digit code"
//                               value={verificationCode}
//                               onChange={(e) => setVerificationCode(e.target.value)}
//                               className="flex-1 text-center text-xl tracking-widest"
//                               maxLength={6}
//                             />
//                           </div>
//                           <p className="text-xs text-muted-foreground">
//                             For demo purposes, the code is: <span className="font-mono font-bold">{expectedCode}</span>
//                           </p>
//                         </div>

//                         <div className="flex gap-2">
//                           <Button
//                             variant="outline"
//                             onClick={() => setVerificationStep("input")}
//                             className="flex-1"
//                             disabled={isVerifying}
//                           >
//                             Back
//                           </Button>
//                           <Button
//                             onClick={handleCheckVerificationCode}
//                             className="flex-1"
//                             disabled={!verificationCode || verificationCode.length < 6 || isVerifying}
//                           >
//                             {isVerifying ? (
//                               <>
//                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                 Verifying...
//                               </>
//                             ) : (
//                               "Verify Code"
//                             )}
//                           </Button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 7: Content Strategy (Influencer) or Learning Goals (Regular) */}
//               {step === 6 && (
//                 <motion.div
//                   key="step6"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   {userType === "influencer" ? (
//                     <>
//                       <h2 className="text-xl font-semibold">Content Strategy</h2>
//                       <p className="text-muted-foreground">Tell us about your content creation approach</p>

//                       <div className="space-y-6">
//                         <div className="space-y-2">
//                           <Label>How often do you post content?</Label>
//                           <RadioGroup value={selectedContentFrequency} onValueChange={setSelectedContentFrequency}>
//                             <div className="grid grid-cols-2 gap-2">
//                               {contentFrequencies.map((frequency) => (
//                                 <div key={frequency} className="flex items-center space-x-2">
//                                   <RadioGroupItem value={frequency} id={`frequency-${frequency}`} />
//                                   <Label htmlFor={`frequency-${frequency}`} className="text-sm">
//                                     {frequency}
//                                   </Label>
//                                 </div>
//                               ))}
//                             </div>
//                           </RadioGroup>
//                         </div>

//                         <div className="space-y-2">
//                           <Label>Which days do you typically post?</Label>
//                           <ContentCalendar selectedDays={selectedContentDays} onSelectDay={toggleContentDay} />
//                         </div>

//                         <div className="space-y-2">
//                           <Label>What types of brand collaborations do you prefer?</Label>
//                           <div className="grid grid-cols-2 gap-2">
//                             {brandCollabTypes.map((collab) => (
//                               <div key={collab} className="flex items-center space-x-2">
//                                 <Checkbox
//                                   id={`collab-${collab}`}
//                                   checked={selectedBrandCollabs.includes(collab)}
//                                   onCheckedChange={() => toggleBrandCollab(collab)}
//                                 />
//                                 <Label htmlFor={`collab-${collab}`} className="text-sm">
//                                   {collab}
//                                 </Label>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <h2 className="text-xl font-semibold">Learning Goals</h2>
//                       <p className="text-muted-foreground">What would you like to learn about?</p>

//                       <div className="space-y-6">
//                         <div className="space-y-2">
//                           <Label>Select topics you&apos;re interested in learning:</Label>
//                           <div className="grid grid-cols-2 gap-2">
//                             {learningTopics.map((topic) => (
//                               <div key={topic} className="flex items-center space-x-2">
//                                 <Checkbox
//                                   id={`topic-${topic}`}
//                                   checked={selectedLearningTopics.includes(topic)}
//                                   onCheckedChange={() => toggleLearningTopic(topic)}
//                                 />
//                                 <Label htmlFor={`topic-${topic}`} className="text-sm">
//                                   {topic}
//                                 </Label>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         <div className="space-y-2">
//                           <Label>What are your biggest growth challenges?</Label>
//                           <div className="grid grid-cols-2 gap-2">
//                             {growthChallenges.map((challenge) => (
//                               <div key={challenge} className="flex items-center space-x-2">
//                                 <Checkbox
//                                   id={`challenge-${challenge}`}
//                                   checked={selectedGrowthChallenges.includes(challenge)}
//                                   onCheckedChange={() => toggleGrowthChallenge(challenge)}
//                                 />
//                                 <Label htmlFor={`challenge-${challenge}`} className="text-sm">
//                                   {challenge}
//                                 </Label>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         <div className="space-y-2">
//                           <Label>Tell us your goals in your own words:</Label>
//                           <div className="flex items-center gap-2">
//                             <Textarea
//                               placeholder="I want to grow my account and..."
//                               value={goalStatement}
//                               onChange={(e) => setGoalStatement(e.target.value)}
//                               className="min-h-[80px] flex-1"
//                             />
//                             <TooltipProvider>
//                               <Tooltip>
//                                 <TooltipTrigger asChild>
//                                   <Button
//                                     variant="outline"
//                                     size="icon"
//                                     className="h-10 w-10 shrink-0"
//                                     onClick={() => {
//                                       setGoalStatement("")
//                                       toast({
//                                         title: "Voice Input Ready",
//                                         description: "Click the microphone to start recording",
//                                       })
//                                     }}
//                                   >
//                                     <Mic className="h-4 w-4" />
//                                   </Button>
//                                 </TooltipTrigger>
//                                 <TooltipContent>
//                                   <p>Use voice input</p>
//                                 </TooltipContent>
//                               </Tooltip>
//                             </TooltipProvider>
//                           </div>
//                         </div>
//                       </div>
//                     </>
//                   )}

//                   <Button onClick={nextStep} className="w-full" disabled={isSubmitting}>
//                     Continue
//                   </Button>
//                 </motion.div>
//               )}

//               {/* Step 7: Content Style (Influencer) or Personality Quiz (Regular) */}
//               {step === 7 && (
//                 <motion.div
//                   key="step7"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   {userType === "influencer" ? (
//                     <>
//                       <h2 className="text-xl font-semibold">Content Style</h2>
//                       <p className="text-muted-foreground">Select your preferred aesthetic</p>

//                       <div className="grid grid-cols-2 gap-4">
//                         {contentStyles.map((style, index) => (
//                           <motion.div key={style.name} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
//                             <Button
//                               variant={selectedContentStyle === style.name ? "default" : "outline"}
//                               className={cn(
//                                 "flex h-auto w-full flex-col items-center justify-center gap-2 p-4 text-center",
//                                 selectedContentStyle === style.name ? "border-primary" : "",
//                               )}
//                               onClick={() => setSelectedContentStyle(style.name)}
//                             >
//                               <span className="text-2xl">{style.icon}</span>
//                               <div>
//                                 <div className="font-medium">{style.name}</div>
//                                 <div className="text-xs text-muted-foreground">{style.description}</div>
//                               </div>
//                             </Button>
//                           </motion.div>
//                         ))}
//                       </div>

//                       <div className="space-y-4">
//                         <h3 className="font-medium">Visual Mood Board</h3>
//                         <div className="grid grid-cols-3 gap-2">
//                           {[1, 2, 3, 4, 5, 6].map((i) => (
//                             <div key={i} className="group relative aspect-square overflow-hidden rounded-md bg-muted">
//                               <div className="absolute inset-0 flex items-center justify-center">
//                                 <Image className="h-6 w-6 text-muted-foreground" />
//                               </div>
//                               <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
//                                 <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
//                                   <Plus className="h-4 w-4" />
//                                 </Button>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <h2 className="text-xl font-semibold">Content Creator Personality</h2>
//                       <p className="text-muted-foreground">Let&apos;s discover your content creator type</p>

//                       <div className="space-y-6">
//                         {personalityResult ? (
//                           <div className="space-y-4">
//                             <div className="rounded-lg border bg-card p-4">
//                               <div className="flex items-center gap-3">
//                                 <div className="rounded-full bg-primary/10 p-2">
//                                   {personalityTypes.find((p) => p.type === personalityResult)?.icon || (
//                                     <Star className="h-5 w-5 text-primary" />
//                                   )}
//                                 </div>
//                                 <div>
//                                   <h3 className="font-semibold">You&apos;re a {personalityResult}!</h3>
//                                   <p className="text-sm text-muted-foreground">
//                                     {personalityTypes.find((p) => p.type === personalityResult)?.description}
//                                   </p>
//                                 </div>
//                               </div>

//                               <div className="mt-4 space-y-3">
//                                 <div>
//                                   <h4 className="text-sm font-medium">Your Strengths:</h4>
//                                   <ul className="mt-1 list-inside list-disc text-sm text-muted-foreground">
//                                     {personalityTypes
//                                       .find((p) => p.type === personalityResult)
//                                       ?.strengths.map((strength, i) => (
//                                         <li key={i}>{strength}</li>
//                                       ))}
//                                   </ul>
//                                 </div>

//                                 <div>
//                                   <h4 className="text-sm font-medium">Recommended Strategies:</h4>
//                                   <ul className="mt-1 list-inside list-disc text-sm text-muted-foreground">
//                                     {personalityTypes
//                                       .find((p) => p.type === personalityResult)
//                                       ?.strategies.map((strategy, i) => (
//                                         <li key={i}>{strategy}</li>
//                                       ))}
//                                   </ul>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="flex justify-center">
//                               <Button variant="outline" size="sm" onClick={() => setPersonalityResult("")}>
//                                 Retake Quiz
//                               </Button>
//                             </div>
//                           </div>
//                         ) : (
//                           <div className="space-y-4">
//                             <div className="space-y-3">
//                               <div className="space-y-2">
//                                 <Label>When creating content, I prefer to:</Label>
//                                 <RadioGroup
//                                   value={personalityAnswers["q1"] || ""}
//                                   onValueChange={(value) => handlePersonalityAnswer("q1", value)}
//                                 >
//                                   <div className="space-y-2">
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="express my creative ideas" id="q1-a" />
//                                       <Label htmlFor="q1-a">Express my creative ideas</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="connect with my community" id="q1-b" />
//                                       <Label htmlFor="q1-b">Connect with my community</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="teach others something new" id="q1-c" />
//                                       <Label htmlFor="q1-c">Teach others something new</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="try the latest trends" id="q1-d" />
//                                       <Label htmlFor="q1-d">Try the latest trends</Label>
//                                     </div>
//                                   </div>
//                                 </RadioGroup>
//                               </div>

//                               <div className="space-y-2">
//                                 <Label>I get the most satisfaction from:</Label>
//                                 <RadioGroup
//                                   value={personalityAnswers["q2"] || ""}
//                                   onValueChange={(value) => handlePersonalityAnswer("q2", value)}
//                                 >
//                                   <div className="space-y-2">
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="creating original content" id="q2-a" />
//                                       <Label htmlFor="q2-a">Creating original content</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="building a community of people" id="q2-b" />
//                                       <Label htmlFor="q2-b">Building a community of people</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="informing and educating others" id="q2-c" />
//                                       <Label htmlFor="q2-c">Informing and educating others</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="discovering new trends" id="q2-d" />
//                                       <Label htmlFor="q2-d">Discovering new trends</Label>
//                                     </div>
//                                   </div>
//                                 </RadioGroup>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </>
//                   )}

//                   <Button
//                     onClick={nextStep}
//                     className="w-full"
//                     disabled={isSubmitting || (userType === "influencer" && !selectedContentStyle)}
//                   >
//                     Continue
//                   </Button>
//                 </motion.div>
//               )}

//               {/* Step 8: Income Goals */}
//               {step === 8 && (
//                 <motion.div
//                   key="step8"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Income Goals</h2>
//                   <p className="text-muted-foreground">What are your monthly income goals?</p>

//                   <div className="space-y-6">
//                     <Tabs defaultValue="slider" className="w-full">
//                       <TabsList className="grid w-full grid-cols-2">
//                         <TabsTrigger value="slider">Slider</TabsTrigger>
//                         <TabsTrigger value="preset">Preset Ranges</TabsTrigger>
//                       </TabsList>
//                       <TabsContent value="slider" className="space-y-4 pt-4">
//                         <div className="space-y-6">
//                           <div className="flex flex-col items-center justify-center">
//                             <div className="text-3xl font-bold text-primary">${incomeGoal.toLocaleString()}</div>
//                             <div className="text-sm text-muted-foreground">per month</div>
//                           </div>

//                           <div className="px-2">
//                             <Slider
//                               defaultValue={[incomeGoal]}
//                               max={userType === "influencer" ? 100000 : 20000}
//                               step={100}
//                               onValueChange={handleIncomeSliderChange}
//                             />

//                             <div className="flex justify-between text-xs text-muted-foreground">
//                               <span>$0</span>
//                               <span>${userType === "influencer" ? "100,000" : "20,000"}+</span>
//                             </div>
//                           </div>

//                           <div className="rounded-lg border bg-card p-4 shadow-sm">
//                             <div className="flex items-center gap-2">
//                               <Badge variant="outline" className="bg-primary/10 text-primary">
//                                 {getCurrentIncomeRange().level}
//                               </Badge>
//                               <span className="text-sm font-medium">{getCurrentIncomeRange().label}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </TabsContent>

//                       <TabsContent value="preset" className="space-y-4 pt-4">
//                         <RadioGroup
//                           value={selectedIncomeRange.toString()}
//                           onValueChange={(value) => handleIncomeRangeSelect(Number.parseInt(value))}
//                           className="space-y-3"
//                         >
//                           {incomeRanges.map((range, index) => (
//                             <div key={index} className="flex items-center space-x-2">
//                               <RadioGroupItem value={index.toString()} id={`range-${index}`} />
//                               <Label
//                                 htmlFor={`range-${index}`}
//                                 className="flex flex-1 cursor-pointer items-center justify-between rounded-md border p-3 hover:bg-accent"
//                               >
//                                 <div className="flex items-center gap-2">
//                                   <DollarSign className="h-4 w-4 text-primary" />
//                                   <span>{range.label}</span>
//                                 </div>
//                                 <Badge variant="outline">{range.level}</Badge>
//                               </Label>
//                             </div>
//                           ))}
//                         </RadioGroup>
//                       </TabsContent>
//                     </Tabs>

//                     {/* Income Projection */}
//                     <IncomeProjection
//                       currentIncome={userType === "influencer" ? 2000 : 500}
//                       targetIncome={incomeGoal}
//                       months={12}
//                     />

//                     <div className="flex items-center space-x-2">
//                       <Checkbox
//                         id="terms"
//                         checked={acceptedTerms}
//                         onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
//                       />
//                       <Label htmlFor="terms" className="text-sm">
//                         I understand this is my target goal and actual results may vary
//                       </Label>
//                     </div>

//                     <Button onClick={nextStep} className="w-full" disabled={!acceptedTerms || isSubmitting}>
//                       {userType === "influencer" && step < 9 ? "Continue" : "Complete Setup"}
//                     </Button>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 9: Achievements (Influencer only) */}
//               {userType === "influencer" && step === 9 && (
//                 <motion.div
//                   key="step9"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Your Achievements</h2>
//                   <p className="text-muted-foreground">Unlock achievements as you grow</p>

//                   <div className="grid grid-cols-3 gap-3">
//                     <AchievementBadge
//                       title="Profile Setup"
//                       icon={<User className="h-5 w-5 text-primary" />}
//                       isUnlocked={achievements.profile}
//                       onUnlock={() => unlockAchievement("profile")}
//                     />
//                     <AchievementBadge
//                       title="Categories"
//                       icon={<Layers className="h-5 w-5 text-primary" />}
//                       isUnlocked={achievements.categories}
//                       onUnlock={() => unlockAchievement("categories")}
//                     />
//                     <AchievementBadge
//                       title="Social Connect"
//                       icon={<Share2 className="h-5 w-5 text-primary" />}
//                       isUnlocked={achievements.social}
//                       onUnlock={() => unlockAchievement("social")}
//                     />
//                     <AchievementBadge
//                       title="Verified"
//                       icon={<BadgeCheck className="h-5 w-5 text-primary" />}
//                       isUnlocked={achievements.verification}
//                       onUnlock={() => unlockAchievement("verification")}
//                     />
//                     <AchievementBadge
//                       title="Goal Setter"
//                       icon={<Target className="h-5 w-5 text-primary" />}
//                       isUnlocked={achievements.goals}
//                       onUnlock={() => unlockAchievement("goals")}
//                     />
//                     <AchievementBadge
//                       title="First Post"
//                       icon={<Image className="h-5 w-5 text-primary" />}
//                       isUnlocked={false}
//                     />
//                   </div>

//                   <div className="rounded-lg border bg-card p-4">
//                     <h3 className="font-medium">Referral Program</h3>
//                     <p className="mt-1 text-sm text-muted-foreground">Invite other influencers and earn rewards</p>

//                     <div className="mt-3 flex items-center gap-2">
//                       <Input value="https://instagrowth.com/ref/yourname" readOnly className="flex-1 bg-muted" />
//                       <Button variant="outline" size="sm" className="shrink-0">
//                         <Copy className="mr-1 h-3 w-3" />
//                         Copy
//                       </Button>
//                     </div>
//                   </div>

//                   <Button onClick={nextStep} className="w-full" disabled={isSubmitting}>
//                     Complete Setup
//                   </Button>
//                 </motion.div>
//               )}

//               {/* Final Step: Completion */}
//               {((userType === "regular" && step === 9) || (userType === "influencer" && step === 10)) && (
//                 <motion.div
//                   key="stepFinal"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <div className="flex flex-col items-center justify-center py-6 text-center">
//                     {isSubmitting ? (
//                       <div className="flex flex-col items-center justify-center space-y-4">
//                         <Loader2 className="h-12 w-12 animate-spin text-primary" />
//                         <h2 className="text-xl font-semibold">Setting up your account...</h2>
//                         <p className="text-muted-foreground">This will only take a moment</p>
//                       </div>
//                     ) : (
//                       <>
//                         <motion.div
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           transition={{
//                             type: "spring",
//                             stiffness: 260,
//                             damping: 20,
//                             delay: 0.1,
//                           }}
//                           className="mb-6 rounded-full bg-green-500/10 p-4"
//                         >
//                           <Check className="h-12 w-12 text-green-500" />
//                         </motion.div>
//                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
//                           <h2 className="text-2xl font-bold">You&apos;re all set!</h2>
//                           <p className="mt-2 text-muted-foreground">
//                             {userType === "influencer"
//                               ? "Your influencer dashboard is ready."
//                               : "Your dashboard is ready."}
//                           </p>

//                           <div className="mt-6 space-y-4">
//                             <div className="rounded-lg border bg-card p-4">
//                               <h3 className="font-medium">Account Summary</h3>
//                               <div className="mt-2 space-y-2 text-sm">
//                                 <div className="flex justify-between">
//                                   <span className="text-muted-foreground">Account Type:</span>
//                                   <span className="font-medium">
//                                     {userType === "influencer" ? "Influencer" : "Regular User"}
//                                   </span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                   <span className="text-muted-foreground">Categories:</span>
//                                   <span className="font-medium">{selectedCategories.length} selected</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                   <span className="text-muted-foreground">Monthly Goal:</span>
//                                   <span className="font-medium">${incomeGoal.toLocaleString()}</span>
//                                 </div>
//                                 {userType === "influencer" && (
//                                   <div className="flex justify-between">
//                                     <span className="text-muted-foreground">Content Style:</span>
//                                     <span className="font-medium">{selectedContentStyle}</span>
//                                   </div>
//                                 )}
//                                 {userType === "regular" && personalityResult && (
//                                   <div className="flex justify-between">
//                                     <span className="text-muted-foreground">Creator Type:</span>
//                                     <span className="font-medium">{personalityResult}</span>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>

//                             <Button
//                               onClick={() => {
//                                 if (userType === "influencer") {
//                                   router.push("/influencer-dashboard")
//                                 } else {
//                                   router.push("/dashboard")
//                                 }
//                               }}
//                               className="w-full"
//                             >
//                               Go to Dashboard
//                               <ChevronRight className="ml-2 h-4 w-4" />
//                             </Button>
//                           </div>
//                         </motion.div>
//                       </>
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {step > 0 && step < (userType === "influencer" ? 10 : 9) && (
//             <div className="flex items-center justify-between border-t p-4">
//               <Button variant="ghost" size="sm" onClick={prevStep} disabled={isSubmitting}>
//                 Back
//               </Button>
//               {step !== 5 && (
//                 <Button size="sm" onClick={nextStep} disabled={isSubmitting}>
//                   Skip
//                 </Button>
//               )}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// // Missing components that were used in the code
// function Play(props: any) {
//   return <Video {...props} />
// }

// function User(props: any) {
//   return <Users {...props} />
// }

// function Layers(props: any) {
//   return <Palette {...props} />
// }

// function BadgeCheck(props: any) {
//   return <Check {...props} />
// }

// function Target(props: any) {
//   return <Flag {...props} />
// }

// function Copy(props: any) {
//   return <Paperclip {...props} />
// }

// function X(props: any) {
//   return <AlertCircle {...props} />
// }

// "use client"

// import type React from "react"

// import { useState, useRef, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { useRouter } from "next/navigation"
// import {
//   AlertCircle,
//   AtSign,
//   BookOpen,
//   Camera,
//   Check,
//   ChevronRight,
//   DollarSign,
//   Flag,
//   ImageIcon,
//   Instagram,
//   Loader2,
//   Lock,
//   Mail,
//   MessageCircle,
//   Mic,
//   Palette,
//   Paperclip,
//   Phone,
//   Plus,
//   Save,
//   Share2,
//   Smartphone,
//   Sparkles,
//   Star,
//   TrendingUp,
//   Users,
//   Video,
//   Wand2,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Slider } from "@/components/ui/slider"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Checkbox } from "@/components/ui/checkbox"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Textarea } from "@/components/ui/textarea"
// import { toast } from "@/hooks/use-toast"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { cn } from "@/lib/utils"
// import confetti from "canvas-confetti"
// import { onBoarding, onBoardUser } from "@/actions/user"

// // Import the SMS verification server actions
// import { sendVerificationSMS, verifyCode } from "@/actions/sms-service"

// // Mock verification service
// const mockVerifyPhone = async (phone: string) => {
//   // Simulate API call
//   return new Promise<string>((resolve) => {
//     setTimeout(() => {
//       // Generate a random 6-digit code
//       const code = Math.floor(100000 + Math.random() * 900000).toString()
//       resolve(code)
//     }, 1500)
//   })
// }

// // Mock verification check
// const mockCheckVerificationCode = async (code: string, expectedCode: string) => {
//   // Simulate API call
//   return new Promise<boolean>((resolve) => {
//     setTimeout(() => {
//       resolve(code === expectedCode)
//     }, 1000)
//   })
// }

// // Mock AI analysis
// const mockAiAnalysis = async (handle: string) => {
//   return new Promise<{
//     followers: number
//     engagement: number
//     growthRate: number
//     topContent: string[]
//     audienceDemo: { age: string; gender: string; location: string }
//   }>((resolve) => {
//     setTimeout(() => {
//       resolve({
//         followers: Math.floor(1000 + Math.random() * 100000),
//         engagement: Math.random() * 8 + 1,
//         growthRate: Math.random() * 10,
//         topContent: ["Fashion", "Lifestyle", "Travel"],
//         audienceDemo: {
//           age: "18-34",
//           gender: "65% Female, 35% Male",
//           location: "US, UK, Canada",
//         },
//       })
//     }, 2000)
//   })
// }

// type SocialPlatform = {
//   name: string
//   icon: React.ReactNode
//   placeholder: string
//   color: string
// }

// const socialPlatforms: SocialPlatform[] = [
//   {
//     name: "Instagram",
//     icon: <Instagram className="h-4 w-4" />,
//     placeholder: "@yourusername",
//     color: "bg-gradient-to-r from-purple-500 to-pink-500",
//   },
//   {
//     name: "TikTok",
//     icon: <Video className="h-4 w-4" />,
//     placeholder: "@yourusername",
//     color: "bg-black",
//   },
//   {
//     name: "YouTube",
//     icon: <Play className="h-4 w-4" />,
//     placeholder: "@yourchannel",
//     color: "bg-red-600",
//   },
//   {
//     name: "Twitter",
//     icon: <MessageCircle className="h-4 w-4" />,
//     placeholder: "@yourusername",
//     color: "bg-blue-500",
//   },
// ]

// const contentCategories = [
//   { name: "Fashion", icon: "👗", color: "bg-pink-100 dark:bg-pink-900" },
//   { name: "Beauty", icon: "💄", color: "bg-purple-100 dark:bg-purple-900" },
//   { name: "Fitness", icon: "💪", color: "bg-green-100 dark:bg-green-900" },
//   { name: "Travel", icon: "✈️", color: "bg-blue-100 dark:bg-blue-900" },
//   { name: "Food", icon: "🍕", color: "bg-yellow-100 dark:bg-yellow-900" },
//   { name: "Lifestyle", icon: "🌿", color: "bg-teal-100 dark:bg-teal-900" },
//   { name: "Tech", icon: "📱", color: "bg-gray-100 dark:bg-gray-800" },
//   { name: "Gaming", icon: "🎮", color: "bg-indigo-100 dark:bg-indigo-900" },
//   { name: "Business", icon: "💼", color: "bg-amber-100 dark:bg-amber-900" },
//   { name: "Education", icon: "📚", color: "bg-red-100 dark:bg-red-900" },
//   { name: "Art", icon: "🎨", color: "bg-fuchsia-100 dark:bg-fuchsia-900" },
//   { name: "Music", icon: "🎵", color: "bg-cyan-100 dark:bg-cyan-900" },
// ]

// const incomeRanges = [
//   { min: 0, max: 1000, label: "Up to $1,000/month", level: "Starter" },
//   { min: 1000, max: 5000, label: "$1,000 - $5,000/month", level: "Growing" },
//   { min: 5000, max: 10000, label: "$5,000 - $10,000/month", level: "Established" },
//   { min: 10000, max: 20000, label: "$10,000 - $20,000/month", level: "Professional" },
//   { min: 20000, max: 50000, label: "$20,000 - $50,000/month", level: "Elite" },
//   { min: 50000, max: 100000, label: "$50,000+/month", level: "Celebrity" },
// ]

// const contentFrequencies = ["Daily", "3-5 times per week", "1-2 times per week", "Few times a month"]

// const brandCollabTypes = [
//   "Sponsored Posts",
//   "Brand Ambassador",
//   "Affiliate Marketing",
//   "Product Reviews",
//   "Event Appearances",
//   "Content Creation",
// ]

// const learningTopics = [
//   "Content Creation",
//   "Audience Growth",
//   "Engagement Strategies",
//   "Monetization",
//   "Photography/Videography",
//   "Personal Branding",
// ]

// const growthChallenges = [
//   "Finding My Niche",
//   "Creating Consistent Content",
//   "Growing My Audience",
//   "Engagement Rate",
//   "Monetization",
//   "Work-Life Balance",
// ]

// const contentStyles = [
//   { name: "Minimalist", icon: "✨", description: "Clean, simple aesthetics" },
//   { name: "Vibrant", icon: "🌈", description: "Bold colors and energy" },
//   { name: "Vintage", icon: "📷", description: "Retro and nostalgic vibes" },
//   { name: "Luxury", icon: "💎", description: "High-end and sophisticated" },
//   { name: "Playful", icon: "🎨", description: "Fun and creative expression" },
//   { name: "Nature", icon: "🌿", description: "Organic and earthy elements" },
// ]

// const personalityTypes = [
//   {
//     type: "Creator",
//     description: "You thrive on making original content and expressing yourself",
//     icon: <Palette className="h-5 w-5" />,
//     strengths: ["Original content", "Creative expression", "Unique perspective"],
//     strategies: ["Focus on quality over quantity", "Develop a signature style", "Collaborate with other creators"],
//   },
//   {
//     type: "Connector",
//     description: "You excel at building relationships and engaging with your audience",
//     icon: <Users className="h-5 w-5" />,
//     strengths: ["Community building", "Engagement", "Authenticity"],
//     strategies: ["Prioritize comments and messages", "Host live sessions", "Create interactive content"],
//   },
//   {
//     type: "Educator",
//     description: "You love sharing knowledge and teaching others",
//     icon: <BookOpen className="h-5 w-5" />,
//     strengths: ["Informative content", "Clear communication", "Expertise"],
//     strategies: ["Create how-to content", "Share insights and tips", "Develop series content"],
//   },
//   {
//     type: "Trendsetter",
//     description: "You stay ahead of the curve and influence what's next",
//     icon: <TrendingUp className="h-5 w-5" />,
//     strengths: ["Early adoption", "Trend awareness", "Cultural relevance"],
//     strategies: ["Monitor emerging trends", "Put your unique spin on trends", "Be first to market"],
//   },
// ]

// // Custom hook for saving progress
// const useSaveProgress = (data: any) => {
//   const [isSaving, setIsSaving] = useState(false)
//   const [lastSaved, setLastSaved] = useState<Date | null>(null)

//   const saveProgress = () => {
//     setIsSaving(true)
//     // Simulate saving to server
//     setTimeout(() => {
//       setIsSaving(false)
//       setLastSaved(new Date())
//       // In a real app, you would save to localStorage or a database
//       localStorage.setItem("onboardingProgress", JSON.stringify(data))
//     }, 1000)
//   }

//   return { saveProgress, isSaving, lastSaved }
// }

// // Custom component for 3D flip card
// const FlipCard = ({
//   front,
//   back,
//   isFlipped,
//   onClick,
// }: {
//   front: React.ReactNode
//   back: React.ReactNode
//   isFlipped: boolean
//   onClick: () => void
// }) => {
//   return (
//     <div className="relative h-[200px] w-full cursor-pointer perspective-1000" onClick={onClick}>
//       <div
//         className={cn(
//           "relative h-full w-full duration-500 preserve-3d transition-all",
//           isFlipped ? "rotate-y-180" : "",
//         )}
//       >
//         <div className="absolute inset-0 backface-hidden">{front}</div>
//         <div className="absolute inset-0 rotate-y-180 backface-hidden">{back}</div>
//       </div>
//     </div>
//   )
// }

// // Custom component for animated mascot
// const Mascot = ({ emotion = "happy" }: { emotion?: "happy" | "thinking" | "excited" | "confused" }) => {
//   const animations = {
//     happy: {
//       y: [0, -10, 0],
//       transition: { repeat: Number.POSITIVE_INFINITY, duration: 2 },
//     },
//     thinking: {
//       rotate: [0, 10, 0, -10, 0],
//       transition: { repeat: Number.POSITIVE_INFINITY, duration: 3 },
//     },
//     excited: {
//       scale: [1, 1.1, 1],
//       transition: { repeat: Number.POSITIVE_INFINITY, duration: 0.5 },
//     },
//     confused: {
//       rotate: [0, 5, 0, -5, 0],
//       transition: { repeat: Number.POSITIVE_INFINITY, duration: 1.5 },
//     },
//   }

//   return (
//     <motion.div className="relative h-16 w-16 rounded-full bg-primary/20 p-2" animate={animations[emotion]}>
//       <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/30">
//         {emotion === "happy" && <span className="text-2xl">😊</span>}
//         {emotion === "thinking" && <span className="text-2xl">🤔</span>}
//         {emotion === "excited" && <span className="text-2xl">🤩</span>}
//         {emotion === "confused" && <span className="text-2xl">😕</span>}
//       </div>
//     </motion.div>
//   )
// }

// // Custom component for interactive calendar
// const ContentCalendar = ({
//   selectedDays,
//   onSelectDay,
// }: {
//   selectedDays: number[]
//   onSelectDay: (day: number) => void
// }) => {
//   const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

//   return (
//     <div className="grid grid-cols-7 gap-1">
//       {days.map((day, index) => (
//         <div key={day} className="flex flex-col items-center">
//           <div className="text-xs font-medium text-muted-foreground">{day}</div>
//           <Button
//             variant={selectedDays.includes(index) ? "default" : "outline"}
//             size="sm"
//             className="mt-1 h-8 w-8 p-0"
//             onClick={() => onSelectDay(index)}
//           >
//             {selectedDays.includes(index) && <Check className="h-3 w-3" />}
//           </Button>
//         </div>
//       ))}
//     </div>
//   )
// }

// // Custom component for voice input simulation
// const VoiceInput = ({
//   onComplete,
// }: {
//   onComplete: (text: string) => void
// }) => {
//   const [isRecording, setIsRecording] = useState(false)
//   const [progress, setProgress] = useState(0)

//   const startRecording = () => {
//     setIsRecording(true)
//     setProgress(0)

//     // Simulate recording progress
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval)
//           setIsRecording(false)
//           onComplete("I want to grow my Instagram account and connect with more people who share my interests.")
//           return 100
//         }
//         return prev + 5
//       })
//     }, 150)
//   }

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       <Button
//         variant={isRecording ? "destructive" : "outline"}
//         size="lg"
//         className={cn("h-16 w-16 rounded-full", isRecording && "animate-pulse")}
//         onClick={startRecording}
//         disabled={isRecording}
//       >
//         <Mic className="h-6 w-6" />
//       </Button>

//       {isRecording && (
//         <div className="w-full space-y-2">
//           <div className="flex items-center justify-between">
//             <span className="text-xs text-muted-foreground">Recording...</span>
//             <span className="text-xs text-muted-foreground">{progress}%</span>
//           </div>
//           <Progress value={progress} className="h-1" />
//         </div>
//       )}

//       <p className="text-center text-sm text-muted-foreground">
//         {isRecording ? "Listening... speak clearly" : "Tap to record your goals"}
//       </p>
//     </div>
//   )
// }

// // Custom component for AI profile analysis
// const AiProfileAnalysis = ({
//   handle,
//   onComplete,
// }: {
//   handle: string
//   onComplete: (data: any) => void
// }) => {
//   const [isAnalyzing, setIsAnalyzing] = useState(false)
//   const [progress, setProgress] = useState(0)
//   const [result, setResult] = useState<any>(null)

//   const startAnalysis = async () => {
//     setIsAnalyzing(true)
//     setProgress(0)

//     // Simulate analysis progress
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 95) {
//           clearInterval(interval)
//           return 95
//         }
//         return prev + Math.random() * 10
//       })
//     }, 300)

//     try {
//       const data = await mockAiAnalysis(handle)
//       clearInterval(interval)
//       setProgress(100)
//       setResult(data)
//       onComplete(data)
//       setTimeout(() => {
//         setIsAnalyzing(false)
//       }, 500)
//     } catch (error) {
//       clearInterval(interval)
//       setIsAnalyzing(false)
//       toast({
//         title: "Analysis Failed",
//         description: "Could not analyze profile",
//         variant: "destructive",
//       })
//     }
//   }

//   useEffect(() => {
//     if (handle && !result) {
//       startAnalysis()
//     }
//   }, [handle])

//   if (!isAnalyzing && result) {
//     return (
//       <div className="space-y-4 rounded-lg border bg-card p-4">
//         <div className="flex items-center justify-between">
//           <h3 className="font-semibold">AI Analysis Results</h3>
//           <Badge variant="outline" className="bg-primary/10">
//             <Sparkles className="mr-1 h-3 w-3" /> AI Generated
//           </Badge>
//         </div>

//         <div className="grid gap-3">
//           <div className="flex items-center justify-between rounded-md bg-muted p-2">
//             <span className="text-sm">Followers</span>
//             <span className="font-medium">{result.followers.toLocaleString()}</span>
//           </div>
//           <div className="flex items-center justify-between rounded-md bg-muted p-2">
//             <span className="text-sm">Engagement Rate</span>
//             <span className="font-medium">{result.engagement.toFixed(1)}%</span>
//           </div>
//           <div className="flex items-center justify-between rounded-md bg-muted p-2">
//             <span className="text-sm">Growth Rate</span>
//             <span className="font-medium">+{result.growthRate.toFixed(1)}%/month</span>
//           </div>
//           <div className="flex items-center justify-between rounded-md bg-muted p-2">
//             <span className="text-sm">Top Performing Content</span>
//             <div className="flex gap-1">
//               {result.topContent.map((category: string) => (
//                 <Badge key={category} variant="outline" className="text-xs">
//                   {category}
//                 </Badge>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h3 className="font-semibold">Analyzing @{handle}</h3>
//         <Badge variant="outline" className="animate-pulse bg-primary/10">
//           <Wand2 className="mr-1 h-3 w-3" /> AI Working
//         </Badge>
//       </div>

//       <div className="space-y-2">
//         <div className="flex items-center justify-between">
//           <span className="text-xs text-muted-foreground">Analyzing profile data...</span>
//           <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
//         </div>
//         <Progress value={progress} className="h-1" />
//       </div>

//       <div className="space-y-2">
//         {progress > 30 && (
//           <div className="flex items-center gap-2 text-xs text-muted-foreground">
//             <Check className="h-3 w-3 text-green-500" />
//             Fetching profile statistics
//           </div>
//         )}
//         {progress > 50 && (
//           <div className="flex items-center gap-2 text-xs text-muted-foreground">
//             <Check className="h-3 w-3 text-green-500" />
//             Analyzing content performance
//           </div>
//         )}
//         {progress > 70 && (
//           <div className="flex items-center gap-2 text-xs text-muted-foreground">
//             <Check className="h-3 w-3 text-green-500" />
//             Evaluating audience demographics
//           </div>
//         )}
//         {progress > 90 && (
//           <div className="flex items-center gap-2 text-xs text-muted-foreground">
//             <Loader2 className="h-3 w-3 animate-spin" />
//             Generating recommendations
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// // Custom component for income projection visualization
// const IncomeProjection = ({
//   currentIncome = 0,
//   targetIncome = 5000,
//   months = 12,
// }: {
//   currentIncome?: number
//   targetIncome?: number
//   months?: number
// }) => {
//   // Generate projection data
//   const generateProjectionData = () => {
//     const data = []
//     const monthlyGrowth = (targetIncome - currentIncome) / months

//     for (let i = 0; i <= months; i++) {
//       data.push({
//         month: i,
//         value: Math.max(0, currentIncome + monthlyGrowth * i),
//       })
//     }

//     return data
//   }

//   const projectionData = generateProjectionData()
//   const maxValue = Math.max(...projectionData.map((d) => d.value))

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h3 className="font-semibold">Income Projection</h3>
//         <Badge variant="outline">{months} months</Badge>
//       </div>

//       <div className="h-[150px] w-full">
//         <div className="flex h-full items-end gap-1">
//           {projectionData.map((data, index) => (
//             <div key={index} className="group relative flex flex-1 flex-col items-center">
//               <div className="absolute -top-8 z-10 hidden rounded-md bg-black/80 px-2 py-1 text-xs text-white group-hover:block">
//                 ${Math.round(data.value).toLocaleString()}
//               </div>
//               <div
//                 className={cn(
//                   "w-full rounded-t-sm",
//                   index === 0 ? "bg-muted" : index === months ? "bg-green-500" : "bg-primary",
//                 )}
//                 style={{
//                   height: `${(data.value / maxValue) * 100}%`,
//                   opacity: 0.3 + (data.value / maxValue) * 0.7,
//                 }}
//               />
//               {index % 3 === 0 && <div className="mt-1 text-[10px] text-muted-foreground">{index}m</div>}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex items-center justify-between text-sm">
//         <div>
//           <div className="font-medium">${currentIncome.toLocaleString()}</div>
//           <div className="text-xs text-muted-foreground">Current</div>
//         </div>
//         <div className="text-right">
//           <div className="font-medium">${targetIncome.toLocaleString()}</div>
//           <div className="text-xs text-muted-foreground">Target</div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Custom component for achievement badges
// const AchievementBadge = ({
//   title,
//   icon,
//   isUnlocked = false,
//   onUnlock,
// }: {
//   title: string
//   icon: React.ReactNode
//   isUnlocked?: boolean
//   onUnlock?: () => void
// }) => {
//   return (
//     <div
//       className={cn(
//         "group relative flex flex-col items-center rounded-lg border p-3 transition-all",
//         isUnlocked
//           ? "border-primary bg-primary/5"
//           : "border-dashed border-muted-foreground/30 bg-muted/50 opacity-70 hover:opacity-100",
//       )}
//       onClick={() => !isUnlocked && onUnlock?.()}
//     >
//       <div
//         className={cn(
//           "flex h-12 w-12 items-center justify-center rounded-full",
//           isUnlocked ? "bg-primary/20" : "bg-muted",
//         )}
//       >
//         {icon}
//       </div>
//       <div className="mt-2 text-center">
//         <div className="text-xs font-medium">{title}</div>
//         <div className="text-[10px] text-muted-foreground">{isUnlocked ? "Unlocked" : "Locked"}</div>
//       </div>

//       {!isUnlocked && (
//         <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/5 opacity-0 transition-opacity group-hover:opacity-100">
//           <Button variant="secondary" size="sm" className="text-xs">
//             Unlock
//           </Button>
//         </div>
//       )}
//     </div>
//   )
// }

// // Main component
// export default function OnboardingPage() {
//   const router = useRouter()
//   const [step, setStep] = useState(0)
//   const [userType, setUserType] = useState<"regular" | "influencer" | null>(null)
//   const [progress, setProgress] = useState(0)
//   const [profileImage, setProfileImage] = useState<string | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([])
//   const [socialHandles, setSocialHandles] = useState<Record<string, string>>({})
//   const [phoneNumber, setPhoneNumber] = useState("")
//   const [isVerifying, setIsVerifying] = useState(false)
//   const [verificationCode, setVerificationCode] = useState("")
//   const [expectedCode, setExpectedCode] = useState("")
//   const [isVerified, setIsVerified] = useState(false)
//   const [verificationStep, setVerificationStep] = useState<"input" | "verify">("input")
//   const [email, setEmail] = useState("")
//   const [incomeGoal, setIncomeGoal] = useState(5000)
//   const [selectedIncomeRange, setSelectedIncomeRange] = useState(1)
//   const [acceptedTerms, setAcceptedTerms] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [flippedCards, setFlippedCards] = useState<number[]>([])
//   const [selectedContentFrequency, setSelectedContentFrequency] = useState<string>("")
//   const [selectedBrandCollabs, setSelectedBrandCollabs] = useState<string[]>([])
//   const [selectedContentDays, setSelectedContentDays] = useState<number[]>([])
//   const [selectedLearningTopics, setSelectedLearningTopics] = useState<string[]>([])
//   const [selectedGrowthChallenges, setSelectedGrowthChallenges] = useState<string[]>([])
//   const [selectedContentStyle, setSelectedContentStyle] = useState<string>("")
//   const [personalityResult, setPersonalityResult] = useState<string>("")
//   const [personalityAnswers, setPersonalityAnswers] = useState<Record<string, string>>({})
//   const [goalStatement, setGoalStatement] = useState<string>("")
//   const [aiAnalysisResult, setAiAnalysisResult] = useState<any>(null)
//   const [achievements, setAchievements] = useState<Record<string, boolean>>({
//     profile: false,
//     categories: false,
//     social: false,
//     verification: false,
//     goals: false,
//   })
//   const [showMascot, setShowMascot] = useState(true)
//   const [mascotEmotion, setMascotEmotion] = useState<"happy" | "thinking" | "excited" | "confused">("happy")
//   const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)

//   // Determine total steps based on user type
//   const totalSteps = userType === "influencer" ? 10 : 8

//   // Save progress hook
//   const { saveProgress, isSaving, lastSaved } = useSaveProgress({
//     step,
//     userType,
//     profileImage,
//     profileImageUrl, // Add this line
//     selectedCategories,
//     socialHandles,
//     phoneNumber,
//     email,
//     incomeGoal,
//   })

//   // Update progress when step changes
//   useEffect(() => {
//     setProgress(((step + 1) / totalSteps) * 100)

//     // Update mascot emotion based on step
//     if (step === totalSteps - 1) {
//       setMascotEmotion("excited")
//     } else if (step > totalSteps / 2) {
//       setMascotEmotion("happy")
//     } else if (step === 0) {
//       setMascotEmotion("thinking")
//     } else {
//       setMascotEmotion("confused")
//     }
//   }, [step, totalSteps])

//   // Trigger confetti effect
//   const triggerConfetti = () => {
//     confetti({
//       particleCount: 100,
//       spread: 70,
//       origin: { y: 0.6 },
//     })
//   }

//   // Handle unlocking achievements
//   const unlockAchievement = (achievement: string) => {
//     if (!achievements[achievement]) {
//       setAchievements((prev) => ({
//         ...prev,
//         [achievement]: true,
//       }))

//       toast({
//         title: "Achievement Unlocked!",
//         description: `You've unlocked the ${achievement} achievement!`,
//         variant: "default",
//       })

//       // Small confetti burst
//       confetti({
//         particleCount: 30,
//         spread: 50,
//         origin: { y: 0.7 },
//       })
//     }
//   }

//   // Navigation functions
//   const nextStep = async () => {
//     // Create a FormData object with all the onboarding data
//     const formData = new FormData()
//     formData.append("step", step.toString())
//     formData.append("userType", userType || "")

//     // Use the Blob URL for the profile image if available
//     if (profileImageUrl) {
//       formData.append("profileImageUrl", profileImageUrl)
//     } else if (profileImage) {
//       formData.append("profileImage", profileImage)
//     }

//     // Add other form data...
//     if (selectedCategories.length > 0) {
//       formData.append("selectedCategories", JSON.stringify(selectedCategories))
//     }

//     // Call the server action with the form data
//     const user = await onBoarding(formData)
//     // const nextStep = () => {
//     if (step < totalSteps - 1) {
//       setStep(step + 1)

//       // Unlock achievements based on progress
//       if (step === 1 && profileImage) unlockAchievement("profile")
//       if (step === 2 && selectedCategories.length > 0) unlockAchievement("categories")
//       if (step === 3 && Object.keys(socialHandles).length > 0) unlockAchievement("social")
//       if (step === 5 && isVerified) unlockAchievement("verification")
//       if (step === totalSteps - 2) unlockAchievement("goals")
//     } else {
//       // Final submission
//       setIsSubmitting(true)

//       setTimeout(() => {
//         setIsSubmitting(false)
//         triggerConfetti()
//         // Redirect based on user type
//         setTimeout(() => {
//           if (userType === "influencer") {
//             router.push("/influencers")
//             // router.push(`dashboard/${user.data?.firstname}-${user.data?.lastname}`)
//           } else {
//             router.push("/dashboard")
//             // router.push(`influencers/${user.data?.firstname}-${user.data?.lastname}`)
//           }
//         }, 2000)
//       }, 1500)
//     }
//   }

//   const prevStep = () => {
//     if (step > 0) {
//       setStep(step - 1)
//     }
//   }

//   const setUserAndAdvance = (type: "regular" | "influencer") => {
//     setUserType(type)
//     nextStep()
//   }

//   // File handling functions
//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       // Show preview immediately using FileReader
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         setProfileImage(e.target?.result as string)
//       }
//       reader.readAsDataURL(file)

//       // Upload to Vercel Blob
//       try {
//         // Create a FormData object
//         const formData = new FormData()
//         formData.append("file", file)

//         // Upload the file
//         const response = await fetch("/api/uploadprofile", {
//           method: "POST",
//           body: formData,
//         })

//         const result = await response.json()

//         if (result.success) {
//           // Store the URL for database saving
//           // We keep the base64 preview in profileImage for UI display
//           // but store the actual URL in a separate state variable
//           setProfileImageUrl(result.url)

//           toast({
//             title: "Image Uploaded",
//             description: "Your profile image has been uploaded successfully.",
//           })
//         } else {
//           toast({
//             title: "Upload Failed",
//             description: result.error || "Failed to upload image",
//             variant: "destructive",
//           })
//         }
//       } catch (error) {
//         console.error("Error uploading image:", error)
//         toast({
//           title: "Upload Failed",
//           description: "An error occurred while uploading your image",
//           variant: "destructive",
//         })
//       }
//     }
//   }

//   // Category selection
//   const handleCategoryToggle = (category: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
//     )
//   }

//   // Social handle management
//   const handleSocialHandleChange = (platform: string, value: string) => {
//     setSocialHandles((prev) => ({
//       ...prev,
//       [platform]: value,
//     }))
//   }

//   // Phone verification
//   // Update the handleVerifyPhone function to use the server action
//   const handleVerifyPhone = async () => {
//     if (!phoneNumber || phoneNumber.length < 10) {
//       toast({
//         title: "Invalid Phone Number",
//         description: "Please enter a valid phone number",
//         variant: "destructive",
//       })
//       return
//     }

//     setIsVerifying(true)
//     try {
//       // Call the server action to send the verification code
//       const result = await sendVerificationSMS(phoneNumber)

//       if (result.status === 200) {
//         setExpectedCode(result.data?.code||"12345")
//         setVerificationStep("verify")
//         toast({
//           title: "Verification Code Sent",
//           description: `We've sent a code to ${phoneNumber}. For demo purposes, the code is: ${result.data?.code}`,
//         })
//       } else {
//         toast({
//           title: "Verification Failed",
//           description: result.error || "Could not send verification code",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       toast({
//         title: "Verification Failed",
//         description: "Could not send verification code",
//         variant: "destructive",
//       })
//     } finally {
//       setIsVerifying(false)
//     }
//   }

//   // Update the handleCheckVerificationCode function to use the server action
//   const handleCheckVerificationCode = async () => {
//     if (!verificationCode) {
//       toast({
//         title: "Missing Code",
//         description: "Please enter the verification code",
//         variant: "destructive",
//       })
//       return
//     }
  
//     setIsVerifying(true)
//     try {
//       // Call the server action to verify the code
//       const result = await verifyCode(phoneNumber, verificationCode)
      
//       if (result.status === 200) {
//         setIsVerified(true)
//         toast({
//           title: "Phone Verified",
//           description: "Your phone number has been verified successfully!",
//         })
//         nextStep()
//       } else {
//         toast({
//           title: "Invalid Code",
//           description: result.error || "The code you entered is incorrect",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       toast({
//         title: "Verification Failed",
//         description: "Could not verify code",
//         variant: "destructive",
//       })
//     } finally {
//       setIsVerifying(false)
//     }
//   }
//   // Income goal management
//   const handleIncomeRangeSelect = (index: number) => {
//     setSelectedIncomeRange(index)
//     setIncomeGoal(incomeRanges[index].min + (incomeRanges[index].max - incomeRanges[index].min) / 2)
//   }

//   const handleIncomeSliderChange = (value: number[]) => {
//     setIncomeGoal(value[0])
//   }

//   const getCurrentIncomeRange = () => {
//     return incomeRanges.find((range) => incomeGoal >= range.min && incomeGoal <= range.max) || incomeRanges[0]
//   }

//   // Card flipping
//   const toggleCardFlip = (index: number) => {
//     setFlippedCards((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
//   }

//   // Content days selection
//   const toggleContentDay = (day: number) => {
//     setSelectedContentDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
//   }

//   // Learning topics selection
//   const toggleLearningTopic = (topic: string) => {
//     setSelectedLearningTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]))
//   }

//   // Growth challenges selection
//   const toggleGrowthChallenge = (challenge: string) => {
//     setSelectedGrowthChallenges((prev) =>
//       prev.includes(challenge) ? prev.filter((c) => c !== challenge) : [...prev, challenge],
//     )
//   }

//   // Brand collab selection
//   const toggleBrandCollab = (collab: string) => {
//     setSelectedBrandCollabs((prev) => (prev.includes(collab) ? prev.filter((c) => c !== collab) : [...prev, collab]))
//   }

//   // Personality quiz
//   const handlePersonalityAnswer = (question: string, answer: string) => {
//     setPersonalityAnswers((prev) => ({
//       ...prev,
//       [question]: answer,
//     }))

//     // Simple algorithm to determine personality type
//     setTimeout(() => {
//       const answers = { ...personalityAnswers, [question]: answer }
//       const counts: Record<string, number> = {
//         Creator: 0,
//         Connector: 0,
//         Educator: 0,
//         Trendsetter: 0,
//       }

//       Object.values(answers).forEach((a) => {
//         if (a.includes("creative") || a.includes("original")) counts.Creator++
//         if (a.includes("people") || a.includes("community")) counts.Connector++
//         if (a.includes("teach") || a.includes("inform")) counts.Educator++
//         if (a.includes("trend") || a.includes("new")) counts.Trendsetter++
//       })

//       // Find the highest score
//       let maxType = "Creator"
//       let maxCount = 0

//       Object.entries(counts).forEach(([type, count]) => {
//         if (count > maxCount) {
//           maxType = type
//           maxCount = count
//         }
//       })

//       setPersonalityResult(maxType)
//     }, 300)
//   }

//   // Helper functions
//   const getProgressColor = () => {
//     if (progress < 30) return "bg-red-500"
//     if (progress < 70) return "bg-yellow-500"
//     return "bg-green-500"
//   }

//   // Render the questionnaire
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
//       <Card className="w-full max-w-md overflow-hidden border-none bg-card shadow-lg">
//         <CardContent className="p-0">
//           <div className="bg-primary/10 p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-primary">Welcome to InstaGrowth</h1>
//                 <p className="text-muted-foreground">Let&apos;s set up your experience</p>
//               </div>

//               {showMascot && (
//                 <div className="relative">
//                   <Mascot emotion={mascotEmotion} />
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-background p-0"
//                     onClick={() => setShowMascot(false)}
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 </div>
//               )}
//             </div>

//             <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-primary/10">
//               <motion.div
//                 className={cn("h-full rounded-full", getProgressColor())}
//                 initial={{ width: 0 }}
//                 animate={{ width: `${progress}%` }}
//                 transition={{ duration: 0.5 }}
//               />
//             </div>

//             <div className="mt-1 flex justify-between text-xs text-muted-foreground">
//               <span>
//                 Step {step + 1} of {totalSteps}
//               </span>
//               <span>{Math.round(progress)}% Complete</span>
//             </div>

//             {/* Save progress button */}
//             <div className="mt-2 flex items-center justify-end gap-2">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="h-7 gap-1 text-xs"
//                 onClick={saveProgress}
//                 disabled={isSaving}
//               >
//                 {isSaving ? (
//                   <>
//                     <Loader2 className="h-3 w-3 animate-spin" />
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="h-3 w-3" />
//                     Save Progress
//                   </>
//                 )}
//               </Button>

//               {lastSaved && (
//                 <span className="text-xs text-muted-foreground">Last saved: {lastSaved.toLocaleTimeString()}</span>
//               )}
//             </div>
//           </div>

//           <div className="min-h-[500px] p-6">
//             <AnimatePresence mode="wait">
//               {/* Step 1: User Type Selection */}
//               {step === 0 && (
//                 <motion.div
//                   key="step0"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Tell us about yourself</h2>
//                   <p className="text-muted-foreground">Which option best describes you?</p>

//                   <div className="grid gap-4">
//                     <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                       <Button
//                         variant="outline"
//                         className="flex h-auto w-full items-start justify-start gap-4 p-4 text-left"
//                         onClick={() => setUserAndAdvance("regular")}
//                       >
//                         <div className="rounded-full bg-primary/10 p-2">
//                           <Users className="h-6 w-6 text-primary" />
//                         </div>
//                         <div className="flex-1">
//                           <div className="font-medium">Regular User</div>
//                           <div className="text-sm text-muted-foreground">I want to grow my personal account</div>
//                         </div>
//                         <ChevronRight className="h-5 w-5 text-muted-foreground" />
//                       </Button>
//                     </motion.div>

//                     <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                       <Button
//                         variant="outline"
//                         className="flex h-auto w-full items-start justify-start gap-4 p-4 text-left"
//                         onClick={() => setUserAndAdvance("influencer")}
//                       >
//                         <div className="rounded-full bg-primary/10 p-2">
//                           <Star className="h-6 w-6 text-primary" />
//                         </div>
//                         <div className="flex-1">
//                           <div className="font-medium">Influencer</div>
//                           <div className="text-sm text-muted-foreground">
//                             I have a significant following and brand partnerships
//                           </div>
//                         </div>
//                         <ChevronRight className="h-5 w-5 text-muted-foreground" />
//                       </Button>
//                     </motion.div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 2: Profile Picture */}
//               {step === 1 && (
//                 <motion.div
//                   key="step1"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Add a profile picture</h2>
//                   <p className="text-muted-foreground">This will be displayed on your profile and dashboard</p>

//                   <div className="flex flex-col items-center justify-center space-y-4">
//                     <div className="relative">
//                       <Avatar className="h-32 w-32 border-2 border-primary/20">
//                         {profileImage ? (
//                           <AvatarImage src={profileImage} alt="Profile" />
//                         ) : (
//                           <AvatarFallback className="bg-primary/10 text-2xl">
//                             {userType === "influencer" ? "INF" : "USR"}
//                           </AvatarFallback>
//                         )}
//                       </Avatar>
//                       <Button
//                         size="icon"
//                         variant="secondary"
//                         className="absolute bottom-0 right-0 rounded-full"
//                         onClick={() => fileInputRef.current?.click()}
//                       >
//                         <Camera className="h-4 w-4" />
//                       </Button>
//                       <input
//                         type="file"
//                         ref={fileInputRef}
//                         className="hidden"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                       />
//                     </div>

//                     <div className="text-center text-sm text-muted-foreground">
//                       {profileImage ? (
//                         <span className="flex items-center gap-1 text-green-500">
//                           <Check className="h-4 w-4" /> Image uploaded
//                         </span>
//                       ) : (
//                         "Click to upload an image"
//                       )}
//                     </div>

//                     <Button onClick={nextStep} className="mt-4 w-full" disabled={isSubmitting}>
//                       {profileImage ? "Continue" : "Skip for now"}
//                     </Button>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 3: Content Categories */}
//               {step === 2 && (
//                 <motion.div
//                   key="step2"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Content Categories</h2>
//                   <p className="text-muted-foreground">Select your primary content categories (up to 5)</p>

//                   <div className="grid grid-cols-3 gap-3">
//                     {contentCategories.map((category) => (
//                       <motion.div key={category.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                         <Button
//                           variant={selectedCategories.includes(category.name) ? "default" : "outline"}
//                           className={cn(
//                             "flex h-auto w-full flex-col items-center justify-center gap-2 p-3 text-center",
//                             selectedCategories.includes(category.name) ? "border-primary" : "",
//                           )}
//                           onClick={() => handleCategoryToggle(category.name)}
//                           disabled={!selectedCategories.includes(category.name) && selectedCategories.length >= 5}
//                         >
//                           <div
//                             className={cn("flex h-10 w-10 items-center justify-center rounded-full", category.color)}
//                           >
//                             <span className="text-xl">{category.icon}</span>
//                           </div>
//                           <span className="text-xs font-medium">{category.name}</span>
//                         </Button>
//                       </motion.div>
//                     ))}
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-muted-foreground">{selectedCategories.length}/5 selected</span>
//                     <Button onClick={nextStep} disabled={selectedCategories.length === 0 || isSubmitting}>
//                       Continue
//                     </Button>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 4: Social Media Handles */}
//               {step === 3 && (
//                 <motion.div
//                   key="step3"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Social Media Profiles</h2>
//                   <p className="text-muted-foreground">Add your social media handles</p>

//                   <div className="space-y-4">
//                     {socialPlatforms.map((platform) => (
//                       <div key={platform.name} className="space-y-2">
//                         <Label className="flex items-center gap-2">
//                           <div className={cn("flex h-5 w-5 items-center justify-center rounded-md", platform.color)}>
//                             {platform.icon}
//                           </div>
//                           {platform.name}
//                         </Label>
//                         <div className="flex items-center gap-2">
//                           <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
//                             <AtSign className="h-4 w-4 text-muted-foreground" />
//                           </div>
//                           <Input
//                             placeholder={platform.placeholder}
//                             value={socialHandles[platform.name] || ""}
//                             onChange={(e) => handleSocialHandleChange(platform.name, e.target.value)}
//                             className="flex-1"
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* AI Analysis for Influencers */}
//                   {userType === "influencer" && socialHandles.Instagram && (
//                     <div className="mt-4">
//                       <AiProfileAnalysis handle={socialHandles.Instagram} onComplete={setAiAnalysisResult} />
//                     </div>
//                   )}

//                   <Button
//                     onClick={nextStep}
//                     className="w-full"
//                     disabled={Object.keys(socialHandles).length === 0 || isSubmitting}
//                   >
//                     {Object.keys(socialHandles).length > 0 ? "Continue" : "Skip for now"}
//                   </Button>
//                 </motion.div>
//               )}

//               {/* Step 5: Email */}
//               {step === 4 && (
//                 <motion.div
//                   key="step4"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Contact Information</h2>
//                   <p className="text-muted-foreground">Add your email address</p>

//                   <div className="space-y-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="email" className="flex items-center gap-2">
//                         <Mail className="h-4 w-4 text-primary" />
//                         Email Address
//                       </Label>
//                       <Input
//                         id="email"
//                         type="email"
//                         placeholder="your@email.com"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                       />
//                     </div>
//                   </div>

//                   <Button
//                     onClick={nextStep}
//                     className="w-full"
//                     disabled={!email || !email.includes("@") || isSubmitting}
//                   >
//                     Continue
//                   </Button>
//                 </motion.div>
//               )}

//               {/* Step 6: Phone Verification */}
//               {step === 5 && (
//                 <motion.div
//                   key="step5"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Phone Verification</h2>
//                   <p className="text-muted-foreground">
//                     {verificationStep === "input"
//                       ? "Add and verify your phone number"
//                       : "Enter the verification code sent to your phone"}
//                   </p>

//                   <div className="space-y-6">
//                     {verificationStep === "input" ? (
//                       <div className="space-y-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="phone" className="flex items-center gap-2">
//                             <Phone className="h-4 w-4 text-primary" />
//                             Phone Number
//                           </Label>
//                           <div className="flex items-center gap-2">
//                             <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
//                               <Smartphone className="h-4 w-4 text-muted-foreground" />
//                             </div>
//                             <Input
//                               id="phone"
//                               type="tel"
//                               placeholder="+1 (555) 123-4567"
//                               value={phoneNumber}
//                               onChange={(e) => setPhoneNumber(e.target.value)}
//                               className="flex-1"
//                             />
//                           </div>
//                         </div>

//                         <Button onClick={handleVerifyPhone} className="w-full" disabled={!phoneNumber || isVerifying}>
//                           {isVerifying ? (
//                             <>
//                               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                               Sending Code...
//                             </>
//                           ) : (
//                             "Send Verification Code"
//                           )}
//                         </Button>
//                       </div>
//                     ) : (
//                       <div className="space-y-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="code" className="flex items-center gap-2">
//                             <Lock className="h-4 w-4 text-primary" />
//                             Verification Code
//                           </Label>
//                           <div className="flex items-center gap-2">
//                             <Input
//                               id="code"
//                               type="text"
//                               placeholder="Enter 6-digit code"
//                               value={verificationCode}
//                               onChange={(e) => setVerificationCode(e.target.value)}
//                               className="flex-1 text-center text-xl tracking-widest"
//                               maxLength={6}
//                             />
//                           </div>
//                           <p className="text-xs text-muted-foreground">
//                             For demo purposes, the code is: <span className="font-mono font-bold">{expectedCode}</span>
//                           </p>
//                         </div>

//                         <div className="flex gap-2">
//                           <Button
//                             variant="outline"
//                             onClick={() => setVerificationStep("input")}
//                             className="flex-1"
//                             disabled={isVerifying}
//                           >
//                             Back
//                           </Button>
//                           <Button
//                             onClick={handleCheckVerificationCode}
//                             className="flex-1"
//                             disabled={!verificationCode || verificationCode.length < 6 || isVerifying}
//                           >
//                             {isVerifying ? (
//                               <>
//                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                 Verifying...
//                               </>
//                             ) : (
//                               "Verify Code"
//                             )}
//                           </Button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 7: Content Strategy (Influencer) or Learning Goals (Regular) */}
//               {step === 6 && (
//                 <motion.div
//                   key="step6"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   {userType === "influencer" ? (
//                     <>
//                       <h2 className="text-xl font-semibold">Content Strategy</h2>
//                       <p className="text-muted-foreground">Tell us about your content creation approach</p>

//                       <div className="space-y-6">
//                         <div className="space-y-2">
//                           <Label>How often do you post content?</Label>
//                           <RadioGroup value={selectedContentFrequency} onValueChange={setSelectedContentFrequency}>
//                             <div className="grid grid-cols-2 gap-2">
//                               {contentFrequencies.map((frequency) => (
//                                 <div key={frequency} className="flex items-center space-x-2">
//                                   <RadioGroupItem value={frequency} id={`frequency-${frequency}`} />
//                                   <Label htmlFor={`frequency-${frequency}`} className="text-sm">
//                                     {frequency}
//                                   </Label>
//                                 </div>
//                               ))}
//                             </div>
//                           </RadioGroup>
//                         </div>

//                         <div className="space-y-2">
//                           <Label>Which days do you typically post?</Label>
//                           <ContentCalendar selectedDays={selectedContentDays} onSelectDay={toggleContentDay} />
//                         </div>

//                         <div className="space-y-2">
//                           <Label>What types of brand collaborations do you prefer?</Label>
//                           <div className="grid grid-cols-2 gap-2">
//                             {brandCollabTypes.map((collab) => (
//                               <div key={collab} className="flex items-center space-x-2">
//                                 <Checkbox
//                                   id={`collab-${collab}`}
//                                   checked={selectedBrandCollabs.includes(collab)}
//                                   onCheckedChange={() => toggleBrandCollab(collab)}
//                                 />
//                                 <Label htmlFor={`collab-${collab}`} className="text-sm">
//                                   {collab}
//                                 </Label>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <h2 className="text-xl font-semibold">Learning Goals</h2>
//                       <p className="text-muted-foreground">What would you like to learn about?</p>

//                       <div className="space-y-6">
//                         <div className="space-y-2">
//                           <Label>Select topics you&apos;re interested in learning:</Label>
//                           <div className="grid grid-cols-2 gap-2">
//                             {learningTopics.map((topic) => (
//                               <div key={topic} className="flex items-center space-x-2">
//                                 <Checkbox
//                                   id={`topic-${topic}`}
//                                   checked={selectedLearningTopics.includes(topic)}
//                                   onCheckedChange={() => toggleLearningTopic(topic)}
//                                 />
//                                 <Label htmlFor={`topic-${topic}`} className="text-sm">
//                                   {topic}
//                                 </Label>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         <div className="space-y-2">
//                           <Label>What are your biggest growth challenges?</Label>
//                           <div className="grid grid-cols-2 gap-2">
//                             {growthChallenges.map((challenge) => (
//                               <div key={challenge} className="flex items-center space-x-2">
//                                 <Checkbox
//                                   id={`challenge-${challenge}`}
//                                   checked={selectedGrowthChallenges.includes(challenge)}
//                                   onCheckedChange={() => toggleGrowthChallenge(challenge)}
//                                 />
//                                 <Label htmlFor={`challenge-${challenge}`} className="text-sm">
//                                   {challenge}
//                                 </Label>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         <div className="space-y-2">
//                           <Label>Tell us your goals in your own words:</Label>
//                           <div className="flex items-center gap-2">
//                             <Textarea
//                               placeholder="I want to grow my account and..."
//                               value={goalStatement}
//                               onChange={(e) => setGoalStatement(e.target.value)}
//                               className="min-h-[80px] flex-1"
//                             />
//                             <TooltipProvider>
//                               <Tooltip>
//                                 <TooltipTrigger asChild>
//                                   <Button
//                                     variant="outline"
//                                     size="icon"
//                                     className="h-10 w-10 shrink-0"
//                                     onClick={() => {
//                                       setGoalStatement("")
//                                       toast({
//                                         title: "Voice Input Ready",
//                                         description: "Click the microphone to start recording",
//                                       })
//                                     }}
//                                   >
//                                     <Mic className="h-4 w-4" />
//                                   </Button>
//                                 </TooltipTrigger>
//                                 <TooltipContent>
//                                   <p>Use voice input</p>
//                                 </TooltipContent>
//                               </Tooltip>
//                             </TooltipProvider>
//                           </div>
//                         </div>
//                       </div>
//                     </>
//                   )}

//                   <Button onClick={nextStep} className="w-full" disabled={isSubmitting}>
//                     Continue
//                   </Button>
//                 </motion.div>
//               )}

//               {/* Step 7: Content Style (Influencer) or Personality Quiz (Regular) */}
//               {step === 7 && (
//                 <motion.div
//                   key="step7"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   {userType === "influencer" ? (
//                     <>
//                       <h2 className="text-xl font-semibold">Content Style</h2>
//                       <p className="text-muted-foreground">Select your preferred aesthetic</p>

//                       <div className="grid grid-cols-2 gap-4">
//                         {contentStyles.map((style, index) => (
//                           <motion.div key={style.name} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
//                             <Button
//                               variant={selectedContentStyle === style.name ? "default" : "outline"}
//                               className={cn(
//                                 "flex h-auto w-full flex-col items-center justify-center gap-2 p-4 text-center",
//                                 selectedContentStyle === style.name ? "border-primary" : "",
//                               )}
//                               onClick={() => setSelectedContentStyle(style.name)}
//                             >
//                               <span className="text-2xl">{style.icon}</span>
//                               <div>
//                                 <div className="font-medium">{style.name}</div>
//                                 <div className="text-xs text-muted-foreground">{style.description}</div>
//                               </div>
//                             </Button>
//                           </motion.div>
//                         ))}
//                       </div>

//                       <div className="space-y-4">
//                         <h3 className="font-medium">Visual Mood Board</h3>
//                         <div className="grid grid-cols-3 gap-2">
//                           {[1, 2, 3, 4, 5, 6].map((i) => (
//                             <div key={i} className="group relative aspect-square overflow-hidden rounded-md bg-muted">
//                               <div className="absolute inset-0 flex items-center justify-center">
//                                 <ImageIcon className="h-6 w-6 text-muted-foreground" />
//                               </div>
//                               <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
//                                 <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
//                                   <Plus className="h-4 w-4" />
//                                 </Button>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <h2 className="text-xl font-semibold">Content Creator Personality</h2>
//                       <p className="text-muted-foreground">Let&apos;s discover your content creator type</p>

//                       <div className="space-y-6">
//                         {personalityResult ? (
//                           <div className="space-y-4">
//                             <div className="rounded-lg border bg-card p-4">
//                               <div className="flex items-center gap-3">
//                                 <div className="rounded-full bg-primary/10 p-2">
//                                   {personalityTypes.find((p) => p.type === personalityResult)?.icon || (
//                                     <Star className="h-5 w-5 text-primary" />
//                                   )}
//                                 </div>
//                                 <div>
//                                   <h3 className="font-semibold">You&apos;re a {personalityResult}!</h3>
//                                   <p className="text-sm text-muted-foreground">
//                                     {personalityTypes.find((p) => p.type === personalityResult)?.description}
//                                   </p>
//                                 </div>
//                               </div>

//                               <div className="mt-4 space-y-3">
//                                 <div>
//                                   <h4 className="text-sm font-medium">Your Strengths:</h4>
//                                   <ul className="mt-1 list-inside list-disc text-sm text-muted-foreground">
//                                     {personalityTypes
//                                       .find((p) => p.type === personalityResult)
//                                       ?.strengths.map((strength, i) => (
//                                         <li key={i}>{strength}</li>
//                                       ))}
//                                   </ul>
//                                 </div>

//                                 <div>
//                                   <h4 className="text-sm font-medium">Recommended Strategies:</h4>
//                                   <ul className="mt-1 list-inside list-disc text-sm text-muted-foreground">
//                                     {personalityTypes
//                                       .find((p) => p.type === personalityResult)
//                                       ?.strategies.map((strategy, i) => (
//                                         <li key={i}>{strategy}</li>
//                                       ))}
//                                   </ul>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="flex justify-center">
//                               <Button variant="outline" size="sm" onClick={() => setPersonalityResult("")}>
//                                 Retake Quiz
//                               </Button>
//                             </div>
//                           </div>
//                         ) : (
//                           <div className="space-y-4">
//                             <div className="space-y-3">
//                               <div className="space-y-2">
//                                 <Label>When creating content, I prefer to:</Label>
//                                 <RadioGroup
//                                   value={personalityAnswers["q1"] || ""}
//                                   onValueChange={(value) => handlePersonalityAnswer("q1", value)}
//                                 >
//                                   <div className="space-y-2">
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="express my creative ideas" id="q1-a" />
//                                       <Label htmlFor="q1-a">Express my creative ideas</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="connect with my community" id="q1-b" />
//                                       <Label htmlFor="q1-b">Connect with my community</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="teach others something new" id="q1-c" />
//                                       <Label htmlFor="q1-c">Teach others something new</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="try the latest trends" id="q1-d" />
//                                       <Label htmlFor="q1-d">Try the latest trends</Label>
//                                     </div>
//                                   </div>
//                                 </RadioGroup>
//                               </div>

//                               <div className="space-y-2">
//                                 <Label>I get the most satisfaction from:</Label>
//                                 <RadioGroup
//                                   value={personalityAnswers["q2"] || ""}
//                                   onValueChange={(value) => handlePersonalityAnswer("q2", value)}
//                                 >
//                                   <div className="space-y-2">
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="creating original content" id="q2-a" />
//                                       <Label htmlFor="q2-a">Creating original content</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="building a community of people" id="q2-b" />
//                                       <Label htmlFor="q2-b">Building a community of people</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="informing and educating others" id="q2-c" />
//                                       <Label htmlFor="q2-c">Informing and educating others</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="discovering new trends" id="q2-d" />
//                                       <Label htmlFor="q2-d">Discovering new trends</Label>
//                                     </div>
//                                   </div>
//                                 </RadioGroup>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </>
//                   )}

//                   <Button
//                     onClick={nextStep}
//                     className="w-full"
//                     disabled={isSubmitting || (userType === "influencer" && !selectedContentStyle)}
//                   >
//                     Continue
//                   </Button>
//                 </motion.div>
//               )}

//               {/* Step 8: Income Goals */}
//               {step === 8 && (
//                 <motion.div
//                   key="step8"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Income Goals</h2>
//                   <p className="text-muted-foreground">What are your monthly income goals?</p>

//                   <div className="space-y-6">
//                     <Tabs defaultValue="slider" className="w-full">
//                       <TabsList className="grid w-full grid-cols-2">
//                         <TabsTrigger value="slider">Slider</TabsTrigger>
//                         <TabsTrigger value="preset">Preset Ranges</TabsTrigger>
//                       </TabsList>
//                       <TabsContent value="slider" className="space-y-4 pt-4">
//                         <div className="space-y-6">
//                           <div className="flex flex-col items-center justify-center">
//                             <div className="text-3xl font-bold text-primary">${incomeGoal.toLocaleString()}</div>
//                             <div className="text-sm text-muted-foreground">per month</div>
//                           </div>

//                           <div className="px-2">
//                             <Slider
//                               defaultValue={[incomeGoal]}
//                               max={userType === "influencer" ? 100000 : 20000}
//                               step={100}
//                               onValueChange={handleIncomeSliderChange}
//                             />

//                             <div className="flex justify-between text-xs text-muted-foreground">
//                               <span>$0</span>
//                               <span>${userType === "influencer" ? "100,000" : "20,000"}+</span>
//                             </div>
//                           </div>

//                           <div className="rounded-lg border bg-card p-4 shadow-sm">
//                             <div className="flex items-center gap-2">
//                               <Badge variant="outline" className="bg-primary/10 text-primary">
//                                 {getCurrentIncomeRange().level}
//                               </Badge>
//                               <span className="text-sm font-medium">{getCurrentIncomeRange().label}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </TabsContent>

//                       <TabsContent value="preset" className="space-y-4 pt-4">
//                         <RadioGroup
//                           value={selectedIncomeRange.toString()}
//                           onValueChange={(value) => handleIncomeRangeSelect(Number.parseInt(value))}
//                           className="space-y-3"
//                         >
//                           {incomeRanges.map((range, index) => (
//                             <div key={index} className="flex items-center space-x-2">
//                               <RadioGroupItem value={index.toString()} id={`range-${index}`} />
//                               <Label
//                                 htmlFor={`range-${index}`}
//                                 className="flex flex-1 cursor-pointer items-center justify-between rounded-md border p-3 hover:bg-accent"
//                               >
//                                 <div className="flex items-center gap-2">
//                                   <DollarSign className="h-4 w-4 text-primary" />
//                                   <span>{range.label}</span>
//                                 </div>
//                                 <Badge variant="outline">{range.level}</Badge>
//                               </Label>
//                             </div>
//                           ))}
//                         </RadioGroup>
//                       </TabsContent>
//                     </Tabs>

//                     {/* Income Projection */}
//                     <IncomeProjection
//                       currentIncome={userType === "influencer" ? 2000 : 500}
//                       targetIncome={incomeGoal}
//                       months={12}
//                     />

//                     <div className="flex items-center space-x-2">
//                       <Checkbox
//                         id="terms"
//                         checked={acceptedTerms}
//                         onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
//                       />
//                       <Label htmlFor="terms" className="text-sm">
//                         I understand this is my target goal and actual results may vary
//                       </Label>
//                     </div>

//                     <Button onClick={nextStep} className="w-full" disabled={!acceptedTerms || isSubmitting}>
//                       {userType === "influencer" && step < 9 ? "Continue" : "Complete Setup"}
//                     </Button>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 9: Achievements (Influencer only) */}
//               {userType === "influencer" && step === 9 && (
//                 <motion.div
//                   key="step9"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Your Achievements</h2>
//                   <p className="text-muted-foreground">Unlock achievements as you grow</p>

//                   <div className="grid grid-cols-3 gap-3">
//                     <AchievementBadge
//                       title="Profile Setup"
//                       icon={<User className="h-5 w-5 text-primary" />}
//                       isUnlocked={achievements.profile}
//                       onUnlock={() => unlockAchievement("profile")}
//                     />
//                     <AchievementBadge
//                       title="Categories"
//                       icon={<Layers className="h-5 w-5 text-primary" />}
//                       isUnlocked={achievements.categories}
//                       onUnlock={() => unlockAchievement("categories")}
//                     />
//                     <AchievementBadge
//                       title="Social Connect"
//                       icon={<Share2 className="h-5 w-5 text-primary" />}
//                       isUnlocked={achievements.social}
//                       onUnlock={() => unlockAchievement("social")}
//                     />
//                     <AchievementBadge
//                       title="Verified"
//                       icon={<BadgeCheck className="h-5 w-5 text-primary" />}
//                       isUnlocked={achievements.verification}
//                       onUnlock={() => unlockAchievement("verification")}
//                     />
//                     <AchievementBadge
//                       title="Goal Setter"
//                       icon={<Target className="h-5 w-5 text-primary" />}
//                       isUnlocked={achievements.goals}
//                       onUnlock={() => unlockAchievement("goals")}
//                     />
//                     <AchievementBadge
//                       title="First Post"
//                       icon={<ImageIcon className="h-5 w-5 text-primary" />}
//                       isUnlocked={false}
//                     />
//                   </div>

//                   <div className="rounded-lg border bg-card p-4">
//                     <h3 className="font-medium">Referral Program</h3>
//                     <p className="mt-1 text-sm text-muted-foreground">Invite other influencers and earn rewards</p>

//                     <div className="mt-3 flex items-center gap-2">
//                       <Input value="https://instagrowth.com/ref/yourname" readOnly className="flex-1 bg-muted" />
//                       <Button variant="outline" size="sm" className="shrink-0">
//                         <Copy className="mr-1 h-3 w-3" />
//                         Copy
//                       </Button>
//                     </div>
//                   </div>

//                   <Button onClick={nextStep} className="w-full" disabled={isSubmitting}>
//                     Complete Setup
//                   </Button>
//                 </motion.div>
//               )}

//               {/* Final Step: Completion */}
//               {((userType === "regular" && step === 9) || (userType === "influencer" && step === 10)) && (
//                 <motion.div
//                   key="stepFinal"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <div className="flex flex-col items-center justify-center py-6 text-center">
//                     {isSubmitting ? (
//                       <div className="flex flex-col items-center justify-center space-y-4">
//                         <Loader2 className="h-12 w-12 animate-spin text-primary" />
//                         <h2 className="text-xl font-semibold">Setting up your account...</h2>
//                         <p className="text-muted-foreground">This will only take a moment</p>
//                       </div>
//                     ) : (
//                       <>
//                         <motion.div
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           transition={{
//                             type: "spring",
//                             stiffness: 260,
//                             damping: 20,
//                             delay: 0.1,
//                           }}
//                           className="mb-6 rounded-full bg-green-500/10 p-4"
//                         >
//                           <Check className="h-12 w-12 text-green-500" />
//                         </motion.div>
//                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
//                           <h2 className="text-2xl font-bold">You&apos;re all set!</h2>
//                           <p className="mt-2 text-muted-foreground">
//                             {userType === "influencer"
//                               ? "Your influencer dashboard is ready."
//                               : "Your dashboard is ready."}
//                           </p>

//                           <div className="mt-6 space-y-4">
//                             <div className="rounded-lg border bg-card p-4">
//                               <h3 className="font-medium">Account Summary</h3>
//                               <div className="mt-2 space-y-2 text-sm">
//                                 <div className="flex justify-between">
//                                   <span className="text-muted-foreground">Account Type:</span>
//                                   <span className="font-medium">
//                                     {userType === "influencer" ? "Influencer" : "Regular User"}
//                                   </span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                   <span className="text-muted-foreground">Categories:</span>
//                                   <span className="font-medium">{selectedCategories.length} selected</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                   <span className="text-muted-foreground">Monthly Goal:</span>
//                                   <span className="font-medium">${incomeGoal.toLocaleString()}</span>
//                                 </div>
//                                 {userType === "influencer" && (
//                                   <div className="flex justify-between">
//                                     <span className="text-muted-foreground">Content Style:</span>
//                                     <span className="font-medium">{selectedContentStyle}</span>
//                                   </div>
//                                 )}
//                                 {userType === "regular" && personalityResult && (
//                                   <div className="flex justify-between">
//                                     <span className="text-muted-foreground">Creator Type:</span>
//                                     <span className="font-medium">{personalityResult}</span>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>

//                             <Button
//                               onClick={() => {
//                                 if (userType === "influencer") {
//                                   router.push("/influencer-dashboard")
//                                 } else {
//                                   router.push("/dashboard")
//                                 }
//                               }}
//                               className="w-full"
//                             >
//                               Go to Dashboard
//                               <ChevronRight className="ml-2 h-4 w-4" />
//                             </Button>
//                           </div>
//                         </motion.div>
//                       </>
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {step > 0 && step < (userType === "influencer" ? 10 : 9) && (
//             <div className="flex items-center justify-between border-t p-4">
//               <Button variant="ghost" size="sm" onClick={prevStep} disabled={isSubmitting}>
//                 Back
//               </Button>
//               {step !== 5 && (
//                 <Button size="sm" onClick={nextStep} disabled={isSubmitting}>
//                   Skip
//                 </Button>
//               )}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// // Missing components that were used in the code
// function Play(props: any) {
//   return <Video {...props} />
// }

// function User(props: any) {
//   return <Users {...props} />
// }

// function Layers(props: any) {
//   return <Palette {...props} />
// }

// function BadgeCheck(props: any) {
//   return <Check {...props} />
// }

// function Target(props: any) {
//   return <Flag {...props} />
// }

// function Copy(props: any) {
//   return <Paperclip {...props} />
// }

// function X(props: any) {
//   return <AlertCircle {...props} />
// }


// "use client"

// import type React from "react"

// import { useState, useRef, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { useRouter } from "next/navigation"
// import {
//   AlertCircle,
//   AtSign,
//   BookOpen,
//   Camera,
//   Check,
//   ChevronRight,
//   DollarSign,
//   Flag,
//   ImageIcon,
//   Instagram,
//   Loader2,
//   Lock,
//   Mail,
//   MessageCircle,
//   Mic,
//   Palette,
//   Paperclip,
//   Phone,
//   Plus,
//   Save,
//   Share2,
//   Smartphone,
//   Sparkles,
//   Star,
//   TrendingUp,
//   Users,
//   Video,
//   Wand2,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Slider } from "@/components/ui/slider"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Checkbox } from "@/components/ui/checkbox"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Textarea } from "@/components/ui/textarea"
// import { toast } from "@/hooks/use-toast"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { cn } from "@/lib/utils"
// import confetti from "canvas-confetti"

// // Import the correct server actions
// import {
//   initializeOnboarding,
//   updateOnboardingStep,
//   saveOnboardingData,
//   completeOnboarding,
// } from "@/actions/onboarding"

// // Import the SMS verification server actions
// import { sendVerificationSMS, verifyCode } from "@/actions/sms-service"

// // Mock AI analysis
// const mockAiAnalysis = async (handle: string) => {
//   return new Promise<{
//     followers: number
//     engagement: number
//     growthRate: number
//     topContent: string[]
//     audienceDemo: { age: string; gender: string; location: string }
//   }>((resolve) => {
//     setTimeout(() => {
//       resolve({
//         followers: Math.floor(1000 + Math.random() * 100000),
//         engagement: Math.random() * 8 + 1,
//         growthRate: Math.random() * 10,
//         topContent: ["Fashion", "Lifestyle", "Travel"],
//         audienceDemo: {
//           age: "18-34",
//           gender: "65% Female, 35% Male",
//           location: "US, UK, Canada",
//         },
//       })
//     }, 2000)
//   })
// }

// type SocialPlatform = {
//   name: string
//   icon: React.ReactNode
//   placeholder: string
//   color: string
// }

// const socialPlatforms: SocialPlatform[] = [
//   {
//     name: "Instagram",
//     icon: <Instagram className="h-4 w-4" />,
//     placeholder: "@yourusername",
//     color: "bg-gradient-to-r from-purple-500 to-pink-500",
//   },
//   {
//     name: "TikTok",
//     icon: <Video className="h-4 w-4" />,
//     placeholder: "@yourusername",
//     color: "bg-black",
//   },
//   {
//     name: "YouTube",
//     icon: <Play className="h-4 w-4" />,
//     placeholder: "@yourchannel",
//     color: "bg-red-600",
//   },
//   {
//     name: "Twitter",
//     icon: <MessageCircle className="h-4 w-4" />,
//     placeholder: "@yourusername",
//     color: "bg-blue-500",
//   },
// ]

// const contentCategories = [
//   { name: "Fashion", icon: "👗", color: "bg-pink-100 dark:bg-pink-900" },
//   { name: "Beauty", icon: "💄", color: "bg-purple-100 dark:bg-purple-900" },
//   { name: "Fitness", icon: "💪", color: "bg-green-100 dark:bg-green-900" },
//   { name: "Travel", icon: "✈️", color: "bg-blue-100 dark:bg-blue-900" },
//   { name: "Food", icon: "🍕", color: "bg-yellow-100 dark:bg-yellow-900" },
//   { name: "Lifestyle", icon: "🌿", color: "bg-teal-100 dark:bg-teal-900" },
//   { name: "Tech", icon: "📱", color: "bg-gray-100 dark:bg-gray-800" },
//   { name: "Gaming", icon: "🎮", color: "bg-indigo-100 dark:bg-indigo-900" },
//   { name: "Business", icon: "💼", color: "bg-amber-100 dark:bg-amber-900" },
//   { name: "Education", icon: "📚", color: "bg-red-100 dark:bg-red-900" },
//   { name: "Art", icon: "🎨", color: "bg-fuchsia-100 dark:bg-fuchsia-900" },
//   { name: "Music", icon: "🎵", color: "bg-cyan-100 dark:bg-cyan-900" },
// ]

// const incomeRanges = [
//   { min: 0, max: 1000, label: "Up to $1,000/month", level: "Starter" },
//   { min: 1000, max: 5000, label: "$1,000 - $5,000/month", level: "Growing" },
//   { min: 5000, max: 10000, label: "$5,000 - $10,000/month", level: "Established" },
//   { min: 10000, max: 20000, label: "$10,000 - $20,000/month", level: "Professional" },
//   { min: 20000, max: 50000, label: "$20,000 - $50,000/month", level: "Elite" },
//   { min: 50000, max: 100000, label: "$50,000+/month", level: "Celebrity" },
// ]

// const contentFrequencies = ["Daily", "3-5 times per week", "1-2 times per week", "Few times a month"]

// const brandCollabTypes = [
//   "Sponsored Posts",
//   "Brand Ambassador",
//   "Affiliate Marketing",
//   "Product Reviews",
//   "Event Appearances",
//   "Content Creation",
// ]

// const learningTopics = [
//   "Content Creation",
//   "Audience Growth",
//   "Engagement Strategies",
//   "Monetization",
//   "Photography/Videography",
//   "Personal Branding",
// ]

// const growthChallenges = [
//   "Finding My Niche",
//   "Creating Consistent Content",
//   "Growing My Audience",
//   "Engagement Rate",
//   "Monetization",
//   "Work-Life Balance",
// ]

// const contentStyles = [
//   { name: "Minimalist", icon: "✨", description: "Clean, simple aesthetics" },
//   { name: "Vibrant", icon: "🌈", description: "Bold colors and energy" },
//   { name: "Vintage", icon: "📷", description: "Retro and nostalgic vibes" },
//   { name: "Luxury", icon: "💎", description: "High-end and sophisticated" },
//   { name: "Playful", icon: "🎨", description: "Fun and creative expression" },
//   { name: "Nature", icon: "🌿", description: "Organic and earthy elements" },
// ]

// const personalityTypes = [
//   {
//     type: "Creator",
//     description: "You thrive on making original content and expressing yourself",
//     icon: <Palette className="h-5 w-5" />,
//     strengths: ["Original content", "Creative expression", "Unique perspective"],
//     strategies: ["Focus on quality over quantity", "Develop a signature style", "Collaborate with other creators"],
//   },
//   {
//     type: "Connector",
//     description: "You excel at building relationships and engaging with your audience",
//     icon: <Users className="h-5 w-5" />,
//     strengths: ["Community building", "Engagement", "Authenticity"],
//     strategies: ["Prioritize comments and messages", "Host live sessions", "Create interactive content"],
//   },
//   {
//     type: "Educator",
//     description: "You love sharing knowledge and teaching others",
//     icon: <BookOpen className="h-5 w-5" />,
//     strengths: ["Informative content", "Clear communication", "Expertise"],
//     strategies: ["Create how-to content", "Share insights and tips", "Develop series content"],
//   },
//   {
//     type: "Trendsetter",
//     description: "You stay ahead of the curve and influence what's next",
//     icon: <TrendingUp className="h-5 w-5" />,
//     strengths: ["Early adoption", "Trend awareness", "Cultural relevance"],
//     strategies: ["Monitor emerging trends", "Put your unique spin on trends", "Be first to market"],
//   },
// ]

// // Custom hook for saving progress
// const useSaveProgress = (data: any) => {
//   const [isSaving, setIsSaving] = useState(false)
//   const [lastSaved, setLastSaved] = useState<Date | null>(null)

//   const saveProgress = async () => {
//     setIsSaving(true)
//     try {
//       // Save the current step data to the server
//       await saveOnboardingData(data.step, data)
//       setLastSaved(new Date())
//       toast({
//         title: "Progress Saved",
//         description: "Your onboarding progress has been saved.",
//       })
//     } catch (error) {
//       console.error("Error saving progress:", error)
//       toast({
//         title: "Save Failed",
//         description: "Could not save your progress. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   return { saveProgress, isSaving, lastSaved }
// }

// // Custom component for 3D flip card
// const FlipCard = ({
//   front,
//   back,
//   isFlipped,
//   onClick,
// }: {
//   front: React.ReactNode
//   back: React.ReactNode
//   isFlipped: boolean
//   onClick: () => void
// }) => {
//   return (
//     <div className="relative h-[200px] w-full cursor-pointer perspective-1000" onClick={onClick}>
//       <div
//         className={cn(
//           "relative h-full w-full duration-500 preserve-3d transition-all",
//           isFlipped ? "rotate-y-180" : "",
//         )}
//       >
//         <div className="absolute inset-0 backface-hidden">{front}</div>
//         <div className="absolute inset-0 rotate-y-180 backface-hidden">{back}</div>
//       </div>
//     </div>
//   )
// }

// // Custom component for animated mascot
// const Mascot = ({ emotion = "happy" }: { emotion?: "happy" | "thinking" | "excited" | "confused" }) => {
//   const animations = {
//     happy: {
//       y: [0, -10, 0],
//       transition: { repeat: Number.POSITIVE_INFINITY, duration: 2 },
//     },
//     thinking: {
//       rotate: [0, 10, 0, -10, 0],
//       transition: { repeat: Number.POSITIVE_INFINITY, duration: 3 },
//     },
//     excited: {
//       scale: [1, 1.1, 1],
//       transition: { repeat: Number.POSITIVE_INFINITY, duration: 0.5 },
//     },
//     confused: {
//       rotate: [0, 5, 0, -5, 0],
//       transition: { repeat: Number.POSITIVE_INFINITY, duration: 1.5 },
//     },
//   }

//   return (
//     <motion.div className="relative h-16 w-16 rounded-full bg-primary/20 p-2" animate={animations[emotion]}>
//       <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/30">
//         {emotion === "happy" && <span className="text-2xl">😊</span>}
//         {emotion === "thinking" && <span className="text-2xl">🤔</span>}
//         {emotion === "excited" && <span className="text-2xl">🤩</span>}
//         {emotion === "confused" && <span className="text-2xl">😕</span>}
//       </div>
//     </motion.div>
//   )
// }

// // Custom component for interactive calendar
// const ContentCalendar = ({
//   selectedDays,
//   onSelectDay,
// }: {
//   selectedDays: number[]
//   onSelectDay: (day: number) => void
// }) => {
//   const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

//   return (
//     <div className="grid grid-cols-7 gap-1">
//       {days.map((day, index) => (
//         <div key={day} className="flex flex-col items-center">
//           <div className="text-xs font-medium text-muted-foreground">{day}</div>
//           <Button
//             variant={selectedDays.includes(index) ? "default" : "outline"}
//             size="sm"
//             className="mt-1 h-8 w-8 p-0"
//             onClick={() => onSelectDay(index)}
//           >
//             {selectedDays.includes(index) && <Check className="h-3 w-3" />}
//           </Button>
//         </div>
//       ))}
//     </div>
//   )
// }

// // Custom component for voice input simulation
// const VoiceInput = ({
//   onComplete,
// }: {
//   onComplete: (text: string) => void
// }) => {
//   const [isRecording, setIsRecording] = useState(false)
//   const [progress, setProgress] = useState(0)

//   const startRecording = () => {
//     setIsRecording(true)
//     setProgress(0)

//     // Simulate recording progress
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval)
//           setIsRecording(false)
//           onComplete("I want to grow my Instagram account and connect with more people who share my interests.")
//           return 100
//         }
//         return prev + 5
//       })
//     }, 150)
//   }

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       <Button
//         variant={isRecording ? "destructive" : "outline"}
//         size="lg"
//         className={cn("h-16 w-16 rounded-full", isRecording && "animate-pulse")}
//         onClick={startRecording}
//         disabled={isRecording}
//       >
//         <Mic className="h-6 w-6" />
//       </Button>

//       {isRecording && (
//         <div className="w-full space-y-2">
//           <div className="flex items-center justify-between">
//             <span className="text-xs text-muted-foreground">Recording...</span>
//             <span className="text-xs text-muted-foreground">{progress}%</span>
//           </div>
//           <Progress value={progress} className="h-1" />
//         </div>
//       )}

//       <p className="text-center text-sm text-muted-foreground">
//         {isRecording ? "Listening... speak clearly" : "Tap to record your goals"}
//       </p>
//     </div>
//   )
// }

// // Custom component for AI profile analysis
// const AiProfileAnalysis = ({
//   handle,
//   onComplete,
// }: {
//   handle: string
//   onComplete: (data: any) => void
// }) => {
//   const [isAnalyzing, setIsAnalyzing] = useState(false)
//   const [progress, setProgress] = useState(0)
//   const [result, setResult] = useState<any>(null)

//   const startAnalysis = async () => {
//     setIsAnalyzing(true)
//     setProgress(0)

//     // Simulate analysis progress
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 95) {
//           clearInterval(interval)
//           return 95
//         }
//         return prev + Math.random() * 10
//       })
//     }, 300)

//     try {
//       const data = await mockAiAnalysis(handle)
//       clearInterval(interval)
//       setProgress(100)
//       setResult(data)
//       onComplete(data)
//       setTimeout(() => {
//         setIsAnalyzing(false)
//       }, 500)
//     } catch (error) {
//       clearInterval(interval)
//       setIsAnalyzing(false)
//       toast({
//         title: "Analysis Failed",
//         description: "Could not analyze profile",
//         variant: "destructive",
//       })
//     }
//   }

//   useEffect(() => {
//     if (handle && !result) {
//       startAnalysis()
//     }
//   }, [handle])

//   if (!isAnalyzing && result) {
//     return (
//       <div className="space-y-4 rounded-lg border bg-card p-4">
//         <div className="flex items-center justify-between">
//           <h3 className="font-semibold">AI Analysis Results</h3>
//           <Badge variant="outline" className="bg-primary/10">
//             <Sparkles className="mr-1 h-3 w-3" /> AI Generated
//           </Badge>
//         </div>

//         <div className="grid gap-3">
//           <div className="flex items-center justify-between rounded-md bg-muted p-2">
//             <span className="text-sm">Followers</span>
//             <span className="font-medium">{result.followers.toLocaleString()}</span>
//           </div>
//           <div className="flex items-center justify-between rounded-md bg-muted p-2">
//             <span className="text-sm">Engagement Rate</span>
//             <span className="font-medium">{result.engagement.toFixed(1)}%</span>
//           </div>
//           <div className="flex items-center justify-between rounded-md bg-muted p-2">
//             <span className="text-sm">Growth Rate</span>
//             <span className="font-medium">+{result.growthRate.toFixed(1)}%/month</span>
//           </div>
//           <div className="flex items-center justify-between rounded-md bg-muted p-2">
//             <span className="text-sm">Top Performing Content</span>
//             <div className="flex gap-1">
//               {result.topContent.map((category: string) => (
//                 <Badge key={category} variant="outline" className="text-xs">
//                   {category}
//                 </Badge>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h3 className="font-semibold">Analyzing @{handle}</h3>
//         <Badge variant="outline" className="animate-pulse bg-primary/10">
//           <Wand2 className="mr-1 h-3 w-3" /> AI Working
//         </Badge>
//       </div>

//       <div className="space-y-2">
//         <div className="flex items-center justify-between">
//           <span className="text-xs text-muted-foreground">Analyzing profile data...</span>
//           <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
//         </div>
//         <Progress value={progress} className="h-1" />
//       </div>

//       <div className="space-y-2">
//         {progress > 30 && (
//           <div className="flex items-center gap-2 text-xs text-muted-foreground">
//             <Check className="h-3 w-3 text-green-500" />
//             Fetching profile statistics
//           </div>
//         )}
//         {progress > 50 && (
//           <div className="flex items-center gap-2 text-xs text-muted-foreground">
//             <Check className="h-3 w-3 text-green-500" />
//             Analyzing content performance
//           </div>
//         )}
//         {progress > 70 && (
//           <div className="flex items-center gap-2 text-xs text-muted-foreground">
//             <Check className="h-3 w-3 text-green-500" />
//             Evaluating audience demographics
//           </div>
//         )}
//         {progress > 90 && (
//           <div className="flex items-center gap-2 text-xs text-muted-foreground">
//             <Loader2 className="h-3 w-3 animate-spin" />
//             Generating recommendations
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// // Custom component for income projection visualization
// const IncomeProjection = ({
//   currentIncome = 0,
//   targetIncome = 5000,
//   months = 12,
// }: {
//   currentIncome?: number
//   targetIncome?: number
//   months?: number
// }) => {
//   // Generate projection data
//   const generateProjectionData = () => {
//     const data = []
//     const monthlyGrowth = (targetIncome - currentIncome) / months

//     for (let i = 0; i <= months; i++) {
//       data.push({
//         month: i,
//         value: Math.max(0, currentIncome + monthlyGrowth * i),
//       })
//     }

//     return data
//   }

//   const projectionData = generateProjectionData()
//   const maxValue = Math.max(...projectionData.map((d) => d.value))

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h3 className="font-semibold">Income Projection</h3>
//         <Badge variant="outline">{months} months</Badge>
//       </div>

//       <div className="h-[150px] w-full">
//         <div className="flex h-full items-end gap-1">
//           {projectionData.map((data, index) => (
//             <div key={index} className="group relative flex flex-1 flex-col items-center">
//               <div className="absolute -top-8 z-10 hidden rounded-md bg-black/80 px-2 py-1 text-xs text-white group-hover:block">
//                 ${Math.round(data.value).toLocaleString()}
//               </div>
//               <div
//                 className={cn(
//                   "w-full rounded-t-sm",
//                   index === 0 ? "bg-muted" : index === months ? "bg-green-500" : "bg-primary",
//                 )}
//                 style={{
//                   height: `${(data.value / maxValue) * 100}%`,
//                   opacity: 0.3 + (data.value / maxValue) * 0.7,
//                 }}
//               />
//               {index % 3 === 0 && <div className="mt-1 text-[10px] text-muted-foreground">{index}m</div>}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex items-center justify-between text-sm">
//         <div>
//           <div className="font-medium">${currentIncome.toLocaleString()}</div>
//           <div className="text-xs text-muted-foreground">Current</div>
//         </div>
//         <div className="text-right">
//           <div className="font-medium">${targetIncome.toLocaleString()}</div>
//           <div className="text-xs text-muted-foreground">Target</div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Custom component for achievement badges
// const AchievementBadge = ({
//   title,
//   icon,
//   isUnlocked = false,
//   onUnlock,
// }: {
//   title: string
//   icon: React.ReactNode
//   isUnlocked?: boolean
//   onUnlock?: () => void
// }) => {
//   return (
//     <div
//       className={cn(
//         "group relative flex flex-col items-center rounded-lg border p-3 transition-all",
//         isUnlocked
//           ? "border-primary bg-primary/5"
//           : "border-dashed border-muted-foreground/30 bg-muted/50 opacity-70 hover:opacity-100",
//       )}
//       onClick={() => !isUnlocked && onUnlock?.()}
//     >
//       <div
//         className={cn(
//           "flex h-12 w-12 items-center justify-center rounded-full",
//           isUnlocked ? "bg-primary/20" : "bg-muted",
//         )}
//       >
//         {icon}
//       </div>
//       <div className="mt-2 text-center">
//         <div className="text-xs font-medium">{title}</div>
//         <div className="text-[10px] text-muted-foreground">{isUnlocked ? "Unlocked" : "Locked"}</div>
//       </div>

//       {!isUnlocked && (
//         <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/5 opacity-0 transition-opacity group-hover:opacity-100">
//           <Button variant="secondary" size="sm" className="text-xs">
//             Unlock
//           </Button>
//         </div>
//       )}
//     </div>
//   )
// }

// // Main component
// export default function OnboardingPage() {
//   const router = useRouter()
//   const [step, setStep] = useState(0)
//   const [userType, setUserType] = useState<"regular" | "influencer" | null>(null)
//   const [progress, setProgress] = useState(0)
//   const [profileImage, setProfileImage] = useState<string | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([])
//   const [socialHandles, setSocialHandles] = useState<Record<string, string>>({})
//   const [phoneNumber, setPhoneNumber] = useState("")
//   const [isVerifying, setIsVerifying] = useState(false)
//   const [verificationCode, setVerificationCode] = useState("")
//   const [expectedCode, setExpectedCode] = useState("")
//   const [isVerified, setIsVerified] = useState(false)
//   const [verificationStep, setVerificationStep] = useState<"input" | "verify">("input")
//   const [email, setEmail] = useState("")
//   const [incomeGoal, setIncomeGoal] = useState(5000)
//   const [selectedIncomeRange, setSelectedIncomeRange] = useState(1)
//   const [acceptedTerms, setAcceptedTerms] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [flippedCards, setFlippedCards] = useState<number[]>([])
//   const [selectedContentFrequency, setSelectedContentFrequency] = useState<string>("")
//   const [selectedBrandCollabs, setSelectedBrandCollabs] = useState<string[]>([])
//   const [selectedContentDays, setSelectedContentDays] = useState<number[]>([])
//   const [selectedLearningTopics, setSelectedLearningTopics] = useState<string[]>([])
//   const [selectedGrowthChallenges, setSelectedGrowthChallenges] = useState<string[]>([])
//   const [selectedContentStyle, setSelectedContentStyle] = useState<string>("")
//   const [personalityResult, setPersonalityResult] = useState<string>("")
//   const [personalityAnswers, setPersonalityAnswers] = useState<Record<string, string>>({})
//   const [goalStatement, setGoalStatement] = useState<string>("")
//   const [aiAnalysisResult, setAiAnalysisResult] = useState<any>(null)
//   const [achievements, setAchievements] = useState<Record<string, boolean>>({
//     profile: false,
//     categories: false,
//     social: false,
//     verification: false,
//     goals: false,
//   })
//   const [showMascot, setShowMascot] = useState(true)
//   const [mascotEmotion, setMascotEmotion] = useState<"happy" | "thinking" | "excited" | "confused">("happy")
//   const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
//   const [onboardingInitialized, setOnboardingInitialized] = useState(false)

//   // Determine total steps based on user type
//   const totalSteps = userType === "influencer" ? 10 : 8

//   // Save progress hook
//   const { saveProgress, isSaving, lastSaved } = useSaveProgress({
//     step,
//     userType,
//     profileImage: profileImageUrl || profileImage,
//     selectedCategories,
//     socialHandles,
//     phoneNumber,
//     email,
//     incomeGoal,
//     selectedContentFrequency,
//     selectedBrandCollabs,
//     selectedContentDays,
//     selectedLearningTopics,
//     selectedGrowthChallenges,
//     selectedContentStyle,
//     personalityResult,
//     goalStatement,
//     aiAnalysisResult,
//   })

//   // Update progress when step changes
//   useEffect(() => {
//     setProgress(((step + 1) / totalSteps) * 100)

//     // Update mascot emotion based on step
//     if (step === totalSteps - 1) {
//       setMascotEmotion("excited")
//     } else if (step > totalSteps / 2) {
//       setMascotEmotion("happy")
//     } else if (step === 0) {
//       setMascotEmotion("thinking")
//     } else {
//       setMascotEmotion("confused")
//     }
//   }, [step, totalSteps])

//   // Trigger confetti effect
//   const triggerConfetti = () => {
//     confetti({
//       particleCount: 100,
//       spread: 70,
//       origin: { y: 0.6 },
//     })
//   }

//   // Handle unlocking achievements
//   const unlockAchievement = (achievement: string) => {
//     if (!achievements[achievement]) {
//       setAchievements((prev) => ({
//         ...prev,
//         [achievement]: true,
//       }))

//       toast({
//         title: "Achievement Unlocked!",
//         description: `You've unlocked the ${achievement} achievement!`,
//         variant: "default",
//       })

//       // Small confetti burst
//       confetti({
//         particleCount: 30,
//         spread: 50,
//         origin: { y: 0.7 },
//       })
//     }
//   }

//   // Navigation functions
//   const nextStep = async () => {
//     try {
//       // Prepare step data
//       const stepData = {
//         profileImage: profileImageUrl || profileImage,
//         selectedCategories,
//         socialHandles,
//         phoneNumber,
//         email,
//         incomeGoal,
//         selectedContentFrequency,
//         selectedBrandCollabs,
//         selectedContentDays,
//         selectedLearningTopics,
//         selectedGrowthChallenges,
//         selectedContentStyle,
//         personalityResult,
//         personalityAnswers,
//         goalStatement,
//         aiAnalysisResult,
//       }

//       // Mark current step as completed
//       await updateOnboardingStep(step, "COMPLETED", stepData)

//       if (step < totalSteps - 1) {
//         // Move to next step
//         setStep(step + 1)

//         // Mark next step as in progress
//         await updateOnboardingStep(step + 1, "IN_PROGRESS")

//         // Unlock achievements based on progress
//         if (step === 1 && profileImage) unlockAchievement("profile")
//         if (step === 2 && selectedCategories.length > 0) unlockAchievement("categories")
//         if (step === 3 && Object.keys(socialHandles).length > 0) unlockAchievement("social")
//         if (step === 5 && isVerified) unlockAchievement("verification")
//         if (step === totalSteps - 2) unlockAchievement("goals")
//       } else {
//         // Final submission
//         setIsSubmitting(true)

//         // Complete the onboarding process
//         const result = await completeOnboarding()

//         if (result.status === 200) {
//           setIsSubmitting(false)
//           triggerConfetti()

//           // Redirect based on user type
//           setTimeout(() => {
//             if (userType === "influencer") {
//               router.push("/influencers/")
//             } else {
//               router.push("/dashboard")
//             }
//           }, 2000)
//         } else {
//           toast({
//             title: "Error",
//             description: "Failed to complete onboarding. Please try again.",
//             variant: "destructive",
//           })
//           setIsSubmitting(false)
//         }
//       }
//     } catch (error) {
//       console.error("Error in nextStep:", error)
//       toast({
//         title: "Error",
//         description: "Something went wrong. Please try again.",
//         variant: "destructive",
//       })
//       setIsSubmitting(false)
//     }
//   }

//   const prevStep = async () => {
//     if (step > 0) {
//       try {
//         // Mark current step as in progress (not completed)
//         await updateOnboardingStep(step, "IN_PROGRESS")

//         // Go back to previous step
//         setStep(step - 1)

//         // Mark previous step as in progress again
//         await updateOnboardingStep(step - 1, "IN_PROGRESS")
//       } catch (error) {
//         console.error("Error in prevStep:", error)
//         toast({
//           title: "Error",
//           description: "Failed to go back. Please try again.",
//           variant: "destructive",
//         })
//       }
//     }
//   }

//   const setUserAndAdvance = async (type: "regular" | "influencer") => {
//     try {
//       setUserType(type)

//       // Initialize onboarding with the selected user type
//       const stepsCount = type === "influencer" ? 10 : 8
//       const result = await initializeOnboarding(type, stepsCount)

//       if (result.status === 200) {
//         setOnboardingInitialized(true)
//         nextStep()
//       } else {
//         toast({
//           title: "Error",
//           description: "Failed to initialize onboarding. Please try again.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error in setUserAndAdvance:", error)
//       toast({
//         title: "Error",
//         description: "Failed to set user type. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   // File handling functions
//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       // Show preview immediately using FileReader
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         setProfileImage(e.target?.result as string)
//       }
//       reader.readAsDataURL(file)

//       // Upload to Vercel Blob
//       try {
//         // Create a FormData object
//         const formData = new FormData()
//         formData.append("file", file)

//         // Upload the file
//         const response = await fetch("/api/uploadprofile", {
//           method: "POST",
//           body: formData,
//         })

//         const result = await response.json()

//         if (result.success) {
//           // Store the URL for database saving
//           setProfileImageUrl(result.url)

//           toast({
//             title: "Image Uploaded",
//             description: "Your profile image has been uploaded successfully.",
//           })

//           // Save this step data
//           await saveOnboardingData(step, {
//             profileImage: result.url,
//           })
//         } else {
//           toast({
//             title: "Upload Failed",
//             description: result.error || "Failed to upload image",
//             variant: "destructive",
//           })
//         }
//       } catch (error) {
//         console.error("Error uploading image:", error)
//         toast({
//           title: "Upload Failed",
//           description: "An error occurred while uploading your image",
//           variant: "destructive",
//         })
//       }
//     }
//   }

//   // Category selection
//   const handleCategoryToggle = async (category: string) => {
//     const newCategories = selectedCategories.includes(category)
//       ? selectedCategories.filter((c) => c !== category)
//       : [...selectedCategories, category]

//     setSelectedCategories(newCategories)

//     // Save this step data
//     await saveOnboardingData(step, {
//       selectedCategories: newCategories,
//     })
//   }

//   // Social handle management
//   const handleSocialHandleChange = async (platform: string, value: string) => {
//     const newHandles = {
//       ...socialHandles,
//       [platform]: value,
//     }

//     setSocialHandles(newHandles)

//     // Save this step data
//     await saveOnboardingData(step, {
//       socialHandles: newHandles,
//     })
//   }

//   // Phone verification
//   // Update the handleVerifyPhone function to use the server action
//   // const handleVerifyPhone = async () => {
//   //   if (!phoneNumber || phoneNumber.length < 10) {
//   //     toast({
//   //       title: "Invalid Phone Number",
//   //       description: "Please enter a valid phone number",
//   //       variant: "destructive",
//   //     })
//   //     return
//   //   }

//   //   setIsVerifying(true)
//   //   try {
//   //     // Call the server action to send the verification code
//   //     const result = await sendVerificationSMS(phoneNumber)

//   //     if (result.status === 200) {
//   //       setExpectedCode(result.data?.code||"12345")
//   //       setVerificationStep("verify")
//   //       toast({
//   //         title: "Verification Code Sent",
//   //         description: `We've sent a code to ${phoneNumber}. For demo purposes, the code is: ${result.data?.code}`,
//   //       })
//   //     } else {
//   //       toast({
//   //         title: "Verification Failed",
//   //         description: result.error || "Could not send verification code",
//   //         variant: "destructive",
//   //       })
//   //     }
//   //   } catch (error) {
//   //     toast({
//   //       title: "Verification Failed",
//   //       description: "Could not send verification code",
//   //       variant: "destructive",
//   //     })
//   //   } finally {
//   //     setIsVerifying(false)
//   //   }
//   // }

//   // // Update the handleCheckVerificationCode function to use the server action
//   // const handleCheckVerificationCode = async () => {
//   //   if (!verificationCode) {
//   //     toast({
//   //       title: "Missing Code",
//   //       description: "Please enter the verification code",
//   //       variant: "destructive",
//   //     })
//   //     return
//   //   }
  
//   //   setIsVerifying(true)
//   //   try {
//   //     // Call the server action to verify the code
//   //     const result = await verifyCode(phoneNumber, verificationCode)
      
//   //     if (result.status === 200) {
//   //       setIsVerified(true)
//   //       toast({
//   //         title: "Phone Verified",
//   //         description: "Your phone number has been verified successfully!",
//   //       })
//   //       nextStep()
//   //     } else {
//   //       toast({
//   //         title: "Invalid Code",
//   //         description: result.error || "The code you entered is incorrect",
//   //         variant: "destructive",
//   //       })
//   //     }
//   //   } catch (error) {
//   //     toast({
//   //       title: "Verification Failed",
//   //       description: "Could not verify code",
//   //       variant: "destructive",
//   //     })
//   //   } finally {
//   //     setIsVerifying(false)
//   //   }
//   // }

  
//   const handleVerifyPhone = async () => {
//     if (!phoneNumber || phoneNumber.length < 10) {
//       toast({
//         title: "Invalid Phone Number",
//         description: "Please enter a valid phone number",
//         variant: "destructive",
//       })
//       return
//     }

//     setIsVerifying(true)
//     try {
//       // Call the server action to send the verification code
//       const result = await sendVerificationSMS(phoneNumber)

//       if (result.status === 200) {
//         setExpectedCode(result.data?.code||"833978")
//         setVerificationStep("verify")

//         // Save this step data
//         await saveOnboardingData(step, {
//           phoneNumber,
//         })

//         toast({
//           title: "Verification Code Sent",
//           description: `We've sent a code to ${phoneNumber}. For demo purposes, the code is: ${result.data?.code}`,
//         })
//       } else {
//         toast({
//           title: "Verification Failed",
//           description: result.error || "Could not send verification code",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       toast({
//         title: "Verification Failed",
//         description: "Could not send verification code",
//         variant: "destructive",
//       })
//     } finally {
//       setIsVerifying(false)
//     }
//   }

//   const handleCheckVerificationCode = async () => {
//     if (!verificationCode) {
//       toast({
//         title: "Missing Code",
//         description: "Please enter the verification code",
//         variant: "destructive",
//       })
//       return
//     }

//     setIsVerifying(true)
//     try {
//       // For demo purposes, we'll check against the expected code directly
//       const isValid = verificationCode === expectedCode

//       if (isValid) {
//         setIsVerified(true)

//         // Save this step data
//         await saveOnboardingData(step, {
//           phoneNumber,
//           verified: true,
//         })

//         toast({
//           title: "Phone Verified",
//           description: "Your phone number has been verified successfully!",
//         })
//         nextStep()
//       } else {
//         toast({
//           title: "Invalid Code",
//           description: "The code you entered is incorrect",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       toast({
//         title: "Verification Failed",
//         description: "Could not verify code",
//         variant: "destructive",
//       })
//     } finally {
//       setIsVerifying(false)
//     }
//   }

//   // Income goal management
//   const handleIncomeRangeSelect = async (index: number) => {
//     setSelectedIncomeRange(index)
//     const newIncomeGoal = incomeRanges[index].min + (incomeRanges[index].max - incomeRanges[index].min) / 2
//     setIncomeGoal(newIncomeGoal)

//     // Save this step data
//     await saveOnboardingData(step, {
//       incomeGoal: newIncomeGoal,
//       selectedIncomeRange: index,
//     })
//   }

//   const handleIncomeSliderChange = async (value: number[]) => {
//     setIncomeGoal(value[0])

//     // Save this step data
//     await saveOnboardingData(step, {
//       incomeGoal: value[0],
//     })
//   }

//   const getCurrentIncomeRange = () => {
//     return incomeRanges.find((range) => incomeGoal >= range.min && incomeGoal <= range.max) || incomeRanges[0]
//   }

//   // Card flipping
//   const toggleCardFlip = (index: number) => {
//     setFlippedCards((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
//   }

//   // Content days selection
//   const toggleContentDay = async (day: number) => {
//     const newSelectedDays = selectedContentDays.includes(day)
//       ? selectedContentDays.filter((d) => d !== day)
//       : [...selectedContentDays, day]

//     setSelectedContentDays(newSelectedDays)

//     // Save this step data
//     await saveOnboardingData(step, {
//       selectedContentDays: newSelectedDays,
//     })
//   }

//   // Learning topics selection
//   const toggleLearningTopic = async (topic: string) => {
//     const newTopics = selectedLearningTopics.includes(topic)
//       ? selectedLearningTopics.filter((t) => t !== topic)
//       : [...selectedLearningTopics, topic]

//     setSelectedLearningTopics(newTopics)

//     // Save this step data
//     await saveOnboardingData(step, {
//       selectedLearningTopics: newTopics,
//     })
//   }

//   // Growth challenges selection
//   const toggleGrowthChallenge = async (challenge: string) => {
//     const newChallenges = selectedGrowthChallenges.includes(challenge)
//       ? selectedGrowthChallenges.filter((c) => c !== challenge)
//       : [...selectedGrowthChallenges, challenge]

//     setSelectedGrowthChallenges(newChallenges)

//     // Save this step data
//     await saveOnboardingData(step, {
//       selectedGrowthChallenges: newChallenges,
//     })
//   }

//   // Brand collab selection
//   const toggleBrandCollab = async (collab: string) => {
//     const newCollabs = selectedBrandCollabs.includes(collab)
//       ? selectedBrandCollabs.filter((c) => c !== collab)
//       : [...selectedBrandCollabs, collab]

//     setSelectedBrandCollabs(newCollabs)

//     // Save this step data
//     await saveOnboardingData(step, {
//       selectedBrandCollabs: newCollabs,
//     })
//   }

//   // Personality quiz
//   const handlePersonalityAnswer = async (question: string, answer: string) => {
//     const newAnswers = {
//       ...personalityAnswers,
//       [question]: answer,
//     }

//     setPersonalityAnswers(newAnswers)

//     // Simple algorithm to determine personality type
//     setTimeout(async () => {
//       const answers = newAnswers
//       const counts: Record<string, number> = {
//         Creator: 0,
//         Connector: 0,
//         Educator: 0,
//         Trendsetter: 0,
//       }

//       Object.values(answers).forEach((a) => {
//         if (a.includes("creative") || a.includes("original")) counts.Creator++
//         if (a.includes("people") || a.includes("community")) counts.Connector++
//         if (a.includes("teach") || a.includes("inform")) counts.Educator++
//         if (a.includes("trend") || a.includes("new")) counts.Trendsetter++
//       })

//       // Find the highest score
//       let maxType = "Creator"
//       let maxCount = 0

//       Object.entries(counts).forEach(([type, count]) => {
//         if (count > maxCount) {
//           maxType = type
//           maxCount = count
//         }
//       })

//       setPersonalityResult(maxType)

//       // Save this step data
//       await saveOnboardingData(step, {
//         personalityAnswers: newAnswers,
//         personalityResult: maxType,
//       })
//     }, 300)
//   }

//   // Helper functions
//   const getProgressColor = () => {
//     if (progress < 30) return "bg-red-500"
//     if (progress < 70) return "bg-yellow-500"
//     return "bg-green-500"
//   }

//   // Render the questionnaire
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
//       <Card className="w-full max-w-md overflow-hidden border-none bg-card shadow-lg">
//         <CardContent className="p-0">
//           <div className="bg-primary/10 p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-primary">Welcome to Yazil</h1>
//                 <p className="text-muted-foreground">Let&apos;s set up your experience</p>
//               </div>

//               {showMascot && (
//                 <div className="relative">
//                   <Mascot emotion={mascotEmotion} />
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-background p-0"
//                     onClick={() => setShowMascot(false)}
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 </div>
//               )}
//             </div>

//             <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-primary/10">
//               <motion.div
//                 className={cn("h-full rounded-full", getProgressColor())}
//                 initial={{ width: 0 }}
//                 animate={{ width: `${progress}%` }}
//                 transition={{ duration: 0.5 }}
//               />
//             </div>

//             <div className="mt-1 flex justify-between text-xs text-muted-foreground">
//               <span>
//                 Step {step + 1} of {totalSteps}
//               </span>
//               <span>{Math.round(progress)}% Complete</span>
//             </div>

//             {/* Save progress button */}
//             <div className="mt-2 flex items-center justify-end gap-2">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="h-7 gap-1 text-xs"
//                 onClick={saveProgress}
//                 disabled={isSaving || !onboardingInitialized}
//               >
//                 {isSaving ? (
//                   <>
//                     <Loader2 className="h-3 w-3 animate-spin" />
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="h-3 w-3" />
//                     Save Progress
//                   </>
//                 )}
//               </Button>

//               {lastSaved && (
//                 <span className="text-xs text-muted-foreground">Last saved: {lastSaved.toLocaleTimeString()}</span>
//               )}
//             </div>
//           </div>

//           <div className="min-h-[500px] p-6">
//             <AnimatePresence mode="wait">
//               {/* Step 1: User Type Selection */}
//               {step === 0 && (
//                 <motion.div
//                   key="step0"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Tell us about yourself</h2>
//                   <p className="text-muted-foreground">Which option best describes you?</p>

//                   <div className="grid gap-4">
//                     <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                       <Button
//                         variant="outline"
//                         className="flex h-auto w-full items-start justify-start gap-4 p-4 text-left"
//                         onClick={() => setUserAndAdvance("regular")}
//                       >
//                         <div className="rounded-full bg-primary/10 p-2">
//                           <Users className="h-6 w-6 text-primary" />
//                         </div>
//                         <div className="flex-1">
//                           <div className="font-medium">Regular User</div>
//                           <div className="text-sm text-muted-foreground">I want to grow my personal account</div>
//                         </div>
//                         <ChevronRight className="h-5 w-5 text-muted-foreground" />
//                       </Button>
//                     </motion.div>

//                     <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                       <Button
//                         variant="outline"
//                         className="flex h-auto w-full items-start justify-start gap-4 p-4 text-left"
//                         onClick={() => setUserAndAdvance("influencer")}
//                       >
//                         <div className="rounded-full bg-primary/10 p-2">
//                           <Star className="h-6 w-6 text-primary" />
//                         </div>
//                         <div className="flex-1">
//                           <div className="font-medium">Influencer</div>
//                           <div className="text-sm text-muted-foreground">
//                             I have a significant following and brand partnerships
//                           </div>
//                         </div>
//                         <ChevronRight className="h-5 w-5 text-muted-foreground" />
//                       </Button>
//                     </motion.div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 2: Profile Picture */}
//               {step === 1 && (
//                 <motion.div
//                   key="step1"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Add a profile picture</h2>
//                   <p className="text-muted-foreground">This will be displayed on your profile and dashboard</p>

//                   <div className="flex flex-col items-center justify-center space-y-4">
//                     <div className="relative">
//                       <Avatar className="h-32 w-32 border-2 border-primary/20">
//                         {profileImage ? (
//                           <AvatarImage src={profileImage} alt="Profile" />
//                         ) : (
//                           <AvatarFallback className="bg-primary/10 text-2xl">
//                             {userType === "influencer" ? "INF" : "USR"}
//                           </AvatarFallback>
//                         )}
//                       </Avatar>
//                       <Button
//                         size="icon"
//                         variant="secondary"
//                         className="absolute bottom-0 right-0 rounded-full"
//                         onClick={() => fileInputRef.current?.click()}
//                       >
//                         <Camera className="h-4 w-4" />
//                       </Button>
//                       <input
//                         type="file"
//                         ref={fileInputRef}
//                         className="hidden"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                       />
//                     </div>

//                     <div className="text-center text-sm text-muted-foreground">
//                       {profileImage ? (
//                         <span className="flex items-center gap-1 text-green-500">
//                           <Check className="h-4 w-4" /> Image uploaded
//                         </span>
//                       ) : (
//                         "Click to upload an image"
//                       )}
//                     </div>

//                     <Button onClick={nextStep} className="mt-4 w-full" disabled={isSubmitting}>
//                       {profileImage ? "Continue" : "Skip for now"}
//                     </Button>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 3: Content Categories */}
//               {step === 2 && (
//                 <motion.div
//                   key="step2"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Content Categories</h2>
//                   <p className="text-muted-foreground">Select your primary content categories (up to 5)</p>

//                   <div className="grid grid-cols-3 gap-3">
//                     {contentCategories.map((category) => (
//                       <motion.div key={category.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                         <Button
//                           variant={selectedCategories.includes(category.name) ? "default" : "outline"}
//                           className={cn(
//                             "flex h-auto w-full flex-col items-center justify-center gap-2 p-3 text-center",
//                             selectedCategories.includes(category.name) ? "border-primary" : "",
//                           )}
//                           onClick={() => handleCategoryToggle(category.name)}
//                           disabled={!selectedCategories.includes(category.name) && selectedCategories.length >= 5}
//                         >
//                           <div
//                             className={cn("flex h-10 w-10 items-center justify-center rounded-full", category.color)}
//                           >
//                             <span className="text-xl">{category.icon}</span>
//                           </div>
//                           <span className="text-xs font-medium">{category.name}</span>
//                         </Button>
//                       </motion.div>
//                     ))}
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-muted-foreground">{selectedCategories.length}/5 selected</span>
//                     <Button onClick={nextStep} disabled={selectedCategories.length === 0 || isSubmitting}>
//                       Continue
//                     </Button>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 4: Social Media Handles */}
//               {step === 3 && (
//                 <motion.div
//                   key="step3"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Social Media Profiles</h2>
//                   <p className="text-muted-foreground">Add your social media handles</p>

//                   <div className="space-y-4">
//                     {socialPlatforms.map((platform) => (
//                       <div key={platform.name} className="space-y-2">
//                         <Label className="flex items-center gap-2">
//                           <div className={cn("flex h-5 w-5 items-center justify-center rounded-md", platform.color)}>
//                             {platform.icon}
//                           </div>
//                           {platform.name}
//                         </Label>
//                         <div className="flex items-center gap-2">
//                           <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
//                             <AtSign className="h-4 w-4 text-muted-foreground" />
//                           </div>
//                           <Input
//                             placeholder={platform.placeholder}
//                             value={socialHandles[platform.name] || ""}
//                             onChange={(e) => handleSocialHandleChange(platform.name, e.target.value)}
//                             className="flex-1"
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* AI Analysis for Influencers */}
//                   {userType === "influencer" && socialHandles.Instagram && (
//                     <div className="mt-4">
//                       <AiProfileAnalysis handle={socialHandles.Instagram} onComplete={setAiAnalysisResult} />
//                     </div>
//                   )}

//                   <Button
//                     onClick={nextStep}
//                     className="w-full"
//                     disabled={Object.keys(socialHandles).length === 0 || isSubmitting}
//                   >
//                     {Object.keys(socialHandles).length > 0 ? "Continue" : "Skip for now"}
//                   </Button>
//                 </motion.div>
//               )}

//               {/* Step 5: Email */}
//               {step === 4 && (
//                 <motion.div
//                   key="step4"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Contact Information</h2>
//                   <p className="text-muted-foreground">Add your email address</p>

//                   <div className="space-y-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="email" className="flex items-center gap-2">
//                         <Mail className="h-4 w-4 text-primary" />
//                         Email Address
//                       </Label>
//                       <Input
//                         id="email"
//                         type="email"
//                         placeholder="your@email.com"
//                         value={email}
//                         onChange={(e) => {
//                           setEmail(e.target.value)
//                           saveOnboardingData(step, { email: e.target.value })
//                         }}
//                       />
//                     </div>
//                   </div>

//                   <Button
//                     onClick={nextStep}
//                     className="w-full"
//                     disabled={!email || !email.includes("@") || isSubmitting}
//                   >
//                     Continue
//                   </Button>
//                 </motion.div>
//               )}

//               {/* Step 6: Phone Verification */}
//               {step === 5 && (
//                 <motion.div
//                   key="step5"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Phone Verification</h2>
//                   <p className="text-muted-foreground">
//                     {verificationStep === "input"
//                       ? "Add and verify your phone number"
//                       : "Enter the verification code sent to your phone"}
//                   </p>

//                   <div className="space-y-6">
//                     {verificationStep === "input" ? (
//                       <div className="space-y-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="phone" className="flex items-center gap-2">
//                             <Phone className="h-4 w-4 text-primary" />
//                             Phone Number
//                           </Label>
//                           <div className="flex items-center gap-2">
//                             <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
//                               <Smartphone className="h-4 w-4 text-muted-foreground" />
//                             </div>
//                             <Input
//                               id="phone"
//                               type="tel"
//                               placeholder="+1 (555) 123-4567"
//                               value={phoneNumber}
//                               onChange={(e) => setPhoneNumber(e.target.value)}
//                               className="flex-1"
//                             />
//                           </div>
//                         </div>

//                         <Button onClick={handleVerifyPhone} className="w-full" disabled={!phoneNumber || isVerifying}>
//                           {isVerifying ? (
//                             <>
//                               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                               Sending Code...
//                             </>
//                           ) : (
//                             "Send Verification Code"
//                           )}
//                         </Button>
//                       </div>
//                     ) : (
//                       <div className="space-y-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="code" className="flex items-center gap-2">
//                             <Lock className="h-4 w-4 text-primary" />
//                             Verification Code
//                           </Label>
//                           <div className="flex items-center gap-2">
//                             <Input
//                               id="code"
//                               type="text"
//                               placeholder="Enter 6-digit code"
//                               value={verificationCode}
//                               onChange={(e) => setVerificationCode(e.target.value)}
//                               className="flex-1 text-center text-xl tracking-widest"
//                               maxLength={6}
//                             />
//                           </div>
//                           <p className="text-xs text-muted-foreground">
//                             For demo purposes, the code is: <span className="font-mono font-bold">{expectedCode}</span>
//                           </p>
//                         </div>

//                         <div className="flex gap-2">
//                           <Button
//                             variant="outline"
//                             onClick={() => setVerificationStep("input")}
//                             className="flex-1"
//                             disabled={isVerifying}
//                           >
//                             Back
//                           </Button>
//                           <Button
//                             onClick={handleCheckVerificationCode}
//                             className="flex-1"
//                             disabled={!verificationCode || verificationCode.length < 6 || isVerifying}
//                           >
//                             {isVerifying ? (
//                               <>
//                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                 Verifying...
//                               </>
//                             ) : (
//                               "Verify Code"
//                             )}
//                           </Button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 7: Content Strategy (Influencer) or Learning Goals (Regular) */}
//               {step === 6 && (
//                 <motion.div
//                   key="step6"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   {userType === "influencer" ? (
//                     <>
//                       <h2 className="text-xl font-semibold">Content Strategy</h2>
//                       <p className="text-muted-foreground">Tell us about your content creation approach</p>

//                       <div className="space-y-6">
//                         <div className="space-y-2">
//                           <Label>How often do you post content?</Label>
//                           <RadioGroup
//                             value={selectedContentFrequency}
//                             onValueChange={(value) => {
//                               setSelectedContentFrequency(value)
//                               saveOnboardingData(step, { selectedContentFrequency: value })
//                             }}
//                           >
//                             <div className="grid grid-cols-2 gap-2">
//                               {contentFrequencies.map((frequency) => (
//                                 <div key={frequency} className="flex items-center space-x-2">
//                                   <RadioGroupItem value={frequency} id={`frequency-${frequency}`} />
//                                   <Label htmlFor={`frequency-${frequency}`} className="text-sm">
//                                     {frequency}
//                                   </Label>
//                                 </div>
//                               ))}
//                             </div>
//                           </RadioGroup>
//                         </div>

//                         <div className="space-y-2">
//                           <Label>Which days do you typically post?</Label>
//                           <ContentCalendar selectedDays={selectedContentDays} onSelectDay={toggleContentDay} />
//                         </div>

//                         <div className="space-y-2">
//                           <Label>What types of brand collaborations do you prefer?</Label>
//                           <div className="grid grid-cols-2 gap-2">
//                             {brandCollabTypes.map((collab) => (
//                               <div key={collab} className="flex items-center space-x-2">
//                                 <Checkbox
//                                   id={`collab-${collab}`}
//                                   checked={selectedBrandCollabs.includes(collab)}
//                                   onCheckedChange={() => toggleBrandCollab(collab)}
//                                 />
//                                 <Label htmlFor={`collab-${collab}`} className="text-sm">
//                                   {collab}
//                                 </Label>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <h2 className="text-xl font-semibold">Learning Goals</h2>
//                       <p className="text-muted-foreground">What would you like to learn about?</p>

//                       <div className="space-y-6">
//                         <div className="space-y-2">
//                           <Label>Select topics you&apos;re interested in learning:</Label>
//                           <div className="grid grid-cols-2 gap-2">
//                             {learningTopics.map((topic) => (
//                               <div key={topic} className="flex items-center space-x-2">
//                                 <Checkbox
//                                   id={`topic-${topic}`}
//                                   checked={selectedLearningTopics.includes(topic)}
//                                   onCheckedChange={() => toggleLearningTopic(topic)}
//                                 />
//                                 <Label htmlFor={`topic-${topic}`} className="text-sm">
//                                   {topic}
//                                 </Label>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         <div className="space-y-2">
//                           <Label>What are your biggest growth challenges?</Label>
//                           <div className="grid grid-cols-2 gap-2">
//                             {growthChallenges.map((challenge) => (
//                               <div key={challenge} className="flex items-center space-x-2">
//                                 <Checkbox
//                                   id={`challenge-${challenge}`}
//                                   checked={selectedGrowthChallenges.includes(challenge)}
//                                   onCheckedChange={() => toggleGrowthChallenge(challenge)}
//                                 />
//                                 <Label htmlFor={`challenge-${challenge}`} className="text-sm">
//                                   {challenge}
//                                 </Label>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         <div className="space-y-2">
//                           <Label>Tell us your goals in your own words:</Label>
//                           <div className="flex items-center gap-2">
//                             <Textarea
//                               placeholder="I want to grow my account and..."
//                               value={goalStatement}
//                               onChange={(e) => {
//                                 setGoalStatement(e.target.value)
//                                 saveOnboardingData(step, { goalStatement: e.target.value })
//                               }}
//                               className="min-h-[80px] flex-1"
//                             />
//                             <TooltipProvider>
//                               <Tooltip>
//                                 <TooltipTrigger asChild>
//                                   <Button
//                                     variant="outline"
//                                     size="icon"
//                                     className="h-10 w-10 shrink-0"
//                                     onClick={() => {
//                                       setGoalStatement("")
//                                       toast({
//                                         title: "Voice Input Ready",
//                                         description: "Click the microphone to start recording",
//                                       })
//                                     }}
//                                   >
//                                     <Mic className="h-4 w-4" />
//                                   </Button>
//                                 </TooltipTrigger>
//                                 <TooltipContent>
//                                   <p>Use voice input</p>
//                                 </TooltipContent>
//                               </Tooltip>
//                             </TooltipProvider>
//                           </div>
//                         </div>
//                       </div>
//                     </>
//                   )}

//                   <Button onClick={nextStep} className="w-full" disabled={isSubmitting}>
//                     Continue
//                   </Button>
//                 </motion.div>
//               )}

//               {/* Step 7: Content Style (Influencer) or Personality Quiz (Regular) */}
//               {step === 7 && (
//                 <motion.div
//                   key="step7"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   {userType === "influencer" ? (
//                     <>
//                       <h2 className="text-xl font-semibold">Content Style</h2>
//                       <p className="text-muted-foreground">Select your preferred aesthetic</p>

//                       <div className="grid grid-cols-2 gap-4">
//                         {contentStyles.map((style, index) => (
//                           <motion.div key={style.name} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
//                             <Button
//                               variant={selectedContentStyle === style.name ? "default" : "outline"}
//                               className={cn(
//                                 "flex h-auto w-full flex-col items-center justify-center gap-2 p-4 text-center",
//                                 selectedContentStyle === style.name ? "border-primary" : "",
//                               )}
//                               onClick={() => {
//                                 setSelectedContentStyle(style.name)
//                                 saveOnboardingData(step, { selectedContentStyle: style.name })
//                               }}
//                             >
//                               <span className="text-2xl">{style.icon}</span>
//                               <div>
//                                 <div className="font-medium">{style.name}</div>
//                                 <div className="text-xs text-muted-foreground">{style.description}</div>
//                               </div>
//                             </Button>
//                           </motion.div>
//                         ))}
//                       </div>

//                       <div className="space-y-4">
//                         <h3 className="font-medium">Visual Mood Board</h3>
//                         <div className="grid grid-cols-3 gap-2">
//                           {[1, 2, 3, 4, 5, 6].map((i) => (
//                             <div key={i} className="group relative aspect-square overflow-hidden rounded-md bg-muted">
//                               <div className="absolute inset-0 flex items-center justify-center">
//                                 <ImageIcon className="h-6 w-6 text-muted-foreground" />
//                               </div>
//                               <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
//                                 <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
//                                   <Plus className="h-4 w-4" />
//                                 </Button>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <h2 className="text-xl font-semibold">Content Creator Personality</h2>
//                       <p className="text-muted-foreground">Let&apos;s discover your content creator type</p>

//                       <div className="space-y-6">
//                         {personalityResult ? (
//                           <div className="space-y-4">
//                             <div className="rounded-lg border bg-card p-4">
//                               <div className="flex items-center gap-3">
//                                 <div className="rounded-full bg-primary/10 p-2">
//                                   {personalityTypes.find((p) => p.type === personalityResult)?.icon || (
//                                     <Star className="h-5 w-5 text-primary" />
//                                   )}
//                                 </div>
//                                 <div>
//                                   <h3 className="font-semibold">You&apos;re a {personalityResult}!</h3>
//                                   <p className="text-sm text-muted-foreground">
//                                     {personalityTypes.find((p) => p.type === personalityResult)?.description}
//                                   </p>
//                                 </div>
//                               </div>

//                               <div className="mt-4 space-y-3">
//                                 <div>
//                                   <h4 className="text-sm font-medium">Your Strengths:</h4>
//                                   <ul className="mt-1 list-inside list-disc text-sm text-muted-foreground">
//                                     {personalityTypes
//                                       .find((p) => p.type === personalityResult)
//                                       ?.strengths.map((strength, i) => (
//                                         <li key={i}>{strength}</li>
//                                       ))}
//                                   </ul>
//                                 </div>

//                                 <div>
//                                   <h4 className="text-sm font-medium">Recommended Strategies:</h4>
//                                   <ul className="mt-1 list-inside list-disc text-sm text-muted-foreground">
//                                     {personalityTypes
//                                       .find((p) => p.type === personalityResult)
//                                       ?.strategies.map((strategy, i) => (
//                                         <li key={i}>{strategy}</li>
//                                       ))}
//                                   </ul>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="flex justify-center">
//                               <Button variant="outline" size="sm" onClick={() => setPersonalityResult("")}>
//                                 Retake Quiz
//                               </Button>
//                             </div>
//                           </div>
//                         ) : (
//                           <div className="space-y-4">
//                             <div className="space-y-3">
//                               <div className="space-y-2">
//                                 <Label>When creating content, I prefer to:</Label>
//                                 <RadioGroup
//                                   value={personalityAnswers["q1"] || ""}
//                                   onValueChange={(value) => handlePersonalityAnswer("q1", value)}
//                                 >
//                                   <div className="space-y-2">
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="express my creative ideas" id="q1-a" />
//                                       <Label htmlFor="q1-a">Express my creative ideas</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="connect with my community" id="q1-b" />
//                                       <Label htmlFor="q1-b">Connect with my community</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="teach others something new" id="q1-c" />
//                                       <Label htmlFor="q1-c">Teach others something new</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="try the latest trends" id="q1-d" />
//                                       <Label htmlFor="q1-d">Try the latest trends</Label>
//                                     </div>
//                                   </div>
//                                 </RadioGroup>
//                               </div>

//                               <div className="space-y-2">
//                                 <Label>I get the most satisfaction from:</Label>
//                                 <RadioGroup
//                                   value={personalityAnswers["q2"] || ""}
//                                   onValueChange={(value) => handlePersonalityAnswer("q2", value)}
//                                 >
//                                   <div className="space-y-2">
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="creating original content" id="q2-a" />
//                                       <Label htmlFor="q2-a">Creating original content</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="building a community of people" id="q2-b" />
//                                       <Label htmlFor="q2-b">Building a community of people</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="informing and educating others" id="q2-c" />
//                                       <Label htmlFor="q2-c">Informing and educating others</Label>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                       <RadioGroupItem value="discovering new trends" id="q2-d" />
//                                       <Label htmlFor="q2-d">Discovering new trends</Label>
//                                     </div>
//                                   </div>
//                                 </RadioGroup>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </>
//                   )}

//                   <Button
//                     onClick={nextStep}
//                     className="w-full"
//                     disabled={isSubmitting || (userType === "influencer" && !selectedContentStyle)}
//                   >
//                     Continue
//                   </Button>
//                 </motion.div>
//               )}

//               {/* Step 8: Income Goals */}
//               {step === 8 && (
//                 <motion.div
//                   key="step8"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Income Goals</h2>
//                   <p className="text-muted-foreground">What are your monthly income goals?</p>

//                   <div className="space-y-6">
//                     <Tabs defaultValue="slider" className="w-full">
//                       <TabsList className="grid w-full grid-cols-2">
//                         <TabsTrigger value="slider">Slider</TabsTrigger>
//                         <TabsTrigger value="preset">Preset Ranges</TabsTrigger>
//                       </TabsList>
//                       <TabsContent value="slider" className="space-y-4 pt-4">
//                         <div className="space-y-6">
//                           <div className="flex flex-col items-center justify-center">
//                             <div className="text-3xl font-bold text-primary">${incomeGoal.toLocaleString()}</div>
//                             <div className="text-sm text-muted-foreground">per month</div>
//                           </div>

//                           <div className="px-2">
//                             <Slider
//                               defaultValue={[incomeGoal]}
//                               max={userType === "influencer" ? 100000 : 20000}
//                               step={100}
//                               onValueChange={handleIncomeSliderChange}
//                             />

//                             <div className="flex justify-between text-xs text-muted-foreground">
//                               <span>$0</span>
//                               <span>${userType === "influencer" ? "100,000" : "20,000"}+</span>
//                             </div>
//                           </div>

//                           <div className="rounded-lg border bg-card p-4 shadow-sm">
//                             <div className="flex items-center gap-2">
//                               <Badge variant="outline" className="bg-primary/10 text-primary">
//                                 {getCurrentIncomeRange().level}
//                               </Badge>
//                               <span className="text-sm font-medium">{getCurrentIncomeRange().label}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </TabsContent>

//                       <TabsContent value="preset" className="space-y-4 pt-4">
//                         <RadioGroup
//                           value={selectedIncomeRange.toString()}
//                           onValueChange={(value) => handleIncomeRangeSelect(Number.parseInt(value))}
//                           className="space-y-3"
//                         >
//                           {incomeRanges.map((range, index) => (
//                             <div key={index} className="flex items-center space-x-2">
//                               <RadioGroupItem value={index.toString()} id={`range-${index}`} />
//                               <Label
//                                 htmlFor={`range-${index}`}
//                                 className="flex flex-1 cursor-pointer items-center justify-between rounded-md border p-3 hover:bg-accent"
//                               >
//                                 <div className="flex items-center gap-2">
//                                   <DollarSign className="h-4 w-4 text-primary" />
//                                   <span>{range.label}</span>
//                                 </div>
//                                 <Badge variant="outline">{range.level}</Badge>
//                               </Label>
//                             </div>
//                           ))}
//                         </RadioGroup>
//                       </TabsContent>
//                     </Tabs>

//                     {/* Income Projection */}
//                     <IncomeProjection
//                       currentIncome={userType === "influencer" ? 2000 : 500}
//                       targetIncome={incomeGoal}
//                       months={12}
//                     />

//                     <div className="flex items-center space-x-2">
//                       <Checkbox
//                         id="terms"
//                         checked={acceptedTerms}
//                         onCheckedChange={(checked) => {
//                           const isChecked = checked as boolean
//                           setAcceptedTerms(isChecked)
//                           saveOnboardingData(step, { acceptedTerms: isChecked })
//                         }}
//                       />
//                       <Label htmlFor="terms" className="text-sm">
//                         I understand this is my target goal and actual results may vary
//                       </Label>
//                     </div>

//                     <Button onClick={nextStep} className="w-full" disabled={!acceptedTerms || isSubmitting}>
//                       {userType === "influencer" && step < 9 ? "Continue" : "Complete Setup"}
//                     </Button>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 9: Achievements (Influencer only) */}
//               {userType === "influencer" && step === 9 && (
//                 <motion.div
//                   key="step9"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-xl font-semibold">Your Achievements</h2>
//                   <p className="text-muted-foreground">Unlock achievements as you grow</p>

//                   <div className="grid grid-cols-3 gap-3">
//                     <AchievementBadge
//                       title="Profile Setup"
//                       icon={<User className="h-5 w-5 text-primary" />}
//                       isUnlocked={achievements.profile}
//                       onUnlock={() => unlockAchievement("profile")}
//                     />
//                     <AchievementBadge
//                       title="Categories"
//                       icon={<Layers className="h-5 w-5 text-primary" />}
//                       isUnlocked={achievements.categories}
//                       onUnlock={() => unlockAchievement("categories")}
//                     />
//                     <AchievementBadge
//                       title="Social Connect"
//                       icon={<Share2 className="h-5 w-5 text-primary" />}
//                       isUnlocked={achievements.social}
//                       onUnlock={() => unlockAchievement("social")}
//                     />
//                     <AchievementBadge
//                       title="Verified"
//                       icon={<BadgeCheck className="h-5 w-5 text-primary" />}
//                       isUnlocked={achievements.verification}
//                       onUnlock={() => unlockAchievement("verification")}
//                     />
//                     <AchievementBadge
//                       title="Goal Setter"
//                       icon={<Target className="h-5 w-5 text-primary" />}
//                       isUnlocked={achievements.goals}
//                       onUnlock={() => unlockAchievement("goals")}
//                     />
//                     <AchievementBadge
//                       title="First Post"
//                       icon={<ImageIcon className="h-5 w-5 text-primary" />}
//                       isUnlocked={false}
//                     />
//                   </div>

//                   <div className="rounded-lg border bg-card p-4">
//                     <h3 className="font-medium">Referral Program</h3>
//                     <p className="mt-1 text-sm text-muted-foreground">Invite other influencers and earn rewards</p>

//                     <div className="mt-3 flex items-center gap-2">
//                       <Input value="https://instagrowth.com/ref/yourname" readOnly className="flex-1 bg-muted" />
//                       <Button variant="outline" size="sm" className="shrink-0">
//                         <Copy className="mr-1 h-3 w-3" />
//                         Copy
//                       </Button>
//                     </div>
//                   </div>

//                   <Button onClick={nextStep} className="w-full" disabled={isSubmitting}>
//                     Complete Setup
//                   </Button>
//                 </motion.div>
//               )}

//               {/* Final Step: Completion */}
//               {((userType === "regular" && step === 9) || (userType === "influencer" && step === 10)) && (
//                 <motion.div
//                   key="stepFinal"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <div className="flex flex-col items-center justify-center py-6 text-center">
//                     {isSubmitting ? (
//                       <div className="flex flex-col items-center justify-center space-y-4">
//                         <Loader2 className="h-12 w-12 animate-spin text-primary" />
//                         <h2 className="text-xl font-semibold">Setting up your account...</h2>
//                         <p className="text-muted-foreground">This will only take a moment</p>
//                       </div>
//                     ) : (
//                       <>
//                         <motion.div
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           transition={{
//                             type: "spring",
//                             stiffness: 260,
//                             damping: 20,
//                             delay: 0.1,
//                           }}
//                           className="mb-6 rounded-full bg-green-500/10 p-4"
//                         >
//                           <Check className="h-12 w-12 text-green-500" />
//                         </motion.div>
//                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
//                           <h2 className="text-2xl font-bold">You&apos;re all set!</h2>
//                           <p className="mt-2 text-muted-foreground">
//                             {userType === "influencer"
//                               ? "Your influencer dashboard is ready."
//                               : "Your dashboard is ready."}
//                           </p>

//                           <div className="mt-6 space-y-4">
//                             <div className="rounded-lg border bg-card p-4">
//                               <h3 className="font-medium">Account Summary</h3>
//                               <div className="mt-2 space-y-2 text-sm">
//                                 <div className="flex justify-between">
//                                   <span className="text-muted-foreground">Account Type:</span>
//                                   <span className="font-medium">
//                                     {userType === "influencer" ? "Influencer" : "Regular User"}
//                                   </span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                   <span className="text-muted-foreground">Categories:</span>
//                                   <span className="font-medium">{selectedCategories.length} selected</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                   <span className="text-muted-foreground">Monthly Goal:</span>
//                                   <span className="font-medium">${incomeGoal.toLocaleString()}</span>
//                                 </div>
//                                 {userType === "influencer" && (
//                                   <div className="flex justify-between">
//                                     <span className="text-muted-foreground">Content Style:</span>
//                                     <span className="font-medium">{selectedContentStyle}</span>
//                                   </div>
//                                 )}
//                                 {userType === "regular" && personalityResult && (
//                                   <div className="flex justify-between">
//                                     <span className="text-muted-foreground">Creator Type:</span>
//                                     <span className="font-medium">{personalityResult}</span>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>

//                             <Button
//                               onClick={() => {
//                                 if (userType === "influencer") {
//                                   router.push("/influencer-dashboard")
//                                 } else {
//                                   router.push("/dashboard")
//                                 }
//                               }}
//                               className="w-full"
//                             >
//                               Go to Dashboard
//                               <ChevronRight className="ml-2 h-4 w-4" />
//                             </Button>
//                           </div>
//                         </motion.div>
//                       </>
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {step > 0 && step < (userType === "influencer" ? 10 : 9) && (
//             <div className="flex items-center justify-between border-t p-4">
//               <Button variant="ghost" size="sm" onClick={prevStep} disabled={isSubmitting}>
//                 Back
//               </Button>
//               {step !== 5 && (
//                 <Button size="sm" onClick={nextStep} disabled={isSubmitting}>
//                   Skip
//                 </Button>
//               )}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// // Missing components that were used in the code
// function Play(props: any) {
//   return <Video {...props} />
// }

// function User(props: any) {
//   return <Users {...props} />
// }

// function Layers(props: any) {
//   return <Palette {...props} />
// }

// function BadgeCheck(props: any) {
//   return <Check {...props} />
// }

// function Target(props: any) {
//   return <Flag {...props} />
// }

// function Copy(props: any) {
//   return <Paperclip {...props} />
// }

// function X(props: any) {
//   return <AlertCircle {...props} />
// }



"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  AlertCircle,
  AtSign,
  BookOpen,
  Camera,
  Check,
  ChevronRight,
  DollarSign,
  Flag,
  ImageIcon,
  Instagram,
  Loader2,
  Lock,
  Mail,
  MessageCircle,
  Mic,
  Palette,
  Paperclip,
  Phone,
  Plus,
  Save,
  Share2,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Video,
  Wand2,
  UserIcon,
  LayersIcon,
  BadgeCheckIcon,
  TargetIcon,
  CopyIcon,
  XIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import confetti from "canvas-confetti"

// Import the correct server actions
import {
  initializeOnboarding,
  updateOnboardingStep,
  saveOnboardingData,
  completeOnboarding,
} from "@/actions/onboarding"

// Import the SMS verification server actions
import { sendVerificationSMS } from "@/actions/sms-service"

// Add a debounce utility at the top of the file
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Mock AI analysis
const mockAiAnalysis = async (handle: string) => {
  return new Promise<{
    followers: number
    engagement: number
    growthRate: number
    topContent: string[]
    audienceDemo: { age: string; gender: string; location: string }
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        followers: Math.floor(1000 + Math.random() * 100000),
        engagement: Math.random() * 8 + 1,
        growthRate: Math.random() * 10,
        topContent: ["Fashion", "Lifestyle", "Travel"],
        audienceDemo: {
          age: "18-34",
          gender: "65% Female, 35% Male",
          location: "US, UK, Canada",
        },
      })
    }, 2000)
  })
}

type SocialPlatform = {
  name: string
  icon: React.ReactNode
  placeholder: string
  color: string
}

const socialPlatforms: SocialPlatform[] = [
  {
    name: "Instagram",
    icon: <Instagram className="h-4 w-4" />,
    placeholder: "@yourusername",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  {
    name: "TikTok",
    icon: <Video className="h-4 w-4" />,
    placeholder: "@yourusername",
    color: "bg-black",
  },
  {
    name: "YouTube",
    icon: <Play className="h-4 w-4" />,
    placeholder: "@yourchannel",
    color: "bg-red-600",
  },
  {
    name: "Twitter",
    icon: <MessageCircle className="h-4 w-4" />,
    placeholder: "@yourusername",
    color: "bg-blue-500",
  },
]

const contentCategories = [
  { name: "Fashion", icon: "👗", color: "bg-pink-100 dark:bg-pink-900" },
  { name: "Beauty", icon: "💄", color: "bg-purple-100 dark:bg-purple-900" },
  { name: "Fitness", icon: "💪", color: "bg-green-100 dark:bg-green-900" },
  { name: "Travel", icon: "✈️", color: "bg-blue-100 dark:bg-blue-900" },
  { name: "Food", icon: "🍕", color: "bg-yellow-100 dark:bg-yellow-900" },
  { name: "Lifestyle", icon: "🌿", color: "bg-teal-100 dark:bg-teal-900" },
  { name: "Tech", icon: "📱", color: "bg-gray-100 dark:bg-gray-800" },
  { name: "Gaming", icon: "🎮", color: "bg-indigo-100 dark:bg-indigo-900" },
  { name: "Business", icon: "💼", color: "bg-amber-100 dark:bg-amber-900" },
  { name: "Education", icon: "📚", color: "bg-red-100 dark:bg-red-900" },
  { name: "Art", icon: "🎨", color: "bg-fuchsia-100 dark:bg-fuchsia-900" },
  { name: "Music", icon: "🎵", color: "bg-cyan-100 dark:bg-cyan-900" },
]

const incomeRanges = [
  { min: 0, max: 1000, label: "Up to $1,000/month", level: "Starter" },
  { min: 1000, max: 5000, label: "$1,000 - $5,000/month", level: "Growing" },
  { min: 5000, max: 10000, label: "$5,000 - $10,000/month", level: "Established" },
  { min: 10000, max: 20000, label: "$10,000 - $20,000/month", level: "Professional" },
  { min: 20000, max: 50000, label: "$20,000 - $50,000/month", level: "Elite" },
  { min: 50000, max: 100000, label: "$50,000+/month", level: "Celebrity" },
]

const contentFrequencies = ["Daily", "3-5 times per week", "1-2 times per week", "Few times a month"]

const brandCollabTypes = [
  "Sponsored Posts",
  "Brand Ambassador",
  "Affiliate Marketing",
  "Product Reviews",
  "Event Appearances",
  "Content Creation",
]

const learningTopics = [
  "Content Creation",
  "Audience Growth",
  "Engagement Strategies",
  "Monetization",
  "Photography/Videography",
  "Personal Branding",
]

const growthChallenges = [
  "Finding My Niche",
  "Creating Consistent Content",
  "Growing My Audience",
  "Engagement Rate",
  "Monetization",
  "Work-Life Balance",
]

const contentStyles = [
  { name: "Minimalist", icon: "✨", description: "Clean, simple aesthetics" },
  { name: "Vibrant", icon: "🌈", description: "Bold colors and energy" },
  { name: "Vintage", icon: "📷", description: "Retro and nostalgic vibes" },
  { name: "Luxury", icon: "💎", description: "High-end and sophisticated" },
  { name: "Playful", icon: "🎨", description: "Fun and creative expression" },
  { name: "Nature", icon: "🌿", description: "Organic and earthy elements" },
]

const personalityTypes = [
  {
    type: "Creator",
    description: "You thrive on making original content and expressing yourself",
    icon: <Palette className="h-5 w-5" />,
    strengths: ["Original content", "Creative expression", "Unique perspective"],
    strategies: ["Focus on quality over quantity", "Develop a signature style", "Collaborate with other creators"],
  },
  {
    type: "Connector",
    description: "You excel at building relationships and engaging with your audience",
    icon: <Users className="h-5 w-5" />,
    strengths: ["Community building", "Engagement", "Authenticity"],
    strategies: ["Prioritize comments and messages", "Host live sessions", "Create interactive content"],
  },
  {
    type: "Educator",
    description: "You love sharing knowledge and teaching others",
    icon: <BookOpen className="h-5 w-5" />,
    strengths: ["Informative content", "Clear communication", "Expertise"],
    strategies: ["Create how-to content", "Share insights and tips", "Develop series content"],
  },
  {
    type: "Trendsetter",
    description: "You stay ahead of the curve and influence what's next",
    icon: <TrendingUp className="h-5 w-5" />,
    strengths: ["Early adoption", "Trend awareness", "Cultural relevance"],
    strategies: ["Monitor emerging trends", "Put your unique spin on trends", "Be first to market"],
  },
]

// Custom hook for saving progress
const useSaveProgress = (data: any) => {
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const saveProgress = async () => {
    setIsSaving(true)
    try {
      // Save the current step data to the server
      await saveOnboardingData(data.step, data)
      setLastSaved(new Date())
      toast({
        title: "Progress Saved",
        description: "Your onboarding progress has been saved.",
      })
    } catch (error) {
      console.error("Error saving progress:", error)
      toast({
        title: "Save Failed",
        description: "Could not save your progress. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return { saveProgress, isSaving, lastSaved }
}

// Custom component for 3D flip card
const FlipCard = ({
  front,
  back,
  isFlipped,
  onClick,
}: {
  front: React.ReactNode
  back: React.ReactNode
  isFlipped: boolean
  onClick: () => void
}) => {
  return (
    <div className="relative h-[200px] w-full cursor-pointer perspective-1000" onClick={onClick}>
      <div
        className={cn(
          "relative h-full w-full duration-500 preserve-3d transition-all",
          isFlipped ? "rotate-y-180" : "",
        )}
      >
        <div className="absolute inset-0 backface-hidden">{front}</div>
        <div className="absolute inset-0 rotate-y-180 backface-hidden">{back}</div>
      </div>
    </div>
  )
}

// Custom component for animated mascot
const Mascot = ({ emotion = "happy" }: { emotion?: "happy" | "thinking" | "excited" | "confused" }) => {
  const animations = {
    happy: {
      y: [0, -10, 0],
      transition: { repeat: Number.POSITIVE_INFINITY, duration: 2 },
    },
    thinking: {
      rotate: [0, 10, 0, -10, 0],
      transition: { repeat: Number.POSITIVE_INFINITY, duration: 3 },
    },
    excited: {
      scale: [1, 1.1, 1],
      transition: { repeat: Number.POSITIVE_INFINITY, duration: 0.5 },
    },
    confused: {
      rotate: [0, 5, 0, -5, 0],
      transition: { repeat: Number.POSITIVE_INFINITY, duration: 1.5 },
    },
  }

  return (
    <motion.div className="relative h-16 w-16 rounded-full bg-primary/20 p-2" animate={animations[emotion]}>
      <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/30">
        {emotion === "happy" && <span className="text-2xl">😊</span>}
        {emotion === "thinking" && <span className="text-2xl">🤔</span>}
        {emotion === "excited" && <span className="text-2xl">🤩</span>}
        {emotion === "confused" && <span className="text-2xl">😕</span>}
      </div>
    </motion.div>
  )
}

// Custom component for interactive calendar
const ContentCalendar = ({
  selectedDays,
  onSelectDay,
}: {
  selectedDays: number[]
  onSelectDay: (day: number) => void
}) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return (
    <div className="grid grid-cols-7 gap-1">
      {days.map((day, index) => (
        <div key={day} className="flex flex-col items-center">
          <div className="text-xs font-medium text-muted-foreground">{day}</div>
          <Button
            variant={selectedDays.includes(index) ? "default" : "outline"}
            size="sm"
            className="mt-1 h-8 w-8 p-0"
            onClick={() => onSelectDay(index)}
          >
            {selectedDays.includes(index) && <Check className="h-3 w-3" />}
          </Button>
        </div>
      ))}
    </div>
  )
}

// Custom component for voice input simulation
const VoiceInput = ({
  onComplete,
}: {
  onComplete: (text: string) => void
}) => {
  const [isRecording, setIsRecording] = useState(false)
  const [progress, setProgress] = useState(0)

  const startRecording = () => {
    setIsRecording(true)
    setProgress(0)

    // Simulate recording progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRecording(false)
          onComplete("I want to grow my Instagram account and connect with more people who share my interests.")
          return 100
        }
        return prev + 5
      })
    }, 150)
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button
        variant={isRecording ? "destructive" : "outline"}
        size="lg"
        className={cn("h-16 w-16 rounded-full", isRecording && "animate-pulse")}
        onClick={startRecording}
        disabled={isRecording}
      >
        <Mic className="h-6 w-6" />
      </Button>

      {isRecording && (
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Recording...</span>
            <span className="text-xs text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      )}

      <p className="text-center text-sm text-muted-foreground">
        {isRecording ? "Listening... speak clearly" : "Tap to record your goals"}
      </p>
    </div>
  )
}

// Custom component for AI profile analysis
const AiProfileAnalysis = ({
  handle,
  onComplete,
}: {
  handle: string
  onComplete: (data: any) => void
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<any>(null)

  const startAnalysis = async () => {
    setIsAnalyzing(true)
    setProgress(0)

    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return 95
        }
        return prev + Math.random() * 10
      })
    }, 300)

    try {
      const data = await mockAiAnalysis(handle)
      clearInterval(interval)
      setProgress(100)
      setResult(data)
      onComplete(data)
      setTimeout(() => {
        setIsAnalyzing(false)
      }, 500)
    } catch (error) {
      clearInterval(interval)
      setIsAnalyzing(false)
      toast({
        title: "Analysis Failed",
        description: "Could not analyze profile",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    if (handle && !result) {
      startAnalysis()
    }
  }, [handle])

  if (!isAnalyzing && result) {
    return (
      <div className="space-y-4 rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">AI Analysis Results</h3>
          <Badge variant="outline" className="bg-primary/10">
            <Sparkles className="mr-1 h-3 w-3" /> AI Generated
          </Badge>
        </div>

        <div className="grid gap-3">
          <div className="flex items-center justify-between rounded-md bg-muted p-2">
            <span className="text-sm">Followers</span>
            <span className="font-medium">{result.followers.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between rounded-md bg-muted p-2">
            <span className="text-sm">Engagement Rate</span>
            <span className="font-medium">{result.engagement.toFixed(1)}%</span>
          </div>
          <div className="flex items-center justify-between rounded-md bg-muted p-2">
            <span className="text-sm">Growth Rate</span>
            <span className="font-medium">+{result.growthRate.toFixed(1)}%/month</span>
          </div>
          <div className="flex items-center justify-between rounded-md bg-muted p-2">
            <span className="text-sm">Top Performing Content</span>
            <div className="flex gap-1">
              {result.topContent.map((category: string) => (
                <Badge key={category} variant="outline" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Analyzing @{handle}</h3>
        <Badge variant="outline" className="animate-pulse bg-primary/10">
          <Wand2 className="mr-1 h-3 w-3" /> AI Working
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Analyzing profile data...</span>
          <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-1" />
      </div>

      <div className="space-y-2">
        {progress > 30 && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Check className="h-3 w-3 text-green-500" />
            Fetching profile statistics
          </div>
        )}
        {progress > 50 && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Check className="h-3 w-3 text-green-500" />
            Analyzing content performance
          </div>
        )}
        {progress > 70 && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Check className="h-3 w-3 text-green-500" />
            Evaluating audience demographics
          </div>
        )}
        {progress > 90 && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin" />
            Generating recommendations
          </div>
        )}
      </div>
    </div>
  )
}

// Custom component for income projection visualization
const IncomeProjection = ({
  currentIncome = 0,
  targetIncome = 5000,
  months = 12,
}: {
  currentIncome?: number
  targetIncome?: number
  months?: number
}) => {
  // Generate projection data
  const generateProjectionData = () => {
    const data = []
    const monthlyGrowth = (targetIncome - currentIncome) / months

    for (let i = 0; i <= months; i++) {
      data.push({
        month: i,
        value: Math.max(0, currentIncome + monthlyGrowth * i),
      })
    }

    return data
  }

  const projectionData = generateProjectionData()
  const maxValue = Math.max(...projectionData.map((d) => d.value))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Income Projection</h3>
        <Badge variant="outline">{months}</Badge>
      </div>

      <div className="h-[150px] w-full">
        <div className="flex h-full items-end gap-1">
          {projectionData.map((data, index) => (
            <div key={index} className="group relative flex flex-1 flex-col items-center">
              <div className="absolute -top-8 z-10 hidden rounded-md bg-black/80 px-2 py-1 text-xs text-white group-hover:block">
                ${Math.round(data.value).toLocaleString()}
              </div>
              <div
                className={cn(
                  "w-full rounded-t-sm",
                  index === 0 ? "bg-muted" : index === months ? "bg-green-500" : "bg-primary",
                )}
                style={{
                  height: `${(data.value / maxValue) * 100}%`,
                  opacity: 0.3 + (data.value / maxValue) * 0.7,
                }}
              />
              {index % 3 === 0 && <div className="mt-1 text-[10px] text-muted-foreground">{index}m</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div>
          <div className="font-medium">${currentIncome.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Current</div>
        </div>
        <div className="text-right">
          <div className="font-medium">${targetIncome.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Target</div>
        </div>
      </div>
    </div>
  )
}

// Custom component for achievement badges
const AchievementBadge = ({
  title,
  icon,
  isUnlocked = false,
  onUnlock,
}: {
  title: string
  icon: React.ReactNode
  isUnlocked?: boolean
  onUnlock?: () => void
}) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col items-center rounded-lg border p-3 transition-all",
        isUnlocked
          ? "border-primary bg-primary/5"
          : "border-dashed border-muted-foreground/30 bg-muted/50 opacity-70 hover:opacity-100",
      )}
      onClick={() => !isUnlocked && onUnlock?.()}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full",
          isUnlocked ? "bg-primary/20" : "bg-muted",
        )}
      >
        {icon}
      </div>
      <div className="mt-2 text-center">
        <div className="text-xs font-medium">{title}</div>
        <div className="text-[10px] text-muted-foreground">{isUnlocked ? "Unlocked" : "Locked"}</div>
      </div>

      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/5 opacity-0 transition-opacity group-hover:opacity-100">
          <Button variant="secondary" size="sm" className="text-xs">
            Unlock
          </Button>
        </div>
      )}
    </div>
  )
}

// Main component
export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [userType, setUserType] = useState<"regular" | "influencer" | null>(null)
  const [progress, setProgress] = useState(0)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [socialHandles, setSocialHandles] = useState<Record<string, string>>({})
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [expectedCode, setExpectedCode] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [verificationStep, setVerificationStep] = useState<"input" | "verify">("input")
  const [email, setEmail] = useState("")
  const [incomeGoal, setIncomeGoal] = useState(5000)
  const [selectedIncomeRange, setSelectedIncomeRange] = useState(1)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [selectedContentFrequency, setSelectedContentFrequency] = useState<string>("")
  const [selectedBrandCollabs, setSelectedBrandCollabs] = useState<string[]>([])
  const [selectedContentDays, setSelectedContentDays] = useState<number[]>([])
  const [selectedLearningTopics, setSelectedLearningTopics] = useState<string[]>([])
  const [selectedGrowthChallenges, setSelectedGrowthChallenges] = useState<string[]>([])
  const [selectedContentStyle, setSelectedContentStyle] = useState<string>("")
  const [personalityResult, setPersonalityResult] = useState<string>("")
  const [personalityAnswers, setPersonalityAnswers] = useState<Record<string, string>>({})
  const [goalStatement, setGoalStatement] = useState<string>("")
  const [aiAnalysisResult, setAiAnalysisResult] = useState<any>(null)
  const [achievements, setAchievements] = useState<Record<string, boolean>>({
    profile: false,
    categories: false,
    social: false,
    verification: false,
    goals: false,
  })
  const [showMascot, setShowMascot] = useState(true)
  const [mascotEmotion, setMascotEmotion] = useState<"happy" | "thinking" | "excited" | "confused">("happy")
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [onboardingInitialized, setOnboardingInitialized] = useState(false)
  // Add a new state for tracking step transition loading
  const [isStepTransitioning, setIsStepTransitioning] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  // Determine total steps based on user type
  const totalSteps = userType === "influencer" ? 10 : 8

  // Save progress hook
  const { saveProgress, isSaving, lastSaved } = useSaveProgress({
    step,
    userType,
    profileImage: profileImageUrl || profileImage,
    selectedCategories,
    socialHandles,
    phoneNumber,
    email,
    incomeGoal,
    selectedContentFrequency,
    selectedBrandCollabs,
    selectedContentDays,
    selectedLearningTopics,
    selectedGrowthChallenges,
    selectedContentStyle,
    personalityResult,
    goalStatement,
    aiAnalysisResult,
  })

  // Update progress when step changes
  useEffect(() => {
    setProgress(((step + 1) / totalSteps) * 100)

    // Update mascot emotion based on step
    if (step === totalSteps - 1) {
      setMascotEmotion("excited")
    } else if (step > totalSteps / 2) {
      setMascotEmotion("happy")
    } else if (step === 0) {
      setMascotEmotion("thinking")
    } else {
      setMascotEmotion("confused")
    }
  }, [step, totalSteps])

  // Trigger confetti effect
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  // Handle unlocking achievements
  const unlockAchievement = (achievement: string) => {
    if (!achievements[achievement]) {
      setAchievements((prev) => ({
        ...prev,
        [achievement]: true,
      }))

      toast({
        title: "Achievement Unlocked!",
        description: `You've unlocked the ${achievement} achievement!`,
        variant: "default",
      })

      // Small confetti burst
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
      })
    }
  }

  // Update the nextStep function to show loading state during transitions
  const nextStep = async () => {
    try {
      setIsStepTransitioning(true)

      // Prepare step data
      const stepData = {
        profileImage: profileImageUrl || profileImage,
        selectedCategories,
        socialHandles,
        phoneNumber,
        email,
        incomeGoal,
        selectedContentFrequency,
        selectedBrandCollabs,
        selectedContentDays,
        selectedLearningTopics,
        selectedGrowthChallenges,
        selectedContentStyle,
        personalityResult,
        personalityAnswers,
        goalStatement,
        aiAnalysisResult,
      }

      // Mark current step as completed
      await updateOnboardingStep(step, "COMPLETED", stepData)

      if (step < totalSteps - 1) {
        // Move to next step
        setStep(step + 1)

        // Mark next step as in progress (do this in parallel to reduce waiting time)
        updateOnboardingStep(step + 1, "IN_PROGRESS").catch(console.error)

        // Unlock achievements based on progress
        if (step === 1 && profileImage) unlockAchievement("profile")
        if (step === 2 && selectedCategories.length > 0) unlockAchievement("categories")
        if (step === 3 && Object.keys(socialHandles).length > 0) unlockAchievement("social")
        if (step === 5 && isVerified) unlockAchievement("verification")
        if (step === totalSteps - 2) unlockAchievement("goals")
      } else {
        // Final submission
        setIsSubmitting(true)

        // Complete the onboarding process
        const result = await completeOnboarding()

        if (result.status === 200) {
          setIsSubmitting(false)
          triggerConfetti()

          // Redirect based on user type
          setTimeout(() => {
            if (userType === "influencer") {
              router.push("/influencers")
            } else {
              router.push("/dashboard")
            }
          }, 2000)
        } else {
          toast({
            title: "Error",
            description: "Failed to complete onboarding. Please try again.",
            variant: "destructive",
          })
          setIsSubmitting(false)
        }
      }
    } catch (error) {
      console.error("Error in nextStep:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsStepTransitioning(false)
    }
  }

  // Update the prevStep function to show loading state during transitions
  const prevStep = async () => {
    if (step > 0) {
      try {
        setIsStepTransitioning(true)

        // Mark current step as in progress (not completed)
        await updateOnboardingStep(step, "IN_PROGRESS")

        // Go back to previous step
        setStep(step - 1)

        // Mark previous step as in progress again (do this in parallel)
        updateOnboardingStep(step - 1, "IN_PROGRESS").catch(console.error)
      } catch (error) {
        console.error("Error in prevStep:", error)
        toast({
          title: "Error",
          description: "Failed to go back. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsStepTransitioning(false)
      }
    }
  }

  // Update the setUserAndAdvance function to show loading state
  const setUserAndAdvance = async (type: "regular" | "influencer") => {
    try {
      setIsStepTransitioning(true)
      setUserType(type)

      // Initialize onboarding with the selected user type
      const stepsCount = type === "influencer" ? 10 : 8
      const result = await initializeOnboarding(type, stepsCount)

      if (result.status === 200) {
        setOnboardingInitialized(true)
        nextStep()
      } else {
        toast({
          title: "Error",
          description: "Failed to initialize onboarding. Please try again.",
          variant: "destructive",
        })
        setIsStepTransitioning(false)
      }
    } catch (error) {
      console.error("Error in setUserAndAdvance:", error)
      toast({
        title: "Error",
        description: "Failed to set user type. Please try again.",
        variant: "destructive",
      })
      setIsStepTransitioning(false)
    }
  }

  // File handling functions
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Show preview immediately using FileReader
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Add upload progress state

      // Upload to Vercel Blob
      try {
        setIsUploading(true)

        // Create a FormData object
        const formData = new FormData()
        formData.append("file", file)

        // Simulate upload progress (since fetch doesn't provide progress)
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval)
              return 90
            }
            return prev + 10
          })
        }, 300)

        // Upload the file
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        clearInterval(progressInterval)
        setUploadProgress(100)

        const result = await response.json()

        if (result.success) {
          // Store the URL for database saving
          setProfileImageUrl(result.url)

          toast({
            title: "Image Uploaded",
            description: "Your profile image has been uploaded successfully.",
          })

          // Save this step data
          await saveOnboardingData(step, {
            profileImage: result.url,
          })
        } else {
          toast({
            title: "Upload Failed",
            description: result.error || "Failed to upload image",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error uploading image:", error)
        toast({
          title: "Upload Failed",
          description: "An error occurred while uploading your image",
          variant: "destructive",
        })
      } finally {
        setIsUploading(false)
      }
    }
  }

  // Category selection
  const handleCategoryToggle = async (category: string) => {
    // Optimistically update the UI first
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]

    setSelectedCategories(newCategories)

    // Then save in the background without waiting
    saveOnboardingData(step, {
      selectedCategories: newCategories,
    }).catch((error) => {
      console.error("Error saving categories:", error)
      // Revert on error
      setSelectedCategories(selectedCategories)
      toast({
        title: "Save Failed",
        description: "Failed to save your selection. Please try again.",
        variant: "destructive",
      })
    })
  }

  // Social handle management
  const handleSocialHandleChange = async (platform: string, value: string) => {
    // Optimistically update the UI first
    const newHandles = {
      ...socialHandles,
      [platform]: value,
    }

    setSocialHandles(newHandles)

    // Debounce the save operation to avoid too many requests
    const debouncedSave = debounce(() => {
      saveOnboardingData(step, {
        socialHandles: newHandles,
      }).catch((error) => {
        console.error("Error saving social handles:", error)
      })
    }, 500)

    debouncedSave()
  }

  // Phone verification
  const handleVerifyPhone = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)
    try {
      // Call the server action to send the verification code
      const result = await sendVerificationSMS(phoneNumber)

      if (result.status === 200) {
        setExpectedCode(result.data?.code || '12345678765432')
        setVerificationStep("verify")

        // Save this step data
        await saveOnboardingData(step, {
          phoneNumber,
        })

        toast({
          title: "Verification Code Sent",
          description: `We've sent a code to ${phoneNumber}. For demo purposes, the code is: ${result.data?.code}`,
        })
      } else {
        toast({
          title: "Verification Failed",
          description: result.error || "Could not send verification code",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Could not send verification code",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleCheckVerificationCode = async () => {
    if (!verificationCode) {
      toast({
        title: "Missing Code",
        description: "Please enter the verification code",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)
    try {
      // For demo purposes, we'll check against the expected code directly
      const isValid = verificationCode === expectedCode

      if (isValid) {
        setIsVerified(true)

        // Save this step data
        await saveOnboardingData(step, {
          phoneNumber,
          verified: true,
        })

        toast({
          title: "Phone Verified",
          description: "Your phone number has been verified successfully!",
        })
        nextStep()
      } else {
        toast({
          title: "Invalid Code",
          description: "The code you entered is incorrect",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Could not verify code",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  // Income goal management
  const handleIncomeRangeSelect = async (index: number) => {
    setSelectedIncomeRange(index)
    const newIncomeGoal = incomeRanges[index].min + (incomeRanges[index].max - incomeRanges[index].min) / 2
    setIncomeGoal(newIncomeGoal)

    // Save this step data
    await saveOnboardingData(step, {
      incomeGoal: newIncomeGoal,
      selectedIncomeRange: index,
    })
  }

  const handleIncomeSliderChange = async (value: number[]) => {
    setIncomeGoal(value[0])

    // Save this step data
    await saveOnboardingData(step, {
      incomeGoal: value[0],
    })
  }

  const getCurrentIncomeRange = () => {
    return incomeRanges.find((range) => incomeGoal >= range.min && incomeGoal <= range.max) || incomeRanges[0]
  }

  // Card flipping
  const toggleCardFlip = (index: number) => {
    setFlippedCards((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  // Content days selection
  const toggleContentDay = async (day: number) => {
    const newSelectedDays = selectedContentDays.includes(day)
      ? selectedContentDays.filter((d) => d !== day)
      : [...selectedContentDays, day]

    setSelectedContentDays(newSelectedDays)

    // Save this step data
    await saveOnboardingData(step, {
      selectedContentDays: newSelectedDays,
    })
  }

  // Learning topics selection
  const toggleLearningTopic = async (topic: string) => {
    const newTopics = selectedLearningTopics.includes(topic)
      ? selectedLearningTopics.filter((t) => t !== topic)
      : [...selectedLearningTopics, topic]

    setSelectedLearningTopics(newTopics)

    // Save this step data
    await saveOnboardingData(step, {
      selectedLearningTopics: newTopics,
    })
  }

  // Growth challenges selection
  const toggleGrowthChallenge = async (challenge: string) => {
    const newChallenges = selectedGrowthChallenges.includes(challenge)
      ? selectedGrowthChallenges.filter((c) => c !== challenge)
      : [...selectedGrowthChallenges, challenge]

    setSelectedGrowthChallenges(newChallenges)

    // Save this step data
    await saveOnboardingData(step, {
      selectedGrowthChallenges: newChallenges,
    })
  }

  // Brand collab selection
  const toggleBrandCollab = async (collab: string) => {
    const newCollabs = selectedBrandCollabs.includes(collab)
      ? selectedBrandCollabs.filter((c) => c !== collab)
      : [...selectedBrandCollabs, collab]

    setSelectedBrandCollabs(newCollabs)

    // Save this step data
    await saveOnboardingData(step, {
      selectedBrandCollabs: newCollabs,
    })
  }

  // Personality quiz
  const handlePersonalityAnswer = async (question: string, answer: string) => {
    const newAnswers = {
      ...personalityAnswers,
      [question]: answer,
    }

    setPersonalityAnswers(newAnswers)

    // Simple algorithm to determine personality type
    setTimeout(async () => {
      const answers = newAnswers
      const counts: Record<string, number> = {
        Creator: 0,
        Connector: 0,
        Educator: 0,
        Trendsetter: 0,
      }

      Object.values(answers).forEach((a) => {
        if (a.includes("creative") || a.includes("original")) counts.Creator++
        if (a.includes("people") || a.includes("community")) counts.Connector++
        if (a.includes("teach") || a.includes("inform")) counts.Educator++
        if (a.includes("trend") || a.includes("new")) counts.Trendsetter++
      })

      // Find the highest score
      let maxType = "Creator"
      let maxCount = 0

      Object.entries(counts).forEach(([type, count]) => {
        if (count > maxCount) {
          maxType = type
          maxCount = count
        }
      })

      setPersonalityResult(maxType)

      // Save this step data
      await saveOnboardingData(step, {
        personalityAnswers: newAnswers,
        personalityResult: maxType,
      })
    }, 300)
  }

  // Helper functions
  const getProgressColor = () => {
    if (progress < 30) return "bg-red-500"
    if (progress < 70) return "bg-yellow-500"
    return "bg-green-500"
  }

  // Add a loading overlay component for the entire form
  const LoadingOverlay = () => (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-medium">Processing your information...</p>
      </div>
    </div>
  )

  // Render the questionnaire
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="relative w-full max-w-md overflow-hidden border-none bg-card shadow-lg">
        {(isStepTransitioning || isSubmitting) && <LoadingOverlay />}
        <CardContent className="p-0">
          <div className="bg-primary/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-primary">Welcome to InstaGrowth</h1>
                <p className="text-muted-foreground">Let&apos;s set up your experience</p>
              </div>

              {showMascot && (
                <div className="relative">
                  <Mascot emotion={mascotEmotion} />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-background p-0"
                    onClick={() => setShowMascot(false)}
                  >
                    <XIcon className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>

            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-primary/10">
              <motion.div
                className={cn("h-full rounded-full", getProgressColor())}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>
                Step {step + 1} of {totalSteps}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>

            {/* Save progress button */}
            <div className="mt-2 flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 gap-1 text-xs"
                onClick={saveProgress}
                disabled={isSaving || !onboardingInitialized}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-3 w-3" />
                    Save Progress
                  </>
                )}
              </Button>

              {lastSaved && (
                <span className="text-xs text-muted-foreground">Last saved: {lastSaved.toLocaleTimeString()}</span>
              )}
            </div>
          </div>

          <div className="min-h-[500px] p-6">
            <AnimatePresence mode="wait">
              {/* Add a transition indicator between steps */}
              {isStepTransitioning && (
                <motion.div
                  key="transition"
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm font-medium">Loading next step...</p>
                  </div>
                </motion.div>
              )}
              {/* Step 1: User Type Selection */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold">Tell us about yourself</h2>
                  <p className="text-muted-foreground">Which option best describes you?</p>

                  <div className="grid gap-4">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        className="flex h-auto w-full items-start justify-start gap-4 p-4 text-left"
                        onClick={() => setUserAndAdvance("regular")}
                      >
                        <div className="rounded-full bg-primary/10 p-2">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">Regular User</div>
                          <div className="text-sm text-muted-foreground">I want to grow my personal account</div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        className="flex h-auto w-full items-start justify-start gap-4 p-4 text-left"
                        onClick={() => setUserAndAdvance("influencer")}
                      >
                        <div className="rounded-full bg-primary/10 p-2">
                          <Star className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">Influencer</div>
                          <div className="text-sm text-muted-foreground">
                            I have a significant following and brand partnerships
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Profile Picture */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold">Add a profile picture</h2>
                  <p className="text-muted-foreground">This will be displayed on your profile and dashboard</p>

                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative">
                      <Avatar className="h-32 w-32 border-2 border-primary/20">
                        {profileImage ? (
                          <AvatarImage src={profileImage} alt="Profile" />
                        ) : (
                          <AvatarFallback className="bg-primary/10 text-2xl">
                            {userType === "influencer" ? "INF" : "USR"}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute bottom-0 right-0 rounded-full"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>

                    <div className="text-center text-sm text-muted-foreground">
                      {profileImage ? (
                        <span className="flex items-center gap-1 text-green-500">
                          <Check className="h-4 w-4" /> Image uploaded
                        </span>
                      ) : (
                        "Click to upload an image"
                      )}
                    </div>

                    {isUploading && (
                      <div className="w-full space-y-2 mt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Uploading image...</span>
                          <span className="text-xs text-muted-foreground">{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-1" />
                      </div>
                    )}

                    <Button 
                      onClick={nextStep} 
                      className="mt-4 w-full" 
                      disabled={isSubmitting || isStepTransitioning}
                    >
                      {isStepTransitioning ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {profileImage ? "Saving..." : "Skipping..."}
                        </>
                      ) : (
                        profileImage ? "Continue" : "Skip for now"
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Content Categories */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold">Content Categories</h2>
                  <p className="text-muted-foreground">Select your primary content categories (up to 5)</p>

                  <div className="grid grid-cols-3 gap-3">
                    {contentCategories.map((category) => (
                      <motion.div key={category.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant={selectedCategories.includes(category.name) ? "default" : "outline"}
                          className={cn(
                            "flex h-auto w-full flex-col items-center justify-center gap-2 p-3 text-center",
                            selectedCategories.includes(category.name) ? "border-primary" : "",
                          )}
                          onClick={() => handleCategoryToggle(category.name)}
                          disabled={!selectedCategories.includes(category.name) && selectedCategories.length >= 5}
                        >
                          <div
                            className={cn("flex h-10 w-10 items-center justify-center rounded-full", category.color)}
                          >
                            <span className="text-xl">{category.icon}</span>
                          </div>
                          <span className="text-xs font-medium">{category.name}</span>
                        </Button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{selectedCategories.length}/5 selected</span>
                    <Button onClick={nextStep} disabled={selectedCategories.length === 0 || isSubmitting}>
                      Continue
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Social Media Handles */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold">Social Media Profiles</h2>
                  <p className="text-muted-foreground">Add your social media handles</p>

                  <div className="space-y-4">
                    {socialPlatforms.map((platform) => (
                      <div key={platform.name} className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <div className={cn("flex h-5 w-5 items-center justify-center rounded-md", platform.color)}>
                            {platform.icon}
                          </div>
                          {platform.name}
                        </Label>
                        <div className="flex items-center gap-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                            <AtSign className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <Input
                            placeholder={platform.placeholder}
                            value={socialHandles[platform.name] || ""}
                            onChange={(e) => handleSocialHandleChange(platform.name, e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI Analysis for Influencers */}
                  {userType === "influencer" && socialHandles.Instagram && (
                    <div className="mt-4">
                      <AiProfileAnalysis handle={socialHandles.Instagram} onComplete={setAiAnalysisResult} />
                    </div>
                  )}

                  <Button
                    onClick={nextStep}
                    className="w-full"
                    disabled={Object.keys(socialHandles).length === 0 || isSubmitting}
                  >
                    {Object.keys(socialHandles).length > 0 ? "Continue" : "Skip for now"}
                  </Button>
                </motion.div>
              )}

              {/* Step 5: Email */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold">Contact Information</h2>
                  <p className="text-muted-foreground">Add your email address</p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          saveOnboardingData(step, { email: e.target.value })
                        }}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={nextStep}
                    className="w-full"
                    disabled={!email || !email.includes("@") || isSubmitting}
                  >
                    Continue
                  </Button>
                </motion.div>
              )}

              {/* Step 6: Phone Verification */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold">Phone Verification</h2>
                  <p className="text-muted-foreground">
                    {verificationStep === "input"
                      ? "Add and verify your phone number"
                      : "Enter the verification code sent to your phone"}
                  </p>

                  <div className="space-y-6">
                    {verificationStep === "input" ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-primary" />
                            Phone Number
                          </Label>
                          <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                              <Smartphone className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+1 (555) 123-4567"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <Button onClick={handleVerifyPhone} className="w-full" disabled={!phoneNumber || isVerifying}>
                          {isVerifying ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending Code...
                            </>
                          ) : (
                            "Send Verification Code"
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="code" className="flex items-center gap-2">
                            <Lock className="h-4 w-4 text-primary" />
                            Verification Code
                          </Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="code"
                              type="text"
                              placeholder="Enter 6-digit code"
                              value={verificationCode}
                              onChange={(e) => setVerificationCode(e.target.value)}
                              className="flex-1 text-center text-xl tracking-widest"
                              maxLength={6}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            For demo purposes, the code is: <span className="font-mono font-bold">{expectedCode}</span>
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setVerificationStep("input")}
                            className="flex-1"
                            disabled={isVerifying}
                          >
                            Back
                          </Button>
                          <Button
                            onClick={handleCheckVerificationCode}
                            className="flex-1"
                            disabled={!verificationCode || verificationCode.length < 6 || isVerifying}
                          >
                            {isVerifying ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Verifying...
                              </>
                            ) : (
                              "Verify Code"
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 7: Content Strategy (Influencer) or Learning Goals (Regular) */}
              {step === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {userType === "influencer" ? (
                    <>
                      <h2 className="text-xl font-semibold">Content Strategy</h2>
                      <p className="text-muted-foreground">Tell us about your content creation approach</p>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label>How often do you post content?</Label>
                          <RadioGroup
                            value={selectedContentFrequency}
                            onValueChange={(value) => {
                              setSelectedContentFrequency(value)
                              saveOnboardingData(step, { selectedContentFrequency: value })
                            }}
                          >
                            <div className="grid grid-cols-2 gap-2">
                              {contentFrequencies.map((frequency) => (
                                <div key={frequency} className="flex items-center space-x-2">
                                  <RadioGroupItem value={frequency} id={`frequency-${frequency}`} />
                                  <Label htmlFor={`frequency-${frequency}`} className="text-sm">
                                    {frequency}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <Label>Which days do you typically post?</Label>
                          <ContentCalendar selectedDays={selectedContentDays} onSelectDay={toggleContentDay} />
                        </div>

                        <div className="space-y-2">
                          <Label>What types of brand collaborations do you prefer?</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {brandCollabTypes.map((collab) => (
                              <div key={collab} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`collab-${collab}`}
                                  checked={selectedBrandCollabs.includes(collab)}
                                  onCheckedChange={() => toggleBrandCollab(collab)}
                                />
                                <Label htmlFor={`collab-${collab}`} className="text-sm">
                                  {collab}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-semibold">Learning Goals</h2>
                      <p className="text-muted-foreground">What would you like to learn about?</p>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label>Select topics you&apos;re interested in learning:</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {learningTopics.map((topic) => (
                              <div key={topic} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`topic-${topic}`}
                                  checked={selectedLearningTopics.includes(topic)}
                                  onCheckedChange={() => toggleLearningTopic(topic)}
                                />
                                <Label htmlFor={`topic-${topic}`} className="text-sm">
                                  {topic}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>What are your biggest growth challenges?</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {growthChallenges.map((challenge) => (
                              <div key={challenge} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`challenge-${challenge}`}
                                  checked={selectedGrowthChallenges.includes(challenge)}
                                  onCheckedChange={() => toggleGrowthChallenge(challenge)}
                                />
                                <Label htmlFor={`challenge-${challenge}`} className="text-sm">
                                  {challenge}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Tell us your goals in your own words:</Label>
                          <div className="flex items-center gap-2">
                            <Textarea
                              placeholder="I want to grow my account and..."
                              value={goalStatement}
                              onChange={(e) => {
                                setGoalStatement(e.target.value)
                                saveOnboardingData(step, { goalStatement: e.target.value })
                              }}
                              className="min-h-[80px] flex-1"
                            />
                            
                              <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 shrink-0"
                                    onClick={() => {
                                      setGoalStatement("")
                                      toast({
                                        title: "Voice Input Ready",
                                        description: "Click the microphone to start recording",
                                      })
                                    }}
                                  >
                                    <Mic className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Use voice input</p>
                                </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        </div>                      
                    </>
                  )}

                  <Button onClick={nextStep} className="w-full" disabled={isSubmitting}>
                    Continue
                  </Button>
                </motion.div>
              )}

              {step === 7 && (
                <motion.div
                  key="step7"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {userType === "influencer" ? (
                    <>
                      <h2 className="text-xl font-semibold">Content Style</h2>
                      <p className="text-muted-foreground">Select your preferred aesthetic</p>

                      <div className="grid grid-cols-2 gap-4">
                        {contentStyles.map((style, index) => (
                          <motion.div key={style.name} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                            <Button
                              variant={selectedContentStyle === style.name ? "default" : "outline"}
                              className={cn(
                                "flex h-auto w-full flex-col items-center justify-center gap-2 p-4 text-center",
                                selectedContentStyle === style.name ? "border-primary" : "",
                              )}
                              onClick={() => {
                                setSelectedContentStyle(style.name)
                                saveOnboardingData(step, { selectedContentStyle: style.name })
                              }}
                            >
                              <span className="text-2xl">{style.icon}</span>
                              <div>
                                <div className="font-medium">{style.name}</div>
                                <div className="text-xs text-muted-foreground">{style.description}</div>
                              </div>
                            </Button>
                          </motion.div>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium">Visual Mood Board</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="group relative aspect-square overflow-hidden rounded-md bg-muted">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <ImageIcon className="h-6 w-6 text-muted-foreground" />
                              </div>
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                                <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-semibold">Content Creator Personality</h2>
                      <p className="text-muted-foreground">Let&apos;s discover your content creator type</p>

                      <div className="space-y-6">
                        {personalityResult ? (
                          <div className="space-y-4">
                            <div className="rounded-lg border bg-card p-4">
                              <div className="flex items-center gap-3">
                                <div className="rounded-full bg-primary/10 p-2">
                                  {personalityTypes.find((p) => p.type === personalityResult)?.icon || (
                                    <Star className="h-5 w-5 text-primary" />
                                  )}
                                </div>
                                <div>
                                  <h3 className="font-semibold">You&apos;re a {personalityResult}!</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {personalityTypes.find((p) => p.type === personalityResult)?.description}
                                  </p>
                                </div>
                              </div>

                              <div className="mt-4 space-y-3">
                                <div>
                                  <h4 className="text-sm font-medium">Your Strengths:</h4>
                                  <ul className="mt-1 list-inside list-disc text-sm text-muted-foreground">
                                    {personalityTypes
                                      .find((p) => p.type === personalityResult)
                                      ?.strengths.map((strength, i) => (
                                        <li key={i}>{strength}</li>
                                      ))}
                                  </ul>
                                </div>

                                <div>
                                  <h4 className="text-sm font-medium">Recommended Strategies:</h4>
                                  <ul className="mt-1 list-inside list-disc text-sm text-muted-foreground">
                                    {personalityTypes
                                      .find((p) => p.type === personalityResult)
                                      ?.strategies.map((strategy, i) => (
                                        <li key={i}>{strategy}</li>
                                      ))}
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-center">
                              <Button variant="outline" size="sm" onClick={() => setPersonalityResult("")}>
                                Retake Quiz
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <Label>When creating content, I prefer to:</Label>
                                <RadioGroup
                                  value={personalityAnswers["q1"] || ""}
                                  onValueChange={(value) => handlePersonalityAnswer("q1", value)}
                                >
                                  <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="express my creative ideas" id="q1-a" />
                                      <Label htmlFor="q1-a">Express my creative ideas</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="connect with my community" id="q1-b" />
                                      <Label htmlFor="q1-b">Connect with my community</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="teach others something new" id="q1-c" />
                                      <Label htmlFor="q1-c">Teach others something new</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="try the latest trends" id="q1-d" />
                                      <Label htmlFor="q1-d">Try the latest trends</Label>
                                    </div>
                                  </div>
                                </RadioGroup>
                              </div>

                              <div className="space-y-2">
                                <Label>I get the most satisfaction from:</Label>
                                <RadioGroup
                                  value={personalityAnswers["q2"] || ""}
                                  onValueChange={(value) => handlePersonalityAnswer("q2", value)}
                                >
                                  <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="creating original content" id="q2-a" />
                                      <Label htmlFor="q2-a">Creating original content</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="building a community of people" id="q2-b" />
                                      <Label htmlFor="q2-b">Building a community of people</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="informing and educating others" id="q2-c" />
                                      <Label htmlFor="q2-c">Informing and educating others</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="discovering new trends" id="q2-d" />
                                      <Label htmlFor="q2-d">Discovering new trends</Label>
                                    </div>
                                  </div>
                                </RadioGroup>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <Button
                    onClick={nextStep}
                    className="w-full"
                    disabled={isSubmitting || (userType === "influencer" && !selectedContentStyle)}
                  >
                    Continue
                  </Button>
                </motion.div>
              )}

              {/* Step 8: Income Goals */}
              {step === 8 && (
                <motion.div
                  key="step8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold">Income Goals</h2>
                  <p className="text-muted-foreground">What are your monthly income goals?</p>

                  <div className="space-y-6">
                    <Tabs defaultValue="slider" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="slider">Slider</TabsTrigger>
                        <TabsTrigger value="preset">Preset Ranges</TabsTrigger>
                      </TabsList>
                      <TabsContent value="slider" className="space-y-4 pt-4">
                        <div className="space-y-6">
                          <div className="flex flex-col items-center justify-center">
                            <div className="text-3xl font-bold text-primary">${incomeGoal.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">per month</div>
                          </div>

                          <div className="px-2">
                            <Slider
                              defaultValue={[incomeGoal]}
                              max={userType === "influencer" ? 100000 : 20000}
                              step={100}
                              onValueChange={handleIncomeSliderChange}
                            />

                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>$0</span>
                              <span>${userType === "influencer" ? "100,000" : "20,000"}+</span>
                            </div>
                          </div>

                          <div className="rounded-lg border bg-card p-4 shadow-sm">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-primary/10 text-primary">
                                {getCurrentIncomeRange().level}
                              </Badge>
                              <span className="text-sm font-medium">{getCurrentIncomeRange().label}</span>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="preset" className="space-y-4 pt-4">
                        <RadioGroup
                          value={selectedIncomeRange.toString()}
                          onValueChange={(value) => handleIncomeRangeSelect(Number.parseInt(value))}
                          className="space-y-3"
                        >
                          {incomeRanges.map((range, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <RadioGroupItem value={index.toString()} id={`range-${index}`} />
                              <Label
                                htmlFor={`range-${index}`}
                                className="flex flex-1 cursor-pointer items-center justify-between rounded-md border p-3 hover:bg-accent"
                              >
                                <div className="flex items-center gap-2">
                                  <DollarSign className="h-4 w-4 text-primary" />
                                  <span>{range.label}</span>
                                </div>
                                <Badge variant="outline">{range.level}</Badge>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </TabsContent>
                    </Tabs>

                    {/* Income Projection */}
                    <IncomeProjection
                      currentIncome={userType === "influencer" ? 2000 : 500}
                      targetIncome={incomeGoal}
                      months={12}
                    />

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={acceptedTerms}
                        onCheckedChange={(checked) => {
                          const isChecked = checked as boolean
                          setAcceptedTerms(isChecked)
                          saveOnboardingData(step, { acceptedTerms: isChecked })
                        }}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I understand this is my target goal and actual results may vary
                      </Label>
                    </div>

                    <Button onClick={nextStep} className="w-full" disabled={!acceptedTerms || isSubmitting}>
                      {userType === "influencer" && step < 9 ? "Continue" : "Complete Setup"}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 9: Achievements (Influencer only) */}
              {userType === "influencer" && step === 9 && (
                <motion.div
                  key="step9"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold">Your Achievements</h2>
                  <p className="text-muted-foreground">Unlock achievements as you grow</p>

                  <div className="grid grid-cols-3 gap-3">
                    <AchievementBadge
                      title="Profile Setup"
                      icon={<UserIcon className="h-5 w-5 text-primary" />}
                      isUnlocked={achievements.profile}
                      onUnlock={() => unlockAchievement("profile")}
                    />
                    <AchievementBadge
                      title="Categories"
                      icon={<LayersIcon className="h-5 w-5 text-primary" />}
                      isUnlocked={achievements.categories}
                      onUnlock={() => unlockAchievement("categories")}
                    />
                    <AchievementBadge
                      title="Social Connect"
                      icon={<Share2 className="h-5 w-5 text-primary" />}
                      isUnlocked={achievements.social}
                      onUnlock={() => unlockAchievement("social")}
                    />
                    <AchievementBadge
                      title="Verified"
                      icon={<BadgeCheckIcon className="h-5 w-5 text-primary" />}
                      isUnlocked={achievements.verification}
                      onUnlock={() => unlockAchievement("verification")}
                    />
                    <AchievementBadge
                      title="Goal Setter"
                      icon={<TargetIcon className="h-5 w-5 text-primary" />}
                      isUnlocked={achievements.goals}
                      onUnlock={() => unlockAchievement("goals")}
                    />
                    <AchievementBadge
                      title="First Post"
                      icon={<ImageIcon className="h-5 w-5 text-primary" />}
                      isUnlocked={false}
                    />
                  </div>

                  <div className="rounded-lg border bg-card p-4">
                    <h3 className="font-medium">Referral Program</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Invite other influencers and earn rewards</p>

                    <div className="mt-3 flex items-center gap-2">
                      <Input value="https://instagrowth.com/ref/yourname" readOnly className="flex-1 bg-muted" />
                      <Button variant="outline" size="sm" className="shrink-0">
                        <CopyIcon className="mr-1 h-3 w-3" />
                        Copy
                      </Button>
                    </div>
                  </div>

                  <Button onClick={nextStep} className="w-full" disabled={isSubmitting}>
                    Complete Setup
                  </Button>
                </motion.div>
              )}

              {/* Final Step: Completion */}
              {((userType === "regular" && step === 9) || (userType === "influencer" && step === 10)) && (
                <motion.div
                  key="stepFinal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    {isSubmitting ? (
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <h2 className="text-xl font-semibold">Setting up your account...</h2>
                        <p className="text-muted-foreground">This will only take a moment</p>
                      </div>
                    ) : (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.1,
                          }}
                          className="mb-6 rounded-full bg-green-500/10 p-4"
                        >
                          <Check className="h-12 w-12 text-green-500" />
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                          <h2 className="text-2xl font-bold">You&apos;re all set!</h2>
                          <p className="mt-2 text-muted-foreground">
                            {userType === "influencer"
                              ? "Your influencer dashboard is ready."
                              : "Your dashboard is ready."}
                          </p>

                          <div className="mt-6 space-y-4">
                            <div className="rounded-lg border bg-card p-4">
                              <h3 className="font-medium">Account Summary</h3>
                              <div className="mt-2 space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Account Type:</span>
                                  <span className="font-medium">
                                    {userType === "influencer" ? "Influencer" : "Regular User"}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Categories:</span>
                                  <span className="font-medium">{selectedCategories.length} selected</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Monthly Goal:</span>
                                  <span className="font-medium">${incomeGoal.toLocaleString()}</span>
                                </div>
                                {userType === "influencer" && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Content Style:</span>
                                    <span className="font-medium">{selectedContentStyle}</span>
                                  </div>
                                )}
                                {userType === "regular" && personalityResult && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Creator Type:</span>
                                    <span className="font-medium">{personalityResult}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <Button
                              onClick={() => {
                                if (userType === "influencer") {
                                  router.push("/influencers")
                                } else {
                                  router.push("/dashboard")
                                }
                              }}
                              className="w-full"
                            >
                              Go to Dashboard
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {step > 0 && step < (userType === "influencer" ? 10 : 9) && (
            <div className="flex items-center justify-between border-t p-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={prevStep} 
                disabled={isSubmitting || isStepTransitioning}
              >
                {isStepTransitioning ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    Going back...
                  </>
                ) : (
                  "Back"
                )}
              </Button>
              {step !== 5 && (
                <Button 
                  size="sm" 
                  onClick={nextStep} 
                  disabled={isSubmitting || isStepTransitioning}
                >
                  {isStepTransitioning ? (
                    <>
                      <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                      Skipping...
                    </>
                  ) : (
                    "Skip"
                  )}
                </Button>
              )}
            </div>
          )}
        </CardContent>
  </Card>
    </div>
  )
}

// Missing components that were used in the code
function Play(props: any) {
  return <Video {...props} />
}

function User(props: any) {
  return <Users {...props} />
}

function Layers(props: any) {
  return <Palette {...props} />
}

function BadgeCheck(props: any) {
  return <Check {...props} />
}

function Target(props: any) {
  return <Flag {...props} />
}

function Copy(props: any) {
  return <Paperclip {...props} />
}

function X(props: any) {
  return <AlertCircle {...props} />
}
