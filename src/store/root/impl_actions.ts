import { ActionTree } from "vuex";
import { NotificationsModule } from "vuex-notifications-module";

import { AuthModule } from "../modules/auth/AuthModule";

import { RootStore as Me } from "./RootStore";

export const actions: ActionTree<Me.State, Me.State> = {
    [Me.Actions.initialize]: ({ commit, dispatch }): void => {
        dispatch(AuthModule.Actions.initialize);
        NotificationsModule.Actions.Initialize.dispatch(dispatch);

        setInterval(() => {
            commit(Me.Mutations.updateNowTimer);
        }, 1000);
    },
};
