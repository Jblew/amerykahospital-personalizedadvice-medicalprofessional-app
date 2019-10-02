<template>
    <v-container flex>
        <augmented-status-component :resource="listResource" class="my-3" />

        <medical-professional-list />

        <fab-activated-dialog-card :max-width="600" tooltip="Dodaj lekarza" dialog-title="Dodaj lekarza">
                Inside card
        </fab-activated-dialog-card>
    </v-container>
</template>

<script lang="ts">
import { MedicalProfessionalModule } from "@/features/medicalprofessional/store/MedicalProfessionalModule";
import MedicalProfessionalList from "../components/MedicalProfessionalList.vue";
import { ResourceStatus } from "@/util/ResourceStatus";
import Vue from "vue";

export default Vue.extend({
    beforeRouteEnter() {
        console.log("Call MedicalProfessionalModule.Actions.LoadList.dispatch");
        MedicalProfessionalModule.Actions.LoadList.dispatch(this);
    },
    computed: {
        listResource() {
            return ResourceStatus.lightweight(MedicalProfessionalModule.stateOf(this).list);
        },
    },
    components: {
        MedicalProfessionalList,
    },
});
</script>
