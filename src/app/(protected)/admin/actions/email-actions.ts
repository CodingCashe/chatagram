// "use server"

// import { revalidatePath } from "next/cache"
// import { onCurrentUser } from "@/actions/user"
// import { client } from "@/lib/prisma"
// import { sendEmail, sendCampaign } from "@/lib/email-service"
// import { auth } from "@clerk/nextjs/server"
// import { redirect } from "next/navigation"

// Helper to check admin status
// async function requireAdmin() {
//   const currentuser = await onCurrentUser()
//   const userId = currentuser.id

//   if (!userId) {
//     redirect("/sign-in")
//   }

//   const user = await client.user.findFirst({
//     where: {
//       clerkId: userId,
//       isAdmin: true,
//     },
//   })

//   if (!user) {
//     redirect("/dashboard")
//   }

//   return user
// }

// // Create a new email template
// export async function createEmailTemplate(formData: FormData) {
//   await requireAdmin()

//   const name = formData.get("name") as string
//   const subject = formData.get("subject") as string
//   const content = formData.get("content") as string
//   const description = formData.get("description") as string
//   const category = formData.get("category") as string
//   const isDefault = formData.get("isDefault") === "true"

//   if (!name || !subject || !content) {
//     return { success: false, error: "Missing required fields" }
//   }

//   try {
//     // If this is set as default, unset any existing default for this category
//     if (isDefault) {
//       await client.emailTemplate.updateMany({
//         where: {
//           category,
//           isDefault: true,
//         },
//         data: {
//           isDefault: false,
//         },
//       })
//     }

//     const template = await client.emailTemplate.create({
//       data: {
//         name,
//         subject,
//         content,
//         description,
//         category,
//         isDefault,
//       },
//     })

//     revalidatePath("/admin/email/templates")
//     return { success: true, template }
//   } catch (error) {
//     console.error("Failed to create email template", error)
//     return { success: false, error }
//   }
// }

// // Update an existing email template
// export async function updateEmailTemplate(templateId: string, formData: FormData) {
//   await requireAdmin()

//   const name = formData.get("name") as string
//   const subject = formData.get("subject") as string
//   const content = formData.get("content") as string
//   const description = formData.get("description") as string
//   const category = formData.get("category") as string
//   const isDefault = formData.get("isDefault") === "true"

//   if (!name || !subject || !content) {
//     return { success: false, error: "Missing required fields" }
//   }

//   try {
//     // If this is set as default, unset any existing default for this category
//     if (isDefault) {
//       await client.emailTemplate.updateMany({
//         where: {
//           category,
//           isDefault: true,
//           id: { not: templateId },
//         },
//         data: {
//           isDefault: false,
//         },
//       })
//     }

//     const template = await client.emailTemplate.update({
//       where: { id: templateId },
//       data: {
//         name,
//         subject,
//         content,
//         description,
//         category,
//         isDefault,
//       },
//     })

//     revalidatePath("/admin/email/templates")
//     return { success: true, template }
//   } catch (error) {
//     console.error("Failed to update email template", error)
//     return { success: false, error }
//   }
// }

// // Delete an email template
// export async function deleteEmailTemplate(templateId: string) {
//   await requireAdmin()

//   try {
//     await client.emailTemplate.delete({
//       where: { id: templateId },
//     })

//     revalidatePath("/admin/email/templates")
//     return { success: true }
//   } catch (error) {
//     console.error("Failed to delete email template", error)
//     return { success: false, error }
//   }
// }

// // Create a new email campaign
// export async function createEmailCampaign(formData: FormData) {
//   await requireAdmin()

//   const name = formData.get("name") as string
//   const description = formData.get("description") as string
//   const templateId = formData.get("templateId") as string
//   const userIds = (formData.get("userIds") as string).split(",")
//   const scheduledFor = formData.get("scheduledFor") as string

//   if (!name || !templateId || !userIds.length) {
//     return { success: false, error: "Missing required fields" }
//   }

//   try {
//     // Create the campaign
//     const campaign = await client.emailCampaign.create({
//       data: {
//         name,
//         description,
//         templateId,
//         status: scheduledFor ? "SCHEDULED" : "DRAFT",
//         scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
//       },
//     })

//     // Get the template
//     const template = await client.emailTemplate.findUnique({
//       where: { id: templateId },
//     })

//     if (!template) {
//       return { success: false, error: "Template not found" }
//     }

//     // Create an email for each user
//     await Promise.all(
//       userIds.map(async (userId) => {
//         await client.email.create({
//           data: {
//             subject: template.subject,
//             content: template.content,
//             recipientId: userId,
//             templateId,
//             campaignId: campaign.id,
//             status: "SCHEDULED",
//             scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
//           },
//         })
//       }),
//     )

//     // If scheduled for now or in the past, send immediately
//     if (scheduledFor && new Date(scheduledFor) <= new Date()) {
//       await sendCampaign(campaign.id)
//     }

//     revalidatePath("/admin/email/campaigns")
//     return { success: true, campaign }
//   } catch (error) {
//     console.error("Failed to create email campaign", error)
//     return { success: false, error }
//   }
// }

// // Send a test email
// export async function sendTestEmail(formData: FormData) {
//   await requireAdmin()

//   const to = formData.get("to") as string
//   const subject = formData.get("subject") as string
//   const content = formData.get("content") as string

//   if (!to || !subject || !content) {
//     return { success: false, error: "Missing required fields" }
//   }

//   try {
//     const result = await sendEmail({
//       to,
//       subject,
//       html: content,
//     })

//     return result
//   } catch (error) {
//     console.error("Failed to send test email", error)
//     return { success: false, error }
//   }
// }

// // Send a campaign immediately
// export async function sendCampaignNow(campaignId: string) {
//   await requireAdmin()

//   try {
//     const result = await sendCampaign(campaignId)

//     revalidatePath("/admin/email/campaigns")
//     return result
//   } catch (error) {
//     console.error("Failed to send campaign", error)
//     return { success: false, error }
//   }
// }

// // Cancel a scheduled campaign
// export async function cancelCampaign(campaignId: string) {
//   await requireAdmin()

//   try {
//     await client.emailCampaign.update({
//       where: { id: campaignId },
//       data: {
//         status: "CANCELLED",
//       },
//     })

