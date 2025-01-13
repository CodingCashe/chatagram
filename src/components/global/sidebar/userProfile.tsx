// 'use client'

// import React, { useState, useRef, useEffect, useCallback } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useSpring, animated } from 'react-spring'
// import { useDrag } from 'react-use-gesture'
// import { useUser } from '@clerk/nextjs'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { LogOut, Camera, X, Check, ChevronUp, ChevronDown } from 'lucide-react'
// import anime from 'animejs'

// interface EnhancedUserProfileProps {
//   onSignOut: () => void
// }

// const EnhancedUserProfile: React.FC<EnhancedUserProfileProps> = ({ onSignOut }) => {
//   const { user } = useUser()
//   const [isExpanded, setIsExpanded] = useState(false)
//   const [isEditing, setIsEditing] = useState(false)
//   const [newName, setNewName] = useState(user ? `${user.firstName} ${user.lastName}` : '')
//   const [newAvatar, setNewAvatar] = useState<string | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const [showParticles, setShowParticles] = useState(false)
//   const particlesRef = useRef<HTMLDivElement>(null)

//   const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))

//   const bindDrag = useDrag(({ down, movement: [mx, my] }) => {
//     set({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
//   })

//   const handleExpandToggle = () => setIsExpanded(!isExpanded)

//   const handleEditToggle = () => {
//     setIsEditing(!isEditing)
//     if (!isEditing) {
//       setNewName(user ? `${user.firstName} ${user.lastName}` : '')
//       setNewAvatar(null)
//     }
//   }

//   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewName(e.target.value)
//   }

//   const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setNewAvatar(reader.result as string)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSave = () => {
//     // Here you would typically update the user's information in your backend
//     console.log('Saving new name:', newName)
//     console.log('Saving new avatar:', newAvatar)
//     setIsEditing(false)
//   }

//   const createParticle = useCallback((x: number, y: number) => {
//     const particle = document.createElement('div')
//     particle.className = 'absolute w-1 h-1 bg-blue-400 rounded-full'
//     particle.style.left = `${x}px`
//     particle.style.top = `${y}px`
//     particlesRef.current?.appendChild(particle)

//     anime({
//       targets: particle,
//       x: anime.random(-50, 50),
//       y: anime.random(-50, 50),
//       opacity: [1, 0],
//       duration: 1000,
//       easing: 'easeOutExpo',
//       complete: () => particle.remove()
//     })
//   }, [])

//   useEffect(() => {
//     if (showParticles && particlesRef.current) {
//       const interval = setInterval(() => {
//         const rect = particlesRef.current!.getBoundingClientRect()
//         createParticle(
//           anime.random(0, rect.width),
//           anime.random(0, rect.height)
//         )
//       }, 50)
//       return () => clearInterval(interval)
//     }
//   }, [showParticles, createParticle])

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (isExpanded && !(event.target as Element).closest('.user-profile')) {
//         setIsExpanded(false)
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [isExpanded])

//   if (!user) return null

//   return (
//     <animated.div
//       style={{ x, y }}
//       {...bindDrag()}
//       className="user-profile relative cursor-move"
//     >
//       <motion.div
//         className="flex items-center p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
//         onClick={handleExpandToggle}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <Avatar className="h-10 w-10 mr-3">
//           <AvatarImage src={newAvatar || user.imageUrl || "https://github.com/shadcn.png"} />
//           <AvatarFallback>{user.firstName?.[0]}{user.lastName?.[0]}</AvatarFallback>
//         </Avatar>
//         <span className="text-sm font-medium text-gray-200 flex-grow">{newName}</span>
//         {isExpanded ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
//       </motion.div>

