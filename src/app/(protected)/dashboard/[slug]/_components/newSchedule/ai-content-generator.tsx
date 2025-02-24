"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, AlertCircle, Check } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AIContentGeneratorProps {
  userId: string
  onSelect: (content: { imageUrl: string; caption: string }) => void
}

interface GeneratedContent {
  imageUrl: string
  caption: string
}

const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({ userId, onSelect }) => {
  const [prompt, setPrompt] = useState("")
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [style, setStyle] = useState("realistic")
  const [isSelected, setIsSelected] = useState(false)

  const handleGenerate = async () => {
    try {
      setLoading(true)
      setError(null)
      setIsSelected(false)

      const enhancedPrompt = `${prompt} --style ${style}`

      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: enhancedPrompt, userId }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate content")
      }

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      setGeneratedContent(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while generating content")
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = () => {
    if (generatedContent) {
      onSelect(generatedContent)
      setIsSelected(true)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div>
          <Label htmlFor="prompt" className="text-gray-200">
            Prompt for AI generation
          </Label>
          <Input
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., 'A serene mountain landscape at sunset'"
            className="mt-2 bg-gray-800/50 border-gray-700 text-gray-200 placeholder:text-gray-500"
          />
        </div>

        <div>
          <Label htmlFor="style" className="text-gray-200">
            Image Style
          </Label>
          <Select value={style} onValueChange={setStyle}>
            <SelectTrigger className="mt-2 bg-gray-800/50 border-gray-700 text-gray-200">
              <SelectValue placeholder="Select a style" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="realistic">Realistic</SelectItem>
              <SelectItem value="anime">Anime</SelectItem>
              <SelectItem value="digital-art">Digital Art</SelectItem>
              <SelectItem value="oil-painting">Oil Painting</SelectItem>
              <SelectItem value="watercolor">Watercolor</SelectItem>
              <SelectItem value="sketch">Sketch</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={handleGenerate}
        disabled={loading || !prompt}
        className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          "Generate Content"
        )}
      </Button>

      {error && (
        <Alert variant="destructive" className="bg-red-900/50 border-red-800">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {generatedContent && (
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg">
            <Image
              src={generatedContent.imageUrl || "/placeholder.svg"}
              alt="Generated content"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div>
            <Label htmlFor="generated-content" className="text-gray-200">
              Generated Caption
            </Label>
            <Textarea
              id="generated-content"
              value={generatedContent.caption}
              readOnly
              rows={4}
              className="mt-2 bg-gray-800/50 border-gray-700 text-gray-200"
            />
          </div>

          <Button
            onClick={handleSelect}
            disabled={isSelected}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200"
          >
            {isSelected ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Selected for Post
              </>
            ) : (
              "Use for Post"
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

export default AIContentGenerator

