import { notFound } from "next/navigation"
import { ReferralProgramForm } from "../referral-program-form"
import { getReferralProgram } from "../../actions/referral-admin-actions"

export const metadata = {
  title: "Edit Referral Program",
  description: "Edit an existing referral program",
}

export default async function EditReferralProgramPage({
  params,
}: {
  params: { id: string }
}) {
  try {
    const program = await getReferralProgram(params.id)

    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Edit Referral Program</h1>
        <ReferralProgramForm program={program} />
      </div>
    )
  } catch (error) {
    return notFound()
  }
}

