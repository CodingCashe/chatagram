// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Upload, FileText, Database, AlertCircle, CheckCircle, X, Download } from "lucide-react"

// export default function ImportInfluencersPage() {
//   return (
//     <div className="container mx-auto py-6 space-y-8">
//       <div className="flex flex-col space-y-2">
//         <h1 className="text-3xl font-bold tracking-tight">Import Influencers</h1>
//         <p className="text-muted-foreground">Upload and manage your existing influencer contacts</p>
//       </div>

//       <Tabs defaultValue="upload">
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="upload">Upload List</TabsTrigger>
//           <TabsTrigger value="history">Import History</TabsTrigger>
//           <TabsTrigger value="templates">Templates</TabsTrigger>
//         </TabsList>

//         <TabsContent value="upload" className="space-y-4 mt-4">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <Upload className="h-5 w-5 mr-2" />
//                 Upload Influencer List
//               </CardTitle>
//               <CardDescription>Import your existing influencer contacts from a CSV or Excel file</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <Alert>
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertTitle>File Format</AlertTitle>
//                 <AlertDescription>
//                   Your file should include columns for name, social handles, follower counts, engagement rates, and
//                   other relevant metrics. Download our template for the correct format.
//                 </AlertDescription>
//               </Alert>

//               <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
//                 <div className="flex flex-col items-center text-center space-y-2">
//                   <FileText className="h-10 w-10 text-muted-foreground" />
//                   <h3 className="font-medium">Drag and drop your file here</h3>
//                   <p className="text-sm text-muted-foreground">Supports CSV, XLSX, or XLS files up to 10MB</p>
//                 </div>
//                 <Button className="mt-4">
//                   <Upload className="h-4 w-4 mr-2" />
//                   Select File
//                 </Button>
//               </div>

//               <div className="space-y-2">
//                 <Label>Import Options</Label>
//                 <div className="space-y-2">
//                   <div className="flex items-center space-x-2">
//                     <input type="radio" id="option-add" name="import-option" className="h-4 w-4" defaultChecked />
//                     <Label htmlFor="option-add">Add new influencers only</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <input type="radio" id="option-update" name="import-option" className="h-4 w-4" />
//                     <Label htmlFor="option-update">Update existing and add new influencers</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <input type="radio" id="option-replace" name="import-option" className="h-4 w-4" />
//                     <Label htmlFor="option-replace">Replace all existing influencers with this list</Label>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label>Data Enrichment</Label>
//                 <div className="flex items-center space-x-2">
//                   <input type="checkbox" id="enrich-data" className="h-4 w-4" defaultChecked />
//                   <Label htmlFor="enrich-data">
//                     Automatically enrich imported data with additional metrics from connected data sources
//                   </Label>
//                 </div>
//               </div>

