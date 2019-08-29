import * as firebase from "firebase/app";

export class AuthConfig {
    public static PROVIDERS: string[] = [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ];

    public static ROLE_CHECKING_FREQUENCY_SECONDS = {
        whenHasRole: 5 * 60,
        whenDoesNotHaveRole: 7,
    };
}
