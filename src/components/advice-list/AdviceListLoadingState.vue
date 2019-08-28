<template>
    <div>
        <span>ADVICE LOADING TOP</span>
        <augmented-status-component :loading="loading" :error="error" />
    </div>
</template>

<script lang="ts">
import AugmentedStatusComponent from "@/components/misc/AugmentedErrorComponent.vue";
import Vue from "vue";

import { labels } from "../../global";
import { AdviceModule } from "../../store/modules/advice/AdviceModule";
export default Vue.extend({
    computed: {
        listLoadingState() {
            return AdviceModule.stateOf(this).listLoadingState;
        },
        loading(): boolean {
            return this.listLoadingState.loading;
        },
        error(): string {
            return this.listLoadingState.error ? this.listLoadingState.error + labels.couldNotLoadAdvices : "";
        },
    },
    components: {
        AugmentedStatusComponent,
    },
});
</script>
<style scoped lang="scss">
</style>