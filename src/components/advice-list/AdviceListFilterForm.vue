<template>
  <div class="advice-list-filter-form">
    <v-card class="mb-3 elevation-1">
      <v-form>
        <v-container>
          <v-layout>
            <v-flex xs12 md3>
              <v-text-field
                v-model="medicalprofessionalName"
                valid="true"
                :label="text.medicalprofessionalName"
              ></v-text-field>
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
            <v-flex xs6 md1>
              <v-btn @click="filterAdvices" color="info" fab class="elevation-4">
                <v-icon>fa-search</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs6 md2 class="ma-2">
              <v-btn @click="resetFilters">{{ text.showAll }}</v-btn>
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

export default Vue.extend({
    name: "AdviceListPanel",
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
            s(this.$store).dispatch(AdviceModule.Actions.updateQueryFilterAndReloadList, filter);
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