// import nodemailer from "nodemailer"
// import { Resend } from "resend"
// import type { User } from "@prisma/client"
// import { client } from "@/lib/prisma"

// // Initialize Resend (modern email API)
// const resend = new Resend(process.env.RESEND_API_KEY)

// // Fallback to nodemailer with SMTP if needed
// const smtpTransport = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT) || 587,
//   secure: process.env.SMTP_SECURE === "true",
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD,
//   },
// })

// // Function to replace template variables with user data
// export function personalizeTemplate(template: string, user: User, extraVars: Record<string, string> = {}) {
//   let personalized = template

//   // Replace user variables
//   personalized = personalized.replace(/{{user\.firstname}}/g, user.firstname || "there")
//   personalized = personalized.replace(/{{user\.lastname}}/g, user.lastname || "")
//   personalized = personalized.replace(/{{user\.email}}/g, user.email)

//   // Replace any extra variables
//   Object.entries(extraVars).forEach(([key, value]) => {
//     personalized = personalized.replace(new RegExp(`{{${key}}}`, "g"), value)
//   })

//   // Replace date variables
//   personalized = personalized.replace(/{{date}}/g, new Date().toLocaleDateString())

//   return personalized
// }

// // Send a single email
// export async function sendMail({
//   to,
//   subject,
//   html,
//   from = process.env.EMAIL_FROM || "noreply@yazil.com",
//   emailId,
// }: {
//   to: string
//   subject: string
//   html: string
//   from?: string
//   emailId?: string
// }) {
//   try {
//     // Try to send with Resend first
//     const result = await resend.emails.send({
//       from,
//       to,
//       subject,
//       html,
//     })

//     // Update email status if we have an ID
//     if (emailId) {
//       await client.email.update({
//         where: { id: emailId },
//         data: {
//           status: "SENT",
//           sentAt: new Date(),
//         },
//       })
//     }

//     return { success: true, messageId: result.data?.id }
//   } catch (error) {
//     console.error("Resend failed, trying SMTP fallback", error)

//     // Fallback to SMTP
//     try {
//       const result = await smtpTransport.sendMail({
//         from,
//         to,
//         subject,
//         html,
//       })

//       // Update email status if we have an ID
//       if (emailId) {
//         await client.email.update({
//           where: { id: emailId },
//           data: {
//             status: "SENT",
//             sentAt: new Date(),
//           },
//         })
//       }

//       return { success: true, messageId: result.messageId }
//     } catch (smtpError) {
//       console.error("SMTP sending failed", smtpError)

//       // Update email status if we have an ID
//       if (emailId) {
//         await client.email.update({
//           where: { id: emailId },
//           data: {
//             status: "FAILED",
//           },
//         })
//       }

//       return { success: false, error: smtpError }
//     }
//   }
// }

// // Send welcome email to a new user
// export async function sendWelcomeEmail(user: User) {
//   try {
//     // Get the default welcome template
//     const welcomeTemplate = await client.emailTemplate.findFirst({
//       where: {
//         category: "welcome",
//         isDefault: true,
//       },
//     })

//     if (!welcomeTemplate) {
//       console.error("No default welcome template found")
//       return { success: false, error: "No default welcome template found" }
//     }

//     // Create an email record
//     const email = await client.email.create({
//       data: {
//         subject: welcomeTemplate.subject,
//         content: welcomeTemplate.content,
//         recipientId: user.id,
//         templateId: welcomeTemplate.id,
//         status: "SCHEDULED",
//         scheduledFor: new Date(), // Send immediately
//       },
//     })

//     // Personalize the template
//     const personalizedSubject = personalizeTemplate(welcomeTemplate.subject, user)
//     const personalizedContent = personalizeTemplate(welcomeTemplate.content, user)

//     // Send the email
//     return await sendEmail({
//       to: user.email,
//       subject: personalizedSubject,
//       html: personalizedContent,
//       emailId: email.id,
//     })
//   } catch (error) {
//     console.error("Failed to send welcome email", error)
//     return { success: false, error }
//   }
// }

// // Send a bulk campaign
// export async function sendCampaign(campaignId: string) {
//   try {
//     // Get the campaign with its template
//     const campaign = await client.emailCampaign.findUnique({
//       where: { id: campaignId },
//       include: {
//         template: true,
//         emails: true,
//       },
//     })

//     if (!campaign) {
//       return { success: false, error: "Campaign not found" }
//     }

//     // Update campaign status
//     await client.emailCampaign.update({
//       where: { id: campaignId },
//       data: {
//         status: "SENDING",
//       },
//     })

