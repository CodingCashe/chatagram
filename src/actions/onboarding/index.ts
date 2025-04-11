// // app/actions/onboarding.ts

// 'use server'

// import { revalidatePath } from 'next/cache'
// import { client } from '@/lib/prisma'
// import { onCurrentUser } from '@/actions/user'

// // Initialize onboarding progress
// export const initializeOnboarding = async (userType: 'influencer' | 'regular', totalSteps: number) => {
//   const user = await onCurrentUser()
  
//   try {
//     // Check if onboarding already exists
//     const existingProgress = await client.onboardingProgress.findUnique({
//       where: { userId: user.id }
//     })
    
//     if (existingProgress) {
//       return { 
//         status: 200, 
//         data: 'Onboarding already initialized', 
//         progress: existingProgress 
//       }
//     }
    
//     // Create new onboarding progress
//     const progress = await client.onboardingProgress.create({
//       data: {
//         userId: user.id,
//         userType,
//         totalSteps,
//         steps: {
//           create: Array.from({ length: totalSteps }, (_, i) => ({
//             stepNumber: i + 1,
//             stepName: getStepName(userType, i + 1),
//             status: i === 0 ? 'IN_PROGRESS' : 'NOT_STARTED'
//           }))
//         }
//       },
//       include: {
//         steps: true
//       }
//     })
    
//     return { status: 200, data: 'Onboarding initialized', progress }
//   } catch (error) {
//     console.error('Error initializing onboarding:', error)
//     return { status: 500, data: 'Failed to initialize onboarding' }
//   }
// }

// // Update onboarding step
// export const updateOnboardingStep = async (
//   stepNumber: number, 
//   status: 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED',
//   stepData?: any
// ) => {
//   const user = await onCurrentUser()
  
//   try {
//     // Get onboarding progress
//     const progress = await client.onboardingProgress.findUnique({
//       where: { userId: user.id },
//       include: { steps: true }
//     })
    
//     if (!progress) {
//       return { status: 404, data: 'Onboarding not initialized' }
//     }
    
//     // Update step
//     const updatedStep = await client.onboardingStep.update({
//       where: {
//         progressId_stepNumber: {
//           progressId: progress.id,
//           stepNumber
//         }
//       },
//       data: {
//         status,
//         data: stepData ? JSON.stringify(stepData) : undefined,
//         startedAt: status === 'IN_PROGRESS' && !progress.steps.find(s => s.stepNumber === stepNumber)?.startedAt 
//           ? new Date() 
//           : undefined,
//         completedAt: status === 'COMPLETED' ? new Date() : undefined
//       }
//     })
    
//     // Update progress
//     const updatedProgress = await client.onboardingProgress.update({
//       where: { id: progress.id },
//       data: {
//         currentStep: status === 'COMPLETED' ? stepNumber + 1 : stepNumber,
//         lastActiveAt: new Date(),
//         completedAt: status === 'COMPLETED' && stepNumber === progress.totalSteps ? new Date() : undefined
//       },
//       include: { steps: true }
//     })
    
//     // If this is the final step and it's completed, update the user's profile
//     if (status === 'COMPLETED' && stepNumber === progress.totalSteps) {
//       await finalizeOnboarding(user.id, progress.userType, progress.steps)
//     }
    
//     return { 
//       status: 200, 
//       data: 'Step updated', 
//       step: updatedStep,
//       progress: updatedProgress
//     }
//   } catch (error) {
//     console.error('Error updating onboarding step:', error)
//     return { status: 500, data: 'Failed to update onboarding step' }
//   }
// }

// // Save specific onboarding data
// export const saveOnboardingData = async (
//   stepNumber: number,
//   data: any
// ) => {
//   const user = await onCurrentUser()
  
//   try {
//     // Get onboarding progress
//     const progress = await client.onboardingProgress.findUnique({
//       where: { userId: user.id },
//       include: { steps: true }
//     })
    
//     if (!progress) {
//       return { status: 404, data: 'Onboarding not initialized' }
//     }
    
//     // Update step data
//     const updatedStep = await client.onboardingStep.update({
//       where: {
//         progressId_stepNumber: {
//           progressId: progress.id,
//           stepNumber
//         }
//       },
//       data: {
//         data,
//         status: 'IN_PROGRESS',
//         startedAt: progress.steps.find(s => s.stepNumber === stepNumber)?.startedAt || new Date()
//       }
//     })
    
