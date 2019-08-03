<template>
  <div v-if="authenticated">
    <v-toolbar flat class="transparent">
      <v-list class="pa-0 pb-0 mb-0">
        <v-list-item avatar>
          <v-list-item-avatar>
            <img :src="photoUrl" v-if="photoUrl.length > 0" />
            <v-icon v-else>person</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-toolbar>
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-item>
          <v-list-item-content>
            <v-btn small @click="signOut()">{{ text.signOut }}</v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { labels, s } from "../../global";
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