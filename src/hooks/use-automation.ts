import { useMutation, type UseMutationResult } from "@tanstack/react-query"
import type { Automation } from "@/types/automations"

interface CreateAutomationVariables {
  name: string
  id: string
  createdAt: Date
  keywords: string[]
}

const useCreateAutomation = (id: string): UseMutationResult<Automation, unknown, CreateAutomationVariables> => {
  const mutation = useMutation({
    mutationKey: ["createAutomation", id],
    mutationFn: async (variables: CreateAutomationVariables) => {
      // Replace with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { ...variables, updatedAt: new Date() } as Automation
    },
  })

  return mutation
}

export { useCreateAutomation }

