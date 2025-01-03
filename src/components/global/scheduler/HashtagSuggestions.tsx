'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { getHashtagSuggestions } from '@/lib/instagram'

interface HashtagSuggestionsProps {
  onSelect: (hashtag: string) => void;
}

const HashtagSuggestions: React.FC<HashtagSuggestionsProps> = ({ onSelect }) => {
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    fetchSuggestions()
  }, [])

  const fetchSuggestions = async () => {
    try {
      const result = await getHashtagSuggestions()
      setSuggestions(result.hashtags)
    } catch (error) {
      console.error('Error fetching hashtag suggestions:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch hashtag suggestions. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {suggestions.map((hashtag, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onSelect(hashtag)}
        >
          #{hashtag}
        </Button>
      ))}
    </div>
  )
}

export default HashtagSuggestions

