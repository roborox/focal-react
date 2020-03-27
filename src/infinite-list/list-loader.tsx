import React from "react"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import { Atom } from "@grammarly/focal"
import { InfiniteListState } from "./domain"
import { Cases } from "../case-when"
import { LoadingStatus, loadingStatusSuccess } from "../loading-state"
import { Loader } from "../loader"

export function getFirstStatus<T, K>(state: Observable<InfiniteListState<T, K>>) {
	return state.pipe<LoadingStatus>(map(
		state => state.items.length === 0 ? state.status : loadingStatusSuccess,
	))
}

export interface ListLoaderProps<D, C> extends Omit<Cases<React.ReactNode>, "success"> {
	state: Atom<InfiniteListState<D, C>>,
	children?: React.ReactNode
}

export function ListLoader<D, C>({ state, children, ...restProps }: ListLoaderProps<D, C>): React.ReactElement {
	return <Loader status={getFirstStatus(state)} {...restProps}>{children}</Loader>
}
