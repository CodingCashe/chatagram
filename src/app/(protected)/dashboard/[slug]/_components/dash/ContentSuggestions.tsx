'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, RefreshCw } from 'lucide-react'

const ContentSuggestions = () => {
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const generateSuggestions = async () => {
    setLoading(true)
    // Simulating API call to AI service
    await new Promise(resolve => setTimeout(resolve, 2000))
    const newSuggestions = [
      "Share a behind-the-scenes look at your creative process",
      "Create a poll asking followers about their favorite product",
      "Post a user-generated content challenge",
      "Share an inspiring quote related to your niche",
      "Create a tutorial video on how to use your product"
    ]
    setSuggestions(newSuggestions)
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          AI Content Suggestions
          <Button size="sm" onClick={generateSuggestions} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            Generate
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {suggestions.length > 0 ? (
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="bg-secondary p-2 rounded-md">{suggestion}</li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted-foreground">Click generate to get AI-powered content suggestions</p>
        )}
      </CardContent>
    </Card>
  )
}

export default ContentSuggestions