//     // Send each email in the campaign
//     const results = await Promise.all(
//       campaign.emails.map(async (email) => {
//         // Get the recipient
//         const recipient = await client.user.findUnique({
//           where: { id: email.recipientId },
//         })

//         if (!recipient) {
//           return { success: false, error: "Recipient not found", emailId: email.id }
//         }

//         // Personalize the template
//         const personalizedSubject = personalizeTemplate(campaign.template.subject, recipient)
//         const personalizedContent = personalizeTemplate(campaign.template.content, recipient)

//         // Send the email
//         return await sendEmail({
//           to: recipient.email,
//           subject: personalizedSubject,
//           html: personalizedContent,
//           emailId: email.id,
//         })
//       }),
//     )

//     // Update campaign status
//     await client.emailCampaign.update({
//       where: { id: campaignId },
//       data: {
//         status: "COMPLETED",
//         sentAt: new Date(),
//       },
//     })

//     return {
//       success: true,
//       results,
//       totalSent: results.filter((r) => r.success).length,
//       totalFailed: results.filter((r) => !r.success).length,
//     }
//   } catch (error) {
//     console.error("Failed to send campaign", error)

//     // Update campaign status
//     await client.emailCampaign.update({
//       where: { id: campaignId },
//       data: {
//         status: "CANCELLED",
//       },
//     })

//     return { success: false, error }
//   }
// }

// // Process scheduled emails
// export async function processScheduledEmails() {
//   try {
//     // Get all emails scheduled for now or earlier
//     const scheduledEmails = await client.email.findMany({
//       where: {
//         status: "SCHEDULED",
//         scheduledFor: {
//           lte: new Date(),
//         },
//       },
//       include: {
//         recipient: true,
//         template: true,
//       },
//     })

//     if (scheduledEmails.length === 0) {
//       return { success: true, message: "No scheduled emails to process" }
//     }

//     // Send each email
//     const results = await Promise.all(
//       scheduledEmails.map(async (email) => {
//         // Personalize the template if it exists
//         const subject = email.template ? personalizeTemplate(email.template.subject, email.recipient) : email.subject

//         const content = email.template ? personalizeTemplate(email.template.content, email.recipient) : email.content

//         // Send the email
//         return await sendEmail({
//           to: email.recipient.email,
//           subject,
//           html: content,
//           emailId: email.id,
//         })
//       }),
//     )

//     return {
//       success: true,
//       results,
//       totalSent: results.filter((r) => r.success).length,
//       totalFailed: results.filter((r) => !r.success).length,
//     }
//   } catch (error) {
//     console.error("Failed to process scheduled emails", error)
//     return { success: false, error }
//   }
// }


// /////

// // import { Resend } from "resend"
// // import nodemailer from "nodemailer"

// // Email service configuration
// type EmailConfig = {
//   provider: "smtp" | "resend"
//   smtp?: {
//     host: string
//     port: number
//     secure: boolean
//     auth: {
//       user: string
//       pass: string
//     }
//   }
//   resend?: {
//     apiKey: string
//   }
//   from: string
// }

// // Email sending options
// type EmailOptions = {
//   to: string | string[]
//   subject: string
//   html: string
//   text?: string
//   from?: string
//   emailId:string
// }

// // Email sending result
// type EmailResult = {
//   success: boolean
//   messageId?: string
//   error?: string
//   totalSent?: number
//   message?: string
// }

// // Get email configuration from environment variables
// function getEmailConfig(): EmailConfig {
//   // Check if RESEND_API_KEY is available
//   if (process.env.RESEND_API_KEY) {
//     return {
//       provider: "resend",
//       resend: {
//         apiKey: process.env.RESEND_API_KEY,
//       },
//       from: process.env.EMAIL_FROM || "noreply@example.com",
//     }
//   }

//   // Fall back to SMTP if configured
//   if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
//     return {
//       provider: "smtp",
//       smtp: {
//         host: process.env.SMTP_HOST,
//         port: Number.parseInt(process.env.SMTP_PORT, 10),
//         secure: process.env.SMTP_SECURE === "true",
//         auth: {
//           user: process.env.SMTP_USER,
//           pass: process.env.SMTP_PASSWORD,
//         },
//       },
//       from: process.env.EMAIL_FROM || "noreply@example.com",
//     }
//   }

//   // Default to SMTP with empty config (will fail in production)
//   return {
//     provider: "smtp",
//     smtp: {
//       host: "localhost",
//       port: 1025,
//       secure: false,
//       auth: {
//         user: "",
//         pass: "",
//       },
//     },
//     from: "noreply@example.com",
//   }
// }

// // Send email using configured provider
// export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
//   const config = getEmailConfig()
//   const from = options.from || config.from

