'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface AnimatedFeatureCardProps {
  title: string
  description: string
  image: string
}

export const AnimatedFeatureCard: React.FC<AnimatedFeatureCardProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-20 h-20 mx-auto mb-4"
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <Image src={image} alt={title} width={80} height={80} />
      </motion.div>
      <h3 className="text-xl font-semibold mb-2 text-blue-600">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

