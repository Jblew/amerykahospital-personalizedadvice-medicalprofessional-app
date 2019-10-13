<template>
    <fab-activated-dialog-card
        :max-width="600"
        :tooltip="enabled ? text.sendAdvice : text.pleaseProvideEvidenceId"
        :dialog-title="text.sendAdvice"
        @closeDialog="closeDialog()"
        :disabled="!enabled"
    >
        <v-container fluid fill-height>
            <v-layout justify-center align-start>
                <v-flex>
                    <add-advice-panel />
                </v-flex>
            </v-layout>
        </v-container>
    </fab-activated-dialog-card>
</template>

<script lang="ts">
import { labels } from "@/global";
import Vue from "vue";

import { AdviceModule } from "../../store/AdviceModule";
import AddAdvicePanel from "../add-advice/AddAdvicePanel.vue";

export default Vue.extend({
    data() {
        return {
            text: {
                sendAdvice: labels.sendAdvice,
                pleaseProvideEvidenceId: labels.pleaseProvideEvidenceIdBeforeYouAddAdvice,
            },
        };
    },
    computed: {
        enabled() {
            return !!AdviceModule.stateOf(this).filter.evidenceHash;
        },
    },
    methods: {
        closeDialog() {
            AdviceModule.Actions.ResetResults.dispatch(this.$store.dispatch);
        },
    },
    components: {
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
