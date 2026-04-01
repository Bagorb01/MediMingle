<template>
  <div class="chat">
    <div v-for="item in history" :key="item.itemId">
      <ChatBubble
        v-if="item.type === 'message' && item.status === 'completed'"
        :is-patient="item.role === 'user'"
        :message="item.content[0].transcript ? item.content[0].transcript : ''"
      />
      <ChatBubble
        v-else-if="item.type === 'message' && item.status === 'in_progress'"
        :is-patient="item.role === 'user'"
        :is-loading="true"
        message=""
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  history: { type: Array, required: true },
});
</script>

<style scoped>
.chat {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