//               <div className="flex justify-end">
//                 <Button disabled>Upload and Import</Button>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="history" className="space-y-4 mt-4">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <Database className="h-5 w-5 mr-2" />
//                 Import History
//               </CardTitle>
//               <CardDescription>View your previous imports and their status</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Date</TableHead>
//                     <TableHead>File Name</TableHead>
//                     <TableHead>Records</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell>2025-04-03</TableCell>
//                     <TableCell>fashion_influencers.csv</TableCell>
//                     <TableCell>245</TableCell>
//                     <TableCell>
//                       <Badge variant="outline" className="text-green-500 border-green-500">
//                         <CheckCircle className="h-3 w-3 mr-1" /> Completed
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex space-x-2">
//                         <Button variant="ghost" size="sm">
//                           View
//                         </Button>
//                         <Button variant="ghost" size="sm">
//                           Revert
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>2025-04-01</TableCell>
//                     <TableCell>travel_creators.xlsx</TableCell>
//                     <TableCell>178</TableCell>
//                     <TableCell>
//                       <Badge variant="outline" className="text-green-500 border-green-500">
//                         <CheckCircle className="h-3 w-3 mr-1" /> Completed
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex space-x-2">
//                         <Button variant="ghost" size="sm">
//                           View
//                         </Button>
//                         <Button variant="ghost" size="sm">
//                           Revert
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>2025-03-28</TableCell>
//                     <TableCell>beauty_influencers.csv</TableCell>
//                     <TableCell>312</TableCell>
//                     <TableCell>
//                       <Badge variant="outline" className="text-amber-500 border-amber-500">
//                         <AlertCircle className="h-3 w-3 mr-1" /> Partial
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex space-x-2">
//                         <Button variant="ghost" size="sm">
//                           View
//                         </Button>
//                         <Button variant="ghost" size="sm">
//                           Revert
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>2025-03-25</TableCell>
//                     <TableCell>tech_creators.xlsx</TableCell>
//                     <TableCell>89</TableCell>
//                     <TableCell>
//                       <Badge variant="outline" className="text-red-500 border-red-500">
//                         <X className="h-3 w-3 mr-1" /> Failed
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex space-x-2">
//                         <Button variant="ghost" size="sm">
//                           View Error
//                         </Button>
//                         <Button variant="ghost" size="sm">
//                           Retry
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="templates" className="space-y-4 mt-4">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <FileText className="h-5 w-5 mr-2" />
//                 Import Templates
//               </CardTitle>
//               <CardDescription>Download templates for importing influencer data</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid gap-4 md:grid-cols-2">
//                 <div className="border rounded-md p-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="font-medium">Basic Template</h3>
//                       <p className="text-sm text-muted-foreground mt-1">Simple template with essential fields</p>
//                       <div className="flex flex-wrap gap-1 mt-2">
//                         <Badge variant="secondary">Name</Badge>
//                         <Badge variant="secondary">Instagram</Badge>
//                         <Badge variant="secondary">Followers</Badge>
//                         <Badge variant="secondary">Engagement</Badge>
//                         <Badge variant="secondary">Niche</Badge>
//                       </div>
//                     </div>
//                     <Button variant="outline">
//                       <Download className="h-4 w-4 mr-2" />
//                       Download
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="border rounded-md p-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="font-medium">Advanced Template</h3>
//                       <p className="text-sm text-muted-foreground mt-1">Comprehensive template with all fields</p>
//                       <div className="flex flex-wrap gap-1 mt-2">
//                         <Badge variant="secondary">Name</Badge>
//                         <Badge variant="secondary">Instagram</Badge>
//                         <Badge variant="secondary">TikTok</Badge>
//                         <Badge variant="secondary">YouTube</Badge>
//                         <Badge variant="secondary">Followers</Badge>
//                         <Badge variant="secondary">Engagement</Badge>
//                         <Badge variant="secondary">Audience</Badge>
//                         <Badge variant="secondary">+10 more</Badge>
//                       </div>
//                     </div>
//                     <Button variant="outline">
//                       <Download className="h-4 w-4 mr-2" />
//                       Download
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="border rounded-md p-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="font-medium">Campaign Template</h3>
//                       <p className="text-sm text-muted-foreground mt-1">Template for campaign-specific data</p>
//                       <div className="flex flex-wrap gap-1 mt-2">
//                         <Badge variant="secondary">Name</Badge>
//                         <Badge variant="secondary">Instagram</Badge>
//                         <Badge variant="secondary">Followers</Badge>
//                         <Badge variant="secondary">Campaign Rate</Badge>
//                         <Badge variant="secondary">Past Performance</Badge>
//                       </div>
//                     </div>
//                     <Button variant="outline">
//                       <Download className="h-4 w-4 mr-2" />
//                       Download
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="border rounded-md p-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="font-medium">Custom Template</h3>
//                       <p className="text-sm text-muted-foreground mt-1">Create a custom import template</p>
//                       <div className="flex flex-wrap gap-1 mt-2">
//                         <Badge variant="outline">Select fields to include</Badge>
//                       </div>
//                     </div>
//                     <Button>Create</Button>
//                   </div>
//                 </div>
//               </div>

