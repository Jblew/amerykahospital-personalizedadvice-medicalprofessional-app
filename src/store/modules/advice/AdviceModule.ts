// tslint:disable:max-classes-per-file

import ow from "ow";

export namespace AdviceModule {
    export const modulePathName = "advice";
    export function localName(name: string) {
        return modulePathName + "_" + name;
    }

    export interface State {
        addOp: {
            loading: boolean;
            error: string;
            result: string;
        };
    }
    export function validateState(state: State) {
        ow(state.addOp, "state.addOp", ow.object);
        ow(state.addOp.loading, "state.addOp.loading", ow.boolean);
        ow(state.addOp.error, "state.addOp.error", ow.string);
        ow(state.addOp.result, "state.addOp.result", ow.string);
    }

    export class Actions {
        public static addAdvice = localName("addAdvice");
    }

    export class Getters {}
}
