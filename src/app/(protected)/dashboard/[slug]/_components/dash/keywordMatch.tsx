"use client"

import { useState } from "react"
import { fetchKeywordMatch } from "@/actions/dashboard/dashboard"
import { ErrorBoundary } from "react-error-boundary"

function KeywordMatchContent() {
  const [keyword, setKeyword] = useState("")
  const [match, setMatch] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const result = await fetchKeywordMatch(keyword)
      setMatch(result)
    } catch (err) {
      setError("Failed to fetch keyword match. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Keyword Match</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keyword"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {match && (
        <div>
          <h3 className="font-bold">Match found:</h3>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(match, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default function KeywordMatch() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong. Please try again later.</div>}>
      <KeywordMatchContent />
    </ErrorBoundary>
  )
}

