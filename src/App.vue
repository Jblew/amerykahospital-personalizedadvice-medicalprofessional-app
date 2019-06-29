<template>
  <v-app id="inspire app">
    <account-warning-dialog/>

    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <profile-component/>
      <p>&nbsp;</p>

      <v-list dense>
        <v-divider></v-divider>
        <material-drawer-tile-router to="/list" icon="list">{{ text.list | capitalize }}</material-drawer-tile-router>
        <material-drawer-tile-router to="/add" icon="dashboard">{{ text.sendAdvice | capitalize }}</material-drawer-tile-router>
        <material-drawer-tile-router to="/about" icon="copyright">{{ text.about | capitalize }}</material-drawer-tile-router>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left color="#00885B" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ text.appTitle }}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-start>
          <v-flex>
            <router-view v-if="authenticated"/>
            <auth-view v-else/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <footer-component/>
  </v-app>
</template>

<script lang="ts">
// @ts-check

import Vue from "vue";

import { config, labels, s } from "./global";
import AccountWarningDialog from "./components/AccountWarningDialog.vue";
import FooterComponent from "./components/FooterComponent.vue";
import { AuthModule } from "./store/modules/auth/AuthModule";
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
            return s(this.$store).state.auth.state === AuthModule.AuthState.AUTHENTICATED;
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