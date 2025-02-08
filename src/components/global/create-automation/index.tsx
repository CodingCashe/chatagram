// 'use client'

// import { Button } from '@/components/ui/button'
// import React, { useMemo } from 'react'
// import Loader from '../loader'
// import { AutomationDuoToneWhite } from '@/icons'
// import { useCreateAutomation } from '@/hooks/use-automations'
// import { v4 } from 'uuid'

// type Props = {}

// const CreateAutomation = (props: Props) => {
//   const mutationId = useMemo(() => v4(), [])

//   console.log(mutationId)
//   const { isPending, mutate } = useCreateAutomation(mutationId)

//   return (
//     <Button
//       className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70]"
//       onClick={() =>
//         mutate({
//           name: 'Untitled',
//           id: mutationId,
//           createdAt: new Date(),
//           keywords: [],
          
//         })
//       }
//     >
//       <Loader state={isPending}>
//         <AutomationDuoToneWhite />
//         <p className="lg:inline hidden">Create Automation</p>
//       </Loader>
//     </Button>
//   )
// }

// export default CreateAutomation


"use client"

import { Button } from "@/components/ui/button"
import { useMemo } from "react"
import Loader from "../loader"
import { AutomationDuoToneWhite } from "@/icons"
import { useCreateAutomation } from "@/hooks/use-automations"
import { v4 } from "uuid"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

type Props = {}

const CreateAutomation = (props: Props) => {
  const mutationId = useMemo(() => v4(), [])
  const router = useRouter()

  const { isPending, mutate } = useCreateAutomation(mutationId)

  const handleCreateAutomation = () => {
    mutate(
      {
        name: "Untitled",
        id: mutationId,
        createdAt: new Date(),
        keywords: [],
      },
      {
        onSuccess: () => {
          router.push("/dashboard/automations")
        },
      },
    )
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70] shadow-lg transition-all duration-300 ease-in-out"
        onClick={handleCreateAutomation}
      >
        <Loader state={isPending}>
          <AutomationDuoToneWhite />
          <p className="lg:inline hidden">Create Automation</p>
        </Loader>
      </Button>
    </motion.div>
  )
}

export default CreateAutomation

