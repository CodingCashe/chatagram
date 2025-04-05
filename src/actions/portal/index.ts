'use server'

import { onCurrentUser } from '../user'
import {
  getPortalSettings,
  createOrUpdatePortalSettings,
  updatePortalFormFields,
  updateVerificationSettings
} from './queries'

export const getPortalSettingsAction = async () => {
  const user = await onCurrentUser()
  try {
    const settings = await getPortalSettings(user.id)
    return { status: 200, data: settings || {} }
  } catch (error) {
    console.error('Error getting portal settings:', error)
    return { status: 500, data: 'Failed to get portal settings' }
  }
}

export const updatePortalSettingsAction = async (data: {
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
}) => {
  const user = await onCurrentUser()
  try {
    const settings = await createOrUpdatePortalSettings(user.id, data)
    return { status: 200, data: settings }
  } catch (error) {
    console.error('Error updating portal settings:', error)
    return { status: 500, data: 'Failed to update portal settings' }
  }
}

export const updateFormFieldsAction = async (
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
  await onCurrentUser()
  try {
    const result = await updatePortalFormFields(portalId, fields)
    return { status: 200, data: result }
  } catch (error) {
    console.error('Error updating form fields:', error)
    return { status: 500, data: 'Failed to update form fields' }
  }
}

export const updateVerificationSettingsAction = async (
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
  await onCurrentUser()
  try {
    const result = await updateVerificationSettings(portalId, data)
    return { status: 200, data: result }
  } catch (error) {
    console.error('Error updating verification settings:', error)
    return { status: 500, data: 'Failed to update verification settings' }
  }
}