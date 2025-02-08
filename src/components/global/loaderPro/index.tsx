// "use client"

// import React, { useState, useEffect } from "react"
// import { motion, AnimatePresence, useAnimation } from "framer-motion"
// import { MessageSquare, Send, Bot, Zap, RefreshCw, Users, TypeIcon as type, type LucideIcon } from "lucide-react"
// import { useSpinnerAnimation } from "@/hooks/use-spinner"
// import { cn } from "@/lib/utils"

// const icons: LucideIcon[] = [MessageSquare, Send, Bot, Zap, RefreshCw, Users]

// const loadingMessages = [
//   "Powering up Chatal...",
//   "Connecting to Instagram...",
//   "Preparing your DM automation...",
//   "Almost there...",
//   "Optimizing your workflow...",
//   "Setting up smart responses...",
//   "Enhancing your Instagram game...",
// ]

// const encouragingMessages = [
//   "Hang tight! Great things take time.",
//   "You're moments away from DM mastery!",
//   "Patience pays off. We're almost ready!",
//   "Excellence is worth the wait.",
// ]

// const troubleshootingMessages = [
//   "Taking longer than usual?",
//   "Check your internet connection.",
//   "Try refreshing the page.",
//   "Still stuck? Contact our support team.",
// ]

// interface ChatalMindBlowingLoaderProps {
//   state: boolean
//   className?: string
//   color?: string
// }

// export default function ChatalMindBlowingLoader({ state, className, color = "blue" }: ChatalMindBlowingLoaderProps) {
//   const { currentIcon, isSpinning, triggerManualSpin } = useSpinnerAnimation(icons)
//   const [isHovered, setIsHovered] = useState(false)
//   const arrowControls = useAnimation()
//   const [message, setMessage] = useState(loadingMessages[0])
//   const [messageType, setMessageType] = useState("loading")
//   const [loadTime, setLoadTime] = useState(0)
//   const [showText, setShowText] = useState(false)

//   useEffect(() => {
//     if (state) {
//       const textDelay = setTimeout(() => {
//         setShowText(true)
//       }, 3000)

//       return () => clearTimeout(textDelay)
//     } else {
//       setShowText(false)
//       setLoadTime(0)
//     }
//   }, [state])

//   useEffect(() => {
//     if (!showText || !state) return

//     const interval = setInterval(() => {
//       setLoadTime((prev) => prev + 1)
//     }, 1000)

//     return () => clearInterval(interval)
//   }, [showText, state])

//   useEffect(() => {
//     if (!showText || !state) return

//     if (loadTime < 10) {
//       setMessage(loadingMessages[loadTime % loadingMessages.length])
//       setMessageType("loading")
//     } else if (loadTime < 20) {
//       setMessage(encouragingMessages[(loadTime - 10) % encouragingMessages.length])
//       setMessageType("encouraging")
//     } else {
//       setMessage(troubleshootingMessages[(loadTime - 20) % troubleshootingMessages.length])
//       setMessageType("troubleshooting")
//     }
//   }, [loadTime, showText, state])

//   const handleHoverStart = () => {
//     setIsHovered(true)
//     arrowControls.start({
//       scale: [1, 1.1, 1],
//       rotate: [0, 10, -10, 0],
//       transition: { duration: 0.5, repeat: Number.POSITIVE_INFINITY },
//     })
//   }

//   const handleHoverEnd = () => {
//     setIsHovered(false)
//     arrowControls.stop()
//   }

//   const handleClick = () => {
//     triggerManualSpin()
//   }

//   if (!state) {
//     return null
//   }

//   return (
//     <div className={cn("flex flex-col items-center justify-center w-full max-w-md px-4", className)}>
//       <motion.div
//         className={`relative w-48 h-48 md:w-64 md:h-64 cursor-pointer`}
//         onHoverStart={handleHoverStart}
//         onHoverEnd={handleHoverEnd}
//         onClick={handleClick}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <motion.div
//           className={`absolute inset-0 bg-${color}-200 rounded-full opacity-50 filter blur-xl`}
//           animate={{
//             scale: isHovered ? [1, 1.2, 1.1] : 1,
//             opacity: isHovered ? [0.5, 0.8, 0.6] : 0.5,
//           }}
//           transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//         />

