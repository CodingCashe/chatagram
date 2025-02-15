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

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { cn, getRelativeTime } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import GradientButton from "../gradient-button"
import { ActiveIndicator } from "../indicators/active-indicator"
import { InactiveIndicator } from "../indicators/inactive-indicator"
import { Sparkles, Zap, Trash2, Settings, BarChart2 } from "lucide-react"
import AutomationStats from "./automation-stats"
import AutomationChats from "./automationChats"

interface Automation {
  id: string
  name: string
  active: boolean
  createdAt: string
  keywords: { id: string; word: string }[]
  listener?: { listener: string }
}

interface FancyAutomationBoxProps {
  automation: Automation
  onDelete: () => void
  pathname: string
}

export const FancyAutomationBox: React.FC<FancyAutomationBoxProps> = ({ automation, onDelete, pathname }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (!isHovered) {
      setShowDeleteConfirm(false)
    }
  }, [isHovered])

  return (
    <div
      className="relative bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] rounded-xl transition-all duration-300 hover:shadow-lg group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 rounded-xl border border-[#545454] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-7000 rounded-xl overflow-hidden"></div>
      <div className="absolute -top-px left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
        <div className="bg-[#1D1D1D] px-1 rounded-full border border-[#545454] shadow-sm">
          {automation.listener?.listener === "SMARTAI" ? (
            <GradientButton
              type="BUTTON"
              className="text-xs bg-background-80 text-white hover:bg-background-80 px-4 py-1 -my-[3px] flex items-center gap-2"
            >
              <Sparkles size={14} />
              Smart AI
            </GradientButton>
          ) : (
            <GradientButton
              type="BUTTON"
              className="text-xs bg-background-80 text-white hover:bg-background-80 px-4 py-1 -my-[3px] flex items-center gap-2"
            >
              <Zap size={14} />
              FREE
            </GradientButton>
          )}
        </div>
      </div>
      <div className="relative z-10 p-6 flex flex-row">
        <div className="flex-grow pr-6 border-r border-[#545454]">
          <div className="absolute top-2 right-2 z-10">
            {automation.active ? <ActiveIndicator /> : <InactiveIndicator />}
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {automation.name}
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {automation.keywords.map((keyword, key) => (
                <div
                  key={keyword.id}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs capitalize backdrop-blur-sm",
                    (key + 1) % 1 === 0 && "bg-keyword-green/30 border border-keyword-green/50",
                    (key + 1) % 2 === 0 && "bg-keyword-purple/30 border border-keyword-purple/50",
                    (key + 1) % 3 === 0 && "bg-keyword-yellow/30 border border-keyword-yellow/50",
                    (key + 1) % 4 === 0 && "bg-keyword-red/30 border border-keyword-red/50",
                  )}
                >
                  {keyword.word}
                </div>
              ))}
            </div>
            {automation.keywords.length === 0 && (
              <div className="rounded-full border border-dashed border-white/30 px-3 py-1 inline-block mb-4">
                <p className="text-sm text-[#bfc0c3]">No Keywords</p>
              </div>
            )}
            <AutomationStats automation={automation} />
            <p className="text-sm font-light text-[#9B9CA0] mb-4">Created {getRelativeTime(automation.createdAt)}</p>
            <div className="flex flex-col sm:flex-row gap-2">
              {showDeleteConfirm ? (
                <>
                  <Button
                    className="bg-transparent border-2 border-red-500 text-red-500 px-4 hover:bg-red-500 hover:text-white flex-1 transition-colors duration-300"
                    onClick={onDelete}
                  >
                    Confirm Delete
                  </Button>
                  <Button
                    className="bg-transparent border-2 border-gray-500 text-gray-500 px-4 hover:bg-gray-500 hover:text-white flex-1 transition-colors duration-300"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="bg-transparent border-2 border-red-500 text-red-500 px-4 hover:bg-red-500 hover:text-white flex-1 sm:flex-none transition-colors duration-300"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    <Trash2 size={18} className="mr-2" />
                    Delete
                  </Button>
                  <Button className="bg-transparent border-2 border-blue-500 text-blue-500 px-4 hover:bg-blue-500 hover:text-white flex-1 sm:flex-none transition-colors duration-300">
                    <Link href={`${pathname}/${automation.id}`} className="flex items-center">
                      <Settings size={18} className="mr-2" />
                      Configure
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-64 pl-6">
          <h3 className="text-xl font-semibold mb-4 text-white">Quick Actions</h3>
          <div className="flex flex-col gap-4">
            <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
              <Zap size={18} className="mr-2" />
              Boost Engagement
            </Button>
            <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white">
              <Sparkles size={18} className="mr-2" />
              Generate Content
            </Button>
            <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
              <BarChart2 size={18} className="mr-2" />
              View Analytics
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full border-t border-[#545454] mt-6 p-6">
        <AutomationChats automationId={automation.id} />
      </div>
    </div>
  )
}

export default FancyAutomationBox

