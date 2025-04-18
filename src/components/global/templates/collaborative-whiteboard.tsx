// "use client"

// import type React from "react"

// import { useEffect, useRef, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Slider } from "@/components/ui/slider"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { pusherClient } from "@/lib/pusher"
// import { toast } from "@/hooks/use-toast"
// import { Eraser, Pencil, Square, Circle, Type, Download, Trash2, Undo, Redo, Palette, Save } from "lucide-react"

// interface WhiteboardProps {
//   chatId: string
//   isOpen: boolean
//   onClose: () => void
// }

// type DrawingMode = "pencil" | "eraser" | "rectangle" | "circle" | "text"
// type DrawingAction = {
//   type: string
//   x: number
//   y: number
//   color?: string
//   width?: number
//   text?: string
//   endX?: number
//   endY?: number
// }

// export function CollaborativeWhiteboard({ chatId, isOpen, onClose }: WhiteboardProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const contextRef = useRef<CanvasRenderingContext2D | null>(null)
//   const [isDrawing, setIsDrawing] = useState(false)
//   const [color, setColor] = useState("#ffffff")
//   const [brushSize, setBrushSize] = useState(3)
//   const [mode, setMode] = useState<DrawingMode>("pencil")
//   const [startPos, setStartPos] = useState({ x: 0, y: 0 })
//   const [actions, setActions] = useState<DrawingAction[]>([])
//   const [redoStack, setRedoStack] = useState<DrawingAction[]>([])
//   const [textInput, setTextInput] = useState("")
//   const [textPosition, setTextPosition] = useState({ x: 0, y: 0 })
//   const [isAddingText, setIsAddingText] = useState(false)
//   const textInputRef = useRef<HTMLInputElement>(null)

//   // Initialize canvas
//   useEffect(() => {
//     if (!canvasRef.current) return

//     const canvas = canvasRef.current
//     canvas.width = canvas.offsetWidth * 2
//     canvas.height = canvas.offsetHeight * 2

//     const context = canvas.getContext("2d")
//     if (context) {
//       context.scale(2, 2) // For high DPI displays
//       context.lineCap = "round"
//       context.lineJoin = "round"
//       context.strokeStyle = color
//       context.lineWidth = brushSize
//       contextRef.current = context

//       // Fill with dark background
//       context.fillStyle = "#1a1a1a"
//       context.fillRect(0, 0, canvas.width, canvas.height)
//     }
//   }, [isOpen])

//   // Set up Pusher for real-time collaboration
//   useEffect(() => {
//     if (!chatId || !pusherClient || !isOpen) return

//     const channel = pusherClient.subscribe(`whiteboard-${chatId}`)

//     channel.bind("draw-action", (data: DrawingAction) => {
//       if (!contextRef.current) return

//       const ctx = contextRef.current

//       if (data.type === "pencil-move") {
//         ctx.strokeStyle = data.color || color
//         ctx.lineWidth = data.width || brushSize
//         ctx.lineTo(data.x, data.y)
//         ctx.stroke()
//       } else if (data.type === "pencil-start") {
//         ctx.strokeStyle = data.color || color
//         ctx.lineWidth = data.width || brushSize
//         ctx.beginPath()
//         ctx.moveTo(data.x, data.y)
//       } else if (data.type === "eraser-move") {
//         ctx.globalCompositeOperation = "destination-out"
//         ctx.lineTo(data.x, data.y)
//         ctx.stroke()
//         ctx.globalCompositeOperation = "source-over"
//       } else if (data.type === "eraser-start") {
//         ctx.globalCompositeOperation = "destination-out"
//         ctx.beginPath()
//         ctx.moveTo(data.x, data.y)
//       } else if (data.type === "rectangle") {
//         ctx.strokeStyle = data.color || color
//         ctx.lineWidth = data.width || brushSize
//         ctx.beginPath()
//         ctx.rect(data.x, data.y, data.endX! - data.x, data.endY! - data.y)
//         ctx.stroke()
//       } else if (data.type === "circle") {
//         ctx.strokeStyle = data.color || color
//         ctx.lineWidth = data.width || brushSize
//         ctx.beginPath()
//         const radius = Math.sqrt(Math.pow(data.endX! - data.x, 2) + Math.pow(data.endY! - data.y, 2))
//         ctx.arc(data.x, data.y, radius, 0, 2 * Math.PI)
//         ctx.stroke()
//       } else if (data.type === "text") {
//         ctx.fillStyle = data.color || color
//         ctx.font = `${data.width || 16}px sans-serif`
//         ctx.fillText(data.text || "", data.x, data.y)
//       } else if (data.type === "clear") {
//         ctx.fillStyle = "#1a1a1a"
//         ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height)
//       }

//       // Add to local actions
//       setActions((prev) => [...prev, data])
//     })

