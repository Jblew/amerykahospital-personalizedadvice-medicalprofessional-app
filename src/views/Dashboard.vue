<template>
  <div class="home">
    <h1 class="mb-3 ml-2">{{ text.sendAdvice }}</h1>
    <add-advice-panel/>
  </div>
</template>

<script lang="ts">
import AddAdvicePanel from "@/components/add-advice/AddAdvicePanel.vue";
import Vue from "vue";

import { labels } from "../global";

export default Vue.extend({
    name: "home",
    data() {
        return {
            text: {
                sendAdvice: labels.sendAdvice,
            },
        };
    },
    components: {
        AddAdvicePanel,
    },
});
</script>
