<template>
  <v-list-tile :to="to">
    <v-list-tile-action>
      <v-icon>{{ icon }}</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>
        <slot></slot>
      </v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["to", "icon"],
  data() {
    return {};
  },
  methods: {},
  computed: {},
  components: {}
});
</script>
