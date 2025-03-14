// import { type NextRequest, NextResponse } from "next/server"
// import { db } from "@/lib/db" // Your database connection
// import { auth } from "@clerk/nextjs"

// export async function POST(req: NextRequest) {
//   try {
//     // Get the authenticated user
//     const { userId } = auth()

//     // If no authenticated user, return unauthorized
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const body = await req.json()
//     const { code, amount } = body

//     if (!code || !amount) {
//       return NextResponse.json({ error: "Gift card code and amount are required" }, { status: 400 })
//     }

//     // Start a database transaction to ensure atomicity
//     const result = await db.$transaction(async (tx) => {
//       // Find the gift card in the database
//       const giftCard = await tx.giftCard.findUnique({
//         where: { code },
//       })

//       if (!giftCard) {
//         throw new Error("Gift card not found")
//       }

//       if (giftCard.isRedeemed) {
//         throw new Error("Gift card has already been redeemed")
//       }

//       if (giftCard.expiresAt && new Date(giftCard.expiresAt) < new Date()) {
//         throw new Error("Gift card has expired")
//       }

//       if (giftCard.balance < amount) {
//         throw new Error(`Insufficient gift card balance. Available: ${giftCard.balance} ${giftCard.currency}`)
//       }

//       // Calculate remaining balance
//       const remainingBalance = giftCard.balance - amount

//       // Update the gift card balance
//       const updatedGiftCard = await tx.giftCard.update({
//         where: { id: giftCard.id },
//         data: {
//           balance: remainingBalance,
//           isRedeemed: remainingBalance === 0,
//           lastUsedAt: new Date(),
//         },
//       })

//       // Create a redemption record
//       const redemption = await tx.giftCardRedemption.create({
//         data: {
//           giftCardId: giftCard.id,
//           amount,
//           userId: userId,
//         },
//       })

//       return {
//         redemptionId: redemption.id,
//         code: giftCard.code,
//         amount_applied: amount,
//         remaining_balance: updatedGiftCard.balance,
//         currency: giftCard.currency,
//         success: true,
//       }
//     })

//     return NextResponse.json(result)
//   } catch (error) {
//     console.error("Error redeeming gift card:", error)

//     const errorMessage = error instanceof Error ? error.message : "Error redeeming gift card"

//     return NextResponse.json({ error: errorMessage }, { status: 400 })
//   }
// }

// // Endpoint to check gift card balance
// export async function GET(req: NextRequest) {
//   try {
//     const url = new URL(req.url)
//     const code = url.searchParams.get("code")

//     if (!code) {
//       return NextResponse.json({ error: "Gift card code is required" }, { status: 400 })
//     }

//     // Find the gift card in the database
//     const giftCard = await db.giftCard.findUnique({
//       where: { code },
//     })

//     if (!giftCard) {
//       return NextResponse.json({ error: "Gift card not found" }, { status: 404 })
//     }

//     // Check if the gift card has expired
//     if (giftCard.expiresAt && new Date(giftCard.expiresAt) < new Date()) {
//       return NextResponse.json({
//         code: giftCard.code,
//         balance: giftCard.balance,
//         currency: giftCard.currency,
//         is_valid: false,
//         status: "expired",
//         expires_at: giftCard.expiresAt,
//       })
//     }

//     return NextResponse.json({
//       code: giftCard.code,
//       balance: giftCard.balance,
//       currency: giftCard.currency,
//       is_valid: !giftCard.isRedeemed && giftCard.balance > 0,
//       status: giftCard.isRedeemed ? "redeemed" : "active",
//       expires_at: giftCard.expiresAt,
//     })
//   } catch (error) {
//     console.error("Error checking gift card:", error)

//     return NextResponse.json({ error: "Error checking gift card" }, { status: 500 })
//   }
// }

