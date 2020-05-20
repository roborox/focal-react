import { Observable } from "rxjs"
import { filter, first } from "rxjs/operators"

export type LoadingStatusStatus = "idle" | "success" | "loading" | "error"

export type LoadingStatusIdle = {
	status: "idle"
}
export type LoadingStatusSuccess = {
	status: "success"
}
export type LoadingStatusLoading = {
	status: "loading"
}
export type LoadingStatusError = {
	status: "error",
	error: any
}
export type LoadingStatus = LoadingStatusIdle | LoadingStatusLoading | LoadingStatusSuccess | LoadingStatusError

export const loadingStatusIdle: LoadingStatusIdle = {
	status: "idle",
}
export const loadingStatusLoading: LoadingStatusLoading = {
	status: "loading",
}
export const loadingStatusSuccess: LoadingStatusSuccess = {
	status: "success",
}
export const createLoadingStatusError = <T>(error: T): LoadingStatusError => ({
	status: "error",
	error,
})

export type LoadingState<T> = {
	value: T,
	status: LoadingStatus
}

export const createLoadingStateIdle = <T>(emptyValue?: T): LoadingState<T> => ({
	status: loadingStatusIdle,
	value: emptyValue as T,
})
export const createLoadingStateSuccess = <T>(value: T): LoadingState<T> => ({
	status: loadingStatusSuccess,
	value,
})
export const createLoadingStateError = <T>(error: any, emptyValue?: T): LoadingState<T> => ({
	status: createLoadingStatusError(error),
	value: emptyValue as T,
})
export const createLoadingStateLoading = <T>(emptyValue?: T): LoadingState<T> => ({
	status: loadingStatusLoading,
	value: emptyValue as T,
})

export function mapLoadingState<F, T>(mapper: (value: F) => T): (state: LoadingState<F>) => LoadingState<T> {
	return (state) => {
		let value: T | undefined
		if (state.value) {
			value = mapper(state.value)
		}
		return { ...state, value: value as T }
	}
}

export async function getFinalValue<T>(state$: Observable<LoadingState<T>>) {
	const result = await state$.pipe(
		filter(x => x.status.status === "error" || x.status.status === "success"),
		first(),
	).toPromise()
	switch (result.status.status) {
		case "error":
			return Promise.reject(result.status.error)
		case "success":
			return Promise.resolve(result.value)
		default:
			throw new Error("Never happens")
	}
}
