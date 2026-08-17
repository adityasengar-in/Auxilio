const formatInline = (text) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>
    }

    return part
  })
}

export const MarkdownText = ({ content, isUser = false, compact = false }) => {
  const lines = content.split('\n')
  const elements = []
  let listItems = []

  const flushList = () => {
    if (!listItems.length) return

    elements.push(
      <ul key={`list-${elements.length}`} className="my-3 list-disc space-y-1 pl-5">
        {listItems.map((item, index) => (
          <li key={`${item}-${index}`}>{formatInline(item)}</li>
        ))}
      </ul>,
    )
    listItems = []
  }

  lines.forEach((line, index) => {
    const trimmed = line.trim()

    if (!trimmed) {
      flushList()
      return
    }

    if (trimmed.startsWith('- ')) {
      listItems.push(trimmed.slice(2))
      return
    }

    flushList()

    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={`heading-${index}`} className="mb-2 mt-1 text-[15px] font-semibold tracking-[-0.01em] text-[#1d1d1f]">
          {formatInline(trimmed.slice(4))}
        </h3>,
      )
      return
    }

    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={`heading-${index}`} className="mb-2 mt-1 text-[17px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
          {formatInline(trimmed.slice(3))}
        </h2>,
      )
      return
    }

    elements.push(
      <p key={`paragraph-${index}`} className="my-1.5 leading-[1.65]">
        {formatInline(trimmed)}
      </p>,
    )
  })

  flushList()

  return (
    <div
      className={`text-[15px] ${
        compact ? 'leading-[1.6]' : 'leading-[1.65]'
      } ${
        isUser ? 'text-white/90' : 'text-[#1d1d1f]'
      } [&_strong]:font-semibold [&_strong]:tracking-[-0.01em]`}
    >
      {elements}
    </div>
  )
}
