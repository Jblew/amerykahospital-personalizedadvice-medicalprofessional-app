// tslint:disable:no-console

import { Advice, AdvicesManager } from "ahpaa-core";
import ow from "ow";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";

import { AdviceModule, AdviceModule as Me } from "./AdviceModule";

export namespace AdviceModuleImpl {
    /**
     * State
     */
    export const myState: Me.State = {
        addOp: {
            loading: false,
            error: "",
            result: "",
        },
        listLoadingState: {
            loading: false,
            error: "",
        },
    };
    Me.validateState(myState);

    /**
     * Mutations
     */
    // do not export as these mutations are private
    class Mutations {
        public static updateAddOpState = Me.localName("updateAddOpState");
    }

    const mutations: MutationTree<Me.State> = {
        [Mutations.updateAddOpState]: async (
            state: Me.State,
            payload: { loading: boolean; error: string; result: string },
        ) => {
            console.log("updateAddOpState", payload);
            ow(payload.loading, "payload.loading", ow.boolean);
            ow(payload.error, "payload.error", ow.string);
            ow(payload.result, "payload.result", ow.string);

            state.addOp.loading = payload.loading;
            state.addOp.error = payload.error;
            state.addOp.result = payload.result;
            Me.validateState(state);
        },
    };

    /**
     * Actions
     */
    const actions: ActionTree<Me.State, Me.State> = {
        [Me.Actions.addAdvice]: ({ commit, dispatch, state }, payload: Advice): void => {
            (async () => {
                try {
                    commit(Mutations.updateAddOpState, { loading: true, error: "", result: "" });
                    await AdvicesManager.addAdvice(payload);
                    commit(Mutations.updateAddOpState, { loading: false, error: "", result: "Updated" });
                } catch (error) {
                    commit(Mutations.updateAddOpState, { loading: false, error: "Error: " + error, result: "" });
                }
            })();
        },
    };

    /**
     * Getters
     */
    const getters: GetterTree<Me.State, Me.State> = {};

    /**
     * Module
     */
    export const module: Module<Me.State, any> = {
        state: myState,
        mutations,
        actions,
        getters,
    };
}
