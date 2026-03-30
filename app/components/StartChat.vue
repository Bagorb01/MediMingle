<template>
  <div class="instructions">
    <div>Say, "Hi!"</div>
    <span style=''>&#128075;</span>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.instructions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto 2rem;
  gap: 1rem;
}

.instructions div {
    color: #3f3d56;
    font-size: xx-large;
    font-weight: bold;
}

.instructions span {
    font-size:80px;
}

</style>