//         <div className={`absolute inset-0 rounded-full border-4 border-${color}-300`}></div>

//         <AnimatePresence>
//           {isSpinning && (
//             <motion.div
//               className="absolute inset-0"
//               initial={{ rotate: 0 }}
//               animate={{ rotate: 360 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.75, ease: "easeInOut" }}
//             >
//               {[0, 1, 2].map((index) => (
//                 <motion.div
//                   key={index}
//                   className="absolute w-full h-full"
//                   style={{ rotate: index * 120 }}
//                   animate={arrowControls}
//                 >
//                   <svg viewBox="0 0 100 100" className={`w-full h-full fill-none stroke-${color}-500`}>
//                     <motion.path
//                       d="M50,10 A40,40 0 0,1 90,50"
//                       strokeWidth="4"
//                       strokeLinecap="round"
//                       initial={{ pathLength: 0 }}
//                       animate={{ pathLength: 1 }}
//                       transition={{ duration: 0.75, ease: "easeInOut" }}
//                     />
//                   </svg>
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <div className="absolute inset-0 flex items-center justify-center">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentIcon.displayName}
//               initial={{ scale: 0, rotate: -180 }}
//               animate={{ scale: 1, rotate: 0 }}
//               exit={{ scale: 0, rotate: 180 }}
//               transition={{ duration: 0.5 }}
//             >
//               {React.createElement(currentIcon, { size: 48, className: `text-${color}-500` })}
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         <AnimatePresence>
//           {isSpinning && (
//             <motion.div
//               className="absolute inset-0"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             >
//               {[...Array(20)].map((_, i) => (
//                 <motion.div
//                   key={i}
//                   className={`absolute w-1 h-1 bg-${color}-400 rounded-full`}
//                   initial={{
//                     x: "50%",
//                     y: "50%",
//                     scale: 0,
//                   }}
//                   animate={{
//                     x: `${50 + (Math.random() - 0.5) * 100}%`,
//                     y: `${50 + (Math.random() - 0.5) * 100}%`,
//                     scale: [0, 1, 0],
//                     opacity: [0, 1, 0],
//                   }}
//                   transition={{
//                     duration: 0.75,
//                     ease: "easeOut",
//                     delay: Math.random() * 0.5,
//                   }}
//                 />
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>

//       <AnimatePresence>
//         {showText && (
//           <motion.div
//             className="mt-8 text-center"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.5 }}
//           >
//             <motion.h2
//               className={`text-2xl font-bold text-${color}-600 mb-2`}
//               initial={{ y: -20 }}
//               animate={{ y: 0 }}
//               transition={{ type: "spring", stiffness: 300, damping: 10 }}
//             >
//               Chatal
//             </motion.h2>
//             <motion.p
//               key={message}
//               className={`text-lg ${
//                 messageType === "loading"
//                   ? "text-gray-700"
//                   : messageType === "encouraging"
//                     ? `text-${color}-600`
//                     : "text-yellow-600"
//               }`}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ type: "spring", stiffness: 100, damping: 10 }}
//             >
//               {message}
//             </motion.p>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }



"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { MessageSquare, Send, Bot, Zap, RefreshCw, Users, TypeIcon as type, type LucideIcon } from "lucide-react"
import { useSpinnerAnimation } from "@/hooks/use-spinner"
import { cn } from "@/lib/utils"

const icons: LucideIcon[] = [MessageSquare, Send, Bot, Zap, RefreshCw, Users]

const loadingMessages = [
  "Powering up Chatal...",
  "Connecting to Instagram...",
  "Preparing your DM automation...",
  "Almost there...",
  "Optimizing your workflow...",
  "Setting up smart responses...",
  "Enhancing your Instagram game...",
]

const encouragingMessages = [
  "Hang tight! Great things take time.",
  "You're moments away from DM mastery!",
  "Patience pays off. We're almost ready!",
  "Excellence is worth the wait.",
]

const troubleshootingMessages = [
  "Taking longer than usual?",
  "Check your internet connection.",
  "Try refreshing the page.",
  "Still stuck? Contact our support team.",
]

interface ChatalMindBlowingLoaderProps {
  state: boolean
  className?: string
  color?: string
}

