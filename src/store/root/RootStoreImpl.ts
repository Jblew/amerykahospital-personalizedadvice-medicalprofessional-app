import { actions } from "./impl_actions";
import { mutations } from "./impl_mutations";
import { state } from "./impl_state";

export namespace RootStoreImpl {
    export const store = {
        actions,
        mutations,
        state,
    };
}