//   try {
//     if (config.provider === "resend" && config.resend?.apiKey) {
//       const resend = new Resend(config.resend.apiKey)
//       const result = await resend.emails.send({
//         from,
//         to: Array.isArray(options.to) ? options.to : [options.to],
//         subject: options.subject,
//         html: options.html,
//         text: options.text,
//       })

//       return {
//         success: true,
//         messageId: result.data?.id,
//         totalSent: Array.isArray(options.to) ? options.to.length : 1,
//         message: "Email sent successfully",
//       }
//     } else if (config.provider === "smtp" && config.smtp) {
//       const transporter = nodemailer.createTransport({
//         host: config.smtp.host,
//         port: config.smtp.port,
//         secure: config.smtp.secure,
//         auth: {
//           user: config.smtp.auth.user,
//           pass: config.smtp.auth.pass,
//         },
//       })

//       const result = await transporter.sendMail({
//         from,
//         to: options.to,
//         subject: options.subject,
//         html: options.html,
//         text: options.text,
//       })

//       return {
//         success: true,
//         messageId: result.messageId,
//         totalSent: Array.isArray(options.to) ? options.to.length : 1,
//         message: "Email sent successfully",
//       }
//     }

//     throw new Error("No valid email provider configured")
//   } catch (error) {
//     console.error("Error sending email:", error)
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "Unknown error",
//       totalSent: 0,
//     }
//   }
// }

// // Send bulk emails
// export async function sendBulkEmails(
//   recipients: string[],
//   subject: string,
//   html: string,
//   text?: string,
// ): Promise<EmailResult> {
//   const config = getEmailConfig()
//   const from = config.from
//   let successCount = 0
//   let errorCount = 0

//   try {
//     // For Resend, we can send to multiple recipients in one call
//     if (config.provider === "resend" && config.resend?.apiKey) {
//       const resend = new Resend(config.resend.apiKey)

//       // Split into batches of 50 recipients (Resend limit)
//       const batchSize = 50
//       const batches = []

//       for (let i = 0; i < recipients.length; i += batchSize) {
//         batches.push(recipients.slice(i, i + batchSize))
//       }

//       // Send each batch
//       for (const batch of batches) {
//         try {
//           await resend.emails.send({
//             from,
//             to: batch,
//             subject,
//             html,
//             text,
//           })

//           successCount += batch.length
//         } catch (error) {
//           console.error("Error sending batch:", error)
//           errorCount += batch.length
//         }
//       }
//     } else if (config.provider === "smtp" && config.smtp) {
//       const transporter = nodemailer.createTransport({
//         host: config.smtp.host,
//         port: config.smtp.port,
//         secure: config.smtp.secure,
//         auth: {
//           user: config.smtp.auth.user,
//           pass: config.smtp.auth.pass,
//         },
//       })

//       // Send to each recipient individually
//       for (const recipient of recipients) {
//         try {
//           await transporter.sendMail({
//             from,
//             to: recipient,
//             subject,
//             html,
//             text,
//           })

//           successCount++
//         } catch (error) {
//           console.error(`Error sending to ${recipient}:`, error)
//           errorCount++
//         }
//       }
//     } else {
//       throw new Error("No valid email provider configured")
//     }

//     return {
//       success: successCount > 0,
//       totalSent: successCount,
//       message: `Successfully sent ${successCount} emails. Failed: ${errorCount}.`,
//       error: errorCount > 0 ? `Failed to send ${errorCount} emails.` : undefined,
//     }
//   } catch (error) {
//     console.error("Error sending bulk emails:", error)
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "Unknown error",
//       totalSent: successCount,
//     }
//   }
// }

// import nodemailer from "nodemailer"
// import { Resend } from "resend"
// import type { User } from "@prisma/client"
// import { client } from "@/lib/prisma"

// // Email service configuration types
// type EmailConfig = {
//   provider: "smtp" | "resend" | "development"
//   smtp?: {
//     host: string
//     port: number
//     secure: boolean
//     auth: {
//       user: string
//       pass: string
//     }
//   }
//   resend?: {
//     apiKey: string
//   }
//   from: string
// }

// // Email sending options
// type EmailOptions = {
//   to: string | string[]
//   subject: string
//   html: string
//   text?: string
//   from?: string
//   emailId?: string
//   trackOpens?: boolean
//   trackClicks?: boolean
// }

// // Email sending result
// type EmailResult = {
//   success: boolean
//   messageId?: string
//   error?: any
//   totalSent?: number
//   message?: string
// }

