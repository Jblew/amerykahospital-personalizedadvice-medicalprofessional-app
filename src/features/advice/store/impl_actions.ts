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
import { RolesAuthModule } from "firestore-roles-vuex-module";

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
                console.error("AddAdviceAndSendSMS action handler error", error);
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
            const adviceId = payload ? payload.adviceId : state.addOp.result ? state.addOp.result.adviceId : "";
            if (!adviceId) throw new Error("Advice must be specified");

            await ResourceStatus.fetchResource(
                "SendSMSAdapter.sendSMS",
                async () => await new SendSMSAdapter().sendSMS({ adviceId }),
                status => Mutations.SetSendSMSOpState.commit(commit, status),
            );

            Me.Actions.ReloadList.dispatch(dispatch);
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
            console.log("Filter", payload);
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
        return async ({ commit, dispatch, state, rootState }) => {
            if (state.list.loading) return;

            const filter: AdviceRepository.FetchFilter = this.getFilterForCurrentMedicalprofessional(state, rootState);

            const adviceRepository = AdviceRepositoryFactory.make(firebase.firestore());
            await ResourceStatus.fetchResource(
                "AdviceRepository.fetchAdvices",
                async () => await adviceRepository.fetchAdvices(filter),
                status => Mutations.SetList.commit(commit, status),
            );
        };
    }

    private getFilterForCurrentMedicalprofessional(state: Me.State, rootState: any): AdviceRepository.FetchFilter {
        const currentAccount = (rootState.roles_auth as RolesAuthModule.State).account;
        if (!currentAccount) throw new Error("User must be logged in to reloadList");
        return { ...state.filter, authorUid: currentAccount.uid };
    }
}

/**
 *
 * AddAdvice
 */
class AddAdvice implements PrivateActions.AddAdvice.Implementator {
    public getAction(): PrivateActions.AddAdvice.Declaration {
        return async ({ commit, dispatch, state }, payload: PendingAdvice) => {
            async function doAddAdvice() {
                if (!state.filter.evidenceHash) {
                    throw new Error("To send advice you must set evidenceHash filter first");
                }
                const pendingAdvice = {
                    ...payload,
                    evidenceHash: state.filter.evidenceHash,
                };
                return await new AddAdviceAdapter().addAdvice(pendingAdvice);
            }

            await ResourceStatus.fetchResource(
                "AddAdviceAdapter.addAdvice",
                async () => await doAddAdvice(),
                status => Mutations.SetAddOpState.commit(commit, status),
            );
            Me.Actions.ReloadList.dispatch(dispatch);
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
