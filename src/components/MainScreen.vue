<template>
  <div class="main-container"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["welcome-screen-toggle"],
});
</script>

<style lang="scss" scoped>
.main-container {
  min-width: 20rem;
  height: 40rem;
  background-image: linear-gradient(
    160deg,
    rgba(0, 116, 184, 0.3) 0%,
    rgba(107, 173, 166, 0.3) 100%
  );
  border-radius: 2rem;
  backdrop-filter: blur(30px);
  box-shadow: 0.2rem 1rem 2rem rgba(0, 0, 0, 0.3);
}
</style>
