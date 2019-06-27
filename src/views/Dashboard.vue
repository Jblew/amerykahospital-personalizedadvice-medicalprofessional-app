<template>
  <div class="home">
    <!--<img alt="Hospital logo" src="../assets/logo-ameryka.png">-->
    <add-advice-panel/>
  </div>
</template>

<script lang="ts">
import AddAdvicePanel from "@/components/add-advice/AddAdvicePanel.vue";
import Vue from "vue";

export default Vue.extend({
    name: "home",
    components: {
        AddAdvicePanel,
    },
});
</script>