//     // Also update all associated emails
//     await client.email.updateMany({
//       where: {
//         campaignId,
//         status: "SCHEDULED",
//       },
//       data: {
//         status: "FAILED",
//       },
//     })

//     revalidatePath("/admin/email/campaigns")
//     return { success: true }
//   } catch (error) {
//     console.error("Failed to cancel campaign", error)
//     return { success: false, error }
//   }
// }

// // Get email templates
// export async function getEmailTemplates(category?: string) {
//   await requireAdmin()

//   try {
//     const templates = await client.emailTemplate.findMany({
//       where: category ? { category } : undefined,
//       orderBy: { createdAt: "desc" },
//     })

//     return { success: true, templates }
//   } catch (error) {
//     console.error("Failed to get email templates", error)
//     return { success: false, error }
//   }
// }

// // Get email campaigns
// export async function getEmailCampaigns() {
//   await requireAdmin()

//   try {
//     const campaigns = await client.emailCampaign.findMany({
//       include: {
//         template: true,
//         emails: {
//           select: {
//             id: true,
//             status: true,
//           },
//         },
//       },
//       orderBy: { createdAt: "desc" },
//     })

//     // Add some stats to each campaign
//     const campaignsWithStats = campaigns.map((campaign) => {
//       const totalEmails = campaign.emails.length
//       const sentEmails = campaign.emails.filter((e) => e.status === "SENT").length
//       const openedEmails = campaign.emails.filter((e) => e.status === "OPENED").length
//       const clickedEmails = campaign.emails.filter((e) => e.status === "CLICKED").length
//       const failedEmails = campaign.emails.filter((e) => e.status === "FAILED").length

//       return {
//         ...campaign,
//         stats: {
//           totalEmails,
//           sentEmails,
//           openedEmails,
//           clickedEmails,
//           failedEmails,
//           openRate: totalEmails > 0 ? (openedEmails / totalEmails) * 100 : 0,
//           clickRate: totalEmails > 0 ? (clickedEmails / totalEmails) * 100 : 0,
//         },
//       }
//     })

//     return { success: true, campaigns: campaignsWithStats }
//   } catch (error) {
//     console.error("Failed to get email campaigns", error)
//     return { success: false, error }
//   }
// }

// // Get email analytics
// export async function getEmailAnalytics() {
//   await requireAdmin()

//   try {
//     // Get counts by status
//     const statusCounts = await client.email.groupBy({
//       by: ["status"],
//       _count: true,
//     })

//     // Get counts by day for the last 30 days
//     const thirtyDaysAgo = new Date()
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

//     const dailySentCounts = await client.email.groupBy({
//       by: ["sentAt"],
//       where: {
//         sentAt: {
//           gte: thirtyDaysAgo,
//         },
//         status: "SENT",
//       },
//       _count: true,
//     })

//     // Get open rates by template category
//     const templateStats = await client.emailTemplate.findMany({
//       include: {
//         emails: {
//           select: {
//             status: true,
//           },
//         },
//       },
//     })

//     const templateStatsByCategory = templateStats.reduce(
//       (acc, template) => {
//         const category = template.category || "uncategorized"

//         if (!acc[category]) {
//           acc[category] = {
//             totalEmails: 0,
//             openedEmails: 0,
//             clickedEmails: 0,
//           }
//         }

//         const totalEmails = template.emails.length
//         const openedEmails = template.emails.filter((e) => e.status === "OPENED").length
//         const clickedEmails = template.emails.filter((e) => e.status === "CLICKED").length

//         acc[category].totalEmails += totalEmails
//         acc[category].openedEmails += openedEmails
//         acc[category].clickedEmails += clickedEmails

//         return acc
//       },
//       {} as Record<string, { totalEmails: number; openedEmails: number; clickedEmails: number }>,
//     )

//     // Calculate open and click rates by category
//     const categoryStats = Object.entries(templateStatsByCategory).map(([category, stats]) => ({
//       category,
//       totalEmails: stats.totalEmails,
//       openRate: stats.totalEmails > 0 ? (stats.openedEmails / stats.totalEmails) * 100 : 0,
//       clickRate: stats.totalEmails > 0 ? (stats.clickedEmails / stats.totalEmails) * 100 : 0,
//     }))

//     return {
//       success: true,
//       statusCounts: statusCounts.reduce(
//         (acc, curr) => {
//           acc[curr.status] = curr._count
//           return acc
//         },
//         {} as Record<string, number>,
//       ),
//       dailySentCounts: dailySentCounts.map((day) => ({
//         date: day.sentAt,
//         count: day._count,
//       })),
//       categoryStats,
//     }
//   } catch (error) {
//     console.error("Failed to get email analytics", error)
//     return { success: false, error }
//   }
// }

"use server"

"use server"

// import { revalidatePath } from "next/cache"
// import { prisma } from "@/lib/prisma"
// import { auth } from "@clerk/nextjs/server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { client } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { sendMail } from "@/lib/email-service"
import { onCurrentUser } from "@/actions/user"
import { sendCampaign, sendTestEmail as sendTestEmailService } from "@/lib/email-service"


// Get all email templates
// export async function getEmailTemplates(category?: string) {
//   try {
//     const currentUser = await onCurrentUser()

//     const  userId  = currentUser.id

//     if (!userId) {
//       return { success: false, error: "Unauthorized" }
//     }

//     // Check if user is admin
//     const isAdmin = await client.user.findUnique({
//       where: { clerkId: userId },
//       select: { isAdmin: true },
//     })

//     if (!isAdmin?.isAdmin) {
//       return { success: false, error: "Unauthorized" }
//     }

//     const where = category ? { category } : {}

//     const templates = await client.emailTemplate.findMany({
//       where,
//       orderBy: { updatedAt: "desc" },
//     })

//     return { success: true, templates }
//   } catch (error) {
//     console.error("Error getting email templates:", error)
//     return { success: false, error: "Failed to get email templates" }
//   }
// }

// Create a new email template
// export async function createEmailTemplate(formData: FormData) {
//   try {
//     const currentUser = await onCurrentUser()

//     const  userId  = currentUser.id

//     if (!userId) {
//       return { success: false, error: "Unauthorized" }
//     }

//     // Check if user is admin
//     const isAdmin = await client.user.findUnique({
//       where: { clerkId: userId },
//       select: { isAdmin: true },
//     })

