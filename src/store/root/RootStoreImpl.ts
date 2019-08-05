import { ActionContext, ActionTree } from "vuex";

import { mutations } from "./impl_mutations";
import { state } from "./impl_state";
import { RootStore as Me } from "./RootStore";

export namespace RootStoreImpl {
    function constructActions(initActionCb: (context: ActionContext<Me.State, Me.State>) => void) {
        const actions: ActionTree<Me.State, Me.State> = {
            [Me.Actions.initialize]: (context: ActionContext<Me.State, Me.State>): void => {
                setInterval(() => {
                    context.commit(Me.Mutations.updateNowTimer);
                }, 1000);

                initActionCb(context);
            },
        };
        return actions;
    }

    export function constructRootStore(initActionCb: (context: ActionContext<Me.State, Me.State>) => void) {
        const store = {
            actions: constructActions(initActionCb),
            mutations,
            state,
        };
        return store;
    }
}
