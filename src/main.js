import { createApp } from "vue";
import { createStore } from "vuex";
import "./style.scss";
import App from "./App.vue";
import VueDragscroll from "vue-dragscroll";
import ContainerBig from "./components/Containers/ContainerBig.vue";
import ContainerMedium from "./components/Containers/ContainerMedium.vue";
import ContainerSmall from "./components/Containers/ContainerSmall.vue";
import en from "./locale/en.json";
import pl from "./locale/pl.json";
import de from "./locale/de.json";

const store = createStore({
  state() {
    return {
      lang: "en", // "en", "pl" or "de"
      tempUnit: "c", // "c" or "f"
      windUnit: "kph", // "kph", "m/s" or "mph"
      pressureUnit: "mb", // "mb" or "in"
      forecastDays: 3,
      isDay: true,
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
  mutations: {
    changeLang(state, lang) {
      state.lang = lang;
    },
    changeTempUnit(state, unit) {
      state.tempUnit = unit;
    },
    changeWindUnit(state, unit) {
      state.windUnit = unit;
    },
    changePressureUnit(state, unit) {
      state.PressureUnit = unit;
    },
    changeIsDay(state, value) {
      state.isDay = value;
    },
  },
  getters: {
    t(state) {
      return state.availableLanguages.find((lang) => lang.code === state.lang)
        .file;
    },
  },
});

const app = createApp(App);
app.component("ContainerBig", ContainerBig);
app.component("ContainerMedium", ContainerMedium);
app.component("ContainerSmall", ContainerSmall);
app.use(VueDragscroll);
app.use(store);
app.mount("#app");
