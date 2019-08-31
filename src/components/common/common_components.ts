import Vue from "vue";

import AugmentedErrorComponent from "./AugmentedErrorComponent.vue";
import AugmentedStatusComponent from "./AugmentedStatusComponent.vue";
import FabActivatedDialogCard from "./FabActivatedDialogCard.vue";
import GenericActivatedDialogCard from "./GenericActivatedDialogCard.vue";
import LoadingIndicator from "./LoadingIndicator.vue";

// register lib components
Vue.component("loading-indicator", LoadingIndicator);
Vue.component("generic-activated-dialog-card", GenericActivatedDialogCard);
Vue.component("fab-activated-dialog-card", FabActivatedDialogCard);
Vue.component("augmented-error-component", AugmentedErrorComponent);
Vue.component("augmented-status-component", AugmentedStatusComponent);
