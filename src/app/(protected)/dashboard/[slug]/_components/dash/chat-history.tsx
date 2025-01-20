// 'use client'

// import { useState, useEffect } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { ScrollArea } from '@/components/ui/scroll-area'
// import { getChatHistory } from '@/actions/webhook/queries'

// export function ChatHistory() {
//   const [chatHistory, setChatHistory] = useState<any[]>([])

//   useEffect(() => {
//     async function fetchChatHistory() {
//       try {
//         const history = await getChatHistory('user123', 'bot')
//         setChatHistory(history.history)
//       } catch (error) {
//         console.error('Failed to fetch chat history:', error)
//       }
//     }

//     fetchChatHistory()
//   }, [])

//   return (
//     <Card className="h-[400px] flex flex-col">
//       <CardHeader>
//         <CardTitle>Chat History</CardTitle>
//       </CardHeader>
//       <CardContent className="flex-grow overflow-hidden">
//         <ScrollArea className="h-full">
//           <div className="space-y-4">
//             {chatHistory.map((message, index) => (
//               <div
//                 key={index}
//                 className={`flex ${
//                   message.role === 'assistant' ? 'justify-start' : 'justify-end'
//                 }`}
//               >
//                 <div
//                   className={`max-w-[70%] rounded-lg p-2 ${
//                     message.role === 'assistant'
//                       ? 'bg-blue-100 text-blue-900'
//                       : 'bg-green-100 text-green-900'
//                   }`}
//                 >
//                   <p className="text-sm">{message.content}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { useState } from "react"
import { fetchChatHistory } from "@/actions/dashboard/dashboard"
import { ErrorBoundary } from "react-error-boundary"

function ChatHistoryContent() {
  const [sender, setSender] = useState("")
  const [receiver, setReceiver] = useState("")
  const [history, setHistory] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const result = await fetchChatHistory(sender, receiver)
      setHistory(result)
    } catch (err) {
      setError("Failed to fetch chat history. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Chat History</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          placeholder="Enter sender"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          placeholder="Enter receiver"
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          {loading ? "Fetching..." : "Fetch Chat History"}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {history && (
        <div>
          <h3 className="font-bold">Chat history:</h3>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(history, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default function ChatHistory() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong. Please try again later.</div>}>
      <ChatHistoryContent />
    </ErrorBoundary>
  )
}

