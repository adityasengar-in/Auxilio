export const ChatSidebar = () => {
  return (
    <aside className="hidden h-full w-[280px] shrink-0 flex-col border-r border-black/[0.06] bg-[#fafafa]/80 backdrop-blur-xl px-4 py-5 text-[#1d1d1f] md:flex">
      <div className="mb-8 flex items-center gap-2.5 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1d1d1f]">
          <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <h1 className="text-[17px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">Auxilio</h1>
      </div>

      <button className="mb-6 flex h-10 w-full items-center gap-2.5 rounded-xl border border-black/[0.06] bg-white/80 px-3.5 text-left text-[13px] font-medium text-[#1d1d1f] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-200 hover:bg-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] active:scale-[0.98]">
        <svg aria-hidden="true" className="h-4 w-4 text-[#86868b]" fill="none" viewBox="0 0 24 24">
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
        New chat
      </button>

      <div className="flex-1 overflow-y-auto pr-1 chat-scroll">
        <p className="mb-2.5 px-2.5 text-[11px] font-medium uppercase tracking-[0.06em] text-[#86868b]">Recents</p>
      </div>

      <div className="mt-auto flex items-center gap-3 rounded-xl px-2.5 py-2.5 transition-colors duration-200 hover:bg-black/[0.04]">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#1d1d1f] via-[#424245] to-[#86868b] shadow-[0_0_0_2px_rgba(255,255,255,0.9),0_0_0_3px_rgba(0,0,0,0.08)]" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-medium text-[#1d1d1f]">Aditya Sengar</p>
        </div>
      </div>
    </aside>
  )
}
