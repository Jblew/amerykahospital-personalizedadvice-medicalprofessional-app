// tslint:disable:no-console

import "firebase/app";
import "firebase/firestore";
import "firebaseui/dist/firebaseui.css";
import Vue from "vue";

import App from "./App.vue";
import "./components/common/common_components";
import "./filters";
import vuetify from "./plugins/vuetify.js"; // path to vuetify export
import router from "./router";
import { routes } from "./routes";
import { AdviceModule } from "./store/modules/advice/AdviceModule";
import { AuthModule } from "./store/modules/auth/AuthModule";
import { Actions, s, store } from "./store/store";

export default () =>
    new Vue({
        router,
        store,
        render: h => h(App),
        computed: {
            authState(): AuthModule.AuthState {
                return s(this.$store).state.auth.state;
            },
        },
        watch: {
            authState(authState, oldAuthState) {
                if (authState === AuthModule.AuthState.NOTAUTHENTICATED) {
                    this.$router.push(routes.auth.path);
                } else if (authState === AuthModule.AuthState.AUTHENTICATED) {
                    console.log("Dispatch loadList");
                    this.$store.dispatch(AdviceModule.Actions.updateQueryFilterAndReloadList, {});
                }
            },
        },
        created() {
            this.$store.dispatch(Actions.initialize);
        },
        mounted() {
            //
        },
        methods: {},
        ...({ vuetify } as any), // type incompatibility
    });
