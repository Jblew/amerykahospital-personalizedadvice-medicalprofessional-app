<template>
  <div>
    <v-dialog v-model="dialogOpened" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ text.yourAccountIsNotConfirmed }}</span>
        </v-card-title>
        <v-card-text>
          <p>{{ text.yourAccountIsNotConfirmedAdMedicalprofessionalExplanation }}</p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import AddAdvicePanel from "@/components/add-advice/AddAdvicePanel.vue";
import AdviceListPanel from "@/components/advice-list/AdviceListPanel.vue";
import { RolesAuthModule } from "firestore-roles-vuex-module";
import Vue from "vue";

import { RoleKey } from "../../../amerykahospital-personalizedadvice-core/src";
import { labels } from "../global";

export default Vue.extend({
    name: "ListView",
    data() {
        return {
            dialog: false,
            text: {
                yourAccountIsNotConfirmed: labels.yourAccountIsNotConfirmed,
                yourAccountIsNotConfirmedAdMedicalprofessionalExplanation:
                    labels.yourAccountIsNotConfirmedAdMedicalprofessionalExplanation,
                close: labels.close,
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
        dialogOpened(): boolean {
            return this.userIsNotMedicalProfessional;
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