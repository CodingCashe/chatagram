
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

'use client'

import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import React, { useState, useEffect, useCallback } from 'react'
import { getAllAutomations } from '@/actions/automations'
import debounce from 'lodash.debounce'

type Automation = {
  id: string
  name: string
  // Add other relevant fields
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [automations, setAutomations] = useState<Automation[]>([])
  const [filteredAutomations, setFilteredAutomations] = useState<Automation[]>([])

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
    }, 300),
    [automations]
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    debouncedSearch(value)
  }

  return (
    <div className="flex flex-col">
      <div className="flex overflow-hidden gap-x-2 border-[1px] border-[#3352CC] rounded-full px-4 py-1 items-center flex-1">
        <SearchIcon color="#3352CC" />
        <Input
          placeholder="Search automation by name"
          className="border-none outline-none ring-0 focus:ring-0 flex-1"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {searchTerm && (
        <ul className="mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredAutomations.map(automation => (
            <li key={automation.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              {automation.name}
            </li>
          ))}
          {filteredAutomations.length === 0 && (
            <li className="px-4 py-2 text-gray-500">No automations found</li>
          )}
        </ul>
      )}
    </div>
  )
}

export default Search

