import Vue from "vue";
import colors from "vuetify/lib/util/colors";
import Vuetify from "vuetify/lib";
Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: "fa",
    },
    theme: {
        themes: {
            light: {
                primary: "#00885B",
                accent: "#D20738",
                secondary: "#1B88E5",
                footer: "#00885B",
            },
        },
    },
});