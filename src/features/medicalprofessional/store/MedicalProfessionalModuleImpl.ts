// tslint:disable:no-console max-classes-per-file

import * as firebase from "firebase/app";
import { GetterTree, Module } from "vuex";

import { constructActions } from "./impl_actions";
import { state } from "./impl_state";
import { MedicalProfessionalModule as Me } from "./MedicalProfessionalModule";
import { mutationHandlers } from "./Mutations";

export function constructMedicalProfessionalModule(firestore: firebase.firestore.Firestore) {
    /**
     * Getters
     */
    const getters: GetterTree<Me.State, Me.State> = {};

    /**
     * Module
     */
    const module: Module<Me.State, any> = {
        state,
        mutations: mutationHandlers,
        actions: constructActions(firestore),
        getters,
    };
    return module;
}
