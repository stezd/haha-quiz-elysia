import { Elysia } from "elysia"

export const elysiaRoutes = new Elysia({ prefix: "/api" })
  .get("/", () => "Elysia!")
  .get("/quiz", () => "quiz")
