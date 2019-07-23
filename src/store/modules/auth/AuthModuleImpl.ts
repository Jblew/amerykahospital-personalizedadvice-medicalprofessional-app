// tslint:disable:no-console

import { FirebaseAuthHelper } from "amerykahospital-personalizedadvice-vue-commons";
import ow from "ow";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";

import { AuthModule, AuthModule as Me } from "./AuthModule";

export namespace AuthModuleImpl {
    /**
     * State
     */
    export const myState: Me.State = {
        state: AuthModule.AuthState.LOADING,
        profileImageURL: undefined,
        username: undefined,
        uid: "",
        confirmationState: {
            confirmedMedicalProfessional: false,
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
        public static setUser = Me.localName("setUser");
        public static resetUser = Me.localName("resetUser");
        public static setState = Me.localName("setState");
        public static setConfirmationState = Me.localName("setConfirmationState");
    }

    const mutations: MutationTree<Me.State> = {
        [Mutations.setUser](state: Me.State, payload: { user: FirebaseAuthHelper.User }) {
            ow(payload.user, "payload.user", ow.object);
            const user = payload.user;
            state.username = user.displayName ? user.displayName : "";
            state.uid = user.uid;
            state.profileImageURL = user.photoURL ? user.photoURL : "";
            Me.validateState(state);
        },

        [Mutations.resetUser](state: Me.State) {
            state.username = undefined;
            state.profileImageURL = undefined;
            Me.validateState(state);
        },

        [Mutations.setState](state: Me.State, payload: { state: Me.AuthState }) {
            ow(
                payload.state,
                "payload.state",
                ow.string.oneOf([Me.AuthState.LOADING, Me.AuthState.AUTHENTICATED, Me.AuthState.NOTAUTHENTICATED]),
            );
            state.state = payload.state;
            Me.validateState(state);
        },

        [Mutations.setConfirmationState](
            state: Me.State,
            payload: {
                confirmedMedicalProfessional: boolean;
                loading: boolean;
                error: string;
            },
        ) {
            ow(payload, "payload", ow.object);
            ow(payload.loading, "payload.loading", ow.boolean);
            ow(payload.confirmedMedicalProfessional, "payload.confirmedMedicalProfessional", ow.boolean);
            ow(payload.error, "payload.error", ow.string);

            state.confirmationState = { ...payload };
            Me.validateState(state);
        },
    };

    /**
     * Actions
     */
    const actions: ActionTree<Me.State, Me.State> = {
        [Me.Actions.initialize]: ({ commit, dispatch, state }): void => {
            commit(Mutations.setState, { state: Me.AuthState.LOADING });
            FirebaseAuthHelper.initialize({
                authenticatedCb: user => {
                    console.log("Authenticated user", user);
                    commit(Mutations.setUser, { user: user as FirebaseAuthHelper.User });
                    commit(Mutations.setState, { state: Me.AuthState.AUTHENTICATED });
                    dispatch(Me.Actions._verifyMedicalProfessional);
                },
                notAuthenticatedCb: () => {
                    console.log("User not authenticated");
                    commit(Mutations.setState, { state: Me.AuthState.NOTAUTHENTICATED });
                    commit(Mutations.setConfirmationState, {
                        confirmedMedicalProfessional: false,
                        loading: false,
                        error: "",
                    });
                },
            });
        },
        [Me.Actions.logout]: ({ commit, dispatch, state }): void => {
            commit(Mutations.setState, { state: Me.AuthState.LOADING });
            (async () => {
                await FirebaseAuthHelper.signOut();
                commit(Mutations.resetUser);
                commit(Mutations.setState, { state: Me.AuthState.NOTAUTHENTICATED });
            })();
        },
        [Me.Actions._verifyMedicalProfessional]: ({ commit, dispatch, state }): void => {
            commit(Mutations.setConfirmationState, { confirmedMedicalProfessional: false, loading: true, error: "" });
            (async () => {
                try {
                    const confResult = await FirebaseAuthHelper.checkIfUserIsConfirmedMedicalProfessional(
                        state.uid, //
                    );
                    commit(Mutations.setConfirmationState, {
                        confirmedMedicalProfessional: confResult,
                        loading: false,
                        error: "",
                    });
                } catch (error) {
                    commit(Mutations.setConfirmationState, {
                        confirmedMedicalProfessional: false,
                        loading: false,
                        error: error + "",
                    });
                }
            })();
        },
    };

    /**
     * Getters
     */
    const getters: GetterTree<Me.State, Me.State> = {
        [Me.Getters.isAuthenticated]: (state: Me.State): boolean => state.state === Me.AuthState.AUTHENTICATED,
        [Me.Getters.isNotAuthenticated]: (state: Me.State): boolean => state.state === Me.AuthState.NOTAUTHENTICATED,
    };

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
