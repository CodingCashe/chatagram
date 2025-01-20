"use server"

import { matchKeyword, getKeywordAutomation, getChatHistory } from "@/actions/webhook/queries"

export async function fetchKeywordMatch(keyword: string) {
  try {
    return await matchKeyword(keyword)
  } catch (error) {
    console.error("Error fetching keyword match:", error)
    throw new Error("Failed to fetch keyword match")
  }
}

export async function fetchKeywordAutomation(automationId: string, dm: boolean) {
  try {
    return await getKeywordAutomation(automationId, dm)
  } catch (error) {
    console.error("Error fetching keyword automation:", error)
    throw new Error("Failed to fetch keyword automation")
  }
}

export async function fetchChatHistory(sender: string, receiver: string) {
  try {
    return await getChatHistory(sender, receiver)
  } catch (error) {
    console.error("Error fetching chat history:", error)
    throw new Error("Failed to fetch chat history")
  }
}

