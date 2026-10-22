---
name: chat-panel
description: Add a chat panel to a collection-template or dashboard-template Vue.js web app, with messages saved through the simulated backend. Use when the app needs a chat or assistant feature. Use after scaffolding with a base template skill.
version: 1.2
updated: 2026-09-28
---

# Chat Panel Skill

Add a chat panel to a scaffolded `collection-template` or `dashboard-template` app. On wide screens the panel sits beside the main content; on narrow screens it slides in from the side.

## Prerequisites

**Scaffold a base app first** with the `collection-template` or `dashboard-template` skill. This skill adds to that app; it doesn't replace anything.

## Conventions

- **Messages match the app's design.** Give `data/messages.json` and the functions below the same fields and endpoints as the app's message design.
- **The replies are simulated.** `sendChatMessage` just echoes the message back until a real chat backend is connected.
- **When you add a real backend,** only `sendChatMessage` changes, to call a real chat API. The component doesn't change.

## What this skill adds

- **`components/chat-component.js`** — the chat panel: message bubbles with timestamps, file attachment names, voice-to-text input, and voice chat (speech in and out) where the browser supports it.
- **`chat.css`** — styles for the panel, bubbles, and the wide/narrow layouts.
- **`data/messages.json`** — the starting conversation (a welcome message).
- **Three functions in `data.js`** — `getMessages`, `sendChatMessage`, and `clearMessages`. Messages are saved in browser storage, so they survive a reload.
- **A chat button in the navbar**, shown only on narrow screens.

## Step-by-step Modifications

### 1. Copy the new files

Copy these files from `template-files/` into the app folder, preserving the folder structure:

- `components/chat-component.js`
- `chat.css`
- `data/messages.json`

### 2. Add the chat functions to `data.js`

Add these functions to the end of `data.js`, after the existing endpoint functions. They use the `loadEntity` and `saveEntity` helpers and `APP_ID` that are already in the file.

```javascript
// ---- Chat ----

// GET /v1/messages — the conversation so far.
export async function getMessages() {
  return loadEntity('messages');
}

// POST /v1/chat — saves the user's message and returns the assistant's reply.
// The reply is simulated: it echoes the message back after a short delay.
// When you add a real backend, replace this with a call to a real chat API.
// Throws an Error when there's no text and no attachment (400).
export async function sendChatMessage(text, attachmentName = '') {
  if (!text && !attachmentName) {
    throw new Error('Type a message or attach a file.');
  }
  await new Promise((resolve) => setTimeout(resolve, 500));

  const replyText = attachmentName
    ? `Got it — you sent "${attachmentName}"${text ? ` with the message: "${text}"` : ''}. This reply is simulated.`
    : `You said: "${text}"`;

  const messages = await loadEntity('messages');
  const now = Date.now();
  const reply = {
    id: crypto.randomUUID(),
    role: 'assistant',
    text: replyText,
    attachment_name: '',
    timestamp: now,
  };
  messages.push(
    { id: crypto.randomUUID(), role: 'user', text, attachment_name: attachmentName, timestamp: now },
    reply,
  );
  saveEntity('messages', messages);
  return reply;
}

// DELETE /v1/messages — clears the conversation back to the welcome message.
export function clearMessages() {
  localStorage.removeItem(`${APP_ID}:messages`);
}
```

### 3. Modify `app.js`

**a) Add the import** alongside the other imports at the top of the file:

```javascript
import ChatComponent from './components/chat-component.js';
```

**b) Register the component** after the other `app.component(...)` calls, before `app.use(router)`:

```javascript
app.component('chat-component', ChatComponent);
```

### 4. Modify `index.html`

**a) Add the chat styles** after the existing `style.css` link:

```html
<link rel="stylesheet" href="./chat.css" />
```

**b) Add Bootstrap's JavaScript** after the other `<script>` tags in `<head>`. The slide-in panel on narrow screens needs it:

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

**c) Replace the whole `<div id="app">…</div>` element** with this layout. It holds the main content and the chat panel side by side:

```html
<div id="app" class="d-flex vh-100 overflow-hidden">
  <div class="d-flex flex-column flex-grow-1 overflow-hidden">
    <navbar-component></navbar-component>
    <main class="flex-grow-1 overflow-auto">
      <router-view></router-view>
    </main>
  </div>

  <div
    class="offcanvas offcanvas-end chat-offcanvas"
    tabindex="-1"
    id="chatOffcanvas"
    aria-label="Chat">
    <div class="offcanvas-header pb-0 chat-offcanvas-header">
      <button
        type="button"
        class="btn-close ms-auto pe-4"
        data-bs-dismiss="offcanvas"
        aria-label="Close"></button>
    </div>
    <div class="offcanvas-body p-0 d-flex flex-column overflow-hidden">
      <chat-component></chat-component>
    </div>
  </div>
</div>
```

### 5. Modify `components/navbar-component.js`

Add this button as the last item inside the `<div class="ms-auto d-flex gap-2">` block. It opens the chat on narrow screens and is hidden on wide ones:

```html
<button
  type="button"
  class="btn btn-primary btn-sm chat-toggle-btn"
  data-bs-toggle="offcanvas"
  data-bs-target="#chatOffcanvas"
  aria-controls="chatOffcanvas"
  title="Open chat">
  <i class="bi bi-chat-dots"></i>
</button>
```

## Customization Guide

### Connecting a real chat backend

Replace the body of `sendChatMessage` in `data.js` with a call to the real API, and return the assistant's reply in the same shape. `getMessages` and `clearMessages` change the same way if the backend stores the conversation.

```javascript
// POST /v1/chat
export async function sendChatMessage(text, attachmentName = '') {
  const response = await fetch('/v1/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, attachment_name: attachmentName }),
  });
  if (!response.ok) throw new Error('Could not send the message.');
  return response.json();
}
```

### Adjusting the layout

The panel switches from slide-in (narrow screens) to a pinned sidebar (wide screens) at 900px, and is 400px wide. On a dashboard, a pinned 400px panel can squeeze the widgets on laptop-width screens. To change this, edit the `@media (min-width: 900px)` blocks and the `400px` widths in `chat.css`.

### Turning off voice features

Voice features use the browser's Web Speech API, available in most modern browsers (Chrome, Edge, Safari). To remove them:

1. Remove the microphone and soundwave buttons from the template in `chat-component.js`.
2. Remove `toggleRecording`, `toggleVoiceChat`, and the related speech logic from the `setup()` function.
3. Remove the `speak()` function and the speech cleanup in `onBeforeUnmount`.

### Clearing the conversation

The trash icon in the chat header calls `clearMessages()`, which returns the conversation to the welcome message in `data/messages.json`. `resetData()` clears it too.

## File Reference

| File | Action | Purpose |
|------|--------|---------|
| `components/chat-component.js` | **Create** | Chat panel: message history, attachments, voice input, and voice chat |
| `chat.css` | **Create** | Chat styles: bubbles, slide-in panel, and wide/narrow layout |
| `data/messages.json` | **Create** | Starting conversation (welcome message) |
| `data.js` | **Modify** | Add `getMessages`, `sendChatMessage`, and `clearMessages` |
| `app.js` | **Modify** | Import and register `ChatComponent` |
| `index.html` | **Modify** | Add `chat.css`, Bootstrap's JavaScript, and the chat panel layout |
| `components/navbar-component.js` | **Modify** | Add the chat button for narrow screens |
