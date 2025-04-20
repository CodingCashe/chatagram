// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import {
//   Instagram,
//   PhoneIcon as WhatsApp,
//   Plus,
//   CheckCircle,
//   AlertCircle,
//   Info,
//   RefreshCw,
//   Loader2,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { useToast } from "@/hooks/use-toast"
// import { useQuery, useQueryClient } from "@tanstack/react-query"
// import { onUserInfo } from "@/actions/user"
// import { refreshInstagramData } from "@/actions/integrations"
// import IntegrationCard from "./integration-card"
// import RequirementsModal from "./requirements-modal"
// import AccountsList from "./accounts-list"
// import PlatformBenefits from "./platform-benefits"
// import ConnectionStatus from "./connection-status"
// import UsageStats from "./usage-stats"
// import RecentActivity from "./recent-activity"
// import IntegrationInsights from "./integration-insights"
// import { useSearchParams } from "next/navigation"

// export default function IntegrationsPage() {
//   const [activeTab, setActiveTab] = useState("all")
//   const [showRequirements, setShowRequirements] = useState<string | null>(null)
//   const [isRefreshing, setIsRefreshing] = useState(false)
//   const { toast } = useToast()
//   const queryClient = useQueryClient()
//   const searchParams = useSearchParams()

//   // Check for OAuth code in URL (for Instagram callback)
//   const code = searchParams.get("code")

//   // Fetch user data including integrations
//   const {
//     data: userData,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["user-profile"],
//     queryFn: onUserInfo,
//   })

//   // Handle Instagram OAuth callback
//   useEffect(() => {
//     if (code) {
//       // The code will be processed by your server-side code
//       toast({
//         title: "Instagram Connected",
//         description: "Your Instagram account has been successfully connected.",
//         duration: 5000,
//       })

//       // Refresh the user data to include the new integration
//       queryClient.invalidateQueries({ queryKey: ["user-profile"] })
//     }
//   }, [code, toast, queryClient])

//   // Transform real user data into the format needed for our components
//   const transformUserData = () => {
//     if (!userData?.data?.integrations)
//       return {
//         instagram: [],
//         whatsapp: [],
//       }

//     const instagramAccounts = userData.data.integrations
//       .filter((integration: any) => integration.name === "INSTAGRAM")
//       .map((integration: any) => ({
//         id: integration.id,
//         username: integration.username || integration.instagramId,
//         avatar: integration.profilePicture || "/placeholder.svg?height=40&width=40",
//         isActive: true, // Assuming all connected accounts are active
//       }))

//     const whatsappAccounts = userData.data.integrations
//       .filter((integration: any) => integration.name === "CRM")
//       .map((integration: any) => ({
//         id: integration.id,
//         phone: integration.phone || "+1 (555) 123-4567", // Fallback if not available
//         name: integration.name || "Business Line",
//         avatar: integration.profilePicture || "/placeholder.svg?height=40&width=40",
//         isActive: true, // Assuming all connected accounts are active
//       }))

//     return {
//       instagram: instagramAccounts,
//       whatsapp: whatsappAccounts,
//     }
//   }

//   const connectedAccounts = transformUserData()

//   const handleAddAccount = (platform: string) => {
//     setShowRequirements(platform)
//   }

//   const handleRemoveAccount = (platform: string, id: string) => {
//     // In a real app, you would call an API to remove the account
//     // For now, we'll just show a toast
//     toast({
//       title: "Account Removed",
//       description: `Your ${platform} account has been successfully removed.`,
//       duration: 3000,
//     })

//     // Refresh the user data
//     queryClient.invalidateQueries({ queryKey: ["user-profile"] })
//   }

//   const handleRefreshData = async () => {
//     setIsRefreshing(true)
//     try {
//       // Use the actual user ID from userData
//       const userId = userData?.data?.id || "user123"
//       const result = await refreshInstagramData(userId)

//       if (result.status === 200) {
//         toast({
//           title: "Data Refreshed",
//           description: "Your Instagram data has been successfully updated.",
//           duration: 3000,
//         })

//         // Refresh the user data
//         queryClient.invalidateQueries({ queryKey: ["user-profile"] })
//       } else {
//         toast({
//           title: "Refresh Failed",
//           description: result.message || "Failed to refresh Instagram data.",
//           variant: "destructive",
//           duration: 3000,
//         })
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred.",
//         variant: "destructive",
//         duration: 3000,
//       })
//     } finally {
//       setIsRefreshing(false)
//     }
//   }

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//       },
//     },
//   }

//   if (isLoading) {
//     return (
//       <div className="container max-w-5xl py-20 flex flex-col items-center justify-center">
//         <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
//         <p className="text-muted-foreground">Loading your integrations...</p>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="container max-w-5xl py-20">
//         <Alert variant="destructive">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>Failed to load your integration data. Please try refreshing the page.</AlertDescription>
//         </Alert>
//       </div>
//     )
//   }

