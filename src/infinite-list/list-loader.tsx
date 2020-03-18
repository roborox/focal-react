import React from "react"
import { Atom } from "@grammarly/focal"
import { InfiniteListState } from "./domain"
import { Cases } from "../case-when"
import { LoadingStatus, loadingStatusSuccess } from "../loading-state"
import { Loader } from "../loader"

export interface ListLoaderProps<D, C> extends Omit<Cases<React.ReactNode>, "success"> {
	state: Atom<InfiniteListState<D, C>>,
	children?: React.ReactNode
}

export function ListLoader<D, C>({ state, children, ...restProps }: ListLoaderProps<D, C>): React.ReactElement {
	const firstLoadStatus = state.view<LoadingStatus>(
		state => state.items.length === 0 ? state.status : loadingStatusSuccess,
	)
	return <Loader status={firstLoadStatus} {...restProps}>{children}</Loader>
}
