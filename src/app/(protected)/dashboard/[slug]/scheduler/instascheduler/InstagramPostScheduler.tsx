// 'use client'

// import React, { useState, useEffect } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Textarea } from '@/components/ui/textarea'
// import { Loader2, ImageIcon, Calendar } from 'lucide-react'
// import { DateTimePicker } from '@/components/global/scheduler/DateTimePicker'
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
// import { toast } from '@/hooks/use-toast'
// import ImageGenerator from '@/components/global/scheduler/ImageGenerator'
// import HashtagSuggestions from '@/components/global/scheduler/HashtagSuggestions'
// import { optimizePost, schedulePost } from '@/lib/instagram'
// import { OptimizationResult, ScheduledPost } from '@/types'


// const InstagramPostScheduler: React.FC = () => {
//   const [loading, setLoading] = useState(false)
//   const [caption, setCaption] = useState('')
//   const [image, setImage] = useState<string | null>(null)
//   const [hashtags, setHashtags] = useState<string[]>([])
//   const [scheduledTime, setScheduledTime] = useState<Date>(new Date())
//   const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null)
//   const [isImageGeneratorOpen, setIsImageGeneratorOpen] = useState(false)

//   const handleOptimizePost = async () => {
//     setLoading(true)
//     try {
//       const result = await optimizePost({ caption, hashtags, scheduledTime })
//       setOptimizationResult(result)
//     } catch (error) {
//       console.error('Error optimizing post:', error)
//       toast({
//         title: 'Error',
//         description: 'Failed to optimize post. Please try again.',
//         variant: 'destructive',
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSchedulePost = async () => {
//     if (!image) {
//       toast({
//         title: 'Error',
//         description: 'Please generate or upload an image before scheduling the post.',
//         variant: 'destructive',
//       })
//       return
//     }

//     try {
//       const result = await schedulePost({ caption, image, hashtags, scheduledTime })
//       if (result.success) {
//         toast({
//           title: 'Success',
//           description: 'Post scheduled successfully!',
//         })
//       } else {
//         throw new Error(result.message)
//       }
//     } catch (error) {
//       console.error('Error scheduling post:', error)
//       toast({
//         title: 'Error',
//         description: 'Failed to schedule post. Please try again.',
//         variant: 'destructive',
//       })
//     }
//   }

//   useEffect(() => {
//     if (caption || image || hashtags.length > 0) {
//       handleOptimizePost()
//     }
//   }, [caption, image, hashtags, scheduledTime])

//   return (
//     <Card className="h-auto flex flex-col">
//       <CardHeader>
//         <CardTitle>AI Instagram Post Scheduler</CardTitle>
//       </CardHeader>
//       <CardContent className="flex-grow flex flex-col gap-4">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <Textarea
//               placeholder="Enter your post caption"
//               value={caption}
//               onChange={(e) => setCaption(e.target.value)}
//               className="h-32"
//             />
//             <HashtagSuggestions onSelect={(tag) => setHashtags([...hashtags, tag])} />
//             <div className="flex flex-wrap gap-2 mt-2">
//               {hashtags.map((tag, index) => (
//                 <div key={index} className="bg-secondary px-2 py-1 rounded-full text-sm">
//                   #{tag}
//                   <button
//                     className="ml-2 text-red-500"
//                     onClick={() => setHashtags(hashtags.filter((_, i) => i !== index))}
//                   >
//                     ×
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4">
//               <DateTimePicker
//                 date={scheduledTime}
//                 setDate={setScheduledTime}
//               />
//             </div>
//           </div>
//           <div className="w-full md:w-64 h-48 md:h-64 bg-secondary rounded-md flex items-center justify-center">
//             {image ? (
//               <img src={image} alt="Post" className="max-w-full max-h-full object-contain" />
//             ) : (
//               <Dialog open={isImageGeneratorOpen} onOpenChange={setIsImageGeneratorOpen}>
//                 <DialogTrigger asChild>
//                   <Button>
//                     <ImageIcon className="mr-2 h-4 w-4" />
//                     Generate Image
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Generate Image</DialogTitle>
//                   </DialogHeader>
//                   <ImageGenerator onImageGenerated={(generatedImage) => {
//                     setImage(generatedImage)
//                     setIsImageGeneratorOpen(false)
//                   }} />
//                 </DialogContent>
//               </Dialog>
//             )}
//           </div>
//         </div>
        
//         {loading && (
//           <div className="flex items-center justify-center">
//             <Loader2 className="h-8 w-8 animate-spin" />
//           </div>
//         )}
        
//         {optimizationResult && (
//           <div className="bg-secondary p-4 rounded-md">
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="text-lg font-semibold">Optimization Score</h3>
//               <span className="text-2xl font-bold">{optimizationResult.score.toFixed(1)}%</span>
//             </div>
//             <div className="space-y-2">
//               {optimizationResult.suggestions.map((suggestion, index) => (
//                 <p key={index} className="text-sm">• {suggestion}</p>
//               ))}
//             </div>
//             <div className="mt-4 flex justify-between">
//               <div className="text-center">
//                 <p className="text-sm text-text-secondary">Predicted Likes</p>
//                 <p className="text-lg font-semibold">{optimizationResult.predictedLikes.toLocaleString()}</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-sm text-text-secondary">Predicted Comments</p>
//                 <p className="text-lg font-semibold">{optimizationResult.predictedComments.toLocaleString()}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         <Button onClick={handleSchedulePost} className="mt-4" disabled={!image}>
//           <Calendar className="mr-2 h-4 w-4" />
//           Schedule Post
//         </Button>
//       </CardContent>
//     </Card>
//   )
// }

// export default InstagramPostScheduler

// 'use client'

// import React, { useState, useEffect } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Textarea } from '@/components/ui/textarea'
// import { Loader2, ImageIcon, Calendar } from 'lucide-react'
// import { DateTimePicker } from '@/components/global/scheduler/DateTimePicker'
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
// import { toast } from '@/hooks/use-toast'
// import ImageGenerator from '@/components/global/scheduler/ImageGenerator'
// import HashtagSuggestions from '@/components/global/scheduler/HashtagSuggestions'
// import { optimizePost, schedulePost } from '@/lib/instagram'
// import { OptimizationResult, ScheduledPost } from '@/types'

// const InstagramPostScheduler: React.FC = () => {
//   const [loading, setLoading] = useState(false)
//   const [scheduling, setScheduling] = useState(false)
//   const [caption, setCaption] = useState('')
//   const [image, setImage] = useState<string | null>(null)
//   const [hashtags, setHashtags] = useState<string[]>([])
//   const [scheduledTime, setScheduledTime] = useState<Date>(new Date())
//   const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null)
//   const [isImageGeneratorOpen, setIsImageGeneratorOpen] = useState(false)

//   const handleOptimizePost = async () => {
//     setLoading(true)
//     try {
//       const result = await optimizePost({ caption, hashtags, scheduledTime })
//       setOptimizationResult(result)
//     } catch (error) {
//       console.error('Error optimizing post:', error)
//       toast({
//         title: 'Error',
//         description: 'Failed to optimize post. Please try again.',
//         variant: 'destructive',
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSchedulePost = async () => {
//     if (!image) {
//       toast({
//         title: 'Error',
//         description: 'Please generate or upload an image before scheduling the post.',
//         variant: 'destructive',
//       })
//       return
//     }

//     setScheduling(true)
//     try {
//       const result = await schedulePost({ caption, image, hashtags, scheduledTime })
//       if (result.success) {
//         toast({
//           title: 'Success',
//           description: result.message,
//         })
//         // Reset form after successful scheduling
//         setCaption('')
//         setImage(null)
//         setHashtags([])
//         setScheduledTime(new Date())
//       } else {
//         throw new Error(result.message)
//       }
//     } catch (error) {
//       console.error('Error scheduling post:', error)
//       toast({
//         title: 'Error',
//         description: 'Failed to schedule post. Please try again.',
//         variant: 'destructive',
//       })
//     } finally {
//       setScheduling(false)
//     }
//   }

//   useEffect(() => {
//     if (caption || image || hashtags.length > 0) {
//       handleOptimizePost()
//     }
//   }, [caption, image, hashtags, scheduledTime])

//   return (
//     <Card className="h-auto flex flex-col">
//       <CardHeader>
//         <CardTitle>AI Instagram Post Scheduler</CardTitle>
//       </CardHeader>
//       <CardContent className="flex-grow flex flex-col gap-4">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <Textarea
//               placeholder="Enter your post caption"
//               value={caption}
//               onChange={(e) => setCaption(e.target.value)}
//               className="h-32"
//             />
//             <HashtagSuggestions onSelect={(tag) => setHashtags([...hashtags, tag])} />
//             <div className="flex flex-wrap gap-2 mt-2">
//               {hashtags.map((tag, index) => (
//                 <div key={index} className="bg-secondary px-2 py-1 rounded-full text-sm">
//                   #{tag}
//                   <button
//                     className="ml-2 text-red-500"
//                     onClick={() => setHashtags(hashtags.filter((_, i) => i !== index))}
//                   >
//                     ×
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4">
//               <DateTimePicker
//                 date={scheduledTime}
//                 setDate={setScheduledTime}
//               />
//             </div>
//           </div>
//           <div className="w-full md:w-64 h-48 md:h-64 bg-secondary rounded-md flex items-center justify-center">
//             {image ? (
//               <img src={image} alt="Post" className="max-w-full max-h-full object-contain" />
//             ) : (
//               <Dialog open={isImageGeneratorOpen} onOpenChange={setIsImageGeneratorOpen}>
//                 <DialogTrigger asChild>
//                   <Button>
//                     <ImageIcon className="mr-2 h-4 w-4" />
//                     Generate Image
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Generate Image</DialogTitle>
//                   </DialogHeader>
//                   <ImageGenerator onImageGenerated={(generatedImage) => {
//                     setImage(generatedImage)
//                     setIsImageGeneratorOpen(false)
//                   }} />
//                 </DialogContent>
//               </Dialog>
//             )}
//           </div>
//         </div>
        
//         {loading && (
//           <div className="flex items-center justify-center">
//             <Loader2 className="h-8 w-8 animate-spin" />
//           </div>
//         )}
        
//         {optimizationResult && (
//           <div className="bg-secondary p-4 rounded-md">
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="text-lg font-semibold">Optimization Score</h3>
//               <span className="text-2xl font-bold">{optimizationResult.score.toFixed(1)}%</span>
//             </div>
//             <div className="space-y-2">
//               {optimizationResult.suggestions.map((suggestion, index) => (
//                 <p key={index} className="text-sm">• {suggestion}</p>
//               ))}
//             </div>
//             <div className="mt-4 flex justify-between">
//               <div className="text-center">
//                 <p className="text-sm text-text-secondary">Predicted Likes</p>
//                 <p className="text-lg font-semibold">{optimizationResult.predictedLikes.toLocaleString()}</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-sm text-text-secondary">Predicted Comments</p>
//                 <p className="text-lg font-semibold">{optimizationResult.predictedComments.toLocaleString()}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         <Button onClick={handleSchedulePost} className="mt-4" disabled={!image || scheduling}>
//           {scheduling ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Scheduling...
//             </>
//           ) : (
//             <>
//               <Calendar className="mr-2 h-4 w-4" />
//               Schedule Post
//             </>
//           )}
//         </Button>
//       </CardContent>
//     </Card>
//   )
// }

// export default InstagramPostScheduler

'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, ImageIcon, Calendar } from 'lucide-react'
import { DateTimePicker } from '@/components/global/scheduler/DateTimePicker'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from '@/hooks/use-toast'
import ImageGenerator from '@/components/global/scheduler/ImageGenerator'
import HashtagSuggestions from '@/components/global/scheduler/HashtagSuggestions'
import { optimizePost, schedulePost } from '@/lib/instagram'
import { OptimizationResult, ScheduledPost } from '@/types'

const InstagramPostScheduler: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [scheduling, setScheduling] = useState(false)
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [hashtags, setHashtags] = useState<string[]>([])
  const [scheduledTime, setScheduledTime] = useState<Date>(new Date())
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null)
  const [isImageGeneratorOpen, setIsImageGeneratorOpen] = useState(false)

  const handleOptimizePost = async () => {
    setLoading(true)
    try {
      const result = await optimizePost({ caption, hashtags, scheduledTime })
      setOptimizationResult(result)
    } catch (error) {
      console.error('Error optimizing post:', error)
      toast({
        title: 'Error',
        description: 'Failed to optimize post. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSchedulePost = async () => {
    if (!image) {
      toast({
        title: 'Error',
        description: 'Please generate or upload an image before scheduling the post.',
        variant: 'destructive',
      })
      return
    }

    setScheduling(true)
    try {
      const result = await schedulePost({ caption, image, hashtags, scheduledTime })
      if (result.success) {
        toast({
          title: 'Success',
          description: result.message,
        })
        // Reset form after successful scheduling
        setCaption('')
        setImage(null)
        setHashtags([])
        setScheduledTime(new Date())
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error('Error scheduling post:', error)
      toast({
        title: 'Error',
        description: 'Failed to schedule post. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setScheduling(false)
    }
  }

  useEffect(() => {
    if (caption || image || hashtags.length > 0) {
      handleOptimizePost()
    }
  }, [caption, image, hashtags, scheduledTime])

  return (
    <Card className="h-auto flex flex-col">
      <CardHeader>
        <CardTitle>AI Instagram Post Scheduler</CardTitle>
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
            <HashtagSuggestions onSelect={(tag) => setHashtags([...hashtags, tag])} />
            <div className="flex flex-wrap gap-2 mt-2">
              {hashtags.map((tag, index) => (
                <div key={index} className="bg-secondary px-2 py-1 rounded-full text-sm">
                  #{tag}
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => setHashtags(hashtags.filter((_, i) => i !== index))}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <DateTimePicker
                date={scheduledTime}
                setDate={setScheduledTime}
              />
            </div>
          </div>
          <div className="w-full md:w-64 h-48 md:h-64 bg-secondary rounded-md flex items-center justify-center">
            {image ? (
              <img src={image} alt="Post" className="max-w-full max-h-full object-contain" />
            ) : (
              <Dialog open={isImageGeneratorOpen} onOpenChange={setIsImageGeneratorOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Generate Image
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Generate Image</DialogTitle>
                  </DialogHeader>
                  <ImageGenerator onImageGenerated={(generatedImage) => {
                    setImage(generatedImage)
                    setIsImageGeneratorOpen(false)
                  }} />
                </DialogContent>
              </Dialog>
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

        <Button onClick={handleSchedulePost} className="mt-4" disabled={!image || scheduling}>
          {scheduling ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scheduling...
            </>
          ) : (
            <>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Post
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

export default InstagramPostScheduler

