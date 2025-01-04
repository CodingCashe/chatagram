// 'use client'

// import React, { useState } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Loader2, Calendar } from 'lucide-react'

// interface ContentIdea {
//   date: string
//   topic: string
//   description: string
// }

// const ContentCalendarGenerator: React.FC = () => {
//   const [loading, setLoading] = useState(false)
//   const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([])
//   const [keyword, setKeyword] = useState('')

//   const generateContentIdeas = async () => {
//     setLoading(true)
//     // Simulating API call to AI service
//     await new Promise(resolve => setTimeout(resolve, 2000))
    
//     const newIdeas: ContentIdea[] = [
//       {
//         date: '2023-07-01',
//         topic: 'Summer Fashion Trends',
//         description: 'Showcase the hottest summer fashion trends for your followers.'
//       },
//       {
//         date: '2023-07-03',
//         topic: 'Healthy Smoothie Recipes',
//         description: 'Share your favorite healthy smoothie recipes for a refreshing summer.'
//       },
//       {
//         date: '2023-07-05',
//         topic: 'Travel Photography Tips',
//         description: 'Provide tips on capturing stunning travel photos for your audience.'
//       },
//       {
//         date: '2023-07-07',
//         topic: 'Fitness Challenge',
//         description: 'Launch a 7-day fitness challenge to engage your followers.'
//       },
//       {
//         date: '2023-07-09',
//         topic: 'DIY Home Decor',
//         description: 'Show off some easy DIY home decor ideas for a summer refresh.'
//       }
//     ]
    
//     setContentIdeas(newIdeas)
//     setLoading(false)
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>AI Content Calendar Generator</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="flex space-x-2 mb-4">
//           <Input
//             type="text"
//             placeholder="Enter a keyword or theme"
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value)}
//           />
//           <Button onClick={generateContentIdeas} disabled={loading || !keyword}>
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Calendar className="mr-2 h-4 w-4" />}
//             Generate
//           </Button>
//         </div>
//         {contentIdeas.length > 0 && (
//           <div className="space-y-4">
//             {contentIdeas.map((idea, index) => (
//               <div key={index} className="bg-secondary p-3 rounded-md">
//                 <div className="font-semibold">{idea.date}</div>
//                 <div className="text-lg">{idea.topic}</div>
//                 <div className="text-sm text-text-secondary">{idea.description}</div>
//               </div>
//             ))}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   )
// }

// export default ContentCalendarGenerator

'use client'

// import React, { useState } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Loader2, Calendar } from 'lucide-react'

// interface ContentIdea {
//   date: string
//   topic: string
//   description: string
// }

// const ContentCalendarGenerator: React.FC = () => {
//   const [loading, setLoading] = useState(false)
//   const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([])
//   const [keyword, setKeyword] = useState('')

//   const generateContentIdeas = async () => {
//     setLoading(true)
//     try {
//       const response = await fetch('/api/generate-content', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ keyword }),
//       })

//       if (!response.ok) {
//         throw new Error('Failed to generate content ideas')
//       }

//       const newIdeas: ContentIdea[] = await response.json()
//       setContentIdeas(newIdeas)
//     } catch (error) {
//       console.error('Error generating content ideas:', error)
//       // You might want to show an error message to the user here
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>AI Content Calendar Generator</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="flex space-x-2 mb-4">
//           <Input
//             type="text"
//             placeholder="Enter a keyword or theme"
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value)}
//           />
//           <Button onClick={generateContentIdeas} disabled={loading || !keyword}>
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Calendar className="mr-2 h-4 w-4" />}
//             Generate
//           </Button>
//         </div>
//         {contentIdeas.length > 0 && (
//           <div className="space-y-4">
//             {contentIdeas.map((idea, index) => (
//               <div key={index} className="bg-secondary p-3 rounded-md">
//                 <div className="font-semibold">{idea.date}</div>
//                 <div className="text-lg">{idea.topic}</div>
//                 <div className="text-sm text-text-secondary">{idea.description}</div>
//               </div>
//             ))}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   )
// }

// export default ContentCalendarGenerator

// 'use client'

// import React, { useState } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Loader2, Calendar } from 'lucide-react'

// interface ContentIdea {
//   date: string
//   topic: string
//   description: string
// }

// const ContentCalendarGenerator: React.FC = () => {
//   const [loading, setLoading] = useState(false)
//   const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([])
//   const [keyword, setKeyword] = useState('')
//   const [error, setError] = useState<string | null>(null)

//   const generateContentIdeas = async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       const response = await fetch('/api/generate-content', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ keyword }),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.details || 'Failed to generate content ideas')
//       }

//       const newIdeas: ContentIdea[] = await response.json()
//       setContentIdeas(newIdeas)
//     } catch (error) {
//       console.error('Error generating content ideas:', error)
//       setError(error.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>AI Content Calendar Generator</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="flex space-x-2 mb-4">
//           <Input
//             type="text"
//             placeholder="Enter a keyword or theme"
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value)}
//           />
//           <Button onClick={generateContentIdeas} disabled={loading || !keyword}>
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Calendar className="mr-2 h-4 w-4" />}
//             Generate
//           </Button>
//         </div>
//         {error && (
//           <div className="text-red-500 mb-4">
//             Error: {error}
//           </div>
//         )}
//         {contentIdeas.length > 0 && (
//           <div className="space-y-4">
//             {contentIdeas.map((idea, index) => (
//               <div key={index} className="bg-secondary p-3 rounded-md">
//                 <div className="font-semibold">{idea.date}</div>
//                 <div className="text-lg">{idea.topic}</div>
//                 <div className="text-sm text-text-secondary">{idea.description}</div>
//               </div>
//             ))}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   )
// }

// export default ContentCalendarGenerator

'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Calendar } from 'lucide-react'

interface ContentIdea {
  date: string
  topic: string
  description: string
}

const ContentCalendarGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([])
  const [keyword, setKeyword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const generateContentIdeas = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || 'Failed to generate content ideas')
      }

      const newIdeas: ContentIdea[] = await response.json()
      setContentIdeas(newIdeas)
    } catch (err: unknown) {
      console.error('Error generating content ideas:', err)
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Content Calendar Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Enter a keyword or theme"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button onClick={generateContentIdeas} disabled={loading || !keyword}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Calendar className="mr-2 h-4 w-4" />}
            Generate
          </Button>
        </div>
        {error && (
          <div className="text-red-500 mb-4">
            Error: {error}
          </div>
        )}
        {contentIdeas.length > 0 && (
          <div className="space-y-4">
            {contentIdeas.map((idea, index) => (
              <div key={index} className="bg-secondary p-3 rounded-md">
                <div className="font-semibold">{idea.date}</div>
                <div className="text-lg">{idea.topic}</div>
                <div className="text-sm text-text-secondary">{idea.description}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ContentCalendarGenerator

