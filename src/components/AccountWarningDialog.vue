<template>
  <div>
    <v-dialog v-model="dialogOpened" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ text.yourAccountIsNotConfirmed }}</span>
        </v-card-title>
        <v-card-text>
          <p
            style="color-red"
            v-if="errorCheckingConfirmation.length > 0"
          >{{ errorCheckingConfirmation }}</p>
          <p>{{ text.yourAccountIsNotConfirmedAdMedicalprofessionalExplanation }}</p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import AddAdvicePanel from "@/components/add-advice/AddAdvicePanel.vue";
import AdviceListPanel from "@/components/advice-list/AdviceListPanel.vue";
import Vue from "vue";

import { labels, s } from "../global";
import { AuthModule } from "../store/modules/auth/AuthModule";

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
        dialogOpened(): boolean {
            return (
                s(this.$store).state.auth.state === AuthModule.AuthState.AUTHENTICATED &&
                !s(this.$store).state.auth.confirmationState.loading &&
                (!s(this.$store).state.auth.confirmationState.confirmedMedicalProfessional ||
                    s(this.$store).state.auth.confirmationState.error.length > 0)
            );
        },
        errorCheckingConfirmation(): string {
            return s(this.$store).state.auth.confirmationState.error;
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