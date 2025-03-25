// "use server"

// import { client } from "@/lib/prisma"
// import { currentUser } from "@clerk/nextjs/server"

// type MessageTemplateInput = {
//   name: string
//   content: string
//   category: string
//   tags: string[]
// }

// export async function getMessageTemplates() {
//   try {
//     // Get current user
//     const user = await currentUser()
//     if (!user) {
//       throw new Error("Not authenticated")
//     }

//     // Check if user is admin
//     const dbUser = await client.user.findUnique({
//       where: { clerkId: user.id },
//       select: { isAdmin: true },
//     })

//     if (!dbUser?.isAdmin) {
//       throw new Error("Not authorized")
//     }

//     // Get message templates
//     const templates = await client.messageTemplate.findMany({
//       orderBy: {
//         updatedAt: "desc",
//       },
//     })

//     return templates.map((template) => ({
//       id: template.id,
//       name: template.name,
//       content: template.content,
//       category: template.category || "general",
//       tags: template.tags || [],
//       usageCount: template.usageCount || 0,
//       createdAt: template.createdAt.toISOString(),
//       updatedAt: template.updatedAt.toISOString(),
//     }))
//   } catch (error) {
//     console.error("Error fetching message templates:", error)
//     throw new Error("Failed to fetch message templates")
//   }
// }

// export async function createMessageTemplate(data: MessageTemplateInput) {
//   try {
//     // Get current user
//     const user = await currentUser()
//     if (!user) {
//       throw new Error("Not authenticated")
//     }

//     // Check if user is admin
//     const dbUser = await client.user.findUnique({
//       where: { clerkId: user.id },
//       select: { isAdmin: true },
//     })

//     if (!dbUser?.isAdmin) {
//       throw new Error("Not authorized")
//     }

//     // Create message template
//     const template = await client.messageTemplate.create({
//       data: {
//         name: data.name,
//         content: data.content,
//         category: data.category,
//         tags: data.tags,
//         usageCount: 0,
//       },
//     })

//     return {
//       id: template.id,
//       name: template.name,
//       content: template.content,
//       category: template.category || "general",
//       tags: template.tags || [],
//       usageCount: template.usageCount || 0,
//       createdAt: template.createdAt.toISOString(),
//       updatedAt: template.updatedAt.toISOString(),
//     }
//   } catch (error) {
//     console.error("Error creating message template:", error)
//     throw new Error("Failed to create message template")
//   }
// }

// export async function updateMessageTemplate(id: string, data: MessageTemplateInput) {
//   try {
//     // Get current user
//     const user = await currentUser()
//     if (!user) {
//       throw new Error("Not authenticated")
//     }

//     // Check if user is admin
//     const dbUser = await client.user.findUnique({
//       where: { clerkId: user.id },
//       select: { isAdmin: true },
//     })

//     if (!dbUser?.isAdmin) {
//       throw new Error("Not authorized")
//     }

//     // Update message template
//     const template = await client.messageTemplate.update({
//       where: { id },
//       data: {
//         name: data.name,
//         content: data.content,
//         category: data.category,
//         tags: data.tags,
//       },
//     })

//     return {
//       id: template.id,
//       name: template.name,
//       content: template.content,
//       category: template.category || "general",
//       tags: template.tags || [],
//       usageCount: template.usageCount || 0,
//       createdAt: template.createdAt.toISOString(),
//       updatedAt: template.updatedAt.toISOString(),
//     }
//   } catch (error) {
//     console.error("Error updating message template:", error)
//     throw new Error("Failed to update message template")
//   }
// }

// export async function deleteMessageTemplate(id: string) {
//   try {
//     // Get current user
//     const user = await currentUser()
//     if (!user) {
//       throw new Error("Not authenticated")
//     }

//     // Check if user is admin
//     const dbUser = await client.user.findUnique({
//       where: { clerkId: user.id },
//       select: { isAdmin: true },
//     })

//     if (!dbUser?.isAdmin) {
//       throw new Error("Not authorized")
//     }

//     // Delete message template
//     await client.messageTemplate.delete({
//       where: { id },
//     })

//     return { success: true }
//   } catch (error) {
//     console.error("Error deleting message template:", error)
//     throw new Error("Failed to delete message template")
//   }
// }

// export async function generateAITemplate(prompt: string) {
//   try {
//     // Get current user
//     const user = await currentUser()
//     if (!user) {
//       throw new Error("Not authenticated")
//     }

//     // Check if user is admin
//     const dbUser = await client.user.findUnique({
//       where: { clerkId: user.id },
//       select: { isAdmin: true },
//     })

//     if (!dbUser?.isAdmin) {
//       throw new Error("Not authorized")
//     }

//     // In a real implementation, you would call an AI service
//     // For now, we'll return mock data based on the prompt

