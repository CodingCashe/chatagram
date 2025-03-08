// "use client"

// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageSquare, Edit2, Check, Copy, RefreshCw, Lightbulb, Save, BookOpen, CheckCheck } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Badge } from "@/components/ui/badge"
// import { cn } from "@/lib/utils"
// import ResponseLibrary from "../response-library"

// type TemplateEditorProps = {
//   initialTemplate?: string
//   keywords?: string[]
//   onSave?: (template: string) => void
//   isAI?: boolean
// }

// export const TemplateEditor = ({ initialTemplate = "", keywords = [], onSave, isAI = false }: TemplateEditorProps) => {
//   const [template, setTemplate] = useState(initialTemplate)
//   const [isEditing, setIsEditing] = useState(false)
//   const [showTips, setShowTips] = useState(true)
//   const [showLibrary, setShowLibrary] = useState(false)
//   const [copied, setCopied] = useState(false)
//   const [templateSaved, setTemplateSaved] = useState(false)

//   // Update template when initialTemplate changes
//   useEffect(() => {
//     if (initialTemplate && initialTemplate !== template) {
//       setTemplate(initialTemplate)
//     }
//   }, [initialTemplate, template])

//   const handleSave = () => {
//     if (onSave) {
//       onSave(template)
//     }
//     setIsEditing(false)
//     setTemplateSaved(true)

//     setTimeout(() => {
//       setTemplateSaved(false)
//     }, 2000)
//   }

//   const handleSelectTemplate = (content: string) => {
//     setTemplate(content)
//     setShowLibrary(false)
//     setIsEditing(true)
//   }

//   const copyTemplate = () => {
//     navigator.clipboard.writeText(template)
//     setCopied(true)
//     setTimeout(() => setCopied(false), 2000)
//   }

//   const tips = [
//     "Keep responses conversational and friendly",
//     "Include a call-to-action to encourage further interaction",
//     "Keep responses brief - around 2-3 sentences works best",
//     "Ask a question at the end to continue the conversation",
//   ]

//   const handleLibraryToggle = () => {
//     if (showLibrary) {
//       setShowLibrary(false)
//     } else {
//       setShowLibrary(true)
//     }
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h3 className="text-lg font-medium flex items-center">
//           <MessageSquare className="h-5 w-5 mr-2 text-light-blue" />
//           Response Template Editor
//         </h3>

//         <Button
//           variant="outline"
//           size="sm"
//           onClick={handleLibraryToggle}
//           className={cn("text-xs", showLibrary && "bg-light-blue/10 text-light-blue border-light-blue/30")}
//         >
//           <BookOpen className="h-4 w-4 mr-1" />
//           Template Library
//         </Button>
//       </div>

//       <AnimatePresence>
//         {showTips && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="bg-light-blue/10 border border-light-blue/20 p-4 rounded-xl overflow-hidden"
//           >
//             <div className="flex justify-between items-start">
//               <div className="flex items-start gap-3">
//                 <div className="bg-light-blue/20 p-2 rounded-full mt-1">
//                   <Lightbulb className="h-5 w-5 text-light-blue" />
//                 </div>
//                 <div>
//                   <h4 className="font-medium text-light-blue">Tips for Effective Responses</h4>
//                   <ul className="text-sm text-text-secondary mt-2 space-y-1 list-disc pl-5">
//                     {tips.map((tip, i) => (
//                       <li key={i}>{tip}</li>
//                     ))}
//                   </ul>
//                   <div className="flex flex-wrap gap-2 mt-3">
//                     <p className="text-sm text-light-blue">Your keywords:</p>
//                     {keywords.map((word, i) => (
//                       <Badge key={i} variant="outline" className="bg-light-blue/20 text-light-blue border-none">
//                         {word}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="text-text-secondary hover:text-white"
//                 onClick={() => setShowTips(false)}
//               >
//                 ✕
//               </Button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {showLibrary && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="overflow-hidden"
//           >
//             <div className="border border-background-80 rounded-xl p-4 bg-background-90">
//               <ResponseLibrary isAI={isAI} onSelectTemplate={handleSelectTemplate} selectedTemplate={template} />
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="bg-background-80 rounded-xl p-4 border border-background-90">
//         {isEditing ? (
//           <div className="space-y-3">
//             <div className="flex items-center justify-between">
//               <h4 className="text-sm font-medium">Edit Response Template</h4>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="text-xs text-text-secondary"
//                 onClick={() => setIsEditing(false)}
//               >
//                 Cancel
//               </Button>
//             </div>

//             <Textarea
//               value={template}
//               onChange={(e) => setTemplate(e.target.value)}
//               placeholder="Enter your response template here..."
//               className="min-h-[150px] bg-background-90 border-background-80"
//             />

//             <div className="flex justify-end gap-2">
//               <Button variant="outline" size="sm" onClick={() => setTemplate(initialTemplate)} className="text-xs">
//                 <RefreshCw className="h-3 w-3 mr-1" />
//                 Reset
//               </Button>

//               <Button size="sm" onClick={handleSave} className="text-xs bg-light-blue hover:bg-light-blue/90">
//                 <Save className="h-3 w-3 mr-1" />
//                 Save Changes
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-3">
//             <div className="flex items-center justify-between">
//               <h4 className="text-sm font-medium">Response Template</h4>
//               <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="text-xs">
//                 <Edit2 className="h-3 w-3 mr-1" />
//                 Edit
//               </Button>
//             </div>

