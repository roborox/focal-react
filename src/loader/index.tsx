import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import React, { useMemo } from "react"
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
	const rx = useMemo(() => {
		return state$.pipe(map(x => {
			switch (x.status) {
				case "loading": {
					return loading
				}
				case "success":
					if (children) {
						if (typeof children === "function") {
							return children(x.value)
						} else {
							return children
						}
					}
					if (typeof x.value === "string" || typeof x.value === "number") {
						return x.value
					}
					console.warn(
						"Loader can't return value, it should be one of type: [string, number] to use without children",
					)
					return null
				case "error":
					if (typeof error === "function") {
						return error(x.error)
					}
					return error
				default: {
					return idle
				}
			}
		}))
	}, [children, error, idle, loading, state$])
	return <>{useRx(rx)}</>
}
