<template v-if="show">
    <v-layout wrap>
        <v-flex v-if="resource.loading" xs12 text-center class="my-2">
            <loading-indicator />
        </v-flex>
        <v-flex v-if="hasError" xs12 class="my-2">
            <AugmentedErrorComponent :locale="locale" :error="this.resource.error" />
        </v-flex>
        <v-flex v-if="success" xs12 class="my-2">
            <v-alert type="success">{{ successText }}</v-alert>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import { visualConfig } from "@/global";
import { ResourceStatus } from "@/util/ResourceStatus";
import Vue from "vue";

import AugmentedErrorComponent from "./AugmentedErrorComponent.vue";

export default Vue.extend({
    props: {
        resource: Object as () => ResourceStatus<any>,
        successText: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            locale: visualConfig.locale,
        };
    },
    computed: {
        success(): boolean {
            return !!this.successText && ResourceStatus.isSuccess(this.resource);
        },
        hasError(): boolean {
            return ResourceStatus.hasError(this.resource);
        },
        show(): boolean {
            return this.resource.loading || this.hasError || this.success;
        },
    },
    components: {
        AugmentedErrorComponent,
    },
});
</script>
