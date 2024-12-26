'use server'

import { cookies } from 'next/headers'

const INSTAGRAM_CLIENT_ID = process.env.INSTAGRAM_CLIENT_ID
const INSTAGRAM_CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_HOST_URL}/callback/instagram/`

export async function exchangeCodeForToken(code: string) {
  try {
    // Exchange the code for an access token
    const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: INSTAGRAM_CLIENT_ID!,
        client_secret: INSTAGRAM_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
        code,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token')
    }

    const tokenData = await tokenResponse.json()

    // Store the access token in a secure HTTP-only cookie
    cookies().set('instagram_access_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    return { success: true }
  } catch (error) {
    console.error('Error exchanging code for token:', error)
    return { success: false, error: 'Failed to exchange code for token' }
  }
}

