<template>
  <div class="qa-container">
    <div class="image-section">
      <div class="text-area">
        <h1>MediMingle</h1>
        <div class="tagline">
          Turning patient input into appointment-ready insights.
        </div>
      </div>
      <div class="image-area">
        <img src="/insights.png" alt="Virtual chat" />
      </div>
    </div>

    <div class="form-section">
      <USwitch v-model="useOpenAI" class="switch" label="OpenAI" color="neutral" te/>
      <div class="chat-area">
        <InstructionsView v-if="!interviewStarted" @startInterview="startInterview" />
        <ChatBubble
          v-if="interviewStarted && !isLoading"
          v-for="value in messages"
          :key="value.message"
          :is-patient="value.isPatient"
          :message="value.message"
        />
        <ChatBubble
          v-if="interviewStarted && isLoading"
          :is-loading="isLoading"
        />
      </div>

      <RecordButton
        @click="isRecording = !isRecording"
        :is-recording="isRecording"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { sendMessage, synthesize } from './services/cloudflareServices';

interface ChatMessage {
  isPatient?: boolean;
  message?: string;
  isLoading?: boolean;
}

const interviewStarted = ref(false);
const isLoading = ref(true);
const messages = ref<ChatMessage[]>([]);
const isRecording = ref(false);
const useOpenAI = ref(false)

async function startInterview() {
  interviewStarted.value = true;
  const message = await sendMessage(messages.value);

  messages.value.push({
    isPatient: false,
    message: message,
    isLoading: false,
  });

  await synthesize(message);
}
</script>

<style scoped>
.qa-container {
  height: 100vh;
  background: linear-gradient(
    90deg,
    rgb(168, 167, 243) 0%,
    /* rgba(93, 87, 199, 0.48) 0%, */
    rgba(250, 250, 250, 1) 100%
  );
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8rem;
}

/* ---------------------- ----- */

.text-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  margin: 0;
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: #3f3d56;
}

.tagline {
  margin: 1rem auto;
  font-size: large;
  color: #3f3d56;
}

.image-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  width: 30%;
}

.image-area {
  width: 100%;
}

.image-area img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ---------------------- ----- */

.switch {
  align-self: flex-end;
  margin-bottom: 1rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
}

.chat-area {
  min-height: 625px;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow-y: scroll;
  background: white;
  border-radius: 16px;
  background:
    linear-gradient(white, white) padding-box,
    linear-gradient(135deg, #a78bfa, #7c3aed) border-box;
  border: 2px solid transparent;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
</style>
