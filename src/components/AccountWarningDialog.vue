<template>
  <div>
    <v-dialog v-model="dialogOpened" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ text.yourAccountIsNotConfirmed }}</span>
        </v-card-title>
        <v-card-text>
          <p>{{ text.yourAccountIsNotConfirmedAdMedicalprofessionalExplanation }}</p>
          <p class="text-center">
            <v-btn
              :disabled="requestState.loading || requestState.success || isRequestingTheRole"
              color="primary"
              @click="requestRole()"
            >{{ text.requestAnAccess }}</v-btn>
          </p>
          <p class="text-center" v-if="requestState.loading">
            <loading-indicator />
          </p>
          <p v-if="requestState.error.length > 0">
            <v-alert type="error">{{ requestState.error }}</v-alert>
          </p>
          <p v-if="requestState.success">
            <v-alert type="success">{{ text.requestAccessSuccess }}</v-alert>
          </p>
          <p v-if="isRequestingTheRole">
            <v-alert type="info">{{ text.alreadyRequestingTheRole }}</v-alert>
          </p>
          <p>{{ text.requestAccessExplanation }}</p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
// tslint:disable no-console
import AddAdvicePanel from "@/components/add-advice/AddAdvicePanel.vue";
import AdviceListPanel from "@/components/advice-list/AdviceListPanel.vue";
import { RolesAuthModule } from "firestore-roles-vuex-module";
import Vue from "vue";

import { RoleKey } from "../../../amerykahospital-personalizedadvice-core/src";
import { FirestoreRolesAdapter } from "../adapter/FirestoreRolesAdapter";
import { labels } from "../global";

export default Vue.extend({
    data() {
        return {
            dialog: false,
            text: {
                yourAccountIsNotConfirmed: labels.yourAccountIsNotConfirmed,
                yourAccountIsNotConfirmedAdMedicalprofessionalExplanation:
                    labels.yourAccountIsNotConfirmedAdMedicalprofessionalExplanation,
                close: labels.close,
                requestAnAccess: labels.requestAnAccess,
                requestAccessExplanation: labels.requestAccessExplanation,
                requestAccessSuccess: labels.requestAccessSuccess,
                alreadyRequestingTheRole: labels.alreadyRequestingTheRole,
            },
            requestState: {
                loading: false,
                error: "",
                success: false,
            },
        };
    },
    computed: {
        userIsNotMedicalProfessional(): boolean {
            return (
                RolesAuthModule.stateOf(this).state === RolesAuthModule.AuthState.AUTHENTICATED &&
                RolesAuthModule.stateOf(this).roles[RoleKey.medicalprofessional] === false
            );
        },
        isRequestingTheRole(): boolean {
            return RolesAuthModule.stateOf(this).roleRequests[RoleKey.medicalprofessional] === true;
        },
        dialogOpened(): boolean {
            return this.userIsNotMedicalProfessional;
        },
        account() {
            return RolesAuthModule.stateOf(this).account;
        },
        uid(): string {
            return this.account ? this.account.uid || "" : "";
        },
    },
    methods: {
        requestRole() {
            (async () => {
                this.requestState.loading = true;
                this.requestState.success = false;
                this.requestState.error = "";
                try {
                    await FirestoreRolesAdapter.getInstance().requestRole(this.uid, RoleKey.medicalprofessional);
                    this.requestState.success = true;
                } catch (error) {
                    console.error(error);
                    this.requestState.error = error.message;
                }
                this.requestState.loading = false;

                if (this.userIsNotMedicalProfessional) {
                    setTimeout(() => this.$checkRoleAgain(), 2500);
                }
            })();
        },
        $checkRoleAgain() {
            RolesAuthModule.Actions.CheckRole.dispatch(this.$store.dispatch, RoleKey.medicalprofessional);
            this.requestState.success = false;
        },
    },
    components: {
        AdviceListPanel,
        AddAdvicePanel,
    },
});
</script>
<style scoped lang="scss">
.add-btn {
    margin-bottom: 5em;
    margin-right: 4em;
}
</style>