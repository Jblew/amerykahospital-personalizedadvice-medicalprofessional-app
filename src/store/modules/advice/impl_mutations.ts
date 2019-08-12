import { Advice, AdviceRepository } from "amerykahospital-personalizedadvice-core";
import ow from "ow";
import { MutationTree } from "vuex";

import { AdviceModule as Me } from "./AdviceModule";
import { Mutations } from "./Mutations";

export function constructMutations(): MutationTree<Me.State> {
    const setAddOpState: Mutations.SetAddOpState.Declaration = (state: Me.State, payload: Me.AddOpState) => {
        Me.AddOpState.validate(payload);

        state.addOp = payload;
        Me.State.validate(state);
    };

    const setSendSMSOpState: Mutations.SetSendSMSOpState.Declaration = (
        state: Me.State,
        payload: Me.SendSMSOpState,
    ) => {
        Me.SendSMSOpState.validate(payload);

        state.sendSMSOp = payload;
        Me.State.validate(state);
    };

    const setListLoadingState: Mutations.SetListLoadingState.Declaration = (
        state: Me.State,
        payload: Me.ListLoadingState,
    ) => {
        Me.ListLoadingState.validate(payload);

        state.listLoadingState = payload;
        Me.State.validate(state);
    };

    const setList: Mutations.SetList.Declaration = (state: Me.State, payload: Advice[]) => {
        ow(payload, "payload", ow.array.ofType(ow.object));

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
        [Mutations.SetListLoadingState.name]: setListLoadingState,
        [Mutations.SetList.name]: setList,
        [Mutations.SetFilter.name]: setFilter,
    };

    return mutations;
}
