<template>
  <div class="welcome-container">
    <div class="logo-container">
      <img
        class="logo"
        src="../../favicon.png"
        alt="Breeze Buddy"
        draggable="false"
      />
      <div class="title">Breeze Buddy</div>
    </div>
    <button class="button-1" @click="welcomeScreenHide">Get start!</button>
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
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  perspective: 1000px;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo {
    height: 16rem;
    filter: drop-shadow(0.2rem 1rem 1rem rgba(0, 0, 0, 0.5));
    margin: 2rem;
    transition: all 0.6s ease;
  }
  .logo:hover {
    transform: rotate(3deg);
  }
  .title {
    margin: 3rem 0 1rem 0;
    font-size: 2.6rem;
    font-weight: bold;
    font-family: "Helvetica Black";
  }
}

.button-1 {
  font-size: 1.6rem;
  font-weight: bold;
  font-family: "Helvetica Black";
  color: rgb(36, 36, 36);
  letter-spacing: 1px;
  padding: 1rem 3rem 1rem 3rem;
  border-radius: 10rem;
  border: none;
  background: rgb(255, 210, 0);
  margin: 2rem;
  box-shadow: 0.2rem 0.3rem 0.5rem rgba(0, 0, 0, 0.3);
  text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}
.button-1:hover {
  transform: translateY(-0.1rem);
  text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.3);
}
</style>
