<template>
    <v-app id="app">
        <notifications-snackbar />
        <drawer-layout v-if="authenticated">
            <router-view />
        </drawer-layout>
        <v-content v-else>
            <auth-view />
        </v-content>
        <footer-component />
    </v-app>
</template>

<script lang="ts">
import AuthView from "@/features/auth/views/AuthView.vue";
import { RolesAuthModule } from "firestore-roles-vuex-module";
import Vue from "vue";

import DrawerLayout from "./components/layout/DrawerLayout.vue";
import FooterComponent from "./components/layout/Footer.vue";
import NotificationsSnackbar from "./components/misc/NotificationsSnackbar.vue";

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
    },
});
</script>

<style lang="scss">
</style>