//   return (
//     <div className="container max-w-5xl py-10 space-y-8">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="space-y-2"
//       >
//         <div className="flex items-center justify-between">
//           <h1 className="text-3xl font-bold tracking-tight">Account Integrations</h1>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={handleRefreshData}
//             disabled={isRefreshing}
//             className="flex items-center gap-2"
//           >
//             {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
//             Refresh Data
//           </Button>
//         </div>
//         <p className="text-muted-foreground">Connect your social media accounts to enhance your experience</p>
//       </motion.div>

//       <Alert className="float bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
//         <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
//         <AlertTitle className="text-blue-800 dark:text-blue-200">Integration Benefits</AlertTitle>
//         <AlertDescription className="text-blue-700 dark:text-blue-300">
//           Connecting your accounts enables seamless cross-platform posting, analytics tracking, and automated responses.
//         </AlertDescription>
//       </Alert>

//       <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="all">All Integrations</TabsTrigger>
//           <TabsTrigger value="instagram">Instagram</TabsTrigger>
//           <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
//         </TabsList>

//         <TabsContent value="all">
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="staggeredFadeIn grid gap-6 md:grid-cols-2"
//           >
//             <motion.div variants={itemVariants}>
//               <IntegrationCard
//                 title="Instagram"
//                 description="Connect your Instagram accounts to share content and analyze engagement"
//                 icon={<Instagram className="h-8 w-8 text-blue-600 dark:text-blue-400" />}
//                 strategy="INSTAGRAM"
//               />
//             </motion.div>

//             <motion.div variants={itemVariants}>
//               <IntegrationCard
//                 title="WhatsApp"
//                 description="Connect WhatsApp to enable messaging and customer support"
//                 icon={<WhatsApp className="h-8 w-8 text-blue-600 dark:text-blue-400" />}
//                 strategy="CRM"
//               />
//             </motion.div>
//           </motion.div>

//           <IntegrationInsights userData={userData?.data} />
//           <RecentActivity userData={userData?.data} />
//         </TabsContent>

//         <TabsContent value="instagram">
//           <ConnectionStatus
//             platform="instagram"
//             accounts={connectedAccounts.instagram}
//             onRefresh={handleRefreshData}
//             isRefreshing={isRefreshing}
//           />
//           <Card className="glassEffect mt-4">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <Instagram className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//                   <div>
//                     <CardTitle>Instagram Accounts</CardTitle>
//                     <CardDescription>Manage your connected Instagram accounts</CardDescription>
//                   </div>
//                 </div>
//                 <Button
//                   onClick={() => handleAddAccount("instagram")}
//                   className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
//                 >
//                   <Plus className="mr-2 h-4 w-4" /> Add Account
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <AccountsList
//                 accounts={connectedAccounts.instagram.map((account) => ({
//                   id: account.id,
//                   title: account.username,
//                   subtitle: `@${account.username}`,
//                   avatar: account.avatar,
//                   isActive: account.isActive,
//                   platform: "instagram",
//                 }))}
//                 onRemove={(id) => handleRemoveAccount("instagram", id)}
//               />
//             </CardContent>
//             <CardFooter className="flex flex-col items-start border-t p-4">
//               <h4 className="text-sm font-medium mb-2">Requirements for Instagram Integration:</h4>
//               <ul className="text-sm text-muted-foreground space-y-1">
//                 <li className="flex items-center">
//                   <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
//                   Public Instagram account
//                 </li>
//                 <li className="flex items-center">
//                   <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
//                   Business or Creator account type
//                 </li>
//                 <li className="flex items-center">
//                   <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
//                   Connected Facebook page
//                 </li>
//               </ul>
//             </CardFooter>
//           </Card>
//           <PlatformBenefits platform="instagram" />
//           <UsageStats platform="instagram" userData={userData?.data} />
//         </TabsContent>

