// tslint:disable:max-classes-per-file

import { moduleActionRegistratorFactory } from "@/util/action_utils";
import { ResourceStatus } from "@/util/ResourceStatus";
import {
    MedicalProfessional, PendingMedicalProfessional,
} from "amerykahospital-personalizedadvice-businesslogic";
import ow from "ow--fork-by-jblew-with-catching";
import { CombinedVueInstance } from "vue/types/vue";

export namespace MedicalProfessionalModule {
    export const modulePathName = "medicalProfessional";
    export function localName(name: string) {
        return modulePathName + "_" + name;
    }

    /**
     *
     * State
     */
    export interface State {
        list: ResourceStatus<MedicalProfessional []>;
        current: MedicalProfessional | PendingMedicalProfessional;
        saveState: ResourceStatus<{}>;
    }

    export namespace State {
        export function validate(state: State) {
            ResourceStatus.validate(
                state.list,
                "state.list",
                l => ow(l, "state.list", ow.array.ofType(ow.object)),
            );
            ow(state.current, "state.current", ow.object);
            ResourceStatus.validate(
                state.saveState,
                "state.saveState",
                l => ow(l, "state.saveState", ow.object.deepEqual({})),
            );
        }
    }

    /**
     *
     * Actions
     */
    export namespace Actions {
        const makeActionFactories = moduleActionRegistratorFactory<State>(modulePathName);

        export const New = makeActionFactories<void>("new");
        export const Edit = makeActionFactories<{ id: string; }>("edit");
        export const Save = makeActionFactories<MedicalProfessional | PendingMedicalProfessional>("save");
        export const LoadList = makeActionFactories<void>("loadList");
    }

    /**
     *
     * State getter
     */
    export function stateOf(vueInstance: CombinedVueInstance<any, any, any, any, any>): State {
        return vueInstance.$store.state[modulePathName];
    }
}
