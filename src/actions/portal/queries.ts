'use server'

import { client } from '@/lib/prisma'

export const getPortalSettings = async (userId: string) => {
  return client.portalSettings.findFirst({
    where: {
      userId
    },
    include: {
      formFields: {
        orderBy: {
          order: 'asc'
        }
      },
      verificationSettings: true
    }
  })
}

export const createOrUpdatePortalSettings = async (
  userId: string,
  data: {
    portalUrl?: string
    isActive?: boolean
    portalAccess?: string
    title?: string
    description?: string
    logo?: string
    primaryColor?: string
    secondaryColor?: string
    accentColor?: string
    textColor?: string
    customCss?: string
    customHeader?: string
    customFooter?: string
    notificationEmail?: string
  }
) => {
  const existingSettings = await client.portalSettings.findFirst({
    where: {
      userId
    }
  })

  if (existingSettings) {
    return client.portalSettings.update({
      where: {
        id: existingSettings.id
      },
      data
    })
  }

  // Generate a unique portal URL if not provided
  const portalUrl = data.portalUrl || `influencer-portal-${userId.substring(0, 8)}`

  return client.portalSettings.create({
    data: {
      ...data,
      portalUrl,
      userId
    }
  })
}

export const updatePortalFormFields = async (
  portalId: string,
  fields: {
    id?: string
    label: string
    type: string
    isRequired: boolean
    options?: any
    order: number
  }[]
) => {
  // Get existing fields
  const existingFields = await client.portalFormField.findMany({
    where: {
      portalId
    }
  })

  // Create a map of existing field IDs
  const existingFieldIds = new Set(existingFields.map(field => field.id))

  // Process each field
  const upsertPromises = fields.map(field => {
    if (field.id && existingFieldIds.has(field.id)) {
      // Update existing field
      return client.portalFormField.update({
        where: {
          id: field.id
        },
        data: {
          label: field.label,
          type: field.type,
          isRequired: field.isRequired,
          options: field.options,
          order: field.order
        }
      })
    } else {
      // Create new field
      return client.portalFormField.create({
        data: {
          label: field.label,
          type: field.type,
          isRequired: field.isRequired,
          options: field.options,
          order: field.order,
          portalId
        }
      })
    }
  })

  // Delete fields that are no longer in the list
  const fieldsToKeep = new Set(fields.filter(f => f.id).map(f => f.id))
  const deletePromises = existingFields
    .filter(field => !fieldsToKeep.has(field.id))
    .map(field => 
      client.portalFormField.delete({
        where: {
          id: field.id
        }
      })
    )

  // Execute all promises
  await Promise.all([...upsertPromises, ...deletePromises])

  // Return updated portal with fields
  return client.portalSettings.findUnique({
    where: {
      id: portalId
    },
    include: {
      formFields: {
        orderBy: {
          order: 'asc'
        }
      }
    }
  })
}

export const updateVerificationSettings = async (
  portalId: string,
  data: {
    emailVerification?: boolean
    instagramAuth?: boolean
    manualReview?: boolean
    metricsVerification?: boolean
    minFollowers?: number
    minEngagementRate?: number
    minAccountAge?: number
    autoApprove?: boolean
  }
) => {
  const existingSettings = await client.portalVerificationSettings.findFirst({
    where: {
      portalId
    }
  })

  if (existingSettings) {
    return client.portalVerificationSettings.update({
      where: {
        id: existingSettings.id
      },
      data
    })
  }

  return client.portalVerificationSettings.create({
    data: {
      ...data,
      portalId
    }
  })
}







