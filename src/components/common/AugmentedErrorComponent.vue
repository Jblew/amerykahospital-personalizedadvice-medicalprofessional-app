<template>
    <v-alert v-if="advanced" type="error">
        <div>
            <strong>{{ message }}</strong>
        </div>
        <div>
            <small>{{ advanced }}</small>
        </div>
    </v-alert>
    <v-alert v-else type="error">
        <span>{{ message }}</span>
    </v-alert>
</template>

<script lang="ts">
import { AugmentedLocalizedError } from "localized-error";
import Vue from "vue";

export default Vue.extend({
    props: {
        error: [
            String,
            Object as () => AugmentedLocalizedError<string> | Error,
            Error as () => AugmentedLocalizedError<string> | Error,
        ],
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