//     return () => {
//       pusherClient.unsubscribe(`whiteboard-${chatId}`)
//     }
//   }, [chatId, isOpen, color, brushSize])

//   // Drawing handlers
//   const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!contextRef.current || isAddingText) return

//     const canvas = canvasRef.current
//     if (!canvas) return

//     const rect = canvas.getBoundingClientRect()
//     const x = e.clientX - rect.left
//     const y = e.clientY - rect.top

//     if (mode === "text") {
//       setTextPosition({ x, y })
//       setIsAddingText(true)
//       setTimeout(() => {
//         textInputRef.current?.focus()
//       }, 100)
//       return
//     }

//     setIsDrawing(true)
//     setStartPos({ x, y })

//     const ctx = contextRef.current

//     if (mode === "pencil") {
//       ctx.strokeStyle = color
//       ctx.lineWidth = brushSize
//       ctx.beginPath()
//       ctx.moveTo(x, y)

//       // Send to Pusher
//       const action = {
//         type: "pencil-start",
//         x,
//         y,
//         color,
//         width: brushSize,
//       }
//       sendDrawAction(action)
//     } else if (mode === "eraser") {
//       ctx.globalCompositeOperation = "destination-out"
//       ctx.beginPath()
//       ctx.moveTo(x, y)

//       // Send to Pusher
//       const action = {
//         type: "eraser-start",
//         x,
//         y,
//         width: brushSize * 2, // Eraser is usually bigger
//       }
//       sendDrawAction(action)
//     }
//   }

//   const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!isDrawing || !contextRef.current || isAddingText) return

//     const canvas = canvasRef.current
//     if (!canvas) return

//     const rect = canvas.getBoundingClientRect()
//     const x = e.clientX - rect.left
//     const y = e.clientY - rect.top

//     const ctx = contextRef.current

//     if (mode === "pencil") {
//       ctx.lineTo(x, y)
//       ctx.stroke()

//       // Send to Pusher
//       const action = {
//         type: "pencil-move",
//         x,
//         y,
//         color,
//         width: brushSize,
//       }
//       sendDrawAction(action)
//     } else if (mode === "eraser") {
//       ctx.lineTo(x, y)
//       ctx.stroke()

//       // Send to Pusher
//       const action = {
//         type: "eraser-move",
//         x,
//         y,
//         width: brushSize * 2,
//       }
//       sendDrawAction(action)
//     }
//   }

//   const endDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!isDrawing || !contextRef.current) return

//     const canvas = canvasRef.current
//     if (!canvas) return

//     const rect = canvas.getBoundingClientRect()
//     const x = e.clientX - rect.left
//     const y = e.clientY - rect.top

//     const ctx = contextRef.current

//     if (mode === "rectangle") {
//       ctx.strokeStyle = color
//       ctx.lineWidth = brushSize
//       ctx.beginPath()
//       ctx.rect(startPos.x, startPos.y, x - startPos.x, y - startPos.y)
//       ctx.stroke()

//       // Send to Pusher
//       const action = {
//         type: "rectangle",
//         x: startPos.x,
//         y: startPos.y,
//         endX: x,
//         endY: y,
//         color,
//         width: brushSize,
//       }
//       sendDrawAction(action)
//       setActions((prev) => [...prev, action])
//     } else if (mode === "circle") {
//       ctx.strokeStyle = color
//       ctx.lineWidth = brushSize
//       ctx.beginPath()
//       const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2))
//       ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI)
//       ctx.stroke()

//       // Send to Pusher
//       const action = {
//         type: "circle",
//         x: startPos.x,
//         y: startPos.y,
//         endX: x,
//         endY: y,
//         color,
//         width: brushSize,
//       }
//       sendDrawAction(action)
//       setActions((prev) => [...prev, action])
//     } else if (mode === "eraser") {
//       ctx.globalCompositeOperation = "source-over"
//     }

//     setIsDrawing(false)
//     ctx.closePath()
//   }

//   const handleTextSubmit = () => {
//     if (!textInput.trim() || !contextRef.current) {
//       setIsAddingText(false)
//       return
//     }

//     const ctx = contextRef.current
//     ctx.fillStyle = color
//     ctx.font = `${brushSize * 5}px sans-serif`
//     ctx.fillText(textInput, textPosition.x, textPosition.y)

//     // Send to Pusher
//     const action = {
//       type: "text",
//       x: textPosition.x,
//       y: textPosition.y,
//       text: textInput,
//       color,
//       width: brushSize * 5,
//     }
//     sendDrawAction(action)
//     setActions((prev) => [...prev, action])

//     setTextInput("")
//     setIsAddingText(false)
//   }

//   const clearCanvas = () => {
//     if (!contextRef.current || !canvasRef.current) return

