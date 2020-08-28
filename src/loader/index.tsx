import { Observable } from "rxjs"
import React from "react"
import { LoadingState } from "../loading-state"
import { useRx } from "../use-rx"

export interface LoaderProps<T> {
	state$: Observable<LoadingState<T>>
	idle?: React.ReactNode
	loading?: React.ReactNode
	error?: React.ReactNode | ((error: any) => React.ReactNode)
	children?: React.ReactNode | ((value: T) => React.ReactNode)
}

export function Loader<T>({ state$, idle, loading, error, children }: LoaderProps<T>) {
	const state = useRx(state$)

	switch (state.status) {
		case "loading": {
			return loading || null
		}
		case "success": {
			if (children) {
				if (typeof children === "function") {
					return children(state.value)
				} else {
					return children || null
				}
			}
			if (typeof state.value === "string" || typeof state.value === "number") {
				return state.value
			}
			console.warn(
				"Loader can't return value, it should be one of type: [string, number] to use without children",
			)
			return null
		}
		case "error": {
			if (typeof error === "function") {
				return error(state.error)
			}
			return error || null
		}
		default: {
			return idle || null
		}
	}
}
