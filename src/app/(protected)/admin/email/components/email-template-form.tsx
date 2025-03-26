"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { createEmailTemplate, updateEmailTemplate } from "../../actions/email-actions"
import { Editor } from "./email-editor"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  description: z.string().optional(),
  category: z.string(),
  isDefault: z.boolean().default(false),
})

export function EmailTemplateForm({
  template,
  onSuccess,
}: {
  template?: any
  onSuccess?: () => void
}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: template?.name || "",
      subject: template?.subject || "",
      content: template?.content || getDefaultTemplate(),
      description: template?.description || "",
      category: template?.category || "general",
      isDefault: template?.isDefault || false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("name", values.name)
      formData.append("subject", values.subject)
      formData.append("content", values.content)
      formData.append("description", values.description || "")
      formData.append("category", values.category)
      formData.append("isDefault", values.isDefault.toString())

      let result

      if (template?.id) {
        result = await updateEmailTemplate(template.id, formData)
      } else {
        result = await createEmailTemplate(formData)
      }

      if (result.success) {
        toast({
          title: template?.id ? "Template updated" : "Template created",
          description: template?.id
            ? "Your email template has been updated successfully."
            : "Your new email template has been created successfully.",
        })

        if (onSuccess) {
          onSuccess()
        } else {
          router.push("/admin/email/templates")
          router.refresh()
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to save the template. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving template:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Template Name</FormLabel>
                <FormControl>
                  <Input placeholder="Welcome Email" {...field} />
                </FormControl>
                <FormDescription>
                  A descriptive name for your email template.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="welcome">Welcome</SelectItem>
                    <SelectItem value="newsletter">Newsletter</SelectItem>
                    <SelectItem value="promotional">Promotional</SelectItem>
                    <SelectItem value="transactional">Transactional</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Categorize your template for better organization.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Subject</FormLabel>
              <FormControl>
                <Input placeholder="Welcome to our platform!" {...field} />
              </FormControl>
              <FormDescription>
                The subject line of the email. You can use variables like &#123;&#123;user.firstname&#125;&#125;.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="A welcome email sent to new users when they sign up." 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                A brief description of when and how this template is used.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Content</FormLabel>
              <Tabs defaultValue="editor" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="editor">Visual Editor</TabsTrigger>
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="editor">
                  <FormControl>
                    <Editor 
                      value={field.value} 
                      onChange={field.onChange}
                    />
                  </FormControl>
                </TabsContent>
                <TabsContent value="html">
                  <FormControl>
                    <Textarea 
                      className="min-h-[400px] font-mono text-sm"
                      {...field} 
                    />
                  </FormControl>
                </TabsContent>
                <TabsContent value="preview">
                  <div className="border rounded-md p-4 min-h-[400px] bg-white">
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: field.value }}
                    />
                  </div>
                </TabsContent>
              </Tabs>
              <FormDescription>\
                The content of your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="isDefault"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Set as Default</FormLabel>
                <FormDescription>
                  Make this the default template for its category.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => {
              if (onSuccess) {
                onSuccess();
              } else {
                router.push('/admin/email/templates');
              }
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (template?.id ? 'Update Template' : 'Create Template')}
          </Button>
        </div>
      </form>
    </Form>
  );
}

function getDefaultTemplate() {
  const user = { firstname: "User" } // Define the user variable
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Email Template</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .content {
      padding: 20px;
      background-color: #ffffff;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #6c757d;
      border-radius: 0 0 5px 5px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Our Platform</h1>
    </div>
    <div class="content">
      <p>Hello ${user.firstname},</p>
      <p>Thank you for signing up! We're excited to have you on board.</p>
      <p>With our platform, you can:</p>
      <ul>
        <li>Feature one</li>
        <li>Feature two</li>
        <li>Feature three</li>
      </ul>
      <p>If you have any questions, feel free to reply to this email.</p>
      <a href="#" class="button">Get Started</a>
    </div>
    <div class="footer">
      <p>© 2023 Your Company. All rights reserved.</p>
      <p>123 Main St, City, Country</p>
    </div>
  </div>
</body>
</html>
  `
}

