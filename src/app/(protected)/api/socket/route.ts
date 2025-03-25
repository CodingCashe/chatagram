// import { Server } from "socket.io"
// import type { NextApiRequest } from "next"
// import type { NextApiResponseWithSocket } from "@/types/socket"
// import { client } from "@/lib/prisma"

// export default async function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
//   if (!res.socket.server.io) {
//     console.log("Setting up socket.io server...")
//     const io = new Server(res.socket.server, {
//       path: "/api/socket",
//       addTrailingSlash: false,
//     })

//     // Store the socket.io server instance
//     res.socket.server.io = io

//     io.on("connection", (socket) => {
//       console.log(`Client connected: ${socket.id}`)

//       // User authentication
//       socket.on("authenticate", async (userId) => {
//         if (userId) {
//           socket.join(`user:${userId}`)
//           console.log(`User ${userId} authenticated and joined their room`)

//           // Join admin room if user is admin
//           try {
//             const user = await client.user.findUnique({
//               where: { id: userId },
//               select: { isAdmin: true },
//             })

//             if (user?.isAdmin) {
//               socket.join("admins")
//               console.log(`Admin ${userId} joined admin room`)
//             }
//           } catch (error) {
//             console.error("Error checking admin status:", error)
//           }
//         }
//       })

//       // Handle chat messages
//       socket.on("send_message", async (data) => {
//         try {
//           const { content, senderId, receiverId, isFromAdmin } = data

//           // Save message to database
//           const message = await client.chatMessage.create({
//             data: {
//               content,
//               senderId,
//               receiverId,
//               isFromAdmin,
//               isRead: false,
//             },
//           })

//           // Emit to specific user's room
//           if (receiverId) {
//             io.to(`user:${receiverId}`).emit("new_message", {
//               ...message,
//               createdAt: message.createdAt.toISOString(),
//               updatedAt: message.updatedAt.toISOString(),
//             })
//           }

//           // Also emit to admins if message is from regular user
//           if (!isFromAdmin) {
//             io.to("admins").emit("new_message", {
//               ...message,
//               createdAt: message.createdAt.toISOString(),
//               updatedAt: message.updatedAt.toISOString(),
//             })
//           }

//           // Create notification for the receiver
//           if (receiverId) {
//             await client.userNotification.create({
//               data: {
//                 userId: receiverId,
//                 title: "New Message",
//                 message: `You have a new message from ${isFromAdmin ? "Admin" : "User"}`,
//                 type: "chat",
//                 read: false,
//               },
//             })

//             // Notify about the new notification
//             io.to(`user:${receiverId}`).emit("new_notification", {
//               type: "chat",
//               message: "You have a new message",
//             })
//           }

//           // If it's to admins, notify all admins
//           if (!isFromAdmin) {
//             // Get all admin users
//             const admins = await client.user.findMany({
//               where: { isAdmin: true },
//               select: { id: true },
//             })

//             // Create notifications for each admin
//             for (const admin of admins) {
//               await client.userNotification.create({
//                 data: {
//                   userId: admin.id,
//                   title: "New User Message",
//                   message: `You have a new message from a user`,
//                   type: "chat",
//                   read: false,
//                 },
//               })
//             }

//             // Notify all admins
//             io.to("admins").emit("new_notification", {
//               type: "chat",
//               message: "New user message received",
//             })
//           }

//           // Return confirmation to sender
//           socket.emit("message_sent", {
//             success: true,
//             messageId: message.id,
//           })
//         } catch (error) {
//           console.error("Error sending message:", error)
//           socket.emit("message_sent", {
//             success: false,
//             error: "Failed to send message",
//           })
//         }
//       })

//       // Handle marking messages as read
//       socket.on("mark_as_read", async (messageId) => {
//         try {
//           await client.chatMessage.update({
//             where: { id: messageId },
//             data: { isRead: true },
//           })

//           socket.emit("message_marked_read", {
//             success: true,
//             messageId,
//           })
//         } catch (error) {
//           console.error("Error marking message as read:", error)
//           socket.emit("message_marked_read", {
//             success: false,
//             error: "Failed to mark message as read",
//           })
//         }
//       })

//       // Handle automation creation notification
//       socket.on("automation_created", async (data) => {
//         try {
//           const { userId, automationName } = data

//           // Get all admin users
//           const admins = await client.user.findMany({
//             where: { isAdmin: true },
//             select: { id: true },
//           })

