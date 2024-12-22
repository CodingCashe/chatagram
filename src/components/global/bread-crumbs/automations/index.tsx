'use client'

import { ChevronRight, PencilIcon } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ActivateAutomationButton from '../../activate-automation-button'
import { useQueryAutomation } from '@/hooks/user-queries'
import { useEditAutomation } from '@/hooks/use-automations'
import { useMutationDataState } from '@/hooks/use-mutation-data'
import { Input } from '@/components/ui/input'

type Props = {
  id: string
}

const AutomationsBreadCrumb = ({ id }: Props) => {
  const { data } = useQueryAutomation(id)
  const { edit, enableEdit, inputRef, isPending } = useEditAutomation(id)
  const { latestVariable } = useMutationDataState(['update-automation'])
  const pathname = usePathname();

  // Extract the slug from the pathname
  const slugMatch = pathname.match(/^\/dashboard\/([^/]+)/)
  const slug = slugMatch ? slugMatch[1] : ''

  const automationsLink = `/dashboard/${slug}/automations`
  const currentAutomationLink = `/dashboard/${slug}/automations/${id}`

  return (
    <div className="rounded-full w-full p-5 bg-[#18181B1A] flex items-center">
      <div className="flex items-center gap-x-3 min-w-0">
        <Link href={automationsLink} className="text-[#9B9CA0] hover:text-white transition-colors duration-200">
          Automations
        </Link>
        <ChevronRight
          className="flex-shrink-0"
          color="#9B9CA0"
        />
        <span className="flex gap-x-3 items-center min-w-0">
          {edit ? (
            <Input
              ref={inputRef}
              placeholder={
                isPending ? latestVariable.variables : 'rename'
              }
              className="bg-transparent h-auto outline-none text-base border-none p-0"
            />
          ) : (
            <Link 
              href={currentAutomationLink}
              className="text-[#9B9CA0] hover:text-white transition-colors duration-200 truncate"
            >
              {latestVariable?.variables
                ? latestVariable?.variables.name
                : data?.data?.name}
            </Link>
          )}
          {edit ? (
            <></>
          ) : (
            <span
              className="cursor-pointer hover:opacity-75 duration-100 transition flex-shrink-0 mr-4"
              onClick={enableEdit}
            >
              <PencilIcon size={14} />
            </span>
          )}
        </span>
      </div>

      <div className="flex items-center gap-x-5 ml-auto">
        <p className="hidden md:block text-text-secondary/60 text-sm truncate min-w-0">
          All states are automatically saved
        </p>
        <div className="flex gap-x-5 flex-shrink-0">
          <p className="text-text-secondary text-sm truncate min-w-0">
            {/* Changes Saved */}
          </p>
        </div>
      </div>
      <ActivateAutomationButton id={id} />
    </div>
  )
}

export default AutomationsBreadCrumb