//     // Update progress
//     await client.onboardingProgress.update({
//       where: { id: progress.id },
//       data: {
//         lastActiveAt: new Date()
//       }
//     })
    
//     return { 
//       status: 200, 
//       data: 'Data saved', 
//       step: updatedStep
//     }
//   } catch (error) {
//     console.error('Error saving onboarding data:', error)
//     return { status: 500, data: 'Failed to save onboarding data' }
//   }
// }

// // Complete onboarding
// export const completeOnboarding = async () => {
//   const user = await onCurrentUser()
  
//   try {
//     // Get onboarding progress
//     const progress = await client.onboardingProgress.findUnique({
//       where: { userId: user.id },
//       include: { steps: true }
//     })
    
//     if (!progress) {
//       return { status: 404, data: 'Onboarding not initialized' }
//     }
    
//     // Mark all steps as completed
//     await Promise.all(
//       progress.steps.map(step => 
//         client.onboardingStep.update({
//           where: {
//             progressId_stepNumber: {
//               progressId: progress.id,
//               stepNumber: step.stepNumber
//             }
//           },
//           data: {
//             status: 'COMPLETED',
//             completedAt: new Date()
//           }
//         })
//       )
//     )
    
//     // Update progress
//     const updatedProgress = await client.onboardingProgress.update({
//       where: { id: progress.id },
//       data: {
//         completedAt: new Date()
//       },
//       include: { steps: true }
//     })
    
//     // Finalize onboarding
//     await finalizeOnboarding(user.id, progress.userType, updatedProgress.steps)
    
//     return { 
//       status: 200, 
//       data: 'Onboarding completed', 
//       progress: updatedProgress
//     }
//   } catch (error) {
//     console.error('Error completing onboarding:', error)
//     return { status: 500, data: 'Failed to complete onboarding' }
//   }
// }

// // Helper function to finalize onboarding
// async function finalizeOnboarding(
//   userId: string, 
//   userType: string, 
//   steps: any[]
// ) {
//   // Collect all data from steps
//   const allStepData = steps.reduce((acc, step) => {
//     return { ...acc, ...(step.data || {}) }
//   }, {})
  
//   if (userType === 'influencer') {
//     // Create or update influencer profile
//     await createInfluencerProfile(userId, allStepData)
//   } else {
//     // Create or update business profile
//     await createBusinessProfile(userId, allStepData)
//   }
  
//   // Revalidate paths
//   revalidatePath('/dashboard')
//   revalidatePath('/influencer-dashboard')
// }

// // Helper function to create influencer profile
// async function createInfluencerProfile(userId: string, data: any) {
//   // Check if influencer profile exists
//   const existingInfluencer = await client.influencer.findUnique({
//     where: { userId }
//   })
  
//   // Extract social handles
//   const socialAccounts = Object.entries(data.socialHandles || {}).map(([platform, username]) => ({
//     platform,
//     username: username as string,
//     url: getPlatformUrl(platform, username as string)
//   }))
  
//   if (existingInfluencer) {
//     // Update existing profile
//     await client.influencer.update({
//       where: { userId },
//       data: {
//         name: data.name || existingInfluencer.name,
//         username: data.username || existingInfluencer.username,
//         bio: data.bio || existingInfluencer.bio,
//         profilePicture: data.profileImage || existingInfluencer.profilePicture,
//         niche: data.selectedCategories?.join(', ') || existingInfluencer.niche,
//         email: data.email || existingInfluencer.email,
//         personalityType: data.personalityResult || existingInfluencer.personalityType,
//         contentStyle: data.selectedContentStyle || existingInfluencer.contentStyle,
//         selectedContentDays: data.selectedContentDays || existingInfluencer.selectedContentDays,
//         incomeGoal: data.incomeGoal || existingInfluencer.incomeGoal,
//         brandFit: data.aiAnalysisResult?.brandFit || existingInfluencer.brandFit,
//         onboardingCompleted: true,
//         // Update social accounts
//         socialAccounts: {
//           deleteMany: {},
//           create: socialAccounts
//         },
//         // Update rates
//         rates: {
//           upsert: {
//             where: {
//               influencerId: existingInfluencer.id,
//             },
//             create: {
//               postRate: data.incomeGoal ? data.incomeGoal / 10 : 100,
//               videoRate: data.incomeGoal ? data.incomeGoal / 5 : 200,
//               storyRate: data.incomeGoal ? data.incomeGoal / 20 : 50,
//               platform: data.incomeGoal?.platform,
//               rate: data.incomeGoal?.rate,
//               contentType: data.incomeGoal?.contentType
//             },
//             update: {
//               postRate: data.incomeGoal ? data.incomeGoal / 10 : 100,
//               videoRate: data.incomeGoal ? data.incomeGoal / 5 : 200,
//               storyRate: data.incomeGoal ? data.incomeGoal / 20 : 50,
//               platform: data.incomeGoal?.platform,
//               rate: data.incomeGoal?.rate,
//               contentType: data.incomeGoal?.contentType
//             }
//           }
//         }
//       }
//     })
//   } else {
//     // Create new profile
//     await client.influencer.create({
      
