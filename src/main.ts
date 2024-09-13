import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { LoadingPlugin } from "vue-loading-overlay";
import Vue3Toastify from "vue3-toastify";
import "vue-loading-overlay/dist/css/index.css";
import "vue3-toastify/dist/index.css";

createApp(App).use(LoadingPlugin).use(Vue3Toastify).mount("#app");
