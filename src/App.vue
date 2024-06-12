<template>
  <Transition name="slide-fade" mode="out-in" appear>
    <WelcomeScreen
      v-if="showWelcomeScreen"
      @welcome-screen-toggle="welcomeScreenToggle"
    ></WelcomeScreen>
    <MainScreen v-else></MainScreen>
  </Transition>
</template>

<script>
import WelcomeScreen from "./components/WelcomeScreen.vue";
import MainScreen from "./components/MainScreen.vue";

export default {
  name: "App",
  components: {
    WelcomeScreen,
    MainScreen,
  },
  data() {
    return {
      showWelcomeScreen: true,
    };
  },
  methods: {
    welcomeScreenToggle() {
      this.showWelcomeScreen = !this.showWelcomeScreen;
    },
  },
};
</script>

<style lang="scss" scoped></style>
