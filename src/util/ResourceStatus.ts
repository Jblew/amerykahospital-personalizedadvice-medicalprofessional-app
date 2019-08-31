import { AugmentedLocalizedError } from "localized-error";
import ow from "ow--fork-by-jblew-with-catching";

export interface ResourceStatus {
    loading: boolean;
    success: string;
    error: ResourceStatus.ErrorType;
}

export namespace ResourceStatus {
    export type ErrorType =  AugmentedLocalizedError | Error | string;
    export const EMPTY_ERROR: ErrorType = "";
    export const EMPTY_SUCCESS = "";

    export function success(msg: string): ResourceStatus {
        return { loading: false, error: EMPTY_ERROR, success: msg };
    }

    export function isSuccess(r: ResourceStatus): boolean {
        return !!r.success;
    }

    export function loading(): ResourceStatus {
        return { loading: true, error: EMPTY_ERROR, success: EMPTY_SUCCESS };
    }

    export function error(err: ErrorType): ResourceStatus {
        ow(err, "ResourceStatus.error", ow.any(ow.string, ow.object.instanceOf(Error), ow.object.hasKeys("details")));
        return { loading: false, error: err, success: EMPTY_SUCCESS };
    }

    export function hasError(status: ResourceStatus) {
        return !!status.error;
    }

    export function getLocalizedErrorMessage(status: ResourceStatus, locale: string) {
        const stError = status.error;
        if (typeof stError === "string") return stError;

        if ("details" in stError) {
            if (!stError.details.localizedMessage) return stError.message;
            else return stError.details.localizedMessage[locale] || stError.message;
        } else {
            return stError.message;
        }
    }
}
