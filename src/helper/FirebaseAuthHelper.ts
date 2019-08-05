// tslint:disable:ordered-imports no-console

import firebase from "firebase/app";
import "firebase/firestore";
import * as firebaseui from "firebaseui";

import { FirestoreCollections, FIREBASE_CONFIG } from "amerykahospital-personalizedadvice-core";

export class FirebaseAuthHelper {
    public static initialize(opts: FirebaseAuthHelper.InitializeOptions) {
        firebase.initializeApp(FIREBASE_CONFIG);
        firebase.auth().onAuthStateChanged(
            (user: FirebaseAuthHelper.User | null) => {
                if (user) {
                    opts.authenticatedCb(user);
                } else {
                    opts.notAuthenticatedCb();
                }
            },
            (error: firebase.auth.Error) => {
                console.error(`Auth error: ${error.message}`);
                opts.errorCb(error.message);
            },
        );
    }

    public static async signOut() {
        await firebase.auth().signOut();
    }

    public static doAuth(): firebase.auth.Auth {
        return firebase.auth();
    }

    public static startFirebaseAuthUI(id: string, signInSuccessfulUrl: string, signInProviders: string[]) {
        const uiConfig = {
            signInSuccessUrl: signInSuccessfulUrl,
            signInOptions: signInProviders,
        };
        FirebaseAuthHelper.UI_INSTANCE =
            FirebaseAuthHelper.UI_INSTANCE || new firebaseui.auth.AuthUI(FirebaseAuthHelper.doAuth());
        FirebaseAuthHelper.UI_INSTANCE.start(id, uiConfig);
    }

    public static async checkIfUserIsConfirmedMedicalProfessional(uid: string) {
        const res = await firebase
            .firestore()
            .collection(FirestoreCollections.MEDICALPROFESSIONAL_UIDS_COLLECTION)
            .doc(uid)
            .get();
        return res.exists;
    }

    private static UI_INSTANCE: firebaseui.auth.AuthUI | undefined = undefined;
}

export namespace FirebaseAuthHelper {
    export interface InitializeOptions {
        authenticatedCb: (user: FirebaseAuthHelper.User) => void;
        errorCb: (msg: string) => void;
        notAuthenticatedCb: () => void;
    }

    export type User = firebase.User;
}
