"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Check, Palette } from "lucide-react"

const themeColors = [
  { name: "Purple Dream", from: "from-purple-600", to: "to-pink-600" },
  { name: "Ocean Breeze", from: "from-blue-600", to: "to-cyan-600" },
  { name: "Forest Magic", from: "from-green-600", to: "to-emerald-600" },
  { name: "Sunset Vibes", from: "from-orange-600", to: "to-red-600" },
  { name: "Cosmic Night", from: "from-indigo-600", to: "to-purple-600" },
]

export function ThemeCustomizer() {
  const [selectedTheme, setSelectedTheme] = useState(0)
  const [customColor, setCustomColor] = useState("#6D28D9")

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Customize Your Theme</h2>
        <p className="text-gray-400">Choose a color scheme that matches your brand</p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {themeColors.map((theme, index) => (
              <div
                key={theme.name}
                className={`relative cursor-pointer group rounded-lg p-4 border ${
                  selectedTheme === index ? "border-purple-500 bg-gray-800/50" : "border-gray-700 hover:border-gray-600"
                }`}
                onClick={() => setSelectedTheme(index)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${theme.from} ${theme.to}`} />
                  <span className="font-medium text-gray-100">{theme.name}</span>
                  {selectedTheme === index && <Check className="w-4 h-4 text-purple-500 absolute right-4" />}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <Label className="text-gray-400">Custom Color</Label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-10 h-10 rounded bg-transparent cursor-pointer"
              />
              <span className="text-sm text-gray-400">{customColor}</span>
            </div>
          </div>

          <div className="pt-4">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Palette className="w-4 h-4 mr-2" />
              Apply Theme
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <h3 className="text-lg font-medium mb-4">Preview</h3>
        <div className="space-y-4">
          <div className="h-20 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 animate-gradient" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-10 rounded bg-gray-800 border border-gray-700" />
            <div className="h-10 rounded bg-gray-800 border border-gray-700" />
            <div className="h-10 rounded bg-gray-800 border border-gray-700" />
          </div>
        </div>
      </Card>
    </section>
  )
}

