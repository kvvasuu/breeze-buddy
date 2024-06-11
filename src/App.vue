<template>
  <WelcomeScreen
    v-if="showWelcomeScreen"
    @welcome-screen-toggle="welcomeScreenToggle"
  ></WelcomeScreen>
  <MainScreen v-else></MainScreen>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WelcomeScreen from "./components/WelcomeScreen.vue";
import MainScreen from "./components/MainScreen.vue";

export default defineComponent({
  name: "App",
  components: {
    WelcomeScreen,
    MainScreen,
  },
  data(): { showWelcomeScreen: boolean } {
    return {
      showWelcomeScreen: true,
    };
  },
  methods: {
    welcomeScreenToggle(): void {
      this.showWelcomeScreen = !this.showWelcomeScreen;
    },
  },
});
</script>

<style lang="scss" scoped></style>
