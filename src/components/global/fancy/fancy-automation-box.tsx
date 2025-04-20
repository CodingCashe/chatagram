// 'use client'
// import React from 'react';
// import { cn, getMonth,getRelativeTime } from '@/lib/utils';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import GradientButton from '../gradient-button';
// import { ActiveIndicator } from '../indicators/active-indicator';
// import { InactiveIndicator } from '../indicators/inactive-indicator';

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

// interface Automation {
//   id: string;
//   name: string;
//   active: boolean;
//   keywords: Keyword[];
//   createdAt: Date;
//   listener: Listener | null;
// }

// interface FancyAutomationBoxProps {
//   automation: Automation;
//   onDelete: () => void;
//   pathname: string;
// }

// export const FancyAutomationBox: React.FC<FancyAutomationBoxProps> = ({ automation, onDelete, pathname }) => {
//   return (
//     <div className="relative bg-[#1D1D1D] rounded-xl border-[1px] border-[#545454] before:content-[''] before:absolute before:top-0 before:left-1/2 before:transform before:-translate-x-1/2 before:w-28 before:h-[2px] before:bg-[#1D1D1D] before:z-[1]">
//       <div className="absolute rounded-xl top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
//         <div className="bg-[#1D1D1D] px-1 rounded-full border-[1px] border-[#545454]">
//           {automation.listener?.listener === 'SMARTAI' ? (
//             <GradientButton
//               type="BUTTON"
//               className="text-xs bg-background-80 text-white hover:bg-background-80 px-4 py-1 -my-[3px]"
//             >
//               Smart AI
//             </GradientButton>
//           ) : (
//             <span className="inline-block px-4 py-1 text-xs font-semibold uppercase text-white bg-[#1D1D1D] rounded-full shadow-md -my-[3px]">
//               Standard Plan
//             </span>
//           )}
//         </div>
//       </div>
//       <div className="absolute mb-3 bottom-2 top-2 right-2 z-10">
//         {automation.active ? <ActiveIndicator /> : <InactiveIndicator />}
//       </div>
//       <div className="p-5 pt-8 radial--gradient--automations">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="flex flex-col space-y-3">
//             <h2 className="text-xl font-semibold">{automation.name}</h2>
            
//             {automation.keywords.length > 0 ? (
//               <div className="flex flex-wrap gap-2 m-2">
//                 {automation.keywords.map((keyword, key) => (
//                   <div
//                     key={keyword.id}
//                     className={cn(
//                       'rounded-full px-3 py-1 text-xs capitalize',
//                       (key + 1) % 1 === 0 &&
//                         'bg-keyword-green/15 border-[1px] border-keyword-green',
//                       (key + 1) % 2 === 0 &&
//                         'bg-keyword-purple/15 border-[1px] border-keyword-purple',
//                       (key + 1) % 3 === 0 &&
//                         'bg-keyword-yellow/15 border-[1px] border-keyword-yellow',
//                       (key + 1) % 4 === 0 &&
//                         'bg-keyword-red/15 border-[1px] border-keyword-red'
//                     )}
//                   >
//                     {keyword.word}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="rounded-full border-[1px] border-dashed border-white/60 px-3 py-1 inline-block">
//                 <p className="text-sm text-[#bfc0c3]">No Keywords</p>
//               </div>
//             )}
//           </div>
//           <div className="flex flex-col justify-between space-y-3 md:items-end">
//             {/* <p className="text-sm font-light text-[#9B9CA0]">
//               {getMonth(automation.createdAt.getUTCMonth() + 1)}{' '}
//               {automation.createdAt.getUTCDate()}th{' '}
//               {automation.createdAt.getUTCFullYear()},{' '}
//               {String(automation.createdAt.getUTCHours()).padStart(2, '0')}:
//               {String(automation.createdAt.getUTCMinutes()).padStart(2, '0')} UTC
//             </p> */}
//             <p className="text-sm font-light text-[#9B9CA0]">
//               {getRelativeTime(automation.createdAt)}
//             </p>
//             <div className="flex flex-col sm:flex-row gap-2">
//               <Button
//                 className="bg-red-500 px-4 hover:bg-red-600 text-white w-full sm:w-auto"
//                 onClick={onDelete}
//               >
//                 Delete
//               </Button>
//               <Button 
//                 className="bg-background-80 px-4 hover:bg-background-80 text-white w-full sm:w-auto"
//               >
//                 <Link href={`${pathname}/${automation.id}`}>Configure</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// 'use client'

// import React, { useState, useEffect } from 'react';
// import { cn, getRelativeTime } from '@/lib/utils';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import GradientButton from '../gradient-button';
// import { ActiveIndicator } from '../indicators/active-indicator';
// import { InactiveIndicator } from '../indicators/inactive-indicator';
// import { Sparkles, Zap, Trash2, Settings } from 'lucide-react';

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

// interface Automation {
//   id: string;
//   name: string;
//   active: boolean;
//   keywords: Keyword[];
//   createdAt: Date;
//   listener: Listener | null;
// }

// interface FancyAutomationBoxProps {
//   automation: Automation;
//   onDelete: () => void;
//   pathname: string;
// }

// export const FancyAutomationBox: React.FC<FancyAutomationBoxProps> = ({ automation, onDelete, pathname }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

//   useEffect(() => {
//     if (!isHovered) {
//       setShowDeleteConfirm(false);
//     }
//   }, [isHovered]);


//   return (
//     <div
//       className="relative bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] rounded-xl border-[1px] border-[#545454] overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#6A6A6A]"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//       <div className="relative z-10 p-6 group">
//         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
//           <div className="bg-[#1D1D1D] px-1 rounded-full border-[1px] border-[#545454]">
//             {automation.listener?.listener === 'SMARTAI' ? (
//               <GradientButton
//                 type="BUTTON"
//                 className="text-xs bg-background-80 text-white hover:bg-background-80 px-4 py-1 -my-[3px] flex items-center gap-2"
//               >
//                 <Sparkles size={14} />
//                 Smart AI
//               </GradientButton>
//             ) : (
//               <span className="inline-flex items-center gap-2 px-4 py-1 text-xs font-semibold uppercase text-white bg-[#1D1D1D] rounded-full shadow-md -my-[3px]">
//                 <Zap size={14} />
//                 Standard
//               </span>
//             )}
//           </div>
//         </div>
//         <div className="absolute top-2 right-2 z-10">
//           {automation.active ? <ActiveIndicator /> : <InactiveIndicator />}
//         </div>
//         <div className="mt-4">
//           <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
//             {automation.name}
//           </h2>
//           <div className="flex flex-wrap gap-2 mb-4 transition-all duration-300 group-hover:scale-105">
//             {automation.keywords.map((keyword, key) => (
//               <div
//                 key={keyword.id}
//                 className={cn(
//                   'rounded-full px-3 py-1 text-xs capitalize backdrop-blur-sm',
//                   (key + 1) % 1 === 0 && 'bg-keyword-green/30 border-[1px] border-keyword-green',
//                   (key + 1) % 2 === 0 && 'bg-keyword-purple/30 border-[1px] border-keyword-purple',
//                   (key + 1) % 3 === 0 && 'bg-keyword-yellow/30 border-[1px] border-keyword-yellow',
//                   (key + 1) % 4 === 0 && 'bg-keyword-red/30 border-[1px] border-keyword-red'
//                 )}
//               >
//                 {keyword.word}
//               </div>
//             ))}
//           </div>
//           {automation.keywords.length === 0 && (
//             <div className="rounded-full border-[1px] border-dashed border-white/60 px-3 py-1 inline-block mb-4">
//               <p className="text-sm text-[#bfc0c3]">No Keywords</p>
//             </div>
//           )}
//           <p className="text-sm font-light text-[#9B9CA0] mb-4">
//             Created {getRelativeTime(automation.createdAt)}
//           </p>
//           <div className="flex gap-2">
//             {showDeleteConfirm ? (
//               <>
//                 <Button
//                   className="bg-red-500 px-4 hover:bg-red-600 text-white flex-1"
//                   onClick={onDelete}
//                 >
//                   Confirm Delete
//                 </Button>
//                 <Button
//                   className="bg-gray-500 px-4 hover:bg-gray-600 text-white flex-1"
//                   onClick={() => setShowDeleteConfirm(false)}
//                 >
//                   Cancel
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Button
//                   className="bg-red-500 px-4 hover:bg-red-600 text-white flex-1 sm:flex-none"
//                   onClick={() => setShowDeleteConfirm(true)}
//                 >
//                   <Trash2 size={18} className="mr-2" />
//                   Delete
//                 </Button>
//                 <Button
//                   className="bg-blue-500 px-4 hover:bg-blue-600 text-white flex-1 sm:flex-none"
//                 >
//                   <Link href={`${pathname}/${automation.id}`} className="flex items-center">
//                     <Settings size={18} className="mr-2" />
//                     Configure
//                   </Link>
//                 </Button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// 'use client'

// import React, { useState, useEffect } from 'react';
// import { cn, getRelativeTime } from '@/lib/utils';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import GradientButton from '../gradient-button';
// import { ActiveIndicator } from '../indicators/active-indicator';
// import { InactiveIndicator } from '../indicators/inactive-indicator';
// import { Sparkles, Zap, Trash2, Settings } from 'lucide-react';
// import AutomationStats from './automation-stats';

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

// interface Automation {
//   id: string;
//   name: string;
//   active: boolean;
//   keywords: Keyword[];
//   createdAt: Date;
//   listener: Listener | null;
// }

// interface FancyAutomationBoxProps {
//   automation: Automation;
//   onDelete: () => void;
//   pathname: string;
// }

// export const FancyAutomationBox: React.FC<FancyAutomationBoxProps> = ({ automation, onDelete, pathname }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

//   useEffect(() => {
//     if (!isHovered) {
//       setShowDeleteConfirm(false);
//     }
//   }, [isHovered]);

