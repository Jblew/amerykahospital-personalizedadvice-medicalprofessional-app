<template>
    <v-alert type="error">
        <v-expansion-panel v-if="advanced">
            <v-expansion-panel-header>{{ message }}</v-expansion-panel-header>
            <v-expansion-panel-content>{{ advanced }}</v-expansion-panel-content>
        </v-expansion-panel>
        <span v-else>{{ message }}</span>
    </v-alert>
</template>

<script lang="ts">
import { AugmentedLocalizedError } from "localized-error";
import Vue from "vue";

export default Vue.extend({
    props: {
        error: [String, Object as () => AugmentedLocalizedError<string> | Error],
        locale: String,
    },
    computed: {
        advanced(): string {
            if (typeof this.error !== "object") return "";

            if ("details" in this.error) {
                return this.error.details.advanced || "";
            } else {
                return "";
            }
        },
        message(): string {
            if (typeof this.error === "string") return this.error;

            if ("details" in this.error) {
                if (!this.error.details.localizedMessage) return this.error.message;
                else return this.error.details.localizedMessage[this.locale] || this.error.message;
            } else {
                return this.error.message;
            }
        },
    },
});
</script>