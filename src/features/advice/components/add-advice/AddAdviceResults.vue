<template>
    <div>
        <v-alert v-if="addLoading" :value="true" type="info">{{ text.sendingAdvice }}</v-alert>
        <v-alert v-if="addError.length > 0" :value="true" type="error">{{ addError }}</v-alert>
        <v-alert v-if="addResult.length > 0" :value="true" type="success">{{ addResult }}</v-alert>

        <v-alert v-if="sendSMSLoading" :value="true" type="info">{{ text.sendingSMS }}</v-alert>
        <v-alert v-if="sendSMSError.length > 0" :value="true" type="error">{{ sendSMSError }}</v-alert>
        <v-alert v-if="sendSMSResult.length > 0" :value="true" type="success">{{ sendSMSResult }}</v-alert>

        <v-btn @click="resendSMS" v-if="resendSMSBtnEnabled">{{ text.resendSMS }}</v-btn>
    </div>
</template>

<script lang="ts">
import { labels } from "@/global";
import Vue from "vue";

import { AdviceModule } from "../../store/AdviceModule";

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
        addOpState() {
            return AdviceModule.stateOf(this).addOp;
        },
        addLoading(): boolean {
            return this.addOpState.loading;
        },
        addError(): string {
            return this.addOpState.error;
        },
        addResult(): string {
            return this.addOpState.result.log;
        },
        sendSMSOpState() {
            return AdviceModule.stateOf(this).sendSMSOp;
        },
        sendSMSLoading(): boolean {
            return this.sendSMSOpState.loading;
        },
        sendSMSError(): string {
            return this.sendSMSOpState.error;
        },
        sendSMSResult(): string {
            return this.sendSMSOpState.result;
        },
        resendSMSBtnEnabled(): boolean {
            return (this.sendSMSError.length > 0 || this.sendSMSResult.length > 0) && !this.sendSMSLoading;
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
    },
});
</script>
<style scoped lang="scss">
</style>