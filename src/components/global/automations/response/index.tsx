// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { BookOpen, X, Search, DotIcon as DragHandleDots2Icon } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ScrollArea } from "@/components/ui/scroll-area"

// type ResponseTemplate = {
//   id: string
//   category: string
//   title: string
//   content: string
// }

// type ResponseLibraryProps = {
//   onSelectTemplate: (content: string) => void
// }

// const SAMPLE_TEMPLATES: ResponseTemplate[] = [
//   {
//     id: "1",
//     category: "Pricing",
//     title: "Basic Pricing",
//     content:
//       "Thanks for your interest! Our pricing starts at $19/month for the basic plan and $49/month for premium. Would you like me to send you our full pricing guide?",
//   },
//   {
//     id: "2",
//     category: "Pricing",
//     title: "Discount Offer",
//     content:
//       "Thanks for asking about our pricing! We are currently running a special promotion - use code WELCOME20 for 20% off your first month. Would you like to know more?",
//   },
//   {
//     id: "3",
//     category: "Support",
//     title: "General Support",
//     content:
//       "I'd be happy to help you with that issue. Could you please provide more details about what you are experiencing?",
//   },
//   {
//     id: "4",
//     category: "Support",
//     title: "Technical Issue",
//     content:
//       "Sorry to hear you're having technical difficulties. Have you tried clearing your cache and cookies? If that does not work, our support team is available at support@chatal.com.",
//   },
//   {
//     id: "5",
//     category: "Welcome",
//     title: "New Follower",
//     content:
//       "Thanks for following us! We are excited to have you as part of our community. Feel free to reach out if you have any questions!",
//   },
//   {
//     id: "6",
//     category: "Welcome",
//     title: "First Comment",
//     content:
//       "Thanks for your comment! We appreciate your engagement with our content and look forward to hearing more from you.",
//   },
// ]

// export const ResponseLibrary = ({ onSelectTemplate }: ResponseLibraryProps) => {
//   const [isOpen, setIsOpen] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [favorites, setFavorites] = useState<string[]>([])
//   const [activeCategory, setActiveCategory] = useState("all")

//   const categories = ["all", ...Array.from(new Set(SAMPLE_TEMPLATES.map((template) => template.category)))]

//   const filteredTemplates = SAMPLE_TEMPLATES.filter((template) => {
//     const matchesSearch =
//       template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       template.content.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesCategory = activeCategory === "all" || template.category === activeCategory
//     return matchesSearch && matchesCategory
//   })

//   return (
//     <div className="relative">
//       <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2">
//         <BookOpen className="h-4 w-4" />
//         Templates
//       </Button>

//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="absolute left-0 top-full mt-2 z-50 bg-background-90 border border-background-80 rounded-xl shadow-2xl w-80 md:w-96 overflow-hidden"
//         >
//           <div className="flex items-center justify-between bg-background-80 p-3 border-b border-background-80">
//             <h3 className="font-medium flex items-center">
//               <BookOpen className="h-4 w-4 mr-2" />
//               Response Templates
//             </h3>
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsOpen(false)}>
//               <X className="h-4 w-4" />
//             </Button>
//           </div>

//           <div className="p-3">
//             <div className="relative mb-3">
//               <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
//               <Input
//                 placeholder="Search templates..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-9 bg-background-80 border-none"
//               />
//             </div>

//             <Tabs defaultValue="all" className="mb-3" onValueChange={setActiveCategory}>
//               <TabsList className="grid grid-flow-col auto-cols-fr h-auto p-1 bg-background-80">
//                 {categories.map((category) => (
//                   <TabsTrigger key={category} value={category} className="text-xs py-1 capitalize">
//                     {category}
//                   </TabsTrigger>
//                 ))}
//               </TabsList>
//             </Tabs>

