// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import {
//   Bold,
//   Italic,
//   Underline,
//   AlignLeft,
//   AlignCenter,
//   AlignRight,
//   List,
//   ListOrdered,
//   Link,
//   Image,
//   Type,
// } from "lucide-react"

// export function Editor({
//   value,
//   onChange,
// }: {
//   value: string
//   onChange: (value: string) => void
// }) {
//   const [iframeRef, setIframeRef] = useState<HTMLIFrameElement | null>(null)

//   useEffect(() => {
//     if (!iframeRef) return

//     const doc = iframeRef.contentDocument
//     if (!doc) return

//     // Set up the editor
//     doc.designMode = "on"
//     doc.body.innerHTML = value
//     doc.body.style.margin = "0"
//     doc.body.style.padding = "1rem"
//     doc.body.style.fontFamily = "Arial, sans-serif"
//     doc.body.style.fontSize = "14px"
//     doc.body.style.lineHeight = "1.6"
//     doc.body.style.color = "#333"

//     // Handle input events
//     const handleInput = () => {
//       onChange(doc.body.innerHTML)
//     }

//     doc.addEventListener("input", handleInput)

//     return () => {
//       doc.removeEventListener("input", handleInput)
//     }
//   }, [iframeRef, value, onChange])

//   const execCommand = (command: string, value?: string) => {
//     if (!iframeRef) return

//     const doc = iframeRef.contentDocument
//     if (!doc) return

//     doc.execCommand(command, false, value)
//     onChange(doc.body.innerHTML)
//   }

//   return (
//     <div className="border rounded-md overflow-hidden">
//       <div className="bg-muted p-2 flex flex-wrap gap-1 border-b">
//         <Button type="button" variant="ghost" size="icon" onClick={() => execCommand("bold")} title="Bold">
//           <Bold className="h-4 w-4" />
//         </Button>
//         <Button type="button" variant="ghost" size="icon" onClick={() => execCommand("italic")} title="Italic">
//           <Italic className="h-4 w-4" />
//         </Button>
//         <Button type="button" variant="ghost" size="icon" onClick={() => execCommand("underline")} title="Underline">
//           <Underline className="h-4 w-4" />
//         </Button>
//         <div className="w-px h-6 bg-border mx-1" />
//         <Button type="button" variant="ghost" size="icon" onClick={() => execCommand("justifyLeft")} title="Align Left">
//           <AlignLeft className="h-4 w-4" />
//         </Button>
//         <Button
//           type="button"
//           variant="ghost"
//           size="icon"
//           onClick={() => execCommand("justifyCenter")}
//           title="Align Center"
//         >
//           <AlignCenter className="h-4 w-4" />
//         </Button>
//         <Button
//           type="button"
//           variant="ghost"
//           size="icon"
//           onClick={() => execCommand("justifyRight")}
//           title="Align Right"
//         >
//           <AlignRight className="h-4 w-4" />
//         </Button>
//         <div className="w-px h-6 bg-border mx-1" />
//         <Button
//           type="button"
//           variant="ghost"
//           size="icon"
//           onClick={() => execCommand("insertUnorderedList")}
//           title="Bullet List"
//         >
//           <List className="h-4 w-4" />
//         </Button>
//         <Button
//           type="button"
//           variant="ghost"
//           size="icon"
//           onClick={() => execCommand("insertOrderedList")}
//           title="Numbered List"
//         >
//           <ListOrdered className="h-4 w-4" />
//         </Button>
//         <div className="w-px h-6 bg-border mx-1" />
//         <Button
//           type="button"
//           variant="ghost"
//           size="icon"
//           onClick={() => {
//             const url = prompt("Enter URL:")
//             if (url) execCommand("createLink", url)
//           }}
//           title="Insert Link"
//         >
//           <Link className="h-4 w-4" />
//         </Button>
//         <Button
//           type="button"
//           variant="ghost"
//           size="icon"
//           onClick={() => {
//             const url = prompt("Enter image URL:")
//             if (url) execCommand("insertImage", url)
//           }}
//           title="Insert Image"
//         >
//           <Image className="h-4 w-4" />
//         </Button>
//         <div className="w-px h-6 bg-border mx-1" />
//         <Button
//           type="button"
//           variant="ghost"
//           size="icon"
//           onClick={() => {
//             const size = prompt("Enter heading size (1-6):")
//             if (size && ["1", "2", "3", "4", "5", "6"].includes(size)) {
//               execCommand("formatBlock", `<h${size}>`)
//             }
//           }}
//           title="Heading"
//         >
//           <Type className="h-4 w-4" />
//         </Button>
//       </div>
//       <iframe ref={setIframeRef} className="w-full min-h-[400px] bg-white" title="Email Editor" />
//     </div>
//   )
// }

