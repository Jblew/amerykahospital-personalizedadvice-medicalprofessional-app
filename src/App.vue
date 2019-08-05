<template>
  <v-app id="inspire app">
    <account-warning-dialog />

    <v-navigation-drawer v-model="drawer" clipped fixed app temporary>
      <profile-component />
      <p>&nbsp;</p>

      <v-list dense>
        <v-divider></v-divider>
        <material-drawer-tile-router to="/list" icon="fa-list">{{ text.list | capitalize }}</material-drawer-tile-router>
        <material-drawer-tile-router
          to="/add"
          icon="fa-tachometer-alt"
        >{{ text.sendAdvice | capitalize }}</material-drawer-tile-router>
        <material-drawer-tile-router to="/about" icon="fa-plus">{{ text.about | capitalize }}</material-drawer-tile-router>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app fixed clipped-left color="#00885B" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <v-icon>fa-bars</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>{{ text.appTitle }}</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-start>
          <v-flex>
            <router-view v-if="authenticated" />
            <auth-view v-else />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <footer-component />
  </v-app>
</template>

<script lang="ts">
import { RolesAuthModule } from "firestore-roles-vuex-module";
import Vue from "vue";

import AccountWarningDialog from "./components/AccountWarningDialog.vue";
import FooterComponent from "./components/FooterComponent.vue";
import { config, labels, s } from "./global";
import AuthView from "./views/Auth.vue";

export default Vue.extend({
    props: [],
    data() {
        return {
            text: {
                sendAdvice: labels.sendAdvice,
                list: labels.adviceList,
                about: labels.aboutApp,
                appTitle: config.appTitle,
            },
            drawer: null,
        };
    },
    methods: {},
    computed: {
        authenticated(): boolean {
            return RolesAuthModule.stateOf(this).state === RolesAuthModule.AuthState.AUTHENTICATED;
        },
    },
    components: {
        AuthView,
        AccountWarningDialog,
        FooterComponent,
    },
});
</script>

<style lang="scss" scoped>
</style>