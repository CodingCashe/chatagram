// lib/rate-limiter.ts
type RateLimiterOptions = {
  windowMs: number;
  maxRequests: number;
};

type RateLimitRecord = {
  count: number;
  resetTime: number;
};

type RateLimitResult = {
  success: boolean;
  remaining: number;
  retryAfter: number;
};

export class RateLimiter {
  private windowMs: number;
  private maxRequests: number;
  private cache: Map<string, RateLimitRecord>;

  constructor(options: RateLimiterOptions) {
    this.windowMs = options.windowMs;
    this.maxRequests = options.maxRequests;
    this.cache = new Map();

    // Clean up expired entries every minute
    setInterval(() => this.cleanup(), 60 * 1000);
  }

  async check(key: string): Promise<RateLimitResult> {
    const now = Date.now();
    const record = this.cache.get(key) || { count: 0, resetTime: now + this.windowMs };

    // Reset if the window has expired
    if (now > record.resetTime) {
      record.count = 0;
      record.resetTime = now + this.windowMs;
    }

    // Increment the count
    record.count += 1;
    this.cache.set(key, record);

    const remaining = Math.max(0, this.maxRequests - record.count);
    const success = record.count <= this.maxRequests;
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);

    return { success, remaining, retryAfter };
  }

  private cleanup() {
    const now = Date.now();
    // Use Array.from to avoid TypeScript iteration issues with Map
    const keys = Array.from(this.cache.keys());
    
    for (const key of keys) {
      const record = this.cache.get(key);
      if (record && now > record.resetTime) {
        this.cache.delete(key);
      }
    }
  }
}