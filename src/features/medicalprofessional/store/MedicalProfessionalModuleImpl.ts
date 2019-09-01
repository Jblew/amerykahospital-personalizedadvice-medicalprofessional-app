// tslint:disable:no-console max-classes-per-file

import { GetterTree, Module } from "vuex";

import { MedicalProfessionalModule as Me } from "./MedicalProfessionalModule";
import { constructActions } from "./impl_actions";
import { mutationHandlers } from "./Mutations";
import { state } from "./impl_state";
import * as firebase from "firebase/app";

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
