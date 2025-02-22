export interface MediaValidationResult {
    isValid: boolean
    error?: string
  }
  
  export function validateMediaForInstagram(file: File): MediaValidationResult {
    // Check file type
    if (file.type.startsWith("image/")) {
      if (file.type !== "image/jpeg") {
        return {
          isValid: false,
          error: "Only JPEG images are supported by Instagram",
        }
      }
    } else if (file.type.startsWith("video/")) {
      // Add video format validation if needed
      // Instagram supports MP4 and MOV formats
      const supportedVideoFormats = ["video/mp4", "video/quicktime"]
      if (!supportedVideoFormats.includes(file.type)) {
        return {
          isValid: false,
          error: "Only MP4 and MOV video formats are supported",
        }
      }
    } else {
      return {
        isValid: false,
        error: "Unsupported file type",
      }
    }
  
    // Check file size (Instagram limit is around 8MB for photos and 100MB for videos)
    const MAX_IMAGE_SIZE = 8 * 1024 * 1024 // 8MB
    const MAX_VIDEO_SIZE = 100 * 1024 * 1024 // 100MB
  
    if (file.type.startsWith("image/") && file.size > MAX_IMAGE_SIZE) {
      return {
        isValid: false,
        error: "Image size must be less than 8MB",
      }
    }
  
    if (file.type.startsWith("video/") && file.size > MAX_VIDEO_SIZE) {
      return {
        isValid: false,
        error: "Video size must be less than 100MB",
      }
    }
  
    return { isValid: true }
  }
  
  export function validateCarouselMedia(files: File[]): MediaValidationResult {
    if (files.length > 10) {
      return {
        isValid: false,
        error: "Carousel posts are limited to 10 items",
      }
    }
  
    for (const file of files) {
      const result = validateMediaForInstagram(file)
      if (!result.isValid) {
        return result
      }
    }
  
    return { isValid: true }
  }
  
  