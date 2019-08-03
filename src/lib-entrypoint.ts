import { Configuration } from "./Configuration";
import VueInitializer from "./index";

export namespace AmerykahospitalPersonalizedadviceMedicalprofessionalappUI {
    export function mount(tag: string, config: Configuration) {
        window.AHPA_MEDICALPROFESSIONAL_CONFIGURATION = config;
        const vueEntry = VueInitializer();
        vueEntry.$mount(tag);
    }
}
