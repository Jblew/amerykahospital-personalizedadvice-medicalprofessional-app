import Vue from "vue";

import LoadingIndicator from "./LoadingIndicator.vue";
import DrawerTile from "./MaterialDrawerTileRouter.vue";
import ProfileComponent from "./ProfileComponent.vue";

// register lib components
Vue.component("material-drawer-tile-router", DrawerTile);
Vue.component("profile-component", ProfileComponent);
Vue.component("loading-indicator", LoadingIndicator);