//     const ctx = contextRef.current
//     ctx.fillStyle = "#1a1a1a"
//     ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)

//     // Send to Pusher
//     const action = {
//       type: "clear",
//       x: 0,
//       y: 0,
//     }
//     sendDrawAction(action)

//     // Clear actions
//     setActions([])
//     setRedoStack([])

//     toast({
//       title: "Canvas Cleared",
//       description: "The whiteboard has been cleared",
//     })
//   }

//   const undoLastAction = () => {
//     if (actions.length === 0 || !contextRef.current || !canvasRef.current) return

//     // Pop the last action and add to redo stack
//     const lastAction = actions[actions.length - 1]
//     setRedoStack((prev) => [...prev, lastAction])
//     setActions((prev) => prev.slice(0, prev.length - 1))

//     // Redraw everything
//     redrawCanvas()

//     toast({
//       title: "Undo",
//       description: "Last action undone",
//     })
//   }

//   const redoLastAction = () => {
//     if (redoStack.length === 0 || !contextRef.current) return

//     // Pop the last redo action and add back to actions
//     const actionToRedo = redoStack[redoStack.length - 1]
//     setActions((prev) => [...prev, actionToRedo])
//     setRedoStack((prev) => prev.slice(0, prev.length - 1))

//     // Apply the action
//     applyAction(actionToRedo)

//     toast({
//       title: "Redo",
//       description: "Action redone",
//     })
//   }

//   const redrawCanvas = () => {
//     if (!contextRef.current || !canvasRef.current) return

//     const ctx = contextRef.current

//     // Clear canvas
//     ctx.fillStyle = "#1a1a1a"
//     ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)

//     // Redraw all actions except the last one
//     actions.forEach((action) => {
//       applyAction(action)
//     })
//   }

//   const applyAction = (action: DrawingAction) => {
//     if (!contextRef.current) return

//     const ctx = contextRef.current

//     if (action.type === "pencil-start") {
//       ctx.strokeStyle = action.color || color
//       ctx.lineWidth = action.width || brushSize
//       ctx.beginPath()
//       ctx.moveTo(action.x, action.y)
//     } else if (action.type === "pencil-move") {
//       ctx.strokeStyle = action.color || color
//       ctx.lineWidth = action.width || brushSize
//       ctx.lineTo(action.x, action.y)
//       ctx.stroke()
//     } else if (action.type === "eraser-start") {
//       ctx.globalCompositeOperation = "destination-out"
//       ctx.beginPath()
//       ctx.moveTo(action.x, action.y)
//     } else if (action.type === "eraser-move") {
//       ctx.globalCompositeOperation = "destination-out"
//       ctx.lineTo(action.x, action.y)
//       ctx.stroke()
//       ctx.globalCompositeOperation = "source-over"
//     } else if (action.type === "rectangle") {
//       ctx.strokeStyle = action.color || color
//       ctx.lineWidth = action.width || brushSize
//       ctx.beginPath()
//       ctx.rect(action.x, action.y, action.endX! - action.x, action.endY! - action.y)
//       ctx.stroke()
//     } else if (action.type === "circle") {
//       ctx.strokeStyle = action.color || color
//       ctx.lineWidth = action.width || brushSize
//       ctx.beginPath()
//       const radius = Math.sqrt(Math.pow(action.endX! - action.x, 2) + Math.pow(action.endY! - action.y, 2))
//       ctx.arc(action.x, action.y, radius, 0, 2 * Math.PI)
//       ctx.stroke()
//     } else if (action.type === "text") {
//       ctx.fillStyle = action.color || color
//       ctx.font = `${action.width || 16}px sans-serif`
//       ctx.fillText(action.text || "", action.x, action.y)
//     }
//   }

//   const sendDrawAction = async (action: DrawingAction) => {
//     try {
//       await fetch(`/api/whiteboard/${chatId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(action),
//       })
//     } catch (error) {
//       console.error("Error sending drawing action:", error)
//     }
//   }

//   const downloadCanvas = () => {
//     if (!canvasRef.current) return

//     const canvas = canvasRef.current
//     const dataUrl = canvas.toDataURL("image/png")

//     const a = document.createElement("a")
//     a.href = dataUrl
//     a.download = `whiteboard-${chatId}-${new Date().toISOString().slice(0, 10)}.png`
//     document.body.appendChild(a)
//     a.click()
//     document.body.removeChild(a)

//     toast({
//       title: "Download Complete",
//       description: "Whiteboard image has been downloaded",
//     })
//   }

//   const saveWhiteboard = async () => {
//     if (!canvasRef.current) return

//     const canvas = canvasRef.current
//     const dataUrl = canvas.toDataURL("image/png")

//     try {
//       const response = await fetch(`/api/whiteboard/${chatId}/save`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           imageData: dataUrl,
//           actions: actions,
//         }),
//       })

