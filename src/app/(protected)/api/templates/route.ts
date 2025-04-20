import { type NextRequest, NextResponse } from "next/server"
import { onCurrentUser } from "@/actions/user"
import * as XLSX from "xlsx"

export async function GET(request: NextRequest) {
  const user = await onCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") || "basic"

  try {
    let templateData: Array<Record<string, any>> = []

    if (type === "basic") {
      templateData = [
        {
          Name: "Example Influencer",
          Username: "@example_influencer",
          Followers: 10000,
          "Engagement Rate": 3.5,
          Niche: "Fashion",
          Location: "New York, USA",
          Email: "contact@example.com",
        },
      ]
    } else if (type === "advanced") {
      templateData = [
        {
          Name: "Example Influencer",
          Username: "@example_influencer",
          "Instagram Handle": "@example_influencer",
          "TikTok Handle": "@example_influencer",
          "YouTube Channel": "Example Influencer",
          Bio: "Fashion and lifestyle content creator based in NYC",
          Followers: 10000,
          Following: 1200,
          "Posts Count": 350,
          "Engagement Rate": 3.5,
          "Average Likes": 1500,
          "Average Comments": 120,
          Verified: true,
          Location: "New York, USA",
          Niche: "Fashion",
          Email: "contact@example.com",
          Website: "https://example.com",
          "Contact Info": "Phone: +1234567890",
          Notes: "Previously worked with us on summer campaign",
          Tags: "fashion,beauty,lifestyle",
          "Brand Fit": 85,
          "Audience Match": 78,
          "Estimated Cost": 500,
          "Audience Demographics": "70% Female, 25-34 age group",
          Authenticity: 92,
          "Growth Rate": 5.2,
        },
      ]
    } else if (type === "campaign") {
      templateData = [
        {
          Name: "Example Influencer",
          Username: "@example_influencer",
          Followers: 10000,
          "Engagement Rate": 3.5,
          "Campaign Rate": 500,
          Deliverables: "1 feed post, 3 stories",
          "Past Performance": "4.2% engagement on previous campaign",
          Notes: "Prefers early outreach",
        },
      ]
    }

    // Generate Excel file
    const worksheet = XLSX.utils.json_to_sheet(templateData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template")

    // Add column width specifications
    const colWidths = Object.keys(templateData[0]).map((key) => ({ wch: Math.max(key.length, 15) }))
    worksheet["!cols"] = colWidths

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${type}_template.xlsx"`,
      },
    })
  } catch (error) {
    console.error("Template generation error:", error)
    return NextResponse.json({ error: "Failed to generate template" }, { status: 500 })
  }
}