//             <ScrollArea className="h-64">
//               <div className="space-y-2 pr-3">
//                 {filteredTemplates.length > 0 ? (
//                   filteredTemplates.map((template) => (
//                     <motion.div
//                       key={template.id}
//                       whileHover={{ scale: 1.01 }}
//                       whileTap={{ scale: 0.99 }}
//                       className="p-3 bg-background-80 rounded-md cursor-move group relative"
//                       draggable
//                       onDragEnd={() => onSelectTemplate(template.content)}
//                     >
//                       <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-20 group-hover:opacity-60">
//                         <DragHandleDots2Icon className="h-5 w-5" />
//                       </div>
//                       <div className="pl-7">
//                         <div className="flex justify-between items-start mb-1">
//                           <h4 className="text-sm font-medium">{template.title}</h4>
//                           <span className="text-xs py-0.5 px-2 bg-light-blue/10 text-light-blue rounded-full">
//                             {template.category}
//                           </span>
//                         </div>
//                         <p className="text-xs text-text-secondary line-clamp-2">{template.content}</p>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="mt-1 h-7 text-xs text-light-blue hover:text-light-blue hover:bg-light-blue/10"
//                           onClick={() => onSelectTemplate(template.content)}
//                         >
//                           Use template
//                         </Button>
//                       </div>
//                     </motion.div>
//                   ))
//                 ) : (
//                   <div className="flex flex-col items-center justify-center py-8 text-center">
//                     <div className="p-3 bg-background-80 rounded-full mb-3">
//                       <Search className="h-5 w-5 text-text-secondary" />
//                     </div>
//                     <p className="text-sm font-medium">No templates found</p>
//                     <p className="text-xs text-text-secondary mt-1">Try a different search term or category</p>
//                   </div>
//                 )}
//               </div>
//             </ScrollArea>

//             <div className="mt-3 pt-2 border-t border-background-80 text-center">
//               <p className="text-xs text-text-secondary">Drag templates to use them or click Use template</p>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   )
// }

// "use client"

// import { useState, useRef } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { BookOpen, X, Search, DotIcon as DragHandleDots2Icon, Star, StarOff, Copy } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { useOnClickOutside } from "@/hooks/use-on-click-outside"

// type ResponseTemplate = {
//   id: string
//   category: string
//   title: string
//   content: string
//   isFavorite?: boolean
// }

// type ResponseLibraryProps = {
//   onSelectTemplate: (content: string) => void
// }

// const SAMPLE_TEMPLATES: ResponseTemplate[] = [
//   {
//     id: "1",
//     category: "Pricing",
//     title: "Basic Pricing",
//     content:
//       "Thanks for your interest! Our pricing starts at $19/month for the basic plan and $49/month for premium. Would you like me to send you our full pricing guide?",
//     isFavorite: true,
//   },
//   {
//     id: "2",
//     category: "Pricing",
//     title: "Discount Offer",
//     content:
//       "Thanks for asking about our pricing! We're currently running a special promotion - use code WELCOME20 for 20% off your first month. Would you like to know more?",
//   },
//   {
//     id: "3",
//     category: "Support",
//     title: "General Support",
//     content:
//       "I'd be happy to help you with that issue. Could you please provide more details about what you're experiencing?",
//   },
//   {
//     id: "4",
//     category: "Support",
//     title: "Technical Issue",
//     content:
//       "Sorry to hear you're having technical difficulties. Have you tried clearing your cache and cookies? If that doesn't work, our support team is available at support@example.com.",
//   },
//   {
//     id: "5",
//     category: "Welcome",
//     title: "New Follower",
//     content:
//       "Thanks for following us! We're excited to have you as part of our community. Feel free to reach out if you have any questions!",
//     isFavorite: true,
//   },
//   {
//     id: "6",
//     category: "Welcome",
//     title: "First Comment",
//     content:
//       "Thanks for your comment! We appreciate your engagement with our content and look forward to hearing more from you.",
//   },
//   {
//     id: "7",
//     category: "Product",
//     title: "Product Information",
//     content:
//       "Thank you for your interest in our product! It's designed to [product benefit]. Would you like to know more about specific features?",
//   },
//   {
//     id: "8",
//     category: "Product",
//     title: "Product Recommendation",
//     content:
//       "Based on what you're looking for, I'd recommend our [product name]. It's perfect for [use case] and comes with [key features]. Would you like more details?",
//   },
// ]

// export const ResponseLibrary = ({ onSelectTemplate }: ResponseLibraryProps) => {
//   const [isOpen, setIsOpen] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [favorites, setFavorites] = useState<string[]>(SAMPLE_TEMPLATES.filter((t) => t.isFavorite).map((t) => t.id))
//   const [activeCategory, setActiveCategory] = useState("all")
//   const [templates, setTemplates] = useState(SAMPLE_TEMPLATES)
//   const popoverRef = useRef<HTMLDivElement>(null)

