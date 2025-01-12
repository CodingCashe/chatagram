import { useListener } from '@/hooks/use-automations'
import React from 'react'
import TriggerButton from '../trigger-button'
import { AUTOMATION_LISTENERS } from '@/constants/automation'
import { SubscriptionPlan } from '../../subscription-plan'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'

type Props = {
  id: string
}

const ThenAction = ({ id }: Props) => {
  const {
    onSetListener,
    listener: Listener,
    onFormSubmit,
    register,
    isPending,
  } = useListener(id)

  return (
    <TriggerButton label="Then">
      <div className="flex flex-col gap-y-2 ">
        {AUTOMATION_LISTENERS.map((listener) =>
          listener.type === 'SMARTAI' ? (
            <SubscriptionPlan
              key={listener.type}
              type="PRO"
            >
              <div
                onClick={() => onSetListener(listener.type)}
                key={listener.id}
                className={cn(
                  Listener === listener.type
                    ? 'bg-gradient-to-br from-[#3352CC] to-[#1C2D70]'
                    : 'bg-background-80',
                  'p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100'
                )}
              >
                <div className="flex gap-x-2 items-center">
                  {listener.icon}
                  <p>{listener.label}</p>
                </div>
                <p>{listener.description}</p>
              </div>
            </SubscriptionPlan>
          ) : (
            <div
              onClick={() => onSetListener(listener.type)}
              key={listener.id}
              className={cn(
                Listener === listener.type
                  ? 'bg-gradient-to-br from-[#3352CC] to-[#1C2D70]'
                  : 'bg-background-80',
                'p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100'
              )}
            >
              <div className="flex gap-x-2 items-center">
                {listener.icon}
                <p>{listener.label}</p>
              </div>
              <p>{listener.description}</p>
            </div>
          )
        )}
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col gap-y-2"
        >
          <Textarea
            placeholder={
              Listener === 'SMARTAI'
                ? 'Add a prompt that your smart ai can use...'
                : 'Add a message you want send to your customers'
            }
            {...register('prompt')}
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />
          <Input
            {...register('reply')}
            placeholder="Add a reply for comments (Optional)"
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />
          <Button className="bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]">
            <Loader state={isPending}>Add listener</Loader>
          </Button>
        </form>
      </div>
    </TriggerButton>
  )
}

export default ThenAction


// import { useListener } from '@/hooks/use-automations'
// import React from 'react'
// import TriggerButton from '../trigger-button'
// import { AUTOMATION_LISTENERS } from '@/constants/automation'
// import { SubscriptionPlan } from '../../subscription-plan'
// import { cn } from '@/lib/utils'
// import { Textarea } from '@/components/ui/textarea'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import Loader from '../../loader'
// import { motion } from 'framer-motion'

// type Props = {
//   id: string
// }

// const ThenAction = ({ id }: Props) => {
//   const {
//     onSetListener,
//     listener: Listener,
//     onFormSubmit,
//     register,
//     isPending,
//   } = useListener(id)

//   return (
//     <TriggerButton label="Then">
//       <div className="flex flex-col gap-y-4 bg-background-90 p-6 rounded-2xl shadow-xl">
//         {AUTOMATION_LISTENERS.map((listener) =>
//           listener.type === 'SMARTAI' ? (
//             <SubscriptionPlan
//               key={listener.type}
//               type="PRO"
//             >
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => onSetListener(listener.type)}
//                 className={cn(
//                   Listener === listener.type
//                     ? 'bg-gradient-to-br from-[#3352CC] to-[#1C2D70]'
//                     : 'bg-background-80',
//                   'p-4 rounded-xl flex flex-col gap-y-2 cursor-pointer transition-all duration-300 shadow-md'
//                 )}
//               >
//                 <div className="flex gap-x-3 items-center">
//                   {listener.icon}
//                   <p className="font-bold text-lg">{listener.label}</p>
//                 </div>
//                 <p className="text-sm">{listener.description}</p>
//               </motion.div>
//             </SubscriptionPlan>
//           ) : (
//             <motion.div
//               key={listener.type}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => onSetListener(listener.type)}
//               className={cn(
//                 Listener === listener.type
//                   ? 'bg-gradient-to-br from-[#3352CC] to-[#1C2D70]'
//                   : 'bg-background-80',
//                 'p-4 rounded-xl flex flex-col gap-y-2 cursor-pointer transition-all duration-300 shadow-md'
//               )}
//             >
//               <div className="flex gap-x-3 items-center">
//                 {listener.icon}
//                 <p className="font-bold text-lg">{listener.label}</p>
//               </div>
//               <p className="text-sm">{listener.description}</p>
//             </motion.div>
//           )
//         )}
//         <form
//           onSubmit={onFormSubmit}
//           className="flex flex-col gap-y-3 mt-4"
//         >
//           <Textarea
//             placeholder={
//               Listener === 'SMARTAI'
//                 ? 'Add a prompt that your smart AI can use...'
//                 : 'Add a message you want to send to your customers'
//             }
//             {...register('prompt')}
//             className="bg-background-80 outline-none border-none ring-1 ring-indigo-400 focus:ring-2 focus:ring-indigo-500 rounded-lg p-3 transition-all duration-300"
//           />
//           <Input
//             {...register('reply')}
//             placeholder="Add a reply for comments (Optional)"
//             className="bg-background-80 outline-none border-none ring-1 ring-indigo-400 focus:ring-2 focus:ring-indigo-500 rounded-lg p-3 transition-all duration-300"
//           />
//           <Button className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] w-full font-medium text-white hover:from-[#4363DD] hover:to-[#2D3E81] transition-all duration-300 transform hover:scale-105">
//             <Loader state={isPending}>Add listener</Loader>
//           </Button>
//         </form>
//       </div>
//     </TriggerButton>
//   )
// }

// export default ThenAction

