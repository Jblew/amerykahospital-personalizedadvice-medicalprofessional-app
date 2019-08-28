<template>
    <div>
        <profile-component />
        <p>&nbsp;</p>

        <drawer-menu />
    </div>
</template>

<script lang="ts">
import Vue from "vue";

import DrawerMenu from "./DrawerMenu.vue";
import MaterialDrawerTileRouter from "./MaterialDrawerTileRouter.vue";
import ProfileComponent from "./ProfileComponent.vue";

export default Vue.extend({
    components: {
        MaterialDrawerTileRouter,
        ProfileComponent,
        DrawerMenu,
    },
});
</script>

<style lang="scss" scoped>
</style>