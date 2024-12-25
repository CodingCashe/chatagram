// 'use server'

// import { redirect } from 'next/navigation'
// import { onCurrentUser } from '../user'
// import { createIntegration, getIntegration } from './queries'
// import { generateTokens } from '@/lib/fetch'
// import axios from 'axios'

// export const onOAuthInstagram = (strategy: 'INSTAGRAM' | 'CRM') => {
//   if (strategy === 'INSTAGRAM') {
//     return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string)
//   }
// }

// export const onIntegrate = async (code: string) => {
//   const user = await onCurrentUser()

//   try {
//     const integration = await getIntegration(user.id)

//     if (integration && integration.integrations.length === 0) {
//       const token = await generateTokens(code)
//       console.log('Token:', {token})

//       if (token) {
//         const insta_id = await axios.get(
//           `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
//         )

//         const today = new Date()
//         const expire_date = today.setDate(today.getDate() + 60)
//         const create = await createIntegration(
//           user.id,
//           token.access_token,
//           new Date(expire_date),
//           insta_id.data.user_id
//         )
//         return { status: 200, data: create }
//       }
//       console.log('🔴 401')
//       return { status: 401 }
//     }
//     console.log('🔴 404')
//     return { status: 404 }
//   } catch (error) {
//     console.log('🔴 500', error)
//     return { status: 500 }
//   }
// }

'use server'

import { redirect } from 'next/navigation'
import { onCurrentUser } from '../user'
import { createIntegration, getIntegration } from './queries'
import { generateTokens } from '@/lib/fetch'
import axios from 'axios'

export const onOAuthInstagram = (strategy: 'INSTAGRAM' | 'CRM') => {
  if (strategy === 'INSTAGRAM') {
    if (!process.env.INSTAGRAM_EMBEDDED_OAUTH_URL) {
      throw new Error('INSTAGRAM_EMBEDDED_OAUTH_URL is not defined in environment variables.')
    }
    return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string)
  }
}

export const onIntegrate = async (code: string) => {
  const user = await onCurrentUser()

  if (!user || !user.id) {
    console.error('Error: User not found or invalid user data.')
    return { status: 401 }
  }

  try {
    const integration = await getIntegration(user.id)

    if (!integration || !integration.integrations) {
      console.error('Error: No integration data found for user:', user.id)
      return { status: 404 }
    }

    if (integration.integrations.length === 0) {
      const token = await generateTokens(code)
      if (!token) {
        console.error('Error: Failed to generate token for code:', code)
        return { status: 401 }
      }

      let insta_id
      try {
        insta_id = await axios.get(
          `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
        )
      } catch (error) {
        console.error('Error fetching Instagram ID:', error)
        return { status: 500 }
      }

      const today = new Date()
      const expire_date = today.setDate(today.getDate() + 60)
      const create = await createIntegration(
        user.id,
        token.access_token,
        new Date(expire_date),
        insta_id.data.user_id
      )

      if (!create) {
        console.error('Error: Failed to create integration for user:', user.id)
        return { status: 500 }
      }

      return { status: 200, data: create }
    }

    console.error('Integration already exists for user:', user.id)
    return { status: 404 }
  } catch (error) {
    console.error('Unexpected error in onIntegrate:', {
      userId: user?.id,
      code,
      error,
    })
    return { status: 500 }
  }
}
