<template>
    <v-container flex>
        <!--<medicalprofessional-loading-state class="my-3" />

        <medicalprofessional-list-panel class="my-3" />-->

        <fab-activated-dialog-card :max-width="600" tooltip="Dodaj lekarza" dialog-title="Dodaj lekarza">
            <v-card-text>
                Inside card
            </v-card-text>
        </fab-activated-dialog-card>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    computed: {

    },
});
</script>
<style scoped lang="scss">

</style>
