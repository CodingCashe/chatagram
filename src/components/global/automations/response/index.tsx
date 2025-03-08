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

// // Ensure templates are defined and accessible
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
//       "Thank you for your interest in our product! It's designed to help you achieve better results with less effort. Would you like to know more about specific features?",
//   },
//   {
//     id: "8",
//     category: "Product",
//     title: "Product Recommendation",
//     content:
//       "Based on what you're looking for, I'd recommend our premium package. It's perfect for businesses like yours and comes with all the features you need. Would you like more details?",
//   },
// ]

// const ResponseLibrary = ({ onSelectTemplate }: ResponseLibraryProps) => {
//   const [isOpen, setIsOpen] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [favorites, setFavorites] = useState<string[]>(SAMPLE_TEMPLATES.filter((t) => t.isFavorite).map((t) => t.id))
//   const [activeCategory, setActiveCategory] = useState("all")
//   const [templates] = useState<ResponseTemplate[]>(SAMPLE_TEMPLATES) // Don't use setTemplates to avoid issues
//   const popoverRef = useRef<HTMLDivElement>(null)

//   useOnClickOutside(popoverRef, () => setIsOpen(false))

//   // Get unique categories
//   const categories = ["all", "favorites", ...Array.from(new Set(templates.map((template) => template.category)))]

//   // Filter templates based on search and category
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
//     navigator.clipboard.writeText(content)
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
//                               onClick={() => {
//                                 onSelectTemplate(template.content)
//                                 setIsOpen(false)
//                               }}
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

// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import {
//   MessageSquare,
//   Sparkles,
//   Star,
//   StarOff,
//   Copy,
//   CheckCircle,
//   Search,
//   Tag,
//   Clock,
//   TrendingUp,
//   Heart,
//   Zap,
//   Edit,
//   Plus,
// } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { useToast } from "@/hooks/use-toast"

// type Template = {
//   id: string
//   content: string
//   category: string
//   isAI: boolean
//   popularity: number
//   isNew?: boolean
//   isFavorite?: boolean
// }

// type Props = {
//   isAI: boolean
//   onSelectTemplate: (template: string) => void
//   selectedTemplate?: string
// }

// const ResponseLibrary = ({ isAI, onSelectTemplate, selectedTemplate }: Props) => {
//   const { toast } = useToast()
//   const [searchTerm, setSearchTerm] = useState("")
//   const [activeCategory, setActiveCategory] = useState<string>("all")
//   const [favorites, setFavorites] = useState<string[]>([])
//   const [copied, setCopied] = useState<string | null>(null)
//   const [customTemplate, setCustomTemplate] = useState("")
//   const [isEditing, setIsEditing] = useState(false)
//   const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)
//   const [activeTab, setActiveTab] = useState<string>(isAI ? "ai" : "standard")

//   // Standard templates
//   const standardTemplates: Template[] = [
//     {
//       id: "s1",
//       content: "Thank you for your comment! We appreciate your feedback.",
//       category: "general",
//       isAI: false,
//       popularity: 95,
//     },
//     {
//       id: "s2",
//       content: "Thanks for reaching out! We'll get back to you shortly.",
//       category: "general",
//       isAI: false,
//       popularity: 87,
//     },
//     {
//       id: "s3",
//       content: "Great question! The answer is...",
//       category: "questions",
//       isAI: false,
//       popularity: 76,
//       isNew: true,
//     },
//     {
//       id: "s4",
//       content: "We're sorry to hear about your experience. Please DM us so we can resolve this issue.",
//       category: "support",
//       isAI: false,
//       popularity: 92,
//     },
//     {
//       id: "s5",
//       content: "Thanks for your interest! Our product is available at [link].",
//       category: "sales",
//       isAI: false,
//       popularity: 84,
//     },
//     {
//       id: "s6",
//       content: "We're excited to announce that we'll be launching soon! Stay tuned for updates.",
//       category: "announcements",
//       isAI: false,
//       popularity: 79,
//     },
//     {
//       id: "s7",
//       content: "Congratulations on your purchase! Here's what happens next...",
//       category: "sales",
//       isAI: false,
//       popularity: 88,
//     },
//     {
//       id: "s8",
//       content: "We value your feedback! Please let us know if you have any other suggestions.",
//       category: "general",
//       isAI: false,
//       popularity: 81,
//     },
//   ]

//   // AI templates
//   const aiTemplates: Template[] = [
//     {
//       id: "a1",
//       content: "{AI will analyze the comment sentiment and respond appropriately}",
//       category: "smart",
//       isAI: true,
//       popularity: 98,
//       isNew: true,
//     },
//     {
//       id: "a2",
//       content: "{AI will answer product questions based on your product catalog}",
//       category: "product",
//       isAI: true,
//       popularity: 94,
//     },
//     {
//       id: "a3",
//       content: "{AI will provide personalized recommendations based on user history}",
//       category: "recommendations",
//       isAI: true,
//       popularity: 91,
//     },
//     {
//       id: "a4",
//       content: "{AI will handle support inquiries and suggest solutions}",
//       category: "support",
//       isAI: true,
//       popularity: 89,
//     },
//     {
//       id: "a5",
//       content: "{AI will engage with user comments using your brand voice}",
//       category: "engagement",
//       isAI: true,
//       popularity: 86,
//       isNew: true,
//     },
//     {
//       id: "a6",
//       content: "{AI will detect and respond to frequently asked questions}",
//       category: "smart",
//       isAI: true,
//       popularity: 93,
//     },
//   ]

//   // Combined templates based on active tab
//   const templates = activeTab === "ai" ? aiTemplates : standardTemplates

//   // Filter templates based on search and category
//   const filteredTemplates = templates.filter((template) => {
//     const matchesSearch = template.content.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesCategory = activeCategory === "all" || template.category === activeCategory
//     const matchesFavorites = activeCategory === "favorites" ? favorites.includes(template.id) : true
//     return matchesSearch && matchesCategory && matchesFavorites
//   })

//   // Get unique categories
//   const categories = ["all", "favorites", ...Array.from(new Set(templates.map((t) => t.category)))]

//   // Toggle favorite status
//   const toggleFavorite = (id: string) => {
//     setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))