//       <AnimatePresence>
//         {isExpanded && (
//           <motion.div
//             className="absolute bottom-full left-0 w-64 bg-gray-900 rounded-lg shadow-lg overflow-hidden mb-2"
//             initial={{ opacity: 0, y: 20, scale: 0.9 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 20, scale: 0.9 }}
//             transition={{ type: 'spring', stiffness: 500, damping: 30 }}
//           >
//             <div className="p-4">
//               <div 
//                 className="relative mb-4" 
//                 onMouseEnter={() => setShowParticles(true)}
//                 onMouseLeave={() => setShowParticles(false)}
//               >
//                 <Avatar className="h-20 w-20 mx-auto">
//                   <AvatarImage src={newAvatar || user.imageUrl || "https://github.com/shadcn.png"} />
//                   <AvatarFallback>{user.firstName?.[0]}{user.lastName?.[0]}</AvatarFallback>
//                 </Avatar>
//                 {isEditing && (
//                   <Button
//                     size="icon"
//                     variant="secondary"
//                     className="absolute bottom-0 right-0 rounded-full"
//                     onClick={() => fileInputRef.current?.click()}
//                   >
//                     <Camera className="h-4 w-4" />
//                   </Button>
//                 )}
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   className="hidden"
//                   accept="image/*"
//                   onChange={handleAvatarChange}
//                 />
//                 <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
//               </div>
//               {isEditing ? (
//                 <Input
//                   value={newName}
//                   onChange={handleNameChange}
//                   className="mb-4 bg-gray-800 border-gray-700 text-white"
//                 />
//               ) : (
//                 <h3 className="text-lg font-semibold text-center text-white mb-4">{newName}</h3>
//               )}
//               <div className="flex justify-center space-x-2">
//                 {isEditing ? (
//                   <>
//                     <Button size="sm" onClick={handleSave}>
//                       <Check className="h-4 w-4 mr-2" />
//                       Save
//                     </Button>
//                     <Button size="sm" variant="destructive" onClick={handleEditToggle}>
//                       <X className="h-4 w-4 mr-2" />
//                       Cancel
//                     </Button>
//                   </>
//                 ) : (
//                   <Button size="sm" onClick={handleEditToggle}>
//                     Edit Profile
//                   </Button>
//                 )}
//               </div>
//             </div>
//             <div className="bg-gray-800 p-4">
//               <Button variant="ghost" className="w-full justify-start text-red-400" onClick={onSignOut}>
//                 <LogOut className="mr-2 h-4 w-4" />
//                 Log out
//               </Button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </animated.div>
//   )
// }

// export default EnhancedUserProfile

'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Camera, LogOut, ChevronUp, ChevronDown } from 'lucide-react'

interface EnhancedUserProfileProps {
  onSignOut: () => void
}

const EnhancedUserProfile: React.FC<EnhancedUserProfileProps> = ({ onSignOut }) => {
  const { user } = useUser()
  const [isExpanded, setIsExpanded] = useState(false)
  const [avatar, setAvatar] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExpandToggle = () => setIsExpanded(!isExpanded)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isExpanded && !(event.target as Element).closest('.user-profile')) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isExpanded])

  if (!user) return null

  return (
    <div className="user-profile w-full">
      <div
        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
        onClick={handleExpandToggle}
      >
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={avatar || user.imageUrl || "https://github.com/shadcn.png"} />
            <AvatarFallback>{user.firstName?.[0]}{user.lastName?.[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-gray-200">{`${user.firstName} ${user.lastName}`}</span>
        </div>
        {isExpanded ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
      </div>

      {isExpanded && (
        <div className="mt-2 bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4">
            <div className="relative mb-4">
              <Avatar className="h-20 w-20 mx-auto">
                <AvatarImage src={avatar || user.imageUrl || "https://github.com/shadcn.png"} />
                <AvatarFallback>{user.firstName?.[0]}{user.lastName?.[0]}</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-4 w-4" />
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
            <h3 className="text-lg font-semibold text-center text-white mb-4">{`${user.firstName} ${user.lastName}`}</h3>
          </div>
          <div className="bg-gray-800 p-4">
            <Button variant="ghost" className="w-full justify-start text-red-400" onClick={onSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default EnhancedUserProfile

