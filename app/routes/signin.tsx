import { Form, redirect, useNavigate } from "react-router"
import { useState } from "react"
import { authClient } from "../lib/auth-client"

export const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const signIn = async () => {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: (ctx) => {

        },
        onSuccess: (ctx) => {
          navigate("/chat")
        },
        onError: (ctx) => {
          alert(ctx.error.message)
        },
      },
    )
  }

  return (
    <div>
      <h2>
        Sign In
      </h2>
      <Form onSubmit={signIn}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          type="submit"
          style={{ cursor: 'pointer' }}
        >
          Sign In
        </button>
      </Form>
    </div>
  )
}