import { loadingStatusIdle, LoadingStatus, createLoadingStatusError, loadingStatusLoading, loadingStatusSuccess, LoadingState } from "../loading-state"
import { Observable, combineLatest } from "rxjs"
import { map } from "rxjs/operators"

export function mergeLoadingStatuses(statuses: LoadingStatus[]): LoadingStatus {
	if (statuses.some(({ status }) => status === "error")) {
		const error = statuses.find((val) => {
			return val.status === "error" && val.error
		}) as any
		return createLoadingStatusError(error)
	}
	if (statuses.some(({ status }) => status === "idle")) {
		return loadingStatusIdle
	}
	if (statuses.some(({ status }) => status === "loading")) {
		return loadingStatusLoading
	}
	return loadingStatusSuccess
}
export function mergeLoadingStates<T1, T2>(
	state1: Observable<LoadingState<T1>>, state2: Observable<LoadingState<T2>>,
): Observable<LoadingState<[T1, T2]>> {
	return combineLatest([state1, state2]).pipe(map((statuses) => ({
		status: mergeLoadingStatuses(statuses.map(({ status }) => status)),
		value: statuses.map(({ value }) => value) as [T1, T2],
	})))
}
