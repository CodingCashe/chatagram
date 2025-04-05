import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, FileText, Database, AlertCircle, CheckCircle, X, Download } from "lucide-react"

export default function ImportInfluencersPage() {
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

              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center text-center space-y-2">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                  <h3 className="font-medium">Drag and drop your file here</h3>
                  <p className="text-sm text-muted-foreground">Supports CSV, XLSX, or XLS files up to 10MB</p>
                </div>
                <Button className="mt-4">
                  <Upload className="h-4 w-4 mr-2" />
                  Select File
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Import Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="option-add" name="import-option" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="option-add">Add new influencers only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="option-update" name="import-option" className="h-4 w-4" />
                    <Label htmlFor="option-update">Update existing and add new influencers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="option-replace" name="import-option" className="h-4 w-4" />
                    <Label htmlFor="option-replace">Replace all existing influencers with this list</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Data Enrichment</Label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="enrich-data" className="h-4 w-4" defaultChecked />
                  <Label htmlFor="enrich-data">
                    Automatically enrich imported data with additional metrics from connected data sources
                  </Label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button disabled>Upload and Import</Button>
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
                  <TableRow>
                    <TableCell>2025-04-03</TableCell>
                    <TableCell>fashion_influencers.csv</TableCell>
                    <TableCell>245</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-green-500 border-green-500">
                        <CheckCircle className="h-3 w-3 mr-1" /> Completed
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Revert
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2025-04-01</TableCell>
                    <TableCell>travel_creators.xlsx</TableCell>
                    <TableCell>178</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-green-500 border-green-500">
                        <CheckCircle className="h-3 w-3 mr-1" /> Completed
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Revert
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2025-03-28</TableCell>
                    <TableCell>beauty_influencers.csv</TableCell>
                    <TableCell>312</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-amber-500 border-amber-500">
                        <AlertCircle className="h-3 w-3 mr-1" /> Partial
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Revert
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2025-03-25</TableCell>
                    <TableCell>tech_creators.xlsx</TableCell>
                    <TableCell>89</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-red-500 border-red-500">
                        <X className="h-3 w-3 mr-1" /> Failed
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          View Error
                        </Button>
                        <Button variant="ghost" size="sm">
                          Retry
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
                    <Button variant="outline">
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
                    <Button variant="outline">
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
                    <Button variant="outline">
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

