import { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage'
import { TypingIndicator } from './TypingIndicator'

export const ChatThread = ({ messages, isLoading, pipelineStatus }) => {
  const endOfMessagesRef = useRef(null)

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isLoading])

  return (
    <div className="chat-scroll relative z-[1] flex-1 overflow-y-auto px-4 pb-44 md:px-8">
      <div className="mx-auto flex min-h-full w-full max-w-[700px] flex-col gap-5 py-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && <TypingIndicator status={pipelineStatus} />}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  )
}
