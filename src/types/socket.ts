import type { Server as NetServer } from "http"
import type { NextApiResponse } from "next"
import type { Server as SocketIOServer } from "socket.io"

export type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}

