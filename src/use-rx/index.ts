import { Observable } from "rxjs"
import { useState } from "react"
import { useSubscription } from "../use-subscription"

export interface HasGet<T> {
	get(): T
}

export function getInitialState<T>(observable: Observable<T>, initial?: T): T | null {
	let initialState: T | null = null
	if ((observable as any)["get"] !== undefined) {
		initialState = (observable as any).get()
	} else if (initial !== undefined) {
		initialState = initial
	}
	return initialState
}

export function useRx<T>(hasGet: Observable<T> & HasGet<T>): T
export function useRx<T>(observable: Observable<T>): T | null
export function useRx<T>(observable: Observable<T>, initial: T): T
export function useRx<T>(observable: Observable<T>, initial?: T): T | null {
	const [state, setState] = useState<T | null>(() => getInitialState(observable, initial))
	useSubscription(observable, setState)
	return state
}