//     toast({
//       title: favorites.includes(id) ? "Removed from favorites" : "Added to favorites",
//       description: favorites.includes(id)
//         ? "Template removed from your favorites"
//         : "Template added to your favorites for quick access",
//       duration: 2000,
//     })
//   }

//   // Copy template to clipboard
//   const copyToClipboard = (id: string, content: string) => {
//     navigator.clipboard.writeText(content)
//     setCopied(id)
//     setTimeout(() => setCopied(null), 2000)

//     toast({
//       title: "Copied to clipboard",
//       description: "Template copied to clipboard",
//       duration: 2000,
//     })
//   }

//   // Handle template selection
//   const handleSelectTemplate = (template: Template) => {
//     onSelectTemplate(template.content)

//     toast({
//       title: "Template selected",
//       description: isAI ? "AI template will be used to generate responses" : "Template will be used for all responses",
//       duration: 2000,
//     })
//   }

//   // Handle custom template submission
//   const handleCustomTemplateSubmit = () => {
//     if (customTemplate.trim()) {
//       if (editingTemplate) {
//         // Update existing template logic would go here
//         // For now, just select the custom template
//         onSelectTemplate(customTemplate)
//         setIsEditing(false)
//         setEditingTemplate(null)

//         toast({
//           title: "Template updated",
//           description: "Your custom template has been updated",
//           duration: 2000,
//         })
//       } else {
//         // Add new template logic would go here
//         // For now, just select the custom template
//         onSelectTemplate(customTemplate)

//         toast({
//           title: "Custom template created",
//           description: "Your custom template is now ready to use",
//           duration: 2000,
//         })
//       }
//       setCustomTemplate("")
//     }
//   }

//   // Start editing a template
//   const startEditing = (template: Template) => {
//     setIsEditing(true)
//     setEditingTemplate(template)
//     setCustomTemplate(template.content)
//   }

//   // Cancel editing
//   const cancelEditing = () => {
//     setIsEditing(false)
//     setEditingTemplate(null)
//     setCustomTemplate("")
//   }

//   // Update active tab when isAI prop changes
//   useEffect(() => {
//     setActiveTab(isAI ? "ai" : "standard")
//   }, [isAI])

//   return (
//     <div className="bg-background-80 rounded-xl p-4 w-full">
//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-bold flex items-center gap-2">
//             <MessageSquare className="h-5 w-5 text-[#768BDD]" />
//             Response Templates
//           </h3>
//           <TabsList>
//             <TabsTrigger value="standard" className="text-sm">
//               Standard
//             </TabsTrigger>
//             <TabsTrigger value="ai" className="text-sm">
//               <Sparkles className="h-3.5 w-3.5 mr-1.5 text-purple-400" />
//               AI-Powered
//             </TabsTrigger>
//           </TabsList>
//         </div>

//         <div className="mb-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
//             <Input
//               placeholder="Search templates..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-9 bg-background-90 border-none"
//             />
//           </div>
//         </div>

//         <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
//           {categories.map((category) => (
//             <Button
//               key={category}
//               variant="outline"
//               size="sm"
//               onClick={() => setActiveCategory(category)}
//               className={cn(
//                 "border-background-90 bg-background-90 capitalize whitespace-nowrap",
//                 activeCategory === category && "border-[#768BDD] text-[#768BDD]",
//               )}
//             >
//               {category === "all" ? (
//                 <>All</>
//               ) : category === "favorites" ? (
//                 <>
//                   <Star className="h-3.5 w-3.5 mr-1.5 text-yellow-400" />
//                   Favorites
//                 </>
//               ) : (
//                 <>
//                   <Tag className="h-3.5 w-3.5 mr-1.5" />
//                   {category}
//                 </>
//               )}
//             </Button>
//           ))}
//         </div>

//         <TabsContent value="standard" className="mt-0">
//           <div className="space-y-3 staggeredFadeIn">
//             {filteredTemplates.length > 0 ? (
//               filteredTemplates.map((template) => (
//                 <motion.div
//                   key={template.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   whileHover={{ scale: 1.01 }}
//                   className={cn(
//                     "bg-background-90 p-3 rounded-lg border border-transparent transition-all cursor-pointer group",
//                     selectedTemplate === template.content && "border-[#768BDD] shadow-md",
//                   )}
//                   onClick={() => handleSelectTemplate(template)}
//                 >
//                   <div className="flex justify-between items-start mb-2">
//                     <div className="flex items-center gap-2">
//                       {template.isNew && <Badge className="bg-green-600 text-xs">New</Badge>}
//                       {template.popularity > 90 && (
//                         <Badge className="bg-[#768BDD] text-xs flex items-center gap-1">
//                           <TrendingUp className="h-3 w-3" />
//                           Popular
//                         </Badge>
//                       )}
//                       <Badge variant="outline" className="bg-background-80/50 text-xs capitalize">
//                         {template.category}
//                       </Badge>
//                     </div>
//                     <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-7 w-7"
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 toggleFavorite(template.id)
//                               }}
//                             >
//                               {favorites.includes(template.id) ? (
//                                 <Star className="h-4 w-4 text-yellow-400" />
//                               ) : (
//                                 <StarOff className="h-4 w-4" />
//                               )}
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             {favorites.includes(template.id) ? "Remove from favorites" : "Add to favorites"}
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>

//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-7 w-7"
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 copyToClipboard(template.id, template.content)
//                               }}
//                             >
//                               {copied === template.id ? (
//                                 <CheckCircle className="h-4 w-4 text-green-500" />
//                               ) : (
//                                 <Copy className="h-4 w-4" />
//                               )}
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>{copied === template.id ? "Copied!" : "Copy to clipboard"}</TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>