//   useOnClickOutside(popoverRef, () => setIsOpen(false))

//   const categories = ["all", "favorites", ...Array.from(new Set(templates.map((template) => template.category)))]

//   const filteredTemplates = templates.filter((template) => {
//     const matchesSearch =
//       template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       template.content.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesCategory =
//       activeCategory === "all" ||
//       (activeCategory === "favorites" && favorites.includes(template.id)) ||
//       template.category === activeCategory
//     return matchesSearch && matchesCategory
//   })

//   const toggleFavorite = (id: string) => {
//     if (favorites.includes(id)) {
//       setFavorites(favorites.filter((fav) => fav !== id))
//     } else {
//       setFavorites([...favorites, id])
//     }
//   }

//   const handleCopyTemplate = (content: string) => {
//     navigator.clipboard
//       .writeText(content)
//       .then(() => {
//         // Show a toast or some feedback
//       })
//       .catch((err) => {
//         console.error("Failed to copy: ", err)
//       })
//   }

//   return (
//     <div className="relative">
//       <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2">
//         <BookOpen className="h-4 w-4" />
//         Templates
//       </Button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             ref={popoverRef}
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             className="fixed md:absolute right-4 md:right-0 left-4 md:left-auto top-20 md:top-full mt-2 z-50 bg-background-90 border border-background-80 rounded-xl shadow-2xl w-auto md:w-[450px] overflow-hidden"
//             style={{
//               maxHeight: "calc(80vh - 100px)",
//               maxWidth: "calc(100vw - 32px)",
//             }}
//           >
//             <div className="flex items-center justify-between bg-background-80 p-3 border-b border-background-80">
//               <h3 className="font-medium flex items-center">
//                 <BookOpen className="h-4 w-4 mr-2" />
//                 Response Templates
//               </h3>
//               <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsOpen(false)}>
//                 <X className="h-4 w-4" />
//               </Button>
//             </div>

//             <div className="p-3">
//               <div className="relative mb-3">
//                 <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
//                 <Input
//                   placeholder="Search templates..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-9 bg-background-80 border-none"
//                 />
//               </div>

//               <Tabs defaultValue="all" className="mb-3" onValueChange={setActiveCategory}>
//                 <TabsList className="flex overflow-x-auto h-auto p-1 bg-background-80 no-scrollbar">
//                   {categories.map((category) => (
//                     <TabsTrigger
//                       key={category}
//                       value={category}
//                       className="text-xs py-1 capitalize whitespace-nowrap flex-shrink-0"
//                     >
//                       {category === "favorites" ? (
//                         <>
//                           <Star className="h-3 w-3 mr-1" /> {category}
//                         </>
//                       ) : (
//                         category
//                       )}
//                     </TabsTrigger>
//                   ))}
//                 </TabsList>
//               </Tabs>

