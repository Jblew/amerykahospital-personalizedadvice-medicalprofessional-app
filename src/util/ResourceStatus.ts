import { AugmentedLocalizedError } from "localized-error";
import ow from "ow--fork-by-jblew-with-catching";

export interface ResourceStatus<RESULT_TYPE extends object> {
    loading: boolean;
    result: RESULT_TYPE | "";
    error: ResourceStatus.ErrorType;
}

export namespace ResourceStatus {
    export type ErrorType = AugmentedLocalizedError | Error | string;
    const errorTypeValidator = ow.any(ow.string, ow.object.instanceOf(Error), ow.object.hasKeys("details"));
    export const NO_ERROR: ErrorType = "";
    export const RESULT_NO_SUCCESS = "";
    export const RESULT_SUCCESS_PLACEHOLDER = "success";

    export function empty<RESULT_TYPE extends object>(): ResourceStatus<RESULT_TYPE> {
        return { loading: false, error: NO_ERROR, result: RESULT_NO_SUCCESS };
    }

    export function success<RESULT_TYPE extends object>(result: RESULT_TYPE): ResourceStatus<RESULT_TYPE> {
        return { loading: false, error: NO_ERROR, result };
    }

    export function isSuccess<RESULT_TYPE extends object>(r: ResourceStatus<RESULT_TYPE>): boolean {
        return r.result !== RESULT_NO_SUCCESS;
    }

    export function loading<RESULT_TYPE extends object>(): ResourceStatus<RESULT_TYPE> {
        return { loading: true, error: NO_ERROR, result: RESULT_NO_SUCCESS };
    }

    export function error<RESULT_TYPE extends object>(err: ErrorType): ResourceStatus<RESULT_TYPE> {
        ow(err, "ResourceStatus.error", errorTypeValidator);
        return { loading: false, error: err, result: RESULT_NO_SUCCESS };
    }

    export function hasError<RESULT_TYPE extends object>(status: ResourceStatus<RESULT_TYPE>) {
        return status.error !== NO_ERROR;
    }

    export function getLocalizedErrorMessage<RESULT_TYPE extends object>(
        status: ResourceStatus<RESULT_TYPE>,
        locale: string,
    ) {
        const stError = status.error;
        if (typeof stError === "string") return stError;

        if ("details" in stError) {
            if (!stError.details.localizedMessage) return stError.message;
            else return stError.details.localizedMessage[locale] || stError.message;
        } else {
            return stError.message;
        }
    }

    export function validate<RESULT_TYPE extends object>(
        r: ResourceStatus<RESULT_TYPE>,
        prefix: string,
        resultValidatorFn: (r: RESULT_TYPE) => void,
    ) {
        const baseLabel = `(<ResourceStatus>${prefix})`;
        ow(r, `${baseLabel}`, ow.object);
        ow(r.loading, `${baseLabel}.loading`, ow.boolean);

        ow(
            r.result,
            `${baseLabel}`,
            ow.any(ow.string.empty, ow.object.catching(result => resultValidatorFn(result as RESULT_TYPE))),
        );

        ow(r.error, `${baseLabel}.error`, errorTypeValidator);
    }

    export async function fetchResource<RESULT_TYPE extends object>(
        resourceName: string,
        fetcherFn: () => Promise<RESULT_TYPE>,
        updateStateCb: (status: ResourceStatus<RESULT_TYPE>) => void,
    ) {
        try {
            updateStateCb(loading());
            const result = await fetcherFn();
            updateStateCb(success(result));
        } catch (err) {
            // tslint:disable no-console
            console.error(`Error in ResourceStatus.fetchResource(${resourceName})`, err);
            updateStateCb(error(err));
        }
    }

    export function ensureResult<RESULT_TYPE extends object>(
        rs: ResourceStatus<RESULT_TYPE>,
        name: string = "",
    ): RESULT_TYPE {
        if (ResourceStatus.isSuccess(rs)) return rs.result as RESULT_TYPE;
        else throw new Error(`ResourceStatus.ensureResult: resource ${name ? name + " " : ""}is not loaded`);
    }

    export function resultOrDefault<RESULT_TYPE extends object>(
        rs: ResourceStatus<RESULT_TYPE>,
        defaultV: RESULT_TYPE,
    ): RESULT_TYPE {
        if (ResourceStatus.isSuccess(rs)) return rs.result as RESULT_TYPE;
        else return defaultV;
    }

    export function lightweight(
        rs: ResourceStatus<any>,
    ): Omit<ResourceStatus<any>, "result"> & { result: typeof RESULT_SUCCESS_PLACEHOLDER } {
        const { result, ...rsWithoutResult } = rs;
        return { ...rsWithoutResult, result: RESULT_SUCCESS_PLACEHOLDER };
    }
}