//       data: {
//         userId,
//         name: data.name || 'New Influencer',
//         username: data.username || `user_${userId.substring(0, 8)}`,
//         bio: data.bio || '',
//         profilePicture: data.profileImage || '',
//         niche: data.selectedCategories?.join(', ') || '',
//         email: data.email || '',
//         personalityType: data.personalityResult || '',
//         contentStyle: data.selectedContentStyle || '',
//         selectedContentDays: data.selectedContentDays || [],
//         incomeGoal: data.incomeGoal || 0,
//         onboardingCompleted: true,
//         // Create social accounts
//         socialAccounts: {
//           create: socialAccounts
//         },
//         // Create rates
//         rates: {
//           create: {
//             postRate: data.incomeGoal ? data.incomeGoal / 10 : 100,
//             videoRate: data.incomeGoal ? data.incomeGoal / 5 : 200,
//             storyRate: data.incomeGoal ? data.incomeGoal / 20 : 50
//           }
//         }
//       }
//     })
//   }
// }

// // Helper function to create business profile
// async function createBusinessProfile(userId: string, data: any) {
//   // Extract business data
//   const businessData = {
//     businessName: data.businessName || 'My Business',
//     businessType: data.businessType || 'Other',
//     businessDescription: data.businessDescription || '',
//     industry: data.industry || 'Other',
//     targetAudience: data.targetAudience || 'General',
//     website: data.website || '',
//     instagramHandle: data.socialHandles?.Instagram || '',
//     welcomeMessage: data.welcomeMessage || 'Welcome to our business!',
//     responseLanguage: data.responseLanguage || 'English',
//     businessHours: data.businessHours || '9-5',
//     autoReplyEnabled: true,
//     promotionMessage: data.promotionMessage || '',
//     learningTopics: data.selectedLearningTopics || [],
//     growthChallenges: data.selectedGrowthChallenges || [],
//     goalStatement: data.goalStatement || '',
//     onboardingCompleted: true
//   }
  
//   // Call your existing function
//   return await client.user.update({
//     where: {
//       id: userId,
//     },
//     data: {
//       businesses: {
//         create: businessData,
//       },
//     },
//   })
// }

// // Helper function to get step name
// function getStepName(userType: string, stepNumber: number): string {
//   if (userType === 'influencer') {
//     const steps = [
//       'User Type Selection',
//       'Profile Picture',
//       'Content Categories',
//       'Social Media Handles',
//       'Contact Information',
//       'Phone Verification',
//       'Content Strategy',
//       'Content Style',
//       'Income Goals',
//       'Achievements'
//     ]
//     return steps[stepNumber - 1] || `Step ${stepNumber}`
//   } else {
//     const steps = [
//       'User Type Selection',
//       'Profile Picture',
//       'Content Categories',
//       'Social Media Handles',
//       'Contact Information',
//       'Phone Verification',
//       'Learning Goals',
//       'Personality Quiz',
//       'Income Goals'
//     ]
//     return steps[stepNumber - 1] || `Step ${stepNumber}`
//   }
// }

// // Helper function to get platform URL
// function getPlatformUrl(platform: string, username: string): string {
//   switch (platform) {
//     case 'Instagram':
//       return `https://instagram.com/${username}`
//     case 'TikTok':
//       return `https://tiktok.com/@${username}`
//     case 'YouTube':
//       return `https://youtube.com/@${username}`
//     case 'Twitter':
//       return `https://twitter.com/${username}`
//     default:
//       return ''
//   }
// }

"use server"

import { revalidatePath } from "next/cache"
import { client } from "@/lib/prisma"
import { onCurrentUser, onUserInfor } from "@/actions/user"


