// "use client"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"
// import { Instagram, Database, Bot, Upload, AlertCircle, CheckCircle, XCircle, Users } from "lucide-react"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { useState, useEffect } from "react"
// import { getDataSourceSettingsAction, updateDataSourceSettingsAction } from "@/actions/data-sources"
// import { toast } from "@/hooks/use-toast"

// export default function DataSourceSelector() {
//   const [settings, setSettings] = useState({
//     instagramApiActive: true,
//     thirdPartyActive: true,
//     webScrapingActive: true,
//     portalActive: true,
//     aiDiscoveryActive: true,
//     instagramRefreshRate: 6,
//     thirdPartyRefreshRate: 24,
//     webScrapingRateLimit: 60,
//     webScrapingDailyQuota: 1000,
//     rawDataRetention: 30,
//     processedDataRetention: 365,
//   })
//   const [loading, setLoading] = useState(true)
//   const [saving, setSaving] = useState(false)

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const result = await getDataSourceSettingsAction()
//         if (result.status === 200 && result.data) {
//           setSettings(result.data)
//         }
//       } catch (error) {
//         console.error("Error fetching data source settings:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchSettings()
//   }, [])

//   const handleToggle = (key: string, value: boolean) => {
//     setSettings({ ...settings, [key]: value })
//   }

//   const saveSettings = async () => {
//     setSaving(true)
//     try {
//       const result = await updateDataSourceSettingsAction(settings)
//       if (result.status === 200) {
//         toast({
//           title: "Settings saved",
//           description: "Your data source settings have been updated.",
//         })
//       } else {
//         toast({
//           title: "Error",
//           description: "Failed to save settings.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error saving data source settings:", error)
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred.",
//         variant: "destructive",
//       })
//     } finally {
//       setSaving(false)
//     }
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Data Sources</CardTitle>
//         <CardDescription>Configure and manage your influencer data sources</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Tabs defaultValue="overview">
//           <TabsList className="grid w-full grid-cols-5">
//             <TabsTrigger value="overview">Overview</TabsTrigger>
//             <TabsTrigger value="instagram">Instagram API</TabsTrigger>
//             <TabsTrigger value="third-party">Third-Party</TabsTrigger>
//             <TabsTrigger value="scraping">Web Scraping</TabsTrigger>
//             <TabsTrigger value="ai">AI Discovery</TabsTrigger>
//           </TabsList>

//           <TabsContent value="overview" className="pt-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//               <Card>
//                 <CardHeader className="p-4 pb-2">
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="text-sm flex items-center">
//                       <Instagram className="h-4 w-4 mr-2" />
//                       Instagram API
//                     </CardTitle>
//                     <Badge
//                       variant="outline"
//                       className={
//                         settings.instagramApiActive ? "text-green-500 border-green-500" : "text-red-500 border-red-500"
//                       }
//                     >
//                       {settings.instagramApiActive ? (
//                         <>
//                           <CheckCircle className="h-3 w-3 mr-1" /> Active
//                         </>
//                       ) : (
//                         <>
//                           <XCircle className="h-3 w-3 mr-1" /> Inactive
//                         </>
//                       )}
//                     </Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <p className="text-xs text-muted-foreground">Last updated: 2 hours ago</p>
//                   <p className="text-sm mt-2">1,245 profiles</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="p-4 pb-2">
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="text-sm flex items-center">
//                       <Database className="h-4 w-4 mr-2" />
//                       Third-Party
//                     </CardTitle>
//                     <Badge
//                       variant="outline"
//                       className={
//                         settings.thirdPartyActive ? "text-green-500 border-green-500" : "text-red-500 border-red-500"
//                       }
//                     >
//                       {settings.thirdPartyActive ? (
//                         <>
//                           <CheckCircle className="h-3 w-3 mr-1" /> Active
//                         </>
//                       ) : (
//                         <>
//                           <XCircle className="h-3 w-3 mr-1" /> Inactive
//                         </>
//                       )}
//                     </Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <p className="text-xs text-muted-foreground">Last updated: 1 day ago</p>
//                   <p className="text-sm mt-2">8,732 profiles</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="p-4 pb-2">
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="text-sm flex items-center">
//                       <Upload className="h-4 w-4 mr-2" />
//                       Web Scraping
//                     </CardTitle>
//                     <Badge
//                       variant="outline"
//                       className={
//                         settings.webScrapingActive ? "text-yellow-500 border-yellow-500" : "text-red-500 border-red-500"
//                       }
//                     >
//                       {settings.webScrapingActive ? (
//                         <>
//                           <AlertCircle className="h-3 w-3 mr-1" /> Limited
//                         </>
//                       ) : (
//                         <>
//                           <XCircle className="h-3 w-3 mr-1" /> Inactive
//                         </>
//                       )}
//                     </Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <p className="text-xs text-muted-foreground">Last updated: 3 days ago</p>
//                   <p className="text-sm mt-2">3,450 profiles</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="p-4 pb-2">
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="text-sm flex items-center">
//                       <Bot className="h-4 w-4 mr-2" />
//                       AI Discovery
//                     </CardTitle>
//                     <Badge
//                       variant="outline"
//                       className={
//                         settings.aiDiscoveryActive ? "text-green-500 border-green-500" : "text-red-500 border-red-500"
//                       }
//                     >
//                       {settings.aiDiscoveryActive ? (
//                         <>
//                           <CheckCircle className="h-3 w-3 mr-1" /> Active
//                         </>
//                       ) : (
//                         <>
//                           <XCircle className="h-3 w-3 mr-1" /> Inactive
//                         </>
//                       )}
//                     </Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <p className="text-xs text-muted-foreground">Last updated: 12 hours ago</p>
//                   <p className="text-sm mt-2">2,187 profiles</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="p-4 pb-2">
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="text-sm flex items-center">
//                       <Users className="h-4 w-4 mr-2" />
//                       Portal Signups
//                     </CardTitle>
//                     <Badge
//                       variant="outline"
//                       className={
//                         settings.portalActive ? "text-green-500 border-green-500" : "text-red-500 border-red-500"
//                       }
//                     >
//                       {settings.portalActive ? (
//                         <>
//                           <CheckCircle className="h-3 w-3 mr-1" /> Active
//                         </>
//                       ) : (
//                         <>
//                           <XCircle className="h-3 w-3 mr-1" /> Inactive
//                         </>
//                       )}
//                     </Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <p className="text-xs text-muted-foreground">Last updated: 5 hours ago</p>
//                   <p className="text-sm mt-2">876 profiles</p>
//                 </CardContent>
//               </Card>
//             </div>

