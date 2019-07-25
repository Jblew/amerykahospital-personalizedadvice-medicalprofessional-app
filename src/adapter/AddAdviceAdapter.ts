import { FirebaseFunctionDefinitions, PendingAdvice } from "amerykahospital-personalizedadvice-core";
import firebase from "firebase/app";
import "firebase/functions";

interface AddAdviceAdapterTypeguard {
    addAdvice: FirebaseFunctionDefinitions.AddAdvice.Adapter;
}

export class AddAdviceAdapter implements AddAdviceAdapterTypeguard {
    public async addAdvice(advice: PendingAdvice): Promise<FirebaseFunctionDefinitions.AddAdvice.Result> {
        const fnCallable = firebase.functions().httpsCallable(FirebaseFunctionDefinitions.AddAdvice.NAME);
        const result = await fnCallable(advice);
        return result.data;
    }
}
