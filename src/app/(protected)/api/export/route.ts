// import { type NextRequest, NextResponse } from "next/server"
// import { onCurrentUser } from "@/actions/user"
// import { client } from "@/lib/prisma"
// import * as XLSX from "xlsx"

// export async function GET(request: NextRequest) {
//   const user = await onCurrentUser()

//   if (!user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   const { searchParams } = new URL(request.url)
//   const type = searchParams.get("type") || "influencers"
//   const format = searchParams.get("format") || "xlsx"
//   const campaignId = searchParams.get("campaignId")
//   const listId = searchParams.get("listId")

//   try {
//     let data: Array<Record<string, any>> = []
//     if (type === "influencers") {
//       // Get influencers, optionally filtered by list
//       const where = { userId: user.id }

//       if (listId) {
//         const influencerIds = await client.influencerListInfluencer.findMany({
//           where: { listId },
//           select: { influencerId: true },
//         })

//         where["id"] = { in: influencerIds.map((i) => i.influencerId) }
//       }

//       data = await client.influencer.findMany({
//         where,
//         select: {
//           name: true,
//           username: true,
//           bio: true,
//           followers: true,
//           following: true,
//           postsCount: true,
//           engagementRate: true,
//           verified: true,
//           location: true,
//           niche: true,
//           email: true,
//           website: true,
//           notes: true,
//           tags: true,
//           source: true,
//           status: true,
//           createdAt: true,
//           updatedAt: true,
//         },
//       })
//     } else if (type === "campaigns") {
//       // Get campaigns, optionally a specific one
//       const where = { userId: user.id }

//       if (campaignId) {
//         where["id"] = campaignId
//       }

        

//       data = await client.campaign.findMany({
//         where,
//         select: {
//           name: true,
//           description: true,
//           startDate: true,
//           endDate: true,
//           budget: true,
//           status: true,
//           createdAt: true,
//           updatedAt: true,
//         },
//       })
//     } else if (type === "campaign_influencers" && campaignId) {
//       // Get influencers for a specific campaign
//       const campaignInfluencers = await client.campaignInfluencer.findMany({
//         where: {
//           campaignId,
//           campaign: { userId: user.id },
//         },
//         include: {
//           influencer: true,
//         },
//       })

//       data = campaignInfluencers.map((ci) => ({
//         name: ci.influencer.name,
//         username: ci.influencer.username,
//         followers: ci.influencer.followers,
//         engagementRate: ci.influencer.engagementRate,
//         status: ci.status,
//         rate: ci.rate,
//         deliverables: ci.deliverables,
//         notes: ci.notes,
//       }))
//     } else if (type === "analytics" && campaignId) {
//       // Get analytics for a specific campaign
//       data = await client.campaignAnalytics.findMany({
//         where: {
//           campaignId,
//           campaign: { userId: user.id },
//         },
//         select: {
//           date: true,
//           reach: true,
//           impressions: true,
//           engagement: true,
//           clicks: true,
//           conversions: true,
//           roi: true,
//           costPerEngagement: true,
//           costPerClick: true,
//           costPerConversion: true,
//         },
//       })
//     }

//     // Generate file
//     if (format === "xlsx") {
//       const worksheet = XLSX.utils.json_to_sheet(data)
//       const workbook = XLSX.utils.book_new()
//       XLSX.utils.book_append_sheet(workbook, worksheet, "Data")

//       const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

//       return new NextResponse(buffer, {
//         headers: {
//           "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//           "Content-Disposition": `attachment; filename="${type}_export.xlsx"`,
//         },
//       })
//     } else if (format === "csv") {
//       const worksheet = XLSX.utils.json_to_sheet(data)
//       const csv = XLSX.utils.sheet_to_csv(worksheet)

//       return new NextResponse(csv, {
//         headers: {
//           "Content-Type": "text/csv",
//           "Content-Disposition": `attachment; filename="${type}_export.csv"`,
//         },
//       })
//     } else if (format === "json") {
//       return NextResponse.json(data, {
//         headers: {
//           "Content-Disposition": `attachment; filename="${type}_export.json"`,
//         },
//       })
//     }

//     return NextResponse.json({ error: "Unsupported format" }, { status: 400 })
//   } catch (error) {
//     console.error("Export error:", error)
//     return NextResponse.json({ error: "Failed to export data" }, { status: 500 })
//   }
// }

import { type NextRequest, NextResponse } from "next/server"
import { onCurrentUser } from "@/actions/user"
import { client } from "@/lib/prisma"
import * as XLSX from "xlsx"

