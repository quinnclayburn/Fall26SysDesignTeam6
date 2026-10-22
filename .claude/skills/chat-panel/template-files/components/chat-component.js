// The chat panel. Messages are read and saved through data.js, like all
// other data in the app. The assistant's reply comes from sendChatMessage()
// in data.js, which is a simulated echo until a real chat backend exists.
import { getMessages, sendChatMessage, clearMessages } from '../data.js';

export default {
  name: 'chat-component',
  setup() {
    const messages = Vue.reactive([]);
    const isSending = Vue.ref(false);
    const draft = Vue.ref('');
    const pendingAttachment = Vue.ref(null);
    const isRecording = Vue.ref(false);
    const isVoiceChatActive = Vue.ref(false);
    const speechSupported = Boolean(
      window.SpeechRecognition || window.webkitSpeechRecognition,
    );
    const messagesListRef = Vue.ref(null);
    const fileInputRef = Vue.ref(null);

    let recognizer = null;

    const scrollToBottom = () => {
      Vue.nextTick(() => {
        const el = messagesListRef.value;
        if (el) {
          el.scrollTop = el.scrollHeight;
        }
      });
    };

    // Show the saved conversation from data.js.
    const refreshMessages = async () => {
      try {
        const saved = await getMessages();
        messages.splice(0, messages.length, ...saved);
      } catch (error) {
        messages.splice(0, messages.length, {
          id: 'load-error',
          role: 'assistant',
          text: 'Sorry, the conversation could not be loaded.',
          attachment_name: '',
          timestamp: null,
        });
      }
      scrollToBottom();
    };

    // Show a message on screen right away, before data.js has saved it.
    const showMessage = (role, text, attachmentName = '') => {
      messages.push({
        id: `pending-${Date.now()}`,
        role,
        text,
        attachment_name: attachmentName,
        timestamp: Date.now(),
      });
      scrollToBottom();
    };

    const speak = (text) => {
      if (!isVoiceChatActive.value || !('speechSynthesis' in window)) {
        return;
      }
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    };

    const sendMessage = async () => {
      const text = draft.value.trim();
      const attachmentName = pendingAttachment.value
        ? pendingAttachment.value.name
        : '';
      if ((!text && !attachmentName) || isSending.value) {
        return;
      }

      showMessage('user', text, attachmentName);
      draft.value = '';
      pendingAttachment.value = null;
      isSending.value = true;

      try {
        const reply = await sendChatMessage(text, attachmentName);
        await refreshMessages();
        speak(reply.text);
      } catch (error) {
        showMessage('assistant', 'Sorry, there was a problem sending your message.');
      } finally {
        isSending.value = false;
      }
    };

    const triggerAttachment = () => {
      if (fileInputRef.value) {
        fileInputRef.value.click();
      }
    };

    const onFileSelected = (event) => {
      const file = event.target.files && event.target.files[0];
      if (file) {
        pendingAttachment.value = { name: file.name };
      }
      event.target.value = '';
    };

    const removeAttachment = () => {
      pendingAttachment.value = null;
    };

    const ensureRecognizer = () => {
      if (recognizer || !speechSupported) {
        return recognizer;
      }

      const SpeechRecognitionCtor =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognizer = new SpeechRecognitionCtor();
      recognizer.continuous = false;
      recognizer.interimResults = false;
      recognizer.lang = 'en-US';

      recognizer.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join(' ')
          .trim();

        if (!transcript) {
          return;
        }

        if (isVoiceChatActive.value) {
          draft.value = transcript;
          sendMessage();
        } else {
          draft.value = draft.value
            ? `${draft.value} ${transcript}`
            : transcript;
        }
      };

      recognizer.onend = () => {
        isRecording.value = false;
        if (isVoiceChatActive.value) {
          try {
            recognizer.start();
            isRecording.value = true;
          } catch (error) {
            // Recognition may already be running; ignore.
          }
        }
      };

      recognizer.onerror = () => {
        isRecording.value = false;
      };

      return recognizer;
    };

    const toggleRecording = () => {
      if (!speechSupported || isVoiceChatActive.value) {
        return;
      }

      const instance = ensureRecognizer();
      if (!instance) {
        return;
      }

      if (isRecording.value) {
        instance.stop();
        isRecording.value = false;
      } else {
        try {
          instance.start();
          isRecording.value = true;
        } catch (error) {
          isRecording.value = false;
        }
      }
    };

    const toggleVoiceChat = () => {
      if (!speechSupported) {
        return;
      }

      const instance = ensureRecognizer();
      if (!instance) {
        return;
      }

      if (isVoiceChatActive.value) {
        isVoiceChatActive.value = false;
        isRecording.value = false;
        instance.stop();
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      } else {
        isVoiceChatActive.value = true;
        try {
          instance.start();
          isRecording.value = true;
        } catch (error) {
          isRecording.value = false;
        }
      }
    };

    const clearChat = async () => {
      clearMessages();
      await refreshMessages();
    };

    Vue.onMounted(() => {
      refreshMessages();
    });

    Vue.onBeforeUnmount(() => {
      if (recognizer) {
        recognizer.onend = null;
        recognizer.stop();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    });

    return {
      messages,
      isSending,
      draft,
      pendingAttachment,
      isRecording,
      isVoiceChatActive,
      speechSupported,
      messagesListRef,
      fileInputRef,
      sendMessage,
      triggerAttachment,
      onFileSelected,
      removeAttachment,
      toggleRecording,
      toggleVoiceChat,
      clearChat,
    };
  },
  template: /* html */ `
    <div class="chat-panel border-start">
      <div class="chat-header bg-white border-bottom px-3 py-2 d-flex align-items-center justify-content-between">
        <span class="fw-semibold"><i class="bi bi-chat-dots me-2"></i>Chat</span>
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          title="Clear conversation"
          @click="clearChat">
          <i class="bi bi-trash"></i>
        </button>
      </div>

      <div class="chat-messages px-3 py-2" ref="messagesListRef">
        <div
          v-for="message in messages"
          :key="message.id"
          class="chat-bubble-row"
          :class="message.role === 'user' ? 'justify-content-end' : 'justify-content-start'">
          <div class="chat-bubble" :class="message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'">
            <div v-if="message.attachment_name" class="chat-attachment-chip mb-1">
              <i class="bi bi-paperclip me-1"></i>{{ message.attachment_name }}
            </div>
            <div v-if="message.text">{{ message.text }}</div>
            <div v-if="message.timestamp" class="chat-timestamp">
              {{ new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
            </div>
          </div>
        </div>
      </div>

      <div class="chat-footer border-top bg-white px-3 py-2">
        <div v-if="pendingAttachment" class="chat-attachment-chip mb-2">
          <i class="bi bi-paperclip me-1"></i>{{ pendingAttachment.name }}
          <button type="button" class="btn btn-sm btn-link p-0 ms-2 text-danger" @click="removeAttachment">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <div v-if="isSending" class="small text-muted mb-2" role="status">Waiting for a reply…</div>

        <div v-if="isVoiceChatActive" class="small text-primary mb-2">
          <i class="bi bi-soundwave me-1"></i>Voice chat active — listening…
        </div>

        <form class="d-flex align-items-center gap-2" @submit.prevent="sendMessage">
          <input ref="fileInputRef" type="file" class="d-none" @change="onFileSelected" />

          <button
            type="button"
            class="btn btn-outline-secondary btn-sm chat-icon-btn"
            title="Add attachment"
            @click="triggerAttachment">
            <i class="bi bi-paperclip"></i>
          </button>

          <input
            v-model="draft"
            type="text"
            class="form-control form-control-sm"
            placeholder="Type a message…"
            aria-label="Chat message" />

          <button
            type="button"
            class="btn btn-sm chat-icon-btn"
            :class="isRecording && !isVoiceChatActive ? 'btn-primary' : 'btn-outline-secondary'"
            :disabled="!speechSupported || isVoiceChatActive"
            :title="speechSupported ? 'Voice-to-text input' : 'Voice input not supported in this browser'"
            @click="toggleRecording">
            <i class="bi bi-mic"></i>
          </button>

          <button
            type="button"
            class="btn btn-sm chat-icon-btn"
            :class="isVoiceChatActive ? 'btn-primary' : 'btn-outline-secondary'"
            :disabled="!speechSupported"
            :title="speechSupported ? 'Start voice chat' : 'Voice chat not supported in this browser'"
            @click="toggleVoiceChat">
            <i class="bi bi-soundwave"></i>
          </button>

          <button
            type="submit"
            class="btn btn-primary btn-sm chat-icon-btn"
            title="Send message"
            :disabled="isSending || (!draft.trim() && !pendingAttachment)">
            <i class="bi bi-send"></i>
          </button>
        </form>
      </div>
    </div>
  `,
};
