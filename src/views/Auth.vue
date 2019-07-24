<template>
  <div>
    <h1 v-if="loading">{{ text.loading }}...</h1>
    <h1 v-else>{{ text.logIn }}</h1>

    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="70" :width="7" :color="colors.secondary" indeterminate></v-progress-circular>
    </div>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script lang="ts">
import { FirebaseAuthHelper } from "amerykahospital-personalizedadvice-vue-commons";
import Vue from "vue";

import { config, labels, s } from "../global";
import { routes } from "../routes";
import { AuthModule } from "../store/modules/auth/AuthModule";
import { AuthConfig } from "../AuthConfig";

export default Vue.extend({
    name: "auth",
    data() {
        return {
            colors: {
                secondary: config.colors.secondary,
            },
            text: {
                logIn: labels.logIn,
                loading: labels.loading,
            },
        };
    },
    mounted() {
        FirebaseAuthHelper.startFirebaseAuthUI("#firebaseui-auth-container", routes.home.path, AuthConfig.PROVIDERS);
    },
    computed: {
        loading(): boolean {
            return s(this.$store).state.auth.state === AuthModule.AuthState.LOADING;
        },
    },
});
</script>