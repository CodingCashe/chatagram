
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

// import React, { useState, useEffect, useCallback, useRef } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { SearchIcon, X } from 'lucide-react'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { getAllAutomations } from '@/actions/automations'
// import debounce from 'lodash.debounce'
// import { useRouter, usePathname } from 'next/navigation'
// import { useKeyboardNavigation } from '@/hooks/use-keyboard'
// import { FancyAutomationBox } from '@/components/global/fancy/fancy-automation-box'

// type Keyword = {
//   id: string;
//   automationId: string | null;
//   word: string;
// };

// type Listener = {
//   id: string;
//   listener: string;
//   automationId: string;
//   prompt: string;
//   commentReply: string | null;
//   dmCount: number;
//   commentCount: number;
// };

// interface Automation {
//   id: string;
//   name: string;
//   active: boolean;
//   keywords: Keyword[];
//   createdAt: Date;
//   listener: Listener | null;
// }

// const Search = () => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [automations, setAutomations] = useState<Automation[]>([])
//   const [filteredAutomations, setFilteredAutomations] = useState<Automation[]>([])
//   const [isOpen, setIsOpen] = useState(false)
//   const inputRef = useRef<HTMLInputElement>(null)
//   const listRef = useRef<HTMLUListElement>(null)
//   const searchContainerRef = useRef<HTMLDivElement>(null)
//   const router = useRouter()
//   const pathname = usePathname()

//   const { selectedIndex, setSelectedIndex } = useKeyboardNavigation(filteredAutomations, (automation) => {
//     router.push(`${pathname}/${automation.id}`)
//     setIsOpen(false)
//   })

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
//       setSelectedIndex(-1)
//       setIsOpen(searchTerm.length > 0)
//     }, 300),
//     [automations, setSelectedIndex]
//   )

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value
//     setSearchTerm(value)
//     debouncedSearch(value)
//   }

//   useEffect(() => {
//     if (selectedIndex !== -1 && listRef.current) {
//       const selectedElement = listRef.current.children[selectedIndex] as HTMLLIElement
//       selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
//     }
//   }, [selectedIndex])

//   const handleDelete = useCallback((id: string) => {
//     // Implement delete functionality here
//     console.log(`Delete automation with id: ${id}`)
//   }, [])

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
//         setIsOpen(false)
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [])

//   return (
//     <div className="relative w-full max-w-4xl mx-auto" ref={searchContainerRef}>
//       <div className="relative">
//         <Input
//           ref={inputRef}
//           placeholder="Search automation by name"
//           className="pl-10 pr-4 py-2 w-full border-2 border-[#545454] rounded-full focus:outline-none focus:ring-2 focus:ring-[#3352CC] focus:border-transparent bg-[#1D1D1D] text-white"
//           value={searchTerm}
//           onChange={handleSearch}
//           onFocus={() => setIsOpen(true)}
//         />
//         <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#545454]" size={20} />
//         {searchTerm && (
//           <Button
//             className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-transparent hover:bg-[#2A2A2A]"
//             onClick={() => {
//               setSearchTerm('')
//               setFilteredAutomations([])
//               setIsOpen(false)
//               inputRef.current?.focus()
//             }}
//           >
//             <X size={16} className="text-[#545454]" />
//           </Button>
//         )}
//       </div>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//             className="absolute z-10 w-full mt-2 bg-[#1D1D1D] border-2 border-[#545454] rounded-lg shadow-lg"
//           >
//             <ul
//               ref={listRef}
//               className="max-h-[60vh] overflow-y-auto"
//             >
//               {filteredAutomations.map((automation, index) => (
//                 <motion.li
//                   key={automation.id}
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.2, delay: index * 0.05 }}
//                   className={`p-2 ${
//                     selectedIndex === index
//                       ? 'bg-[#2A2A2A]'
//                       : 'hover:bg-[#2A2A2A]'
//                   }`}
//                   onMouseEnter={() => setSelectedIndex(index)}
//                 >
//                   <FancyAutomationBox
//                     automation={automation}
//                     onDelete={() => handleDelete(automation.id)}
//                     pathname={pathname}
//                   />
//                 </motion.li>
//               ))}
//               {filteredAutomations.length === 0 && searchTerm && (
//                 <li className="px-4 py-2 text-[#9B9CA0]">No automations found</li>
//               )}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// export default Search

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { SearchIcon, X } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { getAllAutomations } from '@/actions/automations';
// import debounce from 'lodash.debounce';
// import { useRouter, usePathname } from 'next/navigation';
// import { useKeyboardNavigation } from '@/hooks/use-keyboard';
// import { FancyAutomationBox } from '@/components/global/fancy/fancy-automation-box';

