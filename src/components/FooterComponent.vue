<template>
  <v-footer height="auto" :color="colors.primary">
    <v-layout justify-center row wrap>
      <v-flex dark text-xs-center white--text xs12 caption>
        &copy; {{ yearStr }} by
        <a :href="links.author" target="_blank">{{ text.author }}</a>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script lang="ts">
// @ts-check

import Vue from "vue";

import { config } from "../global";

export default Vue.extend({
    props: [],
    data() {
        return {
            text: {
                author: config.author.display,
            },
            links: {
                author: config.author.link,
            },
            colors: {
                primary: config.colors.primary,
            },
        };
    },
    computed: {
        yearStr: () => {
            const y = new Date().getFullYear();
            return "2019" + (y > 2019 ? "-" + y : "");
        },
    },
    components: {},
});
</script>

<style lang="scss" scoped>
a {
    text-decoration: underline;
    color: white !important;
}

a:hover {
    text-decoration: none;
}
</style>