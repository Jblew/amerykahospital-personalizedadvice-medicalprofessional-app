<template>
    <v-layout wrap class="advice-list-panel">
        <v-flex xs12>
            <v-data-table
                v-if="!loading && !error"
                :headers="headers"
                :items="adviceList"
                :items-per-page="10"
                show-expand
                class="elevation-1"
            >
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">{{ item.advice }}</td>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import { labels } from "@/global";
import { Advice } from "amerykahospital-personalizedadvice-businesslogic";
import Vue from "vue";

import { AdviceModule } from "../../../../store/modules/advice/AdviceModule";

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
                { text: labels.advice, value: "adviceShort" },
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
            return AdviceModule.stateOf(this).list.map(item => ({
                ...item,
                adviceShort: this.$shorten(item.advice, 80),
            }));
        },
    },
    methods: {
        $shorten(value: string, maxLength: number) {
            if (value.length > maxLength) {
                return value.substr(0, maxLength - 3) + "...";
            } else return value;
        },
    },
});
</script>
<style scoped lang="scss">
</style>