// tslint:disable member-ordering
import { RolesConfig } from "amerykahospital-personalizedadvice-core";
import firebase from "firebase/app";
import FirestoreRoles from "firestore-roles";
import * as _ from "lodash";

export class FirestoreRolesAdapter {
    private firestoreRoles: FirestoreRoles;
    private availableRoles: string[];

    private constructor() {
        this.firestoreRoles = new FirestoreRoles(RolesConfig, firebase.firestore());
        this.availableRoles = _.keys(RolesConfig.roles);
    }

    public getAvailableRoles(): string[] {
        return this.availableRoles;
    }

    public isAvailableRole(role: string) {
        return this.availableRoles.indexOf(role) >= 0;
    }

    public async requestRole(uid: string, role: string) {
        return await this.firestoreRoles.requestRole(uid, role);
    }

    /**
     *
     * Singleton
     */
    public static getInstance() {
        return (FirestoreRolesAdapter.INSTANCE = FirestoreRolesAdapter.INSTANCE || new FirestoreRolesAdapter());
    }

    private static INSTANCE: FirestoreRolesAdapter | undefined;
}