export const updateOnboardingStep = async (
  stepNumber: number,
  status: "IN_PROGRESS" | "COMPLETED" | "SKIPPED",
  stepData?: any,
) => {
  const userid = await onUserInfor()
  const user = await onCurrentUser()
  const userId = userid.data?.id

  try {
    // Get onboarding progress with steps
    const progress = await client.onboardingProgress.findUnique({
      where: { userId },
      include: { steps: true },
    })

    if (!progress) {
      return { status: 404, data: "Onboarding not initialized" }
    }

    // Validate step number
    if (stepNumber < 1 || stepNumber > progress.totalSteps) {
      return { status: 400, data: "Invalid step number" }
    }

    // Check if step exists
    const stepExists = progress.steps.some(step => step.stepNumber === stepNumber);
    if (!stepExists) {
      // Create the step if it doesn't exist
      await client.onboardingStep.create({
        data: {
          progressId: progress.id,
          stepNumber,
          stepName: getStepName(progress.userType, stepNumber),
          status: "NOT_STARTED", // Initial status
        }
      });
    }

    // Now update the step (it should exist now)
    const updatedStep = await client.onboardingStep.update({
      where: {
        progressId_stepNumber: {
          progressId: progress.id,
          stepNumber,
        },
      },
      data: {
        status,
        data: stepData ? JSON.stringify(stepData) : undefined,
        startedAt: status === "IN_PROGRESS" ? new Date() : undefined,
        completedAt: status === "COMPLETED" ? new Date() : undefined,
      },
    })

    // Rest of your update logic...
    const updatedProgress = await client.onboardingProgress.update({
      where: { id: progress.id },
      data: {
        currentStep: status === "COMPLETED" ? stepNumber + 1 : stepNumber,
        lastActiveAt: new Date(),
        completedAt: status === "COMPLETED" && stepNumber === progress.totalSteps ? new Date() : undefined,
      },
      include: { steps: true },
    })

    if (status === "COMPLETED" && stepNumber === progress.totalSteps) {
      await finalizeOnboarding(user.id, progress.userType, progress.steps)
    }

    return {
      status: 200,
      data: "Step updated",
      step: updatedStep,
      progress: updatedProgress,
    }
  } catch (error) {
    console.error("Error updating onboarding step:", error)
    return { status: 500, data: "Failed to update onboarding step" }
  }
}

// Initialize onboarding progress
export const initializeOnboarding = async (userType: "influencer" | "regular", totalSteps: number) => {
  const userid = await onUserInfor()
  const user = await onCurrentUser()
  const userId = userid.data?.id

  try {
    // Check if onboarding already exists
    const existingProgress = await client.onboardingProgress.findUnique({
      where: { userId },
    })

    if (existingProgress) {
      return {
        status: 200,
        data: "Onboarding already initialized",
        progress: existingProgress,
      }
    }

    // Create new onboarding progress
    const progress = await client.onboardingProgress.create({
      data: {
        userId: userId || "123456",
        userType,
        totalSteps,
        steps: {
          create: Array.from({ length: totalSteps }, (_, i) => ({
            stepNumber: i + 1,
            stepName: getStepName(userType, i + 1),
            status: i === 0 ? "IN_PROGRESS" : "NOT_STARTED",
          })),
        },
      },
      include: {
        steps: true,
      },
    })

    return { status: 200, data: "Onboarding initialized", progress }
  } catch (error) {
    console.error("Error initializing onboarding:", error)
    return { status: 500, data: "Failed to initialize onboarding" }
  }
}

// Update onboarding step
export const updateOnboardingStepp = async (
  stepNumber: number,
  status: "IN_PROGRESS" | "COMPLETED" | "SKIPPED",
  stepData?: any,
) => {
  const userid = await onUserInfor()
  const user = await onCurrentUser()
  const userId = userid.data?.id


  try {
    // Get onboarding progress
    const progress = await client.onboardingProgress.findUnique({
      where: { userId },
      include: { steps: true },
    })

    if (!progress) {
      return { status: 404, data: "Onboarding not initialized" }
    }

    // Update step
    const updatedStep = await client.onboardingStep.update({
      where: {
        progressId_stepNumber: {
          progressId: progress.id,
          stepNumber,
        },
      },
      data: {
        status,
        data: stepData ? JSON.stringify(stepData) : undefined,
        startedAt:
          status === "IN_PROGRESS" && !progress.steps.find((s) => s.stepNumber === stepNumber)?.startedAt
            ? new Date()
            : undefined,
        completedAt: status === "COMPLETED" ? new Date() : undefined,
      },
    })

    // Update progress
    const updatedProgress = await client.onboardingProgress.update({
      where: { id: progress.id },
      data: {
        currentStep: status === "COMPLETED" ? stepNumber + 1 : stepNumber,
        lastActiveAt: new Date(),
        completedAt: status === "COMPLETED" && stepNumber === progress.totalSteps ? new Date() : undefined,
      },
      include: { steps: true },
    })

    // If this is the final step and it's completed, update the user's profile
    if (status === "COMPLETED" && stepNumber === progress.totalSteps) {
      await finalizeOnboarding(user.id, progress.userType, progress.steps)
    }

    return {
      status: 200,
      data: "Step updated",
      step: updatedStep,
      progress: updatedProgress,
    }
  } catch (error) {
    console.error("Error updating onboarding step:", error)
    return { status: 500, data: "Failed to update onboarding step" }
  }
}

