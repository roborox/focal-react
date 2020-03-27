import { Atom } from "@grammarly/focal"
import React, { PropsWithChildren } from "react"

export interface AppStateProviderProps<T> {
	atom: Atom<T>
}

export function createAppStateProvider<T>(): [
	React.FC<React.PropsWithChildren<AppStateProviderProps<T>>>,
	() => Atom<T>,
] {
	const Context = React.createContext<Atom<T> | null>(null)

	const AppStateProvider = (props: PropsWithChildren<AppStateProviderProps<T>>) => {
		const { atom, children } = props
		return <Context.Provider value={atom}>{children}</Context.Provider>
	}
	AppStateProvider.displayName = "AppStateProvider"

	const useAppState = () => React.useContext(Context) as Atom<T>
	return [AppStateProvider, useAppState]
}
