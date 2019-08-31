import { ResourceStatus } from "@/util/ResourceStatus";
import { Advice, AdviceRepository } from "amerykahospital-personalizedadvice-businesslogic";
import { Commit, Mutation as VuexMutation } from "vuex";

import { AdviceModule as Me } from "./AdviceModule";

type MutationFn = VuexMutation<Me.State>;

export namespace Mutations {
    export namespace SetAddOpState {
        export const name = Me.localName("setAddOpState");

        export type Payload = ResourceStatus<Me.AddOpResult>;
        export type Declaration = MutationFn & ((state: Me.State, payload: Payload) => void);

        export function commit(commitFn: Commit, payload: Payload) {
            return commitFn(name, payload);
        }
    }

    export namespace SetSendSMSOpState {
        export const name = Me.localName("setSendSMSOpState");

        export type Payload =  ResourceStatus<Me.SendSMSOpResult>;
        export type Declaration = MutationFn & ((state: Me.State, payload: Payload) => void);

        export function commit(commitFn: Commit, payload: Payload) {
            return commitFn(name, payload);
        }
    }

    export namespace SetList {
        export const name = Me.localName("setList");

        export type Payload =  ResourceStatus<Advice []>;
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
