import { createLoadingStateIdle, LoadingState } from "../loading-state"
import React from "react"
import { Atom } from "@grammarly/focal/dist/_cjs/src/atom"
import { useLoadingState } from "../use-loading-state"
import { Loader, LoaderProps } from "../loader"
import { useWithDefault } from "../use-with-default"
import { Rx } from "../rx"

export interface LoadableProps<T> extends Omit<LoaderProps<T>, "state$" | "children"> {
	state$?: Atom<LoadingState<T>>
	loader: () => Promise<T>
	children: React.ReactChild | React.ReactChild[] | ((t: T) => React.ReactNode)
}

export function Loadable<T>({
	state$: possible$, loader, children, ...rest
}: LoadableProps<T>) {
	const state$ = useWithDefault(possible$, () => Atom.create(createLoadingStateIdle()))
	useLoadingState(state$, loader)
	return (
		<Loader state$={state$} {...rest}>
			{
				typeof children === "function"
					? <Rx value={state$.lens("value")} children={children}/>
					: children
			}
		</Loader>
	)
}
