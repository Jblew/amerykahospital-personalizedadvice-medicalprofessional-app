<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="professionalName"
      :rules="professionalNameRules"
      :label="text.professionalName"
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

    <v-text-field v-model="adviceId" valid="true" :label="text.adviceCode" disabled readonly box></v-text-field>

    <v-btn :disabled="!valid" color="success" @click="validateAndAddAdvice">{{ text.sendAdvice }}</v-btn>
  </v-form>
</template>

<script lang="ts">
import { PendingAdvice } from "amerykahospital-personalizedadvice-core";
import Vue from "vue";

import { labels, s } from "../../global";
import { AdviceModule } from "../../store/modules/advice/AdviceModule";

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
            professionalName: "",
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
    computed: {
        adviceId(): string {
            const loadedId = s(this.$store).state.advice.addOp.result.adviceId;
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

            s(this.$store).dispatch(AdviceModule.Actions.addAdviceAndSendSMS, advice);
        },
        reset() {
            (this.$refs.form as any).reset();
        },
    },
});
</script>
<style scoped lang="scss">
</style>