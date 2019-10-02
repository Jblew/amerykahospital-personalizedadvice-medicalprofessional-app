<template>
  <div class="add-advice-panel">
    <add-advice-form class="mb-5" />
    <augmented-status-component :resource="addResultResource" class="my-3" />
    <augmented-status-component :resource="sendSMSResultResource" class="my-3" />
  </div>
</template>

<script lang="ts">
import { AdviceModule } from "../../store/AdviceModule";
import { ResourceStatus } from "@/util/ResourceStatus";
import Vue from "vue";

import AddAdviceForm from "./AddAdviceForm.vue";

export default Vue.extend({
    computed: {
      addResultResource() {
        return ResourceStatus.lightweight(AdviceModule.stateOf(this).addOp);
      },
      sendSMSResultResource() {
        return ResourceStatus.lightweight(AdviceModule.stateOf(this).sendSMSOp);
      },
    },
    components: {
        AddAdviceForm,
    },
});
</script>
