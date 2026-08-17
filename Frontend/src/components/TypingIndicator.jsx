export const TypingIndicator = ({ status }) => {
  return (
    <div className="flex max-w-[85%] gap-3.5">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f5f7]">
        <svg className="h-4 w-4 text-[#1d1d1f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      <div className="flex h-8 items-center gap-2">
        <div className="flex items-center gap-1">
          <span className="h-[5px] w-[5px] animate-shimmer rounded-full bg-[#86868b] [animation-delay:0ms]" />
          <span className="h-[5px] w-[5px] animate-shimmer rounded-full bg-[#86868b] [animation-delay:200ms]" />
          <span className="h-[5px] w-[5px] animate-shimmer rounded-full bg-[#86868b] [animation-delay:400ms]" />
        </div>
        {status && (
          <span className="text-[13px] text-[#86868b]">{status}</span>
        )}
      </div>
    </div>
  )
}
