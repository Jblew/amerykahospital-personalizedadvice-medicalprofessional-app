// tslint:disable:max-classes-per-file

import { Advice, AdvicesManager } from "amerykahospital-personalizedadvice-core";
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
        listLoadingState: {
            loading: boolean;
            error: string;
        };
        filter: AdvicesManager.FetchFilter;
        list: Advice[];
    }
    export function validateState(state: State) {
        ow(state.addOp, "state.addOp", ow.object);
        ow(state.addOp.loading, "state.addOp.loading", ow.boolean);
        ow(state.addOp.error, "state.addOp.error", ow.string);
        ow(state.addOp.result, "state.addOp.result", ow.string);

        ow(state.filter, "state.filter", ow.object);
        ow(state.listLoadingState, "state.listLoadingState", ow.object);
        ow(state.listLoadingState.loading, "state.listLoadingState.loading", ow.boolean);
        ow(state.listLoadingState.error, "state.listLoadingState.error", ow.string);
    }

    export class Actions {
        public static addAdvice = localName("addAdvice");
        public static updateQueryFilterAndReloadList = localName("updateQueryFilterAndReloadList");
        public static reloadList = localName("reloadList");
    }

    export class Getters {}
}
