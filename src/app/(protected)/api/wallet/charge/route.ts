// import { type NextRequest, NextResponse } from "next/server"
// import {client} from "@/lib/prisma" // Your database connection
// import { nanoid } from "nanoid"
// import { onCurrentUser } from "@/actions/user"

// export async function POST(req: NextRequest) {
//   try {
//     // Get the authenticated user
//     const user = await onCurrentUser()

//     // If no authenticated user, return unauthorized
//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const body = await req.json()
//     const { amount, currency = "USD", description } = body

//     if (!amount) {
//       return NextResponse.json({ error: "Amount is required" }, { status: 400 })
//     }

//     // Start a database transaction to ensure atomicity
//     const result = await client.$transaction(async (tx) => {
//       // Get the user's wallet
//       const wallet = await tx.wallet.findUnique({
//         where: { userId:user.id },
//       })

//       if (!wallet) {
//         throw new Error("Wallet not found")
//       }

//       // Check if the wallet has sufficient balance
//       if (wallet.balance < amount) {
//         throw new Error(`Insufficient wallet balance. Available: ${wallet.balance} ${wallet.currency}`)
//       }

//       // Update the wallet balance
//       const updatedWallet = await tx.wallet.update({
//         where: { id: wallet.id },
//         data: {
//           balance: wallet.balance - amount,
//         },
//       })

//       // Create a transaction record
//       const transaction = await tx.walletTransaction.create({
//         data: {
//           walletId: wallet.id,
//           amount: -amount, // Negative amount for debit
//           currency,
//           type: "payment",
//           description: description || "Payment",
//           reference: `TXN-${nanoid(10)}`,
//         },
//       })

//       return {
//         transactionId: transaction.id,
//         userId:user.id,
//         amount,
//         new_balance: updatedWallet.balance,
//         currency: wallet.currency,
//         success: true,
//       }
//     })

//     return NextResponse.json(result)
//   } catch (error) {
//     console.error("Error processing wallet payment:", error)

//     const errorMessage = error instanceof Error ? error.message : "Error processing wallet payment"

//     return NextResponse.json({ error: errorMessage }, { status: 400 })
//   }
// }

// // Endpoint to get wallet balance
// export async function GET(req: NextRequest) {
//   try {
//     // Get the authenticated user
//     const user = onCurrentUser()

//     // If no authenticated user, return unauthorized
//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     // Get the user's wallet
//     const wallet = await client.wallet.findUnique({
//       where: { userId:(await user).id },
//       include: {
//         transactions: {
//           orderBy: {
//             createdAt: "desc",
//           },
//           take: 5,
//         },
//       },
//     })

//     if (!wallet) {
//       return NextResponse.json({ error: "Wallet not found" }, { status: 404 })
//     }

//     return NextResponse.json({
//       balance: wallet.balance,
//       currency: wallet.currency,
//       transactions: wallet.transactions.map((t) => ({
//         id: t.id,
//         amount: t.amount,
//         currency: t.currency,
//         type: t.type,
//         description: t.description,
//         created_at: t.createdAt,
//       })),
//     })
//   } catch (error) {
//     console.error("Error getting wallet balance:", error)

//     return NextResponse.json({ error: "Error getting wallet balance" }, { status: 500 })
//   }
// }

import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"

export const runtime = "nodejs"

function getBaseUrl(): string {
  // For production deployments
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.startsWith("http")
      ? process.env.NEXT_PUBLIC_APP_URL
      : `https://${process.env.NEXT_PUBLIC_APP_URL}`
  }

  // For preview deployments
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // For local development
  return "http://localhost:3000"
}

function validateAndFormatUrl(baseUrl: string, path: string): string {
  try {
    // Remove any trailing slashes from base URL
    const cleanBaseUrl = baseUrl.replace(/\/+$/, "")
    // Remove any leading slashes from path
    const cleanPath = path.replace(/^\/+/, "")
    // Combine and validate the full URL
    const fullUrl = `${cleanBaseUrl}/${cleanPath}`

    // This will throw if the URL is invalid
    new URL(fullUrl)

    return fullUrl
  } catch (error) {
    throw new Error(`Invalid URL formation: ${baseUrl}/${path}`)
  }
}

export async function GET(request: Request) {
  try {
    // Find all scheduled posts that are due
    const scheduledPosts = await client.scheduledContent.findMany({
      where: {
        status: "scheduled",
        scheduledDate: {
          lte: new Date(),
        },
      },
      include: {
        User: {
          include: {
            integrations: {
              where: {
                name: "INSTAGRAM",
              },
            },
          },
        },
      },
    })

    const baseUrl = getBaseUrl()
    console.log("Using base URL:", baseUrl) // Debug log

    // Process each post
    const results = await Promise.all(
      scheduledPosts.map(async (post) => {
        try {
          const apiUrl = validateAndFormatUrl(baseUrl, "api/post-to-instagram")
          console.log("Making request to:", apiUrl) // Debug log

          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: post.User?.clerkId,
              caption: post.caption,
              mediaUrls: post.mediaUrl.split(","),
              mediaType: post.mediaType,
            }),
          })

          if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Failed to post to Instagram: ${response.status} ${response.statusText} - ${errorText}`)
          }

          // Update post status
          await client.scheduledContent.update({
            where: { id: post.id },
            data: {
              status: "published",
              publishedDate: new Date(),
            },
          })

          return {
            postId: post.id,
            status: "success",
          }
        } catch (error) {
          console.error(`Failed to process post ${post.id}:`, error)

          // Update post status to failed
          await client.scheduledContent.update({
            where: { id: post.id },
            data: {
              status: "failed",
              // errorMessage: error instanceof Error ? error.message : "Unknown error occurred",
            },
          })

          return {
            postId: post.id,
            status: "failed",
            error: error instanceof Error ? error.message : "Unknown error occurred",
          }
        }
      }),
    )

    const successCount = results.filter((r) => r.status === "success").length
    const failedCount = results.filter((r) => r.status === "failed").length

    return NextResponse.json({
      success: true,
      processed: scheduledPosts.length,
      results: {
        success: successCount,
        failed: failedCount,
        details: results,
      },
    })
  } catch (error) {
    console.error("Cron job error:", error)
    return NextResponse.json(
      {
        error: "Failed to process scheduled posts",
        details: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}

