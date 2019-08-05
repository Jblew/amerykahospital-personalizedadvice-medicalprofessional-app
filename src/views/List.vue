<template>
  <v-container flex class="advicelist">
    <!--<h1 class="my-0">
      {{ text.adviceList }}
      <v-btn small outlined class="mb-3" @click="addAdvice">{{ text.sendAdvice }}</v-btn>
    </h1>-->
    <advice-list-filter-form class="mb-7" />

    <advice-list-panel class="my-7" />

    <add-advice-fab />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import AddAdviceFab from "../components/advice-list/AddAdviceFab.vue";
import AdviceListFilterForm from "../components/advice-list/AdviceListFilterForm.vue";
import AdviceListPanel from "../components/advice-list/AdviceListPanel.vue";
import { labels } from "../global";

export default Vue.extend({
    data() {
        return {
            text: {
                adviceList: labels.adviceList,
            },
        };
    },
    methods: {},
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