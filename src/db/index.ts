import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "./schema"
import { PgInteger, PgSerial } from "drizzle-orm/pg-core"
import { eq } from "drizzle-orm"
export const db = drizzle(process.env.DATABASE_URL!, { schema })

export type question = typeof schema.quiz.$inferInsert
export type id_type = typeof schema.quiz.id
export const insertQuestion = async (question: question) => {
  try {
    return await db.insert(schema.quiz).values(question).returning()
  } catch (error) {
    throw error
  }
}

export const fetchQuestions = async () => {
  return await db.query.quiz.findMany()
}

export const fetchQuestionsById = async (id: number) => {
  return await db.query.quiz.findMany({
    where: eq(schema.quiz.id, id),
  })
}

export const updateQuestion = async (id: number, question: question) => {
  try {
    const result = await db
      .update(schema.quiz)
      .set(question)
      .where(eq(schema.quiz.id, id))
      .returning()
    return result
  } catch (error) {
    throw error
  }
}
