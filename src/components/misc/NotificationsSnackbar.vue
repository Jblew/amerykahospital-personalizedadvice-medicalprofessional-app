<template>
  <div>
    <v-snackbar v-model="opened" :color="this.color">{{ message }}</v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { NotificationsModule } from "vuex-notifications-module";

export default Vue.extend({
    computed: {
        opened(): boolean {
            return NotificationsModule.stateOf(this).notifications.length > 0;
        },
        message(): string {
            const message = this.opened ? NotificationsModule.stateOf(this).notifications[0].message : "";
            return message;
        },
        params(): any {
            return this.opened ? NotificationsModule.stateOf(this).notifications[0].params : {};
        },
        color(): string | undefined {
            return this.params.color || undefined;
        },
    },
});
</script>