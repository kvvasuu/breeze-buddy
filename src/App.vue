<template>
  <div id="app-background" :class="{ 'app-background-night': !is_Day }">
    <div id="app-inner">
      <Transition name="slide-fade" mode="out-in" appear>
        <WelcomeScreen
          v-if="showWelcomeScreen"
          @welcome-screen-toggle="welcomeScreenToggle"
          @language="changeLanguage"
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
      lang: "en",
    };
  },
  methods: {
    welcomeScreenToggle() {
      this.showWelcomeScreen = !this.showWelcomeScreen;
      localStorage.setItem("language", this.lang);
    },
    toggleNight(isDay) {
      isDay ? (this.is_Day = true) : (this.is_Day = false);
    },
    changeLanguage(lang) {
      this.lang = lang;
      localStorage.setItem("language", this.lang);
    },
    toggleSettings() {
      if (window.scrollY > 30) {
        document.body.classList.add("scroll-disable");
        window.addEventListener("scroll", this.toggleSettingsScroll);
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }, 100);
      } else {
        this.showSettings = !this.showSettings;
        document.body.classList.remove("scroll-disable");
      }
    },
    toggleSettingsScroll() {
      if (window.scrollY === 0) {
        this.showSettings = true;
        window.removeEventListener("scroll", this.toggleSettingsScroll);
      }
      setTimeout(() => {
        document.body.classList.remove("scroll-disable");
        window.removeEventListener("scroll", this.toggleSettingsScroll);
      }, 1000);
    },
  },
  created() {
    if (localStorage.getItem("language") !== null) {
      this.lang = localStorage.getItem("language");
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
