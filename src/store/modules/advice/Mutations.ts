import { Advice, AdviceRepository } from "amerykahospital-personalizedadvice-businesslogic";
import { Commit, Mutation as VuexMutation } from "vuex";

import { AdviceModule as Me } from "./AdviceModule";

type MutationFn = VuexMutation<Me.State>;

export namespace Mutations {
    export namespace SetAddOpState {
        export const name = Me.localName("setAddOpState");

        export type Payload = Me.AddOpState;
        export type Declaration = MutationFn & ((state: Me.State, payload: Payload) => void);

        export function commit(commitFn: Commit, payload: Payload) {
            return commitFn(name, payload);
        }
    }

    export namespace SetSendSMSOpState {
        export const name = Me.localName("setSendSMSOpState");

        export type Payload = Me.SendSMSOpState;
        export type Declaration = MutationFn & ((state: Me.State, payload: Payload) => void);

        export function commit(commitFn: Commit, payload: Payload) {
            return commitFn(name, payload);
        }
    }

    export namespace SetListLoadingState {
        export const name = Me.localName("setListLoadingState");

        export type Payload = Me.ListLoadingState;
        export type Declaration = MutationFn & ((state: Me.State, payload: Payload) => void);

        export function commit(commitFn: Commit, payload: Payload) {
            return commitFn(name, payload);
        }
    }

    export namespace SetList {
        export const name = Me.localName("setList");

        export type Payload = Advice[];
        export type Declaration = MutationFn & ((state: Me.State, payload: Payload) => void);

        export function commit(commitFn: Commit, payload: Payload) {
            return commitFn(name, payload);
        }
    }

    export namespace SetFilter {
        export const name = Me.localName("setFilter");

        export type Payload = AdviceRepository.FetchFilter;
        export type Declaration = MutationFn & ((state: Me.State, payload: Payload) => void);

        export function commit(commitFn: Commit, payload: Payload) {
            return commitFn(name, payload);
        }
    }
}
