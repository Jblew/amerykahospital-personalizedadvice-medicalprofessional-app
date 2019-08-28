<template>
    <div>
        <augmented-status-component
            :loading="addLoading"
            :error="addOpState.error"
            :success="addResult"
        />
        <augmented-status-component
            :loading="sendSMSLoading"
            :error="sendSMSOpState.error"
            :success="sendSMSResult"
        />

        <v-btn @click="resendSMS" v-if="resendSMSBtnEnabled">{{ text.resendSMS }}</v-btn>
    </div>
</template>

<script lang="ts">
import AugmentedStatusComponent from "@/components/misc/AugmentedErrorComponent.vue";
import Vue from "vue";

import { labels } from "../../global";
import { AdviceModule } from "../../store/modules/advice/AdviceModule";

import AddAdviceForm from "./AddAdviceForm.vue";

export default Vue.extend({
    data() {
        return {
            text: {
                sendingAdvice: labels.sendingAdvice,
                sendingSMS: labels.sendingSMS,
                resendSMS: labels.resendSMS,
            },
        };
    },
    computed: {
        addOpState(): AdviceModule.AddOpState {
            return AdviceModule.stateOf(this).addOp;
        },
        addLoading(): boolean {
            return this.addOpState.loading;
        },
        addResult(): string {
            return this.addOpState.result.log;
        },
        sendSMSOpState(): AdviceModule.SendSMSOpState {
            return AdviceModule.stateOf(this).sendSMSOp;
        },
        sendSMSLoading(): boolean {
            return this.sendSMSOpState.loading;
        },
        sendSMSResult(): string {
            return this.sendSMSOpState.result;
        },
        resendSMSBtnEnabled(): boolean {
            return (this.sendSMSOpState.error || this.sendSMSResult.length > 0) && !this.sendSMSLoading;
        },
        adviceId(): string {
            const loadedId = this.addOpState.result.adviceId;
            return loadedId || labels.idWillBeVisibleAfterAdd;
        },
    },
    methods: {
        resendSMS() {
            AdviceModule.Actions.SendSMS.dispatch(this.$store.dispatch);
        },
    },
    components: {
        AddAdviceForm,
        AugmentedStatusComponent,
    },
});
</script>
<style scoped lang="scss">
</style>