//           // Create notifications for each admin
//           for (const admin of admins) {
//             await client.userNotification.create({
//               data: {
//                 userId: admin.id,
//                 title: "New Automation Created",
//                 message: `A new automation "${automationName}" was created`,
//                 type: "automation",
//                 read: false,
//               },
//             })
//           }

//           // Notify all admins
//           io.to("admins").emit("new_notification", {
//             type: "automation",
//             message: `New automation "${automationName}" created`,
//           })
//         } catch (error) {
//           console.error("Error sending automation notification:", error)
//         }
//       })

//       // Handle disconnect
//       socket.on("disconnect", () => {
//         console.log(`Client disconnected: ${socket.id}`)
//       })
//     })
//   }

//   res.status(200).json({ success: true })
// }

// // Add this line at the top of your file
// export const dynamic = 'force-dynamic'

// // Rest of your page component
// import { Server } from "socket.io"
// import { NextRequest } from "next/server"
// import { client } from "@/lib/prisma"

// // Define a global variable to store the Socket.io instance
// let io: Server

// export async function GET(req: NextRequest) {
//   // Get the response and socket from the Next.js server
//   const res = await fetch('https://yazil.vercel.app')
//   const cRes = new Response(res.body)
  
//   // @ts-ignore - we need to access the socket
//   const socket = (cRes as any).socket?.server
  
//   if (socket && !socket.io) {
//     console.log("Setting up socket.io server...")
//     io = new Server(socket, {
//       path: "/api/socket",
//       addTrailingSlash: false,
//     })

//     // Store the socket.io server instance
//     socket.io = io

//     io.on("connection", (socket) => {
//       console.log(`Client connected: ${socket.id}`)

//       // User authentication
//       socket.on("authenticate", async (userId) => {
//         if (userId) {
//           socket.join(`user:${userId}`)
//           console.log(`User ${userId} authenticated and joined their room`)

//           // Join admin room if user is admin
//           try {
//             const user = await client.user.findUnique({
//               where: { id: userId },
//               select: { isAdmin: true },
//             })

//             if (user?.isAdmin) {
//               socket.join("admins")
//               console.log(`Admin ${userId} joined admin room`)
//             }
//           } catch (error) {
//             console.error("Error checking admin status:", error)
//           }
//         }
//       })

//       // Handle chat messages
//       socket.on("send_message", async (data) => {
//         try {
//           const { content, senderId, receiverId, isFromAdmin } = data

//           // Save message to database
//           const message = await client.chatMessage.create({
//             data: {
//               content,
//               senderId,
//               receiverId,
//               isFromAdmin,
//               isRead: false,
//             },
//           })

//           // Emit to specific user's room
//           if (receiverId) {
//             io.to(`user:${receiverId}`).emit("new_message", {
//               ...message,
//               createdAt: message.createdAt.toISOString(),
//               updatedAt: message.updatedAt.toISOString(),
//             })
//           }

//           // Also emit to admins if message is from regular user
//           if (!isFromAdmin) {
//             io.to("admins").emit("new_message", {
//               ...message,
//               createdAt: message.createdAt.toISOString(),
//               updatedAt: message.updatedAt.toISOString(),
//             })
//           }

//           // Create notification for the receiver
//           if (receiverId) {
//             await client.userNotification.create({
//               data: {
//                 userId: receiverId,
//                 title: "New Message",
//                 message: `You have a new message from ${isFromAdmin ? "Admin" : "User"}`,
//                 type: "chat",
//                 read: false,
//               },
//             })

//             // Notify about the new notification
//             io.to(`user:${receiverId}`).emit("new_notification", {
//               type: "chat",
//               message: "You have a new message",
//             })
//           }

//           // If it's to admins, notify all admins
//           if (!isFromAdmin) {
//             // Get all admin users
//             const admins = await client.user.findMany({
//               where: { isAdmin: true },
//               select: { id: true },
//             })

//             // Create notifications for each admin
//             for (const admin of admins) {
//               await client.userNotification.create({
//                 data: {
//                   userId: admin.id,
//                   title: "New User Message",
//                   message: `You have a new message from a user`,
//                   type: "chat",
//                   read: false,
//                 },
//               })
//             }

//             // Notify all admins
//             io.to("admins").emit("new_notification", {
//               type: "chat",
//               message: "New user message received",
//             })
//           }

//           // Return confirmation to sender
//           socket.emit("message_sent", {
//             success: true,
//             messageId: message.id,
//           })
//         } catch (error) {
//           console.error("Error sending message:", error)
//           socket.emit("message_sent", {
//             success: false,
//             error: "Failed to send message",
//           })
//         }
//       })

