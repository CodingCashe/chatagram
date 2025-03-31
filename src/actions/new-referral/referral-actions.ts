// "use server"
// import { v4 as uuidv4 } from "uuid"
// import {client} from "@/lib/prisma"
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "@/lib/auth"

// // Types
// export type AffiliateRegistrationData = {
//   name: string
//   email: string
//   bio?: string
//   paymentDetails?: {
//     paymentMethod: string
//     paypalEmail?: string
//     bankName?: string
//     accountNumber?: string
//     routingNumber?: string
//   }
// }


// // Register as an affiliate (both users and non-users)
// export async function registerAsAffiliate(
//   programId: string,
//   data: AffiliateRegistrationData
// ) {
//   try {
//     // Get current user if logged in
//     const session = await getServerSession(authOptions);
//     const userId = session?.user?.id || null;
    
//     // Check if this email is already registered as an affiliate
//     const existingAffiliate = await client.affiliateUser.findUnique({
//       where: { email: data.email }
//     });
    
//     if (existingAffiliate) {
//       return {
//         success: false,
//         message: "This email is already registered as an affiliate."
//       };
//     }
    
//     // Generate a unique referral code
//     const referralCode = generateReferralCode(data.name);
    
//     // Get the commission rate from the program
//     const program = await client.affiliateProgram.findUnique({
//       where: { id: programId }
//     });
    
//     if (!program || program.status !== "active") {
//       return {
//         success: false,
//         message: "Affiliate program not found or inactive."
//       };
//     }
    
//     // Create the affiliate user
//     const newAffiliate = await client.affiliateUser.create({
//       data: {
//         userId: userId as string | undefined, // Cast to handle UUID type
//         name: data.name,
//         email: data.email,
//         referralCode,
//         bio: data.bio,
//         paymentDetails: data.paymentDetails ? JSON.stringify(data.paymentDetails) : null,
//         program: { connect: { id: programId } },
//         commissionRate: program.commissionRate, // Use program default
//         isApproved: program.name.toLowerCase().includes('auto-approve'), // Auto-approve if program name contains 'auto-approve'
//       }
//     });
    
//     return {
//       success: true,
//       affiliate: {
//         id: newAffiliate.id,
//         name: newAffiliate.name,
//         referralCode: newAffiliate.referralCode,
//         status: newAffiliate.status
//       }
//     };
//   } catch (error) {
//     console.error("Error registering affiliate:", error);
//     return {
//       success: false,
//       message: "Failed to register as affiliate."
//     };
//   }
// }

// export async function generateReferralLink(
//   affiliateId: string,
//   baseUrl: string = process.env.NEXT_PUBLIC_APP_URL || "",
// ) {
//   try {
//     const affiliate = await client.affiliateUser.findUnique({
//       where: { id: affiliateId },
//     })

//     if (!affiliate || affiliate.status !== "active") {
//       return {
//         success: false,
//         message: "Affiliate not found or inactive.",
//       }
//     }

//     const referralLink = `${baseUrl}/ref/${affiliate.referralCode}`

//     return {
//       success: true,
//       referralLink,
//     }
//   } catch (error) {
//     console.error("Error generating referral link:", error)
//     return {
//       success: false,
//       message: "Failed to generate referral link.",
//     }
//   }
// }

// // Track a referral click
// export async function trackAffiliateClick(
//   referralCode: string,
//   ipAddress?: string,
//   userAgent?: string,
//   referrer?: string,
// ) {
//   try {
//     // Find the affiliate by referral code
//     const affiliate = await client.affiliateUser.findFirst({
//       where: { referralCode },
//     })

//     if (!affiliate) {
//       return {
//         success: false,
//         message: "Invalid referral code.",
//       }
//     }

//     // Record the click
//     await client.affiliateClick.create({
//       data: {
//         ipAddress,
//         userAgent,
//         referrer,
//         affiliate: { connect: { id: affiliate.id } },
//       },
//     })

//     return { success: true }
//   } catch (error) {
//     console.error("Error tracking affiliate click:", error)
//     return {
//       success: false,
//       message: "Failed to track affiliate click.",
//     }
//   }
// }

// // Record a conversion/referral
// export async function recordAffiliateReferral(
//   referralCode: string,
//   userId: string | null,
//   conversionType: string,
//   amount: number,
// ) {
//   try {
//     // Find the affiliate by referral code
//     const affiliate = await client.affiliateUser.findFirst({
//       where: { referralCode },
//     })

//     if (!affiliate || affiliate.status !== "active") {
//       return {
//         success: false,
//         message: "Invalid referral code or inactive affiliate.",
//       }
//     }

//     // Get the commission rate (either custom for the affiliate or the program default)
//     const commissionRate =
//       affiliate.commissionRate ||
//       (
//         await client.affiliateProgram.findUnique({
//           where: { id: affiliate.programId },
//         })
//       )?.commissionRate ||
//       0

//     // Calculate the commission amount
//     const commissionAmount = amount * (commissionRate / 100)

//     // Record the referral
//     const referral = await client.affiliateReferral.create({
//       data: {
//         referredUserId: userId,
//         conversionType,
//         amount,
//         commissionAmount,
//         affiliate: { connect: { id: affiliate.id } },
//         program: { connect: { id: affiliate.programId } },
//       },
//     })

//     // Update the affiliate's balance
//     await client.affiliateUser.update({
//       where: { id: affiliate.id },
//       data: {
//         balance: { increment: commissionAmount },
//         totalEarned: { increment: commissionAmount },
//       },
//     })

//     // Update click to mark as converted
//     if (userId) {
//       await client.affiliateClick.updateMany({
//         where: {
//           affiliateId: affiliate.id,
//           converted: false,
//         },
//         data: {
//           converted: true,
//         },
//       })
//     }

//     return {
//       success: true,
//       referral: {
//         id: referral.id,
//         commissionAmount,
//       },
//     }
//   } catch (error) {
//     console.error("Error recording affiliate referral:", error)
//     return {
//       success: false,
//       message: "Failed to record affiliate referral.",
//     }
//   }
// }

// // Get affiliate dashboard data for a user
// export async function getAffiliateDashboard(affiliateId: string) {
//   try {
//     const affiliate = await client.affiliateUser.findUnique({
//       where: { id: affiliateId },
//       include: {
//         program: true,
//       },
//     })

//     if (!affiliate) {
//       return {
//         success: false,
//         message: "Affiliate not found.",
//       }
//     }

//     // Get statistics
//     const [clicksCount, referralsCount, pendingReferrals, recentReferrals, conversionRate, payouts] = await Promise.all(
//       [
//         client.affiliateClick.count({
//           where: { affiliateId },
//         }),
//         client.affiliateReferral.count({
//           where: { affiliateId },
//         }),
//         client.affiliateReferral.count({
//           where: {
//             affiliateId,
//             status: "pending",
//           },
//         }),
//         client.affiliateReferral.findMany({
//           where: { affiliateId },
//           take: 5,
//           orderBy: { conversionDate: "desc" },
//           include: {
//             referredUser: {
//               select: {
//                 id: true,
//                 name: true,
//                 email: true,
//               },
//             },
//           },
//         }),
//         client.affiliateClick
//           .count({
//             where: {
//               affiliateId,
//               converted: true,
//             },
//           })
//           .then((convertedClicks) => {
//             return clicksCount > 0 ? (convertedClicks / clicksCount) * 100 : 0
//           }),
//         client.affiliatePayout.findMany({
//           where: { affiliateId },
//           take: 5,
//           orderBy: { createdAt: "desc" },
//         }),
//       ],
//     )

//     // Calculate performance metrics
//     const currentMonth = new Date().getMonth()
//     const currentYear = new Date().getFullYear()

