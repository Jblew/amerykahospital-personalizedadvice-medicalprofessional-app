import { PendingAdvice } from "amerykahospital-personalizedadvice-core";
import { Action as VuexAction, ActionContext as VuexActionContext, Dispatch } from "vuex";

import { AdviceModule as Me } from "./AdviceModule";

type ActionFn = VuexAction<Me.State, Me.State>;
type ActionContext = VuexActionContext<Me.State, Me.State>;

export namespace PrivateActions {
    export namespace AddAdvice {
        export const name = Me.localName("addAdvice");

        export type Payload = PendingAdvice;
        export type Declaration = ActionFn & ((c: ActionContext, advice: Payload) => void);
        export interface Implementator {
            getAction(): Declaration;
        }

        export function dispatch(dispatchFn: Dispatch, payload: Payload) {
            return dispatchFn(name, payload);
        }
    }
}
