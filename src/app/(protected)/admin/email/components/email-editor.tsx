"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
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
  Type,
} from "lucide-react"

export function Editor({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const [iframeRef, setIframeRef] = useState<HTMLIFrameElement | null>(null)

  useEffect(() => {
    if (!iframeRef) return

    const doc = iframeRef.contentDocument
    if (!doc) return

    // Set up the editor
    doc.designMode = "on"
    doc.body.innerHTML = value
    doc.body.style.margin = "0"
    doc.body.style.padding = "1rem"
    doc.body.style.fontFamily = "Arial, sans-serif"
    doc.body.style.fontSize = "14px"
    doc.body.style.lineHeight = "1.6"
    doc.body.style.color = "#333"

    // Handle input events
    const handleInput = () => {
      onChange(doc.body.innerHTML)
    }

    doc.addEventListener("input", handleInput)

    return () => {
      doc.removeEventListener("input", handleInput)
    }
  }, [iframeRef, value, onChange])

  const execCommand = (command: string, value?: string) => {
    if (!iframeRef) return

    const doc = iframeRef.contentDocument
    if (!doc) return

    doc.execCommand(command, false, value)
    onChange(doc.body.innerHTML)
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-muted p-2 flex flex-wrap gap-1 border-b">
        <Button type="button" variant="ghost" size="icon" onClick={() => execCommand("bold")} title="Bold">
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={() => execCommand("italic")} title="Italic">
          <Italic className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={() => execCommand("underline")} title="Underline">
          <Underline className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <Button type="button" variant="ghost" size="icon" onClick={() => execCommand("justifyLeft")} title="Align Left">
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => execCommand("justifyCenter")}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => execCommand("justifyRight")}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => execCommand("insertUnorderedList")}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => execCommand("insertOrderedList")}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => {
            const url = prompt("Enter URL:")
            if (url) execCommand("createLink", url)
          }}
          title="Insert Link"
        >
          <Link className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => {
            const url = prompt("Enter image URL:")
            if (url) execCommand("insertImage", url)
          }}
          title="Insert Image"
        >
          <Image className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => {
            const size = prompt("Enter heading size (1-6):")
            if (size && ["1", "2", "3", "4", "5", "6"].includes(size)) {
              execCommand("formatBlock", `<h${size}>`)
            }
          }}
          title="Heading"
        >
          <Type className="h-4 w-4" />
        </Button>
      </div>
      <iframe ref={setIframeRef} className="w-full min-h-[400px] bg-white" title="Email Editor" />
    </div>
  )
}