//     if (!isAdmin?.isAdmin) {
//       return { success: false, error: "Unauthorized" }
//     }

//     const name = formData.get("name") as string
//     const subject = formData.get("subject") as string
//     const content = formData.get("content") as string
//     const description = formData.get("description") as string
//     const category = formData.get("category") as string
//     const isDefault = formData.get("isDefault") === "true"

//     // If this template is set as default, unset any other default templates in the same category
//     if (isDefault) {
//       await client.emailTemplate.updateMany({
//         where: { category, isDefault: true },
//         data: { isDefault: false },
//       })
//     }

//     const template = await client.emailTemplate.create({
//       data: {
//         name,
//         subject,
//         content,
//         description,
//         category,
//         isDefault,
//       },
//     })

//     revalidatePath("/admin/email/templates")

//     return { success: true, template }
//   } catch (error) {
//     console.error("Error creating email template:", error)
//     return { success: false, error: "Failed to create email template" }
//   }
// }

// Update an existing email template
// export async function updateEmailTemplate(id: string, formData: FormData) {
//   try {
//     const currentUser = await onCurrentUser()

//     const  userId  = currentUser.id

//     if (!userId) {
//       return { success: false, error: "Unauthorized" }
//     }

//     // Check if user is admin
//     const isAdmin = await client.user.findUnique({
//       where: { clerkId: userId },
//       select: { isAdmin: true },
//     })

//     if (!isAdmin?.isAdmin) {
//       return { success: false, error: "Unauthorized" }
//     }

//     const name = formData.get("name") as string
//     const subject = formData.get("subject") as string
//     const content = formData.get("content") as string
//     const description = formData.get("description") as string
//     const category = formData.get("category") as string
//     const isDefault = formData.get("isDefault") === "true"

//     // If this template is set as default, unset any other default templates in the same category
//     if (isDefault) {
//       await client.emailTemplate.updateMany({
//         where: { category, isDefault: true, id: { not: id } },
//         data: { isDefault: false },
//       })
//     }

//     const template = await client.emailTemplate.update({
//       where: { id },
//       data: {
//         name,
//         subject,
//         content,
//         description,
//         category,
//         isDefault,
//       },
//     })

//     revalidatePath("/admin/email/templates")

//     return { success: true, template }
//   } catch (error) {
//     console.error("Error updating email template:", error)
//     return { success: false, error: "Failed to update email template" }
//   }
// }

// Delete an email template
// export async function deleteEmailTemplate(id: string) {
//   try {
//     const currentUser = await onCurrentUser()

//     const  userId  = currentUser.id

//     if (!userId) {
//       return { success: false, error: "Unauthorized" }
//     }

//     // Check if user is admin
//     const isAdmin = await client.user.findUnique({
//       where: { clerkId: userId },
//       select: { isAdmin: true },
//     })

//     if (!isAdmin?.isAdmin) {
//       return { success: false, error: "Unauthorized" }
//     }

//     await client.emailTemplate.delete({
//       where: { id },
//     })

//     revalidatePath("/admin/email/templates")

//     return { success: true }
//   } catch (error) {
//     console.error("Error deleting email template:", error)
//     return { success: false, error: "Failed to delete email template" }
//   }
// }

// Get all email campaigns
// export async function getEmailCampaigns() {
//   try {
//     const currentUser = await onCurrentUser()

//     const  userId  = currentUser.id

//     if (!userId) {
//       return { success: false, error: "Unauthorized" }
//     }

//     // Check if user is admin
//     const isAdmin = await client.user.findUnique({
//       where: { clerkId: userId },
//       select: { isAdmin: true },
//     })

//     if (!isAdmin?.isAdmin) {
//       return { success: false, error: "Unauthorized" }
//     }

//     // Fetch actual campaigns from the database
//     const campaigns = await client.emailCampaign.findMany({
//       orderBy: { createdAt: "desc" },
//       include: {
//         template: true,
//         emails: {
//           select: {
//             id: true,
//             status: true,
//           },
//         },
//       },
//     })

//     // Calculate stats for each campaign
//     const campaignsWithStats = campaigns.map((campaign) => {
//       const totalEmails = campaign.emails.length
//       const sentEmails = campaign.emails.filter((e) => e.status === "SENT").length
//       const openedEmails = campaign.emails.filter((e) => e.status === "OPENED").length
//       const clickedEmails = campaign.emails.filter((e) => e.status === "CLICKED").length
//       const failedEmails = campaign.emails.filter((e) => e.status === "FAILED").length

//       return {
//         ...campaign,
//         stats: {
//           totalEmails,
//           sentEmails,
//           openedEmails,
//           clickedEmails,
//           failedEmails,
//           openRate: totalEmails > 0 ? (openedEmails / totalEmails) * 100 : 0,
//           clickRate: totalEmails > 0 ? (clickedEmails / totalEmails) * 100 : 0,
//         },
//       }
//     })

//     return {
//       success: true,
//       campaigns: campaignsWithStats,
//     }
//   } catch (error) {
//     console.error("Error getting email campaigns:", error)
//     return { success: false, error: "Failed to get email campaigns" }
//   }
// }

// Create a new email campaign
// export async function createEmailCampaign(formData: FormData) {
//   try {
//     const currentUser = await onCurrentUser()

//     const  userId  = currentUser.id

//     if (!userId) {
//       return { success: false, error: "Unauthorized" }
//     }

//     // Check if user is admin
//     const isAdmin = await client.user.findUnique({
//       where: { clerkId: userId },
//       select: { isAdmin: true },
//     })

//     if (!isAdmin?.isAdmin) {
//       return { success: false, error: "Unauthorized" }
//     }

//     const name = formData.get("name") as string
//     const subject = formData.get("subject") as string
//     const templateId = formData.get("templateId") as string
//     const description = formData.get("description") as string
//     const sendToAll = formData.get("sendToAll") === "true"
//     const scheduleForLater = formData.get("scheduleForLater") === "true"
//     const scheduledDate = formData.get("scheduledDate") as string
//     const testEmail = formData.get("testEmail") as string
//     const userIds = sendToAll ? [] : ((formData.get("userIds") as string) || "").split(",").filter(Boolean)

//     // Get the template
//     const template = await client.emailTemplate.findUnique({
//       where: { id: templateId },
//     })

//     if (!template) {
//       return { success: false, error: "Template not found" }
//     }

