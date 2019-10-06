import { Configuration } from "@/config/Configuration";
import { routes } from "@/config/routes";
import AdviceListView from "@/features/advice/views/AdviceListView.vue";
import ChatView from "@/features/discussion/views/DiscussionView.vue";
import vue from "vue";
import router from "vue-router";
import Router from "vue-router";
import { CombinedVueInstance } from "vue/types/vue";

vue.use(router);

export default () => {
    function mapRoute(r: { path: string; name: string }, component: CombinedVueInstance<any, any, any, any, any>) {
        return { path: r.path, name: r.name, component };
    }

    return new Router({
        base: Configuration.get().basePath,
        routes: [mapRoute(routes.list, AdviceListView), mapRoute(routes.discussion, ChatView)],
    });
};
