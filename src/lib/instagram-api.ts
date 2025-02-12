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

// import axios from "axios"

// interface InstagramAPIResponse {
//   status: number
//   data?: any
//   error?: {
//     message: string
//     type: string
//     code: number
//     error_subcode?: number
//     fbtrace_id: string
//   }
// }

// export class InstagramAPI {
//   private accessToken: string
//   private apiVersion: string
//   private baseUrl: string

//   constructor(accessToken: string, apiVersion = "v21.0") {
//     this.accessToken = accessToken
//     this.apiVersion = apiVersion
//     this.baseUrl = `https://graph.instagram.com/${this.apiVersion}`
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
//       throw this.handleError(error)
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
//       throw this.handleError(error)
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
//       throw this.handleError(error)
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
//       throw this.handleError(error)
//     }
//   }

//   private handleError(error: any): InstagramAPIResponse {
//     if (axios.isAxiosError(error)) {
//       const errorResponse = error.response?.data?.error || {
//         message: "Unknown Instagram API error",
//         type: "API_ERROR",
//         code: 500,
//       }

//       console.error("Instagram API - Formatted Error:", {
//         message: errorResponse.message,
//         type: errorResponse.type,
//         code: errorResponse.code,
//         subcode: errorResponse.error_subcode,
//       })

//       return {
//         status: error.response?.status || 500,
//         error: errorResponse,
//       }
//     }

//     return {
//       status: 500,
//       error: {
//         message: error instanceof Error ? error.message : "Unknown error",
//         type: "INTERNAL_ERROR",
//         code: 500,
//         fbtrace_id: "",
//       },
//     }
//   }
// }

// import axios from "axios"

// interface InstagramAPIResponse {
//   status: number
//   data?: any
//   error?: {
//     message: string
//     type: string
//     code: number
//     error_subcode?: number
//     fbtrace_id: string
//   }
// }

// export class InstagramAPI {
//   private accessToken: string
//   private apiVersion: string
//   private baseUrl: string

//   constructor(accessToken: string, apiVersion = "v21.0") {
//     this.accessToken = accessToken
//     this.apiVersion = apiVersion
//     this.baseUrl = `https://graph.instagram.com/${this.apiVersion}`
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
//       throw this.handleError(error)
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
//       console.error("Error creating scheduled contenttttttt:", error)
//       throw this.handleError(error)
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
//       throw this.handleError(error)
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
//       throw this.handleError(error)
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
//       throw this.handleError(error)
//     }
//   }

//   private handleError(error: any): InstagramAPIResponse {
//     if (axios.isAxiosError(error)) {
//       const errorResponse = error.response?.data?.error || {
//         message: "Unknown Instagram API error",
//         type: "API_ERROR",
//         code: 500,
//       }

//       console.error("Instagram API - Formatted Error:", {
//         message: errorResponse.message,
//         type: errorResponse.type,
//         code: errorResponse.code,
//         subcode: errorResponse.error_subcode,
//       })

//       return {
//         status: error.response?.status || 500,
//         error: errorResponse,
//       }
//     }

//     return {
//       status: 500,
//       error: {
//         message: error instanceof Error ? error.message : "Unknown error",
//         type: "INTERNAL_ERROR",
//         code: 500,
//         fbtrace_id: "",
//       },
//     }
//   }
// }


//when using real file upload
// import axios from "axios"
// import FormData from "form-data"

// interface InstagramAPIResponse {
//   status: number
//   data?: any
//   error?: {
//     message: string
//     type: string
//     code: number
//     error_subcode?: number
//     fbtrace_id: string
//   }
// }

// export class InstagramAPI {
//   private accessToken: string
//   private apiVersion: string
//   private baseUrl: string

//   constructor(accessToken: string, apiVersion = "v21.0") {
//     this.accessToken = accessToken
//     this.apiVersion = apiVersion
//     this.baseUrl = `https://graph.instagram.com/${this.apiVersion}`
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
//       throw this.handleError(error)
//     }
//   }

//   async createScheduledContent(instagramBusinessAccountId: string, contentData: any): Promise<any> {
//     try {
//       const formData = new FormData()
//       formData.append("access_token", this.accessToken)
//       formData.append("caption", contentData.content)
//       formData.append("media_type", contentData.postType.toUpperCase())

//       if (contentData.file) {
//         // If a file is provided, upload it first
//         const uploadResponse = await this.uploadMedia(contentData.file)
//         formData.append("image_url", uploadResponse.url)
//       } else if (contentData.mediaUrl) {
//         // If a media URL is provided, use it directly
//         formData.append("image_url", contentData.mediaUrl)
//       } else {
//         throw new Error("Either file or mediaUrl must be provided")
//       }

