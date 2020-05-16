import { Observable } from "rxjs"
import { useState } from "react"
import { useSubscription } from "../use-subscription"
import { first } from "rxjs/operators"

export function getImmediate<T>(observable: Observable<T>): T {
	let value: T | null = null
	let valueSet: boolean = false
	observable.pipe(first()).subscribe(next => {
		value = next
		valueSet = true
	})
	if (!valueSet) {
		throw new Error("Observable doesn't immediately emits value")
	}
	// @ts-ignore
	return value
}

export function useRx<T>(observable: Observable<T>): T {
	const [state, setState] = useState<T>(() => getImmediate(observable))
	useSubscription(observable, setState)
	return state
}
