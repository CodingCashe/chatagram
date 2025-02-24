"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, Power } from "lucide-react"

interface Automation {
  id: string
  name: string
  active: boolean
  createdAt: Date
}

export function AutomationList({ automations }: { automations: Automation[] }) {
  return (
    <Card className="w-full overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="relative">
        <CardTitle className="flex items-center space-x-2 z-10">
          <Activity className="w-6 h-6 text-primary" />
          <span className="text-foreground">My Automations</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <AnimatePresence>
            {automations.map((automation, index) => (
              <motion.div
                key={automation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="mb-4 bg-background/50 border border-primary/20 hover:bg-background/70 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{automation.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Created: {new Date(automation.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="relative">
                        <Power className={`w-6 h-6 ${automation.active ? "text-primary" : "text-muted-foreground"}`} />
                        <span
                          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                            automation.active ? "bg-green-400" : "bg-red-400"
                          } animate-ping`}
                        ></span>
                      </div>
                    </div>
                    <div className="mt-2 w-full bg-muted h-1 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

