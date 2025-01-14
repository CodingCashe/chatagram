'use server'

import { onCurrentUser } from '../user'
import { createBusinessQuery, getBusinessQuery, updateBusinessQuery, deleteBusinessQuery } from './queries'
import { Business } from '@prisma/client'

// export const createBusiness = async (data: Omit<Business, 'id' | 'createdAt' | 'updatedAt' | 'userId' | 'autoReplyEnabled'>) => {
//   const user = await onCurrentUser()
//   try {
//     const business = await createBusinessQuery({ ...data, userId: user.id })
//     if (business) return { status: 200, data: business }
//     return { status: 404, data: 'Failed to create business' }
//   } catch (error) {
//     console.error('Error creating business:', error)
//     return { status: 500, data: 'An error occurred while creating the business' }
//   }
// }
export const createBusiness = async (
  data: Omit<Business, 'id' | 'createdAt' | 'updatedAt' | 'userId'>
) => {
  const user = await onCurrentUser();
  try {
    // Add autoReplyEnabled with a default value if not provided
    const business = await createBusinessQuery({
      ...data,
      userId: user.id,
      autoReplyEnabled: data.autoReplyEnabled ?? false,
    });
    if (business) return { status: 200, data: business };
    return { status: 404, data: 'Failed to create business' };
  } catch (error) {
    console.error('Error creating business:', error);
    return { status: 500, data: 'An error occurred while creating the business' };
  }
};


export const getBusiness = async () => {
  const user = await onCurrentUser()
  try {
    const business = await getBusinessQuery(user.id)
    if (business) return { status: 200, data: business }
    return { status: 404, data: 'Business not found' }
  } catch (error) {
    console.error('Error fetching business:', error)
    return { status: 500, data: 'An error occurred while fetching the business' }
  }
}

export const updateBusiness = async (id: string, data: Partial<Omit<Business, 'id' | 'createdAt' | 'updatedAt' | 'userId'>>) => {
  await onCurrentUser()
  try {
    const updatedBusiness = await updateBusinessQuery(id, data)
    if (updatedBusiness) return { status: 200, data: updatedBusiness }
    return { status: 404, data: 'Business not found' }
  } catch (error) {
    console.error('Error updating business:', error)
    return { status: 500, data: 'An error occurred while updating the business' }
  }
}

export const deleteBusiness = async (id: string) => {
  await onCurrentUser()
  try {
    const deletedBusiness = await deleteBusinessQuery(id)
    if (deletedBusiness) return { status: 200, data: 'Business deleted successfully' }
    return { status: 404, data: 'Business not found' }
  } catch (error) {
    console.error('Error deleting business:', error)
    return { status: 500, data: 'An error occurred while deleting the business' }
  }
}

