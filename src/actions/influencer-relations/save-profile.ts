"use server"

import { client } from "@/lib/prisma"
import { onUserInfor } from "@/actions/user"
import { revalidatePath } from "next/cache"

/**
 * Save or update an influencer profile with all related data
 */
export async function saveInfluencerProfile(data: {
  name?: string
  username?: string
  bio?: string
  profilePicture?: string
  location?: string
  niche?: string
  email?: string
  website?: string
  contactInfo?: any
  socialAccounts?: Array<{
    platform: string
    username: string
    handle?: string
    url?: string
  }>
  rates?: {
    postRate?: number
    videoRate?: number
    storyRate?: number
    platform?: string
    contentType?: string
  }
  personalityType?: string
  contentStyle?: string
  selectedContentDays?: number[]
  incomeGoal?: number
  brandCollabTypes?: string[]
  contentFrequency?: string
  goalStatement?: string
  onboardingCompleted?: boolean
}) {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    if (!userId) {
      return { status: 401, message: "Unauthorized" }
    }

    // Check if influencer profile already exists
    const existingProfile = await client.influencer.findUnique({
      where: { userId },
    })

    if (existingProfile) {
      // Update existing profile
      const updatedProfile = await client.influencer.update({
        where: { userId },
        data: {
          name: data.name || existingProfile.name,
          username: data.username || existingProfile.username,
          bio: data.bio,
          profilePicture: data.profilePicture,
          location: data.location,
          niche: data.niche,
          email: data.email,
          website: data.website,
          contactInfo: data.contactInfo ? JSON.stringify(data.contactInfo) : undefined,
          personalityType: data.personalityType,
          contentStyle: data.contentStyle,
          selectedContentDays: data.selectedContentDays,
          incomeGoal: data.incomeGoal,
          brandCollabTypes: data.brandCollabTypes,
          contentFrequency: data.contentFrequency,
          goalStatement: data.goalStatement,
          onboardingCompleted: data.onboardingCompleted,
        },
      })

      // Update social accounts if provided
      if (data.socialAccounts && data.socialAccounts.length > 0) {
        // Delete existing social accounts
        await client.socialAccount.deleteMany({
          where: { influencerId: existingProfile.id },
        })

        // Create new social accounts
        await Promise.all(
          data.socialAccounts.map((account) =>
            client.socialAccount.create({
              data: {
                influencerId: existingProfile.id,
                platform: account.platform,
                username: account.username,
                handle: account.handle || account.username,
                url: account.url || getPlatformUrl(account.platform, account.username),
              },
            }),
          ),
        )
      }

      // Update rates if provided
      if (data.rates) {
        const existingRates = await client.influencerRates.findUnique({
          where: { influencerId: existingProfile.id },
        })

        if (existingRates) {
          await client.influencerRates.update({
            where: { influencerId: existingProfile.id },
            data: {
              postRate: data.rates.postRate ?? existingRates.postRate,
              videoRate: data.rates.videoRate ?? existingRates.videoRate,
              storyRate: data.rates.storyRate ?? existingRates.storyRate,
              platform: data.rates.platform,
              contentType: data.rates.contentType,
            },
          })
        } else {
          await client.influencerRates.create({
            data: {
              influencerId: existingProfile.id,
              postRate: data.rates.postRate || 0,
              videoRate: data.rates.videoRate || 0,
              storyRate: data.rates.storyRate || 0,
              platform: data.rates.platform,
              contentType: data.rates.contentType,
            },
          })
        }
      }

      revalidatePath("/influencers")
      revalidatePath("/settings/profile")

      return { status: 200, message: "Profile updated successfully", data: updatedProfile }
    } else {
      // Create new profile
      if (!data.name || !data.username) {
        return { status: 400, message: "Name and username are required" }
      }

      const newProfile = await client.influencer.create({
        data: {
          userId,
          name: data.name,
          username: data.username,
          bio: data.bio,
          profilePicture: data.profilePicture,
          location: data.location,
          niche: data.niche,
          email: data.email,
          website: data.website,
          contactInfo: data.contactInfo ? JSON.stringify(data.contactInfo) : undefined,
          personalityType: data.personalityType,
          contentStyle: data.contentStyle,
          selectedContentDays: data.selectedContentDays || [],
          incomeGoal: data.incomeGoal,
          brandCollabTypes: data.brandCollabTypes || [],
          contentFrequency: data.contentFrequency,
          goalStatement: data.goalStatement,
          onboardingCompleted: data.onboardingCompleted || false,
        },
      })

      // Create social accounts if provided
      if (data.socialAccounts && data.socialAccounts.length > 0) {
        await Promise.all(
          data.socialAccounts.map((account) =>
            client.socialAccount.create({
              data: {
                influencerId: newProfile.id,
                platform: account.platform,
                username: account.username,
                handle: account.handle || account.username,
                url: account.url || getPlatformUrl(account.platform, account.username),
              },
            }),
          ),
        )
      }

      // Create rates if provided
      if (data.rates) {
        await client.influencerRates.create({
          data: {
            influencerId: newProfile.id,
            postRate: data.rates.postRate || 0,
            videoRate: data.rates.videoRate || 0,
            storyRate: data.rates.storyRate || 0,
            platform: data.rates.platform,
            contentType: data.rates.contentType,
          },
        })
      }

      revalidatePath("/influencers")
      revalidatePath("/settings/profile")

      return { status: 200, message: "Profile created successfully", data: newProfile }
    }
  } catch (error) {
    console.error("Error saving influencer profile:", error)
    return { status: 500, message: "Failed to save profile" }
  }
}

