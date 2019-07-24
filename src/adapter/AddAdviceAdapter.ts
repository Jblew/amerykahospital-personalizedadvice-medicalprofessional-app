import { Advice, FirebaseFunctionDefinitions } from "amerykahospital-personalizedadvice-core";
import firebase from "firebase/app";
import "firebase/functions";

interface AddAdviceAdapterTypeguard {
    addAdvice: FirebaseFunctionDefinitions.AddAdvice.Adapter;
}

export class AddAdviceAdapter implements AddAdviceAdapterTypeguard {
    public async addAdvice(advice: Advice): Promise<FirebaseFunctionDefinitions.AddAdvice.Result> {
        const fnCallable = firebase.functions().httpsCallable(FirebaseFunctionDefinitions.AddAdvice.NAME);
        console.log("Fn callable: " + fnCallable);
        const result = await fnCallable(advice);
        return result.data;
    }
}
