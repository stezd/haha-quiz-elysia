import { elysia } from "@/server/client"

export default async function Home() {
  const { data } = await elysia.api.get()
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <p className="text-4xl font-bold text-white">{data}</p>
    </main>
  )
}
