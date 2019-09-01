import { moduleMutationFactory } from "@/util/mutation_utils";
import { ResourceStatus } from "@/util/ResourceStatus";
import {
    Advice,
    MedicalProfessional,
    PendingMedicalProfessional,
} from "amerykahospital-personalizedadvice-businesslogic";
import { MutationTree } from "vuex";

import { MedicalProfessionalModule as Me } from "./MedicalProfessionalModule";

export const mutationHandlers: MutationTree<Me.State> = {};
export namespace Mutations {
    const registerMutation = moduleMutationFactory(Me.modulePathName, Me.State.validate, mutationHandlers);

    export const SetList = registerMutation<ResourceStatus<MedicalProfessional []>>("setList")(({ state, payload }) => {
        state.list = payload;
    });

    export const SetSaveState = registerMutation<ResourceStatus<{}>>("setSaveState")(({ state, payload }) => {
        state.saveState = payload;
    });

    export const SetCurrent = registerMutation<MedicalProfessional | PendingMedicalProfessional>
        ("setCurrent")(({ state, payload }) => {
            state.current = payload;
        });
}