//       if (contentData.scheduledDate) {
//         formData.append("published", "false")
//         formData.append("scheduled_publish_time", Math.floor(new Date(contentData.scheduledDate).getTime() / 1000))
//       }

//       const response = await axios.post(`${this.baseUrl}/${instagramBusinessAccountId}/media`, formData, {
//         headers: formData.getHeaders(),
//       })

//       return response.data
//     } catch (error) {
//       console.error("Error creating scheduled content:", error)
//       throw this.handleError(error)
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
//       throw this.handleError(error)
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
//       throw this.handleError(error)
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
//       throw this.handleError(error)
//     }
//   }

//   private async uploadMedia(file: File): Promise<{ url: string }> {
//     try {
//       const formData = new FormData()
//       formData.append("access_token", this.accessToken)
//       formData.append("file", file)

//       const response = await axios.post(`${this.baseUrl}/media`, formData, {
//         headers: formData.getHeaders(),
//       })

//       return { url: response.data.url }
//     } catch (error) {
//       console.error("Error uploading media:", error)
//       throw this.handleError(error)
//     }
//   }

//   private handleError(error: any): InstagramAPIResponse {
//     if (axios.isAxiosError(error)) {
//       const errorResponse = error.response?.data?.error || {
//         message: "Unknown Instagram API error",
//         type: "API_ERROR",
//         code: 500,
//       }

//       console.error("Instagram API - Formatted Error:", {
//         message: errorResponse.message,
//         type: errorResponse.type,
//         code: errorResponse.code,
//         subcode: errorResponse.error_subcode,
//       })

//       return {
//         status: error.response?.status || 500,
//         error: errorResponse,
//       }
//     }

//     return {
//       status: 500,
//       error: {
//         message: error instanceof Error ? error.message : "Unknown error",
//         type: "INTERNAL_ERROR",
//         code: 500,
//         fbtrace_id: "",
//       },
//     }
//   }
// }

// import axios from "axios"
// import FormData from "form-data"

// interface InstagramAPIResponse {
//   status: number
//   data?: any
//   error?: {
//     message: string
//     type: string
//     code: number
//     error_subcode?: number
//     fbtrace_id: string
//   }
// }

// export class InstagramAPI {
//   private accessToken: string
//   private apiVersion: string
//   private baseUrl: string

//   constructor(accessToken: string, apiVersion = "v21.0") {
//     this.accessToken = accessToken
//     this.apiVersion = apiVersion
//     this.baseUrl = `https://graph.instagram.com/${this.apiVersion}`
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
//       throw this.handleError(error)
//     }
//   }

//   async createScheduledContent(instagramBusinessAccountId: string, contentData: any): Promise<any> {
//     try {
//       const formData = new FormData()
//       formData.append("access_token", this.accessToken)
//       formData.append("caption", contentData.content)
//       formData.append("media_type", contentData.postType.toUpperCase())

//       if (contentData.mediaUrl) {
//         // Use the temporary file URL directly
//         formData.append("image_url", contentData.mediaUrl)
//       } else {
//         throw new Error("MediaUrl must be provided")
//       }

//       if (contentData.scheduledDate) {
//         formData.append("published", "false")
//         formData.append("scheduled_publish_time", Math.floor(new Date(contentData.scheduledDate).getTime() / 1000))
//       }

//       const response = await axios.post(`${this.baseUrl}/${instagramBusinessAccountId}/media`, formData, {
//         headers: formData.getHeaders(),
//       })

//       return response.data
//     } catch (error) {
//       console.error("Error creating scheduled content:", error)
//       throw this.handleError(error)
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
//       throw this.handleError(error)
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
//       throw this.handleError(error)
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
//       throw this.handleError(error)
//     }
//   }

//   private handleError(error: any): InstagramAPIResponse {
//     if (axios.isAxiosError(error)) {
//       const errorResponse = error.response?.data?.error || {
//         message: "Unknown Instagram API error",
//         type: "API_ERROR",
//         code: 500,
//       }

//       console.error("Instagram API - Formatted Error:", {
//         message: errorResponse.message,
//         type: errorResponse.type,
//         code: errorResponse.code,
//         subcode: errorResponse.error_subcode,
//       })

//       return {
//         status: error.response?.status || 500,
//         error: errorResponse,
//       }
//     }

//     return {
//       status: 500,
//       error: {
//         message: error instanceof Error ? error.message : "Unknown error",
//         type: "INTERNAL_ERROR",
//         code: 500,
//         fbtrace_id: "",
//       },
//     }
//   }
// }