// Save specific onboarding data
export const saveOnboardingData = async (stepNumber: number, data: any) => {
  const userid = await onUserInfor()
  const userId = userid.data?.id

  try {
    // Get onboarding progress
    const progress = await client.onboardingProgress.findUnique({
      where: { userId },
      include: { steps: true },
    })

    if (!progress) {
      return { status: 404, data: "Onboarding not initialized" }
    }

    // Update step data
    const updatedStep = await client.onboardingStep.update({
      where: {
        progressId_stepNumber: {
          progressId: progress.id,
          stepNumber,
        },
      },
      data: {
        data,
        status: "IN_PROGRESS",
        startedAt: progress.steps.find((s) => s.stepNumber === stepNumber)?.startedAt || new Date(),
      },
    })

    // Update progress
    await client.onboardingProgress.update({
      where: { id: progress.id },
      data: {
        lastActiveAt: new Date(),
      },
    })

    return {
      status: 200,
      data: "Data saved",
      step: updatedStep,
    }
  } catch (error) {
    console.error("Error saving onboarding data:", error)
    return { status: 500, data: "Failed to save onboarding data" }
  }
}

// Complete onboarding
export const completeOnboarding = async () => {
  const userid = await onUserInfor()
  const user = await onCurrentUser()
  const userId = userid.data?.id

  try {
    // Get onboarding progress
    const progress = await client.onboardingProgress.findUnique({
      where: { userId },
      include: { steps: true },
    })

    if (!progress) {
      return { status: 404, data: "Onboarding not initialized" }
    }

    // Mark all steps as completed
    await Promise.all(
      progress.steps.map((step) =>
        client.onboardingStep.update({
          where: {
            progressId_stepNumber: {
              progressId: progress.id,
              stepNumber: step.stepNumber,
            },
          },
          data: {
            status: "COMPLETED",
            completedAt: new Date(),
          },
        }),
      ),
    )

    // Update progress
    const updatedProgress = await client.onboardingProgress.update({
      where: { id: progress.id },
      data: {
        completedAt: new Date(),
      },
      include: { steps: true },
    })

    // Finalize onboarding
    await finalizeOnboarding( userId||user.id, progress.userType, updatedProgress.steps)

    return {
      status: 200,
      data: "Onboarding completed",
      progress: updatedProgress,
    }
  } catch (error) {
    console.error("Error completing onboarding:", error)
    return { status: 500, data: "Failed to complete onboarding" }
  }
}

// Helper function to finalize onboarding
async function finalizeOnboarding(userId: string, userType: string, steps: any[]) {
  // Collect all data from steps
  const allStepData = steps.reduce((acc, step) => {
    return { ...acc, ...(step.data || {}) }
  }, {})

  if (userType === "influencer") {
    // Create or update influencer profile
    await createInfluencerProfile(userId, allStepData)
  } else {
    // Create or update business profile
    await createBusinessProfile(userId, allStepData)
  }

  // Revalidate paths
  revalidatePath("/dashboard")
  revalidatePath("/influencers")
}

