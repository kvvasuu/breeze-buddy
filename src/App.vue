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
          @showSettings="toggleSettings"
        ></MainScreen>
      </Transition>
      <Transition name="slide-fade-fast" mode="out-in">
        <Settings
          v-if="showSettings"
          @toggle-settings="toggleSettings"
        ></Settings>
      </Transition>
    </div>
  </div>
</template>

<script>
import WelcomeScreen from "./components/WelcomeScreen.vue";
import MainScreen from "./components/MainScreen/MainScreen.vue";
import Settings from "./components/MainScreen/Settings.vue";
import { computed } from "vue";

export default {
  name: "App",
  components: {
    WelcomeScreen,
    MainScreen,
    Settings,
  },
  provide() {
    return {
      gradient: computed(() => this.componentsGradient),
      showSettings: computed(() => this.showSettings),
    };
  },
  data() {
    return {
      showWelcomeScreen: true,
      showSettings: false,
      forecastDays: 3,
      is_Day: true,
    };
  },
  methods: {
    welcomeScreenToggle() {
      this.showWelcomeScreen = !this.showWelcomeScreen;
      localStorage.setItem("firstVisit", "0");
    },
    toggleNight(isDay) {
      isDay ? (this.is_Day = true) : (this.is_Day = false);
    },
    toggleSettings() {
      if (window.scrollY > 100) {
        document.body.classList.add("scroll-disable");
        window.addEventListener("scroll", this.toggleSettingsScroll);
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }, 100);
      } else {
        this.showSettings = !this.showSettings;
        document.body.classList.remove("scroll-disable");
      }
    },
    toggleSettingsScroll() {
      if (window.scrollY <= 100) {
        this.showSettings = true;
        window.removeEventListener("scroll", this.toggleSettingsScroll);
      }
      setTimeout(() => {
        document.body.classList.remove("scroll-disable");
      }, 1000);
    },
  },
  watch: {
    is_Day() {
      this.is_Day
        ? (this.componentsGradient =
            "linear-gradient(30deg, rgba(0, 116, 184, 0.3) 0%, rgba(107, 173, 166, 0.3) 100%)")
        : (this.componentsGradient =
            "linear-gradient( 30deg, rgba(0, 60, 95, 0.5) 0%, rgba(62, 99, 95, 0.5) 100% )");
    },
  },
  mounted() {
    if (localStorage.getItem("firstVisit") === "0") {
      this.showWelcomeScreen = false;
    }
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
