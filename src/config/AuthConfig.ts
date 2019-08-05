import * as firebase from "firebase/app";
import "firebase/auth";

export class AuthConfig {
    public static PROVIDERS: string[] = [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ];
}
