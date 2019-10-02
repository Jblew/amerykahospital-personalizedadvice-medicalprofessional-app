<template>
    <v-layout wrap class="advice-list-panel">
        <v-flex xs12>
            <v-data-table
                    v-if="showList"
                    :headers="headers"
                    :items="list"
                    :items-per-page="10"
                    class="elevation-1"
            >
            </v-data-table>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import { labels } from "@/global";
    import { ResourceStatus } from "@/util/ResourceStatus";
    import { MedicalProfessional } from "amerykahospital-personalizedadvice-businesslogic";
    import Vue from "vue";

    import { MedicalProfessionalModule } from "../store/MedicalProfessionalModule";

    export default Vue.extend({
        data() {
            return {
                text: {
                    professionalName: labels.professionalName,
                },
                headers: [
                    {
                        text: labels.professionalName,
                        value: MedicalProfessional.keys.displayName,
                    },
                ],
            };
        },
        computed: {
            resource(): ResourceStatus<MedicalProfessional []> {
                return MedicalProfessionalModule.stateOf(this).list;
            },
            showList(): boolean {
                return !this.resource.loading && !ResourceStatus.hasError(this.resource);
            },
            list(): MedicalProfessional [] {
                return ResourceStatus.resultOrDefault(this.resource, []);
            },
        },
        methods: {
        },
    });
</script>
<style scoped lang="scss">
</style>
