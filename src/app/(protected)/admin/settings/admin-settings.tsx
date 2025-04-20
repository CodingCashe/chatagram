"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { makeUserAdmin } from "../actions"

export function AdminSettings() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Instagram DM Automation",
    adminEmail: "admin@example.com",
    supportEmail: "support@example.com",
    notificationsEnabled: true,
    analyticsEnabled: true,
    maintenanceMode: false,
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: "60",
    ipRestriction: "",
    passwordPolicy: "strong",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    newUserNotification: true,
    newSubscriptionNotification: true,
    failedPaymentNotification: true,
    systemAlertNotification: true,
    dailyReportEmail: true,
    weeklyReportEmail: true,
  })

  const [newAdminEmail, setNewAdminEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleGeneralSettingsChange = (field: string, value: any) => {
    setGeneralSettings({
      ...generalSettings,
      [field]: value,
    })
  }

  const handleSecuritySettingsChange = (field: string, value: any) => {
    setSecuritySettings({
      ...securitySettings,
      [field]: value,
    })
  }

  const handleNotificationSettingsChange = (field: string, value: any) => {
    setNotificationSettings({
      ...notificationSettings,
      [field]: value,
    })
  }

  const handleSaveSettings = () => {
    // In a real implementation, you would save these settings to your database
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    })
  }

  const handleMakeAdmin = async () => {
    if (!newAdminEmail) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)
      await makeUserAdmin(newAdminEmail)

      toast({
        title: "Success",
        description: `${newAdminEmail} has been made an admin`,
      })

      setNewAdminEmail("")
    } catch (error) {
      console.error("Error making user admin:", error)
      toast({
        title: "Error",
        description: "Failed to make user an admin. User may not exist.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="admins">Admin Users</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure general settings for the admin panel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={generalSettings.siteName}
                onChange={(e) => handleGeneralSettingsChange("siteName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input
                id="adminEmail"
                type="email"
                value={generalSettings.adminEmail}
                onChange={(e) => handleGeneralSettingsChange("adminEmail", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={generalSettings.supportEmail}
                onChange={(e) => handleGeneralSettingsChange("supportEmail", e.target.value)}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notificationsEnabled">Notifications</Label>
                  <p className="text-sm text-muted-foreground">Enable or disable admin notifications.</p>
                </div>
                <Switch
                  id="notificationsEnabled"
                  checked={generalSettings.notificationsEnabled}
                  onCheckedChange={(checked) => handleGeneralSettingsChange("notificationsEnabled", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="analyticsEnabled">Analytics</Label>
                  <p className="text-sm text-muted-foreground">Enable or disable analytics tracking.</p>
                </div>
                <Switch
                  id="analyticsEnabled"
                  checked={generalSettings.analyticsEnabled}
                  onCheckedChange={(checked) => handleGeneralSettingsChange("analyticsEnabled", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Put the site in maintenance mode.</p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={generalSettings.maintenanceMode}
                  onCheckedChange={(checked) => handleGeneralSettingsChange("maintenanceMode", checked)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Configure security settings for the admin panel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Require two-factor authentication for all admin users.</p>
              </div>
              <Switch
                id="twoFactorAuth"
                checked={securitySettings.twoFactorAuth}
                onCheckedChange={(checked) => handleSecuritySettingsChange("twoFactorAuth", checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => handleSecuritySettingsChange("sessionTimeout", e.target.value)}
              />
              <p className="text-sm text-muted-foreground">Time in minutes before an inactive session is logged out.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ipRestriction">IP Restriction</Label>
              <Textarea
                id="ipRestriction"
                placeholder="Enter IP addresses, one per line"
                value={securitySettings.ipRestriction}
                onChange={(e) => handleSecuritySettingsChange("ipRestriction", e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Restrict admin access to specific IP addresses. Leave blank to allow all.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordPolicy">Password Policy</Label>
              <Select
                value={securitySettings.passwordPolicy}
                onValueChange={(value) => handleSecuritySettingsChange("passwordPolicy", value)}
              >
                <SelectTrigger id="passwordPolicy">
                  <SelectValue placeholder="Select a password policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                  <SelectItem value="medium">Medium (8+ chars, letters & numbers)</SelectItem>
                  <SelectItem value="strong">Strong (8+ chars, uppercase, lowercase, numbers, symbols)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">Set the password complexity requirements for admin users.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Configure which notifications you receive as an admin.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="newUserNotification">New User Registration</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications when a new user registers.</p>
                </div>
                <Switch
                  id="newUserNotification"
                  checked={notificationSettings.newUserNotification}
                  onCheckedChange={(checked) => handleNotificationSettingsChange("newUserNotification", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="newSubscriptionNotification">New Subscription</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when a user subscribes to a paid plan.
                  </p>
                </div>
                <Switch
                  id="newSubscriptionNotification"
                  checked={notificationSettings.newSubscriptionNotification}
                  onCheckedChange={(checked) =>
                    handleNotificationSettingsChange("newSubscriptionNotification", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="failedPaymentNotification">Failed Payments</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications when a payment fails.</p>
                </div>
                <Switch
                  id="failedPaymentNotification"
                  checked={notificationSettings.failedPaymentNotification}
                  onCheckedChange={(checked) => handleNotificationSettingsChange("failedPaymentNotification", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="systemAlertNotification">System Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications about system issues or errors.</p>
                </div>
                <Switch
                  id="systemAlertNotification"
                  checked={notificationSettings.systemAlertNotification}
                  onCheckedChange={(checked) => handleNotificationSettingsChange("systemAlertNotification", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dailyReportEmail">Daily Report Email</Label>
                  <p className="text-sm text-muted-foreground">Receive a daily summary report by email.</p>
                </div>
                <Switch
                  id="dailyReportEmail"
                  checked={notificationSettings.dailyReportEmail}
                  onCheckedChange={(checked) => handleNotificationSettingsChange("dailyReportEmail", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weeklyReportEmail">Weekly Report Email</Label>
                  <p className="text-sm text-muted-foreground">Receive a weekly summary report by email.</p>
                </div>
                <Switch
                  id="weeklyReportEmail"
                  checked={notificationSettings.weeklyReportEmail}
                  onCheckedChange={(checked) => handleNotificationSettingsChange("weeklyReportEmail", checked)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="admins">
        <Card>
          <CardHeader>
            <CardTitle>Admin Users</CardTitle>
            <CardDescription>Manage admin users and their permissions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Admin User</TableCell>
                      <TableCell>admin@example.com</TableCell>
                      <TableCell>Super Admin</TableCell>
                      <TableCell>Today, 10:30 AM</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Support User</TableCell>
                      <TableCell>support@example.com</TableCell>
                      <TableCell>Support Admin</TableCell>
                      <TableCell>Yesterday, 3:45 PM</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Add Admin User</h3>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter user email"
                      value={newAdminEmail}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleMakeAdmin} disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Make Admin"}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  This will grant admin privileges to an existing user. The user must already be registered in the
                  system.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