//     const monthlyReferrals = await client.affiliateReferral.findMany({
//       where: {
//         affiliateId,
//         conversionDate: {
//           gte: new Date(currentYear, currentMonth, 1),
//           lt: new Date(currentYear, currentMonth + 1, 1),
//         },
//       },
//     })

//     const monthlyEarnings = monthlyReferrals.reduce((total, ref) => total + ref.commissionAmount, 0)

//     return {
//       success: true,
//       dashboardData: {
//         affiliate,
//         stats: {
//           clicks: clicksCount,
//           referrals: referralsCount,
//           pendingReferrals,
//           conversionRate,
//           balance: affiliate.balance,
//           totalEarned: affiliate.totalEarned,
//           monthlyEarnings,
//         },
//         recentReferrals,
//         recentPayouts: payouts,
//       },
//     }
//   } catch (error) {
//     console.error("Error fetching affiliate dashboard:", error)
//     return {
//       success: false,
//       message: "Failed to fetch affiliate dashboard.",
//     }
//   }
// }

// // Get affiliate leaderboard
// export async function getAffiliateLeaderboard(limit = 10) {
//   try {
//     const topAffiliates = await client.affiliateUser.findMany({
//       where: {
//         status: "active",
//         isApproved: true,
//       },
//       orderBy: {
//         totalEarned: "desc",
//       },
//       take: limit,
//       select: {
//         id: true,
//         name: true,
//         totalEarned: true,
//         userId: true,
//         bio: true,
//         _count: {
//           select: {
//             referrals: true,
//           },
//         },
//       },
//     })

//     return {
//       success: true,
//       leaderboard: topAffiliates,
//     }
//   } catch (error) {
//     console.error("Error fetching affiliate leaderboard:", error)
//     return {
//       success: false,
//       message: "Failed to fetch affiliate leaderboard.",
//     }
//   }
// }

// // Request a payout
// export async function requestAffiliatePayout(affiliateId: string, paymentMethod: string, notes?: string) {
//   try {
//     const affiliate = await client.affiliateUser.findUnique({
//       where: { id: affiliateId },
//       include: { program: true },
//     })

//     if (!affiliate) {
//       return {
//         success: false,
//         message: "Affiliate not found.",
//       }
//     }

//     if (affiliate.balance < affiliate.program.minimumPayout) {
//       return {
//         success: false,
//         message: `Minimum payout amount of $${affiliate.program.minimumPayout} not reached.`,
//       }
//     }

//     // Get pending referrals to include in this payout
//     const pendingReferrals = await client.affiliateReferral.findMany({
//       where: {
//         affiliateId,
//         status: "approved",
//         payoutId: null,
//       },
//     })

//     if (pendingReferrals.length === 0) {
//       return {
//         success: false,
//         message: "No approved referrals available for payout.",
//       }
//     }

//     const payoutAmount = pendingReferrals.reduce((total, ref) => total + ref.commissionAmount, 0)

//     // Create the payout
//     const payout = await client.affiliatePayout.create({
//       data: {
//         amount: payoutAmount,
//         paymentMethod,
//         notes,
//         affiliate: { connect: { id: affiliate.id } },
//         program: { connect: { id: affiliate.program.id } },
//       },
//     })

//     // Update the referrals to link them to this payout
//     await client.affiliateReferral.updateMany({
//       where: {
//         id: {
//           in: pendingReferrals.map((ref) => ref.id),
//         },
//       },
//       data: {
//         payoutId: payout.id,
//         status: "paid",
//       },
//     })

//     // Update the affiliate's balance
//     await client.affiliateUser.update({
//       where: { id: affiliate.id },
//       data: {
//         balance: { decrement: payoutAmount },
//       },
//     })

//     return {
//       success: true,
//       payout: {
//         id: payout.id,
//         amount: payoutAmount,
//       },
//     }
//   } catch (error) {
//     console.error("Error requesting affiliate payout:", error)
//     return {
//       success: false,
//       message: "Failed to request payout.",
//     }
//   }
// }

// // Helper function to generate a unique referral code
// function generateReferralCode(name: string): string {
//   const baseCode = name
//     .toLowerCase()
//     .replace(/[^a-z0-9]/g, "")
//     .substring(0, 8)

//   const uniqueId = uuidv4().substring(0, 6)

//   return `${baseCode}${uniqueId}`
// }

// "use server"
// import { v4 as uuidv4 } from "uuid"
// import { client } from "@/lib/prisma"
// import { onCurrentUser } from "@/actions/user"

// // Types
// export type AffiliateRegistrationData = {
//   name: string
//   email: string
//   bio?: string
//   paymentDetails?: {
//     paymentMethod: string
//     paypalEmail?: string
//     bankName?: string
//     accountNumber?: string
//     routingNumber?: string
//   }
// }

// // Register as an affiliate (both users and non-users)
// export async function registerAsAffiliate(programId: string, data: AffiliateRegistrationData) {
//   try {
//     // Get current user if logged in
//     let userId = null
//     try {
//       const userResponse = await onCurrentUser()
//       if (userResponse) {
//         userId = userResponse.id
//       }
//     } catch (error) {
//       // User not authenticated, continue as guest
//       console.log("User not authenticated, registering as guest affiliate")
//     }

//     // Check if this email is already registered as an affiliate
//     const existingAffiliate = await client.affiliateUser.findUnique({
//       where: { email: data.email },
//     })

//     if (existingAffiliate) {
//       return {
//         success: false,
//         message: "This email is already registered as an affiliate.",
//       }
//     }

//     // Generate a unique referral code
//     const referralCode = generateReferralCode(data.name)

//     // Get the commission rate from the program
//     const program = await client.affiliateProgram.findUnique({
//       where: { id: programId },
//     })

//     if (!program || program.status !== "active") {
//       return {
//         success: false,
//         message: "Affiliate program not found or inactive.",
//       }
//     }

//     // Create the affiliate user
//     const newAffiliate = await client.affiliateUser.create({
//       data: {
//         userId: userId,
//         name: data.name,
//         email: data.email,
//         referralCode,
//         bio: data.bio,
//         paymentDetails: data.paymentDetails ? JSON.stringify(data.paymentDetails) : null,
//         program: { connect: { id: programId } },
//         commissionRate: program.commissionRate, // Use program default
//         isApproved: program.name.toLowerCase().includes("auto-approve"), // Auto-approve if program name contains 'auto-approve'
//       },
//     })

//     return {
//       success: true,
//       affiliate: {
//         id: newAffiliate.id,
//         name: newAffiliate.name,
//         referralCode: newAffiliate.referralCode,
//         status: newAffiliate.status,
//       },
//     }
//   } catch (error) {
//     console.error("Error registering affiliate:", error)
//     return {
//       success: false,
//       message: "Failed to register as affiliate.",
//     }
//   }
// }

// export async function generateReferralLink(
//   affiliateId: string,
//   baseUrl: string = process.env.NEXT_PUBLIC_APP_URL || "",
// ) {
//   try {
//     const affiliate = await client.affiliateUser.findUnique({
//       where: { id: affiliateId },
//     })

//     if (!affiliate || affiliate.status !== "active") {
//       return {
//         success: false,
//         message: "Affiliate not found or inactive.",
//       }
//     }

//     const referralLink = `${baseUrl}/ref/${affiliate.referralCode}`

//     return {
//       success: true,
//       referralLink,
//     }
//   } catch (error) {
//     console.error("Error generating referral link:", error)
//     return {
//       success: false,
//       message: "Failed to generate referral link.",
//     }
//   }
// }