//   return (
//     <div
//       className="relative bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] rounded-xl transition-all duration-300 hover:shadow-lg group"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="absolute inset-0 rounded-xl border border-[#545454] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-xl overflow-hidden subtle-shimmer"></div>
//       <div className="absolute -top-px left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
//       <div className="relative z-10 p-6">
//         <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
//           <div className="bg-[#1D1D1D] px-1 rounded-full border border-[#545454] shadow-sm">
//             {automation.listener?.listener === 'SMARTAI' ? (
//               <GradientButton
//                 type="BUTTON"
//                 className="text-xs bg-background-80 text-white hover:bg-background-80 px-4 py-1 -my-[3px] flex items-center gap-2"
//               >
//                 <Sparkles size={14} />
//                 Smart AI
//               </GradientButton>
//             ) : (
//               <GradientButton
//                 type="BUTTON"
//                 className="text-xs bg-background-80 text-white hover:bg-background-80 px-4 py-1 -my-[3px] flex items-center gap-2"
//               >
//                 <Zap size={14} />
//                 Free
//               </GradientButton>
//             )}
//           </div>
//         </div>
//         <div className="absolute top-2 right-2 z-10">
//           {automation.active ? <ActiveIndicator /> : <InactiveIndicator />}
//         </div>
//         <div className="mt-4">
//           <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//             {automation.name}
//           </h2>
//           <div className="flex flex-wrap gap-2 mb-4">
//             {automation.keywords.map((keyword, key) => (
//               <div
//                 key={keyword.id}
//                 className={cn(
//                   'rounded-full px-3 py-1 text-xs capitalize backdrop-blur-sm',
//                   (key + 1) % 1 === 0 && 'bg-keyword-green/30 border border-keyword-green/50',
//                   (key + 1) % 2 === 0 && 'bg-keyword-purple/30 border border-keyword-purple/50',
//                   (key + 1) % 3 === 0 && 'bg-keyword-yellow/30 border border-keyword-yellow/50',
//                   (key + 1) % 4 === 0 && 'bg-keyword-red/30 border border-keyword-red/50'
//                 )}
//               >
//                 {keyword.word}
//               </div>
//             ))}
//           </div>
//           {automation.keywords.length === 0 && (
//             <div className="rounded-full border border-dashed border-white/30 px-3 py-1 inline-block mb-4">
//               <p className="text-sm text-[#bfc0c3]">No Keywords</p>
//             </div>
//           )}
//           <AutomationStats automation={automation} />
//           <p className="text-sm font-light text-[#9B9CA0] mb-4">
//             Created {getRelativeTime(automation.createdAt)}
//           </p>
//           <div className="flex gap-2">
//             {showDeleteConfirm ? (
//               <>
//                 <Button
//                   className="bg-red-500 px-4 hover:bg-red-600 text-white flex-1"
//                   onClick={onDelete}
//                 >
//                   Confirm Delete
//                 </Button>
//                 <Button
//                   className="bg-gray-500 px-4 hover:bg-gray-600 text-white flex-1"
//                   onClick={() => setShowDeleteConfirm(false)}
//                 >
//                   Cancel
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Button
//                   className="bg-red-500 px-4 hover:bg-red-600 text-white flex-1 sm:flex-none"
//                   onClick={() => setShowDeleteConfirm(true)}
//                 >
//                   <Trash2 size={18} className="mr-2" />
//                   Delete
//                 </Button>
//                 <Button
//                   className="bg-blue-500 px-4 hover:bg-blue-600 text-white flex-1 sm:flex-none"
//                 >
//                   <Link href={`${pathname}/${automation.id}`} className="flex items-center">
//                     <Settings size={18} className="mr-2" />
//                     Configure
//                   </Link>
//                 </Button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FancyAutomationBox;

// 'use client'

// import React, { useState, useEffect } from 'react';
// import { cn, getRelativeTime } from '@/lib/utils';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import GradientButton from '../gradient-button';
// import { ActiveIndicator } from '../indicators/active-indicator';
// import { InactiveIndicator } from '../indicators/inactive-indicator';
// import { Sparkles, Zap, Trash2, Settings } from 'lucide-react';
// import AutomationStats from './automation-stats';
// import AutomationChats from './automationChats';

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

// interface Automation {
//   id: string;
//   name: string;
//   active: boolean;
//   keywords: Keyword[];
//   createdAt: Date;
//   listener: Listener | null;
// }

// interface FancyAutomationBoxProps {
//   automation: Automation;
//   onDelete: () => void;
//   pathname: string;
// }

// export const FancyAutomationBox: React.FC<FancyAutomationBoxProps> = ({ automation, onDelete, pathname }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

//   useEffect(() => {
//     if (!isHovered) {
//       setShowDeleteConfirm(false);
//     }
//   }, [isHovered]);

//   return (
//     <div
//       className="relative bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] rounded-xl transition-all duration-300 hover:shadow-lg group"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="absolute inset-0 rounded-xl border border-[#545454] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-7000 rounded-xl overflow-hidden"></div>
//       <div className="absolute -top-px left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
//       <div className="relative z-10 p-6 flex">
//         <div className="w-1/2 pr-4">
//           <div className="absolute -top-3 left-1/4 transform -translate-x-1/2 flex items-center justify-center z-10">
//             <div className="bg-[#1D1D1D] px-1 rounded-full border border-[#545454] shadow-sm">
//               {automation.listener?.listener === 'SMARTAI' ? (
//                 <GradientButton
//                   type="BUTTON"
//                   className="text-xs bg-background-80 text-white hover:bg-background-80 px-4 py-1 -my-[3px] flex items-center gap-2"
//                 >
//                   <Sparkles size={14} />
//                   Smart AI
//                 </GradientButton>
//               ) : (
//                 <GradientButton
//                   type="BUTTON"
//                   className="text-xs bg-background-80 text-white hover:bg-background-80 px-4 py-1 -my-[3px] flex items-center gap-2"
//                 >
//                   <Zap size={14} />
//                   Free
//                 </GradientButton>
//               )}
//             </div>
//           </div>
//           <div className="absolute top-2 right-2 z-10">
//             {automation.active ? <ActiveIndicator /> : <InactiveIndicator />}
//           </div>
//           <div className="mt-4">
//             <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//               {automation.name}
//             </h2>
//             <div className="flex flex-wrap gap-2 mb-4">
//               {automation.keywords.map((keyword, key) => (
//                 <div
//                   key={keyword.id}
//                   className={cn(
//                     'rounded-full px-3 py-1 text-xs capitalize backdrop-blur-sm',
//                     (key + 1) % 1 === 0 && 'bg-keyword-green/30 border border-keyword-green/50',
//                     (key + 1) % 2 === 0 && 'bg-keyword-purple/30 border border-keyword-purple/50',
//                     (key + 1) % 3 === 0 && 'bg-keyword-yellow/30 border border-keyword-yellow/50',
//                     (key + 1) % 4 === 0 && 'bg-keyword-red/30 border border-keyword-red/50'
//                   )}
//                 >
//                   {keyword.word}
//                 </div>
//               ))}
//             </div>
//             {automation.keywords.length === 0 && (
//               <div className="rounded-full border border-dashed border-white/30 px-3 py-1 inline-block mb-4">
//                 <p className="text-sm text-[#bfc0c3]">No Keywords</p>
//               </div>
//             )}
//             <AutomationStats automation={automation} />
//             <p className="text-sm font-light text-[#9B9CA0] mb-4">
//               Created {getRelativeTime(automation.createdAt)}
//             </p>
//             <div className="flex gap-2">
//               {showDeleteConfirm ? (
//                 <>
//                   <Button
//                     className="bg-red-500 px-4 hover:bg-red-600 text-white flex-1"
//                     onClick={onDelete}
//                   >
//                     Confirm Delete
//                   </Button>
//                   <Button
//                     className="bg-gray-500 px-4 hover:bg-gray-600 text-white flex-1"
//                     onClick={() => setShowDeleteConfirm(false)}
//                   >
//                     Cancel
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Button
//                     className="bg-red-500 px-4 hover:bg-red-600 text-white flex-1 sm:flex-none"
//                     onClick={() => setShowDeleteConfirm(true)}
//                   >
//                     <Trash2 size={18} className="mr-2" />
//                     Delete
//                   </Button>
//                   <Button
//                     className="bg-blue-500 px-4 hover:bg-blue-600 text-white flex-1 sm:flex-none"
//                   >
//                     <Link href={`${pathname}/${automation.id}`} className="flex items-center">
//                       <Settings size={18} className="mr-2" />
//                       Configure
//                     </Link>
//                   </Button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="w-1/2 pl-4 border-l border-[#545454]">
//           <AutomationChats automationId={automation.id} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FancyAutomationBox;

// 'use client'

// import React, { useState, useEffect } from 'react';
// import { cn, getRelativeTime } from '@/lib/utils';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import GradientButton from '../gradient-button';
// import { ActiveIndicator } from '../indicators/active-indicator';
// import { InactiveIndicator } from '../indicators/inactive-indicator';
// import { Sparkles, Zap, Trash2, Settings } from 'lucide-react';
// import AutomationStats from './automation-stats';
// import AutomationChats from './automationChats';

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

// interface Automation {
//   id: string;
//   name: string;
//   active: boolean;
//   keywords: Keyword[];
//   createdAt: Date;
//   listener: Listener | null;
// }

// interface FancyAutomationBoxProps {
//   automation: Automation;
//   onDelete: () => void;
//   pathname: string;
// }

// export const FancyAutomationBox: React.FC<FancyAutomationBoxProps> = ({automation, onDelete, pathname }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

//   useEffect(() => {
//     if (!isHovered) {
//       setShowDeleteConfirm(false);
//     }
//   }, [isHovered]);

