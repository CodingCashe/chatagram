// 'use client'

// import React, { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Loader2 } from 'lucide-react'
// import { toast } from '@/hooks/use-toast'
// import { generateImage } from '@/lib/instagram'

// interface ImageGeneratorProps {
//   onImageGenerated: (image: string) => void;
// }

// const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onImageGenerated }) => {
//   const [prompt, setPrompt] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleGenerateImage = async () => {
//     setLoading(true)
//     try {
//       const result = await generateImage(prompt)
//       if (result.image) {
//         onImageGenerated(result.image)
//       } else {
//         throw new Error(result.message || 'Failed to generate image')
//       }
//     } catch (error) {
//       console.error('Error generating image:', error)
//       toast({
//         title: 'Error',
//         description: error instanceof Error ? error.message : 'Failed to generate image. Please try again.',
//         variant: 'destructive',
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="space-y-4">
//       <Input
//         placeholder="Enter image description"
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//       />
//       <Button onClick={handleGenerateImage} disabled={loading}>
//         {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//         Generate Image
//       </Button>
//     </div>
//   )
// }

// export default ImageGenerator

'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { generateImage } from '@/lib/instagram'

interface ImageGeneratorProps {
  onImageGenerated: (image: string) => void;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onImageGenerated }) => {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerateImage = async () => {
    setLoading(true)
    try {
      const result = await generateImage(prompt)
      if (result.image) {
        onImageGenerated(result.image)
      } else {
        throw new Error(result.message || 'Failed to generate image')
      }
    } catch (error) {
      console.error('Error generating image:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to generate image. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Enter image description"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button onClick={handleGenerateImage} disabled={loading}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Generate Image
      </Button>
    </div>
  )
}

export default ImageGenerator

