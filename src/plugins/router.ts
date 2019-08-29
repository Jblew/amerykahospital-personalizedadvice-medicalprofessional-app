import Vue from "vue";
import Router from "vue-router";

import { Configuration } from "../config/Configuration";
import { routes } from "../config/routes";
import AdviceListView from "../features/advice/views/AdviceListView.vue";
import SendAdvice from "../features/advice/views/SendAdviceView.vue";
import Chat from "../features/discussion/views/DiscussionView.vue";

Vue.use(Router);

export default () =>
    new Router({
        base: Configuration.get().basePath,
        routes: [
            { ...routes.sendAdvice, component: SendAdvice },
            { ...routes.home, component: AdviceListView },
            { ...routes.discussion, component: Chat },
        ],
    });
