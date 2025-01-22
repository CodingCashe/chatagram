import { useState, useEffect, useCallback } from "react"
import type { LucideIcon } from "lucide-react"

export function useSpinnerAnimation(icons: LucideIcon[]) {
  const [currentIconIndex, setCurrentIconIndex] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)

  const triggerSpin = useCallback(() => {
    setIsSpinning(true)
    setTimeout(() => {
      setIsSpinning(false)
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length)
    }, 750)
  }, [icons.length])

  useEffect(() => {
    const spinInterval = setInterval(triggerSpin, 3000)
    return () => clearInterval(spinInterval)
  }, [triggerSpin])

  const triggerManualSpin = () => {
    if (!isSpinning) {
      triggerSpin()
    }
  }

  return {
    currentIcon: icons[currentIconIndex],
    isSpinning,
    triggerManualSpin,
  }
}