//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-7 w-7"
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 startEditing(template)
//                               }}
//                             >
//                               <Edit className="h-4 w-4" />
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>Edit template</TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                     </div>
//                   </div>
//                   <p className="text-sm">{template.content}</p>
//                   <div className="flex items-center justify-between mt-2 text-xs text-text-secondary">
//                     <div className="flex items-center gap-1">
//                       <Heart className="h-3 w-3" />
//                       <span>{template.popularity}% effective</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Clock className="h-3 w-3" />
//                       <span>~2s response time</span>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))
//             ) : (
//               <div className="flex flex-col items-center justify-center py-8 text-center">
//                 <div className="p-4 rounded-full bg-background-80 mb-4">
//                   <Search className="h-6 w-6 text-text-secondary" />
//                 </div>
//                 <p className="text-white font-medium">No templates found</p>
//                 <p className="text-sm text-text-secondary mt-1 max-w-xs">
//                   Try adjusting your search or category filters
//                 </p>
//               </div>
//             )}
//           </div>
//         </TabsContent>

//         <TabsContent value="ai" className="mt-0">
//           <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-4 rounded-lg mb-4 border border-purple-500/20">
//             <div className="flex items-start gap-3">
//               <div className="p-2 bg-purple-900/30 rounded-lg">
//                 <Sparkles className="h-5 w-5 text-purple-400" />
//               </div>
//               <div>
//                 <h4 className="font-medium text-purple-300 flex items-center gap-2">
//                   AI-Powered Templates
//                   <Badge className="bg-purple-600 text-xs">Premium</Badge>
//                 </h4>
//                 <p className="text-sm text-text-secondary mt-1">
//                   These templates use AI to generate dynamic, personalized responses based on the context of each
//                   interaction.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-3 staggeredFadeIn">
//             {filteredTemplates.length > 0 ? (
//               filteredTemplates.map((template) => (
//                 <motion.div
//                   key={template.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   whileHover={{ scale: 1.01 }}
//                   className={cn(
//                     "bg-background-90 p-3 rounded-lg border border-transparent transition-all cursor-pointer group",
//                     selectedTemplate === template.content && "border-purple-500 shadow-md",
//                   )}
//                   onClick={() => handleSelectTemplate(template)}
//                 >
//                   <div className="flex justify-between items-start mb-2">
//                     <div className="flex items-center gap-2">
//                       {template.isNew && <Badge className="bg-green-600 text-xs">New</Badge>}
//                       <Badge className="bg-purple-600 text-xs flex items-center gap-1">
//                         <Sparkles className="h-3 w-3" />
//                         AI
//                       </Badge>
//                       <Badge variant="outline" className="bg-background-80/50 text-xs capitalize">
//                         {template.category}
//                       </Badge>
//                     </div>
//                     <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-7 w-7"
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 toggleFavorite(template.id)
//                               }}
//                             >
//                               {favorites.includes(template.id) ? (
//                                 <Star className="h-4 w-4 text-yellow-400" />
//                               ) : (
//                                 <StarOff className="h-4 w-4" />
//                               )}
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             {favorites.includes(template.id) ? "Remove from favorites" : "Add to favorites"}
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>

//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-7 w-7"
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 copyToClipboard(template.id, template.content)
//                               }}
//                             >
//                               {copied === template.id ? (
//                                 <CheckCircle className="h-4 w-4 text-green-500" />
//                               ) : (
//                                 <Copy className="h-4 w-4" />
//                               )}
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>{copied === template.id ? "Copied!" : "Copy to clipboard"}</TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                     </div>
//                   </div>
//                   <p className="text-sm">{template.content}</p>
//                   <div className="flex items-center justify-between mt-2 text-xs text-text-secondary">
//                     <div className="flex items-center gap-1">
//                       <Zap className="h-3 w-3 text-purple-400" />
//                       <span>Dynamic response</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <TrendingUp className="h-3 w-3 text-purple-400" />
//                       <span>{template.popularity}% satisfaction</span>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))
//             ) : (
//               <div className="flex flex-col items-center justify-center py-8 text-center">
//                 <div className="p-4 rounded-full bg-background-80 mb-4">
//                   <Search className="h-6 w-6 text-text-secondary" />
//                 </div>
//                 <p className="text-white font-medium">No AI templates found</p>
//                 <p className="text-sm text-text-secondary mt-1 max-w-xs">
//                   Try adjusting your search or category filters
//                 </p>
//               </div>
//             )}
//           </div>
//         </TabsContent>
//       </Tabs>

//       {/* Custom template creator */}
//       <AnimatePresence>
//         {isEditing ? (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="mt-4 bg-background-90 p-4 rounded-lg border border-[#768BDD]/30"
//           >
//             <div className="flex items-center justify-between mb-3">
//               <h4 className="font-medium flex items-center gap-2">
//                 <Edit className="h-4 w-4 text-[#768BDD]" />
//                 {editingTemplate ? "Edit Template" : "Create Custom Template"}
//               </h4>
//               <Badge variant="outline" className="bg-background-80/50 text-xs">
//                 {activeTab === "ai" ? "AI Template" : "Standard Template"}
//               </Badge>
//             </div>
//             <div className="space-y-3">
//               <textarea
//                 value={customTemplate}
//                 onChange={(e) => setCustomTemplate(e.target.value)}
//                 placeholder="Enter your custom template text..."
//                 className="w-full h-24 bg-background-80 border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-[#768BDD] resize-none"
//               />
//               <div className="flex items-center gap-2">
//                 <Button
//                   onClick={handleCustomTemplateSubmit}
//                   disabled={!customTemplate.trim()}
//                   className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] text-white"
//                 >
//                   {editingTemplate ? "Update Template" : "Create Template"}
//                 </Button>
//                 <Button variant="outline" onClick={cancelEditing}>
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           </motion.div>
//         ) : (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
//             <Button
//               variant="outline"
//               onClick={() => setIsEditing(true)}
//               className="w-full flex items-center justify-center gap-2"
//             >
//               <Plus className="h-4 w-4" />
//               Create Custom Template
//             </Button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// export default ResponseLibrary

// "use client"

// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import {
//   MessageSquare,
//   Sparkles,
//   Star,
//   StarOff,
//   Copy,
//   CheckCircle,
//   Search,
//   Tag,
//   Clock,
//   TrendingUp,
//   Heart,
//   Zap,
//   Edit,
//   Plus,
// } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { useToast } from "@/hooks/use-toast"

// type Template = {
//   id: string
//   content: string
//   category: string
//   isAI: boolean
//   popularity: number
//   isNew?: boolean
//   isFavorite?: boolean
// }

