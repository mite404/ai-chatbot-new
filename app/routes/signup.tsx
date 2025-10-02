import { Form, useRouteError, Navigate, useNavigate } from "react-router"
import { useState } from "react"
import { authClient } from "../lib/auth-client"

export const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const signUp = async () => {
    await authClient.signUp.email(
      {
        email,
        password,
        name
      },
      {
        onRequest: (ctx) => {
          // return <div>Loading...</div>
        },
        onSuccess: (ctx) => {
          navigate("/chat")
        },
        onError: (ctx) => {
          alert(ctx.error)
        },
      },
    )
  }

  return (
    <div>
      <h2>SignUp</h2>
      <Form
        onSubmit={signUp}>
        <input type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit"
          style={{ cursor: 'pointer' }}
        >
          Sign Up
        </button>
      </Form>
    </div>
  )
}