//     // Create the campaign
//     const campaign = await client.emailCampaign.create({
//       data: {
//         name,
//         description,
//         templateId,
//         status: scheduleForLater ? "SCHEDULED" : "DRAFT",
//         scheduledFor: scheduleForLater && scheduledDate ? new Date(scheduledDate) : null,
//       },
//     })

//     // If sending to all users, get all user IDs
//     let recipientIds = userIds
//     if (sendToAll) {
//       const allUsers = await client.user.findMany({
//         select: { id: true },
//       })
//       recipientIds = allUsers.map((user) => user.id)
//     }

//     // Create an email for each recipient
//     await Promise.all(
//       recipientIds.map(async (recipientId) => {
//         await client.email.create({
//           data: {
//             subject: subject || template.subject,
//             content: template.content,
//             recipientId,
//             templateId,
//             campaignId: campaign.id,
//             status: "SCHEDULED",
//             scheduledFor: scheduleForLater && scheduledDate ? new Date(scheduledDate) : null,
//           },
//         })
//       }),
//     )

//     // If test email is provided, send a test email
//     // if (testEmail) {
//     //   await sendEmail({
//     //     to: testEmail,
//     //     subject: subject || template.subject,
//     //     html: template.content,
//     //   })
//     // }

//     // If not scheduling for later, send the campaign immediately
//     if (!scheduleForLater) {
//       // Update campaign status
//       await client.emailCampaign.update({
//         where: { id: campaign.id },
//         data: { status: "SENDING" },
//       })

//       // In a real implementation, you would queue these emails for sending
//       // For now, we'll just mark them as sent
//       await client.email.updateMany({
//         where: { campaignId: campaign.id },
//         data: { status: "SENT", sentAt: new Date() },
//       })

//       // Update campaign status to sent
//       await client.emailCampaign.update({
//         where: { id: campaign.id },
//         data: { status: "COMPLETED" },
//       })
//     }

//     revalidatePath("/admin/email/campaigns")

//     return { success: true, campaign }
//   } catch (error) {
//     console.error("Error creating email campaign:", error)
//     return { success: false, error: "Failed to create email campaign" }
//   }
// }

// Delete an email campaign
export async function deleteEmailCampaign(id: string) {
  try {
    const currentUser = await onCurrentUser()

    const  userId  = currentUser.id

    if (!userId) {
      return { success: false, error: "Unauthorized" }
    }

    // Check if user is admin
    const isAdmin = await client.user.findUnique({
      where: { clerkId: userId },
      select: { isAdmin: true },
    })

    if (!isAdmin?.isAdmin) {
      return { success: false, error: "Unauthorized" }
    }

    // Delete all emails associated with this campaign
    await client.email.deleteMany({
      where: { campaignId: id },
    })

    // Delete the campaign
    await client.emailCampaign.delete({
      where: { id },
    })

    revalidatePath("/admin/email/campaigns")

    return { success: true }
  } catch (error) {
    console.error("Error deleting email campaign:", error)
    return { success: false, error: "Failed to delete email campaign" }
  }
}


export async function getEmailAnalyticse(timeframe = "7days") {
  try {
    const currentUser = await onCurrentUser()

    const  userId  = currentUser.id

    if (!userId) {
      return { success: false, error: "Unauthorized" }
    }

    // Check if user is admin
    const isAdmin = await client.user.findUnique({
      where: { clerkId: userId },
      select: { isAdmin: true },
    })

    if (!isAdmin?.isAdmin) {
      return { success: false, error: "Unauthorized" }
    }

    // Calculate date range based on timeframe
    const now = new Date()
    const startDate = new Date()

    switch (timeframe) {
      case "7days":
        startDate.setDate(now.getDate() - 7)
        break
      case "30days":
        startDate.setDate(now.getDate() - 30)
        break
      case "90days":
        startDate.setDate(now.getDate() - 90)
        break
      case "year":
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setDate(now.getDate() - 7)
    }

    // Get email counts
    const [totalEmails, deliveredEmails, openedEmails, clickedEmails, bouncedEmails] = await Promise.all([
      client.email.count(),
      client.email.count({
        where: {
          status: {
            in: ["SENT", "OPENED", "CLICKED"],
          },
        },
      }),
      client.email.count({
        where: {
          status: {
            in: ["OPENED", "CLICKED"],
          },
        },
      }),
      client.email.count({
        where: {
          status: "CLICKED",
        },
      }),
      client.email.count({
        where: {
          status: "FAILED",
        },
      }),
    ])

    // Get previous period counts for growth calculation
    const previousPeriodStartDate = new Date(startDate)
    const previousPeriodEndDate = new Date(startDate)

    switch (timeframe) {
      case "7days":
        previousPeriodStartDate.setDate(previousPeriodStartDate.getDate() - 7)
        break
      case "30days":
        previousPeriodStartDate.setDate(previousPeriodStartDate.getDate() - 30)
        break
      case "90days":
        previousPeriodStartDate.setDate(previousPeriodStartDate.getDate() - 90)
        break
      case "year":
        previousPeriodStartDate.setFullYear(previousPeriodStartDate.getFullYear() - 1)
        break
    }

    const previousPeriodEmails = await client.email.count({
      where: {
        createdAt: {
          gte: previousPeriodStartDate,
          lt: startDate,
        },
      },
    })

    // Calculate growth percentage
    const emailsGrowth =
      previousPeriodEmails > 0 ? Math.round(((totalEmails - previousPeriodEmails) / previousPeriodEmails) * 100) : 100

    // Calculate rates
    const deliveryRate = totalEmails > 0 ? Math.round((deliveredEmails / totalEmails) * 100 * 10) / 10 : 0
    const openRate = deliveredEmails > 0 ? Math.round((openedEmails / deliveredEmails) * 100 * 10) / 10 : 0
    const clickRate = deliveredEmails > 0 ? Math.round((clickedEmails / deliveredEmails) * 100 * 10) / 10 : 0
    const bounceRate = totalEmails > 0 ? Math.round((bouncedEmails / totalEmails) * 100 * 10) / 10 : 0

    // Get time-based data
    const timeLabels = []
    const sentData = []
    const openedData = []
    const clickedData = []

    // Generate time labels and fetch data for each point
    let currentDate = new Date(startDate)
    const dateFormat = timeframe === "year" ? { month: "short", year: "numeric" } : { month: "short", day: "numeric" }
    const incrementDays = timeframe === "year" ? 30 : timeframe === "90days" ? 7 : 1

    while (currentDate <= now) {
      const endOfPeriod = new Date(currentDate)
      endOfPeriod.setDate(endOfPeriod.getDate() + incrementDays)

      // Format the date for display
      timeLabels.push(currentDate.toLocaleDateString("en-US", dateFormat as any))

      // Get counts for this period
      const [periodSent, periodOpened, periodClicked] = await Promise.all([
        client.email.count({
          where: {
            sentAt: {
              gte: currentDate,
              lt: endOfPeriod,
            },
            status: {
              in: ["SENT", "OPENED", "CLICKED"],
            },
          },
        }),
        client.email.count({
          where: {
            openedAt: {
              gte: currentDate,
              lt: endOfPeriod,
            },
            status: {
              in: ["OPENED", "CLICKED"],
            },
          },
        }),
        client.email.count({
          where: {
            clickedAt: {
              gte: currentDate,
              lt: endOfPeriod,
            },
            status: "CLICKED",
          },
        }),
      ])

      sentData.push(periodSent)
      openedData.push(periodOpened)
      clickedData.push(periodClicked)

      // Move to next period
      currentDate = new Date(endOfPeriod)
    }

    // Get campaign performance data
    const campaigns = await client.emailCampaign.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      include: {
        emails: {
          select: {
            status: true,
          },
        },
      },
    })

    const campaignPerformance = campaigns.map((campaign) => {
      const totalEmails = campaign.emails.length
      const openedEmails = campaign.emails.filter((e) => e.status === "OPENED" || e.status === "CLICKED").length
      const clickedEmails = campaign.emails.filter((e) => e.status === "CLICKED").length

      return {
        name: campaign.name,
        sentEmails: totalEmails,
        openRate: totalEmails > 0 ? Math.round((openedEmails / totalEmails) * 100 * 10) / 10 : 0,
        clickRate: totalEmails > 0 ? Math.round((clickedEmails / totalEmails) * 100 * 10) / 10 : 0,
      }
    })

    // Construct the analytics object
    const analytics = {
      overview: {
        totalEmails,
        deliveredEmails,
        openedEmails,
        clickedEmails,
        deliveryRate,
        openRate,
        clickRate,
        bounceRate,
        emailsGrowth,
      },
      campaigns: campaignPerformance,
      timeData: {
        labels: timeLabels,
        sent: sentData,
        opened: openedData,
        clicked: clickedData,
      },
    }

    return {
      success: true,
      analytics,
    }
  } catch (error) {
    console.error("Error getting email analytics:", error)
    return { success: false, error: "Failed to get email analytics" }
  }
}

