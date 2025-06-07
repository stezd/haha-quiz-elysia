import { Elysia } from "elysia"
import { swagger } from "@elysiajs/swagger"
import { elysiaRoutes } from "@/server/controllers"
export const elysiaApp = new Elysia()
  .use(
    swagger({
      path: "/api/swagger",
    }),
  )
  .use(elysiaRoutes)

export type TElysiaApp = typeof elysiaApp
