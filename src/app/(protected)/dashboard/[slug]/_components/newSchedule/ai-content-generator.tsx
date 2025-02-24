// "use client"

// import type React from "react"
// import { useState } from "react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Loader2, AlertCircle, Check } from "lucide-react"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// interface AIContentGeneratorProps {
//   userId: string
//   onSelect: (content: { imageUrl: string; caption: string }) => void
// }

// interface GeneratedContent {
//   imageUrl: string
//   caption: string
// }

// const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({ userId, onSelect }) => {
//   const [prompt, setPrompt] = useState("")
//   const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [style, setStyle] = useState("realistic")
//   const [isSelected, setIsSelected] = useState(false)

//   const handleGenerate = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       setIsSelected(false)

//       const enhancedPrompt = `${prompt} --style ${style}`

//       const response = await fetch("/api/generate-image", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ prompt: enhancedPrompt, userId }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to generate content")
//       }

//       const data = await response.json()
//       if (data.error) {
//         throw new Error(data.error)
//       }

//       setGeneratedContent(data)
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred while generating content")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSelect = () => {
//     if (generatedContent) {
//       onSelect(generatedContent)
//       setIsSelected(true)
//     }
//   }

//   return (
//     <div className="space-y-4">
//       <div className="space-y-4">
//         <div>
//           <Label htmlFor="prompt" className="text-gray-200">
//             Prompt for AI generation
//           </Label>
//           <Input
//             id="prompt"
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             placeholder="E.g., 'A serene mountain landscape at sunset'"
//             className="mt-2 bg-gray-800/50 border-gray-700 text-gray-200 placeholder:text-gray-500"
//           />
//         </div>

//         <div>
//           <Label htmlFor="style" className="text-gray-200">
//             Image Style
//           </Label>
//           <Select value={style} onValueChange={setStyle}>
//             <SelectTrigger className="mt-2 bg-gray-800/50 border-gray-700 text-gray-200">
//               <SelectValue placeholder="Select a style" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-800 border-gray-700">
//               <SelectItem value="realistic">Realistic</SelectItem>
//               <SelectItem value="anime">Anime</SelectItem>
//               <SelectItem value="digital-art">Digital Art</SelectItem>
//               <SelectItem value="oil-painting">Oil Painting</SelectItem>
//               <SelectItem value="watercolor">Watercolor</SelectItem>
//               <SelectItem value="sketch">Sketch</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <Button
//         onClick={handleGenerate}
//         disabled={loading || !prompt}
//         className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200"
//       >
//         {loading ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Generating...
//           </>
//         ) : (
//           "Generate Content"
//         )}
//       </Button>