// type Keyword = {
//   id: string;
//   automationId: string | null;
//   word: string;
// };

// type Listener = {
//   id: string;
//   listener: string;
//   automationId: string;
//   prompt: string;
//   commentReply: string | null;
//   dmCount: number;
//   commentCount: number;
// };

// interface Automation {
//   id: string;
//   name: string;
//   active: boolean;
//   keywords: Keyword[];
//   createdAt: Date;
//   listener: Listener | null;
// }

// const Search = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [automations, setAutomations] = useState<Automation[]>([]);
//   const [filteredAutomations, setFilteredAutomations] = useState<Automation[]>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const listRef = useRef<HTMLUListElement>(null);
//   const searchContainerRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();
//   const pathname = usePathname();

//   const { selectedIndex, setSelectedIndex } = useKeyboardNavigation(filteredAutomations, (automation) => {
//     router.push(`${pathname}/${automation.id}`);
//     setIsOpen(false);
//   });

//   useEffect(() => {
//     const fetchAutomations = async () => {
//       const result = await getAllAutomations();
//       if (result.status === 200) {
//         setAutomations(result.data);
//       }
//     };

//     fetchAutomations();
//   }, []);

//   const debouncedSearch = useCallback(
//     debounce((searchTerm: string) => {
//       const filtered = automations.filter((automation) =>
//         automation.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredAutomations(filtered);
//       setSelectedIndex(-1);
//       setIsOpen(searchTerm.length > 0);
//     }, 300),
//     [automations, setSelectedIndex]
//   );

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     debouncedSearch(value);
//   };

//   useEffect(() => {
//     if (selectedIndex !== -1 && listRef.current) {
//       const selectedElement = listRef.current.children[selectedIndex] as HTMLLIElement;
//       selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//     }
//   }, [selectedIndex]);

//   const handleDelete = useCallback((id: string) => {
//     console.log(`Delete automation with id: ${id}`);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div
//       className="flex overflow-hidden gap-x-2 border-[1px] border-[#3352CC] rounded-full px-4 py-1 items-center flex-1 relative"
//       ref={searchContainerRef}
//     >
//       <SearchIcon color="#3352CC" />
//       <Input
//         ref={inputRef}
//         placeholder="Search automation by name"
//         className="border-none outline-none ring-0 focus:ring-0 flex-1"
//         value={searchTerm}
//         onChange={handleSearch}
//         onFocus={() => setIsOpen(true)}
//       />
//       {searchTerm && (
//         <Button
//           className="absolute right-2 p-1 rounded-full bg-transparent hover:bg-[#E5E5E5]"
//           onClick={() => {
//             setSearchTerm('');
//             setFilteredAutomations([]);
//             setIsOpen(false);
//             inputRef.current?.focus();
//           }}
//         >
//           <X size={16} color="#3352CC" />
//         </Button>
//       )}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//             className="absolute z-10 w-full mt-2 bg-white border-[1px] border-[#3352CC] rounded-lg shadow-lg"
//           >
//             <ul ref={listRef} className="max-h-[60vh] overflow-y-auto">
//               {filteredAutomations.map((automation, index) => (
//                 <motion.li
//                   key={automation.id}
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.2, delay: index * 0.05 }}
//                   className={`p-2 ${
//                     selectedIndex === index ? 'bg-[#DDEAFF]' : 'hover:bg-[#F4F8FF]'
//                   }`}
//                   onMouseEnter={() => setSelectedIndex(index)}
//                 >
//                   <FancyAutomationBox
//                     automation={automation}
//                     onDelete={() => handleDelete(automation.id)}
//                     pathname={pathname}
//                   />
//                 </motion.li>
//               ))}
//               {filteredAutomations.length === 0 && searchTerm && (
//                 <li className="px-4 py-2 text-[#9B9CA0]">No automations found</li>
//               )}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Search;


// 'use client'

