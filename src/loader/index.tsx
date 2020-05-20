import { Observable } from "rxjs"
import { LoadingState } from "../loading-state"
import React, { ReactChild, useMemo } from "react"
import { map } from "rxjs/operators"
import { useRx } from "../use-rx"

export interface LoaderProps<T> {
	state$: Observable<LoadingState<T>>
	idle?: React.ReactNode
	loading?: React.ReactNode
	error?: (error: any) => React.ReactNode
	children?: React.ReactChild | React.ReactChild[] | ((value: T) => React.ReactNode)
}

export function Loader<T>({state$, idle, loading, error, children}: LoaderProps<T>) {
	const rx = useMemo(() => {
		return state$.pipe(map(x => {
			switch (x.status.status) {
				case "loading":
					return loading
				case "success":
					if (children) {
						if (typeof children === "function") {
							return children(x.value)
						} else {
							return children
						}
					}
					return x.value
				case "error":
					return error?.(x.status.error)
				default:
					return idle
			}
		}))
	}, [children, error, idle, loading, state$])
	return <>{useRx(rx)}</>
}
