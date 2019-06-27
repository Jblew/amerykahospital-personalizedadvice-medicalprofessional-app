<template>
  <div v-if="authenticated">
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
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
            <v-btn flat small @click="signOut()">Sign out</v-btn>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase";
import { s } from "../../global";
import { AuthModule } from "../../store/modules/auth/AuthModule";

export default Vue.extend({
    name: "ProfileComponent",
    data() {
        return {};
    },
    computed: {
        authenticated(): boolean {
            return s(this.$store).state.auth.state === AuthModule.AuthState.AUTHENTICATED;
        },
        photoUrl(): string {
            console.log("photoUrl", s(this.$store).state.auth.profileImageURL);
            return s(this.$store).state.auth.profileImageURL || "";
        },
        name(): string {
            console.log("name", s(this.$store).state.auth.username);
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