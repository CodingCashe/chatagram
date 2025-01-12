import { client } from '@/lib/prisma'

async function deactivateStaleConversations() {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)

  await client.conversationState.updateMany({
    where: {
      isActive: true,
      updatedAt: {
        lt: oneHourAgo
      }
    },
    data: {
      isActive: false
    }
  })

  console.log('Stale conversations deactivated')
}

deactivateStaleConversations()
  .catch(console.error)
  .finally(() => client.$disconnect())

