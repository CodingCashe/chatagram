import { ReferralProgramForm } from "../referral-program-form"

export const metadata = {
  title: "Create Referral Program",
  description: "Create a new referral program",
}

export default function NewReferralProgramPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create Referral Program</h1>
      <ReferralProgramForm />
    </div>
  )
}

