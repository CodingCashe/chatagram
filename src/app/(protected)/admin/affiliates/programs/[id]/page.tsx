import { notFound } from "next/navigation"
import ProgramForm from "../../program-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {client} from "@/lib/prisma"

export const metadata = {
  title: "Edit Affiliate Program",
}

export default async function EditProgramPage({ params }: { params: { id: string } }) {
  const program = await client.affiliateProgram.findUnique({
    where: { id: params.id },
  })

  if (!program) {
    notFound()
  }

  return (
    <div className="container max-w-4xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Affiliate Program</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgramForm program={program} isEditing={true} />
        </CardContent>
      </Card>
    </div>
  )
}

