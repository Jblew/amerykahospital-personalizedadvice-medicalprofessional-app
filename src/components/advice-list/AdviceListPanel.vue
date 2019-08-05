<template>
  <v-layout class="advice-list-panel">
    <v-alert v-if="loading" :value="true" type="info">{{ text.sendingAdvice }}</v-alert>
    <v-alert v-if="error.length > 0" :value="true" type="error">{{ error }}</v-alert>

    <v-data-table
      v-if="!loading && !error"
      :headers="headers"
      :items="adviceList"
      :items-per-page="15"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td class="text-xs">{{ props.item.medicalprofessionalName }}</td>
        <td class="text-xs">{{ props.item.patientName }}</td>
        <td class="text-xs">{{ props.item.parentPhoneNumber }}</td>
        <td class="text-xs">{{ props.item.advice }}</td>
      </template>
    </v-data-table>
  </v-layout>
</template>

<script lang="ts">
import { Advice } from "amerykahospital-personalizedadvice-core";
import Vue from "vue";

import { labels } from "../../global";
import { AdviceModule } from "../../store/modules/advice/AdviceModule";

export default Vue.extend({
    data() {
        return {
            text: {
                professionalName: labels.professionalName,
                patientName: labels.patientName,
                parentPhoneNumber: labels.parentPhoneNumber,
                advice: labels.advice,
            },
            headers: [
                {
                    text: labels.professionalName,
                    value: Advice.keys.medicalprofessionalName,
                },
                { text: labels.patientName, value: Advice.keys.patientName },
                { text: labels.parentPhoneNumber, value: Advice.keys.parentPhoneNumber },
                { text: labels.advice, value: Advice.keys.advice },
            ],
        };
    },
    computed: {
        listLoadingState() {
            return AdviceModule.stateOf(this).listLoadingState;
        },
        loading(): boolean {
            return this.listLoadingState.loading;
        },
        error(): string {
            return this.listLoadingState.error;
        },
        adviceList(): Advice[] {
            return AdviceModule.stateOf(this).list;
        },
    },
    methods: {},
    components: {},
});
</script>
<style scoped lang="scss">
</style>