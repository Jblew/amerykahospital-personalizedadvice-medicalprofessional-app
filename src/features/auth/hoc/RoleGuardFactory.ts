import Vue, { VueConstructor } from "vue";
import { CombinedVueInstance } from "vue/types/vue";

import RoleGuardComponent from "../components/RoleGuardComponent.vue";

export function RoleGuardFactory(
    role: string,
    guardedComponent: VueConstructor,
): CombinedVueInstance<any, any, any, any, any> {
    const guardedComponentRefName = "guardedComponentRef";
    return Vue.extend({
        render(createElement: (...p: any) => any) {
            const guardedComponentElement = createElement(guardedComponent, { ref: guardedComponentRefName });
            return createElement(RoleGuardComponent, { props: { role } }, [guardedComponentElement]);
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$nextTick(() => {
                    console.log("vm.$refs", vm.$refs);
                    console.log("vm.$refs[" + guardedComponentRefName + "]", vm.$refs[guardedComponentRefName]);
                    (vm.$refs[guardedComponentRefName] as any).beforeRouteEnter(to, from, next);
                });

            });
            if ((guardedComponent as any).beforeRouteEnter) (guardedComponent as any).beforeRouteEnter(to, from, next);
        },
        beforeRouteUpdate(to, from, next) {
            if ((guardedComponent as any).beforeRouteUpdate) (guardedComponent as any).beforeRouteUpdate(to, from, next);
        },
        beforeRouteLeave(to, from, next) {
            if ((guardedComponent as any).beforeRouteLeave) (guardedComponent as any).beforeRouteLeave(to, from, next);
        },
    });
}
