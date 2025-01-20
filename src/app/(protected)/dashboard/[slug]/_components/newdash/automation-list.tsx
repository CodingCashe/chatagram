"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Automation {
  id: string
  name: string
  active: boolean
  createdAt: Date
}

export function AutomationList({ automations }: { automations: Automation[] }) {
  return (
    <Card className="w-full bg-gray-800 text-white">
      <CardHeader>
        <CardTitle>My Automations</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          {automations.map((automation) => (
            <div key={automation.id} className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{automation.name}</p>
                <p className="text-sm text-gray-400">Created: {new Date(automation.createdAt).toLocaleDateString()}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${automation.active ? "bg-green-500" : "bg-red-500"}`}>
                {automation.active ? "Active" : "Inactive"}
              </span>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

