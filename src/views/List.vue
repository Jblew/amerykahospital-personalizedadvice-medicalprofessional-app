<template>
  <div class="advicelist">
    <h1 class="mb-3 ml-2">Lista porad</h1>
    <advice-list-panel/>
  </div>
</template>

<script lang="ts">
import AdviceListPanel from "@/components/advice-list/AdviceListPanel.vue";
import Vue from "vue";

export default Vue.extend({
    name: "home",
    components: {
        AdviceListPanel,
    },
});
</script>
