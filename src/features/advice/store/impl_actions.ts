// tslint:disable max-classes-per-file no-console
import { AddAdviceAdapter } from "@/adapter/AddAdviceAdapter";
import { SendSMSAdapter } from "@/adapter/SendSMSAdapter";
import { AdviceRepository, PendingAdvice } from "amerykahospital-personalizedadvice-businesslogic";
import { AdviceRepositoryFactory } from "amerykahospital-personalizedadvice-db";
import * as firebase from "firebase/app";
import * as _ from "lodash";
import { ActionTree } from "vuex";
import { NotificationsModule } from "vuex-notifications-module";

import { AdviceModule as Me } from "./AdviceModule";
import { Mutations } from "./Mutations";
import { PrivateActions } from "./PrivateActions";

/**
 *
 * AddAdviceAndSendSMS
 */
class AddAdviceAndSendSMS implements Me.Actions.AddAdviceAndSendSMS.Implementator {
    public getAction(): Me.Actions.AddAdviceAndSendSMS.Declaration {
        return async ({ dispatch }, payload: PendingAdvice) => {
            try {
                await PrivateActions.AddAdvice.dispatch(dispatch, payload);
                await Me.Actions.SendSMS.dispatch(dispatch);
            } catch (error) {
                console.error(error);
                NotificationsModule.Actions.ShowNotification.dispatch(dispatch, {
                    message: "" + error,
                    timeoutMs: 5000,
                    params: { color: "red" },
                });
            }
        };
    }
}

/**
 *
 * SendSMS
 */
class SendSMS implements Me.Actions.SendSMS.Implementator {
    public getAction(): Me.Actions.SendSMS.Declaration {
        return async ({ commit, dispatch, state }, payload?: { adviceId: string }) => {
            try {
                const adviceId = payload ? payload.adviceId : state.addOp.result.adviceId;
                if (!adviceId) throw new Error("Advice must be specified");

                Mutations.SetSendSMSOpState.commit(commit, { loading: true, error: "", result: "" });
                const result = await new SendSMSAdapter().sendSMS({ adviceId });
                Mutations.SetSendSMSOpState.commit(commit, { loading: false, error: "", result: result.message });
                Me.Actions.ReloadList.dispatch(dispatch);
            } catch (error) {
                console.error(error);
                Mutations.SetSendSMSOpState.commit(commit, { loading: false, error: "" + error, result: "" });
            }
        };
    }
}

/**
 *
 * ResetResults
 */
class ResetResults implements Me.Actions.ResetResults.Implementator {
    public getAction(): Me.Actions.ResetResults.Declaration {
        return async ({ commit }) => {
            Mutations.SetAddOpState.commit(commit, { loading: false, error: "", result: { log: "", adviceId: "" } });
            Mutations.SetSendSMSOpState.commit(commit, { loading: false, error: "", result: "" });
        };
    }
}

/**
 *
 * UpdateQueryFilterAndReloadList
 */
class UpdateQueryFilterAndReloadList implements Me.Actions.UpdateQueryFilterAndReloadList.Implementator {
    public getAction(): Me.Actions.UpdateQueryFilterAndReloadList.Declaration {
        return async ({ commit, dispatch }, payload: AdviceRepository.FetchFilter) => {
            Mutations.SetFilter.commit(commit, payload);
            Me.Actions.ReloadList.dispatch(dispatch);
        };
    }
}

/**
 *
 * ReloadList
 */
class ReloadList implements Me.Actions.ReloadList.Implementator {
    public getAction(): Me.Actions.ReloadList.Declaration {
        return async ({ commit, dispatch, state }) => {
            if (state.listLoadingState.loading) return;

            try {
                Mutations.SetListLoadingState.commit(commit, { loading: true, error: "" });
                const adviceRepository = AdviceRepositoryFactory.make(firebase.firestore());
                const loadedList = await adviceRepository.fetchAdvices(state.filter);
                Mutations.SetList.commit(commit, loadedList);
                Mutations.SetListLoadingState.commit(commit, { loading: false, error: "" });
            } catch (error) {
                Mutations.SetListLoadingState.commit(commit, { loading: false, error: "" + error });
            }
        };
    }
}

/**
 *
 * AddAdvice
 */
class AddAdvice implements PrivateActions.AddAdvice.Implementator {
    public getAction(): PrivateActions.AddAdvice.Declaration {
        return async ({ commit, dispatch, state }, payload: PendingAdvice) => {
            try {
                Mutations.SetAddOpState.commit(commit, { loading: true, error: "", result: { log: "", adviceId: "" } });
                const result = await new AddAdviceAdapter().addAdvice(payload);
                Mutations.SetAddOpState.commit(commit, { loading: false, error: "", result });
                Me.Actions.ReloadList.dispatch(dispatch);
            } catch (error) {
                console.error(error);
                Mutations.SetAddOpState.commit(commit, {
                    loading: false,
                    error: "" + error,
                    result: { log: "", adviceId: "" },
                });
            }
        };
    }
}

/**
 *
 * Export of actions
 */
export function constructActions(): ActionTree<Me.State, Me.State> {
    return {
        [Me.Actions.AddAdviceAndSendSMS.name]: new AddAdviceAndSendSMS().getAction(),
        [Me.Actions.SendSMS.name]: new SendSMS().getAction(),
        [Me.Actions.ResetResults.name]: new ResetResults().getAction(),
        [Me.Actions.UpdateQueryFilterAndReloadList.name]: new UpdateQueryFilterAndReloadList().getAction(),
        [Me.Actions.ReloadList.name]: new ReloadList().getAction(),
        [PrivateActions.AddAdvice.name]: new AddAdvice().getAction(),
    };
}
