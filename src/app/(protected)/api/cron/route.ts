// import { NextResponse } from "next/server"
// import { client } from "@/lib/prisma"

// export const runtime = "nodejs"

// export async function GET(request: Request) {
//   try {
//     // Find all scheduled posts that are due
//     const scheduledPosts = await client.scheduledContent.findMany({
//       where: {
//         status: "scheduled",
//         scheduledDate: {
//           lte: new Date(),
//         },
//       },
//       include: {
//         User: {
//           include: {
//             integrations: {
//               where: {
//                 name: "INSTAGRAM",
//               },
//             },
//           },
//         },
//       },
//     })

//     // Process each post
//     for (const post of scheduledPosts) {
//       try {
//         // Ensure proper URL formation with protocol
//         const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_APP_URL

//         if (!baseUrl) {
//           throw new Error("No base URL configured")
//         }

//         const response = await fetch(`${baseUrl}/api/post-to-instagram`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId: post.User?.clerkId,
//             caption: post.caption,
//             mediaUrls: post.mediaUrl.split(","),
//             mediaType: post.mediaType,
//           }),
//         })

//         if (!response.ok) {
//           throw new Error(`Failed to post to Instagram: ${response.statusText}`)
//         }

//         // Update post status
//         await client.scheduledContent.update({
//           where: { id: post.id },
//           data: {
//             status: "published",
//             publishedDate: new Date(),
//           },
//         })
//       } catch (error) {
//         console.error(`Failed to process post ${post.id}:`, error)

//         // Update post status to failed
//         await client.scheduledContent.update({
//           where: { id: post.id },
//           data: {
//             status: "failed",
//           },
//         })
//       }
//     }

//     return NextResponse.json({
//       success: true,
//       processed: scheduledPosts.length,
//     })
//   } catch (error) {
//     console.error("Cron job error:", error)
//     return NextResponse.json({ error: "Failed to process scheduled posts" }, { status: 500 })
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

