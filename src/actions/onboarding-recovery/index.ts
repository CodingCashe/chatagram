// app/actions/onboarding-recovery.ts

'use server'

import { client } from '@/lib/prisma'
import { sendEmail } from '@/lib/email-service'

// Find abandoned onboarding sessions
export const findAbandonedOnboarding = async () => {
  const threeDaysAgo = new Date()
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
  
  const abandonedSessions = await client.onboardingProgress.findMany({
    where: {
      completedAt: null,
      lastActiveAt: {
        lt: threeDaysAgo
      },
      abandonedAt: null
    },
    include: {
      user: true,
      steps: true
    }
  })
  
  return abandonedSessions
}

// Mark sessions as abandoned and send recovery emails
export const recoverAbandonedSessions = async () => {
  const abandonedSessions = await findAbandonedOnboarding()
  
  const results = await Promise.all(
    abandonedSessions.map(async (session) => {
      // Mark as abandoned
      await client.onboardingProgress.update({
        where: { id: session.id },
        data: {
          abandonedAt: new Date(),
          remindersSent: session.remindersSent + 1,
          lastReminderAt: new Date()
        }
      })
      
      // Calculate completion percentage
      const completedSteps = session.steps.filter(s => 
        s.status === 'COMPLETED' || s.status === 'SKIPPED'
      ).length
      
      const completionPercentage = Math.round(
        (completedSteps / session.totalSteps) * 100
      )
      
      // Generate recovery link
      const recoveryLink = `${process.env.NEXT_PUBLIC_APP_URL}/onboarding?resume=true&session=${session.id}`
      
      // Send recovery email
      // await sendEmail({
      //   to: session.user.email,
      //   subject: 'Complete Your Onboarding - You\'re Almost There!',
      //   html: 'onboarding-recovery',
      //   text: {
      //     name: session.user.firstname || 'there',
      //     completionPercentage,
      //     currentStep: session.currentStep,
      //     totalSteps: session.totalSteps,
      //     userType: session.userType,
      //     recoveryLink,
      //     lastActiveDate: session.lastActiveAt.toLocaleDateString()
      //   }
      // })
      sendEmail({
            to: session.user.email,
            subject: `Complete Your Onboarding - You are Almost There!`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>onboarding-recovery</h2>
                <p>Dear ${session.user.firstname},</p>
                <p>You are ${completionPercentage}% done with your onboarding, finish that so you can get the best features</p>              
                <p>If you have any questions, please don't hesitate to contact us.</p>
                <p>Thank you for your interest in us!</p>
                <p>Best regards,<br>Yazil</p>
              </div>
            `,
          })
      
      return {
        userId: session.userId,
        email: session.user.email,
        completionPercentage,
        emailSent: true
      }
    })
  )
  
  return {
    status: 200,
    data: `Processed ${results.length} abandoned sessions`,
    results
  }
}

// Resume onboarding session
export const resumeOnboarding = async (sessionId: string) => {
  try {
    const session = await client.onboardingProgress.findUnique({
      where: { id: sessionId },
      include: { steps: true }
    })
    
    if (!session) {
      return { status: 404, data: 'Session not found' }
    }
    
    // Update session
    await client.onboardingProgress.update({
      where: { id: sessionId },
      data: {
        lastActiveAt: new Date(),
        abandonedAt: null
      }
    })
    
    return {
      status: 200,
      data: 'Session resumed',
      session
    }
  } catch (error) {
    console.error('Error resuming session:', error)
    return { status: 500, data: 'Failed to resume session' }
  }
}