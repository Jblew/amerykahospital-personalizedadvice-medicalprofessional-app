import { SendSMSFunction } from "amerykahospital-personalizedadvice-businesslogic";
import firebase from "firebase/app";

interface SendSMSAdapterTypeguard {
    sendSMS: SendSMSFunction.Function;
}

export class SendSMSAdapter implements SendSMSAdapterTypeguard {
    public async sendSMS(adviceIdWrap: { adviceId: string }): Promise<SendSMSFunction.Result> {
        if (!adviceIdWrap.adviceId) throw new Error("SendSMSAdapter: malformed adviceIdWrap");
        const fnCallable = firebase.functions().httpsCallable(SendSMSFunction.NAME);
        const result = await fnCallable(adviceIdWrap);
        return result.data;
    }
}