//               <ScrollArea className="h-[400px] md:h-[500px] pr-4">
//                 <div className="space-y-2">
//                   {filteredTemplates.length > 0 ? (
//                     filteredTemplates.map((template) => (
//                       <motion.div
//                         key={template.id}
//                         whileHover={{ scale: 1.01 }}
//                         whileTap={{ scale: 0.99 }}
//                         className="p-3 bg-background-80 rounded-md group relative"
//                         draggable
//                         onDragEnd={() => onSelectTemplate(template.content)}
//                       >
//                         <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-20 group-hover:opacity-60">
//                           <DragHandleDots2Icon className="h-5 w-5" />
//                         </div>
//                         <div className="pl-7">
//                           <div className="flex justify-between items-start mb-1">
//                             <h4 className="text-sm font-medium">{template.title}</h4>
//                             <div className="flex gap-1">
//                               <span className="text-xs py-0.5 px-2 bg-light-blue/10 text-light-blue rounded-full">
//                                 {template.category}
//                               </span>
//                             </div>
//                           </div>
//                           <p className="text-xs text-text-secondary line-clamp-2">{template.content}</p>
//                           <div className="flex justify-between items-center mt-2">
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               className="h-7 text-xs text-light-blue hover:text-light-blue hover:bg-light-blue/10"
//                               onClick={() => onSelectTemplate(template.content)}
//                             >
//                               Use template
//                             </Button>
//                             <div className="flex gap-1">
//                               <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 className="h-6 w-6 p-0 rounded-full text-text-secondary hover:text-light-blue"
//                                 onClick={() => handleCopyTemplate(template.content)}
//                                 title="Copy to clipboard"
//                               >
//                                 <Copy className="h-3.5 w-3.5" />
//                               </Button>
//                               <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 className={`h-6 w-6 p-0 rounded-full ${favorites.includes(template.id) ? "text-yellow-400" : "text-text-secondary hover:text-yellow-400"}`}
//                                 onClick={() => toggleFavorite(template.id)}
//                                 title={favorites.includes(template.id) ? "Remove from favorites" : "Add to favorites"}
//                               >
//                                 {favorites.includes(template.id) ? (
//                                   <Star className="h-3.5 w-3.5 fill-yellow-400" />
//                                 ) : (
//                                   <StarOff className="h-3.5 w-3.5" />
//                                 )}
//                               </Button>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))
//                   ) : (
//                     <div className="flex flex-col items-center justify-center py-8 text-center">
//                       <div className="p-3 bg-background-80 rounded-full mb-3">
//                         <Search className="h-5 w-5 text-text-secondary" />
//                       </div>
//                       <p className="text-sm font-medium">No templates found</p>
//                       <p className="text-xs text-text-secondary mt-1">Try a different search term or category</p>
//                     </div>
//                   )}
//                 </div>
//               </ScrollArea>

//               <div className="mt-3 pt-2 border-t border-background-80 text-center">
//                 <p className="text-xs text-text-secondary">Drag templates to use them or click Use template</p>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// export default ResponseLibrary

// "use client"

// import { useState, useRef } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { BookOpen, X, Search, DotIcon as DragHandleDots2Icon, Star, StarOff, Copy } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { useOnClickOutside } from "@/hooks/use-on-click-outside"

// type ResponseTemplate = {
//   id: string
//   category: string
//   title: string
//   content: string
//   isFavorite?: boolean
// }

// type ResponseLibraryProps = {
//   onSelectTemplate: (content: string) => void
// }

// const SAMPLE_TEMPLATES: ResponseTemplate[] = [
//   {
//     id: "1",
//     category: "Pricing",
//     title: "Basic Pricing",
//     content:
//       "Thanks for your interest! Our pricing starts at $19/month for the basic plan and $49/month for premium. Would you like me to send you our full pricing guide?",
//     isFavorite: true,
//   },
//   {
//     id: "2",
//     category: "Pricing",
//     title: "Discount Offer",
//     content:
//       "Thanks for asking about our pricing! We're currently running a special promotion - use code WELCOME20 for 20% off your first month. Would you like to know more?",
//   },
//   {
//     id: "3",
//     category: "Support",
//     title: "General Support",
//     content:
//       "I'd be happy to help you with that issue. Could you please provide more details about what you're experiencing?",
//   },
//   {
//     id: "4",
//     category: "Support",
//     title: "Technical Issue",
//     content:
//       "Sorry to hear you're having technical difficulties. Have you tried clearing your cache and cookies? If that doesn't work, our support team is available at support@example.com.",
//   },
//   {
//     id: "5",
//     category: "Welcome",
//     title: "New Follower",
//     content:
//       "Thanks for following us! We're excited to have you as part of our community. Feel free to reach out if you have any questions!",
//     isFavorite: true,
//   },
//   {
//     id: "6",
//     category: "Welcome",
//     title: "First Comment",
//     content:
//       "Thanks for your comment! We appreciate your engagement with our content and look forward to hearing more from you.",
//   },
//   {
//     id: "7",
//     category: "Product",
//     title: "Product Information",
//     content:
//       "Thank you for your interest in our product! It's designed to [product benefit]. Would you like to know more about specific features?",
//   },
//   {
//     id: "8",
//     category: "Product",
//     title: "Product Recommendation",
//     content:
//       "Based on what you're looking for, I'd recommend our [product name]. It's perfect for [use case] and comes with [key features]. Would you like more details?",
//   },
// ]