//             <Alert className="mt-4">
//               <AlertCircle className="h-4 w-4" />
//               <AlertTitle>Data Source Health</AlertTitle>
//               <AlertDescription>
//                 All data sources are functioning normally. Web scraping is operating with rate limits to comply with
//                 platform policies.
//               </AlertDescription>
//             </Alert>
//           </TabsContent>

//           <TabsContent value="instagram" className="pt-4 space-y-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-lg font-medium">Instagram API Integration</h3>
//                 <p className="text-sm text-muted-foreground">
//                   Connect to the Instagram Graph API to gather basic profile data
//                 </p>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Switch
//                   id="instagram-active"
//                   checked={settings.instagramApiActive}
//                   onCheckedChange={(checked) => handleToggle("instagramApiActive", checked)}
//                 />
//                 <Label htmlFor="instagram-active">Active</Label>
//               </div>
//             </div>

//             <Button onClick={saveSettings} disabled={saving}>
//               {saving ? "Saving..." : "Save Settings"}
//             </Button>
//           </TabsContent>

//           {/* Other tabs would be implemented similarly */}
//         </Tabs>
//       </CardContent>
//     </Card>
//   )
// }

// "use client"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"
// import { Instagram, Database, Bot, Upload, AlertCircle, CheckCircle, XCircle, Users } from "lucide-react"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { useState, useEffect } from "react"
// import { getDataSourceSettingsAction, updateDataSourceSettingsAction } from "@/actions/data-sources"
// import { toast } from "@/hooks/use-toast"

// interface DataSourceSettings {
//   instagramApiActive: boolean
//   thirdPartyActive: boolean
//   webScrapingActive: boolean
//   portalActive: boolean
//   aiDiscoveryActive: boolean
//   instagramRefreshRate: number
//   thirdPartyRefreshRate: number
//   webScrapingRateLimit: number
//   webScrapingDailyQuota: number
//   rawDataRetention: number
//   processedDataRetention: number
// }

