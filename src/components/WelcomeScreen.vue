<template>
  <div class="welcome-container">
    <div class="logo-container">
      <div class="logo"></div>
      <div class="title"></div>
    </div>
    <button class="button-1" @click="welcomeScreenHide">Get started!</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["welcome-screen-toggle"],
  methods: {
    welcomeScreenHide(): void {
      this.$emit("welcome-screen-toggle");
    },
  },
});
</script>

<style lang="scss" scoped>
.welcome-container {
  min-width: 20rem;
  height: 40rem;
  background: transparent;
}
</style>
