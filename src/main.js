import { createApp } from "vue";
import { createStore } from "vuex";
import "./style.scss";
import App from "./App.vue";
import VueDragscroll from "vue-dragscroll";
import ContainerBig from "./components/Containers/ContainerBig.vue";
import ContainerMedium from "./components/Containers/ContainerMedium.vue";
import ContainerSmall from "./components/Containers/ContainerSmall.vue";

const store = createStore({
  state() {
    return {
      lang: "en", // "en", "pl" or "de"
      tempUnit: "c", // "c" or "f"
      windUnit: "kph", // "kph", "m/s" or "mph"
      pressureUnit: "mb", // "mb" or "in"
      forecastDays: 3,
      isDay: true,
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
    changeForecastDays(state, days) {
      state.forecastDays = days;
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
