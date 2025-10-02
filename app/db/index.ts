console.log('db/index.ts loading...')
import 'dotenv/config'
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Found' : 'Missing')
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(process.env.DATABASE_URL!, { prepare: false })
export const db = drizzle({ client });


// FOR TESTING DB CONNECTION
//
// import { eq } from 'drizzle-orm';
// import { users } from './schema'

// FOR TESTING DB CONNECTION
//
// async function main() {
//   const users: typeof users.$inferInsert = {
//     name: 'John',
//     email: 'john123@test.com'
//   };

//   await db.insert(users).values(user);
//   console.log('New user created!')

//   const allUsers = await db.select().from(users);
//   console.log('Getting all users from the database:', allUsers)
//   /*
//   const users: {
//     id: number;
//     name: string;
//     email: string;
//   }[]
//   */

//   await db
//     .update(users)
//     .set({ name: 'Steve', })
//     .where(eq(users.email, user.email))
//   console.log('User info updated!')

//   await db
//     .delete(users)
//     .where(eq(users.email, user.email))
//   console.log('User deleted!')
// }

// main();
