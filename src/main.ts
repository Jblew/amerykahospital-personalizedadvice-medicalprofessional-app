// tslint:disable:no-console

import "firebaseui/dist/firebaseui.css";
import "material-design-icons-iconfont/dist/material-design-icons.css"; // Ensure you are using css-loader
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import WebFontLoader from "webfontloader";

import App from "./App.vue";
import "./components/common/common_components";
import "./filters";
import router from "./router";
import { routes } from "./routes";
import { AdviceModule } from "./store/modules/advice/AdviceModule";
import { AuthModule } from "./store/modules/auth/AuthModule";
import { Actions, s, store } from "./store/store";

Vue.config.productionTip = false;

// Vuetify
Vue.use(Vuetify);

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
        WebFontLoader.load({
            google: {
                families: ["Roboto:100,300,400,500,700,900"],
            },
            active: this.setFontLoaded,
        });
    },
    methods: {
        setFontLoaded() {
            this.$emit("font-loaded");
        },
    },
}).$mount("#app");
