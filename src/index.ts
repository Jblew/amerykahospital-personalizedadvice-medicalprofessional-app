// tslint:disable:no-console

import "firebase/app";
import "firebase/firestore";
import "firebaseui/dist/firebaseui.css";
import { RolesAuthModule } from "firestore-roles-vuex-module";
import Vue from "vue";

import App from "./App.vue";
import "./components/common/common_components";
import "./filters";
import { initFirebase } from "./plugins/firebase";
import vuetify from "./plugins/vuetify.js"; // path to vuetify export
import createRouter from "./router";
import { routes } from "./routes";
import { AdviceModule } from "./store/modules/advice/AdviceModule";
import { RootStore } from "./store/Store";
import { StoreImpl } from "./store/StoreImpl";

export default () => {
    initFirebase();

    return new Vue({
        router: createRouter(),
        store: StoreImpl.constructStore(),
        render: h => h(App),
        computed: {
            authState(): RolesAuthModule.AuthState {
                return RolesAuthModule.stateOf(this).state;
            },
        },
        watch: {
            authState(authState, oldAuthState) {
                if (authState === RolesAuthModule.AuthState.NOTAUTHENTICATED) {
                    this.$router.push(routes.auth.path);
                } else if (authState === RolesAuthModule.AuthState.AUTHENTICATED) {
                    console.log("Dispatch loadList");
                    this.$store.dispatch(AdviceModule.Actions.updateQueryFilterAndReloadList, {});
                }
            },
        },
        created() {
            this.$store.dispatch(RootStore.Actions.initialize);
        },
        mounted() {
            //
        },
        methods: {},
        ...({ vuetify } as any), // type incompatibility
    });
};
