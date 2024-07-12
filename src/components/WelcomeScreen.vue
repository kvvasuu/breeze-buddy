<template>
  <div class="welcome-container">
    <div class="logo-container">
      <a href="https://github.com/kvvasuu/breeze-buddy" target="_blank"
        ><img
          class="logo"
          :src="toggleLogo"
          alt="Breeze Buddy"
          draggable="false"
      /></a>

      <div class="title" :style="{ color: toggleTitle }">Breeze Buddy</div>
    </div>
    <div>
      <LanguageSelect></LanguageSelect>
      <button class="button-1" @click="welcomeScreenHide">
        {{ t.getStarted }}
      </button>
    </div>
  </div>
</template>

<script>
import logo from "../assets/favicon.png";
import logoDark from "../assets/favicon-dark.png";
import LanguageSelect from "./LanguageSelect.vue";

export default {
  components: {
    LanguageSelect,
  },
  emits: ["welcome-screen-toggle"],
  inject: ["t"],
  methods: {
    welcomeScreenHide() {
      this.$emit("welcome-screen-toggle");
    },
  },
  computed: {
    toggleLogo() {
      return this.$store.state.isDay ? logo : logoDark;
    },
    toggleTitle() {
      return this.$store.state.isDay ? "rgb(51, 51, 51)" : "rgb(240, 240, 240)";
    },
  },
};
</script>

<style lang="scss" scoped>
$font-color-second: rgb(36, 36, 36);

.welcome-container {
  color: $font-color-second;
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
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  appearance: none;
  -webkit-appearance: none;
  .logo {
    height: 16rem;
    filter: drop-shadow(0.2rem 0.6rem 0.6rem rgba(0, 0, 0, 0.3));
    margin: 2rem;
    transition: scale 0.4s ease;
    &:hover {
      scale: 1.04;
    }
  }
  .title {
    margin: 4rem 0 0 0;
    font-size: 2.5rem;
    font-weight: bold;
    font-family: "Helvetica Bold";
    text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.2);
    color: rgb(51, 51, 51);
  }
}

.button-1 {
  font-size: 1.6rem;
  color: rgb(51, 51, 51);
  font-weight: bold;
  font-family: "Helvetica Bold";
  letter-spacing: 1px;
  padding: 1rem 3rem 1rem 3rem;
  border-radius: 10rem;
  border: none;
  background: rgb(255, 210, 0);
  margin: 2rem;
  box-shadow: 0.2rem 0.3rem 0.5rem rgba(0, 0, 0, 0.3);
  text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  -webkit-appearance: none;
  &:hover {
    transform: translateY(-0.1rem);
    text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.3);
  }
}

//Transitions

@keyframes tilt {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(3deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