// // Get email configuration from environment variables
// function getEmailConfig(): EmailConfig {
//   // Check if RESEND_API_KEY is available
//   if (process.env.RESEND_API_KEY) {
//     return {
//       provider: "resend",
//       resend: {
//         apiKey: process.env.RESEND_API_KEY,
//       },
//       from: process.env.EMAIL_FROM || "noreply@example.com",
//     }
//   }

//   // Fall back to SMTP if configured
//   if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
//     return {
//       provider: "smtp",
//       smtp: {
//         host: process.env.SMTP_HOST,
//         port: Number.parseInt(process.env.SMTP_PORT, 10),
//         secure: process.env.SMTP_SECURE === "true",
//         auth: {
//           user: process.env.SMTP_USER,
//           pass: process.env.SMTP_PASSWORD,
//         },
//       },
//       from: process.env.EMAIL_FROM || "noreply@example.com",
//     }
//   }

//   // Development mode (logs but doesn't actually send)
//   return {
//     provider: "development",
//     from: process.env.EMAIL_FROM || "noreply@example.com",
//   }
// }

// // Function to replace template variables with user data
// export function personalizeTemplate(template: string, user: User, extraVars: Record<string, string> = {}) {
//   let personalized = template

//   // Replace user variables
//   personalized = personalized.replace(/{{user\.firstname}}/g, user.firstname || "there")
//   personalized = personalized.replace(/{{user\.lastname}}/g, user.lastname || "")
//   personalized = personalized.replace(/{{user\.email}}/g, user.email)

//   // Replace any extra variables
//   Object.entries(extraVars).forEach(([key, value]) => {
//     personalized = personalized.replace(new RegExp(`{{${key}}}`, "g"), value || "")
//   })

//   // Replace date variables
//   personalized = personalized.replace(/{{date}}/g, new Date().toLocaleDateString())

//   return personalized
// }

// // Add tracking pixels and link tracking if needed
// function addTracking(html: string, emailId: string, trackOpens: boolean, trackClicks: boolean): string {
//   let trackedHtml = html

//   // Add open tracking pixel
//   if (trackOpens) {
//     const trackingPixel = `<img src="${process.env.NEXT_PUBLIC_APP_URL}/api/email/track/open/${emailId}" width="1" height="1" alt="" style="display:none;" />`
//     trackedHtml = trackedHtml.replace("</body>", `${trackingPixel}</body>`)
//   }

//   // Add click tracking to links
//   if (trackClicks) {
//     // Simple regex to find links - in a production app, you might want a more robust HTML parser
//     trackedHtml = trackedHtml.replace(/<a\s+(?:[^>]*?\s+)?href=["']([^"']*)["']([^>]*)>/gi, (match, url, rest) => {
//       // Don't track mailto: links or anchor links
//       if (url.startsWith("mailto:") || url.startsWith("#")) {
//         return match
//       }

//       const trackingUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/email/track/click/${emailId}?url=${encodeURIComponent(url)}`
//       return `<a href="${trackingUrl}"${rest}>`
//     })
//   }

//   return trackedHtml
// }

// // Send email using configured provider
// export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
//   const config = getEmailConfig()
//   const from = options.from || config.from

//   // Add tracking if emailId is provided
//   let htmlContent = options.html
//   if (options.emailId && (options.trackOpens || options.trackClicks)) {
//     htmlContent = addTracking(htmlContent, options.emailId, options.trackOpens || false, options.trackClicks || false)
//   }

//   try {
//     // Update email status to SENDING if we have an ID
//     if (options.emailId) {
//       await client.email.update({
//         where: { id: options.emailId },
//         data: {
//           status: "SENT",
//         },
//       })
//     }

//     if (config.provider === "resend" && config.resend?.apiKey) {
//       const resend = new Resend(config.resend.apiKey)
//       const result = await resend.emails.send({
//         from,
//         to: Array.isArray(options.to) ? options.to : [options.to],
//         subject: options.subject,
//         html: htmlContent,
//         text: options.text,
//       })

//       // Update email status if we have an ID
//       if (options.emailId) {
//         await client.email.update({
//           where: { id: options.emailId },
//           data: {
//             status: "SENT",
//             sentAt: new Date(),
//           },
//         })
//       }

//       return {
//         success: true,
//         messageId: result.data?.id,
//         totalSent: Array.isArray(options.to) ? options.to.length : 1,
//         message: "Email sent successfully via Resend",
//       }
//     } else if (config.provider === "smtp" && config.smtp) {
//       const transporter = nodemailer.createTransport({
//         host: config.smtp.host,
//         port: config.smtp.port,
//         secure: config.smtp.secure,
//         auth: {
//           user: config.smtp.auth.user,
//           pass: config.smtp.auth.pass,
//         },
//       })

