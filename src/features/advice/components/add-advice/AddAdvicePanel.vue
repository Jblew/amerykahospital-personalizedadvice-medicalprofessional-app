<template>
  <div class="add-advice-panel">
    <add-advice-form class="mb-5" />
    <add-advice-results />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import AddAdviceForm from "./AddAdviceForm.vue";
import AddAdviceResults from "./AddAdviceResults.vue";

export default Vue.extend({
    components: {
        AddAdviceForm,
        AddAdviceResults,
    },
});
</script>
<style scoped lang="scss">
</style>