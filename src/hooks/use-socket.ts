// "use client"

// import { useEffect, useState } from "react"
// import { io, type Socket } from "socket.io-client"
// import { useToast } from "./use-toast"

// let socket: Socket | null = null

// export function useSocket(userId: string | undefined) {
//   const [isConnected, setIsConnected] = useState(false)
//   const { toast } = useToast()

//   useEffect(() => {
//     if (!userId) return

//     // Initialize socket connection if not already established
//     if (!socket) {
//       const socketInitializer = async () => {
//         await fetch("/api/socket")

//         socket = io({
//           path: "/api/socket",
//         })

//         socket.on("connect", () => {
//           console.log("Socket connected")
//           setIsConnected(true)

//           // Authenticate with userId
//           socket?.emit("authenticate", userId)
//         })

//         socket.on("disconnect", () => {
//           console.log("Socket disconnected")
//           setIsConnected(false)
//         })

//         socket.on("connect_error", (err) => {
//           console.error("Connection error:", err)
//           toast({
//             title: "Connection Error",
//             description: "Unable to connect to chat server. Please refresh the page.",
//             variant: "destructive",
//           })
//           setIsConnected(false)
//         })
//       }

//       socketInitializer()
//     } else if (socket && userId) {
//       // Re-authenticate if we already have a socket but userId changed
//       socket.emit("authenticate", userId)
//     }

//     return () => {
//       // We don't disconnect the socket on component unmount
//       // because we want to keep the connection alive for background notifications
//       // socket?.disconnect();
//     }
//   }, [userId, toast])

//   return {
//     socket,
//     isConnected,
//   }
// }

// "use client"

// import { useEffect, useState } from "react"
// import { io, type Socket } from "socket.io-client"
// import { useToast } from "@/hooks/use-toast"

// // Create a single socket instance that can be reused
// let socketInstance: Socket | null = null

// export function useSocket(userId: string | undefined) {
//   const [isConnected, setIsConnected] = useState(false)
//   const { toast } = useToast()

//   useEffect(() => {
//     if (!userId) return

//     const initializeSocket = async () => {
//       try {
//         // Initialize the socket connection if it doesn't exist
//         if (!socketInstance) {
//           // First, call our API route to set up the socket server
//           await fetch("/api/socket")

//           // Then create the client connection
//           socketInstance = io({
//             path: "/api/socket",
//             reconnectionAttempts: 5,
//             reconnectionDelay: 1000,
//             reconnectionDelayMax: 5000,
//           })

//           socketInstance.on("connect", () => {
//             console.log("Socket connected with ID:", socketInstance?.id)
//             setIsConnected(true)

//             // Authenticate with userId
//             socketInstance?.emit("authenticate", userId)
//           })

//           socketInstance.on("disconnect", () => {
//             console.log("Socket disconnected")
//             setIsConnected(false)
//           })

//           socketInstance.on("connect_error", (err) => {
//             console.error("Connection error:", err)
//             toast({
//               title: "Connection Error",
//               description: "Unable to connect to chat server. Please refresh the page.",
//               variant: "destructive",
//             })
//             setIsConnected(false)
//           })
//         } else if (socketInstance && !socketInstance.connected) {
//           // If socket exists but is disconnected, try to reconnect
//           socketInstance.connect()
//         } else if (socketInstance && socketInstance.connected) {
//           // If socket is already connected, just update the state
//           setIsConnected(true)

//           // Re-authenticate with the current userId
//           socketInstance.emit("authenticate", userId)
//         }
//       } catch (error) {
//         console.error("Socket initialization error:", error)
//         toast({
//           title: "Connection Error",
//           description: "Failed to initialize chat connection.",
//           variant: "destructive",
//         })
//       }
//     }

//     initializeSocket()

//     // Cleanup function
//     return () => {
//       // We don't disconnect the socket on component unmount
//       // because we want to keep the connection alive for background notifications
//     }
//   }, [userId, toast])

//   return {
//     socket: socketInstance,
//     isConnected,
//   }
// }

"use client"

import { useEffect, useState } from "react"
import { io, type Socket } from "socket.io-client"
import { useToast } from "@/hooks/use-toast"

// Create a single socket instance that can be reused
let socketInstance: Socket | null = null

// Socket.io server URL - use environment variable
const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "https://yazil.onrender.com"

export function useSocket(userId: string | undefined) {
  const [isConnected, setIsConnected] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (!userId) return

    const initializeSocket = async () => {
      try {
        // Initialize the socket connection if it doesn't exist
        if (!socketInstance) {
          console.log(`Connecting to Socket.io server at ${SOCKET_SERVER_URL}`)

          socketInstance = io(SOCKET_SERVER_URL, {
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            auth: { userId }, // Send userId in auth object
          })

          socketInstance.on("connect", () => {
            console.log("Socket connected with ID:", socketInstance?.id)
            setIsConnected(true)
          })

          socketInstance.on("disconnect", () => {
            console.log("Socket disconnected")
            setIsConnected(false)
          })

          socketInstance.on("connect_error", (err) => {
            console.error("Connection error:", err)
            toast({
              title: "Connection Error",
              description: "Unable to connect to chat server. Please refresh the page.",
              variant: "destructive",
            })
            setIsConnected(false)
          })
        } else if (socketInstance && !socketInstance.connected) {
          // If socket exists but is disconnected, try to reconnect
          socketInstance.auth = { userId } // Update auth with current userId
          socketInstance.connect()
        } else if (socketInstance && socketInstance.connected) {
          // If socket is already connected, just update the state
          setIsConnected(true)

          // // Update auth with current userId if needed
          // if (socketInstance.auth. !== userId) {
          //   socketInstance.disconnect().connect()
          // }
        }
      } catch (error) {
        console.error("Socket initialization error:", error)
        toast({
          title: "Connection Error",
          description: "Failed to initialize chat connection.",
          variant: "destructive",
        })
      }
    }

    initializeSocket()

    // Cleanup function
    return () => {
      // We don't disconnect the socket on component unmount
      // because we want to keep the connection alive for background notifications
    }
  }, [userId, toast])

  return {
    socket: socketInstance,
    isConnected,
  }
}

