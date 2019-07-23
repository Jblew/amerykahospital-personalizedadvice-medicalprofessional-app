<template>
  <div class="advice-list-panel">
    <advice-list-filter-form />

    <v-alert v-if="loading" value="true" type="info">{{ text.sendingAdvice }}</v-alert>
    <v-alert v-if="error.length > 0" value="true" type="error">{{ error }}</v-alert>

    <v-data-table
      v-if="!loading && !error"
      :headers="headers"
      :items="adviceList"
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
import Vue from "vue";
import AdviceListFilterForm from "./AdviceListFilterForm.vue";

import { labels, s } from "../../global";
import { AdviceModule } from "../../store/modules/advice/AdviceModule";
import { Advice } from "amerykahospital-personalizedadvice-core";

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
                    value: "medicalprofessionalName",
                },
                { text: labels.patientName, value: "patientName" },
                { text: labels.parentPhoneNumber, value: "parentPhoneNumber" },
                { text: labels.advice, value: "advice" },
            ],
        };
    },
    computed: {
        loading(): boolean {
            return s(this.$store).state.advice.listLoadingState.loading;
        },
        error(): string {
            return s(this.$store).state.advice.listLoadingState.error;
        },
        adviceList(): Advice[] {
            return s(this.$store).state.advice.list;
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