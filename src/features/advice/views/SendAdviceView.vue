<template>
    <role-guard-component :role="role">
        <div class="home">
            <h1 class="mb-3 ml-2">{{ text.sendAdvice }}</h1>
            <add-advice-panel />
        </div>
    </role-guard-component>
</template>

<script lang="ts">
import Vue from "vue";

import { labels } from "../../../global";
import AddAdvicePanel from "../components/add-advice/AddAdvicePanel.vue";
import { RoleGuardComponent } from "@/features/auth";
import { RoleKey } from "amerykahospital-personalizedadvice-businesslogic";

export default Vue.extend({
    name: "send-advice",
    data() {
        return {
            text: {
                sendAdvice: labels.sendAdvice,
                role: RoleKey.medicalprofessional,
            },
        };
    },
    components: {
        AddAdvicePanel,
        RoleGuardComponent,
    },
});
</script>
