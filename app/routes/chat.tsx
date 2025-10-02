import { useLoaderData } from "react-router"
import { loader } from "./protected";
import { useChat } from "@ai-sdk/react"
import { useState } from "react"


export { loader }

type Message = {
  id: number
  role: 'user' | 'assistant'
  content: string
}

// const messages: Message[] = [
//   {
//     id: 0,
//     role: "user",
//     content: "Hi! Can you help me understand how React hooks work?"
//   },
//   {
//     id: 1,
//     role: "assistant",
//     content: "Of course! React hooks are functions that let you use state and other React features in functional components. The most common ones are useState for managing component state and useEffect for side effects like API calls or subscriptions."
//   },
//   {
//     id: 2,
//     role: "user",
//     content: "What's the difference between useState and useEffect?"
//   },
//   {
//     id: 3,
//     role: "assistant",
//     content: "Great question! useState is for managing state variables that can change over time, like form inputs or counters. useEffect is for performing side effects like data fetching, setting up subscriptions, or manually changing the DOM. Think of useState as 'remembering values' and useEffect as 'doing things when something changes'."
//   },
//   {
//     id: 4,
//     role: "user",
//     content: "Can you give me an example of useState?"
//   },
//   {
//     id: 5,
//     role: "assistant",
//     content: "Sure! Here's a simple counter example:\n\n```javascript\nimport { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n```\n\nThe useState hook returns an array with two elements: the current state value and a function to update it."
//   },
//   {
//     id: 6,
//     role: "user",
//     content: "That makes sense! What about useEffect?"
//   },
//   {
//     id: 7,
//     role: "assistant",
//     content: "Here's a useEffect example that fetches data when a component mounts:\n\n```javascript\nimport { useState, useEffect } from 'react';\n\nfunction UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n  \n  useEffect(() => {\n    fetch(`/api/users/${userId}`)\n      .then(response => response.json())\n      .then(data => setUser(data));\n  }, [userId]); // Only run when userId changes\n  \n  return <div>{user ? user.name : 'Loading...'}</div>;\n}\n```\n\nThe dependency array `[userId]` tells React when to re-run the effect."
//   },
//   {
//     id: 8,
//     role: "user",
//     content: "Thanks! This is really helpful. One more question - what are custom hooks?"
//   },
//   {
//     id: 9,
//     role: "assistant",
//     content: "Custom hooks are your own functions that use React hooks inside them. They let you extract component logic into reusable functions. For example, you could create a `useLocalStorage` hook:\n\n```javascript\nfunction useLocalStorage(key, initialValue) {\n  const [storedValue, setStoredValue] = useState(() => {\n    try {\n      const item = window.localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch (error) {\n      return initialValue;\n    }\n  });\n  \n  const setValue = (value) => {\n    setStoredValue(value);\n    window.localStorage.setItem(key, JSON.stringify(value));\n  };\n  \n  return [storedValue, setValue];\n}\n```\n\nCustom hooks must start with 'use' and can be used in any component!"
//   }
// ];



export default function Chat() {
  console.log("========== CHAT COMPONENT LOADED ==========")

  const [input, setInput] = useState('')
  const data = useLoaderData()
  const { messages, sendMessage } = useChat({ streamProtocol: 'data' })

  console.log("Current messages:", messages)
  console.log("Type of messages:", typeof messages)
  console.log("Is messages an array?", Array.isArray(messages))

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          <strong>{message.role === 'user' ? 'User: ' : 'AI: '}</strong>
          {message.parts.map((part, i) => {
            if (part.type === 'text') {
              return <span key={i}>{part.text}</span>
            }
          })}</div>
      ))}

      <form onSubmit={(e) => {
        e.preventDefault()
        sendMessage({ text: input })
        setInput('')
      }}>
        <input type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}