// export default function DataSourceSelector() {
//   const [settings, setSettings] = useState<DataSourceSettings>({
//     instagramApiActive: true,
//     thirdPartyActive: true,
//     webScrapingActive: true,
//     portalActive: true,
//     aiDiscoveryActive: true,
//     instagramRefreshRate: 6,
//     thirdPartyRefreshRate: 24,
//     webScrapingRateLimit: 60,
//     webScrapingDailyQuota: 1000,
//     rawDataRetention: 30,
//     processedDataRetention: 365,
//   })
//   const [loading, setLoading] = useState(true)
//   const [saving, setSaving] = useState(false)

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const result = await getDataSourceSettingsAction()
//         if (result.status === 200 && result.data) {
//           // Check if result.data is an object and has the expected properties
//           if (typeof result.data === "object" && result.data !== null) {
//             // Create a new settings object by merging the default settings with the fetched data
//             // This ensures all required properties exist even if some are missing from the API
//             setSettings((prevSettings) => ({
//               ...prevSettings,
//               ...(result.data as Partial<DataSourceSettings>),
//             }))
//           } else {
//             console.error("Unexpected data format:", result.data)
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching data source settings:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchSettings()
//   }, [])

//   const handleToggle = (key: keyof DataSourceSettings, value: boolean) => {
//     setSettings({ ...settings, [key]: value })
//   }

//   const saveSettings = async () => {
//     setSaving(true)
//     try {
//       const result = await updateDataSourceSettingsAction(settings)
//       if (result.status === 200) {
//         toast({
//           title: "Settings saved",
//           description: "Your data source settings have been updated.",
//         })
//       } else {
//         toast({
//           title: "Error",
//           description: "Failed to save settings.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error saving data source settings:", error)
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred.",
//         variant: "destructive",
//       })
//     } finally {
//       setSaving(false)
//     }
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Data Sources</CardTitle>
//         <CardDescription>Configure and manage your influencer data sources</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Tabs defaultValue="overview">
//           <TabsList className="grid w-full grid-cols-5">
//             <TabsTrigger value="overview">Overview</TabsTrigger>
//             <TabsTrigger value="instagram">Instagram API</TabsTrigger>
//             <TabsTrigger value="third-party">Third-Party</TabsTrigger>
//             <TabsTrigger value="scraping">Web Scraping</TabsTrigger>
//             <TabsTrigger value="ai">AI Discovery</TabsTrigger>
//           </TabsList>

//           <TabsContent value="overview" className="pt-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//               <Card>
//                 <CardHeader className="p-4 pb-2">
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="text-sm flex items-center">
//                       <Instagram className="h-4 w-4 mr-2" />
//                       Instagram API
//                     </CardTitle>
//                     <Badge
//                       variant="outline"
//                       className={
//                         settings.instagramApiActive ? "text-green-500 border-green-500" : "text-red-500 border-red-500"
//                       }
//                     >
//                       {settings.instagramApiActive ? (
//                         <>
//                           <CheckCircle className="h-3 w-3 mr-1" /> Active
//                         </>
//                       ) : (
//                         <>
//                           <XCircle className="h-3 w-3 mr-1" /> Inactive
//                         </>
//                       )}
//                     </Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <p className="text-xs text-muted-foreground">Last updated: 2 hours ago</p>
//                   <p className="text-sm mt-2">1,245 profiles</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="p-4 pb-2">
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="text-sm flex items-center">
//                       <Database className="h-4 w-4 mr-2" />
//                       Third-Party
//                     </CardTitle>
//                     <Badge
//                       variant="outline"
//                       className={
//                         settings.thirdPartyActive ? "text-green-500 border-green-500" : "text-red-500 border-red-500"
//                       }
//                     >
//                       {settings.thirdPartyActive ? (
//                         <>
//                           <CheckCircle className="h-3 w-3 mr-1" /> Active
//                         </>
//                       ) : (
//                         <>
//                           <XCircle className="h-3 w-3 mr-1" /> Inactive
//                         </>
//                       )}
//                     </Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <p className="text-xs text-muted-foreground">Last updated: 1 day ago</p>
//                   <p className="text-sm mt-2">8,732 profiles</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="p-4 pb-2">
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="text-sm flex items-center">
//                       <Upload className="h-4 w-4 mr-2" />
//                       Web Scraping
//                     </CardTitle>
//                     <Badge
//                       variant="outline"
//                       className={
//                         settings.webScrapingActive ? "text-yellow-500 border-yellow-500" : "text-red-500 border-red-500"
//                       }
//                     >
//                       {settings.webScrapingActive ? (
//                         <>
//                           <AlertCircle className="h-3 w-3 mr-1" /> Limited
//                         </>
//                       ) : (
//                         <>
//                           <XCircle className="h-3 w-3 mr-1" /> Inactive
//                         </>
//                       )}
//                     </Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <p className="text-xs text-muted-foreground">Last updated: 3 days ago</p>
//                   <p className="text-sm mt-2">3,450 profiles</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="p-4 pb-2">
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="text-sm flex items-center">
//                       <Bot className="h-4 w-4 mr-2" />
//                       AI Discovery
//                     </CardTitle>
//                     <Badge
//                       variant="outline"
//                       className={
//                         settings.aiDiscoveryActive ? "text-green-500 border-green-500" : "text-red-500 border-red-500"
//                       }
//                     >
//                       {settings.aiDiscoveryActive ? (
//                         <>
//                           <CheckCircle className="h-3 w-3 mr-1" /> Active
//                         </>
//                       ) : (
//                         <>
//                           <XCircle className="h-3 w-3 mr-1" /> Inactive
//                         </>
//                       )}
//                     </Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <p className="text-xs text-muted-foreground">Last updated: 12 hours ago</p>
//                   <p className="text-sm mt-2">2,187 profiles</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="p-4 pb-2">
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="text-sm flex items-center">
//                       <Users className="h-4 w-4 mr-2" />
//                       Portal Signups
//                     </CardTitle>
//                     <Badge
//                       variant="outline"
//                       className={
//                         settings.portalActive ? "text-green-500 border-green-500" : "text-red-500 border-red-500"
//                       }
//                     >
//                       {settings.portalActive ? (
//                         <>
//                           <CheckCircle className="h-3 w-3 mr-1" /> Active
//                         </>
//                       ) : (
//                         <>
//                           <XCircle className="h-3 w-3 mr-1" /> Inactive
//                         </>
//                       )}
//                     </Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <p className="text-xs text-muted-foreground">Last updated: 5 hours ago</p>
//                   <p className="text-sm mt-2">876 profiles</p>
//                 </CardContent>
//               </Card>
//             </div>