//     // Extract keywords from prompt
//     const keywords = prompt.toLowerCase()

//     const template = {
//       name: "",
//       content: "",
//       category: "general",
//       tags: ["ai-generated"],
//     }

//     if (keywords.includes("welcome")) {
//       template.name = "Welcome Message"
//       template.content =
//         "Hi {{name}}! 👋 Thanks for connecting with us. We're excited to help you automate your Instagram DMs. Let me know if you have any questions!"
//       template.category = "welcome"
//       template.tags.push("welcome", "introduction", "onboarding")
//     } else if (keywords.includes("follow-up") || keywords.includes("followup")) {
//       template.name = "Follow-up Message"
//       template.content =
//         "Hey {{name}}, just checking in! How are you finding our DM automation service so far? I'd love to hear your feedback or answer any questions you might have."
//       template.category = "follow-up"
//       template.tags.push("follow-up", "check-in", "feedback")
//     } else if (keywords.includes("promotion") || keywords.includes("discount")) {
//       template.name = "Special Promotion"
//       template.content =
//         "Hi {{name}}! 🎉 We're offering a special 20% discount on our Pro plan for the next 48 hours. Use code SPECIAL20 at checkout to claim your discount!"
//       template.category = "promotion"
//       template.tags.push("promotion", "discount", "offer")
//     } else if (keywords.includes("support") || keywords.includes("help")) {
//       template.name = "Support Response"
//       template.content =
//         "Hi {{name}}, thanks for reaching out! I'm here to help. Could you please provide more details about the issue you're experiencing so I can assist you better?"
//       template.category = "support"
//       template.tags.push("support", "help", "assistance")
//     } else {
//       template.name = "General Message"
//       template.content =
//         "Hello {{name}}, thank you for your message. How can I assist you today with our Instagram DM automation service?"
//       template.tags.push("general", "response")
//     }

//     // Add a delay to simulate AI processing
//     await new Promise((resolve) => setTimeout(resolve, 1500))

//     return template
//   } catch (error) {
//     console.error("Error generating AI template:", error)
//     throw new Error("Failed to generate AI template")
//   }
// }

// "use server"

// import { client } from "@/lib/prisma"
// import { currentUser } from "@clerk/nextjs/server"
// import { revalidatePath } from "next/cache"

// type TemplateInput = {
//   name: string
//   content: string
//   category: string
//   tags: string[]
// }

// export async function getMessageTemplates() {
//   try {
//     // Get current user
//     const user = await currentUser()
//     if (!user) {
//       throw new Error("Not authenticated")
//     }

//     // Check if user is admin
//     const dbUser = await client.user.findUnique({
//       where: { clerkId: user.id },
//       select: { isAdmin: true },
//     })

//     if (!dbUser?.isAdmin) {
//       throw new Error("Not authorized")
//     }

//     // Get all templates
//     const templates = await client.messageTemplate.findMany({
//       orderBy: {
//         updatedAt: "desc",
//       },
//     })

//     return templates
//   } catch (error) {
//     console.error("Error fetching message templates:", error)
//     throw new Error("Failed to fetch message templates")
//   }
// }

// export async function createMessageTemplate(data: TemplateInput) {
//   try {
//     // Get current user
//     const user = await currentUser()
//     if (!user) {
//       throw new Error("Not authenticated")
//     }

//     // Check if user is admin
//     const dbUser = await client.user.findUnique({
//       where: { clerkId: user.id },
//       select: { isAdmin: true },
//     })

//     if (!dbUser?.isAdmin) {
//       throw new Error("Not authorized")
//     }

//     // Create template
//     const template = await client.messageTemplate.create({
//       data: {
//         name: data.name,
//         content: data.content,
//         category: data.category,
//         tags: data.tags,
//       },
//     })

//     revalidatePath("/admin/templates")
//     return template
//   } catch (error) {
//     console.error("Error creating message template:", error)
//     throw new Error("Failed to create message template")
//   }
// }

// export async function updateMessageTemplate(id: string, data: TemplateInput) {
//   try {
//     // Get current user
//     const user = await currentUser()
//     if (!user) {
//       throw new Error("Not authenticated")
//     }

//     // Check if user is admin
//     const dbUser = await client.user.findUnique({
//       where: { clerkId: user.id },
//       select: { isAdmin: true },
//     })

//     if (!dbUser?.isAdmin) {
//       throw new Error("Not authorized")
//     }

//     // Update template
//     const template = await client.messageTemplate.update({
//       where: { id },
//       data: {
//         name: data.name,
//         content: data.content,
//         category: data.category,
//         tags: data.tags,
//       },
//     })

//     revalidatePath("/admin/templates")
//     return template
//   } catch (error) {
//     console.error("Error updating message template:", error)
//     throw new Error("Failed to update message template")
//   }
// }

