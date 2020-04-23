import { Observable } from "rxjs"
import { useEffect } from "react"

export function useSubscription<T>(observable: Observable<T>, next: (value: T) => void, deps: any[] = []) {
	useEffect(() => {
		const s = observable.subscribe(next)
		return () => {
			s.unsubscribe()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [observable, ...deps])
}
