import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createBusiness(data: any) {
  return prisma.business.create({
    data,
  })
}

export async function getBusinessById(id: string) {
  return prisma.business.findUnique({
    where: { id },
  })
}

export async function updateBusiness(id: string, data: any) {
  return prisma.business.update({
    where: { id },
    data,
  })
}

export async function deleteBusiness(id: string) {
  return prisma.business.delete({
    where: { id },
  })
}
