import VueInitializer from "./index";
/* import { FIREBASE_CONFIG } from "./settings";
import { Configuration } from "./config/Configuration";

/**
 * This is a development entrypoint that is started only on "npm run serve".
 * To use it you must pull the settings repo and run "npm run build:es6"
 * /

const config: Configuration = {
    firebase: FIREBASE_CONFIG,
    basePath: "/",
};
window.AHPA_MEDICALPROFESSIONAL_CONFIGURATION = config;*/

const vueEntry = VueInitializer();
vueEntry.$mount("#app");
