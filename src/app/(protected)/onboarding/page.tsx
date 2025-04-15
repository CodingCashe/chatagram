import { onBoardUser } from '@/actions/user'
import { redirect } from 'next/navigation'
import {client} from '@/lib/prisma'
import {onCurrentUser} from '@/actions/user'
import React from 'react'

type Props = {}

const Page = async (props: Props) => {
  const user = await onCurrentUser()
  if (!user) {
    return redirect('/sign-in')
  }
  if (user && client.business) {
    return redirect('/sign-in')
  }

  return redirect('/onboarding/new')
}

export default Page