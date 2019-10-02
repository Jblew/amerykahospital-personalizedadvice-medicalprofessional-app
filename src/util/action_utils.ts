import { CombinedVueInstance } from "vue/types/vue";
import { Action as VuexAction, ActionContext as VuexActionContext, ActionTree, Dispatch } from "vuex";

type ActionFn<STATE_TYPE> = VuexAction<STATE_TYPE, STATE_TYPE>;
type ActionContext<STATE_TYPE> = VuexActionContext<STATE_TYPE, STATE_TYPE>;

export type DispatcherFn<PAYLOAD_TYPE> = (
    dispatchFn: Dispatch | CombinedVueInstance<any, any, any, any, any>, payload: PAYLOAD_TYPE,
) => ReturnType<Dispatch>;

export function dispatcher<PAYLOAD_TYPE>(actionName: string): DispatcherFn<PAYLOAD_TYPE> {
    return (
        dispatchFnOrVueInstance: Dispatch | CombinedVueInstance<any, any, any, any, any>, payload: PAYLOAD_TYPE,
    ) => {
        const dispatch: Dispatch = typeof dispatchFnOrVueInstance === "function" ?
            dispatchFnOrVueInstance : dispatchFnOrVueInstance.$store.dispatch;
        return dispatch(actionName, payload);
    };
}

export type GenericDeclaration<PAYLOAD_TYPE, STATE_TYPE>
    = ActionFn<STATE_TYPE> & ((c: ActionContext<STATE_TYPE>, medicalProfessional: PAYLOAD_TYPE) => void);

export function moduleActionRegistratorFactory<STATE_TYPE>(moduleName: string) {
    return <PAYLOAD_TYPE>(actionName: string) => {
        const dispatch = dispatcher<PAYLOAD_TYPE>(actionName);
        const register = (
            actionTree: ActionTree<STATE_TYPE, STATE_TYPE>, fn: GenericDeclaration<PAYLOAD_TYPE, STATE_TYPE>,
        ) => {
            const actionPath = `${moduleName}_${actionName}`;
            actionTree[actionPath] = fn;
        };
        return Object.freeze({ dispatch, register });
    };
}
