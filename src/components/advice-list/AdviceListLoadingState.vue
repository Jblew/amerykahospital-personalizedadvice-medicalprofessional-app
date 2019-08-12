<template>
  <v-layout wrap>
    <v-flex v-if="loading" xs12 text-center class="my-2">
      <loading-indicator />
    </v-flex>
    <v-flex v-if="error.length > 0" xs12 text-center class="my-2">
      <v-alert type="error">{{ text.couldNotLoadAdvices }}. {{ error }}</v-alert>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";

import { labels } from "../../global";
import { AdviceModule } from "../../store/modules/advice/AdviceModule";

export default Vue.extend({
    data() {
        return {
            text: {
                couldNotLoadAdvices: labels.couldNotLoadAdvices,
            },
        };
    },
    computed: {
        listLoadingState() {
            return AdviceModule.stateOf(this).listLoadingState;
        },
        loading(): boolean {
            return this.listLoadingState.loading;
        },
        error(): string {
            return this.listLoadingState.error;
        },
    },
});
</script>
<style scoped lang="scss">
</style>