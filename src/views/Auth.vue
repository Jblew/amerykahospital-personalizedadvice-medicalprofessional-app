<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script lang="ts">
import firebase from "firebase/app";
import firebaseui from "firebaseui";
import { routes } from "../routes";
import Vue from "vue";

export default Vue.extend({
  name: "auth",
  mounted() {
    const uiConfig = {
      signInSuccessUrl: routes.home.path,
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }
});
</script>