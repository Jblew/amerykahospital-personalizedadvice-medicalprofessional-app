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
        filter: { medicalprofessionalName: "INITIAL_VALUE_TO_BE_CHANGED" },
        list: [],
    };
    Me.validateState(myState);

    /**
     * Mutations
     */
    // do not export as these mutations are private
    class Mutations {
        public static setAddOpState = Me.localName("setAddOpState");
        public static setListLoadingState = Me.localName("setListLoadingState");
        public static setList = Me.localName("setList");
        public static setFilter = Me.localName("setFilter");
    }

    const mutations: MutationTree<Me.State> = {
        [Mutations.setAddOpState]: async (
            state: Me.State,
            payload: { loading: boolean; error: string; result: string },
        ) => {
            ow(payload.loading, "payload.loading", ow.boolean);
            ow(payload.error, "payload.error", ow.string);
            ow(payload.result, "payload.result", ow.string);

            state.addOp.loading = payload.loading;
            state.addOp.error = payload.error;
            state.addOp.result = payload.result;
            Me.validateState(state);
        },
        [Mutations.setListLoadingState]: async (state: Me.State, payload: { loading: boolean; error: string }) => {
            ow(payload.loading, "payload.loading", ow.boolean);
            ow(payload.error, "payload.error", ow.string);

            state.listLoadingState.loading = payload.loading;
            state.listLoadingState.error = payload.error;
            Me.validateState(state);
        },
        [Mutations.setList]: async (state: Me.State, payload: Advice[]) => {
            ow(payload, "payload", ow.array.ofType(ow.object));

            state.list = payload;
            Me.validateState(state);
        },

        [Mutations.setFilter]: async (state: Me.State, payload: AdvicesManager.FetchFilter) => {
            ow(payload, "payload", ow.object);

            state.filter = payload;
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
                    commit(Mutations.setAddOpState, { loading: true, error: "", result: "" });
                    await AdvicesManager.addAdvice(payload);
                    commit(Mutations.setAddOpState, { loading: false, error: "", result: "Ok." });
                } catch (error) {
                    commit(Mutations.setAddOpState, { loading: false, error: "Error: " + error, result: "" });
                }
            })();
        },
        [Me.Actions.updateQueryFilter]: ({ commit, dispatch, state }, payload: AdvicesManager.FetchFilter): void => {
            if (
                state.filter.medicalprofessionalName !== payload.medicalprofessionalName ||
                state.filter.patientName !== payload.patientName ||
                state.filter.parentPhoneNumber !== payload.parentPhoneNumber
            ) {
                commit(Mutations.setFilter, payload);
                dispatch(Me.Actions._reloadList);
            }
        },
        [Me.Actions._reloadList]: ({ commit, dispatch, state }): void => {
            if (state.listLoadingState.loading) return;
            (async () => {
                try {
                    commit(Mutations.setListLoadingState, { loading: true, error: "" });
                    const loadedList = await AdvicesManager.fetchAdvices(state.filter);
                    commit(Mutations.setList, loadedList);
                    commit(Mutations.setListLoadingState, { loading: false, error: "" });
                } catch (error) {
                    commit(Mutations.setListLoadingState, { loading: false, error: "Error: " + error });
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