// // Track a referral click
// export async function trackAffiliateClick(
//   referralCode: string,
//   ipAddress?: string,
//   userAgent?: string,
//   referrer?: string,
// ) {
//   try {
//     // Find the affiliate by referral code
//     const affiliate = await client.affiliateUser.findFirst({
//       where: { referralCode },
//     })

//     if (!affiliate) {
//       return {
//         success: false,
//         message: "Invalid referral code.",
//       }
//     }

//     // Record the click
//     await client.affiliateClick.create({
//       data: {
//         ipAddress,
//         userAgent,
//         referrer,
//         affiliate: { connect: { id: affiliate.id } },
//       },
//     })

//     return { success: true }
//   } catch (error) {
//     console.error("Error tracking affiliate click:", error)
//     return {
//       success: false,
//       message: "Failed to track affiliate click.",
//     }
//   }
// }

// // Record a conversion/referral
// export async function recordAffiliateReferral(
//   referralCode: string,
//   userId: string | null,
//   conversionType: string,
//   amount: number,
// ) {
//   try {
//     // Find the affiliate by referral code
//     const affiliate = await client.affiliateUser.findFirst({
//       where: { referralCode },
//     })

//     if (!affiliate || affiliate.status !== "active") {
//       return {
//         success: false,
//         message: "Invalid referral code or inactive affiliate.",
//       }
//     }

//     // Get the commission rate (either custom for the affiliate or the program default)
//     const commissionRate =
//       affiliate.commissionRate ||
//       (
//         await client.affiliateProgram.findUnique({
//           where: { id: affiliate.programId },
//         })
//       )?.commissionRate ||
//       0

//     // Calculate the commission amount
//     const commissionAmount = amount * (commissionRate / 100)

//     // Record the referral
//     const referral = await client.affiliateReferral.create({
//       data: {
//         referredUserId: userId,
//         conversionType,
//         amount,
//         commissionAmount,
//         affiliate: { connect: { id: affiliate.id } },
//         program: { connect: { id: affiliate.programId } },
//       },
//     })

//     // Update the affiliate's balance
//     await client.affiliateUser.update({
//       where: { id: affiliate.id },
//       data: {
//         balance: { increment: commissionAmount },
//         totalEarned: { increment: commissionAmount },
//       },
//     })

//     // Update click to mark as converted
//     if (userId) {
//       await client.affiliateClick.updateMany({
//         where: {
//           affiliateId: affiliate.id,
//           converted: false,
//         },
//         data: {
//           converted: true,
//         },
//       })
//     }

//     return {
//       success: true,
//       referral: {
//         id: referral.id,
//         commissionAmount,
//       },
//     }
//   } catch (error) {
//     console.error("Error recording affiliate referral:", error)
//     return {
//       success: false,
//       message: "Failed to record affiliate referral.",
//     }
//   }
// }

// // Get affiliate dashboard data for a user
// export async function getAffiliateDashboard(affiliateId: string) {
//   try {
//     const affiliate = await client.affiliateUser.findUnique({
//       where: { id: affiliateId },
//       include: {
//         program: true,
//       },
//     })

//     if (!affiliate) {
//       return {
//         success: false,
//         message: "Affiliate not found.",
//       }
//     }

//     // Get statistics
//     const clicksCount = await client.affiliateClick.count({
//       where: { affiliateId },
//     })

//     const referralsCount = await client.affiliateReferral.count({
//       where: { affiliateId },
//     })

//     const pendingReferrals = await client.affiliateReferral.count({
//       where: {
//         affiliateId,
//         status: "pending",
//       },
//     })

//     const recentReferrals = await client.affiliateReferral.findMany({
//       where: { affiliateId },
//       take: 5,
//       orderBy: { conversionDate: "desc" },
//       include: {
//         referredUser: {
//           select: {
//             id: true,
//             name: true,
//             email: true,
//           },
//         },
//       },
//     })

//     const convertedClicks = await client.affiliateClick.count({
//       where: {
//         affiliateId,
//         converted: true,
//       },
//     })

//     const conversionRate = clicksCount > 0 ? (convertedClicks / clicksCount) * 100 : 0

//     const payouts = await client.affiliatePayout.findMany({
//       where: { affiliateId },
//       take: 5,
//       orderBy: { createdAt: "desc" },
//     })

//     // Calculate performance metrics
//     const currentMonth = new Date().getMonth()
//     const currentYear = new Date().getFullYear()

//     const monthlyReferrals = await client.affiliateReferral.findMany({
//       where: {
//         affiliateId,
//         conversionDate: {
//           gte: new Date(currentYear, currentMonth, 1),
//           lt: new Date(currentYear, currentMonth + 1, 1),
//         },
//       },
//     })

//     const monthlyEarnings = monthlyReferrals.reduce((total, ref) => total + ref.commissionAmount, 0)

//     return {
//       success: true,
//       dashboardData: {
//         affiliate,
//         stats: {
//           clicks: clicksCount,
//           referrals: referralsCount,
//           pendingReferrals,
//           conversionRate,
//           balance: affiliate.balance,
//           totalEarned: affiliate.totalEarned,
//           monthlyEarnings,
//         },
//         recentReferrals,
//         recentPayouts: payouts,
//       },
//     }
//   } catch (error) {
//     console.error("Error fetching affiliate dashboard:", error)
//     return {
//       success: false,
//       message: "Failed to fetch affiliate dashboard.",
//     }
//   }
// }

// // Get affiliate leaderboard
// export async function getAffiliateLeaderboard(limit = 10) {
//   try {
//     const topAffiliates = await client.affiliateUser.findMany({
//       where: {
//         status: "active",
//         isApproved: true,
//       },
//       orderBy: {
//         totalEarned: "desc",
//       },
//       take: limit,
//       select: {
//         id: true,
//         name: true,
//         totalEarned: true,
//         userId: true,
//         bio: true,
//         _count: {
//           select: {
//             referrals: true,
//           },
//         },
//       },
//     })

//     return {
//       success: true,
//       leaderboard: topAffiliates,
//     }
//   } catch (error) {
//     console.error("Error fetching affiliate leaderboard:", error)
//     return {
//       success: false,
//       message: "Failed to fetch affiliate leaderboard.",
//     }
//   }
// }

// // Request a payout
// export async function requestAffiliatePayout(affiliateId: string, paymentMethod: string, notes?: string) {
//   try {
//     const affiliate = await client.affiliateUser.findUnique({
//       where: { id: affiliateId },
//       include: { program: true },
//     })

//     if (!affiliate) {
//       return {
//         success: false,
//         message: "Affiliate not found.",
//       }
//     }

//     if (affiliate.balance < affiliate.program.minimumPayout) {
//       return {
//         success: false,
//         message: `Minimum payout amount of $${affiliate.program.minimumPayout} not reached.`,
//       }
//     }

//     // Get pending referrals to include in this payout
//     const pendingReferrals = await client.affiliateReferral.findMany({
//       where: {
//         affiliateId,
//         status: "approved",
//         payoutId: null,
//       },
//     })

//     if (pendingReferrals.length === 0) {
//       return {
//         success: false,
//         message: "No approved referrals available for payout.",
//       }
//     }

//     const payoutAmount = pendingReferrals.reduce((total, ref) => total + ref.commissionAmount, 0)

//     // Create the payout
//     const payout = await client.affiliatePayout.create({
//       data: {
//         amount: payoutAmount,
//         paymentMethod,
//         notes,
//         affiliate: { connect: { id: affiliate.id } },
//         program: { connect: { id: affiliate.program.id } },
//       },
//     })

//     // Update the referrals to link them to this payout
//     await client.affiliateReferral.updateMany({
//       where: {
//         id: {
//           in: pendingReferrals.map((ref) => ref.id),
//         },
//       },
//       data: {
//         payoutId: payout.id,
//         status: "paid",
//       },
//     })

