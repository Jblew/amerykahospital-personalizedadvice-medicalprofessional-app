<template>
  <div>
    <v-alert v-if="addLoading" value="true" type="info">{{ text.sendingAdvice }}</v-alert>
    <v-alert v-if="addError.length > 0" value="true" type="error">{{ addError }}</v-alert>
    <v-alert v-if="addResult.length > 0" value="true" type="success">{{ addResult }}</v-alert>

    <v-alert v-if="sendSMSLoading" value="true" type="info">{{ text.sendingSMS }}</v-alert>
    <v-alert v-if="sendSMSError.length > 0" value="true" type="error">{{ sendSMSError }}</v-alert>
    <v-alert v-if="sendSMSResult.length > 0" value="true" type="success">{{ sendSMSResult }}</v-alert>

    <v-btn @click="resendSMS" v-if="resendSMSBtnEnabled">{{ text.resendSMS }}</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { labels, s } from "../../global";
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
        addLoading(): boolean {
            return s(this.$store).state.advice.addOp.loading;
        },
        addError(): string {
            return s(this.$store).state.advice.addOp.error;
        },
        addResult(): string {
            return s(this.$store).state.advice.addOp.result.log;
        },
        sendSMSLoading(): boolean {
            return s(this.$store).state.advice.sendSMSOp.loading;
        },
        sendSMSError(): string {
            return s(this.$store).state.advice.sendSMSOp.error;
        },
        sendSMSResult(): string {
            return s(this.$store).state.advice.sendSMSOp.result;
        },
        resendSMSBtnEnabled(): boolean {
            return (this.sendSMSError.length > 0 || this.sendSMSResult.length > 0) && !this.sendSMSLoading;
        },
        adviceId(): string {
            const loadedId = s(this.$store).state.advice.addOp.result.adviceId;
            return loadedId || labels.idWillBeVisibleAfterAdd;
        },
    },
    methods: {
        resendSMS() {
            s(this.$store).dispatch(AdviceModule.Actions.sendSMS);
        },
    },
    components: {
        AddAdviceForm,
    },
});
</script>
<style scoped lang="scss">
</style>