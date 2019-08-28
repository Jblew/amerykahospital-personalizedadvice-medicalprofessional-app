import { AugmentedLocalizedError } from "localized-error";

export type AdviceMustBeSpecifiedError = AugmentedLocalizedError<typeof AdviceMustBeSpecifiedError.type>;

export namespace AdviceMustBeSpecifiedError {
    export const type = "advice-must-be-specified";
    const localizedMessage = {
        EN: "Advice must be specified",
        PL: "Porada musi być zdefiniowana",
    };

    export function make(): AdviceMustBeSpecifiedError {
        return AugmentedLocalizedError.make(new Error(localizedMessage.EN), { type, localizedMessage, advanced: "" });
    }
}
