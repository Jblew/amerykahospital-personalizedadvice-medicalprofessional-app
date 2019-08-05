import { RolesConfig } from "amerykahospital-personalizedadvice-core";
import * as firebase from "firebase/app";
import {
    Configuration as RolesAuthConfiguration,
    RolesAuthModule,
    RolesAuthModuleImpl,
} from "firestore-roles-vuex-module";
import { Module as VuexModule } from "vuex";

export namespace AuthModuleConstructor {
    export function constructAuthModule(
        authCallbacks: RolesAuthConfiguration.AuthCallbacks,
        firebaseAuth: firebase.auth.Auth,
        firestore: firebase.firestore.Firestore,
    ): VuexModule<RolesAuthModule.State, any> {
        const config: RolesAuthConfiguration = {
            roles: RolesConfig,
            callbacks: authCallbacks,
        };
        return RolesAuthModuleImpl.constructModule(config, firebaseAuth, firestore);
    }
}
