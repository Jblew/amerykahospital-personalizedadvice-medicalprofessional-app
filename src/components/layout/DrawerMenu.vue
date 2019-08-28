<template>
    <v-list dense>
        <v-divider></v-divider>

        <material-drawer-tile-router
            v-for="item in drawerMenu"
            :key="item.text"
            :to="item.link"
            :icon="item.icon"
        >{{ item.text }}</material-drawer-tile-router>
    </v-list>
</template>

<script lang="ts">
import Vue from "vue";

import { drawerMenu } from "../../config/drawer-menu";

import MaterialDrawerTileRouter from "./MaterialDrawerTileRouter.vue";

export default Vue.extend({
    props: [],
    data() {
        return {
            drawerMenu,
        };
    },
    methods: {},
    computed: {},
    components: {
        MaterialDrawerTileRouter,
    },
});
</script>