//             <Alert className="mt-4">
//               <AlertCircle className="h-4 w-4" />
//               <AlertTitle>Data Source Health</AlertTitle>
//               <AlertDescription>
//                 All data sources are functioning normally. Web scraping is operating with rate limits to comply with
//                 platform policies.
//               </AlertDescription>
//             </Alert>
//           </TabsContent>

//           <TabsContent value="instagram" className="pt-4 space-y-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-lg font-medium">Instagram API Integration</h3>
//                 <p className="text-sm text-muted-foreground">
//                   Connect to the Instagram Graph API to gather basic profile data
//                 </p>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Switch
//                   id="instagram-active"
//                   checked={settings.instagramApiActive}
//                   onCheckedChange={(checked) => handleToggle("instagramApiActive", checked)}
//                 />
//                 <Label htmlFor="instagram-active">Active</Label>
//               </div>
//             </div>

//             <Button onClick={saveSettings} disabled={saving}>
//               {saving ? "Saving..." : "Save Settings"}
//             </Button>
//           </TabsContent>

//           {/* Other tabs would be implemented similarly */}
//         </Tabs>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Instagram, Database, Bot, Upload, AlertCircle, CheckCircle, XCircle, Users, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useState, useEffect } from "react"
import { getDataSourceSettingsAction, updateDataSourceSettingsAction } from "@/actions/data-sources"
import { useToast } from "@/hooks/use-toast"

interface DataSourceSettings {
  instagramApiActive: boolean
  thirdPartyActive: boolean
  webScrapingActive: boolean
  portalActive: boolean
  aiDiscoveryActive: boolean
  instagramRefreshRate: number
  thirdPartyRefreshRate: number
  webScrapingRateLimit: number
  webScrapingDailyQuota: number
  rawDataRetention: number
  processedDataRetention: number
}

