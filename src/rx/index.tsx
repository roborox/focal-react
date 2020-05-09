import React from "react"
import { Observable } from "rxjs"
import { useRx } from "../use-rx"

export interface RxProps<T> {
	value: Observable<T>
	children?: (t: T) => React.ReactNode
}

export function Rx<T>({ value, children }: RxProps<T>): React.ReactElement {
	const simple = useRx(value)
	if (children) {
		return <>{children(simple)}</>
	}
	return <>{simple}</>
}