//   return (
//     <div
//       className="relative bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] rounded-xl transition-all duration-300 hover:shadow-lg group"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="absolute inset-0 rounded-xl border border-[#545454] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-7000 rounded-xl overflow-hidden"></div>
//       <div className="absolute -top-px left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
//       <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
//         <div className="bg-[#1D1D1D] px-1 rounded-full border border-[#545454] shadow-sm">
//           {automation.listener?.listener === 'SMARTAI' ? (
//             <GradientButton
//               type="BUTTON"
//               className="text-xs bg-background-80 text-white hover:bg-background-80 px-4 py-1 -my-[3px] flex items-center gap-2"
//             >
//               <Sparkles size={14} />
//               Smart AI
//             </GradientButton>
//           ) : (
//             <GradientButton
//               type="BUTTON"
//               className="text-xs bg-background-80 text-white hover:bg-background-80 px-4 py-1 -my-[3px] flex items-center gap-2"
//             >
//               <Zap size={14} />
//               FREE
//             </GradientButton>
//           )}
//         </div>
//       </div>
//       <div className="relative z-10 p-6 flex flex-col md:flex-row">
//         <div className="w-full md:w-1/2 md:pr-4 mb-6 md:mb-0">
//           <div className="absolute top-2 right-2 z-10">
//             {automation.active ? <ActiveIndicator /> : <InactiveIndicator />}
//           </div>
//           <div className="mt-4">
//             <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//               {automation.name}
//             </h2>
//             <div className="flex flex-wrap gap-2 mb-4">
//               {automation.keywords.map((keyword, key) => (
//                 <div
//                   key={keyword.id}
//                   className={cn(
//                     'rounded-full px-3 py-1 text-xs capitalize backdrop-blur-sm',
//                     (key + 1) % 1 === 0 && 'bg-keyword-green/30 border border-keyword-green/50',
//                     (key + 1) % 2 === 0 && 'bg-keyword-purple/30 border border-keyword-purple/50',
//                     (key + 1) % 3 === 0 && 'bg-keyword-yellow/30 border border-keyword-yellow/50',
//                     (key + 1) % 4 === 0 && 'bg-keyword-red/30 border border-keyword-red/50'
//                   )}
//                 >
//                   {keyword.word}
//                 </div>
//               ))}
//             </div>
//             {automation.keywords.length === 0 && (
//               <div className="rounded-full border border-dashed border-white/30 px-3 py-1 inline-block mb-4">
//                 <p className="text-sm text-[#bfc0c3]">No Keywords</p>
//               </div>
//             )}
//             <AutomationStats automation={automation} />
//             <p className="text-sm font-light text-[#9B9CA0] mb-4">
//               Created {getRelativeTime(automation.createdAt)}
//             </p>
//             <div className="flex flex-col sm:flex-row gap-2">
//               {showDeleteConfirm ? (
//                 <>
//                   <Button
//                     className="bg-red-500 px-4 hover:bg-red-600 text-white flex-1"
//                     onClick={onDelete}
//                   >
//                     Confirm Delete
//                   </Button>
//                   <Button
//                     className="bg-gray-500 px-4 hover:bg-gray-600 text-white flex-1"
//                     onClick={() => setShowDeleteConfirm(false)}
//                   >
//                     Cancel
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Button
//                     className="bg-red-500 px-4 hover:bg-red-600 text-white flex-1 sm:flex-none"
//                     onClick={() => setShowDeleteConfirm(true)}
//                   >
//                     <Trash2 size={18} className="mr-2" />
//                     Delete
//                   </Button>
//                   <Button
//                     className="bg-blue-500 px-4 hover:bg-blue-600 text-white flex-1 sm:flex-none"
//                   >
//                     <Link href={`${pathname}/${automation.id}`} className="flex items-center">
//                       <Settings size={18} className="mr-2" />
//                       Configure
//                     </Link>
//                   </Button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="w-full md:w-1/2 md:pl-4 md:border-l border-[#545454]">
//         <AutomationChats automationId={automation.id} />
//           {/* <AutomationChats automationId={automation.id} /> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FancyAutomationBox;


// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { cn, getRelativeTime } from "@/lib/utils"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import GradientButton from "../gradient-button"
// import { ActiveIndicator } from "../indicators/active-indicator"
// import { InactiveIndicator } from "../indicators/inactive-indicator"
// import { Sparkles, Zap, Trash2, Settings, BarChart2 } from "lucide-react"
// import AutomationStats from "./automation-stats"
// import AutomationChats from "./automationChats"

// type Keyword = {
//   id: string
//   automationId: string | null
//   word: string
// }

// type Listener = {
//   id: string
//   listener: string
//   automationId: string
//   prompt: string
//   commentReply: string | null
//   dmCount: number
//   commentCount: number
// }

// interface Automation {
//   id: string
//   name: string
//   active: boolean
//   keywords: Keyword[]
//   createdAt: Date
//   listener: Listener | null
// }

// interface FancyAutomationBoxProps {
//   automation: Automation
//   onDelete: () => void
//   pathname: string
// }

// export const FancyAutomationBox: React.FC<FancyAutomationBoxProps> = ({ automation, onDelete, pathname }) => {
//   const [isHovered, setIsHovered] = useState(false)
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

//   useEffect(() => {
//     if (!isHovered) {
//       setShowDeleteConfirm(false)
//     }
//   }, [isHovered])

//   return (
//     <div
//       className="relative bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] rounded-xl transition-all duration-300 hover:shadow-lg group"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="absolute inset-0 rounded-xl border border-[#545454] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-7000 rounded-xl overflow-hidden"></div>
//       <div className="absolute -top-px left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
//       <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
//         <div className="bg-[#1D1D1D] px-1 rounded-full border border-[#545454] shadow-sm">
//           {automation.listener?.listener === "SMARTAI" ? (
//             <GradientButton
//               type="BUTTON"
//               className="text-xs bg-background-80 text-white hover:bg-background-80 px-4 py-1 -my-[3px] flex items-center gap-2"
//             >
//               <Sparkles size={14} />
//               Smart AI
//             </GradientButton>
//           ) : (
//             <GradientButton
//               type="BUTTON"
//               className="text-xs bg-background-80 text-white hover:bg-background-80 px-4 py-1 -my-[3px] flex items-center gap-2"
//             >
//               <Zap size={14} />
//               FREE
//             </GradientButton>
//           )}
//         </div>
//       </div>
//       <div className="relative z-10 p-6 flex flex-col">
//         <div className="w-full mb-6">
//           <div className="absolute top-2 right-2 z-10">
//             {automation.active ? <ActiveIndicator /> : <InactiveIndicator />}
//           </div>
//           <div className="mt-4">
//             <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//               {automation.name}
//             </h2>
//             <div className="flex flex-wrap gap-2 mb-4">
//               {automation.keywords.map((keyword, key) => (
//                 <div
//                   key={keyword.id}
//                   className={cn(
//                     "rounded-full px-3 py-1 text-xs capitalize backdrop-blur-sm",
//                     (key + 1) % 1 === 0 && "bg-keyword-green/30 border border-keyword-green/50",
//                     (key + 1) % 2 === 0 && "bg-keyword-purple/30 border border-keyword-purple/50",
//                     (key + 1) % 3 === 0 && "bg-keyword-yellow/30 border border-keyword-yellow/50",
//                     (key + 1) % 4 === 0 && "bg-keyword-red/30 border border-keyword-red/50",
//                   )}
//                 >
//                   {keyword.word}
//                 </div>
//               ))}
//             </div>
//             {automation.keywords.length === 0 && (
//               <div className="rounded-full border border-dashed border-white/30 px-3 py-1 inline-block mb-4">
//                 <p className="text-sm text-[#bfc0c3]">No Keywords</p>
//               </div>
//             )}
//             <AutomationStats automation={automation} />
//             <p className="text-sm font-light text-[#9B9CA0] mb-4">Created {getRelativeTime(automation.createdAt)}</p>
//             <div className="flex flex-col sm:flex-row gap-2">
//               {showDeleteConfirm ? (
//                 <>
//                   <Button
//                     className="bg-transparent border-2 border-red-500 text-red-500 px-4 hover:bg-red-500 hover:text-white flex-1 transition-colors duration-300"
//                     onClick={onDelete}
//                   >
//                     Confirm Delete
//                   </Button>
//                   <Button
//                     className="bg-transparent border-2 border-gray-500 text-gray-500 px-4 hover:bg-gray-500 hover:text-white flex-1 transition-colors duration-300"
//                     onClick={() => setShowDeleteConfirm(false)}
//                   >
//                     Cancel
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Button
//                     className="bg-transparent border-2 border-red-500 text-red-500 px-4 hover:bg-red-500 hover:text-white flex-1 sm:flex-none transition-colors duration-300"
//                     onClick={() => setShowDeleteConfirm(true)}
//                   >
//                     <Trash2 size={18} className="mr-2" />
//                     Delete
//                   </Button>
//                   <Button className="bg-transparent border-2 border-blue-500 text-blue-500 px-4 hover:bg-blue-500 hover:text-white flex-1 sm:flex-none transition-colors duration-300">
//                     <Link href={`${pathname}/${automation.id}`} className="flex items-center">
//                       <Settings size={18} className="mr-2" />
//                       Configure
//                     </Link>
//                   </Button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="w-full border-t border-[#545454] pt-4">
//           <h3 className="text-xl font-semibold mb-4 text-white">Quick Actions</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
//               <Zap size={18} className="mr-2" />
//               Boost Engagement
//             </Button>
//             <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white">
//               <Sparkles size={18} className="mr-2" />
//               Generate Content
//             </Button>
//             <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
//               <BarChart2 size={18} className="mr-2" />
//               View Analytics
//             </Button>
//           </div>
//         </div>
//         <div className="w-full border-t border-[#545454] mt-6 pt-6">
//           <AutomationChats automationId={automation.id} />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FancyAutomationBox

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { cn, getRelativeTime } from "@/lib/utils"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import GradientButton from "../gradient-button"
// import { ActiveIndicator } from "../indicators/active-indicator"
// import { InactiveIndicator } from "../indicators/inactive-indicator"
// import { Sparkles, Zap, Trash2, Settings, BarChart2 } from "lucide-react"
// import AutomationStats from "./automation-stats"
// import AutomationChats from "./automationChats"
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// type Keyword = {
//   id: string
//   automationId: string | null
//   word: string
// }

// type Listener = {
//   id: string
//   listener: string
//   automationId: string
//   prompt: string
//   commentReply: string | null
//   dmCount: number
//   commentCount: number
// }

// interface Automation {
//   id: string
//   name: string
//   active: boolean
//   keywords: Keyword[]
//   createdAt: Date
//   listener: Listener | null
// }

// interface FancyAutomationBoxProps {
//   automation: Automation
//   onDelete: () => void
//   pathname: string
// }

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

// export const FancyAutomationBox: React.FC<FancyAutomationBoxProps> = ({ automation, onDelete, pathname }) => {
//   const [isHovered, setIsHovered] = useState(false)
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

//   useEffect(() => {
//     if (!isHovered) {
//       setShowDeleteConfirm(false)
//     }
//   }, [isHovered])

//   // Mock data for the pie chart
//   const data = automation.keywords.map((keyword, index) => ({
//     name: keyword.word,
//     value: Math.floor(Math.random() * 100) + 1, // Random value for demonstration
//   }))