// Helper function to create influencer profile
async function createInfluencerProfile(userId: string, data: any) {
  // Check if influencer profile exists
  const existingInfluencer = await client.influencer.findUnique({
    where: { userId },
  })

  // Extract social handles and format them correctly for Prisma
  const socialAccounts = Object.entries(data.socialHandles || {}).map(([platform, username]) => ({
    platform,
    handle: username as string, // Changed from username to handle
    username: username as string, // Keep username for backward compatibility
    url: getPlatformUrl(platform, username as string),
  }))

  if (existingInfluencer) {
    // Update existing profile
    await client.influencer.update({
      where: { userId },
      data: {
        name: data.name || existingInfluencer.name,
        username: data.username || existingInfluencer.username,
        bio: data.bio || existingInfluencer.bio,
        profilePicture: data.profileImage || existingInfluencer.profilePicture,
        niche: data.selectedCategories?.join(", ") || existingInfluencer.niche,
        email: data.email || existingInfluencer.email,
        personalityType: data.personalityResult || existingInfluencer.personalityType,
        contentStyle: data.selectedContentStyle || existingInfluencer.contentStyle,
        selectedContentDays: data.selectedContentDays || existingInfluencer.selectedContentDays,
        incomeGoal: data.incomeGoal || existingInfluencer.incomeGoal,
        brandFit: data.aiAnalysisResult?.brandFit || existingInfluencer.brandFit,
        onboardingCompleted: true,
        // Update social accounts with correctly formatted data
        socialAccounts: {
          deleteMany: {},
          create: socialAccounts,
        },
        // Update rates
        rates: {
          upsert: {
            where: {
              influencerId: existingInfluencer.id,
            },
            create: {
              postRate: data.incomeGoal ? data.incomeGoal / 10 : 100,
              videoRate: data.incomeGoal ? data.incomeGoal / 5 : 200,
              storyRate: data.incomeGoal ? data.incomeGoal / 20 : 50,
              platform: data.incomeGoal?.platform,
              rate: data.incomeGoal?.rate,
              contentType: data.incomeGoal?.contentType,
            },
            update: {
              postRate: data.incomeGoal ? data.incomeGoal / 10 : 100,
              videoRate: data.incomeGoal ? data.incomeGoal / 5 : 200,
              storyRate: data.incomeGoal ? data.incomeGoal / 20 : 50,
              platform: data.incomeGoal?.platform,
              rate: data.incomeGoal?.rate,
              contentType: data.incomeGoal?.contentType,
            },
          },
        },
      },
    })
  } else {
    // Create new profile
    await client.influencer.create({
      data: {
        userId,
        name: data.name || "New Influencer",
        username: data.username || `user_${userId.substring(0, 8)}`,
        bio: data.bio || "",
        profilePicture: data.profileImage || "",
        niche: data.selectedCategories?.join(", ") || "",
        email: data.email || "",
        personalityType: data.personalityResult || "",
        contentStyle: data.selectedContentStyle || "",
        selectedContentDays: data.selectedContentDays || [],
        incomeGoal: data.incomeGoal || 0,
        onboardingCompleted: true,
        // Create social accounts with correctly formatted data
        socialAccounts: {
          create: socialAccounts,
        },
        // Create rates - using an array format for create
        rates: {
          create: [
            {
              postRate: data.incomeGoal ? data.incomeGoal / 10 : 100,
              videoRate: data.incomeGoal ? data.incomeGoal / 5 : 200,
              storyRate: data.incomeGoal ? data.incomeGoal / 20 : 50,
              platform: data.incomeGoal?.platform,
              rate: data.incomeGoal?.rate,
              contentType: data.incomeGoal?.contentType,
            },
          ],
        },
      },
    })
  }
}

// Helper function to create business profile
async function createBusinessProfile(userId: string, data: any) {
  // Extract business data
  const businessData = {
    businessName: data.businessName || "My Business",
    businessType: data.businessType || "Other",
    businessDescription: data.businessDescription || "",
    industry: data.industry || "Other",
    targetAudience: data.targetAudience || "General",
    website: data.website || "",
    instagramHandle: data.socialHandles?.Instagram || "",
    welcomeMessage: data.welcomeMessage || "Welcome to our business!",
    responseLanguage: data.responseLanguage || "English",
    businessHours: data.businessHours || "9-5",
    autoReplyEnabled: true,
    promotionMessage: data.promotionMessage || "",
    learningTopics: data.selectedLearningTopics || [],
    growthChallenges: data.selectedGrowthChallenges || [],
    goalStatement: data.goalStatement || "",
    onboardingCompleted: true,
  }

  // Call your existing function
  return await client.user.update({
    where: {
      id: userId,
    },
    data: {
      businesses: {
        create: businessData,
      },
    },
  })
}

// Helper function to get step name
function getStepName(userType: string, stepNumber: number): string {
  if (userType === "influencer") {
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
  } else {
    const steps = [
      "User Type Selection",
      "Profile Picture",
      "Content Categories",
      "Social Media Handles",
      "Contact Information",
      "Phone Verification",
      "Learning Goals",
      "Personality Quiz",
      "Income Goals",
    ]
    return steps[stepNumber - 1] || `Step ${stepNumber}`
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
