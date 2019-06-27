import Vue from "vue";
import Router from "vue-router";

import { routes } from "./routes";
import About from "./views/About.vue";
import Auth from "./views/Auth.vue";
import Dashboard from "./views/Dashboard.vue";
import List from "./views/List.vue";

Vue.use(Router);

export default new Router({
    routes: [
        { ...routes.home, component: Dashboard },
        { ...routes.auth, component: Auth },
        { ...routes.about, component: About },
        { ...routes.list, component: List },
    ],
});
