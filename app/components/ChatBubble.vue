<template>
  <div :class="[props.isPatient ? 'bubble-outgoing' : 'bubble-incoming']">
    <div v-if="props.isLoading" class="loading-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div v-else>
      <div class="sender-name">{{ props.isPatient ? 'You' : 'Mindy' }}</div>
      <div class="message">{{ props.message }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isLoading: { type: Boolean, required: false, default: false },
  isPatient: { type: Boolean, required: false, default: false },
  message: { type: String, required: false, default: '' },
});
</script>

<style lang="css" scoped>
.bubble-incoming {
  background: #f0f0f0;
  border-radius: 16px;
  max-width: 60%;
  padding: 1rem;
  margin: 1rem;
}

.bubble-outgoing {
  background: #a78bfaa2;
  border-radius: 16px;
  align-self: flex-end;
  max-width: 60%;
  padding: 1rem;
  margin: 1rem;
}

.message {
  color: #3f3d56;
  line-height: 1.5;
}

.sender-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: #3f3d56;
  margin-bottom: 0.5rem;
}

/* assets/app.css */
.loading-dots {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 0;
}

.loading-dots span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #3f3d56;
  opacity: 0.4;
  display: inline-block;
  animation: dot-bounce 1.2s ease-in-out infinite;
}

.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes dot-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40% { transform: translateY(-6px); opacity: 1; }
}
</style>
