<template>
  <v-app id="inspire app" dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <profile-component/>

      <v-list dense>
        <v-divider></v-divider>
        <material-drawer-tile-router to="/" icon="dashboard">{{ text.dashboard | capitalize }}</material-drawer-tile-router>
        <material-drawer-tile-router to="/about" icon="copyright">{{ text.about | capitalize }}</material-drawer-tile-router>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ text.appTitle }}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <router-view v-if="authenticated"/>
            <auth-view v-else/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2019 - {{ text.year }} by {{ text.author }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
// @ts-check

import Vue from "vue";

import { config, s } from "./global";
import { AuthModule } from "./store/modules/auth/AuthModule";
import AuthView from "./views/Auth.vue";

export default Vue.extend({
    props: [],
    data() {
        return {
            text: {
                dashboard: "Panel",
                about: "O aplikacji",
                author: config.author,
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
        year: () => new Date().getFullYear(),
    },
    components: {
        AuthView,
    },
});
</script>

<style lang="scss" scoped>
</style>