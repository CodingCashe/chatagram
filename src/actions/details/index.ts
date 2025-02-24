"use server"

import { onCurrentUser } from "../user"
import { createMarketingInfo, getMarketingInfo, updateMarketingInfo, deleteMarketingInfo } from "./queries"

export const createMarketingInfoAction = async (data: { email?: string; phone?: string; name?: string }) => {
  const user = await onCurrentUser()
  try {
    const create = await createMarketingInfo(user.id, data)
    if (create) return { status: 200, data: "Marketing info created", res: create }
    return { status: 404, data: "Oops! something went wrong" }
  } catch (error) {
    return { status: 500, data: "Try refreshing the page first" }
  }
}

export async function getMarketingInfoAction() {
  const user = await onCurrentUser()
  try {
    const marketingInfo = await getMarketingInfo(user.id)
    return marketingInfo || []
  } catch (error) {
    console.error("Error fetching marketing info:", error)
    return []
  }
}

export const updateMarketingInfoAction = async (
  id: string,
  data: { email?: string; phone?: string; name?: string },
) => {
  await onCurrentUser()
  try {
    const update = await updateMarketingInfo(id, data)
    if (update) {
      return { status: 200, data: "Marketing info successfully updated" }
    }
    return { status: 404, data: "Oops! could not find marketing info" }
  } catch (error) {
    return { status: 500, data: "Oops! something went wrong" }
  }
}

export const deleteMarketingInfoAction = async (id: string) => {
  await onCurrentUser()
  try {
    const deleted = await deleteMarketingInfo(id)
    if (deleted) {
      return { status: 200, data: "Marketing info deleted successfully" }
    }
    return { status: 404, data: "Marketing info not found" }
  } catch (error) {
    return { status: 500, data: "Oops! something went wrong" }
  }
}



export const getMarketingInfoActione = async () => {
  const user = await onCurrentUser()
  try {
    const marketingInfo = await getMarketingInfo(user.id)
    if (marketingInfo) return { status: 200, data: marketingInfo }
    return { status: 404, data: [] }
  } catch (error) {
    return { status: 500, data: [] }
  }
}

export const deleteMarketingInfoActione = async (id: string) => {
  await onCurrentUser()
  try {
    const deleted = await deleteMarketingInfo(id)
    if (deleted) {
      return { status: 200, data: "Marketing info deleted successfully" }
    }
    return { status: 404, data: "Marketing info not found" }
  } catch (error) {
    return { status: 500, data: "Oops! something went wrong" }
  }
}
