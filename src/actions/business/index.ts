// 'use server'

// import { onCurrentUser } from '../user'
// import { createBusinessQuery, getBusinessQuery, updateBusinessQuery, deleteBusinessQuery } from './queries'
// import { Business } from '@prisma/client'

// export const createBusiness = async (
//   data: Omit<Business, 'id' | 'createdAt' | 'updatedAt' | 'userId'>
// ) => {
//   const user = await onCurrentUser();
//   try {
//     // Add autoReplyEnabled with a default value if not provided
//     const business = await createBusinessQuery({
//       ...data,
//       userId: user.id,
//       autoReplyEnabled: data.autoReplyEnabled ?? false,
//     });
//     if (business) return { status: 200, data: business };
//     return { status: 404, data: 'Failed to create business' };
//   } catch (error) {
//     console.error('Error creating business:', error);
//     return { status: 500, data: 'An error occurred while creating the business' };
//   }
// };


// export const getBusiness = async () => {
//   const user = await onCurrentUser()
//   try {
//     const business = await getBusinessQuery(user.id)
//     if (business) return { status: 200, data: business }
//     return { status: 404, data: 'Business not found' }
//   } catch (error) {
//     console.error('Error fetching business:', error)
//     return { status: 500, data: 'An error occurred while fetching the business' }
//   }
// }

// export const updateBusiness = async (id: string, data: Partial<Omit<Business, 'id' | 'createdAt' | 'updatedAt' | 'userId'>>) => {
//   await onCurrentUser()
//   try {
//     const updatedBusiness = await updateBusinessQuery(id, data)
//     if (updatedBusiness) return { status: 200, data: updatedBusiness }
//     return { status: 404, data: 'Business not found' }
//   } catch (error) {
//     console.error('Error updating business:', error)
//     return { status: 500, data: 'An error occurred while updating the business' }
//   }
// }

// export const deleteBusiness = async (id: string) => {
//   await onCurrentUser()
//   try {
//     const deletedBusiness = await deleteBusinessQuery(id)
//     if (deletedBusiness) return { status: 200, data: 'Business deleted successfully' }
//     return { status: 404, data: 'Business not found' }
//   } catch (error) {
//     console.error('Error deleting business:', error)
//     return { status: 500, data: 'An error occurred while deleting the business' }
//   }
// }



//WAS USING THIS ONE
'use server'
import { FormSchema } from '@/components/global/businessInfo/businessInfo'
import { onCurrentUser } from '../user'
import { createBusinessQuery, getBusinessQuery, updateBusinessQuery, deleteBusinessQuery } from './queries'
import { Business } from '@prisma/client'


export const createBusiness = async (data: FormSchema) => {
  console.log('Starting createBusiness function', { data });
  const user = await onCurrentUser();
  console.log('Current user fetched', { userId: user.id });
  try {
    console.log('Attempting to create business', { ...data, userId: user.id });
    const business = await createBusinessQuery({
      ...data,
      userId: user.id,
    });
    if (business) {
      console.log('Business created successfully', { businessId: business.id });
      return { status: 200, data: business };
    }
    console.warn('Failed to create business, no error thrown but no business returned');
    return { status: 404, error: 'Failed to create business' };
  } catch (error) {
    console.error('Error creating business:', error);
    if (error instanceof Error) {
      return { status: 500, error: error.message };
    }
    return { status: 500, error: 'An unknown error occurred while creating the business' };
  }
};
export const getBusiness = async () => {
  console.log('Starting getBusiness function');
  const user = await onCurrentUser()
  console.log('Current user fetched', { userId: user.id });
  try {
    console.log('Attempting to fetch business', { userId: user.id });
    const business = await getBusinessQuery(user.id)
    if (business) {
      console.log('Business fetched successfully', { businessId: business.id });
      return { status: 200, data: business }
    }
    console.warn('Business not found for user', { userId: user.id });
    return { status: 404, data: 'Business not found' }
  } catch (error) {
    console.error('Error fetching business:', error)
    return { status: 500, data: 'An error occurred while fetching the business' }
  }
}

export const updateBusiness = async (id: string, data: Partial<Omit<Business, 'id' | 'createdAt' | 'updatedAt' | 'userId'>>) => {
  console.log('Starting updateBusiness function', { businessId: id, updateData: data });
  await onCurrentUser()
  try {
    console.log('Attempting to update business', { businessId: id, updateData: data });
    const updatedBusiness = await updateBusinessQuery(id, data)
    if (updatedBusiness) {
      console.log('Business updated successfully', { businessId: updatedBusiness.id });
      return { status: 200, data: updatedBusiness }
    }
    console.warn('Business not found for update', { businessId: id });
    return { status: 404, data: 'Business not found' }
  } catch (error) {
    console.error('Error updating business:', error)
    return { status: 500, data: 'An error occurred while updating the business' }
  }
}

