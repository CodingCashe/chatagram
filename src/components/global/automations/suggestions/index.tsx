// "use client"

// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Sparkles, Plus, X } from "lucide-react"
// import { Button } from "@/components/ui/button"

// type KeywordSuggestionProps = {
//   keyword: string
//   onAddKeyword: (keyword: string) => void
// }

// const suggestionsMap: Record<string, string[]> = {
//   price: ["cost", "pricing", "how much", "expensive", "affordable", "discount"],
//   delivery: ["shipping", "arrive", "when will", "tracking", "shipment", "delivery time"],
//   size: ["dimensions", "measurement", "how big", "how small", "fit", "large", "small"],
//   help: ["support", "assistance", "question", "how to", "guide", "tutorial"],
//   refund: ["return", "money back", "cancel order", "exchange", "warranty"],
//   // Add more mappings as needed
// }

// // Default suggestions if keyword isn't in the map
// const defaultSuggestions = ["help", "information", "details", "question"]

// export const KeywordSuggestions = ({ keyword, onAddKeyword }: KeywordSuggestionProps) => {
//   const [isOpen, setIsOpen] = useState(false)
//   const [addedKeywords, setAddedKeywords] = useState<string[]>([])

//   // Get suggestions based on the keyword or use defaults
//   const getSuggestions = () => {
//     // Check for exact matches first
//     if (suggestionsMap[keyword.toLowerCase()]) {
//       return suggestionsMap[keyword.toLowerCase()]
//     }

//     // Check for partial matches
//     for (const key in suggestionsMap) {
//       if (keyword.toLowerCase().includes(key) || key.includes(keyword.toLowerCase())) {
//         return suggestionsMap[key]
//       }
//     }

//     return defaultSuggestions
//   }

//   const suggestions = getSuggestions().filter((k) => !addedKeywords.includes(k))

//   const handleAddKeyword = (suggestion: string) => {
//     onAddKeyword(suggestion)
//     setAddedKeywords([...addedKeywords, suggestion])
//   }

//   return (
//     <div className="relative">
//       <Button
//         variant="ghost"
//         size="sm"
//         onClick={() => setIsOpen(!isOpen)}
//         className="px-2 h-7 text-xs text-light-blue hover:text-light-blue/80 hover:bg-light-blue/10"
//       >
//         <Sparkles className="h-3.5 w-3.5 mr-1" />
//         Suggest similar
//       </Button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 5, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 5, scale: 0.95 }}
//             transition={{ duration: 0.15 }}
//             className="absolute left-0 top-full mt-1 z-50 p-3 bg-background-90 border border-background-80 rounded-lg shadow-xl w-64"
//           >
//             <div className="flex justify-between items-center mb-2">
//               <h4 className="text-sm font-medium">Similar to &quot;{keyword}&quot;</h4>
//               <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsOpen(false)}>
//                 <X className="h-3.5 w-3.5" />
//               </Button>
//             </div>

//             {suggestions.length > 0 ? (
//               <div className="flex flex-wrap gap-2">
//                 {suggestions.map((suggestion) => (
//                   <motion.div
//                     key={suggestion}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="px-2.5 py-1 bg-light-blue/10 hover:bg-light-blue/20 text-light-blue rounded-full text-xs cursor-pointer flex items-center"
//                     onClick={() => handleAddKeyword(suggestion)}
//                   >
//                     {suggestion}
//                     <Plus className="h-3 w-3 ml-1" />
//                   </motion.div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-xs text-text-secondary">No more suggestions available.</p>
//             )}

//             <div className="mt-2 pt-2 border-t border-background-80">
//               <p className="text-xs text-text-secondary">Click to add keywords to your automation</p>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Plus, X, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"

type KeywordSuggestionProps = {
  keyword: string
  onAddKeyword: (keyword: string) => void
}

const suggestionsMap: Record<string, string[]> = {
  price: ["cost", "pricing", "how much", "expensive", "affordable", "discount"],
  delivery: ["shipping", "arrive", "when will", "tracking", "shipment", "delivery time"],
  size: ["dimensions", "measurement", "how big", "how small", "fit", "large", "small"],
  help: ["support", "assistance", "question", "how to", "guide", "tutorial"],
  refund: ["return", "money back", "cancel order", "exchange", "warranty"],
  discount: ["sale", "coupon", "promo", "offer", "deal", "special"],
  availability: ["in stock", "out of stock", "when available", "restock", "backorder"],
  color: ["shade", "tone", "hue", "available colors", "options"],
  material: ["made of", "fabric", "composition", "quality", "texture"],
  shipping: ["delivery", "shipping cost", "shipping time", "international", "domestic"],
}

// Default suggestions if keyword isn't in the map
const defaultSuggestions = ["help", "information", "details", "question"]

export const KeywordSuggestions = ({ keyword, onAddKeyword }: KeywordSuggestionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [addedKeywords, setAddedKeywords] = useState<string[]>([])
  const popoverRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(popoverRef, () => setIsOpen(false))

  // Reset added keywords when the main keyword changes
  useEffect(() => {
    setAddedKeywords([])
  }, [])

  // Get suggestions based on the keyword or use defaults
  const getSuggestions = () => {
    // Check for exact matches first
    if (suggestionsMap[keyword.toLowerCase()]) {
      return suggestionsMap[keyword.toLowerCase()]
    }

    // Check for partial matches
    for (const key in suggestionsMap) {
      if (keyword.toLowerCase().includes(key) || key.includes(keyword.toLowerCase())) {
        return suggestionsMap[key]
      }
    }

    return defaultSuggestions
  }

  const suggestions = getSuggestions().filter((k) => !addedKeywords.includes(k))

  const handleAddKeyword = (suggestion: string) => {
    onAddKeyword(suggestion)
    setAddedKeywords([...addedKeywords, suggestion])
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="px-2 h-7 text-xs text-light-blue hover:text-light-blue/80 hover:bg-light-blue/10"
      >
        <Sparkles className="h-3.5 w-3.5 mr-1" />
        Suggest similar
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-1 z-50 p-3 bg-background-90 border border-background-80 rounded-lg shadow-xl w-64 max-h-[300px] overflow-y-auto"
            style={{
              // Ensure the dropdown is visible by checking its position
              transform: "translateX(0)",
              maxWidth: "calc(100vw - 40px)",
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium">Similar to &quot;{keyword}&quot;</h4>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsOpen(false)}>
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>

            {suggestions.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <motion.div
                    key={suggestion}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-2.5 py-1 bg-light-blue/10 hover:bg-light-blue/20 text-light-blue rounded-full text-xs cursor-pointer flex items-center"
                    onClick={() => handleAddKeyword(suggestion)}
                  >
                    {suggestion}
                    <Plus className="h-3 w-3 ml-1" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-text-secondary">No more suggestions available.</p>
            )}

            <div className="mt-2 pt-2 border-t border-background-80">
              <div className="flex items-center text-xs text-text-secondary">
                <Lightbulb className="h-3 w-3 mr-1 text-light-blue" />
                <p>Click to add keywords to your automation</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default KeywordSuggestions