//       const result = await transporter.sendMail({
//         from,
//         to: options.to,
//         subject: options.subject,
//         html: htmlContent,
//         text: options.text,
//       })

//       // Update email status if we have an ID
//       if (options.emailId) {
//         await client.email.update({
//           where: { id: options.emailId },
//           data: {
//             status: "SENT",
//             sentAt: new Date(),
//           },
//         })
//       }

//       return {
//         success: true,
//         messageId: result.messageId,
//         totalSent: Array.isArray(options.to) ? options.to.length : 1,
//         message: "Email sent successfully via SMTP",
//       }
//     } else if (config.provider === "development") {
//       // Development mode - log the email but don't actually send it
//       console.log("📧 DEVELOPMENT MODE - Email would be sent:", {
//         from,
//         to: options.to,
//         subject: options.subject,
//         html: htmlContent.substring(0, 500) + "...", // Truncate for readability
//       })

//       // Update email status if we have an ID
//       if (options.emailId) {
//         await client.email.update({
//           where: { id: options.emailId },
//           data: {
//             status: "SENT",
//             sentAt: new Date(),
//           },
//         })
//       }

//       return {
//         success: true,
//         messageId: `dev-${Date.now()}`,
//         totalSent: Array.isArray(options.to) ? options.to.length : 1,
//         message:
//           "DEVELOPMENT MODE: Email logged but not sent. Configure RESEND_API_KEY or SMTP settings to send real emails.",
//       }
//     }

//     throw new Error("No valid email provider configured")
//   } catch (error) {
//     console.error("Error sending email:", error)

//     // Update email status if we have an ID
//     if (options.emailId) {
//       await client.email.update({
//         where: { id: options.emailId },
//         data: {
//           status: "FAILED",
//         },
//       })
//     }

//     return {
//       success: false,
//       error: error instanceof Error ? error.message : error,
//       totalSent: 0,
//     }
//   }
// }

// // Send welcome email to a new user
// export async function sendWelcomeEmail(user: User) {
//   try {
//     // Get the default welcome template
//     const welcomeTemplate = await client.emailTemplate.findFirst({
//       where: {
//         category: "welcome",
//         isDefault: true,
//       },
//     })

//     if (!welcomeTemplate) {
//       console.error("No default welcome template found")
//       return { success: false, error: "No default welcome template found" }
//     }

//     // Create an email record
//     const email = await client.email.create({
//       data: {
//         subject: welcomeTemplate.subject,
//         content: welcomeTemplate.content,
//         recipientId: user.id,
//         templateId: welcomeTemplate.id,
//         status: "SCHEDULED",
//         scheduledFor: new Date(), // Send immediately
//       },
//     })

//     // Personalize the template
//     const personalizedSubject = personalizeTemplate(welcomeTemplate.subject, user)
//     const personalizedContent = personalizeTemplate(welcomeTemplate.content, user)

//     // Send the email
//     return await sendEmail({
//       to: user.email,
//       subject: personalizedSubject,
//       html: personalizedContent,
//       emailId: email.id,
//       trackOpens: true,
//       trackClicks: true,
//     })
//   } catch (error) {
//     console.error("Failed to send welcome email:", error)
//     return { success: false, error }
//   }
// }

// // Send a bulk campaign
// export async function sendCampaign(campaignId: string) {
//   try {
//     // Get the campaign with its template
//     const campaign = await client.emailCampaign.findUnique({
//       where: { id: campaignId },
//       include: {
//         template: true,
//         emails: true,
//       },
//     })

//     if (!campaign) {
//       return { success: false, error: "Campaign not found" }
//     }

//     // Update campaign status
//     await client.emailCampaign.update({
//       where: { id: campaignId },
//       data: {
//         status: "SENDING",
//       },
//     })

//     // Send each email in the campaign
//     const results = await Promise.all(
//       campaign.emails.map(async (email) => {
//         // Get the recipient
//         const recipient = await client.user.findUnique({
//           where: { id: email.recipientId },
//         })

//         if (!recipient) {
//           return { success: false, error: "Recipient not found", emailId: email.id }
//         }

//         // Personalize the template
//         const personalizedSubject = personalizeTemplate(campaign.template.subject, recipient)
//         const personalizedContent = personalizeTemplate(campaign.template.content, recipient)

//         // Send the email
//         return await sendEmail({
//           to: recipient.email,
//           subject: personalizedSubject,
//           html: personalizedContent,
//           emailId: email.id,
//           trackOpens: true,
//           trackClicks: true,
//         })
//       }),
//     )