// import React, { useState, useEffect, useCallback, useRef } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { SearchIcon, X } from 'lucide-react'
// import { Input } from '@/components/ui/input'
// import { getAllAutomations } from '@/actions/automations'
// import debounce from 'lodash.debounce'
// import { useRouter, usePathname } from 'next/navigation'

// type Automation = {
//   id: string
//   name: string
//   active: boolean
// }

// const Search = () => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [automations, setAutomations] = useState<Automation[]>([])
//   const [filteredAutomations, setFilteredAutomations] = useState<Automation[]>([])
//   const [isOpen, setIsOpen] = useState(false)
//   const inputRef = useRef<HTMLInputElement>(null)
//   const listRef = useRef<HTMLUListElement>(null)
//   const router = useRouter()
//   const pathname = usePathname()

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
//       setIsOpen(searchTerm.length > 0)
//     }, 300),
//     [automations]
//   )

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value
//     setSearchTerm(value)
//     debouncedSearch(value)
//   }

//   return (
//     <div className="flex items-center w-full space-x-4">
//       <div className="flex items-center border-2 border-[#3352CC] rounded-full px-4 py-1 flex-1">
//         <SearchIcon className="text-[#3352CC] mr-2" />
//         <Input
//           ref={inputRef}
//           placeholder="Search automation by name"
//           className="w-full border-none focus:ring-0"
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//         {searchTerm && (
//           <button
//             className="ml-2 text-[#3352CC]"
//             onClick={() => {
//               setSearchTerm('')
//               setFilteredAutomations([])
//               setIsOpen(false)
//               inputRef.current?.focus()
//             }}
//           >
//             <X size={20} />
//           </button>
//         )}
//       </div>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//             className="absolute z-10 w-40 mt-4 bg-black border border-[#3352CC] rounded-lg shadow-lg"
//           >
//             <ul
//               ref={listRef}
//               className="max-h-60 overflow-y-auto divide-y divide-[#E0E0E0]"
//             >
//               {filteredAutomations.map((automation, index) => (
//                 <li
//                   key={automation.id}
//                   className="p-2 hover:bg-[#f0f5ff] cursor-pointer text-[#3352CC] text-sm"
//                   onClick={() => {
//                     router.push(`${pathname}/${automation.id}`)
//                     setIsOpen(false)
//                   }}
//                 >
//                   {automation.name}
//                 </li>
//               ))}
//               {filteredAutomations.length === 0 && searchTerm && (
//                 <li className="p-2 text-gray-500 text-sm">No automations found</li>
//               )}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// export default Search

'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SearchIcon, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { getAllAutomations } from '@/actions/automations'
import debounce from 'lodash.debounce'
import { useRouter, usePathname } from 'next/navigation'

type Automation = {
  id: string
  name: string
  active: boolean
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [automations, setAutomations] = useState<Automation[]>([])
  const [filteredAutomations, setFilteredAutomations] = useState<Automation[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const router = useRouter()
  const pathname = usePathname()

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
      setIsOpen(searchTerm.length > 0)
    }, 300),
    [automations]
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    debouncedSearch(value)
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center border-2 border-[#3352CC] rounded-full px-4 py-1 bg-[#0A0A0B]">
        <SearchIcon className="text-[#3352CC] mr-2" />
        <Input
          ref={inputRef}
          placeholder="Search automation by name"
          className="w-full border-none focus:ring-0"
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm && (
          <button
            className="ml-2 text-[#3352CC] hover:text-[#2241B8] transition-colors"
            onClick={() => {
              setSearchTerm('')
              setFilteredAutomations([])
              setIsOpen(false)
              inputRef.current?.focus()
            }}
          >
            <X size={20} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden"
          >
            <ul
              ref={listRef}
              className="max-h-60 overflow-y-auto divide-y divide-gray-700 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800"
            >
              {filteredAutomations.map((automation, index) => (
                <li
                  key={automation.id}
                  className="p-3 hover:bg-gray-800 cursor-pointer text-gray-200 text-sm transition-colors duration-150 ease-in-out flex items-center space-x-3"
                  onClick={() => {
                    router.push(`${pathname}/${automation.id}`)
                    setIsOpen(false)
                  }}
                >
                  <span className={`w-2 h-2 rounded-full ${automation.active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span>{automation.name}</span>
                </li>
              ))}
              {filteredAutomations.length === 0 && searchTerm && (
                <li className="p-3 text-gray-400 text-sm">No automations found</li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Search

