import { useState, useEffect, useCallback } from 'react'

export function useKeyboardNavigation<T>(items: T[], onSelect: (item: T) => void) {
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (prev < items.length - 1 ? prev + 1 : prev))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev))
      } else if (e.key === 'Enter' && selectedIndex !== -1) {
        onSelect(items[selectedIndex])
      }
    },
    [items, selectedIndex, onSelect]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return { selectedIndex, setSelectedIndex }
}

