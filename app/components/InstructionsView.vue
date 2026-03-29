<template>
  <div class="instructions">
    <NumberedInstruction
      :step-number="1"
      title="Allow microphone access"
      desc="When prompted, allow your browser to use your microphone. Your audio is only used to transcribe your answers."
    />
    <NumberedInstruction
      :step-number="2"
      title="Listen, then speak your answer"
      desc="Mindy will ask you a question out loud. When she finishes, speak your answer clearly — she'll detect when you're done automatically."
    />
    <NumberedInstruction
      :step-number="3"
      title="Follow up naturally"
      desc="If your answer isn't clear, Mindy may ask a follow-up. Just respond as you would in a normal conversation."
    />
    <button @click="$emit('startInterview')">Start Interview</button>
  </div>


</template>

<script lang="ts" setup>

</script>

<style scoped>
.instructions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto 2rem;
  gap: 1rem;
}

.instructions button {
  align-self: center;
  margin-top: 2rem;
}

.instructions div {
    color: #3f3d56;
}

button {
  background-color: #6c63ff;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 1rem;
  border: none;
}
</style>
