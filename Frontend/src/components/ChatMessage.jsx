import { MarkdownText } from './MarkdownText'

export const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user'

  return (
    <article className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      {isUser ? (
        <div className="max-w-[72%] rounded-[18px] rounded-br-md bg-[#1d1d1f] px-5 py-3 text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] max-sm:max-w-[88%]">
          <MarkdownText content={message.content} isUser={true} compact />
        </div>
      ) : (
        <div className="flex max-w-[85%] gap-3.5 max-sm:max-w-full">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f5f7] text-[14px]">
            <svg className="h-4 w-4 text-[#1d1d1f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="min-w-0 flex-1 px-1 py-0.5">
            <MarkdownText content={message.content} />
          </div>
        </div>
      )}
    </article>
  )
}
