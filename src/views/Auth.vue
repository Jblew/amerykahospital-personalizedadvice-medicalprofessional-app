<template>
  <v-container class="auth-view" fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="primary" flat dark>
            <v-toolbar-title v-if="loading">{{ text.loading }}...</v-toolbar-title>
            <v-toolbar-title v-else>{{ text.logInPanelTitle }}...</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <div id="firebaseui-auth-container"></div>
            <div v-if="loading" class="text-center px-5 py-5">
              <v-progress-circular :size="70" :width="7" color="accent" indeterminate></v-progress-circular>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <div class="painting-caption">
      <strong>Władysław Podkowiński,</strong>
      <br />Olszynka
    </div>
  </v-container>
</template>

<script lang="ts">
import { RolesAuthModule } from "firestore-roles-vuex-module";
import Vue from "vue";

import { AuthConfig } from "../config/AuthConfig";
import { getConfig, labels } from "../global";
import { FirebaseAuthHelper } from "../helper/FirebaseAuthHelper";

export default Vue.extend({
    data() {
        return {
            text: {
                logInPanelTitle: labels.logInPanelTitle,
                loading: labels.loading,
            },
        };
    },
    mounted() {
        FirebaseAuthHelper.startFirebaseAuthUI(
            "#firebaseui-auth-container",
            getConfig().basePath,
            AuthConfig.PROVIDERS,
        );
    },
    computed: {
        loading(): boolean {
            return RolesAuthModule.stateOf(this).state === RolesAuthModule.AuthState.LOADING;
        },
    },
});
</script>
<style lang="scss" scoped>
.auth-view {
    //background: url("~@/assets/rapacki-thaw.jpg") no-repeat;
    //background: url("~@/assets/podkowinski-w-ogrodzie.jpg") no-repeat;
    //background: url("~@/assets/podkowinski-gra-w-krokieta.jpg") no-repeat;
    background: url("~@/assets/podkowinski-olszynka.jpg") no-repeat;
    //background: url("~@/assets/podkowinski-dzieci-w-ogrodzie.jpg") no-repeat;
    background-size: cover;
    background-position: center center;
    position: fixed;
}

.painting-caption {
    position: absolute;
    bottom: 3rem;
    right: 1.5rem;
    padding: 0.5rem;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.6rem;
    background-color: rgba(0, 0, 0, 0.2);
}
</style>