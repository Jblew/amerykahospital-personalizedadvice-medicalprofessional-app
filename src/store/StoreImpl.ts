// tslint:disable:max-classes-per-file

import { AdviceModule } from "@/features/advice/store/AdviceModule";
import { AdviceModuleImpl } from "@/features/advice/store/AdviceModuleImpl";
import { AuthModuleConstructor } from "@/features/auth/store/AuthModuleConstructor";
import { MedicalProfessionalModule } from "@/features/medicalprofessional/store/MedicalProfessionalModule";
import { constructMedicalProfessionalModule } from "@/features/medicalprofessional/store/MedicalProfessionalModuleImpl";
import { RoleKey } from "amerykahospital-personalizedadvice-businesslogic";
import * as firebase from "firebase/app";
import { RolesAuthModule, Account } from "firestore-roles-vuex-module";
import Vue from "vue";
import Vuex, { ActionHandler, Store as VuexStore } from "vuex";
import { ModuleTree } from "vuex";
import { NotificationsModule, NotificationsModuleImpl } from "vuex-notifications-module";

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
                    onAuthenticated: (account: Account) => {
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
            [MedicalProfessionalModule.modulePathName]: constructMedicalProfessionalModule(firebase.firestore()),
        };

        const store = new Vuex.Store<RootStore.State>({
            strict: window.location.hostname === "localhost",
            ...RootStoreImpl.constructRootStore(initializer),
            modules,
        });

        return store;
    }
}
