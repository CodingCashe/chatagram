import { onBoardUser } from '@/actions/user'
import { redirect } from 'next/navigation'
import {onCurrentUser} from '@/actions/user'
import React from 'react'

type Props = {}

const Page = async (props: Props) => {
  const user = await onCurrentUser()
  if (!user) {
    return redirect('/sign-in')
  }

  return redirect('/onboarding/new')
}

export default Page