// Form
import { Form, useRouteError, Navigate } from "react-router"
// useState
import { useState } from "react"
// authClient
import { authClient } from "../lib/auth-client"

export const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signUp = async () => {
    // const error = useRouteError()


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
          // <Navigate to="/" />
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
        onSubmit={signUp}
      >
        {/* <input type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        /> */}

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
        <button type="submit">
          Sign Up
        </button>
      </Form>
    </div>
  )
}