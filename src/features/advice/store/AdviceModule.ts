// tslint:disable:max-classes-per-file

import { ResourceStatus } from "@/util/ResourceStatus";
import { Advice, AdviceRepository, PendingAdvice } from "amerykahospital-personalizedadvice-businesslogic";
import ow from "ow--fork-by-jblew-with-catching";
import { CombinedVueInstance } from "vue/types/vue";
import { Action as VuexAction, ActionContext as VuexActionContext, Dispatch } from "vuex";

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
        addOp: ResourceStatus<AddOpResult>;
        sendSMSOp: ResourceStatus<SendSMSOpResult>;
        list: ResourceStatus<Advice []>;
        filter: AdviceRepository.FetchFilter;
    }

    export namespace State {
        export function validate(state: State) {
            ResourceStatus.validate(state.addOp, "state.addOp", AddOpResult.validate);
            ResourceStatus.validate(state.sendSMSOp, "state.sendSMSOp", SendSMSOpResult.validate);
            ResourceStatus.validate(
                state.list,
                "state.list",
                l => ow(l, "list[]", ow.array.ofType(ow.object)),
            );
            ow(state.filter, "state.filter", ow.object);
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

            export type Payload = AdviceRepository.FetchFilter;
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
     * AddOpResult
     */
    export interface AddOpResult {
        log: string;
        adviceId: string;
    }

    export namespace AddOpResult {
        export function validate(a: AddOpResult) {
            ow(a.log, "AddOpResult.log", ow.string);
            ow(a.adviceId, "AddOpResult.adviceId", ow.string);
        }
    }

    /**
     *
     * SendSMSOpResult
     */
    export interface SendSMSOpResult {
        message: string;
    }

    export namespace SendSMSOpResult {
        export function validate(o: SendSMSOpResult) {
            ow(o.message, "SendSMSOpResult.message", ow.string);
        }
    }

    /**
     * State tye guard
     */
    export function stateOf(vueInstance: CombinedVueInstance<any, any, any, any, any>): State {
        return vueInstance.$store.state[modulePathName];
    }
}