// Send a test email
// export async function sendTestEmail(formData: FormData) {
//   try {
//     const currentUser = await onCurrentUser()

//     const  userId  = currentUser.id

//     if (!userId) {
//       return { success: false, error: "Unauthorized" }
//     }

//     // Check if user is admin
//     const isAdmin = await client.user.findUnique({
//       where: { clerkId: userId },
//       select: { isAdmin: true },
//     })

//     if (!isAdmin?.isAdmin) {
//       return { success: false, error: "Unauthorized" }
//     }

//     const to = formData.get("to") as string
//     const subject = formData.get("subject") as string
//     const content = formData.get("content") as string

//     if (!to || !subject || !content) {
//       return { success: false, error: "Missing required fields" }
//     }

//     const result = await sendMail({
//       to,
//       subject,
//       html: content,
//     })

//     return { success: true, message: "Test email sent successfully" }
//   } catch (error) {
//     console.error("Error sending test email:", error)
//     return { success: false, error: "Failed to send test email" }
//   }
// }

// Send a campaign immediately
// export async function sendCampaignNow(campaignId: string) {
//   try {
//     const currentUser = await onCurrentUser()

//     const  userId  = currentUser.id

//     if (!userId) {
//       return { success: false, error: "Unauthorized" }
//     }

//     // Check if user is admin
//     const isAdmin = await client.user.findUnique({
//       where: { clerkId: userId },
//       select: { isAdmin: true },
//     })

//     if (!isAdmin?.isAdmin) {
//       return { success: false, error: "Unauthorized" }
//     }

//     // Get the campaign
//     const campaign = await client.emailCampaign.findUnique({
//       where: { id: campaignId },
//       include: {
//         emails: true,
//       },
//     })

//     if (!campaign) {
//       return { success: false, error: "Campaign not found" }
//     }

//     // Update campaign status
//     await client.emailCampaign.update({
//       where: { id: campaignId },
//       data: { status: "SENDING" },
//     })

//     // In a real implementation, you would queue these emails for sending
//     // For now, we'll just mark them as sent
//     await client.email.updateMany({
//       where: { campaignId },
//       data: { status: "SENT", sentAt: new Date() },
//     })

//     // Update campaign status to sent
//     await client.emailCampaign.update({
//       where: { id: campaignId },
//       data: { status: "COMPLETED" },
//     })

//     revalidatePath("/admin/email/campaigns")

//     return { success: true, message: "Campaign sent successfully" }
//   } catch (error) {
//     console.error("Error sending campaign:", error)
//     return { success: false, error: "Failed to send campaign" }
//   }
// }

// Cancel a scheduled campaign
// export async function cancelCampaign(campaignId: string) {
//   try {
//     const currentUser = await onCurrentUser()

//     const  userId  = currentUser.id

//     if (!userId) {
//       return { success: false, error: "Unauthorized" }
//     }

//     // Check if user is admin
//     const isAdmin = await client.user.findUnique({
//       where: { clerkId: userId },
//       select: { isAdmin: true },
//     })

//     if (!isAdmin?.isAdmin) {
//       return { success: false, error: "Unauthorized" }
//     }

//     // Update campaign status
//     await client.emailCampaign.update({
//       where: { id: campaignId },
//       data: { status: "CANCELLED" },
//     })

//     // Update email statuses
//     await client.email.updateMany({
//       where: {
//         campaignId,
//         status: "SCHEDULED",
//       },
//       data: { status: "FAILED" },
//     })

//     revalidatePath("/admin/email/campaigns")

//     return { success: true, message: "Campaign cancelled successfully" }
//   } catch (error) {
//     console.error("Error cancelling campaign:", error)
//     return { success: false, error: "Failed to cancel campaign" }
//   }
// }


