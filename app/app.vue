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
      <div class="chat-area">
        <InstructionsView v-if="!isConnected" @startInterview="connect" />
        <template v-for="item in history" :key="item.itemId">
            <ChatBubble v-if="item.type === 'message' && item.status === 'completed'"
              :is-patient="item.role === 'user'"
              :message="
                item.content[0].transcript ? item.content[0].transcript : ''
              "
            />
            <ChatBubble v-else-if="item.type === 'message' && item.status === 'in_progress'"
              :is-patient="item.role === 'user'"
              :is-loading="true"
              message=""
            />
        </template>
      </div>
      <RecordButton
        @click="isRecording = !isRecording"
        :is-recording="isRecording"
        :is-disabled="!isConnected"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVoiceSession } from "./composables/useVoiceSession";

const isRecording = ref(false);
const { history, isConnected, connect } = useVoiceSession();
</script>

<style scoped>
.qa-container {
  height: 100vh;
  background: linear-gradient(
    90deg,
    rgb(168, 167, 243) 0%,
    /* rgba(93, 87, 199, 0.48) 0%, */ rgba(250, 250, 250, 1) 100%
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

.form-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
}

.chat-area {
  height: 625px;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 16px;
  background:
    linear-gradient(white, white) padding-box,
    linear-gradient(135deg, #a78bfa, #7c3aed) border-box;
  border: 2px solid transparent;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
</style>
