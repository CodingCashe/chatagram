// import axios from "axios"

// export class InstagramAPI {
//   private accessToken: string
//   private apiVersion: string
//   private baseUrl: string

//   constructor(accessToken: string, apiVersion = "v12.0") {
//     this.accessToken = accessToken
//     this.apiVersion = apiVersion
//     this.baseUrl = `https://graph.facebook.com/${this.apiVersion}`
//   }

//   async getScheduledContent(instagramBusinessAccountId: string): Promise<any[]> {
//     try {
//       const response = await axios.get(`${this.baseUrl}/${instagramBusinessAccountId}/media`, {
//         params: {
//           access_token: this.accessToken,
//           fields: "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,username",
//           limit: 100,
//         },
//       })

//       return response.data.data.filter((content: any) => new Date(content.timestamp) > new Date())
//     } catch (error) {
//       console.error("Error fetching scheduled content:", error)
//       throw error
//     }
//   }

//   async createScheduledContent(instagramBusinessAccountId: string, contentData: any): Promise<any> {
//     try {
//       const response = await axios.post(`${this.baseUrl}/${instagramBusinessAccountId}/media`, {
//         access_token: this.accessToken,
//         ...contentData,
//       })

//       return response.data
//     } catch (error) {
//       console.error("Error creating scheduled content:", error)
//       throw error
//     }
//   }

//   async deleteScheduledContent(mediaId: string): Promise<void> {
//     try {
//       await axios.delete(`${this.baseUrl}/${mediaId}`, {
//         params: {
//           access_token: this.accessToken,
//         },
//       })
//     } catch (error) {
//       console.error("Error deleting scheduled content:", error)
//       throw error
//     }
//   }

//   async getUserProfile(instagramUserId: string): Promise<any> {
//     try {
//       const fields = "id,username,name,profile_picture_url,followers_count,follows_count,media_count"
//       const response = await axios.get(`${this.baseUrl}/${instagramUserId}`, {
//         params: {
//           fields: fields,
//           access_token: this.accessToken,
//         },
//       })

//       return response.data
//     } catch (error) {
//       console.error("Error fetching user profile:", error)
//       throw error
//     }
//   }
// }

// import axios from "axios"

// export class InstagramAPI {
//   private accessToken: string
//   private apiVersion: string
//   private baseUrl: string

//   constructor(accessToken: string, apiVersion = "v12.0") {
//     this.accessToken = accessToken
//     this.apiVersion = apiVersion
//     this.baseUrl = `https://graph.facebook.com/${this.apiVersion}`
//   }

//   async getScheduledContent(instagramBusinessAccountId: string): Promise<any[]> {
//     try {
//       const response = await axios.get(`${this.baseUrl}/${instagramBusinessAccountId}/media`, {
//         params: {
//           access_token: this.accessToken,
//           fields: "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,username",
//           limit: 100,
//         },
//       })

//       return response.data.data.filter((content: any) => new Date(content.timestamp) > new Date())
//     } catch (error) {
//       console.error("Error fetching scheduled content:", error)
//       throw error
//     }
//   }

//   async createScheduledContent(instagramBusinessAccountId: string, contentData: any): Promise<any> {
//     try {
//       const response = await axios.post(`${this.baseUrl}/${instagramBusinessAccountId}/media`, {
//         access_token: this.accessToken,
//         ...contentData,
//       })

//       return response.data
//     } catch (error) {
//       console.error("Error creating scheduled content:", error)
//       throw error
//     }
//   }

//   async deleteScheduledContent(mediaId: string): Promise<void> {
//     try {
//       await axios.delete(`${this.baseUrl}/${mediaId}`, {
//         params: {
//           access_token: this.accessToken,
//         },
//       })
//     } catch (error) {
//       console.error("Error deleting scheduled content:", error)
//       throw error
//     }
//   }

//   async getUserProfile(instagramUserId: string): Promise<any> {
//     try {
//       const fields = "id,username,name,profile_picture_url,followers_count,follows_count,media_count"
//       const response = await axios.get(`${this.baseUrl}/${instagramUserId}`, {
//         params: {
//           fields: fields,
//           access_token: this.accessToken,
//         },
//       })

//       return response.data
//     } catch (error) {
//       console.error("Error fetching user profile:", error)
//       throw error
//     }
//   }

//   async updateScheduledContent(mediaId: string, updateData: any): Promise<any> {
//     try {
//       const response = await axios.post(`${this.baseUrl}/${mediaId}`, {
//         access_token: this.accessToken,
//         ...updateData,
//       })

//       return response.data
//     } catch (error) {
//       console.error("Error updating scheduled content:", error)
//       throw error
//     }
//   }
// }

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

export class InstagramAPI {
  private accessToken: string
  private apiVersion: string
  private baseUrl: string

  constructor(accessToken: string, apiVersion = "v21.0") {
    this.accessToken = accessToken
    this.apiVersion = apiVersion
    this.baseUrl = `https://graph.instagram.com/${this.apiVersion}`
  }

  async getScheduledContent(instagramBusinessAccountId: string): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/${instagramBusinessAccountId}/media`, {
        params: {
          access_token: this.accessToken,
          fields: "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,username",
          limit: 100,
        },
      })

      return response.data.data.filter((content: any) => new Date(content.timestamp) > new Date())
    } catch (error) {
      console.error("Error fetching scheduled content:", error)
      throw this.handleError(error)
    }
  }

  async createScheduledContent(instagramBusinessAccountId: string, contentData: any): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/${instagramBusinessAccountId}/media`, {
        access_token: this.accessToken,
        ...contentData,
      })

      return response.data
    } catch (error) {
      console.error("Error creating scheduled content:", error)
      throw this.handleError(error)
    }
  }

  async deleteScheduledContent(mediaId: string): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/${mediaId}`, {
        params: {
          access_token: this.accessToken,
        },
      })
    } catch (error) {
      console.error("Error deleting scheduled content:", error)
      throw this.handleError(error)
    }
  }

  async updateScheduledContent(mediaId: string, updateData: any): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/${mediaId}`, {
        access_token: this.accessToken,
        ...updateData,
      })

      return response.data
    } catch (error) {
      console.error("Error updating scheduled content:", error)
      throw this.handleError(error)
    }
  }

  private handleError(error: any): InstagramAPIResponse {
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

