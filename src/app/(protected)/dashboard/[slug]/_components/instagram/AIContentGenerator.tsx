"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AIContentGeneratorProps {
  userId: string
}

interface GeneratedContent {
  imageUrl: string
  caption: string
}

const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({ userId }) => {
  const [prompt, setPrompt] = useState("")
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [style, setStyle] = useState("realistic") // Add style selection

  const handleGenerate = async () => {
    try {
      setLoading(true)
      setError(null)

      // Enhance prompt with selected style
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

  return (
    <div className="space-y-4 bg-gray-800 p-6 rounded-lg max-w-2xl mx-auto">
      <div className="space-y-4">
        <div>
          <Label htmlFor="prompt">Enter a prompt for AI generation</Label>
          <Input
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., 'A serene mountain landscape at sunset'"
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="style">Select Style</Label>
          <Select value={style} onValueChange={setStyle}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select a style" />
            </SelectTrigger>
            <SelectContent>
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

      <Button onClick={handleGenerate} disabled={loading || !prompt} className="w-full">
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
        <Alert variant="destructive">
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
            <Label htmlFor="generated-content">Generated Caption</Label>
            <Textarea id="generated-content" value={generatedContent.caption} readOnly rows={4} className="mt-2" />
          </div>

          <Button
            onClick={() => {
              // TODO: Implement saving to your database
              console.log("Save content:", generatedContent)
            }}
            variant="secondary"
            className="w-full"
          >
            Save to Drafts
          </Button>
        </div>
      )}
    </div>
  )
}

export default AIContentGenerator

