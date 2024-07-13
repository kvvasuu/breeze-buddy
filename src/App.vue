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
    };
  },
  data() {
    return {
      showWelcomeScreen: true,
      showSettings: false,
      showModal: false,
    };
  },
  methods: {
    welcomeScreenToggle() {
      this.showWelcomeScreen = !this.showWelcomeScreen;
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
    if (localStorage.getItem("language") === null) {
      const prefferedLang = this.$store.state.availableLanguages.find(
        (lang) => lang.code === navigator.language.split("-")[0]
      );
      if (prefferedLang !== undefined) {
        this.$store.commit("changeLang", prefferedLang.code);
        localStorage.setItem("language", prefferedLang.code);
      } else {
        this.$store.commit("changeLang", "en");
        localStorage.setItem("language", "en");
      }
    }

    this.$store.commit(
      "changeTempUnit",
      localStorage.getItem("tempUnit") || "c"
    );
    this.$store.commit(
      "changeWindUnit",
      localStorage.getItem("windUnit") || "kph"
    );

    if (localStorage.getItem("isDay") != null) {
      this.$store.commit("changeIsDay", localStorage.getItem("isDay"));
    } else {
      localStorage.setItem("isDay", true);
    }
  },
};
</script>

<style lang="scss" scoped></style>
