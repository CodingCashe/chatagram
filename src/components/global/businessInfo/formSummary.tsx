// import { motion } from 'framer-motion'
// import { Button } from "@/components/ui/button"

// type FormSummaryProps = {
//   data: any
//   onEdit: () => void
//   onConfirm: () => void
// }

// export function FormSummary({ data, onEdit, onConfirm }: FormSummaryProps) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-6"
//     >
//       <h2 className="text-2xl font-bold mb-4">Form Summary</h2>
//       {Object.entries(data).map(([key, value]) => (
//         <div key={key} className="bg-gray-800 p-4 rounded-lg">
//           <h3 className="text-lg font-semibold mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
//           <p>{value as string}</p>
//         </div>
//       ))}
//       <div className="flex justify-center space-x-4 mt-6">
//         <Button onClick={onEdit} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
//           Edit
//         </Button>
//         <Button onClick={onConfirm} className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
//           Confirm
//         </Button>
//       </div>
//     </motion.div>
//   )
// }

import { Button } from "@/components/ui/button"
import { FormSchema } from "./businessInfo"

export interface FormSummaryProps {
  data: FormSchema;
  onEdit?: () => void;
  onConfirm?: () => void;
}

export function FormSummary({ data, onEdit, onConfirm }: FormSummaryProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Form Summary</h2>
      <div>
        <strong>Business Name:</strong> {data.businessName}
      </div>
      <div>
        <strong>Business Type:</strong> {data.businessType}
      </div>
      <div>
        <strong>Business Description:</strong> {data.businessDescription}
      </div>
      <div>
        <strong>Industry:</strong> {data.industry}
      </div>
      <div>
        <strong>Instagram Handle:</strong> {data.instagramHandle}
      </div>
      <div>
        <strong>Welcome Message:</strong> {data.welcomeMessage}
      </div>
      <div>
        <strong>Response Language:</strong> {data.responseLanguage}
      </div>
      <div>
        <strong>Business Hours:</strong> {data.businessHours}
      </div>
      <div>
        <strong>Promotion Message:</strong> {data.promotionMessage}
      </div>
      <div>
        <strong>Auto Reply Enabled:</strong> {data.autoReplyEnabled ? 'Yes' : 'No'}
      </div>
      {(onEdit || onConfirm) && (
        <div className="flex gap-4">
          {onEdit && <Button onClick={onEdit}>Edit</Button>}
          {onConfirm && <Button onClick={onConfirm}>Confirm</Button>}
        </div>
      )}
    </div>
  )
}

