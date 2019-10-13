<template>
    <role-guard-component :role="role">
        <v-container flex class="advicelist">
            <patient-selector class="mb-3" />

            <augmented-status-component :resource="listResource" class="my-3" />

            <filter-status />
            <advice-list-panel class="my-3" />

            <add-advice-fab />
        </v-container>
    </role-guard-component>
</template>

<script lang="ts">
import { AdviceModule } from "../store/AdviceModule";
import { ResourceStatus } from "@/util/ResourceStatus";
import Vue from "vue";

import PatientSelector from "../components/advice-list/PatientSelector.vue";
import AddAdviceFab from "../components/advice-list/AddAdviceFab.vue";
import FilterStatus from "../components/advice-list/FilterStatus.vue";
import AdviceListPanel from "../components/advice-list/AdviceListPanel.vue";
import { RoleGuardComponent } from "@/features/auth";

import { RoleKey } from "amerykahospital-personalizedadvice-businesslogic";

export default Vue.extend({
    data() {
        return {
            role: RoleKey.medicalprofessional,
        };
    },
    computed: {
        listResource() {
            return ResourceStatus.lightweight(AdviceModule.stateOf(this).list);
        },
    },
    components: {
        AdviceListPanel,
        AddAdviceFab,
        FilterStatus,
        PatientSelector,
        RoleGuardComponent,
    },
});
</script>
<style scoped lang="scss">
.add-btn {
    margin-bottom: 5em;
    margin-right: 4em;
}
</style>
