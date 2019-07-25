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
            result: {
                log: string;
                adviceId: string;
            };
        };
        sendSMSOp: {
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
        ow(state.addOp.result, "state.addOp.result", ow.object);
        ow(state.addOp.result.log, "state.addOp.result.log", ow.string);
        ow(state.addOp.result.adviceId, "state.addOp.result.adviceId", ow.string);

        ow(state.sendSMSOp, "state.sendSMSOp", ow.object);
        ow(state.sendSMSOp.loading, "state.sendSMSOp.loading", ow.boolean);
        ow(state.sendSMSOp.error, "state.sendSMSOp.error", ow.string);
        ow(state.sendSMSOp.result, "state.sendSMSOp.result", ow.string);

        ow(state.filter, "state.filter", ow.object);
        ow(state.listLoadingState, "state.listLoadingState", ow.object);
        ow(state.listLoadingState.loading, "state.listLoadingState.loading", ow.boolean);
        ow(state.listLoadingState.error, "state.listLoadingState.error", ow.string);
    }

    export class Actions {
        public static addAdviceAndSendSMS = localName("addAdviceAndSendSMS");
        public static sendSMS = localName("sendSMS");
        public static resetResults = localName("resetResults");
        public static updateQueryFilterAndReloadList = localName("updateQueryFilterAndReloadList");
        public static reloadList = localName("reloadList");
    }

    export class Getters {}
}
