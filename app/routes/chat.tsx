import type { Route } from "./+types/home";
import { useLoaderData } from "react-router"
import { authClient } from "../lib/auth-client";
import { loader } from "./protected";
export { loader }


// const getUser = async function (query?: string | null) => {
//   await new Promise((resolve) => setTimeout(resolve, 500))
// }

// export async function loader({ params }: Route.LoaderArgs) {
//   const contact = await getContact(params.user);
//   if (!contact) {
//     throw new Response("Not Found", { status: 404 });
//   }
//   return { contact };
// }


export default function Chat() {
  const data = useLoaderData()

  if (data) {
    return <div>Hello, {data.user.email}</div>
  } else {
    return <div>Loading...</div>
  }
}