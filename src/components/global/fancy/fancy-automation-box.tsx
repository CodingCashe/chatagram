// import React from 'react';
// import { cn, getMonth } from '@/lib/utils';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import GradientButton from '../gradient-button';
// import { ActiveIndicator } from '../indicators/active-indicator';
// import { InactiveIndicator } from '../indicators/inactive-indicator';

// export const FancyAutomationBox = ({ automation, onDelete, pathname }) => {
//   return (
//     <div className="relative bg-[#1D1D1D] rounded-xl border-[1px] border-[#545454] overflow-hidden">
//       <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1D1D1D] px-4 py-2 rounded-full border-[1px] border-[#545454]">
//         {automation.listener?.listener === 'SMARTAI' ? (
//           <GradientButton
//             type="BUTTON"
//             className="text-xs bg-background-80 text-white hover:bg-background-80"
//           >
//             Smart AI
//           </GradientButton>
//         ) : (
//           <span className="px-3 py-1 text-xs font-semibold uppercase text-white bg-blue-500 rounded-full shadow-md">
//             Standard
//           </span>
//         )}
//       </div>
//       <div className="p-5 pt-8 radial--gradient--automations flex">
//         <div className="flex flex-col m-2 flex-1 items-start">
//           <h2 className="text-xl font-semibold">{automation.name}</h2>
//           <p className="text-[#9B9CA0] text-sm font-light mb-2">
//             {automation.active ? <ActiveIndicator/> : <InactiveIndicator/>}
//           </p>
          
//           {automation.keywords.length > 0 ? (
//             <div className="flex gap-x-2 flex-wrap mt-3">
//               {automation.keywords.map((keyword, key) => (
//                 <div
//                   key={keyword.id}
//                   className={cn(
//                     'rounded-full px-4 py-1 capitalize',
//                     (key + 1) % 1 === 0 &&
//                       'bg-keyword-green/15 border-2 border-keyword-green',
//                     (key + 1) % 2 === 0 &&
//                       'bg-keyword-purple/15 border-2 border-keyword-purple',
//                     (key + 1) % 3 === 0 &&
//                       'bg-keyword-yellow/15 border-2 border-keyword-yellow',
//                     (key + 1) % 4 === 0 &&
//                       'bg-keyword-green/15 border-2 border-keyword-green'
//                   )}
//                 >
//                   {keyword.word}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="rounded-full border-2 mt-3 border-dashed border-white/60 px-3 py-1">
//               <p className="text-sm text-[#bfc0c3]">No Keywords</p>
//             </div>
//           )}
//         </div>
//         <div className="flex flex-col m-2 justify-between items-end">
//           <p className="capitalize text-sm font-light text-[#9B9CA0]">
//             {getMonth(automation.createdAt.getUTCMonth() + 1)}{' '}
//             {automation.createdAt.getUTCDate()}th{' '}
//             {automation.createdAt.getUTCFullYear()},{' '}
//             {String(automation.createdAt.getUTCHours()).padStart(2, '0')}:
//             {String(automation.createdAt.getUTCMinutes()).padStart(2, '0')} UTC
//           </p>
//           <div className="flex gap-2 mt-4">
//             <Button
//               className="bg-red-500 px-4 hover:bg-red-600 text-white"
//               onClick={onDelete}
//             >
//               Delete
//             </Button>
//             <Button 
//               className="bg-background-80 px-4 hover:bg-background-80 text-white"
//             >
//               <Link href={`${pathname}/${automation.id}`}>Configure</Link>
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


import React from 'react';
import { cn, getMonth } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import GradientButton from '../gradient-button';
import { ActiveIndicator } from '../indicators/active-indicator';
import { InactiveIndicator } from '../indicators/inactive-indicator';

interface Keyword {
  id: string;
  word: string;
}

interface Automation {
  id: string;
  name: string;
  active: boolean;
  keywords: Keyword[];
  createdAt: Date;
  listener?: {
    listener: string;
  };
}

interface FancyAutomationBoxProps {
  automation: Automation;
  onDelete: () => void;
  pathname: string;
}

export const FancyAutomationBox: React.FC<FancyAutomationBoxProps> = ({ automation, onDelete, pathname }) => {
  return (
    <div className="relative bg-[#1D1D1D] rounded-xl border-[1px] border-[#545454] overflow-hidden">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1D1D1D] px-4 py-2 rounded-full border-[1px] border-[#545454]">
        {automation.listener?.listener === 'SMARTAI' ? (
          <GradientButton
            type="BUTTON"
            className="text-xs bg-background-80 text-white hover:bg-background-80"
          >
            Smart AI
          </GradientButton>
        ) : (
          <span className="px-3 py-1 text-xs font-semibold uppercase text-white bg-blue-500 rounded-full shadow-md">
            Standard
          </span>
        )}
      </div>
      <div className="p-5 pt-8 radial--gradient--automations flex">
        <div className="flex flex-col m-2 flex-1 items-start">
          <h2 className="text-xl font-semibold">{automation.name}</h2>
          <p className="text-[#9B9CA0] text-sm font-light mb-2">
            {automation.active ? <ActiveIndicator/> : <InactiveIndicator/>}
          </p>
          
          {automation.keywords.length > 0 ? (
            <div className="flex gap-x-2 flex-wrap mt-3">
              {automation.keywords.map((keyword, key) => (
                <div
                  key={keyword.id}
                  className={cn(
                    'rounded-full px-4 py-1 capitalize',
                    (key + 1) % 1 === 0 &&
                      'bg-keyword-green/15 border-2 border-keyword-green',
                    (key + 1) % 2 === 0 &&
                      'bg-keyword-purple/15 border-2 border-keyword-purple',
                    (key + 1) % 3 === 0 &&
                      'bg-keyword-yellow/15 border-2 border-keyword-yellow',
                    (key + 1) % 4 === 0 &&
                      'bg-keyword-green/15 border-2 border-keyword-green'
                  )}
                >
                  {keyword.word}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-full border-2 mt-3 border-dashed border-white/60 px-3 py-1">
              <p className="text-sm text-[#bfc0c3]">No Keywords</p>
            </div>
          )}
        </div>
        <div className="flex flex-col m-2 justify-between items-end">
          <p className="capitalize text-sm font-light text-[#9B9CA0]">
            {getMonth(automation.createdAt.getUTCMonth() + 1)}{' '}
            {automation.createdAt.getUTCDate()}th{' '}
            {automation.createdAt.getUTCFullYear()},{' '}
            {String(automation.createdAt.getUTCHours()).padStart(2, '0')}:
            {String(automation.createdAt.getUTCMinutes()).padStart(2, '0')} UTC
          </p>
          <div className="flex gap-2 mt-4">
            <Button
              className="bg-red-500 px-4 hover:bg-red-600 text-white"
              onClick={onDelete}
            >
              Delete
            </Button>
            <Button 
              className="bg-background-80 px-4 hover:bg-background-80 text-white"
            >
              <Link href={`${pathname}/${automation.id}`}>Configure</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};