// export const ResponseLibrary = ({ onSelectTemplate }: ResponseLibraryProps) => {
//   const [isOpen, setIsOpen] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [favorites, setFavorites] = useState<string[]>(SAMPLE_TEMPLATES.filter((t) => t.isFavorite).map((t) => t.id))
//   const [activeCategory, setActiveCategory] = useState("all")
//   const [templates, setTemplates] = useState(SAMPLE_TEMPLATES)
//   const popoverRef = useRef<HTMLDivElement>(null)

//   useOnClickOutside(popoverRef, () => setIsOpen(false))

//   const categories = ["all", "favorites", ...Array.from(new Set(templates.map((template) => template.category)))]

//   const filteredTemplates = templates.filter((template) => {
//     const matchesSearch =
//       searchTerm === "" ||
//       template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       template.content.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesCategory =
//       activeCategory === "all" ||
//       (activeCategory === "favorites" && favorites.includes(template.id)) ||
//       template.category === activeCategory
//     return matchesSearch && matchesCategory
//   })

//   const toggleFavorite = (id: string) => {
//     if (favorites.includes(id)) {
//       setFavorites(favorites.filter((fav) => fav !== id))
//     } else {
//       setFavorites([...favorites, id])
//     }
//   }

//   const handleCopyTemplate = (content: string) => {
//     navigator.clipboard
//       .writeText(content)
//       .then(() => {
//         // Show a toast or some feedback
//       })
//       .catch((err) => {
//         console.error("Failed to copy: ", err)
//       })
//   }

//   return (
//     <div className="relative">
//       <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2">
//         <BookOpen className="h-4 w-4" />
//         Templates
//       </Button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             ref={popoverRef}
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             className="fixed md:absolute right-4 md:right-0 left-4 md:left-auto top-20 md:top-full mt-2 z-50 bg-background-90 border border-background-80 rounded-xl shadow-2xl w-auto md:w-[450px] overflow-hidden"
//             style={{
//               maxHeight: "calc(80vh - 100px)",
//               maxWidth: "calc(100vw - 32px)",
//             }}
//           >
//             <div className="flex items-center justify-between bg-background-80 p-3 border-b border-background-80">
//               <h3 className="font-medium flex items-center">
//                 <BookOpen className="h-4 w-4 mr-2" />
//                 Response Templates
//               </h3>
//               <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsOpen(false)}>
//                 <X className="h-4 w-4" />
//               </Button>
//             </div>

//             <div className="p-3">
//               <div className="relative mb-3">
//                 <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
//                 <Input
//                   placeholder="Search templates..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-9 bg-background-80 border-none"
//                 />
//               </div>

//               <Tabs defaultValue="all" className="mb-3" onValueChange={setActiveCategory}>
//                 <TabsList className="flex overflow-x-auto h-auto p-1 bg-background-80 no-scrollbar">
//                   {categories.map((category) => (
//                     <TabsTrigger
//                       key={category}
//                       value={category}
//                       className="text-xs py-1 capitalize whitespace-nowrap flex-shrink-0"
//                     >
//                       {category === "favorites" ? (
//                         <>
//                           <Star className="h-3 w-3 mr-1" /> {category}
//                         </>
//                       ) : (
//                         category
//                       )}
//                     </TabsTrigger>
//                   ))}
//                 </TabsList>
//               </Tabs>

