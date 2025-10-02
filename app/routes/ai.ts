import type { Route } from "./+types/ai"
import { convertToModelMessages, streamText } from "ai"
import { google } from "@ai-sdk/google"
import { auth } from "../lib/auth.server"

export async function action({ request }: Route.ActionArgs) {
  console.log("ACTION CALLED")
  const session = await auth.api.getSession({ headers: request.headers })
  const { messages } = await request.json()
  const convertedMessages = convertToModelMessages(messages)

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages: convertedMessages
  })

  console.log("available methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(result)))
  console.log(convertedMessages)
  return result.toUIMessageStreamResponse()
}
