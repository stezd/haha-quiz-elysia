import { relations } from "drizzle-orm"
import { pgTable, varchar, timestamp, pgEnum, jsonb } from "drizzle-orm/pg-core"

const quizEnum = pgEnum("type", [
  "text",
  "number",
  "boolean",
  "multiple_choice",
])

export const quiz = pgTable("quiz", {
  id: varchar("id").notNull().primaryKey(),
  question: varchar("question").notNull().unique(),
  type: quizEnum().notNull(),
  choices: jsonb("choices"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const quizSubmission = pgTable("quiz_submission", {
  id: varchar("id").notNull().primaryKey(),
  answer: jsonb("answer").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const table = {
  quiz,
  quizSubmission,
} as const

export type Table = typeof table
