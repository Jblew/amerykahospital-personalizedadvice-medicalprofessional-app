<template>
  <div class="advice-list-filter-form">
    <v-card class="mb-3 elevation-1">
      <v-form v-model="valid">
        <v-container>
          <v-layout>
            <v-flex xs12 md3>
              <v-text-field v-model="professionalName" valid="true" :label="text.professionalName"></v-text-field>
            </v-flex>

            <v-flex xs12 md3>
              <v-text-field v-model="patientName" valid="true" :label="text.patientName"></v-text-field>
            </v-flex>

            <v-flex xs12 md3>
              <v-text-field
                v-model="parentPhoneNumber"
                valid="true"
                :label="text.parentPhoneNumber"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md3>
              <v-btn color="info">{{ text.searchAdvice }}</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { labels, s } from "../../global";
import { AdviceModule } from "../../store/modules/advice/AdviceModule";
import { Advice } from "ahpaa-core";

export default Vue.extend({
    name: "AdviceListPanel",
    data() {
        return {
            text: {
                professionalName: labels.professionalName,
                patientName: labels.patientName,
                parentPhoneNumber: labels.parentPhoneNumber,
                searchAdvice: labels.searchAdvice,
            },
            professionalName: "",
            patientName: "",
            parentPhoneNumber: "",
        };
    },
    computed: {},
    methods: {},
    components: {},
});
</script>
<style scoped lang="scss">
</style>