///////////////////////////////


// Helper to check admin status
async function requireAdmin() {
  const currentuser = await onCurrentUser()
  const userId = currentuser.id

  if (!userId) {
    redirect("/sign-in")
  }

  const user = await client.user.findFirst({
    where: {
      clerkId: userId,
      isAdmin: true,
    },
  })

  if (!user) {
    redirect("/dashboard")
  }

  return user
}

// Create a new email template
// export async function createEmailTemplate(formData: FormData) {
//   await requireAdmin()

//   const name = formData.get("name") as string
//   const subject = formData.get("subject") as string
//   const content = formData.get("content") as string
//   const description = formData.get("description") as string
//   const category = formData.get("category") as string
//   const isDefault = formData.get("isDefault") === "true"

//   if (!name || !subject || !content) {
//     return { success: false, error: "Missing required fields" }
//   }

//   try {
//     // If this is set as default, unset any existing default for this category
//     if (isDefault) {
//       await client.emailTemplate.updateMany({
//         where: {
//           category,
//           isDefault: true,
//         },
//         data: {
//           isDefault: false,
//         },
//       })
//     }

//     const template = await client.emailTemplate.create({
//       data: {
//         name,
//         subject,
//         content,
//         description,
//         category,
//         isDefault,
//       },
//     })

//     revalidatePath("/admin/email/templates")
//     return { success: true, template }
//   } catch (error) {
//     console.error("Failed to create email template", error)
//     return { success: false, error }
//   }
// }

// // Update an existing email template
// export async function updateEmailTemplate(templateId: string, formData: FormData) {
//   await requireAdmin()

//   const name = formData.get("name") as string
//   const subject = formData.get("subject") as string
//   const content = formData.get("content") as string
//   const description = formData.get("description") as string
//   const category = formData.get("category") as string
//   const isDefault = formData.get("isDefault") === "true"

//   if (!name || !subject || !content) {
//     return { success: false, error: "Missing required fields" }
//   }

//   try {
//     // If this is set as default, unset any existing default for this category
//     if (isDefault) {
//       await client.emailTemplate.updateMany({
//         where: {
//           category,
//           isDefault: true,
//           id: { not: templateId },
//         },
//         data: {
//           isDefault: false,
//         },
//       })
//     }

//     const template = await client.emailTemplate.update({
//       where: { id: templateId },
//       data: {
//         name,
//         subject,
//         content,
//         description,
//         category,
//         isDefault,
//       },
//     })

//     revalidatePath("/admin/email/templates")
//     return { success: true, template }
//   } catch (error) {
//     console.error("Failed to update email template", error)
//     return { success: false, error }
//   }
// }

// // Delete an email template
// export async function deleteEmailTemplate(templateId: string) {
//   await requireAdmin()

//   try {
//     await client.emailTemplate.delete({
//       where: { id: templateId },
//     })

//     revalidatePath("/admin/email/templates")
//     return { success: true }
//   } catch (error) {
//     console.error("Failed to delete email template", error)
//     return { success: false, error }
//   }
// }

// // Create a new email campaign
// export async function createEmailCampaign(formData: FormData) {
//   await requireAdmin()

//   const name = formData.get("name") as string
//   const description = formData.get("description") as string
//   const templateId = formData.get("templateId") as string
//   const userIds = (formData.get("userIds") as string).split(",")
//   const scheduledFor = formData.get("scheduledFor") as string

//   if (!name || !templateId || !userIds.length) {
//     return { success: false, error: "Missing required fields" }
//   }

//   try {
//     // Create the campaign
//     const campaign = await client.emailCampaign.create({
//       data: {
//         name,
//         description,
//         templateId,
//         status: scheduledFor ? "SCHEDULED" : "DRAFT",
//         scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
//       },
//     })

//     // Get the template
//     const template = await client.emailTemplate.findUnique({
//       where: { id: templateId },
//     })

//     if (!template) {
//       return { success: false, error: "Template not found" }
//     }

//     // Create an email for each user
//     await Promise.all(
//       userIds.map(async (userId) => {
//         await client.email.create({
//           data: {
//             subject: template.subject,
//             content: template.content,
//             recipientId: userId,
//             templateId,
//             campaignId: campaign.id,
//             status: "SCHEDULED",
//             scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
//           },
//         })
//       }),
//     )

//     // If scheduled for now or in the past, send immediately
//     if (scheduledFor && new Date(scheduledFor) <= new Date()) {
//       await sendCampaign(campaign.id)
//     }

//     revalidatePath("/admin/email/campaigns")
//     return { success: true, campaign }
//   } catch (error) {
//     console.error("Failed to create email campaign", error)
//     return { success: false, error }
//   }
// }

// // Send a test email
// export async function sendTestEmail({
//   to,
//   subject,
//   content,
// }: {
//   to: string
//   subject: string
//   content: string
// }) {
//   try {
//     const result = await sendTestEmailService({
//       to,
//       subject,
//       html: content,
//     })

//     return result
//   } catch (error) {
//     console.error("Error sending test email:", error)
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "Unknown error sending test email",
//     }
//   }
// }

// // Send a campaign immediately
// export async function sendCampaignNow(campaignId: string) {
//   await requireAdmin()

//   try {
//     const result = await sendCampaign(campaignId)

//     revalidatePath("/admin/email/campaigns")
//     return result
//   } catch (error) {
//     console.error("Failed to send campaign", error)
//     return { success: false, error }
//   }
// }

// // Cancel a scheduled campaign
// export async function cancelCampaign(campaignId: string) {
//   await requireAdmin()

//   try {
//     await client.emailCampaign.update({
//       where: { id: campaignId },
//       data: {
//         status: "CANCELLED",
//       },
//     })

//     // Also update all associated emails
//     await client.email.updateMany({
//       where: {
//         campaignId,
//         status: "SCHEDULED",
//       },
//       data: {
//         status: "FAILED",
//       },
//     })

//     revalidatePath("/admin/email/campaigns")
//     return { success: true }
//   } catch (error) {
//     console.error("Failed to cancel campaign", error)
//     return { success: false, error }
//   }
// }

// // Get email templates
// export async function getEmailTemplates(category?: string) {
//   await requireAdmin()

//   try {
//     const templates = await client.emailTemplate.findMany({
//       where: category ? { category } : undefined,
//       orderBy: { createdAt: "desc" },
//     })

