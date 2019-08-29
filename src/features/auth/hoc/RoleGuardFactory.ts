import { VueConstructor } from "vue";
import { CombinedVueInstance } from "vue/types/vue";

import RoleGuardComponent from "../components/RoleGuardComponent.vue";

export function RoleGuardFactory(
    role: string,
    guardedComponent: VueConstructor,
): CombinedVueInstance<any, any, any, any, any> {
    return {
        render(createElement: (...p: any) => any) {
            return createElement(RoleGuardComponent, { props: { role } }, [createElement(guardedComponent)]);
        },
    };
}
