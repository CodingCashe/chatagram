import ProgramForm from "../../program-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Create Affiliate Program",
}

export default function CreateProgramPage() {
  return (
    <div className="container max-w-4xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Create New Affiliate Program</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgramForm />
        </CardContent>
      </Card>
    </div>
  )
}

