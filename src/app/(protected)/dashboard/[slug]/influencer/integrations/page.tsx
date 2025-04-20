import { SelectItem } from "@/components/ui/select"
import { SelectContent } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import { Select } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Instagram, Database, Bot, Upload, AlertCircle, CheckCircle, XCircle, Key, RefreshCw } from "lucide-react"

export default function IntegrationsPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground">Configure and manage your data source integrations</p>
      </div>

      <Tabs defaultValue="instagram">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="instagram">Instagram API</TabsTrigger>
          <TabsTrigger value="third-party">Third-Party Data</TabsTrigger>
          <TabsTrigger value="scraping">Web Scraping</TabsTrigger>
          <TabsTrigger value="ai">AI Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="instagram" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Instagram className="h-5 w-5 mr-2" />
                    Instagram Graph API
                  </CardTitle>
                  <CardDescription>Connect to the Instagram Graph API to gather basic profile data</CardDescription>
                </div>
                <Badge variant="outline" className="text-green-500 border-green-500">
                  <CheckCircle className="h-3 w-3 mr-1" /> Connected
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>API Limitations</AlertTitle>
                <AlertDescription>
                  Instagram&apos;s API has restrictions on what data you can access. Some metrics like detailed engagement
                  rates require additional data sources.
                </AlertDescription>
              </Alert>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="app-id">App ID</Label>
                  <Input id="app-id" type="text" value="1234567890123456" readOnly />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="app-secret">App Secret</Label>
                  <div className="relative">
                    <Input id="app-secret" type="password" value="••••••••••••••••" readOnly />
                    <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full">
                      <Key className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="access-token">Access Token</Label>
                  <div className="relative">
                    <Input id="access-token" type="password" value="••••••••••••••••" readOnly />
                    <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full">
                      <Key className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="token-expiry">Token Expiry</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="token-expiry" type="text" value="2025-04-04" readOnly />
                    <Button size="sm" variant="outline">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Data Collection Settings</Label>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Profile Data</h4>
                      <p className="text-sm text-muted-foreground">Username, bio, follower count, etc.</p>
                    </div>
                    <Switch id="profile-data" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Media Data</h4>
                      <p className="text-sm text-muted-foreground">Recent posts, engagement metrics</p>
                    </div>
                    <Switch id="media-data" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Insights Data</h4>
                      <p className="text-sm text-muted-foreground">
                        Available only for business accounts that authorize your app
                      </p>
                    </div>
                    <Switch id="insights-data" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Refresh Schedule</Label>
                <div className="grid gap-2 md:grid-cols-3">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Profile Data</h4>
                      <p className="text-sm text-muted-foreground">Every 6 hours</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Media Data</h4>
                      <p className="text-sm text-muted-foreground">Every 12 hours</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Insights Data</h4>
                      <p className="text-sm text-muted-foreground">Every 24 hours</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Disconnect</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="third-party" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Third-Party Data Providers
              </CardTitle>
              <CardDescription>Connect to external influencer databases to enrich your data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-md overflow-hidden">
                <div className="bg-muted p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">HypeAuditor</h3>
                    <p className="text-sm text-muted-foreground">Comprehensive influencer analytics platform</p>
                  </div>
                  <Badge variant="outline" className="text-green-500 border-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" /> Connected
                  </Badge>
                </div>
                <div className="p-4 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="hypeauditor-api-key">API Key</Label>
                      <div className="relative">
                        <Input id="hypeauditor-api-key" type="password" value="••••••••••••••••" readOnly />
                        <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full">
                          <Key className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hypeauditor-plan">Current Plan</Label>
                      <Input id="hypeauditor-plan" value="Premium (10,000 requests/month)" readOnly />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Data Collection</Label>
                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="flex items-center justify-between border p-3 rounded-md">
                        <div>
                          <h4 className="font-medium">Audience Demographics</h4>
                        </div>
                        <Switch id="hypeauditor-demographics" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between border p-3 rounded-md">
                        <div>
                          <h4 className="font-medium">Engagement Quality</h4>
                        </div>
                        <Switch id="hypeauditor-engagement" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between border p-3 rounded-md">
                        <div>
                          <h4 className="font-medium">Authenticity Score</h4>
                        </div>
                        <Switch id="hypeauditor-authenticity" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between border p-3 rounded-md">
                        <div>
                          <h4 className="font-medium">Growth Analysis</h4>
                        </div>
                        <Switch id="hypeauditor-growth" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Disconnect</Button>
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </div>

              <div className="border rounded-md overflow-hidden">
                <div className="bg-muted p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Upfluence</h3>
                    <p className="text-sm text-muted-foreground">Influencer search and analytics platform</p>
                  </div>
                  <Badge variant="outline" className="text-red-500 border-red-500">
                    <XCircle className="h-3 w-3 mr-1" /> Disconnected
                  </Badge>
                </div>
                <div className="p-4 space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Connection Required</AlertTitle>
                    <AlertDescription>
                      Connect to Upfluence to access their database of over 3 million influencer profiles with detailed
                      analytics.
                    </AlertDescription>
                  </Alert>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="upfluence-api-key">API Key</Label>
                      <Input id="upfluence-api-key" type="text" placeholder="Enter your Upfluence API key" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="upfluence-secret">API Secret</Label>
                      <Input id="upfluence-secret" type="password" placeholder="Enter your Upfluence API secret" />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>Connect Upfluence</Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button variant="outline">+ Add Another Data Provider</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scraping" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Web Scraping Configuration
              </CardTitle>
              <CardDescription>
                Configure ethical web scraping tools to gather publicly available influencer data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="default">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Ethical Considerations</AlertTitle>
                <AlertDescription>
                  Our scraping tools are designed to comply with rate limits and terms of service. We only collect
                  publicly available data and respect robots.txt directives.
                </AlertDescription>
              </Alert>

              <div className="border rounded-md overflow-hidden">
                <div className="bg-muted p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Bright Data (formerly Luminati)</h3>
                    <p className="text-sm text-muted-foreground">Web data collection platform</p>
                  </div>
                  <Badge variant="outline" className="text-green-500 border-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" /> Connected
                  </Badge>
                </div>
                <div className="p-4 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="brightdata-username">Username</Label>
                      <Input id="brightdata-username" type="text" value="your-username" readOnly />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="brightdata-password">Password</Label>
                      <div className="relative">
                        <Input id="brightdata-password" type="password" value="••••••••••••••••" readOnly />
                        <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full">
                          <Key className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="brightdata-zone">Zone ID</Label>
                      <Input id="brightdata-zone" type="text" value="zone12345" readOnly />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="brightdata-plan">Current Plan</Label>
                      <Input id="brightdata-plan" value="Business (5GB/month)" readOnly />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Scraping Rules</Label>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Rate Limiting</h4>
                      <p className="text-sm text-muted-foreground">Maximum requests per minute</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="number" className="w-20 h-8" defaultValue="60" />
                      <span className="text-sm text-muted-foreground">req/min</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Daily Quota</h4>
                      <p className="text-sm text-muted-foreground">Maximum profiles to scrape per day</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="number" className="w-20 h-8" defaultValue="1000" />
                      <span className="text-sm text-muted-foreground">profiles</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Respect robots.txt</h4>
                      <p className="text-sm text-muted-foreground">Follow website crawling rules</p>
                    </div>
                    <Switch id="respect-robots" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">User Agent Rotation</h4>
                      <p className="text-sm text-muted-foreground">Rotate user agents to avoid detection</p>
                    </div>
                    <Switch id="user-agent-rotation" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Data Retention Policy</Label>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Raw Data Retention</h4>
                      <p className="text-sm text-muted-foreground">How long to keep raw scraped data</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="number" className="w-20 h-8" defaultValue="30" />
                      <span className="text-sm text-muted-foreground">days</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Processed Data Retention</h4>
                      <p className="text-sm text-muted-foreground">How long to keep processed metrics</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="number" className="w-20 h-8" defaultValue="365" />
                      <span className="text-sm text-muted-foreground">days</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                AI Discovery Configuration
              </CardTitle>
              <CardDescription>
                Configure AI algorithms to discover new influencers based on content and engagement patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Active AI Models</Label>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Content Analysis</h4>
                      <p className="text-sm text-muted-foreground">Analyze content themes and quality</p>
                    </div>
                    <Switch id="content-analysis" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Audience Overlap</h4>
                      <p className="text-sm text-muted-foreground">Find influencers with similar audiences</p>
                    </div>
                    <Switch id="audience-overlap" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Engagement Pattern</h4>
                      <p className="text-sm text-muted-foreground">Analyze engagement quality and patterns</p>
                    </div>
                    <Switch id="engagement-pattern" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Brand Alignment</h4>
                      <p className="text-sm text-muted-foreground">Match influencers to your brand values</p>
                    </div>
                    <Switch id="brand-alignment" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Growth Prediction</h4>
                      <p className="text-sm text-muted-foreground">Predict future growth potential</p>
                    </div>
                    <Switch id="growth-prediction" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Fraud Detection</h4>
                      <p className="text-sm text-muted-foreground">Identify fake followers and engagement</p>
                    </div>
                    <Switch id="fraud-detection" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Training Data Sources</Label>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Previous Campaigns</h4>
                      <p className="text-sm text-muted-foreground">Learn from your successful campaigns</p>
                    </div>
                    <Switch id="previous-campaigns" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Platform-wide Performance</h4>
                      <p className="text-sm text-muted-foreground">Learn from anonymized platform data</p>
                    </div>
                    <Switch id="platform-performance" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Industry Benchmarks</h4>
                      <p className="text-sm text-muted-foreground">Compare against industry standards</p>
                    </div>
                    <Switch id="industry-benchmarks" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Discovery Settings</Label>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Discovery Frequency</h4>
                      <p className="text-sm text-muted-foreground">How often to run discovery algorithms</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Select defaultValue="daily">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Minimum Confidence Score</h4>
                      <p className="text-sm text-muted-foreground">Threshold for suggesting new influencers</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="number" className="w-20 h-8" defaultValue="75" />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Reset AI Models</Button>
                <Button>Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

