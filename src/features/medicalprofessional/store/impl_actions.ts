import { emptyPendingMedicalProfessional } from "@/features/medicalprofessional/store/emptyPendingMedicalProfessional";
import { ResourceStatus } from "@/util/ResourceStatus";
import {
    MedicalProfessionalRepository, PendingMedicalProfessional,
} from "amerykahospital-personalizedadvice-businesslogic";
import { MedicalProfessionalRepositoryFactory } from "amerykahospital-personalizedadvice-db";
import * as firebase from "firebase/app";
import { ActionTree } from "vuex";

import { MedicalProfessionalModule as Me } from "./MedicalProfessionalModule";
import { Mutations } from "./Mutations";

/**
 *
 * Export of actions
 */
export function constructActions(firestore: firebase.firestore.Firestore): ActionTree<Me.State, Me.State> {
    const actionTree: ActionTree<Me.State, Me.State> = {};
    const mpRepository: MedicalProfessionalRepository = MedicalProfessionalRepositoryFactory.make(firestore);

    Me.Actions.New.register(actionTree, ({ commit }) => {
        Mutations.SetCurrent(commit, emptyPendingMedicalProfessional());
    });

    Me.Actions.Edit.register(actionTree, ({ state, commit }, payload ) => {
        if (!state.list) throw new Error("List not loaded yet");
        const mpToEdit = ResourceStatus.ensureResult(state.list, "state.list").filter(mp => mp.id === payload.id);
        if (mpToEdit.length === 0) {
            throw new Error(`Edit action: could not find medicalprofessional with id ${payload.id}`);
        }
        Mutations.SetCurrent(commit, mpToEdit[0]);
    });

    Me.Actions.Save.register(actionTree, ({ state, commit, dispatch }, mp ) => {
        PendingMedicalProfessional.validate(mp);
        ResourceStatus.fetchResource(
            async () => await (
                "id" in mp ? mpRepository.update(mp) : mpRepository.add(mp)
            ),
            status => Mutations.SetSaveState(commit, status),
        );
        Me.Actions.LoadList.dispatch(dispatch);
    });

    Me.Actions.LoadList.register(actionTree, ({ state, commit, dispatch } ) => {
        ResourceStatus.fetchResource(
            async () => await mpRepository.list(),
            status => Mutations.SetList(commit, status),
        );
    });

    return actionTree;
}
