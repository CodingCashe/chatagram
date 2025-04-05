import { type NextRequest, NextResponse } from "next/server"
import { onCurrentUser } from "@/actions/user"
import { client } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const user = await onCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const referenceId = searchParams.get("referenceId")
  const contentStyleWeight = Number.parseInt(searchParams.get("contentStyleWeight") || "80")
  const audienceTypeWeight = Number.parseInt(searchParams.get("audienceTypeWeight") || "70")
  const engagementWeight = Number.parseInt(searchParams.get("engagementWeight") || "50")

  if (!referenceId) {
    return NextResponse.json({ error: "Reference influencer ID is required" }, { status: 400 })
  }

  try {
    // Get the reference influencer
    const referenceInfluencer = await client.influencer.findFirst({
      where: {
        id: referenceId,
        userId: user.id,
      },
      include: {
        metrics: {
          orderBy: {
            date: "desc",
          },
          take: 1,
        },
      },
    })

    if (!referenceInfluencer) {
      return NextResponse.json({ error: "Reference influencer not found" }, { status: 404 })
    }

    // Find similar influencers based on niche, engagement rate range, and follower count range
    const engagementRateMin = Math.max(0, referenceInfluencer.engagementRate * 0.7)
    const engagementRateMax = referenceInfluencer.engagementRate * 1.3

    const followersMin = referenceInfluencer.followers * 0.5
    const followersMax = referenceInfluencer.followers * 2

    const influencers = await client.influencer.findMany({
      where: {
        userId: user.id,
        id: { not: referenceId }, // Exclude the reference influencer
        niche: referenceInfluencer.niche,
        engagementRate: {
          gte: engagementRateMin,
          lte: engagementRateMax,
        },
        followers: {
          gte: followersMin,
          lte: followersMax,
        },
      },
      take: 10,
      include: {
        metrics: {
          orderBy: {
            date: "desc",
          },
          take: 1,
        },
      },
    })

    // Calculate similarity scores
    const influencersWithScores = influencers.map((influencer) => {
      // Content style similarity (based on niche match)
      const contentStyleScore = influencer.niche === referenceInfluencer.niche ? 100 : 50

      // Audience type similarity (simplified)
      const audienceTypeScore = 70 // Placeholder - would use real audience data

      // Engagement similarity
      const engagementDiff = Math.abs(influencer.engagementRate - referenceInfluencer.engagementRate)
      const maxEngagementDiff = referenceInfluencer.engagementRate * 0.3
      const engagementScore = 100 - (engagementDiff / maxEngagementDiff) * 100

      // Weighted total score
      const totalScore =
        (contentStyleScore * contentStyleWeight +
          audienceTypeScore * audienceTypeWeight +
          engagementScore * engagementWeight) /
        (contentStyleWeight + audienceTypeWeight + engagementWeight)

      return {
        ...influencer,
        similarityScore: Math.round(totalScore),
      }
    })

    // Sort by similarity score
    influencersWithScores.sort((a, b) => b.similarityScore - a.similarityScore)

    return NextResponse.json({
      influencers: influencersWithScores,
      pagination: {
        total: influencersWithScores.length,
        pages: 1,
        page: 1,
        limit: 10,
      },
    })
  } catch (error) {
    console.error("Error finding similar influencers:", error)
    return NextResponse.json({ error: "Failed to find similar influencers" }, { status: 500 })
  }
}