// export async function deleteMessageTemplate(id: string) {
//   try {
//     // Get current user
//     const user = await currentUser()
//     if (!user) {
//       throw new Error("Not authenticated")
//     }

//     // Check if user is admin
//     const dbUser = await client.user.findUnique({
//       where: { clerkId: user.id },
//       select: { isAdmin: true },
//     })

//     if (!dbUser?.isAdmin) {
//       throw new Error("Not authorized")
//     }

//     // Delete template
//     await client.messageTemplate.delete({
//       where: { id },
//     })

//     revalidatePath("/admin/templates")
//     return { success: true }
//   } catch (error) {
//     console.error("Error deleting message template:", error)
//     throw new Error("Failed to delete message template")
//   }
// }

// export async function generateAITemplate(prompt: string) {
//   try {
//     // Get current user
//     const user = await currentUser()
//     if (!user) {
//       throw new Error("Not authenticated")
//     }

//     // Check if user is admin
//     const dbUser = await client.user.findUnique({
//       where: { clerkId: user.id },
//       select: { isAdmin: true },
//     })

//     if (!dbUser?.isAdmin) {
//       throw new Error("Not authorized")
//     }

//     // In a real implementation, you would call an AI service here
//     // For now, we'll return a mock template based on the prompt

//     // Simple template generation based on prompt keywords
//     let category = "general"
//     if (prompt.toLowerCase().includes("welcome")) {
//       category = "welcome"
//     } else if (prompt.toLowerCase().includes("follow")) {
//       category = "follow-up"
//     } else if (prompt.toLowerCase().includes("promo")) {
//       category = "promotion"
//     } else if (prompt.toLowerCase().includes("support")) {
//       category = "support"
//     }

//     // Extract potential name from prompt
//     const nameMatch = prompt.match(/for\s+([a-zA-Z\s]+)/)
//     const name = nameMatch ? `${nameMatch[1].trim()} Template` : `AI Generated Template`

//     // Generate tags from prompt words
//     const words = prompt.toLowerCase().split(/\s+/)
//     const commonWords = [
//       "a",
//       "the",
//       "and",
//       "or",
//       "but",
//       "for",
//       "with",
//       "about",
//       "create",
//       "generate",
//       "template",
//       "message",
//     ]
//     const tags = words.filter((word) => word.length > 3 && !commonWords.includes(word)).slice(0, 5)

//     // Generate content based on category
//     let content = ""
//     switch (category) {
//       case "welcome":
//         content =
//           "Hi {{name}},\n\nWelcome to our platform! We're excited to have you on board.\n\nOur automation tools will help you save time and grow your audience. Feel free to explore the dashboard and let us know if you have any questions.\n\nBest regards,\nThe Team"
//         break
//       case "follow-up":
//         content =
//           "Hi {{name}},\n\nI noticed you've been using our platform for a while now. How are you finding it?\n\nI'd love to hear your feedback and see if there's anything we can do to improve your experience.\n\nBest regards,\nThe Team"
//         break
//       case "promotion":
//         content =
//           "Hi {{name}},\n\nWe're excited to announce our new premium features! For a limited time, you can upgrade your account with a 20% discount.\n\nUse code PREMIUM20 at checkout.\n\nBest regards,\nThe Team"
//         break
//       case "support":
//         content =
//           "Hi {{name}},\n\nThank you for reaching out to our support team. We're here to help!\n\nCould you please provide more details about the issue you're experiencing? Screenshots or screen recordings would be helpful.\n\nBest regards,\nSupport Team"
//         break
//       default:
//         content =
//           "Hi {{name}},\n\nThank you for your interest in our platform. We're here to help you achieve your goals.\n\nLet me know if you have any questions or need assistance with anything.\n\nBest regards,\nThe Team"
//     }

//     return {
//       name,
//       content,
//       category,
//       tags,
//     }
//   } catch (error) {
//     console.error("Error generating AI template:", error)
//     throw new Error("Failed to generate AI template")
//   }
// }

"use server"

import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

type TemplateInput = {
  name: string
  content: string
  category: string | null
  tags: string[]
}

export async function getMessageTemplates() {
  try {
    // Get current user
    const user = await currentUser()
    if (!user) {
      throw new Error("Not authenticated")
    }

    // Check if user is admin
    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
      select: { isAdmin: true },
    })

    if (!dbUser?.isAdmin) {
      throw new Error("Not authorized")
    }

    // Get all templates
    const templates = await client.messageTemplate.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    })

    return templates
  } catch (error) {
    console.error("Error fetching message templates:", error)
    throw new Error("Failed to fetch message templates")
  }
}

