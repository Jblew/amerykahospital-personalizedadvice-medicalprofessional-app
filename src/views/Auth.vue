<template>
  <div>
    <h1>Zaloguj się</h1>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script lang="ts">
import { FirebaseAuthHelper } from "ahpaa-core";
import firebase from "firebase/app";
import firebaseui from "firebaseui";
import Vue from "vue";

import { routes } from "../routes";

export default Vue.extend({
    name: "auth",
    mounted() {
        const uiConfig = {
            signInSuccessUrl: routes.home.path,
            signInOptions: FirebaseAuthHelper.getSignInProviders(),
        };
        const ui = new firebaseui.auth.AuthUI(FirebaseAuthHelper.doAuth());
        ui.start("#firebaseui-auth-container", uiConfig);
    },
});
</script>