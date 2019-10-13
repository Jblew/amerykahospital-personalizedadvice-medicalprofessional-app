<template>
    <div class="advice-list-filter-form">
        <v-card class="mb-3 elevation-1" :color="bgColor" dark>
            <v-form>
                <v-container fill-height>
                    <v-layout align-center>
                        <v-flex xs12 md9 lg10 class="mx-2">
                            <v-text-field
                                v-model="evidenceId"
                                :label="text.evidenceId"
                                :error="error.length > 0"
                                :error-messages="error"
                                @keydown.enter.stop="filterAdvices()"
                                @keyup="validatePeselFilterOnValid()"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs6 md1 lg1 class="mx-1" text-center>
                            <v-btn @click="filterAdvices" color="accent" fab class="elevation-2">
                                <v-icon>fa-angle-right</v-icon>
                            </v-btn>
                        </v-flex>
                        <v-flex xs6 md2 lg1 class="mx-1" text-center>
                            <v-btn outlined @click="resetFilters">{{ text.showAll }}</v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-form>
        </v-card>
    </div>
</template>

<script lang="ts">
import { labels } from "@/global";
import Vue from "vue";

import { AdviceModule } from "../../store/AdviceModule";
import { EvidenceHashAdapter } from "@/adapter/EvidenceHashAdapter";

export default Vue.extend({
    data() {
        return {
            text: {
                evidenceId: "Nr Pesel",
                searchAdvice: labels.searchAdvice,
                showAll: labels.showAll,
            },
            evidenceId: "",
            error: "",
        };
    },
    computed: {
        bgColor() {
            const evidenceHashIsSet = !!AdviceModule.stateOf(this).filter.evidenceHash;
            return evidenceHashIsSet ? "indigo" : "primary";
        },
    },
    methods: {
        validatePeselFilterOnValid() {
            if (this.evidenceId === "" || EvidenceHashAdapter.isValidPesel(this.evidenceId)) {
                this.error = "";
                this.filterAdvices();
            } else {
                this.error = labels.invalidPeselNumber;
            }
        },
        async filterAdvices() {
            try {
                let evidenceHash: string | undefined;

                if (this.evidenceId) {
                    evidenceHash = await EvidenceHashAdapter.generate(this.evidenceId);
                }

                AdviceModule.Actions.UpdateQueryFilterAndReloadList.dispatch(this.$store.dispatch, {
                    evidenceHash,
                });
            } catch (error) {
                this.error = error;
            }
        },
        resetFilters() {
            this.evidenceId = "";
            this.error = "";
            this.filterAdvices();
        },
    },
    components: {},
});
</script>
<style scoped lang="scss">
</style>