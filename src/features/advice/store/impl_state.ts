import { AdviceModule as Me } from "./AdviceModule";

export const state: Me.State = {
    addOp: {
        loading: false,
        error: "",
        result: {
            log: "",
            adviceId: "",
        },
    },
    sendSMSOp: {
        loading: false,
        error: "",
        result: "",
    },
    listLoadingState: {
        loading: false,
        error: "",
    },
    filter: { medicalprofessionalName: "INITIAL_VALUE_TO_BE_CHANGED" },
    list: [],
};
Me.State.validate(state);
