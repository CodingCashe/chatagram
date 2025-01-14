import { motion } from 'framer-motion'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

type ErrorMessageProps = {
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null

  return (
    <motion.p
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="mt-1 text-xs text-red-500"
    >
      {error.message as React.ReactNode}
    </motion.p>
  )
}

