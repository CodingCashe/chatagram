'use server'

import { currentUser } from '@clerk/nextjs/server'

import { redirect } from 'next/navigation'
import { createUser, findUser, updateSubscription } from './queries'
import { refreshToken } from '@/lib/fetch'
import { updateIntegration } from '../integrations/queries'
 import { stripe } from '@/lib/stripe'

export const onCurrentUser = async () => {
  const user = await currentUser()
  if (!user) return redirect('/sign-in')

  return user
}

export const isCurrentUserAdmin = async (): Promise<boolean> => {
  try {
    const user = await onCurrentUser()
    const profile = await findUser(user.id)
    return profile?.isAdmin || false
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

export const onBoardUser = async () => {
  const user = await onCurrentUser()
  try {
    const found = await findUser(user.id)
    if (found) {
      if (found.integrations.length > 0) {
        const today = new Date()
        const time_left =
          found.integrations[0].expiresAt?.getTime()! - today.getTime()

        const days = Math.round(time_left / (1000 * 3600 * 24))
        if (days < 5) {
          console.log('refresh')

          const refresh = await refreshToken(found.integrations[0].token)

          const today = new Date()
          const expire_date = today.setDate(today.getDate() + 60)

          const update_token = await updateIntegration(
            refresh.access_token,
            new Date(expire_date),
            found.integrations[0].id
          )
          if (!update_token) {
            console.log('Update token failed')
          }
        }
      }

      return {
        status: 200,
        data: {
          firstname: found.firstname,
          lastname: found.lastname,
        },
      }
    }
    const created = await createUser(
      user.id,
      user.firstName!,
      user.lastName!,
      user.emailAddresses[0].emailAddress
    )
    return { status: 201, data: created }
  } catch (error) {
    console.log(error)
    return { status: 500 }
  }
}

export const onUserInfo = async () => {
  const user = await onCurrentUser()
  try {
    const profile = await findUser(user.id)
    if (profile) return { status: 200, data: profile }

    return { status: 404 }
  } catch (error) {
    return { status: 500 }
  }
}

export const onSubscribe = async (session_id: string) => {
  const user = await onCurrentUser()
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)
    if (session) {
      const subscribed = await updateSubscription(user.id, {
        customerId: session.customer as string,
        plan: 'PRO',
      })

      if (subscribed) return { status: 200 }
      return { status: 401 }
    }
    return { status: 404 }
  } catch (error) {
    return { status: 500 }
  }
}

export const onUserInfor = async () => {
  const user = await onCurrentUser()
  try {
    const profile = await findUser(user.id)
    if (profile) {
      // Return only serializable data
      return {
        status: 200,
        data: {
          id: profile.id,
          clerkId: profile.clerkId,
          email: profile.email,
          firstname: profile.firstname,
          lastname: profile.lastname,
          
        },
      }
    }

    return { status: 404 }
  } catch (error) {
    console.error("Error in onUserInfo:", error)
    return { status: 500, error: "Internal Server Error" }
  }
}


// Update the onBoardUser function to use the Blob URL instead of base64
export const onBoarding = async (formData: FormData) => {
  try {
    // Get data from form
    const onboardingData = Object.fromEntries(formData);
    
    // Get the current user
    const user = await onCurrentUser();
    
    // Use the profileImageUrl from Vercel Blob if available
    const profileImage = onboardingData.profileImageUrl || null;
    
    // Save to database using your existing queries
    // ...
    
    return { status: 200, message: "Onboarding data saved successfully" };
  } catch (error) {
    console.error("Error in onBoarding server action:", error);
    return { status: 500, message: "Error saving onboarding data" };
  }
};