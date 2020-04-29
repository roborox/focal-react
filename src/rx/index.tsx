import React from "react"
import { Observable } from "rxjs"
import { useRx } from "../use-rx"

export interface RxProps<T> {
	value: Observable<T>
	children?: (t: T) => React.ReactNode
}

export function Rx<T>({ value, children }: RxProps<T>): React.ReactElement | null {
	const simple = useRx(value)

	if (simple !== null && children) {
		return <>{children(simple)}</>
	}
	if (simple !== null) {
		return <>{simple}</>
	}
	return null
}
