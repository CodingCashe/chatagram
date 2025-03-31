import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"
import { onCurrentUser } from "@/actions/user"

export async function GET() {
  try {
    const thisUser = await onCurrentUser()
    const userId = thisUser.id

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Get the user's UUID from the database
    const dbUser = await client.user.findUnique({
      where: { clerkId: userId },
      select: { id: true },
    })

    if (!dbUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Get the user's affiliate account
    const affiliate = await client.affiliateUser.findFirst({
      where: { userId: dbUser.id },
    })

    if (!affiliate) {
      return NextResponse.json({ success: false, message: "Affiliate account not found" }, { status: 404 })
    }

    // Generate links for different pages
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yourdomain.com"

    const links = [
      {
        name: "Homepage",
        url: `${baseUrl}/ref/${affiliate.referralCode}`,
        description: "Link to the homepage with your referral code",
      },
      {
        name: "Pricing",
        url: `${baseUrl}/pricing?ref=${affiliate.referralCode}`,
        description: "Link to the pricing page with your referral code",
      },
      {
        name: "Features",
        url: `${baseUrl}/features?ref=${affiliate.referralCode}`,
        description: "Link to the features page with your referral code",
      },
      {
        name: "Sign Up",
        url: `${baseUrl}/signup?ref=${affiliate.referralCode}`,
        description: "Direct link to the sign up page with your referral code",
      },
    ]

    // Get link performance
    const clickStats = await client.affiliateClick.groupBy({
      by: ["referrer"],
      where: {
        affiliateId: affiliate.id,
      },
      _count: {
        id: true,
      },
    })

    // Format the stats
    const linkStats = clickStats.map((stat) => ({
      referrer: stat.referrer || "Direct",
      clicks: stat._count.id,
    }))

    return NextResponse.json({
      success: true,
      referralCode: affiliate.referralCode,
      links,
      linkStats,
    })
  } catch (error) {
    console.error("Error generating affiliate links:", error)
    return NextResponse.json({ success: false, message: "Failed to generate affiliate links" }, { status: 500 })
  }
}

