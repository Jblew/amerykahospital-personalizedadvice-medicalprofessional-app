import { AddAdviceFunction, PendingAdvice } from "amerykahospital-personalizedadvice-businesslogic";
import firebase from "firebase/app";

interface AddAdviceAdapterTypeguard {
    addAdvice: AddAdviceFunction.Function;
}

export class AddAdviceAdapter implements AddAdviceAdapterTypeguard {
    public async addAdvice(advice: PendingAdvice): Promise<AddAdviceFunction.Result> {
        const fnCallable = firebase.functions().httpsCallable(AddAdviceFunction.NAME);
        const result = await fnCallable(advice);
        return result.data;
    }
}
