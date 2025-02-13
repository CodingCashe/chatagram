import { motion } from "framer-motion"

const FancyLoader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <motion.div
        className="w-16 h-16 border-4 border-primary rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
          borderRadius: ["50%", "25%", "50%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </div>
  )
}

export default FancyLoader

