import Vue from "vue";
import Router from "vue-router";

import { Configuration } from "../config/Configuration";
import { routes } from "../config/routes";
import Chat from "../features/discussion/views/DiscussionView.vue";
import List from "../views/List.vue";
import SendAdvice from "../views/SendAdvice.vue";

Vue.use(Router);

export default () =>
    new Router({
        base: Configuration.get().basePath,
        routes: [
            { ...routes.sendAdvice, component: SendAdvice },
            { ...routes.home, component: List },
            { ...routes.discussion, component: Chat },
        ],
    });
