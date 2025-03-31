import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"
import { onCurrentUser } from "@/actions/user"

export async function GET(req: Request) {
  try {
    const thisUser = await onCurrentUser()
    const userId = thisUser.id

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Check if user is an admin
    const user = await client.user.findUnique({
      where: { clerkId: userId },
      select: { isAdmin: true },
    })

    if (!user?.isAdmin) {
      return NextResponse.json({ success: false, message: "Forbidden: Admin access required" }, { status: 403 })
    }

    // Get query parameters
    const url = new URL(req.url)
    const status = url.searchParams.get("status") || undefined
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const limit = Number.parseInt(url.searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build the where clause
    const where: any = {}
    if (status) {
      where.status = status
    }

    // Get payouts with pagination
    const [payouts, totalCount] = await Promise.all([
      client.affiliatePayout.findMany({
        where,
        include: {
          affiliate: {
            select: {
              id: true,
              name: true,
              email: true,
              referralCode: true,
            },
          },
          program: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      client.affiliatePayout.count({ where }),
    ])

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit)
    const hasMore = page < totalPages

    return NextResponse.json({
      success: true,
      payouts,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasMore,
      },
    })
  } catch (error) {
    console.error("Error fetching affiliate payouts:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch affiliate payouts" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const thisUser = await onCurrentUser()
    const userId = thisUser.id

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Check if user is an admin
    const user = await client.user.findUnique({
      where: { clerkId: userId },
      select: { isAdmin: true },
    })

    if (!user?.isAdmin) {
      return NextResponse.json({ success: false, message: "Forbidden: Admin access required" }, { status: 403 })
    }

    const body = await req.json()
    const { affiliateId, amount, paymentMethod, notes } = body

    if (!affiliateId || !amount || !paymentMethod) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Get the affiliate
    const affiliate = await client.affiliateUser.findUnique({
      where: { id: affiliateId },
      include: {
        program: true,
      },
    })

    if (!affiliate) {
      return NextResponse.json({ success: false, message: "Affiliate not found" }, { status: 404 })
    }

    // Create the payout
    const payout = await client.affiliatePayout.create({
      data: {
        amount,
        paymentMethod,
        notes,
        affiliate: { connect: { id: affiliateId } },
        program: { connect: { id: affiliate.programId } },
      },
    })

    return NextResponse.json({
      success: true,
      payout,
    })
  } catch (error) {
    console.error("Error creating affiliate payout:", error)
    return NextResponse.json({ success: false, message: "Failed to create affiliate payout" }, { status: 500 })
  }
}

