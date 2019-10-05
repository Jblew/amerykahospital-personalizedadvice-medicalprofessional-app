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
            const discussionContainer: any = vm.$refs.discussionContainer;
            if (discussionContainer) discussionContainer.initializeChat();
        });
    },
    beforeRouteLeave(to, from, next) {
        const discussionContainer: any = this.$refs.discussionContainer;
        if (discussionContainer) discussionContainer.teardownChat();
        next();
    },
    components: {
        RoleGuardComponent,
        DiscussionContainer,
    },
});
</script>