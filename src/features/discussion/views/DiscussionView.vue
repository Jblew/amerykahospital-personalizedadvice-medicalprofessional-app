<template>
    <role-guard-component :role="role">
        <discussion-container ref="discussionContainer" />
    </role-guard-component>
</template>

<script lang="ts">
import Vue from "vue";

import { RoleGuardComponent } from "@/features/auth";
import { DiscussionContainer } from "../components";
import { RoleKey } from "amerykahospital-personalizedadvice-businesslogic";

export default Vue.extend({
    data() {
        return {
            role: RoleKey.medicalprofessional,
        };
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            (this.$refs.discussionContainer as any).initializeChat();
        });
    },
    beforeRouteLeave(to, from, next) {
        (this.$refs.discussionContainer as any).teardownChat();
        next();
    },
    components: {
        RoleGuardComponent,
        DiscussionContainer,
    },
});
</script>