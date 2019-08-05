// tslint:disable
import Vue from "vue";
import Vuetify from "vuetify/lib";
Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: "fa",
    },
    theme: {
        themes: {
            light: {
                accent: "#D20738",
                footer: "#00885B",
                primary: "#00885B",
                secondary: "#1B88E5",
            },
        },
    },
});