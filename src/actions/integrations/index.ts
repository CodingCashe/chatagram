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
import { cookies } from 'next/headers'
import { createIntegration, getIntegration } from './queries'
import { generateTokens} from '@/lib/fetch'
import { onCurrentUser } from '../user'
import axios from 'axios'

export async function onOAuthInstagram() {
  redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string)
}

export async function onIntegrate(code: string) {
  const userId = cookies().get('userId')?.value
  if (!userId) {
    console.error('User not authenticated')
    return { status: 401, error: 'User not authenticated' }
  }

  try {
    const existingIntegration = await getIntegration(userId)
    const user = await  onCurrentUser ()

    if (existingIntegration) {
      console.log('🔴 404: Integration already exists')
      return { status: 404, error: 'Integration already exists' }
    }

    

    const token = await generateTokens(code)
    if (!token) {
      console.log('🔴 401: Token generation failed')
      return { status: 401, error: 'Token generation failed' }
    }

    if (token) {
      const insta_id = await axios.get(
        `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
      )
      const expireDate = new Date()
      expireDate.setDate(expireDate.getDate() + 60)
      
      const create = await createIntegration(
          user.id,
          token.access_token,
          expireDate,
          insta_id.data.user_id
      )
      
      return { status: 200, data: create }
      }
    

    
  } catch (error) {
    console.error('🔴 500', error)
    return { status: 500, error: 'Internal server error' }
  }
}

