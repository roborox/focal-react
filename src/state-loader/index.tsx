import { Observable } from "rxjs"
import { LoadingState } from "../loading-state"
import React, { useMemo } from "react"
import { map } from "rxjs/operators"
import { useRx } from "../use-rx"

export interface StateLoaderProps<T> {
	value: Observable<LoadingState<T>>
	idle?: React.ReactNode
	loading?: React.ReactNode
	error?: (error: any) => React.ReactNode
	children: (value: T) => React.ReactNode
}

export function StateLoader<T>({value, idle, loading, error, children}: StateLoaderProps<T>) {
	const rx = useMemo(() => {
		return value.pipe(map(x => {
			switch (x.status.status) {
				case "loading":
					return loading
				case "success":
					return children(x.value)
				case "error":
					return error?.(x.status.error)
				default:
					return idle
			}
		}))
	}, [children, error, idle, loading, value])
	return <>{useRx(rx)}</>
}
