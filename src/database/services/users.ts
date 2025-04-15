import { db } from '@database/index'
import { users } from '@database/schema'
import { eq } from 'drizzle-orm'

export const getUser = async (id: string) => {
  const user = await db.select().from(users).where(eq(users.id, id)).get()

  if (!user) {
    throw new Error('User not found')
  }

  return user
}

export const getUsers = async () => {
  const usersList = await db.select().from(users).all()

  return usersList
}

export const createUser = async (user: typeof users.$inferInsert) => {
  const newUser = await db.insert(users).values(user).returning().get()

  return newUser
}