//     // Update campaign status
//     await client.emailCampaign.update({
//       where: { id: campaignId },
//       data: {
//         status: "COMPLETED",
//         sentAt: new Date(),
//       },
//     })

//     return {
//       success: true,
//       results,
//       totalSent: results.filter((r) => r.success).length,
//       totalFailed: results.filter((r) => !r.success).length,
//     }
//   } catch (error) {
//     console.error("Failed to send campaign:", error)

//     // Update campaign status
//     await client.emailCampaign.update({
//       where: { id: campaignId },
//       data: {
//         status: "CANCELLED",
//       },
//     })

//     return { success: false, error }
//   }
// }

// // Process scheduled emails
// export async function processScheduledEmails() {
//   try {
//     // Get all emails scheduled for now or earlier
//     const scheduledEmails = await client.email.findMany({
//       where: {
//         status: "SCHEDULED",
//         scheduledFor: {
//           lte: new Date(),
//         },
//       },
//       include: {
//         recipient: true,
//         template: true,
//       },
//     })

//     if (scheduledEmails.length === 0) {
//       return { success: true, message: "No scheduled emails to process" }
//     }

//     // Send each email
//     const results = await Promise.all(
//       scheduledEmails.map(async (email) => {
//         // Personalize the template if it exists
//         const subject = email.template ? personalizeTemplate(email.template.subject, email.recipient) : email.subject
//         const content = email.template ? personalizeTemplate(email.template.content, email.recipient) : email.content

//         // Send the email
//         return await sendEmail({
//           to: email.recipient.email,
//           subject,
//           html: content,
//           emailId: email.id,
//           trackOpens: true,
//           trackClicks: true,
//         })
//       }),
//     )

//     return {
//       success: true,
//       results,
//       totalSent: results.filter((r) => r.success).length,
//       totalFailed: results.filter((r) => !r.success).length,
//     }
//   } catch (error) {
//     console.error("Failed to process scheduled emails:", error)
//     return { success: false, error }
//   }
// }

// // Send a test email
// export async function sendTestEmail({
//   to,
//   subject,
//   html,
//   from = process.env.EMAIL_FROM,
// }: {
//   to: string
//   subject: string
//   html: string
//   from?: string
// }) {
//   try {
//     return await sendEmail({
//       to,
//       subject,
//       html,
//       from,
//       trackOpens: true,
//       trackClicks: true,
//     })
//   } catch (error) {
//     console.error("Failed to send test email:", error)
//     return { success: false, error }
//   }
// }

// // For backward compatibility
// export const sendMail = sendEmail

import nodemailer from "nodemailer"
import { Resend } from "resend"
import type { User } from "@prisma/client"
import { client } from "@/lib/prisma"

// Email service configuration types
type EmailConfig = {
  provider: "smtp" | "resend" | "development"
  smtp?: {
    host: string
    port: number
    secure: boolean
    auth: {
      user: string
      pass: string
    }
  }
  resend?: {
    apiKey: string
  }
  from: string
}

// Email sending options
type EmailOptions = {
  to: string | string[]
  subject: string
  html: string
  text?: string
  from?: string
  emailId?: string
  trackOpens?: boolean
  trackClicks?: boolean
}

// Email sending result
type EmailResult = {
  success: boolean
  messageId?: string
  error?: any
  totalSent?: number
  message?: string
}

// Get email configuration from environment variables
function getEmailConfig(): EmailConfig {
  // Check if RESEND_API_KEY is availablel
  if (process.env.RESEND_API_KEY) {
    return {
      provider: "resend",
      resend: {
        apiKey: process.env.RESEND_API_KEY,
      },
      from: process.env.EMAIL_FROM || "goergesmmns@gmail.com",
    }
  }

  // Fall back to SMTP if configured
  if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
    return {
      provider: "smtp",
      smtp: {
        host: process.env.SMTP_HOST,
        port: Number.parseInt(process.env.SMTP_PORT, 10),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM || "noreply@example.com",
    }
  }

  // Development mode (logs but doesn't actually send)
  return {
    provider: "development",
    from: process.env.EMAIL_FROM || "noreply@example.com",
  }
}

// Function to replace template variables with user data
export function personalizeTemplate(template: string, user: User, extraVars: Record<string, string> = {}) {
  let personalized = template

  // Replace user variables
  personalized = personalized.replace(/{{user\.firstname}}/g, user.firstname || "there")
  personalized = personalized.replace(/{{user\.lastname}}/g, user.lastname || "")
  personalized = personalized.replace(/{{user\.email}}/g, user.email)

  // Replace any extra variables
  Object.entries(extraVars).forEach(([key, value]) => {
    personalized = personalized.replace(new RegExp(`{{${key}}}`, "g"), value || "")
  })

  // Replace date variables
  personalized = personalized.replace(/{{date}}/g, new Date().toLocaleDateString())

  return personalized
}

