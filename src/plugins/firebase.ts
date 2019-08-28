import { Configuration } from "@/config/Configuration";
import * as firebase from "firebase/app";

export function initFirebase() {
    firebase.initializeApp(Configuration.get().firebase);
}
