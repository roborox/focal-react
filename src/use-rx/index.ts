import { Observable } from "rxjs"
import { useState } from "react"
import { useSubscription } from "../use-subscription"

export function getInitialState<T>(observable: Observable<T>): T {
	let initialState: T | null = null
	let initialized: boolean = false
	observable.subscribe(next => {
		initialState = next
		initialized = true
	})
	if (!initialized) {
		throw new Error("Observable doesn't immediately emits value")
	}
	// @ts-ignore
	return initialState
}

export function useRx<T>(observable: Observable<T>): T {
	const [state, setState] = useState<T>(() => getInitialState(observable))
	useSubscription(observable, setState)
	return state
}
