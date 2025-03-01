import { withPayload } from '@payloadcms/next/withPayload'
import { fileURLToPath } from 'node:url'
import createJiti from 'jiti'
const jiti = createJiti(fileURLToPath(import.meta.url))

jiti('./src/env')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
}

export default withPayload(nextConfig)
