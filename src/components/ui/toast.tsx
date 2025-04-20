// "use client"

// import * as React from "react"
// import * as ToastPrimitives from "@radix-ui/react-toast"
// import { cva, type VariantProps } from "class-variance-authority"
// import { X } from "lucide-react"

// import { cn } from "@/lib/utils"

// const ToastProvider = ToastPrimitives.Provider

// const ToastViewport = React.forwardRef<
//   React.ElementRef<typeof ToastPrimitives.Viewport>,
//   React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
// >(({ className, ...props }, ref) => (
//   <ToastPrimitives.Viewport
//     ref={ref}
//     className={cn(
//       "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
//       className
//     )}
//     {...props}
//   />
// ))
// ToastViewport.displayName = ToastPrimitives.Viewport.displayName

// const toastVariants = cva(
//   "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
//   {
//     variants: {
//       variant: {
//         default: "border bg-background text-foreground",
//         destructive:
//           "destructive group border-destructive bg-destructive text-destructive-foreground",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   }
// )

// const Toast = React.forwardRef<
//   React.ElementRef<typeof ToastPrimitives.Root>,
//   React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
//     VariantProps<typeof toastVariants>
// >(({ className, variant, ...props }, ref) => {
//   return (
//     <ToastPrimitives.Root
//       ref={ref}
//       className={cn(toastVariants({ variant }), className)}
//       {...props}
//     />
//   )
// })
// Toast.displayName = ToastPrimitives.Root.displayName

// const ToastAction = React.forwardRef<
//   React.ElementRef<typeof ToastPrimitives.Action>,
//   React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
// >(({ className, ...props }, ref) => (
//   <ToastPrimitives.Action
//     ref={ref}
//     className={cn(
//       "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
//       className
//     )}
//     {...props}
//   />
// ))
// ToastAction.displayName = ToastPrimitives.Action.displayName

// const ToastClose = React.forwardRef<
//   React.ElementRef<typeof ToastPrimitives.Close>,
//   React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
// >(({ className, ...props }, ref) => (
//   <ToastPrimitives.Close
//     ref={ref}
//     className={cn(
//       "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
//       className
//     )}
//     toast-close=""
//     {...props}
//   >
//     <X className="h-4 w-4" />
//   </ToastPrimitives.Close>
// ))
// ToastClose.displayName = ToastPrimitives.Close.displayName

// const ToastTitle = React.forwardRef<
//   React.ElementRef<typeof ToastPrimitives.Title>,
//   React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
// >(({ className, ...props }, ref) => (
//   <ToastPrimitives.Title
//     ref={ref}
//     className={cn("text-sm font-semibold [&+div]:text-xs", className)}
//     {...props}
//   />
// ))
// ToastTitle.displayName = ToastPrimitives.Title.displayName

// const ToastDescription = React.forwardRef<
//   React.ElementRef<typeof ToastPrimitives.Description>,
//   React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
// >(({ className, ...props }, ref) => (
//   <ToastPrimitives.Description
//     ref={ref}
//     className={cn("text-sm opacity-90", className)}
//     {...props}
//   />
// ))
// ToastDescription.displayName = ToastPrimitives.Description.displayName

// type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

// type ToastActionElement = React.ReactElement<typeof ToastAction>

// export {
//   type ToastProps,
//   type ToastActionElement,
//   ToastProvider,
//   ToastViewport,
//   Toast,
//   ToastTitle,
//   ToastDescription,
//   ToastClose,
//   ToastAction,
// }


"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border-gray-700 bg-gray-900 text-white",
        destructive: "border-red-900 bg-red-950 text-red-50",
        success: "border-green-900 bg-green-950 text-green-50",
        warning: "border-yellow-900 bg-yellow-950 text-yellow-50",
        info: "border-blue-900 bg-blue-950 text-blue-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return <ToastPrimitives.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-gray-700 bg-gray-800 px-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-600 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-red-800 group-[.destructive]:hover:border-red-700 group-[.destructive]:hover:bg-red-900 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-800 group-[.success]:border-green-800 group-[.success]:hover:border-green-700 group-[.success]:hover:bg-green-900 group-[.success]:hover:text-green-50 group-[.success]:focus:ring-green-800 group-[.warning]:border-yellow-800 group-[.warning]:hover:border-yellow-700 group-[.warning]:hover:bg-yellow-900 group-[.warning]:hover:text-yellow-50 group-[.warning]:focus:ring-yellow-800 group-[.info]:border-blue-800 group-[.info]:hover:border-blue-700 group-[.info]:hover:bg-blue-900 group-[.info]:hover:text-blue-50 group-[.info]:focus:ring-blue-800",
      className,
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-white/50 opacity-0 transition-opacity hover:text-white focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600 group-[.success]:text-green-300 group-[.success]:hover:text-green-50 group-[.success]:focus:ring-green-400 group-[.warning]:text-yellow-300 group-[.warning]:hover:text-yellow-50 group-[.warning]:focus:ring-yellow-400 group-[.info]:text-blue-300 group-[.info]:hover:text-blue-50 group-[.info]:focus:ring-blue-400",
      className,
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

// Toast icon component based on variant
const ToastIcon = ({ variant }: { variant?: "default" | "destructive" | "success" | "warning" | "info" }) => {
  switch (variant) {
    case "success":
      return <CheckCircle2 className="h-5 w-5 text-green-400" />
    case "destructive":
      return <AlertCircle className="h-5 w-5 text-red-400" />
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-yellow-400" />
    case "info":
      return <Info className="h-5 w-5 text-blue-400" />
    default:
      return null
  }
}

// Toast progress bar
const ToastProgress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "destructive" | "success" | "warning" | "info"
    duration?: number
  }
>(({ className, variant, duration = 5000, ...props }, ref) => {
  const [width, setWidth] = React.useState(100)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(0)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  let progressColor = "bg-gray-500"
  if (variant === "destructive") progressColor = "bg-red-500"
  if (variant === "success") progressColor = "bg-green-500"
  if (variant === "warning") progressColor = "bg-yellow-500"
  if (variant === "info") progressColor = "bg-blue-500"

  return (
    <div ref={ref} className={cn("absolute bottom-0 left-0 h-1 w-full bg-gray-800", className)} {...props}>
      <div
        className={cn(progressColor, "h-full transition-all duration-[var(--duration)]")}
        style={
          {
            width: `${width}%`,
            "--duration": `${duration}ms`,
          } as React.CSSProperties
        }
      />
    </div>
  )
})
ToastProgress.displayName = "ToastProgress"

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastIcon,
  ToastProgress,
}
