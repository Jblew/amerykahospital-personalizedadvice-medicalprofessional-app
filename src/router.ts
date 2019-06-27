import Vue from "vue";
import Router from "vue-router";

import { routes } from "./routes";
import Auth from "./views/Auth.vue";
import Dashboard from "./views/Dashboard.vue";

Vue.use(Router);

export default new Router({
    routes: [
        { ...routes.home, component: Dashboard },
        { ...routes.auth, component: Auth },
        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ "./views/About.vue"),
        },
    ],
});
