<template>
  <div class="advice-list-filter-form">
    <v-card class="mb-3 elevation-1" color="primary" dark>
      <v-form>
        <v-container fill-height>
          <v-layout align-center>
            <v-flex xs12 md3 lg4 class="mx-2">
              <v-text-field
                v-model="medicalprofessionalName"
                valid="true"
                :label="text.medicalprofessionalName"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 md3 lg3 class="mx-2">
              <v-text-field v-model="patientName" valid="true" :label="text.patientName"></v-text-field>
            </v-flex>

            <v-flex xs12 md3 lg3 class="mx-2">
              <v-text-field
                v-model="parentPhoneNumber"
                valid="true"
                :label="text.parentPhoneNumber"
              ></v-text-field>
            </v-flex>
            <v-flex xs6 md1 lg1 class="mx-1" text-center>
              <v-btn @click="filterAdvices" color="accent" fab class="elevation-4">
                <v-icon>fa-search</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs6 md2 lg1 class="mx-1" text-center>
              <v-btn outlined @click="resetFilters">{{ text.showAll }}</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { labels } from "../../global";
import { AdviceModule } from "../../store/modules/advice/AdviceModule";

export default Vue.extend({
    data() {
        return {
            text: {
                medicalprofessionalName: labels.professionalName,
                patientName: labels.patientName,
                parentPhoneNumber: labels.parentPhoneNumber,
                searchAdvice: labels.searchAdvice,
                showAll: labels.showAll,
            },
            medicalprofessionalName: "",
            patientName: "",
            parentPhoneNumber: "",
        };
    },
    computed: {},
    methods: {
        filterAdvices() {
            const filter = {
                medicalprofessionalName:
                    this.medicalprofessionalName.length > 0 ? this.medicalprofessionalName : undefined,
                patientName: this.patientName.length > 0 ? this.patientName : undefined,
                parentPhoneNumber: this.parentPhoneNumber.length > 0 ? this.parentPhoneNumber : undefined,
            };
            AdviceModule.Actions.UpdateQueryFilterAndReloadList.dispatch(this.$store.dispatch, filter);
        },
        resetFilters() {
            this.medicalprofessionalName = "";
            this.patientName = "";
            this.parentPhoneNumber = "";
            this.filterAdvices();
        },
    },
    components: {},
});
</script>
<style scoped lang="scss">
</style>