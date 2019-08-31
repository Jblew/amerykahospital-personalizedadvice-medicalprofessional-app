// tslint:disable max-classes-per-file no-console
import { AddAdviceAdapter } from "@/adapter/AddAdviceAdapter";
import { SendSMSAdapter } from "@/adapter/SendSMSAdapter";
import { ResourceStatus } from "@/util/ResourceStatus";
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
                const adviceId = payload ? payload.adviceId : state.addOp.result ? state.addOp.result.adviceId : "";
                if (!adviceId) throw new Error("Advice must be specified");

                Mutations.SetSendSMSOpState.commit(commit, ResourceStatus.loading());
                const result = await new SendSMSAdapter().sendSMS({ adviceId });
                Mutations.SetSendSMSOpState.commit(commit, ResourceStatus.success({ message: result.message }));
                Me.Actions.ReloadList.dispatch(dispatch);
            } catch (error) {
                console.error(error);
                Mutations.SetSendSMSOpState.commit(commit, ResourceStatus.error(error));
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
            Mutations.SetAddOpState.commit(commit, ResourceStatus.empty());
            Mutations.SetSendSMSOpState.commit(commit, ResourceStatus.empty());
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
            if (state.list.loading) return;

            try {
                Mutations.SetList.commit(commit, ResourceStatus.loading());
                const adviceRepository = AdviceRepositoryFactory.make(firebase.firestore());
                const loadedList = await adviceRepository.fetchAdvices(state.filter);
                Mutations.SetList.commit(commit, ResourceStatus.success(loadedList));
            } catch (error) {
                Mutations.SetList.commit(commit, ResourceStatus.error(error));
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
                Mutations.SetAddOpState.commit(commit, ResourceStatus.loading());
                const result = await new AddAdviceAdapter().addAdvice(payload);
                Mutations.SetAddOpState.commit(commit, ResourceStatus.success(result));
                Me.Actions.ReloadList.dispatch(dispatch);
            } catch (error) {
                console.error(error);
                Mutations.SetAddOpState.commit(commit, ResourceStatus.error(error));
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
