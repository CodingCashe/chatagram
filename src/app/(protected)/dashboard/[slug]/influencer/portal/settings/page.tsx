import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Settings, CheckCircle, AlertCircle, Copy, Eye } from "lucide-react"

export default function PortalSettingsPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Influencer Portal Settings</h1>
        <p className="text-muted-foreground">
          Configure your influencer signup portal and manage verification settings
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="form">Signup Form</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Portal Configuration
              </CardTitle>
              <CardDescription>Configure your influencer signup portal settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="portal-url">Portal URL</Label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Input id="portal-url" value="https://yourdomain.com/influencer-signup" readOnly />
                    <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="portal-status">Portal Status</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="portal-status" defaultChecked />
                    <span>Portal is active</span>
                  </div>
                  <Badge variant="outline" className="text-green-500 border-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" /> Live
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="portal-access">Portal Access</Label>
                <Select defaultValue="public">
                  <SelectTrigger id="portal-access">
                    <SelectValue placeholder="Select access type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public (Anyone can sign up)</SelectItem>
                    <SelectItem value="invite">Invite Only (Requires invitation code)</SelectItem>
                    <SelectItem value="application">Application (Requires approval)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="portal-title">Portal Title</Label>
                <Input id="portal-title" defaultValue="Join Our Influencer Network" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="portal-description">Portal Description</Label>
                <Textarea
                  id="portal-description"
                  defaultValue="Sign up to become an influencer partner and collaborate on exciting campaigns with top brands."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Notifications</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">New Signup Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive email when a new influencer signs up</p>
                    </div>
                    <Switch id="new-signup-notification" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Verification Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive email when verification is needed</p>
                    </div>
                    <Switch id="verification-notification" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-email">Notification Email</Label>
                <Input id="notification-email" type="email" defaultValue="notifications@yourdomain.com" />
              </div>

              <div className="flex justify-end">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="form" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserPlus className="h-5 w-5 mr-2" />
                Signup Form Fields
              </CardTitle>
              <CardDescription>Configure the fields that influencers need to fill out when signing up</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Required Fields</Label>
                <div className="space-y-2">
                  {[
                    { id: "field-name", label: "Full Name", required: true },
                    { id: "field-email", label: "Email Address", required: true },
                    { id: "field-instagram", label: "Instagram Username", required: true },
                    { id: "field-followers", label: "Follower Count", required: true },
                    { id: "field-engagement", label: "Average Engagement Rate", required: true },
                    { id: "field-niche", label: "Content Niche", required: true },
                  ].map((field) => (
                    <div key={field.id} className="flex items-center justify-between border p-3 rounded-md">
                      <div>
                        <h4 className="font-medium">{field.label}</h4>
                        {field.required && (
                          <Badge variant="secondary" className="mt-1">
                            Required
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id={field.id} defaultChecked={field.required} disabled={field.required} />
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Optional Fields</Label>
                <div className="space-y-2">
                  {[
                    { id: "field-bio", label: "Bio/Description" },
                    { id: "field-website", label: "Website URL" },
                    { id: "field-location", label: "Location" },
                    { id: "field-age", label: "Age Range of Audience" },
                    { id: "field-gender", label: "Gender Distribution of Audience" },
                    { id: "field-languages", label: "Languages Spoken" },
                    { id: "field-previous", label: "Previous Brand Collaborations" },
                    { id: "field-rates", label: "Collaboration Rates" },
                  ].map((field) => (
                    <div key={field.id} className="flex items-center justify-between border p-3 rounded-md">
                      <div>
                        <h4 className="font-medium">{field.label}</h4>
                        <Badge variant="outline" className="mt-1">
                          Optional
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id={field.id} defaultChecked />
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline">+ Add Custom Field</Button>
                <Button>Save Form Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Verification Settings
              </CardTitle>
              <CardDescription>Configure how influencer accounts are verified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Verification Methods</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Email Verification</h4>
                      <p className="text-sm text-muted-foreground">Verify influencer email address</p>
                    </div>
                    <Switch id="email-verification" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Instagram Authentication</h4>
                      <p className="text-sm text-muted-foreground">Verify through Instagram OAuth</p>
                    </div>
                    <Switch id="instagram-verification" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Manual Review</h4>
                      <p className="text-sm text-muted-foreground">Manually review each application</p>
                    </div>
                    <Switch id="manual-verification" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Automated Metrics Verification</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically verify follower count and engagement
                      </p>
                    </div>
                    <Switch id="metrics-verification" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Verification Requirements</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Minimum Followers</h4>
                      <p className="text-sm text-muted-foreground">Minimum follower count required</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="number" className="w-24 h-8" defaultValue="1000" />
                      <span className="text-sm text-muted-foreground">followers</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Minimum Engagement Rate</h4>
                      <p className="text-sm text-muted-foreground">Minimum engagement rate required</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="number" className="w-24 h-8" defaultValue="2" />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Account Age</h4>
                      <p className="text-sm text-muted-foreground">Minimum account age required</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="number" className="w-24 h-8" defaultValue="3" />
                      <span className="text-sm text-muted-foreground">months</span>
                    </div>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Verification Process</AlertTitle>
                <AlertDescription>
                  When an influencer signs up, they will need to complete the selected verification methods before their
                  account is approved. You can also set up automatic approval based on the requirements above.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="auto-approve">Automatic Approval</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-approve" defaultChecked />
                  <span>Automatically approve accounts that meet all requirements</span>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Verification Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Portal Branding</CardTitle>
              <CardDescription>Customize the look and feel of your influencer signup portal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-20 rounded-md bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">Logo</span>
                  </div>
                  <Button variant="outline">Upload Logo</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Color Scheme</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 rounded-md bg-primary"></div>
                      <Input id="primary-color" defaultValue="#0284c7" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 rounded-md bg-secondary"></div>
                      <Input id="secondary-color" defaultValue="#f1f5f9" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accent-color">Accent Color</Label>
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 rounded-md bg-accent"></div>
                      <Input id="accent-color" defaultValue="#0ea5e9" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="text-color">Text Color</Label>
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 rounded-md bg-foreground"></div>
                      <Input id="text-color" defaultValue="#0f172a" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Custom CSS</Label>
                <Textarea rows={5} placeholder="Add custom CSS here..." />
              </div>

              <div className="space-y-2">
                <Label>Custom Header</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="custom-header" />
                  <span>Enable custom header HTML</span>
                </div>
                <Textarea rows={3} placeholder="Add custom header HTML here..." disabled />
              </div>

              <div className="space-y-2">
                <Label>Custom Footer</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="custom-footer" />
                  <span>Enable custom footer HTML</span>
                </div>
                <Textarea rows={3} placeholder="Add custom footer HTML here..." disabled />
              </div>

              <div className="flex justify-between">
                <Button variant="outline">Preview Portal</Button>
                <Button>Save Branding</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