/**
 * Update the onboarding completion status for an influencer
 */
export async function updateProfileCompletionStatus(completed: boolean) {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    if (!userId) {
      return { status: 401, message: "Unauthorized" }
    }

    const influencer = await client.influencer.findUnique({
      where: { userId },
    })

    if (!influencer) {
      return { status: 404, message: "Influencer profile not found" }
    }

    await client.influencer.update({
      where: { userId },
      data: {
        onboardingCompleted: completed,
      },
    })

    revalidatePath("/influencer/dashboard")

    return { status: 200, message: "Profile completion status updated" }
  } catch (error) {
    console.error("Error updating profile completion status:", error)
    return { status: 500, message: "Failed to update profile completion status" }
  }
}

/**
 * Update the onboarding progress for an influencer
 */
export async function updateOnboardingProgress(step: number, data: any) {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    if (!userId) {
      return { status: 401, message: "Unauthorized" }
    }

    // Check if onboarding progress exists
    const existingProgress = await client.onboardingProgress.findUnique({
      where: { userId },
    })

    if (existingProgress) {
      // Update existing progress
      await client.onboardingProgress.update({
        where: { userId },
        data: {
          currentStep: step,
          lastActiveAt: new Date(),
        },
      })

      // Update step data
      await client.onboardingStep.updateMany({
        where: {
          progressId: existingProgress.id,
          stepNumber: step,
        },
        data: {
          status: "COMPLETED",
          completedAt: new Date(),
          data: JSON.stringify(data),
        },
      })
    } else {
      // Create new onboarding progress
      const newProgress = await client.onboardingProgress.create({
        data: {
          userId,
          userType: "influencer",
          currentStep: step,
          totalSteps: 10, // Assuming 10 steps for influencer onboarding
          lastActiveAt: new Date(),
        },
      })

      // Create steps
      await Promise.all(
        Array.from({ length: 10 }, (_, i) => i + 1).map((stepNumber) =>
          client.onboardingStep.create({
            data: {
              progressId: newProgress.id,
              stepNumber,
              stepName: getStepName(stepNumber),
              status: stepNumber < step ? "COMPLETED" : stepNumber === step ? "IN_PROGRESS" : "NOT_STARTED",
            //   data: stepNumber === step ? JSON.stringify(data) : null,
              completedAt: stepNumber < step ? new Date() : null,
            },
          }),
        ),
      )
    }

    revalidatePath("/influencer/dashboard")

    return { status: 200, message: "Onboarding progress updated" }
  } catch (error) {
    console.error("Error updating onboarding progress:", error)
    return { status: 500, message: "Failed to update onboarding progress" }
  }
}

// Helper function to get platform URL
function getPlatformUrl(platform: string, username: string): string {
  switch (platform) {
    case "Instagram":
      return `https://instagram.com/${username}`
    case "TikTok":
      return `https://tiktok.com/@${username}`
    case "YouTube":
      return `https://youtube.com/@${username}`
    case "Twitter":
      return `https://twitter.com/${username}`
    default:
      return ""
  }
}

// Helper function to get step name
function getStepName(stepNumber: number): string {
  const steps = [
    "User Type Selection",
    "Profile Picture",
    "Content Categories",
    "Social Media Handles",
    "Contact Information",
    "Phone Verification",
    "Content Strategy",
    "Content Style",
    "Income Goals",
    "Achievements",
  ]
  return steps[stepNumber - 1] || `Step ${stepNumber}`
}
