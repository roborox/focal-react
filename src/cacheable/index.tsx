import { Cache } from "../cache"
import React from "react"
import { Loader, LoaderProps } from "../loader"

export interface CacheableProps<K, V> extends Omit<LoaderProps<V>, "value"> {
	cache: Cache<K, V>
	id: K
	children: (t: V) => React.ReactNode
}

export function Cacheable<K, V>(
	{ cache, id, ...rest }: CacheableProps<K, V>,
) {
	return (
		<Loader
			state$={cache.getAtom(id)}
			{...rest}
		/>
	)
}
