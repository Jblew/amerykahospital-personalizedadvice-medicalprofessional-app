// tslint:disable:max-classes-per-file

import ow from "ow";

export namespace AuthModule {
    export const modulePathName = "auth";
    export function localName(name: string) {
        return modulePathName + "_" + name;
    }

    export enum AuthState {
        LOADING = "LOADING",
        AUTHENTICATED = "AUTHENTICATED",
        NOTAUTHENTICATED = "NOTAUTHENTICATED",
    }

    export interface State {
        state: AuthState;
        username?: string;
        profileImageURL?: string;
    }
    export function validateState(state: State) {
        ow(state.username, "state.username", ow.any(ow.undefined, ow.string));
        ow(state.profileImageURL, "state.profileImageURL", ow.any(ow.undefined, ow.string));
    }

    export class Actions {
        public static initialize = localName("initialize");
        public static logout = localName("logout");
    }

    export class Getters {
        public static isAuthenticated: string = localName("isAuthenticated");
        public static isNotAuthenticated: string = localName("isNotAuthenticated");
    }
}
