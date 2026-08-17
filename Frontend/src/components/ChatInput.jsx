import { useEffect, useRef, useState } from 'react'
import { ModelSelector } from './ModelSelector'

export const ChatInput = ({ onSendMessage, isLoading, selectedModel, onModelChange }) => {
  const [message, setMessage] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const styles = window.getComputedStyle(textarea)
    const lineHeight = Number.parseFloat(styles.lineHeight)
    const paddingTop = Number.parseFloat(styles.paddingTop)
    const paddingBottom = Number.parseFloat(styles.paddingBottom)
    const maxHeight = lineHeight * 8 + paddingTop + paddingBottom

    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden'
  }, [message])

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextMessage = message.trim()
    if (!nextMessage || isLoading) return

    onSendMessage(nextMessage)
    setMessage('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(event)
    }
  }

  const focusComposer = (event) => {
    if (event.target.closest('button')) return
    textareaRef.current?.focus()
  }

  return (
    <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-white via-white/95 to-white/0 px-4 pb-4 pt-12 md:px-8 md:pb-6">
      <div className="mx-auto w-full max-w-[700px]">
        <form
          onSubmit={handleSubmit}
          onClick={focusComposer}
          className="rounded-2xl border border-black/[0.06] bg-white/90 backdrop-blur-xl p-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300 focus-within:shadow-[0_4px_16px_rgba(0,0,0,0.06),0_12px_40px_rgba(0,0,0,0.08)] focus-within:border-black/[0.1]"
        >
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Message Auxilio..."
            className="chat-scroll block min-h-[44px] w-full resize-none bg-transparent px-3 py-3 text-[15px] leading-[1.6] text-[#1d1d1f] outline-none placeholder:text-[#86868b]"
          />

          <div className="flex h-10 items-center justify-between gap-3 pl-1 pr-1">
            <ModelSelector selectedModel={selectedModel} onModelChange={onModelChange} />
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="grid h-8 w-8 place-items-center rounded-full bg-[#1d1d1f] text-white transition-all duration-200 hover:scale-105 hover:bg-[#1d1d1f]/90 active:scale-95 disabled:cursor-not-allowed disabled:bg-[#d1d5db]/50 disabled:hover:scale-100"
              aria-label="Send message"
              title="Send message"
            >
              {isLoading ? (
                <span className="text-[11px] font-medium">...</span>
              ) : (
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 19V5m0 0-6 6m6-6 6 6"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </form>
        <p className="mt-2.5 text-center text-[11px] text-[#86868b]">
          Auxilio can make mistakes. Consider verifying important information.
        </p>
      </div>
    </div>
  )
}
