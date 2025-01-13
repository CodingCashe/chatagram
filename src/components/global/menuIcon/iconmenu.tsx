// import React from 'react'
// import { Button } from '@/components/ui/button'
// import { Menu, AlignLeft } from 'lucide-react'
// import { useSheetState } from '@/hooks/useSheetState'

// export const MenuButton = () => {
//   const { openSheet } = useSheetState()

//   return (
//     <Button variant="ghost" size="icon" className="lg:hidden" onClick={openSheet}>
//       <AlignLeft className="h-6 w-6 text-white" />
//     </Button>
//   )
// }

import React from 'react'
import { Button } from '@/components/ui/button'
import { AlignLeft } from 'lucide-react'
import { useSheetState } from '@/hooks/useSheetState'

export const MenuButton = () => {
  const { isOpen, openSheet } = useSheetState()

  if (isOpen) {
    return null
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="lg:hidden" 
      onClick={openSheet}
    >
      <AlignLeft className="h-6 w-6 text-white" />
    </Button>
  )
}

