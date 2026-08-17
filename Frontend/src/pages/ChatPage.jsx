import { useMemo, useState } from 'react'
import { ChatInput } from '../components/ChatInput'
import { ChatSidebar } from '../components/ChatSidebar'
import { ChatThread } from '../components/ChatThread'
import { EmptyChatState } from '../components/EmptyChatState'
import { runPipeline } from '../services/llm'

export const ChatPage = () => {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [pipelineStatus, setPipelineStatus] = useState('')
  const [selectedModel, setSelectedModel] = useState('llama-3.3-70b-versatile')

  const hasUserMessages = useMemo(
    () => messages.some((message) => message.role === 'user'),
    [messages],
  )

  const handleSendMessage = async (content) => {
    if (!content.trim() || isLoading) return

    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim(),
    }

    setMessages((currentMessages) => [...currentMessages, userMessage])
    setIsLoading(true)
    setPipelineStatus('Thinking...')

    try {
      const response = await runPipeline(userMessage.content, setPipelineStatus, selectedModel)

      const assistantMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
      }

      setMessages((currentMessages) => [...currentMessages, assistantMessage])
    } catch (error) {
      const errorMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `**Error:** ${error.message}\n\nPlease check your API key configuration in the \`.env\` file and try again.`,
      }

      setMessages((currentMessages) => [...currentMessages, errorMessage])
    } finally {
      setIsLoading(false)
      setPipelineStatus('')
    }
  }

  return (
    <main className="h-dvh overflow-hidden bg-white text-[#1d1d1f]">
      <div className="flex h-full">
        <ChatSidebar />

        <section className="relative flex min-w-0 flex-1 flex-col bg-white pt-[65px] md:pt-0">
          <header className="absolute inset-x-0 top-0 z-20 flex h-[65px] items-center justify-between border-b border-black/[0.06] bg-white/80 px-5 backdrop-blur-xl md:hidden">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1d1d1f]">
                <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h1 className="text-[17px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">Auxilio</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="grid h-8 w-8 place-items-center rounded-xl text-[#86868b] transition-colors duration-200 hover:bg-black/[0.04]">
                <svg aria-hidden="true" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#1d1d1f] via-[#424245] to-[#86868b] shadow-[0_0_0_2px_rgba(255,255,255,0.9),0_0_0_3px_rgba(0,0,0,0.06)]" />
            </div>
          </header>

          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden h-16 bg-gradient-to-b from-white to-white/0 md:block" />
            {!hasUserMessages && <EmptyChatState />}
            <ChatThread messages={messages} isLoading={isLoading} pipelineStatus={pipelineStatus} />
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} selectedModel={selectedModel} onModelChange={setSelectedModel} />
          </div>
        </section>
      </div>
    </main>
  )
}
