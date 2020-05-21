import React from "react"
import { Atom } from "@grammarly/focal"
import { ListPartLoader } from "./create-load-next"
import { InfiniteListState } from "./domain"
import { useInfiniteList } from "./use-infinite-list"
import { Loader, LoaderProps } from "../loader"
import { Observable } from "rxjs"
import { LoadingState, loadingStatusSuccess } from "../loading-state"
import { map } from "rxjs/operators"

export interface InfiniteListProps<T, C> extends Omit<ListLoaderProps<T, C>, "error" | "children"> {
	state$: Atom<InfiniteListState<T, C>>
	loader: ListPartLoader<T, C>
	children: (load: () => Promise<void>) => React.ReactChild | React.ReactChild[],
	error?: (e: any, reload: () => Promise<void>) => React.ReactNode
}

export function InfiniteList<T, C>({ state$, loader, error, children, loading, ...rest }: InfiniteListProps<T, C>) {
	const load = useInfiniteList(state$, loader)
	const realLoading = loading || children(load)

	return (
		<ListLoader state$={state$} error={e => error?.(e, load)} loading={realLoading} {...rest}>
			{children(load)}
		</ListLoader>
	)
}

interface ListLoaderProps<D, C> extends Omit<LoaderProps<any>, "state$" | "children"> {
	state$: Atom<InfiniteListState<D, C>>,
	children?: React.ReactChild | React.ReactChild[]
}

function ListLoader<D, C>({ state$, children, ...restProps }: ListLoaderProps<D, C>): React.ReactElement {
	return <Loader state$={getFirstState(state$)} {...restProps} children={children}/>
}

function getFirstState<T, K>(state: Observable<InfiniteListState<T, K>>): Observable<LoadingState<any>> {
	return state.pipe<LoadingState<any>>(map(
		({ items, status }) => items.length === 0 ? { value: null, ...status } : { value: null, ...loadingStatusSuccess },
	))
}
