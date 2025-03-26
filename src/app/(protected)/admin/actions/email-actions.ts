"use server"

import { revalidatePath } from "next/cache"
import { onCurrentUser } from "@/actions/user"
import { client } from "@/lib/prisma"
import { sendEmail, sendCampaign } from "@/lib/email-service"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

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
export async function sendTestEmail(formData: FormData) {
  await requireAdmin()

  const to = formData.get("to") as string
  const subject = formData.get("subject") as string
  const content = formData.get("content") as string

  if (!to || !subject || !content) {
    return { success: false, error: "Missing required fields" }
  }

  try {
    const result = await sendEmail({
      to,
      subject,
      html: content,
    })

    return result
  } catch (error) {
    console.error("Failed to send test email", error)
    return { success: false, error }
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

