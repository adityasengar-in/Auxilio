const API_BASE = import.meta.env.VITE_LLM_API_BASE || 'https://api.x.ai'
const API_KEY = import.meta.env.VITE_LLM_API_KEY || 'GROK_API'
const MODEL = import.meta.env.VITE_LLM_MODEL || 'lama-3.3-70b-versatile'

const isDev = import.meta.env.DEV
const resolvedBase = isDev ? '/llm-api/v1' : API_BASE

if (!API_KEY) {
  console.warn('VITE_LLM_API_KEY is not set. LLM calls will fail.')
}

async function callLLM(systemPrompt, userContent, modelOverride) {
  const url = `${resolvedBase}/chat/completions`
  const body = {
    model: modelOverride || MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userContent },
    ],
    temperature: 0.7,
    max_tokens: 4096,
  }

  let response
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(body),
    })
  } catch (fetchError) {
    console.error('Network error calling LLM:', { url, error: fetchError.message })
    throw new Error(`Network error: ${fetchError.message}. Check that the API base URL is correct and the server is reachable.`, { cause: fetchError })
  }

  if (!response.ok) {
    const error = await response.text()
    console.error('LLM API error:', { status: response.status, url, error })
    throw new Error(`LLM API error (${response.status}): ${error}`)
  }

  const data = await response.json()
  return data.choices[0].message.content.trim()
}

const PASS_1_SYSTEM = `You are a professional prompt engineer. Take the following user query and rewrite it into a clear, well-structured, effective prompt that will get the best possible response from an LLM. Return only the rewritten prompt, with no preamble, explanation, or formatting around it.`

const PASS_3_SYSTEM = `You are a technical writer who specializes in making complex content accessible. Rewrite the following response to remove all AI/technical jargon and unnecessary complexity. Keep it accurate but make it clear, structured (use headings and bullet points where helpful), and easy for a general audience to understand. Do not add any meta-commentary like "Here is the rewritten version..." — just return the clean, final content directly.`

export async function runPipeline(userQuery, onStatusChange, model) {
  if (!API_KEY) {
    throw new Error('API key not configured. Set VITE_LLM_API_KEY in your .env file.')
  }

  onStatusChange?.('Thinking...')

  const refinedPrompt = await callLLM(PASS_1_SYSTEM, userQuery, model)

  onStatusChange?.('Generating response...')

  const rawResponse = await callLLM('You are a helpful, knowledgeable assistant. Answer the following prompt thoroughly and accurately.', refinedPrompt, model)

  onStatusChange?.('Polishing...')

  const finalResponse = await callLLM(PASS_3_SYSTEM, rawResponse, model)

  return finalResponse
}