// Add tracking pixels and link tracking if needed
function addTracking(html: string, emailId: string, trackOpens: boolean, trackClicks: boolean): string {
  let trackedHtml = html

  // Add open tracking pixel
  if (trackOpens) {
    const trackingPixel = `<img src="${process.env.NEXT_PUBLIC_APP_URL}/api/email/track/open/${emailId}" width="1" height="1" alt="" style="display:none;" />`
    trackedHtml = trackedHtml.replace("</body>", `${trackingPixel}</body>`)
  }

  // Add click tracking to links
  if (trackClicks) {
    // Simple regex to find links - in a production app, you might want a more robust HTML parser
    trackedHtml = trackedHtml.replace(/<a\s+(?:[^>]*?\s+)?href=["']([^"']*)["']([^>]*)>/gi, (match, url, rest) => {
      // Don't track mailto: links or anchor links
      if (url.startsWith("mailto:") || url.startsWith("#")) {
        return match
      }

      const trackingUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/email/track/click/${emailId}?url=${encodeURIComponent(url)}`
      return `<a href="${trackingUrl}"${rest}>`
    })
  }

  return trackedHtml
}

// Send email using configured provider
export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  const config = getEmailConfig()
  const from = options.from || config.from

  // Add tracking if emailId is provided
  let htmlContent = options.html
  if (options.emailId && (options.trackOpens || options.trackClicks)) {
    htmlContent = addTracking(htmlContent, options.emailId, options.trackOpens || false, options.trackClicks || false)
  }

  try {
    // Update email status to SENDING if we have an ID
    if (options.emailId) {
      await client.email.update({
        where: { id: options.emailId },
        data: {
          status: "SENT",
        },
      })
    }

    if (config.provider === "resend" && config.resend?.apiKey) {
      const resend = new Resend(config.resend.apiKey)
      const result = await resend.emails.send({
        from,
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: options.subject,
        html: htmlContent,
        text: options.text,
      })

      // Update email status if we have an ID
      if (options.emailId) {
        await client.email.update({
          where: { id: options.emailId },
          data: {
            status: "SENT",
            sentAt: new Date(),
          },
        })
      }

      return {
        success: true,
        messageId: result.data?.id,
        totalSent: Array.isArray(options.to) ? options.to.length : 1,
        message: "Email sent successfully via Resend",
      }
    } else if (config.provider === "smtp" && config.smtp) {
      const transporter = nodemailer.createTransport({
        host: config.smtp.host,
        port: config.smtp.port,
        secure: config.smtp.secure,
        auth: {
          user: config.smtp.auth.user,
          pass: config.smtp.auth.pass,
        },
      })

      const result = await transporter.sendMail({
        from,
        to: options.to,
        subject: options.subject,
        html: htmlContent,
        text: options.text,
      })

      // Update email status if we have an ID
      if (options.emailId) {
        await client.email.update({
          where: { id: options.emailId },
          data: {
            status: "SENT",
            sentAt: new Date(),
          },
        })
      }

      return {
        success: true,
        messageId: result.messageId,
        totalSent: Array.isArray(options.to) ? options.to.length : 1,
        message: "Email sent successfully via SMTP",
      }
    } else if (config.provider === "development") {
      // Development mode - log the email but don't actually send it
      console.log("📧 DEVELOPMENT MODE - Email would be sent:", {
        from,
        to: options.to,
        subject: options.subject,
        html: htmlContent.substring(0, 500) + "...", // Truncate for readability
      })

      // Update email status if we have an ID
      if (options.emailId) {
        await client.email.update({
          where: { id: options.emailId },
          data: {
            status: "SENT",
            sentAt: new Date(),
          },
        })
      }

      return {
        success: true,
        messageId: `dev-${Date.now()}`,
        totalSent: Array.isArray(options.to) ? options.to.length : 1,
        message:
          "DEVELOPMENT MODE: Email logged but not sent. Configure RESEND_API_KEY or SMTP settings to send real emails.",
      }
    }

    throw new Error("No valid email provider configured")
  } catch (error) {
    console.error("Error sending email:", error)

    // Update email status if we have an ID
    if (options.emailId) {
      await client.email.update({
        where: { id: options.emailId },
        data: {
          status: "FAILED",
        },
      })
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : error,
      totalSent: 0,
    }
  }
}

// Send welcome email to a new user
export async function sendWelcomeEmail(user: User) {
  try {
    // Get the default welcome template
    const welcomeTemplate = await client.emailTemplate.findFirst({
      where: {
        category: "welcome",
        isDefault: true,
      },
    })

    if (!welcomeTemplate) {
      console.error("No default welcome template found")
      return { success: false, error: "No default welcome template found" }
    }

    // Create an email record
    const email = await client.email.create({
      data: {
        subject: welcomeTemplate.subject,
        content: welcomeTemplate.content,
        recipientId: user.id,
        templateId: welcomeTemplate.id,
        status: "SCHEDULED",
        scheduledFor: new Date(), // Send immediately
      },
    })

    // Personalize the template
    const personalizedSubject = personalizeTemplate(welcomeTemplate.subject, user)
    const personalizedContent = personalizeTemplate(welcomeTemplate.content, user)

    // Send the email
    return await sendEmail({
      to: user.email,
      subject: personalizedSubject,
      html: personalizedContent,
      emailId: email.id,
      trackOpens: true,
      trackClicks: true,
    })
  } catch (error) {
    console.error("Failed to send welcome email:", error)
    return { success: false, error }
  }
}

// Send a bulk campaign
export async function sendCampaign(campaignId: string) {
  try {
    // Get the campaign with its template
    const campaign = await client.emailCampaign.findUnique({
      where: { id: campaignId },
      include: {
        template: true,
        emails: true,
      },
    })

    if (!campaign) {
      return { success: false, error: "Campaign not found" }
    }

    // Update campaign status
    await client.emailCampaign.update({
      where: { id: campaignId },
      data: {
        status: "SENDING",
      },
    })

    // Send each email in the campaign
    const results = await Promise.all(
      campaign.emails.map(async (email) => {
        // Get the recipient
        const recipient = await client.user.findUnique({
          where: { id: email.recipientId },
        })

        if (!recipient) {
          return { success: false, error: "Recipient not found", emailId: email.id }
        }

        // Personalize the template
        const personalizedSubject = personalizeTemplate(campaign.template.subject, recipient)
        const personalizedContent = personalizeTemplate(campaign.template.content, recipient)

        // Send the email
        return await sendEmail({
          to: recipient.email,
          subject: personalizedSubject,
          html: personalizedContent,
          emailId: email.id,
          trackOpens: true,
          trackClicks: true,
        })
      }),
    )

    // Update campaign status
    await client.emailCampaign.update({
      where: { id: campaignId },
      data: {
        status: "COMPLETED",
        sentAt: new Date(),
      },
    })

    return {
      success: true,
      results,
      totalSent: results.filter((r) => r.success).length,
      totalFailed: results.filter((r) => !r.success).length,
    }
  } catch (error) {
    console.error("Failed to send campaign:", error)

    // Update campaign status
    await client.emailCampaign.update({
      where: { id: campaignId },
      data: {
        status: "CANCELLED",
      },
    })

    return { success: false, error }
  }
}

// Process scheduled emails
export async function processScheduledEmails() {
  try {
    // Get all emails scheduled for now or earlier
    const scheduledEmails = await client.email.findMany({
      where: {
        status: "SCHEDULED",
        scheduledFor: {
          lte: new Date(),
        },
      },
      include: {
        recipient: true,
        template: true,
      },
    })

    if (scheduledEmails.length === 0) {
      return { success: true, message: "No scheduled emails to process" }
    }

    // Send each email
    const results = await Promise.all(
      scheduledEmails.map(async (email) => {
        // Personalize the template if it exists
        const subject = email.template ? personalizeTemplate(email.template.subject, email.recipient) : email.subject
        const content = email.template ? personalizeTemplate(email.template.content, email.recipient) : email.content

        // Send the email
        return await sendEmail({
          to: email.recipient.email,
          subject,
          html: content,
          emailId: email.id,
          trackOpens: true,
          trackClicks: true,
        })
      }),
    )

    return {
      success: true,
      results,
      totalSent: results.filter((r) => r.success).length,
      totalFailed: results.filter((r) => !r.success).length,
    }
  } catch (error) {
    console.error("Failed to process scheduled emails:", error)
    return { success: false, error }
  }
}

// Send a test email
export async function sendTestEmail({
  to,
  subject,
  html,
  from = process.env.EMAIL_FROM,
}: {
  to: string
  subject: string
  html: string
  from?: string
}) {
  try {
    return await sendEmail({
      to,
      subject,
      html,
      from,
      trackOpens: true,
      trackClicks: true,
    })
  } catch (error) {
    console.error("Failed to send test email:", error)
    return { success: false, error }
  }
}

// For backward compatibility
export const sendMail = sendEmail

