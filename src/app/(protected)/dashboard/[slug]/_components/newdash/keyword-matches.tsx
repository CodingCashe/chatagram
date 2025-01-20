"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface KeywordMatch {
  keyword: string
  automationId: string
  createdAt: Date
}

export function KeywordMatches({ matches }: { matches: KeywordMatch[] }) {
  return (
    <Card className="w-full bg-gray-900 text-white">
      <CardHeader>
        <CardTitle>Recent Keyword Matches</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          {matches.map((match, index) => (
            <div key={index} className="mb-4">
              <p className="text-sm text-gray-400">{new Date(match.createdAt).toLocaleString()}</p>
              <p className="mt-1">
                Keyword: <span className="font-semibold">{match.keyword}</span>
              </p>
              <p className="text-sm text-gray-400">Automation ID: {match.automationId}</p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

