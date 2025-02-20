// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"

// interface AIContentGeneratorProps {
//   userId: string
// }

// const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({ userId }) => {
//   const [prompt, setPrompt] = useState("")
//   const [generatedContent, setGeneratedContent] = useState("")
//   const [loading, setLoading] = useState(false)

//   const handleGenerate = async () => {
//     setLoading(true)
//     // TODO: Implement AI content generation
//     // This is a placeholder. Replace with actual AI generation logic.
//     setTimeout(() => {
//       setGeneratedContent(`AI-generated content based on: "${prompt}"`)
//       setLoading(false)
//     }, 2000)
//   }

//   return (
//     <div className="space-y-4 bg-gray-800 p-6 rounded-lg">
//       <div>
//         <Label htmlFor="prompt">Enter a prompt for AI generation</Label>
//         <Input
//           id="prompt"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder="E.g., 'A funny cat meme with a witty caption'"
//         />
//       </div>
//       <Button onClick={handleGenerate} disabled={loading || !prompt}>
//         {loading ? "Generating..." : "Generate Content"}
//       </Button>
//       {generatedContent && (
//         <div>
//           <Label htmlFor="generated-content">Generated Content</Label>
//           <Textarea id="generated-content" value={generatedContent} readOnly rows={4} className="mt-2" />
//         </div>
//       )}
//     </div>
//   )
// }

// export default AIContentGenerator

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

  const handleGenerate = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, userId }),
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
      <div>
        <Label htmlFor="prompt">Enter a prompt for AI generation</Label>
        <Input
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., 'A funny cat meme with a witty caption'"
          className="mt-2"
        />
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
              console.log("Save contentg:", generatedContent)
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

