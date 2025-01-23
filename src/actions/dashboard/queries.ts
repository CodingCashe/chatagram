// "use server"

// import { client } from "@/lib/prisma"
// import type { Automation } from "@/types/dashboard"

// // export async function getDashboardDataQuery(userId: string) {
// //   const user = await client.user.findUnique({
// //     where: { clerkId: userId },
// //     include: {
// //       automations: {
// //         include: {
// //           listener: true,
// //         },
// //       },
// //     },
// //   })

// //   const activeConversations = await client.conversationState.count({
// //     where: { isActive: true },
// //   })

// //   return {
// //     automations: user?.automations || [],
// //     automationsCount: user?.automations.length || 0,
// //     activeConversations,
// //   }
// // }

// export async function getEngagementDataQuery(userId: string) {
//   const sixMonthsAgo = new Date()
//   sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

//   return await client.dms.groupBy({
//     by: ["createdAt"],
//     where: {
//       Automation: {
//         User: {
//           clerkId: userId,
//         },
//         createdAt: {
//           gte: sixMonthsAgo,
//         },
//       },
//     },
//     _count: {
//       id: true,
//     },
//     orderBy: {
//       createdAt: "asc",
//     },
//   })
// }

// export async function getCommentDataQuery(userId: string) {
//   const sixMonthsAgo = new Date()
//   sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

//   return await client.listener.findMany({
//     where: {
//       Automation: {
//         User: {
//           clerkId: userId,
//         },
//         createdAt: {
//           gte: sixMonthsAgo,
//         },
//       },
//     },
//     select: {
//       Automation: {
//         select: {
//           createdAt: true,
//         },
//       },
//       commentCount: true,
//     },
//     orderBy: {
//       Automation: {
//         createdAt: "asc",
//       },
//     },
//   })
// }

// // export async function getRecentDmsQuery() {
// //   return await client.dms.findMany({
// //     take: 20,
// //     orderBy: { createdAt: "desc" },
// //     include: { Automation: true },
// //   })
// // }

// // export async function getRecentKeywordsQuery() {
// //   return await client.keyword.findMany({
// //     take: 5,
// //     orderBy: { Automation: { createdAt: "desc" } },
// //     include: { Automation: true },
// //   })
// // }



// // ... (keep existing imports)

// // export async function getAutomationsForUserQuery(userId: string) {
// //   return await client.automation.findMany({
// //     where: { User: { clerkId: userId } },
// //     select: { id: true, name: true },
// //   })
// // }

// // export async function getEngagementDataForAutomationQuery(automationId: string) {
// //   const sixMonthsAgo = new Date()
// //   sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

// //   return await client.dms.groupBy({
// //     by: ["createdAt"],
// //     where: {
// //       automationId: automationId,
// //       createdAt: {
// //         gte: sixMonthsAgo,
// //       },
// //     },
// //     _count: {
// //       id: true,
// //     },
// //     orderBy: {
// //       createdAt: "asc",
// //     },
// //   })
// // }

// // export async function getCommentDataForAutomationQuery(automationId: string) {
// //   const sixMonthsAgo = new Date()
// //   sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

// //   return await client.listener.findFirst({
// //     where: {
// //       automationId: automationId,
// //       Automation: {
// //         createdAt: {
// //           gte: sixMonthsAgo,
// //         },
// //       },
// //     },
// //     select: {
// //       Automation: {
// //         select: {
// //           createdAt: true,
// //         },
// //       },
// //       commentCount: true,
// //     },
// //   })
// // }

// // // ... (keep other existing functions)



// export async function getDashboardDataQuery(userId: string) {
//   const user = await client.user.findUnique({
//     where: { clerkId: userId },
//     include: {
//       automations: {
//         include: {
//           listener: true,
//         },
//       },
//     },
//   })

//   const activeConversations = await client.conversationState.count({
//     where: { isActive: true },
//   })

//   return {
//     automations: user?.automations || [],
//     automationsCount: user?.automations.length || 0,
//     activeConversations,
//   }
// }