//               <ScrollArea className="h-[400px] md:h-[500px] pr-4">
//                 <div className="space-y-2">
//                   {filteredTemplates.length > 0 ? (
//                     filteredTemplates.map((template) => (
//                       <motion.div
//                         key={template.id}
//                         whileHover={{ scale: 1.01 }}
//                         whileTap={{ scale: 0.99 }}
//                         className="p-3 bg-background-80 rounded-md group relative"
//                         draggable
//                         onDragEnd={() => onSelectTemplate(template.content)}
//                       >
//                         <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-20 group-hover:opacity-60">
//                           <DragHandleDots2Icon className="h-5 w-5" />
//                         </div>
//                         <div className="pl-7">
//                           <div className="flex justify-between items-start mb-1">
//                             <h4 className="text-sm font-medium">{template.title}</h4>
//                             <div className="flex gap-1">
//                               <span className="text-xs py-0.5 px-2 bg-light-blue/10 text-light-blue rounded-full">
//                                 {template.category}
//                               </span>
//                             </div>
//                           </div>
//                           <p className="text-xs text-text-secondary line-clamp-2">{template.content}</p>
//                           <div className="flex justify-between items-center mt-2">
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               className="h-7 text-xs text-light-blue hover:text-light-blue hover:bg-light-blue/10"
//                               onClick={() => onSelectTemplate(template.content)}
//                             >
//                               Use template
//                             </Button>
//                             <div className="flex gap-1">
//                               <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 className="h-6 w-6 p-0 rounded-full text-text-secondary hover:text-light-blue"
//                                 onClick={() => handleCopyTemplate(template.content)}
//                                 title="Copy to clipboard"
//                               >
//                                 <Copy className="h-3.5 w-3.5" />
//                               </Button>
//                               <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 className={`h-6 w-6 p-0 rounded-full ${favorites.includes(template.id) ? "text-yellow-400" : "text-text-secondary hover:text-yellow-400"}`}
//                                 onClick={() => toggleFavorite(template.id)}
//                                 title={favorites.includes(template.id) ? "Remove from favorites" : "Add to favorites"}
//                               >
//                                 {favorites.includes(template.id) ? (
//                                   <Star className="h-3.5 w-3.5 fill-yellow-400" />
//                                 ) : (
//                                   <StarOff className="h-3.5 w-3.5" />
//                                 )}
//                               </Button>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))
//                   ) : (
//                     <div className="flex flex-col items-center justify-center py-8 text-center">
//                       <div className="p-3 bg-background-80 rounded-full mb-3">
//                         <Search className="h-5 w-5 text-text-secondary" />
//                       </div>
//                       <p className="text-sm font-medium">No templates found</p>
//                       <p className="text-xs text-text-secondary mt-1">Try a different search term or category</p>
//                     </div>
//                   )}
//                 </div>
//               </ScrollArea>

//               <div className="mt-3 pt-2 border-t border-background-80 text-center">
//                 <p className="text-xs text-text-secondary">Drag templates to use them or to click Use template</p>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// export default ResponseLibrary

"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, X, Search, DotIcon as DragHandleDots2Icon, Star, StarOff, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"

type ResponseTemplate = {
  id: string
  category: string
  title: string
  content: string
  isFavorite?: boolean
}

type ResponseLibraryProps = {
  onSelectTemplate: (content: string) => void
}

// Ensure templates are defined and accessible
const SAMPLE_TEMPLATES: ResponseTemplate[] = [
  {
    id: "1",
    category: "Pricing",
    title: "Basic Pricing",
    content:
      "Thanks for your interest! Our pricing starts at $19/month for the basic plan and $49/month for premium. Would you like me to send you our full pricing guide?",
    isFavorite: true,
  },
  {
    id: "2",
    category: "Pricing",
    title: "Discount Offer",
    content:
      "Thanks for asking about our pricing! We're currently running a special promotion - use code WELCOME20 for 20% off your first month. Would you like to know more?",
  },
  {
    id: "3",
    category: "Support",
    title: "General Support",
    content:
      "I'd be happy to help you with that issue. Could you please provide more details about what you're experiencing?",
  },
  {
    id: "4",
    category: "Support",
    title: "Technical Issue",
    content:
      "Sorry to hear you're having technical difficulties. Have you tried clearing your cache and cookies? If that doesn't work, our support team is available at support@example.com.",
  },
  {
    id: "5",
    category: "Welcome",
    title: "New Follower",
    content:
      "Thanks for following us! We're excited to have you as part of our community. Feel free to reach out if you have any questions!",
    isFavorite: true,
  },
  {
    id: "6",
    category: "Welcome",
    title: "First Comment",
    content:
      "Thanks for your comment! We appreciate your engagement with our content and look forward to hearing more from you.",
  },
  {
    id: "7",
    category: "Product",
    title: "Product Information",
    content:
      "Thank you for your interest in our product! It's designed to help you achieve better results with less effort. Would you like to know more about specific features?",
  },
  {
    id: "8",
    category: "Product",
    title: "Product Recommendation",
    content:
      "Based on what you're looking for, I'd recommend our premium package. It's perfect for businesses like yours and comes with all the features you need. Would you like more details?",
  },
]

