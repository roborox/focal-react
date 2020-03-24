import React, { useMemo } from "react"
import { ReplaySubject } from "rxjs"
import { Atom } from "@grammarly/focal"
import { createLoadNext, ListPartLoader } from "./create-load-next"
import { ListLoader, ListLoaderProps } from "./list-loader"
import { InfiniteListState } from "./domain"
import { useSubscription } from "../use-subscription"
import { useSyncSubject } from "../use-sync-subject"

export type LoadNextState = {
	should: boolean;
	loadNext: () => Promise<void>;
}

export interface InfiniteListProps<T, C> extends Omit<ListLoaderProps<T, C>, "error" | "children"> {
	state: Atom<InfiniteListState<T, C>>
	loader: ListPartLoader<T, C>
	loadNext: ReplaySubject<() => Promise<void>>,
	children?: (load: () => Promise<void>) => React.ReactNode,
	error?: (e: any, reload: () => Promise<void>) => React.ReactNode
}

export function InfiniteList<T, C>({ state, loader, error, loadNext, children, ...rest }: InfiniteListProps<T, C>) {
	const load = useMemo(() => createLoadNext(loader, state), [loader, state])

	useSubscription(state, ({ items, status: { status } }) => {
		if (status === "idle" && items.length === 0) {
			load().then()
		}
	}, [load])
	useSyncSubject(loadNext, load)

	return (
		<ListLoader state={state} error={e => error?.(e, load)} {...rest}>
			{children?.(load)}
		</ListLoader>
	)
}
