<template>
    <v-form ref="form" v-model="valid">
        <v-text-field
            :value="professionalName"
            :rules="professionalNameRules"
            :label="text.professionalName"
            :disabled="true"
            required
        ></v-text-field>

        <v-text-field
            v-model="patientName"
            :rules="patientNameRules"
            :label="text.patientName"
            required
        ></v-text-field>

        <v-text-field
            v-model="parentPhoneNumber"
            :rules="parentPhoneNumberRules"
            :label="text.parentPhoneNumber"
            required
        ></v-text-field>

        <p>&nbsp;</p>

        <v-textarea solo v-model="advice" :rules="adviceRules" :label="text.advice" required></v-textarea>

        <v-text-field
            v-model="adviceId"
            valid="true"
            :label="text.adviceCode"
            disabled
            readonly
            filled
        ></v-text-field>

        <v-btn
            :disabled="!valid"
            color="success"
            @click="validateAndAddAdvice"
        >{{ text.sendAdvice }}</v-btn>
    </v-form>
</template>

<script lang="ts">
import { labels } from "@/global";
import { ResourceStatus } from "@/util/ResourceStatus";
import { PendingAdvice } from "amerykahospital-personalizedadvice-businesslogic";
import { RolesAuthModule } from "firestore-roles-vuex-module";
import Vue from "vue";

import { AdviceModule } from "../../store/AdviceModule";

const phoneNumberRegex = /^[0-9]{9}$/;

export default Vue.extend({
    data() {
        return {
            text: {
                sendAdvice: labels.sendAdvice,
                professionalName: labels.professionalName,
                patientName: labels.patientName,
                parentPhoneNumber: labels.parentPhoneNumber,
                advice: labels.advice,
                resetForm: labels.resetForm,
                sendingAdvice: labels.sendingAdvice,
                adviceCode: labels.adviceCode,
            },
            valid: true,
            professionalNameRules: [(v: string) => !!v || labels.requiredField],
            patientName: "",
            patientNameRules: [(v: string) => !!v || labels.requiredField],
            parentPhoneNumber: "",
            parentPhoneNumberRules: [
                (v: string) => !!v || labels.requiredField,
                (v: string) => (v && phoneNumberRegex.test(v)) || labels.phoneNumberMustBeValid,
            ],
            advice: "",
            adviceRules: [(v: string) => !!v || labels.requiredField],
        };
    },
    mounted() {
        this.patientName = "";
        this.parentPhoneNumber = "";
        this.advice = "";
    },
    computed: {
        professionalName(): string {
            const account = RolesAuthModule.stateOf(this).account;
            return (account ? account.displayName : "") || "";
        },
        adviceId(): string {
            const loadedId = ResourceStatus.resultOrDefault(AdviceModule.stateOf(this).addOp, { adviceId: "" })
                .adviceId;
            return loadedId || labels.idWillBeVisibleAfterAdd;
        },
    },
    methods: {
        validateAndAddAdvice() {
            if ((this.$refs.form as any).validate()) {
                this.addAdvice();
            }
        },
        addAdvice() {
            const advice: PendingAdvice = {
                patientName: this.patientName,
                medicalprofessionalName: this.professionalName,
                parentPhoneNumber: this.parentPhoneNumber,
                advice: this.advice,
            };
            AdviceModule.Actions.AddAdviceAndSendSMS.dispatch(this.$store.dispatch, advice);
        },
        reset() {
            (this.$refs.form as any).reset();
        },
    },
});
</script>
<style scoped lang="scss">
</style>