// type Props = {
//   isAI: boolean
//   onSelectTemplate: (template: string) => void
//   selectedTemplate?: string
// }

// const ResponseLibrary = ({ isAI, onSelectTemplate, selectedTemplate }: Props) => {
//   const { toast } = useToast()
//   const [searchTerm, setSearchTerm] = useState("")
//   const [activeCategory, setActiveCategory] = useState<string>("all")
//   const [favorites, setFavorites] = useState<string[]>([])
//   const [copied, setCopied] = useState<string | null>(null)
//   const [customTemplate, setCustomTemplate] = useState("")
//   const [isEditing, setIsEditing] = useState(false)
//   const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)
//   const [activeTab, setActiveTab] = useState<string>(isAI ? "ai" : "standard")

//   // Standard templates
//   const standardTemplates: Template[] = [
//     {
//       id: "s1",
//       content: "Thank you for your comment! We appreciate your feedback.",
//       category: "general",
//       isAI: false,
//       popularity: 95,
//     },
//     {
//       id: "s2",
//       content: "Thanks for reaching out! We'll get back to you shortly.",
//       category: "general",
//       isAI: false,
//       popularity: 87,
//     },
//     {
//       id: "s3",
//       content: "Great question! The answer is...",
//       category: "questions",
//       isAI: false,
//       popularity: 76,
//       isNew: true,
//     },
//     {
//       id: "s4",
//       content: "We're sorry to hear about your experience. Please DM us so we can resolve this issue.",
//       category: "support",
//       isAI: false,
//       popularity: 92,
//     },
//     {
//       id: "s5",
//       content: "Thanks for your interest! Our product is available at [link].",
//       category: "sales",
//       isAI: false,
//       popularity: 84,
//     },
//     {
//       id: "s6",
//       content: "We're excited to announce that we'll be launching soon! Stay tuned for updates.",
//       category: "announcements",
//       isAI: false,
//       popularity: 79,
//     },
//     {
//       id: "s7",
//       content: "Congratulations on your purchase! Here's what happens next...",
//       category: "sales",
//       isAI: false,
//       popularity: 88,
//     },
//     {
//       id: "s8",
//       content: "We value your feedback! Please let us know if you have any other suggestions.",
//       category: "general",
//       isAI: false,
//       popularity: 81,
//     },
//   ]

//   // AI templates
//   const aiTemplates: Template[] = [
//     {
//       id: "a1",
//       content: "{AI will analyze the comment sentiment and respond appropriately}",
//       category: "smart",
//       isAI: true,
//       popularity: 98,
//       isNew: true,
//     },
//     {
//       id: "a2",
//       content: "{AI will answer product questions based on your product catalog}",
//       category: "product",
//       isAI: true,
//       popularity: 94,
//     },
//     {
//       id: "a3",
//       content: "{AI will provide personalized recommendations based on user history}",
//       category: "recommendations",
//       isAI: true,
//       popularity: 91,
//     },
//     {
//       id: "a4",
//       content: "{AI will handle support inquiries and suggest solutions}",
//       category: "support",
//       isAI: true,
//       popularity: 89,
//     },
//     {
//       id: "a5",
//       content: "{AI will engage with user comments using your brand voice}",
//       category: "engagement",
//       isAI: true,
//       popularity: 86,
//       isNew: true,
//     },
//     {
//       id: "a6",
//       content: "{AI will detect and respond to frequently asked questions}",
//       category: "smart",
//       isAI: true,
//       popularity: 93,
//     },
//   ]

//   // Combined templates based on active tab
//   const templates = activeTab === "ai" ? aiTemplates : standardTemplates

//   // Filter templates based on search and category
//   const filteredTemplates = templates.filter((template) => {
//     const matchesSearch = template.content.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesCategory = activeCategory === "all" || template.category === activeCategory
//     const matchesFavorites = activeCategory === "favorites" ? favorites.includes(template.id) : true
//     return matchesSearch && matchesCategory && matchesFavorites
//   })

//   // Get unique categories
//   const categories = ["all", "favorites", ...Array.from(new Set(templates.map((t) => t.category)))]

//   // Toggle favorite status
//   const toggleFavorite = (id: string) => {
//     setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))

//     toast({
//       title: favorites.includes(id) ? "Removed from favorites" : "Added to favorites",
//       description: favorites.includes(id)
//         ? "Template removed from your favorites"
//         : "Template added to your favorites for quick access",
//       duration: 2000,
//     })
//   }

//   // Copy template to clipboard
//   const copyToClipboard = (id: string, content: string) => {
//     navigator.clipboard.writeText(content)
//     setCopied(id)
//     setTimeout(() => setCopied(null), 2000)

//     toast({
//       title: "Copied to clipboard",
//       description: "Template copied to clipboard",
//       duration: 2000,
//     })
//   }

//   // Handle template selection
//   const handleSelectTemplate = (template: Template) => {
//     onSelectTemplate(template.content)

//     toast({
//       title: "Template selected",
//       description: isAI ? "AI template will be used to generate responses" : "Template will be used for all responses",
//       duration: 2000,
//     })
//   }

//   // Handle custom template submission
//   const handleCustomTemplateSubmit = () => {
//     if (customTemplate.trim()) {
//       if (editingTemplate) {
//         // Update existing template logic would go here
//         // For now, just select the custom template
//         onSelectTemplate(customTemplate)
//         setIsEditing(false)
//         setEditingTemplate(null)

//         toast({
//           title: "Template updated",
//           description: "Your custom template has been updated",
//           duration: 2000,
//         })
//       } else {
//         // Add new template logic would go here
//         // For now, just select the custom template
//         onSelectTemplate(customTemplate)

//         toast({
//           title: "Custom template created",
//           description: "Your custom template is now ready to use",
//           duration: 2000,
//         })
//       }
//       setCustomTemplate("")
//     }
//   }

//   // Start editing a template
//   const startEditing = (template: Template) => {
//     setIsEditing(true)
//     setEditingTemplate(template)
//     setCustomTemplate(template.content)
//   }

//   // Cancel editing
//   const cancelEditing = () => {
//     setIsEditing(false)
//     setEditingTemplate(null)
//     setCustomTemplate("")
//   }

