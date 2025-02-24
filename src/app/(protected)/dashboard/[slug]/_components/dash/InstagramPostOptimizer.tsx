import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Loader2, ImageIcon } from 'lucide-react'

interface OptimizationResult {
  score: number;
  suggestions: string[];
  predictedLikes: number;
  predictedComments: number;
}

const InstagramPostOptimizer: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [hashtags, setHashtags] = useState('')
  const [postTime, setPostTime] = useState<number[]>([12])
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null)

  const optimizePost = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const result: OptimizationResult = {
      score: Math.random() * 100,
      suggestions: [
        "Try adding more emojis to increase engagement",
        "Consider using trending hashtags like #summervibes",
        "Your image has great potential, try increasing contrast slightly",
      ],
      predictedLikes: Math.floor(Math.random() * 10000),
      predictedComments: Math.floor(Math.random() * 1000),
    }
    
    setOptimizationResult(result)
    setLoading(false)
  }

  useEffect(() => {
    if (caption || image || hashtags) {
      optimizePost()
    }
  }, [caption, image, hashtags, postTime])

  return (
    <Card className="h-auto flex flex-col">
      <CardHeader>
        <CardTitle>AI Instagram Post Optimizer</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Textarea
              placeholder="Enter your post caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="h-32"
            />
            <Input
              type="text"
              placeholder="Enter hashtags"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              className="mt-2"
            />
            <div className="mt-2">
              <label className="text-sm font-medium">Post Time (24h format)</label>
              <Slider
                value={postTime}
                onValueChange={setPostTime}
                max={24}
                step={1}
              />
              <div className="text-center mt-1">{postTime[0]}:00</div>
            </div>
          </div>
          <div className="w-full md:w-64 h-48 md:h-64 bg-secondary rounded-md flex items-center justify-center">
            {image ? (
              <img src={image} alt="Post" className="max-w-full max-h-full object-contain" />
            ) : (
              <Button onClick={() => setImage(`https://picsum.photos/256/256?random=${Math.random()}`)}>
                <ImageIcon className="mr-2 h-4 w-4" />
                Add Image
              </Button>
            )}
          </div>
        </div>
        
        {loading && (
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}
        
        {optimizationResult && (
          <div className="bg-secondary p-4 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Optimization Score</h3>
              <span className="text-2xl font-bold">{optimizationResult.score.toFixed(1)}%</span>
            </div>
            <div className="space-y-2">
              {optimizationResult.suggestions.map((suggestion, index) => (
                <p key={index} className="text-sm">• {suggestion}</p>
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <div className="text-center">
                <p className="text-sm text-text-secondary">Predicted Likes</p>
                <p className="text-lg font-semibold">{optimizationResult.predictedLikes.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-text-secondary">Predicted Comments</p>
                <p className="text-lg font-semibold">{optimizationResult.predictedComments.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default InstagramPostOptimizer
