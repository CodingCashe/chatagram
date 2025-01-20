// 'use client'

// import { useState, useEffect } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { matchKeyword } from '@/actions/webhook/queries'
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// export function KeywordPerformance() {
//   const [keywords, setKeywords] = useState<any[]>([])

//   useEffect(() => {
//     async function fetchKeywords() {
//       const sampleKeywords = ['instagram', 'automation', 'dm', 'marketing']
//       const keywordData = await Promise.all(
//         sampleKeywords.map(async (keyword) => {
//           const match = await matchKeyword(keyword)
//           return { keyword, count: match ? 1 : 0 }
//         })
//       )
//       setKeywords(keywordData)
//     }

//     fetchKeywords()
//   }, [])

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Keyword Performance</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={keywords}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="keyword" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="count" fill="#8884d8" />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { useState } from "react"
import { fetchKeywordAutomation } from "@/actions/dashboard/dashboard"
import { ErrorBoundary } from "react-error-boundary"

function KeywordAutomationContent() {
  const [automationId, setAutomationId] = useState("")
  const [dm, setDm] = useState(false)
  const [automation, setAutomation] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const result = await fetchKeywordAutomation(automationId, dm)
      setAutomation(result)
    } catch (err) {
      setError("Failed to fetch keyword automation. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Keyword Automation</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={automationId}
          onChange={(e) => setAutomationId(e.target.value)}
          placeholder="Enter automation ID"
          className="w-full p-2 border rounded mb-2"
        />
        <label className="flex items-center mb-2">
          <input type="checkbox" checked={dm} onChange={(e) => setDm(e.target.checked)} className="mr-2" />
          DM
        </label>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          {loading ? "Fetching..." : "Fetch Automation"}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {automation && (
        <div>
          <h3 className="font-bold">Automation details:</h3>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(automation, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default function KeywordAutomation() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong. Please try again later.</div>}>
      <KeywordAutomationContent />
    </ErrorBoundary>
  )
}