//     // Update the affiliate's balance
//     await client.affiliateUser.update({
//       where: { id: affiliate.id },
//       data: {
//         balance: { decrement: payoutAmount },
//       },
//     })

//     return {
//       success: true,
//       payout: {
//         id: payout.id,
//         amount: payoutAmount,
//       },
//     }
//   } catch (error) {
//     console.error("Error requesting affiliate payout:", error)
//     return {
//       success: false,
//       message: "Failed to request payout.",
//     }
//   }
// }

// // Helper function to generate a unique referral code
// function generateReferralCode(name: string): string {
//   const baseCode = name
//     .toLowerCase()
//     .replace(/[^a-z0-9]/g, "")
//     .substring(0, 8)

//   const uniqueId = uuidv4().substring(0, 6)

//   return `${baseCode}${uniqueId}`
// }

// "use server"
// import { v4 as uuidv4 } from "uuid"
// import { client } from "@/lib/prisma"
// // import { onUserInfo } from "@/actions/user"
// import { onCurrentUser } from "@/actions/user"

// // Types
// export type AffiliateRegistrationData = {
//   name: string
//   email: string
//   bio?: string
//   paymentDetails?: {
//     paymentMethod: string
//     paypalEmail?: string
//     bankName?: string
//     accountNumber?: string
//     routingNumber?: string
//   }
// }

// // Register as an affiliate (both users and non-users)
// export async function registerAsAffiliate(programId: string, data: AffiliateRegistrationData) {
//   try {
//     // Get current user if logged in
//     let userId = null
//     try {
//       const userResponse = await onCurrentUser()
//       if (userResponse) {
//         userId = userResponse.id
//       }
//     } catch (error) {
//       // User not authenticated, continue as guest
//       console.log("User not authenticated, registering as guest affiliate")
//     }

//     // Check if this email is already registered as an affiliate
//     const existingAffiliate = await client.affiliateUser.findUnique({
//       where: { email: data.email },
//     })

//     if (existingAffiliate) {
//       return {
//         success: false,
//         message: "This email is already registered as an affiliate.",
//       }
//     }

//     // Generate a unique referral code
//     const referralCode = generateReferralCode(data.name)

//     // Get the commission rate from the program
//     const program = await client.affiliateProgram.findUnique({
//       where: { id: programId },
//     })

//     if (!program || program.status !== "active") {
//       return {
//         success: false,
//         message: "Affiliate program not found or inactive.",
//       }
//     }

//     // Create the affiliate user
//     const newAffiliate = await client.affiliateUser.create({
//       data: {
//         userId: userId,
//         name: data.name,
//         email: data.email,
//         referralCode,
//         bio: data.bio,
//         paymentDetails: data.paymentDetails ? JSON.stringify(data.paymentDetails) : null,
//         program: { connect: { id: programId } },
//         commissionRate: program.commissionRate, // Use program default
//         isApproved: program.name.toLowerCase().includes("auto-approve"), // Auto-approve if program name contains 'auto-approve'
//       },
//     })

//     return {
//       success: true,
//       affiliate: {
//         id: newAffiliate.id,
//         name: newAffiliate.name,
//         referralCode: newAffiliate.referralCode,
//         status: newAffiliate.status,
//       },
//     }
//   } catch (error) {
//     console.error("Error registering affiliate:", error)
//     return {
//       success: false,
//       message: "Failed to register as affiliate.",
//     }
//   }
// }

// export async function generateReferralLink(
//   affiliateId: string,
//   baseUrl: string = process.env.NEXT_PUBLIC_APP_URL || "",
// ) {
//   try {
//     const affiliate = await client.affiliateUser.findUnique({
//       where: { id: affiliateId },
//     })

//     if (!affiliate || affiliate.status !== "active") {
//       return {
//         success: false,
//         message: "Affiliate not found or inactive.",
//       }
//     }

//     const referralLink = `${baseUrl}/ref/${affiliate.referralCode}`

//     return {
//       success: true,
//       referralLink,
//     }
//   } catch (error) {
//     console.error("Error generating referral link:", error)
//     return {
//       success: false,
//       message: "Failed to generate referral link.",
//     }
//   }
// }

// // Track a referral click
// export async function trackAffiliateClick(
//   referralCode: string,
//   ipAddress?: string,
//   userAgent?: string,
//   referrer?: string,
// ) {
//   try {
//     // Find the affiliate by referral code
//     const affiliate = await client.affiliateUser.findFirst({
//       where: { referralCode },
//     })

//     if (!affiliate) {
//       return {
//         success: false,
//         message: "Invalid referral code.",
//       }
//     }

//     // Record the click
//     await client.affiliateClick.create({
//       data: {
//         ipAddress,
//         userAgent,
//         referrer,
//         affiliate: { connect: { id: affiliate.id } },
//       },
//     })

//     return { success: true }
//   } catch (error) {
//     console.error("Error tracking affiliate click:", error)
//     return {
//       success: false,
//       message: "Failed to track affiliate click.",
//     }
//   }
// }

// // Record a conversion/referral
// export async function recordAffiliateReferral(
//   referralCode: string,
//   userId: string | null,
//   conversionType: string,
//   amount: number,
// ) {
//   try {
//     // Find the affiliate by referral code
//     const affiliate = await client.affiliateUser.findFirst({
//       where: { referralCode },
//     })

//     if (!affiliate || affiliate.status !== "active") {
//       return {
//         success: false,
//         message: "Invalid referral code or inactive affiliate.",
//       }
//     }

//     // Get the commission rate (either custom for the affiliate or the program default)
//     const commissionRate =
//       affiliate.commissionRate ||
//       (
//         await client.affiliateProgram.findUnique({
//           where: { id: affiliate.programId },
//         })
//       )?.commissionRate ||
//       0

//     // Calculate the commission amount
//     const commissionAmount = amount * (commissionRate / 100)

//     // Record the referral using the unchecked version with direct IDs
//     const referral = await client.affiliateReferral.create({
//       data: {
//         referredUserId: userId,
//         conversionType,
//         amount,
//         commissionAmount,
//         affiliateId: affiliate.id,
//         programId: affiliate.programId,
//       },
//     })

//     // Update the affiliate's balance
//     await client.affiliateUser.update({
//       where: { id: affiliate.id },
//       data: {
//         balance: { increment: commissionAmount },
//         totalEarned: { increment: commissionAmount },
//       },
//     })

//     // Update click to mark as converted
//     if (userId) {
//       await client.affiliateClick.updateMany({
//         where: {
//           affiliateId: affiliate.id,
//           converted: false,
//         },
//         data: {
//           converted: true,
//         },
//       })
//     }

//     return {
//       success: true,
//       referral: {
//         id: referral.id,
//         commissionAmount,
//       },
//     }
//   } catch (error) {
//     console.error("Error recording affiliate referral:", error)
//     return {
//       success: false,
//       message: "Failed to record affiliate referral.",
//     }
//   }
// }

// // Get affiliate dashboard data for a user
// export async function getAffiliateDashboard(affiliateId: string) {
//   try {
//     const affiliate = await client.affiliateUser.findUnique({
//       where: { id: affiliateId },
//       include: {
//         program: true,
//       },
//     })

//     if (!affiliate) {
//       return {
//         success: false,
//         message: "Affiliate not found.",
//       }
//     }

//     // Get statistics
//     const clicksCount = await client.affiliateClick.count({
//       where: { affiliateId },
//     })

//     const referralsCount = await client.affiliateReferral.count({
//       where: { affiliateId },
//     })

