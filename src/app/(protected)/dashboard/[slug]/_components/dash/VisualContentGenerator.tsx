'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, ImageIcon } from 'lucide-react'

const VisualContentGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)

  const generateImage = async () => {
    setLoading(true)
    // Simulating API call to AI image generation service
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // For demonstration, we're using a placeholder image
    const placeholderImage = `https://picsum.photos/800/600?random=${Math.random()}`
    setGeneratedImage(placeholderImage)
    setLoading(false)
  }

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader>
        <CardTitle>AI Visual Content Generator</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Describe the image you want to generate"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button onClick={generateImage} disabled={loading || !prompt}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ImageIcon className="mr-2 h-4 w-4" />}
            Generate
          </Button>
        </div>
        <div className="flex-grow flex items-center justify-center bg-secondary rounded-md overflow-hidden">
          {generatedImage ? (
            <img src={generatedImage} alt="Generated content" className="max-w-full max-h-full object-contain" />
          ) : (
            <p className="text-text-secondary">Your generated image will appear here</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default VisualContentGenerator

