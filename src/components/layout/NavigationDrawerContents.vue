<template>
  <div>
    <profile-component />
    <p>&nbsp;</p>

    <v-list dense>
      <v-divider></v-divider>

      <material-drawer-tile-router :to="to.list" icon="fa-list">{{ text.list | capitalize }}</material-drawer-tile-router>
      <material-drawer-tile-router
        :to="to.add"
        icon="fa-tachometer-alt"
      >{{ text.sendAdvice | capitalize }}</material-drawer-tile-router>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { labels } from "../../global";
import { routes } from "../../routes";

import MaterialDrawerTileRouter from "./MaterialDrawerTileRouter.vue";
import ProfileComponent from "./ProfileComponent.vue";

export default Vue.extend({
    props: [],
    data() {
        return {
            text: {
                sendAdvice: labels.sendAdvice,
                list: labels.adviceList,
            },
            to: {
                list: routes.list,
                add: routes.sendAdvice,
            },
        };
    },
    methods: {},
    computed: {},
    components: {
        MaterialDrawerTileRouter,
        ProfileComponent,
    },
});
</script>

<style lang="scss" scoped>
</style>