//       if (response.ok) {
//         toast({
//           title: "Whiteboard Saved",
//           description: "Your whiteboard has been saved to the chat",
//           variant: "success",
//         })
//       } else {
//         throw new Error("Failed to save whiteboard")
//       }
//     } catch (error) {
//       console.error("Error saving whiteboard:", error)
//       toast({
//         title: "Error",
//         description: "Failed to save whiteboard",
//         variant: "destructive",
//       })
//     }
//   }

//   const colorOptions = [
//     "#ffffff", // white
//     "#ff5555", // red
//     "#5af78e", // green
//     "#57c7ff", // blue
//     "#f1fa8c", // yellow
//     "#bd93f9", // purple
//     "#ff79c6", // pink
//     "#8be9fd", // cyan
//     "#ffb86c", // orange
//   ]

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-5xl w-full h-[80vh] p-0 bg-gray-900 border-gray-700">
//         <DialogHeader className="p-4 border-b border-gray-800">
//           <DialogTitle className="text-white">Collaborative Whiteboard</DialogTitle>
//         </DialogHeader>

//         <div className="flex flex-col h-full">
//           {/* Toolbar */}
//           <div className="flex items-center gap-2 p-2 border-b border-gray-800 bg-gray-800">
//             <div className="flex items-center gap-1">
//               <Button
//                 variant={mode === "pencil" ? "default" : "outline"}
//                 size="icon"
//                 onClick={() => setMode("pencil")}
//                 className="h-8 w-8"
//               >
//                 <Pencil className="h-4 w-4" />
//               </Button>

//               <Button
//                 variant={mode === "eraser" ? "default" : "outline"}
//                 size="icon"
//                 onClick={() => setMode("eraser")}
//                 className="h-8 w-8"
//               >
//                 <Eraser className="h-4 w-4" />
//               </Button>

//               <Button
//                 variant={mode === "rectangle" ? "default" : "outline"}
//                 size="icon"
//                 onClick={() => setMode("rectangle")}
//                 className="h-8 w-8"
//               >
//                 <Square className="h-4 w-4" />
//               </Button>

//               <Button
//                 variant={mode === "circle" ? "default" : "outline"}
//                 size="icon"
//                 onClick={() => setMode("circle")}
//                 className="h-8 w-8"
//               >
//                 <Circle className="h-4 w-4" />
//               </Button>

//               <Button
//                 variant={mode === "text" ? "default" : "outline"}
//                 size="icon"
//                 onClick={() => setMode("text")}
//                 className="h-8 w-8"
//               >
//                 <Type className="h-4 w-4" />
//               </Button>
//             </div>

//             <div className="h-8 border-l border-gray-700 mx-1"></div>

//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button variant="outline" size="icon" className="h-8 w-8">
//                   <div className="h-4 w-4 rounded-full" style={{ backgroundColor: color }}></div>
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-64 p-2 bg-gray-800 border-gray-700">
//                 <div className="grid grid-cols-3 gap-1">
//                   {colorOptions.map((c) => (
//                     <button
//                       key={c}
//                       className={`h-8 w-full rounded-md ${color === c ? "ring-2 ring-white" : ""}`}
//                       style={{ backgroundColor: c }}
//                       onClick={() => setColor(c)}
//                     />
//                   ))}
//                 </div>
//                 <div className="flex items-center mt-2">
//                   <Palette className="h-4 w-4 mr-2 text-gray-400" />
//                   <input
//                     type="color"
//                     value={color}
//                     onChange={(e) => setColor(e.target.value)}
//                     className="h-8 w-full bg-transparent border-0"
//                   />
//                 </div>
//               </PopoverContent>
//             </Popover>

//             <div className="flex items-center gap-2 ml-2">
//               <span className="text-xs text-gray-400">Size:</span>
//               <Slider
//                 value={[brushSize]}
//                 min={1}
//                 max={20}
//                 step={1}
//                 onValueChange={(value) => setBrushSize(value[0])}
//                 className="w-24"
//               />
//             </div>

//             <div className="h-8 border-l border-gray-700 mx-1"></div>

//             <Button
//               variant="outline"
//               size="icon"
//               onClick={undoLastAction}
//               disabled={actions.length === 0}
//               className="h-8 w-8"
//             >
//               <Undo className="h-4 w-4" />
//             </Button>

//             <Button
//               variant="outline"
//               size="icon"
//               onClick={redoLastAction}
//               disabled={redoStack.length === 0}
//               className="h-8 w-8"
//             >
//               <Redo className="h-4 w-4" />
//             </Button>

//             <div className="h-8 border-l border-gray-700 mx-1"></div>

//             <Button variant="outline" size="icon" onClick={clearCanvas} className="h-8 w-8">
//               <Trash2 className="h-4 w-4" />
//             </Button>

