import { useEffect, useMemo, useRef, useState } from 'react'

const availableModels = [
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B' },
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B' },
  { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B' },
  { id: 'gemma2-9b-it', name: 'Gemma 2 9B' },
]

export const ModelSelector = ({ selectedModel, onModelChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectorRef = useRef(null)

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!selectorRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => document.removeEventListener('mousedown', closeOnOutsideClick)
  }, [])

  const label = useMemo(() => {
    return availableModels.find((model) => model.id === selectedModel)?.name ?? 'Select model'
  }, [selectedModel])

  return (
    <div ref={selectorRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex h-8 items-center gap-1.5 rounded-lg border border-transparent bg-transparent px-2.5 text-[12px] font-medium text-[#86868b] transition-colors duration-200 hover:bg-black/[0.04] hover:text-[#1d1d1f]"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title="Choose model"
      >
        <span className="max-w-[112px] truncate">{label}</span>
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-11 left-0 z-40 w-52 overflow-hidden rounded-2xl border border-black/[0.06] bg-white/95 backdrop-blur-xl p-1.5 shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
          <p className="px-3 py-2 text-[10px] font-medium uppercase tracking-[0.08em] text-[#86868b]">
            Models
          </p>
          <div className="space-y-0.5" role="listbox" aria-label="Model options">
            {availableModels.map((model) => {
              const isSelected = selectedModel === model.id

              return (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => {
                    onModelChange(model.id)
                    setIsOpen(false)
                  }}
                  className="flex h-9 w-full items-center justify-between rounded-xl px-3 text-left text-[13px] font-medium text-[#1d1d1f] transition-colors duration-150 hover:bg-black/[0.04]"
                  role="option"
                  aria-selected={isSelected}
                >
                  <span>{model.name}</span>
                  <span
                    className={`grid h-[18px] w-[18px] place-items-center rounded-full text-[10px] transition-all duration-200 ${
                      isSelected ? 'bg-[#1d1d1f] text-white scale-100' : 'bg-[#f5f5f7] text-transparent scale-90'
                    }`}
                  >
                    <svg aria-hidden="true" className="h-2.5 w-2.5" fill="none" viewBox="0 0 16 16">
                      <path
                        d="m3.5 8.2 2.7 2.7 6.3-6.8"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
