import { NextObserver } from "rxjs"
import { useEffect } from "react"

export function useSyncSubject<K, T extends NextObserver<K>>(subject: T, value: K) {
	useEffect(() => {
		subject.next(value)
	}, [value])
}