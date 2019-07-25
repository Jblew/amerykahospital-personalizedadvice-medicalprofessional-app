import { FirebaseFunctionDefinitions } from "amerykahospital-personalizedadvice-core";
import firebase from "firebase/app";
import "firebase/functions";

interface SendSMSAdapterTypeguard {
    sendSMS: FirebaseFunctionDefinitions.SendSMS.Adapter;
}

export class SendSMSAdapter implements SendSMSAdapterTypeguard {
    public async sendSMS(adviceIdWrap: { adviceId: string }): Promise<FirebaseFunctionDefinitions.SendSMS.Result> {
        if (!adviceIdWrap.adviceId) throw new Error("SendSMSAdapter: malformed adviceIdWrap");
        const fnCallable = firebase.functions().httpsCallable(FirebaseFunctionDefinitions.SendSMS.NAME);
        const result = await fnCallable(adviceIdWrap);
        return result.data;
    }
}
