// tslint:disable:no-console max-classes-per-file

import { GetterTree, Module } from "vuex";

import { AdviceModule as Me } from "./AdviceModule";
import { constructActions } from "./impl_actions";
import { constructMutations } from "./impl_mutations";
import { state } from "./impl_state";

export namespace AdviceModuleImpl {
    /**
     * Getters
     */
    const getters: GetterTree<Me.State, Me.State> = {};

    /**
     * Module
     */
    export const module: Module<Me.State, any> = {
        state,
        mutations: constructMutations(),
        actions: constructActions(),
        getters,
    };
}
