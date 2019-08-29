<template>
    <v-card class="mx-auto" color="blue-grey" dark max-width="700">
        <v-card-title v-if="loading">
            <v-icon>fa-cog</v-icon>
            &nbsp;{{ text.checkingRole }}&nbsp;
            <strong>{{ role }}</strong>
        </v-card-title>
        <v-card-title v-else>
            <v-icon>fa-cog</v-icon>
            &nbsp;{{ text.missingRole }}&nbsp;
            <strong>{{ role }}</strong>
        </v-card-title>

        <v-card-text v-if="loading">
            <p class="text-center">
                <loading-indicator />
            </p>
            <p>{{ text.checkingIfSufficientRole }}</p>
        </v-card-text>
        <v-card-text v-else>
            <p>{{ text.insufficientRole }}</p>
            <p class="text-center">
                <v-btn
                    :disabled="requestLoading || requestSuccess || requesting"
                    color="pink"
                    @click="requestRole()"
                >{{ text.requestAnAccess.replace("$role", `"${role}"`) }}</v-btn>
            </p>
            <p class="text-center" v-if="requestLoading">
                <loading-indicator />
            </p>
            <p v-if="requestError.length > 0">
                <v-alert type="error">{{ requestError }}</v-alert>
            </p>
            <p v-if="requestSuccess">
                <v-alert type="success">{{ text.requestAccessSuccess }}</v-alert>
            </p>
            <p v-if="requesting">
                <v-alert type="info">{{ text.alreadyRequestingTheRole }}</v-alert>
            </p>
            <p>{{ text.requestAccessExplanation }}</p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn large text outlined @click="checkRole()">
                <v-icon left>fa-sync</v-icon>
                &nbsp;{{ text.checkRoleAgain }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts">
// tslint:disable no-console
import Vue from "vue";

import { labels } from "../../../global";

export default Vue.extend({
    props: {
        role: String,
        requesting: Boolean,
        loading: Boolean,
        requestLoading: Boolean,
        requestError: String,
        requestSuccess: Boolean,
    },
    data() {
        return {
            text: {
                checkingRole: labels.checkingRole,
                missingRole: labels.missingRole,
                checkingIfSufficientRole: labels.checkingIfSufficientRole,
                insufficientRole: labels.insufficientRole,
                yourAccountIsNotConfirmed: labels.yourAccountIsNotConfirmed,
                yourAccountIsNotConfirmedAdMedicalprofessionalExplanation:
                    labels.yourAccountIsNotConfirmedAdMedicalprofessionalExplanation,
                requestAnAccess: labels.requestAnAccess,
                requestAccessExplanation: labels.requestAccessExplanation,
                requestAccessSuccess: labels.requestAccessSuccess,
                alreadyRequestingTheRole: labels.alreadyRequestingTheRole,
                checkRoleAgain: labels.checkRoleAgain,
            },
        };
    },
    methods: {
        requestRole() {
            this.$emit("requestRole");
        },
        checkRole() {
            this.$emit("checkRole");
        },
    },
});
</script>