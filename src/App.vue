<template>
  <v-app id="app">
    <account-warning-dialog />
    <notifications-snackbar />
    <drawer-layout v-if="authenticated" id="authenticated-app">
      <router-view />
    </drawer-layout>
    <v-content v-else>
      <auth-view />
    </v-content>
    <footer-component />
    <div class="painting-caption">
      <strong>Joseph William Turner</strong>
      <br />Lucerne from the lake
    </div>
  </v-app>
</template>

<script lang="ts">
import { RolesAuthModule } from "firestore-roles-vuex-module";
import Vue from "vue";

import AccountWarningDialog from "./components/AccountWarningDialog.vue";
import DrawerLayout from "./components/layout/DrawerLayout.vue";
import FooterComponent from "./components/layout/Footer.vue";
import NotificationsSnackbar from "./components/misc/NotificationsSnackbar.vue";
import AuthView from "./views/Auth.vue";

export default Vue.extend({
    computed: {
        authenticated(): boolean {
            return RolesAuthModule.stateOf(this).state === RolesAuthModule.AuthState.AUTHENTICATED;
        },
    },
    components: {
        AuthView,
        DrawerLayout,
        FooterComponent,
        NotificationsSnackbar,
        AccountWarningDialog,
    },
});
</script>

<style lang="scss">
body {
    background-color: #00885b;
}

#authenticated-app {
    padding-bottom: 14rem;
    background: url("~@/assets/joseph-turner-lucerne-from-the-lake.jpg") bottom no-repeat;
    background-size: 100% auto;
}

.painting-caption {
    position: absolute;
    bottom: 3rem;
    left: 1rem;
    padding: 0.5rem;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.6rem;
    background-color: rgba(0, 0, 0, 0.2);
}
</style>