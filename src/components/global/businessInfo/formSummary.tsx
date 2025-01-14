import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

type FormSummaryProps = {
  data: any
  onEdit: () => void
  onConfirm: () => void
}

export function FormSummary({ data, onEdit, onConfirm }: FormSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4">Form Summary</h2>
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
          <p>{value as string}</p>
        </div>
      ))}
      <div className="flex justify-center space-x-4 mt-6">
        <Button onClick={onEdit} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          Edit
        </Button>
        <Button onClick={onConfirm} className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          Confirm
        </Button>
      </div>
    </motion.div>
  )
}

