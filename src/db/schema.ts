import {
  pgTable,
  varchar,
  timestamp,
  pgEnum,
  jsonb,
  serial,
} from "drizzle-orm/pg-core"

export const quizTypeEnum = pgEnum("quiz_type", [
  "text",
  "number",
  "boolean",
  "multiple_choice",
])

export const quizSerial = serial("quiz_id_seq")

export const quiz = pgTable("quiz", {
  id: quizSerial.notNull().primaryKey(),
  question: varchar("question").notNull().unique(),
  question_type: quizTypeEnum("question_type").notNull(),
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
