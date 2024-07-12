<template>
  <div
    id="app-background"
    :class="{ 'app-background-night': !this.$store.state.isDay }"
  >
    <div id="app-inner">
      <Transition name="slide-fade" mode="out-in" appear>
        <WelcomeScreen
          v-if="showWelcomeScreen"
          @welcome-screen-toggle="welcomeScreenToggle"
        ></WelcomeScreen>
        <MainScreen
          v-else
          :key="this.$store.state.lang"
          @show-settings="toggleSettings"
          @toggle-modal="toggleModal"
        ></MainScreen> </Transition
      ><Teleport to="body">
        <Transition name="slide-fade-fast" mode="out-in">
          <Settings
            v-if="showSettings"
            @toggle-modal="toggleSettings"
          ></Settings> </Transition
      ></Teleport>
    </div>
  </div>
</template>

<script>
import WelcomeScreen from "./components/WelcomeScreen.vue";
import MainScreen from "./components/MainScreen/MainScreen.vue";
import Settings from "./components/Settings.vue";
import { computed } from "vue";
import en from "./locale/en.json";
import pl from "./locale/pl.json";
import de from "./locale/de.json";

export default {
  name: "App",
  components: {
    WelcomeScreen,
    MainScreen,
    Settings,
  },
  provide() {
    return {
      showModal: computed(() => this.showModal),
      t: computed(
        () =>
          this.availableLanguages.find(
            (lang) => lang.code === this.$store.state.lang
          ).file
      ),
    };
  },
  data() {
    return {
      showWelcomeScreen: true,
      showSettings: false,
      showModal: false,
      availableLanguages: [
        {
          code: "en",
          name: "English",
          file: en,
        },
        {
          code: "pl",
          name: "Polski",
          file: pl,
        },
        {
          code: "de",
          name: "Deutsch",
          file: de,
        },
      ],
    };
  },
  methods: {
    welcomeScreenToggle() {
      this.showWelcomeScreen = !this.showWelcomeScreen;
      localStorage.setItem("language", this.$store.state.lang);
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    toggleSettings() {
      this.toggleModal();
      this.showSettings = !this.showSettings;
    },
  },
  created() {
    this.$store.state.lang = localStorage.getItem("language") || "en";
    this.$store.state.tempUnit = localStorage.getItem("tempUnit") || "c";
    this.$store.state.windUnit = localStorage.getItem("windUnit") || "kph";

    if (
      !localStorage.getItem("forecastDays") ||
      localStorage.getItem("forecastDays") <= 3
    ) {
      localStorage.setItem("forecastDays", 10);
    }
    localStorage.getItem("isDay") === "0"
      ? (this.$store.state.isDay = false)
      : (this.$store.state.isDay = true);
    this.$store.state.forecastDays = localStorage.getItem("forecastDays");
  },
};
</script>

<style lang="scss" scoped></style>