// export async function getEngagementDataForAutomationQuery(automationId: string) {
//   const sixMonthsAgo = new Date()
//   sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

//   return await client.dms.groupBy({
//     by: ["createdAt"],
//     where: {
//       automationId: automationId,
//       createdAt: {
//         gte: sixMonthsAgo,
//       },
//     },
//     _count: {
//       id: true,
//     },
//     orderBy: {
//       createdAt: "asc",
//     },
//   })
// }

// export async function getCommentDataForAutomationQuery(automationId: string) {
//   const sixMonthsAgo = new Date()
//   sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

//   return await client.listener.findFirst({
//     where: {
//       automationId: automationId,
//       Automation: {
//         createdAt: {
//           gte: sixMonthsAgo,
//         },
//       },
//     },
//     select: {
//       Automation: {
//         select: {
//           createdAt: true,
//         },
//       },
//       commentCount: true,
//     },
//   })
// }

// export async function getRecentDmsQuery() {
//   return await client.dms.findMany({
//     take: 20,
//     orderBy: { createdAt: "desc" },
//     include: { Automation: true },
//   })
// }

// export async function getRecentKeywordsQuery() {
//   return await client.keyword.findMany({
//     take: 5,
//     orderBy: { Automation: { createdAt: "desc" } },
//     include: { Automation: true },
//   })
// }

// export async function getAutomationsForUserQuery(userId: string): Promise<Automation[]> {
//   const automations = await client.automation.findMany({
//     where: { User: { clerkId: userId } },
//     select: { id: true, name: true },
//   })

//   return automations.map((automation) => ({
//     id: automation.id,
//     name: automation.name,
//   }))
// }

// "use server"

// import { client } from "@/lib/prisma"
// import type { Automation } from "@/types/dashboard"

// export async function getDashboardDataQuery(userId: string) {
//   const user = await client.user.findUnique({
//     where: { clerkId: userId },
//     include: {
//       automations: {
//         include: {
//           listener: true,
//         },
//       },
//     },
//   })

//   const activeConversations = await client.conversationState.count({
//     where: { isActive: true },
//   })

//   return {
//     automations:
//       user?.automations.map((automation) => ({
//         id: automation.id,
//         name: automation.name,
//         active: automation.active,
//         createdAt: automation.createdAt,
//         listener: automation.listener
//           ? {
//               dmCount: automation.listener.dmCount,
//               commentCount: automation.listener.commentCount,
//             }
//           : null,
//       })) || [],
//     automationsCount: user?.automations.length || 0,
//     activeConversations,
//   }
// }

// export async function getEngagementDataForAutomationQuery(automationId: string) {
//   const sixMonthsAgo = new Date()
//   sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

//   return await client.dms.groupBy({
//     by: ["createdAt"],
//     where: {
//       automationId: automationId,
//       createdAt: {
//         gte: sixMonthsAgo,
//       },
//     },
//     _count: {
//       id: true,
//     },
//     orderBy: {
//       createdAt: "asc",
//     },
//   })
// }

// export async function getCommentDataForAutomationQuery(automationId: string) {
//   const sixMonthsAgo = new Date()
//   sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

//   return await client.listener.findFirst({
//     where: {
//       automationId: automationId,
//       Automation: {
//         createdAt: {
//           gte: sixMonthsAgo,
//         },
//       },
//     },
//     select: {
//       Automation: {
//         select: {
//           createdAt: true,
//         },
//       },
//       commentCount: true,
//     },
//   })
// }

// export async function getRecentDmsQuery() {
//   return await client.dms.findMany({
//     take: 20,
//     orderBy: { createdAt: "desc" },
//     include: { Automation: true },
//   })
// }

// export async function getRecentKeywordsQuery() {
//   return await client.keyword.findMany({
//     take: 5,
//     orderBy: { Automation: { createdAt: "desc" } },
//     include: { Automation: true },
//   })
// }

