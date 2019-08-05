// tslint:disable member-ordering
import { RolesConfig } from "amerykahospital-personalizedadvice-core";
import firebase from "firebase/app";
import FirestoreRoles, { AccountRecord } from "firestore-roles";
import * as _ from "lodash";

export class FirestoreRolesAdapter {
    private firestoreRoles: FirestoreRoles;
    private availableRoles: string[];

    private constructor() {
        this.firestoreRoles = new FirestoreRoles(RolesConfig, firebase.firestore());
        this.availableRoles = _.keys(RolesConfig.roles);
    }

    /*public roles(): FirestoreRoles {
        return this.firestoreRoles;
    }*/

    public getAvailableRoles(): string[] {
        return this.availableRoles;
    }

    public isAvailableRole(role: string) {
        return this.availableRoles.indexOf(role) >= 0;
    }

    public async userExists(uid: string) {
        return await this.firestoreRoles.userExists(uid);
    }

    public async registerUser(userInfo: firebase.UserInfo) {
        const account: AccountRecord = {
            uid: userInfo.uid,
            displayName: userInfo.displayName,
            email: userInfo.email,
            providerId: userInfo.providerId,
            phoneNumber: null, // skip phone number in db
            photoURL: userInfo.photoURL,
        };
        return await this.firestoreRoles.registerUser(account);
    }

    public async getUidsInRole(role: string) {
        return await this.firestoreRoles.getUidsInRole(role);
    }

    public async getUidsRequestingRole(role: string) {
        return await this.firestoreRoles.getUidsRequestingRole(role);
    }

    public async getAccountRecord(uid: string): Promise<AccountRecord> {
        return await this.firestoreRoles.getAccountRecord(uid);
    }

    public async enableRole(uid: string, role: string) {
        return await this.firestoreRoles.enableRole(uid, role);
    }

    public async disableRole(uid: string, role: string) {
        return await this.firestoreRoles.disableRole(uid, role);
    }

    public async requestRole(uid: string, role: string) {
        return await this.firestoreRoles.requestRole(uid, role);
    }

    public async removeRoleRequest(uid: string, role: string) {
        return await this.firestoreRoles.removeRoleRequest(uid, role);
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
