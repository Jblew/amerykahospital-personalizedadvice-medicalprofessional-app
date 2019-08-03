<template>
  <div class="advicelist">
    <h1 class="mb-3 ml-2">
      {{ text.adviceList }}
      <v-btn small outlined class="mb-3" @click="addAdvice">{{ text.sendAdvice }}</v-btn>
    </h1>
    <advice-list-panel />
    <v-btn
      class="add-btn"
      absolute
      dark
      fab
      large
      bottom
      right
      :color="colors.floatingAddButton"
      @click="addAdvice"
    >
      <v-icon>fa-plus</v-icon>
    </v-btn>

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
          <v-btn color="blue darken-1" text @click="closeDialog()">{{ text.close }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import AddAdvicePanel from "@/components/add-advice/AddAdvicePanel.vue";
import AdviceListPanel from "@/components/advice-list/AdviceListPanel.vue";
import Vue from "vue";

import { labels, s } from "../global";
import { AdviceModule } from "../store/modules/advice/AdviceModule";

export default Vue.extend({
    name: "ListView",
    data() {
        return {
            dialog: false,
            text: {
                adviceList: labels.adviceList,
                sendAdvice: labels.sendAdvice,
                close: labels.close,
            },
            colors: {
                floatingAddButton: "pink",
            },
        };
    },
    methods: {
        addAdvice() {
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;
            s(this.$store).dispatch(AdviceModule.Actions.resetResults);
        },
    },
    components: {
        AdviceListPanel,
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