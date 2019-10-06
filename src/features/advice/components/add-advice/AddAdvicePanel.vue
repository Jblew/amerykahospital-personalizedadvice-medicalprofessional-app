<template>
    <div class="add-advice-panel">
        <add-advice-form class="mb-5" />
        <augmented-status-component
            :resource="addResultResource"
            :successText="text.addAdviceSuccess"
            class="my-3"
        />
        <augmented-status-component
            :resource="sendSMSResultResource"
            :successText="sendSMSSuccessText"
            class="my-3"
        />
    </div>
</template>

<script lang="ts">
import { AdviceModule } from "../../store/AdviceModule";
import { ResourceStatus } from "@/util/ResourceStatus";
import Vue from "vue";

import AddAdviceForm from "./AddAdviceForm.vue";
import { labels } from "@/global";

export default Vue.extend({
    data() {
        return {
            text: {
                addAdviceSuccess: labels.addAdviceSuccess,
            },
        };
    },
    computed: {
        addResultResource() {
            return ResourceStatus.lightweight(AdviceModule.stateOf(this).addOp);
        },
        sendSMSResultResource() {
            return AdviceModule.stateOf(this).sendSMSOp;
        },
        sendSMSSuccessText(): string {
            return typeof this.sendSMSResultResource.result === "string"
                ? ""
                : this.sendSMSResultResource.result.message;
        },
    },
    components: {
        AddAdviceForm,
    },
});
</script>
