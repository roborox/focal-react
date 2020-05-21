import { LoadingState } from "../loading-state"
import { combineLatest, Observable } from "rxjs"
import { map } from "rxjs/operators"
import { mergeStatusesPlain } from "../merge-statuses"

export function mergeLoadingStates<T1, T2>(
	state1: Observable<LoadingState<T1>>, state2: Observable<LoadingState<T2>>,
): Observable<LoadingState<[T1, T2]>> {
	return combineLatest([state1, state2]).pipe(map((statuses) => ({
		value: statuses.map(({ value }) => value) as [T1, T2],
		...mergeStatusesPlain(statuses),
	})))
}
