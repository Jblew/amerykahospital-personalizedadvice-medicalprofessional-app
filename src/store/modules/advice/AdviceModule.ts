// tslint:disable:max-classes-per-file

import { Advice, AdvicesManager, PendingAdvice } from "amerykahospital-personalizedadvice-core";
import ow from "ow";
import { CombinedVueInstance } from "vue/types/vue";
import { Action as VuexAction, ActionContext as VuexActionContext, Dispatch } from "vuex";

import { ow_catch } from "../../../util/util";

type ActionFn = VuexAction<AdviceModule.State, AdviceModule.State>;
type ActionContext = VuexActionContext<AdviceModule.State, AdviceModule.State>;

export namespace AdviceModule {
    export const modulePathName = "advice";
    export function localName(name: string) {
        return modulePathName + "_" + name;
    }

    /**
     *
     * State
     */
    export interface State {
        addOp: AddOpState;
        sendSMSOp: SendSMSOpState;
        listLoadingState: ListLoadingState;
        filter: AdvicesManager.FetchFilter;
        list: Advice[];
    }
    export namespace State {
        export function validate(state: State) {
            ow(state.addOp, "state.addOp", ow.object.is(v => ow_catch(() => AddOpState.validate(v as AddOpState))));
            ow(
                state.sendSMSOp,
                "state.sendSMSOp",
                ow.object.is(v => ow_catch(() => SendSMSOpState.validate(v as SendSMSOpState))),
            );

            ow(
                state.listLoadingState,
                "state.listLoadingState",
                ow.object.is(v => ow_catch(() => ListLoadingState.validate(v as ListLoadingState))),
            );

            ow(state.filter, "state.filter", ow.object);

            ow(state.listLoadingState, "state.listLoadingState", ow.object);
            ow(state.listLoadingState.loading, "state.listLoadingState.loading", ow.boolean);
            ow(state.listLoadingState.error, "state.listLoadingState.error", ow.string);
        }
    }

    /**
     *
     * Actions
     */
    export namespace Actions {
        export namespace AddAdviceAndSendSMS {
            export const name = localName("addAdviceAndSendSMS");

            export type Payload = PendingAdvice;
            export type Declaration = ActionFn & ((c: ActionContext, advice: Payload) => void);
            export interface Implementator {
                getAction(): Declaration;
            }

            export function dispatch(dispatchFn: Dispatch, payload: Payload) {
                return dispatchFn(name, payload);
            }
        }

        export namespace SendSMS {
            export const name = localName("sendSMS");

            export interface Payload {
                adviceId: string;
            }
            export type Declaration = ActionFn & ((c: ActionContext, payload?: Payload) => void);
            export interface Implementator {
                getAction(): Declaration;
            }

            export function dispatch(dispatchFn: Dispatch, payload?: Payload) {
                return dispatchFn(name, payload);
            }
        }

        export namespace ResetResults {
            export const name = localName("resetResults");
            export type Declaration = ActionFn & ((c: ActionContext) => void);
            export interface Implementator {
                getAction(): Declaration;
            }

            export function dispatch(dispatchFn: Dispatch) {
                return dispatchFn(name);
            }
        }

        export namespace UpdateQueryFilterAndReloadList {
            export const name = localName("updateQueryFilterAndReloadList");

            export type Payload = AdvicesManager.FetchFilter;
            export type Declaration = ActionFn & ((c: ActionContext, payload: Payload) => void);
            export interface Implementator {
                getAction(): Declaration;
            }

            export function dispatch(dispatchFn: Dispatch, payload: Payload) {
                return dispatchFn(name, payload);
            }
        }

        export namespace ReloadList {
            export const name = localName("reloadList");

            export type Declaration = ActionFn & ((c: ActionContext) => void);
            export interface Implementator {
                getAction(): Declaration;
            }

            export function dispatch(dispatchFn: Dispatch) {
                return dispatchFn(name);
            }
        }
    }

    /**
     *
     * AddOpState
     */
    export interface AddOpState {
        loading: boolean;
        error: string;
        result: {
            log: string;
            adviceId: string;
        };
    }

    export namespace AddOpState {
        export function validate(a: AddOpState) {
            ow(a.loading, "AddOpState.loading", ow.boolean);
            ow(a.error, "AddOpState.error", ow.string);
            ow(a.result, "AddOpState.result", ow.object);
            ow(a.result.log, "AddOpState.result.log", ow.string);
            ow(a.result.adviceId, "AddOpState.result.adviceId", ow.string);
        }
    }

    /**
     *
     * SendSMSOpState
     */
    export interface SendSMSOpState {
        loading: boolean;
        error: string;
        result: string;
    }

    export namespace SendSMSOpState {
        export function validate(o: SendSMSOpState) {
            ow(o.loading, "SendSMSOpState.loading", ow.boolean);
            ow(o.error, "SendSMSOpState.error", ow.string);
            ow(o.result, "SendSMSOpState.result", ow.string);
        }
    }

    /**
     *
     * ListLoadingState
     */
    export interface ListLoadingState {
        loading: boolean;
        error: string;
    }

    export namespace ListLoadingState {
        export function validate(o: ListLoadingState) {
            ow(o.loading, "ListLoadingState.loading", ow.boolean);
            ow(o.error, "ListLoadingState.error", ow.string);
        }
    }

    /**
     * State tye guard
     */
    export function stateOf(vueInstance: CombinedVueInstance<any, any, any, any, any>): State {
        return vueInstance.$store.state[modulePathName];
    }
}
