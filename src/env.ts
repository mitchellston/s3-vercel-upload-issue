import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  skipValidation: typeof process.env.SKIP_ENV_VALIDATION === 'string',
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),

    // CMS
    PAYLOAD_SECRET: process.env.NODE_ENV == 'production' ? z.string().min(50) : z.string(),

    // Database
    DATABASE_URI: z.string().min(1).optional().default('file:./steentech-nl.db'),

    // S3 bucket
    S3_BUCKET: process.env.NODE_ENV == 'production' ? z.string().min(1) : z.string(),
    S3_ENDPOINT: process.env.NODE_ENV == 'production' ? z.string().url().min(1) : z.string(),
    S3_PUBLIC_ENDPOINT: z.string().url().min(1),
    S3_ACCESS_KEY: process.env.NODE_ENV == 'production' ? z.string().min(1) : z.string(),
    S3_SECRET_KEY: process.env.NODE_ENV == 'production' ? z.string().min(1) : z.string(),
  },
  client: {},
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    // CMS
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,

    // Database
    DATABASE_URI: process.env.DATABASE_URI,

    // S3 bucket
    S3_BUCKET: process.env.S3_BUCKET,
    S3_ENDPOINT: process.env.S3_ENDPOINT,
    S3_PUBLIC_ENDPOINT: process.env.S3_PUBLIC_ENDPOINT,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
})
