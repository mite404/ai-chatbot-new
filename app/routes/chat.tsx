import { useLoaderData } from "react-router"
import { loader } from "./protected";
import { useChat } from "@ai-sdk/react"
import { useState } from "react"
import { Input } from "~/components/retroui/Input";
import { Button } from "~/components/retroui/Button";

export { loader }

// type Message = {
//   id: number
//   role: 'user' | 'assistant'
//   content: string
// }

export default function Chat() {
  console.log("========== CHAT COMPONENT LOADED ==========")
  const [input, setInput] = useState('')
  // const data = useLoaderData()
  const { messages, sendMessage } = useChat({ streamProtocol: 'data' })

  console.log("Current messages:", messages)
  console.log("Type of messages:", typeof messages)
  console.log("Is messages an array?", Array.isArray(messages))

  return (

    <>
      {/* background message bubbles will be laid on top of */}
      <div className="bg-gray-200 p-4 flex-col outline-1 ">

        {messages.map((message) => (

          <div key={message.id} className={`flex whitespace-pre-wrap ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>

            {/* a single message bubble (the colored background box) */}
            <div className={`px-4 py-2 bg-primary text-primary-foreground ${message.role === 'user' ? 'bg-yellow-200' : 'bg-gray-200'}`}>
              <strong>{message.role === 'user' ? 'User: ' : 'AI: '}</strong>

              {message.parts.map((part, i) => {
                if (part.type === 'text') {
                  // content inside the bubble
                  return <span key={i}>{part.text}</span>
                }
              })}
            </div>
          </div>
        ))}
      </div>

      <div>
        <form onSubmit={(e) => {
          e.preventDefault()
          sendMessage({ text: input })
          setInput('')
        }}>


          <Input type="text"
            value={input}
            className="font-head"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter message..." />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </>
  )
}