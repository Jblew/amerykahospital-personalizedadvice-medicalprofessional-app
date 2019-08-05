// tslint:disable:max-classes-per-file

import { RoleKey } from "amerykahospital-personalizedadvice-core";
import * as firebase from "firebase/app";
import { AccountRecord } from "firestore-roles";
import { RolesAuthModule } from "firestore-roles-vuex-module";
import Vue from "vue";
import Vuex, { ActionHandler, Store as VuexStore } from "vuex";
import { ModuleTree } from "vuex";
import { NotificationsModule, NotificationsModuleImpl } from "vuex-notifications-module";

import { AdviceModule } from "./modules/advice/AdviceModule";
import { AdviceModuleImpl } from "./modules/advice/AdviceModuleImpl";
import { AuthModuleConstructor } from "./modules/AuthModuleConstructor";
import { RootStore } from "./root/RootStore";
import { RootStoreImpl } from "./root/RootStoreImpl";
import { Store } from "./Store";

Vue.use(Vuex);

export namespace StoreImpl {
    /**
     * Store
     */
    export function constructStore(): VuexStore<RootStore.State> {
        /**
         *
         * Constructors
         */
        function constructAuthModule() {
            return AuthModuleConstructor.constructAuthModule(
                {
                    onAuthenticated: (account: AccountRecord) => {
                        RolesAuthModule.Actions.CheckRole.dispatch(store.dispatch, RoleKey.medicalprofessional);
                    },
                    onNotAuthenticated: () => {
                        /* */
                    },
                    onError: (message: string) =>
                        // referencing store here is possible because js has lexical scope
                        NotificationsModule.Actions.ShowNotification.dispatch(store.dispatch, {
                            message,
                            timeoutMs: 5000,
                            params: { color: "red" },
                        }),
                },
                firebase.auth(),
                firebase.firestore(),
            );
        }

        /**
         *
         * Initialization
         */
        const initializer: ActionHandler<RootStore.State, RootStore.State> = ({ dispatch }) => {
            NotificationsModule.Actions.Initialize.dispatch(dispatch);
            RolesAuthModule.Actions.Initialize.dispatch(dispatch);
        };

        const modules: Store.Modules & ModuleTree<RootStore.State> = {
            [RolesAuthModule.modulePathName]: constructAuthModule(),
            [NotificationsModule.modulePathName]: NotificationsModuleImpl.module,
            [AdviceModule.modulePathName]: AdviceModuleImpl.module,
        };

        const store = new Vuex.Store<RootStore.State>({
            strict: window.location.hostname === "localhost" ? true : false,
            ...RootStoreImpl.constructRootStore(initializer),
            modules,
        });

        return store;
    }
}
