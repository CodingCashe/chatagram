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


// "use client"

// import { Button } from "@/components/ui/button"
// import { useMemo } from "react"
// import Loader from "../loader"
// import { AutomationDuoToneWhite } from "@/icons"
// import { useCreateAutomation } from "@/hooks/use-automations"
// import { v4 } from "uuid"
// import { useRouter } from "next/navigation"
// import { motion } from "framer-motion"

// type Props = {}

// const CreateAutomation = (props: Props) => {
//   const mutationId = useMemo(() => v4(), [])
//   const router = useRouter()

//   const { isPending, mutate } = useCreateAutomation(mutationId)

//   const handleCreateAutomation = () => {
//     mutate(
//       {
//         name: "Untitled",
//         id: mutationId,
//         createdAt: new Date(),
//         keywords: [],
//       },
//       {
//         onSuccess: () => {
//           router.push("/dashboard/automations")
//         },
//       },
//     )
//   }

//   return (
//     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//       <Button
//         className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70] shadow-lg transition-all duration-300 ease-in-out"
//         onClick={handleCreateAutomation}
//       >
//         <Loader state={isPending}>
//           <AutomationDuoToneWhite />
//           <p className="lg:inline hidden">Create Automation</p>
//         </Loader>
//       </Button>
//     </motion.div>
//   )
// }

// export default CreateAutomation

// "use client"

// import { Button } from "@/components/ui/button"
// import { useMemo } from "react"
// import Loader from "../loader"
// import { AutomationDuoToneWhite } from "@/icons"
// import { useCreateAutomation } from "@/hooks/use-automations"
// import { v4 } from "uuid"
// import { useRouter, usePathname } from "next/navigation"
// import { motion } from "framer-motion"

// const CreateAutomation = () => {
//   const mutationId = useMemo(() => v4(), [])
//   const router = useRouter()
//   const pathname = usePathname()

//   const { isPending, mutate } = useCreateAutomation(mutationId)

//   const handleCreateAutomation = () => {
//     // Extract the slug from the pathname
//     const slugMatch = pathname.match(/^\/dashboard\/([^/]+)/)
//     const slug = slugMatch ? slugMatch[1] : ""

//     mutate(
//       {
//         name: "Untitled",
//         id: mutationId,
//         createdAt: new Date(),
//         keywords: [],
//       },
//       {
//         onSuccess: () => {
//           // Redirect to the automations page with the correct slug
//           router.push(`/dashboard/${slug}/automations`)
//         },
//       },
//     )
//   }

//   return (
//     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//       <Button
//         className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70] shadow-lg transition-all duration-300 ease-in-out"
//         onClick={handleCreateAutomation}
//       >
//         <Loader state={isPending}>
//           <AutomationDuoToneWhite className="mr-2" />
//           <p className="lg:inline hidden">Create Automation</p>
//         </Loader>
//       </Button>
//     </motion.div>
//   )
// }

// export default CreateAutomation

// "use client"

// import { Button } from "@/components/ui/button"
// import { useMemo, useState } from "react"
// import Loader from "../loader"
// import { AutomationDuoToneWhite } from "@/icons"
// import { useCreateAutomation } from "@/hooks/use-automations"
// import { v4 } from "uuid"
// import { useRouter, usePathname } from "next/navigation"
// import { motion, AnimatePresence } from "framer-motion"
// import { Check } from "lucide-react"

// const CreateAutomation = () => {
//   const mutationId = useMemo(() => v4(), [])
//   const router = useRouter()
//   const pathname = usePathname()
//   const [showSuccess, setShowSuccess] = useState(false)

//   const { isPending, mutate } = useCreateAutomation(mutationId)

//   const handleCreateAutomation = () => {
//     const slugMatch = pathname.match(/^\/dashboard\/([^/]+)/)
//     const slug = slugMatch ? slugMatch[1] : ""

//     mutate(
//       {
//         name: "Untitled",
//         id: mutationId,
//         createdAt: new Date(),
//         keywords: [],
//       },
//       {
//         onSuccess: () => {
//           setShowSuccess(true)
//           setTimeout(() => {
//             setShowSuccess(false)
//             router.push(`/dashboard/${slug}/automations`)
//           }, 1500) // Redirect after 1.5 seconds
//         },
//       },
//     )
//   }

//   return (
//     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//       <Button
//         className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70] shadow-lg transition-all duration-300 ease-in-out relative overflow-hidden"
//         onClick={handleCreateAutomation}
//         disabled={isPending || showSuccess}
//       >
//         <AnimatePresence mode="wait">
//           {showSuccess ? (
//             <motion.div
//               key="success"
//               initial={{ scale: 0, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="absolute inset-0 flex items-center justify-center bg-green-500"
//             >
//               <Check className="text-white" size={24} />
//             </motion.div>
//           ) : (
//             <motion.div key="button-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//               <Loader state={isPending}>
//                 <AutomationDuoToneWhite />
//                 <p className="lg:inline hidden">Create Automation</p>
//               </Loader>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </Button>
//     </motion.div>
//   )
// }

// export default CreateAutomation

"use client"

import { Button } from "@/components/ui/button"
import { useMemo, useState } from "react"
import Loader from "../loader"
import { AutomationDuoToneWhite } from "@/icons"
import { useCreateAutomation } from "@/hooks/use-automations"
import { v4 } from "uuid"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"

const CreateAutomation = () => {
  const mutationId = useMemo(() => v4(), [])
  const router = useRouter()
  const pathname = usePathname()
  const [showSuccess, setShowSuccess] = useState(false)

  const { isPending, mutate } = useCreateAutomation(mutationId)

  const handleCreateAutomation = () => {
    const slugMatch = pathname.match(/^\/dashboard\/([^/]+)/)
    const slug = slugMatch ? slugMatch[1] : ""

    mutate(
      {
        name: "Untitled",
        id: mutationId,
        createdAt: new Date(),
        keywords: [],
      },
      {
        onSuccess: () => {
          setShowSuccess(true)
          setTimeout(() => {
            setShowSuccess(false)
            router.push(`/dashboard/${slug}/automations`)
          }, 2000) // Redirect after 2 seconds
        },
      },
    )
  }

  const particles = useMemo(() => Array.from({ length: 20 }), [])

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70] shadow-lg transition-all duration-300 ease-in-out relative overflow-hidden"
        onClick={handleCreateAutomation}
        disabled={isPending || showSuccess}
      >
        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 10, stiffness: 100 }}
                className="bg-green-500 rounded-full p-2"
              >
                <Check className="text-white" size={24} />
              </motion.div>
              {particles.map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                    opacity: 0,
                    scale: Math.random() * 3 + 1,
                  }}
                  transition={{ duration: 1, delay: index * 0.02 }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="button-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center"
            >
              <Loader state={isPending}>
                <AutomationDuoToneWhite />
                <span className="lg:inline hidden">Create Automation</span>
              </Loader>
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  )
}

export default CreateAutomation

