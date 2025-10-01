console.log('🔷 auth.server.ts loading...')
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index";

console.log('🔷 About to initialize betterAuth')
console.log('🔷 db object:', db ? 'exists' : 'MISSING')

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
});

console.log('🔷 betterAuth initialized successfully')