// "use client"

// import type React from "react"

// import { useState, useEffect, useRef } from "react"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   Bold,
//   Italic,
//   Underline,
//   AlignLeft,
//   AlignCenter,
//   AlignRight,
//   List,
//   ListOrdered,
//   Link,
//   Image,
//   Heading1,
//   Heading2,
//   Heading3,
//   NotepadTextIcon as Paragraph,
// } from "lucide-react"

// interface EditorProps {
//   value: string
//   onChange: (value: string) => void
// }

// export function Editor({ value, onChange }: EditorProps) {
//   const editorRef = useRef<HTMLDivElement>(null)
//   const [activeTab, setActiveTab] = useState("visual")
//   const [htmlValue, setHtmlValue] = useState(value)

//   useEffect(() => {
//     if (editorRef.current) {
//       editorRef.current.innerHTML = value
//     }
//   }, [value])

//   const handleContentChange = () => {
//     if (editorRef.current) {
//       const newValue = editorRef.current.innerHTML
//       onChange(newValue)
//       setHtmlValue(newValue)
//     }
//   }

//   const execCommand = (command: string, value?: string) => {
//     document.execCommand(command, false, value)
//     handleContentChange()
//   }

//   const handleTabChange = (tab: string) => {
//     setActiveTab(tab)
//     if (tab === "visual" && editorRef.current) {
//       editorRef.current.innerHTML = htmlValue
//     }
//   }

//   const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setHtmlValue(e.target.value)
//     onChange(e.target.value)
//   }

//   return (
//     <div className="border rounded-md overflow-hidden">
//       <Tabs value={activeTab} onValueChange={handleTabChange}>
//         <div className="bg-muted p-2 border-b">
//           <TabsList>
//             <TabsTrigger value="visual">Visual</TabsTrigger>
//             <TabsTrigger value="html">HTML</TabsTrigger>
//           </TabsList>
//         </div>

//         <TabsContent value="visual" className="p-0">
//           <div className="bg-muted p-2 border-b flex flex-wrap gap-1">
//             <Button variant="ghost" size="icon" onClick={() => execCommand("bold")} className="h-8 w-8">
//               <Bold className="h-4 w-4" />
//             </Button>
//             <Button variant="ghost" size="icon" onClick={() => execCommand("italic")} className="h-8 w-8">
//               <Italic className="h-4 w-4" />
//             </Button>
//             <Button variant="ghost" size="icon" onClick={() => execCommand("underline")} className="h-8 w-8">
//               <Underline className="h-4 w-4" />
//             </Button>
//             <div className="w-px h-8 bg-border mx-1"></div>
//             <Button variant="ghost" size="icon" onClick={() => execCommand("justifyLeft")} className="h-8 w-8">
//               <AlignLeft className="h-4 w-4" />
//             </Button>
//             <Button variant="ghost" size="icon" onClick={() => execCommand("justifyCenter")} className="h-8 w-8">
//               <AlignCenter className="h-4 w-4" />
//             </Button>
//             <Button variant="ghost" size="icon" onClick={() => execCommand("justifyRight")} className="h-8 w-8">
//               <AlignRight className="h-4 w-4" />
//             </Button>
//             <div className="w-px h-8 bg-border mx-1"></div>
//             <Button variant="ghost" size="icon" onClick={() => execCommand("insertUnorderedList")} className="h-8 w-8">
//               <List className="h-4 w-4" />
//             </Button>
//             <Button variant="ghost" size="icon" onClick={() => execCommand("insertOrderedList")} className="h-8 w-8">
//               <ListOrdered className="h-4 w-4" />
//             </Button>
//             <div className="w-px h-8 bg-border mx-1"></div>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => {
//                 const url = prompt("Enter URL:")
//                 if (url) execCommand("createLink", url)
//               }}
//               className="h-8 w-8"
//             >
//               <Link className="h-4 w-4" />
//             </Button>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => {
//                 const url = prompt("Enter image URL:")
//                 if (url) execCommand("insertImage", url)
//               }}
//               className="h-8 w-8"
//             >
//               <Image className="h-4 w-4" />
//             </Button>
//             <div className="w-px h-8 bg-border mx-1"></div>
//             <Button variant="ghost" size="icon" onClick={() => execCommand("formatBlock", "<h1>")} className="h-8 w-8">
//               <Heading1 className="h-4 w-4" />
//             </Button>
//             <Button variant="ghost" size="icon" onClick={() => execCommand("formatBlock", "<h2>")} className="h-8 w-8">
//               <Heading2 className="h-4 w-4" />
//             </Button>
//             <Button variant="ghost" size="icon" onClick={() => execCommand("formatBlock", "<h3>")} className="h-8 w-8">
//               <Heading3 className="h-4 w-4" />
//             </Button>
//             <Button variant="ghost" size="icon" onClick={() => execCommand("formatBlock", "<p>")} className="h-8 w-8">
//               <Paragraph className="h-4 w-4" />
//             </Button>
//           </div>
//           <div
//             ref={editorRef}
//             contentEditable
//             className="min-h-[400px] p-4 focus:outline-none"
//             onInput={handleContentChange}
//             onBlur={handleContentChange}
//           />
//         </TabsContent>

