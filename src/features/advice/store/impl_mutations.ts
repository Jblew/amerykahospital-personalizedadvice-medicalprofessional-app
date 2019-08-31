import { ResourceStatus } from "@/util/ResourceStatus";
import { Advice, AdviceRepository } from "amerykahospital-personalizedadvice-businesslogic";
import ow from "ow--fork-by-jblew-with-catching";
import { MutationTree } from "vuex";

import { AdviceModule as Me } from "./AdviceModule";
import { Mutations } from "./Mutations";

export function constructMutations(): MutationTree<Me.State> {
    const setAddOpState: Mutations.SetAddOpState.Declaration = (
        state: Me.State, payload: ResourceStatus<Me.AddOpResult>
    ) => {
        ResourceStatus.validate(payload, "Mutations.SetAddOpState.payload", Me.AddOpResult.validate);

        state.addOp = payload;
        Me.State.validate(state);
    };

    const setSendSMSOpState: Mutations.SetSendSMSOpState.Declaration = (
        state: Me.State,
        payload: ResourceStatus<Me.SendSMSOpResult>,
    ) => {
        ResourceStatus.validate(payload, "Mutations.SetSendSMSOpState.payload", Me.SendSMSOpResult.validate);

        state.sendSMSOp = payload;
        Me.State.validate(state);
    };

    const setList: Mutations.SetList.Declaration = (
        state: Me.State,
        payload: ResourceStatus<Advice []>,
    ) => {
        ResourceStatus.validate(payload, "Mutations.SetList.payload", (v) => ow(v, ow.array.ofType(ow.object)));

        state.list = payload;
        Me.State.validate(state);
    };

    const setFilter: Mutations.SetFilter.Declaration = (state: Me.State, payload: AdviceRepository.FetchFilter) => {
        ow(payload, "payload", ow.object);

        state.filter = payload;
        Me.State.validate(state);
    };

    const mutations: MutationTree<Me.State> = {
        [Mutations.SetAddOpState.name]: setAddOpState,
        [Mutations.SetSendSMSOpState.name]: setSendSMSOpState,
        [Mutations.SetList.name]: setList,
        [Mutations.SetFilter.name]: setFilter,
    };

    return mutations;
}
