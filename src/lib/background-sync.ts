/**
 * Utility to manage background synchronization of form data
 */

// Queue of pending sync operations
let syncQueue: Array<{
  stepNumber: number
  status: string
  data: any
  resolve: (value: any) => void
  reject: (reason?: any) => void
}> = []

// Flag to track if sync is in progress
let isSyncing = false

// Function to process the sync queue
async function processSyncQueue() {
  if (isSyncing || syncQueue.length === 0) return

  isSyncing = true

  try {
    const { stepNumber, status, data, resolve, reject } = syncQueue[0]

    // Use the updateOnboardingStep function to save data to the server
    // Note: This is imported from wherever your server actions are defined
    const response = await fetch("/api/onboarding/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stepNumber, status, data }),
    })

    const result = await response.json()

    if (result.status === 200) {
      resolve(result)
    } else {
      // If syncing fails, we'll keep the item in queue and retry later
      reject(new Error(result.message || "Failed to sync"))
      return
    }

    // Remove the processed item from queue
    syncQueue.shift()
  } catch (error) {
    console.error("Error in background sync:", error)
  } finally {
    isSyncing = false

    // Process next item if queue is not empty
    if (syncQueue.length > 0) {
      setTimeout(processSyncQueue, 1000) // Add a small delay between requests
    }
  }
}

// Function to add a step to the sync queue
export function queueStepSync(stepNumber: number, status: string, data: any) {
  return new Promise((resolve, reject) => {
    // Check if this step is already in the queue
    const existingIndex = syncQueue.findIndex((item) => item.stepNumber === stepNumber)

    // If it exists, update it instead of adding a new one
    if (existingIndex >= 0) {
      syncQueue[existingIndex] = { stepNumber, status, data, resolve, reject }
    } else {
      // Add to queue
      syncQueue.push({ stepNumber, status, data, resolve, reject })
    }

    // Start processing if not already in progress
    if (!isSyncing) {
      processSyncQueue()
    }
  })
}

// Function to flush all pending sync operations
export async function flushSyncQueue() {
  const promises = syncQueue.map(({ stepNumber, status, data }) => {
    return fetch("/api/onboarding/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stepNumber, status, data }),
    }).then((res) => res.json())
  })

  // Clear the queue
  syncQueue = []

  return Promise.all(promises)
}
