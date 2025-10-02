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

    // <div className="flex flex-col h-screen">
    <div className="flex-1 overflow-y-auto p-4 bg-gray-200">
      {/* background message bubbles will be laid on top of */}
      <div className="bg-gray-200 p-4 flex flex-col-reverse gap-3">

        {messages.map((message) => (

          <div key={message.id} className={`flex whitespace-pre-wrap ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>

            {/* a single message bubble (the colored background box) */}
            <div className={`px-4 py-2 text-primary-foreground ${message.role === 'user' ? 'bg-yellow-200' : 'bg-gray-300'}`}>
              {/* <strong>{message.role === 'user' ? 'User: ' : 'AI: '}</strong> */}

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

      <div className="p-4 border-t">
        <form className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage({ text: input })
            setInput('')
          }}>


          <Input className="font-head flex-1"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter message..." />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
    // </div >
  )
}