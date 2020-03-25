import { LoadingStatus, loadingStatusIdle, loadingStatusLoading, loadingStatusSuccess } from "../loading-state"
import { combineLatest, Observable } from "rxjs"
import { map } from "rxjs/operators"

export function mergeStatusesPlain(statuses: LoadingStatus[]): LoadingStatus {
	const firstError = statuses.find(x => x.status === "error")
	if (firstError) {
		return firstError
	}
	if (statuses.some(({ status }) => status === "loading")) {
		return loadingStatusLoading
	}
	if (statuses.some(({ status }) => status === "idle")) {
		return loadingStatusIdle
	}
	return loadingStatusSuccess
}

export function mergeStatuses(statuses: Observable<LoadingStatus>[]) {
	return combineLatest(statuses).pipe(
		map(mergeStatusesPlain),
	)
}
