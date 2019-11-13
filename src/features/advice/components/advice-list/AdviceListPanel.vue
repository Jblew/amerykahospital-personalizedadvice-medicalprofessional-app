<template>
    <v-layout wrap class="advice-list-panel">
        <v-flex xs12>
            <v-data-table
                :headers="headers"
                :items="adviceList"
                :items-per-page="10"
                show-expand
                :class="evidenceHashPresent? 'elevation-15 mx-4' : 'elevation-1'"
            >
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                        <p></p>
                        <p>{{ item.advice }}</p>
                        <p class="grey--text">
                            <strong>Kod porady:</strong>
                            {{ item.id }}
                            <br />
                            <strong>Czas:</strong>
                            {{ item.timestamp | formatTime }}
                            <br />
                        </p>
                    </td>
                </template>
                <template v-slot:item.state="{ item }">
                    {{ item | formatReadState }}
                    <ThanksBadge
                        v-if="item.thanksCount && item.thanksCount > 0"
                        :count="Number(item.thanksCount)"
                    />
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import { labels } from "@/global";
import { ResourceStatus } from "@/util/ResourceStatus";
import { Advice } from "amerykahospital-personalizedadvice-businesslogic";
import Vue from "vue";

import { AdviceModule } from "../../store/AdviceModule";
import ThanksBadge from "./ThanksBadge.vue";

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
                { text: labels.adviceReadHeader, value: "state" },
            ],
        };
    },
    computed: {
        resource(): ResourceStatus<Advice[]> {
            return AdviceModule.stateOf(this).list;
        },
        showList(): boolean {
            return !this.resource.loading && !ResourceStatus.hasError(this.resource);
        },
        adviceList(): Advice[] {
            return ResourceStatus.resultOrDefault(this.resource, []).map(item => ({
                ...item,
                adviceShort: this.$shorten(item.advice, 80),
            }));
        },
        evidenceHashPresent() {
            return !!AdviceModule.stateOf(this).filter.evidenceHash;
        },
    },
    methods: {
        $shorten(value: string, maxLength: number) {
            if (value.length > maxLength) {
                return value.substr(0, maxLength - 3) + "...";
            } else return value;
        },
    },
    filters: {
        formatTime(value: number) {
            return new Date(value * 1000).toLocaleString();
        },
        formatReadState(advice: Advice) {
            return !!advice.uid ? labels.adviceStateRead : labels.adviceStateUnread;
        },
    },
    components: {
        ThanksBadge,
    },
});
</script>
<style lang="scss" scoped>
.thanksBadge {
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    color: #fff;
    background-color: #28a745;
}
</style>