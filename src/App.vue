<template>
  <Transition name="slide-fade" mode="out-in" appear>
    <WelcomeScreen
      v-if="showWelcomeScreen"
      @welcome-screen-toggle="welcomeScreenToggle"
    ></WelcomeScreen>
    <MainScreen v-else :forecastDays="forecastDays"></MainScreen>
  </Transition>
</template>

<script>
import WelcomeScreen from "./components/WelcomeScreen.vue";
import MainScreen from "./components/MainScreen/MainScreen.vue";

export default {
  name: "App",
  components: {
    WelcomeScreen,
    MainScreen,
  },
  data() {
    return {
      showWelcomeScreen: true,
      forecastDays: 3,
    };
  },
  methods: {
    welcomeScreenToggle() {
      this.showWelcomeScreen = !this.showWelcomeScreen;
    },
  },
  mounted() {
    if (
      !localStorage.getItem("forecastDays") ||
      localStorage.getItem("forecastDays") < 3
    ) {
      localStorage.setItem("forecastDays", 3);
    }
    this.forecastDays = localStorage.getItem("forecastDays");
  },
};
</script>

<style lang="scss" scoped></style>