//     return { success: true, templates }
//   } catch (error) {
//     console.error("Failed to get email templates", error)
//     return { success: false, error }
//   }
// }

// // Get email campaigns
// export async function getEmailCampaigns() {
//   await requireAdmin()

//   try {
//     const campaigns = await client.emailCampaign.findMany({
//       include: {
//         template: true,
//         emails: {
//           select: {
//             id: true,
//             status: true,
//           },
//         },
//       },
//       orderBy: { createdAt: "desc" },
//     })

//     // Add some stats to each campaign
//     const campaignsWithStats = campaigns.map((campaign) => {
//       const totalEmails = campaign.emails.length
//       const sentEmails = campaign.emails.filter((e) => e.status === "SENT").length
//       const openedEmails = campaign.emails.filter((e) => e.status === "OPENED").length
//       const clickedEmails = campaign.emails.filter((e) => e.status === "CLICKED").length
//       const failedEmails = campaign.emails.filter((e) => e.status === "FAILED").length

//       return {
//         ...campaign,
//         stats: {
//           totalEmails,
//           sentEmails,
//           openedEmails,
//           clickedEmails,
//           failedEmails,
//           openRate: totalEmails > 0 ? (openedEmails / totalEmails) * 100 : 0,
//           clickRate: totalEmails > 0 ? (clickedEmails / totalEmails) * 100 : 0,
//         },
//       }
//     })

//     return { success: true, campaigns: campaignsWithStats }
//   } catch (error) {
//     console.error("Failed to get email campaigns", error)
//     return { success: false, error }
//   }
// }

// // Get email analytics
// export async function getEmailAnalytics() {
//   await requireAdmin()

//   try {
//     // Get counts by status
//     const statusCounts = await client.email.groupBy({
//       by: ["status"],
//       _count: true,
//     })

//     // Get counts by day for the last 30 days
//     const thirtyDaysAgo = new Date()
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

//     const dailySentCounts = await client.email.groupBy({
//       by: ["sentAt"],
//       where: {
//         sentAt: {
//           gte: thirtyDaysAgo,
//         },
//         status: "SENT",
//       },
//       _count: true,
//     })

//     // Get open rates by template category
//     const templateStats = await client.emailTemplate.findMany({
//       include: {
//         emails: {
//           select: {
//             status: true,
//           },
//         },
//       },
//     })

//     const templateStatsByCategory = templateStats.reduce(
//       (acc, template) => {
//         const category = template.category || "uncategorized"

//         if (!acc[category]) {
//           acc[category] = {
//             totalEmails: 0,
//             openedEmails: 0,
//             clickedEmails: 0,
//           }
//         }

//         const totalEmails = template.emails.length
//         const openedEmails = template.emails.filter((e) => e.status === "OPENED").length
//         const clickedEmails = template.emails.filter((e) => e.status === "CLICKED").length

//         acc[category].totalEmails += totalEmails
//         acc[category].openedEmails += openedEmails
//         acc[category].clickedEmails += clickedEmails

//         return acc
//       },
//       {} as Record<string, { totalEmails: number; openedEmails: number; clickedEmails: number }>,
//     )

//     // Calculate open and click rates by category
//     const categoryStats = Object.entries(templateStatsByCategory).map(([category, stats]) => ({
//       category,
//       totalEmails: stats.totalEmails,
//       openRate: stats.totalEmails > 0 ? (stats.openedEmails / stats.totalEmails) * 100 : 0,
//       clickRate: stats.totalEmails > 0 ? (stats.clickedEmails / stats.totalEmails) * 100 : 0,
//     }))

//     return {
//       success: true,
//       statusCounts: statusCounts.reduce(
//         (acc, curr) => {
//           acc[curr.status] = curr._count
//           return acc
//         },
//         {} as Record<string, number>,
//       ),
//       dailySentCounts: dailySentCounts.map((day) => ({
//         date: day.sentAt,
//         count: day._count,
//       })),
//       categoryStats,
//     }
//   } catch (error) {
//     console.error("Failed to get email analytics", error)
//     return { success: false, error }
//   }
// }



