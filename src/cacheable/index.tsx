import { Cache } from "../cache"
import React, { useCallback, useMemo } from "react"
import { Loader, LoaderProps } from "../loader"
import { useLoadingState } from "../use-loading-state"

export interface CacheableProps<K, V> extends Omit<LoaderProps<V>, "state$" | "error"> {
	cache: Cache<K, V>
	id: K
	children: React.ReactChild | React.ReactChild[] | ((t: V) => React.ReactNode)
	error?: React.ReactChild | React.ReactChild[] | ((error: any, reload: () => void) => React.ReactNode)
}

export function Cacheable<K, V>(
	{ cache, error: initialError, id, ...rest }: CacheableProps<K, V>,
) {
	const state$ = useMemo(() => cache.getStateAtom(id), [cache, id])
	const load = useCallback(() => cache.loader.load(id), [cache, id])
	const reload = useLoadingState(state$, load)
	const error = useCallback((e: any) => {
		if (typeof initialError === "function")
			return initialError(e, reload)
		return <>{initialError}</>
	}, [initialError, reload])
	return (
		<Loader
			state$={state$}
			error={error}
			{...rest}
		/>
	)
}
