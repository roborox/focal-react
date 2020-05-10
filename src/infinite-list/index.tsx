import React from "react"
import { Atom } from "@grammarly/focal"
import { ListPartLoader } from "./create-load-next"
import { ListLoader, ListLoaderProps } from "./list-loader"
import { InfiniteListState } from "./domain"
import { useInfiniteList } from "./use-infinite-list"

export interface InfiniteListProps<T, C> extends Omit<ListLoaderProps<T, C>, "error" | "children"> {
	state: Atom<InfiniteListState<T, C>>
	loader: ListPartLoader<T, C>
	children: (load: () => Promise<void>) => React.ReactNode,
	error?: (e: any, reload: () => Promise<void>) => React.ReactNode
}

export function InfiniteList<T, C>({ state, loader, error, children, loading, ...rest }: InfiniteListProps<T, C>) {
	const load = useInfiniteList(state, loader)
	const realLoading = loading || children(load)

	return (
		<ListLoader state={state} error={e => error?.(e, load)} loading={realLoading} {...rest}>
			{children(load)}
		</ListLoader>
	)
}
