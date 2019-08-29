<template>
    <v-container flex class="advicelist">
        <advice-list-filter-form class="mb-3" />

        <advice-list-loading-state class="my-3" />

        <advice-list-panel class="my-3" />

        <add-advice-fab />
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import AddAdviceFab from "../components/add-advice/AddAdviceFab.vue";
import AdviceListFilterForm from "../components/advice-list/AdviceListFilterForm.vue";
import AdviceListLoadingState from "../components/advice-list/AdviceListLoadingState.vue";
import AdviceListPanel from "../components/advice-list/AdviceListPanel.vue";

export default Vue.extend({
    components: {
        AdviceListPanel,
        AddAdviceFab,
        AdviceListFilterForm,
        AdviceListLoadingState,
    },
});
</script>
<style scoped lang="scss">
.add-btn {
    margin-bottom: 5em;
    margin-right: 4em;
}
</style>