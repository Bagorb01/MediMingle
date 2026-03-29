<template>
  <div class="numbered-instruction">
    <div class="step-number">{{ props.stepNumber }}</div>
    <div class="content">
      <h3 class="title">{{ props.title }}</h3>
      <p class="description">{{ props.desc }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  stepNumber: { type: Number, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
});
</script>

<style scoped>
.numbered-instruction {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.numbered-instruction h3 {
  margin: 0;
  font-weight: bold;
}

.step-number {
  font-weight: bold;
  height: 12px;
  width: 12px;
  padding: 12px;
  border-radius: 50%;
  border: 2px solid #6c63ff;
  background-color: #fff;

  /* center number */
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  width: 80%;
}
</style>
