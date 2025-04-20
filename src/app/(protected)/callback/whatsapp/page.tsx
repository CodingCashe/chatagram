// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { CheckCircle2, AlertCircle, ArrowRight, Facebook } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useToast } from "@/hooks/use-toast"
// import {
//   getWhatsAppBusinessAccounts,
//   getWhatsAppPhoneNumbers,
//   requestVerificationCode,
//   verifyPhoneNumber,
//   subscribeAppToWhatsAppBusinessAccount,
// } from "@/lib/whatsapp-api"
// import type { WhatsAppBusinessAccount, WhatsAppPhoneNumber } from "@/types/whatsapp"

// export default function AccountSetup() {
//   const router = useRouter()
//   const { toast } = useToast()
//   const [currentStep, setCurrentStep] = useState(1)
//   const [isLoading, setIsLoading] = useState(false)
//   const [verificationCode, setVerificationCode] = useState("")
//   const [accessToken, setAccessToken] = useState("")
//   const [businessAccounts, setBusinessAccounts] = useState<WhatsAppBusinessAccount[]>([])
//   const [selectedBusinessAccount, setSelectedBusinessAccount] = useState("")
//   const [phoneNumbers, setPhoneNumbers] = useState<WhatsAppPhoneNumber[]>([])
//   const [selectedPhoneNumber, setSelectedPhoneNumber] = useState("")

//   // Check if we're returning from Meta OAuth flow
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search)
//     const code = urlParams.get("code")

//     if (code) {
//       // Exchange code for access token
//       exchangeCodeForToken(code)
//     }
//   }, [])

//   const exchangeCodeForToken = async (code: string) => {
//     setIsLoading(true)
//     try {
//       const response = await fetch("/api/auth/meta-callback", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ code }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to exchange code for token")
//       }

//       setAccessToken(data.accessToken)

//       // Fetch business accounts
//       const accounts = await getWhatsAppBusinessAccounts(data.accessToken)
//       setBusinessAccounts(accounts)

//       setCurrentStep(2)
//     } catch (error) {
//       console.error("Error exchanging code for token:", error)
//       toast({
//         title: "Authentication Failed",
//         description: "Could not connect to Meta. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleConnectMeta = () => {
//     // Redirect to Meta OAuth flow
//     const redirectUri = `${window.location.origin}/api/auth/meta-callback`
//     const metaOAuthUrl = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_META_APP_ID}&redirect_uri=${redirectUri}&scope=whatsapp_business_management,whatsapp_business_messaging`

//     window.location.href = metaOAuthUrl
//   }

//   const handleBusinessAccountSelect = async (wabaId: string) => {
//     setIsLoading(true)
//     setSelectedBusinessAccount(wabaId)

//     try {
//       // Fetch phone numbers for this business account
//       const numbers = await getWhatsAppPhoneNumbers(accessToken, wabaId)
//       setPhoneNumbers(numbers)

//       // Subscribe app to WABA
//       await subscribeAppToWhatsAppBusinessAccount(accessToken, wabaId)
//     } catch (error) {
//       console.error("Error fetching phone numbers:", error)
//       toast({
//         title: "Error",
//         description: "Could not fetch phone numbers. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handlePhoneNumberSelect = async (phoneNumberId: string) => {
//     setSelectedPhoneNumber(phoneNumberId)

//     try {
//       // Request verification code
//       await requestVerificationCode(accessToken, phoneNumberId)

//       toast({
//         title: "Verification Code Sent",
//         description: "A verification code has been sent to your WhatsApp number.",
//       })
//     } catch (error) {
//       console.error("Error requesting verification code:", error)
//       toast({
//         title: "Error",
//         description: "Could not send verification code. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleVerifyNumber = async () => {
//     setIsLoading(true)

//     try {
//       // Verify the phone number with the code
//       await verifyPhoneNumber(accessToken, selectedPhoneNumber, verificationCode)

//       // Find the selected account and phone
//       const selectedAccount = businessAccounts.find((acc) => acc.id === selectedBusinessAccount)
//       const selectedPhone = phoneNumbers.find((phone) => phone.id === selectedPhoneNumber)

//       // Check if account and phone are found before proceeding
//       if (!selectedAccount || !selectedPhone) {
//         throw new Error("Selected account or phone number not found")
//       }

//       const response = await fetch("/api/whatsapp/accounts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           businessName: selectedAccount.name,
//           phoneNumber: selectedPhone.display_phone_number,
//           phoneNumberId: selectedPhoneNumber,
//           wabaId: selectedBusinessAccount,
//           accessToken,
//         }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to save WhatsApp account")
//       }

