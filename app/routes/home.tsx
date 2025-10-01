import type { Route } from "./+types/home";
import { authClient } from "../lib/auth-client";
import { SignIn } from "./signin";
import { SignUp } from "./signup";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { data, isPending, error } = authClient.useSession()

  if (data) {
    return <div>Hello, {data.user.email}</div>
  } else if (isPending) {
    return <div>Loading...</div>
  } else if (error) {  // later add more robust error handling
    throw new Error("Unable to authenticate!")
  } else {
    return <div>
      <h1>AI Chat Bot</h1>
      <SignIn />
      <SignUp />
    </div>
  }
}
