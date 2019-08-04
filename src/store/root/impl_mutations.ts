// tslint:disable:max-classes-per-file

import { MutationTree } from "vuex";

import { RootStore as Me } from "./RootStore";

export const mutations: MutationTree<Me.State> = {
    [Me.Mutations.updateNowTimer](state: Me.State) {
        state.nowTimer = new Date();
    },
};
