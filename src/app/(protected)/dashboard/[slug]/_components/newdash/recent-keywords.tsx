"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Keyword {
  id: string
  word: string
  Automation: { name: string }
}

export function RecentKeywords({ keywords }: { keywords: Keyword[] }) {
  return (
    <Card className="w-full bg-gray-900 text-white">
      <CardHeader>
        <CardTitle>Recent Keywords</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          {keywords.map((keyword) => (
            <div key={keyword.id} className="mb-4">
              <p className="font-semibold">{keyword.word}</p>
              <p className="text-sm text-gray-400">Automation: {keyword.Automation.name}</p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

