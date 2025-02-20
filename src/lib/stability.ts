// import { Client } from "@stability/sdk"

// export const stability = new Client({
//   apiKey: process.env.STABILITY_API_KEY,
// })

import OpenAi from 'openai'

export const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
})
