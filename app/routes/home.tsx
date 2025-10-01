import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { authClient } from "lib/auth-client";
import { SignIn } from "./signin";
import { SignUp } from "./signup";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { data } = authClient.useSession()

  if (data) {
    return <div>
      <h1>AI Chat Bot</h1>
      <SignIn />
      <SignUp />
    </div>

  }
}
