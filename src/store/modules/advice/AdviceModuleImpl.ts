// tslint:disable:no-console max-classes-per-file

import { AddAdviceAdapter } from "@/adapter/AddAdviceAdapter";
import { SendSMSAdapter } from "@/adapter/SendSMSAdapter";
import { Advice, AdvicesManager, PendingAdvice } from "amerykahospital-personalizedadvice-core";
import ow from "ow";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";

import { AdviceModule as Me } from "./AdviceModule";

export namespace AdviceModuleImpl {
    /**
     * State
     */
    export const myState: Me.State = {
        addOp: {
            loading: false,
            error: "",
            result: {
                log: "",
                adviceId: "",
            },
        },
        sendSMSOp: {
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
        public static setSendSMSOpState = Me.localName("setSendSMSOpState");
        public static setListLoadingState = Me.localName("setListLoadingState");
        public static setList = Me.localName("setList");
        public static setFilter = Me.localName("setFilter");
    }

    class PrivateActions {
        public static addAdvice = Me.localName("_addAdvice");
    }

    const mutations: MutationTree<Me.State> = {
        [Mutations.setAddOpState]: async (
            state: Me.State,
            payload: { loading: boolean; error: string; result: { log: string; adviceId: string } },
        ) => {
            ow(payload.loading, "payload.loading", ow.boolean);
            ow(payload.error, "payload.error", ow.string);
            ow(payload.result, "payload.result", ow.object);

            state.addOp.loading = payload.loading;
            state.addOp.error = payload.error;
            state.addOp.result = payload.result;
            Me.validateState(state);
        },

        [Mutations.setSendSMSOpState]: async (
            state: Me.State,
            payload: { loading: boolean; error: string; result: string },
        ) => {
            ow(payload.loading, "payload.loading", ow.boolean);
            ow(payload.error, "payload.error", ow.string);
            ow(payload.result, "payload.result", ow.string);

            state.sendSMSOp.loading = payload.loading;
            state.sendSMSOp.error = payload.error;
            state.sendSMSOp.result = payload.result;
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
        [Me.Actions.addAdviceAndSendSMS]: ({ commit, dispatch, state }, payload: PendingAdvice): void => {
            (async () => {
                try {
                    await dispatch(PrivateActions.addAdvice, payload);
                    dispatch(Me.Actions.sendSMS);
                } catch (error) {
                    console.error(error);
                    commit(Mutations.setAddOpState, {
                        loading: false,
                        error: "" + error,
                        result: { log: "", adviceId: "" },
                    });
                }
            })();
        },

        [PrivateActions.addAdvice]: async ({ commit, dispatch, state }, payload: PendingAdvice) => {
            try {
                commit(Mutations.setAddOpState, { loading: true, error: "", result: { log: "", adviceId: "" } });
                const result = await new AddAdviceAdapter().addAdvice(payload);
                commit(Mutations.setAddOpState, { loading: false, error: "", result });
                dispatch(Me.Actions.reloadList);
            } catch (error) {
                console.error(error);
                commit(Mutations.setAddOpState, {
                    loading: false,
                    error: "" + error,
                    result: { log: "", adviceId: "" },
                });
            }
        },

        [Me.Actions.sendSMS]: ({ commit, dispatch, state }, payload?: { adviceId: string }) => {
            (async () => {
                try {
                    const adviceId = payload ? payload.adviceId : state.addOp.result.adviceId;
                    console.log("payload", payload);
                    console.log("addOpResult", state.addOp.result);
                    if (!adviceId) throw new Error("Advice must be specified");
                    commit(Mutations.setSendSMSOpState, { loading: true, error: "", result: "" });
                    const result = await new SendSMSAdapter().sendSMS({ adviceId });
                    commit(Mutations.setSendSMSOpState, { loading: false, error: "", result });
                    dispatch(Me.Actions.reloadList);
                } catch (error) {
                    console.error(error);
                    commit(Mutations.setSendSMSOpState, { loading: false, error: "" + error, result: "" });
                }
            })();
        },

        [Me.Actions.resetResults]: ({ commit }): void => {
            commit(Mutations.setAddOpState, { loading: false, error: "", result: { log: "", adviceId: "" } });
            commit(Mutations.setSendSMSOpState, { loading: false, error: "", result: "" });
        },

        [Me.Actions.updateQueryFilterAndReloadList]: (
            { commit, dispatch },
            payload: AdvicesManager.FetchFilter,
        ): void => {
            commit(Mutations.setFilter, payload);
            dispatch(Me.Actions.reloadList);
        },

        [Me.Actions.reloadList]: ({ commit, dispatch, state }): void => {
            if (state.listLoadingState.loading) return;
            (async () => {
                try {
                    commit(Mutations.setListLoadingState, { loading: true, error: "" });
                    const loadedList = await AdvicesManager.fetchAdvices(state.filter);
                    commit(Mutations.setList, loadedList);
                    commit(Mutations.setListLoadingState, { loading: false, error: "" });
                } catch (error) {
                    commit(Mutations.setListLoadingState, { loading: false, error: "" + error });
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