//         <TabsContent value="html" className="p-0">
//           <textarea
//             className="min-h-[400px] w-full p-4 font-mono text-sm focus:outline-none"
//             value={htmlValue}
//             onChange={handleHtmlChange}
//           />
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Image,
  Heading1,
  Heading2,
  Heading3,
  NotepadTextIcon as Paragraph,
} from "lucide-react"

interface EditorProps {
  value: string
  onChange: (value: string) => void
}

export function Editor({ value, onChange }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("visual")
  const [htmlValue, setHtmlValue] = useState(value)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const handleContentChange = () => {
    if (editorRef.current) {
      const newValue = editorRef.current.innerHTML
      onChange(newValue)
      setHtmlValue(newValue)
    }
  }

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    handleContentChange()
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === "visual" && editorRef.current) {
      editorRef.current.innerHTML = htmlValue
    }
  }

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtmlValue(e.target.value)
    onChange(e.target.value)
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <div className="bg-muted p-2 border-b">
          <TabsList>
            <TabsTrigger value="visual">Visual</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="visual" className="p-0">
          <div className="bg-muted p-2 border-b flex flex-wrap gap-1">
            <Button variant="ghost" size="icon" onClick={() => execCommand("bold")} className="h-8 w-8">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => execCommand("italic")} className="h-8 w-8">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => execCommand("underline")} className="h-8 w-8">
              <Underline className="h-4 w-4" />
            </Button>
            <div className="w-px h-8 bg-border mx-1"></div>
            <Button variant="ghost" size="icon" onClick={() => execCommand("justifyLeft")} className="h-8 w-8">
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => execCommand("justifyCenter")} className="h-8 w-8">
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => execCommand("justifyRight")} className="h-8 w-8">
              <AlignRight className="h-4 w-4" />
            </Button>
            <div className="w-px h-8 bg-border mx-1"></div>
            <Button variant="ghost" size="icon" onClick={() => execCommand("insertUnorderedList")} className="h-8 w-8">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => execCommand("insertOrderedList")} className="h-8 w-8">
              <ListOrdered className="h-4 w-4" />
            </Button>
            <div className="w-px h-8 bg-border mx-1"></div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const url = prompt("Enter URL:")
                if (url) execCommand("createLink", url)
              }}
              className="h-8 w-8"
            >
              <Link className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const url = prompt("Enter image URL:")
                if (url) execCommand("insertImage", url)
              }}
              className="h-8 w-8"
            >
              <Image className="h-4 w-4" />
            </Button>
            <div className="w-px h-8 bg-border mx-1"></div>
            <Button variant="ghost" size="icon" onClick={() => execCommand("formatBlock", "<h1>")} className="h-8 w-8">
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => execCommand("formatBlock", "<h2>")} className="h-8 w-8">
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => execCommand("formatBlock", "<h3>")} className="h-8 w-8">
              <Heading3 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => execCommand("formatBlock", "<p>")} className="h-8 w-8">
              <Paragraph className="h-4 w-4" />
            </Button>
          </div>
          <div
            ref={editorRef}
            contentEditable
            className="min-h-[400px] p-4 focus:outline-none"
            onInput={handleContentChange}
            onBlur={handleContentChange}
          />
        </TabsContent>

        <TabsContent value="html" className="p-0">
          <textarea
            className="min-h-[400px] w-full p-4 font-mono text-sm focus:outline-none"
            value={htmlValue}
            onChange={handleHtmlChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

