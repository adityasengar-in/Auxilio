# AI Router

A modern, ChatGPT-style AI chatbot that doesn't just forward your message to an LLM — it refines it, answers it, and then cleans it up before you ever see it.

## Overview

AI Router wraps a single LLM API call in a **3-pass pipeline** so responses come back structured, context-aware, and free of unnecessary AI jargon. The UI is built to feel like a modern, immersive chat product — clean spacing, rounded corners, and a neon-glow dark aesthetic — not a bare-bones API wrapper.

Down the line, the model-selector in the input bar (currently a UI placeholder) will let users choose how many connected models assist in generating a response.

## How It Works

Every message you send goes through three sequential LLM calls before you see a reply:

1. **Prompt Engineering Pass** — Your raw query is rewritten into a clear, well-structured, effective prompt, as if a professional prompt engineer wrote it.
2. **Response Pass** — That refined prompt is sent back to the LLM to generate the actual answer.
3. **Jargon Removal Pass** — The raw answer is sent through one more time to strip AI/technical jargon and reformat it into clean, readable, structured content (headings, bullet points, etc. where useful).

```
User query
   -> Pass 1: Prompt Engineering  -> refined prompt
   -> Pass 2: Response Generation -> raw response
   -> Pass 3: Jargon Removal      -> final response shown to user
```

Only the final, Pass 3 output is shown in the chat — the intermediate steps happen invisibly in the background.

## Features

- **Modern, responsive chat UI** — inspired by ChatGPT's layout, works cleanly on desktop and mobile.
- **3-pass response pipeline** for structured, jargon-free answers.
- **Model-selector control** in the input bar (UI in place; multi-model routing logic coming later).
- **Single LLM API integration** for now, built so the provider can be swapped or extended to multiple models later.

## Tech Stack

- React + Vite
- Tailwind CSS
- LLM API (single provider for now)

## Getting Started

```bash
# clone the repo
git clone <repo-url>
cd ai-router

# install dependencies
npm install

# add your LLM API key
cp .env.example .env
# then fill in your API key in .env

# run the dev server
npm run dev
```

## Roadmap

- [ ] Wire up the model-selector to support multiple connected models
- [ ] Optional debug panel to inspect intermediate pipeline outputs
- [ ] Chat history persistence
- [ ] Auth

## Status

Early-stage / actively in development.
