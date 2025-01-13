import { useState, useCallback } from 'react'

export const useSheetState = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openSheet = useCallback(() => setIsOpen(true), [])
  const closeSheet = useCallback(() => setIsOpen(false), [])

  return { isOpen, openSheet, closeSheet }
}