export async function GET(request: NextRequest) {
  const user = await onCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") || "influencers"
  const format = searchParams.get("format") || "xlsx"
  const campaignId = searchParams.get("campaignId")
  const listId = searchParams.get("listId")

  try {
    // Initialize data as an empty array with explicit typing
    const data: Record<string, any>[] = []

    if (type === "influencers") {
      // Get influencers, optionally filtered by list
      const whereClause: Record<string, any> = { userId: user.id }

      if (listId) {
        const influencerIds = await client.influencerListInfluencer.findMany({
          where: { listId },
          select: { influencerId: true },
        })

        if (influencerIds.length > 0) {
          whereClause.id = { in: influencerIds.map((i) => i.influencerId) }
        }
      }

      const influencers = await client.influencer.findMany({
        where: whereClause,
        select: {
          name: true,
          username: true,
          bio: true,
          followers: true,
          following: true,
          postsCount: true,
          engagementRate: true,
          verified: true,
          location: true,
          niche: true,
          email: true,
          website: true,
          notes: true,
          tags: true,
          source: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      })

      // Add influencers to data array
      influencers.forEach((influencer) => {
        data.push({
          ...influencer,
          tags: influencer.tags.join(", "),
          createdAt: influencer.createdAt.toISOString(),
          updatedAt: influencer.updatedAt.toISOString(),
        })
      })
    } else if (type === "campaigns") {
      // Get campaigns, optionally a specific one
      const whereClause: Record<string, any> = { userId: user.id }

      if (campaignId) {
        whereClause.id = campaignId
      }

      const campaigns = await client.campaign.findMany({
        where: whereClause,
        select: {
          name: true,
          description: true,
          startDate: true,
          endDate: true,
          budget: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      })

      // Add campaigns to data array
      campaigns.forEach((campaign) => {
        data.push({
          ...campaign,
          startDate: campaign.startDate ? campaign.startDate.toISOString() : null,
          endDate: campaign.endDate ? campaign.endDate.toISOString() : null,
          createdAt: campaign.createdAt.toISOString(),
          updatedAt: campaign.updatedAt.toISOString(),
        })
      })
    } else if (type === "campaign_influencers" && campaignId) {
      // Get influencers for a specific campaign
      const campaignInfluencers = await client.campaignInfluencer.findMany({
        where: {
          campaignId,
          campaign: { userId: user.id },
        },
        include: {
          influencer: true,
        },
      })

      // Add campaign influencers to data array
      campaignInfluencers.forEach((ci) => {
        data.push({
          name: ci.influencer.name,
          username: ci.influencer.username,
          followers: ci.influencer.followers,
          engagementRate: ci.influencer.engagementRate,
          status: ci.status || "N/A",
          rate: ci.rate || 0,
          deliverables: ci.deliverables ? JSON.stringify(ci.deliverables) : "N/A",
          notes: ci.notes || "N/A",
          contentUrls: ci.contentUrls ? ci.contentUrls.join(", ") : "N/A",
        })
      })
    } else if (type === "analytics" && campaignId) {
      // Get analytics for a specific campaign
      const analytics = await client.campaignAnalytics.findMany({
        where: {
          campaignId,
          campaign: { userId: user.id },
        },
        select: {
          date: true,
          reach: true,
          impressions: true,
          engagement: true,
          clicks: true,
          conversions: true,
          roi: true,
          costPerEngagement: true,
          costPerClick: true,
          costPerConversion: true,
        },
      })

      // Add analytics to data array
      analytics.forEach((item) => {
        data.push({
          ...item,
          date: item.date.toISOString(),
          reach: item.reach || 0,
          impressions: item.impressions || 0,
          engagement: item.engagement || 0,
          clicks: item.clicks || 0,
          conversions: item.conversions || 0,
          roi: item.roi || 0,
          costPerEngagement: item.costPerEngagement || 0,
          costPerClick: item.costPerClick || 0,
          costPerConversion: item.costPerConversion || 0,
        })
      })
    }

    // Generate file based on format
    if (format === "xlsx") {
      const worksheet = XLSX.utils.json_to_sheet(data)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data")

      const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="${type}_export.xlsx"`,
        },
      })
    } else if (format === "csv") {
      const worksheet = XLSX.utils.json_to_sheet(data)
      const csv = XLSX.utils.sheet_to_csv(worksheet)

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${type}_export.csv"`,
        },
      })
    } else if (format === "json") {
      return NextResponse.json(data, {
        headers: {
          "Content-Disposition": `attachment; filename="${type}_export.json"`,
        },
      })
    }

    return NextResponse.json({ error: "Unsupported format" }, { status: 400 })
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 })
  }
}

