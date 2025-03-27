// import { type NextRequest, NextResponse } from "next/server"
// import { client } from "@/lib/prisma"

// export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
//   const emailId = params.id

//   try {
//     // Record the open event
//     await client.email.update({
//       where: { id: emailId },
//       data: {
//         openedAt: new Date(),
//         openCount: {
//           increment: 1,
//         },
//       },
//     })

//     // Return a 1x1 transparent pixel
//     const pixel = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64")

//     return new NextResponse(pixel, {
//       headers: {
//         "Content-Type": "image/gif",
//         "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
//         Pragma: "no-cache",
//         Expires: "0",
//       },
//     })
//   } catch (error) {
//     console.error("Error tracking email open:", error)

//     // Still return a pixel to avoid breaking the email
//     const pixel = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64")

//     return new NextResponse(pixel, {
//       headers: {
//         "Content-Type": "image/gif",
//         "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
//       },
//     })
//   }
// }

import { type NextRequest, NextResponse } from "next/server"
import { client } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const emailId = params.id

  try {
    // Record the open event
    await client.email.update({
      where: { id: emailId },
      data: {
        openedAt: new Date(),
        // Update the status to OPENED if it's not already CLICKED
        status: {
          set: "OPENED",
        },
      },
    })

    // Return a 1x1 transparent pixel
    const pixel = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64")

    return new NextResponse(pixel, {
      headers: {
        "Content-Type": "image/gif",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("Error tracking email open:", error)

    // Still return a pixel to avoid breaking the email
    const pixel = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64")

    return new NextResponse(pixel, {
      headers: {
        "Content-Type": "image/gif",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    })
  }
}

