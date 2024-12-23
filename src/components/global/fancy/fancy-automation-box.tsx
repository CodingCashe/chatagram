'use client'
import React from 'react';
import { cn, getMonth,getRelativeTime } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import GradientButton from '../gradient-button';
import { ActiveIndicator } from '../indicators/active-indicator';
import { InactiveIndicator } from '../indicators/inactive-indicator';

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

interface Automation {
  id: string;
  name: string;
  active: boolean;
  keywords: Keyword[];
  createdAt: Date;
  listener: Listener | null;
}

interface FancyAutomationBoxProps {
  automation: Automation;
  onDelete: () => void;
  pathname: string;
}

export const FancyAutomationBox: React.FC<FancyAutomationBoxProps> = ({ automation, onDelete, pathname }) => {
  return (
    <div className="relative bg-[#1D1D1D] rounded-xl border-[1px] border-[#545454] before:content-[''] before:absolute before:top-0 before:left-1/2 before:transform before:-translate-x-1/2 before:w-28 before:h-[2px] before:bg-[#1D1D1D] before:z-[1]">
      <div className="absolute rounded-xl top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
        <div className="bg-[#1D1D1D] px-1 rounded-full border-[1px] border-[#545454]">
          {automation.listener?.listener === 'SMARTAI' ? (
            <GradientButton
              type="BUTTON"
              className="text-xs bg-background-80 text-white hover:bg-background-80 px-4 py-1 -my-[3px]"
            >
              Smart AI
            </GradientButton>
          ) : (
            <span className="inline-block px-4 py-1 text-xs font-semibold uppercase text-white bg-[#1D1D1D] rounded-full shadow-md -my-[3px]">
              Standard Plan
            </span>
          )}
        </div>
      </div>
      <div className="absolute mb-3 bottom-2 top-2 right-2 z-10">
        {automation.active ? <ActiveIndicator /> : <InactiveIndicator />}
      </div>
      <div className="p-5 pt-8 radial--gradient--automations">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-3">
            <h2 className="text-xl font-semibold">{automation.name}</h2>
            
            {automation.keywords.length > 0 ? (
              <div className="flex flex-wrap gap-2 m-2">
                {automation.keywords.map((keyword, key) => (
                  <div
                    key={keyword.id}
                    className={cn(
                      'rounded-full px-3 py-1 text-xs capitalize',
                      (key + 1) % 1 === 0 &&
                        'bg-keyword-green/15 border-[1px] border-keyword-green',
                      (key + 1) % 2 === 0 &&
                        'bg-keyword-purple/15 border-[1px] border-keyword-purple',
                      (key + 1) % 3 === 0 &&
                        'bg-keyword-yellow/15 border-[1px] border-keyword-yellow',
                      (key + 1) % 4 === 0 &&
                        'bg-keyword-red/15 border-[1px] border-keyword-red'
                    )}
                  >
                    {keyword.word}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-full border-[1px] border-dashed border-white/60 px-3 py-1 inline-block">
                <p className="text-sm text-[#bfc0c3]">No Keywords</p>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between space-y-3 md:items-end">
            {/* <p className="text-sm font-light text-[#9B9CA0]">
              {getMonth(automation.createdAt.getUTCMonth() + 1)}{' '}
              {automation.createdAt.getUTCDate()}th{' '}
              {automation.createdAt.getUTCFullYear()},{' '}
              {String(automation.createdAt.getUTCHours()).padStart(2, '0')}:
              {String(automation.createdAt.getUTCMinutes()).padStart(2, '0')} UTC
            </p> */}
            <p className="text-sm font-light text-[#9B9CA0]">
              {getRelativeTime(automation.createdAt)}
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                className="bg-red-500 px-4 hover:bg-red-600 text-white w-full sm:w-auto"
                onClick={onDelete}
              >
                Delete
              </Button>
              <Button 
                className="bg-background-80 px-4 hover:bg-background-80 text-white w-full sm:w-auto"
              >
                <Link href={`${pathname}/${automation.id}`}>Configure</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};