//         <TabsContent value="whatsapp">
//           <ConnectionStatus
//             platform="whatsapp"
//             accounts={connectedAccounts.whatsapp}
//             onRefresh={handleRefreshData}
//             isRefreshing={isRefreshing}
//           />
//           <Card className="glassEffect mt-4">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <WhatsApp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//                   <div>
//                     <CardTitle>WhatsApp Accounts</CardTitle>
//                     <CardDescription>Manage your connected WhatsApp numbers</CardDescription>
//                   </div>
//                 </div>
//                 <Button
//                   onClick={() => handleAddAccount("whatsapp")}
//                   className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
//                 >
//                   <Plus className="mr-2 h-4 w-4" /> Add Account
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <AccountsList
//                 accounts={connectedAccounts.whatsapp.map((account) => ({
//                   id: account.id,
//                   title: account.name,
//                   subtitle: account.phone,
//                   avatar: account.avatar,
//                   isActive: account.isActive,
//                   platform: "whatsapp",
//                 }))}
//                 onRemove={(id) => handleRemoveAccount("whatsapp", id)}
//               />
//             </CardContent>
//             <CardFooter className="flex flex-col items-start border-t p-4">
//               <h4 className="text-sm font-medium mb-2">Requirements for WhatsApp Integration:</h4>
//               <ul className="text-sm text-muted-foreground space-y-1">
//                 <li className="flex items-center">
//                   <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
//                   WhatsApp Business account
//                 </li>
//                 <li className="flex items-center">
//                   <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
//                   Verified phone number
//                 </li>
//                 <li className="flex items-center">
//                   <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
//                   Business verification (recommended)
//                 </li>
//               </ul>
//             </CardFooter>
//           </Card>
//           <PlatformBenefits platform="whatsapp" />
//           <UsageStats platform="whatsapp" userData={userData?.data} />
//         </TabsContent>
//       </Tabs>

//       {showRequirements && <RequirementsModal platform={showRequirements} onClose={() => setShowRequirements(null)} />}
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Instagram,
  PhoneIcon as WhatsApp,
  Plus,
  CheckCircle,
  AlertCircle,
  Info,
  RefreshCw,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { onUserInfo } from "@/actions/user"
