<template>
  <div class="add-advice-panel">
    <h1>{{ text.sendAdvice }}</h1>
    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="proffesionalName"
        :rules="proffesionalNameRules"
        :label="text.proffesionalName"
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

      <v-btn :disabled="!valid" color="success" @click="validateAndAddAdvice">{{ text.sendAdvice }}</v-btn>

      <v-btn @click="reset">{{ text.resetForm }}</v-btn>

      <v-alert v-if="loading" value="true" type="info">{{ text.sendingAdvice }}</v-alert>
      <v-alert v-if="error.length > 0" value="true" type="error">{{ error }}</v-alert>
      <v-alert v-if="result.length > 0" value="true" type="success">{{ result }}</v-alert>
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { labels, s } from "../../global";
import { AdviceModule } from "../../store/modules/advice/AdviceModule";
import { Advice } from "ahpaa-core";

const phoneNumberRegex = /^[0-9]{9}$/;

export default Vue.extend({
    name: "ProfileComponent",
    data() {
        return {
            text: {
                sendAdvice: labels.sendAdvice,
                proffesionalName: labels.proffesionalName,
                patientName: labels.patientName,
                parentPhoneNumber: labels.parentPhoneNumber,
                advice: labels.advice,
                resetForm: labels.resetForm,
                sendingAdvice: labels.sendingAdvice,
            },
            valid: true,
            proffesionalName: "",
            proffesionalNameRules: [(v: string) => !!v || labels.requiredField],
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
        loading(): boolean {
            return s(this.$store).state.advice.addOp.loading;
        },
        error(): string {
            const e = s(this.$store).state.advice.addOp.error;
            return e;
        },
        result(): string {
            return s(this.$store).state.advice.addOp.result;
        },
    },
    methods: {
        validateAndAddAdvice() {
            if ((this.$refs.form as any).validate()) {
                this.addAdvice();
            }
        },
        addAdvice() {
            const advice: Advice = {
                patientName: this.patientName,
                medicalproffesionalName: this.proffesionalName,
                parentPhoneNumber: this.parentPhoneNumber,
                advice: this.advice,
                dateISO: new Date().toISOString(),
            };

            s(this.$store).dispatch(AdviceModule.Actions.addAdvice, advice);
        },
        reset() {
            (this.$refs.form as any).reset();
        },
    },
});
</script>
<style scoped lang="scss">
.add-advice-panel {
    min-width: 40em;
}
</style>