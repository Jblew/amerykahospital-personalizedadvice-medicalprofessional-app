// tslint:disable:max-classes-per-file

import Vue from "vue";
import { CombinedVueInstance } from "vue/types/vue";
import Vuex from "vuex";
import { Commit, Dispatch, Module } from "vuex";
import { NotificationsModule } from "vuex-notifications-module";

import { AdviceModule } from "./modules/advice/AdviceModule";
import { AuthModule } from "./modules/auth/AuthModule";
import { RootStore } from "./root/RootStore";

Vue.use(Vuex);

export interface Store {
    state: Store.State;
    dispatch: Dispatch;
    commit: Commit;
    getters: any;
}

export namespace Store {
    export interface Modules {
        [NotificationsModule.modulePathName]: Module<NotificationsModule.State, RootStore.State>;
        [AuthModule.modulePathName]: Module<AuthModule.State, RootStore.State>;
        [AdviceModule.modulePathName]: Module<AdviceModule.State, RootStore.State>;
    }

    export type State = {
        [AuthModule.modulePathName]: AuthModule.State;
        [NotificationsModule.modulePathName]: NotificationsModule.State;
        [AdviceModule.modulePathName]: Module<AdviceModule.State, RootStore.State>;
    } & RootStore.State;

    /**
     * This function allows proper store type resolution & guarding.
     */
    export function of(vueInstance: CombinedVueInstance<any, any, any, any, any>): Store {
        return vueInstance.$store as Store;
    }
}

export { RootStore } from "./root/RootStore";
