// "use server"

// import { client } from "@/lib/prisma"

// // SMS verification service
// export const sendVerificationSMS = async (phoneNumber: string) => {
//   try {
//     // Generate a random 6-digit code
//     const code = Math.floor(100000 + Math.random() * 900000).toString()

//     // In a real app, you would use a service like Twilio to send the SMS
//     console.log(`Sending verification code ${code} to ${phoneNumber}`)

//     // Store the verification code in the database
//     await client.verificationToken.create({
//       data: {
//         phoneNumber,
//         code,
//         expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
//       },
//     })

//     return { status: 200, data: { code } }
//   } catch (error) {
//     console.error("Error sending verification SMS:", error)
//     return { status: 500, data: null, error: "Failed to send verification SMS" }
//   }
// }

// // Verify SMS code
// export const verifyCode = async (phoneNumber: string, code: string) => {
//   try {
//     // Find the verification code in the database
//     const verificationCode = await client.verificationCode.findFirst({
//       where: {
//         phoneNumber,
//         code,
//         expiresAt: {
//           gt: new Date(),
//         },
//       },
//     })

//     if (!verificationCode) {
//       return { status: 400, data: null, error: "Invalid or expired verification code" }
//     }

//     // Mark the code as used
//     await client.verificationCode.update({
//       where: { id: verificationCode.id },
//       data: { used: true },
//     })

//     // Update the user's phone verification status
//     const user = await client.user.findFirst({
//       where: { phone: phoneNumber },
//     })

//     if (user) {
//       await client.user.update({
//         where: { id: user.id },
//         data: { phoneVerified: true },
//       })
//     }

//     return { status: 200, data: { verified: true } }
//   } catch (error) {
//     console.error("Error verifying code:", error)
//     return { status: 500, data: null, error: "Failed to verify code" }
//   }
// }

// app/actions/sms-service.ts
"use server"

import { client } from "@/lib/prisma"
import { sendSMS } from "@/lib/twilio"

// SMS verification service
export const sendVerificationSMSrenamed = async (phoneNumber: string) => {
  try {
    // Generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Store the verification code in the database
    await client.verificationCode.create({
      data: {
        phoneNumber,
        code,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
      },
    })
    
    // Send the SMS via Twilio
    const message = `Your verification code is: ${code}. It will expire in 10 minutes.`
    const result = await sendSMS(phoneNumber, message)
    
    if (!result.success) {
      throw new Error('Failed to send SMS')
    }
    
    // For development, return the code so it can be displayed in the UI
    // In production, you would remove this
    return { status: 200, data: { code, sid: result.sid } }
  } catch (error) {
    console.error("Error sending verification SMS:", error)
    return { status: 500, data: null, error: "Failed to send verification SMS" }
  }
}

// Verify SMS code
export const verifyCode = async (phoneNumber: string, code: string) => {
  try {
    // Find the verification code in the database
    const verificationCode = await client.verificationCode.findFirst({
      where: {
        phoneNumber,
        code,
        expiresAt: {
          gt: new Date(),
        },
        used: false,
      },
    })

    if (!verificationCode) {
      return { status: 400, data: null, error: "Invalid or expired verification code" }
    }

    // Mark the code as used
    await client.verificationCode.update({
      where: { id: verificationCode.id },
      data: { used: true },
    })

    // Update the user's phone verification status
    const user = await client.user.findFirst({
      where: { phone: phoneNumber },
    })

    if (user) {
      await client.user.update({
        where: { id: user.id },
        data: { phoneVerified: true },
      })
    }

    return { status: 200, data: { verified: true } }
  } catch (error) {
    console.error("Error verifying code:", error)
    return { status: 500, data: null, error: "Failed to verify code" }
  }
}

///We use this mock for now, to use the real one, I need to rename the function that is named almost similar to this 
export const sendVerificationSMS = async (phoneNumber: string) => {
  try {
    // Generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    // In a real app, you would use a service like Twilio to send the SMS
    console.log(`Sending verification code ${code} to ${phoneNumber}`)

    // Store the verification code in the database
    // await client.verificationToken.create({
    //   data: {
    //     phoneNumber,
    //     code,
    //     expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
    //   },
    // })

    return { status: 200, data: { code } }
  } catch (error) {
    console.error("Error sending verification SMS:", error)
    return { status: 500, data: null, error: "Failed to send verification SMS" }
  }
}