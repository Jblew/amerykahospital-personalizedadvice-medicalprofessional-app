import { Configuration } from "./config/Configuration";
import VueInitializer from "./index";

const config: Configuration = {
    basePath: "/",
};
window.AHPA_MEDICALPROFESSIONAL_CONFIGURATION = config;

const vueEntry = VueInitializer();
vueEntry.$mount("#app");
