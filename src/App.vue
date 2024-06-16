<template>
  <div id="app-background" :class="{ 'app-background-night': !is_Day }">
    <div id="app-inner">
      <Transition name="slide-fade" mode="out-in" appear>
        <WelcomeScreen
          v-if="showWelcomeScreen"
          @welcome-screen-toggle="welcomeScreenToggle"
          :isDay="is_Day"
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
      is_Day: true,
    };
  },
  methods: {
    welcomeScreenToggle() {
      this.showWelcomeScreen = !this.showWelcomeScreen;
    },
    toggleNight(isDay) {
      isDay ? (this.is_Day = true) : (this.is_Day = false);
    },
  },
  mounted() {
    if (
      !localStorage.getItem("forecastDays") ||
      localStorage.getItem("forecastDays") < 3
    ) {
      localStorage.setItem("forecastDays", 10);
    }
    localStorage.getItem("isDay") === "0"
      ? (this.is_Day = false)
      : (this.is_Day = true);
    this.forecastDays = localStorage.getItem("forecastDays");
  },
};
</script>

<style lang="scss" scoped></style>