//       {error && (
//         <Alert variant="destructive" className="bg-red-900/50 border-red-800">
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       {generatedContent && (
//         <div className="space-y-4">
//           <div className="relative aspect-square w-full overflow-hidden rounded-lg">
//             <Image
//               src={generatedContent.imageUrl || "/placeholder.svg"}
//               alt="Generated content"
//               fill
//               className="object-cover"
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//             />
//           </div>

//           <div>
//             <Label htmlFor="generated-content" className="text-gray-200">
//               Generated Caption
//             </Label>
//             <Textarea
//               id="generated-content"
//               value={generatedContent.caption}
//               readOnly
//               rows={4}
//               className="mt-2 bg-gray-800/50 border-gray-700 text-gray-200"
//             />
//           </div>

//           <Button
//             onClick={handleSelect}
//             disabled={isSelected}
//             className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200"
//           >
//             {isSelected ? (
//               <>
//                 <Check className="mr-2 h-4 w-4" />
//                 Selected for Post
//               </>
//             ) : (
//               "Use for Post"
//             )}
//           </Button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AIContentGenerator

// "use client"

// import type React from "react"
// import { useState, useCallback } from "react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Loader2, AlertCircle, Check, RefreshCcw } from "lucide-react"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// interface AIContentGeneratorProps {
//   userId: string
//   onSelect: (content: { imageUrl: string; caption: string }) => void
// }

// interface GeneratedContent {
//   imageUrl: string
//   caption: string
// }

// const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({ userId, onSelect }) => {
//   const [prompt, setPrompt] = useState("")
//   const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [style, setStyle] = useState("realistic")
//   const [isSelected, setIsSelected] = useState(false)
//   const [retryCount, setRetryCount] = useState(0)

//   const generateContent = useCallback(async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       setIsSelected(false)

//       const enhancedPrompt = `${prompt} --style ${style}`

//       const response = await fetch("/api/generate-image", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ prompt: enhancedPrompt, userId }),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || "Failed to generate content")
//       }

//       const data = await response.json()
//       if (data.error) {
//         throw new Error(data.error)
//       }

//       setGeneratedContent(data)
//       setRetryCount(0) // Reset retry count on success
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred while generating content")
//       setRetryCount((prev) => prev + 1)
//     } finally {
//       setLoading(false)
//     }
//   }, [prompt, style, userId])

//   const handleGenerate = () => {
//     setGeneratedContent(null) // Clear previous content
//     generateContent()
//   }

//   const handleRetry = () => {
//     generateContent()
//   }

//   const handleSelect = () => {
//     if (generatedContent) {
//       onSelect(generatedContent)
//       setIsSelected(true)
//     }
//   }

//   return (
//     <div className="space-y-4">
//       <div className="space-y-4">
//         <div>
//           <Label htmlFor="prompt" className="text-gray-200">
//             Prompt for AI generation
//           </Label>
//           <Input
//             id="prompt"
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             placeholder="E.g., 'A serene mountain landscape at sunset'"
//             className="mt-2 bg-gray-800/50 border-gray-700 text-gray-200 placeholder:text-gray-500"
//           />
//         </div>

//         <div>
//           <Label htmlFor="style" className="text-gray-200">
//             Image Style
//           </Label>
//           <Select value={style} onValueChange={setStyle}>
//             <SelectTrigger className="mt-2 bg-gray-800/50 border-gray-700 text-gray-200">
//               <SelectValue placeholder="Select a style" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-800 border-gray-700">
//               <SelectItem value="realistic">Realistic</SelectItem>
//               <SelectItem value="anime">Anime</SelectItem>
//               <SelectItem value="digital-art">Digital Art</SelectItem>
//               <SelectItem value="oil-painting">Oil Painting</SelectItem>
//               <SelectItem value="watercolor">Watercolor</SelectItem>
//               <SelectItem value="sketch">Sketch</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <div className="flex gap-2">
//         <Button
//           onClick={handleGenerate}
//           disabled={loading || !prompt}
//           className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-200"
//         >
//           {loading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Generating...
//             </>
//           ) : (
//             "Generate Content"
//           )}
//         </Button>

//         {error && retryCount > 0 && (
//           <Button
//             onClick={handleRetry}
//             disabled={loading}
//             variant="outline"
//             className="bg-gray-800 hover:bg-gray-700 text-gray-200"
//           >
//             <RefreshCcw className="h-4 w-4" />
//           </Button>
//         )}
//       </div>

//       {error && (
//         <Alert variant="destructive" className="bg-red-900/50 border-red-800">
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       {generatedContent && (
//         <div className="space-y-4">
//           <div className="relative aspect-square w-full overflow-hidden rounded-lg">
//             <Image
//               src={generatedContent.imageUrl || "/placeholder.svg"}
//               alt="Generated content"
//               fill
//               className="object-cover"
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//               priority
//             />
//           </div>

//           <div>
//             <Label htmlFor="generated-content" className="text-gray-200">
//               Generated Caption
//             </Label>
//             <Textarea
//               id="generated-content"
//               value={generatedContent.caption}
//               readOnly
//               rows={4}
//               className="mt-2 bg-gray-800/50 border-gray-700 text-gray-200"
//             />
//           </div>

//           <Button
//             onClick={handleSelect}
//             disabled={isSelected}
//             className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200"
//           >
//             {isSelected ? (
//               <>
//                 <Check className="mr-2 h-4 w-4" />
//                 Selected for Post
//               </>
//             ) : (
//               "Use for Post"
//             )}
//           </Button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AIContentGenerator

// "use client"

// import type React from "react"
// import { useState, useCallback } from "react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Loader2, AlertCircle, Check, RefreshCcw } from "lucide-react"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// interface AIContentGeneratorProps {
//   userId: string
//   onSelect: (content: { imageUrl: string; caption: string }) => void
// }

// interface GeneratedContent {
//   imageUrl: string
//   caption: string
// }

// const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({ userId, onSelect }) => {
//   const [prompt, setPrompt] = useState("")
//   const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [style, setStyle] = useState("realistic")
//   const [isSelected, setIsSelected] = useState(false)
//   const [retryCount, setRetryCount] = useState(0)

//   const generateContent = useCallback(async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       setIsSelected(false)

//       const enhancedPrompt = `${prompt} --style ${style}`

//       const response = await fetch("/api/generate-image", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ prompt: enhancedPrompt, userId }),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || "Failed to generate content")
//       }

//       const data = await response.json()
//       if (data.error) {
//         throw new Error(data.error)
//       }

//       setGeneratedContent(data)
//       setRetryCount(0) // Reset retry count on success
//     } catch (err) {
//       const message = err instanceof Error ? err.message : "An error occurred while generating content"
//       setError(message)
//       setRetryCount((prev) => prev + 1)
//     } finally {
//       setLoading(false)
//     }
//   }, [prompt, style, userId])

//   const handleGenerate = () => {
//     setGeneratedContent(null) // Clear previous content
//     generateContent()
//   }

//   const handleRetry = () => {
//     generateContent()
//   }

//   const handleSelect = () => {
//     if (generatedContent) {
//       onSelect(generatedContent)
//       setIsSelected(true)
//     }
//   }

//   return (
//     <div className="space-y-4">
//       <div className="space-y-4">
//         <div>
//           <Label htmlFor="prompt" className="text-gray-200">
//             Prompt for AI generation
//           </Label>
//           <Input
//             id="prompt"
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             placeholder="E.g., 'A serene mountain landscape at sunset'"
//             className="mt-2 bg-gray-800/50 border-gray-700 text-gray-200 placeholder:text-gray-500"
//           />
//         </div>

//         <div>
//           <Label htmlFor="style" className="text-gray-200">
//             Image Style
//           </Label>
//           <Select value={style} onValueChange={setStyle}>
//             <SelectTrigger className="mt-2 bg-gray-800/50 border-gray-700 text-gray-200">
//               <SelectValue placeholder="Select a style" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-800 border-gray-700">
//               <SelectItem value="realistic">Realistic</SelectItem>
//               <SelectItem value="anime">Anime</SelectItem>
//               <SelectItem value="digital-art">Digital Art</SelectItem>
//               <SelectItem value="oil-painting">Oil Painting</SelectItem>
//               <SelectItem value="watercolor">Watercolor</SelectItem>
//               <SelectItem value="sketch">Sketch</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <div className="flex gap-2">
//         <Button
//           onClick={handleGenerate}
//           disabled={loading || !prompt}
//           className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-200"
//         >
//           {loading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Generating...
//             </>
//           ) : (
//             "Generate Content"
//           )}
//         </Button>

//         {error && retryCount > 0 && (
//           <Button
//             onClick={handleRetry}
//             disabled={loading}
//             variant="outline"
//             className="bg-gray-800 hover:bg-gray-700 text-gray-200"
//           >
//             <RefreshCcw className="h-4 w-4" />
//           </Button>
//         )}
//       </div>

//       {error && (
//         <Alert variant="destructive" className="bg-red-900/50 border-red-800">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>Generation Failed</AlertTitle>
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       {generatedContent && (
//         <div className="space-y-4">
//           <div className="relative aspect-square w-full overflow-hidden rounded-lg">
//             <Image
//               src={generatedContent.imageUrl || "/placeholder.svg"}
//               alt="Generated content"
//               fill
//               className="object-cover"
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//               priority
//             />
//           </div>

//           <div>
//             <Label htmlFor="generated-content" className="text-gray-200">
//               Generated Caption
//             </Label>
//             <Textarea
//               id="generated-content"
//               value={generatedContent.caption}
//               readOnly
//               rows={4}
//               className="mt-2 bg-gray-800/50 border-gray-700 text-gray-200"
//             />
//           </div>

//           <Button
//             onClick={handleSelect}
//             disabled={isSelected}
//             className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200"
//           >
//             {isSelected ? (
//               <>
//                 <Check className="mr-2 h-4 w-4" />
//                 Selected for Post
//               </>
//             ) : (
//               "Use for Post"
//             )}
//           </Button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AIContentGenerator

"use client"

import type React from "react"
import { useState, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, AlertCircle, Check, RefreshCcw, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AIContentGeneratorProps {
  userId: string
  onSelect: (content: { imageUrl: string; caption: string }) => void
}

interface GeneratedContent {
  imageUrl: string
  caption: string
  modelUsed?: {
    image: string
    caption: string
  }
}

const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({ userId, onSelect }) => {
  const [prompt, setPrompt] = useState("")
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [style, setStyle] = useState("realistic")
  const [isSelected, setIsSelected] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const generateContent = useCallback(async () => {
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

      const data = await response.json()

      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to generate content")
      }

      setGeneratedContent(data)
      setRetryCount(0)

      // Show which models were used
      if (data.modelUsed) {
        toast.success(`Generated using ${data.modelUsed.image} for image and ${data.modelUsed.caption} for caption`)
      }

      if (data.modelUsed?.caption === "Fallback Template") {
        toast.warning("Using default caption template. You may want to edit it.")
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred while generating content"
      setError(message)
      setRetryCount((prev) => prev + 1)
    } finally {
      setLoading(false)
    }
  }, [prompt, style, userId])

  const handleGenerate = () => {
    setGeneratedContent(null)
    generateContent()
  }

  const handleRetry = () => {
    generateContent()
  }

  const handleSelect = () => {
    if (generatedContent) {
      onSelect(generatedContent)
      setIsSelected(true)
      toast.success("Content selected for posting")
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

      <div className="flex gap-2">
        <Button
          onClick={handleGenerate}
          disabled={loading || !prompt}
          className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-200"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {retryCount > 0 ? "Retrying..." : "Generating..."}
            </>
          ) : (
            "Generate Content"
          )}
        </Button>

        {error && retryCount > 0 && (
          <Button
            onClick={handleRetry}
            disabled={loading}
            variant="outline"
            className="bg-gray-800 hover:bg-gray-700 text-gray-200"
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        )}
      </div>

      {error && (
        <Alert variant="destructive" className="bg-red-900/50 border-red-800">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Generation Failed</AlertTitle>
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
              priority
            />
            {generatedContent.modelUsed && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute top-2 right-2 bg-black/50 rounded-full p-2 cursor-help">
                      <Info className="h-4 w-4 text-gray-200" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Image: {generatedContent.modelUsed.image}</p>
                    <p>Caption: {generatedContent.modelUsed.caption}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
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