//   // Update active tab when isAI prop changes
//   useEffect(() => {
//     setActiveTab(isAI ? "ai" : "standard")
//   }, [isAI])

//   // Debug log to verify templates are available
//   useEffect(() => {
//     console.log(`ResponseLibrary: ${filteredTemplates.length} templates available in ${activeTab} mode`)
//   }, [filteredTemplates.length, activeTab])

//   return (
//     <div className="bg-background-80 rounded-xl p-4 w-full">
//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-bold flex items-center gap-2">
//             <MessageSquare className="h-5 w-5 text-[#768BDD]" />
//             Response Templates
//           </h3>
//           <TabsList>
//             <TabsTrigger value="standard" className="text-sm">
//               Standard
//             </TabsTrigger>
//             <TabsTrigger value="ai" className="text-sm">
//               <Sparkles className="h-3.5 w-3.5 mr-1.5 text-purple-400" />
//               AI-Powered
//             </TabsTrigger>
//           </TabsList>
//         </div>

//         <div className="mb-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
//             <Input
//               placeholder="Search templates..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-9 bg-background-90 border-none"
//             />
//           </div>
//         </div>

//         <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
//           {categories.map((category) => (
//             <Button
//               key={category}
//               variant="outline"
//               size="sm"
//               onClick={() => setActiveCategory(category)}
//               className={cn(
//                 "border-background-90 bg-background-90 capitalize whitespace-nowrap",
//                 activeCategory === category && "border-[#768BDD] text-[#768BDD]",
//               )}
//             >
//               {category === "all" ? (
//                 <>All</>
//               ) : category === "favorites" ? (
//                 <>
//                   <Star className="h-3.5 w-3.5 mr-1.5 text-yellow-400" />
//                   Favorites
//                 </>
//               ) : (
//                 <>
//                   <Tag className="h-3.5 w-3.5 mr-1.5" />
//                   {category}
//                 </>
//               )}
//             </Button>
//           ))}
//         </div>

//         <TabsContent value="standard" className="mt-0">
//           <div className="space-y-3 staggeredFadeIn">
//             {filteredTemplates.length > 0 ? (
//               filteredTemplates.map((template) => (
//                 <motion.div
//                   key={template.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   whileHover={{ scale: 1.01 }}
//                   className={cn(
//                     "bg-background-90 p-3 rounded-lg border border-transparent transition-all cursor-pointer group",
//                     selectedTemplate === template.content && "border-[#768BDD] shadow-md",
//                   )}
//                   onClick={() => handleSelectTemplate(template)}
//                 >
//                   <div className="flex justify-between items-start mb-2">
//                     <div className="flex items-center gap-2">
//                       {template.isNew && <Badge className="bg-green-600 text-xs">New</Badge>}
//                       {template.popularity > 90 && (
//                         <Badge className="bg-[#768BDD] text-xs flex items-center gap-1">
//                           <TrendingUp className="h-3 w-3" />
//                           Popular
//                         </Badge>
//                       )}
//                       <Badge variant="outline" className="bg-background-80/50 text-xs capitalize">
//                         {template.category}
//                       </Badge>
//                     </div>
//                     <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-7 w-7"
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 toggleFavorite(template.id)
//                               }}
//                             >
//                               {favorites.includes(template.id) ? (
//                                 <Star className="h-4 w-4 text-yellow-400" />
//                               ) : (
//                                 <StarOff className="h-4 w-4" />
//                               )}
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             {favorites.includes(template.id) ? "Remove from favorites" : "Add to favorites"}
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>

//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-7 w-7"
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 copyToClipboard(template.id, template.content)
//                               }}
//                             >
//                               {copied === template.id ? (
//                                 <CheckCircle className="h-4 w-4 text-green-500" />
//                               ) : (
//                                 <Copy className="h-4 w-4" />
//                               )}
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>{copied === template.id ? "Copied!" : "Copy to clipboard"}</TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>

//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-7 w-7"
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 startEditing(template)
//                               }}
//                             >
//                               <Edit className="h-4 w-4" />
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>Edit template</TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                     </div>
//                   </div>
//                   <p className="text-sm">{template.content}</p>
//                   <div className="flex items-center justify-between mt-2 text-xs text-text-secondary">
//                     <div className="flex items-center gap-1">
//                       <Heart className="h-3 w-3" />
//                       <span>{template.popularity}% effective</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Clock className="h-3 w-3" />
//                       <span>~2s response time</span>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))
//             ) : (
//               <div className="flex flex-col items-center justify-center py-8 text-center">
//                 <div className="p-4 rounded-full bg-background-80 mb-4">
//                   <Search className="h-6 w-6 text-text-secondary" />
//                 </div>
//                 <p className="text-white font-medium">No templates found</p>
//                 <p className="text-sm text-text-secondary mt-1 max-w-xs">
//                   Try adjusting your search or category filters
//                 </p>
//               </div>
//             )}
//           </div>
//         </TabsContent>

//         <TabsContent value="ai" className="mt-0">
//           <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-4 rounded-lg mb-4 border border-purple-500/20">
//             <div className="flex items-start gap-3">
//               <div className="p-2 bg-purple-900/30 rounded-lg">
//                 <Sparkles className="h-5 w-5 text-purple-400" />
//               </div>
//               <div>
//                 <h4 className="font-medium text-purple-300 flex items-center gap-2">
//                   AI-Powered Templates
//                   <Badge className="bg-purple-600 text-xs">Premium</Badge>
//                 </h4>
//                 <p className="text-sm text-text-secondary mt-1">
//                   These templates use AI to generate dynamic, personalized responses based on the context of each
//                   interaction.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-3 staggeredFadeIn">
//             {filteredTemplates.length > 0 ? (
//               filteredTemplates.map((template) => (
//                 <motion.div
//                   key={template.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   whileHover={{ scale: 1.01 }}
//                   className={cn(
//                     "bg-background-90 p-3 rounded-lg border border-transparent transition-all cursor-pointer group",
//                     selectedTemplate === template.content && "border-purple-500 shadow-md",
//                   )}
//                   onClick={() => handleSelectTemplate(template)}
//                 >
//                   <div className="flex justify-between items-start mb-2">
//                     <div className="flex items-center gap-2">
//                       {template.isNew && <Badge className="bg-green-600 text-xs">New</Badge>}
//                       <Badge className="bg-purple-600 text-xs flex items-center gap-1">
//                         <Sparkles className="h-3 w-3" />
//                         AI
//                       </Badge>
//                       <Badge variant="outline" className="bg-background-80/50 text-xs capitalize">
//                         {template.category}
//                       </Badge>
//                     </div>
//                     <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-7 w-7"
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 toggleFavorite(template.id)
//                               }}
//                             >
//                               {favorites.includes(template.id) ? (
//                                 <Star className="h-4 w-4 text-yellow-400" />
//                               ) : (
//                                 <StarOff className="h-4 w-4" />
//                               )}
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             {favorites.includes(template.id) ? "Remove from favorites" : "Add to favorites"}
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>