//             <div className="flex-1"></div>

//             <Button variant="outline" size="sm" onClick={downloadCanvas} className="h-8">
//               <Download className="h-4 w-4 mr-2" />
//               Download
//             </Button>

//             <Button variant="default" size="sm" onClick={saveWhiteboard} className="h-8">
//               <Save className="h-4 w-4 mr-2" />
//               Save to Chat
//             </Button>
//           </div>

//           {/* Canvas */}
//           <div className="relative flex-1 overflow-hidden">
//             <canvas
//               ref={canvasRef}
//               className="absolute inset-0 w-full h-full touch-none"
//               onMouseDown={startDrawing}
//               onMouseMove={draw}
//               onMouseUp={endDrawing}
//               onMouseLeave={endDrawing}
//             />

//             {isAddingText && (
//               <div
//                 className="absolute"
//                 style={{
//                   left: textPosition.x,
//                   top: textPosition.y,
//                 }}
//               >
//                 <input
//                   ref={textInputRef}
//                   type="text"
//                   value={textInput}
//                   onChange={(e) => setTextInput(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       handleTextSubmit()
//                     } else if (e.key === "Escape") {
//                       setIsAddingText(false)
//                       setTextInput("")
//                     }
//                   }}
//                   onBlur={handleTextSubmit}
//                   className="bg-gray-800 border border-gray-700 text-white p-1 rounded"
//                   style={{
//                     fontSize: `${brushSize * 5}px`,
//                     color: color,
//                   }}
//                   autoFocus
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }
"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { pusherClient } from "@/lib/pusher"
import { toast } from "@/hooks/use-toast"
import { Eraser, Pencil, Square, Circle, Type, Download, Trash2, Undo, Redo, Palette, Save } from "lucide-react"

interface WhiteboardProps {
  chatId: string
  isOpen: boolean
  onClose: () => void
}

type DrawingMode = "pencil" | "eraser" | "rectangle" | "circle" | "text"
type DrawingAction = {
  type: string
  x: number
  y: number
  color?: string
  width?: number
  text?: string
  endX?: number
  endY?: number
}

