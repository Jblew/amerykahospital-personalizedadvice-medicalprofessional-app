<template>
  <div class="text--secondary caption">
    <v-progress-circular color="blue" indeterminate></v-progress-circular>
    &nbsp;&nbsp;{{ text.loading }}...
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { labels } from "../../global";

export default Vue.extend({
    data() {
        return {
            text: {
                loading: labels.loading,
            },
        };
    },
});
</script>
<style scoped lang="scss">
</style>