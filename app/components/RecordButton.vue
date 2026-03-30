<template>
  <div>
    <button :disabled="props.isDisabled" @click="startRecording">
        <img :src="props.isRecording ? '/mic_on.svg' : '/mic_off.svg'" alt="Record" />
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  isRecording: { type: Boolean, required: true },
  isDisabled: { type: Boolean, required: true },
});

const startRecording = async () => {
//   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//   }
};
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
    background-color: #3f3d56;
    cursor: not-allowed;
}
</style>