//     const pendingReferrals = await client.affiliateReferral.count({
//       where: {
//         affiliateId,
//         status: "pending",
//       },
//     })

//     const recentReferrals = await client.affiliateReferral.findMany({
//       where: { affiliateId },
//       take: 5,
//       orderBy: { conversionDate: "desc" },
//       include: {
//         referredUser: {
//           select: {
//             id: true,
//             firstname: true,
//             lastname: true,
//             email: true,
//           },
//         },
//       },
//     })

//     const convertedClicks = await client.affiliateClick.count({
//       where: {
//         affiliateId,
//         converted: true,
//       },
//     })

//     const conversionRate = clicksCount > 0 ? (convertedClicks / clicksCount) * 100 : 0

//     const payouts = await client.affiliatePayout.findMany({
//       where: { affiliateId },
//       take: 5,
//       orderBy: { createdAt: "desc" },
//     })

//     // Calculate performance metrics
//     const currentMonth = new Date().getMonth()
//     const currentYear = new Date().getFullYear()

//     const monthlyReferrals = await client.affiliateReferral.findMany({
//       where: {
//         affiliateId,
//         conversionDate: {
//           gte: new Date(currentYear, currentMonth, 1),
//           lt: new Date(currentYear, currentMonth + 1, 1),
//         },
//       },
//     })

//     const monthlyEarnings = monthlyReferrals.reduce((total, ref) => total + ref.commissionAmount, 0)

//     return {
//       success: true,
//       dashboardData: {
//         affiliate,
//         stats: {
//           clicks: clicksCount,
//           referrals: referralsCount,
//           pendingReferrals,
//           conversionRate,
//           balance: affiliate.balance,
//           totalEarned: affiliate.totalEarned,
//           monthlyEarnings,
//         },
//         recentReferrals,
//         recentPayouts: payouts,
//       },
//     }
//   } catch (error) {
//     console.error("Error fetching affiliate dashboard:", error)
//     return {
//       success: false,
//       message: "Failed to fetch affiliate dashboard.",
//     }
//   }
// }

// // Get affiliate leaderboard
// export async function getAffiliateLeaderboard(limit = 10) {
//   try {
//     const topAffiliates = await client.affiliateUser.findMany({
//       where: {
//         status: "active",
//         isApproved: true,
//       },
//       orderBy: {
//         totalEarned: "desc",
//       },
//       take: limit,
//       select: {
//         id: true,
//         name: true,
//         totalEarned: true,
//         userId: true,
//         bio: true,
//         _count: {
//           select: {
//             referrals: true,
//           },
//         },
//       },
//     })

//     return {
//       success: true,
//       leaderboard: topAffiliates,
//     }
//   } catch (error) {
//     console.error("Error fetching affiliate leaderboard:", error)
//     return {
//       success: false,
//       message: "Failed to fetch affiliate leaderboard.",
//     }
//   }
// }

// // Request a payout
// export async function requestAffiliatePayout(affiliateId: string, paymentMethod: string, notes?: string) {
//   try {
//     const affiliate = await client.affiliateUser.findUnique({
//       where: { id: affiliateId },
//       include: { program: true },
//     })

//     if (!affiliate) {
//       return {
//         success: false,
//         message: "Affiliate not found.",
//       }
//     }

//     if (affiliate.balance < affiliate.program.minimumPayout) {
//       return {
//         success: false,
//         message: `Minimum payout amount of $${affiliate.program.minimumPayout} not reached.`,
//       }
//     }

//     // Get pending referrals to include in this payout
//     const pendingReferrals = await client.affiliateReferral.findMany({
//       where: {
//         affiliateId,
//         status: "approved",
//         payoutId: null,
//       },
//     })

//     if (pendingReferrals.length === 0) {
//       return {
//         success: false,
//         message: "No approved referrals available for payout.",
//       }
//     }

//     const payoutAmount = pendingReferrals.reduce((total, ref) => total + ref.commissionAmount, 0)

//     // Create the payout using unchecked version with direct IDs
//     const payout = await client.affiliatePayout.create({
//       data: {
//         amount: payoutAmount,
//         paymentMethod,
//         notes,
//         affiliateId: affiliate.id,
//         programId: affiliate.program.id,
//       },
//     })

//     // Update the referrals to link them to this payout
//     await client.affiliateReferral.updateMany({
//       where: {
//         id: {
//           in: pendingReferrals.map((ref) => ref.id),
//         },
//       },
//       data: {
//         payoutId: payout.id,
//         status: "paid",
//       },
//     })

//     // Update the affiliate's balance
//     await client.affiliateUser.update({
//       where: { id: affiliate.id },
//       data: {
//         balance: { decrement: payoutAmount },
//       },
//     })

//     return {
//       success: true,
//       payout: {
//         id: payout.id,
//         amount: payoutAmount,
//       },
//     }
//   } catch (error) {
//     console.error("Error requesting affiliate payout:", error)
//     return {
//       success: false,
//       message: "Failed to request payout.",
//     }
//   }
// }

// // Helper function to generate a unique referral code
// function generateReferralCode(name: string): string {
//   const baseCode = name
//     .toLowerCase()
//     .replace(/[^a-z0-9]/g, "")
//     .substring(0, 8)

//   const uniqueId = uuidv4().substring(0, 6)

//   return `${baseCode}${uniqueId}`
// }

// "use server"
// import { v4 as uuidv4 } from "uuid"
// import { client } from "@/lib/prisma"
// import { onUserInfo } from "@/actions/user"

// // Types
// export type AffiliateRegistrationData = {
//   name: string
//   email: string
//   bio?: string
//   paymentDetails?: {
//     paymentMethod: string
//     paypalEmail?: string
//     bankName?: string
//     accountNumber?: string
//     routingNumber?: string
//   }
// }

// // Register as an affiliate (both users and non-users)
// export async function registerAsAffiliate(programId: string, data: AffiliateRegistrationData) {
//   try {
//     // Get current user if logged in
//     let userId = null
//     try {
//       const userResponse = await onUserInfo()
//       if (userResponse.status === 200) {
//         userId = userResponse.data.id
//       }
//     } catch (error) {
//       // User not authenticated, continue as guest
//       console.log("User not authenticated, registering as guest affiliate")
//     }

//     // Check if this email is already registered as an affiliate
//     const existingAffiliate = await client.affiliateUser.findUnique({
//       where: { email: data.email },
//     })

//     if (existingAffiliate) {
//       return {
//         success: false,
//         message: "This email is already registered as an affiliate.",
//       }
//     }

//     // Generate a unique referral code
//     const referralCode = generateReferralCode(data.name)

//     // Get the commission rate from the program
//     const program = await client.affiliateProgram.findUnique({
//       where: { id: programId },
//     })

//     if (!program || program.status !== "active") {
//       return {
//         success: false,
//         message: "Affiliate program not found or inactive.",
//       }
//     }

//     // Create the affiliate user
//     const newAffiliate = await client.affiliateUser.create({
//       data: {
//         userId: userId,
//         name: data.name,
//         email: data.email,
//         referralCode,
//         bio: data.bio,
//         paymentDetails: data.paymentDetails ? data.paymentDetails : undefined,
//         program: { connect: { id: programId } },
//         commissionRate: program.commissionRate, // Use program default
//         isApproved: program.name.toLowerCase().includes("auto-approve"), // Auto-approve if program name contains 'auto-approve'
//       },
//     })

//     return {
//       success: true,
//       affiliate: {
//         id: newAffiliate.id,
//         name: newAffiliate.name,
//         referralCode: newAffiliate.referralCode,
//         status: newAffiliate.status,
//       },
//     }
//   } catch (error) {
//     console.error("Error registering affiliate:", error)
//     return {
//       success: false,
//       message: "Failed to register as affiliate.",
//     }
//   }
// }

