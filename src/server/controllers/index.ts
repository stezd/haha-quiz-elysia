import { Elysia, status, t } from "elysia"
import { createInsertSchema, createUpdateSchema } from "drizzle-typebox"
import { table } from "@/db/schema"
import {
  db,
  fetchQuestions,
  insertQuestion,
  question,
  updateQuestion,
  fetchQuestionsById,
} from "@/db"
const _createQuiz = createInsertSchema(table.quiz)
const _updateQuiz = createUpdateSchema(table.quiz)

export const elysiaRoutes = new Elysia({ prefix: "/api" })
  .get("/", () => "Elysia!")
  .get(
    "/question/:id",
    async ({ params, set }) => {
      const { id } = params
      const result = await fetchQuestionsById(id)
      if (result.length === 0) {
        set.status = 404
        return "Not found"
      }
      return result
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    },
  )
  .get("/question", async () => {
    return fetchQuestions()
  })
  .post(
    "/question",
    async ({ body }) => {
      const response = await insertQuestion(body)
      return response
    },
    {
      body: t.Omit(_createQuiz, ["id", "createdAt", "updatedAt"]),
    },
  )
  .put(
    "/question",
    async ({ body }) => {
      const { id, question, question_type, choices } = body
      if (typeof id !== "number") {
        throw new Error("question_type is required")
      }
      if (question_type === undefined) {
        throw new Error("question_type is required")
      }
      if (typeof question !== "string") {
        throw new Error("question is required and must be a string")
      }
      const newDate = new Date()
      const questionNew: question = {
        question,
        question_type,
        choices,
        updatedAt: newDate,
      }
      const response = await updateQuestion(id, questionNew)
      return response
    },
    {
      body: t.Omit(_updateQuiz, ["createdAt", "updatedAt"]),
    },
  )