export function CollaborativeWhiteboard({ chatId, isOpen, onClose }: WhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState("#ffffff")
  const [brushSize, setBrushSize] = useState(3)
  const [mode, setMode] = useState<DrawingMode>("pencil")
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [actions, setActions] = useState<DrawingAction[]>([])
  const [redoStack, setRedoStack] = useState<DrawingAction[]>([])
  const [textInput, setTextInput] = useState("")
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 })
  const [isAddingText, setIsAddingText] = useState(false)
  const textInputRef = useRef<HTMLInputElement>(null)

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current || !isOpen) return

    const canvas = canvasRef.current
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2

    const context = canvas.getContext("2d")
    if (context) {
      context.scale(2, 2) // For high DPI displays
      context.lineCap = "round"
      context.lineJoin = "round"
      context.strokeStyle = color
      context.lineWidth = brushSize
      contextRef.current = context

      // Fill with dark background
      context.fillStyle = "#1a1a1a"
      context.fillRect(0, 0, canvas.width, canvas.height)
    }
  }, [isOpen, color, brushSize])

  // Set up Pusher for real-time collaboration
  useEffect(() => {
    if (!chatId || !pusherClient || !isOpen) return

    const channel = pusherClient.subscribe(`whiteboard-${chatId}`)

    channel.bind("draw-action", (data: DrawingAction) => {
      if (!contextRef.current) return

      const ctx = contextRef.current

      if (data.type === "pencil-move") {
        ctx.strokeStyle = data.color || color
        ctx.lineWidth = data.width || brushSize
        ctx.lineTo(data.x, data.y)
        ctx.stroke()
      } else if (data.type === "pencil-start") {
        ctx.strokeStyle = data.color || color
        ctx.lineWidth = data.width || brushSize
        ctx.beginPath()
        ctx.moveTo(data.x, data.y)
      } else if (data.type === "eraser-move") {
        ctx.globalCompositeOperation = "destination-out"
        ctx.lineTo(data.x, data.y)
        ctx.stroke()
        ctx.globalCompositeOperation = "source-over"
      } else if (data.type === "eraser-start") {
        ctx.globalCompositeOperation = "destination-out"
        ctx.beginPath()
        ctx.moveTo(data.x, data.y)
      } else if (data.type === "rectangle") {
        ctx.strokeStyle = data.color || color
        ctx.lineWidth = data.width || brushSize
        ctx.beginPath()
        ctx.rect(data.x, data.y, data.endX! - data.x, data.endY! - data.y)
        ctx.stroke()
      } else if (data.type === "circle") {
        ctx.strokeStyle = data.color || color
        ctx.lineWidth = data.width || brushSize
        ctx.beginPath()
        const radius = Math.sqrt(Math.pow(data.endX! - data.x, 2) + Math.pow(data.endY! - data.y, 2))
        ctx.arc(data.x, data.y, radius, 0, 2 * Math.PI)
        ctx.stroke()
      } else if (data.type === "text") {
        ctx.fillStyle = data.color || color
        ctx.font = `${data.width || 16}px sans-serif`
        ctx.fillText(data.text || "", data.x, data.y)
      } else if (data.type === "clear") {
        ctx.fillStyle = "#1a1a1a"
        ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height)
      }

      // Add to local actions
      setActions((prev) => [...prev, data])
    })

    return () => {
      pusherClient.unsubscribe(`whiteboard-${chatId}`)
    }
  }, [chatId, isOpen, color, brushSize])

  // Drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!contextRef.current || isAddingText) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (mode === "text") {
      setTextPosition({ x, y })
      setIsAddingText(true)
      setTimeout(() => {
        textInputRef.current?.focus()
      }, 100)
      return
    }

    setIsDrawing(true)
    setStartPos({ x, y })

    const ctx = contextRef.current

    if (mode === "pencil") {
      ctx.globalCompositeOperation = "source-over"
      ctx.strokeStyle = color
      ctx.lineWidth = brushSize
      ctx.beginPath()
      ctx.moveTo(x, y)

      // Send to Pusher
      const action = {
        type: "pencil-start",
        x,
        y,
        color,
        width: brushSize,
      }
      sendDrawAction(action)
    } else if (mode === "eraser") {
      ctx.globalCompositeOperation = "destination-out"
      ctx.beginPath()
      ctx.moveTo(x, y)

      // Send to Pusher
      const action = {
        type: "eraser-start",
        x,
        y,
        width: brushSize * 2, // Eraser is usually bigger
      }
      sendDrawAction(action)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current || isAddingText) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = contextRef.current

    if (mode === "pencil") {
      ctx.lineTo(x, y)
      ctx.stroke()

      // Send to Pusher
      const action = {
        type: "pencil-move",
        x,
        y,
        color,
        width: brushSize,
      }
      sendDrawAction(action)
    } else if (mode === "eraser") {
      ctx.lineTo(x, y)
      ctx.stroke()

      // Send to Pusher
      const action = {
        type: "eraser-move",
        x,
        y,
        width: brushSize * 2,
      }
      sendDrawAction(action)
    }
  }

  const endDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = contextRef.current

    if (mode === "rectangle") {
      ctx.strokeStyle = color
      ctx.lineWidth = brushSize
      ctx.beginPath()
      ctx.rect(startPos.x, startPos.y, x - startPos.x, y - startPos.y)
      ctx.stroke()

      // Send to Pusher
      const action = {
        type: "rectangle",
        x: startPos.x,
        y: startPos.y,
        endX: x,
        endY: y,
        color,
        width: brushSize,
      }
      sendDrawAction(action)
      setActions((prev) => [...prev, action])
    } else if (mode === "circle") {
      ctx.strokeStyle = color
      ctx.lineWidth = brushSize
      ctx.beginPath()
      const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2))
      ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI)
      ctx.stroke()

      // Send to Pusher
      const action = {
        type: "circle",
        x: startPos.x,
        y: startPos.y,
        endX: x,
        endY: y,
        color,
        width: brushSize,
      }
      sendDrawAction(action)
      setActions((prev) => [...prev, action])
    } else if (mode === "eraser") {
      ctx.globalCompositeOperation = "source-over"
    }

    setIsDrawing(false)
    ctx.closePath()
  }

  const handleTextSubmit = () => {
    if (!textInput.trim() || !contextRef.current) {
      setIsAddingText(false)
      return
    }

    const ctx = contextRef.current
    ctx.fillStyle = color
    ctx.font = `${brushSize * 5}px sans-serif`
    ctx.fillText(textInput, textPosition.x, textPosition.y)

    // Send to Pusher
    const action = {
      type: "text",
      x: textPosition.x,
      y: textPosition.y,
      text: textInput,
      color,
      width: brushSize * 5,
    }
    sendDrawAction(action)
    setActions((prev) => [...prev, action])

    setTextInput("")
    setIsAddingText(false)
  }

  const clearCanvas = () => {
    if (!contextRef.current || !canvasRef.current) return

    const ctx = contextRef.current
    ctx.fillStyle = "#1a1a1a"
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Send to Pusher
    const action = {
      type: "clear",
      x: 0,
      y: 0,
    }
    sendDrawAction(action)

    // Clear actions
    setActions([])
    setRedoStack([])

    toast({
      title: "Canvas Cleared",
      description: "The whiteboard has been cleared",
    })
  }

  const undoLastAction = () => {
    if (actions.length === 0 || !contextRef.current || !canvasRef.current) return

    // Pop the last action and add to redo stack
    const lastAction = actions[actions.length - 1]
    setRedoStack((prev) => [...prev, lastAction])
    setActions((prev) => prev.slice(0, prev.length - 1))

    // Redraw everything
    redrawCanvas()

    toast({
      title: "Undo",
      description: "Last action undone",
    })
  }

  const redoLastAction = () => {
    if (redoStack.length === 0 || !contextRef.current) return

    // Pop the last redo action and add back to actions
    const actionToRedo = redoStack[redoStack.length - 1]
    setActions((prev) => [...prev, actionToRedo])
    setRedoStack((prev) => prev.slice(0, prev.length - 1))

    // Apply the action
    applyAction(actionToRedo)

    toast({
      title: "Redo",
      description: "Action redone",
    })
  }

  const redrawCanvas = () => {
    if (!contextRef.current || !canvasRef.current) return

    const ctx = contextRef.current

    // Clear canvas
    ctx.fillStyle = "#1a1a1a"
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Redraw all actions except the last one
    actions.forEach((action) => {
      applyAction(action)
    })
  }

  const applyAction = (action: DrawingAction) => {
    if (!contextRef.current) return

    const ctx = contextRef.current

    if (action.type === "pencil-start") {
      ctx.strokeStyle = action.color || color
      ctx.lineWidth = action.width || brushSize
      ctx.beginPath()
      ctx.moveTo(action.x, action.y)
    } else if (action.type === "pencil-move") {
      ctx.strokeStyle = action.color || color
      ctx.lineWidth = action.width || brushSize
      ctx.lineTo(action.x, action.y)
      ctx.stroke()
    } else if (action.type === "eraser-start") {
      ctx.globalCompositeOperation = "destination-out"
      ctx.beginPath()
      ctx.moveTo(action.x, action.y)
    } else if (action.type === "eraser-move") {
      ctx.globalCompositeOperation = "destination-out"
      ctx.lineTo(action.x, action.y)
      ctx.stroke()
      ctx.globalCompositeOperation = "source-over"
    } else if (action.type === "rectangle") {
      ctx.strokeStyle = action.color || color
      ctx.lineWidth = action.width || brushSize
      ctx.beginPath()
      ctx.rect(action.x, action.y, action.endX! - action.x, action.endY! - action.y)
      ctx.stroke()
    } else if (action.type === "circle") {
      ctx.strokeStyle = action.color || color
      ctx.lineWidth = action.width || brushSize
      ctx.beginPath()
      const radius = Math.sqrt(Math.pow(action.endX! - action.x, 2) + Math.pow(action.endY! - action.y, 2))
      ctx.arc(action.x, action.y, radius, 0, 2 * Math.PI)
      ctx.stroke()
    } else if (action.type === "text") {
      ctx.fillStyle = action.color || color
      ctx.font = `${action.width || 16}px sans-serif`
      ctx.fillText(action.text || "", action.x, action.y)
    }
  }

  const sendDrawAction = async (action: DrawingAction) => {
    try {
      await fetch(`/api/whiteboard/${chatId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action),
      })
    } catch (error) {
      console.error("Error sending drawing action:", error)
    }
  }

  const downloadCanvas = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const dataUrl = canvas.toDataURL("image/png")

    const a = document.createElement("a")
    a.href = dataUrl
    a.download = `whiteboard-${chatId}-${new Date().toISOString().slice(0, 10)}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    toast({
      title: "Download Complete",
      description: "Whiteboard image has been downloaded",
    })
  }

  const saveWhiteboard = async () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const dataUrl = canvas.toDataURL("image/png")

    try {
      const response = await fetch(`/api/whiteboard/${chatId}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageData: dataUrl,
          actions: actions,
        }),
      })

      if (response.ok) {
        toast({
          title: "Whiteboard Saved",
          description: "Your whiteboard has been saved to the chat",
          variant: "success",
        })
      } else {
        throw new Error("Failed to save whiteboard")
      }
    } catch (error) {
      console.error("Error saving whiteboard:", error)
      toast({
        title: "Error",
        description: "Failed to save whiteboard",
        variant: "destructive",
      })
    }
  }

  const colorOptions = [
    "#ffffff", // white
    "#ff5555", // red
    "#5af78e", // green
    "#57c7ff", // blue
    "#f1fa8c", // yellow
    "#bd93f9", // purple
    "#ff79c6", // pink
    "#8be9fd", // cyan
    "#ffb86c", // orange
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full h-[80vh] p-0 bg-gray-900 border-gray-700">
        <DialogHeader className="p-4 border-b border-gray-800">
          <DialogTitle className="text-white">Collaborative Whiteboard</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* Toolbar */}
          <div className="flex items-center gap-2 p-2 border-b border-gray-800 bg-gray-800">
            <div className="flex items-center gap-1">
              <Button
                variant={mode === "pencil" ? "default" : "outline"}
                size="icon"
                onClick={() => setMode("pencil")}
                className="h-8 w-8"
              >
                <Pencil className="h-4 w-4" />
              </Button>

              <Button
                variant={mode === "eraser" ? "default" : "outline"}
                size="icon"
                onClick={() => setMode("eraser")}
                className="h-8 w-8"
              >
                <Eraser className="h-4 w-4" />
              </Button>

              <Button
                variant={mode === "rectangle" ? "default" : "outline"}
                size="icon"
                onClick={() => setMode("rectangle")}
                className="h-8 w-8"
              >
                <Square className="h-4 w-4" />
              </Button>

              <Button
                variant={mode === "circle" ? "default" : "outline"}
                size="icon"
                onClick={() => setMode("circle")}
                className="h-8 w-8"
              >
                <Circle className="h-4 w-4" />
              </Button>

              <Button
                variant={mode === "text" ? "default" : "outline"}
                size="icon"
                onClick={() => setMode("text")}
                className="h-8 w-8"
              >
                <Type className="h-4 w-4" />
              </Button>
            </div>

            <div className="h-8 border-l border-gray-700 mx-1"></div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <div className="h-4 w-4 rounded-full" style={{ backgroundColor: color }}></div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2 bg-gray-800 border-gray-700">
                <div className="grid grid-cols-3 gap-1">
                  {colorOptions.map((c) => (
                    <button
                      key={c}
                      className={`h-8 w-full rounded-md ${color === c ? "ring-2 ring-white" : ""}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setColor(c)}
                    />
                  ))}
                </div>
                <div className="flex items-center mt-2">
                  <Palette className="h-4 w-4 mr-2 text-gray-400" />
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-8 w-full bg-transparent border-0"
                  />
                </div>
              </PopoverContent>
            </Popover>

            <div className="flex items-center gap-2 ml-2">
              <span className="text-xs text-gray-400">Size:</span>
              <Slider
                value={[brushSize]}
                min={1}
                max={20}
                step={1}
                onValueChange={(value) => setBrushSize(value[0])}
                className="w-24"
              />
            </div>

            <div className="h-8 border-l border-gray-700 mx-1"></div>

            <Button
              variant="outline"
              size="icon"
              onClick={undoLastAction}
              disabled={actions.length === 0}
              className="h-8 w-8"
            >
              <Undo className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={redoLastAction}
              disabled={redoStack.length === 0}
              className="h-8 w-8"
            >
              <Redo className="h-4 w-4" />
            </Button>

            <div className="h-8 border-l border-gray-700 mx-1"></div>

            <Button variant="outline" size="icon" onClick={clearCanvas} className="h-8 w-8">
              <Trash2 className="h-4 w-4" />
            </Button>

            <div className="flex-1"></div>

            <Button variant="outline" size="sm" onClick={downloadCanvas} className="h-8">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>

            <Button variant="default" size="sm" onClick={saveWhiteboard} className="h-8">
              <Save className="h-4 w-4 mr-2" />
              Save to Chat
            </Button>
          </div>

          {/* Canvas */}
          <div className="relative flex-1 overflow-hidden">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full touch-none cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={endDrawing}
              onMouseLeave={endDrawing}
              onTouchStart={(e) => {
                e.preventDefault()
                const touch = e.touches[0]
                const mouseEvent = new MouseEvent("mousedown", {
                  clientX: touch.clientX,
                  clientY: touch.clientY,
                })
                canvasRef.current?.dispatchEvent(mouseEvent)
              }}
              onTouchMove={(e) => {
                e.preventDefault()
                const touch = e.touches[0]
                const mouseEvent = new MouseEvent("mousemove", {
                  clientX: touch.clientX,
                  clientY: touch.clientY,
                })
                canvasRef.current?.dispatchEvent(mouseEvent)
              }}
              onTouchEnd={(e) => {
                e.preventDefault()
                const mouseEvent = new MouseEvent("mouseup")
                canvasRef.current?.dispatchEvent(mouseEvent)
              }}
            />

            {isAddingText && (
              <div
                className="absolute"
                style={{
                  left: textPosition.x,
                  top: textPosition.y,
                }}
              >
                <input
                  ref={textInputRef}
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleTextSubmit()
                    } else if (e.key === "Escape") {
                      setIsAddingText(false)
                      setTextInput("")
                    }
                  }}
                  onBlur={handleTextSubmit}
                  className="bg-gray-800 border border-gray-700 text-white p-1 rounded"
                  style={{
                    fontSize: `${brushSize * 5}px`,
                    color: color,
                  }}
                  autoFocus
                />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
