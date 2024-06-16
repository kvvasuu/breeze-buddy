<template>
  <div id="app-background" :class="{ 'app-background-night': !isDay }">
    <div id="app-inner">
      <Transition name="slide-fade" mode="out-in" appear>
        <WelcomeScreen
          v-if="showWelcomeScreen"
          @welcome-screen-toggle="welcomeScreenToggle"
          :isDay="isDay"
        ></WelcomeScreen>
        <MainScreen
          v-else
          :forecastDays="forecastDays"
          @isDayEmit="toggleNight"
        ></MainScreen>
      </Transition>
    </div>
  </div>
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
      isDay: false,
    };
  },
  methods: {
    welcomeScreenToggle() {
      this.showWelcomeScreen = !this.showWelcomeScreen;
    },
    toggleNight(isDay) {
      isDay ? (this.isDay = true) : (this.isDay = false);
    },
  },
  mounted() {
    if (
      !localStorage.getItem("forecastDays") ||
      localStorage.getItem("forecastDays") < 3
    ) {
      localStorage.setItem("forecastDays", 10);
    }
    this.isDay = !!localStorage.getItem("isDay");
    this.forecastDays = localStorage.getItem("forecastDays");
  },
};
</script>

<style lang="scss" scoped></style>
