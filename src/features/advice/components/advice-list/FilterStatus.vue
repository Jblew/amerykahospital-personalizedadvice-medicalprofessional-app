<template>
    <p v-if="hasEvidenceHash" class="text-center overline">{{ filterLabel }}</p>
</template>

<script lang="ts">
import { labels } from "@/global";
import Vue from "vue";

import { AdviceModule } from "../../store/AdviceModule";

export default Vue.extend({
    computed: {
        hasEvidenceHash() {
            return AdviceModule.stateOf(this).filter.evidenceHash;
        },
        filterLabel() {
            const filter = AdviceModule.stateOf(this).filter;
            if (filter.evidenceHash) {
                return labels.filteringByPesel;
            } else {
                return labels.displayingAllResults;
            }
        },
    },
});
</script>
<style scoped lang="scss">
.add-btn {
    margin-bottom: 5em;
    margin-right: 4em;
}
</style>
