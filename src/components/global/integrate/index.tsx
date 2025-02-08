"use client"

import { Button } from "@/components/ui/button"
import { useMemo } from "react"
import Loader from "../loader"
import { useCreateAutomation } from "@/hooks/use-automations"
import { v4 } from "uuid"
import { Instagram } from "lucide-react"

type Props = {}

const IntegrateAccount = (props: Props) => {
  const mutationId = useMemo(() => v4(), [])

  console.log(mutationId)
  const { isPending, mutate } = useCreateAutomation(mutationId)

  return (
    <Button
      className="hidden lg:flex items-center px-10 py-6 bg-gradient-to-br hover:bg-gradient-to-tl hover:shadow-lg text-white rounded-full from-[#1A1E2D] to-[#2C3E50] font-medium transition-all duration-300 ease-in-out"
      onClick={() =>
        mutate({
          name: "Untitled",
          id: mutationId,
          createdAt: new Date(),
          keywords: [],
        })
      }
    >
      <Loader state={isPending}>
        <Instagram className="mr-2 h-5 w-5 text-[#E1306C]" />
        <span>Integrate Account</span>
      </Loader>
    </Button>
  )
}

export default IntegrateAccount

