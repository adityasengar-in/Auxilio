export const EmptyChatState = () => {
  return (
    <div className="pointer-events-none absolute inset-x-4 top-[30%] z-0 mx-auto max-w-[700px] -translate-y-1/2">
      <div className="text-center animate-fade-in">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1d1d1f] shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
          <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <h1 className="text-[36px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#1d1d1f]">
          How can I help you today?
        </h1>
        <p className="mt-3 text-[15px] text-[#86868b] leading-relaxed">
          Ask me anything. I'm here to help.
        </p>
      </div>
    </div>
  )
}
