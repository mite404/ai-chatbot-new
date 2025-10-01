import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { auth } from "../lib/auth.server"

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await auth.api.getSession({ headers: request.headers })

  if (session?.user) {
    return { user: session.user }
  } else {
    throw redirect("/")
  }
}

export async function action({ request }: ActionFunctionArgs) {
  return auth.handler(request)
}