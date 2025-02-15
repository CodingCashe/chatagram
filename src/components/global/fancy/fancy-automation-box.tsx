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

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { cn, getRelativeTime } from "@/lib/utils"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import GradientButton from "../gradient-button"
import { ActiveIndicator } from "../indicators/active-indicator"
import { InactiveIndicator } from "../indicators/inactive-indicator"
import { Sparkles, Zap, Trash2, Settings, BarChart2 } from "lucide-react"
import AutomationStats from "./automation-stats"
import AutomationChats from "./automationChats"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts"
import { useSpring, animated } from "react-spring"

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

const NoKeywordsAnimation: React.FC = () => {
  const styles = useSpring({
    loop: true,
    from: { opacity: 0.5, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
  })

  return (
    <animated.div style={styles} className="text-center p-4">
      <Zap size={48} className="text-yellow-400 mx-auto mb-2" />
      <p className="text-sm text-gray-300">Keywords trigger automations. Add keywords to activate this automation!</p>
    </animated.div>
  )
}

export const FancyAutomationBox: React.FC<FancyAutomationBoxProps> = ({ automation, onDelete, pathname }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (!isHovered) {
      setShowDeleteConfirm(false)
    }
  }, [isHovered])

  const data = automation.keywords.map((keyword, index) => ({
    name: keyword.word,
    value: Math.floor(Math.random() * 100) + 1,
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-[#1A1A1A] via-[#252525] to-[#1D1D1D] rounded-xl transition-all duration-300 hover:shadow-lg group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 rounded-xl border border-[#545454] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-xl overflow-hidden"></div>
      <div className="absolute -top-px left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10"
      >
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
      </motion.div>
      <div className="relative z-10 p-6 flex flex-col">
        <div className="w-full mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-2 right-2 z-10"
          >
            {automation.active ? <ActiveIndicator /> : <InactiveIndicator />}
          </motion.div>
          <div className="mt-4 flex flex-col md:flex-row">
            <div className="md:w-1/2 md:pr-4">
              <motion.h2
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              >
                {automation.name}
              </motion.h2>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2 mb-4"
              >
                {automation.keywords.map((keyword, key) => (
                  <motion.div
                    key={keyword.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + key * 0.1 }}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs capitalize backdrop-blur-sm",
                      (key + 1) % 1 === 0 && "bg-keyword-green/30 border border-keyword-green/50",
                      (key + 1) % 2 === 0 && "bg-keyword-purple/30 border border-keyword-purple/50",
                      (key + 1) % 3 === 0 && "bg-keyword-yellow/30 border border-keyword-yellow/50",
                      (key + 1) % 4 === 0 && "bg-keyword-red/30 border border-keyword-red/50",
                    )}
                  >
                    {keyword.word}
                  </motion.div>
                ))}
              </motion.div>
              <div className="md:w-1/2 md:pl-4 mt-6 md:mt-0 border-t md:border-t-0 md:border-l border-[#545454] pt-6 md:pt-0 md:pl-6">
                <h3 className="text-xl font-semibold mb-4 text-white">Keyword Performance</h3>
                {automation.keywords.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart outerRadius={90} data={data}>
                      <PolarGrid stroke="#545454" />
                      <PolarAngleAxis dataKey="name" tick={{ fill: "#9B9CA0" }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#9B9CA0" }} />
                      <Radar name="Keywords" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Tooltip
                        contentStyle={{ background: "#1A1A1A", border: "1px solid #545454", color: "#9B9CA0" }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex flex-col items-center justify-center">
                    <motion.div
                      animate={{ rotate: [0, 30, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" }}
                      className="w-32 h-32 rounded-full bg-gradient-to-br from-[#2A2A2A] to-[#1D1D1D] flex items-center justify-center mb-4"
                    >
                      <motion.div
                        animate={{ opacity: [1, 0], scale: [1, 0.8] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" }}
                      >
                        {[Zap, Sparkles, BarChart2].map((Icon, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            style={{ display: index === 0 ? "block" : "none" }}
                          >
                            <Icon size={48} className="text-blue-400" />
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {[
                        "You haven't set up keywords yet",
                        "Keywords will help in triggering an automation",
                        "Add keywords to get started",
                      ].map((text, index) => (
                        <motion.p
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="text-center text-[#9B9CA0] mb-2"
                          style={{ display: index === 0 ? "block" : "none" }}
                        >
                          {text}
                        </motion.p>
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
                <AutomationStats automation={automation} />
              </motion.div>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-sm font-light text-[#9B9CA0] mb-4"
              >
                Created {getRelativeTime(automation.createdAt)}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row gap-2"
              >
                <AnimatePresence>
                  {showDeleteConfirm ? (
                    <>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button
                          className="bg-transparent border-2 border-red-500 text-red-500 px-4 hover:bg-red-500 hover:text-white flex-1 transition-colors duration-300"
                          onClick={onDelete}
                        >
                          Confirm Delete
                        </Button>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        <Button
                          className="bg-transparent border-2 border-gray-500 text-gray-500 px-4 hover:bg-gray-500 hover:text-white flex-1 transition-colors duration-300"
                          onClick={() => setShowDeleteConfirm(false)}
                        >
                          Cancel
                        </Button>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button
                          className="bg-transparent border-2 border-red-500 text-red-500 px-4 hover:bg-red-500 hover:text-white flex-1 sm:flex-none transition-colors duration-300"
                          onClick={() => setShowDeleteConfirm(true)}
                        >
                          <Trash2 size={18} className="mr-2" />
                          Delete
                        </Button>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        <Button className="bg-transparent border-2 border-blue-500 text-blue-500 px-4 hover:bg-blue-500 hover:text-white flex-1 sm:flex-none transition-colors duration-300">
                          <Link href={`${pathname}/${automation.id}`} className="flex items-center">
                            <Settings size={18} className="mr-2" />
                            Configure
                          </Link>
                        </Button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
            <div className="md:w-1/2 md:pl-4 mt-6 md:mt-0 border-t md:border-t-0 md:border-l border-[#545454] pt-6 md:pt-0 md:pl-6">
              <motion.h3
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-xl font-semibold mb-4 text-white"
              >
                Keyword Performance
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart outerRadius={90} data={data}>
                    <PolarGrid stroke="#545454" />
                    <PolarAngleAxis dataKey="name" tick={{ fill: "#9B9CA0" }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#9B9CA0" }} />
                    <Radar name="Keywords" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Tooltip contentStyle={{ background: "#1A1A1A", border: "1px solid #545454", color: "#9B9CA0" }} />
                  </RadarChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="w-full border-t border-[#545454] pt-4"
        >
          <h3 className="text-xl font-semibold mb-4 text-white">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white transition-all duration-300 transform hover:scale-105">
              <Zap size={18} className="mr-2" />
              Boost Engagement
            </Button>
            <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white transition-all duration-300 transform hover:scale-105">
              <Sparkles size={18} className="mr-2" />
              Generate Content
            </Button>
            <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white transition-all duration-300 transform hover:scale-105">
              <BarChart2 size={18} className="mr-2" />
              View Analytics
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="w-full border-t border-[#545454] mt-6 pt-6"
        >
          <AutomationChats automationId={automation.id} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default FancyAutomationBox