//             <div className="min-h-[120px] p-3 rounded-lg bg-background-90 relative">
//               <div className="whitespace-pre-wrap">{template || "No template set. Click Edit to create one."}</div>

//               <AnimatePresence>
//                 {templateSaved && (
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.8 }}
//                     className="absolute top-2 right-2 bg-green-500/20 text-green-500 px-2 py-1 rounded-md text-xs flex items-center"
//                   >
//                     <Check className="h-3 w-3 mr-1" />
//                     Saved
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             <div className="flex justify-end">
//               <Button variant="ghost" size="sm" onClick={copyTemplate} className="text-xs" disabled={!template}>
//                 {copied ? (
//                   <>
//                     <CheckCheck className="h-3 w-3 mr-1 text-green-500" />
//                     Copied!
//                   </>
//                 ) : (
//                   <>
//                     <Copy className="h-3 w-3 mr-1" />
//                     Copy
//                   </>
//                 )}
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default TemplateEditor

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Edit2, Check, Copy, RefreshCw, Lightbulb, Save, BookOpen, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import ResponseLibrary from "../response"

type TemplateEditorProps = {
  initialTemplate?: string
  keywords?: string[]
  onSave?: (template: string) => void
  isAI?: boolean
}

export const TemplateEditor = ({ initialTemplate = "", keywords = [], onSave, isAI = false }: TemplateEditorProps) => {
  const [template, setTemplate] = useState(initialTemplate)
  const [isEditing, setIsEditing] = useState(false)
  const [showTips, setShowTips] = useState(true)
  const [showLibrary, setShowLibrary] = useState(false)
  const [copied, setCopied] = useState(false)
  const [templateSaved, setTemplateSaved] = useState(false)

  // Update template when initialTemplate changes
  useEffect(() => {
    if (initialTemplate && initialTemplate !== template) {
      setTemplate(initialTemplate)
    }
  }, [initialTemplate, template])

  const handleSave = () => {
    if (onSave) {
      onSave(template)
    }
    setIsEditing(false)
    setTemplateSaved(true)

    setTimeout(() => {
      setTemplateSaved(false)
    }, 2000)
  }

  const handleSelectTemplate = (content: string) => {
    setTemplate(content)
    setShowLibrary(false)
    setIsEditing(true)
  }

  const copyTemplate = () => {
    navigator.clipboard.writeText(template)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tips = [
    "Keep responses conversational and friendly",
    "Include a call-to-action to encourage further interaction",
    "Keep responses brief - around 2-3 sentences works best",
    "Ask a question at the end to continue the conversation",
  ]

  const handleLibraryToggle = () => {
    setShowLibrary(!showLibrary)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-light-blue" />
          Response Template Editor
        </h3>

        <Button
          variant="outline"
          size="sm"
          onClick={handleLibraryToggle}
          className={cn("text-xs", showLibrary && "bg-light-blue/10 text-light-blue border-light-blue/30")}
        >
          <BookOpen className="h-4 w-4 mr-1" />
          {showLibrary ? "Hide Library" : "Template Library"}
        </Button>
      </div>

      <AnimatePresence>
        {showTips && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-light-blue/10 border border-light-blue/20 p-4 rounded-xl overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="bg-light-blue/20 p-2 rounded-full mt-1">
                  <Lightbulb className="h-5 w-5 text-light-blue" />
                </div>
                <div>
                  <h4 className="font-medium text-light-blue">Tips for Effective Responses</h4>
                  <ul className="text-sm text-text-secondary mt-2 space-y-1 list-disc pl-5">
                    {tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <p className="text-sm text-light-blue">Your keywords:</p>
                    {keywords.map((word, i) => (
                      <Badge key={i} variant="outline" className="bg-light-blue/20 text-light-blue border-none">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-text-secondary hover:text-white"
                onClick={() => setShowTips(false)}
              >
                ✕
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLibrary && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="border border-background-80 rounded-xl p-4 bg-background-90">
              <ResponseLibrary isAI={isAI} onSelectTemplate={handleSelectTemplate} selectedTemplate={template} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-background-80 rounded-xl p-4 border border-background-90">
        {isEditing ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Edit Response Template</h4>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-text-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>

            <Textarea
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              placeholder="Enter your response template here..."
              className="min-h-[150px] bg-background-90 border-background-80"
            />

            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setTemplate(initialTemplate)} className="text-xs">
                <RefreshCw className="h-3 w-3 mr-1" />
                Reset
              </Button>

              <Button size="sm" onClick={handleSave} className="text-xs bg-light-blue hover:bg-light-blue/90">
                <Save className="h-3 w-3 mr-1" />
                Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Response Template</h4>
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="text-xs">
                <Edit2 className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </div>

            <div className="min-h-[120px] p-3 rounded-lg bg-background-90 relative">
              <div className="whitespace-pre-wrap">{template || "No template set. Click Edit to create one."}</div>

              <AnimatePresence>
                {templateSaved && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute top-2 right-2 bg-green-500/20 text-green-500 px-2 py-1 rounded-md text-xs flex items-center"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Saved
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex justify-end">
              <Button variant="ghost" size="sm" onClick={copyTemplate} className="text-xs" disabled={!template}>
                {copied ? (
                  <>
                    <CheckCheck className="h-3 w-3 mr-1 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TemplateEditor

