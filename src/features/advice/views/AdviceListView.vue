<template>
    <v-container flex class="advicelist">
        <advice-list-filter-form class="mb-3" />

        <augmented-status-component :resource="listResource" class="my-3" />

        <advice-list-panel class="my-3" />

        <add-advice-fab />
    </v-container>
</template>

<script lang="ts">
import { AdviceModule } from "../store/AdviceModule";
import { ResourceStatus } from "@/util/ResourceStatus";
import Vue from "vue";

import AddAdviceFab from "../components/advice-list/AddAdviceFab.vue";
import AdviceListFilterForm from "../components/advice-list/AdviceListFilterForm.vue";
import AdviceListPanel from "../components/advice-list/AdviceListPanel.vue";
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
        AdviceListFilterForm,
    },
});
</script>
<style scoped lang="scss">
.add-btn {
    margin-bottom: 5em;
    margin-right: 4em;
}
</style>
