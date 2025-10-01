console.log('auth.server.ts loading...')
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index";
import * as betterAuthSchema from '../db/auth-schema'

console.log('About to initialize betterAuth')
console.log('db object:', db ? 'exists' : 'MISSING')


export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: betterAuthSchema
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["http://localhost:5173"],
});

console.log('betterAuth initialized successfully')