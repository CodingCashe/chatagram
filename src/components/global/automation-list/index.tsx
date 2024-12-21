'use client'
import React, { useMemo, useEffect, useState } from 'react';
import { usePaths } from '@/hooks/user-nav';
import { Button } from '@/components/ui/button';
import { useQueryAutomations } from '@/hooks/user-queries';
import CreateAutomation from '../create-automation';
import { useMutationDataState } from '@/hooks/use-mutation-data';
import { useAutomationPosts } from '@/hooks/use-automations';
import { FancyAutomationBox } from '../fancy/fancy-automation-box';

type Keyword = {
  id: string;
  automationId: string | null;
  word: string;
};

type Listener = {
  id: string;
  listener: string;
  automationId: string;
  prompt: string;
  commentReply: string | null;
  dmCount: number;
  commentCount: number;
};

type Automation = {
  id: string;
  name: string;
  active: boolean;
  keywords: Keyword[];
  createdAt: Date;
  listener: Listener | null;
};

type Props = {
  id: string;
};

const AutomationList = ({ id }: Props) => {
  const { data, refetch } = useQueryAutomations();
  const { deleteMutation } = useAutomationPosts(id);
  const { latestVariable } = useMutationDataState(['create-automation']);
  const { pathname } = usePaths();
 
  const [automations, setAutomations] = useState<Automation[]>(data?.data || []);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAutomationId, setSelectedAutomationId] = useState<string | null>(null);

  useEffect(() => {
    if (data?.data) {
      setAutomations(data.data);
    }
  }, [data]);

  const handleDelete = (automationId: string) => {
    deleteMutation(
      { id: automationId },
      {
        onSuccess: () => {
          console.log('Automation deleted successfully');
          setAutomations((prev) => prev.filter((a) => a.id !== automationId));
        },
        onError: (error) => {
          console.error('Error deleting automation:', error);
        },
      }
    );
  };

  const optimisticUiData = useMemo(() => {
    if (latestVariable?.variables && data) {
      const test = [latestVariable.variables, ...automations];
      return { data: test as Automation[] };
    }
    return { data: automations };
  }, [latestVariable, automations]);

  const activeAutomations = optimisticUiData.data.filter(automation => automation.active);
  const inactiveAutomations = optimisticUiData.data.filter(automation => !automation.active);

  if (!automations.length) {
    return (
      <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
        <h3 className="text-lg text-gray-400">No Automations Yet</h3>
        <CreateAutomation />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your live automations</h2>
        {activeAutomations.length > 0 ? (
          <div className="flex flex-col gap-y-6">
            {activeAutomations.map((automation) => (
              <FancyAutomationBox
                key={automation.id}
                automation={automation}
                onDelete={() => {
                  setSelectedAutomationId(automation.id);
                  setShowConfirmModal(true);
                }}
                pathname={pathname ||'/'}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No active automations. Activate an automation to see it here.</p>
        )}
      </div>

      {inactiveAutomations.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Inactive automations</h2>
          <div className="flex flex-col gap-y-6">
            {inactiveAutomations.map((automation) => (
              <FancyAutomationBox
                key={automation.id}
                automation={automation}
                onDelete={() => {
                  setSelectedAutomationId(automation.id);
                  setShowConfirmModal(true);
                }}
                pathname={pathname ||'/'}
              />
            ))}
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-red-500 to-pink-500 p-6 rounded-lg text-white shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="text-sm mb-6">Are you sure you want to delete this automation?</p>
            <div className="flex justify-end gap-3">
              <Button
                className="bg-gray-300 text-black hover:bg-gray-400"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={() => {
                  if (selectedAutomationId) {
                    handleDelete(selectedAutomationId);
                  }
                  setShowConfirmModal(false);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutomationList;



// 'use client'
// import { usePaths } from '@/hooks/user-nav';
// import React, { useMemo, useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { useQueryAutomations } from '@/hooks/user-queries';
// import CreateAutomation from '../create-automation';
// import { useMutationDataState } from '@/hooks/use-mutation-data';
// import { useAutomationPosts } from '@/hooks/use-automations';
// import { FancyAutomationBox } from '../fancy/fancy-automation-box';

// // Update the Automation type to match the actual data structure
// type Keyword = {
//   id: string;
//   automationId: string | null;
//   word: string;
// };

// type Listener = {
//   id: string;
//   listener: string;
//   automationId: string;
//   prompt: string;
//   commentReply: string | null;
//   dmCount: number;
//   commentCount: number;
// };

// type Automation = {
//   id: string;
//   name: string;
//   active: boolean;
//   keywords: Keyword[];
//   createdAt: Date;
//   listener: Listener | null;
// };

// type Props = {
//   id: string;
// };

// const AutomationList = ({ id }: Props) => {
//   const { data, refetch } = useQueryAutomations();
//   const { deleteMutation } = useAutomationPosts(id);
//   const { latestVariable } = useMutationDataState(['create-automation']);
//   const { pathname } = usePaths();

//   const [automations, setAutomations] = useState<Automation[]>(data?.data || []);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [selectedAutomationId, setSelectedAutomationId] = useState<string | null>(null);

//   useEffect(() => {
//     if (data?.data) {
//       setAutomations(data.data);
//     }
//   }, [data]);

//   const handleDelete = (automationId: string) => {
//     deleteMutation(
//       { id: automationId },
//       {
//         onSuccess: () => {
//           console.log('Automation deleted successfully');
//           setAutomations((prev) => prev.filter((a) => a.id !== automationId));
//         },
//         onError: (error) => {
//           console.error('Error deleting automation:', error);
//         },
//       }
//     );
//   };

//   const optimisticUiData = useMemo(() => {
//     if (latestVariable?.variables && data) {
//       const test = [latestVariable.variables, ...automations];
//       return { data: test as Automation[] };
//     }
//     return { data: automations };
//   }, [latestVariable, automations]);

//   if (!automations.length) {
//     return (
//       <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
//         <h3 className="text-lg text-gray-400">No Automations Yet</h3>
//         <CreateAutomation />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-y-6">
//       {optimisticUiData.data.map((automation) => (
//         <FancyAutomationBox
//           key={automation.id}
//           automation={automation}
//           onDelete={() => {
//             setSelectedAutomationId(automation.id);
//             setShowConfirmModal(true);
//           }}
//           pathname={pathname}
//         />
//       ))}
//       {showConfirmModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-gradient-to-br from-red-500 to-pink-500 p-6 rounded-lg text-white shadow-lg w-80">
//             <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
//             <p className="text-sm mb-6">Are you sure you want to delete this automation?</p>
//             <div className="flex justify-end gap-3">
//               <Button
//                 className="bg-gray-300 text-black hover:bg-gray-400"
//                 onClick={() => setShowConfirmModal(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 className="bg-red-600 hover:bg-red-700"
//                 onClick={() => {
//                   if (selectedAutomationId) {
//                     handleDelete(selectedAutomationId);
//                   }
//                   setShowConfirmModal(false);
//                 }}
//               >
//                 Delete
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AutomationList;





// 'use client'
// import { usePaths } from '@/hooks/user-nav';
// import { cn, getMonth } from '@/lib/utils';
// import Link from 'next/link';
// import React, { useMemo, useEffect, useState } from 'react';
// import GradientButton from '../gradient-button';
// import { Button } from '@/components/ui/button';
// import { useQueryAutomations } from '@/hooks/user-queries';
// import CreateAutomation from '../create-automation';
// import { useMutationDataState } from '@/hooks/use-mutation-data';
// import { useAutomationPosts } from '@/hooks/use-automations';
// import {InactiveIndicator} from '../indicators/inactive-indicator'
// import { ActiveIndicator } from '../indicators/active-indicator';
// import { FancyAutomationBox } from '../fancy/fancy-automation-box';

// type Props = {
//   id: string;
// };

// const AutomationList = ({ id }: Props) => {
//   const { data, refetch } = useQueryAutomations();
//   const { deleteMutation } = useAutomationPosts(id);
//   const { latestVariable } = useMutationDataState(['create-automation']);
//   const { pathname } = usePaths();

//   // Local state to manage the updated automation list
//   const [automations, setAutomations] = useState(data?.data || []);

//   // Added state for modal visibility and selected automation ID
//   const [showConfirmModal, setShowConfirmModal] = useState(false); // NEW
//   const [selectedAutomationId, setSelectedAutomationId] = useState<string | null>(null); // NEW  

//   // Update state when data changes
//   useEffect(() => {
//     if (data?.data) {
//       setAutomations(data.data);
           
//     }
//   }, [data]);

//   useEffect(() => {
//     console.log("Automations Data:", automations);
//   }, [automations]);
  

//   // Delete automation and remove it from the list
//   const handleDelete = (automationId: string) => {
//     deleteMutation(
//       { id: automationId },
//       {
//         onSuccess: () => {
//           console.log('Automation deleted successfully');
//           setAutomations((prev) => prev.filter((a) => a.id !== automationId));
//         },
//         onError: (error) => {
//           console.error('Error deleting automation:', error);
//         },
//       }
//     );
//   };

//   const optimisticUiData = useMemo(() => {
//     if (latestVariable?.variables && data) {
//       const test = [latestVariable.variables, ...automations];
//       return { data: test };
//     }
//     return { data: automations };
//   }, [latestVariable, automations]);

//   if (!automations.length) {
//     return (
//       <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
//         <h3 className="text-lg text-gray-400">No Automations Yet</h3>
//         <CreateAutomation />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-y-6">
//       {optimisticUiData.data.map((automation) => (
//         <FancyAutomationBox
//           key={automation.id}
//           automation={automation}
//           onDelete={() => {
//             setSelectedAutomationId(automation.id);
//             setShowConfirmModal(true);
//           }}
//           pathname={pathname}
//         />
//       ))}
//       {/* Confirmation Modal */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-gradient-to-br from-red-500 to-pink-500 p-6 rounded-lg text-white shadow-lg w-80">
//             <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
//             <p className="text-sm mb-6">Are you sure you want to delete this automation?</p>
//             <div className="flex justify-end gap-3">
//               <Button
//                 className="bg-gray-300 text-black hover:bg-gray-400"
//                 onClick={() => setShowConfirmModal(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 className="bg-red-600 hover:bg-red-700"
//                 onClick={() => {
//                   if (selectedAutomationId) {
//                     handleDelete(selectedAutomationId);
//                   }
//                   setShowConfirmModal(false);
//                 }}
//               >
//                 Delete
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AutomationList;



// 'use client'
// import { usePaths } from '@/hooks/user-nav';
// import { cn, getMonth } from '@/lib/utils';
// import Link from 'next/link';
// import React, { useMemo, useEffect, useState } from 'react';
// import GradientButton from '../gradient-button';
// import { Button } from '@/components/ui/button';
// import { useQueryAutomations } from '@/hooks/user-queries';
// import CreateAutomation from '../create-automation';
// import { useMutationDataState } from '@/hooks/use-mutation-data';
// import { useAutomationPosts } from '@/hooks/use-automations';
// import {InactiveIndicator} from '../indicators/inactive-indicator'
// import { ActiveIndicator } from '../indicators/active-indicator';


// type Props = {
//   id: string;
// };

// const AutomationList = ({ id }: Props) => {
//   const { data, refetch } = useQueryAutomations();
//   const { deleteMutation } = useAutomationPosts(id);
//   const { latestVariable } = useMutationDataState(['create-automation']);
//   const { pathname } = usePaths();

//   // Local state to manage the updated automation list
//   const [automations, setAutomations] = useState(data?.data || []);

//   // Added state for modal visibility and selected automation ID
//   const [showConfirmModal, setShowConfirmModal] = useState(false); // NEW
//   const [selectedAutomationId, setSelectedAutomationId] = useState<string | null>(null); // NEW  

//   // Update state when data changes
//   useEffect(() => {
//     if (data?.data) {
//       setAutomations(data.data);
           
//     }
//   }, [data]);

//   useEffect(() => {
//     console.log("Automations Data:", automations);
//   }, [automations]);
  

//   // Delete automation and remove it from the list
//   const handleDelete = (automationId: string) => {
//     deleteMutation(
//       { id: automationId },
//       {
//         onSuccess: () => {
//           console.log('Automation deleted successfully');
//           setAutomations((prev) => prev.filter((a) => a.id !== automationId));
//         },
//         onError: (error) => {
//           console.error('Error deleting automation:', error);
//         },
//       }
//     );
//   };

//   const optimisticUiData = useMemo(() => {
//     if (latestVariable?.variables && data) {
//       const test = [latestVariable.variables, ...automations];
//       return { data: test };
//     }
//     return { data: automations };
//   }, [latestVariable, automations]);

//   if (!automations.length) {
//     return (
//       <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
//         <h3 className="text-lg text-gray-400">No Automations Yet</h3>
//         <CreateAutomation />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-y-3">
//       {optimisticUiData.data.map((automation) => (
        
//         <div
//           className="bg-[#1D1D1D] hover:opacity-80 transition duration-100 rounded-xl p-5 border-[1px] radial--gradient--automations flex border-[#545454]"
//           key={automation.id}
//         >
//           <div className="flex flex-col m-2 flex-1 items-start">
//             <h2 className="text-xl font-semibold">{automation.name}</h2>
//             <p className="text-[#9B9CA0] text-sm font-light mb-2">
//               {automation.active ? <ActiveIndicator/> : <InactiveIndicator/>}
//             </p>

            
//             {automation.keywords.length > 0 ? (
//               <div className="flex gap-x-2 flex-wrap mt-3">
//                 {
//                   //@ts-ignore
                
//                 automation.keywords.map((keyword, key) => (
//                   <div
//                     key={keyword.id}
//                     className={cn(
//                       'rounded-full px-4 py-1 capitalize',
//                       (key + 1) % 1 === 0 &&
//                         'bg-keyword-green/15 border-2 border-keyword-green',
//                       (key + 1) % 2 === 0 &&
//                         'bg-keyword-purple/15 border-2 border-keyword-purple',
//                       (key + 1) % 3 === 0 &&
//                         'bg-keyword-yellow/15 border-2 border-keyword-yellow',
//                       (key + 1) % 4 === 0 &&
//                         'bg-keyword-green/15 border-2 border-keyword-green'
//                     )}
//                   >
//                     {keyword.word}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="rounded-full border-2 mt-3 border-dashed border-white/60 px-3 py-1">
//                 <p className="text-sm text-[#bfc0c3]">No Keywords</p>
//               </div>
//             )}
//           </div>
//           <div className="flex flex-col m-2 justify-between">
//             <p className="capitalize text-sm font-light text-[#9B9CA0]">
//               {getMonth(automation.createdAt.getUTCMonth() + 1)}{' '}
//               {automation.createdAt.getUTCDate()}th{' '}
//               {automation.createdAt.getUTCFullYear()},{' '}
//               {String(automation.createdAt.getUTCHours()).padStart(2, '0')}:
//               {String(automation.createdAt.getUTCMinutes()).padStart(2, '0')} UTC
//             </p>
//             {automation.listener?.listener === 'SMARTAI' ? (
//               <GradientButton
//                 type="BUTTON"
//                 className="w-full bg-background-80 text-white hover:bg-background-80"
//               >
//                 Smart AI
//               </GradientButton>
//             ) : (
//               <div className="flex items-center justify-center">
//                 <span className="px-3 py-1 text-xs font-semibold uppercase text-white bg-blue-500 rounded-full shadow-md">
//                   Standard
//                 </span>
//               </div>
//             )}
//             {/* Updated Delete Button */}
//             {/* <Button
//               className="bg-red-500 hover:bg-red-600 text-white mt-3 mb-2"
//               onClick={() => {
//                 setSelectedAutomationId(automation.id); // NEW
//                 setShowConfirmModal(true); // NEW
//               }}
//             >
//               Delete
//             </Button>
//             <Button className="bg-background-80 hover:bg-background-80 text-white mt-2 mb-3">
//               <Link href={`${pathname}/${automation.id}`}>Configure</Link>
//             </Button> */}
//             <Button
//               className="bg-red-500 px-0 hover:bg-red-600 text-white mt-1 mb-1 sm:mt-1 sm:mb-1 sm:px-0 sm:py-1"
//               onClick={() => {
//                 setSelectedAutomationId(automation.id); // NEW
//                 setShowConfirmModal(true); // NEW
//               }}
//             >
//               Delete
//             </Button>
//             <Button 
//               className="bg-background-80 px-0 hover:bg-background-80 text-white mt-1 mb-1 sm:mt-1 sm:mb-1 sm:px-0 sm:py-1"
//             >
//               <Link href={`${pathname}/${automation.id}`}>Configure</Link>
//             </Button>

//           </div>
//         </div>
//       ))}
//       {/* Confirmation Modal */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">{/* NEW */}
//           <div className="bg-gradient-to-br from-red-500 to-pink-500 p-6 rounded-lg text-white shadow-lg w-80">{/* NEW */}
//             <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2> {/* NEW */}
//             <p className="text-sm mb-6">Are you sure you want to delete this automation?</p> {/* NEW */}
//             <div className="flex justify-end gap-3">{/* NEW */}
//               <Button
//                 className="bg-gray-300 text-black hover:bg-gray-400"
//                 onClick={() => setShowConfirmModal(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 className="bg-red-600 hover:bg-red-700"
//                 onClick={() => {
//                   if (selectedAutomationId) {
//                     handleDelete(selectedAutomationId);
//                   }
//                   setShowConfirmModal(false);
//                 }}
//               >
//                 Delete
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AutomationList;


// Add this type definition at the top of the file




// 'use client'
// import { usePaths } from '@/hooks/user-nav'
// import { cn, getMonth } from '@/lib/utils'
// import Link from 'next/link'
// import React, { useMemo, useEffect, useState } from 'react'
// import GradientButton from '../gradient-button'
// import { Button } from '@/components/ui/button'
// import { useQueryAutomations } from '@/hooks/user-queries'
// import CreateAutomation from '../create-automation'
// import { useMutationDataState } from '@/hooks/use-mutation-data'
// import { useAutomationPosts } from '@/hooks/use-automations'

// type Props = {
//   id: string
// }

// const AutomationList = ({ id }: Props) => {
//   const { data, refetch } = useQueryAutomations()
//   const { deleteMutation } = useAutomationPosts(id)
//   const { latestVariable } = useMutationDataState(['create-automation'])
//   const { pathname } = usePaths()

//   // Local state to manage the updated automation list
//   const [automations, setAutomations] = useState(data?.data || [])

//   // Update state when data changes
//   useEffect(() => {
//     if (data?.data) {
//       setAutomations(data.data)
//     }
//   }, [data])

//   // Delete automation and remove it from the list
//   const handleDelete = (automationId: string) => {
//     deleteMutation(
//       { id: automationId },
//       {
//         onSuccess: () => {
//           console.log('Automation deleted successfully')
//           setAutomations((prev) => prev.filter((a) => a.id !== automationId))
//         },
//         onError: (error) => {
//           console.error('Error deleting automation:', error)
//         },
//       }
//     )
//   }

//   const optimisticUiData = useMemo(() => {
//     if (latestVariable?.variables && data) {
//       const test = [latestVariable.variables, ...automations]
//       return { data: test }
//     }
//     return { data: automations }
//   }, [latestVariable, automations])

//   if (!automations.length) {
//     return (
//       <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
//         <h3 className="text-lg text-gray-400">No Automations Yet</h3>
//         <CreateAutomation />
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col gap-y-3">
//       {optimisticUiData.data.map((automation) => (
//         <div
//           className="bg-[#1D1D1D] hover:opacity-80 transition duration-100 rounded-xl p-5 border-[1px] radial--gradient--automations flex border-[#545454]"
//           key={automation.id}
//         >
//           <div className="flex flex-col flex-1 items-start">
//             <h2 className="text-xl font-semibold">{automation.name}</h2>
//             <p className="text-[#9B9CA0] text-sm font-light mb-2">
//               This automation is for comments
//             </p>
//             {automation.keywords.length > 0 ? (
              
//               <div className="flex gap-x-2 flex-wrap mt-3">
//                 {
//                   //@ts-ignore
//                 automation.keywords.map((keyword, key) => (
//                   <div
//                     key={keyword.id}
//                     className={cn(
//                       'rounded-full px-4 py-1 capitalize',
//                       (key + 1) % 1 === 0 &&
//                         'bg-keyword-green/15 border-2 border-keyword-green',
//                       (key + 1) % 2 === 0 &&
//                         'bg-keyword-purple/15 border-2 border-keyword-purple',
//                       (key + 1) % 3 === 0 &&
//                         'bg-keyword-yellow/15 border-2 border-keyword-yellow',
//                       (key + 1) % 4 === 0 &&
//                         'bg-keyword-green/15 border-2 border-keyword-green'
//                     )}
//                   >
//                     {keyword.word}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="rounded-full border-2 mt-3 border-dashed border-white/60 px-3 py-1">
//                 <p className="text-sm text-[#bfc0c3]">No Keywords</p>
//               </div>
//             )}
//           </div>
//           <div className="flex flex-col justify-between">
//             <p className="capitalize text-sm font-light text-[#9B9CA0]">
//               {getMonth(automation.createdAt.getUTCMonth() + 1)}{' '}
//               {automation.createdAt.getUTCDate()}th{' '}
//               {automation.createdAt.getUTCFullYear()},{' '}
//               {String(automation.createdAt.getUTCHours()).padStart(2, '0')}:
//               {String(automation.createdAt.getUTCMinutes()).padStart(2, '0')} UTC
//             </p>
//             {automation.listener?.listener === 'SMARTAI' ? (
//               <GradientButton
//                 type="BUTTON"
//                 className="w-full bg-background-80 text-white hover:bg-background-80"
//               >
//                 Smart AI
//               </GradientButton>
//             ) : (
//               <div className="flex items-center justify-center">
//                 <span className="px-3 py-1 text-xs font-semibold uppercase text-white bg-blue-500 rounded-full shadow-md">
//                   Standard
//                 </span>
//               </div>
//             )}
//             <Button
//               className="bg-red-500 hover:bg-red-600 text-white mt-3 mb-2"
//               onClick={() => handleDelete(automation.id)}
//             >
//               Delete
//             </Button>
//             <Button className="bg-background-80 hover:bg-background-80 text-white mt-2 mb-3">
//               <Link href={`${pathname}/${automation.id}`}>Configure</Link>
//             </Button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default AutomationList




// 'use client'
// import { usePaths } from '@/hooks/user-nav'
// //import { cn } from '@/lib/utils'
// import { cn, getMonth } from '@/lib/utils'
// import Link from 'next/link'
// import React, { useMemo } from 'react'
// import GradientButton from '../gradient-button'
// import { Button } from '@/components/ui/button'
// import { useQueryAutomations } from '@/hooks/user-queries'
// import CreateAutomation from '../create-automation'
// import { useMutationDataState } from '@/hooks/use-mutation-data'
// import { useAutomationPosts } from '@/hooks/use-automations'
// // import { useMutation } from '@/hooks/use-mutation-data' // Highlighted: Import useMutation hook

// type Props = {
//   id: string
// }

// const AutomationList = ({ id }: Props) => {
//   const { data, refetch } = useQueryAutomations() // Highlighted: Refetch function for updated data
//   // const { data } = useQueryAutomations()
//   const{deleteMutation} = useAutomationPosts(id)

//   const { latestVariable } = useMutationDataState(['create-automation'])
//   console.log(latestVariable)
//   const { pathname } = usePaths() 

  
//   // const optimisticUiData = useMemo(() => {
//   //   if ((latestVariable && latestVariable?.variables &&  data)) {
//   //     const test = [latestVariable.variables, ...data.data]
//   //     return { data: test }
//   //   }
//   //   return data || { data: [] }
//   // }, [latestVariable, data])

//   // if (data?.status !== 200 || data.data.length <= 0) {
//   //   return (
//   //     <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
//   //       <h3 className="text-lg text-gray-400">No Automations Yet </h3>
//   //       <CreateAutomation />
//   //     </div>
//   //   )
//   // }
//   // Optimistic UI Update
//   const optimisticUiData = useMemo(() => {
//     if (latestVariable?.variables && data) {
//       const test = [latestVariable.variables, ...data.data]
//       return { data: test }
//     }
//     return data || { data: [] }
//   }, [latestVariable, data])

//   if (data?.status !== 200 || data.data.length <= 0) {
//     return (
//       <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
//         <h3 className="text-lg text-gray-400">No Automations Yet</h3>
//         <CreateAutomation />
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col gap-y-3">
//       {optimisticUiData.data!.map((automation) => (
//         // <Link
//         //   href={`${pathname}/${automation.id}`}
//         //   key={automation.id}
          
//         // >
//           <div className="bg-[#1D1D1D] hover:opacity-80 transition duration-100 rounded-xl p-5 border-[1px] radial--gradient--automations flex border-[#545454]"
//                key={automation.id}
//           >
//           <div className="flex flex-col flex-1 items-start">
//             <h2 className="text-xl font-semibold">{automation.name}</h2>
//             <p className="text-[#9B9CA0] text-sm font-light mb-2">
//               This automtion is for comments
//             </p>

//             {automation.keywords.length > 0 ? (
//               <div className="flex gap-x-2 flex-wrap mt-3">
//                 {
//                   //@ts-ignore
//                   automation.keywords.map((keyword, key) => (
//                     <div
//                       key={keyword.id}
//                       className={cn(
//                         'rounded-full px-4 py-1 capitalize',
//                         (0 + 1) % 1 == 0 &&
//                           'bg-keyword-green/15 border-2 border-keyword-green',
//                         (1 + 1) % 2 == 0 &&
//                           'bg-keyword-purple/15 border-2 border-keyword-purple',
//                         (2 + 1) % 3 == 0 &&
//                           'bg-keyword-yellow/15 border-2 border-keyword-yellow',
//                         (3 + 1) % 4 == 0 &&
//                           'bg-keyword-green/15 border-2 border-keyword-green'
//                       )}
//                     >
//                       {keyword.word}
//                     </div>
//                   ))
//                 }
//               </div>
//             ) : (
//               <div className="rounded-full border-2 mt-3 border-dashed border-white/60 px-3 py-1">
//                 <p className="text-sm text-[#bfc0c3]">No Keywords</p>
//               </div>
//             )}
//           </div>
//           <div className="flex flex-col justify-between">
//             {/* <p className="capitalize text-sm font-light text-[#9B9CA0]">
//               {getMonth(automation.createdAt.getUTCMonth() + 1)}{' '}
//               {automation.createdAt.getUTCDate() === 1
//                 ? `${automation.createdAt.getUTCDate()}st`
//                 : `${automation.createdAt.getUTCDate()}th`}{' '}
//               {automation.createdAt.getUTCFullYear()}
//               {automation.createdAt.getUTCTime() }
//             </p> */}
//             <p className="capitalize text-sm font-light text-[#9B9CA0]">
//               {getMonth(automation.createdAt.getUTCMonth() + 1)}{' '}
//               {automation.createdAt.getUTCDate() === 1
//                 ? `${automation.createdAt.getUTCDate()}st`
//                 : `${automation.createdAt.getUTCDate()}th`}{' '}
//               {automation.createdAt.getUTCFullYear()},{' '}
//               {String(automation.createdAt.getUTCHours()).padStart(2, '0')}:
//               {String(automation.createdAt.getUTCMinutes()).padStart(2, '0')} UTC
//             </p>

//             {/* Delete Button */}
//             {/* <Button
//               className="bg-red-500 hover:bg-red-600 text-white mt-3"
//               // onClick={() => deleteAutomation.mutate(automation.id)} // Highlighted: Delete function
//               onClick={() => deleteMutation({ id: automation.id })}
//             >
//               Delete
//             </Button> */}
           


//             {automation.listener?.listener === 'SMARTAI' ? (
//               <GradientButton
//                 type="BUTTON"
//                 className="w-full bg-background-80 text-white hover:bg-background-80"
//               >
//                 Smart AI
//               </GradientButton>
//             ) : (
//               // <Button >
//                 <div className="flex items-center justify-center">
//                   <span className="px-3 py-1 text-xs font-semibold uppercase text-white bg-blue-500 rounded-full shadow-md">
//                     Standard
//                   </span>
//                 </div>
//               // </Button>
              
//             )}
//              <Button
//                 className="bg-red-500 hover:bg-red-600 text-white mt-3 mb-2"
//                 onClick={() => {
//                   deleteMutation(
//                     { id: automation.id },
//                     {
//                       onSuccess: () => {
//                         console.log('Automation deleted successfully');
//                         refetch(); // Trigger refetch manually after success
//                         console.log('refetch done');
//                       },
//                       onError: (error) => {
//                         console.error('Error deleting automation:', error);
//                       },
//                     }
//                   );
//                 }}
//               >
//                 Delete
//               </Button>

//             <Button className="bg-background-80 hover:bg-background-80 text-white mt-2 mb-3">
//             <Link
//                 href={`${pathname}/${automation.id}`}
//                 key={automation.id}
//                 >Configure</Link>
//             </Button>
//           </div>
//           </div>
//         // </Link>
//       ))}
//     </div>
//   )
// }

// export default AutomationList
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