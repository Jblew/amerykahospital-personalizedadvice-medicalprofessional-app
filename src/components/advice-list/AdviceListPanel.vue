<template>
  <div class="advice-list-panel">
    <advice-list-filter-form />

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
  </div>
</template>

<script lang="ts">
import { Advice } from "amerykahospital-personalizedadvice-core";
import Vue from "vue";

import { labels } from "../../global";
import { Store } from "../../store/Store";

import AdviceListFilterForm from "./AdviceListFilterForm.vue";

export default Vue.extend({
    name: "AdviceListPanel",
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
        loading(): boolean {
            return Store.of(this).state.advice.listLoadingState.loading;
        },
        error(): string {
            return Store.of(this).state.advice.listLoadingState.error;
        },
        adviceList(): Advice[] {
            return Store.of(this).state.advice.list;
        },
    },
    methods: {},
    components: {
        AdviceListFilterForm,
    },
});
</script>
<style scoped lang="scss">
</style>