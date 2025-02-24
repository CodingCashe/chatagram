'use client'

import AutomationList from '@/components/global/automation-list'
import CreateAutomation from '@/components/global/create-automation'
import { useQueryAutomations } from '@/hooks/user-queries'
import { Check, Zap, Sparkles, Rocket } from 'lucide-react'
import React from 'react'

const AutomationStatus = ({ count }: { count: number }) => {
  if (count === 0) {
    return (
      <div className="flex items-center gap-2 text-yellow-500">
        <Zap className="w-10 h-10" />
        <p>Ready to supercharge your workflow? Create your first automation!</p>
      </div>
    )
  } else if (count < 3) {
    return (
      <div className="flex items-center gap-2 text-green-500">
        <Sparkles className="w-10 h-10" />
        <p>Great start! You are on your way to automation mastery.</p>
      </div>
    )
  } else {
    return (
      <div className="flex items-center gap-2 text-blue-500">
        <Rocket className="w-10 h-10" />
        <p>Wow! You are an automation pro. Keep optimizing your workflow!</p>
      </div>
    )
  }
}

const Page = () => {
  const { data } = useQueryAutomations()
  const automations = data?.data || []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
      <div className="lg:col-span-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
        <AutomationList 
          id={automations.length > 0 ? automations[0].id : ''}
        />
      </div>
      <div className="lg:col-span-2 lg:sticky lg:top-16">
        <div className="flex flex-col rounded-xl bg-gradient-to-br from-background-80 to-background-100 gap-y-6 p-5 border-[1px] overflow-hidden border-in-active shadow-lg transition-all duration-300 hover:shadow-xl">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-primary">My Automations</h2>
            <AutomationStatus count={automations.length} />
          </div>
          <div className="flex flex-col gap-y-4 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary scrollbar-track-background-100">
            {automations.map((automation) => (
              <div
                key={automation.id}
                className="flex items-start justify-between bg-background-90 p-3 rounded-lg transition-all duration-200 hover:bg-background-100"
              >
                <div className="flex flex-col">
                  <h3 className="font-medium text-primary">
                    {automation.name}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {automation.createdAt ? new Date(automation.createdAt).toLocaleDateString() : 'No Date'}
                  </p>
                </div>
                <Check className="text-green-500" />
              </div>
            ))}
          </div>
          <CreateAutomation />
        </div>
      </div>
    </div>
  )
}

export default Page

