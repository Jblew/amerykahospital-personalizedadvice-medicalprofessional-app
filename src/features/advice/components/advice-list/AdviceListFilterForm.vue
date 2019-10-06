<template>
    <div class="advice-list-filter-form">
        <v-card class="mb-3 elevation-1" color="primary" dark>
            <v-form>
                <v-container fill-height>
                    <v-layout align-center>
                        <v-flex xs12 md5 lg5 class="mx-2">
                            <v-text-field
                                v-model="patientName"
                                valid="true"
                                :label="text.patientName"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12 md4 lg4 class="mx-2">
                            <v-text-field
                                v-model="parentPhoneNumber"
                                valid="true"
                                :label="text.parentPhoneNumber"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs6 md1 lg1 class="mx-1" text-center>
                            <v-btn @click="filterAdvices" color="accent" fab class="elevation-2">
                                <v-icon>fa-search</v-icon>
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

export default Vue.extend({
    data() {
        return {
            text: {
                patientName: labels.patientName,
                parentPhoneNumber: labels.parentPhoneNumber,
                searchAdvice: labels.searchAdvice,
                showAll: labels.showAll,
            },
            patientName: "",
            parentPhoneNumber: "",
        };
    },
    computed: {},
    methods: {
        filterAdvices() {
            const filter = {
                patientName: this.patientName.length > 0 ? this.patientName : undefined,
                parentPhoneNumber: this.parentPhoneNumber.length > 0 ? this.parentPhoneNumber : undefined,
            };
            AdviceModule.Actions.UpdateQueryFilterAndReloadList.dispatch(this.$store.dispatch, filter);
        },
        resetFilters() {
            this.patientName = "";
            this.parentPhoneNumber = "";
            this.filterAdvices();
        },
    },
    components: {},
});
</script>
<style scoped lang="scss">
</style>