export default function ChatalMindBlowingLoader({ state, className, color = "blue" }: ChatalMindBlowingLoaderProps) {
  const { currentIcon, isSpinning, triggerManualSpin } = useSpinnerAnimation(icons, 4000)
  const [isHovered, setIsHovered] = useState(false)
  const arrowControls = useAnimation()
  const [message, setMessage] = useState(loadingMessages[0])
  const [messageType, setMessageType] = useState("loading")
  const [loadTime, setLoadTime] = useState(0)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    if (state) {
      const spinDelay = 4000 // 4 seconds minimum spin
      const textDelay = setTimeout(() => {
        setShowText(true)
      }, spinDelay)

      return () => clearTimeout(textDelay)
    } else {
      setShowText(false)
      setLoadTime(0)
    }
  }, [state])

  useEffect(() => {
    if (!showText || !state) return

    const interval = setInterval(() => {
      setLoadTime((prev) => prev + 1)
    }, 4000)

    return () => clearInterval(interval)
  }, [showText, state])

  useEffect(() => {
    if (!showText || !state) return

    if (loadTime < 50) {
      setMessage(loadingMessages[loadTime % loadingMessages.length])
      setMessageType("loading")
    } else if (loadTime < 100) {
      setMessage(encouragingMessages[(loadTime - 10) % encouragingMessages.length])
      setMessageType("encouraging")
    } else {
      setMessage(troubleshootingMessages[(loadTime - 20) % troubleshootingMessages.length])
      setMessageType("troubleshooting")
    }
  }, [loadTime, showText, state])

  const handleHoverStart = () => {
    setIsHovered(true)
    arrowControls.start({
      scale: [1, 1.1, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.5, repeat: Number.POSITIVE_INFINITY },
    })
  }

  const handleHoverEnd = () => {
    setIsHovered(false)
    arrowControls.stop()
  }

  const handleClick = () => {
    triggerManualSpin()
  }

  if (!state) {
    return null
  }

  return (
    <div className={cn("flex flex-col items-center justify-center w-full max-w-md px-4 py-8 md:py-12", className)}>
      <motion.div
        className={`relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 cursor-pointer`}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className={`absolute inset-0 bg-${color}-200 rounded-full opacity-50 filter blur-xl`}
          animate={{
            scale: isHovered ? [1, 1.2, 1.1] : 1,
            opacity: isHovered ? [0.5, 0.8, 0.6] : 0.5,
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className={`absolute inset-0 rounded-full border-4 border-${color}-300`}></div>

        <AnimatePresence>
          {isSpinning && (
            <motion.div
              className="absolute inset-0"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="absolute w-full h-full"
                  style={{ rotate: index * 120 }}
                  animate={arrowControls}
                >
                  <svg viewBox="0 0 100 100" className={`w-full h-full fill-none stroke-${color}-500`}>
                    <motion.path
                      d="M50,10 A40,40 0 0,1 90,50"
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.75, ease: "easeInOut" }}
                    />
                  </svg>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIcon.displayName}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              {React.createElement(currentIcon, {
                size: 32,
                className: `text-${color}-500 sm:w-12 sm:h-12 md:w-16 md:h-16`,
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isSpinning && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(window.innerWidth < 640 ? 10 : 20)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1 h-1 bg-${color}-400 rounded-full`}
                  initial={{
                    x: "50%",
                    y: "50%",
                    scale: 0,
                  }}
                  animate={{
                    x: `${50 + (Math.random() - 0.5) * 100}%`,
                    y: `${50 + (Math.random() - 0.5) * 100}%`,
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.75,
                    ease: "easeOut",
                    delay: Math.random() * 0.5,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {showText && (
          <motion.div
            className="mt-4 sm:mt-6 md:mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className={`text-xl sm:text-2xl font-bold text-${color}-600 mb-1 sm:mb-2`}
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              Chatal
            </motion.h2>
            <motion.p
              key={message}
              className={`text-sm sm:text-base md:text-lg ${
                messageType === "loading"
                  ? "text-gray-700"
                  : messageType === "encouraging"
                    ? `text-${color}-600`
                    : "text-yellow-600"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              {message}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