// export async function generateReferralLink(
//   affiliateId: string,
//   baseUrl: string = process.env.NEXT_PUBLIC_APP_URL || "",
// ) {
//   try {
//     const affiliate = await client.affiliateUser.findUnique({
//       where: { id: affiliateId },
//     })

//     if (!affiliate || affiliate.status !== "active") {
//       return {
//         success: false,
//         message: "Affiliate not found or inactive.",
//       }
//     }

//     const referralLink = `${baseUrl}/ref/${affiliate.referralCode}`

//     return {
//       success: true,
//       referralLink,
//     }
//   } catch (error) {
//     console.error("Error generating referral link:", error)
//     return {
//       success: false,
//       message: "Failed to generate referral link.",
//     }
//   }
// }

// // Track a referral click
// export async function trackAffiliateClick(
//   referralCode: string,
//   ipAddress?: string,
//   userAgent?: string,
//   referrer?: string,
// ) {
//   try {
//     // Find the affiliate by referral code
//     const affiliate = await client.affiliateUser.findFirst({
//       where: { referralCode },
//     })

//     if (!affiliate) {
//       return {
//         success: false,
//         message: "Invalid referral code.",
//       }
//     }

//     // Record the click
//     await client.affiliateClick.create({
//       data: {
//         ipAddress,
//         userAgent,
//         referrer,
//         affiliate: { connect: { id: affiliate.id } },
//       },
//     })

//     return { success: true }
//   } catch (error) {
//     console.error("Error tracking affiliate click:", error)
//     return {
//       success: false,
//       message: "Failed to track affiliate click.",
//     }
//   }
// }

// // Record a conversion/referral
// export async function recordAffiliateReferral(
//   referralCode: string,
//   userId: string | null,
//   conversionType: string,
//   amount: number,
// ) {
//   try {
//     // Find the affiliate by referral code
//     const affiliate = await client.affiliateUser.findFirst({
//       where: { referralCode },
//     })

//     if (!affiliate || affiliate.status !== "active") {
//       return {
//         success: false,
//         message: "Invalid referral code or inactive affiliate.",
//       }
//     }

//     // Get the commission rate (either custom for the affiliate or the program default)
//     const commissionRate =
//       affiliate.commissionRate ||
//       (
//         await client.affiliateProgram.findUnique({
//           where: { id: affiliate.programId },
//         })
//       )?.commissionRate ||
//       0

//     // Calculate the commission amount
//     const commissionAmount = amount * (commissionRate / 100)

//     // Record the referral using the unchecked version with direct IDs
//     const referral = await client.affiliateReferral.create({
//       data: {
//         referredUserId: userId,
//         conversionType,
//         amount,
//         commissionAmount,
//         affiliateId: affiliate.id,
//         programId: affiliate.programId,
//       },
//     })

//     // Update the affiliate's balance
//     await client.affiliateUser.update({
//       where: { id: affiliate.id },
//       data: {
//         balance: { increment: commissionAmount },
//         totalEarned: { increment: commissionAmount },
//       },
//     })

//     // Update click to mark as converted
//     if (userId) {
//       await client.affiliateClick.updateMany({
//         where: {
//           affiliateId: affiliate.id,
//           converted: false,
//         },
//         data: {
//           converted: true,
//         },
//       })
//     }

//     return {
//       success: true,
//       referral: {
//         id: referral.id,
//         commissionAmount,
//       },
//     }
//   } catch (error) {
//     console.error("Error recording affiliate referral:", error)
//     return {
//       success: false,
//       message: "Failed to record affiliate referral.",
//     }
//   }
// }

// // Get affiliate dashboard data for a user
// export async function getAffiliateDashboard(affiliateId: string) {
//   try {
//     const affiliate = await client.affiliateUser.findUnique({
//       where: { id: affiliateId },
//       include: {
//         program: true,
//       },
//     })

//     if (!affiliate) {
//       return {
//         success: false,
//         message: "Affiliate not found.",
//       }
//     }

//     // Get statistics
//     const clicksCount = await client.affiliateClick.count({
//       where: { affiliateId },
//     })

//     const referralsCount = await client.affiliateReferral.count({
//       where: { affiliateId },
//     })

//     const pendingReferrals = await client.affiliateReferral.count({
//       where: {
//         affiliateId,
//         status: "pending",
//       },
//     })

//     const recentReferrals = await client.affiliateReferral.findMany({
//       where: { affiliateId },
//       take: 5,
//       orderBy: { conversionDate: "desc" },
//       include: {
//         referredUser: {
//           select: {
//             id: true,
//             firstname: true,
//             lastname: true,
//             email: true,
//           },
//         },
//       },
//     })

//     const convertedClicks = await client.affiliateClick.count({
//       where: {
//         affiliateId,
//         converted: true,
//       },
//     })

//     const conversionRate = clicksCount > 0 ? (convertedClicks / clicksCount) * 100 : 0

//     const payouts = await client.affiliatePayout.findMany({
//       where: { affiliateId },
//       take: 5,
//       orderBy: { createdAt: "desc" },
//     })

//     // Calculate performance metrics
//     const currentMonth = new Date().getMonth()
//     const currentYear = new Date().getFullYear()

//     const monthlyReferrals = await client.affiliateReferral.findMany({
//       where: {
//         affiliateId,
//         conversionDate: {
//           gte: new Date(currentYear, currentMonth, 1),
//           lt: new Date(currentYear, currentMonth + 1, 1),
//         },
//       },
//     })

//     const monthlyEarnings = monthlyReferrals.reduce((total, ref) => total + ref.commissionAmount, 0)

//     return {
//       success: true,
//       dashboardData: {
//         affiliate,
//         stats: {
//           clicks: clicksCount,
//           referrals: referralsCount,
//           pendingReferrals,
//           conversionRate,
//           balance: affiliate.balance,
//           totalEarned: affiliate.totalEarned,
//           monthlyEarnings,
//         },
//         recentReferrals,
//         recentPayouts: payouts,
//       },
//     }
//   } catch (error) {
//     console.error("Error fetching affiliate dashboard:", error)
//     return {
//       success: false,
//       message: "Failed to fetch affiliate dashboard.",
//     }
//   }
// }

// // Get affiliate leaderboard
// export async function getAffiliateLeaderboard(limit = 10) {
//   try {
//     const topAffiliates = await client.affiliateUser.findMany({
//       where: {
//         status: "active",
//         isApproved: true,
//       },
//       orderBy: {
//         totalEarned: "desc",
//       },
//       take: limit,
//       select: {
//         id: true,
//         name: true,
//         totalEarned: true,
//         userId: true,
//         bio: true,
//         _count: {
//           select: {
//             referrals: true,
//           },
//         },
//       },
//     })

//     return {
//       success: true,
//       leaderboard: topAffiliates,
//     }
//   } catch (error) {
//     console.error("Error fetching affiliate leaderboard:", error)
//     return {
//       success: false,
//       message: "Failed to fetch affiliate leaderboard.",
//     }
//   }
// }

// // Request a payout
// export async function requestAffiliatePayout(affiliateId: string, paymentMethod: string, notes?: string) {
//   try {
//     const affiliate = await client.affiliateUser.findUnique({
//       where: { id: affiliateId },
//       include: { program: true },
//     })

//     if (!affiliate) {
//       return {
//         success: false,
//         message: "Affiliate not found.",
//       }
//     }

//     if (affiliate.balance < affiliate.program.minimumPayout) {
//       return {
//         success: false,
//         message: `Minimum payout amount of $${affiliate.program.minimumPayout} not reached.`,
//       }
//     }

