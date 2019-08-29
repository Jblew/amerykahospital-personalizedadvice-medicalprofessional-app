import { RoleKey } from "amerykahospital-personalizedadvice-businesslogic";
import Vue from "vue";
import Router from "vue-router";

import { Configuration } from "../config/Configuration";
import { routes } from "../config/routes";
import AdviceListView from "../features/advice/views/AdviceListView.vue";
import SendAdvice from "../features/advice/views/SendAdviceView.vue";
import { RoleGuardFactory } from "../features/auth/hoc/RoleGuardFactory";
import Chat from "../features/discussion/views/DiscussionView.vue";

Vue.use(Router);

export default () =>
    new Router({
        base: Configuration.get().basePath,
        routes: [
            { ...routes.sendAdvice, component: RoleGuardFactory(RoleKey.medicalprofessional, SendAdvice) },
            { ...routes.home, component: RoleGuardFactory(RoleKey.medicalprofessional, AdviceListView) },
            { ...routes.discussion, component: RoleGuardFactory(RoleKey.medicalprofessional, Chat) },
        ],
    });
