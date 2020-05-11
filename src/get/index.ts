import { LoadingState } from "../loading-state"
import { Observable } from "rxjs"
import { filter, first } from "rxjs/operators"

export async function get<T>(state$: Observable<LoadingState<T>>) {
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
