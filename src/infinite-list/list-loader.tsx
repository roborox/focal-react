import React, { useMemo } from "react"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import { Atom } from "@grammarly/focal"
import { InfiniteListState } from "./domain"
import { Cases } from "../case-when"
import { loadingStatusSuccess, LoadingStatus } from "../loading-state"
import { Loader } from "../loader"

export function useFirstLoadState<T, K>(state: Observable<InfiniteListState<T, K>>) {
	return useMemo(() => state.pipe<LoadingStatus>(map(
		state => state.items.length === 0 ? state.status : loadingStatusSuccess,
	)), [state])
}

export interface ListLoaderProps<D, C> extends Omit<Cases<React.ReactNode>, "success"> {
	state: Atom<InfiniteListState<D, C>>,
	children?: React.ReactNode
}

export function ListLoader<D, C>({ state, children, ...restProps }: ListLoaderProps<D, C>): React.ReactElement {
	const firstLoadState = useFirstLoadState(state)
	return <Loader status={firstLoadState} {...restProps}>{children}</Loader>
}
