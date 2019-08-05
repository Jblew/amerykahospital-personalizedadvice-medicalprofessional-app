import { FIREBASE_CONFIG } from "amerykahospital-personalizedadvice-core";
import * as firebase from "firebase/app";

export function initFirebase() {
    firebase.initializeApp(FIREBASE_CONFIG);
}
