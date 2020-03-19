import React, { useEffect, useMemo } from "react"
import { Atom } from "@grammarly/focal"
import { createLoadNext, ListPartLoader } from "./create-load-next"
import { ListLoader, ListLoaderProps } from "./list-loader"
import { InfiniteListState } from "./domain"

export interface InfiniteListProps<T, C> extends Omit<ListLoaderProps<T, C>, "error" | "children"> {
	state: Atom<InfiniteListState<T, C>>
	loader: ListPartLoader<T, C>
	loadNextRef?: React.MutableRefObject<(() => Promise<void>) | undefined>,
	children?: (loadNext: () => void) => React.ReactNode,
	error?: (e: any, reload: () => Promise<void>) => React.ReactNode
}

export function InfiniteList<T, C>({
	state,
	loader,
	loading,
	error,
	loadNextRef,
	children,
}: InfiniteListProps<T, C>) {
	const load = useMemo(() => createLoadNext(loader, state), [state, loader])

	useEffect(() => {
		if (loadNextRef) {
			loadNextRef.current = load
		}
	}, [load, loadNextRef])

	useEffect(() => {
		const current = state.get()
		if (current.items.length === 0 && current.status.status === "idle") {
			load().then()
		}
	}, [])

	return (
		<ListLoader state={state} loading={loading} error={e => error?.(e, load)}>
			{children?.(load)}
		</ListLoader>
	)
}
