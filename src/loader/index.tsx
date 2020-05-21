import { Observable } from "rxjs"
import { LoadingState } from "../loading-state"
import React, { useMemo } from "react"
import { map } from "rxjs/operators"
import { useRx } from "../use-rx"

export interface LoaderProps<T> {
	state$: Observable<LoadingState<T>>
	idle?: React.ReactNode
	loading?: React.ReactNode
	error?: React.ReactChild | React.ReactChild[] | ((error: any) => React.ReactNode)
	children?: React.ReactChild | React.ReactChild[] | ((value: T) => React.ReactNode)
}

export function Loader<T>({state$, idle, loading, error, children}: LoaderProps<T>) {
	const rx = useMemo(() => {
		return state$.pipe(map(x => {
			switch (x.status) {
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
					if (typeof error === "function")
						return error?.(x.error)
					return <>{error}</>
				default:
					return idle
			}
		}))
	}, [children, error, idle, loading, state$])
	return <>{useRx(rx)}</>
}