//     // Get pending referrals to include in this payout
//     const pendingReferrals = await client.affiliateReferral.findMany({
//       where: {
//         affiliateId,
//         status: "approved",
//         payoutId: null,
//       },
//     })

//     if (pendingReferrals.length === 0) {
//       return {
//         success: false,
//         message: "No approved referrals available for payout.",
//       }
//     }

//     const payoutAmount = pendingReferrals.reduce((total, ref) => total + ref.commissionAmount, 0)

//     // Create the payout using unchecked version with direct IDs
//     const payout = await client.affiliatePayout.create({
//       data: {
//         amount: payoutAmount,
//         paymentMethod,
//         notes,
//         affiliateId: affiliate.id,
//         programId: affiliate.program.id,
//       },
//     })

//     // Update the referrals to link them to this payout
//     await client.affiliateReferral.updateMany({
//       where: {
//         id: {
//           in: pendingReferrals.map((ref) => ref.id),
//         },
//       },
//       data: {
//         payoutId: payout.id,
//         status: "paid",
//       },
//     })

//     // Update the affiliate's balance
//     await client.affiliateUser.update({
//       where: { id: affiliate.id },
//       data: {
//         balance: { decrement: payoutAmount },
//       },
//     })

//     return {
//       success: true,
//       payout: {
//         id: payout.id,
//         amount: payoutAmount,
//       },
//     }
//   } catch (error) {
//     console.error("Error requesting affiliate payout:", error)
//     return {
//       success: false,
//       message: "Failed to request payout.",
//     }
//   }
// }

// // Helper function to generate a unique referral code
// function generateReferralCode(name: string): string {
//   const baseCode = name
//     .toLowerCase()
//     .replace(/[^a-z0-9]/g, "")
//     .substring(0, 8)

//   const uniqueId = uuidv4().substring(0, 6)

//   return `${baseCode}${uniqueId}`
// }

"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

import { v4 as uuidv4 } from "uuid"
import { client } from "@/lib/prisma"
import { onCurrentUser } from "@/actions/user"
import { onUserInfor } from "../user"

// Types
export type AffiliateRegistrationData = {
  name: string
  email: string
  bio?: string
  paymentDetails?: {
    paymentMethod: string
    paypalEmail?: string
    bankName?: string
    accountNumber?: string
    routingNumber?: string
  }
}

// Register as an affiliate (both users and non-users)
export async function registerAsAffiliate(programId: string, data: AffiliateRegistrationData) {
  try {
    // Get current user if logged in
    let userId = null
    try {
      const userResponse = await onUserInfor()
      if (userResponse) {
        userId = userResponse.data?.id
      }
    } catch (error) {
      // User not authenticated, continue as guest
      console.log("User not authenticated, registering as guest affiliate")
    }

    // Check if this email is already registered as an affiliate
    const existingAffiliate = await client.affiliateUser.findUnique({
      where: { email: data.email },
    })

    if (existingAffiliate) {
      return {
        success: false,
        message: "This email is already registered as an affiliate.",
      }
    }

    // Generate a unique referral code
    const referralCode = generateReferralCode(data.name)

    // Get the commission rate from the program
    const program = await client.affiliateProgram.findUnique({
      where: { id: programId },
    })

    if (!program || program.status !== "active") {
      return {
        success: false,
        message: "Affiliate program not found or inactive.",
      }
    }

    // Create the affiliate user - paymentDetails is a JSON field in the schema
    const newAffiliate = await client.affiliateUser.create({
      data: {
        userId: userId,
        name: data.name,
        email: data.email,
        referralCode,
        bio: data.bio,
        paymentDetails: data.paymentDetails || undefined, // Direct assignment for JSON fields
        programId: programId, // Use direct ID reference
        commissionRate: program.commissionRate, // Use program default
        isApproved: program.name.toLowerCase().includes("auto-approve"), // Auto-approve if program name contains 'auto-approve'
      },
    })

    return {
      success: true,
      affiliate: {
        id: newAffiliate.id,
        name: newAffiliate.name,
        referralCode: newAffiliate.referralCode,
        status: newAffiliate.status,
      },
    }
  } catch (error) {
    console.error("Error registering affiliate:", error)
    return {
      success: false,
      message: "Failed to register as affiliate.",
    }
  }
}

export async function generateReferralLink(
  affiliateId: string,
  baseUrl: string = process.env.NEXT_PUBLIC_APP_URL || "",
) {
  try {
    const affiliate = await client.affiliateUser.findUnique({
      where: { id: affiliateId },
    })

    if (!affiliate || affiliate.status !== "active") {
      return {
        success: false,
        message: "Affiliate not found or inactive.",
      }
    }

    const referralLink = `${baseUrl}/ref/${affiliate.referralCode}`

    return {
      success: true,
      referralLink,
    }
  } catch (error) {
    console.error("Error generating referral link:", error)
    return {
      success: false,
      message: "Failed to generate referral link.",
    }
  }
}

