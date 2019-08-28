<template>
    <v-layout wrap>
        <v-flex xs12 text-center class="my-2">LOADING LIST</v-flex>
        <v-flex v-if="loading_" xs12 text-center class="my-2">
            <span>Loading</span>
            <loading-indicator />
        </v-flex>
        <v-flex v-if="error_" xs12 text-center class="my-2">
            <AugmentedErrorComponent :locale="locale" :error="error_" />
        </v-flex>
        <v-flex v-if="success_" xs12 text-center class="my-2">
            <v-alert type="success">{{ success_ }}</v-alert>
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
            loading_: true,
            success_: "Udało się",
            error_: AugmentedLocalizedError.make(new Error("Err"), {
                type: "augerr",
                advanced: "Here, more informations about error are provided",
                localizedMessage: {
                    EN: "Message in english",
                    PL: "Wiadomość po polsku",
                },
            }),
            locale: visualConfig.locale,
        };
    },
    components: {
        AugmentedErrorComponent,
    },
});
</script>