//       setCurrentStep(3)
//     } catch (error) {
//       console.error("Error verifying phone number:", error)
//       toast({
//         title: "Verification Failed",
//         description: "Could not verify your WhatsApp number. Please check the code and try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleCompleteSetup = () => {
//     router.push("/dashboard")
//   }

//   // Find the selected account and phone safely ly
//   const selectedAccount = businessAccounts.find((acc) => acc.id === selectedBusinessAccount)
//   const selectedPhone = phoneNumbers.find((phone) => phone.id === selectedPhoneNumber)

//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center p-4">
//       <Card className="w-full max-w-3xl border-border">
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl">Connect Your WhatsApp Business Account</CardTitle>
//           <CardDescription>Complete these steps to start automating your WhatsApp messages</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex justify-between mb-8">
//             <div className="flex flex-col items-center">
//               <div
//                 className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-primary" : "bg-muted"}`}
//               >
//                 1
//               </div>
//               <span className="text-xs mt-1">Connect Meta</span>
//             </div>
//             <div className="flex-1 flex items-center">
//               <div className={`h-1 w-full ${currentStep >= 2 ? "bg-primary" : "bg-muted"}`}></div>
//             </div>
//             <div className="flex flex-col items-center">
//               <div
//                 className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-primary" : "bg-muted"}`}
//               >
//                 2
//               </div>
//               <span className="text-xs mt-1">Verify Number</span>
//             </div>
//             <div className="flex-1 flex items-center">
//               <div className={`h-1 w-full ${currentStep >= 3 ? "bg-primary" : "bg-muted"}`}></div>
//             </div>
//             <div className="flex flex-col items-center">
//               <div
//                 className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-primary" : "bg-muted"}`}
//               >
//                 3
//               </div>
//               <span className="text-xs mt-1">Complette</span>
//             </div>
//           </div>

//           {currentStep === 1 && (
//             <div className="space-y-6">
//               <div className="bg-muted p-4 rounded-lg">
//                 <h3 className="font-medium mb-2">Requirements:</h3>
//                 <ul className="space-y-2">
//                   <li className="flex items-start">
//                     <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
//                     <span>A Meta Business Account</span>
//                   </li>
//                   <li className="flex items-start">
//                     <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
//                     <span>A WhatsApp Business Account</span>
//                   </li>
//                   <li className="flex items-start">
//                     <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
//                     <span>Admin access to your Meta Business Manager</span>
//                   </li>
//                 </ul>
//               </div>

//               <div className="text-center">
//                 <Button size="lg" onClick={handleConnectMeta} className="gap-2" disabled={isLoading}>
//                   <Facebook className="h-5 w-5" />
//                   Connect with Meta Business
//                 </Button>
//                 <p className="text-sm text-muted-foreground mt-2">
//                   We&apos;ll redirect you to Meta to authorize access to your WhatsApp Business account.
//                 </p>
//               </div>
//             </div>
//           )}

//           {currentStep === 2 && (
//             <div className="space-y-6">
//               {businessAccounts.length > 0 && (
//                 <div className="space-y-4">
//                   <h3 className="font-medium">Select WhatsApp Business Account:</h3>
//                   <Select
//                     value={selectedBusinessAccount}
//                     onValueChange={handleBusinessAccountSelect}
//                     disabled={isLoading}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a business account" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {businessAccounts.map((account) => (
//                         <SelectItem key={account.id} value={account.id}>
//                           {account.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               )}

//               {phoneNumbers.length > 0 && (
//                 <div className="space-y-4">
//                   <h3 className="font-medium">Select WhatsApp Phone Number:</h3>
//                   <Select value={selectedPhoneNumber} onValueChange={handlePhoneNumberSelect} disabled={isLoading}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a phone number" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {phoneNumbers.map((phone) => (
//                         <SelectItem key={phone.id} value={phone.id}>
//                           {phone.display_phone_number}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               )}

//               {selectedPhoneNumber && (
//                 <div className="space-y-4">
//                   <h3 className="font-medium">Verify Your WhatsApp Number</h3>
//                   <p className="text-sm text-muted-foreground">
//                     We&apos;ve sent a verification code to your WhatsApp Business number. Please enter it below.
//                   </p>

//                   <div className="space-y-2">
//                     <Label htmlFor="verification-code">Verification Code</Label>
//                     <Input
//                       id="verification-code"
//                       placeholder="Enter 6-digit code"
//                       value={verificationCode}
//                       onChange={(e) => setVerificationCode(e.target.value)}
//                       disabled={isLoading}
//                     />
//                   </div>

