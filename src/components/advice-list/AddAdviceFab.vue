<template>
  <span>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          class="add-btn"
          fixed
          dark
          fab
          large
          bottom
          right
          color="accent"
          @click.stop="addAdvice"
          v-on="on"
        >
          <v-icon>fa-plus</v-icon>
        </v-btn>
      </template>
      <span>{{ text.sendAdvice }}</span>
    </v-tooltip>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ text.sendAdvice }}</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid fill-height>
            <v-layout justify-center align-start>
              <v-flex>
                <add-advice-panel />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDialog()">{{ text.close }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script lang="ts">
import AddAdvicePanel from "@/components/add-advice/AddAdvicePanel.vue";
import Vue from "vue";

import { labels } from "../../global";
import { AdviceModule } from "../../store/modules/advice/AdviceModule";

export default Vue.extend({
    data() {
        return {
            dialog: false,
            text: {
                sendAdvice: labels.sendAdvice,
                close: labels.close,
            },
        };
    },
    methods: {
        addAdvice() {
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;
            AdviceModule.Actions.ResetResults.dispatch(this.$store.dispatch);
        },
    },
    components: {
        AddAdvicePanel,
    },
});
</script>
<style scoped lang="scss">
.add-btn {
    margin-bottom: 5em;
    margin-right: 4em;
}
</style>