import { drizzle } from 'drizzle-orm/node-postgres'
import { env } from '@/config/env.config.js'

export const db = drizzle(env.DATABASE_URL)