// Track a referral click
export async function trackAffiliateClick(
  referralCode: string,
  ipAddress?: string,
  userAgent?: string,
  referrer?: string,
) {
  try {
    // Find the affiliate by referral code
    const affiliate = await client.affiliateUser.findFirst({
      where: { referralCode },
    })

    if (!affiliate) {
      return {
        success: false,
        message: "Invalid referral code.",
      }
    }

    // Record the click - using direct ID reference
    await client.affiliateClick.create({
      data: {
        ipAddress,
        userAgent,
        referrer,
        affiliateId: affiliate.id,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error tracking affiliate click:", error)
    return {
      success: false,
      message: "Failed to track affiliate click.",
    }
  }
}

// Record a conversion/referral
export async function recordAffiliateReferral(
  referralCode: string,
  userId: string | null,
  conversionType: string,
  amount: number,
) {
  try {
    // Find the affiliate by referral code
    const affiliate = await client.affiliateUser.findFirst({
      where: { referralCode },
    })

    if (!affiliate || affiliate.status !== "active") {
      return {
        success: false,
        message: "Invalid referral code or inactive affiliate.",
      }
    }

    // Get the commission rate (either custom for the affiliate or the program default)
    const commissionRate =
      affiliate.commissionRate ||
      (
        await client.affiliateProgram.findUnique({
          where: { id: affiliate.programId },
        })
      )?.commissionRate ||
      0

    // Calculate the commission amount
    const commissionAmount = amount * (commissionRate / 100)

    // Record the referral using direct ID references
    const referral = await client.affiliateReferral.create({
      data: {
        referredUserId: userId,
        conversionType,
        amount,
        commissionAmount,
        affiliateId: affiliate.id,
        programId: affiliate.programId,
      },
    })

    // Update the affiliate's balance
    await client.affiliateUser.update({
      where: { id: affiliate.id },
      data: {
        balance: { increment: commissionAmount },
        totalEarned: { increment: commissionAmount },
      },
    })

    // Update click to mark as converted
    if (userId) {
      await client.affiliateClick.updateMany({
        where: {
          affiliateId: affiliate.id,
          converted: false,
        },
        data: {
          converted: true,
        },
      })
    }

    return {
      success: true,
      referral: {
        id: referral.id,
        commissionAmount,
      },
    }
  } catch (error) {
    console.error("Error recording affiliate referral:", error)
    return {
      success: false,
      message: "Failed to record affiliate referral.",
    }
  }
}

// Get affiliate dashboard data for a user
export async function getAffiliateDashboard(affiliateId: string) {
  try {
    const affiliate = await client.affiliateUser.findUnique({
      where: { id: affiliateId },
      include: {
        program: true,
      },
    })

    if (!affiliate) {
      return {
        success: false,
        message: "Affiliate not found.",
      }
    }

    // Get statistics
    const clicksCount = await client.affiliateClick.count({
      where: { affiliateId },
    })

    const referralsCount = await client.affiliateReferral.count({
      where: { affiliateId },
    })

    const pendingReferrals = await client.affiliateReferral.count({
      where: {
        affiliateId,
        status: "pending",
      },
    })

    const recentReferrals = await client.affiliateReferral.findMany({
      where: { affiliateId },
      take: 5,
      orderBy: { conversionDate: "desc" },
      include: {
        referredUser: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
      },
    })

    const convertedClicks = await client.affiliateClick.count({
      where: {
        affiliateId,
        converted: true,
      },
    })

    const conversionRate = clicksCount > 0 ? (convertedClicks / clicksCount) * 100 : 0

    const payouts = await client.affiliatePayout.findMany({
      where: { affiliateId },
      take: 5,
      orderBy: { createdAt: "desc" },
    })

    // Calculate performance metrics
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const monthlyReferrals = await client.affiliateReferral.findMany({
      where: {
        affiliateId,
        conversionDate: {
          gte: new Date(currentYear, currentMonth, 1),
          lt: new Date(currentYear, currentMonth + 1, 1),
        },
      },
    })

    const monthlyEarnings = monthlyReferrals.reduce((total, ref) => total + ref.commissionAmount, 0)

    return {
      success: true,
      dashboardData: {
        affiliate,
        stats: {
          clicks: clicksCount,
          referrals: referralsCount,
          pendingReferrals,
          conversionRate,
          balance: affiliate.balance,
          totalEarned: affiliate.totalEarned,
          monthlyEarnings,
        },
        recentReferrals,
        recentPayouts: payouts,
      },
    }
  } catch (error) {
    console.error("Error fetching affiliate dashboard:", error)
    return {
      success: false,
      message: "Failed to fetch affiliate dashboard.",
    }
  }
}

// Get affiliate leaderboard
export async function getAffiliateLeaderboard(limit = 10) {
  try {
    const topAffiliates = await client.affiliateUser.findMany({
      where: {
        status: "active",
        isApproved: true,
      },
      orderBy: {
        totalEarned: "desc",
      },
      take: limit,
      select: {
        id: true,
        name: true,
        totalEarned: true,
        userId: true,
        bio: true,
        _count: {
          select: {
            referrals: true,
          },
        },
      },
    })

    return {
      success: true,
      leaderboard: topAffiliates,
    }
  } catch (error) {
    console.error("Error fetching affiliate leaderboard:", error)
    return {
      success: false,
      message: "Failed to fetch affiliate leaderboard.",
    }
  }
}

// Request a payout
export async function requestAffiliatePayout(affiliateId: string, paymentMethod: string, notes?: string) {
  try {
    const affiliate = await client.affiliateUser.findUnique({
      where: { id: affiliateId },
      include: { program: true },
    })

    if (!affiliate) {
      return {
        success: false,
        message: "Affiliate not found.",
      }
    }

    if (affiliate.balance < affiliate.program.minimumPayout) {
      return {
        success: false,
        message: `Minimum payout amount of $${affiliate.program.minimumPayout} not reached.`,
      }
    }

    // Get pending referrals to include in this payout
    const pendingReferrals = await client.affiliateReferral.findMany({
      where: {
        affiliateId,
        status: "approved",
        payoutId: null,
      },
    })

    if (pendingReferrals.length === 0) {
      return {
        success: false,
        message: "No approved referrals available for payout.",
      }
    }

    const payoutAmount = pendingReferrals.reduce((total, ref) => total + ref.commissionAmount, 0)

    // Create the payout using direct ID references
    const payout = await client.affiliatePayout.create({
      data: {
        amount: payoutAmount,
        paymentMethod,
        notes,
        affiliateId: affiliate.id,
        programId: affiliate.program.id,
      },
    })

    // Update the referrals to link them to this payout
    await client.affiliateReferral.updateMany({
      where: {
        id: {
          in: pendingReferrals.map((ref) => ref.id),
        },
      },
      data: {
        payoutId: payout.id,
        status: "paid",
      },
    })

    // Update the affiliate's balance
    await client.affiliateUser.update({
      where: { id: affiliate.id },
      data: {
        balance: { decrement: payoutAmount },
      },
    })

    return {
      success: true,
      payout: {
        id: payout.id,
        amount: payoutAmount,
      },
    }
  } catch (error) {
    console.error("Error requesting affiliate payout:", error)
    return {
      success: false,
      message: "Failed to request payout.",
    }
  }
}

// Helper function to generate a unique referral code
function generateReferralCode(name: string): string {
  const baseCode = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .substring(0, 8)

  const uniqueId = uuidv4().substring(0, 6)

  return `${baseCode}${uniqueId}`
}


//////



// // Register as an affiliate (both users and non-users)
// export async function registerAsAffiliate(programId: string, data: AffiliateRegistrationData) {
//   try {
//     const userd = await onCurrentUser()
//     // Get current user if logged in
//     const { userId } = userd.id

//     if (!userId) {
//       return {
//         success: false,
//         message: "You must be logged in to register as an affiliate.",
//       }
//     }

//     // If user is logged in, get their UUID from the database
//     let userUuid = null
//     if (userId) {
//       const user = await prisma.user.findUnique({
//         where: { clerkId },
//         select: { id: true, email: true, firstname: true, lastname: true },
//       })

//       if (user) {
//         userUuid = user.id

//         // If no name/email provided in data, use the user's info
//         if (!data.name) {
//           data.name = `${user.firstname || ""} ${user.lastname || ""}`.trim() || "User"
//         }

//         if (!data.email) {
//           data.email = user.email
//         }
//       }
//     }

//     // Validate required data
//     if (!data.name || !data.email) {
//       return {
//         success: false,
//         message: "Name and email are required.",
//       }
//     }

//     // Check if this email is already registered as an affiliate
//     const existingAffiliate = await prisma.affiliateUser.findFirst({
//       where: { email: data.email },
//     })

//     if (existingAffiliate) {
//       return {
//         success: false,
//         message: "This email is already registered as an affiliate.",
//       }
//     }

//     // Generate a unique referral code
//     const referralCode = generateReferralCode(data.name)

//     // Get the commission rate from the program
//     const program = await prisma.affiliateProgram.findUnique({
//       where: { id: programId },
//     })

//     if (!program || program.status !== "active") {
//       return {
//         success: false,
//         message: "Affiliate program not found or inactive.",
//       }
//     }

//     // Create the affiliate user
//     const newAffiliate = await prisma.affiliateUser.create({
//       data: {
//         userId: userUuid, // Use the UUID, not the Clerk ID
//         name: data.name,
//         email: data.email,
//         referralCode,
//         bio: data.bio,
//         paymentDetails: data.paymentDetails ? data.paymentDetails : undefined,
//         program: { connect: { id: programId } },
//         commissionRate: program.commissionRate,
//         isApproved: program.name.toLowerCase().includes("auto-approve"),
//       },
//     })

//     // Revalidate relevant paths
//     revalidatePath("/dashboard/affiliate")
//     revalidatePath("/admin/affiliates/users")

//     return {
//       success: true,
//       affiliate: {
//         id: newAffiliate.id,
//         name: newAffiliate.name,
//         referralCode: newAffiliate.referralCode,
//         status: newAffiliate.status,
//       },
//     }
//   } catch (error) {
//     console.error("Error registering affiliate:", error)
//     return {
//       success: false,
//       message: "Failed to register as affiliate.",
//     }
//   }
// }


// // Other functions remain the same...

