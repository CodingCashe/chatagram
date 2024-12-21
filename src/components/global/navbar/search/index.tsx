import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const Search = (props: Props) => {
  return (
    <div className="flex overflow-hidden gap-x-2 border-[1px] border-[#3352CC] rounded-full px-4 py-1 items-center flex-1">
      <SearchIcon color="#3352CC" />
      <Input
        placeholder="Search by name, email or status"
        className="border-none outline-none ring-0 focus:ring-0 flex-1"
      />
    </div>
  )
}

export default Search

// import React, { useState, useEffect } from 'react'
// import { SearchIcon, Loader2 } from 'lucide-react'
// import { Input } from '@/components/ui/input'
// import { useDebounce } from '@/hooks/use-debounce'
// import { searchApi } from '@/services/searchApi'
// import { HighlightedText } from '@/components/global/search-text/highlighted'
// import { AnimatePresence, motion } from 'framer-motion'

// interface SearchResult {
//   id: string
//   name: string
//   email: string
//   status: 'active' | 'inactive'
// }

// const Search: React.FC = () => {
//   const [query, setQuery] = useState('')
//   const [results, setResults] = useState<SearchResult[]>([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [isFocused, setIsFocused] = useState(false)
//   const debouncedQuery = useDebounce(query, 300)

//   useEffect(() => {
//     const fetchResults = async () => {
//       if (debouncedQuery) {
//         setIsLoading(true)
//         try {
//           const searchResults = await searchApi(debouncedQuery)
//           setResults(searchResults)
//         } catch (error) {
//           console.error('Error fetching search results:', error)
//         } finally {
//           setIsLoading(false)
//         }
//       } else {
//         setResults([])
//       }
//     }

//     fetchResults()
//   }, [debouncedQuery])

//   return (
//     <div className="relative">
//       <div className="flex overflow-hidden gap-x-2 border-[1px] border-[#3352CC] rounded-full px-4 py-1 items-center flex-1">
//         <SearchIcon color="#3352CC" />
//         <Input
//           placeholder="Search by name, email or status"
//           className="border-none outline-none ring-0 focus:ring-0 flex-1"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setTimeout(() => setIsFocused(false), 200)}
//         />
//         {isLoading && <Loader2 className="animate-spin text-[#3352CC]" />}
//       </div>
//       <AnimatePresence>
//         {isFocused && (results.length > 0 || debouncedQuery) && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg border border-gray-200 max-h-96 overflow-y-auto"
//           >
//             {results.length > 0 ? (
//               results.map((result) => (
//                 <div key={result.id} className="p-4 hover:bg-gray-100 cursor-pointer">
//                   <div className="font-semibold">
//                     <HighlightedText text={result.name} highlight={debouncedQuery} />
//                   </div>
//                   <div className="text-sm text-gray-600">
//                     <HighlightedText text={result.email} highlight={debouncedQuery} />
//                   </div>
//                   <div className="text-sm text-gray-600">
//                     Status: <HighlightedText text={result.status} highlight={debouncedQuery} />
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="p-4 text-center text-gray-500">No results found</div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// export default Search

// 'use client'

// import React, { useState, useEffect } from 'react'
// import { SearchIcon, Loader2 } from 'lucide-react'
// import { Input } from '@/components/ui/input'
// import { useDebounce } from '@/hooks/use-debounce'
// import { searchAutomations, Automation } from '@/services/searchApi'
// import { HighlightedText } from '@/components/global/search-text/highlighted'
// import { AnimatePresence, motion } from 'framer-motion'

// const Search: React.FC = () => {
//   const [query, setQuery] = useState('')
//   const [results, setResults] = useState<Automation[]>([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [isFocused, setIsFocused] = useState(false)
//   const debouncedQuery = useDebounce(query, 300)

//   useEffect(() => {
//     const fetchResults = async () => {
//       if (debouncedQuery) {
//         setIsLoading(true)
//         try {
//           const searchResults = await searchAutomations(debouncedQuery)
//           setResults(searchResults)
//         } catch (error) {
//           console.error('Error fetching automation search results:', error)
//         } finally {
//           setIsLoading(false)
//         }
//       } else {
//         setResults([])
//       }
//     }

//     fetchResults()
//   }, [debouncedQuery])

