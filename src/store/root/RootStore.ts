// tslint:disable max-classes-per-file

export namespace RootStore {
    export interface State {
        nowTimer: Date;
    }

    export class Mutations {
        public static updateNowTimer = "updateNowTimer";
    }

    export class Actions {
        public static initialize: string = "initialize";
    }
}
