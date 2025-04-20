import { PrismaClient } from "@prisma/client"
// const { PrismaClient } = require("@prisma/client");

import { welcomeEmailTemplate } from "../app/(protected)/admin/email/welcome-template"

const prisma = new PrismaClient()

async function main() {
  // Create welcome email template
  await prisma.emailTemplate.upsert({
    where: {
      id: "welcome-template",
    },
    update: {
      name: "Welcome Email",
      subject: "Welcome to Our Platform, {{user.firstname}}!",
      content: welcomeEmailTemplate,
      description: "Sent to new users when they sign up",
      category: "welcome",
      isDefault: true,
    },
    create: {
      id: "welcome-template",
      name: "Welcome Email",
      subject: "Welcome to Our Platform, {{user.firstname}}!",
      content: welcomeEmailTemplate,
      description: "Sent to new users when they sign up",
      category: "welcome",
      isDefault: true,
    },
  })

  console.log("Email templates seeded successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

