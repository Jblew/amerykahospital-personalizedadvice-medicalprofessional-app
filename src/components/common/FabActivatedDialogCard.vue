<template>
    <generic-activated-dialog-card
        ref="genericActivatedDialog"
        :tooltip="tooltip"
        :max-width="maxWidth"
        :dialog-title="dialogTitle"
        @closeDialog="emitCloseDialog()"
    >
        <template v-slot:button="{ on }">
            <v-btn
                class="dialog-fab"
                fixed
                dark
                fab
                large
                bottom
                right
                :color="color"
                @click.stop="disabled || openDialog()"
                v-on="on"
            >
                <v-icon>fa-plus</v-icon>
            </v-btn>
        </template>
        <slot></slot>
    </generic-activated-dialog-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        dialogTitle: String,
        tooltip: String,
        maxWidth: Number,
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        color() {
            return this.disabled ? "gray" : "accent";
        },
    },
    methods: {
        openDialog() {
            (this.$refs.genericActivatedDialog as any).openDialog();
            this.$emit("openDialog");
        },
        emitCloseDialog() {
            this.$emit("closeDialog");
        },
    },
});
</script>
<style scoped lang="scss">
.dialog-fab {
    margin-bottom: 5em;
    margin-right: 4em;
}
</style>
