// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { env } from './env'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: env.DATABASE_URI,
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
    s3Storage({
      enabled: env.S3_BUCKET != undefined,
      clientUploads: true,
      collections: {
        media: {
          prefix: 'media',
          disableLocalStorage: true,
          disablePayloadAccessControl: env.S3_PUBLIC_ENDPOINT !== undefined ? true : undefined,
          generateFileURL: (doc) =>
            `${env.S3_PUBLIC_ENDPOINT}${env.S3_PUBLIC_ENDPOINT?.endsWith('/') ? '' : '/'}${doc.prefix}${doc.prefix?.endsWith('/') || doc.filename?.startsWith('/') ? '' : '/'}${doc.filename}`,
        },
      },
      bucket: env.S3_BUCKET ?? '',
      config: {
        region: 'auto',
        forcePathStyle: true,
        endpoint: env.S3_ENDPOINT ?? '',
        credentials: {
          accessKeyId: env.S3_ACCESS_KEY ?? '',
          secretAccessKey: env.S3_SECRET_KEY ?? '',
        },
      },
    }),
  ],
})
