import firebase from "firebase/app";

import { FIREBASE_CONFIG } from "../../../firebase.config";

export class FirebaseAuthHelper {
    public static initialize(opts: FirebaseAuthHelper.InitializeOptions) {
        firebase.initializeApp(FIREBASE_CONFIG);
        firebase.auth().onAuthStateChanged((user: FirebaseAuthHelper.User | null) => {
            if (user) {
                opts.authenticatedCb(user);
            } else {
                opts.notAuthenticatedCb();
            }
        });
    }

    public static async signOut() {
        await firebase.auth().signOut();
    }
}

export namespace FirebaseAuthHelper {
    export interface InitializeOptions {
        authenticatedCb: (user: FirebaseAuthHelper.User) => void;
        notAuthenticatedCb: () => void;
    }

    export type User = firebase.User;
}
