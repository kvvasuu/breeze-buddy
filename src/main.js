import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import VueDragscroll from "vue-dragscroll";
import ContainerBig from "./components/Containers/ContainerBig.vue";
import ContainerSmall from "./components/Containers/ContainerSmall.vue";

const app = createApp(App);
app.component("ContainerBig", ContainerBig);
app.component("ContainerSmall", ContainerSmall);
app.use(VueDragscroll);
app.mount("#app");
