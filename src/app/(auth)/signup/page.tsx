import { redirect } from 'next/navigation'

export default function SignupPage({ searchParams }: { searchParams: { ref?: string } }) {
  const referralCode = searchParams.ref || ''
  
  // Redirect to your actual sign-up page with the referral code
  redirect(`/sign-up?ref=${referralCode}`)
}