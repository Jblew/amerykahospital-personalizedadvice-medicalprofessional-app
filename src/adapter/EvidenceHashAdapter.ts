import { EvidenceHash } from "amerykahospital-personalizedadvice-businesslogic";
import { Configuration } from "@/config/Configuration";

export namespace EvidenceHashAdapter {
    export function generate(evidenceId: string) {
        if (!isValidPesel(evidenceId)) {
            throw new Error("Invalid PESEL");
        }

        const salt = Configuration.get().evidenceIdHashSalt;
        return EvidenceHash.generate({
            evidenceId,
            salt,
        });
    }

    export function isValidPesel(pesel: string) {
        const weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
        let sum = 0;
        const controlNumber = parseInt(pesel.substring(10, 11), 10);
        for (let i = 0; i < weight.length; i++) {
            sum += parseInt(pesel.substring(i, i + 1), 10) * weight[i];
        }
        sum = sum % 10;
        return 10 - sum === controlNumber;
    }
}
