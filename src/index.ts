// tslint:disable:no-console

import "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebaseui/dist/firebaseui.css";
import { RolesAuthModule } from "firestore-roles-vuex-module";
import Vue from "vue";

import App from "./App.vue";
import "./components/common/common_components";
import { AdviceModule } from "./features/advice/store/AdviceModule";
import "./filters";
import { initFirebase } from "./plugins/firebase";
import createRouter from "./plugins/router";
import vuetify from "./plugins/vuetify.js";
import { RootStore } from "./store/Store";
import { StoreImpl } from "./store/StoreImpl";
import "./style/style.scss";

export default () => {
    console.log("Vue initializer startup");
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
                if (authState === RolesAuthModule.AuthState.AUTHENTICATED) {
                    AdviceModule.Actions.UpdateQueryFilterAndReloadList.dispatch(this.$store.dispatch, {});
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