export default function DataSourceSelector() {
  const { toast } = useToast()
  const [settings, setSettings] = useState<DataSourceSettings>({
    instagramApiActive: true,
    thirdPartyActive: true,
    webScrapingActive: true,
    portalActive: true,
    aiDiscoveryActive: true,
    instagramRefreshRate: 6,
    thirdPartyRefreshRate: 24,
    webScrapingRateLimit: 60,
    webScrapingDailyQuota: 1000,
    rawDataRetention: 30,
    processedDataRetention: 365,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await getDataSourceSettingsAction()
        if (result.status === 200) {
          // Check if result.data is an object
          if (typeof result.data === "object" && result.data !== null) {
            // Create a new settings object by merging the default settings with the fetched data
            setSettings((prevSettings) => ({
              ...prevSettings,
              ...(result.data as Partial<DataSourceSettings>),
            }))
          } else {
            setError("Unexpected data format received from server")
            toast({
              title: "Error",
              description: "Unexpected data format received from server",
              variant: "destructive",
            })
          }
        } else {
          setError(typeof result.data === "string" ? result.data : "Failed to fetch settings")
          toast({
            title: "Error",
            description: typeof result.data === "string" ? result.data : "Failed to fetch settings",
            variant: "destructive",
          })
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch data source settings"
        setError(errorMessage)
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
        console.error("Error fetching data source settings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [toast])

  const handleToggle = (key: keyof DataSourceSettings, value: boolean) => {
    setSettings({ ...settings, [key]: value })
  }

  const saveSettings = async () => {
    setSaving(true)
    setError(null)
    try {
      const result = await updateDataSourceSettingsAction(settings)
      if (result.status === 200) {
        toast({
          title: "Settings saved",
          description: "Your data source settings have been updated.",
        })
      } else {
        setError(typeof result.data === "string" ? result.data : "Failed to save settings")
        toast({
          title: "Error",
          description: typeof result.data === "string" ? result.data : "Failed to save settings",
          variant: "destructive",
        })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to save data source settings"
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      console.error("Error saving data source settings:", error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Data Sources</CardTitle>
          <CardDescription>Configure and manage your influencer data sources</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Sources</CardTitle>
        <CardDescription>Configure and manage your influencer data sources</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="instagram">Instagram API</TabsTrigger>
            <TabsTrigger value="third-party">Third-Party</TabsTrigger>
            <TabsTrigger value="scraping">Web Scraping</TabsTrigger>
            <TabsTrigger value="ai">AI Discovery</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm flex items-center">
                      <Instagram className="h-4 w-4 mr-2" />
                      Instagram API
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        settings.instagramApiActive ? "text-green-500 border-green-500" : "text-red-500 border-red-500"
                      }
                    >
                      {settings.instagramApiActive ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" /> Active
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 mr-1" /> Inactive
                        </>
                      )}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs text-muted-foreground">Last updated: 2 hours ago</p>
                  <p className="text-sm mt-2">1,245 profiles</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm flex items-center">
                      <Database className="h-4 w-4 mr-2" />
                      Third-Party
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        settings.thirdPartyActive ? "text-green-500 border-green-500" : "text-red-500 border-red-500"
                      }
                    >
                      {settings.thirdPartyActive ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" /> Active
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 mr-1" /> Inactive
                        </>
                      )}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs text-muted-foreground">Last updated: 1 day ago</p>
                  <p className="text-sm mt-2">8,732 profiles</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm flex items-center">
                      <Upload className="h-4 w-4 mr-2" />
                      Web Scraping
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        settings.webScrapingActive ? "text-yellow-500 border-yellow-500" : "text-red-500 border-red-500"
                      }
                    >
                      {settings.webScrapingActive ? (
                        <>
                          <AlertCircle className="h-3 w-3 mr-1" /> Limited
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 mr-1" /> Inactive
                        </>
                      )}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs text-muted-foreground">Last updated: 3 days ago</p>
                  <p className="text-sm mt-2">3,450 profiles</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm flex items-center">
                      <Bot className="h-4 w-4 mr-2" />
                      AI Discovery
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        settings.aiDiscoveryActive ? "text-green-500 border-green-500" : "text-red-500 border-red-500"
                      }
                    >
                      {settings.aiDiscoveryActive ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" /> Active
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 mr-1" /> Inactive
                        </>
                      )}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs text-muted-foreground">Last updated: 12 hours ago</p>
                  <p className="text-sm mt-2">2,187 profiles</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Portal Signups
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        settings.portalActive ? "text-green-500 border-green-500" : "text-red-500 border-red-500"
                      }
                    >
                      {settings.portalActive ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" /> Active
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 mr-1" /> Inactive
                        </>
                      )}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs text-muted-foreground">Last updated: 5 hours ago</p>
                  <p className="text-sm mt-2">876 profiles</p>
                </CardContent>
              </Card>
            </div>

            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Data Source Health</AlertTitle>
              <AlertDescription>
                All data sources are functioning normally. Web scraping is operating with rate limits to comply with
                platform policies.
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="instagram" className="pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Instagram API Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Connect to the Instagram Graph API to gather basic profile data
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="instagram-active"
                  checked={settings.instagramApiActive}
                  onCheckedChange={(checked) => handleToggle("instagramApiActive", checked)}
                />
                <Label htmlFor="instagram-active">Active</Label>
              </div>
            </div>

            <Button onClick={saveSettings} disabled={saving}>
              {saving ? "Saving..." : "Save Settings"}
            </Button>
          </TabsContent>

          {/* Other tabs would be implemented similarly */}
        </Tabs>
      </CardContent>
    </Card>
  )
}

