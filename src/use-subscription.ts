import { Observable, Subscription } from "rxjs"
import { useEffect, useRef } from "react"

export function useSubscription<T>(observable: Observable<T>, next: (value: T) => void, deps: any[] = []) {
	const subscription = useRef<Subscription>()
	useEffect(() => {
		subscription.current = observable.subscribe(next)
		return () => {
			if (subscription.current) {
				subscription.current.unsubscribe()
			}
		}
	}, [observable, deps])
}