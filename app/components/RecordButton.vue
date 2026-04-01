<template>
  <div>
    <button :disabled="props.isDisabled" @click="$emit('toggleMic')">
        <img v-if="props.isDisabled" src="/mic_off_disabled.svg" alt="Microphone disabled" />
        <img v-else :src="props.isMicMuted ? '/mic_off.svg' : '/mic_on.svg'" alt="Toggle microphone" />
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  isMicMuted: { type: Boolean, required: true },
  isDisabled: { type: Boolean, required: true },
});

</script>

<style scoped>
button {
    border-radius: 50%;
    background-color: #6c63ff;
    border: none;
    padding: 1rem;
    margin-top: 16px;
}

button:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
}
</style>