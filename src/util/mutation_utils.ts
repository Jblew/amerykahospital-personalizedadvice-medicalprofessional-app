import { Commit, Mutation as VuexMutation, MutationTree } from "vuex";

type MutationFn<STATE_TYPE> = VuexMutation<STATE_TYPE>;
type CommiterFn<PAYLOAD_TYPE> = (commitFn: Commit, payload: PAYLOAD_TYPE) => ReturnType<Commit>;

export function commiter<PAYLOAD_TYPE>(mutationName: string): CommiterFn<PAYLOAD_TYPE> {
    return (commitFn: Commit, payload: PAYLOAD_TYPE) => commitFn(mutationName, payload);
}

export type GenericDeclaration<PAYLOAD_TYPE, STATE_TYPE>
    = MutationFn<STATE_TYPE> & ((state: STATE_TYPE, payload: PAYLOAD_TYPE) => void);

export interface MutationSetterContext<PAYLOAD_TYPE, STATE_TYPE> {
    payload: PAYLOAD_TYPE;
    state: STATE_TYPE;
}

export type MutationSetterFn<PAYLOAD_TYPE, STATE_TYPE>
    = (context: MutationSetterContext<PAYLOAD_TYPE, STATE_TYPE>) => void;

export function moduleMutationFactory<STATE_TYPE>(
    moduleName: string, stateValidator: (state: STATE_TYPE) => void, mutations: MutationTree<STATE_TYPE>,
) {
    return <PAYLOAD_TYPE>(mutationName: string) => {
        return (setterFn: MutationSetterFn<PAYLOAD_TYPE, STATE_TYPE>): CommiterFn<PAYLOAD_TYPE> => {
            const name = `${moduleName}_${mutationName}`;
            const mutation: GenericDeclaration<PAYLOAD_TYPE, STATE_TYPE> = (state: STATE_TYPE, payload: PAYLOAD_TYPE) => {
                setterFn({ state, payload });
                stateValidator(state);
            };
            mutations[name] = mutation;
            return commiter<PAYLOAD_TYPE>(name);
        };
    };
}
