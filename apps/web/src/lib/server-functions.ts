import { db } from '@/db';
import { waitlist } from '@/db/schema';
import { env } from '@/lib/env/server';
import { createServerFn } from '@tanstack/react-start';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { count } from 'drizzle-orm';
import { z } from 'zod';

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, '60 s'),
  analytics: true,
});

const joinWaitlistSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const joinWaitlist = createServerFn({ method: 'POST' })
  .validator(joinWaitlistSchema)
  .handler(async ({ data }) => {
    try {
      // For server functions, we'll use a simplified rate limiting approach
      // IP detection is more complex in server functions context
      const ip = 'server-function-request';

      // Check rate limit
      const { success, remaining } = await ratelimit.limit(ip);

      if (!success) {
        throw new Error('Too many requests. Please try again later.');
      }

      const { email } = data;

      // Insert into database
      try {
        await db.insert(waitlist).values({ email });

        return {
          success: true,
          message: 'Successfully joined the waitlist!',
          remaining,
        };
      } catch (error: any) {
        // Handle unique constraint violation (email already exists)
        if (error.code === '23505' || error.constraint === 'waitlist_email_unique') {
          throw new Error('This email is already on the waitlist.');
        }

        throw error;
      }
    } catch (error) {
      console.error('Waitlist join error:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred. Please try again.');
    }
  });

export const getWaitlistCount = createServerFn().handler(async () => {
  try {
    const result = await db.select({ count: count() }).from(waitlist);
    const waitlistCount = result[0]?.count ?? 0;

    return {
      count: waitlistCount,
    };
  } catch (error) {
    console.error('Waitlist count error:', error);
    throw new Error('Failed to fetch waitlist count');
  }
});