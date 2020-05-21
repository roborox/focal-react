import React from "react"
import { Observable } from "rxjs"
import { useRxWithStatus } from "../use-rx"

export interface RxProps<T> {
	value$: Observable<T>
	loading?: React.ReactNode
	error?: React.ReactChild | React.ReactChild[] | ((error: any) => React.ReactNode)
	children?: (t: T) => React.ReactNode
}

export function Rx<T>({ value$, loading, error, children }: RxProps<T>): React.ReactElement | null {
	const state = useRxWithStatus(value$)
	switch (state.status) {
		case "loading":
			return <>{loading}</>
		case "success":
			if (children) {
				return <>{children(state.value)}</>
			}
			return <>{state.value}</>
		case "error":
			if (typeof error === "function") {
				return <>{error(state.error)}</>
			}
			return <>{error}</>
	}
	return null
}
