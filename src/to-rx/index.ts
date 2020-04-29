import { Observable, ReplaySubject } from "rxjs"
import {
	createLoadingStateError,
	createLoadingStateLoading,
	createLoadingStateSuccess,
	LoadingState,
} from "../loading-state"

export function toRx<T>(promise: Promise<T>): Observable<LoadingState<T>> {
	const result = new ReplaySubject<LoadingState<T>>(1)

	result.next(createLoadingStateLoading())

	promise
		.then(x => result.next(createLoadingStateSuccess(x)))
		.catch(e => result.next(createLoadingStateError(e)))
	return result
}
