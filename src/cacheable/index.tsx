import { Cache } from "../cache"
import React from "react"
import { Loader, LoaderProps } from "../loader"

export interface CacheableProps<K, V> extends Omit<LoaderProps<V>, "state$"> {
	cache: Cache<K, V>
	id: K
	children: React.ReactChild | React.ReactChild[] | ((t: V) => React.ReactNode)
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