import { refreshInstagramData } from "@/actions/integrations"
import IntegrationCard from "./integration-card"
import RequirementsModal from "./requirements-modal"
import AccountsList from "./accounts-list"
import PlatformBenefits from "./platform-benefits"
import ConnectionStatus from "./connection-status"
// import UsageStats from "./usage-stats"
import IntegrationInsights from "./integration-insights"
import { useSearchParams } from "next/navigation"

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [showRequirements, setShowRequirements] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()

  // Check for OAuth code in URL (for Instagram callback)
  const code = searchParams.get("code")

  // Fetch user data including integrations
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: onUserInfo,
  })

  // Handle Instagram OAuth callback
  useEffect(() => {
    if (code) {
      // The code will be processed by your server-side code
      toast({
        title: "Instagram Connected",
        description: "Your Instagram account has been successfully connected.",
        duration: 5000,
      })

      // Refresh the user data to include the new integration
      queryClient.invalidateQueries({ queryKey: ["user-profile"] })
    }
  }, [code, toast, queryClient])

  // Transform real user data into the format needed for our components
  const transformUserData = () => {
    if (!userData?.data?.integrations || !Array.isArray(userData.data.integrations)) {
      return {
        instagram: [],
        whatsapp: [],
      }
    }

    try {
      const instagramAccounts = userData.data.integrations
        .filter((integration: any) => integration && integration.name === "INSTAGRAM")
        .map((integration: any) => ({
          id: integration.id || `instagram-${Math.random().toString(36).substr(2, 9)}`,
          username: integration.username || integration.instagramId || "instagram_user",
          avatar: integration.profilePicture || "/placeholder.svg?height=40&width=40",
          isActive: true, // Assuming all connected accounts are active
        }))

      const whatsappAccounts = userData.data.integrations
        .filter((integration: any) => integration && integration.name === "CRM")
        .map((integration: any) => ({
          id: integration.id || `whatsapp-${Math.random().toString(36).substr(2, 9)}`,
          phone: integration.phone || "+1 (555) 123-4567", // Fallback if not available
          name: integration.name || "Business Line",
          avatar: integration.profilePicture || "/placeholder.svg?height=40&width=40",
          isActive: true, // Assuming all connected accounts are active
        }))

      return {
        instagram: instagramAccounts,
        whatsapp: whatsappAccounts,
      }
    } catch (error) {
      console.error("Error transforming user data:", error)
      return {
        instagram: [],
        whatsapp: [],
      }
    }
  }

  const connectedAccounts = transformUserData()

  const handleAddAccount = (platform: string) => {
    setShowRequirements(platform)
  }

  const handleRemoveAccount = (platform: string, id: string) => {
    // In a real app, you would call an API to remove the account
    // For now, we'll just show a toast
    toast({
      title: "Account Removed",
      description: `Your ${platform} account has been successfully removed.`,
      duration: 3000,
    })

    // Refresh the user data
    queryClient.invalidateQueries({ queryKey: ["user-profile"] })
  }

  const handleRefreshData = async () => {
    setIsRefreshing(true)
    try {
      // Use the actual user ID from userData
      const userId = userData?.data?.id || "User"
      const result = await refreshInstagramData(userId)

      if (result.status === 200) {
        toast({
          title: "Data Refreshed",
          description: "Your Instagram data has been successfully updated.",
          duration: 3000,
        })

        // Refresh the user data
        queryClient.invalidateQueries({ queryKey: ["user-profile"] })
      } else {
        toast({
          title: "Refresh Failed",
          description: result.message || "Failed to refresh Instagram data.",
          variant: "destructive",
          duration: 3000,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  if (isLoading) {
    return (
      <div className="container max-w-5xl py-20 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
        <p className="text-muted-foreground">Loading your integrations...</p>
      </div>
    )
  }

  // if (error) {
  //   console.error("Error fetching user data:", error)
  //   return (
  //     <div className="container max-w-5xl py-20">
  //       <Alert variant="destructive">
  //         <AlertCircle className="h-4 w-4" />
  //         <AlertTitle>Error</AlertTitle>
  //         <AlertDescription>Failed to load your integration data. Please try refreshing the page.</AlertDescription>
  //       </Alert>
  //       <div className="mt-4 flex justify-center">
  //         <Button onClick={() => queryClient.invalidateQueries({ queryKey: ["user-profile"] })} variant="outline">
  //           Retry
  //         </Button>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="container max-w-5xl py-10 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Account Integrations</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshData}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh Data
          </Button>
        </div>
        <p className="text-muted-foreground">Connect your social media accounts to enhance your experience</p>
      </motion.div>

      <Alert className="float bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-800 dark:text-blue-200">Integration Benefits</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300">
          Connecting your accounts enables seamless cross-platform posting, analytics tracking, and automated responses.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Integrations</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="staggeredFadeIn grid gap-6 md:grid-cols-2"
          >
            <motion.div variants={itemVariants}>
              <IntegrationCard
                title="Instagram"
                description="Connect your Instagram accounts to share content and analyze engagement"
                icon={<Instagram className="h-8 w-8 text-blue-600 dark:text-blue-400" />}
                strategy="INSTAGRAM"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <IntegrationCard
                title="WhatsApp"
                description="Connect WhatsApp to enable messaging and customer support"
                icon={<WhatsApp className="h-8 w-8 text-blue-600 dark:text-blue-400" />}
                strategy="CRM"
              />
            </motion.div>
          </motion.div>

          <IntegrationInsights userData={userData?.data} />
        </TabsContent>

        <TabsContent value="instagram">
          <ConnectionStatus
            platform="instagram"
            accounts={connectedAccounts.instagram}
            onRefresh={handleRefreshData}
            isRefreshing={isRefreshing}
          />
          <Card className="glassEffect mt-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Instagram className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <CardTitle>Instagram Accounts</CardTitle>
                    <CardDescription>Manage your connected Instagram accounts</CardDescription>
                  </div>
                </div>
                <Button
                  onClick={() => handleAddAccount("instagram")}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Account
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <AccountsList
                accounts={connectedAccounts.instagram.map((account) => ({
                  id: account.id,
                  title: account.username,
                  subtitle: `@${account.username}`,
                  avatar: account.avatar,
                  isActive: account.isActive,
                  platform: "instagram",
                }))}
                onRemove={(id) => handleRemoveAccount("instagram", id)}
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start border-t p-4">
              <h4 className="text-sm font-medium mb-2">Requirements for Instagram Integration:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Public Instagram account
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Business or Creator account type
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Connected Facebook page
                </li>
              </ul>
            </CardFooter>
          </Card>
          <PlatformBenefits platform="instagram" />
        </TabsContent>

        <TabsContent value="whatsapp">
          <ConnectionStatus
            platform="whatsapp"
            accounts={connectedAccounts.whatsapp}
            onRefresh={handleRefreshData}
            isRefreshing={isRefreshing}
          />
          <Card className="glassEffect mt-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <WhatsApp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <CardTitle>WhatsApp Accounts</CardTitle>
                    <CardDescription>Manage your connected WhatsApp numbers</CardDescription>
                  </div>
                </div>
                <Button
                  onClick={() => handleAddAccount("whatsapp")}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Account
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <AccountsList
                accounts={connectedAccounts.whatsapp.map((account) => ({
                  id: account.id,
                  title: account.name,
                  subtitle: account.phone,
                  avatar: account.avatar,
                  isActive: account.isActive,
                  platform: "whatsapp",
                }))}
                onRemove={(id) => handleRemoveAccount("whatsapp", id)}
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start border-t p-4">
              <h4 className="text-sm font-medium mb-2">Requirements for WhatsApp Integration:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  WhatsApp Business account
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Verified phone number
                </li>
                <li className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                  Business verification (recommended)
                </li>
              </ul>
            </CardFooter>
          </Card>
          <PlatformBenefits platform="whatsapp" />
        </TabsContent>
      </Tabs>

      {showRequirements && <RequirementsModal platform={showRequirements} onClose={() => setShowRequirements(null)} />}
    </div>
  )
}