//                   <Button
//                     onClick={handleVerifyNumber}
//                     disabled={verificationCode.length !== 6 || isLoading}
//                     className="w-full"
//                   >
//                     {isLoading ? "Verifying..." : "Verify Number"}
//                   </Button>
//                 </div>
//               )}
//             </div>
//           )}

//           {currentStep === 3 && (
//             <div className="space-y-6 text-center">
//               <div className="flex justify-center">
//                 <div className="bg-primary/20 p-6 rounded-full">
//                   <CheckCircle2 className="h-16 w-16 text-primary" />
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-xl font-medium">Setup Complete!</h3>
//                 <p className="text-muted-foreground mt-1">
//                   Your WhatsApp Business account has been successfully connected.
//                 </p>
//               </div>

//               <div className="bg-muted p-4 rounded-lg text-left">
//                 <h4 className="font-medium mb-2">Connected Account Details:</h4>
//                 <ul className="space-y-2 text-sm">
//                   <li className="flex justify-between">
//                     <span className="text-muted-foreground">Business Name:</span>
//                     <span className="font-medium">{selectedAccount?.name || ""}</span>
//                   </li>
//                   <li className="flex justify-between">
//                     <span className="text-muted-foreground">WhatsApp Number:</span>
//                     <span className="font-medium">{selectedPhone?.display_phone_number || ""}</span>
//                   </li>
//                   <li className="flex justify-between">
//                     <span className="text-muted-foreground">Status:</span>
//                     <Badge>Active</Badge>
//                   </li>
//                 </ul>
//               </div>

//               <Button size="lg" onClick={handleCompleteSetup} className="gap-2">
//                 Go to Dashboard <ArrowRight className="h-4 w-4" />
//               </Button>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


// "use client"

// import { useState, useEffect } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { CheckCircle2, AlertCircle, ArrowRight, Facebook } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useToast } from "@/hooks/use-toast"
// import {
//   getWhatsAppBusinessAccounts,
//   getWhatsAppPhoneNumbers,
//   requestVerificationCode,
//   verifyPhoneNumber,
//   subscribeAppToWhatsAppBusinessAccount,
// } from "@/lib/whatsapp-api"
// import type { WhatsAppBusinessAccount, WhatsAppPhoneNumber } from "@/types/whatsapp"

// // IMPORTANT: This must be the exact same string used in both places
// const EXACT_REDIRECT_URI = "https://yazil.vercel.app/callback/whatsapp"

// function WhatsAppCallbackComponent() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const { toast } = useToast()
//   const [currentStep, setCurrentStep] = useState(1)
//   const [isLoading, setIsLoading] = useState(false)
//   const [verificationCode, setVerificationCode] = useState("")
//   const [accessToken, setAccessToken] = useState("")
//   const [businessAccounts, setBusinessAccounts] = useState<WhatsAppBusinessAccount[]>([])
//   const [selectedBusinessAccount, setSelectedBusinessAccount] = useState("")
//   const [phoneNumbers, setPhoneNumbers] = useState<WhatsAppPhoneNumber[]>([])
//   const [selectedPhoneNumber, setSelectedPhoneNumber] = useState("")

//   // Check if we're returning from Meta OAuth flow
//   useEffect(() => {
//     const code = searchParams.get("code")
//     const error = searchParams.get("error")

//     if (error) {
//       toast({
//         title: "Authentication Failed",
//         description: error,
//         variant: "destructive",
//       })
//       return
//     }

//     if (code) {
//       // Exchange code for access token
//       exchangeCodeForToken(code)
//     }
//   }, [searchParams, toast])

//   const exchangeCodeForToken = async (code: string) => {
//     setIsLoading(true)
//     try {
//       console.log("Exchanging code for token with redirect URI:", EXACT_REDIRECT_URI)

//       const response = await fetch("/api/auth/meta-callback", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           code,
//           redirectUri: EXACT_REDIRECT_URI, // Use the hardcoded constant
//         }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to exchange code for token")
//       }

//       setAccessToken(data.accessToken)

//       // Fetch business accounts
//       const accounts = await getWhatsAppBusinessAccounts(data.accessToken)
//       setBusinessAccounts(accounts)

