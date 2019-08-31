<template>
    <span>
        <v-tooltip left>
            <template v-slot:activator="{ on }">
                <slot name="button" :on="on"></slot>
            </template>
            <span>{{ tooltip }}</span>
        </v-tooltip>

        <v-dialog v-model="dialog" persistent :max-width="maxWidth + 'px'">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ dialogTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <slot></slot>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="closeDialog()">{{ text.close }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </span>
</template>

<script lang="ts">
    import { labels } from "@/global";
    import Vue from "vue";

    export default Vue.extend({
        props: {
            dialogTitle: String,
            tooltip: String,
            maxWidth: Number,
        },
        data() {
            return {
                dialog: false,
                text: {
                    close: labels.close,
                },
            };
        },
        methods: {
            openDialog() {
                this.dialog = true;
                this.$emit("openDialog");
            },
            closeDialog() {
                this.dialog = false;
                this.$emit("closeDialog");
            },
        },
    });
</script>
<style scoped lang="scss">
    .add-btn {
        margin-bottom: 5em;
        margin-right: 4em;
    }
</style>