//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-7 w-7"
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 copyToClipboard(template.id, template.content)
//                               }}
//                             >
//                               {copied === template.id ? (
//                                 <CheckCircle className="h-4 w-4 text-green-500" />
//                               ) : (
//                                 <Copy className="h-4 w-4" />
//                               )}
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>{copied === template.id ? "Copied!" : "Copy to clipboard"}</TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                     </div>
//                   </div>
//                   <p className="text-sm">{template.content}</p>
//                   <div className="flex items-center justify-between mt-2 text-xs text-text-secondary">
//                     <div className="flex items-center gap-1">
//                       <Zap className="h-3 w-3 text-purple-400" />
//                       <span>Dynamic response</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <TrendingUp className="h-3 w-3 text-purple-400" />
//                       <span>{template.popularity}% satisfaction</span>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))
//             ) : (
//               <div className="flex flex-col items-center justify-center py-8 text-center">
//                 <div className="p-4 rounded-full bg-background-80 mb-4">
//                   <Search className="h-6 w-6 text-text-secondary" />
//                 </div>
//                 <p className="text-white font-medium">No AI templates found</p>
//                 <p className="text-sm text-text-secondary mt-1 max-w-xs">
//                   Try adjusting your search or category filters
//                 </p>
//               </div>
//             )}
//           </div>
//         </TabsContent>
//       </Tabs>

//       {/* Debug info - can be removed in production */}
//       <div className="mt-2 text-xs text-text-secondary">
//         Showing {filteredTemplates.length} {activeTab} templates
//       </div>

//       {/* Custom template creator */}
//       <AnimatePresence>
//         {isEditing ? (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="mt-4 bg-background-90 p-4 rounded-lg border border-[#768BDD]/30"
//           >
//             <div className="flex items-center justify-between mb-3">
//               <h4 className="font-medium flex items-center gap-2">
//                 <Edit className="h-4 w-4 text-[#768BDD]" />
//                 {editingTemplate ? "Edit Template" : "Create Custom Template"}
//               </h4>
//               <Badge variant="outline" className="bg-background-80/50 text-xs">
//                 {activeTab === "ai" ? "AI Template" : "Standard Template"}
//               </Badge>
//             </div>
//             <div className="space-y-3">
//               <textarea
//                 value={customTemplate}
//                 onChange={(e) => setCustomTemplate(e.target.value)}
//                 placeholder="Enter your custom template text..."
//                 className="w-full h-24 bg-background-80 border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-[#768BDD] resize-none"
//               />
//               <div className="flex items-center gap-2">
//                 <Button
//                   onClick={handleCustomTemplateSubmit}
//                   disabled={!customTemplate.trim()}
//                   className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] text-white"
//                 >
//                   {editingTemplate ? "Update Template" : "Create Template"}
//                 </Button>
//                 <Button variant="outline" onClick={cancelEditing}>
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           </motion.div>
//         ) : (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
//             <Button
//               variant="outline"
//               onClick={() => setIsEditing(true)}
//               className="w-full flex items-center justify-center gap-2"
//             >
//               <Plus className="h-4 w-4" />
//               Create Custom Template
//             </Button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// export default ResponseLibrary

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageSquare,
  Sparkles,
  Star,
  StarOff,
  Copy,
  CheckCircle,
  Search,
  Tag,
  Clock,
  TrendingUp,
  Heart,
  Zap,
  Edit,
  Plus,
  Lock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"

type Template = {
  id: string
  content: string
  category: string
  isAI: boolean
  popularity: number
  isNew?: boolean
  isFavorite?: boolean
}

type Props = {
  isAI: boolean
  onSelectTemplate: (template: string) => void
  selectedTemplate?: string
  userSubscription?: "SMARTAI" | "MESSAGE" // Add subscription prop
}

