<template>
  <div v-if="authenticated">
    <v-toolbar flat class="transparent">
      <v-list class="pa-0 pb-0 mb-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="photoUrl">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile>
          <v-list-tile-content>
            <v-btn small @click="signOut()">{{ text.signOut }}</v-btn>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { s, labels } from "../../global";
import { AuthModule } from "../../store/modules/auth/AuthModule";

export default Vue.extend({
    name: "ProfileComponent",
    data() {
        return {
            text: {
                signOut: labels.logOut,
            },
        };
    },
    computed: {
        authenticated(): boolean {
            return s(this.$store).state.auth.state === AuthModule.AuthState.AUTHENTICATED;
        },
        photoUrl(): string {
            return s(this.$store).state.auth.profileImageURL || "";
        },
        name(): string {
            return s(this.$store).state.auth.username || "";
        },
    },
    methods: {
        signOut() {
            s(this.$store).dispatch(AuthModule.Actions.logout);
        },
    },
});
</script>