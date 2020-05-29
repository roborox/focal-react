import { Atom } from "@grammarly/focal"
import { InfiniteListState, listStateIdle } from "./domain"
import { createLoadingStatusError, loadingStatusLoading, loadingStatusSuccess } from "../loading-state"

export type ListPartLoader<D, C> = (continuation: C | null) => Promise<[D[], C]>

export const createLoadNext = <D, C>(loader: ListPartLoader<D, C>, state$: Atom<InfiniteListState<D, C>>) => {
	const finished$ = state$.lens("finished")
	const status$ = state$.lens("status")
	const items$ = state$.lens("items")
	const cont$ = state$.lens("continuation")

	return async (reload?: boolean) => {
		async function load() {
			const promise = loader(cont$.get())
			status$.set(loadingStatusLoading)
			try {
				const [items, continuation] = await promise
				if (items.length === 0) {
					finished$.set(true)
				}
				items$.modify((x) => x.concat(items))
				cont$.set(continuation)
				status$.set(loadingStatusSuccess)
			} catch (e) {
				status$.set(createLoadingStatusError(e))
			}
		}

		if (reload === true) {
			state$.set(listStateIdle())
			load()
		} else {
			if (status$.view("status").get() === "loading") {
				console.warn("List is updating")
			} else if (!finished$.get()) {
				load()
			} else {
				console.warn("Loadable list already finished")
			}
		}
	}
}
