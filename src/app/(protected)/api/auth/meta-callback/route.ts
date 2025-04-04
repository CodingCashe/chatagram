// import { type NextRequest, NextResponse } from "next/server"
// import { currentUser } from "@clerk/nextjs/server"
// import { client } from "@/lib/prisma"

// export async function POST(request: NextRequest) {
//   try {
//     // Get the current user with Clerk
//     const user = await currentUser()

//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     // Find user in database
//     const dbUser = await client.user.findUnique({
//       where: { clerkId: user.id },
//       select: { id: true },
//     })

//     if (!dbUser) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 })
//     }

//     const { code } = await request.json()

//     if (!code) {
//       return NextResponse.json({ error: "Missing code parameter" }, { status: 400 })
//     }

//     // Exchange the code for an access token
//     const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/meta-callback`
//     const tokenResponse = await fetch("https://graph.facebook.com/v22.0/oauth/access_token", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         client_id: process.env.META_APP_ID,
//         client_secret: process.env.META_APP_SECRET,
//         redirect_uri: redirectUri,
//         code,
//       }),
//     })

//     const tokenData = await tokenResponse.json()

//     if (!tokenResponse.ok) {
//       console.error("Meta token exchange error:", tokenData)
//       return NextResponse.json(
//         { error: tokenData.error?.message || "Failed to exchange code for token" },
//         { status: 400 },
//       )
//     }

//     // Return the access token to the client
//     return NextResponse.json({
//       accessToken: tokenData.access_token,
//       expiresIn: tokenData.expires_in,
//       tokenType: tokenData.token_type,
//     })
//   } catch (error) {
//     console.error("Error in Meta callback:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }

// export async function GET(request: NextRequest) {
//   // Handle the redirect from Meta OAuth
//   const searchParams = request.nextUrl.searchParams
//   const code = searchParams.get("code")

//   if (!code) {
//     return NextResponse.redirect(new URL("/callback/whatsapp?error=missing_code", request.url))
//   }

//   // Redirect back to the account setup page with the code
//   return NextResponse.redirect(new URL(`/callback/whatsapp?code=${code}`, request.url))
// }

// import { type NextRequest, NextResponse } from "next/server"
// import { currentUser } from "@clerk/nextjs/server"
// import { client } from "@/lib/prisma"

// export async function POST(request: NextRequest) {
//   try {
//     // Get the current user with Clerk
//     const user = await currentUser()

//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     // Find user in database
//     const dbUser = await client.user.findUnique({
//       where: { clerkId: user.id },
//       select: { id: true },
//     })

//     if (!dbUser) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 })
//     }

//     const { code, redirectUri } = await request.json()

//     if (!code) {
//       return NextResponse.json({ error: "Missing code parameter" }, { status: 400 })
//     }

//     // Use the exact same redirect URI that was used in the initial request
//     // This is critical - it must match exactly what was used when getting the code
//     console.log("Using redirect URI:", redirectUri)

//     const tokenResponse = await fetch("https://graph.facebook.com/v22.0/oauth/access_token", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         client_id: process.env.META_APP_ID,
//         client_secret: process.env.META_APP_SECRET,
//         redirect_uri: redirectUri,
//         code,
//       }),
//     })

//     const tokenData = await tokenResponse.json()

//     if (!tokenResponse.ok) {
//       console.error("Meta token exchange error:", tokenData)
//       return NextResponse.json(
//         { error: tokenData.error?.message || "Failed to exchange code for token" },
//         { status: 400 },
//       )
//     }

//     // Return the access token to the client
//     return NextResponse.json({
//       accessToken: tokenData.access_token,
//       expiresIn: tokenData.expires_in,
//       tokenType: tokenData.token_type,
//     })
//   } catch (error) {
//     console.error("Error in Meta callback:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }

// export async function GET(request: NextRequest) {
//   // Handle the redirect from Meta OAuth
//   const searchParams = request.nextUrl.searchParams
//   const code = searchParams.get("code")

//   if (!code) {
//     // Redirect to account setup with error
//     return NextResponse.redirect(new URL("/account-setup?error=missing_code", request.url))
//   }

//   // Redirect to the correct callback page with the code
//   return NextResponse.redirect(new URL(`/callback/whatsapp?code=${code}`, request.url))
// }

import { type NextRequest, NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import { client } from "@/lib/prisma"

// IMPORTANT: This must match exactly what's in the frontend
const EXACT_REDIRECT_URI = "https://yazil.vercel.app/callback/whatsapp"

export async function POST(request: NextRequest) {
  try {
    // Get the current user with Clerk
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Find user in database
    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
      select: { id: true },
    })

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { code, redirectUri } = await request.json()

    if (!code) {
      return NextResponse.json({ error: "Missing code parameter" }, { status: 400 })
    }

    // Use the exact redirect URI - either from the constant or the one passed in
    // This is critical - it must match exactly what was used when getting the code
    const finalRedirectUri = redirectUri || EXACT_REDIRECT_URI
    console.log("Using redirect URI for token exchange:", finalRedirectUri)

    const tokenResponse = await fetch("https://graph.facebook.com/v17.0/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.META_APP_ID,
        client_secret: process.env.META_APP_SECRET,
        redirect_uri: finalRedirectUri,
        code,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenResponse.ok) {
      console.error("Meta token exchange error:", tokenData)
      return NextResponse.json(
        { error: tokenData.error?.message || "Failed to exchange code for token" },
        { status: 400 },
      )
    }

    // Return the access token to the client
    return NextResponse.json({
      accessToken: tokenData.access_token,
      expiresIn: tokenData.expires_in,
      tokenType: tokenData.token_type,
    })
  } catch (error) {
    console.error("Error in Meta callback:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  // Handle the redirect from Meta OAuth
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")

  if (!code) {
    // Redirect to account setup with error
    return NextResponse.redirect(new URL("/account-setup?error=missing_code", request.url))
  }

  // Redirect to the correct callback page with the code
  return NextResponse.redirect(new URL(`/callback/whatsapp?code=${code}`, request.url))
}