//       setCurrentStep(2)
//     } catch (error) {
//       console.error("Error exchanging code for token:", error)
//       toast({
//         title: "Authentication Failed",
//         description: "Could not connect to Meta. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleConnectMeta = () => {
//     // Redirect to Meta OAuth flow using the exact same redirect URI
//     const metaOAuthUrl = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_META_APP_ID}&redirect_uri=${encodeURIComponent(EXACT_REDIRECT_URI)}&scope=whatsapp_business_management,whatsapp_business_messaging`

//     window.location.href = metaOAuthUrl
//   }

//   const handleBusinessAccountSelect = async (wabaId: string) => {
//     setIsLoading(true)
//     setSelectedBusinessAccount(wabaId)

//     try {
//       // Fetch phone numbers for this business account
//       const numbers = await getWhatsAppPhoneNumbers(accessToken, wabaId)
//       setPhoneNumbers(numbers)

//       // Subscribe app to WABA
//       await subscribeAppToWhatsAppBusinessAccount(accessToken, wabaId)
//     } catch (error) {
//       console.error("Error fetching phone numbers:", error)
//       toast({
//         title: "Error",
//         description: "Could not fetch phone numbers. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handlePhoneNumberSelect = async (phoneNumberId: string) => {
//     setSelectedPhoneNumber(phoneNumberId)

//     try {
//       // Request verification code
//       await requestVerificationCode(accessToken, phoneNumberId)

//       toast({
//         title: "Verification Code Sent",
//         description: "A verification code has been sent to your WhatsApp number.",
//       })
//     } catch (error) {
//       console.error("Error requesting verification code:", error)
//       toast({
//         title: "Error",
//         description: "Could not send verification code. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleVerifyNumber = async () => {
//     setIsLoading(true)

//     try {
//       // Verify the phone number with the code
//       await verifyPhoneNumber(accessToken, selectedPhoneNumber, verificationCode)

//       // Find the selected account and phone
//       const selectedAccount = businessAccounts.find((acc) => acc.id === selectedBusinessAccount)
//       const selectedPhone = phoneNumbers.find((phone) => phone.id === selectedPhoneNumber)

//       // Check if account and phone are found before proceeding
//       if (!selectedAccount || !selectedPhone) {
//         throw new Error("Selected account or phone number not found")
//       }

//       const response = await fetch("/api/whatsapp/accounts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           businessName: selectedAccount.name,
//           phoneNumber: selectedPhone.display_phone_number,
//           phoneNumberId: selectedPhoneNumber,
//           wabaId: selectedBusinessAccount,
//           accessToken,
//         }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to save WhatsApp account")
//       }

//       setCurrentStep(3)
//     } catch (error) {
//       console.error("Error verifying phone number:", error)
//       toast({
//         title: "Verification Failed",
//         description: "Could not verify your WhatsApp number. Please check the code and try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleCompleteSetup = () => {
//     router.push("/dashboard")
//   }

//   // Find the selected account and phone safely
//   const selectedAccount = businessAccounts.find((acc) => acc.id === selectedBusinessAccount)
//   const selectedPhone = phoneNumbers.find((phone) => phone.id === selectedPhoneNumber)

//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center p-4">
//       <Card className="w-full max-w-3xl border-border">
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl">Connect Your WhatsApp Business Account</CardTitle>
//           <CardDescription>Complete these steps to start automating your WhatsApp messages</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex justify-between mb-8">
//             <div className="flex flex-col items-center">
//               <div
//                 className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-primary" : "bg-muted"}`}
//               >
//                 1
//               </div>
//               <span className="text-xs mt-1">Connect Meta</span>
//             </div>
//             <div className="flex-1 flex items-center">
//               <div className={`h-1 w-full ${currentStep >= 2 ? "bg-primary" : "bg-muted"}`}></div>
//             </div>
//             <div className="flex flex-col items-center">
//               <div
//                 className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-primary" : "bg-muted"}`}
//               >
//                 2
//               </div>
//               <span className="text-xs mt-1">Verify Number</span>
//             </div>
//             <div className="flex-1 flex items-center">
//               <div className={`h-1 w-full ${currentStep >= 3 ? "bg-primary" : "bg-muted"}`}></div>
//             </div>
//             <div className="flex flex-col items-center">
//               <div
//                 className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-primary" : "bg-muted"}`}
//               >
//                 3
//               </div>
//               <span className="text-xs mt-1">Complete</span>
//             </div>
//           </div>

