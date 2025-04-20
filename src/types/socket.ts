// import type { Server as NetServer } from "http"
// import type { NextApiResponse } from "next"
// import type { Server as SocketIOServer } from "socket.io"

// export type NextApiResponseWithSocket = NextApiResponse & {
//   socket: {
//     server: NetServer & {
//       io: SocketIOServer
//     }
//   }
// }

import type { Server as NetServer } from "http"
import type { Server as SocketIOServer } from "socket.io"

// For App Router
export interface SocketServer extends NetServer {
  io?: SocketIOServer
}

// Keep this for backward compatibility if needed
export type NextApiResponseWithSocket = Response & {
  socket?: {
    server: SocketServer
  }
}