<template v-if="loading || success || error">
    <v-layout wrap>
        <v-flex xs12 text-center class="my-2">LOADING LIST</v-flex>
        <v-flex v-if="loading" xs12 text-center class="my-2">
            <span>Loading</span>
            <loading-indicator />
        </v-flex>
        <v-flex v-if="error" xs12 text-center class="my-2">
            <AugmentedErrorComponent :locale="locale" :error="error" />
        </v-flex>
        <v-flex v-if="success" xs12 text-center class="my-2">
            <v-alert type="success">{{ success }}</v-alert>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import { visualConfig } from "@/global";
    import { AugmentedLocalizedError } from "localized-error";
    import Vue from "vue";

    import AugmentedErrorComponent from "./AugmentedErrorComponent.vue";

    export default Vue.extend({
        props: {
            loading: Boolean,
            success: String,
            error: [String, Object as () => AugmentedLocalizedError<string> | Error],
        },
        data() {
            return {
                locale: visualConfig.locale,
            };
        },
        components: {
            AugmentedErrorComponent,
        },
    });
</script>
