<template>
  <v-footer app height="auto" color="footer" dark>
    <v-layout justify-center row wrap>
      <v-flex text-center xs12 caption>
        &copy; {{ yearStr }} by
        <a :href="links.author" target="_blank">{{ text.author }}</a>

        <v-divider vertical class="mx-3" />
        <a :href="links.license">{{ text.licenseCode }}</a>

        <v-divider vertical class="mx-3" />
        {{ text.thisIsAFreeSoftware }}:
        <a :href="links.source">{{ text.getSource }}</a>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script lang="ts">
// @ts-check

import Vue from "vue";

import { labels, visualConfig } from "../../global";

export default Vue.extend({
    props: [],
    data() {
        return {
            text: {
                author: visualConfig.author.display,
                licenseCode: visualConfig.license.code,
                thisIsAFreeSoftware: labels.thisIsAFreeSoftware,
                getSource: labels.getSource,
            },
            links: {
                author: visualConfig.author.link,
                license: visualConfig.license.url,
                source: visualConfig.source.url,
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