<template>
  <div class="add-advice-panel">
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

      <v-text-field v-model="shortId" valid="true" :label="text.adviceCode" disabled readonly box></v-text-field>

      <v-btn :disabled="!valid" color="success" @click="validateAndAddAdvice">{{ text.sendAdvice }}</v-btn>

      <v-btn @click="reset">{{ text.resetForm }}</v-btn>

      <v-alert v-if="loading" value="true" type="info">{{ text.sendingAdvice }}</v-alert>
      <v-alert v-if="error.length > 0" value="true" type="error">{{ error }}</v-alert>
      <v-alert v-if="result.length > 0" value="true" type="success">{{ result }}</v-alert>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Advice, AdviceIdGenerator } from "ahpaa-core";
import Vue from "vue";

import { labels, s } from "../../global";
import { AdviceModule } from "../../store/modules/advice/AdviceModule";

const phoneNumberRegex = /^[0-9]{9}$/;

export default Vue.extend({
    name: "AddAdviceComponent",
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
            id: "",
        };
    },
    mounted() {
        this.id = AdviceIdGenerator.generateId();
    },
    computed: {
        loading(): boolean {
            return s(this.$store).state.advice.addOp.loading;
        },
        error(): string {
            return s(this.$store).state.advice.addOp.error;
        },
        result(): string {
            return s(this.$store).state.advice.addOp.result;
        },
        shortId: {
            get(): string {
                return this.id.substring(0, 5);
            },
            set(v: string) {
                // do nothing
            },
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
                id: this.id,
                patientName: this.patientName,
                medicalprofessionalName: this.professionalName,
                parentPhoneNumber: this.parentPhoneNumber,
                advice: this.advice,
                dateISO: new Date().toISOString(),
            };

            s(this.$store).dispatch(AdviceModule.Actions.addAdvice, advice);
        },
        reset() {
            (this.$refs.form as any).reset();
            this.id = AdviceIdGenerator.generateId();
        },
    },
});
</script>
<style scoped lang="scss">
.add-advice-panel {
}
</style>