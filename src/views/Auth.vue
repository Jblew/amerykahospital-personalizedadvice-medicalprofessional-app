<template>
  <div>
    <h1>Zaloguj się</h1>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script lang="ts">
import { FirebaseAuthHelper } from "ahpaa-core";
import Vue from "vue";

import { routes } from "../routes";

export default Vue.extend({
    name: "auth",
    mounted() {
        FirebaseAuthHelper.startFirebaseAuthUI("#firebaseui-auth-container", routes.home.path);
    },
});
</script>