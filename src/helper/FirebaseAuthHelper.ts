import * as firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";

export class FirebaseAuthHelper {
    public static startFirebaseAuthUI(id: string, signInSuccessfulUrl: string, signInProviders: string[]) {
        const uiConfig = {
            signInSuccessUrl: signInSuccessfulUrl,
            signInOptions: signInProviders,
        };
        FirebaseAuthHelper.UI_INSTANCE = FirebaseAuthHelper.UI_INSTANCE || new firebaseui.auth.AuthUI(firebase.auth());
        FirebaseAuthHelper.UI_INSTANCE.start(id, uiConfig);
    }

    private static UI_INSTANCE: firebaseui.auth.AuthUI | undefined = undefined;
}