// export async function getAutomationsForUserQuery(userId: string): Promise<Automation[]> {
//   const automations = await client.automation.findMany({
//     where: { User: { clerkId: userId } },
//     select: {
//       id: true,
//       name: true,
//       active: true,
//       createdAt: true,
//       listener: {
//         select: {
//           dmCount: true,
//           commentCount: true,
//         },
//       },
//     },
//   })

//   return automations.map((automation) => ({
//     id: automation.id,
//     name: automation.name,
//     active: automation.active,
//     createdAt: automation.createdAt,
//     listener: automation.listener
//       ? {
//           dmCount: automation.listener.dmCount,
//           commentCount: automation.listener.commentCount,
//         }
//       : null,
//   }))
// }

"use server"

import { client } from "@/lib/prisma"
import type { Automation } from "@/types/dashboard"

export async function getDashboardDataQuery(userId: string) {
  const user = await client.user.findUnique({
    where: { clerkId: userId },
    include: {
      automations: {
        include: {
          listener: true,
        },
      },
    },
  })

  const activeConversations = await client.conversationState.count({
    where: { isActive: true },
  })

  return {
    automations:
      user?.automations.map((automation) => ({
        id: automation.id,
        name: automation.name,
        active: automation.active,
        createdAt: automation.createdAt,
        listener: automation.listener
          ? {
              dmCount: automation.listener.dmCount,
              commentCount: automation.listener.commentCount,
            }
          : null,
      })) || [],
    automationsCount: user?.automations.length || 0,
    activeConversations,
  }
}

// export async function getEngagementDataForAutomationQuery(automationId: string) {
//   const sixMonthsAgo = new Date()
//   sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

//   return await client.dms.groupBy({
//     by: ["createdAt"],
//     where: {
//       automationId: automationId,
//       createdAt: {
//         gte: sixMonthsAgo,
//       },
//     },
//     _count: {
//       id: true,
//     },
//     orderBy: {
//       createdAt: "asc",
//     },
//   })
// }

export async function getCommentDataForAutomationQuery(automationId: string) {
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

  return await client.listener.findFirst({
    where: {
      automationId: automationId,
      Automation: {
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
    },
    select: {
      Automation: {
        select: {
          createdAt: true,
        },
      },
      commentCount: true,
    },
  })
}

export async function getRecentDmsQuery() {
  return await client.dms.findMany({
    take: 20,
    orderBy: { createdAt: "desc" },
    include: { Automation: true },
  })
}

export async function getRecentKeywordsQuery() {
  return await client.keyword.findMany({
    take: 5,
    orderBy: { Automation: { createdAt: "desc" } },
    include: { Automation: true },
  })
}

export async function getAutomationsForUserQuery(userId: string): Promise<Automation[]> {
  const automations = await client.automation.findMany({
    where: { User: { clerkId: userId } },
    select: {
      id: true,
      name: true,
      active: true,
      createdAt: true,
      listener: {
        select: {
          dmCount: true,
          commentCount: true,
        },
      },
    },
  })

  return automations.map((automation) => ({
    id: automation.id,
    name: automation.name,
    active: automation.active,
    createdAt: automation.createdAt,
    listener: automation.listener
      ? {
          dmCount: automation.listener.dmCount,
          commentCount: automation.listener.commentCount,
        }
      : null,
  }))
}



// export async function getEngagementDataForAutomationQuery(automationId: string) {
//   const sixMonthsAgo = new Date()
//   sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

//   return await client.dms.groupBy({
//     by: ["createdAt"],
//     where: {
//       automationId: automationId,
//       createdAt: {
//         gte: sixMonthsAgo,
//       },
//     },
//     _count: {
//       id: true,
//     },
//     orderBy: {
//       createdAt: "asc",
//     },
//   })
// }

export async function getEngagementDataForAutomationQuery(automationId: string) {
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

  return await client.dms.groupBy({
    by: ["createdAt"],
    where: {
      automationId: automationId,
      createdAt: {
        gte: sixMonthsAgo,
      },
    },
    _count: {
      id: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  })
}
