export interface OptimizationResult {
  score: number;
  suggestions: string[];
  predictedLikes: number;
  predictedComments: number;
}

export interface ScheduledPost {
  caption: string;
  image: string;
  hashtags: string[];
  scheduledTime: Date;
}