//   return (
//     <div className="relative">
//       <div className="flex overflow-hidden gap-x-2 border-[1px] border-[#3352CC] rounded-full px-4 py-1 items-center flex-1">
//         <SearchIcon color="#3352CC" />
//         <Input
//           placeholder="Search automations by name or status"
//           className="border-none outline-none ring-0 focus:ring-0 flex-1"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setTimeout(() => setIsFocused(false), 200)}
//         />
//         {isLoading && <Loader2 className="animate-spin text-[#3352CC]" />}
//       </div>
//       <AnimatePresence>
//         {isFocused && (results.length > 0 || debouncedQuery) && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg border border-gray-200 max-h-96 overflow-y-auto"
//           >
//             {results.length > 0 ? (
//               results.map((automation) => (
//                 <div key={automation.id} className="p-4 hover:bg-gray-100 cursor-pointer">
//                   <div className="font-semibold">
//                     <HighlightedText text={automation.name} highlight={debouncedQuery} />
//                   </div>
//                   <div className="text-sm text-gray-600">
//                     Status: <HighlightedText text={automation.status} highlight={debouncedQuery} />
//                   </div>
//                   <div className="text-sm text-gray-600">
//                     Created: {new Date(automation.createdAt).toLocaleDateString()}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="p-4 text-center text-gray-500">No automations found</div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// export default Search




// 'use client'

// import React, { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { SearchIcon, Loader2 } from 'lucide-react'
// import { Input } from '@/components/ui/input'
// import { useDebounce } from '@/hooks/use-debounce'
// import { HighlightedText } from '@/components/global/search-text/highlighted'
// import { AnimatePresence, motion } from 'framer-motion'

// interface Automation {
//   id: string;
//   name: string;
//   status: string;
//   keywords: { id: string; word: string }[];
// }

// const Search: React.FC = () => {
//   const [query, setQuery] = useState('')
//   const [results, setResults] = useState<Automation[]>([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [isFocused, setIsFocused] = useState(false)
//   const debouncedQuery = useDebounce(query, 300)
//   const router = useRouter()

//   useEffect(() => {
//     const fetchResults = async () => {
//       if (debouncedQuery) {
//         setIsLoading(true)
//         try {
//           const response = await fetch(`/api/search-automations?query=${encodeURIComponent(debouncedQuery)}`)
//           if (!response.ok) {
//             throw new Error('Failed to fetch search results')
//           }
//           const data = await response.json()
//           setResults(data)
//         } catch (error) {
//           console.error('Error fetching search results:', error)
//         } finally {
//           setIsLoading(false)
//         }
//       } else {
//         setResults([])
//       }
//     }

//     fetchResults()
//   }, [debouncedQuery])

//   const handleAutomationClick = (automationId: string) => {
//     router.push(`/dashboard/${automationId}`)
//   }

//   return (
//     <div className="relative">
//       <div className="flex overflow-hidden gap-x-2 border-[1px] border-[#3352CC] rounded-full px-4 py-1 items-center flex-1">
//         <SearchIcon color="#3352CC" />
//         <Input
//           placeholder="Search automations by name, keyword, or status"
//           className="border-none outline-none ring-0 focus:ring-0 flex-1"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setTimeout(() => setIsFocused(false), 200)}
//         />
//         {isLoading && <Loader2 className="animate-spin text-[#3352CC]" />}
//       </div>
//       <AnimatePresence>
//         {isFocused && (results.length > 0 || debouncedQuery) && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg border border-gray-200 max-h-96 overflow-y-auto"
//           >
//             {results.length > 0 ? (
//               results.map((automation) => (
//                 <div 
//                   key={automation.id} 
//                   className="p-4 hover:bg-gray-100 cursor-pointer"
//                   onClick={() => handleAutomationClick(automation.id)}
//                 >
//                   <div className="font-semibold">
//                     <HighlightedText text={automation.name} highlight={debouncedQuery} />
//                   </div>
//                   <div className="text-sm text-gray-600">
//                     Status: <HighlightedText text={automation.status} highlight={debouncedQuery} />
//                   </div>
//                   <div className="text-sm text-gray-600">
//                     Keywords: {automation.keywords.map((k, index) => (
//                       <React.Fragment key={k.id}>
//                         {index > 0 && ', '}
//                         <HighlightedText text={k.word} highlight={debouncedQuery} />
//                       </React.Fragment>
//                     ))}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="p-4 text-center text-gray-500">No automations found</div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// export default Search








// import { Input } from '@/components/ui/input'
// import { SearchIcon } from 'lucide-react'
// import React, { useState } from 'react'

// type SearchProps = {
//   onSearch: (query: string) => void
// }

// const Search = ({ onSearch }: SearchProps) => {
//   const [input, setInput] = useState('')

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value
//     setInput(value)
//     onSearch(value) // Trigger search callback
//   }

//   return (
//     <div className="flex overflow-hidden gap-x-2 border-[1px] border-[#3352CC] rounded-full px-4 py-1 items-center flex-1">
//       <SearchIcon color="#3352CC" />
//       <Input
//         value={input}
//         onChange={handleChange}
//         placeholder="Search by name, email or status"
//         className="border-none outline-none ring-0 focus:ring-0 flex-1"
//       />
//     </div>
//   )
// }

// export default Search
