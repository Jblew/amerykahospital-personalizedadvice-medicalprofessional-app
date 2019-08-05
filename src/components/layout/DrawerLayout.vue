<template>
  <span>
    <v-navigation-drawer v-model="drawer" clipped fixed app temporary>
      <navigation-drawer-contents />
    </v-navigation-drawer>
    <v-app-bar app fixed color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <v-icon>fa-bars</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>{{ text.appTitle }}</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-start>
          <v-flex>
            <slot></slot>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </span>
</template>

<script lang="ts">
import Vue from "vue";

import { visualConfig } from "../../global";

import NavigationDrawerContents from "./NavigationDrawerContents.vue";

export default Vue.extend({
    props: [],
    data() {
        return {
            text: {
                appTitle: visualConfig.appTitle,
            },
            drawer: null,
        };
    },
    methods: {},
    computed: {},
    components: {
        NavigationDrawerContents,
    },
});
</script>

<style lang="scss" scoped>
</style>