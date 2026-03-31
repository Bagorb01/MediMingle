<template>
  <div>
    <button :disabled="props.isDisabled" @click="$emit('end-session')">
        <img src="/close.svg" alt="End call" />
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  isDisabled: { type: Boolean, required: true },
});

</script>

<style scoped>
button {
    border-radius: 50%;
    background-color: #a81212;
    border: none;
    padding: 1rem;
    margin-top: 16px;
}

button:disabled {
    background-color: #3f3d56;
    cursor: not-allowed;
}
</style>