export async function createMessageTemplate(data: TemplateInput) {
  try {
    // Get current user
    const user = await currentUser()
    if (!user) {
      throw new Error("Not authenticated")
    }

    // Check if user is admin
    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
      select: { isAdmin: true },
    })

    if (!dbUser?.isAdmin) {
      throw new Error("Not authorized")
    }

    // Create template
    const template = await client.messageTemplate.create({
      data: {
        name: data.name,
        content: data.content,
        category: data.category,
        tags: data.tags,
      },
    })

    revalidatePath("/admin/templates")
    return template
  } catch (error) {
    console.error("Error creating message template:", error)
    throw new Error("Failed to create message template")
  }
}

export async function updateMessageTemplate(id: string, data: TemplateInput) {
  try {
    // Get current user
    const user = await currentUser()
    if (!user) {
      throw new Error("Not authenticated")
    }

    // Check if user is admin
    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
      select: { isAdmin: true },
    })

    if (!dbUser?.isAdmin) {
      throw new Error("Not authorized")
    }

    // Update template
    const template = await client.messageTemplate.update({
      where: { id },
      data: {
        name: data.name,
        content: data.content,
        category: data.category,
        tags: data.tags,
      },
    })

    revalidatePath("/admin/templates")
    return template
  } catch (error) {
    console.error("Error updating message template:", error)
    throw new Error("Failed to update message template")
  }
}

export async function deleteMessageTemplate(id: string) {
  try {
    // Get current user
    const user = await currentUser()
    if (!user) {
      throw new Error("Not authenticated")
    }

    // Check if user is admin
    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
      select: { isAdmin: true },
    })

    if (!dbUser?.isAdmin) {
      throw new Error("Not authorized")
    }

    // Delete template
    await client.messageTemplate.delete({
      where: { id },
    })

    revalidatePath("/admin/templates")
    return { success: true }
  } catch (error) {
    console.error("Error deleting message template:", error)
    throw new Error("Failed to delete message template")
  }
}

export async function generateAITemplate(prompt: string) {
  try {
    // Get current user
    const user = await currentUser()
    if (!user) {
      throw new Error("Not authenticated")
    }

    // Check if user is admin
    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
      select: { isAdmin: true },
    })

    if (!dbUser?.isAdmin) {
      throw new Error("Not authorized")
    }

    // In a real implementation, you would call an AI service here
    // For now, we'll return a mock template based on the prompt

    // Simple template generation based on prompt keywords
    let category = "general"
    if (prompt.toLowerCase().includes("welcome")) {
      category = "welcome"
    } else if (prompt.toLowerCase().includes("follow")) {
      category = "follow-up"
    } else if (prompt.toLowerCase().includes("promo")) {
      category = "promotion"
    } else if (prompt.toLowerCase().includes("support")) {
      category = "support"
    }

    // Extract potential name from prompt
    const nameMatch = prompt.match(/for\s+([a-zA-Z\s]+)/)
    const name = nameMatch ? `${nameMatch[1].trim()} Template` : `AI Generated Template`

    // Generate tags from prompt words
    const words = prompt.toLowerCase().split(/\s+/)
    const commonWords = [
      "a",
      "the",
      "and",
      "or",
      "but",
      "for",
      "with",
      "about",
      "create",
      "generate",
      "template",
      "message",
    ]
    const tags = words.filter((word) => word.length > 3 && !commonWords.includes(word)).slice(0, 5)

    // Generate content based on category
    let content = ""
    switch (category) {
      case "welcome":
        content =
          "Hi {{name}},\n\nWelcome to our platform! We're excited to have you on board.\n\nOur automation tools will help you save time and grow your audience. Feel free to explore the dashboard and let us know if you have any questions.\n\nBest regards,\nThe Team"
        break
      case "follow-up":
        content =
          "Hi {{name}},\n\nI noticed you've been using our platform for a while now. How are you finding it?\n\nI'd love to hear your feedback and see if there's anything we can do to improve your experience.\n\nBest regards,\nThe Team"
        break
      case "promotion":
        content =
          "Hi {{name}},\n\nWe're excited to announce our new premium features! For a limited time, you can upgrade your account with a 20% discount.\n\nUse code PREMIUM20 at checkout.\n\nBest regards,\nThe Team"
        break
      case "support":
        content =
          "Hi {{name}},\n\nThank you for reaching out to our support team. We're here to help!\n\nCould you please provide more details about the issue you're experiencing? Screenshots or screen recordings would be helpful.\n\nBest regards,\nSupport Team"
        break
      default:
        content =
          "Hi {{name}},\n\nThank you for your interest in our platform. We're here to help you achieve your goals.\n\nLet me know if you have any questions or need assistance with anything.\n\nBest regards,\nThe Team"
    }

    return {
      name,
      content,
      category,
      tags,
    }
  } catch (error) {
    console.error("Error generating AI template:", error)
    throw new Error("Failed to generate AI template")
  }
}

