export interface InstagramShortLivedToken {
    access_token: string;
    user_id: number;
    permissions?: string[];
  }
  
  export interface InstagramLongLivedToken {
    access_token: string;
    token_type: string;
    expires_in: number;
  }
  
  export interface EnvironmentVariables {
    INSTAGRAM_CLIENT_ID: string;
    INSTAGRAM_CLIENT_SECRET: string;
    NEXT_PUBLIC_HOST_URL: string;
    INSTAGRAM_TOKEN_URL: string;
    INSTAGRAM_BASE_URL: string;
  }
  
  export interface InstagramPost {
    id: string
    postid: string
    caption: string | null
    media: string
    mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
    scheduledFor?: Date
    status?: 'PENDING' | 'POSTED' | 'FAILED'
    automationId?: string
  }
  
  export interface PostToInstagramParams {
    media: string
    caption?: string | null
    accessToken: string
  }
  
  export interface SchedulePostParams {
    caption: string
    image: string
    hashtags: string[]
    scheduledTime: Date
  }
  
  