//   return (
//     <div
//       className="relative bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] rounded-xl transition-all duration-300 hover:shadow-lg group"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="absolute inset-0 rounded-xl border border-[#545454] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-7000 rounded-xl overflow-hidden"></div>
//       <div className="absolute -top-px left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
//       <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
//         <div className="bg-[#1D1D1D] px-1 rounded-full border border-[#545454] shadow-sm">
//           {automation.listener?.listener === "SMARTAI" ? (
//             <GradientButton
//               type="BUTTON"
//               className="text-xs bg-background-80 text-white hover:bg-background-80 px-4 py-1 -my-[3px] flex items-center gap-2"
//             >
//               <Sparkles size={14} />
//               Smart AI
//             </GradientButton>
//           ) : (
//             <GradientButton
//               type="BUTTON"
//               className="text-xs bg-background-80 text-white hover:bg-background-80 px-4 py-1 -my-[3px] flex items-center gap-2"
//             >
//               <Zap size={14} />
//               FREE
//             </GradientButton>
//           )}
//         </div>
//       </div>
//       <div className="relative z-10 p-6 flex flex-col">
//         <div className="w-full mb-6">
//           <div className="absolute top-2 right-2 z-10">
//             {automation.active ? <ActiveIndicator /> : <InactiveIndicator />}
//           </div>
//           <div className="mt-4 flex flex-col md:flex-row">
//             <div className="md:w-1/2 md:pr-4">
//               <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//                 {automation.name}
//               </h2>
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {automation.keywords.map((keyword, key) => (
//                   <div
//                     key={keyword.id}
//                     className={cn(
//                       "rounded-full px-3 py-1 text-xs capitalize backdrop-blur-sm",
//                       (key + 1) % 1 === 0 && "bg-keyword-green/30 border border-keyword-green/50",
//                       (key + 1) % 2 === 0 && "bg-keyword-purple/30 border border-keyword-purple/50",
//                       (key + 1) % 3 === 0 && "bg-keyword-yellow/30 border border-keyword-yellow/50",
//                       (key + 1) % 4 === 0 && "bg-keyword-red/30 border border-keyword-red/50",
//                     )}
//                   >
//                     {keyword.word}
//                   </div>
//                 ))}
//               </div>
//               {automation.keywords.length === 0 && (
//                 <div className="rounded-full border border-dashed border-white/30 px-3 py-1 inline-block mb-4">
//                   <p className="text-sm text-[#bfc0c3]">No Keywords</p>
//                 </div>
//               )}
//               <AutomationStats automation={automation} />
//               <p className="text-sm font-light text-[#9B9CA0] mb-4">Created {getRelativeTime(automation.createdAt)}</p>
//               <div className="flex flex-col sm:flex-row gap-2">
//                 {showDeleteConfirm ? (
//                   <>
//                     <Button
//                       className="bg-transparent border-2 border-red-500 text-red-500 px-4 hover:bg-red-500 hover:text-white flex-1 transition-colors duration-300"
//                       onClick={onDelete}
//                     >
//                       Confirm Delete
//                     </Button>
//                     <Button
//                       className="bg-transparent border-2 border-gray-500 text-gray-500 px-4 hover:bg-gray-500 hover:text-white flex-1 transition-colors duration-300"
//                       onClick={() => setShowDeleteConfirm(false)}
//                     >
//                       Cancel
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Button
//                       className="bg-transparent border-2 border-red-500 text-red-500 px-4 hover:bg-red-500 hover:text-white flex-1 sm:flex-none transition-colors duration-300"
//                       onClick={() => setShowDeleteConfirm(true)}
//                     >
//                       <Trash2 size={18} className="mr-2" />
//                       Delete
//                     </Button>
//                     <Button className="bg-transparent border-2 border-blue-500 text-blue-500 px-4 hover:bg-blue-500 hover:text-white flex-1 sm:flex-none transition-colors duration-300">
//                       <Link href={`${pathname}/${automation.id}`} className="flex items-center">
//                         <Settings size={18} className="mr-2" />
//                         Configure
//                       </Link>
//                     </Button>
//                   </>
//                 )}
//               </div>
//             </div>
//             <div className="md:w-1/2 md:pl-4 mt-6 md:mt-0 border-t md:border-t-0 md:border-l border-[#545454] pt-6 md:pt-0 md:pl-6">
//               <h3 className="text-xl font-semibold mb-4 text-white">Keyword Performance</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
//                     {data.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//         <div className="w-full border-t border-[#545454] pt-4">
//           <h3 className="text-xl font-semibold mb-4 text-white">Quick Actions</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
//               <Zap size={18} className="mr-2" />
//               Boost Engagement
//             </Button>
//             <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white">
//               <Sparkles size={18} className="mr-2" />
//               Generate Content
//             </Button>
//             <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
//               <BarChart2 size={18} className="mr-2" />
//               View Analytics
//             </Button>
//           </div>
//         </div>
//         <div className="w-full border-t border-[#545454] mt-6 pt-6">
//           <AutomationChats automationId={automation.id} />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FancyAutomationBox

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { cn, getRelativeTime } from "@/lib/utils"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import GradientButton from "../gradient-button"
// import { ActiveIndicator } from "../indicators/active-indicator"
// import { InactiveIndicator } from "../indicators/inactive-indicator"
// import { Sparkles, Zap, Trash2, Settings, BarChart2 } from "lucide-react"
// import AutomationStats from "./automation-stats"
// import AutomationChats from "./automationChats"
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
// import NoKeywordsAnimation from "./no-keywords-animation"

// type Keyword = {
//   id: string
//   automationId: string | null
//   word: string
// }

// type Listener = {
//   id: string
//   listener: string
//   automationId: string
//   prompt: string
//   commentReply: string | null
//   dmCount: number
//   commentCount: number
// }

// interface Automation {
//   id: string
//   name: string
//   active: boolean
//   keywords: Keyword[]
//   createdAt: Date
//   listener: Listener | null
// }

// interface FancyAutomationBoxProps {
//   automation: Automation
//   onDelete: () => void
//   pathname: string
// }

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

// export const FancyAutomationBox: React.FC<FancyAutomationBoxProps> = ({ automation, onDelete, pathname }) => {
//   const [isHovered, setIsHovered] = useState(false)
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

//   useEffect(() => {
//     if (!isHovered) {
//       setShowDeleteConfirm(false)
//     }
//   }, [isHovered])

//   // Mock data for the donut chart
//   const data = automation.keywords.map((keyword, index) => ({
//     name: keyword.word,
//     value: Math.floor(Math.random() * 100) + 1, // Random value for demonstration
//   }))

//   return (
//     <div
//       className="relative bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] rounded-xl transition-all duration-300 hover:shadow-lg group"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="absolute inset-0 rounded-xl border border-[#545454] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-7000 rounded-xl overflow-hidden"></div>
//       <div className="absolute -top-px left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
//       <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
//         <div className="bg-[#1D1D1D] px-1 rounded-full border border-[#545454] shadow-sm">
//           {automation.listener?.listener === "SMARTAI" ? (
//             <GradientButton
//               type="BUTTON"
//               className="text-xs bg-background-80 text-white hover:bg-background-80 px-4 py-1 -my-[3px] flex items-center gap-2"
//             >
//               <Sparkles size={14} />
//               Smart AI
//             </GradientButton>
//           ) : (
//             <GradientButton
//               type="BUTTON"
//               className="text-xs bg-background-80 text-white hover:bg-background-80 px-4 py-1 -my-[3px] flex items-center gap-2"
//             >
//               <Zap size={14} />
//               FREE
//             </GradientButton>
//           )}
//         </div>
//       </div>
//       <div className="relative z-10 p-6 flex flex-col">
//         <div className="w-full mb-6">
//           <div className="absolute top-2 right-2 z-10">
//             {automation.active ? <ActiveIndicator /> : <InactiveIndicator />}
//           </div>
//           <div className="mt-4 flex flex-col md:flex-row">
//             <div className="md:w-1/2 md:pr-4">
//               <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//                 {automation.name}
//               </h2>
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {automation.keywords.map((keyword, key) => (
//                   <div
//                     key={keyword.id}
//                     className={cn(
//                       "rounded-full px-3 py-1 text-xs capitalize backdrop-blur-sm",
//                       (key + 1) % 1 === 0 && "bg-keyword-green/30 border border-keyword-green/50",
//                       (key + 1) % 2 === 0 && "bg-keyword-purple/30 border border-keyword-purple/50",
//                       (key + 1) % 3 === 0 && "bg-keyword-yellow/30 border border-keyword-yellow/50",
//                       (key + 1) % 4 === 0 && "bg-keyword-red/30 border border-keyword-red/50",
//                     )}
//                   >
//                     {keyword.word}
//                   </div>
//                 ))}
//               </div>
//               {automation.keywords.length === 0 && (
//                 <div className="rounded-full border border-dashed border-white/30 px-3 py-1 inline-block mb-4">
//                   <p className="text-sm text-[#bfc0c3]">No Keywords</p>
//                 </div>
//               )}
//               <AutomationStats automation={automation} />
//               <p className="text-sm font-light text-[#9B9CA0] mb-4">Created {getRelativeTime(automation.createdAt)}</p>
//               <div className="flex flex-col sm:flex-row gap-2">
//                 {showDeleteConfirm ? (
//                   <>
//                     <Button
//                       className="bg-transparent border-2 border-red-500 text-red-500 px-4 hover:bg-red-500 hover:text-white flex-1 transition-colors duration-300"
//                       onClick={onDelete}
//                     >
//                       Confirm Delete
//                     </Button>
//                     <Button
//                       className="bg-transparent border-2 border-gray-500 text-gray-500 px-4 hover:bg-gray-500 hover:text-white flex-1 transition-colors duration-300"
//                       onClick={() => setShowDeleteConfirm(false)}
//                     >
//                       Cancel
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Button
//                       className="bg-transparent border-2 border-red-500 text-red-500 px-4 hover:bg-red-500 hover:text-white flex-1 sm:flex-none transition-colors duration-300"
//                       onClick={() => setShowDeleteConfirm(true)}
//                     >
//                       <Trash2 size={18} className="mr-2" />
//                       Delete
//                     </Button>
//                     <Button className="bg-transparent border-2 border-blue-500 text-blue-500 px-4 hover:bg-blue-500 hover:text-white flex-1 sm:flex-none transition-colors duration-300">
//                       <Link href={`${pathname}/${automation.id}`} className="flex items-center">
//                         <Settings size={18} className="mr-2" />
//                         Configure
//                       </Link>
//                     </Button>
//                   </>
//                 )}
//               </div>
//             </div>
//             <div className="md:w-1/2 md:pl-4 mt-6 md:mt-0 border-t md:border-t-0 md:border-l border-[#545454] pt-6 md:pt-0 md:pl-6">
//               <h3 className="text-xl font-semibold mb-4 text-white">Keyword Performance</h3>
//               {automation.keywords.length > 0 ? (
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={data}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       outerRadius={80}
//                       innerRadius={60}
//                       fill="#8884d8"
//                       dataKey="value"
//                     >
//                       {data.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip contentStyle={{ background: "#333", border: "none", color: "#fff" }} />
//                     <Legend wrapperStyle={{ color: "#fff" }} />
//                   </PieChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <NoKeywordsAnimation />
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="w-full border-t border-[#545454] pt-4">
//           <h3 className="text-xl font-semibold mb-4 text-white">Quick Actions</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
//               <Zap size={18} className="mr-2" />
//               Boost Engagement
//             </Button>
//             <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white">
//               <Sparkles size={18} className="mr-2" />
//               Generate Content
//             </Button>
//             <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
//               <BarChart2 size={18} className="mr-2" />
//               View Analytics
//             </Button>
//           </div>
//         </div>
//         <div className="w-full border-t border-[#545454] mt-6 pt-6">
//           <AutomationChats automationId={automation.id} />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FancyAutomationBox

// "use client"

// import type React from "react"
// import { useState, useEffect, useRef } from "react"
// import { cn, getRelativeTime } from "@/lib/utils"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import GradientButton from "../gradient-button"
// import { ActiveIndicator } from "../indicators/active-indicator"
// import { InactiveIndicator } from "../indicators/inactive-indicator"
// import { Sparkles, Zap, Trash2, Settings, MessageCircle, X } from "lucide-react"
// import AutomationStats from "./automation-stats"
// import AutomationChats from "./automationChats"
// import NoKeywordsAnimation from "./no-keywords-animation"
// import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
// import { motion, AnimatePresence } from "framer-motion"

// type Keyword = {
//   id: string
//   automationId: string | null
//   word: string
// }

// type Listener = {
//   id: string
//   listener: string
//   automationId: string
//   prompt: string
//   commentReply: string | null
//   dmCount: number
//   commentCount: number
// }

// interface Automation {
//   id: string
//   name: string
//   active: boolean
//   keywords: Keyword[]
//   createdAt: Date
//   listener: Listener | null
// }

// interface FancyAutomationBoxProps {
//   automation: Automation
//   onDelete: () => void
//   pathname: string
// }

// export const FancyAutomationBox: React.FC<FancyAutomationBoxProps> = ({ automation, onDelete, pathname }) => {
//   const [isHovered, setIsHovered] = useState(false)
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
//   const [showChats, setShowChats] = useState(false)
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const boxRef = useRef<HTMLDivElement>(null)
//   const chatBtnRef = useRef<HTMLButtonElement>(null)

//   useEffect(() => {
//     if (!isHovered) {
//       setShowDeleteConfirm(false)
//     }
//   }, [isHovered])

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (boxRef.current) {
//         const rect = boxRef.current.getBoundingClientRect()
//         setMousePosition({
//           x: e.clientX - rect.left,
//           y: e.clientY - rect.top,
//         })
//       }
//     }

//     const element = boxRef.current
//     if (element) {
//       element.addEventListener("mousemove", handleMouseMove)
//     }

//     return () => {
//       if (element) {
//         element.removeEventListener("mousemove", handleMouseMove)
//       }
//     }
//   }, [])

//   // Generate mock sentiment analysis data
//   const sentimentData = Array.from({ length: 14 }, (_, i) => {
//     const date = new Date()
//     date.setDate(date.getDate() - (13 - i))

//     return {
//       date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
//       positive: 50 + Math.random() * 30,
//       negative: 10 + Math.random() * 20,
//       neutral: 20 + Math.random() * 15,
//     }
//   })

//   return (
//     <div
//       ref={boxRef}
//       className="relative bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] rounded-xl transition-all duration-300 hover:shadow-lg group overflow-hidden"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Reactive highlight effect that follows mouse position */}
//       <div
//         className="absolute pointer-events-none w-[300px] h-[300px] rounded-full opacity-10 transition-opacity duration-300 z-0"
//         style={{
//           background: "radial-gradient(circle, rgba(125,211,252,0.4) 0%, rgba(125,211,252,0) 70%)",
//           left: `${mousePosition.x - 150}px`,
//           top: `${mousePosition.y - 150}px`,
//           opacity: isHovered ? 0.2 : 0,
//         }}
//       />

//       <div className="absolute inset-0 rounded-xl border border-[#545454] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-7000 rounded-xl overflow-hidden"></div>
//       <div className="absolute -top-px left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
//       <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
//         <div className="bg-[#1D1D1D] px-1 rounded-full border border-[#545454] shadow-sm">
//           {automation.listener?.listener === "SMARTAI" ? (
//             <GradientButton
//               type="BUTTON"
//               className="text-xs bg-background-80 text-white hover:bg-background-80 px-4 py-1 -my-[3px] flex items-center gap-2"
//             >
//               <Sparkles size={14} />
//               Smart AI
//             </GradientButton>
//           ) : (
//             <GradientButton
//               type="BUTTON"
//               className="text-xs bg-background-80 text-white hover:bg-background-80 px-4 py-1 -my-[3px] flex items-center gap-2"
//             >
//               <Zap size={14} />
//               FREE
//             </GradientButton>
//           )}
//         </div>
//       </div>

//       <div className="relative z-10 p-6 flex flex-col">
//         <div className="w-full mb-6">
//           <div className="absolute top-2 right-2 z-10">
//             {automation.active ? <ActiveIndicator /> : <InactiveIndicator />}
//           </div>
//           <div className="mt-4 flex flex-col md:flex-row">
//             <div className="md:w-1/2 md:pr-4">
//               <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//                 {automation.name}
//               </h2>
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {automation.keywords.map((keyword, key) => (
//                   <div
//                     key={keyword.id}
//                     className={cn(
//                       "rounded-full px-3 py-1 text-xs capitalize backdrop-blur-sm",
//                       (key + 1) % 1 === 0 && "bg-keyword-green/30 border border-keyword-green/50",
//                       (key + 1) % 2 === 0 && "bg-keyword-purple/30 border border-keyword-purple/50",
//                       (key + 1) % 3 === 0 && "bg-keyword-yellow/30 border border-keyword-yellow/50",
//                       (key + 1) % 4 === 0 && "bg-keyword-red/30 border border-keyword-red/50",
//                     )}
//                   >
//                     {keyword.word}
//                   </div>
//                 ))}
//               </div>
//               {automation.keywords.length === 0 && (
//                 <div className="rounded-full border border-dashed border-white/30 px-3 py-1 inline-block mb-4">
//                   <p className="text-sm text-[#bfc0c3]">No Keywords</p>
//                 </div>
//               )}
//               <AutomationStats automation={automation} />
//               <p className="text-sm font-light text-[#9B9CA0] mb-4">Created {getRelativeTime(automation.createdAt)}</p>
//               <div className="flex flex-col sm:flex-row gap-2">
//                 {showDeleteConfirm ? (
//                   <>
//                     <Button
//                       className="bg-transparent border-2 border-red-500 text-red-500 px-4 hover:bg-red-500 hover:text-white flex-1 transition-colors duration-300"
//                       onClick={onDelete}
//                     >
//                       Confirm Delete
//                     </Button>
//                     <Button
//                       className="bg-transparent border-2 border-gray-500 text-gray-500 px-4 hover:bg-gray-500 hover:text-white flex-1 transition-colors duration-300"
//                       onClick={() => setShowDeleteConfirm(false)}
//                     >
//                       Cancel
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Button
//                       className="bg-transparent border-2 border-red-500 text-red-500 px-4 hover:bg-red-500 hover:text-white flex-1 sm:flex-none transition-colors duration-300"
//                       onClick={() => setShowDeleteConfirm(true)}
//                     >
//                       <Trash2 size={18} className="mr-2" />
//                       Delete
//                     </Button>
//                     <Button className="bg-transparent border-2 border-blue-500 text-blue-500 px-4 hover:bg-blue-500 hover:text-white flex-1 sm:flex-none transition-colors duration-300">
//                       <Link href={`${pathname}/${automation.id}`} className="flex items-center">
//                         <Settings size={18} className="mr-2" />
//                         Configure
//                       </Link>
//                     </Button>

//                     {/* Floating Chat Button with liquid effect */}
//                     <motion.button
//                       ref={chatBtnRef}
//                       className="relative sm:ml-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full w-10 h-10 flex items-center justify-center overflow-hidden"
//                       onClick={() => setShowChats(!showChats)}
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       <div className="relative z-10">{showChats ? <X size={18} /> : <MessageCircle size={18} />}</div>
//                       {/* Liquid bubble effect */}
//                       <div className="absolute inset-0">
//                         <div className="absolute inset-0 opacity-25 mix-blend-overlay">
//                           <div className="absolute top-0 left-0 w-full h-full">
//                             {Array.from({ length: 10 }).map((_, i) => (
//                               <div
//                                 key={i}
//                                 className="absolute rounded-full bg-white/30"
//                                 style={{
//                                   width: `${Math.random() * 50 + 10}px`,
//                                   height: `${Math.random() * 50 + 10}px`,
//                                   top: `${Math.random() * 100}%`,
//                                   left: `${Math.random() * 100}%`,
//                                   animation: `float-${i % 3} ${Math.random() * 10 + 5}s infinite ease-in-out`,
//                                 }}
//                               />
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                       <style jsx>{`
//                         @keyframes float-0 {
//                           0%, 100% { transform: translate(0, 0); }
//                           50% { transform: translate(10px, -15px); }
//                         }
//                         @keyframes float-1 {
//                           0%, 100% { transform: translate(0, 0); }
//                           50% { transform: translate(-15px, 10px); }
//                         }
//                         @keyframes float-2 {
//                           0%, 100% { transform: translate(0, 0); }
//                           50% { transform: translate(5px, 10px); }
//                         }
//                       `}</style>
//                     </motion.button>
//                   </>
//                 )}
//               </div>
//             </div>
//             <div className="md:w-1/2 md:pl-4 mt-6 md:mt-0 border-t md:border-t-0 md:border-l border-[#545454] pt-6 md:pt-0 md:pl-6">
//               <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
//                 <span className="mr-2">Sentiment Analysis</span>
//                 <span className="bg-gradient-to-r from-green-400 to-teal-500 text-xs rounded-full px-2 py-0.5">
//                   LIVE
//                 </span>
//               </h3>
//               {automation.keywords.length > 0 ? (
//                 <div className="relative">
//                   {/* Glowing background effect */}
//                   <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 to-transparent rounded-xl filter blur-lg opacity-50"></div>

//                   {/* Small Sentiment Analysis Chart */}
//                   <ResponsiveContainer width="100%" height={180}>
//                     <AreaChart data={sentimentData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
//                       <defs>
//                         <linearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
//                           <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
//                         </linearGradient>
//                         <linearGradient id="negativeGradient" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%" stopColor="#f87171" stopOpacity={0.8} />
//                           <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
//                         </linearGradient>
//                         <linearGradient id="neutralGradient" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.8} />
//                           <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
//                         </linearGradient>
//                       </defs>
//                       <XAxis
//                         dataKey="date"
//                         tick={{ fill: "#9B9CA0", fontSize: 10 }}
//                         tickLine={false}
//                         axisLine={false}
//                       />
//                       <YAxis hide={true} />
//                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#545454" opacity={0.3} />
//                       <Tooltip
//                         contentStyle={{
//                           backgroundColor: "rgba(30, 30, 30, 0.9)",
//                           borderColor: "#545454",
//                           borderRadius: "8px",
//                           boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
//                         }}
//                         itemStyle={{ color: "#fff" }}
//                         labelStyle={{ color: "#aaa" }}
//                       />
//                       <Area
//                         type="monotone"
//                         dataKey="positive"
//                         stackId="1"
//                         stroke="#4ade80"
//                         fill="url(#positiveGradient)"
//                         name="Positive"
//                       />
//                       <Area
//                         type="monotone"
//                         dataKey="negative"
//                         stackId="1"
//                         stroke="#f87171"
//                         fill="url(#negativeGradient)"
//                         name="Negative"
//                       />
//                       <Area
//                         type="monotone"
//                         dataKey="neutral"
//                         stackId="1"
//                         stroke="#94a3b8"
//                         fill="url(#neutralGradient)"
//                         name="Neutral"
//                       />
//                     </AreaChart>
//                   </ResponsiveContainer>

//                   {/* Legend Indicators */}
//                   <div className="flex justify-center gap-4 mt-2">
//                     <div className="flex items-center gap-1">
//                       <div className="w-3 h-3 rounded-full bg-[#4ade80]"></div>
//                       <span className="text-xs text-[#9B9CA0]">Positive</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <div className="w-3 h-3 rounded-full bg-[#f87171]"></div>
//                       <span className="text-xs text-[#9B9CA0]">Negative</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <div className="w-3 h-3 rounded-full bg-[#94a3b8]"></div>
//                       <span className="text-xs text-[#9B9CA0]">Neutral</span>
//                     </div>
//                   </div>

//                   {/* Live data indicators */}
//                   <div className="absolute top-2 right-2">
//                     <div className="flex items-center gap-1">
//                       <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <NoKeywordsAnimation />
//               )}

//               {/* Sentiment summary cards */}
//               <div className="grid grid-cols-3 gap-2 mt-4">
//                 <Card className="bg-gradient-to-br from-[#2A2A2A]/80 to-[#1D1D1D]/80 border-keyword-green/30 p-2">
//                   <div className="text-center">
//                     <div className="text-xs text-[#9B9CA0]">Positive</div>
//                     <div className="text-lg font-bold text-green-400">68%</div>
//                   </div>
//                 </Card>
//                 <Card className="bg-gradient-to-br from-[#2A2A2A]/80 to-[#1D1D1D]/80 border-keyword-red/30 p-2">
//                   <div className="text-center">
//                     <div className="text-xs text-[#9B9CA0]">Negative</div>
//                     <div className="text-lg font-bold text-red-400">12%</div>
//                   </div>
//                 </Card>
//                 <Card className="bg-gradient-to-br from-[#2A2A2A]/80 to-[#1D1D1D]/80 border-keyword-yellow/30 p-2">
//                   <div className="text-center">
//                     <div className="text-xs text-[#9B9CA0]">Neutral</div>
//                     <div className="text-lg font-bold text-slate-400">20%</div>
//                   </div>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Chat modal with portal-like opening effect */}
//         <AnimatePresence>
//           {showChats && (
//             <motion.div
//               initial={{ opacity: 0, height: 0, scale: 0.9 }}
//               animate={{
//                 opacity: 1,
//                 height: "auto",
//                 scale: 1,
//                 transition: { duration: 0.5, type: "spring" },
//               }}
//               exit={{
//                 opacity: 0,
//                 height: 0,
//                 scale: 0.95,
//                 transition: { duration: 0.3, ease: "easeInOut" },
//               }}
//               className="w-full mt-4 overflow-hidden"
//             >
//               <motion.div
//                 initial={{ y: 50, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.2, duration: 0.4 }}
//                 className="border border-[#545454] rounded-xl p-4 relative overflow-hidden"
//               >
//                 {/* Portal effect background */}
//                 <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-purple-500/5"></div>
//                 <div className="absolute -inset-x-full top-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-[shimmer_2s_infinite]"></div>
//                 <div className="absolute -inset-y-full right-0 w-[1px] bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-[shimmer_2s_infinite]"></div>
//                 <div className="absolute -inset-x-full bottom-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-[shimmer_2s_infinite]"></div>
//                 <div className="absolute -inset-y-full left-0 w-[1px] bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-[shimmer_2s_infinite]"></div>

//                 {/* Content */}
//                 <div className="relative">
//                   <div className="flex items-center justify-between mb-3">
//                     <h3 className="text-xl font-semibold text-white flex items-center">
//                       <MessageCircle size={18} className="mr-2 text-indigo-400" />
//                       <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
//                         Automation Chats
//                       </span>
//                     </h3>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="hover:bg-white/10 rounded-full h-8 w-8 p-0"
//                       onClick={() => setShowChats(false)}
//                     >
//                       <X size={16} />
//                     </Button>
//                   </div>

//                   <AutomationChats automationId={automation.id} />
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   )
// }

// export default FancyAutomationBox

// "use client"

// import React from "react"
// import { cn, getRelativeTime } from "@/lib/utils"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { ActiveIndicator } from "../indicators/active-indicator"
// import { InactiveIndicator } from "../indicators/inactive-indicator"
// import { Trash2, Settings, MessageSquare, ChevronDown, ChevronUp, Hash, Clock, MessageCircle } from "lucide-react"
// import AutomationStats from "./automation-stats"
// import AutomationChats from "./automationChats"
// import { motion, AnimatePresence } from "framer-motion"

// type Keyword = {
//   id: string
//   automationId: string | null
//   word: string
// }

// type Listener = {
//   id: string
//   listener: string
//   automationId: string
//   prompt: string
//   commentReply: string | null
//   dmCount: number
//   commentCount: number
// }

// interface Automation {
//   id: string
//   name: string
//   active: boolean
//   keywords: Keyword[]
//   createdAt: Date
//   listener: Listener | null
// }

// interface FancyAutomationBoxProps {
//   automation: Automation
//   onDelete: () => void
//   pathname: string
// }

// export const FancyAutomationBox: React.FC<FancyAutomationBoxProps> = ({ automation, onDelete, pathname }) => {
//   const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false)
//   const [showChats, setShowChats] = React.useState(false)

//   const QuickStatCard = ({
//     icon: Icon,
//     label,
//     value,
//   }: { icon: React.ElementType; label: string; value: string | number }) => (
//     <Card className="bg-[#1D1D1D]/30 border-[#545454]/50 p-3 flex items-center">
//       <div className="mr-3 w-8 h-8 rounded-full border border-[#545454] flex items-center justify-center bg-gradient-to-br from-[#2A2A2A] to-[#1D1D1D]">
//         <Icon size={16} className="text-blue-400" />
//       </div>
//       <div>
//         <p className="text-xs text-[#9B9CA0]">{label}</p>
//         <p className="text-lg font-semibold text-white">{value}</p>
//       </div>
//     </Card>
//   )

//   return (
//     <Card className="bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] rounded-xl overflow-hidden border-[#545454]">
//       <div className="p-6">
//         <div className="flex justify-between items-start mb-4">
//           <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//             {automation.name}
//           </h2>
//           <div className="flex items-center space-x-2">
//             {automation.active ? <ActiveIndicator /> : <InactiveIndicator />}
//             <Badge variant="outline" className="border-blue-400/50 text-blue-400">
//               {automation.listener?.listener === "SMARTAI" ? "Smart AI" : "FREE"}
//             </Badge>
//           </div>
//         </div>

//         {/* Quick Stats Section */}
//         <div className="grid grid-cols-2 gap-3 mb-4">
//           <QuickStatCard icon={Hash} label="Keywords" value={automation.keywords.length} />
//           <QuickStatCard icon={MessageCircle} label="Total Messages" value={automation.listener?.dmCount || 0} />
//           <QuickStatCard icon={Clock} label="Active Since" value={getRelativeTime(automation.createdAt)} />
//           <QuickStatCard icon={MessageSquare} label="Comments" value={automation.listener?.commentCount || 0} />
//         </div>

//         <div className="flex flex-wrap gap-2 mb-4">
//           {automation.keywords.map((keyword, key) => (
//             <div
//               key={keyword.id}
//               className={cn(
//                 "rounded-full px-3 py-1 text-xs capitalize backdrop-blur-sm",
//                 (key + 1) % 1 === 0 && "bg-keyword-green/30 border border-keyword-green/50",
//                 (key + 1) % 2 === 0 && "bg-keyword-purple/30 border border-keyword-purple/50",
//                 (key + 1) % 3 === 0 && "bg-keyword-yellow/30 border border-keyword-yellow/50",
//                 (key + 1) % 4 === 0 && "bg-keyword-red/30 border border-keyword-red/50",
//               )}
//             >
//               {keyword.word}
//             </div>
//           ))}
//         </div>
//         {automation.keywords.length === 0 && (
//           <div className="rounded-full border border-dashed border-white/30 px-3 py-1 inline-block mb-4">
//             <p className="text-sm text-[#bfc0c3]">No Keywords</p>
//           </div>
//         )}

//         <AutomationStats automation={automation} />

//         <div className="flex flex-col sm:flex-row gap-2 mt-4">
//           {showDeleteConfirm ? (
//             <>
//               <Button
//                 className="bg-transparent border-2 border-red-500 text-red-500 px-4 hover:bg-red-500 hover:text-white flex-1 transition-colors duration-300"
//                 onClick={onDelete}
//               >
//                 Confirm Delete
//               </Button>
//               <Button
//                 className="bg-transparent border-2 border-gray-500 text-gray-500 px-4 hover:bg-gray-500 hover:text-white flex-1 transition-colors duration-300"
//                 onClick={() => setShowDeleteConfirm(false)}
//               >
//                 Cancel
//               </Button>
//             </>
//           ) : (
//             <>
//               <Button
//                 className="bg-transparent border-2 border-red-500 text-red-500 px-4 hover:bg-red-500 hover:text-white flex-1 sm:flex-none transition-colors duration-300"
//                 onClick={() => setShowDeleteConfirm(true)}
//               >
//                 <Trash2 size={18} className="mr-2" />
//                 Delete
//               </Button>
//               <Button className="bg-transparent border-2 border-blue-500 text-blue-500 px-4 hover:bg-blue-500 hover:text-white flex-1 sm:flex-none transition-colors duration-300">
//                 <Link href={`${pathname}/${automation.id}`} className="flex items-center">
//                   <Settings size={18} className="mr-2" />
//                   Configure
//                 </Link>
//               </Button>
//             </>
//           )}
//         </div>

//         <div className="mt-6 border-t border-[#545454] pt-4">
//           <button
//             className="w-full flex items-center justify-between p-2 rounded-lg border border-[#545454]/50 bg-transparent transition-colors duration-300"
//             onClick={() => setShowChats(!showChats)}
//           >
//             <div className="flex items-center">
//               <div className="mr-3 w-8 h-8 rounded-full border border-[#545454] flex items-center justify-center bg-gradient-to-br from-[#2A2A2A] to-[#1D1D1D]">
//                 <MessageSquare size={16} className="text-blue-400" />
//               </div>
//               <span className="font-medium">View Conversation History</span>
//               {automation.listener?.dmCount && automation.listener.dmCount > 0 && (
//                 <Badge className="ml-2 bg-blue-500/20 text-blue-400 border border-blue-500/30">
//                   {automation.listener.dmCount} messages
//                 </Badge>
//               )}
//             </div>
//             <div>
//               {showChats ? (
//                 <ChevronUp size={20} className="text-[#9B9CA0]" />
//               ) : (
//                 <ChevronDown size={20} className="text-[#9B9CA0]" />
//               )}
//             </div>
//           </button>
//         </div>

//         <AnimatePresence>
//           {showChats && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{
//                 height: "auto",
//                 opacity: 1,
//                 transition: { duration: 0.3, ease: "easeOut" },
//               }}
//               exit={{
//                 height: 0,
//                 opacity: 0,
//                 transition: { duration: 0.2, ease: "easeIn" },
//               }}
//               className="w-full overflow-hidden"
//             >
//               <motion.div
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.1, duration: 0.3 }}
//                 className="border border-[#545454]/50 rounded-lg p-4 mt-3 bg-[#1D1D1D]/30"
//               >
//                 <AutomationChats automationId={automation.id} />
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </Card>
//   )
// }

// export default FancyAutomationBox

// "use client"

// import type React from "react"
// import { useState } from "react"
// import { cn, getRelativeTime } from "@/lib/utils"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { ActiveIndicator } from "../indicators/active-indicator"
// import { InactiveIndicator } from "../indicators/inactive-indicator"
// import { Sparkles, Zap, Trash2, Settings, MessageSquareText } from "lucide-react"
// import AutomationStats from "./automation-stats"
// import AutomationChats from "./automationChats"
// import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// type Keyword = {
//   id: string
//   automationId: string | null
//   word: string
// }

// type Listener = {
//   id: string
//   listener: string
//   automationId: string
//   prompt: string
//   commentReply: string | null
//   dmCount: number
//   commentCount: number
// }

// interface Automation {
//   id: string
//   name: string
//   active: boolean
//   keywords: Keyword[]
//   createdAt: Date
//   listener: Listener | null
// }

// interface FancyAutomationBoxProps {
//   automation: Automation
//   onDelete: () => void
//   pathname: string
// }

// export const FancyAutomationBox: React.FC<FancyAutomationBoxProps> = ({ automation, onDelete, pathname }) => {
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
//   const [showChats, setShowChats] = useState(false)

//   // Mock data for current sentiment
//   const sentimentData = [
//     { name: "Positive", value: 65 },
//     { name: "Neutral", value: 25 },
//     { name: "Negative", value: 10 },
//   ]

//   return (
//     <Card className="bg-background border-2 border-border hover:border-primary/50 transition-colors duration-300">
//       <div className="p-6">
//         <div className="flex justify-between items-start mb-4">
//           <h2 className="text-2xl font-bold text-foreground">{automation.name}</h2>
//           <div className="flex items-center space-x-2">
//             {automation.active ? <ActiveIndicator /> : <InactiveIndicator />}
//             {automation.listener?.listener === "SMARTAI" ? (
//               <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
//                 <Sparkles size={14} className="mr-1" />
//                 Smart AI
//               </Badge>
//             ) : (
//               <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/30">
//                 <Zap size={14} className="mr-1" />
//                 FREE
//               </Badge>
//             )}
//           </div>
//         </div>

//         <div className="flex flex-wrap gap-2 mb-4">
//           {automation.keywords.map((keyword, key) => (
//             <Badge
//               key={keyword.id}
//               variant="outline"
//               className={cn(
//                 "capitalize",
//                 key % 4 === 0 && "border-green-500/30 text-green-500",
//                 key % 4 === 1 && "border-purple-500/30 text-purple-500",
//                 key % 4 === 2 && "border-yellow-500/30 text-yellow-500",
//                 key % 4 === 3 && "border-red-500/30 text-red-500",
//               )}
//             >
//               {keyword.word}
//             </Badge>
//           ))}
//         </div>

//         {automation.keywords.length === 0 && (
//           <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground">
//             No Keywords
//           </Badge>
//         )}

//         <AutomationStats automation={automation} />

//         <div className="mt-4 flex justify-between items-end">
//           <p className="text-sm text-muted-foreground">Created {getRelativeTime(automation.createdAt)}</p>
//           <div className="flex space-x-2">
//             <Button
//               variant="outline"
//               size="sm"
//               className="border-destructive/30 text-destructive hover:bg-destructive/10"
//               onClick={() => setShowDeleteConfirm(true)}
//             >
//               <Trash2 size={16} className="mr-2" />
//               Delete
//             </Button>
//             <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
//               <Link href={`${pathname}/${automation.id}`} className="flex items-center">
//                 <Settings size={16} className="mr-2" />
//                 Configure
//               </Link>
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               className="border-secondary/30 text-secondary hover:bg-secondary/10"
//               onClick={() => setShowChats(!showChats)}
//             >
//               <MessageSquareText size={16} className="mr-2" />
//               Chats
//             </Button>
//           </div>
//         </div>

//         {showDeleteConfirm && (
//           <div className="mt-4 p-4 border border-destructive/30 rounded-md bg-destructive/10">
//             <p className="text-sm text-destructive mb-2">Are you sure you want to delete this automation?</p>
//             <div className="flex space-x-2">
//               <Button variant="destructive" size="sm" onClick={onDelete}>
//                 Confirm Delete
//               </Button>
//               <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(false)}>
//                 Cancel
//               </Button>
//             </div>
//           </div>
//         )}

//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-2 text-foreground">Current Sentiment</h3>
//           <div className="h-24">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={sentimentData} layout="vertical">
//                 <XAxis type="number" hide />
//                 <YAxis dataKey="name" type="category" hide />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "hsl(var(--background))",
//                     border: "1px solid hsl(var(--border))",
//                     borderRadius: "0.5rem",
//                   }}
//                 />
//                 <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//           <div className="flex justify-between mt-2">
//             {sentimentData.map((item) => (
//               <div key={item.name} className="text-center">
//                 <p className="text-sm font-medium text-muted-foreground">{item.name}</p>
//                 <p className="text-lg font-bold text-foreground">{item.value}%</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {showChats && (
//           <div className="mt-6 border-t border-border pt-4">
//             <h3 className="text-lg font-semibold mb-2 text-foreground">Automation Chats</h3>
//             <AutomationChats automationId={automation.id} />
//           </div>
//         )}
//       </div>
//     </Card>
//   )
// }

// export default FancyAutomationBox

// "use client"

// import type React from "react"
// import { useState } from "react"
// import { cn, getRelativeTime } from "@/lib/utils"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { ActiveIndicator } from "../indicators/active-indicator"
// import { InactiveIndicator } from "../indicators/inactive-indicator"
// import { Sparkles, Zap, Trash2, Settings, MessageSquareText, Clock } from "lucide-react"
// import AutomationStats from "./automation-stats"
// import AutomationChats from "./automationChats"
// import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, Cell } from "recharts"

// type Keyword = {
//   id: string
//   automationId: string | null
//   word: string
// }

// type Listener = {
//   id: string
//   listener: string
//   automationId: string
//   prompt: string
//   commentReply: string | null
//   dmCount: number
//   commentCount: number
// }

// interface Automation {
//   id: string
//   name: string
//   active: boolean
//   keywords: Keyword[]
//   createdAt: Date
//   listener: Listener | null
// }

// interface FancyAutomationBoxProps {
//   automation: Automation
//   onDelete: () => void
//   pathname: string
// }

// export const FancyAutomationBox: React.FC<FancyAutomationBoxProps> = ({ automation, onDelete, pathname }) => {
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
//   const [showChats, setShowChats] = useState(false)

//   // Mock data for current sentiment
//   const sentimentData = [
//     { name: "Positive", value: 65, color: "#10B981" },
//     { name: "Neutral", value: 25, color: "#6B7280" },
//     { name: "Negative", value: 10, color: "#EF4444" },
//   ]

//   return (
//     <Card className="bg-background border-2 border-border hover:border-primary/50 transition-colors duration-300 relative overflow-hidden">
//       <div className="p-6">
//         <div className="flex justify-between items-start mb-4">
//           <h2 className="text-2xl font-bold text-foreground">{automation.name}</h2>
//           <div className="flex items-center space-x-2">
//             {automation.active ? <ActiveIndicator /> : <InactiveIndicator />}
//             {automation.listener?.listener === "SMARTAI" ? (
//               <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
//                 <Sparkles size={14} className="mr-1" />
//                 Smart AI
//               </Badge>
//             ) : (
//               <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/30">
//                 <Zap size={14} className="mr-1" />
//                 FREE
//               </Badge>
//             )}
//           </div>
//         </div>

//         <div className="flex flex-wrap gap-2 mb-4">
//           {automation.keywords.map((keyword, key) => (
//             <Badge
//               key={keyword.id}
//               variant="outline"
//               className={cn(
//                 "capitalize",
//                 key % 4 === 0 && "border-green-500/30 text-green-500",
//                 key % 4 === 1 && "border-purple-500/30 text-purple-500",
//                 key % 4 === 2 && "border-yellow-500/30 text-yellow-500",
//                 key % 4 === 3 && "border-red-500/30 text-red-500",
//               )}
//             >
//               {keyword.word}
//             </Badge>
//           ))}
//         </div>

//         {automation.keywords.length === 0 && (
//           <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground">
//             No Keywords
//           </Badge>
//         )}

//         <AutomationStats automation={automation} />

//         <div className="mt-4 flex justify-between items-center">
//           <div className="flex space-x-2">
//             <Button
//               variant="outline"
//               size="sm"
//               className="border-destructive/30 text-destructive hover:bg-destructive/10"
//               onClick={() => setShowDeleteConfirm(true)}
//             >
//               <Trash2 size={16} className="mr-2" />
//               Delete
//             </Button>
//             <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
//               <Link href={`${pathname}/${automation.id}`} className="flex items-center">
//                 <Settings size={16} className="mr-2" />
//                 Configure
//               </Link>
//             </Button>
//           </div>
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   className="rounded-full border-secondary/30 text-secondary hover:bg-secondary/10"
//                   onClick={() => setShowChats(!showChats)}
//                 >
//                   <MessageSquareText size={20} />
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>Open Automation Chats</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>

//         {showDeleteConfirm && (
//           <div className="mt-4 p-4 border border-destructive/30 rounded-md bg-destructive/10">
//             <p className="text-sm text-destructive mb-2">Are you sure you want to delete this automation?</p>
//             <div className="flex space-x-2">
//               <Button variant="destructive" size="sm" onClick={onDelete}>
//                 Confirm Delete
//               </Button>
//               <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(false)}>
//                 Cancel
//               </Button>
//             </div>
//           </div>
//         )}

//         <div className="mt-6 space-y-4">
//           <div className="flex items-center space-x-2 text-muted-foreground">
//             <Clock size={16} />
//             <p className="text-sm font-medium">Created {getRelativeTime(automation.createdAt)}</p>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold mb-2 text-foreground">Current Sentiment</h3>
//             <div className="h-24">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={sentimentData} layout="vertical">
//                   <XAxis type="number" hide />
//                   <YAxis dataKey="name" type="category" hide />
//                   <RechartsTooltip
//                     contentStyle={{
//                       backgroundColor: "hsl(var(--background))",
//                       border: "1px solid hsl(var(--border))",
//                       borderRadius: "0.5rem",
//                     }}
//                     formatter={(value, name, props) => [`${value}%`, props.payload.name]}
//                   />
//                   <Bar dataKey="value" radius={[0, 4, 4, 0]}>
//                     {sentimentData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//             <div className="flex justify-between mt-2">
//               {sentimentData.map((item) => (
//                 <div key={item.name} className="text-center">
//                   <p className="text-sm font-medium" style={{ color: item.color }}>
//                     {item.name}
//                   </p>
//                   <p className="text-lg font-bold text-foreground">{item.value}%</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {showChats && (
//           <div className="mt-6 border-t border-border pt-4">
//             <h3 className="text-lg font-semibold mb-2 text-foreground">Automation Chats</h3>
//             <AutomationChats automationId={automation.id} />
//           </div>
//         )}
//       </div>

//       {/* Decorative element */}
//       <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-bl-full opacity-50" />
//     </Card>
//   )
// }

// export default FancyAutomationBox

"use client"

import type React from "react"
import { useState } from "react"
import { cn, getRelativeTime } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ActiveIndicator } from "../indicators/active-indicator"
import { InactiveIndicator } from "../indicators/inactive-indicator"
import { Sparkles, Zap, Trash2, Settings, MessageSquareText,MessageSquare, ChevronDown, ChevronUp,Clock } from "lucide-react"
import AutomationStats from "./automation-stats"
import AutomationChats from "./automationChats"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, Cell } from "recharts"
import { motion, AnimatePresence } from "framer-motion"


type Keyword = {
  id: string
  automationId: string | null
  word: string
}

type Listener = {
  id: string
  listener: string
  automationId: string
  prompt: string
  commentReply: string | null
  dmCount: number
  commentCount: number
}

interface Automation {
  id: string
  name: string
  active: boolean
  keywords: Keyword[]
  createdAt: Date
  listener: Listener | null
}

interface FancyAutomationBoxProps {
  automation: Automation
  onDelete: () => void
  pathname: string
}

export const FancyAutomationBox: React.FC<FancyAutomationBoxProps> = ({ automation, onDelete, pathname }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showChats, setShowChats] = useState(false)

  // Mock data for current sentiment
  const sentimentData = [
    { name: "Positive", value: 65, color: "#10B981" },
    { name: "Neutral", value: 25, color: "#6B7280" },
    { name: "Negative", value: 10, color: "#EF4444" },
  ]

  return (
    <Card className="bg-background border-2 border-border hover:border-primary/50 transition-colors duration-300 relative overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-foreground">{automation.name}</h2>
          <div className="flex items-center space-x-2">
            {automation.active ? <ActiveIndicator /> : <InactiveIndicator />}
            {automation.listener?.listener === "SMARTAI" ? (
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                <Sparkles size={14} className="mr-1" />
                Smart AI
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/30">
                <Zap size={14} className="mr-1" />
                FREE
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {automation.keywords.map((keyword, key) => (
            <Badge
              key={keyword.id}
              variant="outline"
              className={cn(
                "capitalize",
                key % 4 === 0 && "border-green-500/30 text-green-500",
                key % 4 === 1 && "border-purple-500/30 text-purple-500",
                key % 4 === 2 && "border-yellow-500/30 text-yellow-500",
                key % 4 === 3 && "border-red-500/30 text-red-500",
              )}
            >
              {keyword.word}
            </Badge>
          ))}
        </div>

        {automation.keywords.length === 0 && (
          <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground">
            No Keywords
          </Badge>
        )}

        <AutomationStats automation={automation} />

        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-destructive/30 text-destructive hover:bg-destructive/10"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 size={16} className="mr-2" />
              Delete
            </Button>
            <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
              <Link href={`${pathname}/${automation.id}`} className="flex items-center">
                <Settings size={16} className="mr-2" />
                Configure
              </Link>
            </Button>
          </div>
          <div className="relative group">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-2 border-secondary/30 text-secondary hover:bg-secondary/10 hover:border-secondary transition-all duration-300 pl-3 pr-8"
              onClick={() => setShowChats(!showChats)}
            >
              <MessageSquareText size={18} className="mr-2" />
              <span className="font-medium">Chats</span>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-secondary/20 group-hover:bg-secondary/40 transition-all duration-300 flex items-center justify-center">
                <ChevronDown
                  size={12}
                  className={`text-secondary transition-transform duration-300 ${showChats ? "rotate-180" : ""}`}
                />
              </div>
            </Button>
            <div className="absolute -right-1 -top-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background animate-pulse"></div>
            <div className="absolute top-full right-0 mt-2 bg-popover text-popover-foreground rounded-md p-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              {showChats ? "Close Chats" : "Open Chats"}
            </div>
          </div>
        </div>

        {showDeleteConfirm && (
          <div className="mt-4 p-4 border border-destructive/30 rounded-md bg-destructive/10">
            <p className="text-sm text-destructive mb-2">Are you sure you want to delete this automation?</p>
            <div className="flex space-x-2">
              <Button variant="destructive" size="sm" onClick={onDelete}>
                Confirm Delete
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Clock size={16} />
            <p className="text-sm font-medium">Created {getRelativeTime(automation.createdAt)}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Current Sentiment</h3>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sentimentData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" hide />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                    formatter={(value, name, props) => [`${value}%`, props.payload.name]}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-2">
              {sentimentData.map((item) => (
                <div key={item.name} className="text-center">
                  <p className="text-sm font-medium" style={{ color: item.color }}>
                    {item.name}
                  </p>
                  <p className="text-lg font-bold text-foreground">{item.value}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/*  */}
        <div className="mt-6 border-t border-[#545454] pt-4">
          <button
            className="w-full flex items-center justify-between p-2 rounded-lg border border-[#545454]/50 bg-transparent transition-colors duration-300"
            onClick={() => setShowChats(!showChats)}
          >
            <div className="flex items-center">
              <div className="mr-3 w-8 h-8 rounded-full border border-[#545454] flex items-center justify-center bg-gradient-to-br from-[#2A2A2A] to-[#1D1D1D]">
                <MessageSquare size={16} className="text-blue-400" />
              </div>
              <span className="font-medium">View Conversation History</span>
              {automation.listener?.dmCount && automation.listener.dmCount > 0 && (
                <Badge className="ml-2 bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {automation.listener.dmCount} messages
                </Badge>
              )}
            </div>
            <div>
              {showChats ? (
                <ChevronUp size={20} className="text-[#9B9CA0]" />
              ) : (
                <ChevronDown size={20} className="text-[#9B9CA0]" />
              )}
            </div>
          </button>
        </div>

        <AnimatePresence>
          {showChats && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: { duration: 0.2, ease: "easeIn" },
              }}
              className="w-full overflow-hidden"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="border border-[#545454]/50 rounded-lg p-4 mt-3 bg-[#1D1D1D]/30"
              >
                <AutomationChats automationId={automation.id} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-bl-full opacity-50" />
    </Card>
  )
}

export default FancyAutomationBox