//               <Alert>
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertTitle>Template Usage</AlertTitle>
//                 <AlertDescription>
//                   Download a template, fill it with your influencer data, and upload it using the Import tool. Make sure
//                   to maintain the column headers exactly as they appear in the template.
//                 </AlertDescription>
//               </Alert>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, FileText, Database, AlertCircle, CheckCircle, X, Download, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ImportInfluencersPage() {
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [importOption, setImportOption] = useState("add")
  const [enrichData, setEnrichData] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [importHistory, setImportHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchImportHistory()
  }, [])

  const fetchImportHistory = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/upload")

      if (!response.ok) {
        throw new Error("Failed to fetch import history")
      }

      const data = await response.json()
      setImportHistory(data)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch import history"
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      console.error("Error fetching import history:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("importOption", importOption)
      formData.append("enrichData", enrichData.toString())

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }

      const result = await response.json()

      toast({
        title: "Import successful",
        description: `Added: ${result.added}, Updated: ${result.updated}, Failed: ${result.failed}`,
      })

      // Reset form and refresh history
      setFile(null)
      fetchImportHistory()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to upload file"
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      console.error("Error uploading file:", error)
    } finally {
      setUploading(false)
    }
  }

  const downloadTemplate = (templateType: string) => {
    window.location.href = `/api/templates?type=${templateType}`
  }

  const getStatusBadge = (status: string) => {
    if (status === "Completed" || status.includes("Completed")) {
      return (
        <Badge variant="outline" className="text-green-500 border-green-500">
          <CheckCircle className="h-3 w-3 mr-1" /> Completed
        </Badge>
      )
    } else if (status === "Partial" || status.includes("Partial")) {
      return (
        <Badge variant="outline" className="text-amber-500 border-amber-500">
          <AlertCircle className="h-3 w-3 mr-1" /> Partial
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" className="text-red-500 border-red-500">
          <X className="h-3 w-3 mr-1" /> Failed
        </Badge>
      )
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Import Influencers</h1>
        <p className="text-muted-foreground">Upload and manage your existing influencer contacts</p>
      </div>

      <Tabs defaultValue="upload">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload List</TabsTrigger>
          <TabsTrigger value="history">Import History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Upload Influencer List
              </CardTitle>
              <CardDescription>Import your existing influencer contacts from a CSV or Excel file</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>File Format</AlertTitle>
                <AlertDescription>
                  Your file should include columns for name, social handles, follower counts, engagement rates, and
                  other relevant metrics. Download our template for the correct format.
                </AlertDescription>
              </Alert>

              <div
                className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center ${file ? "border-primary" : ""}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {file ? (
                  <div className="flex flex-col items-center text-center space-y-2">
                    <FileText className="h-10 w-10 text-primary" />
                    <h3 className="font-medium">{file.name}</h3>
                    <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <Button variant="outline" onClick={() => setFile(null)}>
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center space-y-2">
                    <FileText className="h-10 w-10 text-muted-foreground" />
                    <h3 className="font-medium">Drag and drop your file here</h3>
                    <p className="text-sm text-muted-foreground">Supports CSV, XLSX, or XLS files up to 10MB</p>
                  </div>
                )}
                <label htmlFor="file-upload">
                  <Button className="mt-4">
                    <Upload className="h-4 w-4 mr-2" />
                    {file ? "Change File" : "Select File"}
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              <div className="space-y-2">
                <Label>Import Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="option-add"
                      name="import-option"
                      className="h-4 w-4"
                      checked={importOption === "add"}
                      onChange={() => setImportOption("add")}
                    />
                    <Label htmlFor="option-add">Add new influencers only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="option-update"
                      name="import-option"
                      className="h-4 w-4"
                      checked={importOption === "update"}
                      onChange={() => setImportOption("update")}
                    />
                    <Label htmlFor="option-update">Update existing and add new influencers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="option-replace"
                      name="import-option"
                      className="h-4 w-4"
                      checked={importOption === "replace"}
                      onChange={() => setImportOption("replace")}
                    />
                    <Label htmlFor="option-replace">Replace all existing influencers with this list</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Data Enrichment</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="enrich-data"
                    className="h-4 w-4"
                    checked={enrichData}
                    onChange={(e) => setEnrichData(e.target.checked)}
                  />
                  <Label htmlFor="enrich-data">
                    Automatically enrich imported data with additional metrics from connected data sources
                  </Label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleUpload} disabled={!file || uploading}>
                  {uploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Upload and Import"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Import History
              </CardTitle>
              <CardDescription>View your previous imports and their status</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : importHistory.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>File Name</TableHead>
                      <TableHead>Records</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {importHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{item.fileName}</TableCell>
                        <TableCell>
                          {item.recordsTotal}
                          {item.recordsFailed > 0 && ` (${item.recordsFailed} failed)`}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(
                            item.recordsFailed === 0
                              ? "Completed"
                              : item.recordsFailed < item.recordsTotal
                                ? "Partial"
                                : "Failed",
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            {item.recordsFailed > 0 && (
                              <Button variant="ghost" size="sm">
                                View Errors
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No import history found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Import Templates
              </CardTitle>
              <CardDescription>Download templates for importing influencer data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Basic Template</h3>
                      <p className="text-sm text-muted-foreground mt-1">Simple template with essential fields</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <Badge variant="secondary">Name</Badge>
                        <Badge variant="secondary">Instagram</Badge>
                        <Badge variant="secondary">Followers</Badge>
                        <Badge variant="secondary">Engagement</Badge>
                        <Badge variant="secondary">Niche</Badge>
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => downloadTemplate("basic")}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Advanced Template</h3>
                      <p className="text-sm text-muted-foreground mt-1">Comprehensive template with all fields</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <Badge variant="secondary">Name</Badge>
                        <Badge variant="secondary">Instagram</Badge>
                        <Badge variant="secondary">TikTok</Badge>
                        <Badge variant="secondary">YouTube</Badge>
                        <Badge variant="secondary">Followers</Badge>
                        <Badge variant="secondary">Engagement</Badge>
                        <Badge variant="secondary">Audience</Badge>
                        <Badge variant="secondary">+10 more</Badge>
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => downloadTemplate("advanced")}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Campaign Template</h3>
                      <p className="text-sm text-muted-foreground mt-1">Template for campaign-specific data</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <Badge variant="secondary">Name</Badge>
                        <Badge variant="secondary">Instagram</Badge>
                        <Badge variant="secondary">Followers</Badge>
                        <Badge variant="secondary">Campaign Rate</Badge>
                        <Badge variant="secondary">Past Performance</Badge>
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => downloadTemplate("campaign")}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Custom Template</h3>
                      <p className="text-sm text-muted-foreground mt-1">Create a custom import template</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <Badge variant="outline">Select fields to include</Badge>
                      </div>
                    </div>
                    <Button>Create</Button>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Template Usage</AlertTitle>
                <AlertDescription>
                  Download a template, fill it with your influencer data, and upload it using the Import tool. Make sure
                  to maintain the column headers exactly as they appear in the template.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

