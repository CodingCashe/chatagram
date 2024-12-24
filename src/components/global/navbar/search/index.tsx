
// import { Input } from '@/components/ui/input'
// import { SearchIcon } from 'lucide-react'
// import React from 'react'

// type Props = {}

// const Search = (props: Props) => {
//   return (
//     <div className="flex overflow-hidden gap-x-2 border-[1px] border-[#3352CC] rounded-full px-4 py-1 items-center flex-1">
//       <SearchIcon color="#3352CC" />
//       <Input
//         placeholder="Search automation by name"
//         className="border-none outline-none ring-0 focus:ring-0 flex-1"
//       />
//     </div>
//   )
// }

// export default Search

// 'use client'

// import { Input } from '@/components/ui/input'
// import { SearchIcon } from 'lucide-react'
// import React, { useState, useEffect, useCallback } from 'react'
// import { getAllAutomations } from '@/actions/automations'
// import debounce from 'lodash.debounce'

// type Automation = {
//   id: string
//   name: string
//   // Add other relevant fields
// }

// const Search = () => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [automations, setAutomations] = useState<Automation[]>([])
//   const [filteredAutomations, setFilteredAutomations] = useState<Automation[]>([])

//   useEffect(() => {
//     const fetchAutomations = async () => {
//       const result = await getAllAutomations()
//       if (result.status === 200) {
//         setAutomations(result.data)
//       }
//     }

//     fetchAutomations()
//   }, [])

//   const debouncedSearch = useCallback(
//     debounce((searchTerm: string) => {
//       const filtered = automations.filter(automation =>
//         automation.name.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//       setFilteredAutomations(filtered)
//     }, 300),
//     [automations]
//   )

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value
//     setSearchTerm(value)
//     debouncedSearch(value)
//   }

//   return (
//     <div className="flex flex-col">
//       <div className="flex overflow-hidden gap-x-2 border-[1px] border-[#3352CC] rounded-full px-4 py-1 items-center flex-1">
//         <SearchIcon color="#3352CC" />
//         <Input
//           placeholder="Search automation by name"
//           className="border-none outline-none ring-0 focus:ring-0 flex-1"
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//       </div>
//       {searchTerm && (
//         <ul className="mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
//           {filteredAutomations.map(automation => (
//             <li key={automation.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//               {automation.name}
//             </li>
//           ))}
//           {filteredAutomations.length === 0 && (
//             <li className="px-4 py-2 text-gray-500">No automations found</li>
//           )}
//         </ul>
//       )}
//     </div>
//   )
// }

// export default Search


'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SearchIcon, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getAllAutomations } from '@/actions/automations'
import debounce from 'lodash.debounce'
import { useRouter, usePathname } from 'next/navigation'
import { useKeyboardNavigation } from '@/hooks/use-keyboard'
import { FancyAutomationBox } from '@/components/global/fancy/fancy-automation-box'

type Keyword = {
  id: string;
  automationId: string | null;
  word: string;
};

type Listener = {
  id: string;
  listener: string;
  automationId: string;
  prompt: string;
  commentReply: string | null;
  dmCount: number;
  commentCount: number;
};

interface Automation {
  id: string;
  name: string;
  active: boolean;
  keywords: Keyword[];
  createdAt: Date;
  listener: Listener | null;
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [automations, setAutomations] = useState<Automation[]>([])
  const [filteredAutomations, setFilteredAutomations] = useState<Automation[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [previewAutomation, setPreviewAutomation] = useState<Automation | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const { selectedIndex, setSelectedIndex } = useKeyboardNavigation(filteredAutomations, (automation) => {
    router.push(`${pathname}/${automation.id}`)
  })

  useEffect(() => {
    const fetchAutomations = async () => {
      const result = await getAllAutomations()
      if (result.status === 200) {
        setAutomations(result.data)
      }
    }

    fetchAutomations()
  }, [])

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      const filtered = automations.filter(automation =>
        automation.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredAutomations(filtered)
      setSelectedIndex(-1)
      setPreviewAutomation(null)
    }, 300),
    [automations]
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    debouncedSearch(value)
    setIsOpen(true)
  }

  useEffect(() => {
    if (selectedIndex !== -1) {
      setPreviewAutomation(filteredAutomations[selectedIndex])
    }
  }, [selectedIndex, filteredAutomations])

  useEffect(() => {
    if (selectedIndex !== -1 && listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLLIElement
      selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [selectedIndex])

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  const handleDelete = useCallback((id: string) => {
    // Implement delete functionality here
    console.log(`Delete automation with id: ${id}`)
  }, [])

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 gap-x-2 border-[1px] border-[#3352CC]">
      <div className="relative">
        <Input
          ref={inputRef}
          placeholder="Search automation by name"
          className="pl-10 pr-4 py-2 w-full border-2 border-[#545454] rounded-full focus:outline-none focus:ring-2 focus:ring-[#3352CC] focus:border-transparent bg-[#1D1D1D] text-white"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setIsOpen(true)} 
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3352CC]" size={20} />
        {searchTerm && (
          <Button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-transparent hover:bg-[#2A2A2A]"
            onClick={() => {
              setSearchTerm('')
              setFilteredAutomations([])
              setIsOpen(false)
              inputRef.current?.focus()
            }}
          >
            <X size={16} className="text-[#545454]" />
          </Button>
        )}
      </div>
      <AnimatePresence>
        {isOpen && searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-2 bg-[#1D1D1D] rounded-lg shadow-xl overflow-hidden"
          >
            <div className="flex flex-col">
              <ul
                ref={listRef}
                className="max-h-96 overflow-y-auto"
              >
                {filteredAutomations.map((automation, index) => (
                  <motion.li
                    key={automation.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className={`p-2 ${
                      selectedIndex === index
                        ? 'bg-[#2A2A2A]'
                        : 'hover:bg-[#2A2A2A]'
                    }`}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <FancyAutomationBox
                      automation={automation}
                      onDelete={() => handleDelete(automation.id)}
                      pathname={pathname}
                    />
                  </motion.li>
                ))}
                {filteredAutomations.length === 0 && (
                  <li className="px-4 py-2 text-[#9B9CA0]">No automations found</li>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Search