//       // Handle marking messages as read
//       socket.on("mark_as_read", async (messageId) => {
//         try {
//           await client.chatMessage.update({
//             where: { id: messageId },
//             data: { isRead: true },
//           })

//           socket.emit("message_marked_read", {
//             success: true,
//             messageId,
//           })
//         } catch (error) {
//           console.error("Error marking message as read:", error)
//           socket.emit("message_marked_read", {
//             success: false,
//             error: "Failed to mark message as read",
//           })
//         }
//       })

//       // Handle automation creation notification
//       socket.on("automation_created", async (data) => {
//         try {
//           const { userId, automationName } = data

//           // Get all admin users
//           const admins = await client.user.findMany({
//             where: { isAdmin: true },
//             select: { id: true },
//           })

//           // Create notifications for each admin
//           for (const admin of admins) {
//             await client.userNotification.create({
//               data: {
//                 userId: admin.id,
//                 title: "New Automation Created",
//                 message: `A new automation "${automationName}" was created`,
//                 type: "automation",
//                 read: false,
//               },
//             })
//           }

//           // Notify all admins
//           io.to("admins").emit("new_notification", {
//             type: "automation",
//             message: `New automation "${automationName}" created`,
//           })
//         } catch (error) {
//           console.error("Error sending automation notification:", error)
//         }
//       })

//       // Handle disconnect
//       socket.on("disconnect", () => {
//         console.log(`Client disconnected: ${socket.id}`)
//       })
//     })
//   }

//   return new Response(JSON.stringify({ success: true }), {
//     status: 200,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
// }

export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server"
import { Server } from "socket.io"

// Store the socket.io server instance
let io: any

export async function GET(req: Request) {
  // Get the server instance from the global object
  const res = NextResponse.next()

  // @ts-ignore - NextJS doesn't have proper types for this yet
  const server = res.socket?.server

  if (server && !server.io) {
    console.log("Setting up Socket.io server...")

    // Create a new Socket.io server
    io = new Server(server, {
      path: "/api/socket",
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    })

    // Store the io instance on the server object
    server.io = io

    io.on("connection", (socket: any) => {
      console.log(`Client connected: ${socket.id}`)

      // User authentication
      socket.on("authenticate", async (userId: string) => {
        if (userId) {
          socket.join(`user:${userId}`)
          console.log(`User ${userId} authenticated and joined their room`)

          // Check if user is admin
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/is-admin?userId=${userId}`)
            const data = await response.json()

            if (data.isAdmin) {
              socket.join("admins")
              console.log(`Admin ${userId} joined admin room`)
            }
          } catch (error) {
            console.error("Error checking admin status:", error)
          }
        }
      })

      // Handle chat messages
      socket.on("send_message", async (data: any) => {
        try {
          const { content, senderId, receiverId, isFromAdmin } = data

          // Create a message object
          const message = {
            id: Math.random().toString(36).substring(2, 15),
            content,
            senderId,
            receiverId,
            isFromAdmin,
            isRead: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }

          // Emit to specific user's room
          if (receiverId) {
            io.to(`user:${receiverId}`).emit("new_message", message)
          }

          // Also emit to admins if message is from regular user
          if (!isFromAdmin) {
            io.to("admins").emit("new_message", message)
          }

          // Return confirmation to sender
          socket.emit("message_sent", {
            success: true,
            messageId: message.id,
          })
        } catch (error) {
          console.error("Error sending message:", error)
          socket.emit("message_sent", {
            success: false,
            error: "Failed to send message",
          })
        }
      })

      // Handle marking messages as read
      socket.on("mark_as_read", async (messageId: string) => {
        try {
          // In a real app, you would update the database here

          socket.emit("message_marked_read", {
            success: true,
            messageId,
          })
        } catch (error) {
          console.error("Error marking message as read:", error)
          socket.emit("message_marked_read", {
            success: false,
            error: "Failed to mark message as read",
          })
        }
      })

      // Handle typing indicators
      socket.on("user_typing", (data: any) => {
        // Forward typing indicator to admins
        io.to("admins").emit("user_typing", {
          userId: data.userId,
          typing: data.typing,
        })
      })

      socket.on("admin_typing", (data: any) => {
        // Forward typing indicator to specific user
        if (data.userId) {
          io.to(`user:${data.userId}`).emit("admin_typing", {
            typing: data.typing,
          })
        }
      })

      // Handle disconnect
      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`)
      })
    })
  }

  return NextResponse.json({ success: true })
}

