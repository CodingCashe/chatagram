// export interface OptimizationResult {
//   score: number;
//   suggestions: string[];
//   predictedLikes: number;
//   predictedComments: number;
// }

// export interface ScheduledPost {
//   caption: string;
//   image: string;
//   hashtags: string[];
//   scheduledTime: Date;
// }

export interface OptimizationResult {
  score: number;
  suggestions: string[];
  predictedLikes: number;
  predictedComments: number;
}

export interface ScheduledPost {
  caption: string;
  image: string | null;  // Updated to allow null
  hashtags: string[];
  scheduledTime: Date;
}

