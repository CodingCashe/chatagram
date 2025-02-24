'use server'

import { client } from '@/lib/prisma'

export const updateIntegration = async (
  token: string,
  expire: Date,
  id: string
) => {
  return await client.integrations.update({
    where: { id },
    data: {
      token,
      expiresAt: expire,
    },
  })
}

export const getIntegration = async (clerkId: string) => {
  return await client.user.findUnique({
    where: {
      clerkId,
    },
    select: {
      integrations: {
        where: {
          name: 'INSTAGRAM',
        },
      },
    },
  })
}

export const createIntegration = async (
  clerkId: string,
  token: string,
  expire: Date,
  instaData: any
) => {
  return await client.user.update({
    where: {
      clerkId,
    },
    data: {
      integrations: {
        create: {
          token,
          expiresAt: expire,
          instagramId: instaData.instagramId,
          username: instaData.username,
          fullName: instaData.fullName,
          profilePicture: instaData.profilePicture,
          followersCount: instaData.followersCount,
          followingCount: instaData.followingCount,
          postsCount: instaData.postsCount,
        },
      },
    },
    select: {
      firstname: true,
      lastname: true,
    },
  })
}

export const updateIntegrationData = async (
  integrationId: string,
  instaData: any
) => {
  return await client.integrations.update({
    where: { id: integrationId },
    data: {
      username: instaData.username,
      fullName: instaData.fullName,
      profilePicture: instaData.profilePicture,
      followersCount: instaData.followersCount,
      followingCount: instaData.followingCount,
      postsCount: instaData.postsCount,
      lastUpdated: new Date(),
    },
  })
}


