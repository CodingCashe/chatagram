// import { NextResponse } from "next/server"
// import {client} from "@/lib/client"
// import { auth } from "@clerk/nextjs/server"
// import { onCurrentUser } from "@/actions/user"

// export async function GET(request: Request) {
//   try {
//     const thisUser = await onCurrentUser()
//     const  userId  = thisUser.id

//     if (!userId) {
//       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
//     }

//     // Check if user is an admin
//     const user = await client.user.findUnique({
//       where: { clerkId: userId },
//       select: { isAdmin: true },
//     })

//     if (!user?.isAdmin) {
//       return NextResponse.json({ success: false, message: "Forbidden: Admin access required" }, { status: 403 })
//     }

//     // Get query parameters
//     const url = new URL(request.url)
//     const status = url.searchParams.get("status")
//     const programId = url.searchParams.get("programId")

//     // Build the where clause
//     const where: any = {}

//     if (status) {
//       where.status = status
//     }

//     if (programId) {
//       where.programId = programId
//     }

//     // Fetch affiliate users
//     const affiliateUsers = await client.affiliateUser.findMany({
//       where,
//       include: {
//         user: {
//           select: {
//             email: true,
//             firstname: true,
//             lastname: true,
//           },
//         },
//         program: {
//           select: {
//             name: true,
//           },
//         },
//         _count: {
//           select: {
//             referrals: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     })

//     return NextResponse.json({
//       success: true,
//       affiliateUsers,
//     })
//   } catch (error) {
//     console.error("Error fetching affiliate users:", error)
//     return NextResponse.json({ success: false, message: "Failed to fetch affiliate users" }, { status: 500 })
//   }
// }

import { NextResponse } from "next/server"
import {client} from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { onCurrentUser } from "@/actions/user"

export async function GET(request: Request) {
  try {
    const thisUser = await onCurrentUser()
    const  userId  = thisUser.id

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
    const url = new URL(request.url)
    const status = url.searchParams.get("status")
    const programId = url.searchParams.get("program")

    // Build the where clause
    const where: any = {}

    if (status) {
      where.status = status
    }

    if (programId) {
      where.programId = programId
    }

    // Fetch affiliate users
    const affiliateUsers = await client.affiliateUser.findMany({
      where,
      include: {
        user: {
          select: {
            email: true,
            firstname: true,
            lastname: true,
          },
        },
        program: {
          select: {
            name: true,
            commissionRate: true,
          },
        },
        _count: {
          select: {
            referrals: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({
      success: true,
      affiliates: affiliateUsers, // Always return an array, even if empty
    })
  } catch (error) {
    console.error("Error fetching affiliate users:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch affiliate users",
        affiliates: [], // Return empty array on error
      },
      { status: 500 },
    )
  }
}