import axios from "axios"
import FormData from "form-data"

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
    this.baseUrl = `https://graph.facebook.com/v22.0`
  }

  async getScheduledContent(instagramBusinessAccountId: string): Promise<any[]> {
    console.log(`[InstagramAPI] Fetching scheduled content for account: ${instagramBusinessAccountId}`)
    try {
      const response = await axios.get(`${this.baseUrl}/${instagramBusinessAccountId}/media`, {
        params: {
          access_token: this.accessToken,
          fields: "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,username",
          limit: 100,
        },
      })

      console.log(`[InstagramAPI] Fetched ${response.data.data.length} items`)
      const scheduledContent = response.data.data.filter((content: any) => new Date(content.timestamp) > new Date())
      console.log(`[InstagramAPI] ${scheduledContent.length} items are scheduled for future`)
      return scheduledContent
    } catch (error) {
      console.error("Error fetching scheduled content:", error)
      throw this.handleError(error)
    }
  }

  async createScheduledContent(instagramBusinessAccountId: string, contentData: any): Promise<any> {
    console.log(`[InstagramAPI] Creating scheduled content for account: ${instagramBusinessAccountId}`)
    console.log(`[InstagramAPI] Content data:`, JSON.stringify(contentData, null, 2))
    try {
      const formData = new FormData()
      formData.append("access_token", this.accessToken)
      formData.append("caption", contentData.content)
      formData.append("media_type", contentData.postType.toUpperCase())

      if (contentData.mediaUrl) {
        console.log(`[InstagramAPI] Using media URL: ${contentData.mediaUrl}`)
        formData.append("image_url", contentData.mediaUrl)
      } else {
        console.error("[InstagramAPI] MediaUrl not provided")
        throw new Error("MediaUrl must be provided")
      }

      if (contentData.scheduledDate) {
        const scheduledTime = Math.floor(new Date(contentData.scheduledDate).getTime() / 1000)
        console.log(`[InstagramAPI] Scheduling content for: ${new Date(scheduledTime * 1000).toISOString()}`)
        formData.append("published", "false")
        formData.append("scheduled_publish_time", scheduledTime.toString())
      }

      const response = await axios.post(`${this.baseUrl}/${instagramBusinessAccountId}/media`, formData, {
        headers: formData.getHeaders(),
      })

      console.log(`[InstagramAPI] Content created successfully. Response:`, JSON.stringify(response.data, null, 2))
      return response.data
    } catch (error) {
      console.error("Error creating scheduled content:", error)
      throw this.handleError(error)
    }
  }

  async deleteScheduledContent(mediaId: string): Promise<void> {
    console.log(`[InstagramAPI] Deleting scheduled content: ${mediaId}`)
    try {
      await axios.delete(`${this.baseUrl}/${mediaId}`, {
        params: {
          access_token: this.accessToken,
        },
      })
      console.log(`[InstagramAPI] Content deleted successfully`)
    } catch (error) {
      console.error("Error deleting scheduled content:", error)
      throw this.handleError(error)
    }
  }

  async updateScheduledContent(mediaId: string, updateData: any): Promise<any> {
    console.log(`[InstagramAPI] Updating scheduled content: ${mediaId}`)
    console.log(`[InstagramAPI] Update data:`, JSON.stringify(updateData, null, 2))
    try {
      const response = await axios.post(`${this.baseUrl}/${mediaId}`, {
        access_token: this.accessToken,
        ...updateData,
      })

      console.log(`[InstagramAPI] Content updated successfully. Response:`, JSON.stringify(response.data, null, 2))
      return response.data
    } catch (error) {
      console.error("Error updating scheduled content:", error)
      throw this.handleError(error)
    }
  }

  async getUserProfile(instagramUserId: string): Promise<any> {
    console.log(`[InstagramAPI] Fetching user profile for: ${instagramUserId}`)
    try {
      const fields = "id,username,name,profile_picture_url,followers_count,follows_count,media_count"
      const response = await axios.get(`${this.baseUrl}/${instagramUserId}`, {
        params: {
          fields: fields,
          access_token: this.accessToken,
        },
      })

      console.log(`[InstagramAPI] User profile fetched successfully`)
      return response.data
    } catch (error) {
      console.error("Error fetching user profile:", error)
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
        message: error instanceof Error ? error.message : "Unknown errorrrrrrapi",
        type: "INTERNAL_ERROR",
        code: 500,
        fbtrace_id: "",
      },
    }
  }
}

