import { pgTable, varchar, uuid, boolean, timestamp, text } from "drizzle-orm/pg-core";

// Export ALL Better Auth tables
export * from './auth-schema'
import { user } from './auth-schema'


// betterAuth CREATES IT'S OWN 'user' TABLE ??
// export const users = pgTable("users", {
//   id: uuid().primaryKey().defaultRandom(),
//   name: varchar({ length: 255 }).notNull(),
//   email: varchar({ length: 255 }).notNull().unique(),
// });

export const conversations = pgTable("conversations", {
  id: uuid().primaryKey().defaultRandom(),
  userId: text().notNull().references(() => user.id),
  created_at: timestamp().defaultNow().notNull(),
  title: varchar({ length: 255 }).notNull()
})

export const messages = pgTable("messages", {
  id: uuid().primaryKey().defaultRandom(),
  conversation_id: uuid().notNull().references(() => conversations.id),
  created_at: timestamp().defaultNow().notNull(),
  content: text().notNull(),
  isUser: boolean()
})


// SIMPLE TEST
//
// import { pgTable, text } from "drizzle-orm/pg-core";

// export const test = pgTable("test", {
//   id: text().primaryKey(),
// });