const ResponseLibrary = ({ onSelectTemplate }: ResponseLibraryProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [favorites, setFavorites] = useState<string[]>(SAMPLE_TEMPLATES.filter((t) => t.isFavorite).map((t) => t.id))
  const [activeCategory, setActiveCategory] = useState("all")
  const [templates] = useState<ResponseTemplate[]>(SAMPLE_TEMPLATES) // Don't use setTemplates to avoid issues
  const popoverRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(popoverRef, () => setIsOpen(false))

  // Get unique categories
  const categories = ["all", "favorites", ...Array.from(new Set(templates.map((template) => template.category)))]

  // Filter templates based on search and category
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      searchTerm === "" ||
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.content.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      activeCategory === "all" ||
      (activeCategory === "favorites" && favorites.includes(template.id)) ||
      template.category === activeCategory

    return matchesSearch && matchesCategory
  })

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fav) => fav !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const handleCopyTemplate = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  return (
    <div className="relative">
      <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2">
        <BookOpen className="h-4 w-4" />
        Templates
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed md:absolute right-4 md:right-0 left-4 md:left-auto top-20 md:top-full mt-2 z-50 bg-background-90 border border-background-80 rounded-xl shadow-2xl w-auto md:w-[450px] overflow-hidden"
            style={{
              maxHeight: "calc(80vh - 100px)",
              maxWidth: "calc(100vw - 32px)",
            }}
          >
            <div className="flex items-center justify-between bg-background-80 p-3 border-b border-background-80">
              <h3 className="font-medium flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Response Templates
              </h3>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-3">
              <div className="relative mb-3">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-background-80 border-none"
                />
              </div>

              <Tabs defaultValue="all" className="mb-3" onValueChange={setActiveCategory}>
                <TabsList className="flex overflow-x-auto h-auto p-1 bg-background-80 no-scrollbar">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="text-xs py-1 capitalize whitespace-nowrap flex-shrink-0"
                    >
                      {category === "favorites" ? (
                        <>
                          <Star className="h-3 w-3 mr-1" /> {category}
                        </>
                      ) : (
                        category
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <ScrollArea className="h-[400px] md:h-[500px] pr-4">
                <div className="space-y-2">
                  {filteredTemplates.length > 0 ? (
                    filteredTemplates.map((template) => (
                      <motion.div
                        key={template.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="p-3 bg-background-80 rounded-md group relative"
                        draggable
                        onDragEnd={() => onSelectTemplate(template.content)}
                      >
                        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-20 group-hover:opacity-60">
                          <DragHandleDots2Icon className="h-5 w-5" />
                        </div>
                        <div className="pl-7">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-sm font-medium">{template.title}</h4>
                            <div className="flex gap-1">
                              <span className="text-xs py-0.5 px-2 bg-light-blue/10 text-light-blue rounded-full">
                                {template.category}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-text-secondary line-clamp-2">{template.content}</p>
                          <div className="flex justify-between items-center mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-light-blue hover:text-light-blue hover:bg-light-blue/10"
                              onClick={() => {
                                onSelectTemplate(template.content)
                                setIsOpen(false)
                              }}
                            >
                              Use template
                            </Button>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 rounded-full text-text-secondary hover:text-light-blue"
                                onClick={() => handleCopyTemplate(template.content)}
                                title="Copy to clipboard"
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`h-6 w-6 p-0 rounded-full ${favorites.includes(template.id) ? "text-yellow-400" : "text-text-secondary hover:text-yellow-400"}`}
                                onClick={() => toggleFavorite(template.id)}
                                title={favorites.includes(template.id) ? "Remove from favorites" : "Add to favorites"}
                              >
                                {favorites.includes(template.id) ? (
                                  <Star className="h-3.5 w-3.5 fill-yellow-400" />
                                ) : (
                                  <StarOff className="h-3.5 w-3.5" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="p-3 bg-background-80 rounded-full mb-3">
                        <Search className="h-5 w-5 text-text-secondary" />
                      </div>
                      <p className="text-sm font-medium">No templates found</p>
                      <p className="text-xs text-text-secondary mt-1">Try a different search term or category</p>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="mt-3 pt-2 border-t border-background-80 text-center">
                <p className="text-xs text-text-secondary">Drag templates to use them or click "Use template"</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ResponseLibrary

