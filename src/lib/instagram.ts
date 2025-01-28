import axios from "axios"

interface InstagramAPIResponse {
  status: number
  data?: any
  error?: {
    message: string
    type: string
    code: number
    error_subcode?: number
    fbtrace_id: string
  }
}

export async function sendPrivateMessage(
  pageId: string,
  userId: string,
  message: string,
  token: string,
): Promise<InstagramAPIResponse> {
  try {
    console.log("Instagram API - Sending message with parameters:", {
      pageId,
      userId: userId.split("_")[1], // Extract just the user ID part
      messageLength: message.length,
      tokenLength: token.length,
    })

    const response = await axios.post(
      `https://graph.instagram.com/v21.0/${pageId}/messages`,
      {
        recipient: {
          id: userId.split("_")[1], // Use only the actual user ID part
        },
        message: {
          text: message,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    )

    console.log("Instagram API - Success Response:", {
      status: response.status,
      data: response.data,
    })

    return {
      status: response.status,
      data: response.data,
    }
  } catch (error) {
    console.error("Instagram API - Error Details:", {
      error: error,
      // response: error.response?.data,
      // status: error.response?.status,
      // headers: error.response?.headers,
    })

    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data?.error || {
        message: "Unknown Instagram API error",
        type: "API_ERROR",
        code: 500,
      }

      console.error("Instagram API - Formatted Error:", {
        message: errorResponse.message,
        type: errorResponse.type,
        code: errorResponse.code,
        subcode: errorResponse.error_subcode,
      })

      return {
        status: error.response?.status || 500,
        error: errorResponse,
      }
    }

    return {
      status: 500,
      error: {
        message: error instanceof Error ? error.message : "Unknown error",
        type: "INTERNAL_ERROR",
        code: 500,
        fbtrace_id: "",
      },
    }
  }
}

