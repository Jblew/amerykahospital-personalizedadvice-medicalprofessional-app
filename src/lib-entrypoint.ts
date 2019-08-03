import VueInitializer from "./index";

export namespace AmerykahospitalPersonalizedadviceMedicalprofessionalappUI {
    export function mount(tag: string) {
        const vueEntry = VueInitializer();
        vueEntry.$mount(tag);
    }
}