// Create a new email template
export async function createEmailTemplate(formData: FormData) {
  await requireAdmin()

  const name = formData.get("name") as string
  const subject = formData.get("subject") as string
  const content = formData.get("content") as string
  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const isDefault = formData.get("isDefault") === "true"

  if (!name || !subject || !content) {
    return { success: false, error: "Missing required fields" }
  }

  try {
    // If this is set as default, unset any existing default for this category
    if (isDefault) {
      await client.emailTemplate.updateMany({
        where: {
          category,
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      })
    }

    const template = await client.emailTemplate.create({
      data: {
        name,
        subject,
        content,
        description,
        category,
        isDefault,
      },
    })

    revalidatePath("/admin/email/templates")
    return { success: true, template }
  } catch (error) {
    console.error("Failed to create email template", error)
    return { success: false, error }
  }
}

// Update an existing email template
export async function updateEmailTemplate(templateId: string, formData: FormData) {
  await requireAdmin()

  const name = formData.get("name") as string
  const subject = formData.get("subject") as string
  const content = formData.get("content") as string
  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const isDefault = formData.get("isDefault") === "true"

  if (!name || !subject || !content) {
    return { success: false, error: "Missing required fields" }
  }

  try {
    // If this is set as default, unset any existing default for this category
    if (isDefault) {
      await client.emailTemplate.updateMany({
        where: {
          category,
          isDefault: true,
          id: { not: templateId },
        },
        data: {
          isDefault: false,
        },
      })
    }

    const template = await client.emailTemplate.update({
      where: { id: templateId },
      data: {
        name,
        subject,
        content,
        description,
        category,
        isDefault,
      },
    })

    revalidatePath("/admin/email/templates")
    return { success: true, template }
  } catch (error) {
    console.error("Failed to update email template", error)
    return { success: false, error }
  }
}

// Delete an email template
export async function deleteEmailTemplate(templateId: string) {
  await requireAdmin()

  try {
    await client.emailTemplate.delete({
      where: { id: templateId },
    })

    revalidatePath("/admin/email/templates")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete email template", error)
    return { success: false, error }
  }
}

// Create a new email campaign
export async function createEmailCampaign(formData: FormData) {
  await requireAdmin()

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const templateId = formData.get("templateId") as string
  const userIds = (formData.get("userIds") as string).split(",")
  const scheduledFor = formData.get("scheduledFor") as string

  if (!name || !templateId || !userIds.length) {
    return { success: false, error: "Missing required fields" }
  }

  try {
    // Create the campaign
    const campaign = await client.emailCampaign.create({
      data: {
        name,
        description,
        templateId,
        status: scheduledFor ? "SCHEDULED" : "DRAFT",
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
      },
    })

    // Get the template
    const template = await client.emailTemplate.findUnique({
      where: { id: templateId },
    })

    if (!template) {
      return { success: false, error: "Template not found" }
    }

    // Create an email for each user
    await Promise.all(
      userIds.map(async (userId) => {
        await client.email.create({
          data: {
            subject: template.subject,
            content: template.content,
            recipientId: userId,
            templateId,
            campaignId: campaign.id,
            status: "SCHEDULED",
            scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
          },
        })
      }),
    )

    // If scheduled for now or in the past, send immediately
    if (scheduledFor && new Date(scheduledFor) <= new Date()) {
      await sendCampaign(campaign.id)
    }

    revalidatePath("/admin/email/campaigns")
    return { success: true, campaign }
  } catch (error) {
    console.error("Failed to create email campaign", error)
    return { success: false, error }
  }
}

// Send a test email
export async function sendTestEmail({
  to,
  subject,
  content,
}: {
  to: string
  subject: string
  content: string
}) {
  try {
    const result = await sendTestEmailService({
      to,
      subject,
      html: content,
    })

    return result
  } catch (error) {
    console.error("Error sending test email:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error sending test email",
    }
  }
}

// Send a campaign immediately
export async function sendCampaignNow(campaignId: string) {
  await requireAdmin()

  try {
    const result = await sendCampaign(campaignId)

    revalidatePath("/admin/email/campaigns")
    return result
  } catch (error) {
    console.error("Failed to send campaign", error)
    return { success: false, error }
  }
}

// Cancel a scheduled campaign
export async function cancelCampaign(campaignId: string) {
  await requireAdmin()

  try {
    await client.emailCampaign.update({
      where: { id: campaignId },
      data: {
        status: "CANCELLED",
      },
    })

    // Also update all associated emails
    await client.email.updateMany({
      where: {
        campaignId,
        status: "SCHEDULED",
      },
      data: {
        status: "FAILED",
      },
    })

    revalidatePath("/admin/email/campaigns")
    return { success: true }
  } catch (error) {
    console.error("Failed to cancel campaign", error)
    return { success: false, error }
  }
}

// Get email templates
export async function getEmailTemplates(category?: string) {
  await requireAdmin()

  try {
    const templates = await client.emailTemplate.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: "desc" },
    })

    return { success: true, templates }
  } catch (error) {
    console.error("Failed to get email templates", error)
    return { success: false, error }
  }
}

// Get email campaigns
export async function getEmailCampaigns() {
  await requireAdmin()

  try {
    const campaigns = await client.emailCampaign.findMany({
      include: {
        template: true,
        emails: {
          select: {
            id: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    // Add some stats to each campaign
    const campaignsWithStats = campaigns.map((campaign) => {
      const totalEmails = campaign.emails.length
      const sentEmails = campaign.emails.filter((e) => e.status === "SENT").length
      const openedEmails = campaign.emails.filter((e) => e.status === "OPENED").length
      const clickedEmails = campaign.emails.filter((e) => e.status === "CLICKED").length
      const failedEmails = campaign.emails.filter((e) => e.status === "FAILED").length

      return {
        ...campaign,
        stats: {
          totalEmails,
          sentEmails,
          openedEmails,
          clickedEmails,
          failedEmails,
          openRate: totalEmails > 0 ? (openedEmails / totalEmails) * 100 : 0,
          clickRate: totalEmails > 0 ? (clickedEmails / totalEmails) * 100 : 0,
        },
      }
    })

    return { success: true, campaigns: campaignsWithStats }
  } catch (error) {
    console.error("Failed to get email campaigns", error)
    return { success: false, error }
  }
}

// Get email analytics
export async function getEmailAnalytics() {
  await requireAdmin()

  try {
    // Get counts by status
    const statusCounts = await client.email.groupBy({
      by: ["status"],
      _count: true,
    })

    // Get counts by day for the last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const dailySentCounts = await client.email.groupBy({
      by: ["sentAt"],
      where: {
        sentAt: {
          gte: thirtyDaysAgo,
        },
        status: "SENT",
      },
      _count: true,
    })

    // Get open rates by template category
    const templateStats = await client.emailTemplate.findMany({
      include: {
        emails: {
          select: {
            status: true,
          },
        },
      },
    })

    const templateStatsByCategory = templateStats.reduce(
      (acc, template) => {
        const category = template.category || "uncategorized"

        if (!acc[category]) {
          acc[category] = {
            totalEmails: 0,
            openedEmails: 0,
            clickedEmails: 0,
          }
        }

        const totalEmails = template.emails.length
        const openedEmails = template.emails.filter((e) => e.status === "OPENED").length
        const clickedEmails = template.emails.filter((e) => e.status === "CLICKED").length

        acc[category].totalEmails += totalEmails
        acc[category].openedEmails += openedEmails
        acc[category].clickedEmails += clickedEmails

        return acc
      },
      {} as Record<string, { totalEmails: number; openedEmails: number; clickedEmails: number }>,
    )

    // Calculate open and click rates by category
    const categoryStats = Object.entries(templateStatsByCategory).map(([category, stats]) => ({
      category,
      totalEmails: stats.totalEmails,
      openRate: stats.totalEmails > 0 ? (stats.openedEmails / stats.totalEmails) * 100 : 0,
      clickRate: stats.totalEmails > 0 ? (stats.clickedEmails / stats.totalEmails) * 100 : 0,
    }))

    return {
      success: true,
      statusCounts: statusCounts.reduce(
        (acc, curr) => {
          acc[curr.status] = curr._count
          return acc
        },
        {} as Record<string, number>,
      ),
      dailySentCounts: dailySentCounts.map((day) => ({
        date: day.sentAt,
        count: day._count,
      })),
      categoryStats,
    }
  } catch (error) {
    console.error("Failed to get email analytics", error)
    return { success: false, error }
  }
}

