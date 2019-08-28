import ow from "ow";

export interface Configuration {
    firebase: {
        apiKey: string;
        authDomain: string;
        databaseURL: string;
        projectId: string;
        messagingSenderId: string;
        appId: string;
    };
    basePath: string;
}

export namespace Configuration {
    export function validate(c: Configuration) {
        ow(c.firebase, "Configuration.firebase", ow.object);
        ow(c.firebase.apiKey, "Configuration.firebase.apiKey", ow.string.nonEmpty);
        ow(c.firebase.authDomain, "Configuration.firebase.authDomain", ow.string.nonEmpty);
        ow(c.firebase.databaseURL, "Configuration.firebase.databaseURL", ow.string.url);
        ow(c.firebase.projectId, "Configuration.firebase.projectId", ow.string.nonEmpty);
        ow(c.firebase.messagingSenderId, "Configuration.firebase.messagingSenderId", ow.string.nonEmpty);
        ow(c.firebase.appId, "Configuration.firebase.appId", ow.string.nonEmpty);

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
