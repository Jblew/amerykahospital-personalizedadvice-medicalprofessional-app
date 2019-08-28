<template>
    <v-container fluid>
        <v-row class="conversation-row">
            <v-col cols="10" md="9" sm="8" class="bordered">
                <div v-for="msg in channelMessagesSorted" :key="msg.id">
                    <strong>{{ msg.fromName }}</strong>
                    {{ msg.message }}
                    <i>{{ new Date(msg.timestampMs).toTimeString() }}</i>
                </div>
            </v-col>
            <v-col cols="2" md="3" sm="4" class="bordered">List of channels and users</v-col>
        </v-row>
        <v-row>
            <v-col cols="10" md="9" sm="8" class="bordered">
                <v-text-field
                    label="Filled"
                    placeholder="Placeholder"
                    filled
                    v-model="messageToSend"
                    v-on:keyup.enter="sendMessage"
                ></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
// tslint:disable

import { ChatMessage, ChatRepository, PendingChatMessage } from "amerykahospital-personalizedadvice-businesslogic";
import { ChatRepositoryFactory } from "amerykahospital-personalizedadvice-db";
import * as firebase from "firebase/app";
import { RolesAuthModule } from "firestore-roles-vuex-module";
import Vue from "vue";

import { Configuration } from "../../../config/Configuration";
import { NotificationsModule } from "vuex-notifications-module";

let chatRepository: ChatRepository;

function getChatRepository(): ChatRepository {
    return (chatRepository = chatRepository || ChatRepositoryFactory.make(firebase.database()));
}

let cancellationHandlers: Array<{ cancel: () => void }> = [];

export default Vue.extend({
    data() {
        return {
            messageToSend: "",
            channel: Configuration.get().chatConfig.defaultChannel,
            channelMessages: [] as ChatMessage[],
            loadingError: "",
            sendingError: "",
        };
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            (vm as any).initializeChat();
        });
    },
    beforeRouteLeave(to, from, next) {
        this.teardownChat();
        next();
    },
    computed: {
        account() {
            return RolesAuthModule.stateOf(this).account;
        },
        channelMessagesSorted(): ChatMessage[] {
            return this.channelMessages.sort((a, b) => a.timestampMs - b.timestampMs);
        },
    },
    methods: {
        async sendMessage() {
            try {
                if (!this.account) {
                    throw new Error("Missing account");
                }
                const message: PendingChatMessage = {
                    toChannel: this.channel,
                    fromName: this.account.displayName || "-null-name-",
                    fromUid: this.account.uid,
                    message: this.messageToSend,
                };
                await getChatRepository().addMessage(this.account, message);
                this.messageToSend = "";
                this.sendingError = "";
            } catch (error) {
                console.error(error);
                NotificationsModule.Actions.ShowNotification.dispatch(this.$store.dispatch, {
                    message: error.message,
                    timeoutMs: 5000,
                    params: {},
                });
                this.sendingError = error.message;
            }
        },
        async initializeChat() {
            try {
                // await this.loadChannel(this.channel);
                await this.listenToChannel(this.channel);
                this.loadingError = "";
            } catch (error) {
                console.error(error);
                NotificationsModule.Actions.ShowNotification.dispatch(this.$store.dispatch, {
                    message: error.message,
                    timeoutMs: 5000,
                    params: {},
                });
                this.loadingError = error.message;
            }
        },
        teardownChat() {
            this.stopListeningToAll();
        },
        async loadChannel(channel: string) {
            this.channelMessages = await getChatRepository().listToChannel(channel);
        },
        async listenToChannel(channel: string) {
            const cancellationHandler = getChatRepository().listenForMessagesToChannel(channel, msg => {
                this.channelMessages = [...this.channelMessages, msg];
            });
            cancellationHandlers.push(cancellationHandler);
        },
        stopListeningToAll() {
            cancellationHandlers.forEach(h => h.cancel());
            cancellationHandlers = [];
        },
    },
    components: {},
});
</script>
<style scoped lang="scss">
.bordered {
    border: 1px solid red;
}
.conversation-row {
    min-height: 30rem;
}
</style>