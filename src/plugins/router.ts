import { RoleKey } from "amerykahospital-personalizedadvice-businesslogic";
import Vue from "vue";
import Router from "vue-router";
import { CombinedVueInstance } from "vue/types/vue";

import { Configuration } from "../config/Configuration";
import { routes } from "../config/routes";
import AdviceListView from "../features/advice/views/AdviceListView.vue";
import SendAdvice from "../features/advice/views/SendAdviceView.vue";
import { RoleGuardFactory } from "../features/auth/hoc/RoleGuardFactory";
import Chat from "../features/discussion/views/DiscussionView.vue";

Vue.use(Router);

export default () => {
    function mapRoute(
        r: { path: string; name: string; role: string },
        component: CombinedVueInstance<any, any, any, any, any>,
    ) {
        return { path: r.path, name: r.name, component: RoleGuardFactory(r.role, component) };
    }

    return new Router({
        base: Configuration.get().basePath,
        routes: [
            mapRoute(routes.list, AdviceListView),
            mapRoute(routes.sendAdvice, SendAdvice),
            mapRoute(routes.discussion, Chat),
        ],
    });
};
