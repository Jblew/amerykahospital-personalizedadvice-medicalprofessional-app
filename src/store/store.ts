// tslint:disable:max-classes-per-file

import Vue from "vue";
import Vuex, { MutationTree } from "vuex";
import { ActionTree, Commit, Dispatch, Module, ModuleTree } from "vuex";

import { AuthModule } from "./modules/auth/AuthModule";
import { AuthModuleImpl } from "./modules/auth/AuthModuleImpl";

import { AdviceModule } from "./modules/advice/AdviceModule";
import { AdviceModuleImpl } from "./modules/advice/AdviceModuleImpl";

Vue.use(Vuex);

/**
 * Root state types
 */
export interface RootState {
    nowTimer: Date;
}
const rootState: RootState = {
    nowTimer: new Date(),
};

export class Mutations {
    public static updateNowTimer = "updateNowTimer";
}
const mutations: MutationTree<RootState> = {
    [Mutations.updateNowTimer](state: RootState) {
        state.nowTimer = new Date();
    },
};

export class Actions {
    public static initialize: string = "initialize";
}
const actions: ActionTree<RootState, RootState> = {
    [Actions.initialize]: ({ commit, dispatch, state }): void => {
        dispatch(AuthModule.Actions.initialize);
        setInterval(() => {
            commit("updateNowTimer");
        }, 1000);
    },
};

/**
 * Modules
 */
export interface Modules {
    [AuthModule.modulePathName]: Module<AuthModule.State, RootState>;
    [AdviceModule.modulePathName]: Module<AdviceModule.State, RootState>;
}
const modules: Modules & ModuleTree<RootState> = {
    [AuthModule.modulePathName]: AuthModuleImpl.module,
    [AdviceModule.modulePathName]: AdviceModuleImpl.module,
};

export type State = {
    [AuthModule.modulePathName]: AuthModule.State;
    [AdviceModule.modulePathName]: AdviceModule.State;
} & RootState;

/**
 * Store type guard
 */
export interface Store {
    state: State;
    dispatch: Dispatch;
    commit: Commit;
    getters: any;
}

/**
 * This function allows proper store type resolution & guarding.
 * @param incognitoStore
 */
export function s(incognitoStore: any): Store {
    return incognitoStore as Store;
}

/**
 * Store
 */
export const store = new Vuex.Store<RootState>({
    strict: window.location.hostname === "localhost" ? true : false, // TODO remove if app
    state: rootState,
    actions,
    mutations,
    modules,
});
