// import { useState, useEffect, useCallback } from "react"
// import type { LucideIcon } from "lucide-react"

// export function useSpinnerAnimation(icons: LucideIcon[]) {
//   const [currentIconIndex, setCurrentIconIndex] = useState(0)
//   const [isSpinning, setIsSpinning] = useState(false)

//   const triggerSpin = useCallback(() => {
//     setIsSpinning(true)
//     setTimeout(() => {
//       setIsSpinning(false)
//       setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length)
//     }, 750)
//   }, [icons.length])

//   useEffect(() => {
//     const spinInterval = setInterval(triggerSpin, 3000)
//     return () => clearInterval(spinInterval)
//   }, [triggerSpin])

//   const triggerManualSpin = () => {
//     if (!isSpinning) {
//       triggerSpin()
//     }
//   }

//   return {
//     currentIcon: icons[currentIconIndex],
//     isSpinning,
//     triggerManualSpin,
//   }
// }


import { useState, useCallback, useEffect, useRef } from "react"
import type { LucideIcon } from "lucide-react"

export function useSpinnerAnimation(icons: LucideIcon[], minSpinDuration = 4000) {
  const [currentIconIndex, setCurrentIconIndex] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const triggerSpin = useCallback(() => {
    if (isSpinning) return

    setIsSpinning(true)
    const spinDuration = Math.max(minSpinDuration, Math.random() * 2000 + 3000)

    setTimeout(() => {
      setIsSpinning(false)
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length)
    }, spinDuration)
  }, [icons.length, isSpinning, minSpinDuration])

  useEffect(() => {
    const spinInterval = setInterval(triggerSpin, 10000) // Change to 10 seconds
    return () => clearInterval(spinInterval)
  }, [triggerSpin])

  const triggerManualSpin = useCallback(() => {
    if (!isSpinning) {
      triggerSpin()
    }
  }, [isSpinning, triggerSpin])

  return {
    currentIcon: icons[currentIconIndex],
    isSpinning,
    triggerManualSpin: triggerManualSpin,
  }
}

