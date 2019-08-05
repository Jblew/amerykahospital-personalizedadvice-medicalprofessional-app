import ow from "ow";

export interface Configuration {
    basePath: string;
}

export namespace Configuration {
    export function validate(c: Configuration) {
        ow(c.basePath, "Configuration.basePath", ow.string.nonEmpty);
    }

    export function get(): Configuration {
        if (!window.AHPA_MEDICALPROFESSIONAL_CONFIGURATION) {
            throw new Error("You must set the window.AHPA_MEDICALPROFESSIONAL_CONFIGURATION env");
        }
        return window.AHPA_MEDICALPROFESSIONAL_CONFIGURATION;
    }
}

declare global {
    interface Window {
        AHPA_MEDICALPROFESSIONAL_CONFIGURATION: Configuration;
    }
}
