import { updateOnboardingStep } from "@/actions/onboarding"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { stepNumber, status, data } = body

    // Call your server action
    const result = await updateOnboardingStep(stepNumber, status, data)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in onboarding sync:", error)
    return NextResponse.json(
      {
        status: 500,
        message: "Failed to sync onboarding data",
      },
      { status: 500 },
    )
  }
}
