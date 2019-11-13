<template>
    <div>
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-chip x-small color="success" v-on="on">+ {{ count }} podz</v-chip>
            </template>
            <span v-html="tooltipHtml" />
        </v-tooltip>
    </div>
</template>

<script lang="ts">
import { labels } from "@/global";
import Vue from "vue";

function formatCount(thanksCount: number) {
    if (thanksCount === 1) return "1 podziękowanie";
    else if (thanksCount >= 2 && thanksCount <= 4) return `${thanksCount} podziękowania`;
    else return `${thanksCount} podziękowań`;
}

export default Vue.extend({
    props: {
        count: Number,
    },
    computed: {
        tooltipHtml() {
            return `<strong>+ ${formatCount(this.count)} od pacjenta</strong><hr />${labels.thanksInfoHtml}`;
        },
    },
    filters: {
        formatCount,
    },
});
</script>
<style lang="scss" scoped>
.thanksBadge {
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    color: #fff;
    background-color: #28a745;
}
</style>