<template>
  <span
    id="drawer-layout"
    :class="($vuetify.breakpoint.smAndDown) ? 'sm' : ($vuetify.breakpoint.mdAndDown) ? 'md' : ''"
  >
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
    <div class="layout-painting-caption">
      <strong>Joseph William Turner</strong>
      <br />Lucerne from the lake
    </div>
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
#drawer-layout {
    min-height: 75rem;
    padding-bottom: 15rem;
    background: url("~@/assets/joseph-turner-lucerne-from-the-lake.jpg") bottom no-repeat;
    background-size: 100% auto;

    &.md {
        min-height: 70rem;
    }

    &.sm {
        min-height: 60rem;
    }
}

.layout-painting-caption {
    position: absolute;
    bottom: 3rem;
    left: 1rem;
    padding: 0.5rem;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.6rem;
    background-color: rgba(0, 0, 0, 0.2);
}
</style>