import { createApp } from "vue";
import { createPinia } from "pinia";
import { createAuth0 } from "@auth0/auth0-vue";
import { createRouter, createWebHistory } from "vue-router";

import $ from "jquery";
import _ from "lodash";
import noUiSlider from "nouislider";
import "datatables.net";
import "dropzone/dist/dropzone-min.js";

import "./style.css";
import App from "./App.vue";

import "flyonui/flyonui.js";
import "flyonui/dist/helper-apexcharts.js";

import { routes } from "./routes";

window._ = _;
window.$ = $;
window.jQuery = $;
window.DataTable = $.fn.dataTable;
window.noUiSlider = noUiSlider;

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach(async (to, from, failure) => {
  if (!failure) setTimeout(() => window.HSAccordion.autoInit(), 100);
});

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(
  createAuth0({
    domain: "dev-9mvz0nf6.us.auth0.com",
    clientId: "2E1Zrg1Yp6F3wrJc0g7zrGtiJpcHUPd0",
    cacheLocation: "localstorage",
    useRefreshTokens: true,
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  })
);
app.mount("#app");