//           {currentStep === 1 && (
//             <div className="space-y-6">
//               <div className="bg-muted p-4 rounded-lg">
//                 <h3 className="font-medium mb-2">Requirements:</h3>
//                 <ul className="space-y-2">
//                   <li className="flex items-start">
//                     <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
//                     <span>A Meta Business Account</span>
//                   </li>
//                   <li className="flex items-start">
//                     <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
//                     <span>A WhatsApp Business Account</span>
//                   </li>
//                   <li className="flex items-start">
//                     <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
//                     <span>Admin access to your Meta Business Manager</span>
//                   </li>
//                 </ul>
//               </div>

//               <div className="text-center">
//                 <Button size="lg" onClick={handleConnectMeta} className="gap-2" disabled={isLoading}>
//                   <Facebook className="h-5 w-5" />
//                   Connect with Meta Business
//                 </Button>
//                 <p className="text-sm text-muted-foreground mt-2">
//                   We&apos;ll redirect you to Meta to authorize access to your WhatsApp Business account.
//                 </p>
//               </div>
//             </div>
//           )}

//           {currentStep === 2 && (
//             <div className="space-y-6">
//               {businessAccounts.length > 0 && (
//                 <div className="space-y-4">
//                   <h3 className="font-medium">Select WhatsApp Business Account:</h3>
//                   <Select
//                     value={selectedBusinessAccount}
//                     onValueChange={handleBusinessAccountSelect}
//                     disabled={isLoading}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a business account" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {businessAccounts.map((account) => (
//                         <SelectItem key={account.id} value={account.id}>
//                           {account.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               )}

//               {phoneNumbers.length > 0 && (
//                 <div className="space-y-4">
//                   <h3 className="font-medium">Select WhatsApp Phone Number:</h3>
//                   <Select value={selectedPhoneNumber} onValueChange={handlePhoneNumberSelect} disabled={isLoading}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a phone number" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {phoneNumbers.map((phone) => (
//                         <SelectItem key={phone.id} value={phone.id}>
//                           {phone.display_phone_number}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               )}

//               {selectedPhoneNumber && (
//                 <div className="space-y-4">
//                   <h3 className="font-medium">Verify Your WhatsApp Number</h3>
//                   <p className="text-sm text-muted-foreground">
//                     We&apos;ve sent a verification code to your WhatsApp Business number. Please enter it below.
//                   </p>

//                   <div className="space-y-2">
//                     <Label htmlFor="verification-code">Verification Code</Label>
//                     <Input
//                       id="verification-code"
//                       placeholder="Enter 6-digit code"
//                       value={verificationCode}
//                       onChange={(e) => setVerificationCode(e.target.value)}
//                       disabled={isLoading}
//                     />
//                   </div>

//                   <Button
//                     onClick={handleVerifyNumber}
//                     disabled={verificationCode.length !== 6 || isLoading}
//                     className="w-full"
//                   >
//                     {isLoading ? "Verifying..." : "Verify Number"}
//                   </Button>
//                 </div>
//               )}
//             </div>
//           )}

//           {currentStep === 3 && (
//             <div className="space-y-6 text-center">
//               <div className="flex justify-center">
//                 <div className="bg-primary/20 p-6 rounded-full">
//                   <CheckCircle2 className="h-16 w-16 text-primary" />
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-xl font-medium">Setup Complete!</h3>
//                 <p className="text-muted-foreground mt-1">
//                   Your WhatsApp Business account has been successfully connected.
//                 </p>
//               </div>

//               <div className="bg-muted p-4 rounded-lg text-left">
//                 <h4 className="font-medium mb-2">Connected Account Details:</h4>
//                 <ul className="space-y-2 text-sm">
//                   <li className="flex justify-between">
//                     <span className="text-muted-foreground">Business Name:</span>
//                     <span className="font-medium">{selectedAccount?.name || ""}</span>
//                   </li>
//                   <li className="flex justify-between">
//                     <span className="text-muted-foreground">WhatsApp Number:</span>
//                     <span className="font-medium">{selectedPhone?.display_phone_number || ""}</span>
//                   </li>
//                   <li className="flex justify-between">
//                     <span className="text-muted-foreground">Status:</span>
//                     <Badge>Active</Badge>
//                   </li>
//                 </ul>
//               </div>

//               <Button size="lg" onClick={handleCompleteSetup} className="gap-2">
//                 Go to Dashboard <ArrowRight className="h-4 w-4" />
//               </Button>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export const dynamic = "force-dynamic"

// export default function WhatsAppCallbackPage() {
//   return <WhatsAppCallbackComponent />
// }

import WhatsAppCallbackComponent from "@/components/global/wapp/whatsapp-callback"

export const dynamic = "force-dynamic"

export default function WhatsAppCallbackPage() {
  return <WhatsAppCallbackComponent />
}

