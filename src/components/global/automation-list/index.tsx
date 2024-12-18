'use client'
import { usePaths } from '@/hooks/user-nav'
//import { cn } from '@/lib/utils'
import { cn, getMonth } from '@/lib/utils'
import Link from 'next/link'
import React, { useMemo } from 'react'
import GradientButton from '../gradient-button'
import { Button } from '@/components/ui/button'
import { useQueryAutomations } from '@/hooks/user-queries'
import CreateAutomation from '../create-automation'
import { useMutationDataState } from '@/hooks/use-mutation-data'
import { useAutomationPosts } from '@/hooks/use-automations'
// import { useMutation } from '@/hooks/use-mutation-data' // Highlighted: Import useMutation hook

type Props = {
  id: string
}

const AutomationList = ({ id }: Props) => {
  const { data, refetch } = useQueryAutomations() // Highlighted: Refetch function for updated data
  // const { data } = useQueryAutomations()
  const{deleteMutation} = useAutomationPosts(id)

  const { latestVariable } = useMutationDataState(['create-automation'])
  console.log(latestVariable)
  const { pathname } = usePaths()

  
  // const optimisticUiData = useMemo(() => {
  //   if ((latestVariable && latestVariable?.variables &&  data)) {
  //     const test = [latestVariable.variables, ...data.data]
  //     return { data: test }
  //   }
  //   return data || { data: [] }
  // }, [latestVariable, data])

  // if (data?.status !== 200 || data.data.length <= 0) {
  //   return (
  //     <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
  //       <h3 className="text-lg text-gray-400">No Automations Yet </h3>
  //       <CreateAutomation />
  //     </div>
  //   )
  // }
  // Optimistic UI Update
  const optimisticUiData = useMemo(() => {
    if (latestVariable?.variables && data) {
      const test = [latestVariable.variables, ...data.data]
      return { data: test }
    }
    return data || { data: [] }
  }, [latestVariable, data])

  if (data?.status !== 200 || data.data.length <= 0) {
    return (
      <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
        <h3 className="text-lg text-gray-400">No Automations Yet</h3>
        <CreateAutomation />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-3">
      {optimisticUiData.data!.map((automation) => (
        // <Link
        //   href={`${pathname}/${automation.id}`}
        //   key={automation.id}
          
        // >
          <div className="bg-[#1D1D1D] hover:opacity-80 transition duration-100 rounded-xl p-5 border-[1px] radial--gradient--automations flex border-[#545454]">
          <div className="flex flex-col flex-1 items-start">
            <h2 className="text-xl font-semibold">{automation.name}</h2>
            <p className="text-[#9B9CA0] text-sm font-light mb-2">
              This automtion is for comments
            </p>

            {automation.keywords.length > 0 ? (
              <div className="flex gap-x-2 flex-wrap mt-3">
                {
                  //@ts-ignore
                  automation.keywords.map((keyword, key) => (
                    <div
                      key={keyword.id}
                      className={cn(
                        'rounded-full px-4 py-1 capitalize',
                        (0 + 1) % 1 == 0 &&
                          'bg-keyword-green/15 border-2 border-keyword-green',
                        (1 + 1) % 2 == 0 &&
                          'bg-keyword-purple/15 border-2 border-keyword-purple',
                        (2 + 1) % 3 == 0 &&
                          'bg-keyword-yellow/15 border-2 border-keyword-yellow',
                        (3 + 1) % 4 == 0 &&
                          'bg-keyword-green/15 border-2 border-keyword-green'
                      )}
                    >
                      {keyword.word}
                    </div>
                  ))
                }
              </div>
            ) : (
              <div className="rounded-full border-2 mt-3 border-dashed border-white/60 px-3 py-1">
                <p className="text-sm text-[#bfc0c3]">No Keywords</p>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between">
            {/* <p className="capitalize text-sm font-light text-[#9B9CA0]">
              {getMonth(automation.createdAt.getUTCMonth() + 1)}{' '}
              {automation.createdAt.getUTCDate() === 1
                ? `${automation.createdAt.getUTCDate()}st`
                : `${automation.createdAt.getUTCDate()}th`}{' '}
              {automation.createdAt.getUTCFullYear()}
              {automation.createdAt.getUTCTime() }
            </p> */}
            <p className="capitalize text-sm font-light text-[#9B9CA0]">
              {getMonth(automation.createdAt.getUTCMonth() + 1)}{' '}
              {automation.createdAt.getUTCDate() === 1
                ? `${automation.createdAt.getUTCDate()}st`
                : `${automation.createdAt.getUTCDate()}th`}{' '}
              {automation.createdAt.getUTCFullYear()},{' '}
              {String(automation.createdAt.getUTCHours()).padStart(2, '0')}:
              {String(automation.createdAt.getUTCMinutes()).padStart(2, '0')}:
              {String(automation.createdAt.getUTCSeconds()).padStart(2, '0')} UTC
            </p>

            {/* Delete Button */}
            {/* <Button
              className="bg-red-500 hover:bg-red-600 text-white mt-3"
              // onClick={() => deleteAutomation.mutate(automation.id)} // Highlighted: Delete function
              onClick={() => deleteMutation({ id: automation.id })}
            >
              Delete
            </Button> */}
            <Button
              className="bg-red-500 hover:bg-red-600 text-white mt-3 mb-2"
              onClick={async () => {
                try {
                  await deleteMutation({ id: automation.id }); // Perform the deletion
                  refetch(); // Refresh the list
                } catch (error) {
                  console.error('Error deleting automation:', error);
                }
              }}
            >
              Delete
            </Button>


            {automation.listener?.listener === 'SMARTAI' ? (
              <GradientButton
                type="BUTTON"
                className="w-full bg-background-80 text-white hover:bg-background-80"
              >
                Smart AI
              </GradientButton>
            ) : (
              <Button className="bg-background-80 hover:bg-background-80 text-white">
                Standard
              </Button>
            )}
          </div>
          </div>
        // </Link>
      ))}
    </div>
  )
}

export default AutomationList
// import React from 'react'

// type Props = {}

// const AutomationList = (props: Props) => {

//   const { pathname } = usePaths()
//   return (

//     <div className="flex flex-col gap-y-3">
//       <Link href={`${pathname}/${1234}`}
//       className="bg-[#1D1D1D] hover:opacity-80 transition duration-100 rounded-xl p-5 border-[1px] radial--gradient--automations flex border-[#545454]"
      
//       >
//         <div className="flex flex-col flex-1 items-start">
//              <h2 className="text-xl font-semibold">Automation Name</h2>
//              <p className="text-[#9B9CA0] text-sm font-light mb-2">
//                This is from the comment
//              </p>
//              <div className="flex gap-x-2 flex-wrap mt-3">

//              <div
//                 className={cn(
//                   'rounded-full px-4 py-1 capitalize',
//                   (0 + 1) % 1 == 0 &&
//                     'bg-keyword-green/15 border-2 border-keyword-green',
//                   (1 + 1) % 2 == 0 &&
//                     'bg-keyword-purple/15 border-2 border-keyword-purple',
//                   (2 + 1) % 3 == 0 &&
//                     'bg-keyword-yellow/15 border-2 border-keyword-yellow',
//                   (3 + 1) % 4 == 0 &&
//                     'bg-keyword-red/15 border-2 border-keyword-red'
//                 )}
//               >
//                 KEYWORD
//               </div>
//              </div>
//              <div className="rounded-full border-2 mt-3 border-dashed border-white/60 px-3 py-1">
//                <p className="text-sm text-[#bfc0c3]">No Keywords</p>
//              </div>
//         </div>
//         <div className="flex flex-col justify-between">
//           <p className="capitalize text-sm font-light text-[#9B9CA0]">December 2024</p>
//           <GradientButton
//                 type="BUTTON"
//                 className="w-full bg-background-80 text-white hover:bg-background-80"
//               >
//                 Smart AI
//               </GradientButton>
//               <Button className="bg-background-80 hover:bg-background-80 text-white">
//                  Standard
//                </Button>
//           </div>   
//       </Link>
//     </div>
    
//   )
// }

// export default AutomationList