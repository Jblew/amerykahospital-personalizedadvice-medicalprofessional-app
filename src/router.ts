import Vue from "vue";
import Router from "vue-router";

import { routes } from "./routes";
import About from "./views/About.vue";
import Auth from "./views/Auth.vue";
import List from "./views/List.vue";
import SendAdvice from "./views/SendAdvice.vue";

Vue.use(Router);

export default new Router({
    routes: [
        { ...routes.sendAdvice, component: SendAdvice },
        { ...routes.auth, component: Auth },
        { ...routes.about, component: About },
        { ...routes.home, component: List },
    ],
});
