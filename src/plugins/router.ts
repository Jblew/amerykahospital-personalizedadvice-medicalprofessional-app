import { Configuration } from "@/config/Configuration";
import { routes } from "@/config/routes";
import AdviceListView from "@/features/advice/views/AdviceListView.vue";
import SendAdviceView from "@/features/advice/views/SendAdviceView.vue";
import { RoleGuardFactory } from "@/features/auth/hoc/RoleGuardFactory";
import ChatView from "@/features/discussion/views/DiscussionView.vue";
import MedicalProfessionalView from "@/features/medicalprofessional/views/MedicalProfessionalView.vue";
import vue from "vue";
import router from "vue-router";
import Router from "vue-router";
import { CombinedVueInstance } from "vue/types/vue";

vue.use(router);

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
            mapRoute(routes.sendAdvice, SendAdviceView),
            mapRoute(routes.medicalprofessional, MedicalProfessionalView),
            mapRoute(routes.discussion, ChatView),
        ],
    });
};
