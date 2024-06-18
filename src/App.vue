<template>
  <div id="app-background" :class="{ 'app-background-night': !is_Day }">
    <div id="app-inner">
      <Transition name="slide-fade" mode="out-in" appear>
        <WelcomeScreen
          v-if="showWelcomeScreen && passFirstVisit"
          @welcome-screen-toggle="welcomeScreenToggle"
          @language="changeLanguage"
          :firstVisit="passFirstVisit"
        ></WelcomeScreen>
        <MainScreen
          v-else
          :key="lang"
          :forecastDays="forecastDays"
          @isDayEmit="toggleNight"
          @showSettings="toggleSettings"
        ></MainScreen>
      </Transition>
      <Transition name="slide-fade-fast" mode="out-in">
        <Settings
          v-if="showSettings"
          @toggle-settings="toggleSettings"
          @language="changeLanguage"
        ></Settings>
      </Transition>
    </div>
  </div>
</template>

<script>
import WelcomeScreen from "./components/WelcomeScreen.vue";
import MainScreen from "./components/MainScreen/MainScreen.vue";
import Settings from "./components/Settings.vue";
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
      showSettings: computed(() => this.showSettings),
      isDay: computed(() => this.is_Day),
      language: computed(() => this.lang),
    };
  },
  data() {
    return {
      showWelcomeScreen: true,
      showSettings: false,
      forecastDays: 3,
      is_Day: true,
      firstVisit: true,
      lang: "en",
    };
  },
  methods: {
    welcomeScreenToggle() {
      this.showWelcomeScreen = !this.showWelcomeScreen;
      localStorage.setItem("firstVisit", false);
    },
    toggleNight(isDay) {
      isDay ? (this.is_Day = true) : (this.is_Day = false);
    },
    changeLanguage(lang) {
      this.lang = lang;
    },
    toggleSettings() {
      if (window.scrollY > 20) {
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
      if (window.scrollY <= 50) {
        this.showSettings = true;
        window.removeEventListener("scroll", this.toggleSettingsScroll);
      }
      setTimeout(() => {
        document.body.classList.remove("scroll-disable");
      }, 1000);
    },
  },
  computed: {
    passFirstVisit() {
      return this.firstVisit;
    },
  },
  mounted() {
    localStorage.getItem("firstVisit") === false
      ? (this.firstVisit = false)
      : (this.firstVisit = true);
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