const ResponseLibrary = ({ isAI, onSelectTemplate, selectedTemplate, userSubscription = "MESSAGE" }: Props) => {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [favorites, setFavorites] = useState<string[]>([])
  const [copied, setCopied] = useState<string | null>(null)
  const [customTemplate, setCustomTemplate] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)
  const [activeTab, setActiveTab] = useState<string>(isAI && userSubscription === "SMARTAI" ? "ai" : "standard")
  const [showUpgradeMessage, setShowUpgradeMessage] = useState(false)

  // Standard templates
  const standardTemplates: Template[] = [
    {
      id: "s1",
      content: "Thank you for your comment! We appreciate your feedback.",
      category: "general",
      isAI: false,
      popularity: 95,
    },
    {
      id: "s2",
      content: "Thanks for reaching out! We'll get back to you shortly.",
      category: "general",
      isAI: false,
      popularity: 87,
    },
    {
      id: "s3",
      content: "Great question! The answer is...",
      category: "questions",
      isAI: false,
      popularity: 76,
      isNew: true,
    },
    {
      id: "s4",
      content: "We're sorry to hear about your experience. Please DM us so we can resolve this issue.",
      category: "support",
      isAI: false,
      popularity: 92,
    },
    {
      id: "s5",
      content: "Thanks for your interest! Our product is available at [link].",
      category: "sales",
      isAI: false,
      popularity: 84,
    },
    {
      id: "s6",
      content: "We're excited to announce that we'll be launching soon! Stay tuned for updates.",
      category: "announcements",
      isAI: false,
      popularity: 79,
    },
    {
      id: "s7",
      content: "Congratulations on your purchase! Here's what happens next...",
      category: "sales",
      isAI: false,
      popularity: 88,
    },
    {
      id: "s8",
      content: "We value your feedback! Please let us know if you have any other suggestions.",
      category: "general",
      isAI: false,
      popularity: 81,
    },
  ]

  // AI templates
  const aiTemplates: Template[] = [
    {
      id: "a1",
      content: "{AI will analyze the comment sentiment and respond appropriately}",
      category: "smart",
      isAI: true,
      popularity: 98,
      isNew: true,
    },
    {
      id: "a2",
      content: "{AI will answer product questions based on your product catalog}",
      category: "product",
      isAI: true,
      popularity: 94,
    },
    {
      id: "a3",
      content: "{AI will provide personalized recommendations based on user history}",
      category: "recommendations",
      isAI: true,
      popularity: 91,
    },
    {
      id: "a4",
      content: "{AI will handle support inquiries and suggest solutions}",
      category: "support",
      isAI: true,
      popularity: 89,
    },
    {
      id: "a5",
      content: "{AI will engage with user comments using your brand voice}",
      category: "engagement",
      isAI: true,
      popularity: 86,
      isNew: true,
    },
    {
      id: "a6",
      content: "{AI will detect and respond to frequently asked questions}",
      category: "smart",
      isAI: true,
      popularity: 93,
    },
  ]

  // Combined templates based on active tab
  const templates = activeTab === "ai" ? aiTemplates : standardTemplates

  // Filter templates based on search and category
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "all" || template.category === activeCategory
    const matchesFavorites = activeCategory === "favorites" ? favorites.includes(template.id) : true
    return matchesSearch && matchesCategory && matchesFavorites
  })

  // Get unique categories
  const categories = ["all", "favorites", ...Array.from(new Set(templates.map((t) => t.category)))]

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))

    toast({
      title: favorites.includes(id) ? "Removed from favorites" : "Added to favorites",
      description: favorites.includes(id)
        ? "Template removed from your favorites"
        : "Template added to your favorites for quick access",
      duration: 2000,
    })
  }

  // Copy template to clipboard
  const copyToClipboard = (id: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)

    toast({
      title: "Copied to clipboard",
      description: "Template copied to clipboard",
      duration: 2000,
    })
  }

  // Handle template selection
  const handleSelectTemplate = (template: Template) => {
    // Check subscription for AI templates
    if (template.isAI && userSubscription !== "SMARTAI") {
      setShowUpgradeMessage(true)
      setTimeout(() => setShowUpgradeMessage(false), 3000)

      toast({
        title: "Pro Feature",
        description: "Upgrade to PRO to use AI-powered templates",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    onSelectTemplate(template.content)

    toast({
      title: "Template selected",
      description: template.isAI
        ? "AI template will be used to generate responses"
        : "Template will be used for all responses",
      duration: 2000,
    })
  }

  // Handle custom template submission
  const handleCustomTemplateSubmit = () => {
    if (customTemplate.trim()) {
      if (editingTemplate) {
        // Update existing template logic would go here
        // For now, just select the custom template
        onSelectTemplate(customTemplate)
        setIsEditing(false)
        setEditingTemplate(null)

        toast({
          title: "Template updated",
          description: "Your custom template has been updated",
          duration: 2000,
        })
      } else {
        // Add new template logic would go here
        // For now, just select the custom template
        onSelectTemplate(customTemplate)

        toast({
          title: "Custom template created",
          description: "Your custom template is now ready to use",
          duration: 2000,
        })
      }
      setCustomTemplate("")
    }
  }

  // Start editing a template
  const startEditing = (template: Template) => {
    // Check subscription for AI templates
    if (template.isAI && userSubscription !== "SMARTAI") {
      setShowUpgradeMessage(true)
      setTimeout(() => setShowUpgradeMessage(false), 3000)

      toast({
        title: "Pro Feature",
        description: "Upgrade to PRO to edit AI-powered templates",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    setIsEditing(true)
    setEditingTemplate(template)
    setCustomTemplate(template.content)
  }

  // Cancel editing
  const cancelEditing = () => {
    setIsEditing(false)
    setEditingTemplate(null)
    setCustomTemplate("")
  }

  // Handle tab change with subscription check
  const handleTabChange = (value: string) => {
    if (value === "ai" && userSubscription !== "SMARTAI") {
      setShowUpgradeMessage(true)
      setTimeout(() => setShowUpgradeMessage(false), 3000)

      toast({
        title: "Pro Feature",
        description: "Upgrade to PRO to access AI-powered templates",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    setActiveTab(value)
  }

  // Update active tab when isAI prop changes
  useEffect(() => {
    if (isAI && userSubscription === "SMARTAI") {
      setActiveTab("ai")
    } else {
      setActiveTab("standard")
    }
  }, [isAI, userSubscription])

  return (
    <div className="bg-background-80 rounded-xl p-4 w-full">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-[#768BDD]" />
            Response Templates
          </h3>
          <TabsList>
            <TabsTrigger value="standard" className="text-sm">
              Standard
            </TabsTrigger>

            {userSubscription === "SMARTAI" ? (
              <TabsTrigger value="ai" className="text-sm">
                <Sparkles className="h-3.5 w-3.5 mr-1.5 text-purple-400" />
                AI-Powered
              </TabsTrigger>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative inline-flex">
                      <TabsTrigger value="ai" className="text-sm opacity-70 cursor-not-allowed" disabled>
                        <Sparkles className="h-3.5 w-3.5 mr-1.5 text-purple-400" />
                        AI-Powered
                      </TabsTrigger>
                      <div className="absolute -top-1 -right-1">
                        <Lock className="h-3 w-3 text-purple-400" />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-purple-900/90 border-purple-700 text-white">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-purple-400" />
                      <span>Upgrade to PRO to access AI-powered templates</span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </TabsList>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-background-90 border-none"
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "border-background-90 bg-background-90 capitalize whitespace-nowrap",
                activeCategory === category && "border-[#768BDD] text-[#768BDD]",
              )}
            >
              {category === "all" ? (
                <>All</>
              ) : category === "favorites" ? (
                <>
                  <Star className="h-3.5 w-3.5 mr-1.5 text-yellow-400" />
                  Favorites
                </>
              ) : (
                <>
                  <Tag className="h-3.5 w-3.5 mr-1.5" />
                  {category}
                </>
              )}
            </Button>
          ))}
        </div>

        <TabsContent value="standard" className="mt-0">
          <div className="space-y-3 staggeredFadeIn">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  className={cn(
                    "bg-background-90 p-3 rounded-lg border border-transparent transition-all cursor-pointer group",
                    selectedTemplate === template.content && "border-[#768BDD] shadow-md",
                  )}
                  onClick={() => handleSelectTemplate(template)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {template.isNew && <Badge className="bg-green-600 text-xs">New</Badge>}
                      {template.popularity > 90 && (
                        <Badge className="bg-[#768BDD] text-xs flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Popular
                        </Badge>
                      )}
                      <Badge variant="outline" className="bg-background-80/50 text-xs capitalize">
                        {template.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(template.id)
                              }}
                            >
                              {favorites.includes(template.id) ? (
                                <Star className="h-4 w-4 text-yellow-400" />
                              ) : (
                                <StarOff className="h-4 w-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {favorites.includes(template.id) ? "Remove from favorites" : "Add to favorites"}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={(e) => {
                                e.stopPropagation()
                                copyToClipboard(template.id, template.content)
                              }}
                            >
                              {copied === template.id ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{copied === template.id ? "Copied!" : "Copy to clipboard"}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={(e) => {
                                e.stopPropagation()
                                startEditing(template)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit template</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <p className="text-sm">{template.content}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-text-secondary">
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      <span>{template.popularity}% effective</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>~2s response time</span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="p-4 rounded-full bg-background-80 mb-4">
                  <Search className="h-6 w-6 text-text-secondary" />
                </div>
                <p className="text-white font-medium">No templates found</p>
                <p className="text-sm text-text-secondary mt-1 max-w-xs">
                  Try adjusting your search or category filters
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="ai" className="mt-0">
          {userSubscription === "SMARTAI" ? (
            <>
              <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-4 rounded-lg mb-4 border border-purple-500/20">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-900/30 rounded-lg">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-300 flex items-center gap-2">
                      AI-Powered Templates
                      <Badge className="bg-purple-600 text-xs">Premium</Badge>
                    </h4>
                    <p className="text-sm text-text-secondary mt-1">
                      These templates use AI to generate dynamic, personalized responses based on the context of each
                      interaction.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 staggeredFadeIn">
                {filteredTemplates.length > 0 ? (
                  filteredTemplates.map((template) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.01 }}
                      className={cn(
                        "bg-background-90 p-3 rounded-lg border border-transparent transition-all cursor-pointer group",
                        selectedTemplate === template.content && "border-purple-500 shadow-md",
                      )}
                      onClick={() => handleSelectTemplate(template)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {template.isNew && <Badge className="bg-green-600 text-xs">New</Badge>}
                          <Badge className="bg-purple-600 text-xs flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            AI
                          </Badge>
                          <Badge variant="outline" className="bg-background-80/50 text-xs capitalize">
                            {template.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleFavorite(template.id)
                                  }}
                                >
                                  {favorites.includes(template.id) ? (
                                    <Star className="h-4 w-4 text-yellow-400" />
                                  ) : (
                                    <StarOff className="h-4 w-4" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                {favorites.includes(template.id) ? "Remove from favorites" : "Add to favorites"}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    copyToClipboard(template.id, template.content)
                                  }}
                                >
                                  {copied === template.id ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                {copied === template.id ? "Copied!" : "Copy to clipboard"}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      <p className="text-sm">{template.content}</p>
                      <div className="flex items-center justify-between mt-2 text-xs text-text-secondary">
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3 text-purple-400" />
                          <span>Dynamic response</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3 text-purple-400" />
                          <span>{template.popularity}% satisfaction</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="p-4 rounded-full bg-background-80 mb-4">
                      <Search className="h-6 w-6 text-text-secondary" />
                    </div>
                    <p className="text-white font-medium">No AI templates found</p>
                    <p className="text-sm text-text-secondary mt-1 max-w-xs">
                      Try adjusting your search or category filters
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6 rounded-lg border border-purple-500/20 text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="p-3 bg-purple-900/30 rounded-full mb-4">
                  <Lock className="h-6 w-6 text-purple-400" />
                </div>
                <h4 className="font-medium text-purple-300 text-lg mb-2">Pro Feature</h4>
                <p className="text-sm text-text-secondary mb-4 max-w-md">
                  Upgrade to PRO to access AI-powered templates and create dynamic, personalized responses.
                </p>
                <Button className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white">Upgrade to PRO</Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Custom template creator */}
      <AnimatePresence>
        {isEditing ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-background-90 p-4 rounded-lg border border-[#768BDD]/30"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium flex items-center gap-2">
                <Edit className="h-4 w-4 text-[#768BDD]" />
                {editingTemplate ? "Edit Template" : "Create Custom Template"}
              </h4>
              <Badge variant="outline" className="bg-background-80/50 text-xs">
                {activeTab === "ai" ? "AI Template" : "Standard Template"}
              </Badge>
            </div>
            <div className="space-y-3">
              <textarea
                value={customTemplate}
                onChange={(e) => setCustomTemplate(e.target.value)}
                placeholder="Enter your custom template text..."
                className="w-full h-24 bg-background-80 border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-[#768BDD] resize-none"
              />
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleCustomTemplateSubmit}
                  disabled={!customTemplate.trim()}
                  className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] text-white"
                >
                  {editingTemplate ? "Update Template" : "Create Template"}
                </Button>
                <Button variant="outline" onClick={cancelEditing}>
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="w-full flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Custom Template
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upgrade Modal Overlay */}
      <AnimatePresence>
        {showUpgradeMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-purple-900/90 text-white px-6 py-4 rounded-lg shadow-lg border border-purple-700 pointer-events-auto">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-800 rounded-full">
                  <Lock className="h-5 w-5 text-purple-300" />
                </div>
                <div>
                  <h4 className="font-medium">Pro Feature</h4>
                  <p className="text-sm text-purple-200">Upgrade to PRO to use AI-powered templates</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ResponseLibrary