export const deleteBusiness = async (id: string) => {
  console.log('Starting deleteBusiness function', { businessId: id });
  await onCurrentUser()
  try {
    console.log('Attempting to delete business', { businessId: id });
    const deletedBusiness = await deleteBusinessQuery(id)
    if (deletedBusiness) {
      console.log('Business deleted successfully', { businessId: id });
      return { status: 200, data: 'Business deleted successfully' }
    }
    console.warn('Business not found for deletion', { businessId: id });
    return { status: 404, data: 'Business not found' }
  } catch (error) {
    console.error('Error deleting business:', error)
    return { status: 500, data: 'An error occurred while deleting the business' }
  }
}


// 'use server';
// import { FormSchema } from '@/components/global/businessInfo/businessInfo';
// import { onCurrentUser } from '../user';
// import { createBusinessQuery, getBusinessQuery, updateBusinessQuery, deleteBusinessQuery } from './queries';
// import { Business } from '@prisma/client';
// import { v5 as uuidv5 } from 'uuid';

// // Define a namespace for uuidv5
// const NAMESPACE = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';

// const generateUUID = (userId: string) => {
//   return uuidv5(userId, NAMESPACE);
// };

// export const createBusiness = async (data: FormSchema) => {
//   console.log('Starting createBusiness function', { data });
//   const user = await onCurrentUser();
//   const userUUID = generateUUID(user.id);
//   console.log('Generated UUID for user', { userId: user.id, userUUID });

//   try {
//     console.log('Attempting to create business', { ...data, userId: userUUID });
//     const business = await createBusinessQuery({
//       ...data,
//       userId: userUUID,
//     });
//     if (business) {
//       console.log('Business created successfully', { businessId: business.id });
//       return { status: 200, data: business };
//     }
//     console.warn('Failed to create business, no error thrown but no business returned');
//     return { status: 404, error: 'Failed to create business' };
//   } catch (error) {
//     console.error('Error creating business:', error);
//     return { status: 500, error: error instanceof Error ? error.message : 'An unknown error occurred while creating the business' };
//   }
// };

// export const getBusiness = async () => {
//   console.log('Starting getBusiness function');
//   const user = await onCurrentUser();
//   const userUUID = generateUUID(user.id);
//   console.log('Generated UUID for user', { userId: user.id, userUUID });

//   try {
//     console.log('Attempting to fetch business', { userId: userUUID });
//     const business = await getBusinessQuery(userUUID);
//     if (business) {
//       console.log('Business fetched successfully', { businessId: business.id });
//       return { status: 200, data: business };
//     }
//     console.warn('Business not found for user', { userId: userUUID });
//     return { status: 404, data: 'Business not found' };
//   } catch (error) {
//     console.error('Error fetching business:', error);
//     return { status: 500, data: 'An error occurred while fetching the business' };
//   }
// };

// export const updateBusiness = async (id: string, data: Partial<Omit<Business, 'id' | 'createdAt' | 'updatedAt' | 'userId'>>) => {
//   console.log('Starting updateBusiness function', { businessId: id, updateData: data });
//   try {
//     console.log('Attempting to update business', { businessId: id, updateData: data });
//     const updatedBusiness = await updateBusinessQuery(id, data);
//     if (updatedBusiness) {
//       console.log('Business updated successfully', { businessId: updatedBusiness.id });
//       return { status: 200, data: updatedBusiness };
//     }
//     console.warn('Business not found for update', { businessId: id });
//     return { status: 404, data: 'Business not found' };
//   } catch (error) {
//     console.error('Error updating business:', error);
//     return { status: 500, data: 'An error occurred while updating the business' };
//   }
// };

// export const deleteBusiness = async (id: string) => {
//   console.log('Starting deleteBusiness function', { businessId: id });
//   try {
//     console.log('Attempting to delete business', { businessId: id });
//     const deletedBusiness = await deleteBusinessQuery(id);
//     if (deletedBusiness) {
//       console.log('Business deleted successfully', { businessId: id });
//       return { status: 200, data: 'Business deleted successfully' };
//     }
//     console.warn('Business not found for deletion', { businessId: id });
//     return { status: 404, data: 'Business not found' };
//   } catch (error) {
//     console.error('Error deleting business:', error);
//     return { status: 500, data: 'An error occurred while deleting the business' };
//   }
// };
